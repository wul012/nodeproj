# Node v371 运行说明：minimal shard readiness live-read gate

本版目标是把 v370 的 contract consumer gate 推进到真实只读联调：Node 读取正在运行的 Java 和 mini-kv 服务，但不启动、不停止、不写入它们。

## 本轮做了什么

- 新增 v371 live-read gate service / renderer / route / test。
- `OrderPlatformClient` 增加只读 `shardReadiness()`。
- `MiniKvClient` 增加只读 `shardJson()`，并允许 `SHARDJSON` 作为 gateway read command。
- Node HTTP smoke 真实读取：
  - Java: `GET /api/v1/ops/shard-readiness`
  - mini-kv: `SHARDJSON`

## 运行验证

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.test.ts
npm run build
Node HTTP smoke: GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate
```

HTTP smoke 摘要：

```text
gateState = minimal-shard-readiness-live-read-gate-ready
gateDecision = archive-minimal-shard-readiness-live-read
checkCount = 27
passedCheckCount = 27
attemptedReadCount = 2
passedReadCount = 2
failedReadCount = 0
skippedReadCount = 0
productionBlockerCount = 0
javaStatus = passed-read
miniKvStatus = passed-read
startsJavaService = false
startsMiniKvService = false
stopsJavaService = false
stopsMiniKvService = false
executionAllowed = false
```

## 边界说明

本版没有让 Node 启动或停止 Java / mini-kv。两边服务由用户或各自项目进程负责。Node 只在服务已经存在时读取只读接口。

本版也没有把 mini-kv 变成订单或 audit 权威存储；live read 中 `shardEnabled=false`，说明当前仍是 shard readiness 证据，不是 active sharding。

## 截图与证据

- JSON: `e/371/evidence/minimal-shard-readiness-live-read-gate-v371-http.json`
- Markdown: `e/371/evidence/minimal-shard-readiness-live-read-gate-v371-http.md`
- Summary: `e/371/evidence/minimal-shard-readiness-live-read-gate-v371-summary.json`
- Browser snapshot: `e/371/evidence/minimal-shard-readiness-live-read-gate-v371-browser-snapshot.md`
- Screenshot: `e/371/图片/minimal-shard-readiness-live-read-gate-v371.png`

本轮只启动并停止了 Node 自身 smoke 服务和静态 HTML 服务；Java / mini-kv 由外部保持运行，Node 未停止它们。
