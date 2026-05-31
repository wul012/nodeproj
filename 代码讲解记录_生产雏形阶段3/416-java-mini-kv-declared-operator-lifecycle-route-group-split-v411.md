# Node v411 代码讲解：Java / mini-kv declared operator lifecycle route group split

## 目标

v411 延续 v410 的 route table 瘦身，但不继续叠加 runtime approval / evidence gate。它把 declared operator lifecycle 这一组 route 从中央 route 表拆出来，保持中央表只承担聚合职责。

## 拆分方式

- 新增 `src/routes/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.ts`。
- 该文件导出 `javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `declared-operator-lifecycle-evidence-intake` 到 `declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification`，共 8 个 JSON/Markdown route。

## 验证

新增 `test/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.test.ts`，确认 route group 包含 8 个路径、中央 route 表使用 spread 注册、最新 declared operator lifecycle archive JSON/Markdown route 仍然 200，并且安全字段仍保持 `startsJavaService=false`、`startsMiniKvService=false`、`executionAllowed=false`。
