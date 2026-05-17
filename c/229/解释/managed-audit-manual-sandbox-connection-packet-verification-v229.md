# Node v229 运行说明

## 1. 版本目标

Node v229 按 `docs/plans/v227-post-evidence-checklist-roadmap.md` 收口，新增 `managed audit manual sandbox connection packet verification`。

它消费：

```text
Node v228 manual sandbox connection operator packet
Java v87 sandbox connection operator handoff marker
mini-kv v96 sandbox connection receipt echo marker
```

本版只验证 operator packet 与两侧 marker 是否一致，不连接 external managed audit，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv / 外部审计服务。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification?format=markdown
```

接口输出：

```text
verificationState=manual-sandbox-connection-packet-verification-ready
readyForManagedAuditManualSandboxConnectionPacketVerification=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

这里的 `ready` 只表示 packet verification 已经可归档，不代表可以连接 sandbox，更不是生产审计放行。

## 3. Packet Verification

v229 验证三类材料：

```text
Node v228 packetDigest / sourceChecklistDigest
Java v87 owner artifact / credential handle / schema rehearsal / rollback / timeout / abort marker echo
mini-kv v96 receipt echo marker / markerDigest / v95 consumedReceiptDigest
```

mini-kv 当前 runtime fixture 已推进到：

```text
projectVersion=0.96.0
releaseVersion=v96
markerDigest=fnv1a64:b9fc556875ea625b
consumedReceiptDigest=fnv1a64:ceaed265f7f9560c
```

因此本版还修正了旧链路兼容：v223-v228 读取 mini-kv 当前 fixture 时，不再只认旧顶层 `release_version=v95`，而是验证“当前 v96 + 历史 receipt digest 保留”。

## 4. 生产边界

v229 继续保持：

```text
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
restoreExecutionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
storesManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

## 5. 下一步

v229 完成后，当前计划切换为：

```text
docs/plans/v229-post-packet-verification-roadmap.md
```

下一步是 Node v230 `manual sandbox connection preflight gate`。v230 仍不能直接打开真实连接，只做连接前 gate。

## 6. 验证

本版最终验证覆盖：

```text
npm run typecheck
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionOperatorPacket.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts --pool=threads --maxWorkers=4
npx vitest run --pool=threads --maxWorkers=4
npm run build
Chrome screenshot：c/229/图片/managed-audit-manual-sandbox-connection-packet-verification-v229.png
Node HTTP smoke：安全环境变量，验证后停止服务
```

实际结果会在最终收口后写入本文件。

实际结果：

```text
npm run typecheck：通过
聚焦测试：7 files / 21 tests，通过
全量测试：171 files / 580 tests，通过
npm run build：通过
Chrome screenshot：已生成 c/229/图片/managed-audit-manual-sandbox-connection-packet-verification-v229.png
Node HTTP smoke：通过，PID 22356 已停止，v229 JSON/Markdown 路由返回正常
```

HTTP smoke 第一次发现 `/health` 在 access guard 开启时需要同样带 operator identity headers；修正 smoke 请求头后通过。这个问题没有改业务代码，只修正本轮验证方式。

## 7. 清理

本版最终会清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
