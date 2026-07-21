const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(SITE_ROOT, '_posts');
const BLOG_OUT_DIR = path.join(SITE_ROOT, 'blog');
const TEMPLATE_PATH = path.join(BLOG_OUT_DIR, 'template.html');
const SITEMAP_PATH = path.join(SITE_ROOT, 'sitemap.xml');

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

      const thead = `  <thead>\n    <tr>\n${headers.map(h => `      <th>${parseInline(h)}</th>`).join('\n')}\n    </tr>\n  </thead>`;
      const tbody = `  <tbody>\n${bodyRows.map(row => `    <tr>\n${row.map(cell => `      <td>${parseInline(cell)}</td>`).join('\n')}\n    </tr>`).join('\n')}\n  </tbody>`;
      
      blocks.push(`<table>\n${thead}\n${tbody}\n</table>`);
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

// Generate BlogPosting JSON-LD
function generateJsonLd(metadata, slug) {
  const url = `https://choulegal.com/blog/${slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": metadata.title,
    "description": metadata.description,
    "datePublished": metadata.date,
    "author": {
      "@type": "Organization",
      "name": "ChouLegal 周全法律權益"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChouLegal 周全法律權益",
      "logo": {
        "@type": "ImageObject",
        "url": "https://choulegal.com/logo-icon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// Main Execution Function
function buildBlog() {
  console.log('Starting ChouLegal blog compilation...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Error: template.html not found at ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  
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
    const canonical = `https://choulegal.com/blog/${slug}.html`;
    const ogImage = data.image ? (data.image.startsWith('http') ? data.image : `https://choulegal.com${data.image}`) : 'https://choulegal.com/og-image-20260716-choutech.png';

    // Replace placeholders in article template
    let articleHtml = template
      .replace(/{{title}}/g, data.title)
      .replace(/{{description}}/g, data.description || '')
      .replace(/{{canonical}}/g, canonical)
      .replace(/{{og_url}}/g, canonical)
      .replace(/{{og_image}}/g, ogImage)
      .replace(/{{schema_json}}/g, jsonLd)
      .replace(/{{eyebrow}}/g, data.eyebrow || '精選文章')
      .replace(/{{post_title}}/g, data.title)
      .replace(/{{date}}/g, formatChineseDate(data.date))
      .replace(/{{author}}/g, data.author || '周全法律科技團隊')
      .replace(/{{content}}/g, htmlContent);

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
    });
  });

  // Sort posts by date descending
  postsList.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate Blog Index Page
  console.log('Generating blog index.html...');
  const blogCardsHtml = postsList.map(post => `
    <article class="blog-card" onclick="window.location.href='/blog/${post.slug}.html'">
      <div class="meta">
        <span class="eyebrow">${post.eyebrow}</span>
        <time>${post.chineseDate}</time>
      </div>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <div class="read-more">
        閱讀全文
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </article>
  `).join('\n');

  const indexContentHtml = `
    <header class="blog-hero">
      <div class="shell">
        <h1>周全法律科技部落格</h1>
        <p>提供深入淺出的勞動權益、財產繼承與生活合規指南。以嚴謹法源為基石，協助一般民眾釐清自身法律權益。</p>
      </div>
    </header>
    <div class="shell">
      <div class="blog-grid">
        ${blogCardsHtml}
      </div>
    </div>
  `;

  // Create template for index.html (reusing header/footer structural wrapper from template.html)
  const indexLd = `<script type="application/ld+json">\n${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "周全法律科技部落格",
    "url": "https://choulegal.com/blog/",
    "description": "提供深入淺出的勞動權益、財產繼承與生活合規指南。以嚴謹法源為基石，協助一般民眾釐清自身法律權益。"
  }, null, 2)}\n</script>`;

  let indexHtml = template
    .replace(/{{title}}/g, '部落格首頁')
    .replace(/{{description}}/g, '提供深入淺出的勞動權益、財產繼承與生活合規指南。以嚴謹法源為基石，協助一般民眾釐清自身法律權益。')
    .replace(/{{canonical}}/g, 'https://choulegal.com/blog/')
    .replace(/{{og_url}}/g, 'https://choulegal.com/blog/')
    .replace(/{{og_image}}/g, 'https://choulegal.com/og-image-20260716-choutech.png')
    .replace(/{{schema_json}}/g, indexLd);

  // Replace article body markup in template with index body layout
  indexHtml = indexHtml.replace(/<main class="article-container">[\s\S]*?<\/main>/, `<main>${indexContentHtml}</main>`);

  const indexDestPath = path.join(BLOG_OUT_DIR, 'index.html');
  fs.writeFileSync(indexDestPath, indexHtml, 'utf-8');
  console.log('Compiled: blog/index.html');

  // Update sitemap.xml
  updateSitemap(postsList);

  console.log('Blog compilation finished successfully.');
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
  const blogIndexUrl = 'https://choulegal.com/blog/';
  if (!urls.some(u => u.loc === blogIndexUrl)) {
    const today = new Date().toISOString().split('T')[0];
    const newBlock = `  <url>\n    <loc>${blogIndexUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>`;
    urls.push({ loc: blogIndexUrl, block: newBlock });
    console.log(`Added to sitemap: ${blogIndexUrl}`);
  }

  // Add individual posts if not present
  posts.forEach(post => {
    const postUrl = `https://choulegal.com/blog/${post.slug}.html`;
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
