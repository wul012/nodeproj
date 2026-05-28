# Node v373 运行解释：shard readiness compatibility report

本版目标是把 v370 的静态 shard-readiness contract consumer gate、v371 的真实只读联调归档、v372 的归档验证连起来，判断静态证据和真实只读输出是否一致。

## 本版位置

来源计划：

```text
docs/plans3/v372-post-minimal-shard-readiness-live-read-archive-verification-roadmap.md
```

计划要求：

```text
Node v373：shard readiness compatibility report
不启动、不停止、不写入 Java / mini-kv
```

## 本版实际做了什么

新增入口：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report
```

它消费：

```text
Node v370: shard readiness contract consumer gate
Node v372: minimal shard readiness live-read archive verification
```

其中 v372 内部已经验证了 v371 的真实只读联调归档，所以 v373 不需要重新访问 Java 或 mini-kv。

## 对比字段

本版对 Java 和 mini-kv 分别对比：

```text
project
version
readOnly
executionAllowed
shardEnabled
shardCount
slotCount
routingMode
status
```

结果：

```text
fieldCheckCount = 18
matchedFieldCheckCount = 18
mismatchedFieldCount = 0
projectReportCount = 2
compatibleProjectCount = 2
```

## 验证结论

HTTP smoke 结果：

```text
compatibilityState = shard-readiness-compatible-for-regular-gate
compatibilityDecision = prepare-minimal-shard-readiness-regular-gate
readyForShardReadinessCompatibilityReport = true
readyForNodeV374MinimalShardReadinessRegularGate = true
checkCount = 23
passedCheckCount = 23
productionBlockerCount = 0
```

## 边界说明

本版仍是只读治理报告：

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
```

这证明“可以做常规门禁”，不等于“分片已经启用”。当前 `shardEnabled=false` 仍是设计边界。

## 验证命令

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts
npm run build
Node HTTP smoke on port 4382
Playwright MCP screenshot through local static archive page on port 4383
```

下一步是 Node v374：把 v370-v373 的静态证据、真实只读归档、归档验证和 compatibility 判断收束为 minimal shard readiness regular gate。
