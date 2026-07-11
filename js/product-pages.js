var y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

var CHOULEGAL_ACCOUNT_DATA_API = "https://etp.choulegal.com/api/account/data";

function syncChouLegalEducationData(dataType, title, summary, payload) {
  return fetch(CHOULEGAL_ACCOUNT_DATA_API, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_key: "education",
      data_type: dataType,
      source: "education.static",
      title: title,
      summary: summary,
      payload: payload || {}
    })
  }).then(function (response) {
    if (response.status === 401) return { ok: false, reason: "unauthenticated" };
    return response.json().catch(function () { return { ok: response.ok }; });
  }).catch(function () {
    return { ok: false, reason: "network" };
  });
}

var professionalPresets = {
  legal: {
    title: "法遵整理結果",
    label: "輸入事件事實或工作需求",
    facts: "公司準備調整排班制度，部分員工近期提出加班費與休息日出勤異議。需判讀制度風險，並建立待補文件與回覆路徑。",
    source: "勞動基準法",
    role: "HR / 法務",
    risk: "中風險",
    riskClass: "risk-medium",
    summary: "本案風險集中於排班制度變更、加班費計算與休息日出勤紀錄。處理順序為補齊出勤紀錄、班表公告與工資計算明細，再調整制度文本。",
    docs: ["最近 6 個月出勤紀錄與排班表", "工資清冊、加班費計算明細", "工作規則與排班制度公告紀錄"],
    kit: ["事實時間線", "員工異議摘要", "公司回覆草稿與談判底線"]
  },
  lawyer: {
    title: "法律研究整理結果",
    label: "輸入案件事實、爭點或研究問題",
    facts: "客戶主張店家廣告標示不實，要求解除契約並返還價金。需建立爭點表、請求權基礎與判決檢索關鍵字。",
    source: "消費者保護法",
    role: "律師",
    risk: "中風險",
    riskClass: "risk-medium",
    summary: "本案爭點集中於廣告表示是否納入契約內容、商品或服務是否具備瑕疵、解除契約或減少價金是否具備依據。待補資料為交易頁面、廣告截圖與雙方往來紀錄。",
    docs: ["交易頁面與廣告截圖", "訂單、付款與交付紀錄", "買賣雙方訊息與客訴紀錄"],
    kit: ["爭點表", "請求權基礎清單", "判決搜尋關鍵字：廣告不實、解除契約、價金返還"]
  },
  labor: {
    title: "勞基法合規自檢結果",
    label: "輸入公司制度、員工異議或工時計算情境",
    facts: "餐飲門市採排班制，假日人力不足時要求員工延長工時，近期員工質疑休息日出勤與加班費計算方式。",
    source: "勞動基準法",
    role: "企業經營者",
    risk: "高風險",
    riskClass: "risk-high",
    summary: "本案同時涉及出勤紀錄、延長工時、休息日出勤與工資計算。紀錄不完整或制度公告不足，將提高後續舉證壓力。",
    docs: ["逐日出勤紀錄", "排班表與調班紀錄", "加班申請或主管核准紀錄", "薪資單與加班費公式"],
    kit: ["勞方異議事件包", "補件清單", "內部訪談問題", "回覆員工草稿"]
  },
  consumer: {
    title: "消保法合規自檢結果",
    label: "輸入交易流程、退換貨規則或買方異議",
    facts: "線上課程賣家於廣告頁強調保證成效，買方購買後要求退款並主張廣告內容誤導。需建立回覆草稿與合規缺口清單。",
    source: "消費者保護法",
    role: "店家 / 賣家",
    risk: "高風險",
    riskClass: "risk-high",
    summary: "風險集中於廣告表示、契約條款、退款規則與購買前揭露是否一致。廣告承諾越具體，越需要保全素材版本與購買流程紀錄。",
    docs: ["廣告頁與銷售頁歷史版本", "購買流程截圖", "服務條款與退款政策", "買方客服往來紀錄"],
    kit: ["買方異議事件包", "廣告素材盤點表", "退款回覆草稿", "合規修改清單"]
  },
  judgment: {
    title: "判決整理結果",
    label: "輸入判決搜尋關鍵字",
    facts: "廣告不實 解除契約 價金返還 消費者保護法",
    source: "公開判決資料",
    role: "律師",
    risk: "研究模式",
    riskClass: "risk-low",
    summary: "依關鍵字定位公開裁判，建立候選判決清單，並抽取事實、爭點、法院見解與可引用摘要。",
    docs: ["搜尋關鍵字組", "法院與年度篩選", "判決候選清單", "引用摘要格式"],
    kit: ["判決事實摘要", "爭點分類", "法院見解對照", "可引用段落索引"]
  }
};

