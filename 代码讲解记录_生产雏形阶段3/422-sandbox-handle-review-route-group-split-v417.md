# Node v417 代码讲解：sandbox handle review route group split

## 目标

v417 继续缩小中央 audit route 表，把 sandbox handle review 的 prerequisite、contract、packet gate、decision record、closure review route 抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditSandboxHandleReviewRoutes.ts`。
- 该文件导出 `sandboxHandleReviewAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...sandboxHandleReviewAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `sandbox-handle-review-prerequisite-intake` 到 `sandbox-handle-review-prerequisite-closure-review-archive-verification`，共 10 个 JSON/Markdown route。

## 验证

新增 `test/auditSandboxHandleReviewRoutes.test.ts`，确认 route group 包含 10 个路径、中央 route 表使用 spread 注册、最新 prerequisite-closure archive JSON/Markdown route 仍然 200，并且安全字段继续保持 `rerunsLiveProbe=false`、`startsJavaService=false`、`startsMiniKvService=false`、`connectsManagedAudit=false`、`executionAllowed=false`。
