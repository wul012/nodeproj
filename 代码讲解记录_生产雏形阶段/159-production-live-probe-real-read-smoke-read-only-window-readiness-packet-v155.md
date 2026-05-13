# 第一百五十五版代码讲解：production live probe real-read smoke read-only window readiness packet

本版目标是把真实只读窗口前的 Node 证据打包成一个人工审阅包。

它解决的问题是：

```text
v152 已经有 archive verification；
v153 已经有 operator runbook；
v154 已经验证 runbook；
v155 要把三段证据合成一个 readiness packet，方便后续进入 Java v50 + mini-kv v59 或真实只读 capture 前审阅。
```

## 本版所处项目进度

当前阶段是生产雏形里的真实只读窗口前收口：

```text
Node v152：archive verification
Node v153：operator runbook
Node v154：operator runbook verification
Node v155：read-only window readiness packet
Java v50 + mini-kv v59：下一步上游只读自描述增强
```

v155 不启动 Java / mini-kv，也不执行真实 capture。它只说明“现在可以进入人工审阅”，不是“已经进入真实联调”。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile> {
```

它先消费 v154：

```ts
const runbookVerification = await loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification(input);
```

这让 v155 依赖的是已经验证过的 runbook，而不是直接信任 v153 清单。

## 证据链

v155 的核心是 `createEvidenceChain`：

```ts
function createEvidenceChain(
  runbookVerification: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
): ReadinessPacketEvidence[] {
  return [
    {
      name: "v152 archive verification",
      profileVersion: runbookVerification.artifacts.sourceArchiveVerification.profileVersion,
      digest: runbookVerification.artifacts.sourceArchiveVerification.verificationDigest,
      role: "Source archive verification digest for the manual read-only window.",
    },
```

三段证据分别是：

```text
v152 archive verification
v153 operator runbook
v154 operator runbook verification
```

对应 digest：

```text
archiveVerificationDigest
runbookDigest
runbookVerificationDigest
```

## packetDigest

v155 生成新的 packet digest：

```ts
const readinessPacketDigest = digestPacket({
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
  archiveVerificationDigest: runbookVerification.artifacts.sourceArchiveVerification.verificationDigest,
  runbookDigest: runbookVerification.verification.runbookDigest,
  runbookVerificationDigest: runbookVerification.verification.verificationDigest,
  packetState,
  operatorWindowRequirements,
  reviewSteps,
  checks,
});
```

它覆盖：

```text
三段 digest
packetState
人工窗口要求
审阅步骤
checks
```

后续 v156 或新 plan 可以引用这个 digest 作为真实只读 capture 前的审阅包证据。

## 人工窗口要求

v155 明确列出 operator window requirements：

```ts
function createOperatorWindowRequirements(
  runbookVerification: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
): ReadinessPacketRequirement[] {
  return [
    {
      code: "MANUAL_JAVA_START",
      required: true,
      evidence: "Java startup must be performed by the operator, not by Node.",
    },
```

关键要求：

```text
MANUAL_JAVA_START
MANUAL_MINI_KV_START
UPSTREAM_PROBES_ENABLED_TRUE
UPSTREAM_ACTIONS_ENABLED_FALSE
SKIPPED_WITHOUT_UPSTREAMS
SKIPPED_OR_MIXED_NOT_PRODUCTION_PASS
```

这把“是否启动上游”的责任边界写进结构化数据，而不是靠口头说明。

## 审阅步骤

v155 生成 5 个 review steps：

```ts
function createReviewSteps(): ReadinessPacketReviewStep[] {
  return [
    {
      order: 1,
      title: "Review v152 archive verification digest",
      action: "Confirm the source archive verification digest is present and valid.",
      blocksProductionPassIfMissing: true,
    },
```

步骤顺序：

```text
1. Review v152 archive verification digest
2. Review v153 operator runbook digest
3. Review v154 runbook verification digest
4. Confirm manual upstream ownership
5. Confirm skipped evidence semantics
```

每一步都有：

```ts
blocksProductionPassIfMissing: true
```

这表示缺任何一步都不能进入 production pass 语义。

## checks 设计

核心 checks：

```ts
return {
  runbookVerificationReady: runbookVerification.readyForOperatorRunbookVerification,
  runbookVerificationDigestValid: /^[a-f0-9]{64}$/.test(runbookVerification.verification.verificationDigest),
  runbookDigestValid: /^[a-f0-9]{64}$/.test(runbookVerification.verification.runbookDigest),
  archiveVerificationDigestValid: /^[a-f0-9]{64}$/.test(runbookVerification.artifacts.sourceArchiveVerification.verificationDigest),
  digestChainComplete: evidenceChain.length === 3
    && evidenceChain.every((item) => /^[a-f0-9]{64}$/.test(item.digest)),
```

安全边界 checks：

```text
manualJavaStartRequired
manualMiniKvStartRequired
upstreamProbesRequirementDocumented
upstreamActionsStayDisabled
noAutomaticUpstreamStart
skippedWithoutUpstreamsOnly
skippedOrMixedNotProductionPass
readyForProductionOperationsStillFalse
```

最终通过条件：

```ts
checks.readyForReadOnlyWindowReview = Object.entries(checks)
  .filter(([key]) => key !== "readyForReadOnlyWindowReview")
  .every(([, value]) => value);
```

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增路由：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet?format=markdown
```

路由代码：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet",
  () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.test.ts
```

覆盖四类场景：

```text
默认 readiness packet -> ready-for-manual-read-only-window-review
模拟 pass source -> 仍保持 readyForProductionOperations=false
UPSTREAM_ACTIONS_ENABLED=true -> blocked
JSON / Markdown route -> 200
```

默认场景断言：

```ts
expect(profile).toMatchObject({
  packetState: "ready-for-manual-read-only-window-review",
  readyForReadOnlyWindowReview: true,
  readyForProductionOperations: false,
  packet: {
    requiredManualJavaStart: true,
    requiredManualMiniKvStart: true,
    requiredUpstreamProbesEnabled: true,
    requiredUpstreamActionsEnabled: false,
    automaticUpstreamStart: false,
    skippedWithoutUpstreamsOnly: true,
    skippedOrMixedEvidenceCannotPass: true,
  },
});
```

并确认三段证据链：

```ts
expect(profile.evidenceChain.map((item) => item.name)).toEqual([
  "v152 archive verification",
  "v153 operator runbook",
  "v154 operator runbook verification",
]);
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.test.ts test/productionLiveProbeRealReadSmokeOperatorRunbookVerification.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键结果：

```text
packetState=ready-for-manual-read-only-window-review
readyForReadOnlyWindowReview=true
readyForProductionOperations=false
digestChainComplete=true
evidenceDigestCount=3
operatorRequirementCount=6
reviewStepCount=5
```

归档截图：

```text
b/155/图片/production-live-probe-real-read-smoke-read-only-window-readiness-packet.png
```

## 成熟度变化

v155 把 Node 侧真实只读窗口准备从“清单可验证”推进到“审阅包可交付”：

```text
v152：源 archive verification
v153：operator runbook
v154：runbook verification
v155：readiness packet
```

这意味着下一步不应该继续堆 Node 包装，而应该按全局计划让 Java v50 + mini-kv v59 补上游启动后的只读自描述能力。

## 一句话总结

v155 把 v152、v153、v154 的 digest 证据链打包成人工只读窗口前 readiness packet，明确手动启动上游、actions=false、skipped 不冒充 pass，为后续 Java v50 + mini-kv v59 和 Node v156 真实只读 capture 做准备。
