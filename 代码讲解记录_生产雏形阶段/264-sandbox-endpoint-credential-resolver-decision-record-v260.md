# 第二百六十版代码讲解：sandbox endpoint credential resolver decision record

本版目标是消费 Node v259 的 sandbox endpoint handle upstream echo verification，生成 credential resolver decision record。它不是 resolver 实现，不读取 credential value，不解析 raw endpoint URL，只把后续进入 resolver rehearsal 前需要人工确认的 policy、approval 和 no-go 条件固化下来。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v257-post-fake-transport-upstream-echo-roadmap.md
```

当前链路是：

```text
Node v257 fake transport packet upstream echo verification
 -> Node v258 sandbox endpoint handle preflight review
 -> Java v104 + mini-kv v113 只读 echo / non-participation
 -> Node v259 sandbox endpoint handle upstream echo verification
 -> Node v260 sandbox endpoint credential resolver decision record
```

v260 是这份计划的最后一个执行版本。完成后不继续往旧计划里堆版本，而是另起 `v260-post-credential-resolver-decision-roadmap.md`。

## 模块拆分

新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordRenderer.ts
```

这次从一开始就拆出 types 和 renderer，避免把 profile、render、checks、messages 全部压进一个主 service。

## 主 profile

主 profile 的版本和路由在服务顶部定义：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record";
```

返回对象继续写死所有危险边界：

```ts
readyForManagedAuditSandboxAdapterConnection: false,
readyForProductionAudit: false,
readyForProductionWindow: false,
readyForProductionOperations: false,
executionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
credentialValueLoaded: false,
credentialValueIncluded: false,
rawEndpointUrlParsed: false,
rawEndpointUrlIncluded: false,
externalRequestSent: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这里的 ready 只表示 decision record ready，不表示 credential resolver ready。

## 消费 Node v259

主服务先读取 v259：

```ts
const sourceNodeV259 = createSourceNodeV259(
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({ config: input.config }),
);
```

`createSourceNodeV259()` 把 v259 的三方验证压成本版 source：

```ts
endpointHandleAligned: source.echoVerification.endpointHandleAligned,
credentialHandleAligned: source.echoVerification.credentialHandleAligned,
credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
miniKvNonParticipationAligned: source.echoVerification.miniKvNonParticipationAligned,
```

v260 的来源 ready 条件要求 v259 仍然保持所有边界关闭：

```ts
readyForNodeV260CredentialResolverDecisionRecord:
  reference.readyForUpstreamEchoVerification
  && reference.verificationState === "sandbox-endpoint-handle-upstream-echo-verification-ready"
  && reference.endpointHandleAligned
  && reference.credentialHandleAligned
  && reference.credentialBoundaryAligned
  && reference.rawEndpointBoundaryAligned
  && reference.connectionBoundaryAligned
  && reference.writeBoundaryAligned
  && reference.autoStartBoundaryAligned
  && reference.miniKvNonParticipationAligned
  && reference.productionBlockerCount === 0
```

所以 v260 不会因为 v259 存在就放行，必须确认 v259 的 no-side-effect 语义仍然成立。

## Decision record

`createDecisionRecord()` 生成本版核心决策记录：

```ts
recordMode: "sandbox-endpoint-credential-resolver-decision-record-only",
decisionScope: "managed-audit-sandbox-endpoint-credential-resolver",
decisionStatus: "human-review-required-before-credential-resolution",
endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
resolverMode: "policy-record-only-no-value-read",
resolverCandidateImplementation: "not-implemented",
```

注意 `resolverCandidateImplementation` 是 `not-implemented`。这意味着 v260 没有实现 secret provider adapter，也没有加载任何 credential。

## Required decision fields

本版列出 8 个必填决策字段：

```ts
decisionField("endpoint-handle", "Confirm sandbox endpoint handle", "Node v259 upstream echo", "handle-aligned"),
decisionField("credential-handle", "Confirm sandbox credential handle", "Node v259 upstream echo", "handle-aligned"),
decisionField("resolver-policy-handle", "Name the credential resolver policy handle", "operator decision", "policy-handle-only"),
decisionField("approval-marker", "Record credential resolver approval marker", "operator decision", "approval-marker-only"),
decisionField("operator-identity", "Require verified operator identity", "access guard", "operator-header"),
decisionField("approval-correlation", "Require approval correlation id", "access guard", "approval-correlation-header"),
decisionField("redaction-policy", "Confirm credential and endpoint redaction policy", "Node v259 policy review", "redaction-reviewed"),
decisionField("fallback-rotation-plan", "Record fallback and rotation plan handle", "operator decision", "plan-handle-only"),
```

每个字段都带：

```ts
nodeMayReadValue: false,
```

也就是说 Node 只能记录 handle 和 policy，不允许读取实际 secret value。

## Explicit no-go conditions

