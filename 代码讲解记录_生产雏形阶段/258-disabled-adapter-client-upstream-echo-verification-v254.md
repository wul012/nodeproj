# 第二百五十四版代码讲解：disabled adapter client upstream echo verification

本版目标是在 Node v253 的 test-only adapter shell contract 之后，消费 Java v102 和 mini-kv v111 的只读证据，做 disabled adapter client 的三方 echo verification。它验证“边界一致”，但不打开真实 managed audit connection。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v252-post-disabled-adapter-client-precheck-roadmap.md
```

计划要求 v254：

```text
只读消费 Java v102 + mini-kv v111
验证 env handle count、failure taxonomy count、credential/connection/schema/auto-start 边界一致
两边未完成或字段不一致则停止
```

当前 Java v102 和 mini-kv v111 都已经完成，因此 Node v254 可以推进。这个版本把主线从“fake transport shell 契约”推进到“三方上游回显验证”，但仍不进入真实连接。

## 模块拆分

v254 新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationRenderer.ts
```

其中主服务文件负责证据读取和校验，types 文件集中 profile / reference / message 类型，renderer 文件集中 Markdown 输出。这是本版同步做的质量优化：避免把近千行 service 继续堆成单文件。

## 主 profile

核心 profile 定义在 types 文件中：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1";
verificationState: "disabled-adapter-client-upstream-echo-verification-ready" | "blocked";
readyForManagedAuditSandboxAdapterConnection: false;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这里的 ready 指的是 upstream echo verification ready，不是 connection ready。`readyForManagedAuditSandboxAdapterConnection=false` 仍然是硬边界。

## 读取 Node v252 / v253

主服务通过已有 loader 消费本项目前序版本：

```ts
const sourceNodeV252 = createSourceNodeV252(
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({ config: input.config }),
);
const sourceNodeV253 = createSourceNodeV253(
  loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({ config: input.config }),
);
```

`createSourceNodeV252()` 保留 v252 的核心计数：

```ts
requiredEnvHandleCount: source.disabledAdapterClientPrecheck.requiredEnvHandleCount,
failureClassCount: source.disabledAdapterClientPrecheck.failureClassCount,
dryRunResponseFieldCount: source.disabledAdapterClientPrecheck.dryRunResponseFieldCount,
reusedNoGoConditionCount: source.disabledAdapterClientPrecheck.reusedNoGoConditions.length,
externalRequestStillBlocked: true,
credentialValueStillBlocked: true,
```

`createSourceNodeV253()` 保留 fake transport shell shape：

```ts
requestShapeFieldCount: source.testOnlyAdapterShellContract.requestShapeFieldCount,
responseShapeFieldCount: source.testOnlyAdapterShellContract.responseShapeFieldCount,
failureMappingCount: source.testOnlyAdapterShellContract.failureMappingCount,
guardConditionCount: source.testOnlyAdapterShellContract.guardConditionCount,
fakeTransportOnly: true,
realClientImplemented: false,
realTransportAllowed: false,
```

这说明 v254 不重新定义 v252/v253 的契约，只消费并验证它们。

## 读取 Java v102

Java v102 不是 JSON fixture，而是通过归档说明、代码讲解和 builder 源码做只读证据验证：

```ts
const JAVA_V102_RUNBOOK = "D:/javaproj/advanced-order-platform/c/102/解释/说明.md";
const JAVA_V102_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/105-version-102-disabled-adapter-client-precheck-echo-receipt.md";
const JAVA_V102_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceiptBuilder.java";
```

`createJavaV102Reference()` 检查关键片段：

```ts
snippet("java-v102-env-count", JAVA_V102_RUNBOOK, "5 个 required env handles"),
snippet("java-v102-failure-count", JAVA_V102_RUNBOOK, "6 个 failure class codes"),
snippet("java-v102-dry-run-count", JAVA_V102_RUNBOOK, "10 个 dry-run response fields"),
snippet("java-v102-no-client", JAVA_V102_RUNBOOK, "clientMayBeInstantiated=false"),
snippet("java-v102-no-external", JAVA_V102_RUNBOOK, "externalRequestMayBeSent=false"),
snippet("java-v102-no-credential", JAVA_V102_RUNBOOK, "credentialValueMayBeLoaded=false"),
```

