# 371 - Node v366 explicit read-window gate execution decision 代码讲解

## 版本定位

v366 接在 v365 后面。v365 已验证 v364 regular gate 的归档，并写清 CI/operator friendly check。v366 不再做归档验证，而是判断当前是否可以进入真实只读执行窗口。

本轮没有显式读窗口授权，所以 v366 的决策是：

```text
wait-for-external-read-window
```

这版只做决策，不启动 Java / mini-kv，不重跑 probe，不打开 managed audit，不读取 credential value。

## 类型层

类型定义在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionTypes.ts
```

核心决策类型只有三种：

```ts
type MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision =
  | "ready-for-explicit-read-window-gate-execution"
  | "wait-for-external-read-window"
  | "blocked";
```

这避免了模糊表达：要么准备执行，要么等待外部窗口，要么阻塞。

## 服务入口

服务入口在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision.ts
```

入口先消费 v365：

```ts
const sourceProfile =
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification({
    config: input.config,
  });
const sourceNodeV365 = createSourceNodeV365(sourceProfile);
```

然后读取是否有明确读窗口：

```ts
const explicitReadWindowProvided = input.explicitReadWindowProvided === true;
const gateExecutionDecision = determineGateExecutionDecision(sourceNodeV365, explicitReadWindowProvided);
```

当前 route 没有传入 `explicitReadWindowProvided`，所以默认是 `false`。

## Decision 逻辑

`determineGateExecutionDecision()` 很窄：

```ts
if (!source.readyForArchiveVerification || !source.readyForNodeV366ExplicitReadWindowGateExecutionDecision) {
  return "blocked";
}
return explicitReadWindowProvided
  ? "ready-for-explicit-read-window-gate-execution"
  : "wait-for-external-read-window";
```

这段代码表达的是：v365 没准备好就阻塞；v365 准备好了但没有读窗口，就等待；只有明确读窗口存在时，才给 v367 真实 gate execution。

## Decision Record

`createDecisionRecord()` 固化了本版不执行的边界：

```ts
actualProbeExecutedNow: false
rerunsLiveProbe: false
startsUpstreamServices: false
mutatesUpstreamState: false
opensManagedAuditConnection: false
readsCredentialValue: false
parsesRawEndpointUrl: false
instantiatesProviderClient: false
invokesRuntimeShell: false
requestsJavaMiniKvEcho: false
```

同时它把下一步写成：

```ts
nextNodeVersionSuggested:
  decision === "ready-for-explicit-read-window-gate-execution"
    ? "Node v367"
    : "wait-for-external-read-window"
```

所以在当前状态下，不会自动建议继续堆 Node 新版本。

## Checks

`createChecks()` 一共 22 个检查，重点是：

```text
sourceNodeV365Ready
focusedCiOperatorCheckReady
explicitReadWindowHandledAsDecisionInput
missingWindowClassifiedAsExternalWait
noProbeExecutedWithoutExplicitWindow
noUpstreamServiceStarted
noManagedAuditConnection
noCredentialValueRequestedOrRead
noRawEndpointUrlRequestedOrParsed
noProviderClientInstantiated
noRuntimeShellImplementedOrInvoked
executionStillBlocked
```

这组检查确保 v366 不会在没有窗口时偷偷执行，也不会把 read-window 缺失误判成 Java/mini-kv 代码问题。

## 路由入口

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMarkdown,
)
```

这仍然只是报告入口，不是执行入口。

## 测试

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision.test.ts
```

覆盖三条路径：

```text
1. 默认无读窗口：decision=wait-for-external-read-window，actualProbeExecutedNow=false。
2. 显式读窗口：decision=ready-for-explicit-read-window-gate-execution，但仍不在 v366 执行。
3. route：JSON 和 Markdown 均可输出。
```

第二条测试很关键：它证明 v366 有进入 v367 的路径，但必须由明确读窗口触发。

## 本版价值

v366 把“什么时候能真实联调”回答成工程状态机：

```text
v365 ready + 无读窗口 -> wait-for-external-read-window
v365 ready + 有读窗口 -> Node v367 gate execution
```

因此当前不是继续空转 Node，而是在等待真实读窗口。
