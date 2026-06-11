# Node v413 代码讲解：Java / mini-kv shard readiness evidence route group split

## 目标

v413 继续瘦身中央 route 表，把 shard-readiness evidence 这组历史路线抽出成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditJavaMiniKvShardReadinessEvidenceRoutes.ts`。
- 该文件导出 `javaMiniKvShardReadinessEvidenceAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...javaMiniKvShardReadinessEvidenceAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `java-mini-kv-shard-readiness-evidence-consumption` 到 `java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification`，共 4 个 JSON/Markdown route。

## 验证

新增 `test/auditJavaMiniKvShardReadinessEvidenceRoutes.test.ts`，确认 route group 包含 4 个路径、中央 route 表使用 spread 注册、最新 completed shard-readiness archive JSON/Markdown route 仍然 200，并且安全字段仍保持 `rerunsLiveRead=false`、`startsJavaService=false`、`startsMiniKvService=false`、`executionAllowed=false`。
