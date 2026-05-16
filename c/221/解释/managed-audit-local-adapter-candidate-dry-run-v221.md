# Node v221 运行说明

## 1. 版本目标

Node v221 按 `docs/plans/v219-post-implementation-precheck-roadmap.md` 推进，新增 `managed audit local adapter candidate dry-run`。

它消费：

```text
Node v220 managed audit adapter disabled shell
Java v80 managed audit adapter implementation guard receipt
mini-kv v89 adapter shell non-storage guard receipt
```

本版只在 Node 本地 `.tmp/managed-audit-v221-*` 目录写一条 JSONL dry-run 记录，并在验证结束后删除。它不连接真实外部 managed audit，不启动 Java / mini-kv，不执行 Java approval / ledger / SQL / deployment / rollback，也不执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE。

## 2. 新增接口

```text
GET /api/v1/audit/managed-audit-local-adapter-candidate-dry-run
GET /api/v1/audit/managed-audit-local-adapter-candidate-dry-run?format=markdown
```

接口输出：

```text
candidateState=local-adapter-dry-run-verified
readyForManagedAuditLocalAdapterCandidateDryRun=true
readyForProductionAudit=false
connectsManagedAudit=false
appendWritten=true
dryRunDirectoryRemoved=true
```

`appendWritten=true` 只表示写入了 Node 本地临时 JSONL candidate 文件，不是生产审计记录。

## 3. 上游证据

Java v80 固化：

```text
readyForNodeV221LocalAdapterCandidateDryRun=true
nodeV220SelectedAdapterDisabled=true
nodeV220AppendWritten=false
nodeV220ExternalManagedAuditAccessed=false
javaApprovalLedgerWritten=false
javaManagedAuditStoreWritten=false
javaSqlExecuted=false
nodeMayTreatAsProductionAuditRecord=false
```

mini-kv v89 固化：

```text
receiptDigest=fnv1a64:76411286a0913dc8
adapterShellStorageBackend=false
storageBackendAllowed=false
managedAuditWriteExecuted=false
localDryRunRecordsWritten=false
orderAuthoritative=false
```

## 4. Dry-run 验证

`LocalJsonlManagedAuditAdapterCandidate` 覆盖：

```text
append -> 写入 1 条本地临时 JSONL
query -> 按 requestId 读回 1 条
digest -> append 前后 digest 改变，重复读取 digest 稳定
health -> healthy / externalConnectionAttempted=false
describe -> adapterKind=local-dry-run
cleanup -> 删除 .tmp/managed-audit-v221-* 目录
```

## 5. 验证

本版最终验证覆盖：

```text
npm run typecheck：通过
npx vitest run test/managedAuditLocalAdapterCandidateDryRun.test.ts test/managedAuditAdapterDisabledShell.test.ts：2 files / 9 tests 通过
npx vitest run --pool=threads --maxWorkers=4：163 files / 556 tests 通过
npm run build：通过
Chrome screenshot：已生成 c/221/图片/managed-audit-local-adapter-candidate-dry-run-v221.png
Node HTTP smoke：通过，端口 4330，验证后进程已停止
```

HTTP smoke 重点检查：

```text
candidateState=local-adapter-dry-run-verified
readyForManagedAuditLocalAdapterCandidateDryRun=true
readyForProductionAudit=false
connectsManagedAudit=false
queryByRequestIdCount=1
dryRunDirectoryRemoved=true
Markdown 200
```

## 6. 清理

本版最终清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
