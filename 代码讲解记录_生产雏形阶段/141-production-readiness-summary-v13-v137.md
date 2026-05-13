# 第一百三十七版代码讲解：production readiness summary v13

本版目标是把 v135 和 v136 的 live probe 准备工作接入生产就绪汇总。

它回答的问题是：

```text
dry-run review evidence 是否已经 ready？
live probe contract 是否已经 ready？
live probe smoke evidence 是否已经 ready？
skipped evidence 是否被误判成生产连接成功？
真实生产连接 blocker 是否仍然保留？
```

## 本版所处项目进度

v135 做了 live probe readiness contract。

v136 做了 read-only live probe smoke harness。

v137 做的是新的 summary：

```text
production-readiness-summary.v13
```

它不是放开生产执行，而是把 live probe 准备阶段汇总成更清楚的生产门槛报告。

## 新增服务

新增文件：

```text
src/services/productionReadinessSummaryV13.ts
```

入口函数：

```ts
export async function loadProductionReadinessSummaryV13(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionReadinessSummaryV13> {
```

v13 需要三类输入：

```text
v12 dry-run review evidence
v135 live probe readiness contract
v136 live probe smoke harness
```

## 接入 v12

第一步先加载 v12：

```ts
const summaryV12 = await loadProductionReadinessSummaryV12(input);
```

v12 代表上一阶段的审查闭环：

```text
dry-run change request
dry-run approval ledger
archive verification
no real connection attempted
```

v13 不绕过 v12，而是把 v12 作为前置证据。

## 接入 live probe contract

第二步加载 v135 的 contract：

```ts
const contract = createProductionLiveProbeReadinessContract(input.config);
```

v13 使用 contract 判断：

```ts
liveProbeContractReady: contract.readyForLiveProbePlanning
  && contract.checks.writeActionsForbidden
  && contract.checks.noProbeAttempted,
```

这里有两个关键点：

```text
writeActionsForbidden 必须为 true
noProbeAttempted 必须为 true
```

因为 contract 只是计划边界，不应该在 v135 阶段实际探测上游。

## 接入 smoke harness

第三步加载 v136 的 harness：

```ts
const smokeHarness = await loadProductionLiveProbeSmokeHarness({
  config: input.config,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
```

当默认配置是：

```text
UPSTREAM_PROBES_ENABLED=false
```

smoke harness 不访问 Java / mini-kv，而是输出 skipped evidence。

v13 的判断：

```ts
liveProbeSmokeEvidenceReady: smokeHarness.readyForLiveProbeEvidence
  && smokeHarness.summary.blockedProbeCount === 0
  && smokeHarness.checks.writeProbeAttempted === false
  && smokeHarness.checks.javaWritesAttempted === false
  && smokeHarness.checks.miniKvWritesAttempted === false,
```

这表示：

```text
可以接受 pass evidence
可以接受 skipped evidence
不能接受 blocked probe
不能接受任何写探测
```

## 区分 skipped 和 passed

v13 明确拆出两个字段：

```ts
liveProbeSmokeSkipped: smokeHarness.summary.skippedProbeCount > 0,
liveProbeSmokePassed: smokeHarness.summary.probeCount > 0
  && smokeHarness.summary.passedProbeCount === smokeHarness.summary.probeCount,
```

这能避免一个很危险的误读：

```text
skipped evidence 不是 production pass
```

本地没启动 Java / mini-kv 时，v13 可以 ready for evidence，但不能说真实生产连接已经成功。

## 保留生产 blocker

v13 仍然固定：

```ts
realManagedAuditAdapterConnected: false,
realIdpVerifierConnected: false,
readyForProductionOperations: false as const,
```

这和前几个版本的主线一致：

```text
没有真实 managed audit adapter
没有真实 IdP / JWKS verifier
没有打开上游真实动作
所以不能进入生产执行
```

## categories

本版 categories：

```ts
id:
  | "summary-v12-evidence"
  | "live-probe-contract"
  | "live-probe-smoke"
  | "real-production-connections"
  | "execution-safety";
```

正常情况下：

```text
summary-v12-evidence: pass
live-probe-contract: pass
live-probe-smoke: pass
real-production-connections: blocked
execution-safety: pass
```

这正是 v137 的目标：证据链更完整，但真实生产连接仍然 blocked。

## blockers

核心 blocker 收集：

```ts
addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", ...);
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", ...);
```

注意这里传入的是 `checks.realManagedAuditAdapterConnected`。

因为当前值是 `false`，所以会生成 blocker：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
REAL_IDP_VERIFIER_NOT_CONNECTED
```

这也是 smoke 里 `productionBlockerCount=2` 的来源。

## warnings

v13 的 warning 会区分 smoke 是否全 pass：

```ts
code: status.liveProbeSmokePassed
  ? "LIVE_PROBE_SMOKE_PASSED_CONNECTIONS_MISSING"
  : "LIVE_PROBE_SMOKE_SKIPPED_CONNECTIONS_MISSING",
```

本地默认模式下是：

```text
LIVE_PROBE_SMOKE_SKIPPED_CONNECTIONS_MISSING
```

这句 warning 很重要：它提醒 skipped evidence 只是本地开发证据，不是生产连接成功证明。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/readiness-summary-v13
GET /api/v1/production/readiness-summary-v13?format=markdown
```

路由代码：

```ts
const summary = await loadProductionReadinessSummaryV13({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

这里继续由 Node 汇总证据，不让 Node 绕过 Java 权限做 replay，也不让 Node 对 mini-kv 做写命令。

## 测试覆盖

新增测试：

```text
test/productionReadinessSummaryV13.test.ts
```

第一类测试先创建 dry-run approval，再检查完整 summary：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v13",
  readyForProductionOperations: false,
  readOnly: true,
  executionAllowed: false,
  readinessStatus: {
    summaryV12Ready: true,
    liveProbeContractReady: true,
    liveProbeSmokeEvidenceReady: true,
    liveProbeSmokeSkipped: true,
    liveProbeSmokePassed: false,
  },
});
```

第二类测试不创建 approval，确认 v13 能指出：

```text
SUMMARY_V12_EVIDENCE_NOT_READY
```

同时 contract 和 smoke evidence 仍然可读。

第三类测试覆盖 JSON / Markdown 路由。

## README、计划和归档

README 新增：

```text
Production readiness summary v13
GET /api/v1/production/readiness-summary-v13
GET /api/v1/production/readiness-summary-v13?format=markdown
```

计划收口：

```text
docs/plans/v134-production-live-probe-roadmap.md
```

新计划：

```text
docs/plans/v137-production-live-probe-evidence-roadmap.md
```

运行归档：

```text
b/137/图片/production-readiness-summary-v13.png
b/137/解释/运行调试说明.md
```

## 一句话总结

v137 把 v12 审查证据、v135 live probe contract、v136 smoke harness 汇总成 summary v13：Node 已经能说明 live probe 证据是否 ready，但 skipped evidence 不等于生产连接成功，真实 managed audit adapter 和 IdP 仍然是生产 blocker。
