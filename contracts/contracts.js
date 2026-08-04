document.documentElement.classList.add("js");

const MODES = {
  translate: {
    label: "契約翻譯",
    eyebrow: "雙語逐條對照",
    title: "先保留原文，再把契約翻成看得懂的語言。",
    intro: "適合一般合約、合作協議與服務條款。系統會以條款為單位保留原文位置，避免譯文脫離上下文。",
    facts: ["保留條款編號與原文", "區分直譯、法律用語與待確認事項", "輸出雙語對照結構"],
    result: ["原文與譯文並列", "專有名詞一致性", "模糊或缺漏文字提示"]
  },
  "lease-translate": {
    label: "租約翻譯",
    eyebrow: "租屋文件專用",
    title: "把租期、押金與修繕責任逐條對照。",
    intro: "針對住宅與商用租約整理重要條款，翻譯時優先辨識租期、租金、押金、修繕、違約與終止約定。",
    facts: ["辨識租金、押金與付款條件", "整理修繕與費用負擔", "標示提前終止與違約條款"],
    result: ["租約雙語對照", "金額與日期清單", "權利義務摘要"]
  },
  summary: {
    label: "契約摘要",
    eyebrow: "先抓住重要事項",
    title: "不用從第一頁猜到最後一頁，先看懂契約重點。",
    intro: "從文件中整理當事人、期限、金額、交付內容、責任、終止方式與爭議處理，不把摘要包裝成法律結論。",
    facts: ["整理人物、日期與金額", "列出雙方主要義務", "保留原條款定位"],
    result: ["一頁重點摘要", "期限與金額表", "仍待確認事項"]
  },
  "standard-form-check": {
    label: "定型化契約檢查",
    eyebrow: "初步條款檢查",
    title: "對照應記載與不得記載事項，找出需要再確認的條款。",
    intro: "協助辨識可能適用的定型化契約規範、疑似不利條款與資訊缺口。實際效力仍須依契約類型、主管機關公告與個案事實判斷。",
    facts: ["先確認契約類型與適用範圍", "對照應記載及不得記載事項", "分開標示規範、推論與不確定性"],
    result: ["可能適用的檢查基準", "疑似缺漏或不利條款", "建議進一步確認事項"]
  }
};

const mode = document.body.dataset.mode in MODES ? document.body.dataset.mode : "translate";
const config = MODES[mode];
const root = document.querySelector("#contract-app");

const modeLinks = Object.entries(MODES).map(([key, item], index) => `
  <a href="/contracts/${key}/"${key === mode ? ' aria-current="page"' : ""}>
    <span>0${index + 1}</span><strong>${item.label}</strong><b aria-hidden="true">→</b>
  </a>`).join("");

