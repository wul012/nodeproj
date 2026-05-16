# Node v222 运行说明

## 1. 版本目标

Node v222 按 `docs/plans/v221-post-local-adapter-candidate-roadmap.md` 推进，新增 `managed audit local adapter candidate verification report`。

它消费：

```text
Node v221 managed audit local adapter candidate dry-run archive
Java v80 managed audit adapter implementation guard receipt
mini-kv v89 adapter shell non-storage guard receipt
```

本版只读验证 v221 已归档的 HTML、截图、解释、代码讲解和计划证据，不调用 v221 dry-run endpoint，不重新写 `.tmp/managed-audit-v221-*`，不连接真实外部 managed audit。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-local-adapter-candidate-verification-report
GET /api/v1/audit/managed-audit-local-adapter-candidate-verification-report?format=markdown
```

接口输出：

```text
reportState=local-adapter-candidate-verification-ready
readyForManagedAuditLocalAdapterCandidateVerificationReport=true
readyForProductionAudit=false
sourceEndpointRerunPerformed=false
additionalLocalDryRunWritePerformed=false
connectsManagedAudit=false
```

`sourceEndpointRerunPerformed=false` 是本版关键边界：v222 只读归档，不重放 v221 dry-run。

## 3. 归档证据

v222 读取并验证：

```text
c/221/managed-audit-local-adapter-candidate-dry-run-v221.html
c/221/图片/managed-audit-local-adapter-candidate-dry-run-v221.png
c/221/解释/managed-audit-local-adapter-candidate-dry-run-v221.md
代码讲解记录_生产雏形阶段/225-managed-audit-local-adapter-candidate-dry-run-v221.md
docs/plans/v221-post-local-adapter-candidate-roadmap.md
docs/plans/v219-post-implementation-precheck-roadmap.md
```

核心匹配项：

```text
candidateState=local-adapter-dry-run-verified
readyForProductionAudit=false
dryRunDirectoryRemoved=true
LocalJsonlManagedAuditAdapterCandidate
append/query/digest/cleanup
receiptDigest=fnv1a64:76411286a0913dc8
adapterShellStorageBackend=false
推荐并行：Java v81 + mini-kv v90
```

## 4. 生产边界

v222 继续保持：

```text
readyForProductionAudit=false
readyForProductionWindow=false
readyForProductionOperations=false
executionAllowed=false
restoreExecutionAllowed=false
connectsManagedAudit=false
automaticUpstreamStart=false
```

它不会执行：

```text
Java approval / ledger / SQL / deployment / rollback
mini-kv LOAD / COMPACT / SETNXEX / RESTORE
真实 managed audit credential 读取
真实外部 managed audit 数据库连接
```

## 5. 验证

本版最终验证覆盖：

```text
npm run typecheck：通过
npx vitest run test/managedAuditLocalAdapterCandidateVerificationReport.test.ts test/managedAuditLocalAdapterCandidateDryRun.test.ts：2 files / 7 tests 通过
npx vitest run --pool=threads --maxWorkers=4：164 files / 559 tests 通过
npm run build：通过
Chrome screenshot：已生成 c/222/图片/managed-audit-local-adapter-candidate-verification-report-v222.png
Node HTTP smoke：通过，端口 4331，验证后进程已停止
```

HTTP smoke 重点检查：

```text
reportState=local-adapter-candidate-verification-ready
readyForManagedAuditLocalAdapterCandidateVerificationReport=true
readyForProductionAudit=false
sourceEndpointRerunPerformed=false
additionalLocalDryRunWritePerformed=false
Markdown 200
```

## 6. 清理

本版最终清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