var professionalExtras = {
  legal: {
    checks: [["WATCH", "排班制度變更需檢核公告程序與員工同意紀錄。"], ["WATCH", "加班費計算需回到實際出勤紀錄與薪資項目。"], ["PASS", "文件完整時，可產出內部補強清單。"]],
    judgments: [["最高法院勞動事件示例", "依爭點列出相關判決與裁判要旨。"], ["地方勞動事件判決示例", "用來比對出勤紀錄與薪資清冊的舉證方向。"]]
  },
  lawyer: {
    checks: [["PASS", "已拆出請求權基礎、抗辯與舉證資料。"], ["WATCH", "廣告內容是否構成契約內容需比對交易流程。"], ["WATCH", "退款請求需確認解除權或瑕疵擔保基礎。"]],
    judgments: [["消費爭議判決示例 A", "廣告內容與契約期待的關聯。"], ["民事買賣判決示例 B", "解除契約後價金返還與回復原狀。"]]
  },
  labor: {
    checks: [["RISK", "休息日出勤與延長工時列為最高優先風險。"], ["RISK", "出勤紀錄缺漏將提高勞方異議中的舉證壓力。"], ["WATCH", "工作規則與排班公告需確認版本與生效日。"]],
    judgments: [["勞動事件判決示例 A", "出勤紀錄與加班費舉證責任。"], ["勞動事件判決示例 B", "休息日出勤與薪資計算。"]]
  },
  consumer: {
    checks: [["RISK", "廣告保證成效可能提高契約內容爭議。"], ["WATCH", "退款政策需確認是否於購買前充分揭露。"], ["WATCH", "銷售頁版本需保存以還原購買當時資訊。"]],
    judgments: [["消費者保護判決示例 A", "廣告表示與消費者合理期待。"], ["定型化契約判決示例 B", "退款條款與顯失公平審查。"]]
  },
  judgment: {
    checks: [["PASS", "已建立搜尋關鍵字與爭點分類。"], ["WATCH", "需確認司法院資料來源、更新頻率與引用限制。"], ["PASS", "判決摘要需保留法院、年度、字號與裁判日期。"]],
    judgments: [["候選判決 001", "廣告不實、解除契約、價金返還。"], ["候選判決 002", "消保法與民法請求權競合。"], ["候選判決 003", "定型化契約與退款條款審查。"]]
  }
};

var caseDeskItems = {
  "labor-shift": {
    tool: "labor",
    title: "排班與加班費異議",
    summary: "餐飲門市採排班制，員工質疑休息日出勤與加班費計算方式。缺口集中於出勤紀錄、薪資明細與制度公告。",
    stage: "已收到異議",
    docs: "部分缺漏",
    tasks: [["補齊 6 個月出勤紀錄", "今日"], ["整理薪資與加班費公式", "明日"], ["建立員工異議時間線", "本週"]]
  },
  "consumer-ad": {
    tool: "consumer",
    title: "線上課程退款爭議",
    summary: "買方主張廣告保證成效未達成，要求退款。處理重點為銷售頁版本保全與回覆草稿。",
    stage: "準備回覆或談判",
    docs: "尚未整理",
    tasks: [["保存廣告頁版本", "今日"], ["整理客服往來紀錄", "今日"], ["產出退款回覆草稿", "明日"]]
  },
  "judgment-research": {
    tool: "judgment",
    title: "廣告不實判決整理",
    summary: "研究廣告表示是否影響契約內容，以及解除契約、價金返還相關判決方向。",
    stage: "事前合規檢查",
    docs: "完整",
    tasks: [["建立關鍵字組", "今日"], ["整理候選判決", "明日"], ["整理法院見解對照", "本週"]]
  }
};

