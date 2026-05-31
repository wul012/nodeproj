# Node v414 代码讲解：minimal shard readiness route group split

## 目标

v414 继续缩小中央 audit route 表，把 minimal shard-readiness contract、live-read、compatibility、regular-gate 这一组注册抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditMinimalShardReadinessRoutes.ts`。
- 该文件导出 `minimalShardReadinessAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...minimalShardReadinessAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `shard-readiness-contract-consumer-gate` 到 `minimal-shard-readiness-regular-gate-archive-verification`，共 6 个 JSON/Markdown route。

## 验证

新增 `test/auditMinimalShardReadinessRoutes.test.ts`，确认 route group 包含 6 个路径、中央 route 表使用 spread 注册、最新 regular-gate archive JSON/Markdown route 仍然 200，并且安全字段继续保持 `rerunsLiveRead=false`、`startsJavaService=false`、`startsMiniKvService=false`、`executionAllowed=false`。
