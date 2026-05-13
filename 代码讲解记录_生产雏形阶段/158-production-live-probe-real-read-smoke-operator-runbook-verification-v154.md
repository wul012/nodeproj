# 第一百五十四版代码讲解：production live probe real-read smoke operator runbook verification

本版目标是验证 v153 operator runbook 自身是否可靠。

它解决的问题是：

```text
v153 已经生成真实只读联调前清单；
v154 要证明这份清单没有漂移：
digest 可复算、步骤顺序稳定、只读目标完整、禁止操作完整、Node 不自动启动上游。
```

## 本版所处项目进度

当前阶段仍是生产雏形里的真实只读联调准备：

```text
Node v152：archive verification
Node v153：operator runbook
Node v154：operator runbook verification
Node v155：read-only window readiness packet
```

v154 不启动 Java / mini-kv，也不进入真实联调窗口。它只是把 v153 的清单从“可读”推进到“可复核”。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeOperatorRunbookVerification.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile> {
```

它先读取 v153 runbook：

```ts
const runbook = await loadProductionLiveProbeRealReadSmokeOperatorRunbook(input);
```

这让 v154 不是复制清单，而是消费真实服务输出后再验证。

## runbookDigest 复算

v154 使用和 v153 一致的覆盖字段重新构造 digest 输入：

```ts
function createRunbookDigestInput(runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile): object {
  return {
    profileVersion: runbook.profileVersion,
    sourceArchiveVerificationDigest: runbook.runbook.sourceArchiveVerificationDigest,
    sourceArchiveDigest: runbook.runbook.sourceArchiveDigest,
    sourceVerificationState: runbook.runbook.sourceVerificationState,
    requiredEnvironment: runbook.runbook.requiredEnvironment,
    operatorSteps: runbook.operatorSteps,
    readOnlyTargets: runbook.readOnlyTargets,
    forbiddenOperations: runbook.forbiddenOperations,
    checks: runbook.checks,
  };
}
```

然后验证：

```ts
runbookDigestMatches: runbook.runbook.runbookDigest === expectedRunbookDigest,
```

这样后续 v155 可以引用 v154 verification，而不是直接信任 v153 文本。

## checks 设计

核心 checks：

```ts
const checks = createChecks(runbook, expectedRunbookDigest);
checks.readyForOperatorRunbookVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForOperatorRunbookVerification")
  .every(([, value]) => value);
```

关键检查包括：

```text
sourceRunbookReady
runbookDigestValid
runbookDigestMatches
operatorStepCountMatches
operatorStepOrderValid
javaTargetsReadOnlyOnly
miniKvTargetsReadOnlyOnly
forbiddenJavaReplayPostListed
forbiddenJavaOrderWriteListed
forbiddenMiniKvWritesListed
forbiddenUpstreamActionsListed
forbiddenAutomaticUpstreamStartListed
noAutomaticUpstreamStart
upstreamActionsStayDisabled
readyForProductionOperationsStillFalse
```

这些检查覆盖了 v154 plan 中要求的全部边界。

## operator steps 验证

v154 要求 v153 的 5 个步骤顺序稳定：

```ts
operatorStepCountMatches: runbook.operatorSteps.length === 5
  && runbook.summary.operatorStepCount === 5,
operatorStepOrderValid: runbook.operatorSteps.map((step) => step.order).join(",") === "1,2,3,4,5",
operatorStepTitlesPresent: hasAllOperatorStepTitles(runbook),
```

期望标题：

```text
Review Node archive verification
Open a manual read-only window
Configure Node probes
Capture read-only evidence
Archive the outcome
```

这保证真实只读窗口不会跳过“先审阅、再人工启动、再配置 probe”的顺序。

## 只读目标验证

Java 目标验证：

```ts
javaTargetsReadOnlyOnly: runbook.readOnlyTargets.java.every((target) => target.mutatesState === false
  && (target.kind === "contract-sample" || target.target.startsWith("GET ")))
  && runbook.readOnlyTargets.java.every((target) => !target.target.includes("POST ")),
```

mini-kv 目标验证：

```ts
miniKvTargetsReadOnlyOnly: runbook.readOnlyTargets.miniKv.every((target) => target.mutatesState === false)
  && runbook.readOnlyTargets.miniKv.every((target) => !/^SET |^DEL |^EXPIRE /.test(target.target)),
```

并要求 smoke 命令完整：

```ts
["HEALTH", "INFOJSON", "STATSJSON", "CHECKJSON GET orderops:1"]
  .every((expected) => runbook.readOnlyTargets.miniKv.some((target) => target.target === expected)),
```

## 禁止操作验证

v154 明确检查禁止项是否覆盖核心风险：

```ts
forbiddenJavaReplayPostListed: runbook.forbiddenOperations.some((operation) => operation.operation === "POST /api/v1/failed-events/{id}/replay"),
forbiddenJavaOrderWriteListed: runbook.forbiddenOperations.some((operation) => operation.operation === "POST /api/v1/orders"),
forbiddenMiniKvWritesListed: runbook.forbiddenOperations.some((operation) => operation.operation === "SET / DEL / EXPIRE")
  && runbook.forbiddenOperations.some((operation) => operation.operation === "CHECKJSON SET orderops:1 value"),
forbiddenUpstreamActionsListed: runbook.forbiddenOperations.some((operation) => operation.operation === "UPSTREAM_ACTIONS_ENABLED=true"),
forbiddenAutomaticUpstreamStartListed: runbook.forbiddenOperations.some((operation) => operation.operation === "Automatically start Java or mini-kv"),
```

这让“不能做什么”也成为可验证证据，而不是只写在说明文档里。

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增路由：

```text
/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification?format=markdown
```

路由代码：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification",
  () => loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeOperatorRunbookVerificationMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeOperatorRunbookVerification.test.ts
```

覆盖四类场景：

```text
默认 non-pass runbook -> verified-operator-runbook
模拟 pass source -> 仍保持 readyForProductionOperations=false
UPSTREAM_ACTIONS_ENABLED=true -> blocked
JSON / Markdown route -> 200
```

默认场景断言：

```ts
expect(profile).toMatchObject({
  verificationState: "verified-operator-runbook",
  readyForOperatorRunbookVerification: true,
  readyForProductionOperations: false,
  verification: {
    operatorStepCount: 5,
    readOnlyTargetCount: 10,
    forbiddenOperationCount: 7,
    automaticUpstreamStart: false,
    upstreamActionsRequired: false,
  },
});
```

并确认 digest 可复算：

```ts
expect(profile.verification.runbookDigest).toBe(profile.verification.expectedRunbookDigest);
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeOperatorRunbookVerification.test.ts test/productionLiveProbeRealReadSmokeOperatorRunbook.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键结果：

```text
verificationState=verified-operator-runbook
readyForOperatorRunbookVerification=true
readyForProductionOperations=false
runbookDigestMatches=true
operatorStepCount=5
readOnlyTargetCount=10
forbiddenOperationCount=7
```

归档截图：

```text
b/154/图片/production-live-probe-real-read-smoke-operator-runbook-verification.png
```

## 成熟度变化

v154 把真实只读联调前的操作清单变成了可审计对象：

```text
v153：生成清单
v154：验证清单
v155：打包成窗口前 readiness packet
```

这比直接进入真实联调更符合生产级流程，因为 operator checklist 先要可复核，再谈执行。

## 一句话总结

v154 复算并验证 v153 operator runbook，确认步骤顺序、只读目标、禁止写操作、no-auto-start 和 production operations closed 边界稳定，为 v155 read-only window readiness packet 提供可引用证据。