function setList(list, items) {
  if (!list) return;
  list.innerHTML = "";
  items.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function setMatrix(node, rows) {
  if (!node) return;
  node.innerHTML = "";
  rows.forEach(function (row) {
    var status = row[0];
    var text = row[1];
    var item = document.createElement("div");
    item.className = "matrix-row";
    var statusClass = status === "PASS" ? "status-pass" : status === "RISK" ? "status-risk" : "status-watch";
    item.innerHTML = "<span class=\"matrix-status " + statusClass + "\">" + status + "</span><p>" + text + "</p>";
    node.appendChild(item);
  });
}

function setJudgments(node, rows) {
  if (!node) return;
  node.innerHTML = "";
  rows.forEach(function (row) {
    var item = document.createElement("div");
    item.className = "judgment-item";
    item.innerHTML = "<b>" + row[0] + "</b><p>" + row[1] + "</p>";
    node.appendChild(item);
  });
}

function initProfessionalWorkbench() {
  var root = document.querySelector("[data-professional-app]");
  if (!root) return;

  var form = root.querySelector("[data-professional-form]");
  var tabs = root.querySelectorAll("[data-tool]");
  var currentTool = "legal";
  var title = root.querySelector(".output-head h3");
  var label = root.querySelector("[data-facts-label]");
  var risk = root.querySelector("[data-risk-label]");
  var summary = root.querySelector("[data-summary]");
  var docs = root.querySelector("[data-doc-list]");
  var kit = root.querySelector("[data-kit-list]");
  var disclaimer = root.querySelector("[data-disclaimer]");
  var matrix = root.querySelector("[data-check-matrix]");
  var judgments = root.querySelector("[data-judgment-list]");
  var fileInput = root.querySelector("[data-file-input]");
  var fileList = root.querySelector("[data-file-list]");
  var copyButton = root.querySelector("[data-copy-output]");
  var downloadButton = root.querySelector("[data-download-output]");
  var actionStatus = root.querySelector("[data-action-status]");
  var uploadedFiles = [];

  function applyPreset(tool, keepFacts) {
    var preset = professionalPresets[tool] || professionalPresets.legal;
    currentTool = tool;
    tabs.forEach(function (tab) {
      tab.classList.toggle("is-active", tab.getAttribute("data-tool") === tool);
    });
    title.textContent = preset.title;
    label.textContent = preset.label;
    risk.textContent = preset.risk;
    risk.className = "risk-badge " + preset.riskClass;
    summary.textContent = preset.summary;
    setList(docs, preset.docs);
    setList(kit, preset.kit);
    setMatrix(matrix, professionalExtras[tool].checks);
    setJudgments(judgments, professionalExtras[tool].judgments);
    actionStatus.textContent = "尚未匯出";
    disclaimer.textContent = "本頁為產品展示。進階功能包含資料來源配置、權限控管與人工覆核流程；本頁內容不構成法律意見。";
    if (!keepFacts) {
      form.elements.facts.value = preset.facts;
      form.elements.source.value = preset.source;
      form.elements.role.value = preset.role;
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      applyPreset(tab.getAttribute("data-tool"), false);
    });
  });

  var sample = root.querySelector("[data-load-sample]");
  if (sample) {
    sample.addEventListener("click", function () {
      applyPreset(currentTool, false);
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      uploadedFiles = Array.prototype.slice.call(fileInput.files || []).map(function (file) {
        return file.name;
      });
      setList(fileList, uploadedFiles.length ? uploadedFiles : ["尚未選擇文件"]);
    });
  }

  function payload() {
    var preset = professionalPresets[currentTool] || professionalPresets.legal;
    return {
      module: preset.title,
      role: form.elements.role.value,
      source: form.elements.source.value,
      stage: form.elements.stage.value,
      documentState: form.elements.docs.value,
      facts: form.elements.facts.value.trim(),
      uploadedFiles: uploadedFiles,
      risk: risk.textContent,
      summary: summary.textContent,
      documents: Array.prototype.map.call(docs.querySelectorAll("li"), function (li) { return li.textContent; }),
      eventKit: Array.prototype.map.call(kit.querySelectorAll("li"), function (li) { return li.textContent; })
    };
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var text = payload().summary;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          actionStatus.textContent = "已複製摘要";
        }).catch(function () {
          actionStatus.textContent = "瀏覽器阻擋複製，請手動選取摘要";
        });
      } else {
        actionStatus.textContent = "此瀏覽器不支援自動複製";
      }
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(payload(), null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "choulegal-event-kit-demo.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      actionStatus.textContent = "已下載事件包 JSON";
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var preset = professionalPresets[currentTool] || professionalPresets.legal;
    var facts = form.elements.facts.value.trim();
    var stage = form.elements.stage.value;
    var docsState = form.elements.docs.value;
    var riskClass = preset.riskClass;
    var riskText = preset.risk;

    if (stage !== "事前合規檢查" || docsState !== "完整") {
      riskClass = currentTool === "judgment" ? "risk-low" : "risk-high";
      riskText = currentTool === "judgment" ? "研究模式" : "高風險";
    } else if (facts.length < 36) {
      riskClass = "risk-medium";
      riskText = currentTool === "judgment" ? "研究模式" : "中風險";
    }

    risk.textContent = riskText;
    risk.className = "risk-badge " + riskClass;
    summary.textContent = preset.summary + " 系統已依「" + stage + "」與「文件完整度：" + docsState + "」重排處理順序。";
    setList(docs, preset.docs.concat(docsState === "完整" ? ["建立版本紀錄與最後更新日期"] : ["補齊缺漏文件並標示來源"]));
    setList(kit, preset.kit.concat(["下一步：安排人工覆核並指定責任窗口"]));
    setMatrix(matrix, professionalExtras[currentTool].checks);
    setJudgments(judgments, professionalExtras[currentTool].judgments);
    actionStatus.textContent = "已重新生成";
  });

  applyPreset("legal", true);
}

