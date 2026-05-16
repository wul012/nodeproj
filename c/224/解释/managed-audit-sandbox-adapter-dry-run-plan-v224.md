# Node v224 运行说明

## 1. 版本目标

Node v224 按 `docs/plans/v223-post-external-adapter-readiness-roadmap.md` 推进，新增 `managed audit sandbox adapter dry-run plan`。

它消费：

```text
Node v223 managed audit external adapter connection readiness review
```

本版只定义 sandbox-only managed audit adapter dry-run 的前置计划，不连接外部审计，不读取 credential value，不执行 schema migration，不写 Java / mini-kv / audit store。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan
GET /api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan?format=markdown
```

接口输出：

```text
planState=sandbox-adapter-dry-run-plan-ready
readyForManagedAuditSandboxAdapterDryRunPlan=true
readyForManagedAuditSandboxAdapterDryRunPackage=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
```

这里的 `ready` 只表示“sandbox dry-run plan 已定义完整”，不是“可以执行 sandbox adapter 连接”，也不是“可以连接生产审计”。

## 3. sandbox plan

v224 明确下一步 dry-run 前必须准备：

```text
owner approval artifact
sandbox credential handle
schema migration rehearsal checklist
failure rollback path
Java v82 approval/schema rehearsal guard receipt
mini-kv v91 runtime evidence non-participation receipt
```

同时继续禁止：

```text
读取或打印生产 managed audit credential value
打开真实外部 managed audit 连接
执行 schema migration SQL
写 Java approval ledger 或 managed audit state
把 mini-kv 作为 managed audit storage backend
自动启动 Java / mini-kv / 外部审计服务
打开生产 audit 或 production operations window
```

## 4. 显式质量门槛

本版把计划里的质量优化从文字建议提升为 profile 字段：

```text
qualityGates.gatesAreHardAcceptanceCriteria=true
qualityGates.nodeV224ProfileExportsQualityGates=true
qualityGates.nodeRouteRegistrationRequired=registerAuditJsonMarkdownRoute
qualityGates.nodeManagedAuditServiceFileLimit=split-before-800-lines
qualityGates.javaV82OpsEvidenceServiceBloatForbidden=true
qualityGates.javaV82BuilderOrHelperRequired=true
qualityGates.miniKvV91CommandCppIfChainBloatForbidden=true
qualityGates.miniKvV91RuntimeEvidenceHelperRequired=true
```

这样 Java v82 / mini-kv v91 的质量优化不会只停留在计划文案里，Node v224 的接口和测试都会把它们作为下轮验收条件暴露出来。

## 5. 生产边界

v224 继续保持：

```text
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

## 6. 验证

本版最终验证覆盖：

```text
npm run typecheck：通过
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts --pool=threads --maxWorkers=4：2 files / 6 tests 通过
npx vitest run --pool=threads --maxWorkers=4：166 files / 565 tests 通过
npm run build：通过
Chrome screenshot：已生成 c/224/图片/managed-audit-sandbox-adapter-dry-run-plan-v224.png
Node HTTP smoke：通过，端口 4333，验证后进程已停止
```

HTTP smoke 重点检查：

```text
planState=sandbox-adapter-dry-run-plan-ready
readyForManagedAuditSandboxAdapterDryRunPlan=true
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
qualityGates.gatesAreHardAcceptanceCriteria=true
Markdown 200 且包含 RUN_PARALLEL_SANDBOX_GUARDS
```

## 7. 清理

本版最终会清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
