# 第二百六十七版代码讲解：credential resolver fake-shell archive upstream echo verification

本版目标是消费 Node v266、Java v110、mini-kv v117，确认 fake-shell archive verification 已被三方一致理解。它不是 resolver 实现，也不是 secret provider 接入，而是只读的 upstream echo verification。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v266-post-fake-shell-archive-roadmap.md
```

当前链路是：

```text
Node v266 archive verification
 -> Java v110 archive echo receipt
 -> mini-kv v117 archive non-participation receipt
 -> Node v267 archive upstream echo verification
```

## 新增文件

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.test.ts
```

路由接入：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

## 主 profile

profile version 和 route：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification";
```

返回对象继续显式关闭危险动作：

```ts
executionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
secretProviderInstantiated: false,
resolverClientInstantiated: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这说明 v267 只是“对齐归档回声”，不是进入真实 resolver。

## 消费 Node v266

`createSourceNodeV266()` 直接复用 v266 service：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification({ config });
```

它只保留 v267 需要的摘要：

```ts
archiveVerificationState
archiveVerificationDigest
sourceNodeV264Ready
sourceNodeV265Ready
sourceNodeV265ConsumesUpstreamEchoes
archiveFileCount
requiredSnippetCount
matchedSnippetCount
checkCount
passedCheckCount
```

同时继续带出 no-side-effect 字段：

```ts
archiveVerificationRerunsFakeShellBehavior
executionAllowed
connectsManagedAudit
credentialValueRead
rawEndpointUrlParsed
externalRequestSent
secretProviderInstantiated
resolverClientInstantiated
schemaMigrationExecuted
automaticUpstreamStart
```

## 消费 Java v110

`createJavaV110Reference()` 只读 Java 产物：

```text
D:/javaproj/advanced-order-platform/c/110/解释/说明.md
D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/113-version-110-sandbox-endpoint-credential-resolver-fake-shell-archive-echo-receipt.md
D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptBuilder.java
D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.java
```

关键片段包括：

```text
Node v266
readyForNodeV267SandboxEndpointCredentialResolverFakeShellArchiveUpstreamEchoVerification
java-v110-credential-resolver-fake-shell-archive-echo-receipt-only
CHECK_COUNT = 28
ARCHIVE_FILE_COUNT = 9
REQUIRED_SNIPPET_COUNT = 24
archiveVerification.archiveVerificationRerunsFakeShellBehavior=false
sideEffectBoundary.credentialValueRead=false
sideEffectBoundary.approvalLedgerWritten=false
```

`readyForNodeV267Alignment` 要求 Java 同时证明：

```text
回显 Node v266 profile
下一消费者是 Node v267
9 archive file / 24 snippet / 28 checks
不重跑 fake shell
不读 credential value
不解析 raw endpoint
不发 external request
不写 approval ledger / SQL / schema migration
不 auto-start
```

## 消费 mini-kv v117

`createMiniKvV117Reference()` 读取：

```text
D:/C/mini-kv/fixtures/release/credential-resolver-fake-shell-archive-non-participation-receipt.json
D:/C/mini-kv/c/117/解释/说明.md
D:/C/mini-kv/代码讲解记录_生产雏形阶段/173-version-117-credential-resolver-fake-shell-archive-non-participation-receipt.md
```

它解析 JSON 中的：

```ts
credential_resolver_fake_shell_archive_non_participation_receipt
source_node_v264
source_node_v265
archived_evidence
summary
```

v117 必须证明：

```text
archive_files_read_by_mini_kv=false
archive_verification_reruns_fake_shell_behavior=false
resolver_client_instantiated=false
secret_provider_instantiated=false
credential_value_read_allowed=false
raw_endpoint_url_parsed=false
external_request_sent=false
storage_write_allowed=false
load_restore_compact_executed=false
setnxex_execution_allowed=false
managed_audit_storage_backend=false
order_authoritative=false
```

## Checks

`createChecks()` 把三方对齐拆成明确门：

```ts
sourceNodeV266Ready
javaV110EchoReady
miniKvV117NonParticipationReady
archiveCountsAligned
archiveSnippetsAligned
archiveNoRerunAligned
readOnlyArchiveBoundaryAligned
credentialBoundaryAligned
rawEndpointBoundaryAligned
resolverBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
upstreamActionsStillDisabled
```

其中核心对齐是：

```ts
sourceNodeV266.archiveFileCount === javaV110.archiveFileCount
&& sourceNodeV266.archiveFileCount === miniKvV117.archiveFileCount
&& sourceNodeV266.checkCount === javaV110.checkCount
&& sourceNodeV266.checkCount === miniKvV117.checkCount
```

以及：

```ts
!sourceNodeV266.archiveVerificationRerunsFakeShellBehavior
&& javaV110.noFakeShellRerunEchoed
&& !miniKvV117.archiveVerificationRerunsFakeShellBehavior
```

## Historical Fallback

本版补齐 Java v110 / mini-kv v117 的 committed sibling evidence：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
fixtures/historical/sibling-workspaces/mini-kv/...
```

测试里强制：

```ts
process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
```

这样 GitHub runner 没有本机 `D:/javaproj` 和 `D:/C/mini-kv` 时，也能跑出 ready。

## 路由接入

路由继续走统一 helper：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown,
)
```

没有新增手写 JSON / Markdown 分支。

## 测试覆盖

测试覆盖四件事：

```text
1. Node v266 + Java v110 + mini-kv v117 三方 ready
2. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时仍 ready
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
4. JSON / Markdown route 都可访问
```

关键断言：

```ts
expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
expect(profile.summary.evidenceFileCount).toBe(7);
expect(profile.summary.matchedSnippetCount).toBe(32);
```

## 验证结果

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.test.ts -> 2 files, 7 tests passed
npm test -> 207 files, 698 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/267/图片/credential-resolver-fake-shell-archive-upstream-echo-verification-v267.png
```

## 一句话总结

Node v267 把 fake-shell archive 阶段从“Node 自己归档完”推进到“三方都能回显且边界一致”：Java v110 和 mini-kv v117 都确认了 9 个 archive file、24 个 snippet、28 个 check 和 no-rerun / no credential / no resolver / no connection / no write / no auto-start 边界，但真实 resolver 仍然没有开始实现。