function initCaseDesk() {
  var root = document.querySelector("[data-case-desk]");
  var workbench = document.querySelector("[data-professional-app]");
  if (!root || !workbench) return;

  var cards = root.querySelectorAll("[data-case]");
  var title = root.querySelector("[data-case-title]");
  var summary = root.querySelector("[data-case-summary]");
  var taskBoard = root.querySelector("[data-task-board]");
  var loadButton = root.querySelector("[data-load-case]");
  var selected = "labor-shift";

  function renderCase(id) {
    var data = caseDeskItems[id];
    if (!data) return;
    selected = id;
    cards.forEach(function (card) {
      card.classList.toggle("is-active", card.getAttribute("data-case") === id);
    });
    title.textContent = data.title;
    summary.textContent = data.summary;
    taskBoard.innerHTML = "";
    data.tasks.forEach(function (task, index) {
      var item = document.createElement("label");
      item.className = "task-item";
      item.innerHTML = "<input type=\"checkbox\" " + (index === 0 ? "checked" : "") + "><span>" + task[0] + "</span><small>" + task[1] + "</small>";
      taskBoard.appendChild(item);
    });
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      renderCase(card.getAttribute("data-case"));
    });
  });

  loadButton.addEventListener("click", function () {
    var data = caseDeskItems[selected];
    if (!data) return;
    var tab = workbench.querySelector("[data-tool=" + data.tool + "]");
    if (tab) tab.click();
    var form = workbench.querySelector("[data-professional-form]");
    form.elements.facts.value = data.summary;
    form.elements.stage.value = data.stage;
    form.elements.docs.value = data.docs;
    form.requestSubmit();
    document.getElementById("workbench").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  renderCase(selected);
}

var educationItems = [
  {
    id: "contract-formation",
    title: "契約成立與意思表示",
    audience: "exam",
    subject: "civil",
    summary: "從要約、承諾、意思表示瑕疵切入，是民法總則與債編共同的起點。",
    tags: ["民法", "總則", "契約"],
    points: ["區分要約與要約引誘", "確認承諾是否到達", "檢查錯誤、詐欺、脅迫等瑕疵"]
  },
  {
    id: "rescission-refund",
    title: "解除契約與價金返還",
    audience: "public",
    subject: "civil",
    summary: "用生活案例理解解除契約、回復原狀與價金返還，適合銜接消費爭議工具。",
    tags: ["民法", "消費", "退款"],
    points: ["確認解除權來源", "整理給付與受領狀態", "計算回復原狀與返還範圍"]
  },
  {
    id: "overtime-pay",
    title: "加班費與休息日出勤",
    audience: "public",
    subject: "labor",
    summary: "把工時、休息日、延長工時與薪資計算分開處理，避免不同爭議混在一起。",
    tags: ["勞動法", "加班費", "工時"],
    points: ["確認正常工時與延長工時", "區分休息日、例假與國定假日", "回到出勤紀錄與薪資明細"]
  },
  {
    id: "labor-dispute-proof",
    title: "勞資爭議的舉證資料",
    audience: "exam",
    subject: "labor",
    summary: "整理出勤紀錄、薪資清冊、工作規則與主管指示在爭議中的功能。",
    tags: ["勞動法", "舉證", "爭點"],
    points: ["建立時間線", "列出雇主與勞工各自掌握的資料", "判斷哪些文件可以補強主張"]
  },
  {
    id: "consumer-ad",
    title: "廣告表示與消費者期待",
    audience: "public",
    subject: "consumer",
    summary: "店家廣告、商品頁、銷售話術是否會影響契約內容，是消費爭議常見入口。",
    tags: ["消保法", "廣告", "店家"],
    points: ["保存廣告素材版本", "比對購買流程中的揭露內容", "判斷消費者合理期待是否被影響"]
  },
  {
    id: "standard-contract",
    title: "定型化契約條款審查",
    audience: "exam",
    subject: "consumer",
    summary: "從條款納入、審閱期間、顯失公平與主管機關公告事項建立分析順序。",
    tags: ["消保法", "定型化契約", "爭點"],
    points: ["確認條款是否納入契約", "檢查審閱期間與揭露方式", "判斷是否顯失公平"]
  }
];

var quizItems = [
  {
    question: "店家廣告頁寫「保證三週內達成效果」，消費者購買後主張未達成而要求退款。第一批檢核資料為何？",
    options: ["廣告頁與購買流程中實際揭露的內容", "店家主觀上是否想退款", "消費者購買後是否後悔"],
    answer: 0,
    explain: "消費者購買前看到的廣告與契約內容，是判斷合理期待與契約義務的基礎。"
  },
  {
    question: "員工主張休息日出勤加班費短少，公司第一批應整理哪些資料？",
    options: ["出勤紀錄、排班表、薪資明細與加班費公式", "公司品牌手冊", "所有員工的私人聊天紀錄"],
    answer: 0,
    explain: "勞動爭議須回到出勤、排班與薪資計算資料，避免主張停留在口頭對立。"
  },
  {
    question: "國考整理爭點時，最不適合的順序是哪一個？",
    options: ["背結論後再依題目找法條", "先找問題意識", "再接法條、實務見解與學說"],
    answer: 0,
    explain: "只背結論容易失去爭點脈絡；比較穩的是從問題意識開始，接到法條與見解。"
  }
];

function initEducationLibrary() {
  var root = document.querySelector("[data-education-app]");
  if (!root) return;

  var search = root.querySelector("[data-library-search]");
  var chips = root.querySelectorAll("[data-filter]");
  var results = root.querySelector("[data-library-results]");
  var savedList = root.querySelector("[data-saved-list]");
  var path = root.querySelector("[data-learning-path]");
  var detailTitle = root.querySelector("[data-detail-title]");
  var detailBody = root.querySelector("[data-detail-body]");
  var detailPoints = root.querySelector("[data-detail-points]");
  var progressBar = root.querySelector("[data-progress-bar]");
  var progressText = root.querySelector("[data-progress-text]");
  var syncStatus = root.querySelector("[data-education-sync-status]");
  var activeFilter = "all";
  var saved = [];
  var syncTimer = null;

  try {
    saved = JSON.parse(localStorage.getItem("choulegalEducationSaved") || "[]");
  } catch (err) {
    saved = [];
  }

  function matches(item, query) {
    var haystack = [item.title, item.summary].concat(item.tags).join(" ").toLowerCase();
    var filterOk = activeFilter === "all" || item.audience === activeFilter || item.subject === activeFilter;
    return filterOk && haystack.indexOf(query.toLowerCase()) !== -1;
  }

  function renderSaved() {
    savedList.innerHTML = "";
    var percent = Math.round((saved.length / educationItems.length) * 100);
    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.textContent = saved.length + " / " + educationItems.length + " 已加入複習";
    try {
      localStorage.setItem("choulegalEducationSaved", JSON.stringify(saved));
    } catch (err) {}
    if (!saved.length) {
      var empty = document.createElement("li");
      empty.textContent = "尚未加入內容";
      savedList.appendChild(empty);
      return;
    }
    saved.forEach(function (title) {
      var li = document.createElement("li");
      li.textContent = title;
      savedList.appendChild(li);
    });
  }

  function setSyncStatus(text) {
    if (syncStatus) syncStatus.textContent = text;
  }

  function scheduleProgressSync(reason) {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      syncChouLegalEducationData(
        "course_progress",
        "法律教育平台閱讀進度",
        saved.length + " / " + educationItems.length + " 已加入複習",
        {
          reason: reason || "progress_update",
          savedTitles: saved,
          total: educationItems.length,
          updatedAt: new Date().toISOString()
        }
      ).then(function (result) {
        setSyncStatus(result.ok ? "已同步到周全帳號。" : "本機已儲存；登入周全帳號後可同步。");
      });
    }, 450);
  }

  function showDetail(item) {
    detailTitle.textContent = item.title;
    detailBody.textContent = item.summary + " 這張卡可連到完整條文、判決、題目與相關工具。";
    detailPoints.innerHTML = "";
    item.points.forEach(function (point) {
      var li = document.createElement("li");
      li.textContent = point;
      detailPoints.appendChild(li);
    });
  }

  function render() {
    var query = search.value.trim();
    var visible = educationItems.filter(function (item) {
      return matches(item, query);
    });

    results.innerHTML = "";
    if (!visible.length) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "未找到符合條件的內容。請調整關鍵字或篩選條件。";
      results.appendChild(empty);
    }

    visible.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "knowledge-card";
      card.innerHTML =
        "<div class=\"card-meta\">" +
        item.tags.map(function (tag) { return "<span>" + tag + "</span>"; }).join("") +
        "</div>" +
        "<h3>" + item.title + "</h3>" +
        "<p>" + item.summary + "</p>" +
        "<div class=\"card-actions\">" +
        "<button class=\"card-action\" type=\"button\" data-open=\"" + item.id + "\">查看詳情</button>" +
        "<button class=\"card-action\" type=\"button\" data-save=\"" + item.id + "\">" + (saved.indexOf(item.title) === -1 ? "加入複習" : "已加入") + "</button>" +
        "</div>";
      results.appendChild(card);
    });

    var pathText = {
      all: "從「契約成立」開始，接到「解除契約」與「價金返還」，最後看消費爭議中的廣告表示問題。",
      public: "生活案例連回民眾版工具：加班費、退款、繼承與租屋爭議皆可沿此路線閱讀。",
      exam: "體系建立後連接爭點：概念、條文、實務見解與答題方向需放在同一張地圖。",
      civil: "民法路線：意思表示、契約成立、解除契約、回復原狀與損害賠償。",
      labor: "勞動法路線：工時、工資、休假、資遣與舉證資料。",
      consumer: "消保法路線：廣告表示、定型化契約、退換貨、價金返還與店家合規。"
    };
    path.textContent = pathText[activeFilter] || pathText.all;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      activeFilter = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.classList.toggle("is-active", c === chip); });
      render();
    });
  });

  search.addEventListener("input", render);

  results.addEventListener("click", function (event) {
    var openButton = event.target.closest("[data-open]");
    if (openButton) {
      var detailItem = educationItems.find(function (entry) {
        return entry.id === openButton.getAttribute("data-open");
      });
      if (detailItem) showDetail(detailItem);
      return;
    }

    var button = event.target.closest("[data-save]");
    if (!button) return;
    var item = educationItems.find(function (entry) {
      return entry.id === button.getAttribute("data-save");
    });
    if (item && saved.indexOf(item.title) === -1) {
      saved.push(item.title);
      button.textContent = "已加入";
      renderSaved();
      syncChouLegalEducationData(
        "education_bookmark",
        item.title,
        item.summary,
        { itemId: item.id, tags: item.tags, subject: item.subject, audience: item.audience }
      ).then(function (result) {
        setSyncStatus(result.ok ? "收藏已同步到周全帳號。" : "收藏已存本機；登入後可同步。");
      });
      scheduleProgressSync("bookmark_added");
    }
  });

  render();
  renderSaved();
  showDetail(educationItems[0]);
}

