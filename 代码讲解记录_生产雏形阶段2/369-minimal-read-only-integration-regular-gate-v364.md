# 369 - Node v364 minimal read-only integration regular gate 代码讲解

## 版本定位

v364 接在 v363 后面。v363 完成的是 sandbox handle review prerequisite closure review 的归档验证；v364 开始把主线拉回真实联调结果。

这一版消费 Node v350 的 passed archive verification，而 Node v350 又固化了 Node v349 的 5/5 最小只读联调通过证据。也就是说，v364 不重新跑探测，而是把这条已经通过的只读链沉淀成 regular gate。

## 类型层

类型定义在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateTypes.ts
```

核心 Profile 保留了完整安全边界字段：

```ts
readyForProductionWindow: false;
readyForProductionAudit: false;
readyForProductionOperations: false;
executionAllowed: false;
startsJavaService: false;
startsMiniKvService: false;
connectsManagedAudit: false;
sendsManagedAuditHttpTcp: false;
credentialValueRequested: false;
credentialValueRead: false;
rawEndpointUrlRequested: false;
rawEndpointUrlParsed: false;
secretProviderInstantiated: false;
resolverClientInstantiated: false;
runtimeShellImplemented: false;
runtimeShellInvocationAllowed: false;
```

这些字段看起来重复，但在这个项目里属于审计边界：每个维度都要单独证明没有被打开。

## 服务入口

服务入口在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.ts
```

入口函数先读取 v350：

```ts
const sourceNodeV350 =
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification({
    config: input.config,
  });
```

然后生成 regular gate、checks、warnings 和 recommendations：

```ts
const draftGate = createRegularGate(sourceNodeV350, false);
const checks = createChecks(input.config, sourceNodeV350, draftGate);
const ready = everyCheckPassed(checks);
const regularGate = createRegularGate(sourceNodeV350, ready);
const productionBlockers = collectProductionBlockers(checks);
```

这里的关键点是：v364 的 readiness 来自检查结果，不是手写常量。只要 v350 证据缺失或边界字段异常，`readyForMinimalReadOnlyIntegrationRegularGate` 就会变成 `false`。

## Regular Gate

`createRegularGate()` 固定了门禁来源和下一步语义：

```ts
gateMode: "minimal-read-only-integration-regular-gate"
sourceSpan: "Node v349 passed smoke + Node v350 passed archive verification"
gateDecision: "standardize-v349-read-only-smoke-as-regular-gate"
nextNodeVersionSuggested: "Node v365"
rerunsLiveProbeNow: false
automaticUpstreamStart: false
opensManagedAuditConnection: false
readsCredentialValue: false
parsesRawEndpointUrl: false
instantiatesProviderClient: false
invokesRuntimeShell: false
mutatesUpstreamState: false
```

这说明 v364 不是又做一次 live probe，而是定义一个以后可以重复执行的门禁标准。

## Read-Only Targets

`createReadOnlyTargets()` 把 v349 已经跑通的 5 个目标变成显式 allowlist：

```ts
Java GET /actuator/health
Java GET /api/v1/ops/overview
mini-kv HEALTH
mini-kv INFOJSON
mini-kv STATSJSON
```

这一步很重要：以后 gate 不是随便探测上游，而是只允许这些读目标进入标准门禁。

## Checks

`createChecks()` 一共生成 34 个检查，分成几类：

```text
source evidence：v350 ready、v349 all-read-passed、digest stable
gate behavior：不在 v364 重跑 probe、不自动启动上游
safe env：probes 可开、actions 必须关、access guard 必须开
headers：operator / role / verified / correlation id 都要记录
targets：Java 只能 GET，mini-kv 只能 read command
failure classes：read window unavailable / invalid contract / runtime boundary blocked
boundaries：不读 credential、不解析 raw endpoint、不实例化 provider/client、不实现 runtime shell
production：production audit/window 仍 blocked
```

v364 的 HTTP smoke 返回：

```text
checkCount=34
passedCheckCount=34
productionBlockerCount=0
readyForMinimalReadOnlyIntegrationRegularGate=true
```

## 路由入口

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateMarkdown,
)
```

它继续走统一 JSON / Markdown helper，说明这是报告和门禁定义入口，不是执行入口。

## Renderer

渲染器在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateRenderer.ts
```

Markdown 里展开了：

```text
Source Node v350
Regular Gate
Required Env
Required Headers
Read-Only Targets
Failure Classifications
Artifact Expectations
Checks
Summary
Production Blockers
Warnings
Recommendations
Next Actions
```

这让 v364 的输出可以直接给人审阅，也可以给后续 archive verification 消费。

## 测试

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts
```

它覆盖三件事：

```text
1. 正常路径：v349/v350 passed evidence 能转成 regular gate。
2. fail closed：v350 evidence 缺失时，v364 不会 ready。
3. route：JSON 和 Markdown 都能通过统一 audit route 输出。
```

其中 fail closed 测试很关键，因为它证明 v364 不是靠默认通过，而是必须依赖历史通过证据。

## 本版价值

v364 的价值不是新增探测，而是减少绕路：把 v349 的真实只读联调从一次性归档，变成后续可重复使用的常规门禁。

下一步 v365 应该围绕这份 gate 做 archive / CI 友好化收口，然后进入更明确的 read-only gate 执行窗口，而不是继续扩写新的 prerequisite closure 链。
