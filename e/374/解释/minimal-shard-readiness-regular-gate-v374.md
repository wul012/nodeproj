# Node v374 运行解释：minimal shard readiness regular gate

本版目标是把 v370-v373 的 shard readiness 证据链收束成一个常规门禁。它不是重新访问 Java / mini-kv，也不是启用分片，而是把已经完成的静态证据、真实只读归档、归档验证和兼容性报告冻结为 operator / CI 可消费的 regular gate。

## 本版位置

来源计划：

```text
docs/plans3/v373-post-shard-readiness-compatibility-report-roadmap.md
```

计划要求：

```text
Node v374：minimal shard readiness regular gate
消费 v370-v373 证据链
不启动、不停止、不写入 Java / mini-kv
```

## 本版实际做了什么

新增入口：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate
```

它消费：

```text
Node v370: shard readiness contract consumer gate
Node v371: minimal shard readiness live-read gate archive
Node v372: live-read archive verification
Node v373: shard readiness compatibility report
```

v374 只读本地证据链，不重新启动 Java 或 mini-kv。

## 本版额外修正

并行开发时，Java / mini-kv 的最新本地证据可能已经超过 v370-v371 当时的归档状态。为了避免 v373 compatibility report 被当前 sibling workspace 状态反向污染，本版把 v373 的静态来源优先固定为：

```text
e/370/evidence/shard-readiness-contract-consumer-gate-v370-http.json
```

只有这个归档不存在时才回退到即时计算。这样 v374 的 regular gate 真正消费的是 v370-v373 已归档证据链，而不是“当前最新的 Java / mini-kv 工作区状态”。

## 门禁判断

本版重点检查：

```text
sourceNodeV373Ready = true
sourceDigestChainComplete = true
sourceProjectReportsComplete = true
sourceFieldChecksAllMatched = true
regularGateConsumesFullEvidenceChain = true
operatorCiReady = true
noLiveReadRerun = true
noAutomaticUpstreamStartStop = true
noManagedAuditConnection = true
```

结果：

```text
checkCount = 18
passedCheckCount = 18
sourceProjectReportCount = 2
sourceCompatibleProjectCount = 2
sourceFieldCheckCount = 18
sourceMatchedFieldCheckCount = 18
sourceMismatchedFieldCount = 0
productionBlockerCount = 0
```

## 边界说明

本版仍是 readiness regular gate：

```text
rerunsLiveRead = false
startsJavaService = false
startsMiniKvService = false
stopsJavaService = false
stopsMiniKvService = false
mutatesJavaState = false
mutatesMiniKvState = false
connectsManagedAudit = false
executionAllowed = false
activeShardingEnabled = false
```

这表示 Node 可以把 shard readiness 纳入常规门禁，但不代表 mini-kv 已经启用真实分片，也不代表 Java 已经把 mini-kv 放进订单一致性链路。

## 验证命令

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts
npm run build
Node HTTP smoke on port 4384
Playwright MCP screenshot through local static archive page on port 4385
```

## 并行关系

v374 不要求 Java / mini-kv 停止开发。Java 和 mini-kv 可以并行继续做 shard readiness hardening；Node 后续只消费它们的新证据，不把自己当作全部进度的前置审批中心。

下一步是 Node v375：验证 v374 regular gate 的归档完整性。
