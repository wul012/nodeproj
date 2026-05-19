# 第二百五十九版代码讲解：sandbox endpoint handle upstream echo verification

本版目标是消费 Node v258、Java v104、mini-kv v113 的只读证据，生成 sandbox endpoint handle upstream echo verification。它不是 credential resolver，也不是真实 adapter client，而是确认三项目对 endpoint handle、credential handle、review count、policy review 和 no-side-effect 边界的理解一致。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v257-post-fake-transport-upstream-echo-roadmap.md
```

当前链路是：

```text
Node v257 fake transport packet upstream echo verification
 -> Node v258 sandbox endpoint handle preflight review
 -> Java v104 sandbox endpoint handle preflight echo marker
 -> mini-kv v113 sandbox endpoint handle non-participation receipt
 -> Node v259 sandbox endpoint handle upstream echo verification
```

v259 的意义是把 v258 之后的两边上游回显吃回来。Java 负责证明订单平台只读回显了 handle review；mini-kv 负责证明自己没有参与真实审计存储、没有 auto-start、没有写命令、没有 credential read。

## 模块拆分

新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationRenderer.ts
```

主服务文件负责读取和校验证据，types 文件承接 profile / Java reference / mini-kv reference / checks 结构，renderer 文件只输出 Markdown。这样 v259 没有把大块渲染逻辑塞进主服务。

## 主 profile

主 profile 的版本和入口在服务顶部定义：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification";
```

返回对象里继续保留硬边界：

```ts
readyForManagedAuditSandboxAdapterConnection: false,
readyForProductionAudit: false,
readyForProductionWindow: false,
readyForProductionOperations: false,
executionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这里的 ready 只表示 `readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification`，不是 production audit ready，也不是 connection ready。

## 消费 Node v258

v259 先读取 Node v258：

```ts
const sourceNodeV258 = createSourceNodeV258(
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({ config: input.config }),
);
```

`createSourceNodeV258()` 把 v258 的 preflight review 压成本版可验证引用：

```ts
endpointHandle: preflightReview.endpointHandle,
credentialHandle: preflightReview.credentialHandle,
requiredReviewItemCount: source.summary.requiredReviewItemCount as 7,
completedReviewItemCount: source.summary.completedReviewItemCount as 7,
forbiddenOperationCount: source.summary.forbiddenOperationCount as 7,
networkAllowlistReviewReady: source.checks.networkAllowlistReviewReady,
tlsPolicyReviewReady: source.checks.tlsPolicyReviewReady,
redactionPolicyReady: source.checks.redactionPolicyReady,
operatorWindowReviewReady: source.checks.operatorWindowReviewReady,
```

真正的 v259 ready 条件更严格：

```ts
readyForNodeV259UpstreamEchoVerification:
  reference.readyForPreflightReview
  && reference.reviewState === "sandbox-endpoint-handle-preflight-review-ready"
  && reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
  && reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
  && reference.checkCount === reference.passedCheckCount
  && reference.productionBlockerCount === 0
  && !reference.rawEndpointUrlParsed
  && !reference.credentialValueRead
  && !reference.externalRequestSent
  && !reference.connectsManagedAudit
```

这保证 v259 不是只看 v258 是否存在，而是确认 v258 的 handle-only 语义仍然成立。

## 消费 Java v104

Java 证据入口是三份只读文件：

```ts
const JAVA_V104_RUNBOOK = "D:/javaproj/advanced-order-platform/c/104/解释/说明.md";
const JAVA_V104_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/107-version-104-sandbox-endpoint-handle-preflight-echo-marker.md";
const JAVA_V104_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointHandlePreflightEchoMarkerBuilder.java";
```

`createJavaV104Reference()` 不调用 Java 服务，不启动 Java，只做文件证据匹配：

```ts
snippet("java-v104-marker-field", JAVA_V104_RUNBOOK, "managedAuditSandboxEndpointHandlePreflightEchoMarker"),
snippet("java-v104-schema", JAVA_V104_RUNBOOK, "java-release-approval-rehearsal-response-schema.v26"),
snippet("java-v104-node-v259", JAVA_V104_BUILDER, "readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification"),
snippet("java-v104-endpoint-handle", JAVA_V104_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"),
snippet("java-v104-credential-handle", JAVA_V104_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
```

Java v104 只有在 marker、schema、handle、count、no-side-effect 证据全部齐全时才 ready：

```ts
readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification:
  reference.evidencePresent
  && reference.verificationDocumented
  && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v26"
  && reference.markerField === "managedAuditSandboxEndpointHandlePreflightEchoMarker"
  && reference.nextNodeConsumerVersion === "Node v259"
  && !reference.credentialValueRead
  && !reference.externalRequestSent
  && !reference.schemaMigrationExecuted
  && !reference.connectsManagedAudit
  && !reference.approvalLedgerWritten
  && !reference.readyForManagedAuditSandboxAdapterConnection
```

这一步避免了一个常见误判：Java v104 完成并不代表 Node 可以真实连接，只代表 Java 的只读 echo marker 与 Node v258 对齐。

## 消费 mini-kv v113

mini-kv 的关键证据来自 JSON receipt：

```ts
const MINI_KV_V113_RECEIPT = "D:/C/mini-kv/fixtures/release/sandbox-endpoint-handle-non-participation-receipt.json";
```

服务通过结构化 JSON 读取，而不是用字符串拼整个 receipt：

