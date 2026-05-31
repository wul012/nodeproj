# Node v425 代码讲解：credential resolver disabled runtime shell readiness route group split

## 目标

v425 继续缩小中央 audit route 表，把 credential resolver disabled runtime shell 的 pre-plan、design review、upstream echo、implementation candidate gate 这 4 个相邻路由抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditCredentialResolverDisabledRuntimeShellReadinessRoutes.ts`。
- 该文件导出 `credentialResolverDisabledRuntimeShellReadinessAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...credentialResolverDisabledRuntimeShellReadinessAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 包含 disabled runtime shell pre-plan intake、design review、upstream echo verification、implementation candidate gate，共 4 个 JSON/Markdown route。

## 验证

新增 `test/auditCredentialResolverDisabledRuntimeShellReadinessRoutes.test.ts`，确认 route group 包含 4 个路径、中央 route 表通过 spread 注册、disabled runtime shell implementation candidate gate JSON/Markdown route 仍然 200，并且安全字段继续保持 `executionAllowed=false`、`connectsManagedAudit=false`、`credentialValueRead=false`、`rawEndpointUrlParsed=false`、`externalRequestSent=false`、`secretProviderInstantiated=false`、`resolverClientInstantiated=false`、`automaticUpstreamStart=false`。该测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，覆盖 GitHub runner 风格的 historical fixture fallback。
