# 352. Node v347：minimal read-only integration smoke archive verification

## 版本进度

v347 消费 v346 的 smoke rehearsal 归档，判断这份真实只读探测证据属于哪一种结果：

```text
all-read-passed
read-window-unavailable
invalid-read-contract
```

本轮实际归档结果是 `read-window-unavailable`。这意味着需要外部窗口启动 Java / mini-kv 后重试，不是让 Java / mini-kv 改代码。

## 关键代码

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification.ts:1) 是主服务。它读取 `d/346` 下的 JSON、Markdown、smoke summary、browser snapshot、HTML、截图、说明、代码讲解和计划索引，并生成 archive verification digest。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationTypes.ts:1) 固定 v347 的归档结果类型和安全边界：`rerunsLiveProbe`、`startsJavaService`、`startsMiniKvService`、`connectsManagedAudit`、`readsManagedAuditCredential`、`executionAllowed` 都是 `false`。

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationRenderer.ts:1) 输出 Markdown，展示 source Node v346、archive verification、archive references、checks、summary 和 next actions。

[auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1109) 注册 v347 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification
```

[managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification.test.ts:1) 覆盖三条路径：正常归档验证、缺归档 fail-closed、JSON/Markdown route 输出。

## 核心流程

1. `createArchiveReferences(...)` 枚举 v346 必需归档文件。
2. `readParsedArchiveEvidence(...)` 读取 v346 JSON、Markdown、summary 和文档。
3. `createSourceNodeV346(...)` 从 v346 JSON 中抽取 smoke state、target 统计和边界字段。
4. `determineArchiveResult(...)` 把 v346 smoke state 固化为归档结果。
5. `createChecks(...)` 验证 v346 归档文件完整、summary 与 JSON 一致、说明和代码讲解明确写出 read-window-unavailable 不是代码变更需求。

## 验证结果

- `npm.cmd run typecheck`：通过
- focused vitest：v347 1 file / 3 tests 通过
- 小组 vitest：v346 + v347 2 files / 7 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：200 JSON / 200 Markdown，`archiveResult=read-window-unavailable`
- 浏览器截图：Playwright MCP data-page summary 截图已保存；route 真值以 HTTP evidence 为准

## 项目成熟度

v347 的价值是防止把联调不可达误判为代码缺陷。它把 v346 的现实结果收束成明确的 rerun decision 输入：需要外部启动窗口，而不是继续让 Java / mini-kv 做无效补丁。
