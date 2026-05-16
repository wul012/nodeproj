# Node v204 three-project real-read runtime smoke preflight 代码讲解

## 模块角色

v204 是 v203 retention gate 之后的真实只读联调预检。它不是联调执行器，不会启动 Java / mini-kv，也不会读取它们；它只生成 v205 要执行真实 runtime smoke 时必须遵守的运行计划。

链路从：

```text
cross-project retention evidence is consistent
```

推进到：

```text
runtime smoke can be executed later with explicit read targets, process ownership, and cleanup rules
```

## 关键代码

### 1. 服务入口

文件：[threeProjectRealReadRuntimeSmokePreflight.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokePreflight.ts)

```ts
export async function loadThreeProjectRealReadRuntimeSmokePreflight(input: {
```

入口先加载 v203 retention gate：

```ts
loadCrossProjectCiArtifactRetentionGate(...)
```

这里有一个细节：v204 读取 source gate 时把 `upstreamProbesEnabled` 固定为 `false`，避免 v204 只是预检时就让下游 source contract 进入真实探测语义。v204 自己仍会根据当前 config 输出 `closed-window-plan` 或 `manual-open-window-plan`。

### 2. runtimeWindow

文件：[threeProjectRealReadRuntimeSmokePreflight.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokePreflight.ts)

```ts
runtimeWindow: {
  windowMode,
  nodeBaseUrl,
  javaBaseUrl,
  miniKvTarget,
  automaticUpstreamStart: false,
  realRuntimeSmokeExecutedInV204: false,
}
```

这些字段把联调窗口说清楚：Node v204 只形成计划，不自动启动上游，不执行真实 runtime smoke。

### 3. readTargets

文件：[threeProjectRealReadRuntimeSmokePreflight.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokePreflight.ts)

```ts
function createReadTargets(config: AppConfig): RuntimeReadTarget[] {
```

本版固定 8 个只读目标：

```text
node-health
node-v203-retention-gate
java-health
java-release-approval-rehearsal
mini-kv-smokejson
mini-kv-infojson
mini-kv-storagejson
mini-kv-health
```

每个 target 都带：

```text
readOnly=true
mutatesState=false
allowedInV205=true
attemptedInV204=false
```

这保证 v204 是预检，不会伪造成已经联调。

### 4. commandPolicy

文件：[threeProjectRealReadRuntimeSmokePreflight.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokePreflight.ts)

```ts
const ALLOWED_MINI_KV_COMMANDS = ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"] as const;
const FORBIDDEN_MINI_KV_COMMANDS = ["SET", "DEL", "EXPIRE", "LOAD", "COMPACT", "SETNXEX", "RESTORE"] as const;
```

Java 只允许 `GET`；mini-kv 只允许四个读命令。写命令、admin 命令和 restore 命令全部进 forbidden list。

### 5. processPlan

文件：[threeProjectRealReadRuntimeSmokePreflight.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokePreflight.ts)

```ts
function createProcessPlan(config: AppConfig): RuntimeProcessPlanStep[] {
```

本版要求 v205 真正执行时必须记录：

```text
process
defaultPort
startPolicy
stopPolicy
pidMustBeRecorded=true
cleanupRequired=true
```

这回应了真实开发流程里的关键问题：能启动就要能停止，能联调就要能说清楚是谁启动了什么。

### 6. failureTaxonomy

文件：[threeProjectRealReadRuntimeSmokePreflight.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokePreflight.ts)

```ts
function createFailureTaxonomy(): RuntimeSmokeFailureClass[] {
```

失败分类包括：

```text
closed-window
node-service-unavailable
java-connection-refused
mini-kv-connection-refused
timeout
invalid-json
unsafe-surface
unexpected-write-signal
cleanup-missing
```

这让 v205 即使联调失败，也能把失败归档成明确原因，而不是只有“没跑通”。

### 7. checks

文件：[threeProjectRealReadRuntimeSmokePreflight.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokePreflight.ts)

```ts
function createChecks(
```

关键检查包括：

```text
sourceRetentionGateReady
readTargetsComplete
javaTargetsReadOnly
miniKvTargetsReadOnly
noWriteHttpMethodsPlanned
noForbiddenMiniKvCommandsPlanned
processPlanRequiresCleanup
runtimeSmokeExecutionDeferredToV205
```

即使 v204 preflight ready，也保留 blocker：

```text
REAL_RUNTIME_SMOKE_NOT_EXECUTED
```

这说明 v204 只是计划已准备好，真实联调仍在 v205。

### 8. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```text
/api/v1/production/three-project-real-read-runtime-smoke-preflight
```

路由支持 JSON 和 Markdown，和 v203 一样继续走生产 profile 输出风格。

### 9. 测试覆盖

文件：[threeProjectRealReadRuntimeSmokePreflight.test.ts](D:/nodeproj/orderops-node/test/threeProjectRealReadRuntimeSmokePreflight.test.ts)

测试覆盖：

- 默认 closed-window，不触碰 Java / mini-kv。
- `UPSTREAM_PROBES_ENABLED=true` 时只标记为 manual open-window execution candidate，仍不执行 smoke。
- `UPSTREAM_ACTIONS_ENABLED=true` 时阻断。
- JSON/Markdown 路由正常输出。

## 本版结论

v204 把“什么时候真正联调”这件事说清楚了：现在还没有真实联调执行，只有联调预检。下一步应先推荐并行 Java v73 + mini-kv v82，让两个上游补 live-read 友好字段，再由 Node v205 执行真正的只读三项目 runtime smoke。

## 验证记录

```text
npm run typecheck：通过
聚焦测试：2 files / 7 tests 通过
本机 Chrome 截图：通过
npm test：146 files / 499 tests 通过
npm run build：通过
Node HTTP smoke：通过，JSON/Markdown endpoint 均返回 200
```