root.innerHTML = `
  <a class="skip-link" href="#workspace">跳到文件輸入</a>
  <header class="site-header">
    <a class="wordmark" href="/" aria-label="ChouLegal 首頁"><img src="/logo-icon.svg" width="36" height="36" alt=""><span><strong>ChouLegal</strong><small>周全法律導航</small></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="contract-nav">選單</button>
    <nav class="header-nav" id="contract-nav" aria-label="主要導覽"><a href="/issues/">解決法律問題</a><a href="/contracts/" aria-current="page">契約工具</a><a href="/learn/">法律知識</a><a href="/verification/">如何查證</a><a href="/about/">關於</a></nav>
    <a class="header-action" href="#workspace">開始整理</a>
  </header>
  <main>
    <section class="hero" aria-labelledby="page-title">
      <nav class="crumbs" aria-label="麵包屑"><a href="/">首頁</a><span aria-hidden="true">/</span><a href="/contracts/">契約工具</a><span aria-hidden="true">/</span><span>${config.label}</span></nav>
      <div class="hero-copy motion-item"><p class="eyebrow">${config.eyebrow}</p><h1 id="page-title">${config.title}</h1><p>${config.intro}</p><ol class="mode-facts">${config.facts.map((fact, index) => `<li><span>0${index + 1}</span><strong>${fact}</strong></li>`).join("")}</ol></div>
      <nav class="tool-nav motion-item" aria-label="契約工具模式"><p>選擇你現在要處理的工作</p>${modeLinks}</nav>
    </section>
    <section class="workspace" id="workspace" aria-labelledby="workspace-title">
      <div class="workspace-copy motion-item"><h2 id="workspace-title">加入你的文件</h2><p>你可以上傳 PDF、DOCX 或 TXT，也可以直接貼上文字。此測試版只在瀏覽器讀取檔名與純文字內容，不會自動上傳。</p>
        <form class="input-panel" data-contract-form novalidate>
          <div class="drop-zone" data-drop-zone><strong>拖放文件到這裡</strong><span>PDF、DOCX、TXT，單一檔案上限 20 MB</span><label class="button file-trigger" for="contract-file">選擇文件</label><input class="file-input" id="contract-file" name="contract-file" type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"></div>
          <div class="file-summary" data-file-summary><div><strong data-file-name></strong><span data-file-meta></span></div><button class="remove-file" type="button" data-remove-file>移除</button></div>
          <div class="divider">或貼上文字</div>
          <label for="contract-text">契約文字<textarea id="contract-text" name="contract-text" placeholder="貼上希望整理的契約內容"></textarea></label>
          <div class="field-grid">
            <label for="source-language">文件語言<select id="source-language" name="source-language"><option>繁體中文</option><option>英文</option><option>日文</option><option>其他語言</option></select></label>
            <label for="target-language">${mode.includes("translate") ? "翻譯為" : "文件類型"}<select id="target-language" name="target-language">${mode.includes("translate") ? "<option>繁體中文</option><option>英文</option><option>日文</option>" : "<option>一般契約</option><option>住宅租賃</option><option>服務契約</option><option>消費契約</option><option>其他</option>"}</select></label>
          </div>
          <label class="consent"><input type="checkbox" name="acknowledge" required><span>我知道這是文件整理與初步提示工具，不是律師針對個案提供的法律意見。</span></label>
          <div class="submit-row"><button class="button" type="submit">建立整理工作</button><span class="submit-note">測試版不會把文件送往伺服器</span></div>
          <p class="form-message" data-form-message role="status" aria-live="polite"></p>
        </form>
      </div>
      <aside class="result-panel motion-item" aria-labelledby="result-title"><span class="status">等待文件</span><h3 id="result-title">完成後會整理這些內容</h3><p>輸出會保留來源位置，讓你能回到原文核對，而不是只看到一段無法追溯的結論。</p><ul class="result-list">${config.result.map((item) => `<li><strong>${item}</strong><span>結果將附原文位置與需確認事項</span></li>`).join("")}</ul><div class="boundary"><strong>服務界線</strong><br>工具不判斷證據真偽、契約最終效力或個案訴訟策略。涉及重大財產、人身安全或迫切期限時，應尋求律師或法律扶助。</div></aside>
    </section>
    <section class="assurances" aria-labelledby="assurance-title"><div class="motion-item"><p class="eyebrow">在開始以前</p><h2 id="assurance-title">清楚知道資料怎麼處理，也知道工具做到哪裡。</h2></div><div class="assurance-list motion-item"><article><h3>先在本機確認</h3><p>目前入口只讀取檔案資訊及 TXT 純文字預覽，不會自動上傳 PDF 或 DOCX。</p></article><article><h3>重要結論需要來源</h3><p>未來分析結果必須標示依據、查核日期、適用範圍與仍待確認事項。</p></article><article><h3>高風險事項不逞強</h3><p>遇到效力判斷、重大爭議或證據問題時，工具會清楚建議尋求專業協助。</p></article></div></section>
  </main>
  <footer class="site-footer"><div class="footer-brand"><strong>ChouLegal</strong><p>每個人都能使用的法律導航服務。</p></div><nav class="footer-links" aria-label="頁尾導覽"><a href="/issues/">法律問題</a><a href="/contracts/">契約工具</a><a href="/learn/">法律知識</a><a href="/verification/">如何查證</a><a href="/about/">關於周全</a><a href="/privacy.html">隱私政策</a><a href="/terms.html">使用條款</a></nav><small>© 2026 ChouLegal・ChouTech 周全科技</small></footer>`;

