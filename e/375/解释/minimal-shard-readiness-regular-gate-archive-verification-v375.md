# Node v375 运行解释：minimal shard readiness regular gate archive verification

本版目标是验证 Node v374 的 regular gate 归档是否完整。它只读取 `e/374` 的本地归档，不重新访问 Java / mini-kv，也不启动或关闭它们。

## 本版位置

来源计划：

```text
docs/plans3/v374-post-minimal-shard-readiness-regular-gate-roadmap.md
```

计划要求：

```text
Node v375：regular gate archive verification
验证 v374 JSON、Markdown、summary、HTML、截图、解释、代码讲解和计划索引
不启动、不停止、不写入 Java / mini-kv
```

## 本版实际做了什么

新增入口：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification
```

它读取：

```text
e/374/evidence/minimal-shard-readiness-regular-gate-v374-http.json
e/374/evidence/minimal-shard-readiness-regular-gate-v374-http.md
e/374/evidence/minimal-shard-readiness-regular-gate-v374-summary.json
e/374/evidence/minimal-shard-readiness-regular-gate-v374-browser-snapshot.md
e/374/minimal-shard-readiness-regular-gate-v374.html
e/374/图片/minimal-shard-readiness-regular-gate-v374.png
e/374/解释/minimal-shard-readiness-regular-gate-v374.md
代码讲解记录_生产雏形阶段3/379-minimal-shard-readiness-regular-gate-v374.md
docs/plans3/v374-post-minimal-shard-readiness-regular-gate-roadmap.md
docs/plans3/README.md
e/README.md
```

## 验证结论

HTTP smoke 结果：

```text
archiveVerificationState = minimal-shard-readiness-regular-gate-archive-verified
archiveVerificationDecision = archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145
readyForMinimalShardReadinessRegularGateArchiveVerification = true
readyForNodeV376JavaMiniKvShardEvidenceConsumption = true
checkCount = 27
passedCheckCount = 27
archiveFileCount = 11
presentArchiveFileCount = 11
productionBlockerCount = 0
```

## 边界说明

本版仍是归档验证：

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

这说明 v374 归档已经可以被后续 Node v376 消费，但不表示真实分片开启。

## 验证命令

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.test.ts
npx vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.test.ts
npm run build
Node HTTP smoke on port 4386
Playwright MCP screenshot through local static archive page on port 4387
```

## 下一步

下一步是 Node v376：消费已经完成的 Java v154 / mini-kv v145 shard-readiness 新证据。如果字段和 v374 regular gate 契约不一致，v376 应停下来报告差异，不继续堆新的前置治理链。
