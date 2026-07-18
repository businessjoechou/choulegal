import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kitRoot = path.resolve(__dirname, "..");
const siteRoot = path.resolve(kitRoot, "..");
const productDir = kitRoot;
const adDir = path.join(kitRoot, "ads");

const products = [
  {
    id: "choulegal-rights",
    brand: "ChouLegal",
    label: "法律權益查詢 PaaS",
    title: "一般民眾的法律權益入口",
    shortTitle: "法律權益入口",
    audience: "一般民眾、內容合作方、律師合作夥伴",
    stage: "正式入口可展示",
    accent: "#285f55",
    url: "../index.html#tools",
    primaryCta: "開啟權益查詢",
    secondaryCta: "合作洽詢",
    tagline: "把勞動、消費、租屋、財產與公務員權益，整理成可理解的下一步。",
    description: "ChouLegal 權益查詢是面向一般民眾的法律科技入口。使用者先選事件類型，取得初步試算、資料整理路徑與下一步提醒；若案件需要個案法律意見，再轉向律師媒合。",
    sellLine: "可銷售方向：流量入口、律師合作版位、內容合作、企業員工福利入口。",
    maturity: "已有公開入口與多個權益查詢方向；個案法律意見仍由執業律師處理。",
    modules: ["勞基法權益", "消費爭議", "租屋權益", "民法財產", "公務員權益"],
    pains: ["使用者不知道自己是哪一種法律事件", "資料散落在聊天紀錄、發票、契約與通知裡", "要找律師前，連問題怎麼說都不清楚"],
    outcomes: ["先整理事件類型與資料清單", "把可試算的金額和日期先拆出來", "需要時銜接律師媒合，不把平台內容包裝成法律意見"],
    pageSections: [
      ["權益查詢", "勞動、消費、租屋、財產、公務員權益五大方向集中入口。"],
      ["律師媒合", "把使用者事件包整理好，再提供合作律師或版位合作。"],
      ["內容合作", "可與社群、媒體、企業員工福利入口合作，承接法律問題流量。"]
    ],
    pricing: [
      ["Free", "民眾權益查詢維持免費，建立可信任流量入口。"],
      ["Partner", "律師、內容方、社群與企業福利合作，按版位或合作模式洽談。"],
      ["Platform", "企業或機構可設定專屬入口，把員工或會員導向指定權益路徑。"]
    ],
    adTitle: "法律問題，先整理成能處理的事件。",
    adSubtitle: "ChouLegal 權益查詢 PaaS，讓民眾先理解路徑，再銜接律師。"
  },
  {
    id: "lawyer-matching",
    brand: "ChouLegal",
    label: "律師媒合 PaaS",
    title: "把法律需求整理好，再媒合律師",
    shortTitle: "律師媒合",
    audience: "律師、律所、專業服務合作方",
    stage: "可銷售合作",
    accent: "#315f8f",
    url: "https://people.choulegal.com/lawyers.html",
    primaryCta: "查看媒合入口",
    secondaryCta: "律師合作洽詢",
    tagline: "不是把人丟給律師，而是先把事件類型、資料、需求與地區整理清楚。",
    description: "律師媒合產品承接 ChouLegal 的權益查詢流量。平台先協助使用者把事件分類、需求類型、資料狀態與地區整理好，再依專長、地區與服務型態提供合作律師入口。",
    sellLine: "可銷售方向：律師曝光、專長頁、地區頁、事件包合作、內容贊助。",
    maturity: "可作為合作入口與銷售頁；實際媒合規則、收費與律師審核機制需按合作模式設定。",
    modules: ["事件分類", "地區與專長", "需求標籤", "合作版位", "事件包"],
    pains: ["律師廣告流量太散，使用者問題不成形", "使用者不知道該找哪一類律師", "律師接到的諮詢常缺資料、缺金額、缺時間線"],
    outcomes: ["先整理事件包再銜接律師", "用專長、地區與需求讓合作更清楚", "把免費權益入口轉成可變現的合作產品"],
    pageSections: [
      ["事件包", "使用者先整理爭議類型、金額、地區、時程與文件狀態。"],
      ["律師頁", "依專長、地區、服務型態提供曝光與合作入口。"],
      ["合作收益", "可做版位、內容贊助、事件類型合作或律師 SaaS 入口導流。"]
    ],
    pricing: [
      ["Profile", "律師或律所頁面曝光，適合建立專長入口。"],
      ["Category", "以勞動、消費、租屋、財產、公務員等事件分類合作。"],
      ["Workspace", "與 ChouCounsel 串接，讓律師把案件帶入工作台。"]
    ],
    adTitle: "讓律師接到更清楚的需求。",
    adSubtitle: "先整理事件包，再做專長、地區與服務型態媒合。"
  },
  {
    id: "choucounsel",
    brand: "ChouCounsel",
    label: "律師案件工作台 PaaS",
    title: "給律師與律所的案件工作台",
    shortTitle: "律師案件工作台",
    audience: "律師、律所、法務團隊",
    stage: "前端工作台 MVP",
    accent: "#a8483a",
    url: "../choucounsel-site/",
    primaryCta: "開啟 ChouCounsel",
    secondaryCta: "律所合作洽詢",
    tagline: "案件、期限、卷證、關係人、時數與帳務，集中在一個律師工作區。",
    description: "ChouCounsel 是 ChouLegal 旗下給律師、律所與法務團隊使用的案件工作台 PaaS。它先把案件管理、期限、文件、關係人、時數、帳務與可匯出的工作底稿集中起來，作為律師日常工作的操作介面。",
    sellLine: "可銷售方向：律師個人版、律所團隊版、媒合事件包承接、法務案件工作區。",
    maturity: "目前是可操作的本機工作台 MVP；尚未宣稱具備正式雲端多租戶、登入權限、伺服器端資料庫或資安稽核。",
    modules: ["案件總覽", "期限庭期", "文件卷證", "關係人", "時數帳務"],
    pains: ["案件資料分散在通訊軟體、雲端硬碟與行事曆", "期限與庭期靠人記，容易漏掉", "時數、帳務、工作底稿沒有集中整理"],
    outcomes: ["一個工作區看案件、任務與期限", "匯出 CSV、行事曆與工作底稿", "把媒合案件承接到律師自己的案件流程"],
    pageSections: [
      ["案件中心", "管理案件、任務、期限、庭期、活動紀錄與狀態。"],
      ["文件卷證", "集中整理文件、證據、版本與可匯出底稿。"],
      ["營運資料", "管理時數、帳務、關係人與利益衝突提示。"]
    ],
    pricing: [
      ["Solo", "個人律師案件工作台，適合先用來管理日常案件。"],
      ["Firm", "律所團隊版，主打多人協作、權限與案件資料集中。"],
      ["Network", "承接 ChouLegal 律師媒合事件包，形成案件來源到工作台的路徑。"]
    ],
    adTitle: "律師案件，不該散在五個地方。",
    adSubtitle: "ChouCounsel 案件工作台 PaaS，把期限、卷證與帳務集中。"
  },
  {
    id: "choureg",
    brand: "ChouReg",
    label: "企業合規 PaaS",
    title: "企業、HR 與顧問的合規工作區",
    shortTitle: "企業合規工作區",
    audience: "企業、HR、店家、顧問、法務",
    stage: "平台可展示",
    accent: "#285f55",
    url: "https://choureg.com/",
    primaryCta: "建立 ChouReg 工作區",
    secondaryCta: "查看平台",
    tagline: "把合規任務、文件、法規異動、事件與報告放進同一個 PaaS 工作區。",
    description: "ChouReg 是周全科技旗下的企業合規 PaaS。企業、HR、店家或顧問可以建立工作區，管理合規任務、文件版本、法規異動、外部事件與報告輸出。",
    sellLine: "可銷售方向：企業訂閱、顧問多客戶工作區、模組訂閱、API 與 Webhook 平台合作。",
    maturity: "已有公開平台頁與互動入口；不同模組的正式法律結論與資料來源仍需依產品 gate 持續驗證。",
    modules: ["合規任務", "文件中心", "法規異動", "報告輸出", "API / Webhook"],
    pains: ["合規工作只存在 Excel、雲端資料夾與聊天訊息", "法規異動後不知道哪些文件和流程要改", "顧問服務客戶時，交付紀錄很難產品化"],
    outcomes: ["企業自助建立合規工作區", "模組化管理勞動、個資、契約、店家與 AI 治理", "把顧問服務變成可重複的 PaaS 流程"],
    pageSections: [
      ["工作區", "企業、品牌、據點或顧問客戶各自建立獨立工作區。"],
      ["模組", "勞動、店家、個資、契約、法規異動與 AI 治理可按需求開通。"],
      ["平台化", "API、Webhook、報告與稽核紀錄讓合規服務可被產品化。"]
    ],
    pricing: [
      ["Company", "企業自助開通工作區，按模組與用量訂閱。"],
      ["Consultant", "顧問管理多個客戶工作區，把服務變成可複製流程。"],
      ["Platform", "合作方透過 API、Webhook 或產業模組建立合規 PaaS。"]
    ],
    adTitle: "合規不是顧問案，是每天能用的 PaaS。",
    adSubtitle: "ChouReg 讓企業自助建立合規工作區，任務、文件與報告集中管理。"
  },
  {
    id: "chouroster",
    brand: "ChouRoster",
    label: "合規排班 PaaS",
    title: "排班前看成本，排班後抓風險",
    shortTitle: "合規排班",
    audience: "餐飲、零售、門市、輪班制企業",
    stage: "開發中原型",
    accent: "#c79a37",
    url: "https://roster.choureg.com/",
    primaryCta: "開啟 ChouRoster",
    secondaryCta: "查看 ChouReg",
    tagline: "班表產生、人力成本、最低營業額、尖離峰配置與勞基法風險提示。",
    description: "ChouRoster 是 ChouReg 底下的合規排班 PaaS，給餐飲、零售、門市與輪班制企業使用。第一版主打班表產生、人力成本試算、最低營業額提醒、尖離峰分析與勞基法風險提示。",
    sellLine: "可銷售方向：門市排班訂閱、餐飲零售人力成本工具、ChouReg 合規模組加購。",
    maturity: "目前是可操作原型；薪資結算、完整假別與正式法規引擎仍在開發中，不能宣稱正式 payroll。",
    modules: ["班表產生", "人力成本", "最低營業額", "尖離峰", "工時風險"],
    pains: ["店長排班只看人夠不夠，沒先看成本", "尖離峰人力配置憑經驗，事後才發現浪費", "工時、例休、休息日風險沒有留下紀錄"],
    outcomes: ["排班前先估人力成本與營收底線", "標示工時和排班風險", "把排班檢查結果回寫 ChouReg 合規流程"],
    pageSections: [
      ["排班", "建立週班表、員工時薪與班別資料。"],
      ["成本", "估算人力成本與最低營業額底線。"],
      ["風險", "提示工時、休息、例假、休息日與假別需確認項目。"]
    ],
    pricing: [
      ["Store", "單店排班與成本試算。"],
      ["Multi-store", "多門市班表、角色與營運指標集中管理。"],
      ["ChouReg Add-on", "作為 ChouReg 勞動合規模組的排班子產品。"]
    ],
    adTitle: "排班前，先知道這張班表賺不賺。",
    adSubtitle: "ChouRoster 合規排班 PaaS，同時看成本、尖離峰與工時風險。"
  },
  {
    id: "avs",
    brand: "AVS",
    label: "法律驗證 PaaS",
    title: "把法律 AI 的輸出拆成可稽核流程",
    shortTitle: "法律驗證",
    audience: "法律 AI 團隊、法務、合規產品、研究單位",
    stage: "驗證架構與產品頁",
    accent: "#7c4d2b",
    url: "../avs.html",
    primaryCta: "查看 AVS",
    secondaryCta: "驗證合作洽詢",
    tagline: "法源、判決、公式、事實涵攝與實務區間，不能只靠模型說自己對。",
    description: "AVS 是周全科技的法律驗證架構，目標是把法律 AI 或法律計算產品的法源、公式、判決、事實涵攝與輸出結果拆成可追蹤、可重跑、可稽核的驗證流程。",
    sellLine: "可銷售方向：法律 AI 驗證 API、產品上線 gate、法源查核台帳、第三方法律科技稽核服務。",
    maturity: "已有 AVS 產品頁與驗證理念；每次通過檢查只代表指定 trace 或 gate 通過，不能包裝成所有個案結論保證。",
    modules: ["法源核驗", "判決字號", "公式 trace", "事實涵攝", "報告 gate"],
    pains: ["法律 AI 回答看起來合理，但法源可能不存在", "公式、常數與日期版本很難追蹤", "企業不敢把未驗證輸出放進正式流程"],
    outcomes: ["把法律輸出拆成可檢查的 trace", "區分 PASS、WARN、FAIL 與人工覆核", "讓法律 AI 產品上線前有明確 gate"],
    pageSections: [
      ["法源", "核對法條、常數、修法日期與官方來源。"],
      ["判決", "保留法院、年度、字號、裁判日期與引用段落。"],
      ["Gate", "把公式、事實涵攝、風險等級與報告輸出拆成檢查階段。"]
    ],
    pricing: [
      ["API", "提供法律 AI 產品串接驗證流程。"],
      ["Workbench", "法源、判決、公式與報告 trace 的稽核工作台。"],
      ["Audit", "協助法律科技產品建立上線前 gate 與公開台帳。"]
    ],
    adTitle: "法律 AI 不能只說自己是對的。",
    adSubtitle: "AVS 法律驗證 PaaS，把法源、公式與輸出拆成可稽核 trace。"
  },
  {
    id: "choulegal-learn",
    brand: "ChouLegal Learn",
    label: "法律教育 PaaS",
    title: "法律學習、題庫與知識庫平台",
    shortTitle: "法律教育平台",
    audience: "學生、考生、企業訓練、法學社群",
    stage: "外部入口可導流",
    accent: "#6f5a9b",
    url: "https://learn.choulegal.com",
    primaryCta: "開啟 Learn",
    secondaryCta: "課程合作洽詢",
    tagline: "把法律知識、題庫、筆記、收藏與課程進度放進同一個學習帳號。",
    description: "ChouLegal Learn 是周全法律教育入口，承接法律 Library、收藏、題庫、筆記、課程與學習進度。它可以作為法律教育、企業法遵訓練與社群內容轉化的 PaaS 產品。",
    sellLine: "可銷售方向：法律課程、題庫訂閱、企業法遵訓練、講座頁與社群內容轉化。",
    maturity: "已有外部教育入口；實際課程內容、題庫授權與企業訓練方案需按合作主題建立。",
    modules: ["法律 Library", "題庫", "收藏", "筆記", "課程進度"],
    pains: ["法律學習資料散落在文章、講義、題庫與筆記", "學生看完內容卻沒有形成可複習系統", "企業訓練缺乏能追蹤進度的法律教育入口"],
    outcomes: ["讓學習內容進入帳號與進度系統", "把公開內容轉成可訂閱的教育產品", "企業或社群可用同一平台做法律課程與測驗"],
    pageSections: [
      ["Library", "整理法學主題、文章、案例與學習路徑。"],
      ["Practice", "題庫、測驗、收藏與錯題追蹤。"],
      ["Training", "企業法遵訓練、講座頁與學習進度管理。"]
    ],
    pricing: [
      ["Learner", "個人學習、題庫、筆記與收藏。"],
      ["Course", "課程、講座、專題頁與內容訂閱。"],
      ["Team", "企業法遵訓練、進度追蹤與測驗紀錄。"]
    ],
    adTitle: "法律學習，需要一個能累積的地方。",
    adSubtitle: "ChouLegal Learn 把 Library、題庫、筆記與課程進度放進同一個平台。"
  }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderHead(product, filePath, title, description) {
  const siteRel = path.relative(path.dirname(filePath), siteRoot).replaceAll(path.sep, "/") || ".";
  const adImage = product ? `ads/${product.id}.png` : "ads/choureg.png";
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${adImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<link rel="icon" type="image/svg+xml" href="${siteRel}/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/sales-products.css">
</head>`;
}

function renderTopbar(currentId = "") {
  const homeHref = "index.html";
  const productHref = (id) => `${id}.html`;
  return `<header class="topbar">
  <a class="brand" href="${homeHref}" aria-label="銷售產品總覽">
    <span class="brand-mark">周</span>
    <span><strong>ChouTech</strong><small>產品銷售目錄</small></span>
  </a>
  <nav class="nav" aria-label="產品導覽">
    <a href="${homeHref}"${currentId === "portfolio" ? ' aria-current="page"' : ""}>總覽</a>
    ${products.slice(0, 5).map((item) => `<a href="${productHref(item.id)}"${currentId === item.id ? ' aria-current="page"' : ""}>${esc(item.shortTitle)}</a>`).join("")}
  </nav>
</header>`;
}

function cardLink(item, prefix = "") {
  return `<article class="product-card">
  <span class="kicker">${esc(item.label)}</span>
  <h3>${esc(item.shortTitle)}</h3>
  <p>${esc(item.tagline)}</p>
  <div class="card-foot">
    <span>${esc(item.stage)}</span>
    <a href="${prefix}${item.id}.html">看產品頁</a>
  </div>
</article>`;
}

function renderPortfolio() {
  const filePath = path.join(kitRoot, "index.html");
  return `${renderHead(null, filePath, "ChouTech 可銷售產品總覽｜PaaS 產品頁與廣告素材", "ChouTech 旗下 ChouLegal、ChouCounsel、ChouReg、ChouRoster、AVS 與 ChouLegal Learn 的可銷售 PaaS 產品總覽。")}
<body>
${renderTopbar("portfolio")}
<main>
  <section class="hero shell">
    <div>
      <p class="eyebrow">ChouTech Sales Portfolio</p>
      <h1>今天可以拿出去賣的產品。</h1>
      <p class="lead">這份目錄把 ChouTech 旗下產品拆成可推銷的 PaaS 產品線。每一個都有產品頁、主張、客群、銷售方向與廣告圖；成熟度也寫清楚，不把原型說成已完成的正式企業雲。</p>
      <div class="actions">
        <a class="btn primary" href="#products">看全部產品</a>
        <a class="btn secondary" href="ads/">看廣告素材</a>
      </div>
    </div>
    <aside class="hero-board" aria-label="產品線摘要">
      <div class="board-top"><strong>7 條產品線</strong><span class="status">PaaS-first</span></div>
      <div class="board-grid">
        <div class="board-card"><span>ChouLegal</span><p>民眾權益查詢與律師媒合入口。</p></div>
        <div class="board-card"><span>ChouCounsel</span><p>律師與律所案件工作台。</p></div>
        <div class="board-card"><span>ChouReg</span><p>企業、HR、店家與顧問合規工作區。</p></div>
        <div class="board-card"><span>AVS / Learn</span><p>法律驗證與法律教育平台化產品。</p></div>
      </div>
    </aside>
  </section>

  <section class="section shell" id="products">
    <div class="section-head">
      <p class="eyebrow">Product Lines</p>
      <h2>每個產品都能單獨介紹、單獨成交。</h2>
      <p class="section-sub">語言統一改成 PaaS：開通、訂閱、建立工作區、平台合作。主軸是產品自助使用，不是顧問專案。</p>
    </div>
    <div class="product-grid">
      ${products.map((item) => cardLink(item)).join("\n")}
    </div>
  </section>

  <section class="section offer">
    <div class="shell">
      <div class="section-head">
        <p class="eyebrow">Ad Assets</p>
        <h2>圖片廣告已按產品產出。</h2>
        <p class="section-sub">每張 1200x628 PNG，適合放社群、簡報、訊息推銷與網站 OG 圖。</p>
      </div>
      <div class="asset-grid">
        ${products.map((item) => `<article class="asset-card"><strong>${esc(item.shortTitle)}</strong><p>${esc(item.adSubtitle)}</p><img src="ads/${item.id}.png" alt="${esc(item.shortTitle)} 廣告圖"></article>`).join("\n")}
      </div>
    </div>
  </section>
</main>
<footer class="footer"><span>© 2026 ChouTech 周全科技</span><span>ChouLegal / ChouCounsel / ChouReg / ChouRoster / AVS / Learn</span></footer>
</body>
</html>`;
}

function renderProductPage(product) {
  const filePath = path.join(productDir, `${product.id}.html`);
  return `${renderHead(product, filePath, `${product.title}｜${product.label}`, product.tagline)}
<body>
${renderTopbar(product.id)}
<main>
  <section class="hero shell">
    <div>
      <p class="eyebrow">${esc(product.label)}</p>
      <h1>${esc(product.title)}</h1>
      <p class="lead">${esc(product.description)}</p>
      <div class="actions">
        <a class="btn primary" href="${product.url}">${esc(product.primaryCta)}</a>
        <a class="btn secondary" href="mailto:businessjoechou@gmail.com?subject=${encodeURIComponent(product.brand + " " + product.label + " 合作洽詢")}">${esc(product.secondaryCta)}</a>
      </div>
      <p class="note">${esc(product.maturity)}</p>
    </div>
    <aside class="product-board" style="--accent:${product.accent}" aria-label="${esc(product.brand)} 產品摘要">
      <div class="board-top"><strong>${esc(product.brand)}</strong><span class="status">${esc(product.stage)}</span></div>
      <div class="screen">
        ${product.modules.map((module, index) => `<div class="screen-line"><b>0${index + 1}</b><span>${esc(module)}</span><i></i></div>`).join("\n")}
      </div>
    </aside>
  </section>

  <section class="section shell">
    <div class="section-head">
      <p class="eyebrow">Sales Positioning</p>
      <h2>${esc(product.sellLine)}</h2>
      <p class="section-sub">${esc(product.tagline)}</p>
    </div>
    <div class="split">
      <div>
        <h3>客戶現在的痛點</h3>
        <ul class="bullets">
          ${product.pains.map((pain) => `<li>${esc(pain)}</li>`).join("\n")}
        </ul>
      </div>
      <div>
        <h3>買了之後得到什麼</h3>
        <ul class="bullets">
          ${product.outcomes.map((outcome) => `<li>${esc(outcome)}</li>`).join("\n")}
        </ul>
      </div>
    </div>
  </section>

  <section class="section shell">
    <div class="section-head">
      <p class="eyebrow">Product Page</p>
      <h2>產品頁介紹。</h2>
    </div>
    <div class="info-grid">
      ${product.pageSections.map((section) => `<article class="info-card"><strong>${esc(section[0])}</strong><p>${esc(section[1])}</p></article>`).join("\n")}
    </div>
  </section>

  <section class="section offer">
    <div class="shell">
      <div class="section-head">
        <p class="eyebrow">PaaS Offer</p>
        <h2>用 PaaS 的方式賣：開通、訂閱、建立工作區。</h2>
        <p class="section-sub">主軸是產品自助使用；需要客製合作時，也以平台合作、模組或 API 工作區表達。</p>
      </div>
      <div class="tier-grid">
        ${product.pricing.map((tier) => `<article class="tier-card"><strong>${esc(tier[0])}</strong><p>${esc(tier[1])}</p></article>`).join("\n")}
      </div>
    </div>
  </section>

  <section class="section shell">
    <div class="section-head">
      <p class="eyebrow">Image Ad</p>
      <h2>可直接拿去推銷的圖片廣告。</h2>
    </div>
    <div class="asset-grid">
      <article class="asset-card">
        <strong>${esc(product.shortTitle)} 廣告圖</strong>
        <p>${esc(product.adSubtitle)}</p>
        <img src="ads/${product.id}.png" alt="${esc(product.shortTitle)} 廣告圖">
      </article>
    </div>
  </section>
</main>
<footer class="footer"><span>© 2026 ${esc(product.brand)}</span><span>ChouTech 周全科技旗下 PaaS 產品</span></footer>
</body>
</html>`;
}

function renderAd(product) {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1200, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/sales-products.css">
</head>
<body class="ad-body">
  <section class="ad-card" style="--accent:${product.accent}">
    <div class="ad-copy">
      <div class="ad-brand">ChouTech 周全科技</div>
      <div class="ad-kicker">${esc(product.label)}</div>
      <h1 class="ad-title">${esc(product.adTitle)}</h1>
      <p class="ad-subtitle">${esc(product.adSubtitle)}</p>
      <div class="ad-cta">${esc(product.primaryCta)}</div>
    </div>
    <div class="ad-visual">
      <h2>${esc(product.brand)}</h2>
      <div class="ad-stack">
        ${product.modules.slice(0, 5).map((module) => `<span>${esc(module)}<i></i></span>`).join("\n")}
      </div>
    </div>
  </section>
</body>
</html>`;
}

async function writeAds() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 628 }, deviceScaleFactor: 1 });
  for (const product of products) {
    const html = renderAd(product);
    const htmlPath = path.join(adDir, `${product.id}.html`);
    const pngPath = path.join(adDir, `${product.id}.png`);
    fs.writeFileSync(htmlPath, html);
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: pngPath, fullPage: false });
  }
  await browser.close();
}

async function main() {
  ensureDir(productDir);
  ensureDir(adDir);
  fs.writeFileSync(path.join(kitRoot, "index.html"), renderPortfolio());
  for (const product of products) {
    fs.writeFileSync(path.join(productDir, `${product.id}.html`), renderProductPage(product));
  }
  await writeAds();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
