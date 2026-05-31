# Node v418 代码讲解：sandbox endpoint credential resolver route group split

## 目标

v418 继续缩小中央 audit route 表，把 sandbox endpoint handle、credential-resolver decision、disabled precheck、test-only shell route 抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditSandboxEndpointCredentialResolverRoutes.ts`。
- 该文件导出 `sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `sandbox-endpoint-handle-preflight-review` 到 `sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification`，共 8 个 JSON/Markdown route。

## 验证

新增 `test/auditSandboxEndpointCredentialResolverRoutes.test.ts`，确认 route group 包含 8 个路径、中央 route 表使用 spread 注册、最新 test-only shell upstream echo JSON/Markdown route 仍然 200，并且安全字段继续保持 `executionAllowed=false`、`connectsManagedAudit=false`、`credentialValueRead=false`、`rawEndpointUrlParsed=false`、`automaticUpstreamStart=false`。该测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，覆盖 GitHub runner 风格的 historical fixture fallback。
