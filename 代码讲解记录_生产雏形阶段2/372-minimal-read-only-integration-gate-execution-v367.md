# 372 - Node v367 minimal read-only integration gate execution 代码讲解

## 版本定位

v367 是 v366 之后的真实执行版。v366 只判断是否有读窗口；v367 在用户确认 Java / mini-kv 已启动后，真正执行最小只读 gate。

这版不是继续写 archive / closure，也不是打开 managed audit。它只做一件事：

```text
复用已有 v349 smoke lane，真实读取 Java + mini-kv 的 5 个只读目标。
```

## 类型拆分

类型放在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionTypes.ts
```

核心结果类型是：

```ts
export type MinimalReadOnlyIntegrationGateExecutionResult =
  | Exclude<MinimalReadOnlyIntegrationSmokeRerunArchiveResult, "pending">
  | "blocked";
```

这里复用了 v349 的 `MinimalReadOnlyIntegrationSmokeRerunArchiveResult`，但排除了 `pending`。原因是 v367 是执行版：没有窗口就归为 `read-window-unavailable` 或 `blocked`，不再把它当成普通 pending 报告。

决策类型也保持窄边界：

```ts
export type MinimalReadOnlyIntegrationGateExecutionDecision =
  | "archive-read-passed-gate-execution"
  | "archive-read-window-unavailable-gate-execution"
  | "request-java-mini-kv-read-contract-fix"
  | "blocked";
```

这让后续 v368 能明确消费：通过就归档验证；不可达就继续等窗口；契约错误才请求 Java / mini-kv 修只读字段。

## 服务入口

服务入口在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.ts
```

入口先把读窗口转成 v366 决策输入：

```ts
const externalReadWindowConfirmed = input.externalReadWindowConfirmed ?? input.config.upstreamProbesEnabled;
const sourceDecision =
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision({
    config: input.config,
    explicitReadWindowProvided: externalReadWindowConfirmed,
  });
```

这段代码很关键：v367 不靠“记忆”判断窗口，而是复用 v366 的正式 decision profile。只有 `UPSTREAM_PROBES_ENABLED=true` 或显式传入窗口确认时，v366 才会给出：

```text
ready-for-explicit-read-window-gate-execution
```

## 复用 v349 smoke lane

v367 没有复制 Java / mini-kv 探测逻辑，而是调用 v349：

```ts
const reusedSmoke = shouldProbe
  ? await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive({
    config: input.config,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
    externalReadWindowConfirmed: true,
  })
  : null;
```

这样 v367 的职责是编排和归档，不重新定义探测目标。真正的 5 个目标仍来自已验证过的 smoke lane：

```text
GET /actuator/health
GET /api/v1/ops/overview
HEALTH
INFOJSON
STATSJSON
```

## Gate Execution Record

`createGateExecution()` 把本轮执行固化为 digest record：

```ts
const recordWithoutDigest = {
  executionMode: "minimal-read-only-integration-gate-execution" as const,
  sourceSpan: "Node v366 explicit read-window decision plus reused Node v349 smoke lane" as const,
  sourceDecisionDigest: source.decisionDigest,
  reusedSmokeArchiveDigest: reusedSmoke?.archiveDigest ?? null,
  gateExecutionResult: ready ? result : "blocked" as const,
  gateExecutionDecision: ready ? decision : "blocked" as const,
  externalReadWindowConfirmed,
  liveProbePerformedNow,
  attemptedTargetCount: targetResults.filter((target) => target.attempted).length,
  passedTargetCount: targetResults.filter((target) => target.status === "read-passed").length,
  startsUpstreamServices: false as const,
  writesUpstreamState: false as const,
  opensManagedAuditConnection: false as const,
  readsCredentialValue: false as const,
  parsesRawEndpointUrl: false as const,
  instantiatesProviderClient: false as const,
  invokesRuntimeShell: false as const,
};
```

这里同时记录两个 digest：

```text
sourceDecisionDigest      = v366 读窗口决策
reusedSmokeArchiveDigest  = v349 smoke lane 结果
```

这能说明 v367 是“决策 + 复用执行链路”的组合，而不是凭空生成的报告。

## Checks

`createChecks()` 一共 20 个检查。重点是这几类：

```text
sourceNodeV366Ready
sourceDecisionAllowsV367
explicitReadWindowConfirmed
smokeLaneReusedInsteadOfDuplicated
allReadTargetsAttemptedWhenWindowOpen
onlyAllowedJavaGetRequestsAttempted
onlyAllowedMiniKvReadCommandsAttempted
noUpstreamServiceStartedByNode
noUpstreamMutation
noManagedAuditConnection
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noRuntimeShellImplementedOrInvoked
```

这组检查表达的是：真实读可以发生，但只能在最小只读边界内发生。

## Route 接入

路由接在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route 仍走统一 helper：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution({
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionMarkdown,
)
```

这保持了前面路由重构后的模式，没有把新 route 写成重复的手工注册。

## 测试

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.test.ts
```

覆盖三种关键场景：

```text
1. 读窗口打开时，复用 v349 smoke lane，5/5 read-passed。
2. 读窗口关闭时，不调用任何上游。
3. route table 能输出 JSON / Markdown，关闭窗口下也不会误 probe。
```

第一条测试用 fake passing clients 锁住“通过路径”；第二条用 throwing clients 锁住“没窗口不能触碰上游”；第三条锁住路由接入。

## 本版结果

本轮真实 HTTP smoke 结果：

```text
gateExecutionResult: all-read-passed
attemptedTargetCount: 5
passedTargetCount: 5
checkCount: 20
passedCheckCount: 20
productionBlockerCount: 0
```

这说明 Java / mini-kv 当前读窗口满足 Node regular gate execution 的最低要求。
