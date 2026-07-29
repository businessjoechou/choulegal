const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.join(__dirname, '..', '..');
const SOURCE_ROOT = path.join(WORKSPACE_ROOT, 'choulegal-site');
const SITE_ROOT = path.join(WORKSPACE_ROOT, 'choulegaledu-site');
const POSTS_DIR = path.join(SOURCE_ROOT, '_posts');
const BLOG_OUT_DIR = path.join(SITE_ROOT, 'blog');
const TEMPLATE_PATH = path.join(SOURCE_ROOT, 'blog', 'template.html');
const SITEMAP_PATH = path.join(SITE_ROOT, 'sitemap.xml');
const BLOG_CSS_SOURCE_PATH = path.join(SOURCE_ROOT, 'css', 'blog.css');
const LEARN_CSS_DIR = path.join(SITE_ROOT, 'css');

// Ensure directory exists
if (!fs.existsSync(BLOG_OUT_DIR)) {
  fs.mkdirSync(BLOG_OUT_DIR, { recursive: true });
}

// Helper: Parse YAML frontmatter
function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  if (!match) {
    return { data: {}, content: fileContent };
  }

  const yamlBlock = match[1];
  const markdownBody = match[2];
  const data = {};

  yamlBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const val = line.slice(colonIndex + 1).trim();
      data[key] = val.replace(/^["']|["']$/g, ''); // strip quotes
    }
  });

  return { data, content: markdownBody };
}

// Helper: Parse inline markdown formatting
function parseInline(text) {
  return text
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Inline code: `code`
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Helper: Convert Markdown block to HTML
function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let currentBlock = [];
  let blockType = null; // 'p', 'ul', 'ol', 'table', 'blockquote', 'aeo-definition'

  function flushBlock() {
    if (currentBlock.length === 0) return;

    const blockText = currentBlock.join('\n');
    if (blockType === 'h') {
      blocks.push(blockText);
    } else if (blockType === 'html') {
      blocks.push(blockText);
    } else if (blockType === 'aeo-definition') {
      const content = blockText.replace(/^>\s*\*\*定義\*\*：?\s*/, '');
      blocks.push(`<div class="aeo-definition"><p><strong>定義</strong>：${parseInline(content)}</p></div>`);
    } else if (blockType === 'blockquote') {
      const content = currentBlock.map(line => line.replace(/^>\s*/, '')).join('<br>');
      blocks.push(`<blockquote><p>${parseInline(content)}</p></blockquote>`);
    } else if (blockType === 'ul') {
      const listItems = currentBlock.map(line => `  <li>${parseInline(line.replace(/^[-*]\s*/, ''))}</li>`).join('\n');
      blocks.push(`<ul>\n${listItems}\n</ul>`);
    } else if (blockType === 'ol') {
      const listItems = currentBlock.map(line => `  <li>${parseInline(line.replace(/^\d+\.\s*/, ''))}</li>`).join('\n');
      blocks.push(`<ol>\n${listItems}\n</ol>`);
    } else if (blockType === 'table') {
      // Parse table
      const rows = currentBlock.map(line => {
        return line.split('|')
          .map(cell => cell.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      });
      
      const headers = rows[0];
      const bodyRows = rows.slice(2); // Skip header and separator row

      const caption = parseInline(headers.join('、'));
      const thead = `  <thead>\n    <tr>\n${headers.map(h => `      <th scope="col">${parseInline(h)}</th>`).join('\n')}\n    </tr>\n  </thead>`;
      const tbody = `  <tbody>\n${bodyRows.map(row => `    <tr>\n${row.map(cell => `      <td>${parseInline(cell)}</td>`).join('\n')}\n    </tr>`).join('\n')}\n  </tbody>`;
      
      blocks.push(`<table>\n  <caption>${caption}</caption>\n${thead}\n${tbody}\n</table>`);
    } else {
      blocks.push(`<p>${parseInline(blockText)}</p>`);
    }

    currentBlock = [];
    blockType = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Empty lines trigger flushing current block
    if (trimmedLine === '') {
      flushBlock();
      continue;
    }

    // If we are currently in an HTML block, keep accumulating
    if (blockType === 'html') {
      currentBlock.push(line);
      if (/^<\/[a-z][^>]*>$/i.test(trimmedLine)) {
        flushBlock();
      }
      continue;
    }

    // Horizontal Rule: ---
    if (trimmedLine === '---') {
      flushBlock();
      blocks.push('<hr>');
      continue;
    }

    // Headers: #, ##, ###
    if (trimmedLine.startsWith('### ')) {
      flushBlock();
      blockType = 'h';
      currentBlock.push(`<h3>${parseInline(trimmedLine.slice(4))}</h3>`);
      flushBlock();
      continue;
    }
    if (trimmedLine.startsWith('## ')) {
      flushBlock();
      blockType = 'h';
      currentBlock.push(`<h2>${parseInline(trimmedLine.slice(3))}</h2>`);
      flushBlock();
      continue;
    }
    if (trimmedLine.startsWith('# ')) {
      flushBlock();
      blockType = 'h';
      currentBlock.push(`<h1>${parseInline(trimmedLine.slice(2))}</h1>`);
      flushBlock();
      continue;
    }

    // AEO Definition Block: Blockquote starting with `**定義**`
    if (trimmedLine.startsWith('>') && trimmedLine.includes('**定義**')) {
      flushBlock();
      blockType = 'aeo-definition';
      currentBlock.push(line);
      continue;
    }

    // Blockquote
    if (trimmedLine.startsWith('>')) {
      if (blockType !== 'blockquote') {
        flushBlock();
        blockType = 'blockquote';
      }
      currentBlock.push(line);
      continue;
    }

    // Unordered List: * or -
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (blockType !== 'ul') {
        flushBlock();
        blockType = 'ul';
      }
      currentBlock.push(trimmedLine);
      continue;
    }

    // Ordered List: 1., 2., etc.
    if (/^\d+\.\s/.test(trimmedLine)) {
      if (blockType !== 'ol') {
        flushBlock();
        blockType = 'ol';
      }
      currentBlock.push(trimmedLine);
      continue;
    }

    // Table Row: starts with |
    if (trimmedLine.startsWith('|')) {
      if (blockType !== 'table') {
        flushBlock();
        blockType = 'table';
      }
      currentBlock.push(trimmedLine);
      continue;
    }

    // HTML block: starts with <
    if (trimmedLine.startsWith('<')) {
      flushBlock();
      blockType = 'html';
      currentBlock.push(line);
      continue;
    }

    // Ordinary Paragraphs
    if (blockType !== 'p' && blockType !== null) {
      flushBlock();
    }
    blockType = 'p';
    currentBlock.push(trimmedLine);
  }

  flushBlock();
  return blocks.join('\n\n');
}

