# Node v205 three-project real-read runtime smoke execution packet 代码讲解

## 模块角色

v205 的角色是把 v204 的联调预检变成一次真实只读执行。v204 已经列出了应该读什么、怎么读、哪些命令不能碰；v205 则实际运行 Node、Java、mini-kv，并把 8 个读目标的结果收束成一个 execution packet。

这版的边界很重要：

```text
可以真实读取
不可以真实写入
可以记录 PID / 端口 / 结果
不可以把 smoke 结果当成生产窗口授权
```

## 1. Java 客户端新增 release rehearsal 读取

文件：[orderPlatformClient.ts](D:/nodeproj/orderops-node/src/clients/orderPlatformClient.ts)

```ts
releaseApprovalRehearsal(headers: Record<string, string> = {}): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
  return this.request("/api/v1/ops/release-approval-rehearsal", { headers });
}
```

这个方法只做 `GET` 请求，目标是 Java v73 的 release approval rehearsal endpoint。它允许 Node 带上 runtime smoke headers，让 Java 返回时能知道这次读取属于哪个 preflight digest 和 session。

这里没有添加任何 Java 写操作方法，也没有打开 failed event replay、approval decision、deployment 或 rollback。

## 2. v205 服务入口

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts)

```ts
export async function loadThreeProjectRealReadRuntimeSmokeExecutionPacket(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile> {
```

入口首先加载 v204 preflight：

```ts
const sourcePreflight = await loadThreeProjectRealReadRuntimeSmokePreflight(...)
```

这让 v205 不重新定义读目标，而是消费上一版已经固化的计划。也就是说，v205 的执行范围来自 v204，不会在运行时临时扩展出新的危险目标。

## 3. 默认关闭窗口

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts)

```ts
const records = input.config.upstreamProbesEnabled
  ? await runRuntimeSmoke(...)
  : sourcePreflight.readTargets.map(skippedRecord);
```

这段代码决定是否真的读 Java / mini-kv：

```text
UPSTREAM_PROBES_ENABLED=false -> 只生成 skipped-closed-window 记录
UPSTREAM_PROBES_ENABLED=true  -> 执行真实只读 smoke
```

所以默认本地启动 Node 时不会误碰上游。真实联调必须显式打开 `UPSTREAM_PROBES_ENABLED=true`，并且仍然要求 `UPSTREAM_ACTIONS_ENABLED=false`。

## 4. 8 个读目标的执行

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts)

```ts
case "java-health": {
  const response = await input.orderPlatform.health();
  return passedRecord(target, response.latencyMs, response.statusCode, summarizeJsonEvidence(response.data));
}
```

Java health 是普通 HTTP 只读探活。

```ts
case "java-release-approval-rehearsal": {
  const response = await input.orderPlatform.releaseApprovalRehearsal(createJavaRuntimeHeaders(preflight));
  return passedRecord(target, response.latencyMs, response.statusCode, summarizeJavaRehearsal(response));
}
```

Java release rehearsal 会附带 v205 session header。它读取的是 Java v73 的 readiness hint，不创建审批、不写 ledger、不执行 release。

```ts
case "mini-kv-smokejson": {
  const result = await input.miniKv.execute("SMOKEJSON");
  return passedRecord(target, result.latencyMs, undefined, summarizeMiniKvJson(result.response));
}
```

mini-kv 的主证据来自 `SMOKEJSON`。它需要包含 v82 的 live-read session hint：

```text
session_id_echo=mini-kv-live-read-v82
read_command_list_digest=fnv1a64:5bef33f2fbe65cc5
write_commands_allowed=false
auto_start_allowed=false
```

```ts
case "mini-kv-infojson": {
  const result = await input.miniKv.infoJson();
  return passedRecord(target, result.latencyMs, undefined, summarizeJsonEvidence(result.info));
}
```

`INFOJSON` 用来确认真实运行版本和 read-only self-description，而不是从 fixture 文件假装读取成功。

## 5. Java runtime headers

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts)

```ts
function createJavaRuntimeHeaders(preflight: ThreeProjectRealReadRuntimeSmokePreflightProfile): Record<string, string> {
  return {
    "x-orderops-runtime-preflight-version": preflight.profileVersion,
    "x-orderops-runtime-preflight-digest": `sha256:${preflight.runtimeWindow.preflightDigest}`,
    "x-orderops-runtime-smoke-session-id": SESSION_ID,
    "x-orderops-runtime-read-target-id": "java-release-approval-rehearsal",
    "x-orderops-runtime-window-mode": preflight.runtimeWindow.windowMode,
  };
}
```

这些 header 的作用是让 Java 侧只读 rehearsal 能和 Node 本轮执行包对应起来。它们不是认证凭据，也不是执行授权，只是 evidence correlation。

