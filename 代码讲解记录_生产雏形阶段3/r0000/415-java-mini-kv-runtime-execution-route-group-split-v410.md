# Node v410 代码讲解：Java / mini-kv runtime execution route group split

## 目标

v410 不继续叠加 approval / evidence gate，而是把已经 closeout 的 runtime execution route 组从中央 route 表中拆出来，降低 `auditJsonMarkdownRoutes.ts` 的膨胀速度。

## 拆分方式

- 新增 `src/routes/auditJavaMiniKvRuntimeExecutionRoutes.ts`。
- 该文件导出 `javaMiniKvRuntimeExecutionAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...javaMiniKvRuntimeExecutionAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `runtime-execution-artifact-upstream-progress-intake` 到 `runtime-execution-pass-evidence-closeout`，共 14 个 JSON/Markdown route。

## 验证

新增 `test/auditJavaMiniKvRuntimeExecutionRoutes.test.ts`，确认 route group 包含 14 个路径、中央 route 表使用 spread 注册、v409 closeout JSON/Markdown route 仍然 200，并且安全字段仍保持 `rerunsSmoke=false`、`startsJavaService=false`、`startsMiniKvService=false`、`executionAllowed=false`。