// Format Chinese Date: YYYY-MM-DD -> YYYY 年 MM 月 DD 日
function formatChineseDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[0]} 年 ${parseInt(parts[1], 10)} 月 ${parseInt(parts[2], 10)} 日`;
  }
  return dateStr;
}

function topicKey(eyebrow = '') {
  if (/繼承|民法|財產/.test(eyebrow)) return 'inheritance';
  if (/勞動|勞工/.test(eyebrow)) return 'labor';
  if (/消費/.test(eyebrow)) return 'consumer';
  if (/租屋|租賃/.test(eyebrow)) return 'rental';
  if (/公職|公務員|教師|校園/.test(eyebrow)) return 'public-service';
  if (/刑事/.test(eyebrow)) return 'criminal';
  return 'other';
}

// Generate BlogPosting JSON-LD
function generateJsonLd(metadata, slug) {
  const url = `https://learn.choulegal.com/blog/${slug}.html`;
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": metadata.title,
    "description": metadata.description,
    "datePublished": metadata.date,
    "dateModified": metadata.updated || metadata.date,
    "articleSection": metadata.eyebrow || "法律問題解答",
    "inLanguage": "zh-TW",
    "author": {
      "@type": "Organization",
      "name": "ChouLegal Learn 周全法律教育"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChouLegal Learn 周全法律教育",
      "logo": {
        "@type": "ImageObject",
        "url": "https://learn.choulegal.com/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [article]
  };
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// Main Execution Function
function buildBlog() {
  console.log('Starting ChouLegal Learn blog compilation...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Error: template.html not found at ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  if (!fs.existsSync(LEARN_CSS_DIR)) {
    fs.mkdirSync(LEARN_CSS_DIR, { recursive: true });
  }
  fs.copyFileSync(BLOG_CSS_SOURCE_PATH, path.join(LEARN_CSS_DIR, 'blog.css'));
  
  if (!fs.existsSync(POSTS_DIR)) {
    console.log(`Creating posts directory: ${POSTS_DIR}`);
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    return;
  }

  const postFiles = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  const postsList = [];

  postFiles.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const slug = path.basename(file, '.md');
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(rawContent);

    if (!data.title || !data.date) {
      console.warn(`Warning: Missing title or date in ${file}. Skipping.`);
      return;
    }

    const htmlContent = markdownToHtml(content);
    const jsonLd = generateJsonLd(data, slug);
    const canonical = `https://learn.choulegal.com/blog/${slug}.html`;
    const ogImage = data.image ? (data.image.startsWith('http') ? data.image : `https://learn.choulegal.com${data.image}`) : 'https://learn.choulegal.com/og-image-20260716-choutech.png';

    // Replace placeholders in article template
    let articleHtml = template
      .replace(/{{title}}/g, data.title)
      .replace(/{{description}}/g, data.description || '')
      .replace(/{{canonical}}/g, canonical)
      .replace(/{{og_url}}/g, canonical)
      .replace(/{{og_image}}/g, ogImage)
      .replace(/{{schema_json}}/g, jsonLd)
      .replace(/{{eyebrow}}/g, data.eyebrow || '精選文章')
      .replace(/{{category}}/g, data.category || topicKey(data.eyebrow))
      .replace(/{{post_title}}/g, data.title)
      .replace(/{{date}}/g, formatChineseDate(data.date))
      .replace(/{{updated}}/g, formatChineseDate(data.updated || data.date))
      .replace(/{{author}}/g, data.author || '周全法律科技團隊')
      .replace(/{{content}}/g, htmlContent)
      .replace(/<meta name="robots" content="noindex, nofollow">/, '<meta name="robots" content="index, follow">')
      .replace('<body>', '<body>\n<a class="skip-link" href="#main-content">跳到主要內容</a>')
      .replace('<main class="article-container">', '<main class="article-container" id="main-content">')
      .replace('<img src="/logo-icon.svg" alt="">', '<img src="https://choulegal.com/logo-icon.svg" alt="" width="38" height="38">');

    articleHtml = adaptTemplateToLearn(articleHtml);

    // Save article HTML file
    const destPath = path.join(BLOG_OUT_DIR, `${slug}.html`);
    fs.writeFileSync(destPath, articleHtml, 'utf-8');
    console.log(`Compiled: ${file} -> blog/${slug}.html`);

    postsList.push({
      slug,
      title: data.title,
      date: data.date,
      chineseDate: formatChineseDate(data.date),
      description: data.description || '',
      eyebrow: data.eyebrow || '精選文章'
      ,category: data.category || topicKey(data.eyebrow)
    });
  });

  // Sort posts by date descending
  postsList.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate Blog Index Page
  console.log('Generating blog index.html...');
  const blogCardsHtml = postsList.map(post => `
    <a class="blog-card" data-topic="${post.category}" href="/blog/${post.slug}.html">
      <div class="meta">
        <span class="eyebrow">${post.eyebrow}</span>
        <time>${post.chineseDate}</time>
      </div>
      <h2>${post.title}</h2>
      <p>${post.description}</p>
      <div class="read-more">
        閱讀全文
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </a>
  `).join('\n');

  const indexContentHtml = `
    <style>
      .topic-filter{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 30px}.topic-filter a{padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:var(--panel);color:var(--muted);font-size:14px;font-weight:700}.topic-filter a[aria-current="page"]{border-color:var(--green);background:var(--green);color:#fff}.empty-topic{grid-column:1/-1;padding:clamp(28px,5vw,52px);border:1px solid var(--line);border-radius:18px;background:var(--panel)}.empty-topic h2{margin:0 0 10px;font-family:"Noto Serif TC",serif;font-size:clamp(25px,4vw,34px)}.empty-topic p{max-width:650px;margin:0 0 20px;color:var(--muted)}.empty-topic a{color:var(--green);font-weight:700}
    </style>
    <header class="blog-hero">
      <div class="shell">
        <h1 id="topic-title">台灣法律問題答案庫</h1>
        <p id="topic-description">直接回答常見法律問題，整理適用條件、處理步驟與官方來源，並連結 ChouLegal 免費權益工具。</p>
      </div>
    </header>
    <div class="shell">
      <nav class="topic-filter" aria-label="文章主題">
        <a href="/blog/" data-topic-link="all">全部文章</a>
        <a href="/blog/?topic=inheritance" data-topic-link="inheritance">繼承與財產</a>
        <a href="/blog/?topic=labor" data-topic-link="labor">勞動權益</a>
        <a href="/blog/?topic=consumer" data-topic-link="consumer">消費爭議</a>
        <a href="/blog/?topic=rental" data-topic-link="rental">租屋權益</a>
        <a href="/blog/?topic=public-service" data-topic-link="public-service">公職與校園</a>
        <a href="/blog/?topic=criminal" data-topic-link="criminal">刑事程序</a>
      </nav>
      <div class="blog-grid">
        ${blogCardsHtml}
      </div>
      <div class="empty-topic" id="empty-topic" hidden>
        <h2 id="empty-topic-title"></h2>
        <p id="empty-topic-copy"></p>
        <a id="empty-topic-link" href="https://choulegal.com"></a>
      </div>
    </div>
    <script>
      const topics={inheritance:{title:"繼承與財產",description:"整理遺產分配、繼承順位、遺囑與家庭財產常見問題。",tool:"https://inheritance.choulegal.com"},labor:{title:"勞動權益",description:"整理薪資、加班、特休、資遣與職場權益常見問題。",tool:"https://labor.choulegal.com"},consumer:{title:"消費爭議",description:"整理網購、退費、商品瑕疵、廣告與契約常見問題。",tool:"https://consumer.choulegal.com"},rental:{title:"租屋權益",description:"整理押金、修繕、提前解約與租賃爭議常見問題。",tool:"https://rental.choulegal.com"},"public-service":{title:"公職與校園",description:"整理公務員、教師與校園現場常見的權益問題。",tool:"https://people.choulegal.com/public-servant.html"},criminal:{title:"刑事程序",description:"整理報案、警詢、搜索、告訴與救濟程序的基本知識。",tool:"https://criminal.choulegal.com"}};
      const selected=new URLSearchParams(location.search).get("topic");const active=topics[selected]?selected:"all";const cards=[...document.querySelectorAll("[data-topic]")];const visible=active==="all"?cards:cards.filter(card=>card.dataset.topic===active);cards.forEach(card=>card.hidden=active!=="all"&&card.dataset.topic!==active);document.querySelectorAll("[data-topic-link]").forEach(link=>{if(link.dataset.topicLink===active)link.setAttribute("aria-current","page")});if(active!=="all"){const topic=topics[active];document.querySelector("#topic-title").textContent=topic.title;document.querySelector("#topic-description").textContent=topic.description;document.title=topic.title+"文章｜ChouLegal Learn";if(!visible.length){const empty=document.querySelector("#empty-topic");empty.hidden=false;document.querySelector("#empty-topic-title").textContent=topic.title+"文章正在整理中";document.querySelector("#empty-topic-copy").textContent="目前還沒有可公開的"+topic.title+"文章。你可以先使用對應的免費工具整理問題與下一步。";const link=document.querySelector("#empty-topic-link");link.href=topic.tool;link.textContent="使用"+topic.title+"免費工具 →"}}
    </script>
  `;

  // Create template for index.html (reusing header/footer structural wrapper from template.html)
  const indexLd = `<script type="application/ld+json">\n${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ChouLegal Learn 台灣法律問題答案庫",
    "url": "https://learn.choulegal.com/blog/",
    "description": "直接回答常見台灣法律問題，整理適用條件、處理步驟、官方來源與 ChouLegal 免費權益工具。"
  }, null, 2)}\n</script>`;

  let indexHtml = template
    .replace(/{{title}}/g, '部落格首頁')
    .replace(/{{description}}/g, '直接回答常見台灣法律問題，整理適用條件、處理步驟、官方來源與 ChouLegal 免費權益工具。')
    .replace(/{{canonical}}/g, 'https://learn.choulegal.com/blog/')
    .replace(/{{og_url}}/g, 'https://learn.choulegal.com/blog/')
    .replace(/{{og_image}}/g, 'https://learn.choulegal.com/og-image-20260716-choutech.png')
    .replace(/{{schema_json}}/g, indexLd)
    .replace(/<meta name="robots" content="noindex, nofollow">/, '<meta name="robots" content="index, follow">')
    .replace('<body>', '<body>\n<a class="skip-link" href="#main-content">跳到主要內容</a>')
    .replace('<img src="/logo-icon.svg" alt="">', '<img src="https://choulegal.com/logo-icon.svg" alt="" width="38" height="38">');

  // Replace article body markup in template with index body layout
  indexHtml = indexHtml.replace(/<main class="article-container">[\s\S]*?<\/main>/, `<main id="main-content">${indexContentHtml}</main>`);
  indexHtml = adaptTemplateToLearn(indexHtml);

  const indexDestPath = path.join(BLOG_OUT_DIR, 'index.html');
  fs.writeFileSync(indexDestPath, indexHtml, 'utf-8');
  console.log('Compiled: blog/index.html');

  // Update sitemap.xml
  updateSitemap(postsList);

  console.log('Blog compilation finished successfully.');
}

