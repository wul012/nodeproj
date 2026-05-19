# 第二百六十三版代码讲解：sandbox endpoint credential resolver disabled precheck upstream echo verification

本版目标是消费 Node v262、Java v106 和 mini-kv v115，把 disabled credential resolver precheck 的三方证据链收束成 Node 侧 verification profile。它不是 resolver 实现，也不是 secret provider 适配器；它只验证“禁用态 precheck 是否被三项目一致确认”。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v260-post-credential-resolver-decision-roadmap.md
```

当前链路是：

```text
Node v260 sandbox endpoint credential resolver decision record
 -> Java v105 credential resolver decision echo marker
 -> mini-kv v114 credential resolver non-participation receipt
 -> Node v261 credential resolver upstream echo verification
 -> Node v262 disabled credential resolver precheck
 -> Java v106 disabled resolver precheck echo marker
 -> mini-kv v115 disabled resolver precheck non-participation receipt
 -> Node v263 disabled resolver precheck upstream echo verification
```

v263 完成后，`v260-post-credential-resolver-decision-roadmap.md` 这一批次收口；后续如果继续做 resolver shell，需要另起计划，并保持 test-only / no credential value / no raw endpoint / no external request。

## 新增文件

本版新增四个核心文件：

```text
src/services/historicalEvidenceReportUtils.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationRenderer.ts
```

测试文件：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.test.ts
```

路由接入：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

## shared historical evidence helper

`historicalEvidenceReportUtils.ts` 是本版的小质量优化。v261 已经有 `evidenceFile()`、`snippet()`、`readJsonObject()` 等本地 helper，v263 如果继续复制会让 evidence reader 继续膨胀，所以本版先抽出共享工具：

```ts
export function evidenceFile(id: string, filePath: string): HistoricalEvidenceFile
export function snippet(id: string, filePath: string, expectedText: string): HistoricalSnippetMatch
export function readJsonObject(filePath: string): Record<string, unknown>
export function objectField(input: Record<string, unknown>, key: string): Record<string, unknown>
export function stringArrayField(input: Record<string, unknown>, key: string): string[]
```

它底层仍然走已有的 `resolveHistoricalEvidencePath()`、`readHistoricalEvidenceFile()` 和 `parseJsonEvidence()`。这意味着：

```text
本机有 D:/javaproj、D:/C/mini-kv 时读真实兄弟仓库
GitHub runner 没有兄弟仓库时读 fixtures/historical fallback
UTF-8 BOM JSON 仍由 parseJsonEvidence 兜底
```

## 主 profile

v263 的 profile version 和 route 在服务顶部定义：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification";
```

返回对象继续把真实执行边界写死关闭：

```ts
credentialResolverExecutionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
credentialValueLoaded: false,
credentialValueStored: false,
credentialValueIncluded: false,
rawEndpointUrlParsed: false,
rawEndpointUrlIncluded: false,
externalRequestSent: false,
secretProviderInstantiated: false,
resolverClientInstantiated: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

所以 `verificationState=...ready` 只表示证据链已对齐，不表示 resolver 可执行。

## 消费 Node v262

主服务先读取 v262：

```ts
const sourceNodeV262 = createSourceNodeV262(
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({ config: input.config }),
);
```

`createSourceNodeV262()` 把 v262 的合约压成 source reference。它检查 v262 仍然是禁用态：

```ts
reference.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
&& reference.resolverImplementationStatus === "not-implemented"
&& reference.secretProviderImplementationStatus === "not-implemented"
&& !reference.resolverClientMayBeInstantiated
&& !reference.secretProviderMayBeInstantiated
&& !reference.credentialValueMayBeLoaded
&& !reference.rawEndpointUrlMayBeParsed
&& !reference.externalRequestMayBeSent
```

也检查 v262 的结构计数：

```ts
requiredEnvHandleCount === 6
optInGateCount === 2
failureClassCount === 7
dryRunResponseFieldCount === 12
inheritedNoGoConditionCount === 9
```

这里不是“v262 存在就算通过”，而是要确认 v262 的 env handle、gate、failure taxonomy、dry-run response shape 和 inherited no-go conditions 都没有漂移。

## Java v106 reference

`createJavaV106Reference()` 读取 Java v106 的 runbook、代码讲解、builder 和 records：