function initPractice() {
  var root = document.querySelector("[data-practice-app]");
  if (!root) return;

  var question = root.querySelector("[data-quiz-question]");
  var options = root.querySelector("[data-quiz-options]");
  var feedback = root.querySelector("[data-quiz-feedback]");
  var next = root.querySelector("[data-next-question]");
  var exportNotes = root.querySelector("[data-export-notes]");
  var note = root.querySelector("[data-note-text]");
  var status = root.querySelector("[data-practice-status]");
  var index = 0;
  var noteSyncTimer = null;

  function renderQuiz() {
    var quiz = quizItems[index];
    question.textContent = quiz.question;
    options.innerHTML = "";
    feedback.textContent = "選擇答案後，此處顯示解析。";
    quiz.options.forEach(function (option, optionIndex) {
      var button = document.createElement("button");
      button.className = "quiz-option";
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", function () {
        var correct = optionIndex === quiz.answer;
        options.querySelectorAll(".quiz-option").forEach(function (btn, idx) {
          btn.classList.toggle("is-correct", idx === quiz.answer);
          btn.classList.toggle("is-wrong", idx === optionIndex && !correct);
        });
        feedback.textContent = (correct ? "答對。" : "尚未答對。") + quiz.explain;
        status.textContent = correct ? "已完成本題" : "已顯示解析";
        syncChouLegalEducationData(
          "course_progress",
          "法律教育平台示範題進度",
          correct ? "已完成本題" : "已查看解析",
          {
            question: quiz.question,
            selected: option,
            correct: correct,
            answer: quiz.options[quiz.answer],
            updatedAt: new Date().toISOString()
          }
        );
      });
      options.appendChild(button);
    });
  }

  next.addEventListener("click", function () {
    index = (index + 1) % quizItems.length;
    renderQuiz();
    status.textContent = "已切換下一題";
  });

  exportNotes.addEventListener("click", function () {
    var blob = new Blob([note.value], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "choulegal-study-notes.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    status.textContent = "已下載筆記";
    syncChouLegalEducationData(
      "education_note",
      "法律教育平台複習筆記",
      "讀者從教育平台匯出的複習筆記",
      { text: note.value, exportedAt: new Date().toISOString() }
    ).then(function (result) {
      status.textContent = result.ok ? "已下載並同步筆記" : "已下載筆記；登入後可同步";
    });
  });

  note.addEventListener("input", function () {
    clearTimeout(noteSyncTimer);
    noteSyncTimer = setTimeout(function () {
      syncChouLegalEducationData(
        "education_note",
        "法律教育平台複習筆記草稿",
        "自動儲存的筆記草稿",
        { text: note.value, updatedAt: new Date().toISOString() }
      ).then(function (result) {
        if (result.ok) status.textContent = "筆記草稿已同步";
      });
    }, 1200);
  });

  renderQuiz();
}

if (typeof IntersectionObserver !== "undefined") {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });

  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });

  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add("is-visible");
    });
  }, 1600);
} else {
  document.querySelectorAll(".reveal").forEach(function (el) {
    el.classList.add("is-visible");
  });
}

initProfessionalWorkbench();
initCaseDesk();
initEducationLibrary();
initPractice();
