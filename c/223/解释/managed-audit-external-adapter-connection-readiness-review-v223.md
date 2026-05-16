# Node v223 运行说明

## 1. 版本目标

Node v223 按 `docs/plans/v221-post-local-adapter-candidate-roadmap.md` 推进，新增 `managed audit external adapter connection readiness review`。

它消费：

```text
Node v222 managed audit local adapter candidate verification report
Java v81 managed audit external adapter migration guard receipt
mini-kv v90 managed audit external adapter non-participation receipt
```

本版只做真实外部 managed audit adapter 连接前 readiness review，不读取生产 credential，不连接真实外部 managed audit，不执行 schema migration，不写 Java / mini-kv / audit store。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-external-adapter-connection-readiness-review
GET /api/v1/audit/managed-audit-external-adapter-connection-readiness-review?format=markdown
```

接口输出：

```text
reviewState=ready-for-external-adapter-connection-review
readyForManagedAuditExternalAdapterConnectionReadinessReview=true
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
```

这里的 `ready` 只表示“可以进入连接前审查”，不是“可以连接生产审计”。

## 3. Java v81 证据

v223 只读检查 Java v81 归档和讲解：

```text
D:/javaproj/advanced-order-platform/c/81/解释/说明.md
D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/85-version-81-release-approval-managed-audit-external-adapter-migration-guard-receipt.md
```

关键字段：

```text
managedAuditExternalAdapterMigrationGuardReceipt
ownerApprovalRequiredBeforeConnection=true
schemaMigrationReviewRequired=true
credentialReviewRequired=true
credentialValueReadByJava=false
externalManagedAuditConnectionOpened=false
javaSqlExecuted=false
readyForNodeV223ExternalAdapterConnectionReadinessReview
```

## 4. mini-kv v90 证据

v223 只读检查 mini-kv v90 归档和 fixture：

```text
D:/C/mini-kv/c/90/解释/说明.md
D:/C/mini-kv/代码讲解记录_生产雏形阶段/146-version-90-external-adapter-non-participation-receipt.md
D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json
D:/C/mini-kv/fixtures/release/verification-manifest.json
```

关键字段：

```text
receipt_digest=fnv1a64:0dfb07cd2f8de289
consumed_receipt_digest=fnv1a64:76411286a0913dc8
external_adapter_storage_backend=false
participates_in_external_adapter=false
credential_read_allowed=false
migration_execution_allowed=false
managed_audit_write_executed=false
order_authoritative=false
```

## 5. 生产边界

v223 继续保持：

```text
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
restoreExecutionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

它不会执行：

```text
真实 managed audit credential 读取
真实外部 managed audit 连接
schema migration SQL
Java approval / ledger / SQL / deployment / rollback
mini-kv LOAD / COMPACT / SETNXEX / RESTORE
```

## 6. 验证

本版最终验证覆盖：

```text
npm run typecheck：通过
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditLocalAdapterCandidateVerificationReport.test.ts：2 files / 6 tests 通过
npx vitest run --pool=threads --maxWorkers=4：165 files / 562 tests 通过
npm run build：通过
Chrome screenshot：已生成 c/223/图片/managed-audit-external-adapter-connection-readiness-review-v223.png
Node HTTP smoke：通过，端口 4332，验证后进程已停止
```

HTTP smoke 重点检查：

```text
reviewState=ready-for-external-adapter-connection-review
readyForManagedAuditExternalAdapterConnectionReadinessReview=true
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
miniKvV90.receiptDigest=fnv1a64:0dfb07cd2f8de289
Markdown 200
```

## 7. 清理

本版最终清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