function adaptTemplateToLearn(html) {
  const learnNav = `<nav class="nav-links" aria-label="主要導覽">
    <a href="/">Learn 首頁</a>
    <a href="/blog/">普法文章</a>
    <a href="/#rural-education">偏鄉教育專區</a>
    <a class="parent-link" href="https://choulegal.com">ChouLegal 六大領域</a>
  </nav>`;

  return html
    .replaceAll('ChouLegal 周全法律權益', 'ChouLegal Learn 周全法律教育')
    .replace('aria-label="ChouLegal 首頁"', 'aria-label="ChouLegal Learn 首頁"')
    .replace('<strong>ChouLegal</strong>', '<strong>ChouLegal Learn</strong>')
    .replace('<small>周全法律權益</small>', '<small>周全法律教育</small>')
    .replace(/<nav class="nav-links" aria-label="主要導覽">[\s\S]*?<\/nav>/, learnNav)
    .replace('href="/favicon.svg"', 'href="https://choulegal.com/favicon.svg"')
    .replace('href="/apple-touch-icon.png"', 'href="https://choulegal.com/apple-touch-icon.png"')
    .replace('<span>© 2026 ChouLegal Learn 周全法律教育</span>', '<span>© 2026 ChouLegal Learn 周全法律教育</span>');
}

