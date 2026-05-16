# Node v221 managed audit local adapter candidate dry-run 代码讲解

## 模块角色

v221 是真实 managed audit adapter 之前的本地候选演练：

```text
Node v220：ManagedAuditAdapter interface + disabled shell
Java v80：managed audit adapter implementation guard receipt
mini-kv v89：adapter shell non-storage guard receipt
Node v221：local JSONL adapter candidate dry-run
```

它只证明 Node 本地候选 adapter 可以 append/query/digest/cleanup，不证明生产审计可用。

## 1. 接口向前兼容

文件：[managedAuditAdapterDisabledShell.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterDisabledShell.ts)

```ts
export interface ManagedAuditAdapter {
  append(record: ManagedAuditAppendRecord): Promise<ManagedAuditAdapterAppendResult>;
  query(filter: ManagedAuditQueryFilter): Promise<ManagedAuditAdapterQueryResult>;
  digest(): Promise<ManagedAuditAdapterDigestResult>;
  health(): Promise<ManagedAuditAdapterHealthResult>;
  describe(): Promise<ManagedAuditAdapterDescription>;
}
```

v221 沿用 v220 的接口，把返回类型扩展为 disabled / local-dry-run 两类结果。`DisabledManagedAuditAdapter` 仍然用更窄的 disabled 返回类型，所以 v220 行为不变。

## 2. 本地候选 adapter

文件：[managedAuditLocalAdapterCandidateDryRun.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateDryRun.ts)

```ts
export class LocalJsonlManagedAuditAdapterCandidate implements ManagedAuditAdapter {
  readonly fileName = "managed-audit-local-adapter-candidate-v221.jsonl";
}
```

这个 adapter 的目标存储是：

```text
.tmp/managed-audit-v221-*/managed-audit-local-adapter-candidate-v221.jsonl
```

它不是生产审计库，不是 Java ledger，也不是 mini-kv storage backend。

## 3. append / query

文件：[managedAuditLocalAdapterCandidateDryRun.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateDryRun.ts)

```ts
async append(record: ManagedAuditAppendRecord): Promise<ManagedAuditAdapterAppendResult> {
  await mkdir(this.directory, { recursive: true });
  await appendFile(this.filePath(), `${JSON.stringify(record)}\n`, "utf8");
  return {
    status: "appended",
    accepted: true,
    written: true,
    message: "Local dry-run record was appended to a temporary JSONL candidate file.",
  };
}
```

这里的 `written=true` 只表示临时 JSONL 写入成功。profile 里仍然保持：

```text
readyForProductionAudit=false
productionAuditRecordAllowed=false
externalManagedAuditAccessed=false
```

## 4. digest / cleanup

文件：[managedAuditLocalAdapterCandidateDryRun.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateDryRun.ts)

```ts
const digestBeforeAppend = await adapter.digest();
const appendResult = await adapter.append(...);
const queryResult = await adapter.query(...);
const digestAfterAppend = await adapter.digest();
const digestAfterRepeatRead = await adapter.digest();
```

v221 检查三点：

```text
append 前后 digest 改变
重复读取 digest 稳定
dry-run 目录最终删除
```

目录删除在 `finally` 中执行：

```ts
await rm(directory, { recursive: true, force: true });
```

所以即使后续检查失败，也不会留下本地候选目录。

## 5. Java v80 guard

文件：[managedAuditLocalAdapterCandidateDryRun.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateDryRun.ts)

```ts
interface JavaV80ManagedAuditAdapterImplementationGuardReceipt {
  readyForNodeV221LocalAdapterCandidateDryRun: true;
  nodeV220SelectedAdapterDisabled: true;
  nodeV220AppendWritten: false;
  javaApprovalLedgerWritten: false;
  javaManagedAuditStoreWritten: false;
  javaSqlExecuted: false;
}
```

Java v80 的作用是防止 Node 看到 adapter candidate 后误以为 Java 可以写 ledger 或 SQL。v221 只消费这个 guard，不调用 Java。

## 6. mini-kv v89 guard

文件：[managedAuditLocalAdapterCandidateDryRun.ts](D:/nodeproj/orderops-node/src/services/managedAuditLocalAdapterCandidateDryRun.ts)

```ts
interface MiniKvV89AdapterShellNonStorageGuardReceipt {
  receiptDigest: "fnv1a64:76411286a0913dc8";
  adapterShellStorageBackend: false;
  storageBackendAllowed: false;
  managedAuditWriteExecuted: false;
  localDryRunRecordsWritten: false;
}
```

mini-kv v89 的作用是明确：mini-kv 不是 adapter shell storage backend，也不承接 Node 的 dry-run 记录。

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(
  app,
  "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run",
```

路由继续使用公共 JSON/Markdown 注册 helper，不扩大 auditRoutes 的重复结构。

## 8. 测试覆盖

文件：[managedAuditLocalAdapterCandidateDryRun.test.ts](D:/nodeproj/orderops-node/test/managedAuditLocalAdapterCandidateDryRun.test.ts)

```ts
expect(profile).toMatchObject({
  candidateState: "local-adapter-dry-run-verified",
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  verification: {
    appendWritten: true,
    queryByRequestIdCount: 1,
    dryRunDirectoryRemoved: true,
  },
});
```

测试还覆盖：

```text
LocalJsonlManagedAuditAdapterCandidate 直接 append/query/digest
UPSTREAM_ACTIONS_ENABLED=true 时 blocked 但仍清理临时目录
JSON / Markdown 路由可用
.tmp/managed-audit-v221-* 不残留
```

## 本版项目进度

v221 让 managed audit adapter 从 disabled shell 进入本地候选 dry-run，但仍停在生产外部连接之前。下一阶段必须新建 post-v221 计划，先做 v222 verification report，再让 Java v81 + mini-kv v90 推荐并行补真实 adapter 前 guard。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditLocalAdapterCandidateDryRun.test.ts + test/managedAuditAdapterDisabledShell.test.ts，9 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，163 files / 556 tests 已通过
npm run build：已通过
Chrome screenshot：已生成 c/221/图片/managed-audit-local-adapter-candidate-dry-run-v221.png
HTTP smoke：端口 4330 已通过，candidateState=local-adapter-dry-run-verified，queryByRequestIdCount=1，dryRunDirectoryRemoved=true，服务已停止
```
