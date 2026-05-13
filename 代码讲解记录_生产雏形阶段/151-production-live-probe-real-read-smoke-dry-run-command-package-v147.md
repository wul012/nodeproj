# 第一百四十七版代码讲解：production live probe real-read smoke dry-run command package

本版目标是把 v144-v146 的三个产物打包成一个操作员 dry-run command package。

它解决的问题是：

```text
真实联调前，不能让操作员在多个 endpoint 之间自己拼线索；
Node 应输出一份单一 package，
引用 execution request、result importer、release evidence gate 的 digest。
```

## 本版所处项目进度

v144 做 execution request。

v145 做 result importer。

v146 做 release evidence gate。

v147 做：

```text
real-read smoke dry-run command package
```

它仍不启动 Java / mini-kv，不做 pass capture。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeDryRunCommandPackage.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeDryRunCommandPackage(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeDryRunCommandPackageProfile> {
```

它读取三个来源：

```ts
const executionRequest = await loadProductionLiveProbeRealReadSmokeExecutionRequest(input);
const resultImporter = await loadProductionLiveProbeRealReadSmokeResultImporter(input);
const releaseGate = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input);
```

这正好对应：

```text
执行请求 -> 结果导入 -> release gate
```

## package 字段

核心 package：

```ts
package: {
  packageDigest,
  executionRequestDigest: executionRequest.request.requestDigest,
  resultImportDigest: resultImporter.importEnvelope.importDigest,
  releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
  releaseGateDecision: releaseGate.gateDecision,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  dryRunOnly: true,
  startsJavaAutomatically: false,
  startsMiniKvAutomatically: false,
  mutatesUpstreamState: false,
},
```

当前状态：

```text
dryRunOnly=true
startsJavaAutomatically=false
startsMiniKvAutomatically=false
mutatesUpstreamState=false
```

这说明 v147 只是审阅包，不是执行器。

## checks

核心 checks：

```ts
executionRequestReady: executionRequest.readyForOperatorReview,
executionRequestDigestValid: /^[a-f0-9]{64}$/.test(executionRequest.request.requestDigest),
resultImporterReady: resultImporter.readyForResultImport,
resultImportDigestValid: /^[a-f0-9]{64}$/.test(resultImporter.importEnvelope.importDigest),
releaseEvidenceGateReady: releaseGate.readyForReleaseEvidenceGate,
releaseEvidenceGateDigestValid: /^[a-f0-9]{64}$/.test(releaseGate.gate.gateDigest),
releaseGateStillNotProductionPass: releaseGate.readyForProductionPassEvidence === false
  && releaseGate.gateDecision === "not-production-pass-evidence",
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
startsNoUpstreamsAutomatically: true,
dryRunPackageOnly: true,
```

readiness：

```ts
checks.readyForDryRunPackage = checks.executionRequestReady
  && checks.executionRequestDigestValid
  && checks.resultImporterReady
  && checks.resultImportDigestValid
  && checks.releaseEvidenceGateReady
  && checks.releaseEvidenceGateDigestValid
  && checks.releaseGateStillNotProductionPass
  && checks.upstreamActionsStillDisabled
  && checks.startsNoUpstreamsAutomatically
  && checks.dryRunPackageOnly;
```

当前结果：

```text
readyForDryRunPackage=true
readyForRealPassCapture=false
```

## operatorSteps

本版输出 6 个步骤：

```ts
id:
  | "review-execution-request"
  | "review-result-importer"
  | "review-release-evidence-gate"
  | "confirm-read-only-window-requirements"
  | "prepare-manual-upstream-start"
  | "defer-real-pass-capture";
```

前三个由 Node 准备：

```text
review-execution-request: ready
review-result-importer: ready
review-release-evidence-gate: ready
```

后三个需要操作员：

```text
confirm-read-only-window-requirements: manual-required
prepare-manual-upstream-start: manual-required
defer-real-pass-capture: manual-required
```

## Java / mini-kv 边界

准备上游步骤：

```ts
{
  id: "prepare-manual-upstream-start",
  owner: "operator",
  status: "manual-required",
  command: "Prepare to start Java and mini-kv manually only when v148 pass capture is requested.",
  evidence: `${config.orderPlatformUrl}; ${config.miniKvHost}:${config.miniKvPort}`,
  note: "Node must not start Java or mini-kv automatically.",
}
```

所以 v147 仍然不启动另外两个项目。

## package digest

digest 来源：

```ts
const packageDigest = digestPackage({
  profileVersion: "production-live-probe-real-read-smoke-dry-run-command-package.v1",
  executionRequestDigest: executionRequest.request.requestDigest,
  resultImportDigest: resultImporter.importEnvelope.importDigest,
  releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
  releaseGateDecision: releaseGate.gateDecision,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  operatorSteps: operatorSteps.map((step) => [step.id, step.status]),
  checks: {
    ...checks,
    readyForDryRunPackage: checks.readyForDryRunPackage,
  },
});
```

它把 v144-v146 的产物固定成一个可引用的 dry-run package。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-dry-run-command-package
GET /api/v1/production/live-probe-real-read-smoke-dry-run-command-package?format=markdown
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeDryRunCommandPackage.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-live-probe-real-read-smoke-dry-run-command-package.v1",
  packageState: "ready-for-operator-review",
  readyForDryRunPackage: true,
  readyForRealPassCapture: false,
  package: {
    releaseGateDecision: "not-production-pass-evidence",
    dryRunOnly: true,
  },
});
```

还覆盖：

```text
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe real-read smoke dry-run command package
GET /api/v1/production/live-probe-real-read-smoke-dry-run-command-package
GET /api/v1/production/live-probe-real-read-smoke-dry-run-command-package?format=markdown
```

归档：

```text
b/147/图片/production-live-probe-real-read-smoke-dry-run-command-package.png
b/147/解释/运行调试说明.md
```

## 一句话总结

v147 把 v144-v146 的执行请求、结果导入和 release gate 串成一个 dry-run command package：操作员可以审阅真实联调前置条件，但 Node 仍不启动 Java / mini-kv，也不捕获真实 pass evidence。
