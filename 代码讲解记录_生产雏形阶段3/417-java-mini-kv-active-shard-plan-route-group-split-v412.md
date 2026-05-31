# Node v412 代码讲解：Java / mini-kv active shard plan route group split

## 目标

v412 延续 v410-v411 的 route table 瘦身，把 active shard plan、live-read gate plan 和 operator service lifecycle 这一组 route 从中央 route 表拆出来。

## 拆分方式

- 新增 `src/routes/auditJavaMiniKvActiveShardPlanRoutes.ts`。
- 该文件导出 `javaMiniKvActiveShardPlanAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...javaMiniKvActiveShardPlanAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `active-shard-plan-evidence-intake` 到 `operator-service-lifecycle-evidence-intake-archive-verification`，共 8 个 JSON/Markdown route。

## 验证

新增 `test/auditJavaMiniKvActiveShardPlanRoutes.test.ts`，确认 route group 包含 8 个路径、中央 route 表使用 spread 注册、最新 operator service lifecycle archive JSON/Markdown route 仍然 200，并且安全字段仍保持 `readyForRuntimeLiveReadGate=false`、`startsJavaService=false`、`startsMiniKvService=false`、`executionAllowed=false`。
