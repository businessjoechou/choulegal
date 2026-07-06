# 三大產品線逐頁資料來源查證總表

查核日期：2026-07-06

## 查核結論

本報告把正式產品線中的網頁檔案逐一列入，並依公開站查核資料、官方來源對照、本機檔案掃描結果分成「已查證／待確認／未查證」。沒有公開 crawl 或沒有官方來源對照的頁面，不列為已完成法源查核。

- 逐頁檔案總數：367
- 已查證：254
- 待確認：31
- 未查證：82
- 第1批補查：補上 19 筆法律常數官方來源，待確認頁面由 38 降為 31，已查證頁面由 203 增為 210。
- 第2批複查：從未查證群移出 44 頁；其中 7 頁補官方條文來源，37 頁確認沒有具體法源/裁判/法律常數資料。未查證頁面由 126 降為 82。
- 法條引用查核：2341 筆；已驗證 2311 筆；錯誤/需修正 30 筆；待人工法條查核 0 筆。
- 司法院/憲法法庭引用查核：27 筆；已驗證 27 筆；待確認 0 筆。
- 法律常數/計算資料：581 筆；官方來源已對照 169 筆；待補官方來源 182 筆；例題/計算輸入 162 筆；非法律常數 68 筆。

## 狀態定義

- 已查證：公開頁已進入查核流程，偵測到的法條、裁判/釋憲字號、已分類常數有官方來源對照，且該頁沒有待修正或待補來源項目；或本機頁面已盤點且未偵測法律法源資料。
- 待確認：已有部分官方來源或已修正程式碼，但仍有法律常數/金額/比例待補官方來源，或前次公開 crawl 的錯誤引用修正後尚待重新線上複查。
- 未查證：公開 crawl 沒有抓到正文，或本機/後台/動態頁面含具體法律或計算資料但尚未建立逐筆官方來源查核。

## 官方來源範圍

- 全國法規資料庫：法條原文與整部法規索引。
- 司法院裁判書系統：判決、裁定、裁判字號。
- 憲法法庭／大法官網站：憲判、釋字、憲法法庭資料。
- 財政部、勞動部、健保署、教育部、交通部民航局、運動部、經濟部、衛福部食藥署等主管機關公告：稅額、最低工資、投保級距、費率、定型化契約應記載事項等計算常數。
- 本機官方法規快取：`法律AI自檢系統/law-registry-cache/`，作為全國法規資料庫內容的離線比對資料。

完整逐頁來源 URL 已放在 CSV 台帳：`/Users/chouchunyeh/Desktop/周全法律科技-ChouLegal/audit/public-source-audit-2026-07-06/all_webpage_file_verification_ledger.csv`。

## 分類輸出檔

- 已查證群：`/Users/chouchunyeh/Desktop/周全法律科技-ChouLegal/audit/public-source-audit-2026-07-06/all_webpage_verified.csv`
- 待確認群：`/Users/chouchunyeh/Desktop/周全法律科技-ChouLegal/audit/public-source-audit-2026-07-06/all_webpage_pending_confirmation.csv`
- 未查證群：`/Users/chouchunyeh/Desktop/周全法律科技-ChouLegal/audit/public-source-audit-2026-07-06/all_webpage_unverified.csv`
- 錯誤/需修正群：`/Users/chouchunyeh/Desktop/周全法律科技-ChouLegal/audit/public-source-audit-2026-07-06/all_webpage_error_or_needs_fix.csv`
- 第1批人工補查來源：`/Users/chouchunyeh/Desktop/周全法律科技-ChouLegal/audit/public-source-audit-2026-07-06/manual_constant_source_overrides_2026-07-06_batch1.csv`
- 第2批未查證複查：`/Users/chouchunyeh/Desktop/周全法律科技-ChouLegal/audit/public-source-audit-2026-07-06/unverified_recheck_overrides_2026-07-06_batch2.csv`

錯誤/需修正群目前是「前次公開 crawl 曾發現錯誤引用，程式碼已修正或需修正，但尚待重新線上 crawl 複查」的頁面；我沒有把這些頁面歸入完全已查證。

## 三大產品線狀態總覽

| 產品線 | 子產品/平台 | 已查證 | 待確認 | 未查證 | 小計 |
|---|---:|---:|---:|---:|---:|
| 周全 AI | 周全 AI 官網 | 1 | 0 | 0 | 1 |
| 商業版 5 AI Pro | ETP 企業工作台 | 110 | 0 | 77 | 187 |
| 民眾版 | 勞動權益計算平台 | 23 | 11 | 0 | 34 |
| 民眾版 | 周全主站 | 13 | 1 | 4 | 18 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 37 | 15 | 1 | 53 |
| 民眾版 | 民眾入口 | 5 | 0 | 0 | 5 |
| 民眾版 | 消費爭議權益計算平台 | 40 | 3 | 0 | 43 |
| 民眾版 | 租賃權益計算平台 | 25 | 1 | 0 | 26 |

## 完整逐頁清單

