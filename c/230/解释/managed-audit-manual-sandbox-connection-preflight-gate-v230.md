# Node v230 运行说明

## 1. 版本目标

Node v230 按 `docs/plans/v229-post-packet-verification-roadmap.md` 推进，新增 `managed audit manual sandbox connection preflight gate`。

它消费：

```text
Node v229 manual sandbox connection packet verification
```

本版只生成连接前 gate，不连接 external managed audit，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv / 外部审计服务。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate
GET /api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate?format=markdown
```

接口输出：

```text
gateState=manual-sandbox-connection-preflight-gate-ready
readyForManagedAuditManualSandboxConnectionPreflightGate=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

这里的 `ready` 只表示 preflight gate 已经可归档，不代表可以连接 sandbox，更不是生产审计放行。

## 3. Preflight Gate

v230 输出 7 个连接前字段：

```text
ownerApprovalArtifactIdField=ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
credentialHandleName=ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
schemaRehearsalIdField=ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID
rollbackPathIdField=ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID
timeoutBudgetMs=15000
manualAbortMarker=ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT
manualWindowFlagName=ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED
```

新增的 `manualWindowFlagName` 只是字段名。v230 明确保持：

```text
manualWindowOpenByDefault=false
connectionExecutionAllowed=false
credentialValueRequired=false
schemaMigrationExecutionAllowed=false
managedAuditWriteAllowed=false
nodeAutoStartAllowed=false
```

## 4. 生产边界

v230 继续保持：

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

按当前计划，v230 完成后下一步不是 Node 抢跑 v231，而是：

```text
推荐并行 Java v88 + mini-kv v97
```

Java v88 和 mini-kv v97 都只做只读 echo / guard marker。两边完成后，Node v231 才能消费它们做 preflight verification。

## 6. 验证

本版最终验证覆盖：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightGate.test.ts --pool=threads --maxWorkers=4
npx vitest run --pool=threads --maxWorkers=4
npm run build
Chrome screenshot：c/230/图片/managed-audit-manual-sandbox-connection-preflight-gate-v230.png
Node HTTP smoke：安全环境变量，验证后停止服务
```

实际结果会在最终收口后写入本文件。

实际结果：

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests，通过
全量测试：172 files / 583 tests，通过
npm run build：通过
Chrome screenshot：已生成 c/230/图片/managed-audit-manual-sandbox-connection-preflight-gate-v230.png
Node HTTP smoke：通过，PID 30084 已停止，v230 JSON/Markdown 路由返回正常
```

## 7. 清理

本版最终会清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
