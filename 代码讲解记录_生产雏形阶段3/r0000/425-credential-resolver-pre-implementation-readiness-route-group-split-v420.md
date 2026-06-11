# Node v420 代码讲解：credential resolver pre-implementation readiness route group split

## 目标

v420 继续缩小中央 audit route 表，把 credential resolver 从 production readiness blocked decision 到 disabled implementation candidate review 的 4 个相邻路由抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditCredentialResolverPreImplementationReadinessRoutes.ts`。
- 该文件导出 `credentialResolverPreImplementationReadinessAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...credentialResolverPreImplementationReadinessAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 包含 blocked decision upstream echo、pre-implementation plan intake、plan intake upstream echo、disabled implementation candidate review，共 4 个 JSON/Markdown route。

## 验证

新增 `test/auditCredentialResolverPreImplementationReadinessRoutes.test.ts`，确认 route group 包含 4 个路径、中央 route 表通过 spread 注册、最新 disabled implementation candidate review JSON/Markdown route 仍然 200，并且安全字段继续保持 `executionAllowed=false`、`connectsManagedAudit=false`、`credentialValueRead=false`、`rawEndpointUrlParsed=false`、`externalRequestSent=false`、`secretProviderInstantiated=false`、`resolverClientInstantiated=false`、`automaticUpstreamStart=false`。该测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，覆盖 GitHub runner 风格的 historical fixture fallback。