## 6. 安全检查

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.ts](D:/nodeproj/orderops-node/src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts)

```ts
noWriteHttpMethodsAttempted: httpRecords.every((record) => record.methodOrCommand === "GET"),
```

所有 HTTP 目标必须是 `GET`。

```ts
noForbiddenMiniKvCommandsAttempted: miniKvRecords.every((record) =>
  ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"].includes(record.methodOrCommand)
),
```

mini-kv 只能执行四个白名单读命令。`LOAD`、`COMPACT`、`SETNXEX`、`RESTORE` 这类会改变状态或涉及恢复边界的命令不能出现。

```ts
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

即使 `UPSTREAM_PROBES_ENABLED=true` 打开真实读取，`UPSTREAM_ACTIONS_ENABLED` 也必须保持 false。

## 7. 路由挂载

文件：[statusRoutes.ts](D:/nodeproj/orderops-node/src/routes/statusRoutes.ts)

```ts
app.get<{ Querystring: FixtureReportQuery }>(
  "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet",
```

这个接口同时支持 JSON 和 Markdown：

```text
/api/v1/production/three-project-real-read-runtime-smoke-execution-packet
/api/v1/production/three-project-real-read-runtime-smoke-execution-packet?format=markdown
```

放在 `statusRoutes` 是合适的，因为这里已经持有 `config`、`orderPlatform`、`miniKv` 等依赖，可以真实调用上游 client，而不是只生成静态 profile。

## 8. 测试覆盖

文件：[threeProjectRealReadRuntimeSmokeExecutionPacket.test.ts](D:/nodeproj/orderops-node/test/threeProjectRealReadRuntimeSmokeExecutionPacket.test.ts)

第一类测试验证默认不会碰上游：

```ts
records closed-window skips without touching Java or mini-kv
```

它使用 `ThrowingOrderPlatformClient` 和 `ThrowingMiniKvClient`。如果默认 closed-window 误调用上游，测试会直接失败。

第二类测试验证开启 probes 后会执行 8 个目标：

```ts
executes all read targets when upstream probes are enabled
```

这里用 fake passing client 锁定：

```text
attemptedTargetCount=8
passedTargetCount=8
packetState=executed-pass
readyForArchiveVerification=true
```

第三类测试验证危险开关：

```ts
blocks when upstream actions are enabled
```

这保证 `UPSTREAM_ACTIONS_ENABLED=true` 不会被 v205 忽略。

第四类测试验证路由：

```ts
exposes JSON and Markdown routes
```

## 9. 本轮真实运行细节

本轮真实联调发现一个现实问题：mini-kv 仓库中的 `cmake-build-debug` 可执行文件是旧时间戳产物，无法返回 v82 的结构化证据。为了不把旧二进制当成 v82 冒用，本轮只在 Node 项目的临时目录构建了 mini-kv v82：

```text
D:/nodeproj/orderops-node/.tmp/mini-kv-build-v82/minikv_server.exe
```

这个构建没有修改 mini-kv 源码，也不会作为最终交付保存；它只是让 Node v205 能对真实 v82 运行时发 TCP 读命令。

真实执行结果：

```text
packetState=executed-pass
readyForArchiveVerification=true
attemptedTargetCount=8
passedTargetCount=8
failedTargetCount=0
miniKvProjectVersion=0.82.0
miniKvSessionId=mini-kv-live-read-v82
```

## 本版结论

v205 让三项目从“证据契约能对齐”推进到“真实只读联调能跑通”。这是一处小质变：Node 不是只读文件、不是只生成 summary，而是实际通过 HTTP/TCP 读取 Java 和 mini-kv。

但它仍然没有进入生产执行阶段：

```text
production window remains false
production operations remain false
actions remain disabled
real writes remain blocked
```

下一版 v206 应该验证 v205 的归档完整性：截图、HTTP/TCP 记录、执行 digest、临时构建说明和 cleanup 记录都要被检查，而不是继续新增另一个 summary。

## 验证记录

```text
npm run typecheck：通过
聚焦测试：2 files / 8 tests 通过
npm run build：通过
真实三项目只读 smoke：通过，8/8 passed-read
npm test：147 files / 503 tests 通过
本机浏览器截图：通过，使用 Edge 兜底生成 c/205/图片/three-project-real-read-runtime-smoke-execution-packet-v205.png
安全 Node HTTP smoke：通过，JSON/Markdown endpoint 均返回 200，默认 closed-window skipped=8
```

本轮启动过的 Java、mini-kv、Node 进程均已停止。临时 mini-kv v82 构建产物和 Node `dist` 会在提交前清理。
