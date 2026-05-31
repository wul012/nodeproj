# Node v419 代码讲解：credential resolver fake-shell readiness route group split

## 目标

v419 继续缩小中央 audit route 表，把 credential resolver fake-shell 归档校验、上游 echo 校验、production readiness decision gate 这 3 个相邻路由抽成独立 domain route group。

## 拆分方式

- 新增 `src/routes/auditCredentialResolverFakeShellReadinessRoutes.ts`。
- 该文件导出 `credentialResolverFakeShellReadinessAuditJsonMarkdownRoutes`。
- 中央 `src/routes/auditJsonMarkdownRoutes.ts` 只保留 `...credentialResolverFakeShellReadinessAuditJsonMarkdownRoutes`。

## 覆盖范围

抽出的 route 从 `credential-resolver-fake-shell-archive-verification` 到 `credential-resolver-production-readiness-decision-gate`，共 3 个 JSON/Markdown route。

## 验证

新增 `test/auditCredentialResolverFakeShellReadinessRoutes.test.ts`，确认 route group 包含 3 个路径、中央 route 表通过 spread 注册、最新 production readiness decision gate JSON/Markdown route 仍然 200，并且安全字段继续保持 `executionAllowed=false`、`connectsManagedAudit=false`、`credentialValueRead=false`、`rawEndpointUrlParsed=false`、`automaticUpstreamStart=false`。该测试强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`，覆盖 GitHub runner 风格的 historical fixture fallback。

## 测试预算稳定

`test/productionLiveProbeEvidenceArchiveVerification.test.ts` 的 route smoke 在 shard 2/4 中触发旧 10s 预算超时。手工执行同等 JSON/Markdown 注入在约 1.1s 内通过，单文件 rerun 也通过；因此 v419 只把该测试预算稳定到 30s，不改业务逻辑。
