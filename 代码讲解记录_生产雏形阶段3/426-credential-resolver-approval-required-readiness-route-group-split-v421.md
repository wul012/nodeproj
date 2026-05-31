# Node v421 代码讲解：credential resolver approval-required readiness route group split

## 目标

v421 继续缩小中央 audit route 表，把 credential resolver disabled candidate upstream echo 到 approval-required implementation readiness upstream echo 的 4 个相邻路由抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditCredentialResolverApprovalRequiredReadinessRoutes.ts`。
- 该文件导出 `credentialResolverApprovalRequiredReadinessAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...credentialResolverApprovalRequiredReadinessAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 包含 disabled candidate upstream echo、approval-required boundary upstream echo、approval-required implementation readiness review、approval-required implementation readiness upstream echo，共 4 个 JSON/Markdown route。

## 验证

新增 `test/auditCredentialResolverApprovalRequiredReadinessRoutes.test.ts`，确认 route group 包含 4 个路径、中央 route 表通过 spread 注册、最新 approval-required implementation readiness upstream echo JSON/Markdown route 仍然 200，并且安全字段继续保持 `executionAllowed=false`、`connectsManagedAudit=false`、`credentialValueRead=false`、`rawEndpointUrlParsed=false`、`externalRequestSent=false`、`secretProviderInstantiated=false`、`resolverClientInstantiated=false`、`automaticUpstreamStart=false`。该测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，覆盖 GitHub runner 风格的 historical fixture fallback。