// Helper: Dynamically update sitemap.xml
function updateSitemap(posts) {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn(`Warning: sitemap.xml not found at ${SITEMAP_PATH}. Skipping sitemap update.`);
    return;
  }

  console.log('Updating sitemap.xml...');
  let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');

  // Parse existing sitemap elements
  const urls = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match;

  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    const urlBlock = match[1];
    const locMatch = /<loc>(.*?)<\/loc>/.exec(urlBlock);
    if (locMatch) {
      urls.push({
        loc: locMatch[1].trim(),
        block: match[0]
      });
    }
  }

  // Add root blog index if not present
  const blogIndexUrl = 'https://learn.choulegal.com/blog/';
  if (!urls.some(u => u.loc === blogIndexUrl)) {
    const today = new Date().toISOString().split('T')[0];
    const newBlock = `  <url>\n    <loc>${blogIndexUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>`;
    urls.push({ loc: blogIndexUrl, block: newBlock });
    console.log(`Added to sitemap: ${blogIndexUrl}`);
  }

  // Add individual posts if not present
  posts.forEach(post => {
    const postUrl = `https://learn.choulegal.com/blog/${post.slug}.html`;
    if (!urls.some(u => u.loc === postUrl)) {
      const newBlock = `  <url>\n    <loc>${postUrl}</loc>\n    <lastmod>${post.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.70</priority>\n  </url>`;
      urls.push({ loc: postUrl, block: newBlock });
      console.log(`Added to sitemap: ${postUrl}`);
    }
  });

  // Rebuild sitemap XML structure
  const updatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => u.block).join('\n')}
</urlset>
`;

  fs.writeFileSync(SITEMAP_PATH, updatedSitemap, 'utf-8');
  console.log('Sitemap.xml updated successfully.');
}

buildBlog();
