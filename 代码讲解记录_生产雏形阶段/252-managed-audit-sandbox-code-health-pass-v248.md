# 第二百四十八版代码讲解：managed-audit sandbox code health pass

本版目标是做一次 Node 侧质量优化，而不是继续推进真实连接。它落实最新计划中的：

```text
推荐并行质量优化批次：Node v248 + Java v100 + mini-kv v109
```

Node v248 先把 v247 的测试、fallback、路由注册和安全边界变成可查询的 code health profile。Java v100 和 mini-kv v109 可以继续并行做各自的质量优化；完成后再进入 Node v249 rehearsal guard。

## 新增服务

新增文件：

```text
src/services/managedAuditSandboxCodeHealthPass.ts
```

入口函数是：

```ts
export function loadManagedAuditSandboxCodeHealthPass(input: {
  config: AppConfig;
}): ManagedAuditSandboxCodeHealthPassProfile
```

它先消费 v247 的现成结果：

```ts
const sourceV247 = loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification({
  config: input.config,
});
```

这意味着 v248 不重复解析 Java v99 / mini-kv v108 的业务证据，而是站在 v247 已验证通过的结果上做质量闸。

## v247 source 摘要

`createSourceNodeV247()` 提取：

```ts
verificationState: source.verificationState,
verificationDigest: source.receiptVerification.verificationDigest,
readyForPrecheckUpstreamReceiptVerification:
  source.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
javaReady: source.upstreamReceipts.javaV99.readyForNodeV247Alignment,
miniKvReady: source.upstreamReceipts.miniKvV108.readyForNodeV247Alignment,
connectionStillBlocked: true,
```

这里 `connectionStillBlocked: true` 是刻意保留的硬边界：v248 是质量版，不是连接版。

## 回归覆盖检查

`createRegressionCoverage()` 会读取实际源码和测试文件：

```ts
const serviceSource = readText(V247_SERVICE);
const testSource = readText(V247_TEST);
const routeSource = readText(ROUTE_TABLE);
```

然后确认 v247 的关键回归测试存在：

```ts
fallbackRegressionTestPresent:
  testSource.includes("ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK")
  && testSource.includes("uses committed historical fixture fallback"),

blockedConfigTestPresent:
  testSource.includes("blocks when upstream actions are enabled")
  && testSource.includes("UPSTREAM_ACTIONS_ENABLED"),

jsonMarkdownRouteRegressionPresent:
  testSource.includes("exposes JSON and Markdown routes through the audit route table")
  && testSource.includes("?format=markdown"),
```

这样后续如果有人删掉 fallback 测试、blocked 测试或 Markdown route 测试，v248 profile 会直接变成 blocked。

## route table 检查

v248 不允许回到旧式手写路由。它检查：

```ts
routeRegisteredThroughTable:
  routeSource.includes(V247_ROUTE_PATH)
  && routeSource.includes("loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification"),

markdownRendererRegisteredThroughTable:
  routeSource.includes("renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown"),
```

这延续了 v240 的 route table 优化方向。

## 安全边界检查

v248 对 v247 service 做源码扫描：

```ts
noRealConnectionClientImport:
  !serviceSource.includes("../clients/")
  && !serviceSource.includes("OrderPlatformClient")
  && !serviceSource.includes("MiniKvClient")
  && !serviceSource.includes("fetch("),
```

同时检查 credential、schema migration、auto-start 关键边界：

```ts
noCredentialValueRead:
  serviceSource.includes("readsManagedAuditCredential: false")
  && serviceSource.includes("credentialValueReadAllowed"),

noSchemaMigrationExecution:
  serviceSource.includes("schemaMigrationExecuted: false")
  && serviceSource.includes("schemaMigrationExecutionAllowed"),

noAutomaticUpstreamStart:
  serviceSource.includes("automaticUpstreamStart: false")
  && serviceSource.includes("miniKvAutoStartAllowed"),
```

这是轻量静态闸，不替代测试，但能防止最粗心的真实连接代码混入 v247/v248 这条链。

## 大文件清单

v248 新增 `largeFileInventory`，读取真实行数：

```ts
const LARGE_FILE_TARGETS = Object.freeze([
  "src/routes/statusRoutes.ts",
  "src/ui/dashboard.ts",
  "src/services/opsPromotionArchiveRenderers.ts",
  V247_SERVICE,
]);
```

这版不拆这些文件，因为一次拆三个 2000+ 行文件风险太大。v248 只把验收目标固化，后面按小版本拆：

```text
Node v250+：statusRoutes.ts
Node v251+：dashboard.ts
Node v252+：opsPromotionArchiveRenderers.ts
```

## checks 聚合

最终 ready 由全部 check 自动聚合：

```ts
checks.readyForManagedAuditSandboxCodeHealthPass = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditSandboxCodeHealthPass")
  .every(([, value]) => value);
```

核心 checks 包括：

```text
sourceNodeV247Ready
v247ServiceBelowNewServiceLimit
fallbackRegressionTestPresent
blockedConfigTestPresent
jsonMarkdownRouteRegressionPresent
routeRegisteredThroughTable
v247AvoidsRealConnectionClients
v247KeepsCredentialBoundaryClosed
v247KeepsSchemaMigrationBlocked
v247KeepsAutoStartBlocked
largeFileInventoryRecorded
splitAcceptanceChecklistCreated
upstreamActionsStillDisabled
```

## 路由接入

`src/routes/auditJsonMarkdownRoutes.ts` 新增：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-sandbox-code-health-pass",
  (deps) => loadManagedAuditSandboxCodeHealthPass({
    config: deps.config,
  }),
  renderManagedAuditSandboxCodeHealthPassMarkdown,
)
```

仍然走共享 route table，没有新增手写 JSON/Markdown route。

## 测试

新增测试：

```text
test/managedAuditSandboxCodeHealthPass.test.ts
```

覆盖：

```text
1. profile ready，且不打开 managed audit connection
2. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
3. JSON / Markdown route table 接入
```

聚焦验证：

```text
npm run typecheck -> passed
vitest run managedAuditSandboxCodeHealthPass.test.ts -> 3 tests passed
```

最终验证：

```text
npm test -> 188 files / 631 tests passed
npm run build -> passed
safe HTTP smoke -> /health ok，v248 JSON ready，Markdown 200
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
```

## 本版边界

- 不启动 Java。
- 不启动 mini-kv。
- 不构建、不测试、不修改 Java / mini-kv。
- 不读取 credential value。
- 不打开 managed audit connection。
- 不执行 schema migration。
- 不写 approval ledger。

## 下一步

```text
Java v100 + mini-kv v109 继续并行质量优化
Node v249：manual sandbox connection rehearsal guard
```

Node v249 需要等这一批质量优化对齐后再推进，避免在基础工程债仍未标定时抢跑真实连接前的 guard。
