# Node v227 运行说明

## 1. 版本目标

Node v227 按 `docs/plans/v225-post-sandbox-package-roadmap.md` 收口，新增 `managed audit manual sandbox connection evidence checklist`。

它消费：

```text
Node v226 manual sandbox adapter connection runbook
Java v86 release approval rehearsal internal boolean flags
mini-kv v95 string utils shared split / current runtime smoke evidence
```

本版只验证人工 sandbox 连接前材料是否齐全，不连接 external managed audit，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv / 外部审计服务。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist
GET /api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist?format=markdown
```

接口输出：

```text
checklistState=manual-sandbox-connection-evidence-checklist-ready
readyForManagedAuditManualSandboxConnectionEvidenceChecklist=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

这里的 `ready` 只表示“证据清单已经齐全”，不是“允许连接 sandbox”，更不是“允许生产审计”。

## 3. Evidence Checklist

v227 输出 8 个机器可读 checklist item：

```text
node-v226-runbook-digest
node-v226-connection-blocked
java-v86-evidence-present
java-v86-contract-preserving
mini-kv-v95-evidence-present
mini-kv-v95-sandbox-non-storage
credential-handle-only
manual-window-only
```

这些条目把 Node v226 的 runbook digest、Java v86 的只读边界、mini-kv v95 的 non-storage receipt 和跨项目 credential 边界放在同一份 profile 里。

## 4. 上游证据

Java v86 只读消费：

```text
D:/javaproj/advanced-order-platform/c/86/解释/说明.md
D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/89-version-86-release-approval-rehearsal-internal-boolean-flags.md
```

验证点：

```text
纯重构版本
flags record
response shape 不变
schema version 不变
no-ledger-write proof
no-SQL
no-credential flags
```

mini-kv v95 只读消费：

```text
D:/C/mini-kv/c/95/解释/说明.md
D:/C/mini-kv/代码讲解记录_生产雏形阶段/151-version-95-string-utils-and-version-sweep.md
D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json
D:/C/mini-kv/fixtures/release/verification-manifest.json
```

验证点：

```text
project_version=0.95.0
release_version=v95
receipt_digest=fnv1a64:ceaed265f7f9560c
sandbox_adapter_storage_backend=false
credential_value_read_allowed=false
sandbox_managed_audit_state_write_allowed=false
include/minikv/string_utils.hpp
src/command.cpp 557 行
```

## 5. 生产边界

v227 继续保持：

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

## 6. 计划收口

v225 计划现在已经收口：

```text
Node v225：sandbox adapter dry-run package
Node v226：manual sandbox connection runbook
Java v86 + mini-kv v95：推荐并行完成只读 guard
Node v227：manual sandbox connection evidence checklist
```

后续另起：

```text
docs/plans/v227-post-evidence-checklist-roadmap.md
```

下一步是 Node v228 `manual sandbox connection operator packet`，仍不连接、不读取 credential value。

## 7. 验证

本版最终验证覆盖：

```text
npm run typecheck
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts --pool=threads --maxWorkers=4
npx vitest run --pool=threads --maxWorkers=4
npm run build
Chrome screenshot：c/227/图片/managed-audit-manual-sandbox-connection-evidence-checklist-v227.png
Node HTTP smoke：安全环境变量，验证后停止服务
```

实际结果：

```text
npm run typecheck：通过
聚焦测试：5 files / 15 tests，通过
全量测试：169 files / 574 tests，通过
npm run build：通过
Chrome screenshot：已生成 c/227/图片/managed-audit-manual-sandbox-connection-evidence-checklist-v227.png
Node HTTP smoke：通过，PID 21632 已停止，v227 JSON/Markdown 路由返回正常
```

## 8. 清理

本版最终会清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