```ts
const evidenceFiles = [
  evidenceFile("java-v106-runbook", JAVA_V106_RUNBOOK),
  evidenceFile("java-v106-walkthrough", JAVA_V106_WALKTHROUGH),
  evidenceFile("java-v106-builder", JAVA_V106_BUILDER),
  evidenceFile("java-v106-records", JAVA_V106_RECORDS),
];
```

它用 snippet 检查 Java 是否暴露了：

```text
managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker
response schema: java-release-approval-rehearsal-response-schema.v28
readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification
requiredEnvHandleCount=6
optInGateCount=2
failureClassCount=7
dryRunResponseFieldCount=12
inheritedNoGoConditionCount=9
resolverClientMayBeInstantiated=false
secretProviderMayBeInstantiated=false
credentialValueMayBeLoaded=false
rawEndpointUrlMayBeParsed=false
externalRequestMayBeSent=false
```

最后生成：

```ts
readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification
```

这个 ready 只有在 Java v106 的 schema、marker、source、计数和 no-side-effect 片段全部匹配时才会为 true。

## mini-kv v115 reference

`createMiniKvV115Reference()` 解析：

```text
D:/C/mini-kv/fixtures/release/disabled-credential-resolver-precheck-non-participation-receipt.json
```

核心对象是：

```ts
const receipt = objectField(root, "disabled_credential_resolver_precheck_non_participation_receipt");
```

v263 检查 mini-kv v115 是否回显 Node v262：

```ts
sourcePrecheckProfileVersion ===
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"
sourcePrecheckState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
sourcePrecheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
sourceRequiredEnvHandleCount === 6
sourceOptInGateCount === 2
sourceFailureClassCount === 7
sourceDryRunResponseFieldCount === 12
sourceInheritedNoGoConditionCount === 9
```

同时检查 mini-kv 的非参与边界：

```ts
!reference.credentialResolverImplemented
&& !reference.credentialResolverInvoked
&& !reference.secretProviderInstantiated
&& !reference.resolverClientInstantiated
&& !reference.credentialValueReadAllowed
&& !reference.rawEndpointUrlParsed
&& !reference.externalRequestSent
&& !reference.storageWriteAllowed
&& !reference.loadRestoreCompactExecuted
&& !reference.setnxexExecutionAllowed
&& !reference.managedAuditStorageBackend
&& !reference.orderAuthoritative
```

这让 mini-kv 继续保持 evidence provider，而不是 resolver、credential reader、audit storage backend 或订单权威存储。

## Checks

`createChecks()` 是 v263 的核心判定层。它先确认三方证据就绪：

```ts
sourceNodeV262Ready
javaV106EchoReady
miniKvV115NonParticipationReady
```

再确认结构对齐：

```ts
disabledPrecheckAligned
requiredEnvHandlesAligned
optInGatesAligned
failureTaxonomyAligned
dryRunResponseShapeAligned
inheritedNoGoConditionsAligned
sourceNodeV261Aligned
```

最后确认五类边界仍然关闭：

```ts
credentialBoundaryAligned
rawEndpointBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
```

`readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification` 会排除自身字段后要求全部 check 为 true：

```ts
Object.entries(checks)
  .filter(([key]) =>
    key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification")
  .every(([, value]) => value)
```

因此只要 `UPSTREAM_ACTIONS_ENABLED=true` 或任一证据字段漂移，v263 会进入 `blocked`。

## 路由接入

v263 继续使用集中路由表：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
  (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
),
```

这遵守当前 Node 规则：新增 audit JSON/Markdown route 不回到手写 route 样板。

## 测试

新增测试覆盖四件事：

```text
1. 正常配置下 v263 ready，并确认 Node / Java / mini-kv 三方关键字段对齐
2. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时走 committed fallback
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
4. JSON 和 Markdown route 通过 audit route table 暴露
```

测试还断言：

```ts
expect(profile.summary.evidenceFileCount).toBe(7);
expect(profile.summary.matchedSnippetCount).toBe(38);
expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
```

这保证 v263 不是只看一个状态字段，而是实际消费了 Java v106 与 mini-kv v115 的多份证据材料。

## 本版总结

Node v263 的价值是把 disabled resolver precheck 从“Node 自己定义”推进到“三项目一致确认”。它补齐 Java v106 / mini-kv v115 的 historical fallback，并抽出 evidence helper 降低后续复制成本；但它仍然不允许真实凭证解析、raw endpoint 解析、外部请求、schema migration、ledger 写入或 mini-kv 存储后端化。
