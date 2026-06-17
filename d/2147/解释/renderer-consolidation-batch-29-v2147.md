# v2147 renderer consolidation batch 29

v2147 延续 v2146 的复杂 renderer 路线，继续迁移 controlled-read-only-shard-preview live-read-only-window 族里相邻的 5 个紧凑 h3/flatMap renderer：evidence intake ledger、evidence intake review package、manual evidence entry worksheet、operator evidence import preflight、operator evidence value draft。

本版同时做了一个小重构：把重复出现的 `Blocked Reasons` 行渲染收进 `verificationReportBuilder` 的 `renderVerificationBlockedReasonLines`。这样 v2146 已迁移的 stage ledger、runbook、command worksheet、evidence packet 不再各自保留同一份本地 helper；v2147 新迁移的五个 renderer 也直接复用同一个 helper。这个 helper 只表达旧格式里的 `- none` 或 `- CODE` 行，不改变报告语义。

验证方式仍然按 byte-identical 收口。迁移前对 9 个受影响 renderer 输出抓取长度和 SHA-256；迁移后重新渲染同一批 fixture，结果 9/9 无 mismatch。focused tests 覆盖 builder、v2146 受 helper 影响的四个 renderer、v2147 新迁移的五个 renderer，共 10 files / 42 tests passed。

迁移后统计：renderer 总数 245，builder-backed 132，未迁移 113；剩余 h3 43、for 9、map 60、flatMap 54。下一版仍可沿这一族推进 operator evidence fresh sibling intake、value supply envelope、approval packet draft/review 等相邻文件。

跨项目方面，Java 和 mini-kv 推荐并行。v2147 不读取新的 sibling evidence，不启动 Java/mini-kv，不改变合同或路由，只处理 Node 本地 renderer 拼装。
