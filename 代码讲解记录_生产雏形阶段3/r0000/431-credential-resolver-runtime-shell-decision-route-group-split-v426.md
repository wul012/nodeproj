# Node v426 代码讲解：credential resolver runtime shell decision route group split

## 目标

v426 继续缩小中央 audit route 表，把 credential resolver runtime shell candidate gate upstream echo、candidate gate decision record、decision record upstream echo 这 3 个相邻路由抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditCredentialResolverRuntimeShellDecisionRoutes.ts`。
- 该文件导出 `credentialResolverRuntimeShellDecisionAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...credentialResolverRuntimeShellDecisionAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 包含 runtime shell candidate gate upstream echo、runtime shell candidate gate decision record、runtime shell decision record upstream echo，共 3 个 JSON/Markdown route。

## 验证

新增 `test/auditCredentialResolverRuntimeShellDecisionRoutes.test.ts`，确认 route group 包含 3 个路径、中央 route 表通过 spread 注册、runtime shell decision record upstream echo JSON/Markdown route 仍然 200，并且安全字段继续保持 `executionAllowed=false`、`connectsManagedAudit=false`、`credentialValueRead=false`、`rawEndpointUrlParsed=false`、`externalRequestSent=false`、`secretProviderInstantiated=false`、`resolverClientInstantiated=false`、`automaticUpstreamStart=false`。该测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，覆盖 GitHub runner 风格的 historical fixture fallback。