```ts
const receiptRoot = readJsonObject(MINI_KV_V113_RECEIPT);
const receipt = objectField(receiptRoot, "sandbox_endpoint_handle_non_participation_receipt");
const preflightReview = objectField(receipt, "preflight_review");
const networkAllowlistReview = objectField(receipt, "network_allowlist_review");
const tlsPolicyReview = objectField(receipt, "tls_policy_review");
const redactionPolicy = objectField(receipt, "redaction_policy");
const operatorWindow = objectField(receipt, "operator_window");
```

这里重点不是 mini-kv 做了什么，而是 mini-kv 明确没有做什么：

```ts
!reference.storageWriteAllowed
&& !reference.managedAuditWriteExecuted
&& !reference.credentialValueReadAllowed
&& !reference.credentialValueLoaded
&& !reference.rawEndpointUrlParsed
&& !reference.externalRequestSent
&& !reference.restoreExecutionAllowed
&& !reference.loadRestoreCompactExecuted
&& !reference.setnxexExecutionAllowed
&& !reference.managedAuditStorageBackend
&& !reference.orderAuthoritative
```

这符合三项目边界：mini-kv 是 evidence provider / infrastructure experiment，不是订单或审计权威存储。

## 三方 checks

`createChecks()` 把三方结果收束为 19 个检查项：

```ts
sourceNodeV258Ready: sourceNodeV258.readyForNodeV259UpstreamEchoVerification,
javaV104EchoReady: javaV104.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification,
miniKvV113NonParticipationReady: miniKvV113.readyForNodeV259Alignment,
endpointHandleAligned:
  sourceNodeV258.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
  && javaV104.endpointHandle === sourceNodeV258.endpointHandle
  && miniKvV113.endpointHandle === sourceNodeV258.endpointHandle,
credentialHandleAligned:
  sourceNodeV258.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
  && javaV104.credentialHandle === sourceNodeV258.credentialHandle
  && miniKvV113.credentialHandle === sourceNodeV258.credentialHandle,
```

然后继续验证 policy、operator window 和 side-effect：

```ts
rawEndpointBoundaryAligned:
  !sourceNodeV258.rawEndpointUrlParsed
  && !javaV104.rawEndpointUrlParsed
  && !miniKvV113.rawEndpointUrlParsed
  && !miniKvV113.rawEndpointUrlIncluded,
connectionBoundaryAligned:
  !sourceNodeV258.connectsManagedAudit
  && !javaV104.connectsManagedAudit
  && !miniKvV113.connectionExecutionAllowed
  && !miniKvV113.externalRequestSent,
writeBoundaryAligned:
  !sourceNodeV258.schemaMigrationExecuted
  && !javaV104.approvalLedgerWritten
  && !miniKvV113.storageWriteAllowed
  && !miniKvV113.managedAuditWriteExecuted,
autoStartBoundaryAligned:
  !sourceNodeV258.automaticUpstreamStart
  && !javaV104.javaStarted
  && !javaV104.miniKvStarted
  && !miniKvV113.nodeAutoStartAllowed
```

`UPSTREAM_ACTIONS_ENABLED` 仍然是硬门：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

测试里专门覆盖了这个分支，打开 `UPSTREAM_ACTIONS_ENABLED=true` 会让 profile 进入 `blocked`。

## Production blockers

本版把 blocker 写成声明式规则：

```ts
const rules: Array<{
  condition: boolean;
  code: string;
  source: SandboxEndpointHandleUpstreamEchoVerificationMessage["source"];
  message: string;
}> = [
  {
    condition: checks.sourceNodeV258Ready,
    code: "NODE_V258_SOURCE_NOT_READY",
    source: "node-v258-sandbox-endpoint-handle-preflight-review",
    message: "Node v258 must be ready and keep handle-only review boundaries closed before v259.",
  },
```

这种写法比连续 `if (...) push(...)` 更容易审查，也符合最近几版对 Node 大服务的轻量优化方向。

## 路由注册

路由继续走统一表：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown),
```

这里没有回到旧的手写 Fastify route 模式，仍然遵守 v240 之后的 `auditJsonMarkdownRoutes` 体系。

## Historical fallback

本版新增 Java v104 / mini-kv v113 的 committed fallback：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/104/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/107-version-104-sandbox-endpoint-handle-preflight-echo-marker.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointHandlePreflightEchoMarkerBuilder.java
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/sandbox-endpoint-handle-non-participation-receipt.json
fixtures/historical/sibling-workspaces/mini-kv/c/113/解释/说明.md
fixtures/historical/sibling-workspaces/mini-kv/代码讲解记录_生产雏形阶段/169-version-113-sandbox-endpoint-handle-non-participation-receipt.md
```

测试里强制开启：

```ts
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
```

这能防止 GitHub CI 因为没有 `D:/javaproj` 或 `D:/C/mini-kv` 而误判 blocked。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.test.ts
```

覆盖四类场景：

```text
1. 三方证据齐全时 profile ready。
2. 强制 historical fixture fallback 时仍 ready。
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked。
4. JSON / Markdown route 通过 audit route table 暴露。
```

聚焦验证结果：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
```

最终验证结果：

```text
npm run typecheck -> passed
npm test -> passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/259/图片/sandbox-endpoint-handle-upstream-echo-verification-v259.png
```

## 项目成熟度变化

v259 让 Node 的生产雏形阶段更接近真实接入前的治理闭环：它已经不是单项目自证，而是能消费 Java / mini-kv 的上游 echo 和 non-participation 证据。但它仍然明确停在真实连接之前：

```text
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
connectsManagedAudit=false
readsManagedAuditCredential=false
```

下一步 Node v260 应写 credential resolver decision record，只做人工决策记录，不读 credential value。

## 一句话总结

Node v259 把 sandbox endpoint handle 从 Node 内部 review 推进到三项目只读 upstream echo verification：证据链闭合了，真实连接仍然没有打开。