| 產品線 | 子產品/平台 | 網頁/工具 | 檔案 | 對應公開 URL/路由 | 資料來源 | 狀態 | 備註 |
|---|---|---|---|---|---|---|---|
| 民眾版 | 消費爭議權益計算平台 | 周全帳號與資料｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/account.html | https://consumer.choulegal.com/account.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 消費爭議權益計算平台 | 廣告不實求償（消保法 §22 / 公平交易法 §21）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/ad-misleading.html | https://consumer.choulegal.com/ad-misleading.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | AI 應對顧問｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/ai-fallback.html | https://consumer.choulegal.com/ai-fallback.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=41 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 有線電視訂閱爭議（有線電視服務應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/cable-tv.html | https://consumer.choulegal.com/cable-tv.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 消費爭議權益計算平台 | 條款是否構成契約檢查（消保法 §13 / §14 / §15）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/clause-binding.html | https://consumer.choulegal.com/clause-binding.html | 6 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 消費爭議申訴流程（消保法 §43）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/complaint-guide.html | https://consumer.choulegal.com/complaint-guide.html | 11 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 消費爭議存證信函產生器 — 訂金／鑑賞期／瑕疵／退費｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/consumer-letter.html | https://consumer.choulegal.com/consumer-letter.html | 6 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第2批複查：頁面具體條號已對應官方來源。 |
| 民眾版 | 消費爭議權益計算平台 | 定型化契約總診斷（消保法 §11~§17 全流程）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/contract-master.html | https://consumer.choulegal.com/contract-master.html | 8 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 七天鑑賞期試算（消保法 §19）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/cooling-off.html | https://consumer.choulegal.com/cooling-off.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 補習班退費試算（短期補習班定型化契約應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/cram-school.html | https://consumer.choulegal.com/cram-school.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第1批補查已補 5 筆常數官方來源；本頁未剩待補來源或待修正引用。 |
| 民眾版 | 消費爭議權益計算平台 | 信用卡盜刷免責試算（24 小時黃金期）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/credit-card-fraud.html | https://consumer.choulegal.com/credit-card-fraud.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 消費爭議權益計算平台 | 跨境網購爭議處理（信用卡爭議款）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/cross-border-purchase.html | https://consumer.choulegal.com/cross-border-purchase.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=19 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 解約 vs 減價 vs 換貨 決策（民法 §359）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/defect-remedy.html | https://consumer.choulegal.com/defect-remedy.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 訂金退還主張（民法 §249）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/deposit.html | https://consumer.choulegal.com/deposit.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 健身房終止契約退費（健身中心契約應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/fitness.html | https://consumer.choulegal.com/fitness.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=17<br>https://law.sports.gov.tw/LawContent.aspx?id=FL042360 | 已查證 | 第1批補查已補 1 筆常數官方來源；本頁未剩待補來源或待修正引用。 |
| 民眾版 | 消費爭議權益計算平台 | 航班延誤／取消求償（國內線應記載事項 / 民航法 §47）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/flight-delay.html | https://consumer.choulegal.com/flight-delay.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第1批補查已補 5 筆常數官方來源；本頁未剩待補來源或待修正引用。 |
| 民眾版 | 消費爭議權益計算平台 | 食品安全求償（食安法 §56）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/food-safety.html | https://consumer.choulegal.com/food-safety.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 不得記載事項黑名單檢查（消保法 §17 II）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/forbidden-clauses.html | https://consumer.choulegal.com/forbidden-clauses.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=12<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=17 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 網路詐騙退費路徑｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/fraud-refund.html | https://consumer.choulegal.com/fraud-refund.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 消費爭議權益計算平台 | 生前殯葬契約退費（生前殯葬服務契約應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/funeral.html | https://consumer.choulegal.com/funeral.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=51<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0020040&flno=51 | 待確認 | 第1批補查已補 1 筆常數官方來源；剩餘待補 1 筆。 |
| 民眾版 | 消費爭議權益計算平台 | ConsumerPro｜消費爭議事件包與權益工具 | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/index.html | https://consumer.choulegal.com/ | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 消費爭議權益計算平台 | 商品／食品標示不實求償（消保法 §22 / 食安法 §28）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/label-misrepresentation.html | https://consumer.choulegal.com/label-misrepresentation.html | 10 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 民事訴訟裁判費試算（民訴 §77-13）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/litigation-fee.html | https://consumer.choulegal.com/litigation-fee.html | 6 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第1批補查已補 4 筆常數官方來源；本頁未剩待補來源或待修正引用。 |
| 民眾版 | 消費爭議權益計算平台 | 登入周全帳號｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/login.html | https://consumer.choulegal.com/login.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 消費爭議權益計算平台 | 美容／醫美療程退費爭議（美容與瘦身美容定型化契約）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/medical-beauty.html | https://consumer.choulegal.com/medical-beauty.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第1批補查已補 1 筆常數官方來源；本頁未剩待補來源或待修正引用。 |
| 民眾版 | 消費爭議權益計算平台 | 手機綁約解約違約金試算（行動通信定型化契約應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/mobile-contract.html | https://consumer.choulegal.com/mobile-contract.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=11 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 消費爭議權益計算平台 | 線上遊戲爭議（線上遊戲定型化契約應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/online-game.html | https://consumer.choulegal.com/online-game.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 個資外洩求償（個資法 §29）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/pdpa-breach.html | https://consumer.choulegal.com/pdpa-breach.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第1批補查已補 1 筆常數官方來源；本頁未剩待補來源或待修正引用。 |
| 民眾版 | 消費爭議權益計算平台 | 預售屋糾紛權益（預售屋買賣應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/presale-house.html | https://consumer.choulegal.com/presale-house.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=17 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 網路標錯價爭議（民法 §86 / §88 / §153）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/price-mistake.html | https://consumer.choulegal.com/price-mistake.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 3 筆待補官方來源。 |
| 民眾版 | 消費爭議權益計算平台 | 隱私權政策｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/privacy.html | https://consumer.choulegal.com/privacy.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 消費爭議權益計算平台 | 懲罰性賠償試算（消保法 §51）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/punitive.html | https://consumer.choulegal.com/punitive.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=51 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 修繕承攬瑕疵主張（民法 §492–§499）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/repair-defect.html | https://consumer.choulegal.com/repair-defect.html | 12 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 定型化契約 30 日審閱期（消保法 §11-1）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/review-period.html | https://consumer.choulegal.com/review-period.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=11-1 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 消費爭議自救指南 — 遇到這些情況怎麼辦｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/self-help.html | https://consumer.choulegal.com/self-help.html | 7 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 定型化契約條款顯失公平檢查（消保法 §12）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/standard-form-check.html | https://consumer.choulegal.com/standard-form-check.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 訂閱制自動續約／難取消爭議（消保法 §19 / §11-1 / §12）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/subscription-trap.html | https://consumer.choulegal.com/subscription-trap.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 使用者條款｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/terms.html | https://consumer.choulegal.com/terms.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=365<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=51 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 旅遊契約取消手續費（國外旅遊契約應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/tour.html | https://consumer.choulegal.com/tour.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=17 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 中古車買賣糾紛（中古汽車買賣應記載事項 + 民法 §354）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/used-car.html | https://consumer.choulegal.com/used-car.html | 6 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 禮券／儲值 業者倒閉求償（履約保證／信託）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/voucher-insolvency.html | https://consumer.choulegal.com/voucher-insolvency.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第1批補查已補 1 筆常數官方來源；本頁未剩待補來源或待修正引用。 |
| 民眾版 | 消費爭議權益計算平台 | 瑕疵擔保時效查詢（民法 §365）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/warranty-period.html | https://consumer.choulegal.com/warranty-period.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 消費爭議權益計算平台 | 婚宴／辦桌取消退定金試算（訂席外燴定型化契約應記載事項）｜ConsumerPro | /Users/chouchunyeh/Desktop/choulegal/apps/consumerpro/wedding-banquet.html | https://consumer.choulegal.com/wedding-banquet.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=17 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 建立 Workspace — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/(auth)/onboarding/page.tsx | ETP_PAGE:/onboarding | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 通知中心 · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/(notifications-shell)/notifications/page.tsx | ETP_PAGE:/[workspace]/notifications | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | AI 助手 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/ai/page.tsx | ETP_PAGE:/[workspace]/ai | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 行事曆 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/calendar/page.tsx | ETP_PAGE:/[workspace]/calendar | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | HR 合規 checklist — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/compliance-check/page.tsx | ETP_PAGE:/[workspace]/compliance-check | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 消費爭議 AI 助理 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/ai/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/ai | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 編輯客訴 — 消費爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/cases/[id]/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/cases/[id] | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 新增客訴 — 消費爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/cases/new/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/cases/new | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 客訴案件列表 — 消費爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/cases/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/cases | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 15 日回覆期限追蹤 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/complaint-15days/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/complaint-15days | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 鑑賞期適用判定 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/cooling-off/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/cooling-off | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 廣告不實風險評估 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/false-ad/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/false-ad | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 消費爭議 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 懲罰性賠償風險試算 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/punitive/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/punitive | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 廣告爭議答覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/response-templates/advertising/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/response-templates/advertising | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 15 日妥適處理回覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/response-templates/complaint-15days/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/response-templates/complaint-15days | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 七天鑑賞期請求答覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/response-templates/cooling-off/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/response-templates/cooling-off | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 商品瑕疵主張答覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/response-templates/defect/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/response-templates/defect | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 邀請消費爭議調解回覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/response-templates/mediation-invite/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/response-templates/mediation-invite | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 客訴答覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/response-templates/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/response-templates | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 定型化契約條款爭議答覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/response-templates/standard-form/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/response-templates/standard-form | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 定型化契約合規檢查 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/standard-form/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/standard-form | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 客人時效到期日查詢 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/consumer-dispute/warranty/page.tsx | ETP_PAGE:/[workspace]/consumer-dispute/warranty | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | app/[workspace]/dashboard | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/dashboard/page.tsx | ETP_PAGE:/[workspace]/dashboard | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 員工個資權利 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/employees/[id]/privacy/page.tsx | ETP_PAGE:/[workspace]/employees/[id]/privacy | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | HR Pro 試算機 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/calculator/page.tsx | ETP_PAGE:/[workspace]/hrpro/calculator | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 公部門儀表板 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/civil-service/dashboard/page.tsx | ETP_PAGE:/[workspace]/hrpro/civil-service/dashboard | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 俸給試算 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/civil-service/payroll-calc/page.tsx | ETP_PAGE:/[workspace]/hrpro/civil-service/payroll-calc | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 退撫試算 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/civil-service/pension-calc/page.tsx | ETP_PAGE:/[workspace]/hrpro/civil-service/pension-calc | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 考績審核 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/civil-service/performance/page.tsx | ETP_PAGE:/[workspace]/hrpro/civil-service/performance | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 公部門人事令 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/civil-service/personnel-order/page.tsx | ETP_PAGE:/[workspace]/hrpro/civil-service/personnel-order | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | hrpro/employees/import | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/employees/import/page.tsx | ETP_PAGE:/[workspace]/hrpro/employees/import | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 公部門快捷 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/government-quick/page.tsx | ETP_PAGE:/[workspace]/hrpro/government-quick | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 自我健檢 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/health-check/page.tsx | ETP_PAGE:/[workspace]/hrpro/health-check | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | HRPro 儀表板 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/page.tsx | ETP_PAGE:/[workspace]/hrpro | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 薪資月結 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/payroll/page.tsx | ETP_PAGE:/[workspace]/hrpro/payroll | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 時薪工計薪 — 餐飲快捷 · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/restaurant-quick/hourly-wage/page.tsx | ETP_PAGE:/[workspace]/hrpro/restaurant-quick/hourly-wage | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 餐飲快捷 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/restaurant-quick/page.tsx | ETP_PAGE:/[workspace]/hrpro/restaurant-quick | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 颱風假規則 — 餐飲快捷 · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/restaurant-quick/typhoon/page.tsx | ETP_PAGE:/[workspace]/hrpro/restaurant-quick/typhoon | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | What-If 情境模擬器 — HR Pro · 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/scenarios/page.tsx | ETP_PAGE:/[workspace]/hrpro/scenarios | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 服務費分配 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/service-charge/page.tsx | ETP_PAGE:/[workspace]/hrpro/service-charge | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 公司福利政策設定 — HR 系統 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/settings/policy/page.tsx | ETP_PAGE:/[workspace]/hrpro/settings/policy | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 自動排班 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/shifts/auto/page.tsx | ETP_PAGE:/[workspace]/hrpro/shifts/auto | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 排班表 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/shifts/page.tsx | ETP_PAGE:/[workspace]/hrpro/shifts | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 投保薪資合規檢查 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/tools/insurance-compliance/page.tsx | ETP_PAGE:/[workspace]/hrpro/tools/insurance-compliance | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 基本工資合規檢查 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/tools/min-wage/page.tsx | ETP_PAGE:/[workspace]/hrpro/tools/min-wage | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 加班費逐筆明細 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/tools/overtime-detail/page.tsx | ETP_PAGE:/[workspace]/hrpro/tools/overtime-detail | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 育嬰留停 + 產假試算 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/tools/parental-leave/page.tsx | ETP_PAGE:/[workspace]/hrpro/tools/parental-leave | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 薪資單核對 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/tools/payslip-checker/page.tsx | ETP_PAGE:/[workspace]/hrpro/tools/payslip-checker | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 工資結構分析 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/tools/wage-analysis/page.tsx | ETP_PAGE:/[workspace]/hrpro/tools/wage-analysis | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 工時合規檢查 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/hrpro/tools/work-hours/page.tsx | ETP_PAGE:/[workspace]/hrpro/tools/work-hours | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 判決整理 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/judgments/page.tsx | ETP_PAGE:/[workspace]/judgments | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 勞資爭議 AI 助理 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/ai/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/ai | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 編輯案件 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/cases/[id]/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/cases/[id] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 新增案件 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/cases/new/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/cases/new | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 案件管理 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/cases/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/cases | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 解僱合法性檢查 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/dismissal-risk/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/dismissal-risk | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 主管機關訪查準備清單 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/inspection-checklist/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/inspection-checklist | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 競業禁止條款效力檢查 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/non-compete/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/non-compete | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 職災補償試算 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/occupational-injury/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/occupational-injury | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 員工追討加班費風險試算 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/overtime-claim/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/overtime-claim | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 勞資爭議處理系統 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/page.tsx | ETP_PAGE:/[workspace]/labor-dispute | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 解僱通知書範本（§12 不經預告） — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/response-templates/dismissal-notice/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/response-templates/dismissal-notice | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 加班費追討答覆範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/response-templates/overtime-dispute/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/response-templates/overtime-dispute | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 勞資爭議應對範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/response-templates/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/response-templates | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 資遣通知書範本 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/response-templates/severance-notice/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/response-templates/severance-notice | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 資遣費試算 — 勞資爭議 · 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/labor-dispute/severance-pay/page.tsx | ETP_PAGE:/[workspace]/labor-dispute/severance-pay | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 法規異動詳細 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/law-diff/[id]/page.tsx | ETP_PAGE:/[workspace]/law-diff/[id] | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 法規異動追蹤 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/law-diff/page.tsx | ETP_PAGE:/[workspace]/law-diff | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/onboarding/welcome | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/onboarding/welcome/page.tsx | ETP_PAGE:/[workspace]/onboarding/welcome | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 工作區 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/page.tsx | ETP_PAGE:/[workspace] | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 美容美髮 行業風險試算 — 估算法定風險敞口｜周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/scenarios/beauty/page.tsx | ETP_PAGE:/[workspace]/scenarios/beauty | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 補習班／幼兒園 行業風險試算 — 估算法定風險敞口｜周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/scenarios/cram-school/page.tsx | ETP_PAGE:/[workspace]/scenarios/cram-school | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 行業風險試算 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/scenarios/page.tsx | ETP_PAGE:/[workspace]/scenarios | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 餐飲業 行業風險試算 — 估算法定風險敞口｜周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/scenarios/restaurant/page.tsx | ETP_PAGE:/[workspace]/scenarios/restaurant | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 服飾零售 行業風險試算 — 估算法定風險敞口｜周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/scenarios/retail/page.tsx | ETP_PAGE:/[workspace]/scenarios/retail | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 排班合規檢查 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/schedule-check/page.tsx | ETP_PAGE:/[workspace]/schedule-check | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 稽核紀錄 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/audit/page.tsx | ETP_PAGE:/[workspace]/settings/audit | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 訂閱管理 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/billing/page.tsx | ETP_PAGE:/[workspace]/settings/billing | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 升級訂閱 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/billing/upgrade/[module]/page.tsx | ETP_PAGE:/[workspace]/settings/billing/upgrade/[module] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 白標設定 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/branding/page.tsx | ETP_PAGE:/[workspace]/settings/branding | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 法規異動 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/law-updates/page.tsx | ETP_PAGE:/[workspace]/settings/law-updates | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 成員管理 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/members/page.tsx | ETP_PAGE:/[workspace]/settings/members | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 內部規範覆寫 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/override-rules/page.tsx | ETP_PAGE:/[workspace]/settings/override-rules | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 設定 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/page.tsx | ETP_PAGE:/[workspace]/settings | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 個資法遵循 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/privacy/page.tsx | ETP_PAGE:/[workspace]/settings/privacy | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | MFA 裝置 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/security/devices/page.tsx | ETP_PAGE:/[workspace]/settings/security/devices | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 啟用 MFA — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/security/enroll/page.tsx | ETP_PAGE:/[workspace]/settings/security/enroll | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 安全與 MFA — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/[workspace]/settings/security/page.tsx | ETP_PAGE:/[workspace]/settings/security | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 周全帳號 — ChouLegal | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/account/page.tsx | ETP_PAGE:/account | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | Admin · 法規異動候選 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/admin/law-candidates/page.tsx | ETP_PAGE:/admin/law-candidates | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | Admin · Law Changes — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/admin/law-changes/page.tsx | ETP_PAGE:/admin/law-changes | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | Admin · Law Impact Detail — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/admin/law-impact/[id]/page.tsx | ETP_PAGE:/admin/law-impact/[id] | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | Admin · 法規異動影響分析 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/admin/law-impact/page.tsx | ETP_PAGE:/admin/law-impact | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | Admin · Demo Leads — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/admin/leads/page.tsx | ETP_PAGE:/admin/leads | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | Admin · Waitlist — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/admin/waitlist/page.tsx | ETP_PAGE:/admin/waitlist | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/audit/export | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/audit/export/route.ts | ETP_ROUTE:/api/[workspace]/audit/export | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/audit | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/audit/route.ts | ETP_ROUTE:/api/[workspace]/audit | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/billing/checkout | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/billing/checkout/route.ts | ETP_ROUTE:/api/[workspace]/billing/checkout | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/billing | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/billing/route.ts | ETP_ROUTE:/api/[workspace]/billing | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/branding | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/branding/route.ts | ETP_ROUTE:/api/[workspace]/branding | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/calc-report | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/calc-report/route.ts | ETP_ROUTE:/api/[workspace]/calc-report | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/calculator/explain-pdf | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/calculator/explain-pdf/route.ts | ETP_ROUTE:/api/[workspace]/calculator/explain-pdf | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/calendar/[id] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/calendar/[id]/route.ts | ETP_ROUTE:/api/[workspace]/calendar/[id] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/calendar | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/calendar/route.ts | ETP_ROUTE:/api/[workspace]/calendar | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/assets | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/assets/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/assets | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/calcs | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/calcs/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/calcs | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | collaborators/[collabId]/resend | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/collaborators/[collabId]/resend/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/collaborators/[collabId]/resend | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [id]/collaborators/[collabId] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/collaborators/[collabId]/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/collaborators/[collabId] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/collaborators | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/collaborators/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/collaborators | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [id]/deadlines/[deadlineId] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/deadlines/[deadlineId]/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/deadlines/[deadlineId] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/deadlines | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/deadlines/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/deadlines | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/document-pdf | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/document-pdf/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/document-pdf | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/draft-doc | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/draft-doc/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/draft-doc | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/heirs | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/heirs/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/heirs | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | cases/[id]/report-pdf | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/report-pdf/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id]/report-pdf | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/cases/[id] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/[id]/route.ts | ETP_ROUTE:/api/[workspace]/cases/[id] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/cases | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/cases/route.ts | ETP_ROUTE:/api/[workspace]/cases | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/civil-service/performance | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/civil-service/performance/route.ts | ETP_ROUTE:/api/[workspace]/civil-service/performance | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | personnel-order/[id]/pdf | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/civil-service/personnel-order/[id]/pdf/route.ts | ETP_ROUTE:/api/[workspace]/civil-service/personnel-order/[id]/pdf | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | civil-service/personnel-order/[id] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/civil-service/personnel-order/[id]/route.ts | ETP_ROUTE:/api/[workspace]/civil-service/personnel-order/[id] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/civil-service/personnel-order | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/civil-service/personnel-order/route.ts | ETP_ROUTE:/api/[workspace]/civil-service/personnel-order | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 合規自檢：${ctx.workspace.name} | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/compliance-check/route.ts | ETP_ROUTE:/api/[workspace]/compliance-check | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | employees/[id]/erasure | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/employees/[id]/erasure/route.ts | ETP_ROUTE:/api/[workspace]/employees/[id]/erasure | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | employees/[id]/export | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/employees/[id]/export/route.ts | ETP_ROUTE:/api/[workspace]/employees/[id]/export | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/employees/[id] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/employees/[id]/route.ts | ETP_ROUTE:/api/[workspace]/employees/[id] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/employees/import | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/employees/import/route.ts | ETP_ROUTE:/api/[workspace]/employees/import | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | employees/import/template | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/employees/import/template/route.ts | ETP_ROUTE:/api/[workspace]/employees/import/template | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/employees | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/employees/route.ts | ETP_ROUTE:/api/[workspace]/employees | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 人資 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/hrpro/health-check/pdf/route.ts | ETP_ROUTE:/api/[workspace]/hrpro/health-check/pdf | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | hrpro/restaurant-quick/save | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/hrpro/restaurant-quick/save/route.ts | ETP_ROUTE:/api/[workspace]/hrpro/restaurant-quick/save | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | hrpro/scenarios/simulate | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/hrpro/scenarios/simulate/route.ts | ETP_ROUTE:/api/[workspace]/hrpro/scenarios/simulate | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | hrpro/shifts/[id] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/hrpro/shifts/[id]/route.ts | ETP_ROUTE:/api/[workspace]/hrpro/shifts/[id] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/hrpro/shifts | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/hrpro/shifts/route.ts | ETP_ROUTE:/api/[workspace]/hrpro/shifts | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/invitations/[token] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/invitations/[token]/route.ts | ETP_ROUTE:/api/[workspace]/invitations/[token] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 判決整理：${query} | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/judgments/search/route.ts | ETP_ROUTE:/api/[workspace]/judgments/search | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/law-subscriptions | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/law-subscriptions/route.ts | ETP_ROUTE:/api/[workspace]/law-subscriptions | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/members/[userId] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/members/[userId]/route.ts | ETP_ROUTE:/api/[workspace]/members/[userId] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/members | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/members/route.ts | ETP_ROUTE:/api/[workspace]/members | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/override-rules | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/override-rules/route.ts | ETP_ROUTE:/api/[workspace]/override-rules | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [employeeId]/[period]/payslip-pdf | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/payroll/[employeeId]/[period]/payslip-pdf/route.ts | ETP_ROUTE:/api/[workspace]/payroll/[employeeId]/[period]/payslip-pdf | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | [workspace]/payroll/[employeeId] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/payroll/[employeeId]/route.ts | ETP_ROUTE:/api/[workspace]/payroll/[employeeId] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/payroll | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/payroll/route.ts | ETP_ROUTE:/api/[workspace]/payroll | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/[workspace]/stats | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/[workspace]/stats/route.ts | ETP_ROUTE:/api/[workspace]/stats | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/account/data | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/account/data/route.ts | ETP_ROUTE:/api/account/data | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | law-candidates/[id]/accept | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/admin/law-candidates/[id]/accept/route.ts | ETP_ROUTE:/api/admin/law-candidates/[id]/accept | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/admin/law-candidates | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/admin/law-candidates/route.ts | ETP_ROUTE:/api/admin/law-candidates | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/admin/law-changes | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/admin/law-changes/route.ts | ETP_ROUTE:/api/admin/law-changes | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/ai/chat | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/ai/chat/route.ts | ETP_ROUTE:/api/ai/chat | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/auth/install-session | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/auth/install-session/route.ts | ETP_ROUTE:/api/auth/install-session | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | auth/mfa/backup-codes | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/auth/mfa/backup-codes/route.ts | ETP_ROUTE:/api/auth/mfa/backup-codes | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | auth/mfa/devices | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/auth/mfa/devices/route.ts | ETP_ROUTE:/api/auth/mfa/devices | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | auth/mfa/enroll | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/auth/mfa/enroll/route.ts | ETP_ROUTE:/api/auth/mfa/enroll | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | auth/mfa/status | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/auth/mfa/status/route.ts | ETP_ROUTE:/api/auth/mfa/status | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | auth/mfa/unenroll | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/auth/mfa/unenroll/route.ts | ETP_ROUTE:/api/auth/mfa/unenroll | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | auth/mfa/verify-enroll | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/auth/mfa/verify-enroll/route.ts | ETP_ROUTE:/api/auth/mfa/verify-enroll | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | ${days} 天後到期：${dl.title ?? kindLabel} | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/cron/deadline-scan/route.ts | ETP_ROUTE:/api/cron/deadline-scan | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/cron/dispatch-law-diffs | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/cron/dispatch-law-diffs/route.ts | ETP_ROUTE:/api/cron/dispatch-law-diffs | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/cron/law-changes-poll | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/cron/law-changes-poll/route.ts | ETP_ROUTE:/api/cron/law-changes-poll | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/cron/law-monitor-trigger | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/cron/law-monitor-trigger/route.ts | ETP_ROUTE:/api/cron/law-monitor-trigger | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/cron/refresh-laws | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/cron/refresh-laws/route.ts | ETP_ROUTE:/api/cron/refresh-laws | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/cron/verify-pending-cases | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/cron/verify-pending-cases/route.ts | ETP_ROUTE:/api/cron/verify-pending-cases | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/invite/[token] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/invite/[token]/route.ts | ETP_ROUTE:/api/invite/[token] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | invite/workspace/[token] | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/invite/workspace/[token]/route.ts | ETP_ROUTE:/api/invite/workspace/[token] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/law-diff/subscribe | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/law-diff/subscribe/route.ts | ETP_ROUTE:/api/law-diff/subscribe | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 取消訂閱 — 周全 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/law-diff/unsubscribe/route.ts | ETP_ROUTE:/api/law-diff/unsubscribe | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/notifications/mark-all-read | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/notifications/mark-all-read/route.ts | ETP_ROUTE:/api/notifications/mark-all-read | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | app/api/notifications | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/notifications/route.ts | ETP_ROUTE:/api/notifications | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/onboarding/check-slug | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/onboarding/check-slug/route.ts | ETP_ROUTE:/api/onboarding/check-slug | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | app/api/unlock | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/unlock/route.ts | ETP_ROUTE:/api/unlock | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | app/api/waitlist | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/waitlist/route.ts | ETP_ROUTE:/api/waitlist | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/webhooks/resend | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/webhooks/resend/route.ts | ETP_ROUTE:/api/webhooks/resend | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/webhooks/stripe | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/webhooks/stripe/route.ts | ETP_ROUTE:/api/webhooks/stripe | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | api/webhooks/tappay | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/api/webhooks/tappay/route.ts | ETP_ROUTE:/api/webhooks/tappay | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | app/auth/callback | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/auth/callback/route.ts | ETP_ROUTE:/auth/callback | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | app/auth/set-password | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/auth/set-password/page.tsx | ETP_PAGE:/auth/set-password | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 導入洽詢 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/consult/page.tsx | ETP_PAGE:/consult | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | etp/app/dashboard | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/dashboard/page.tsx | ETP_PAGE:/dashboard | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 功能 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/features/page.tsx | ETP_PAGE:/features | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/locked/page.tsx | ETP_PAGE:/locked | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | app/login/mfa-challenge | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/login/mfa-challenge/page.tsx | ETP_PAGE:/login/mfa-challenge | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | etp/app/login | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/login/page.tsx | ETP_PAGE:/login | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | etp/app/logout | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/logout/route.ts | ETP_ROUTE:/logout | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 周全專業版 — 沒有法務的公司，也能合規不被罰 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/page.tsx | ETP_PAGE:/ | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 方案 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/pricing/page.tsx | ETP_PAGE:/pricing | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 商業版 5 AI Pro | ETP 企業工作台 | ${r.name} — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/roles/[role]/page.tsx | ETP_PAGE:/roles/[role] | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 商業版 5 AI Pro | ETP 企業工作台 | 選身份 — 周全專業版 | /Users/chouchunyeh/Desktop/choulegal/apps/etp/app/roles/page.tsx | ETP_PAGE:/roles | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 找不到頁面 404｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/404.html | https://inheritance.choulegal.com/404.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 車禍損害賠償試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/accident.html | https://inheritance.choulegal.com/accident.html | 13 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 我的帳號｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/account.html | https://inheritance.choulegal.com/account.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 贍養費試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/alimony.html | https://inheritance.choulegal.com/alimony.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 2 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 脫產偵測模組｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/asset-detection.html | https://inheritance.choulegal.com/asset-detection.html | 14 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 登入中…｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/auth-callback.html | https://inheritance.choulegal.com/auth-callback.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 中華民國遺產計算器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/calculator.html | https://inheritance.choulegal.com/calculator.html | 23 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 照顧者繼承特別貢獻試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/caregiver.html | https://inheritance.choulegal.com/caregiver.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 客戶案件管理｜InheritancePro — 已整合至期限管理儀表板 | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/case-manager.html | https://inheritance.choulegal.com/case-manager.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 子女扶養費計算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/child-support.html | https://inheritance.choulegal.com/child-support.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 繼承期限管理儀表板｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/deadline-dashboard.html | https://inheritance.choulegal.com/deadline-dashboard.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 離婚協議書草稿產生器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/divorce-agreement.html | https://inheritance.choulegal.com/divorce-agreement.html | 7 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 離婚損害賠償精算｜侵害配偶權求償｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/divorce-damages.html | https://inheritance.choulegal.com/divorce-damages.html | 15 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 遺產稅精算工作底稿｜已整合至遺產繼承計算器 | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/estate-tax-detail.html | https://inheritance.choulegal.com/estate-tax-detail.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 特留分侵害試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/forced-share.html | https://inheritance.choulegal.com/forced-share.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 轉跳中... | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/gift-planner.html | https://inheritance.choulegal.com/gift-planner.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 贈與稅試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/gift-tax.html | https://inheritance.choulegal.com/gift-tax.html | 14 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 7 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | google40bcdb71d64c63a5 | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/google40bcdb71d64c63a5.html | https://inheritance.choulegal.com/google40bcdb71d64c63a5.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | InheritancePro｜民法財產權事件包與工具 | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/index.html | https://inheritance.choulegal.com/ | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 轉跳中... | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/infidelity-damages.html | https://inheritance.choulegal.com/infidelity-damages.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 遺產分割協議書產生器（通用骨架）｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/inheritance-agreement.html | https://inheritance.choulegal.com/inheritance-agreement.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第2批複查：頁面具體條號已對應官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 繼承流程時間軸｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/inheritance-timeline.html | https://inheritance.choulegal.com/inheritance-timeline.html | 21 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 繼承房貸陷阱試算｜賣屋前一定要知道的 146 萬｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/inherited-property-trap.html | https://inheritance.choulegal.com/inherited-property-trap.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 16 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 意外事故保險金合計試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-accident-combined.html | https://inheritance.choulegal.com/insurance-accident-combined.html | 26 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 3 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 轉跳中... | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-amt.html | https://inheritance.choulegal.com/insurance-amt.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 保單受益人順位分配試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-beneficiary-order.html | https://inheritance.choulegal.com/insurance-beneficiary-order.html | 10 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 保單價值準備金離婚財產分配計算器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-divorce.html | https://inheritance.choulegal.com/insurance-divorce.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 壽險保單稅務風險評估｜AMT + 遺產稅 + 特留分｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-estate-risk.html | https://inheritance.choulegal.com/insurance-estate-risk.html | 17 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 8 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 轉跳中... | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-forced-share.html | https://inheritance.choulegal.com/insurance-forced-share.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 保單要保人變更贈與稅計算器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-gift-tax.html | https://inheritance.choulegal.com/insurance-gift-tax.html | 16 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 5 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 保單借款 vs 解約決策器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-loan-vs-surrender.html | https://inheritance.choulegal.com/insurance-loan-vs-surrender.html | 7 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 19 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 要保人過世保單處理決策器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/insurance-policyholder-death.html | https://inheritance.choulegal.com/insurance-policyholder-death.html | 12 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 法定利率利息計算器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/interest-calc.html | https://inheritance.choulegal.com/interest-calc.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 11 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | InheritancePro｜請選擇您的身份 | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/landing.html | https://inheritance.choulegal.com/landing.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 試算分析依據｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/legal-basis.html | https://inheritance.choulegal.com/legal-basis.html | 29 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 8 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 限定繼承債務試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/limited-inheritance.html | https://inheritance.choulegal.com/limited-inheritance.html | 8 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 訴訟強度評估｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/litigation-strength.html | https://inheritance.choulegal.com/litigation-strength.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 登入｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/login.html | https://inheritance.choulegal.com/login.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 未成年損害賠償試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/minor-damages.html | https://inheritance.choulegal.com/minor-damages.html | 8 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | InheritancePro — 募資簡報 | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/pitch.html | https://inheritance.choulegal.com/pitch.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1030-1<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1057 | 已查證 | 第2批複查：頁面具體條號已對應官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 消滅時效計算器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/prescription.html | https://inheritance.choulegal.com/prescription.html | 13 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 所有用戶免費｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/pricing.html | https://inheritance.choulegal.com/pricing.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 隱私權政策｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/privacy.html | https://inheritance.choulegal.com/privacy.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 婚後財產判斷器｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/property-check.html | https://inheritance.choulegal.com/property-check.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 房地合一稅試算（繼承後出售）｜InheritancePro — 已整合至不動產繼承稅務試算 | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/property-sale-tax.html | https://inheritance.choulegal.com/property-sale-tax.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 剩餘財產差額分配請求權｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/property-split.html | https://inheritance.choulegal.com/property-split.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 不動產繼承稅務試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/real-estate.html | https://inheritance.choulegal.com/real-estate.html | 18 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 13 筆待補官方來源。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 繼承與財產權自救指南 — 遇到這些情況怎麼辦｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/self-help.html | https://inheritance.choulegal.com/self-help.html | 6 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 和解金額試算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/settlement-calc.html | https://inheritance.choulegal.com/settlement-calc.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 股票繼承估算｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/stock-inheritance.html | https://inheritance.choulegal.com/stock-inheritance.html | 6 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 使用者條款｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/terms.html | https://inheritance.choulegal.com/terms.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | Core 模組測試（開發用） | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/test-core.html | https://inheritance.choulegal.com/test-core.html | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 民眾版 | 民法財產權／繼承贈與計算平台 | 遺囑效力評估｜InheritancePro | /Users/chouchunyeh/Desktop/choulegal/apps/inheritancepro/will-validity.html | https://inheritance.choulegal.com/will-validity.html | 19 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 找不到頁面 404｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/404.html | https://labor.choulegal.com/404.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 勞動權益計算平台 | 我的帳號｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/account.html | https://labor.choulegal.com/account.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 勞動權益計算平台 | 特休未休折現計算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/annual-leave.html | https://labor.choulegal.com/annual-leave.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=38 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 平均薪資精算器｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/avg-wage.html | https://labor.choulegal.com/avg-wage.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 4 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 勞基法合規自檢｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/compliance-audit.html | https://labor.choulegal.com/compliance-audit.html | 19 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 資遣合法性檢查｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/dismissal-checklist.html | https://labor.choulegal.com/dismissal-checklist.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 勞資爭議調解流程導引｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/dispute-guide.html | https://labor.choulegal.com/dispute-guide.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 人事成本計算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/hr-cost.html | https://labor.choulegal.com/hr-cost.html | 17 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 10 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | LaborPro｜勞基法事件包與權益工具 | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/index.html | https://labor.choulegal.com/ | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 勞動權益計算平台 | 我被高薪低報了嗎？投保薪資自查｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/insurance-underreport.html | https://labor.choulegal.com/insurance-underreport.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=14 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 勞保費用與給付試算｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/labor-insurance.html | https://labor.choulegal.com/labor-insurance.html | 7 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 22 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 勞工自保存證信函產生器 — 資遣費／工資加班費／特休／職災｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/labor-letter.html | https://labor.choulegal.com/labor-letter.html | 7 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第2批複查：頁面具體條號已對應官方來源。 |
| 民眾版 | 勞動權益計算平台 | 全假別權益計算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/leave-calc.html | https://labor.choulegal.com/leave-calc.html | 11 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 登入｜LaborPro — 周全法律科技 | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/login.html | https://labor.choulegal.com/login.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 勞動權益計算平台 | 最低薪資合規檢查｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/min-wage.html | https://labor.choulegal.com/min-wage.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 競業禁止合法性分析｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/non-compete.html | https://labor.choulegal.com/non-compete.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 離職預告期計算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/notice-calc.html | https://labor.choulegal.com/notice-calc.html | 7 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 加班費逐筆結算｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/overtime-detail.html | https://labor.choulegal.com/overtime-detail.html | 13 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 加班費計算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/overtime.html | https://labor.choulegal.com/overtime.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 育嬰假與津貼試算｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/parental-leave.html | https://labor.choulegal.com/parental-leave.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 7 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 薪資單檢查器｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/payslip-checker.html | https://labor.choulegal.com/payslip-checker.html | 12 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 7 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 勞基法違規罰鍰速查｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/penalty-lookup.html | https://labor.choulegal.com/penalty-lookup.html | 29 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 退休金請領計算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/pension-claim.html | https://labor.choulegal.com/pension-claim.html | 22 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 8 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 勞退提撥試算｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/pension.html | https://labor.choulegal.com/pension.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 4 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 隱私權政策｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/privacy.html | https://labor.choulegal.com/privacy.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 勞動權益計算平台 | 勞動權益受損自救指南 — 遇到這些情況怎麼辦｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/self-help.html | https://labor.choulegal.com/self-help.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 離職結算檢查表｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/settlement-calc.html | https://labor.choulegal.com/settlement-calc.html | 26 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 5 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 資遣費計算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/severance.html | https://labor.choulegal.com/severance.html | 11 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 解僱成本估算機｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/termination-cost.html | https://labor.choulegal.com/termination-cost.html | 27 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 前次公開 crawl 發現 10 筆錯誤引用；程式碼已修正者仍需重新線上 crawl 複查。 |
| 民眾版 | 勞動權益計算平台 | 使用者條款｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/terms.html | https://labor.choulegal.com/terms.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 勞動權益計算平台 | 薪資認定分析器｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/wage-analysis.html | https://labor.choulegal.com/wage-analysis.html | 12 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 工時合規檢查｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/work-hours.html | https://labor.choulegal.com/work-hours.html | 15 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 勞動權益計算平台 | 職災補償試算｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/work-injury.html | https://labor.choulegal.com/work-injury.html | 17 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 7 筆待補官方來源。 |
| 民眾版 | 勞動權益計算平台 | 不當解雇分析｜LaborPro | /Users/chouchunyeh/Desktop/choulegal/apps/laborpro/wrongful-dismissal.html | https://labor.choulegal.com/wrongful-dismissal.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 周全帳號與資料｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/account.html | https://rental.choulegal.com/account.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 租賃權益計算平台 | 租約違法條款體檢（這些條款其實無效）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/contract-clause-check.html | https://rental.choulegal.com/contract-clause-check.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 漏水／壁癌／凶宅未告知，房客能主張什麼？｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/defect.html | https://rental.choulegal.com/defect.html | 5 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 押金上限與退租返還試算（土地法 §99／租賃專法 §7）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/deposit-cap.html | https://rental.choulegal.com/deposit-cap.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=99<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=7 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 退租押金扣抵界線檢查（押金被亂扣？）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/deposit-deduction.html | https://rental.choulegal.com/deposit-deduction.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 租屋糾紛自救指南 — 遇到這些情況怎麼辦｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/dispute-guide.html | https://rental.choulegal.com/dispute-guide.html | 9 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 1 筆待補官方來源。 |
| 民眾版 | 租賃權益計算平台 | 租屋爭議該走哪條路？（調解/小額訴訟/支付命令）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/dispute-router.html | https://rental.choulegal.com/dispute-router.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 提前解約違約金試算（定型化契約／租賃專法 §11）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/early-termination.html | https://rental.choulegal.com/early-termination.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=11 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 房東超收電費退費試算（電費新制）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/electricity-overcharge.html | https://rental.choulegal.com/electricity-overcharge.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=56-1 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 租屋存證信函範本產生器 — 押金催告／修繕／終止／拒絕搬遷｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/evidence-letter.html | https://rental.choulegal.com/evidence-letter.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 租賃權益計算平台 | 入住／退租點交存證清單（押金自保）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/handover-checklist.html | https://rental.choulegal.com/handover-checklist.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 租屋糾紛求助與申訴管道 — 該找誰｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/help-channels.html | https://rental.choulegal.com/help-channels.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 租到違章建築（頂加／隔間套房）房客怎麼辦｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/illegal-structure.html | https://rental.choulegal.com/illegal-structure.html | 6 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | RentalPro｜租屋事件包與權益工具 | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/index.html | https://rental.choulegal.com/ | 27 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 房東能否合法收回房屋判斷（土地法 §100／租賃專法 §10）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/landlord-recovery.html | https://rental.choulegal.com/landlord-recovery.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 登入周全帳號｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/login.html | https://rental.choulegal.com/login.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 租賃權益計算平台 | 隱私政策｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/privacy.html | https://rental.choulegal.com/privacy.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 租賃權益計算平台 | 房東擅自進入／裝監視器／騷擾怎麼辦｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/quiet-enjoyment.html | https://rental.choulegal.com/quiet-enjoyment.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 租金爭議與租期內漲租檢核｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/rent-cap.html | https://rental.choulegal.com/rent-cap.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=97 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 房東中途漲租合法嗎？（租期內可以漲租嗎）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/rent-increase.html | https://rental.choulegal.com/rent-increase.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=421 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 修繕義務與自費求償試算（民法 §429／§430／§431）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/repair-cost.html | https://rental.choulegal.com/repair-cost.html | 4 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 房子被賣掉／被法拍，租約還算數嗎？（買賣不破租賃）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/sale-foreclosure.html | https://rental.choulegal.com/sale-foreclosure.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=425 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 轉租／二房東合法嗎？（民法443）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/sublease.html | https://rental.choulegal.com/sublease.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=443<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=444 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 房租報稅扣除試算 + 設籍補貼權利｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/tax-residence-subsidy.html | https://rental.choulegal.com/tax-residence-subsidy.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=17<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=17 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 租賃權益計算平台 | 使用者條款｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/terms.html | https://rental.choulegal.com/terms.html | 3 個官方來源；完整 URL 見 CSV 台帳 | 已查證 | 第2批複查：頁面具體條號已對應官方來源。 |
| 民眾版 | 租賃權益計算平台 | 房東斷水斷電／換鎖逼遷怎麼辦（這是違法的）｜RentalPro | /Users/chouchunyeh/Desktop/choulegal/apps/rentalpro/utility-cutoff.html | https://rental.choulegal.com/utility-cutoff.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=423<br>https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=304 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 周全 AI | 周全 AI 官網 | 周全 ChouLegal — 已搬遷 | ai-choulegal/index.html | https://ai.choulegal.com/ | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 周全主站 | 關於 — 周全 ChouLegal | choulegal-site/about.html | https://choulegal.com/about.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 周全主站 | App 隱私權政策｜周全法律科技 ChouLegal | choulegal-site/app/privacy.html | https://choulegal.com/app/privacy.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=3 | 已查證 | 第2批複查：頁面具體條號已對應官方來源。 |
| 民眾版 | 周全主站 | App 使用條款｜周全法律科技 ChouLegal | choulegal-site/app/terms.html | https://choulegal.com/app/terms.html | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 民眾版 | 周全主站 | AVS 驗證工具 — AI 推理軌跡四階段確定性驗算 | choulegal-site/avs-verify.html | https://choulegal.com/avs-verify.html | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 民眾版 | 周全主站 | AVS — AI Verification Standard · AI 計算自檢系統 by ChouLegal | choulegal-site/avs.html | https://choulegal.com/avs.html | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 民眾版 | 周全主站 | 法律教育平台 — 法律科普、國考與轉學考資料庫 | choulegal-site/education.html | https://choulegal.com/education.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 周全主站 | 法律指南｜周全法律科技 — 看得懂的中華民國法律 | choulegal-site/guide.html | https://choulegal.com/guide.html | 23 個官方來源；完整 URL 見 CSV 台帳 | 待確認 | 法律常數/金額/比例尚有 4 筆待補官方來源。 |
| 民眾版 | 周全主站 | 周全 ChouLegal — 免費法律工具與企業合規服務 | choulegal-site/index.html | https://choulegal.com/ | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=12 | 已查證 | 公開頁已納入官方來源查核；未見待修正或待補來源項目。 |
| 民眾版 | 周全主站 | LAVS — Legal AI Verification Standard · 法律 AI 自檢系統 by ChouLegal | choulegal-site/lavs.html | https://choulegal.com/lavs.html | 未建立官方來源對照 | 未查證 | 本機檔案含法律/權益/計算語彙，但未納入本次公開來源查核。 |
| 民眾版 | 周全主站 | 為什麼做這件事 — 周全 ChouLegal | choulegal-site/manifesto.html | https://choulegal.com/manifesto.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 周全主站 | 方案 — 周全 ChouLegal | choulegal-site/pricing.html | https://choulegal.com/pricing.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 周全主站 | 隱私權政策｜周全法律科技 ChouLegal | choulegal-site/privacy.html | https://choulegal.com/privacy.html | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=8 | 已查證 | 第2批複查：頁面具體條號已對應官方來源。 |
| 民眾版 | 周全主站 | 周全專業版 — 企業合規、爭議處理與判決整理 | choulegal-site/professional.html | https://choulegal.com/professional.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 周全主站 | 如何駕馭高自主 AI 模型 — 周全 · 成大簡報 | choulegal-site/slides/high-autonomy-models.html | https://choulegal.com/slides/high-autonomy-models.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 周全主站 | 成大簡報 · 周全 ChouLegal | choulegal-site/slides/ncku.html | https://choulegal.com/slides/ncku.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 周全主站 | AI 實作與學習程式設計的互依互生 — 成大簡報 | choulegal-site/slides/python-ai-talk.html | https://choulegal.com/slides/python-ai-talk.html | 不適用（未偵測到需查證法源） | 已查證 | 本機檔案已盤點，未偵測法律法源、裁判字號或法律計算資料。 |
| 民眾版 | 周全主站 | 支持周全 — ChouLegal | choulegal-site/sponsor.html | https://choulegal.com/sponsor.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 周全主站 | 使用者條款｜周全法律科技 ChouLegal | choulegal-site/terms.html | https://choulegal.com/terms.html | 不適用（第2批複查：未呈現具體需查證法源） | 已查證 | 第2批複查：頁面未呈現具體條號、裁判字號、法律常數或可計算結果；屬入口/帳號/通知/導頁/政策或後台功能頁。 |
| 民眾版 | 民眾入口 | 周全 AI 已搬遷｜ChouLegal | people-choulegal/ai-triage.html | https://people.choulegal.com/ai-triage.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民眾入口 | 事件工具包詳情｜周全民眾版 | people-choulegal/event-kit.html | https://people.choulegal.com/event-kit.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民眾入口 | 事件工具包｜周全民眾版 | people-choulegal/event-kits.html | https://people.choulegal.com/event-kits.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民眾入口 | 周全民眾版｜法律事件包與權益工具 | people-choulegal/index.html | https://people.choulegal.com/ | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |
| 民眾版 | 民眾入口 | 單一工具列表｜周全民眾版 | people-choulegal/tools.html | https://people.choulegal.com/tools.html | 不適用（未偵測到需查證法源） | 已查證 | 公開頁已掃描，未偵測需引用官方法源的法條、裁判或法律常數。 |

