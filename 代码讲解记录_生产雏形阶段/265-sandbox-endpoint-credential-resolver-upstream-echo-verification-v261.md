# 第二百六十一版代码讲解：sandbox endpoint credential resolver upstream echo verification

本版目标是消费 Node v260 的 credential resolver decision record，以及 Java v105 / mini-kv v114 的只读回显证据，生成 credential resolver upstream echo verification。它不是 resolver 实现，不读取 credential value，不解析 raw endpoint URL，也不打开 managed audit connection。

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
```

v261 只做三方一致性验证。下一步才是 Node v262 disabled credential resolver precheck，而且 v262 仍然只能是 disabled / dry-run。

## 模块拆分

本版新增三份服务文件：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationRenderer.ts
```

这延续 v260 的拆分方式：主服务负责加载证据和计算 checks，types 固化 profile shape，renderer 只负责 Markdown 输出。

## 主 profile

v261 的版本和路由在服务顶部定义：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification";
```

返回对象继续把危险动作全部写死为 false：

```ts
credentialResolverExecutionAllowed: false,
readyForManagedAuditSandboxAdapterConnection: false,
readyForProductionAudit: false,
readyForProductionWindow: false,
executionAllowed: false,
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
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这里的 ready 只表示“上游 echo 证据一致”，不是“可以执行 resolver”。

## 消费 Node v260

主服务先读取 v260：

```ts
const sourceNodeV260 = createSourceNodeV260(
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({ config: input.config }),
);
```

`createSourceNodeV260()` 把 v260 decision record 压成 v261 的 source reference：

```ts
recordMode: record.recordMode,
decisionScope: record.decisionScope,
endpointHandle: record.endpointHandle,
credentialHandle: record.credentialHandle,
resolverPolicyHandle: record.resolverPolicyHandle,
approvalMarker: record.approvalMarker,
resolverMode: record.resolverMode,
resolverCandidateImplementation: record.resolverCandidateImplementation,
requiredDecisionFieldIds,
explicitNoGoConditionCodes,
```

它要求 v260 仍然是 policy-only：

```ts
reference.resolverMode === "policy-record-only-no-value-read"
&& reference.resolverCandidateImplementation === "not-implemented"
&& !reference.credentialValueMayBeRead
&& !reference.credentialValueMayBeLoaded
&& !reference.credentialValueMayBeStored
&& !reference.rawEndpointUrlMayBeParsed
&& !reference.managedAuditConnectionMayOpen
&& !reference.schemaMigrationMayExecute
&& !reference.externalRequestMayBeSent
&& !reference.nodeMayStartJavaOrMiniKv
&& !reference.miniKvMayActAsManagedAuditStorage
&& !reference.approvalLedgerMayBeWritten
```

所以 v261 的来源不是“v260 存在即可”，而是 v260 的 no-side-effect contract 必须仍然成立。

## Java v105 证据

Java 侧 evidence 读取三个文件：

```ts
const JAVA_V105_RUNBOOK = "D:/javaproj/advanced-order-platform/c/105/解释/说明.md";
const JAVA_V105_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/108-version-105-sandbox-endpoint-credential-resolver-decision-echo-marker.md";
const JAVA_V105_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarkerBuilder.java";
```

`createJavaV105Reference()` 验证 Java v105 的核心字段：

```ts
responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v27",
markerField: "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker",
consumedNodeVersion: "Node v260",
nextNodeConsumerVersion: "Node v261",
endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
resolverMode: "policy-record-only-no-value-read",
resolverCandidateImplementation: "not-implemented",
```

并要求 Java 继续不做真实动作：

```ts
!reference.credentialValueMayBeRead
&& !reference.rawEndpointUrlMayBeParsed
&& !reference.externalRequestMayBeSent
&& !reference.schemaMigrationMayExecute
&& !reference.approvalLedgerMayBeWritten
&& !reference.connectsManagedAudit
&& !reference.javaStarted
&& !reference.miniKvStarted
```

这保证 Java v105 只是 echo marker，不是 Java 端 resolver 执行。

## mini-kv v114 证据

mini-kv 侧读取 standalone receipt：

