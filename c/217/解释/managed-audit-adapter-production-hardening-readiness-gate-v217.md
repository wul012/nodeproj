# Node v217 运行说明

## 1. 版本目标

Node v217 按 `docs/plans/v215-post-dry-run-adapter-roadmap.md` 推进，新增 `managed audit adapter production-hardening readiness gate`。

它消费：

```text
Node v216 managed audit dry-run adapter archive verification
Java v78 managed audit production adapter prerequisite receipt
mini-kv v87 managed audit adapter non-authoritative storage receipt
```

本版只做真实 managed audit adapter 前的生产硬化闸门，不连接真实 managed audit，不启动 Java / mini-kv，不执行 Java approval / ledger / SQL / deployment / rollback，也不执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate
GET /api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate?format=markdown
```

接口输出 `gateState=ready-for-production-hardening-review`，意思是“可以进入真实 adapter 前的硬化评审”，不是“已经可以生产写审计”。

关键禁用字段：

```text
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
connectsManagedAudit=false
executionAllowed=false
restoreExecutionAllowed=false
localDryRunWritePerformed=false
automaticUpstreamStart=false
```

## 3. 证据来源

v217 复用 v216 的 archive verification digest，并固定消费 Java v78 / mini-kv v87 的只读回执：

```text
sourceArchiveVerification.sourceVersion=Node v216
upstreamReceipts.javaV78.sourceVersion=Java v78
upstreamReceipts.miniKvV87.sourceVersion=mini-kv v87
upstreamReceipts.miniKvV87.receiptDigest=fnv1a64:111f0daf1283eab6
```

Java v78 负责证明 operator identity、approval decision source、ledger handoff、retention owner、failure handling、rollback review 这些前置条件已经被只读公开。

mini-kv v87 负责证明 mini-kv 不是 managed audit store，不允许 storage write，不开放 admin commands，不执行 restore，也不是订单权威状态。

## 4. Gate 判断

本版检查：

```text
nodeV216ArchiveVerificationReady=true
javaV78ReceiptAccepted=true
javaV78PrerequisitesRecorded=true
javaV78NoWriteBoundaryValid=true
miniKvV87ReceiptAccepted=true
miniKvV87NonAuthoritativeBoundaryValid=true
managedAuditStoreUrlConfigured=true
realManagedAuditAdapterStillDisconnected=true
upstreamActionsStillDisabled=true
productionAuditStillBlocked=true
productionWindowStillBlocked=true
```

其中 `managedAuditStoreUrlConfigured=true` 只说明本地安全环境变量里配置了一个未来 target，例如 `managed-audit://contract-only`；它不代表真实 adapter 已连接。

## 5. 验证

本版验证会覆盖：

```text
npm run typecheck：已通过
npx vitest run test/managedAuditAdapterProductionHardeningReadinessGate.test.ts：4 tests 已通过
npm test：159 files / 540 tests 已通过
npm run build：已通过
Chrome screenshot：c/217/图片/managed-audit-adapter-production-hardening-readiness-gate-v217.png 已生成
```

HTTP smoke 重点检查：

```text
127.0.0.1:4326
gateState=ready-for-production-hardening-review
readyForManagedAuditAdapterProductionHardeningReadinessGate=true
readyForProductionAudit=false
readyForProductionWindow=false
connectsManagedAudit=false
executionAllowed=false
restoreExecutionAllowed=false
managedAuditStoreConnected=false
javaV78ReceiptAccepted=true
miniKvV87ReceiptAccepted=true
hardPrerequisites=8/8
productionBlockers=0
Markdown 200
```

## 6. 清理

本版最终清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