然后形成：

```ts
readyForNodeV254Alignment:
  reference.evidencePresent
  && reference.verificationDocumented
  && reference.requiredEnvHandleCount === 5
  && reference.failureClassCount === 6
  && reference.dryRunResponseFieldCount === 10
  && !reference.clientMayBeInstantiated
  && !reference.externalRequestMayBeSent
  && !reference.credentialValueMayBeLoaded
```

这让 Java v102 必须同时满足“字段数量一致”和“危险边界关闭”。

## 读取 mini-kv v111

mini-kv v111 使用 JSON receipt：

```ts
const MINI_KV_V111_RECEIPT = "D:/C/mini-kv/fixtures/release/disabled-adapter-client-non-participation-receipt.json";
const receipt = readJsonObject(MINI_KV_V111_RECEIPT);
const nestedReceipt = objectField(receipt, "disabled_adapter_client_non_participation_receipt");
```

它验证 v252 / v253 两层来源：

```ts
sourceRequiredEnvHandleCount === 5
sourceFailureClassCount === 6
sourceDryRunResponseFieldCount === 10
sourceRequestShapeFieldCount === 8
sourceResponseShapeFieldCount === 9
sourceFailureMappingCount === 6
sourceGuardConditionCount === 7
```

同时验证 mini-kv 没有被拉进真实存储链路：

```ts
!reference.storageWriteAllowed
!reference.managedAuditWriteExecuted
!reference.restoreExecutionAllowed
!reference.loadRestoreCompactExecuted
!reference.setnxexExecutionAllowed
!reference.managedAuditStorageBackend
!reference.orderAuthoritative
```

这部分保证 mini-kv 仍是 non-participation evidence provider，不是 managed audit storage backend。

## checks

`createChecks()` 聚合最终判断：

```ts
javaV102EchoReady: javaV102.readyForNodeV254Alignment,
miniKvV111NonParticipationReady: miniKvV111.readyForNodeV254Alignment,
envHandleCountAligned,
failureClassCountAligned,
dryRunResponseShapeAligned,
fakeTransportShapeAligned,
credentialBoundaryAligned,
connectionBoundaryAligned,
writeBoundaryAligned,
autoStartBoundaryAligned,
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

最终 ready 的计算明确排除自引用字段：

```ts
checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification")
  .every(([, value]) => value);
```

只要 Java/mini-kv 任一证据缺失、字段不一致，或者 `UPSTREAM_ACTIONS_ENABLED=true`，v254 都会进入 blocked。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增共享 route table 注册：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
  (deps) => loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
)
```

这里继续沿用 `auditJsonMarkdownRoute`，没有回到手写 JSON/Markdown 双路由。

## GitHub fallback

本版把 Java v102 / mini-kv v111 的必要证据复制到：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
fixtures/historical/sibling-workspaces/mini-kv/...
```

`historicalEvidenceResolver` 会在 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 时读取这些 committed fallback，避免 GitHub runner 因没有本机 `D:/javaproj` 或 `D:/C/mini-kv` 而失败。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.test.ts
```

覆盖四类场景：

```text
1. Node v252/v253 + Java v102 + mini-kv v111 全部对齐时 ready
2. 强制 historical fixture fallback 时仍 ready
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
4. JSON / Markdown route 均可访问
```

聚焦验证：

```text
npm run typecheck
npm test -- managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.test.ts
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 194 files passed, 651 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/254/图片/disabled-adapter-client-upstream-echo-verification-v254.png
```

## 成熟度变化

v254 让 disabled adapter client 主线从“Node 自己定义契约”推进到“三项目一致性证明”：

```text
v252 disabled adapter client precheck
 -> v253 test-only adapter shell contract
 -> Java v102 echo receipt
 -> mini-kv v111 non-participation receipt
 -> v254 upstream echo verification
```

这使 Node 控制面更接近真实开发流程中的联调前 gate，但仍没有进入真实外部连接阶段。

## 一句话总结

v254 把 Java v102 和 mini-kv v111 纳入 Node disabled adapter client 验证链路：env handle、failure taxonomy、dry-run response、fake transport shape 全部对齐，同时 credential、connection、write、auto-start 边界继续关闭。