```ts
const MINI_KV_V114_RECEIPT = "D:/C/mini-kv/fixtures/release/credential-resolver-non-participation-receipt.json";
```

`createMiniKvV114Reference()` 先解析：

```ts
const root = readJsonObject(MINI_KV_V114_RECEIPT);
const receipt = objectField(root, "credential_resolver_non_participation_receipt");
const decisionRecord = objectField(receipt, "decision_record");
```

然后校验 receipt 和 Node v260 source shape：

```ts
receiptVersion === "mini-kv-credential-resolver-non-participation-receipt.v1"
releaseVersion === "v114"
consumerHint === "Node v261 credential resolver upstream echo verification"
sourceDecisionProfileVersion
  === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1"
sourceDecisionState === "sandbox-endpoint-credential-resolver-decision-record-ready"
sourceRequiredDecisionFieldCount === 8
sourceExplicitNoGoConditionCount === 9
sourceCheckCount === sourcePassedCheckCount
sourceProductionBlockerCount === 0
```

mini-kv 的关键边界是它不能变成 resolver 或 storage backend：

```ts
!reference.credentialResolverImplemented
&& !reference.credentialResolverInvoked
&& !reference.secretProviderInstantiated
&& !reference.storageWriteAllowed
&& !reference.managedAuditWriteExecuted
&& !reference.restoreExecutionAllowed
&& !reference.loadRestoreCompactExecuted
&& !reference.setnxexExecutionAllowed
&& !reference.managedAuditStorageBackend
&& !reference.sandboxAuditStorageBackend
&& !reference.orderAuthoritative
```

这和 mini-kv 的长期定位一致：它是 evidence provider，不是订单或 audit 权威存储。

## 三方 checks

`createChecks()` 合并 Node / Java / mini-kv 三侧：

```ts
sourceNodeV260Ready: sourceNodeV260.readyForNodeV261CredentialResolverUpstreamEchoVerification,
javaV105EchoReady: javaV105.readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification,
miniKvV114NonParticipationReady: miniKvV114.readyForNodeV261Alignment,
```

再做字段一致性：

```ts
decisionRecordAligned
requiredDecisionFieldsAligned
explicitNoGoConditionsAligned
resolverPolicyAligned
approvalMarkerAligned
operatorIdentityAligned
approvalCorrelationAligned
redactionAndFallbackAligned
```

最后是安全边界：

```ts
credentialBoundaryAligned
rawEndpointBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
upstreamActionsStillDisabled: !config.upstreamActionsEnabled
```

只要任一项失败，`verificationState` 就会变成：

```ts
"blocked"
```

## UTF-8 BOM 修复

本版新增：

```text
src/services/jsonEvidenceUtils.ts
```

核心函数是：

```ts
export function parseJsonEvidence(text: string): unknown {
  return JSON.parse(stripJsonBom(text));
}

export function stripJsonBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}
```

同时 `historicalEvidenceResolver` 的 UTF-8 文本读取统一剥 BOM：

```ts
const content = readFileSync(resolvedPath, encoding);
return encoding === "utf8" && content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
```

原因是 mini-kv 生成的 JSON fixture 可能带 BOM，旧链路里直接 `JSON.parse(readFileSync(..., "utf8"))` 会报 `Unexpected token`。这不是业务语义变化，是证据读取的兼容性修复。

## 路由接入

新增路由仍然走 `auditJsonMarkdownRoutes`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
  (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown,
),
```

没有新增手写 JSON / Markdown 分支，保持 v240 之后的路由注册模式。

## 测试

新增测试：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.test.ts
```

覆盖四件事：

```text
1. v261 在 Java v105 + mini-kv v114 对齐时 ready。
2. 强制 historical fixture fallback 时仍能 ready。
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked。
4. JSON 和 Markdown route 都通过 audit route table 暴露。
```

其中 fallback 测试会检查路径确实落到：

```text
fixtures/historical/sibling-workspaces/
```

## 本版结论

v261 把 credential resolver 从“Node v260 本地 decision record”推进到“三项目只读 echo verification”。它证明 Java 和 mini-kv 都理解并回显这份 decision record，但仍没有任何一方获得读取凭据、解析 endpoint、打开连接、执行 migration、写 ledger 或启动服务的权限。