const menuToggle = document.querySelector(".menu-toggle");
const headerNav = document.querySelector("#contract-nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = headerNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
headerNav?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  headerNav.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

const form = document.querySelector("[data-contract-form]");
const fileInput = document.querySelector("#contract-file");
const textInput = document.querySelector("#contract-text");
const dropZone = document.querySelector("[data-drop-zone]");
const fileSummary = document.querySelector("[data-file-summary]");
const fileName = document.querySelector("[data-file-name]");
const fileMeta = document.querySelector("[data-file-meta]");
const message = document.querySelector("[data-form-message]");
let selectedFile = null;

const acceptedExtensions = ["pdf", "docx", "txt"];
const showMessage = (text, tone = "info") => { message.textContent = text; message.dataset.tone = tone; };
const resetFile = () => {
  selectedFile = null;
  fileInput.value = "";
  fileSummary.classList.remove("is-visible");
  fileName.textContent = "";
  fileMeta.textContent = "";
};
const setFile = (file) => {
  const extension = file.name.split(".").pop().toLowerCase();
  if (!acceptedExtensions.includes(extension)) return showMessage("檔案格式不支援。請選擇 PDF、DOCX 或 TXT。", "error");
  if (file.size > 20 * 1024 * 1024) return showMessage("檔案超過 20 MB，請縮小後再試。", "error");
  selectedFile = file;
  fileName.textContent = file.name;
  fileMeta.textContent = `${(file.size / 1024).toLocaleString("zh-TW", { maximumFractionDigits: 1 })} KB・${extension.toUpperCase()}`;
  fileSummary.classList.add("is-visible");
  showMessage("文件已在本機加入，尚未上傳。", "info");
  if (extension === "txt") {
    const reader = new FileReader();
    reader.addEventListener("load", () => { if (!textInput.value.trim()) textInput.value = String(reader.result).slice(0, 50000); });
    reader.readAsText(file);
  }
};
fileInput?.addEventListener("change", () => fileInput.files[0] && setFile(fileInput.files[0]));
document.querySelector("[data-remove-file]")?.addEventListener("click", () => { resetFile(); showMessage("已移除文件。", "info"); });
["dragenter", "dragover"].forEach((type) => dropZone?.addEventListener(type, (event) => { event.preventDefault(); dropZone.classList.add("is-dragging"); }));
["dragleave", "drop"].forEach((type) => dropZone?.addEventListener(type, (event) => { event.preventDefault(); dropZone.classList.remove("is-dragging"); }));
dropZone?.addEventListener("drop", (event) => event.dataTransfer.files[0] && setFile(event.dataTransfer.files[0]));
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!selectedFile && !textInput.value.trim()) return showMessage("請先選擇文件或貼上契約文字。", "error");
  if (!form.elements.acknowledge.checked) return showMessage("請先確認你了解這項工具的服務界線。", "error");
  const source = selectedFile ? selectedFile.name : `${textInput.value.trim().length.toLocaleString("zh-TW")} 個字元`;
  showMessage(`已建立「${config.label}」本機工作：${source}。分析服務尚未接通，文件沒有離開這個瀏覽器。`, "info");
});

if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  const mm = window.gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    window.gsap.timeline({ defaults: { duration: .72, ease: "power3.out" } })
      .fromTo(".hero .motion-item", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, stagger: .1 })
      .set(".hero .motion-item", { clearProps: "visibility" });
    window.ScrollTrigger.batch(".workspace .motion-item, .assurances .motion-item", {
      start: "top 88%", once: true, batchMax: 3,
      onEnter: (items) => window.gsap.fromTo(items, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .08, ease: "power3.out", clearProps: "visibility" })
    });
    window.addEventListener("load", () => window.ScrollTrigger.refresh(), { once: true });
  });
} else {
  document.querySelectorAll(".motion-item").forEach((item) => { item.style.visibility = "visible"; });
}
