# Design — ChouLegal

ChouLegal 是面向一般民眾的可信法律導航服務。首頁讓使用者先感到被理解，再看見資訊如何被驗證，最後取得可以採取的下一步。

## Direction

- Register：public service brand
- Layout：精簡的 Index-First 首頁；主要任務導向獨立入口，首頁只保留理解、選擇、信任與行動
- Personality：安心、可信、賦能
- Primary action：看看這裡能怎麼幫我
- Anti patterns：律師事務所式威嚇、通用 AI 聊天泡泡、制式 SaaS 功能卡片

## Visual system

- Display／wordmark：Newsreader 700；Body／UI：IBM Plex Sans TC 400／700，與母品牌一致
- Base：近白 `#f7f7f2`
- Ink：深松綠 `#10281f`
- Primary surface：松綠 `#0d2b21`
- Action：銅紅 `#b63c16`
- Maximum canvas：1440px，背景滿版，內容置中
- Corners：4px 控制元件、8px 內部區塊、16px 主要容器
- Motion：IntersectionObserver 觸發的沉穩淡入；支援 reduced motion；帶錨點頁面優先顯示內容

## Content hierarchy

1. Hero：說清楚服務與首要行動，並以真實產品介面呈現法律導航結果。
2. Trust：免費、不需註冊、來源可查、不確定性明示。
3. Paths：依生活情境進入既有六類法律工具。
4. Verification：顯示司法管轄區、來源、狀態、日期與仍待確認事項。
5. Boundaries：不假裝取代律師，該轉介時清楚轉介。
6. Final action：回到單一行動；流程、法律知識、理念與常見疑慮由各自的入口承接。

## Accessibility

- 所有互動元件必須有 hover、active 與 focus visible 狀態。
- 保留跳到主要內容連結與語意化區段。
- 文字可縮放，手機版不產生水平捲動。
- 動態效果不能阻擋內容，並遵守 prefers reduced motion。
- 不只靠顏色傳達驗證狀態。
