# Node v226 运行说明

## 1. 版本目标

Node v226 按 `docs/plans/v225-post-sandbox-package-roadmap.md` 推进，新增 `managed audit manual sandbox adapter connection runbook`。

它消费：

```text
Node v225 managed audit sandbox adapter dry-run package
```

本版只生成“人工 sandbox 连接演练 runbook”，不连接外部 managed audit，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv / 外部审计服务。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook
GET /api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook?format=markdown
```

接口输出：

```text
runbookState=manual-sandbox-connection-runbook-ready
readyForManagedAuditManualSandboxAdapterConnectionRunbook=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
```

这里的 `ready` 只表示“手工演练 runbook 已经可审阅”，不是“可以连接 sandbox”，更不是“可以连接生产审计”。

## 3. 机器可读材料

v226 输出四组关键结构：

```text
operatorInputs：8 项，包含 owner artifact、credential handle、schema rehearsal、rollback path、timeout budget
checklist：8 步，覆盖 source package、credential boundary、schema rehearsal、rollback、failure classification
forbiddenOperations：8 项，明确禁止读 credential value、连接 audit、执行 SQL、写 Java/mini-kv 状态
pauseConditions：8 项，任何疑点都必须暂停
```

同时输出 `failureTaxonomy`：

```text
closed-window
missing-owner-artifact
credential-value-requested
schema-sql-required
connection-refused
timeout
invalid-response
manual-abort
```

## 4. 质量边界

本版继续使用共享 audit route helper：

```text
registerAuditJsonMarkdownRoute
```

新增服务文件约 683 行，低于当前计划要求的 800 行拆分线。

## 5. 生产边界

v226 继续保持：

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

## 6. 下一步

按当前计划，v226 完成后下一步不是 Node 抢跑，而是：

```text
推荐并行 Java v86 + mini-kv v95
```

Java v86 和 mini-kv v95 都只补只读 guard。两边完成后，Node v227 才能消费它们生成 `manual sandbox connection evidence checklist`。

## 7. 验证

本版最终验证覆盖：

```text
npm run typecheck
npx vitest run test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts --pool=threads --maxWorkers=4
npx vitest run --pool=threads --maxWorkers=4
npm run build
Chrome screenshot：c/226/图片/managed-audit-manual-sandbox-adapter-connection-runbook-v226.png
Node HTTP smoke：安全环境变量，验证后停止服务
```

实际结果：

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests，通过
全量测试：168 files / 571 tests，通过
npm run build：通过
Chrome screenshot：已生成 c/226/图片/managed-audit-manual-sandbox-adapter-connection-runbook-v226.png
Node HTTP smoke：通过，/health 需带 operator headers；v226 JSON/Markdown 路由返回正常
```

## 8. 清理

本版最终会清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