## 待處理清單

- 待確認：31 個檔案，多數原因是法律常數/金額/比例還缺主管機關來源，或前次錯誤引用已修但尚待重新線上複查。
- 未查證：82 個檔案，多數是 ETP 後台/動態頁內含具體公式、法條或範本，需逐頁建立官方來源對照。
- AVS/LAVS 與 ETP 實際試算頁保留在未查證，因為它們含大量公式、案例或 law cache，不適合只用標題判斷轉綠。

## 完整官方來源 URL 附錄

- https://cons.judicial.gov.tw/docdata.aspx?fid=100&id=310601
- https://cons.judicial.gov.tw/docdata.aspx?fid=100&id=310757
- https://cons.judicial.gov.tw/docdata.aspx?fid=100&id=310952
- https://cons.judicial.gov.tw/docdata.aspx?fid=100&id=310972
- https://cons.judicial.gov.tw/docdata.aspx?fid=38&id=310013
- https://cons.judicial.gov.tw/docdata.aspx?fid=38&id=349244
- https://edu.law.moe.gov.tw/LawContent.aspx?id=GL001234
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPAA%2c100%2c%e5%88%a4%2c574%2c20110421%2c1&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPHV%2c107%2c%e5%ae%b6%e4%b8%8a%2c186%2c20181217%2c2&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSM%2c99%2c%e5%8f%b0%e4%b8%8a%2c1892%2c20100331&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c100%2c%e5%8f%b0%e4%b8%8a%2c450%2c20110324&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c100%2c%e5%8f%b0%e4%b8%8a%2c801%2c20110526&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c102%2c%e5%8f%b0%e4%b8%8a%2c1283%2c20130704&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c102%2c%e5%8f%b0%e4%b8%8a%2c1660%2c20130904&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c104%2c%e5%8f%b0%e4%b8%8a%2c2206%2c20151118&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c104%2c%e5%8f%b0%e4%b8%8a%2c521%2c20150326&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c104%2c%e5%8f%b0%e4%b8%8a%2c773%2c20150430&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c106%2c%e5%8f%b0%e6%8a%97%2c912%2c20170913&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c107%2c%e5%8f%b0%e4%b8%8a%2c1395%2c20190718%2c1&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c55%2c%e5%8f%b0%e4%b8%8a%2c2053%2c19660811%2c1&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c68%2c%e5%8f%b0%e4%b8%8a%2c3792%2c19791214%2c1&ot=in
- https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPSV%2c91%2c%e5%8f%b0%e4%b8%8a%2c556%2c20020328&ot=in
- https://law.moea.gov.tw/LawContent.aspx?id=GL000996
- https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=B0000001
- https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060001
- https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060125
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=100
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1017
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1020-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=103
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1030
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1030-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1030-3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1030-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1050
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1052
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1055
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1055-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1056
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1057
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1065
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=108
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1084
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1116-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1117
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1118-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1119
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=112
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=113
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1132
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1137
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1138
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1140
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1144
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1146
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1148
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1148-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1149
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1151
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1153
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1154
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1156
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1157
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1159
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=116
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1160
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1162-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1164
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1165
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1173
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1174
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1176
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1186
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1187
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1189
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=119
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1190
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1190-1195
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1191
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1192
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1194
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1195
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1196
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1198
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=12
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=12-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1209
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1219
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1220
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1221
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1222
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1223
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1224
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=1225
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=125
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=126
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=127
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=128
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=129
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=130
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=137
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=139-143
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=144
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=148
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=15
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=153
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-12
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-5
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-6
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-7
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=16-8
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=17
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=17-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=179
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=184
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=185
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=187
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=188
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=192
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=193
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=194
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=195
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=197
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=20
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=20-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=203
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=205
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=217
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=225
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=226
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=227
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=229
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=23
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=233
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=24
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=244
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=245
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=249
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=25
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=266
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=28
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=29
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=315-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=32
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=35
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=354
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=356
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=359
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=364
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=365
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=38
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=40
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=421
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=423
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=424
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=425
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=429
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=430
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=431
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=432
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=435
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=436-8
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=44
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=443
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=444
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=45
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=46
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=487
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=492
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=493
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=494
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=495
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=498
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=499
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=5
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=5-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=508
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=522
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=54
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=59
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=59-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=6
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=60
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=64
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=65
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=736
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=737
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=738
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=77
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=86
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=88
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0000001&flno=92
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0010001&flno=436-8
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0010001&flno=508
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=B0010001&flno=77-13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=1056
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=15
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=195
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=197
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=210
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=239
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=244
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=304
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=306
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=315-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=356
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=C0000001&flno=80
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0020040&flno=51
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0030006&flno=48
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=100
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=26
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=431
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=56-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=73
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=97
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060001&flno=99
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=10
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=429
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=430
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=431
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=7
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=D0060125&flno=99
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340001&flno=12-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340001&flno=21
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340001&flno=35
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340001&flno=41
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=119
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=12
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=12-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=14-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=17
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=4-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=4-5
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=71
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=10
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=12-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=15
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=16
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=16-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=16-9
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=17
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=17-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=18
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=19
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=20
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=22
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=23
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=24
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=26
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=5
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=5-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340096&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340096&flno=17
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340096&flno=28-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340102&flno=4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340115&flno=12
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=107
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=110
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=111
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=112
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=113
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=116
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=119
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=120
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=131
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=16
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=19-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=34
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=35
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390002&flno=65
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390060&flno=27
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390060&flno=7
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0390067&flno=2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0020004&flno=2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0020024&flno=10
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=28
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=8
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0070001&flno=9
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0080011&flno=9
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0150002&flno=21
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0150002&flno=51
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0150002&flno=56
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=11-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=12
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=148
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=15
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=153
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=17
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=18
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=19
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=19-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=195
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=21
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=22
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=227
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=24
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=249
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=252
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=29
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=30
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=339
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=354
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=359
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=364
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=41
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=43
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=44
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=45-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=47
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=493
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=494
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=495
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=498
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=499
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=50
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=51
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=56
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=56-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=77
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=77-13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=77-16
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=77-18
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=78
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=79
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=86
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=88
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=92
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0040001&flno=28
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0040001&flno=51
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0040001&flno=56
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0060001&flno=18
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0060001&flno=19
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0060001&flno=20
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0060001&flno=27
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0060001&flno=84
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=10
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=11-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=11-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=11-3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=11-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=11-5
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=12
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=13
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=15
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=16
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=17
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=19
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=19-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=193
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=195
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=2-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=20
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=21
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=22
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=23
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=24
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=24-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=25
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=26
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=27
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=28
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=30
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=30-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=32
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=32-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=33
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=34
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=35
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=36
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=37
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=38
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=38-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=39
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=40
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=483-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=49
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=5
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=50
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=52
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=53
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=54
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=55
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=56
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=59
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=59-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=59-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=59-3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=59-4
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=6
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=60
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=68
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=7
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=7-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=7-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=7-3
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=70
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=72
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=74
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=75
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=77
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=78
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=79
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=79-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=8
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=80
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=80-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=81
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=82
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=84-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=9
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=9-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030014&flno=11
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030014&flno=16
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030014&flno=17
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030014&flno=21
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=12
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=15
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=23
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=24
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=31
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=49
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=50
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=53
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=54
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=55
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=6
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=78
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=79
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030020&flno=9
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=14
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=15
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=34
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=58
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=58-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=58-2
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=59
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=65-1
- https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0050001&flno=72
- https://law.sports.gov.tw/LawContent.aspx?id=FL042360
- https://laws.mol.gov.tw/news.aspx?msgid=6726
- https://www.caa.gov.tw/Article.aspx?a=1395&lang=1
- https://www.fda.gov.tw/tc/includes/GetFile.ashx?id=f637418305121255264&type=1
- https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=e4170c62974c4c7c9fa78c24c9fcb130
- https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=f2a148bdd1614850be9fa56df8cc9d5c
- https://www.mol.gov.tw/1607/1632/1633/84947/post
- https://www.nhi.gov.tw/ch/cp-19418-9eefb-2576-1.html
