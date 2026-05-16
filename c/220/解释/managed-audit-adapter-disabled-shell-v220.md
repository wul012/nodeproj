# Node v220 运行说明

## 1. 版本目标

Node v220 按 `docs/plans/v219-post-implementation-precheck-roadmap.md` 推进，新增 `managed audit adapter interface + disabled shell`。

本版只做真实 managed audit adapter 的接口和默认禁用实现：

```text
ManagedAuditAdapter.append
ManagedAuditAdapter.query
ManagedAuditAdapter.digest
ManagedAuditAdapter.health
ManagedAuditAdapter.describe
```

它不连接真实 managed audit，不写本地 dry-run 文件，不启动 Java / mini-kv，也不执行 Java approval / ledger / SQL / deployment / rollback 或 mini-kv LOAD / COMPACT / SETNXEX / RESTORE。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-adapter-disabled-shell
GET /api/v1/audit/managed-audit-adapter-disabled-shell?format=markdown
```

接口输出：

```text
shellState=disabled-shell-ready
readyForManagedAuditAdapterDisabledShell=true
readyForProductionAudit=false
connectsManagedAudit=false
executionAllowed=false
restoreExecutionAllowed=false
```

这表示 adapter shell 已经可以作为后续 v221 dry-run candidate 的接口基础，但生产审计仍然关闭。

## 3. Disabled Adapter

`DisabledManagedAuditAdapter` 是 v220 的默认选择：

```text
append -> disabled / accepted=false / written=false
query -> disabled / records=[] / recordCount=0
digest -> disabled stable sha256 digest
health -> disabled / writable=false / externalConnectionAttempted=false
describe -> adapterKind=disabled
```

selector 只声明两个候选：

```text
disabled
local-dry-run
```

其中 v220 只选择 `disabled`，`local-dry-run` 留给 v221，不在本版写 `.tmp` 或任何审计文件。

## 4. 安全边界

本版关键检查：

```text
sourcePrecheckReady=true
interfaceMethodSurfaceMinimal=true
disabledAdapterSelectedByDefault=true
localDryRunCandidateOnlyDeclared=true
productionExternalUrlRejected=true
disabledAppendDoesNotWrite=true
disabledQueryReturnsNoRecords=true
disabledHealthReportsDisabled=true
disabledDescribeReportsDisabled=true
disabledDigestStable=true
noLocalDryRunWritePerformed=true
noExternalManagedAuditAccessed=true
upstreamActionsStillDisabled=true
productionAuditStillBlocked=true
```

如果 `UPSTREAM_ACTIONS_ENABLED=true`，profile 会进入 `blocked`，但 adapter 仍然保持 disabled，不会执行写入。

## 5. 验证

本版最终验证覆盖：

```text
npm run typecheck：通过
npx vitest run test/managedAuditAdapterDisabledShell.test.ts test/managedAuditAdapterImplementationPrecheckPacket.test.ts：2 files / 9 tests 通过
npx vitest run --pool=threads --maxWorkers=4：162 files / 552 tests 通过
npm run build：通过
Chrome screenshot：已生成 c/220/图片/managed-audit-adapter-disabled-shell-v220.png
Node HTTP smoke：通过，端口 4329，验证后进程已停止
```

HTTP smoke 重点检查：

```text
shellState=disabled-shell-ready
readyForManagedAuditAdapterDisabledShell=true
readyForProductionAudit=false
connectsManagedAudit=false
selectedAdapterKind=disabled
appendWritten=false
queryRecordCount=0
Markdown 200
```

## 6. 清理

本版最终清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