本版列出 9 个 no-go 条件：

```ts
noGo("CREDENTIAL_VALUE_REQUIRED", "The next step requires reading or loading a credential value."),
noGo("RAW_ENDPOINT_URL_REQUIRED", "The next step requires parsing or emitting a raw managed audit endpoint URL."),
noGo("REAL_CONNECTION_REQUIRED", "The next step requires opening a real managed audit HTTP/TCP connection."),
noGo("EXTERNAL_REQUEST_REQUIRED", "The next step requires sending an external request from Node."),
noGo("SCHEMA_MIGRATION_REQUIRED", "The next step requires schema rehearsal execution or migration SQL."),
noGo("UPSTREAM_WRITE_REQUIRED", "The next step writes approval ledger, managed audit state, or mini-kv storage."),
noGo("AUTO_START_REQUIRED", "The next step starts Java, mini-kv, or an external audit service automatically."),
noGo("MINI_KV_BACKEND_REQUIRED", "The next step makes mini-kv a managed audit or order authoritative backend."),
noGo("PRODUCTION_WINDOW_REQUIRED", "The next step assumes production audit or production window readiness."),
```

触发任意一条都必须：

```ts
action: "pause-and-do-not-resolve-credential"
```

这和 v251 的 connection decision record 类似，但 v260 更窄：它专门针对 credential resolver，不是泛化连接审批。

## Checks

`createChecks()` 把来源和决策记录收束为 20 个检查项：

```ts
sourceNodeV259Ready: sourceNodeV259.readyForNodeV260CredentialResolverDecisionRecord,
sourceNodeV259StillBlocksConnection: sourceNodeV259.connectionBoundaryAligned,
sourceNodeV259StillBlocksCredentialValue: sourceNodeV259.credentialBoundaryAligned,
sourceNodeV259StillBlocksRawEndpoint: sourceNodeV259.rawEndpointBoundaryAligned,
sourceNodeV259StillBlocksWrites: sourceNodeV259.writeBoundaryAligned,
sourceNodeV259StillBlocksAutoStart: sourceNodeV259.autoStartBoundaryAligned,
sourceNodeV259KeepsMiniKvNonParticipant: sourceNodeV259.miniKvNonParticipationAligned,
```

再检查决策字段本身：

```ts
endpointHandleRecorded: decisionRecord.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
credentialHandleRecorded: decisionRecord.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
resolverPolicyRecorded:
  decisionRecord.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
approvalMarkerRecorded:
  decisionRecord.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
```

最后确认本版仍然只读：

```ts
decisionRecordStillReadOnly:
  !decisionRecord.credentialValueMayBeRead
  && !decisionRecord.credentialValueMayBeLoaded
  && !decisionRecord.credentialValueMayBeStored
  && !decisionRecord.rawEndpointUrlMayBeParsed
  && !decisionRecord.managedAuditConnectionMayOpen
  && !decisionRecord.schemaMigrationMayExecute
  && !decisionRecord.externalRequestMayBeSent
```

`UPSTREAM_ACTIONS_ENABLED` 仍是硬门：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

测试里专门覆盖：开启后 profile 会进入 `blocked`。

## 路由注册

新增路由仍走统一表：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown),
```

没有回到旧的手写 JSON/Markdown 双 route 模式。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.test.ts
```

覆盖四类场景：

```text
1. v259 ready 时，v260 decision record ready，但 credential resolution 仍 blocked。
2. 强制 historical fixture fallback 时，v260 仍能通过 v259 source chain ready。
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked。
4. JSON / Markdown route 通过 audit route table 暴露。
```

聚焦验证结果：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.test.ts -> 1 file, 4 tests passed
```

最终验证结果：

```text
npm run typecheck -> passed
npm test -> passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/260/图片/sandbox-endpoint-credential-resolver-decision-record-v260.png
```

## 项目成熟度变化

v260 让 Node 的 managed audit sandbox 主线从 endpoint handle echo 进入 credential resolver 决策层，但依旧停在真实能力之前：

```text
resolverCandidateImplementation=not-implemented
credentialValueMayBeRead=false
rawEndpointUrlMayBeParsed=false
managedAuditConnectionMayOpen=false
```

也就是说，项目更接近生产流程里的“人工审批/变更门禁”，但还没有进入真实 secret provider 或外部连接。

## 下一步

v260 后应按新计划推进：

```text
推荐并行 Java v105 + mini-kv v114
```

Java 只读回显 v260 的 decision record，mini-kv 继续证明 non-participation。两边完成前，Node 不应抢跑 disabled resolver precheck。

## 一句话总结

Node v260 把 sandbox endpoint 的下一步从“可以连”压回“先做 credential resolver 人工决策记录”：证据链更接近真实生产流程，但 credential value、raw endpoint 和真实 connection 仍然全部关闭。
