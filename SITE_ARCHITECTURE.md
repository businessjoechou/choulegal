# ChouLegal 網站架構

## 架構目標

ChouLegal 是面向一般民眾的統一法律服務品牌。使用者不需要先理解法律領域或產品名稱，而是從正在處理的問題、契約或知識需求進入。

全站只保留五個第一層入口：解決法律問題、契約工具、法律知識、如何查證、關於。

## 正式頁面樹

```text
ChouLegal 首頁 (/)
├── 解決法律問題 (/issues/)
│   ├── 工作與薪資 (/issues/work/)
│   ├── 租屋與押金 (/issues/rental/)
│   ├── 消費與退款 (/issues/consumer/)
│   ├── 家人與繼承 (/issues/family/)
│   ├── 公職與處分 (/issues/public-service/)
│   └── 警局與刑事程序 (/issues/criminal/)
├── 契約工具 (/contracts/)
│   ├── 契約翻譯 (/contracts/translate/)
│   ├── 租約翻譯 (/contracts/lease-translate/)
│   ├── 契約摘要 (/contracts/summary/)
│   └── 定型化契約檢查 (/contracts/standard-form-check/)
├── 法律知識 (/learn/)
│   ├── 法律問答 (/learn/qa/)
│   ├── 法律文章 (/learn/articles/)
│   └── 普法教育 (/learn/education/)
├── 如何查證 (/verification/)
│   ├── 資料來源 (/verification/sources/)
│   ├── 查核方法 (/verification/method/)
│   └── 服務界線 (/verification/boundaries/)
└── 關於 (/about/)
    ├── 關於周全 (/about/)
    ├── 我們的理念 (/about/mission/)
    └── 支持服務 (/about/support/)
```

隱私政策與使用條款屬於全站必要資訊，放在頁尾，不占用第一層主導覽。

## 主導覽規格

桌面版順序：

1. 解決法律問題
2. 契約工具
3. 法律知識
4. 如何查證
5. 關於
6. 開始使用（主要按鈕）

手機版使用單層選單搭配五個可展開區域。「開始使用」維持可直接看見，不藏入第二層。

## 新舊內容歸位

| 現有內容 | 目標位置 | 處理方式 |
|---|---|---|
| 首頁六類生活情境 | `/issues/` 與六個分類頁 | 保留內容，建立統一入口 |
| `guide.html` | `/learn/` 或相關文章 | 拆入法律知識，不再作為獨立主產品 |
| `learn.choulegal.com/qa/` | `/learn/qa/` | 短期保留子網域並統一品牌導覽；長期遷移 |
| `learn.choulegal.com/blog/` | `/learn/articles/` | 短期保留子網域並統一品牌導覽；長期遷移 |
| ChouLegal Learn 教育內容 | `/learn/education/` | 改為 ChouLegal 的內容區域，不作平行品牌 |
| `verification.html` | `/verification/` | 保留資料，拆出來源、方法與界線 |
| `about.html` | `/about/` | 保留並更新統一導覽 |
| `manifesto.html` | `/about/mission/` | 合併為理念頁並設定永久轉址 |
| `sponsor.html` | `/about/support/` | 改名並設定永久轉址 |
| `pricing.html` | 工具標示與 FAQ | 移出主導覽；確認無獨立需求後設定轉址 |
| `education.html`、`education-library.html` | `/learn/` | 維持永久轉址 |
| `professional.html`、`workspace.html` | `/` | 維持永久轉址，不建立專業產品線 |
| ChouCounsel | 無 | 已移除；舊網址永久轉回首頁 |

## 內部連結規則

- 首頁直接連到五個第一層入口，重要功能不超過三次點擊。
- 每個法律問題頁連到相關問答、文章與可用工具。
- 每個契約工具結果頁連到相關法律知識與服務界線。
- 每篇文章至少連回一個問題分類或契約工具。
- 所有第二層以下頁面使用與網址一致的麵包屑。
- 不留下無站內連結指向的孤立頁面。

## 實作順序

1. 統一首頁、頁首與頁尾導覽。
2. 建立五個第一層入口頁。
3. 將六類既有工具映射到「解決法律問題」。
4. 建立契約工具入口及四個功能骨架。
5. 統一 ChouLegal Learn 的品牌與返回路徑。
6. 遷移查證、理念與支持頁並設定永久轉址。
7. 更新 sitemap、canonical、麵包屑與結構化資料。
8. 完成手機版、鍵盤操作、無障礙與斷鏈驗證。
