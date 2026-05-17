# Node v228 运行说明

## 1. 版本目标

Node v228 按 `docs/plans/v227-post-evidence-checklist-roadmap.md` 推进，新增 `managed audit manual sandbox connection operator packet`。

它消费：

```text
Node v227 manual sandbox connection evidence checklist
```

本版只生成“人工 sandbox 连接窗口前的 operator packet”，不连接 external managed audit，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv / 外部审计服务。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet?format=markdown
```

接口输出：

```text
packetState=manual-sandbox-connection-operator-packet-ready
readyForManagedAuditManualSandboxConnectionOperatorPacket=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

这里的 `ready` 只表示 operator packet 已经可审阅，不代表可以连接 sandbox，更不是生产审计放行。

## 3. Operator Packet

v228 输出 6 个字段：

```text
ownerApprovalArtifactIdField=ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
credentialHandleName=ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
schemaRehearsalIdField=ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID
rollbackPathIdField=ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID
timeoutBudgetMs=15000
manualAbortMarker=ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT
```

这些都是字段名、句柄名或预算值。v228 不保存 credential value、不保存真实连接串、不保存密钥。

## 4. 生产边界

v228 继续保持：

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

按当前计划，v228 完成后下一步不是 Node 抢跑 v229，而是：

```text
推荐并行 Java v87 + mini-kv v96
```

Java v87 和 mini-kv v96 都只做只读 handoff / receipt marker。两边完成后，Node v229 才能消费它们做 packet verification。

## 6. 验证

本版最终验证覆盖：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionOperatorPacket.test.ts --pool=threads --maxWorkers=4
npx vitest run --pool=threads --maxWorkers=4
npm run build
Chrome screenshot：c/228/图片/managed-audit-manual-sandbox-connection-operator-packet-v228.png
Node HTTP smoke：安全环境变量，验证后停止服务
```

实际结果：

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests，通过
全量测试：170 files / 577 tests，通过
npm run build：通过
Chrome screenshot：已生成 c/228/图片/managed-audit-manual-sandbox-connection-operator-packet-v228.png
Node HTTP smoke：通过，PID 18876 已停止，v228 JSON/Markdown 路由返回正常
```

## 7. 清理

本版最终会清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
