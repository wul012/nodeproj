# Node v423 代码讲解：credential resolver fake-harness contract route group split

## 目标

v423 继续缩小中央 audit route 表，把 credential resolver fake-harness 前半段的 precheck、disabled contract、contract upstream echo 这 3 个相邻路由抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditCredentialResolverFakeHarnessContractRoutes.ts`。
- 该文件导出 `credentialResolverFakeHarnessContractAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...credentialResolverFakeHarnessContractAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 包含 test-only fake-harness precheck、disabled fake-harness contract、disabled fake-harness contract upstream echo，共 3 个 JSON/Markdown route。

## 验证

新增 `test/auditCredentialResolverFakeHarnessContractRoutes.test.ts`，确认 route group 包含 3 个路径、中央 route 表通过 spread 注册、disabled fake-harness contract upstream echo JSON/Markdown route 仍然 200，并且安全字段继续保持 `executionAllowed=false`、`connectsManagedAudit=false`、`credentialValueRead=false`、`rawEndpointUrlParsed=false`、`externalRequestSent=false`、`secretProviderInstantiated=false`、`resolverClientInstantiated=false`、`automaticUpstreamStart=false`。该测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，覆盖 GitHub runner 风格的 historical fixture fallback。
