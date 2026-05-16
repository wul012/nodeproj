# Node v205 three-project real-read runtime smoke execution packet

## 本版判断

v205 是 v204 preflight 之后的第一版真实三项目只读联调。它不再只写 fixture 或 checklist，而是让 Node 在受控环境中实际读取：

```text
Node local evidence
Java v73 health + release approval rehearsal
mini-kv v82 SMOKEJSON / INFOJSON / STORAGEJSON / HEALTH
```

这版仍然不是生产窗口授权。`UPSTREAM_ACTIONS_ENABLED=false`，Java 只读 `GET`，mini-kv 只读命令白名单，生产执行、restore、rollback、deployment、artifact upload 都保持关闭。

## 本版新增

新增服务：

```text
src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.ts
```

新增接口：

```text
GET /api/v1/production/three-project-real-read-runtime-smoke-execution-packet
GET /api/v1/production/three-project-real-read-runtime-smoke-execution-packet?format=markdown
```

新增客户端能力：

```text
OrderPlatformClient.releaseApprovalRehearsal(headers)
```

新增测试：

```text
test/threeProjectRealReadRuntimeSmokeExecutionPacket.test.ts
```

## 真实联调证据

本轮真实 smoke 临时启动了三个进程：

```text
Java: advanced-order-platform jar, port 18080
mini-kv: 临时 v82 构建产物, port 6420
Node: dist/server.js, port 4305
```

mini-kv 现有 `cmake-build-debug` 二进制停留在旧版本，无法返回 v82 的 `INFOJSON` / `SMOKEJSON` 证据。因此本轮在 Node 项目的 `.tmp/mini-kv-build-v82` 下临时构建了 mini-kv v82 运行产物，只用于 v205 联调，未修改 mini-kv 源码，最终会清理。

真实结果：

```text
packetState=executed-pass
readyForArchiveVerification=true
readyForProductionWindow=false
attemptedTargetCount=8
passedTargetCount=8
failedTargetCount=0
executionDigest=1bb5dcd900100feb0ce0bccb96a9db371c03f90cab7199edc98433b5a21f36c1
miniKvProjectVersion=0.82.0
miniKvSessionId=mini-kv-live-read-v82
miniKvReadCommandDigest=fnv1a64:5bef33f2fbe65cc5
```

8 个只读目标：

```text
node-health: passed-read
node-v203-retention-gate: passed-read
java-health: passed-read
java-release-approval-rehearsal: passed-read
mini-kv-smokejson: passed-read
mini-kv-infojson: passed-read
mini-kv-storagejson: passed-read
mini-kv-health: passed-read
```

## 安全边界

```text
readOnly=true
executionAllowed=false
readyForProductionWindow=false
readyForProductionOperations=false
UPSTREAM_ACTIONS_ENABLED=false
automaticUpstreamStart=false
```

mini-kv forbidden 命令仍然没有执行：

```text
SET
DEL
EXPIRE
LOAD
COMPACT
SETNXEX
RESTORE
```

Java 没有执行订单创建、支付、库存、审批写入、部署或回滚。

## 验证结果

```text
npm run typecheck：通过
聚焦测试：2 files / 8 tests 通过
npm run build：通过
真实三项目只读 smoke：通过，8/8 读目标 passed-read
Chrome/Edge 本机浏览器截图：通过，见 c/205/图片/three-project-real-read-runtime-smoke-execution-packet-v205.png
npm test：147 files / 503 tests 通过
安全 Node HTTP smoke：通过，JSON/Markdown 均返回 200；默认 closed-window skipped=8
本轮启动的 Java、mini-kv、Node 进程：已停止
```

截图说明：本机未发现 Chrome 标准安装路径，本轮按计划 README 的兜底规则使用本机 Edge headless 生成截图。

## 下一步

下一步是 Node v206：消费 v205 的真实联调 packet、截图、HTTP/TCP 记录、临时构建说明和 cleanup 记录，做 archive verification。
