const STORAGE_KEY = "choucounselWorkspaceV1";
const LEGACY_MATTER_KEY = "choucounselDraftMatters";
const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
const MAX_IMPORT_CASES = 500;
const MAX_IMPORT_TEXT_LENGTH = 20000;
const CLOUD_CONFIG_ENDPOINT = "/api/choucounsel-public-config";
const CLOUD_SNAPSHOT_ENDPOINT = "/api/choucounsel-snapshot";
const CLOUD_WORKSPACES_ENDPOINT = "/api/choucounsel-workspaces";

function taipeiTodayISO() {
  const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const TODAY = taipeiTodayISO();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const clone = (value) => JSON.parse(JSON.stringify(value));
const makeId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;

function cleanInput(value, fallback = "") {
  const cleaned = String(value || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
  return cleaned || fallback;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseNumber(value, fallback = 0) {
  const number = Number.parseFloat(String(value || "").replaceAll(",", ""));
  return Number.isFinite(number) ? number : fallback;
}

function parsePositiveNumber(value, label, fallback) {
  const raw = String(value ?? "").trim();
  const number = raw ? Number.parseFloat(raw.replaceAll(",", "")) : fallback;
  if (!Number.isFinite(number) || number <= 0) throw new Error(`${label}必須大於 0。`);
  return number;
}

function parseNonNegativeNumber(value, label, fallback = 0) {
  const raw = String(value ?? "").trim();
  const number = raw ? Number.parseFloat(raw.replaceAll(",", "")) : fallback;
  if (!Number.isFinite(number) || number < 0) throw new Error(`${label}不得為負數或非數字。`);
  return number;
}

function assertISODate(value, label = "日期") {
  const text = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error(`${label}格式不正確。`);
  const [year, month, day] = text.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`${label}不是有效日期。`);
  }
  return text;
}

function formatMoney(value) {
  return `NT$ ${Math.round(value).toLocaleString("zh-TW")}`;
}

function shortDate(value) {
  if (!value) return "未排定";
  const parts = String(value).split("-");
  return parts.length === 3 ? `${parts[1]}/${parts[2]}` : value;
}

function dateText(value, label = "") {
  return `${shortDate(value)} ${label}`.trim();
}

function timestampText() {
  return new Date().toLocaleString("zh-TW", { hour12: false });
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

async function sha256Hex(value) {
  if (!window.crypto?.subtle) throw new Error("瀏覽器不支援備份完整性驗證。");
  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function backupPayloadForHash(backup) {
  const { backupManifest, ...payload } = backup;
  return payload;
}

async function buildWorkspaceBackup() {
  const backup = clone(state);
  backup.backupManifest = {
    schema: "choucounsel-workspace-backup",
    schemaVersion: 2,
    exportedAt: new Date().toISOString(),
    caseCount: backup.cases.length,
    documentCount: allDocuments().length,
    billingCount: allBillings().length,
    templateCount: backup.templates.length,
    auditLogCount: backup.auditLog.length,
    integritySha256: ""
  };
  backup.backupManifest.integritySha256 = await sha256Hex(stableStringify(backupPayloadForHash(backup)));
  return backup;
}

function daysUntil(value) {
  if (!value) return 999;
  const date = new Date(`${value}T00:00:00+08:00`);
  const today = new Date(`${TODAY}T00:00:00+08:00`);
  return Math.ceil((date - today) / 86400000);
}

function chipClass(value) {
  if (["高", "urgent", "逾期", "未完成", "新案待檢查", "待律師確認"].includes(value)) return "red";
  if (["中", "進行中", "待補", "待核對", "待律師核對", "草稿"].some((text) => String(value).includes(text))) return "gold";
  return "teal";
}

function defaultWorkspace() {
  return {
    workspace: {
      firmName: "周全聯合法律事務所",
      plan: "團隊",
      seats: 12,
      capacity: "容量備註：200 件進行中案件、每月 1,000 份文件處理量",
      defaultRate: 7200,
      invoicePrefix: "CC",
      lastBackupAt: "",
      lastHandoffAt: "",
      dataBoundary: "ChouCounsel 案件與卷證資料不得與民眾權益查詢資料混用。"
    },
    cases: demoCases(),
    templates: [
      {
        id: "tpl-answer",
        name: "民事答辯狀",
        type: "訴訟",
        body: "含事實欄、爭點整理、證據目錄與引用待核對區。",
        content: "一、案件概要\n二、當事人主張\n三、爭點整理\n四、證據目錄\n五、待律師核對事項"
      },
      {
        id: "tpl-mediation",
        name: "調解策略備忘錄",
        type: "家事 / 民事",
        body: "整理底線、讓步範圍、風險與對方可能主張。",
        content: "一、調解目標\n二、可接受方案\n三、不可讓步事項\n四、對方可能主張\n五、待補資料"
      },
      {
        id: "tpl-privacy",
        name: "個資事件應變清單",
        type: "企業顧問",
        body: "鎖定資料欄位、通知義務、對外聲明與內部保存紀錄。",
        content: "一、已確認事實\n二、尚待鑑識事項\n三、受影響資料範圍\n四、通知與通報判斷\n五、對外聲明限制"
      },
      {
        id: "tpl-lease",
        name: "租約紅旗條款摘要",
        type: "契約審查",
        body: "標記提前終止、違約金、共同費用與營業限制。",
        content: "一、重大法律風險\n二、商務談判項目\n三、建議修約文字\n四、需客戶決策事項"
      }
    ],
    auditLog: [
      { at: "2026-07-17 09:00", actor: "系統", action: "建立示範工作區" }
    ]
  };
}

function demoCases() {
  return [
    makeCase({
      id: "CL-2468",
      title: "勝衡科技供應契約爭議",
      client: "勝衡科技股份有限公司",
      type: "民事訴訟",
      category: "litigation",
      urgency: "urgent",
      deadlineDate: "2026-07-22",
      deadlineLabel: "答辯期限",
      risk: "高",
      riskNote: "對方已提出假扣押聲請線索，需先確認付款紀錄與交貨瑕疵證據。",
      status: "答辯準備",
      summary: "供應商主張尾款與違約金，客戶主張瑕疵、逾期交貨與驗收保留。今日重點是完成答辯狀架構與證據清單。",
      docType: "民事答辯狀",
      citationStatus: "卷證待核對",
      parties: [
        ["勝衡科技股份有限公司", "客戶", "我方", "委任人"],
        ["承曜材料有限公司", "供應商", "對造", "主張尾款與違約金"],
        ["華橋電子股份有限公司", "關係企業", "第三方", "曾出現在前案供應鏈"]
      ],
      tasks: [
        ["核對 4 張發票與付款紀錄", "2026-07-17", "未完成", "高"],
        ["確認瑕疵通知是否符合契約期限", "2026-07-18", "進行中", "高"],
        ["整理證據編號與附件目錄", "2026-07-21", "未完成", "中"]
      ],
      evidence: [
        ["供應契約 v3", "PDF", "已上傳", "主契約與附件"],
        ["驗收保留紀錄", "Excel", "待補", "缺 6 月資料"],
        ["往來信件壓縮檔", "ZIP", "待分類", "需整理寄件人"],
        ["付款明細", "CSV", "待核對", "金額待覆核"]
      ],
      billing: [
        ["2026-07-15", "承辦律師", "答辯架構與證據整理", 3.5, 7200],
        ["2026-07-16", "法務助理", "發票與附件編號", 2.0, 2600],
        ["2026-07-17", "合夥律師", "假扣押風險討論", 1.2, 12000]
      ],
      next: ["請客戶補交 6 月驗收資料", "完成答辯狀證據編號", "確認假扣押聲請是否已繫屬"]
    }),
    makeCase({
      id: "CL-2471",
      title: "沈家遺產分割協議",
      client: "沈小姐與三名繼承人",
      type: "家事事件",
      category: "litigation",
      deadlineDate: "2026-07-25",
      deadlineLabel: "調解前會議",
      risk: "中",
      riskNote: "不動產估價與特留分主張仍不明確，需避免協議文字過早定稿。",
      status: "調解準備",
      summary: "繼承人對不動產分配、照護支出與存款流向有爭議。工作台已整理資產清單與待補資料。",
      docType: "分割協議草稿",
      citationStatus: "事實待補",
      parties: [
        ["沈小姐", "客戶", "我方", "主要聯絡人"],
        ["沈先生", "繼承人", "相對方", "對照護費有爭議"],
        ["沈太太", "繼承人", "相對方", "需確認同意範圍"]
      ],
      tasks: [
        ["補不動產謄本與估價", "2026-07-19", "進行中", "中"],
        ["列出照護支出憑證", "2026-07-20", "未完成", "中"],
        ["標記可能讓步範圍", "2026-07-23", "未完成", "中"]
      ],
      evidence: [
        ["戶籍謄本", "PDF", "已上傳", "繼承人資料"],
        ["不動產權狀", "PDF", "待補", "缺最新謄本"],
        ["銀行交易明細", "PDF", "待分類", "需按年份分類"],
        ["照護費收據", "Image", "待核對", "金額與日期待確認"]
      ],
      billing: [
        ["2026-07-15", "承辦律師", "資產清單整理", 2.5, 7200],
        ["2026-07-16", "法務助理", "戶籍與權狀檢查", 3.0, 2600]
      ],
      next: ["補最新不動產謄本", "請當事人確認照護支出", "準備兩版調解方案"]
    }),
    makeCase({
      id: "CL-2474",
      title: "信遠醫材個資事件應變",
      client: "信遠醫材有限公司",
      type: "企業顧問",
      category: "advisory",
      urgency: "urgent",
      deadlineDate: "2026-07-19",
      deadlineLabel: "對外聲明",
      risk: "高",
      riskNote: "涉及客戶個資外洩疑慮，需確認事件範圍、通知義務與對外說明一致性。",
      status: "危機處理",
      summary: "客戶客服系統疑似發生未授權匯出。工作台先集中事件時序、受影響資料類型與通知草稿。",
      docType: "事件應變備忘錄",
      citationStatus: "法源待核對",
      parties: [
        ["信遠醫材有限公司", "客戶", "我方", "資料控制者"],
        ["客服委外廠商", "供應商", "第三方", "需審委外契約"],
        ["受影響客戶群", "資料主體", "第三方", "人數待確認"]
      ],
      tasks: [
        ["確認受影響資料欄位", "2026-07-17", "進行中", "高"],
        ["審閱客服委外契約", "2026-07-17", "未完成", "高"],
        ["準備主管機關通報判斷", "2026-07-18", "未完成", "高"]
      ],
      evidence: [
        ["事件時序表", "Doc", "已建立", "初步版本"],
        ["客服系統 log", "CSV", "待上傳", "需客戶提供"],
        ["委外契約", "PDF", "待審", "通報條款待確認"],
        ["對外聲明草稿", "Doc", "草稿", "不得過度保證"]
      ],
      billing: [
        ["2026-07-16", "資深律師", "事件時序與通知判斷", 4.0, 9000],
        ["2026-07-17", "合夥律師", "對外聲明審閱", 1.5, 12000]
      ],
      next: ["取得客服系統 log", "刪除聲明中的過度保證語句", "核對個資事件通知義務"]
    }),
    makeCase({
      id: "CL-2480",
      title: "禾林餐飲展店租約審查",
      client: "禾林餐飲集團",
      type: "契約審查",
      category: "advisory",
      deadlineDate: "2026-07-28",
      deadlineLabel: "修約回覆",
      risk: "中",
      riskNote: "裝修期、提前終止與商場共同費用條款需要重寫。",
      status: "條款審閱",
      summary: "商場提供新版租約，客戶預計展店三處。系統已標記共同費用、裝修期與違約金條款。",
      docType: "租約審查意見",
      citationStatus: "商務條款",
      parties: [
        ["禾林餐飲集團", "客戶", "我方", "承租方"],
        ["德安商場股份有限公司", "出租方", "對造", "三處展店"],
        ["裝修承包商", "供應商", "第三方", "工期待確認"]
      ],
      tasks: [
        ["重寫提前終止條款", "2026-07-22", "進行中", "中"],
        ["確認裝修免租期", "2026-07-23", "未完成", "中"],
        ["列出共同費用上限", "2026-07-24", "未完成", "中"]
      ],
      evidence: [
        ["租約主文", "PDF", "已審", "已標紅旗"],
        ["商場附件", "PDF", "待審", "共同費用附件"],
        ["展店時程", "Sheet", "已上傳", "三處時程"],
        ["修約意見表", "Doc", "草稿", "待合夥律師確認"]
      ],
      billing: [
        ["2026-07-15", "承辦律師", "租約紅旗條款", 3.0, 7200],
        ["2026-07-16", "法務助理", "附件整理", 2.5, 2600]
      ],
      next: ["確認展店時程是否可延期", "補共同費用上限文字", "整理出租方可接受替代條款"]
    })
  ];
}

function makeCase(input) {
  const deadline = input.deadline || dateText(input.deadlineDate, input.deadlineLabel);
  return {
    id: input.id,
    title: input.title,
    client: input.client,
    type: input.type,
    category: input.category || categoryFromType(input.type),
    urgency: input.urgency || (input.risk === "高" ? "urgent" : "normal"),
    deadline,
    deadlineDate: input.deadlineDate || "",
    deadlineLabel: input.deadlineLabel || "",
    risk: input.risk || "中",
    riskNote: input.riskNote || "仍需補齊資料後由律師確認風險。",
    status: input.status || "新案草稿",
    summary: input.summary || "尚待補充案件事實、當事人資料、期限與已收到文件。",
    docType: input.docType || `${input.type}初步備忘錄`,
    docTitle: input.docTitle || `${input.title}初步評估草稿`,
    docNote: input.docNote || "此文件尚未經承辦律師審閱或引用核對。",
    citationStatus: input.citationStatus || "待律師核對",
    conflictStatus: input.conflictStatus || "待檢查",
    conflictNote: input.conflictNote || "需補齊對造、關係企業與前案名稱後才可完成利益衝突判斷。",
    parties: (input.parties || []).map(([name, role, side, notes]) => ({ id: makeId("pty"), name, role, side, notes })),
    timeline: [
      { id: makeId("evt"), date: TODAY, title: "建立案件管理空間", owner: "工作台" },
      { id: makeId("evt"), date: input.deadlineDate || TODAY, title: input.deadlineLabel || "下一個期限", owner: "承辦律師" }
    ],
    tasks: (input.tasks || []).map(([title, due, status, priority]) => ({ id: makeId("tsk"), title, due, status, priority })),
    evidence: (input.evidence || []).map(([title, type, status, note]) => ({ id: makeId("evd"), title, type, status, note })),
    ai: [
      { title: "爭點摘要", body: inferIssueSummary(input.type, input.summary) },
      { title: "誠實限制", body: "AI 摘要僅能作為工作底稿；未完成卷證、法源與律師人工核對前，不應輸出正式法律意見。" },
      { title: "建議動作", body: (input.next || ["補齊資料"])[0] }
    ],
    next: input.next || ["補齊資料", "檢查利益衝突", "確認委任範圍"],
    documents: [
      {
        id: makeId("doc"),
        title: input.docTitle || `${input.title}初步評估草稿`,
        type: input.docType || `${input.type}初步備忘錄`,
        status: "草稿",
        note: input.docNote || "尚未經承辦律師審閱。",
        content: ""
      }
    ],
    billing: (input.billing || []).map(([date, person, description, hours, rate]) => ({
      id: makeId("bil"),
      date,
      person,
      description,
      hours,
      rate,
      billable: true
    }))
  };
}

function inferIssueSummary(type, summary) {
  if (type === "民事訴訟") return "先整理請求權基礎、抗辯、證據缺口與程序期限。";
  if (type === "家事事件") return "先區分可憑證事實、當事人陳述與調解策略。";
  if (type === "企業顧問") return "先確認已發生事實、對外說明限制與主管機關風險。";
  return summary || "先標記重大條款、商務讓步與需客戶決策事項。";
}

function categoryFromType(type) {
  return type === "民事訴訟" || type === "家事事件" ? "litigation" : "advisory";
}

function readLegacyDrafts() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(LEGACY_MATTER_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadState() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (saved?.cases?.length) return normalizeState(saved);
  } catch {
    // Ignore invalid local data and fall back to sample state.
  }
  const state = defaultWorkspace();
  const existingIds = new Set(state.cases.map((item) => item.id));
  readLegacyDrafts().forEach((draft) => {
    if (!existingIds.has(draft.id)) state.cases.unshift(convertLegacyCase(draft));
  });
  return normalizeState(state);
}

function normalizeState(value) {
  const base = defaultWorkspace();
  const state = {
    workspace: { ...base.workspace, ...(value.workspace || {}) },
    cases: Array.isArray(value.cases) ? value.cases : base.cases,
    templates: Array.isArray(value.templates) ? value.templates : base.templates,
    auditLog: Array.isArray(value.auditLog) ? value.auditLog : base.auditLog
  };
  state.cases = state.cases.map((item) => ({
    ...makeCase({
      id: item.id,
      title: item.title,
      client: item.client,
      type: item.type,
      category: item.category,
      urgency: item.urgency,
      deadlineDate: item.deadlineDate,
      deadlineLabel: item.deadlineLabel,
      risk: item.risk,
      riskNote: item.riskNote,
      status: item.status,
      summary: item.summary,
      docType: item.docType,
      docTitle: item.docTitle,
      docNote: item.docNote,
      citationStatus: item.citationStatus,
      conflictStatus: item.conflictStatus,
      conflictNote: item.conflictNote,
      next: item.next
    }),
    ...item,
    parties: Array.isArray(item.parties) ? item.parties : [],
    timeline: Array.isArray(item.timeline) ? item.timeline : [],
    tasks: Array.isArray(item.tasks) ? item.tasks : [],
    evidence: Array.isArray(item.evidence) ? item.evidence : [],
    ai: Array.isArray(item.ai) ? item.ai : [],
    next: Array.isArray(item.next) ? item.next : [],
    documents: Array.isArray(item.documents) ? item.documents.map((doc) => ({
      ...doc,
      versions: Array.isArray(doc.versions) ? doc.versions : [],
      modifiedAt: doc.modifiedAt || ""
    })) : [],
    billing: Array.isArray(item.billing) ? item.billing : []
  }));
  state.auditLog = state.auditLog.slice(0, 40);
  return state;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertImportDate(value, label) {
  if (value === undefined || value === null || value === "") return;
  assertISODate(value, label);
}

function assertImportPositiveNumber(value, label) {
  if (value === undefined || value === null || value === "") return;
  const number = Number.parseFloat(String(value).replaceAll(",", ""));
  if (!Number.isFinite(number) || number <= 0) throw new Error(`${label}必須大於 0。`);
}

function assertImportTextLength(value, label, limit = MAX_IMPORT_TEXT_LENGTH) {
  if (value === undefined || value === null) return;
  if (String(value).length > limit) throw new Error(`${label}過長。`);
}

function assertImportCase(item, index) {
  if (!isPlainObject(item)) throw new Error(`第 ${index + 1} 筆案件格式不正確。`);
  ["id", "title", "client"].forEach((key) => {
    if (!String(item[key] || "").trim()) throw new Error(`第 ${index + 1} 筆案件缺少 ${key}。`);
    assertImportTextLength(item[key], `第 ${index + 1} 筆案件 ${key}`, 300);
  });
  ["summary", "riskNote", "docNote", "conflictNote"].forEach((key) => {
    assertImportTextLength(item[key], `第 ${index + 1} 筆案件 ${key}`);
  });
  assertImportDate(item.deadlineDate, `第 ${index + 1} 筆案件期限`);

  if (item.tasks !== undefined && !Array.isArray(item.tasks)) throw new Error(`第 ${index + 1} 筆案件任務格式不正確。`);
  (item.tasks || []).forEach((task, taskIndex) => {
    if (Array.isArray(task)) assertImportDate(task[1], `第 ${index + 1} 筆案件第 ${taskIndex + 1} 筆任務期限`);
    else if (isPlainObject(task)) assertImportDate(task.due, `第 ${index + 1} 筆案件第 ${taskIndex + 1} 筆任務期限`);
    else throw new Error(`第 ${index + 1} 筆案件第 ${taskIndex + 1} 筆任務格式不正確。`);
  });

  if (item.billing !== undefined && !Array.isArray(item.billing)) throw new Error(`第 ${index + 1} 筆案件帳務格式不正確。`);
  (item.billing || []).forEach((row, rowIndex) => {
    if (Array.isArray(row)) {
      assertImportDate(row[0], `第 ${index + 1} 筆案件第 ${rowIndex + 1} 筆帳務日期`);
      assertImportPositiveNumber(row[3], `第 ${index + 1} 筆案件第 ${rowIndex + 1} 筆帳務時數`);
      assertImportPositiveNumber(row[4], `第 ${index + 1} 筆案件第 ${rowIndex + 1} 筆帳務費率`);
      return;
    }
    if (!isPlainObject(row)) throw new Error(`第 ${index + 1} 筆案件第 ${rowIndex + 1} 筆帳務格式不正確。`);
    assertImportDate(row.date, `第 ${index + 1} 筆案件第 ${rowIndex + 1} 筆帳務日期`);
    assertImportPositiveNumber(row.hours, `第 ${index + 1} 筆案件第 ${rowIndex + 1} 筆帳務時數`);
    assertImportPositiveNumber(row.rate, `第 ${index + 1} 筆案件第 ${rowIndex + 1} 筆帳務費率`);
  });
}

function normalizeWorkspaceImport(imported) {
  if (Array.isArray(imported)) {
    return {
      workspace: { firmName: "匯入的舊版案件草稿" },
      cases: imported.map(convertLegacyCase),
      templates: [],
      auditLog: []
    };
  }
  if (imported?.version === "legacy-matters-v1" && Array.isArray(imported.matters)) {
    return {
      workspace: { firmName: imported.firmName || "匯入的舊版案件草稿" },
      cases: imported.matters.map(convertLegacyCase),
      templates: [],
      auditLog: []
    };
  }
  return imported;
}

function validateWorkspaceImport(imported) {
  if (!isPlainObject(imported)) throw new Error("備份需為 JSON 物件。");
  if (!Array.isArray(imported.cases) || !imported.cases.length) throw new Error("備份缺少案件資料。");
  if (imported.cases.length > MAX_IMPORT_CASES) throw new Error(`備份案件數超過 ${MAX_IMPORT_CASES} 筆上限。`);
  if (imported.workspace !== undefined && !isPlainObject(imported.workspace)) throw new Error("工作區設定格式不正確。");
  if (imported.templates !== undefined && !Array.isArray(imported.templates)) throw new Error("模板格式不正確。");
  if (imported.auditLog !== undefined && !Array.isArray(imported.auditLog)) throw new Error("操作紀錄格式不正確。");
  if (isPlainObject(imported.workspace)) {
    assertImportPositiveNumber(imported.workspace.seats, "團隊席次");
    assertImportPositiveNumber(imported.workspace.defaultRate, "預設時薪");
  }
  imported.cases.forEach(assertImportCase);
}

async function validateBackupIntegrity(imported) {
  if (imported.backupManifest === undefined) return { checked: false };
  if (!isPlainObject(imported.backupManifest)) throw new Error("備份完整性資訊格式不正確。");
  const expectedHash = imported.backupManifest.integritySha256;
  if (!expectedHash) return { checked: false };
  const actualHash = await sha256Hex(stableStringify(backupPayloadForHash(imported)));
  if (actualHash !== expectedHash) throw new Error("備份完整性驗證失敗，檔案可能不是原始匯出版本。");
  return { checked: true, manifest: imported.backupManifest };
}

function convertLegacyCase(draft) {
  return makeCase({
    id: draft.id || nextCaseCode(),
    title: draft.title,
    client: draft.client,
    type: draft.type,
    category: draft.category,
    urgency: draft.urgency,
    deadline: draft.deadline,
    risk: draft.risk,
    riskNote: draft.riskNote,
    status: draft.status,
    summary: draft.summary,
    docType: draft.docType,
    docTitle: draft.docTitle,
    docNote: draft.docNote,
    citationStatus: draft.citationStatus,
    conflictStatus: draft.conflictStatus,
    conflictNote: draft.conflictNote,
    next: draft.next
  });
}

let state = loadState();
let selectedCaseId = state.cases[0]?.id || "";
let currentFilter = "all";
let activeAction = null;
let activeDocumentRef = null;
const cloudState = {
  ready: false,
  enabled: false,
  loading: false,
  config: null,
  client: null,
  session: null,
  user: null,
  workspaces: [],
  workspacesLoaded: false,
  error: ""
};

function saveState(action = "更新工作區") {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  state.auditLog.unshift({
    at: timestampText(),
    actor: "本機使用者",
    action
  });
  state.auditLog = state.auditLog.slice(0, 40);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function selectedCase() {
  return state.cases.find((item) => item.id === selectedCaseId) || state.cases[0];
}

function nextCaseCode() {
  const highest = state?.cases?.reduce((max, item) => {
    const number = Number.parseInt(String(item.id).replace("CL-", ""), 10);
    return Number.isNaN(number) ? max : Math.max(max, number);
  }, 2400) || 2480;
  return `CL-${highest + 1}`;
}

function filteredCases() {
  const query = ($("[data-global-search]")?.value || "").trim().toLowerCase();
  return state.cases.filter((item) => {
    const matchesFilter =
      (currentFilter === "all" && !item.archived) ||
      (currentFilter === "urgent" && !item.archived && item.urgency === "urgent") ||
      (currentFilter === "litigation" && !item.archived && item.category === "litigation") ||
      (currentFilter === "archived" && item.archived);
    const haystack = [
      item.id,
      item.title,
      item.client,
      item.type,
      item.status,
      item.archived ? "封存 已封存" : "",
      ...(item.parties || []).map((party) => party.name),
      ...(item.evidence || []).map((doc) => doc.title)
    ].join(" ").toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
}

function caseBillableTotal(item) {
  return (item.billing || []).reduce((sum, row) => sum + (row.billable === false ? 0 : parseNumber(row.hours) * parseNumber(row.rate)), 0);
}

function allDocuments() {
  const rows = state.cases.flatMap((item) => [
    ...(item.documents || []).map((doc) => ({ ...doc, caseId: item.id, caseTitle: item.title })),
    ...(item.evidence || []).map((doc) => ({
      id: doc.id,
      title: doc.title,
      type: doc.type,
      status: doc.status,
      note: doc.note,
      caseId: item.id,
      caseTitle: item.title,
      evidenceOnly: true
    }))
  ]);
  const seen = new Set();
  return rows.filter((doc) => {
    const key = `${doc.caseId}|${doc.title}|${doc.type}|${doc.note}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function allBillings() {
  return state.cases.flatMap((item) => (item.billing || []).map((row) => ({ ...row, caseId: item.id, caseTitle: item.title })));
}

function allCalendarItems() {
  return state.cases.filter((item) => !item.archived).flatMap((item) => {
    const rows = [];
    if (item.deadlineDate) {
      rows.push({ item, date: item.deadlineDate, title: item.deadlineLabel || "案件期限", owner: "案件期限", urgent: item.urgency === "urgent" });
    }
    (item.tasks || []).forEach((task) => {
      if (task.status !== "完成") rows.push({ item, date: task.due, title: task.title, owner: task.status, urgent: task.priority === "高" });
    });
    return rows;
  }).sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function daysSinceISO(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const today = new Date(`${TODAY}T23:59:59+08:00`);
  return Math.max(0, Math.floor((today - date) / 86400000));
}

function backupHealth() {
  const days = daysSinceISO(state.workspace.lastBackupAt);
  const cases = state.cases.length;
  const documents = allDocuments().length;
  const billings = allBillings().length;
  if (days === null) {
    return {
      status: "尚未匯出備份",
      detail: `${cases} 件案件、${documents} 份文件、${billings} 筆時數目前只保存在此瀏覽器；正式使用前應先匯出備份並建立律所保存流程。`
    };
  }
  if (days > 7) {
    return {
      status: `已 ${days} 天未備份`,
      detail: `${cases} 件案件、${documents} 份文件、${billings} 筆時數；建議今天重新匯出備份並由承辦團隊確認保存位置。`
    };
  }
  return {
    status: days === 0 ? "今天已備份" : `${days} 天前已備份`,
    detail: `${cases} 件案件、${documents} 份文件、${billings} 筆時數；仍屬本機保存，跨裝置與多人同步需啟用雲端服務。`
  };
}

function syncFilterButtons() {
  $$("[data-filter]").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === currentFilter));
}

function renderCases() {
  const list = $("[data-case-list]");
  const items = filteredCases();
  list.innerHTML = items.map((item) => `
    <button class="case-item ${item.id === selectedCaseId ? "is-active" : ""}" type="button" data-case-id="${escapeHTML(item.id)}">
      <span class="case-item-top">
        <span class="case-code">${escapeHTML(item.id)}</span>
        <span class="chip ${chipClass(item.risk)}">${escapeHTML(item.risk)}風險</span>
      </span>
      <strong>${escapeHTML(item.title)}</strong>
      <span class="case-item-meta">
        <span>${escapeHTML(item.client)}</span>
        <span>${escapeHTML(item.deadline || dateText(item.deadlineDate, item.deadlineLabel))}</span>
      </span>
      <span class="chips">
        <span class="chip teal">${escapeHTML(item.type)}</span>
        <span class="chip gold">${escapeHTML(item.status)}</span>
        ${item.archived && item.status !== "已封存" ? `<span class="chip red">已封存</span>` : ""}
      </span>
    </button>
  `).join("");

  if (!items.length) {
    list.innerHTML = `<div class="case-item"><strong>沒有符合條件的案件</strong><span class="case-code">請調整搜尋或篩選</span></div>`;
  }
}

function renderMatter() {
  const item = selectedCase();
  if (!item) return;

  $("[data-selected-code]").textContent = item.id;
  $("[data-selected-title]").textContent = item.title;
  $("[data-selected-type]").textContent = item.type;
  $("[data-selected-client]").textContent = item.client;
  $("[data-selected-summary]").textContent = item.summary;
  $("[data-selected-risk]").textContent = item.risk;
  $("[data-selected-risk-note]").textContent = item.riskNote;
  $("[data-archive-case]").textContent = item.archived ? "取消封存" : "封存";
  $("[data-doc-type]").textContent = item.docType;
  $("[data-doc-title]").textContent = item.docTitle;
  $("[data-doc-note]").textContent = item.docNote;
  $("[data-citation-status]").textContent = item.citationStatus;
  $("[data-conflict-status]").textContent = item.conflictStatus;
  $("[data-conflict-note]").textContent = item.conflictNote;
  $("[data-ai-brief]").textContent = `${item.id}：${item.next?.[0] || "今日沒有指定下一步"}。`;

  const timeline = [
    ...(item.timeline || []),
    ...(item.tasks || []).map((task) => ({ id: task.id, date: task.due, title: task.title, owner: task.status }))
  ].sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(0, 8);

  $("[data-timeline]").innerHTML = timeline.map((entry) => `
    <article class="timeline-item">
      <div><strong>${escapeHTML(entry.title)}</strong><span>${escapeHTML(entry.owner || "未指定")}</span></div>
      <span>${escapeHTML(shortDate(entry.date))}</span>
    </article>
  `).join("");

  $("[data-task-list]").innerHTML = (item.tasks || []).map((task) => `
    <article class="task-item">
      <div><strong>${escapeHTML(task.title)}</strong><span>${escapeHTML(task.status)} · ${escapeHTML(task.priority || "中")}優先</span></div>
      <span>${escapeHTML(shortDate(task.due))}</span>
      <button class="text-button" type="button" data-toggle-task="${escapeHTML(task.id)}">${task.status === "完成" ? "重開" : "完成"}</button>
    </article>
  `).join("");

  $("[data-evidence-grid]").innerHTML = (item.evidence || []).map((doc) => `
    <article class="evidence-item">
      <span>${escapeHTML(doc.type)}</span>
      <strong>${escapeHTML(doc.title)}</strong>
      <p>${escapeHTML(doc.status)} · ${escapeHTML(doc.note || "無備註")}</p>
    </article>
  `).join("");

  $("[data-ai-dossier]").innerHTML = (item.ai || []).map((entry) => `
    <article>
      <strong>${escapeHTML(entry.title)}</strong>
      <p>${escapeHTML(entry.body)}</p>
    </article>
  `).join("");

  $("[data-next-actions]").innerHTML = (item.next || []).map((action, index) => `
    <article class="action-item">
      <div><strong>${escapeHTML(action)}</strong><span>${index === 0 ? "今天" : "本週"}</span></div>
      <span class="chip ${index === 0 ? "red" : "teal"}">${index + 1}</span>
    </article>
  `).join("");

  const caseAudit = (state.auditLog || [])
    .filter((row) => String(row.action || "").includes(item.id))
    .map((row) => ({ id: makeId("act"), date: row.at, title: row.action, owner: row.actor }));
  const caseActivity = [
    ...caseAudit,
    ...(item.timeline || []).map((entry) => ({ ...entry, date: shortDate(entry.date), owner: entry.owner || "工作台" }))
  ].slice(0, 12);

  $("[data-activity-list]").innerHTML = caseActivity.length ? caseActivity.map((entry) => `
    <article class="activity-item">
      <div><strong>${escapeHTML(entry.title)}</strong><span>${escapeHTML(entry.owner || "未指定")}</span></div>
      <span>${escapeHTML(entry.date || "未記錄")}</span>
    </article>
  `).join("") : `<article class="activity-item"><div><strong>尚無活動紀錄</strong><span>本機工作區</span></div><span>--</span></article>`;
}

function renderMetrics() {
  const reviewCount = state.cases.reduce((sum, item) => {
    if (item.archived) return sum;
    const docs = [...(item.evidence || []), ...(item.documents || [])];
    return sum + docs.filter((doc) => ["待", "草稿", "缺"].some((key) => String(doc.status || doc.note).includes(key))).length;
  }, 0);
  const deadlineCount = state.cases.reduce((sum, item) => {
    if (item.archived) return sum;
    const urgentTasks = (item.tasks || []).filter((task) => task.status !== "完成" && daysUntil(task.due) <= 7).length;
    return sum + (daysUntil(item.deadlineDate) <= 7 ? 1 : 0) + urgentTasks;
  }, 0);
  const activeCases = state.cases.filter((item) => !item.archived);
  $("[data-total-cases]").textContent = activeCases.length;
  $("[data-deadline-count]").textContent = deadlineCount;
  $("[data-review-count]").textContent = reviewCount;
  $("[data-risk-count]").textContent = activeCases.filter((item) => item.risk === "高").length;
  $("[data-conflict-summary]").textContent = `${activeCases.filter((item) => !String(item.conflictStatus).includes("未見")).length} 件待檢查`;
  $("[data-settings-plan]").textContent = `${state.workspace.plan}模式`;
  $("[data-settings-capacity]").textContent = `本機席次設定 ${state.workspace.seats}；${state.workspace.capacity}`;
  const backup = backupHealth();
  $("[data-backup-status]").textContent = backup.status;
  $("[data-backup-detail]").textContent = backup.detail;
  $("[data-firm-name]").textContent = state.workspace.firmName;
  $("[data-firm-meta]").textContent = `${state.workspace.plan}模式 · 本機席次設定 ${state.workspace.seats}`;
  $("[data-today-date]").textContent = TODAY.replaceAll("-", ".");
}

function renderSectionViews() {
  const deadlineItems = allCalendarItems();

  $("[data-deadline-board]").innerHTML = deadlineItems.map(({ item, date, title, owner, urgent }) => `
    <article class="module-card">
      <header><span>${escapeHTML(item.id)}</span><span class="chip ${urgent ? "red" : chipClass(daysUntil(date) < 0 ? "逾期" : "中")}">${escapeHTML(shortDate(date))}</span></header>
      <strong>${escapeHTML(title)}</strong>
      <p>${escapeHTML(item.title)} · ${escapeHTML(owner)}</p>
      <button class="text-button" type="button" data-open-case="${escapeHTML(item.id)}">開啟案件</button>
    </article>
  `).join("");

  const documents = allDocuments();
  $("[data-document-table]").innerHTML = documents.map((doc) => `
    <article class="document-row">
      <div><strong>${escapeHTML(doc.title)}</strong><span>${escapeHTML(doc.caseId)} · ${escapeHTML(doc.type)} · ${escapeHTML(doc.note || "")}${doc.versions?.length ? ` · ${doc.versions.length} 版` : ""}</span></div>
      <span class="chip ${chipClass(doc.status)}">${escapeHTML(doc.status)}</span>
      <button class="text-button" type="button" data-open-document="${escapeHTML(doc.caseId)}:${escapeHTML(doc.id)}">開啟</button>
    </article>
  `).join("");

  $("[data-conflict-board]").innerHTML = state.cases.filter((item) => !item.archived).map((item) => `
    <article class="module-card">
      <header><span>${escapeHTML(item.id)}</span><span class="chip ${chipClass(item.conflictStatus)}">${escapeHTML(item.conflictStatus)}</span></header>
      <strong>${escapeHTML(item.client)}</strong>
      <p>${escapeHTML(item.conflictNote)}</p>
      <button class="text-button" type="button" data-run-conflict-case="${escapeHTML(item.id)}">重新檢查</button>
    </article>
  `).join("");

  $("[data-party-board]").innerHTML = state.cases.filter((item) => !item.archived).flatMap((item) => (item.parties || []).map((party) => ({ item, party }))).map(({ item, party }) => `
    <article class="module-card">
      <header><span>${escapeHTML(party.side || "未分類")}</span><span class="chip gold">${escapeHTML(party.role || "關係人")}</span></header>
      <strong>${escapeHTML(party.name)}</strong>
      <p>${escapeHTML(item.title)} · ${escapeHTML(party.notes || "無備註")}</p>
    </article>
  `).join("");

  const billings = allBillings();
  $("[data-billing-ledger]").innerHTML = billings.map((row) => `
    <article class="billing-row">
      <div><strong>${escapeHTML(row.caseTitle)}</strong><span>${escapeHTML(row.date)} · ${escapeHTML(row.person)} · ${escapeHTML(row.description)}</span></div>
      <strong>${formatMoney(parseNumber(row.hours) * parseNumber(row.rate))}</strong>
    </article>
  `).join("");

  const total = billings.reduce((sum, row) => sum + (row.billable === false ? 0 : parseNumber(row.hours) * parseNumber(row.rate)), 0);
  const summary = $(".billing-summary");
  if (summary) {
    summary.innerHTML = `<span>本月可請款</span><strong>${formatMoney(total)}</strong><p>依目前本機時數資料計算；正式請款前仍需合夥律師確認。</p><button class="btn secondary" type="button" data-create-time-entry>新增時數</button>`;
  }

  $("[data-template-board]").innerHTML = state.templates.map((tpl) => `
    <article class="module-card">
      <header><span>${escapeHTML(tpl.type)}</span><span class="chip teal">可套用</span></header>
      <strong>${escapeHTML(tpl.name)}</strong>
      <p>${escapeHTML(tpl.body)}</p>
      <button class="text-button" type="button" data-use-template="${escapeHTML(tpl.id)}">產生草稿</button>
    </article>
  `).join("");
}

function render() {
  if (!state.cases.some((item) => item.id === selectedCaseId)) selectedCaseId = state.cases[0]?.id || "";
  renderCases();
  renderMatter();
  renderMetrics();
  renderSectionViews();
  renderCloudStatus();
}

function showToast(message) {
  const toast = $("[data-toast]");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1900);
}

function cloudApiBase() {
  return (cloudState.config?.apiBaseUrl || "").replace(/\/$/, "");
}

function cloudApiUrl(path) {
  return `${cloudApiBase()}${path}`;
}

function setCloudError(message = "") {
  cloudState.error = message;
  renderCloudStatus();
}

function renderCloudStatus() {
  const status = $("[data-cloud-status]");
  const detail = $("[data-cloud-detail]");
  const user = $("[data-cloud-user]");
  const signIn = $("[data-cloud-sign-in]");
  const signOut = $("[data-cloud-sign-out]");
  const save = $("[data-cloud-save]");
  const load = $("[data-cloud-load]");
  const fields = $("[data-cloud-auth-fields]");
  const openCloud = $("[data-open-cloud]");
  const workspacePicker = $("[data-cloud-workspaces]");
  const workspaceSelect = $("[data-cloud-workspace-select]");
  const workspaceDetail = $("[data-cloud-workspace-detail]");

  if (!status || !detail) return;

  if (cloudState.loading) {
    status.textContent = "連線檢查中";
    detail.textContent = "正在確認 ChouCounsel 雲端設定。";
  } else if (!cloudState.ready) {
    status.textContent = "尚未檢查";
    detail.textContent = "開啟雲端視窗後會檢查正式設定。";
  } else if (!cloudState.enabled) {
    status.textContent = "本機模式";
    detail.textContent = cloudState.error || "雲端服務尚未啟用；目前請使用 JSON 備份與交接清單保存資料。";
  } else if (cloudState.user) {
    status.textContent = "雲端可用";
    detail.textContent = state.workspace.cloudWorkspaceId
      ? "可保存或載入此工作台的最新雲端快照。"
      : "登入完成；首次保存會建立雲端工作區。";
  } else {
    status.textContent = "等待登入";
    detail.textContent = "雲端服務設定已啟用，請登入後保存或載入工作台快照。";
  }

  if (user) user.textContent = cloudState.user?.email || "未登入";
  if (openCloud) openCloud.textContent = cloudState.enabled && cloudState.user ? "雲端已連線" : "雲端";
  if (fields) fields.hidden = !cloudState.enabled || Boolean(cloudState.user);
  if (signIn) signIn.hidden = !cloudState.enabled || Boolean(cloudState.user);
  if (signOut) signOut.hidden = !cloudState.enabled || !cloudState.user;
  if (save) save.disabled = !cloudState.enabled || !cloudState.user;
  if (load) load.disabled = !cloudState.enabled || !cloudState.user || !state.workspace.cloudWorkspaceId;
  if (workspacePicker) workspacePicker.hidden = !cloudState.enabled || !cloudState.user;
  if (workspaceSelect && cloudState.user) {
    workspaceSelect.innerHTML = [
      `<option value="">選擇雲端工作區</option>`,
      ...cloudState.workspaces.map((workspace) => {
        const label = `${workspace.name || "未命名工作區"}${workspace.firmName ? `｜${workspace.firmName}` : ""}`;
        return `<option value="${escapeHTML(workspace.id)}"${workspace.id === state.workspace.cloudWorkspaceId ? " selected" : ""}>${escapeHTML(label)}</option>`;
      })
    ].join("");
  }
  if (workspaceDetail) {
    if (!cloudState.user) workspaceDetail.textContent = "登入後可選擇雲端工作區。";
    else if (!cloudState.workspacesLoaded) workspaceDetail.textContent = "登入後會載入可存取的雲端工作區。";
    else if (!cloudState.workspaces.length) workspaceDetail.textContent = "尚無雲端工作區；首次保存會建立目前工作台。";
    else if (state.workspace.cloudWorkspaceId) workspaceDetail.textContent = "已選擇雲端工作區，可載入最新快照或保存目前工作台。";
    else workspaceDetail.textContent = "請選擇要載入的雲端工作區，或保存目前工作台建立新快照。";
  }
}

async function loadCloudConfig() {
  cloudState.loading = true;
  renderCloudStatus();
  try {
    const response = await fetch(CLOUD_CONFIG_ENDPOINT, { cache: "no-store" });
    if (!response.ok) throw new Error("雲端設定讀取失敗");
    const config = await response.json();
    cloudState.config = config;
    cloudState.enabled = Boolean(config.enabled && config.supabaseUrl && config.supabaseAnonKey);
    cloudState.ready = true;
  if (!cloudState.enabled) setCloudError("雲端服務尚未啟用；目前請使用本機備份。");
    else setCloudError("");
  } catch (error) {
    cloudState.config = null;
    cloudState.enabled = false;
    cloudState.ready = true;
    setCloudError(error.message || "雲端設定讀取失敗；目前請使用本機備份。");
  } finally {
    cloudState.loading = false;
    renderCloudStatus();
  }
}

async function loadSupabaseSdk() {
  if (window.supabase?.createClient) return window.supabase;
  const sdkUrl = cloudState.config?.supabaseSdkUrl;
  if (!sdkUrl) throw new Error("雲端 SDK 設定不存在。");
  const existing = document.querySelector("script[data-supabase-sdk]");
  if (existing) {
    await new Promise((resolve, reject) => {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
    });
    return window.supabase;
  }
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = sdkUrl;
    script.defer = true;
    script.dataset.supabaseSdk = "true";
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", () => reject(new Error("雲端 SDK 載入失敗。")), { once: true });
    document.head.appendChild(script);
  });
  return window.supabase;
}

async function ensureCloudClient() {
  if (!cloudState.ready) await loadCloudConfig();
  if (!cloudState.enabled) throw new Error("雲端服務尚未啟用。");
  if (!cloudState.client) {
    const sdk = await loadSupabaseSdk();
    if (!sdk?.createClient) throw new Error("雲端 SDK 無法使用。");
    cloudState.client = sdk.createClient(cloudState.config.supabaseUrl, cloudState.config.supabaseAnonKey);
    const { data } = await cloudState.client.auth.getSession();
    cloudState.session = data?.session || null;
    cloudState.user = cloudState.session?.user || null;
    cloudState.client.auth.onAuthStateChange((_event, session) => {
      cloudState.session = session || null;
      cloudState.user = session?.user || null;
      renderCloudStatus();
    });
  }
  return cloudState.client;
}

async function signInCloud(email, password) {
  const client = await ensureCloudClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message || "雲端登入失敗。");
  cloudState.session = data.session || null;
  cloudState.user = data.user || data.session?.user || null;
  await loadCloudWorkspaces().catch((error) => {
    cloudState.error = error.message || "雲端工作區清單讀取失敗。";
  });
  renderCloudStatus();
}

async function signOutCloud() {
  const client = await ensureCloudClient();
  await client.auth.signOut();
  cloudState.session = null;
  cloudState.user = null;
  renderCloudStatus();
}

async function ensureCloudWorkspace() {
  const client = await ensureCloudClient();
  if (state.workspace.cloudWorkspaceId) return state.workspace.cloudWorkspaceId;
  const { data, error } = await client.rpc("choucounsel_create_workspace", {
    p_name: state.workspace.firmName || "ChouCounsel 工作台",
    p_firm_name: state.workspace.firmName || ""
  });
  if (error) throw new Error(error.message || "建立雲端工作區失敗。");
  state.workspace.cloudWorkspaceId = data;
  saveState("建立雲端工作區");
  renderCloudStatus();
  return data;
}

async function callCloudWorkspaces() {
  if (!cloudState.session?.access_token) throw new Error("請先登入雲端帳號。");
  const response = await fetch(cloudApiUrl(CLOUD_WORKSPACES_ENDPOINT), {
    method: "GET",
    headers: {
      authorization: `Bearer ${cloudState.session.access_token}`,
      "content-type": "application/json"
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "雲端工作區清單讀取失敗。");
  return Array.isArray(data.workspaces) ? data.workspaces : [];
}

async function loadCloudWorkspaces() {
  cloudState.workspaces = await callCloudWorkspaces();
  cloudState.workspacesLoaded = true;
  const selectedStillAvailable = cloudState.workspaces.some((workspace) => workspace.id === state.workspace.cloudWorkspaceId);
  if (state.workspace.cloudWorkspaceId && !selectedStillAvailable) {
    state.workspace.cloudWorkspaceId = "";
    saveState("清除不可用雲端工作區");
  }
  if (!state.workspace.cloudWorkspaceId && cloudState.workspaces.length === 1) {
    state.workspace.cloudWorkspaceId = cloudState.workspaces[0].id;
    saveState("選擇雲端工作區");
  }
  renderCloudStatus();
  return cloudState.workspaces;
}

async function callCloudSnapshot(method, bodyOrWorkspaceId) {
  if (!cloudState.session?.access_token) throw new Error("請先登入雲端帳號。");
  const options = {
    method,
    headers: {
      authorization: `Bearer ${cloudState.session.access_token}`,
      "content-type": "application/json"
    }
  };
  const url = method === "GET"
    ? cloudApiUrl(`${CLOUD_SNAPSHOT_ENDPOINT}?workspaceId=${encodeURIComponent(bodyOrWorkspaceId)}`)
    : cloudApiUrl(CLOUD_SNAPSHOT_ENDPOINT);
  if (method !== "GET") options.body = JSON.stringify(bodyOrWorkspaceId);
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "雲端快照操作失敗。");
  return data;
}

async function saveCloudSnapshot() {
  const workspaceId = await ensureCloudWorkspace();
  const backup = await buildWorkspaceBackup();
  const snapshot = backupPayloadForHash(backup);
  const integritySha256 = await sha256Hex(stableStringify(snapshot));
  await callCloudSnapshot("POST", {
    workspaceId,
    snapshot,
    manifest: backup.backupManifest,
    integritySha256
  });
  await loadCloudWorkspaces().catch(() => {});
  saveState("保存雲端快照");
  showToast("已保存雲端快照");
  render();
}

async function loadLatestCloudSnapshot() {
  const workspaceId = state.workspace.cloudWorkspaceId;
  if (!workspaceId) throw new Error("尚未建立雲端工作區。");
  const data = await callCloudSnapshot("GET", workspaceId);
  if (!data.snapshot?.snapshot) throw new Error("雲端尚無快照。");
  const imported = normalizeState(data.snapshot.snapshot);
  state = imported;
  selectedCaseId = state.cases[0]?.id || "";
  saveState("載入雲端快照");
  render();
  showToast("已載入雲端快照");
}

async function openCloudDialog() {
  $("[data-cloud-dialog]").showModal();
  if (!cloudState.ready) await loadCloudConfig();
  else renderCloudStatus();
}

function showSection(section) {
  let activeView = null;
  $$("[data-section]").forEach((item) => item.classList.toggle("is-active", item.dataset.section === section));
  $$("[data-section-view]").forEach((view) => {
    const active = view.dataset.sectionView === section;
    view.hidden = !active;
    view.classList.toggle("is-active", active);
    if (active) activeView = view;
  });
  if (activeView && window.matchMedia("(max-width: 900px)").matches) {
    window.setTimeout(() => {
      const topbarHeight = $(".topbar")?.getBoundingClientRect().height || 0;
      const top = activeView.getBoundingClientRect().top + window.scrollY - topbarHeight - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 40);
  }
}

function moveSelection(direction) {
  const visible = filteredCases();
  const index = visible.findIndex((item) => item.id === selectedCaseId);
  const nextIndex = (index + direction + visible.length) % visible.length;
  if (visible[nextIndex]) {
    selectedCaseId = visible[nextIndex].id;
    render();
  }
}

function openAction({ kicker, title, submitText = "儲存", fields, onSubmit }) {
  activeAction = onSubmit;
  $("[data-action-kicker]").textContent = kicker;
  $("[data-action-title]").textContent = title;
  $("[data-action-submit]").textContent = submitText;
  $("[data-action-fields]").innerHTML = fields.map((field) => renderField(field)).join("");
  $("[data-action-dialog]").showModal();
}

function renderField(field) {
  const required = field.required ? "required" : "";
  const value = escapeHTML(field.value || "");
  if (field.type === "textarea") {
    return `<label>${escapeHTML(field.label)}<textarea name="${escapeHTML(field.name)}" rows="${field.rows || 4}" ${required}>${value}</textarea></label>`;
  }
  if (field.type === "select") {
    return `<label>${escapeHTML(field.label)}<select name="${escapeHTML(field.name)}" ${required}>${field.options.map((option) => `<option ${option === field.value ? "selected" : ""}>${escapeHTML(option)}</option>`).join("")}</select></label>`;
  }
  const attrs = [
    field.min !== undefined ? `min="${escapeHTML(field.min)}"` : "",
    field.max !== undefined ? `max="${escapeHTML(field.max)}"` : "",
    field.step !== undefined ? `step="${escapeHTML(field.step)}"` : ""
  ].filter(Boolean).join(" ");
  return `<label>${escapeHTML(field.label)}<input name="${escapeHTML(field.name)}" type="${escapeHTML(field.type || "text")}" value="${value}" ${attrs} ${required}></label>`;
}

function valuesFromForm(form) {
  return Object.fromEntries(Array.from(new FormData(form).entries()).map(([key, value]) => [key, cleanInput(value)]));
}

function addAudit(action) {
  state.auditLog.unshift({ at: timestampText(), actor: "本機使用者", action });
  state.auditLog = state.auditLog.slice(0, 40);
}

function createMatterDraft(form) {
  const data = valuesFromForm(form);
  const risk = data.risk || "中";
  const deadlineDate = assertISODate(data.deadlineDate || TODAY, "主要期限");
  const item = makeCase({
    id: nextCaseCode(),
    title: data.title || "新委任案件初步評估",
    client: data.client || "新客戶",
    type: data.type || "民事訴訟",
    risk,
    urgency: risk === "高" ? "urgent" : "normal",
    deadlineDate,
    deadlineLabel: data.deadlineLabel || "委任資料確認",
    status: "新案草稿",
    summary: data.summary || "尚待補充案件事實、當事人資料、期限與已收到文件。",
    next: ["補齊對造與關係企業名稱", "確認委任範圍與收費方式", "上傳初始文件"]
  });
  item.parties.unshift({ id: makeId("pty"), name: item.client, role: "客戶", side: "我方", notes: "新增案件流程建立" });
  item.tasks.unshift({ id: makeId("tsk"), title: "確認委任範圍與收費方式", due: TODAY, status: "未完成", priority: "高" });
  state.cases.unshift(item);
  selectedCaseId = item.id;
  currentFilter = "all";
  syncFilterButtons();
  showSection("matters");
  saveState(`建立案件 ${item.id}`);
  render();
}

function openDeadlineForm() {
  const item = selectedCase();
  openAction({
    kicker: "期限",
    title: "新增期限或庭期",
    fields: [
      { name: "title", label: "事項", value: "準備庭期資料", required: true },
      { name: "date", label: "日期", type: "date", value: item.deadlineDate || TODAY, required: true },
      { name: "owner", label: "負責人", value: "承辦律師", required: true },
      { name: "priority", label: "優先等級", type: "select", options: ["中", "高", "低"], value: "中" }
    ],
    onSubmit(values) {
      const date = assertISODate(values.date, "日期");
      item.timeline.push({ id: makeId("evt"), date, title: values.title, owner: values.owner });
      item.tasks.push({ id: makeId("tsk"), title: values.title, due: date, status: "未完成", priority: values.priority });
      item.next = [values.title, ...(item.next || []).filter((entry) => entry !== values.title)].slice(0, 5);
      saveState(`新增期限 ${item.id}`);
      render();
      showToast("已新增期限與任務");
    }
  });
}

function openCaseEditForm() {
  const item = selectedCase();
  openAction({
    kicker: "Matter",
    title: "編輯案件資料",
    fields: [
      { name: "title", label: "案件名稱", value: item.title, required: true },
      { name: "client", label: "客戶 / 當事人", value: item.client, required: true },
      { name: "type", label: "案件類型", type: "select", options: ["民事訴訟", "契約審查", "家事事件", "企業顧問"], value: item.type },
      { name: "status", label: "案件狀態", value: item.status, required: true },
      { name: "risk", label: "風險等級", type: "select", options: ["低", "中", "高"], value: item.risk },
      { name: "deadlineDate", label: "主要期限", type: "date", value: item.deadlineDate || TODAY },
      { name: "deadlineLabel", label: "期限事項", value: item.deadlineLabel || "下一個期限" },
      { name: "summary", label: "案件摘要", type: "textarea", value: item.summary, rows: 4 }
    ],
    onSubmit(values) {
      const deadlineDate = values.deadlineDate ? assertISODate(values.deadlineDate, "主要期限") : "";
      item.title = values.title;
      item.client = values.client;
      item.type = values.type;
      item.category = categoryFromType(values.type);
      item.status = values.status;
      item.risk = values.risk;
      item.urgency = values.risk === "高" ? "urgent" : "normal";
      item.deadlineDate = deadlineDate;
      item.deadlineLabel = values.deadlineLabel;
      item.deadline = dateText(deadlineDate, values.deadlineLabel);
      item.summary = values.summary;
      item.docTitle = item.docTitle || `${item.title}初步評估草稿`;
      saveState(`編輯案件 ${item.id}`);
      render();
      showToast("已更新案件資料");
    }
  });
}

function openDocumentForm() {
  const item = selectedCase();
  openAction({
    kicker: "Document",
    title: "新增文件或證據",
    fields: [
      { name: "title", label: "文件名稱", value: `${item.title} 補充資料`, required: true },
      { name: "type", label: "類型", type: "select", options: ["PDF", "Doc", "Image", "CSV", "Sheet", "ZIP", "Memo"], value: "PDF" },
      { name: "status", label: "狀態", type: "select", options: ["草稿", "待上傳", "待核對", "已上傳", "已審"], value: "待核對" },
      { name: "note", label: "備註", type: "textarea", value: "請補充來源、日期與是否已核對。", rows: 3 }
    ],
    onSubmit(values) {
      const doc = { id: makeId("doc"), title: values.title, type: values.type, status: values.status, note: values.note, content: "" };
      item.documents.push(doc);
      item.evidence.push({ id: makeId("evd"), title: values.title, type: values.type, status: values.status, note: values.note });
      item.docTitle = values.title;
      item.docType = values.type;
      item.docNote = values.note;
      item.citationStatus = values.status.includes("核對") ? "待律師核對" : item.citationStatus;
      saveState(`新增文件 ${item.id}`);
      render();
      showToast("已新增文件");
    }
  });
}

function openPartyForm() {
  const item = selectedCase();
  openAction({
    kicker: "關係人",
    title: "新增客戶或關係人",
    fields: [
      { name: "name", label: "名稱", value: "新關係人", required: true },
      { name: "role", label: "角色", type: "select", options: ["客戶", "對造", "關係企業", "供應商", "證人", "資料主體", "第三方"], value: "對造" },
      { name: "side", label: "立場", type: "select", options: ["我方", "對造", "第三方", "未定"], value: "對造" },
      { name: "notes", label: "備註", type: "textarea", value: "請補充統編、聯絡人或前案關係。", rows: 3 }
    ],
    onSubmit(values) {
      item.parties.push({ id: makeId("pty"), name: values.name, role: values.role, side: values.side, notes: values.notes });
      runConflictCheck(item);
      saveState(`新增關係人 ${item.id}`);
      render();
      showToast("已新增關係人並更新衝突提示");
    }
  });
}

function openTimeEntryForm() {
  const item = selectedCase();
  openAction({
    kicker: "帳務",
    title: "新增時數",
    fields: [
      { name: "date", label: "日期", type: "date", value: TODAY, required: true },
      { name: "person", label: "執行人", value: "承辦律師", required: true },
      { name: "description", label: "工作內容", value: "案件資料整理與策略討論", required: true },
      { name: "hours", label: "時數", type: "number", value: "1.0", min: "0.1", step: "0.1", required: true },
      { name: "rate", label: "時薪", type: "number", value: String(state.workspace.defaultRate), min: "1", step: "1", required: true }
    ],
    onSubmit(values) {
      const date = assertISODate(values.date, "日期");
      item.billing.push({
        id: makeId("bil"),
        date,
        person: values.person,
        description: values.description,
        hours: parsePositiveNumber(values.hours, "時數"),
        rate: parsePositiveNumber(values.rate, "時薪", state.workspace.defaultRate),
        billable: true
      });
      saveState(`新增時數 ${item.id}`);
      render();
      showToast("已新增時數");
    }
  });
}

function openTemplateForm() {
  openAction({
    kicker: "模板",
    title: "建立書狀模板",
    fields: [
      { name: "name", label: "模板名稱", value: "新文件模板", required: true },
      { name: "type", label: "分類", value: "訴訟 / 顧問", required: true },
      { name: "body", label: "用途說明", type: "textarea", value: "說明這個模板適用的案件類型與輸出內容。", rows: 3 },
      { name: "content", label: "模板段落", type: "textarea", value: "一、事實概要\n二、爭點整理\n三、待補資料\n四、律師核對事項", rows: 5 }
    ],
    onSubmit(values) {
      state.templates.unshift({ id: makeId("tpl"), name: values.name, type: values.type, body: values.body, content: values.content });
      saveState("建立模板");
      render();
      showToast("已建立模板");
    }
  });
}

function openSettingsForm() {
  openAction({
    kicker: "Settings",
    title: "基本設定",
    fields: [
      { name: "firmName", label: "律所名稱", value: state.workspace.firmName, required: true },
      { name: "plan", label: "使用模式", type: "select", options: ["個人", "團隊", "律所", "企業"], value: state.workspace.plan },
      { name: "seats", label: "本機席次設定", type: "number", value: String(state.workspace.seats), min: "1", step: "1", required: true },
      { name: "defaultRate", label: "預設時薪", type: "number", value: String(state.workspace.defaultRate), min: "1", step: "1", required: true },
      { name: "capacity", label: "容量備註", value: state.workspace.capacity }
    ],
    onSubmit(values) {
      state.workspace = {
        ...state.workspace,
        ...values,
        seats: parsePositiveNumber(values.seats, "本機席次設定", 1),
        defaultRate: parsePositiveNumber(values.defaultRate, "預設時薪", 7200)
      };
      saveState("更新基本設定");
      render();
      showToast("已儲存設定");
    }
  });
}

function toggleTask(taskId) {
  const item = selectedCase();
  const task = item.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  task.status = task.status === "完成" ? "未完成" : "完成";
  saveState(`更新任務 ${item.id}`);
  render();
}

function conflictHits(item) {
  const allOtherParties = state.cases
    .filter((matter) => matter.id !== item.id)
    .flatMap((matter) => (matter.parties || []).map((party) => ({ ...party, caseId: matter.id, caseTitle: matter.title })));
  const rows = (item.parties || []).flatMap((party) => {
    const name = party.name.slice(0, 2);
    if (!name) return [];
    return allOtherParties
      .filter((other) => other.name.includes(name) || party.name.includes(other.name.slice(0, 2)))
      .map((other) => ({ party, other, token: name }));
  });
  const seen = new Set();
  return rows.filter(({ party, other }) => {
    const key = `${party.id || party.name}|${other.caseId}|${other.id || other.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function runConflictCheck(item) {
  const hits = conflictHits(item);
  const hasOpposing = (item.parties || []).some((party) => party.side === "對造");
  if (hits.length) {
    item.conflictStatus = "待律師確認";
    item.conflictNote = `命中 ${hits.length} 筆相近前案關係人。此結果只是提示，仍需律師確認委任範圍、保密義務與利益立場。`;
  } else if (hasOpposing) {
    item.conflictStatus = "新案待檢查";
    item.conflictNote = "已有對造或第三方資料，但未命中相近前案。仍需律師以完整資料確認。";
  } else {
    item.conflictStatus = "未見明顯衝突";
    item.conflictNote = "目前資料未命中相近前案；若新增對造、關係企業或委任範圍，需重新檢查。";
  }
}

function runAllConflictChecks() {
  state.cases.forEach(runConflictCheck);
  saveState("重新檢查全部利益衝突");
  render();
  showToast("已重新檢查全部案件");
}

function exportConflictReport() {
  state.cases.filter((item) => !item.archived).forEach(runConflictCheck);
  const activeCases = state.cases.filter((item) => !item.archived);
  const reportRows = activeCases.map((item, index) => {
    const hits = conflictHits(item);
    const parties = (item.parties || []).map((party) => `  - ${party.name}｜${party.role || "關係人"}｜${party.side || "未定"}｜${party.notes || "無備註"}`).join("\n") || "  - 尚未建立關係人";
    const hitRows = hits.length
      ? hits.map(({ party, other }) => `  - ${party.name} 可能接近 ${other.caseId} ${other.caseTitle} 的 ${other.name}（${other.role || "關係人"}｜${other.side || "未定"}）`).join("\n")
      : "  - 目前未見相近前案命中。";
    return [
      `${index + 1}. ${item.id}｜${item.title}`,
      `狀態：${item.conflictStatus}`,
      `客戶 / 當事人：${item.client}`,
      `案件類型：${item.type}`,
      `風險等級：${item.risk}`,
      `說明：${item.conflictNote}`,
      "關係人：",
      parties,
      "相近前案提示：",
      hitRows
    ].join("\n");
  });
  const needsReview = activeCases.filter((item) => !String(item.conflictStatus).includes("未見")).length;
  const content = [
    `${state.workspace.firmName}｜利益衝突檢查報告`,
    "",
    `產生時間：${timestampText()}`,
    `案件數：${activeCases.length}`,
    `需人工覆核：${needsReview} 件`,
    "",
    "檢查範圍",
    "本報告依目前 ChouCounsel 本機工作台中的案件、客戶、對造、關係企業與第三方名稱進行相近文字提示。",
    "",
    "案件明細",
    reportRows.join("\n\n"),
    "",
    "重要限制",
    "本報告不是利益衝突法律結論，也不能取代律師依完整委任範圍、前案卷宗、保密義務、關係企業、實質控制關係與律所內規進行人工查核。若資料缺漏、名稱簡寫、關係企業未填或委任範圍尚未確認，結果可能不足。"
  ].join("\n");
  saveState("匯出利益衝突報告");
  render();
  openDocumentDialog("利益衝突檢查報告", content);
}

function generateDocument(templateId) {
  const item = selectedCase();
  const tpl = state.templates.find((entry) => entry.id === templateId);
  if (!item || !tpl) return;
  const evidenceList = (item.evidence || []).map((doc, index) => `${index + 1}. ${doc.title}（${doc.status}）`).join("\n") || "尚未建立證據清單";
  const taskList = (item.tasks || []).filter((task) => task.status !== "完成").map((task) => `- ${task.title}｜${shortDate(task.due)}｜${task.status}`).join("\n") || "目前無未完成任務";
  const content = [
    `${tpl.name}｜${item.title}`,
    "",
    `案件編號：${item.id}`,
    `客戶 / 當事人：${item.client}`,
    `案件類型：${item.type}`,
    `風險等級：${item.risk}`,
    `下一期限：${item.deadline}`,
    "",
    "案件摘要",
    item.summary,
    "",
    "模板段落",
    tpl.content,
    "",
    "證據清單",
    evidenceList,
    "",
    "待辦事項",
    taskList,
    "",
    "引用與誠實限制",
    "本草稿由 ChouCounsel 本機工作台依案件資料與模板產生；未經官方法源、卷證與承辦律師核對前，不得作為正式法律意見。"
  ].join("\n");

  const doc = {
    id: makeId("doc"),
    title: `${item.title}${tpl.name}草稿`,
    type: tpl.name,
    status: "草稿",
    note: "由模板庫產生，待律師核對。",
    content
  };
  item.documents.unshift(doc);
  item.docTitle = doc.title;
  item.docType = doc.type;
  item.docNote = doc.note;
  item.citationStatus = "待律師核對";
  saveState(`產生文件 ${item.id}`);
  render();
  openDocumentDialog(doc.title, content, `${item.id}:${doc.id}`);
}

function openDocumentByRef(ref) {
  const [caseId, docId] = ref.split(":");
  const item = state.cases.find((entry) => entry.id === caseId);
  if (!item) return;
  const doc = [...(item.documents || []), ...(item.evidence || [])].find((entry) => entry.id === docId);
  if (!doc) return;
  const content = doc.content || [
    `${doc.title}`,
    "",
    `案件：${item.id} ${item.title}`,
    `類型：${doc.type}`,
    `狀態：${doc.status}`,
    "",
    doc.note || "尚無內容。"
  ].join("\n");
  openDocumentDialog(doc.title, content, ref);
}

function openCurrentDocument() {
  const item = selectedCase();
  if (!item) return;
  const doc = item.documents?.[0] || {
    id: makeId("doc"),
    title: item.docTitle,
    type: item.docType,
    status: item.citationStatus,
    note: item.docNote,
    content: ""
  };
  if (!item.documents?.length) item.documents = [doc];
  openDocumentDialog(doc.title || item.docTitle, doc.content || [
    `${item.docTitle}`,
    "",
    `案件：${item.id} ${item.title}`,
    `客戶：${item.client}`,
    `文件類型：${item.docType}`,
    `引用狀態：${item.citationStatus}`,
    "",
    item.docNote,
    "",
    "注意：未經官方法源、卷證與承辦律師核對前，不得作為正式法律意見。"
  ].join("\n"), `${item.id}:${doc.id}`);
}

function openDocumentDialog(title, content, ref = null) {
  activeDocumentRef = ref;
  $("[data-document-dialog-title]").textContent = title;
  $("[data-document-output]").value = content;
  $("[data-save-document]").hidden = !ref;
  $("[data-show-document-versions]").hidden = !ref;
  $("[data-document-dialog]").showModal();
}

function saveOpenDocument() {
  if (!activeDocumentRef) return;
  const [caseId, docId] = activeDocumentRef.split(":");
  const item = state.cases.find((entry) => entry.id === caseId);
  if (!item) return;
  const content = $("[data-document-output]").value;
  let doc = (item.documents || []).find((entry) => entry.id === docId);
  if (!doc) {
    const evidence = (item.evidence || []).find((entry) => entry.id === docId);
    if (!evidence) return;
    doc = {
      id: makeId("doc"),
      title: `${evidence.title}文字草稿`,
      type: evidence.type || "Memo",
      status: "草稿",
      note: "由證據項目開啟後保存，待律師核對。",
      content
    };
    item.documents.unshift(doc);
    evidence.status = "已建立草稿";
    evidence.note = "已將文字保存為文件中心草稿，待律師核對。";
    activeDocumentRef = `${item.id}:${doc.id}`;
  } else {
    if (doc.content && doc.content !== content) {
      doc.versions = [
        {
          id: makeId("ver"),
          at: doc.modifiedAt || timestampText(),
          note: doc.note || "前一版內容",
          content: doc.content
        },
        ...(Array.isArray(doc.versions) ? doc.versions : [])
      ].slice(0, 8);
    }
    doc.content = content;
    doc.status = "草稿";
    doc.note = "已於本機工作台編輯保存，待律師核對。";
  }
  doc.modifiedAt = timestampText();
  item.docTitle = doc.title;
  item.docType = doc.type;
  item.docNote = doc.note;
  item.citationStatus = "待律師核對";
  saveState(`保存文件 ${item.id}`);
  render();
  showToast("已保存文件內容");
}

function showDocumentVersions() {
  if (!activeDocumentRef) return;
  const [caseId, docId] = activeDocumentRef.split(":");
  const item = state.cases.find((entry) => entry.id === caseId);
  const doc = item?.documents?.find((entry) => entry.id === docId);
  if (!doc) {
    showToast("這個項目尚未保存成文件版本");
    return;
  }
  const rows = Array.isArray(doc.versions) ? doc.versions : [];
  const content = [
    `${doc.title}｜版本紀錄`,
    "",
    `目前版本：${doc.modifiedAt || "尚未記錄時間"}`,
    `狀態：${doc.status || "未標示"}`,
    "",
    rows.length ? rows.map((version, index) => [
      `${index + 1}. ${version.at}｜${version.note || "前一版"}`,
      version.content ? version.content.slice(0, 500) : "無內容快照",
      ""
    ].join("\n")).join("\n") : "目前沒有前一版快照。保存修改後，系統會保留最近 8 版。"
  ].join("\n");
  openDocumentDialog("文件版本紀錄", content);
}

function exportCasePacket() {
  const item = selectedCase();
  if (!item) return;
  const openTasks = (item.tasks || []).filter((task) => task.status !== "完成");
  const parties = (item.parties || []).map((party) => `- ${party.name}｜${party.role || "關係人"}｜${party.side || "未定"}｜${party.notes || "無備註"}`).join("\n") || "尚未建立關係人。";
  const tasks = openTasks.map((task) => `- ${task.title}｜${shortDate(task.due)}｜${task.status}｜${task.priority || "中"}優先`).join("\n") || "目前沒有未完成任務。";
  const evidence = (item.evidence || []).map((doc) => `- ${doc.title}｜${doc.type}｜${doc.status}｜${doc.note || "無備註"}`).join("\n") || "尚未建立證據清單。";
  const documents = (item.documents || []).map((doc) => `- ${doc.title}｜${doc.type}｜${doc.status}｜${doc.note || "無備註"}${doc.versions?.length ? `｜${doc.versions.length} 個前版` : ""}`).join("\n") || "尚未建立文件草稿。";
  const billings = (item.billing || []).map((row) => `- ${row.date}｜${row.person}｜${row.description}｜${row.hours}h｜${formatMoney(parseNumber(row.hours) * parseNumber(row.rate))}`).join("\n") || "尚未建立時數。";
  const total = caseBillableTotal(item);
  const content = [
    `${item.id}｜${item.title}｜案件交接包`,
    "",
    `產生時間：${timestampText()}`,
    `客戶 / 當事人：${item.client}`,
    `案件類型：${item.type}`,
    `案件狀態：${item.status}`,
    `風險等級：${item.risk}`,
    `主要期限：${item.deadline || dateText(item.deadlineDate, item.deadlineLabel)}`,
    `引用狀態：${item.citationStatus}`,
    `利益衝突：${item.conflictStatus}`,
    "",
    "案件摘要",
    item.summary,
    "",
    "目前風險說明",
    item.riskNote || "尚未填寫。",
    "",
    "下一步",
    (item.next || []).map((entry, index) => `${index + 1}. ${entry}`).join("\n") || "尚未建立下一步。",
    "",
    "未完成任務",
    tasks,
    "",
    "關係人",
    parties,
    "",
    "證據與附件",
    evidence,
    "",
    "文件草稿",
    documents,
    "",
    "時數摘要",
    billings,
    `合計：${formatMoney(total)}`,
    "",
    "使用界線",
    "本案件包由 ChouCounsel 依目前資料產生，協助團隊整理案件進度與下一步。正式對外文件、法律意見、請款與法源引用仍需承辦律師依卷證、官方來源與委任契約確認。"
  ].join("\n");
  saveState(`輸出案件交接包 ${item.id}`);
  render();
  openDocumentDialog(`${item.id} 案件交接包`, content);
}

function exportDailyBrief() {
  const item = selectedCase();
  if (!item) return;
  const priorityRank = { "高": 0, "中": 1, "低": 2 };
  const openTasks = (item.tasks || [])
    .filter((task) => task.status !== "完成")
    .slice()
    .sort((a, b) => (daysUntil(a.due) - daysUntil(b.due)) || ((priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9)));
  const dueToday = openTasks.filter((task) => daysUntil(task.due) <= 0);
  const dueSoon = openTasks.filter((task) => daysUntil(task.due) > 0 && daysUntil(task.due) <= 7);
  const missingEvidence = (item.evidence || []).filter((doc) => /待|缺|草稿|核對|補/.test(`${doc.status} ${doc.note}`));
  const reviewDocs = (item.documents || []).filter((doc) => /草稿|待|核對|覆核|未/.test(`${doc.status} ${doc.note}`));
  const questions = [
    ...missingEvidence.slice(0, 4).map((doc) => `請確認或補交「${doc.title}」：${doc.note || doc.status}`),
    ...openTasks.filter((task) => task.priority === "高").slice(0, 3).map((task) => `請確認「${task.title}」是否已有最新資料。`)
  ];
  const taskRows = openTasks.map((task, index) => `${index + 1}. ${task.title}｜期限 ${shortDate(task.due)}｜${task.status}｜${task.priority || "中"}優先`).join("\n") || "目前沒有未完成任務。";
  const content = [
    `${item.id}｜${item.title}｜今日工作包`,
    "",
    `產生時間：${timestampText()}`,
    `客戶 / 當事人：${item.client}`,
    `案件狀態：${item.status}`,
    `主要期限：${item.deadline || dateText(item.deadlineDate, item.deadlineLabel)}`,
    `風險等級：${item.risk}`,
    "",
    "今日先處理",
    dueToday.length
      ? dueToday.map((task, index) => `${index + 1}. ${task.title}｜${task.priority || "中"}優先`).join("\n")
      : (dueSoon[0] ? `1. ${dueSoon[0].title}｜${shortDate(dueSoon[0].due)}｜${dueSoon[0].priority || "中"}優先` : "目前沒有今天到期的未完成任務。"),
    "",
    "7 日內注意",
    dueSoon.length ? dueSoon.map((task) => `- ${shortDate(task.due)}｜${task.title}｜${task.status}`).join("\n") : "7 日內沒有未完成期限。",
    "",
    "交辦清單",
    taskRows,
    "",
    "待補卷證",
    missingEvidence.length ? missingEvidence.map((doc) => `- ${doc.title}｜${doc.status}｜${doc.note || "請確認"}`).join("\n") : "目前沒有標示待補或待核對的卷證。",
    "",
    "待覆核文件",
    reviewDocs.length ? reviewDocs.map((doc) => `- ${doc.title}｜${doc.status}｜${doc.note || "待承辦確認"}`).join("\n") : "目前沒有待覆核文件。",
    "",
    "要問客戶的問題",
    questions.length ? questions.map((question, index) => `${index + 1}. ${question}`).join("\n") : "目前沒有系統整理出的客戶問題。",
    "",
    "律師確認事項",
    `- 引用狀態：${item.citationStatus}`,
    `- 利益衝突：${item.conflictStatus}`,
    `- 風險提醒：${item.riskNote || "尚未填寫。"}`,
    "",
    "使用限制",
    "本工作包只依目前本機資料整理工作順序，不構成法律意見、法源查核結果或對外承諾。正式書狀、客戶通知與策略建議仍需承辦律師依卷證與官方來源確認。"
  ].join("\n");
  saveState(`輸出今日工作包 ${item.id}`);
  render();
  openDocumentDialog(`${item.id} 今日工作包`, content);
}

function exportClientUpdate() {
  const item = selectedCase();
  if (!item) return;
  const openTasks = (item.tasks || []).filter((task) => task.status !== "完成");
  const completedTasks = (item.tasks || []).filter((task) => task.status === "完成");
  const missingEvidence = (item.evidence || []).filter((doc) => /待|缺|草稿|核對|補/.test(`${doc.status} ${doc.note}`));
  const nextSteps = (item.next || []).slice(0, 4);
  const clientQuestions = [
    ...missingEvidence.slice(0, 4).map((doc) => `請協助確認或提供「${doc.title}」：${doc.note || doc.status}`),
    ...openTasks.filter((task) => task.priority === "高").slice(0, 2).map((task) => `關於「${task.title}」，請提供目前最新資料或您的確認。`)
  ];
  const content = [
    `主旨：${item.title}｜案件進度更新草稿`,
    "",
    `${item.client} 您好：`,
    "",
    "以下為目前案件工作台依現有資料整理的進度更新草稿，寄出前仍會由承辦律師確認內容、語氣與可揭露範圍。",
    "",
    "一、目前案件狀態",
    `本案目前狀態為「${item.status}」。主要期限為 ${item.deadline || dateText(item.deadlineDate, item.deadlineLabel)}。`,
    item.summary,
    "",
    "二、已完成或已整理事項",
    completedTasks.length
      ? completedTasks.map((task, index) => `${index + 1}. ${task.title}`).join("\n")
      : "目前尚未標記完成事項；承辦團隊仍在整理資料與待辦項目。",
    "",
    "三、接下來預計處理",
    nextSteps.length ? nextSteps.map((step, index) => `${index + 1}. ${step}`).join("\n") : "承辦團隊將先補齊資料、確認期限並整理下一步策略。",
    "",
    "四、需要您協助確認",
    clientQuestions.length ? clientQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n") : "目前沒有系統整理出的待補問題；若承辦律師覆核後有需要，會再另行通知。",
    "",
    "五、提醒",
    "本信件草稿僅作為案件進度溝通底稿；正式寄出前，仍需承辦律師依委任範圍、卷證、保密義務與案件策略確認是否適合對外提供。"
  ].join("\n");
  saveState(`產生客戶更新稿 ${item.id}`);
  render();
  openDocumentDialog(`${item.id} 客戶更新稿`, content);
}

function exportPrepBrief() {
  const item = selectedCase();
  if (!item) return;
  const openTasks = (item.tasks || []).filter((task) => task.status !== "完成").sort((a, b) => String(a.due).localeCompare(String(b.due)));
  const partyRows = (item.parties || []).map((party) => `- ${party.name}｜${party.role || "關係人"}｜${party.side || "未定"}｜${party.notes || "無備註"}`).join("\n") || "尚未建立關係人。";
  const evidenceRows = (item.evidence || []).map((doc) => `- ${doc.title}｜${doc.type}｜${doc.status}｜${doc.note || "無備註"}`).join("\n") || "尚未建立證據清單。";
  const keyQuestions = [
    item.riskNote ? `風險確認：${item.riskNote}` : "",
    item.conflictStatus && !String(item.conflictStatus).includes("未見") ? `利益衝突提示：${item.conflictNote}` : "",
    ...openTasks.slice(0, 4).map((task) => `任務確認：${task.title}（${shortDate(task.due)}）`)
  ].filter(Boolean);
  const content = [
    `${item.id}｜${item.title}｜庭期 / 會議準備稿`,
    "",
    `產生時間：${timestampText()}`,
    `客戶 / 當事人：${item.client}`,
    `案件類型：${item.type}`,
    `目前狀態：${item.status}`,
    `主要期限：${item.deadline || dateText(item.deadlineDate, item.deadlineLabel)}`,
    "",
    "一、會議目標",
    `釐清本案目前事實、待補資料、下一步策略與 ${item.deadlineLabel || "下一個期限"} 前需完成事項。`,
    "",
    "二、案件摘要",
    item.summary,
    "",
    "三、關係人地圖",
    partyRows,
    "",
    "四、卷證檢查",
    evidenceRows,
    "",
    "五、待確認問題",
    keyQuestions.length ? keyQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n") : "目前沒有系統整理出的待確認問題。",
    "",
    "六、會前交辦",
    openTasks.length ? openTasks.map((task, index) => `${index + 1}. ${task.title}｜${shortDate(task.due)}｜${task.status}｜${task.priority || "中"}優先`).join("\n") : "目前沒有未完成任務。",
    "",
    "七、使用界線",
    `引用狀態：${item.citationStatus}`,
    "本準備稿協助團隊整理開庭或會議重點；正式主張、談判底線、法源引用與對外說法，仍需承辦律師依完整卷證與官方來源確認。"
  ].join("\n");
  saveState(`產生準備稿 ${item.id}`);
  render();
  openDocumentDialog(`${item.id} 準備稿`, content);
}

function archiveSelectedCase() {
  const item = selectedCase();
  if (!item) return;
  const willArchive = !item.archived;
  if (willArchive) {
    item.statusBeforeArchive = item.status;
    item.archived = true;
    item.status = "已封存";
  } else {
    item.archived = false;
    item.status = item.statusBeforeArchive || "進行中";
    delete item.statusBeforeArchive;
  }
  item.timeline.unshift({
    id: makeId("evt"),
    date: TODAY,
    title: item.archived ? "案件封存" : "取消案件封存",
    owner: "本機使用者"
  });
  currentFilter = item.archived ? "archived" : "all";
  syncFilterButtons();
  saveState(`${item.archived ? "封存" : "取消封存"}案件 ${item.id}`);
  render();
  showToast(item.archived ? "已封存案件" : "已取消封存");
}

function deleteSelectedCase() {
  const item = selectedCase();
  if (!item) return;
  if (state.cases.length <= 1) {
    showToast("至少保留一件案件；可用重置資料重新開始");
    return;
  }
  const ok = window.confirm(`確定刪除 ${item.id} ${item.title}？此動作只會刪除目前瀏覽器中的本機資料。`);
  if (!ok) return;
  state.cases = state.cases.filter((entry) => entry.id !== item.id);
  selectedCaseId = state.cases[0]?.id || "";
  saveState(`刪除案件 ${item.id}`);
  render();
  showToast("已刪除案件");
}

function exportBillingDraft() {
  const rows = allBillings();
  const total = rows.reduce((sum, row) => sum + (row.billable === false ? 0 : parseNumber(row.hours) * parseNumber(row.rate)), 0);
  const content = [
    `${state.workspace.firmName} 帳務草稿`,
    `產生時間：${new Date().toLocaleString("zh-TW", { hour12: false })}`,
    "",
    ...rows.map((row) => `${row.date}｜${row.caseId} ${row.caseTitle}｜${row.person}｜${row.description}｜${row.hours}h｜${formatMoney(parseNumber(row.hours) * parseNumber(row.rate))}`),
    "",
    `合計：${formatMoney(total)}`,
    "",
    "注意：此為本機工作台草稿，正式請款前仍需律所依委任契約與請款規則確認。"
  ].join("\n");
  openDocumentDialog("帳務草稿", content);
}

function escapeCSV(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportBillingCSV() {
  const rows = allBillings();
  if (!rows.length) {
    showToast("目前沒有時數可匯出");
    return;
  }
  const header = ["案件編號", "案件名稱", "客戶", "日期", "執行人", "工作內容", "時數", "費率", "金額", "可請款"];
  const lines = rows.map((row) => {
    const item = state.cases.find((matter) => matter.id === row.caseId);
    const amount = row.billable === false ? 0 : parseNumber(row.hours) * parseNumber(row.rate);
    return [
      row.caseId,
      row.caseTitle,
      item?.client || "",
      row.date,
      row.person,
      row.description,
      row.hours,
      row.rate,
      Math.round(amount),
      row.billable === false ? "否" : "是"
    ].map(escapeCSV).join(",");
  });
  const csv = [
    header.map(escapeCSV).join(","),
    ...lines
  ].join("\n");
  const total = rows.reduce((sum, row) => sum + (row.billable === false ? 0 : parseNumber(row.hours) * parseNumber(row.rate)), 0);
  downloadTextFile(`choucounsel-billing-${TODAY}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
  saveState("匯出帳務 CSV");
  render();
  const summary = [
    "ChouCounsel 帳務 CSV 匯出摘要",
    "",
    `產生時間：${timestampText()}`,
    `明細筆數：${rows.length}`,
    `可請款金額：${formatMoney(total)}`,
    "",
    "欄位",
    header.join("、"),
    "",
    "限制：此 CSV 只反映目前本機工作台中的時數資料，正式請款前仍需依委任契約、折扣、稅務、墊付款、律所內規與合夥律師確認。"
  ].join("\n");
  showToast("已匯出帳務 CSV");
  openDocumentDialog("帳務 CSV 匯出摘要", summary);
}

function exportPartiesCSV() {
  const rows = state.cases
    .filter((item) => !item.archived)
    .flatMap((item) => (item.parties || []).map((party) => ({ item, party })));
  if (!rows.length) {
    showToast("目前沒有關係人可匯出");
    return;
  }
  const header = ["案件編號", "案件名稱", "案件狀態", "案件類型", "利益衝突狀態", "關係人名稱", "角色", "立場", "備註"];
  const lines = rows.map(({ item, party }) => [
    item.id,
    item.title,
    item.status,
    item.type,
    item.conflictStatus,
    party.name,
    party.role || "",
    party.side || "",
    party.notes || ""
  ].map(escapeCSV).join(","));
  const csv = [
    header.map(escapeCSV).join(","),
    ...lines
  ].join("\n");
  downloadTextFile(`choucounsel-parties-${TODAY}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
  saveState("匯出關係人 CSV");
  render();
  const clientCount = rows.filter(({ party }) => party.role === "客戶").length;
  const opposingCount = rows.filter(({ party }) => party.side === "對造").length;
  const thirdPartyCount = rows.filter(({ party }) => party.side === "第三方").length;
  const summary = [
    "ChouCounsel 關係人 CSV 匯出摘要",
    "",
    `產生時間：${timestampText()}`,
    `名冊筆數：${rows.length}`,
    `客戶：${clientCount} 筆`,
    `對造：${opposingCount} 筆`,
    `第三方：${thirdPartyCount} 筆`,
    "",
    "欄位",
    header.join("、"),
    "",
    "限制：此名冊只反映目前本機工作台資料，不能取代正式 KYC、委任審查、利益衝突人工查核或個資盤點。匯出後請依律所權限與保密義務控管檔案。"
  ].join("\n");
  showToast("已匯出關係人 CSV");
  openDocumentDialog("關係人 CSV 匯出摘要", summary);
}

function compactDate(value) {
  return String(value || "").replaceAll("-", "");
}

function nextCalendarDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00+08:00`);
  date.setDate(date.getDate() + 1);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

function escapeICS(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replace(/\r?\n/g, "\\n");
}

function timestampICS() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function downloadTextFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportCalendar() {
  const rows = allCalendarItems().filter((row) => row.date);
  if (!rows.length) {
    showToast("目前沒有可匯出的期限");
    return;
  }
  const stamp = timestampICS();
  const events = rows.flatMap(({ item, date, title, owner }, index) => [
    "BEGIN:VEVENT",
    `UID:${escapeICS(`${item.id}-${date}-${index}@choucounsel.local`)}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compactDate(date)}`,
    `DTEND;VALUE=DATE:${nextCalendarDate(date)}`,
    `SUMMARY:${escapeICS(`${item.id} ${title}`)}`,
    `DESCRIPTION:${escapeICS([
      `案件：${item.title}`,
      `客戶：${item.client}`,
      `狀態：${item.status}`,
      `負責 / 狀態：${owner}`,
      `風險：${item.risk}`,
      "本事件由 ChouCounsel 本機工作台依目前資料匯出；正式法律期限仍需承辦律師與法院、主管機關或委任文件核對。"
    ].join("\n"))}`,
    "STATUS:CONFIRMED",
    "TRANSP:TRANSPARENT",
    "END:VEVENT"
  ]);
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//ChouLegal//ChouCounsel//ZH-TW",
    "X-WR-CALNAME:ChouCounsel 期限與庭期",
    ...events,
    "END:VCALENDAR"
  ].join("\r\n");
  downloadTextFile(`choucounsel-calendar-${TODAY}.ics`, calendar, "text/calendar;charset=utf-8");
  saveState("匯出期限行事曆");
  render();
  const summary = [
    "ChouCounsel 行事曆匯出摘要",
    "",
    `產生時間：${timestampText()}`,
    `匯出事件：${rows.length} 筆`,
    "",
    ...rows.slice(0, 12).map((row, index) => `${index + 1}. ${row.item.id}｜${shortDate(row.date)}｜${row.title}｜${row.item.title}`),
    rows.length > 12 ? `...另有 ${rows.length - 12} 筆` : "",
    "",
    "限制：此檔案只反映目前本機工作台資料，不能取代法院、主管機關、契約或承辦律師核對後的正式期限控管。"
  ].filter(Boolean).join("\n");
  showToast("已匯出行事曆");
  openDocumentDialog("行事曆匯出摘要", summary);
}

async function exportWorkspace() {
  state.workspace.lastBackupAt = new Date().toISOString();
  saveState("匯出工作區備份");
  const backup = await buildWorkspaceBackup();
  const shortHash = backup.backupManifest.integritySha256.slice(0, 12);
  const backupSummary = [
    "ChouCounsel 工作區備份摘要",
    "",
    `產生時間：${timestampText()}`,
    `案件數：${backup.backupManifest.caseCount}`,
    `文件數：${backup.backupManifest.documentCount}`,
    `時數紀錄：${backup.backupManifest.billingCount} 筆`,
    `模板數：${backup.backupManifest.templateCount}`,
    `操作紀錄：${backup.backupManifest.auditLogCount} 筆`,
    `最近備份：${timestampText()}`,
    `完整性碼：sha256-${shortHash}`,
    "",
    "備份檔已由瀏覽器下載為 JSON；匯入時會驗證完整性碼，協助確認檔案未被改動。這只是本機資料備份，不代表已同步到雲端或完成法律內容核驗。"
  ].join("\n");
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `choucounsel-backup-${TODAY}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("已匯出工作區備份");
  openDocumentDialog("備份摘要", backupSummary);
  render();
}

function showAuditLog() {
  const content = (state.auditLog || []).length
    ? state.auditLog.map((row, index) => `${index + 1}. ${row.at}｜${row.actor}｜${row.action}`).join("\n")
    : "目前沒有操作紀錄。";
  openDocumentDialog("操作紀錄", content);
}

function handoffChecklistContent() {
  const activeCases = state.cases.filter((item) => !item.archived);
  const upcoming = allCalendarItems().filter((row) => row.date && daysUntil(row.date) <= 14).slice(0, 20);
  const reviewDocs = allDocuments().filter((doc) => /待|草稿|缺|核對|覆核|未/.test(`${doc.status || ""} ${doc.note || ""}`)).slice(0, 20);
  const conflictCases = activeCases.filter((item) => !String(item.conflictStatus || "").includes("未見")).slice(0, 20);
  const unbilledTotal = allBillings().reduce((sum, row) => sum + (row.billable === false ? 0 : parseNumber(row.hours) * parseNumber(row.rate)), 0);
  const backup = backupHealth();

  return [
    "ChouCounsel 案件交接清單",
    "",
    `律所 / 團隊：${state.workspace.firmName}`,
    `產生時間：${timestampText()}`,
    `案件數：${state.cases.length}（進行中 ${activeCases.length}）`,
    `文件與證據：${allDocuments().length} 筆`,
    `時數紀錄：${allBillings().length} 筆，帳務暫估 ${formatMoney(unbilledTotal)}`,
    `備份狀態：${backup.status}`,
    "",
    "一、14 日內期限",
    upcoming.length ? upcoming.map((row, index) => `${index + 1}. ${row.item.id}｜${shortDate(row.date)}｜${row.title}｜${row.item.title}`).join("\n") : "目前沒有 14 日內期限。",
    "",
    "二、待覆核文件 / 卷證",
    reviewDocs.length ? reviewDocs.map((doc, index) => `${index + 1}. ${doc.caseId}｜${doc.title}｜${doc.status || "未標示"}｜${doc.note || "無備註"}`).join("\n") : "目前沒有標示待覆核的文件或卷證。",
    "",
    "三、利益衝突待確認",
    conflictCases.length ? conflictCases.map((item, index) => `${index + 1}. ${item.id}｜${item.client}｜${item.conflictStatus}｜${item.conflictNote || "請承辦確認"}`).join("\n") : "目前沒有標示待確認的利益衝突。",
    "",
    "四、交接前確認",
    "- 已匯出最新工作區備份，並確認保存位置。",
    "- 期限已由承辦律師對照法院、主管機關、契約或委任文件。",
    "- AI 摘要、文件草稿與客戶更新稿已由承辦律師覆核。",
    "- 帳務金額已由律所內部請款流程確認。",
    "",
    "限制：此清單依目前本機工作台資料產生，不代表已完成雲端同步、多人權限控管或正式法律內容核驗。"
  ].join("\n");
}

function exportHandoffChecklist() {
  state.workspace.lastHandoffAt = new Date().toISOString();
  saveState("匯出案件交接清單");
  const content = handoffChecklistContent();
  downloadTextFile(`choucounsel-handoff-${TODAY}.txt`, content, "text/plain;charset=utf-8");
  showToast("已匯出交接清單");
  openDocumentDialog("案件交接清單", content);
  render();
}

function importWorkspace(file) {
  if (!file) return;
  if (file.size > MAX_IMPORT_BYTES) {
    showToast("備份檔超過 2MB，未匯入");
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", async () => {
    try {
      const imported = normalizeWorkspaceImport(JSON.parse(String(reader.result || "")));
      const integrity = await validateBackupIntegrity(imported);
      validateWorkspaceImport(imported);
      state = normalizeState(imported);
      selectedCaseId = state.cases[0]?.id || "";
      saveState("匯入工作區備份");
      render();
      showToast(integrity.checked ? "已匯入備份，完整性已驗證" : "已匯入備份");
    } catch (error) {
      showToast(`未匯入：${error.message || "備份格式不正確"}`);
    }
  });
  reader.readAsText(file);
}

function resetWorkspace() {
  const ok = window.confirm("確定要重置 ChouCounsel 本機資料？這會清除目前瀏覽器中的案件、時數與模板變更。");
  if (!ok) return;
  window.localStorage.removeItem(STORAGE_KEY);
  state = defaultWorkspace();
  selectedCaseId = state.cases[0].id;
  saveState("重置範例資料");
  render();
  showToast("已重置範例資料");
}

function showNotifications() {
  const urgent = state.cases.flatMap((item) => (item.tasks || [])
    .filter((task) => task.status !== "完成" && daysUntil(task.due) <= 3)
    .map((task) => `${item.id}｜${task.title}｜${shortDate(task.due)}`));
  openDocumentDialog("通知", urgent.length ? urgent.join("\n") : "目前沒有 3 日內未完成任務。");
}

function bindEvents() {
  $$("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.dataset.section);
      showToast(`已切換到${button.textContent.trim()}`);
    });
  });

  $("[data-case-list]").addEventListener("click", (event) => {
    const button = event.target.closest("[data-case-id]");
    if (!button) return;
    selectedCaseId = button.dataset.caseId;
    render();
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.matches("[data-toggle-task]")) toggleTask(target.dataset.toggleTask);
    if (target.matches("[data-open-case]")) {
      selectedCaseId = target.dataset.openCase;
      showSection("matters");
      render();
    }
    if (target.matches("[data-open-document]")) openDocumentByRef(target.dataset.openDocument);
    if (target.matches("[data-run-conflict-case]")) {
      const item = state.cases.find((entry) => entry.id === target.dataset.runConflictCase);
      if (item) {
        runConflictCheck(item);
        saveState(`重新檢查利益衝突 ${item.id}`);
        render();
        showToast("已更新利益衝突提示");
      }
    }
    if (target.matches("[data-use-template]")) generateDocument(target.dataset.useTemplate);
    if (target.matches("[data-create-time-entry]")) openTimeEntryForm();
  });

  $$("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      syncFilterButtons();
      const visible = filteredCases();
      if (visible.length && !visible.some((item) => item.id === selectedCaseId)) selectedCaseId = visible[0].id;
      render();
    });
  });

  $$("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      $$("[data-tab]").forEach((item) => item.classList.toggle("is-active", item === button));
      $$("[data-tab-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.tabPanel === tab));
    });
  });

  $("[data-global-search]").addEventListener("input", () => {
    const visible = filteredCases();
    if (visible.length && !visible.some((item) => item.id === selectedCaseId)) selectedCaseId = visible[0].id;
    render();
  });

  $("[data-prev-case]").addEventListener("click", () => moveSelection(-1));
  $("[data-next-case]").addEventListener("click", () => moveSelection(1));
  $("[data-sync]").addEventListener("click", () => {
    saveState("手動保存");
    showToast("已保存到此瀏覽器");
  });
  $("[data-open-cloud]").addEventListener("click", () => {
    openCloudDialog().catch((error) => showToast(error.message || "雲端設定讀取失敗"));
  });
  $("[data-cloud-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;
    signInCloud(email, password)
      .then(() => showToast("已登入雲端帳號"))
      .catch((error) => showToast(error.message || "雲端登入失敗"));
  });
  $("[data-cloud-sign-out]").addEventListener("click", () => {
    signOutCloud()
      .then(() => showToast("已登出雲端帳號"))
      .catch((error) => showToast(error.message || "雲端登出失敗"));
  });
  $("[data-cloud-save]").addEventListener("click", () => {
    saveCloudSnapshot().catch((error) => showToast(error.message || "雲端保存失敗"));
  });
  $("[data-cloud-load]").addEventListener("click", () => {
    loadLatestCloudSnapshot().catch((error) => showToast(error.message || "雲端載入失敗"));
  });
  $("[data-cloud-workspace-select]").addEventListener("change", (event) => {
    state.workspace.cloudWorkspaceId = event.target.value || "";
    saveState("選擇雲端工作區");
    renderCloudStatus();
  });
  $("[data-show-notifications]").addEventListener("click", showNotifications);
  $("[data-edit-case]").addEventListener("click", openCaseEditForm);
  $("[data-export-daily-brief]").addEventListener("click", exportDailyBrief);
  $("[data-export-client-update]").addEventListener("click", exportClientUpdate);
  $("[data-export-prep-brief]").addEventListener("click", exportPrepBrief);
  $("[data-export-case-packet]").addEventListener("click", exportCasePacket);
  $("[data-archive-case]").addEventListener("click", archiveSelectedCase);
  $("[data-delete-case]").addEventListener("click", deleteSelectedCase);
  $("[data-open-current-document]").addEventListener("click", openCurrentDocument);
  $("[data-mark-reviewed]").addEventListener("click", () => {
    const item = selectedCase();
    item.citationStatus = "已人工標記待覆核";
    item.documents.forEach((doc) => {
      if (doc.status === "草稿") doc.status = "待律師覆核";
    });
    saveState(`標記文件已審 ${item.id}`);
    render();
    showToast("已更新目前文件狀態");
  });
  $("[data-add-task]").addEventListener("click", openDeadlineForm);
  $("[data-run-conflict]").addEventListener("click", () => {
    runConflictCheck(selectedCase());
    saveState(`重新檢查利益衝突 ${selectedCase().id}`);
    render();
    showToast("已重新整理利益衝突提示");
  });

  $$("[data-open-intake]").forEach((button) => {
    button.addEventListener("click", () => {
      $("[data-intake-form]").reset();
      $("[data-intake-dialog]").showModal();
    });
  });

  $("[data-create-matter]").addEventListener("click", () => {
    const form = $("[data-intake-form]");
    if (!form.reportValidity()) return;
    try {
      createMatterDraft(form);
      $("[data-intake-dialog]").close("created");
      showToast("已建立案件草稿");
    } catch (error) {
      showToast(error.message || "資料格式不正確，未建立案件");
    }
  });

  $("[data-action-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const values = valuesFromForm(event.currentTarget);
    try {
      if (activeAction) activeAction(values);
      $("[data-action-dialog]").close("saved");
      activeAction = null;
    } catch (error) {
      showToast(error.message || "資料格式不正確，未儲存");
    }
  });

  $("[data-create-deadline]").addEventListener("click", openDeadlineForm);
  $("[data-export-calendar]").addEventListener("click", exportCalendar);
  $("[data-create-document]").addEventListener("click", openDocumentForm);
  $("[data-run-all-conflicts]").addEventListener("click", runAllConflictChecks);
  $("[data-export-conflict-report]").addEventListener("click", exportConflictReport);
  $("[data-create-party]").addEventListener("click", openPartyForm);
  $("[data-export-parties-csv]").addEventListener("click", exportPartiesCSV);
  $("[data-export-billing]").addEventListener("click", exportBillingDraft);
  $("[data-export-billing-csv]").addEventListener("click", exportBillingCSV);
  $("[data-create-template]").addEventListener("click", openTemplateForm);
  $("[data-save-settings]").addEventListener("click", openSettingsForm);
  $("[data-show-audit-log]").addEventListener("click", showAuditLog);
  $("[data-export-workspace]").addEventListener("click", () => {
    exportWorkspace().catch((error) => showToast(error.message || "備份匯出失敗"));
  });
  $("[data-export-handoff]").addEventListener("click", exportHandoffChecklist);
  $("[data-import-workspace]").addEventListener("click", () => $("[data-import-file]").click());
  $("[data-import-file]").addEventListener("change", (event) => importWorkspace(event.target.files[0]));
  $("[data-reset-workspace]").addEventListener("click", resetWorkspace);
  $("[data-show-document-versions]").addEventListener("click", showDocumentVersions);
  $("[data-save-document]").addEventListener("click", saveOpenDocument);
  $("[data-copy-document]").addEventListener("click", async () => {
    const text = $("[data-document-output]").value;
    try {
      await navigator.clipboard.writeText(text);
      showToast("已複製內容");
    } catch {
      $("[data-document-output]").select();
      showToast("請使用鍵盤複製選取內容");
    }
  });
}

bindEvents();
render();
