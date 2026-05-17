# Node v225 运行说明

## 1. 版本目标

Node v225 按 `docs/plans/v223-post-external-adapter-readiness-roadmap.md` 推进，新增 `managed audit sandbox adapter dry-run package`。

它消费：

```text
Node v224 managed audit sandbox adapter dry-run plan
Java v82 sandbox adapter approval/schema guard receipt
mini-kv v91 sandbox adapter runtime evidence guard
mini-kv v94 当前 runtime smoke fixture 中保留的 v91 起源 sandbox receipt
```

本版只生成 sandbox dry-run package，不连接外部审计，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv / 外部审计服务。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-sandbox-adapter-dry-run-package
GET /api/v1/audit/managed-audit-sandbox-adapter-dry-run-package?format=markdown
```

接口输出：

```text
packageState=sandbox-adapter-dry-run-package-ready
readyForManagedAuditSandboxAdapterDryRunPackage=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
```

这里的 `ready` 只表示“sandbox dry-run package 证据齐了”，不是“可以执行 sandbox 连接”，更不是“可以连接生产审计”。

## 3. Java v82 证据

v225 只读检查 Java v82 归档、讲解和 builder 源文件：

```text
D:/javaproj/advanced-order-platform/c/82/解释/说明.md
D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/86-version-82-release-approval-managed-audit-sandbox-adapter-approval-schema-guard-receipt.md
D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder.java
```

关键字段：

```text
readyForNodeV225SandboxAdapterDryRunPackage=true
ownerApprovalArtifactRequired=true
schemaMigrationSqlExecutedByJava=false
credentialValueReadByJava=false
builderOrHelperSplitApplied=true
longBooleanConstructorAvoided=true
opsEvidenceServiceOnlyWiresReceipt=true
```

## 4. mini-kv 证据

计划要求的是 mini-kv v91，但 mini-kv 后续已经推进到 v94。v225 采用当前 release fixture：

```text
D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json
```

该 fixture 仍保留 v91 起源 sandbox receipt，并明确：

```text
consumer_hint=Node v225 managed audit sandbox adapter dry-run package
managed_audit_sandbox_adapter_non_participation_receipt.consumed_release_version=v90
managed_audit_sandbox_adapter_non_participation_receipt.receipt_digest=fnv1a64:41e870043630f686
sandbox_adapter_storage_backend=false
credential_value_read_allowed=false
sandbox_managed_audit_state_write_allowed=false
```

同时 v225 记录 mini-kv v92-v94 的质量链：

```text
v91RuntimeEvidenceHelperUsed=true
v92ManagedAuditReceiptFormatterSplit=true
v93RuntimeEvidenceReceiptFormatterSplit=true
v94CommandFormatterSplit=true
```

## 5. 融合质量优化

本版同时迁移了 auditRoutes 中 7 个旧 JSON/Markdown 路由样板：

```text
/api/v1/audit/store-profile
/api/v1/audit/store-config-profile
/api/v1/audit/file-restart-evidence
/api/v1/audit/retention-integrity-evidence
/api/v1/audit/managed-store-contract
/api/v1/audit/managed-readiness-summary
/api/v1/audit/managed-adapter-boundary
```

这些路由现在统一使用 `registerAuditJsonMarkdownRoute`，不再重复 querystring schema 和 `format=markdown` 分支。

## 6. 生产边界

v225 继续保持：

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
localDryRunWritePerformed=false
automaticUpstreamStart=false
```

## 7. 验证

本版最终验证覆盖：

```text
npm run typecheck：通过
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts --pool=threads --maxWorkers=4：3 files / 9 tests 通过
npx vitest run --pool=threads --maxWorkers=4：167 files / 568 tests 通过
npm run build：通过
Chrome screenshot：已生成 c/225/图片/managed-audit-sandbox-adapter-dry-run-package-v225.png
Node HTTP smoke：通过，端口 4334，验证后进程已停止
```

HTTP smoke 重点检查：

```text
packageState=sandbox-adapter-dry-run-package-ready
readyForManagedAuditSandboxAdapterDryRunPackage=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
Markdown 200 且包含 PACKAGE_ONLY_NO_CONNECTION
迁移后的 managed-store-contract Markdown 200
```

## 8. 清理

本版最终会清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
