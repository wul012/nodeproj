# Node v372 运行解释：minimal shard readiness live-read archive verification

本版目标是验证 v371 的最小真实只读联调归档是否完整，而不是重新读取 Java 或 mini-kv。

## 本版位置

来源计划：

```text
docs/plans3/v371-post-minimal-shard-readiness-live-read-gate-roadmap.md
```

计划要求：

```text
Node v372：消费 v371 的 JSON / Markdown / summary / screenshot / explanation / walkthrough。
不重新读取 Java / mini-kv，不要求两边服务继续运行。
```

## 本版实际做了什么

新增归档验证入口：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification
```

它读取并校验 `e/371` 下的 JSON、Markdown、summary、浏览器快照、HTML、截图、解释、代码讲解和计划索引。

## 验证结论

HTTP smoke 结果：

```text
archiveVerificationState = minimal-shard-readiness-live-read-archive-verified
archiveVerificationDecision = archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report
readyForMinimalShardReadinessLiveReadArchiveVerification = true
readyForNodeV373ShardReadinessCompatibilityReport = true
checkCount = 29
passedCheckCount = 29
archiveFileCount = 11
presentArchiveFileCount = 11
sourceCheckCount = 27
sourcePassedCheckCount = 27
attemptedReadCount = 2
passedReadCount = 2
productionBlockerCount = 0
```

## 边界说明

v372 只验证已归档证据：

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

这意味着 v372 没有把 mini-kv 放入 Java 事务链路，也没有打开 managed audit 连接。它只是把 v371 的真实只读联调证据固化成可复查的归档门禁。

## 验证命令

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.test.ts
npm run build
Node HTTP smoke on port 4380
Playwright MCP screenshot through local static archive page on port 4381
```

下一步是 Node v373：对比 v370 静态证据、v371 真实只读归档证据和 shard-readiness contract 字段，生成 compatibility report。
