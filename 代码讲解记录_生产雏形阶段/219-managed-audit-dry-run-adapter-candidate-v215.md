# Node v215 managed audit dry-run adapter candidate 代码讲解

## 模块角色

v215 是 managed audit 主线里第一版“有本地 adapter 行为”的版本：

```text
v213：restore drill plan
v214：archive verification
Java v77 + mini-kv v86：上游 no-write / no-restore 回执
v215：Node 本地 JSONL dry-run adapter candidate
```

它仍然不是生产 adapter。它只在 Node 自己的 `.tmp` 里写一条 JSONL 记录，验证 append / query / digest / cleanup，不连接外部审计系统。

## 1. 服务入口

文件：[managedAuditDryRunAdapterCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterCandidate.ts)

```ts
export async function loadManagedAuditDryRunAdapterCandidate(input: {
  config: AppConfig;
}): Promise<ManagedAuditDryRunAdapterCandidateProfile>
```

入口只接收 `AppConfig`。它不接收 Java / mini-kv client，所以 v215 不会直接调用上游服务。Java v77 和 mini-kv v86 在本版里作为只读回执结构被消费。

## 2. 消费 v214 archive verification

文件：[managedAuditDryRunAdapterCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterCandidate.ts)

```ts
const sourceArchive = loadManagedAuditRestoreDrillArchiveVerification({ config: input.config });
```

v215 先要求 v214 已经验证 v213 归档：

```ts
sourceArchiveVerificationReady:
  sourceArchive.readyForManagedAuditRestoreDrillArchiveVerification
  && sourceArchive.verificationState === "verified-restore-drill-archive"
```

这样 dry-run adapter candidate 的来源不是裸 plan，而是已经归档复核过的 v213 证据。

## 3. Java v77 receipt

文件：[managedAuditDryRunAdapterCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterCandidate.ts)

```ts
function createJavaV77Receipt(): JavaV77ManagedAuditAdapterBoundaryReceipt {
  return {
    sourceVersion: "Java v77",
    nodeV215MayConsume: true,
    nodeV215MayWriteLocalDryRunFiles: true,
    nodeV215MayConnectManagedAudit: false,
    nodeV215MayCreateApprovalDecision: false,
    nodeV215MayWriteApprovalLedger: false,
    nodeV215MayExecuteSql: false,
    nodeV215MayTriggerDeployment: false,
    nodeV215MayTriggerRollback: false,
    nodeV215MayExecuteRestore: false,
  };
}
```

这段表达 Java v77 的核心边界：Node v215 可以消费 receipt，也可以写 Node 本地 dry-run/test 文件，但不能让 Java 进入审批、ledger、SQL、部署、回滚或 restore 写路径。

## 4. mini-kv v86 receipt

文件：[managedAuditDryRunAdapterCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterCandidate.ts)

```ts
function createMiniKvV86Receipt(): MiniKvV86ManagedAuditAdapterRestoreBoundaryReceipt {
  return {
    sourceVersion: "mini-kv v86",
    consumedMarkerDigest: "fnv1a64:1ea4570c967cfdb1",
    receiptDigest: "fnv1a64:f39d8e3ef98654ea",
    adapterWriteAllowed: false,
    restoreExecutionAllowed: false,
    loadRestoreCompactExecuted: false,
    managedAuditWriteExecuted: false,
    orderAuthoritative: false,
  };
}
```

mini-kv v86 的职责是证明：即使 Node 开始做 adapter candidate，mini-kv 仍然不是 managed audit 存储，不执行恢复，不承担订单权威状态。

## 5. dry-run adapter record

文件：[managedAuditDryRunAdapterCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterCandidate.ts)

```ts
recordVersion: "managed-audit-dry-run-adapter-record.v1-candidate"
adapterMode: "local-jsonl-dry-run-only"
targetStore: "node-local-temp-file"
```

record 里分三层边界：

```text
writeEnvelope：只写本地临时 JSONL，不碰生产 store
approvalBoundary：不创建 approval decision / ledger / SQL / deployment / rollback
restoreBoundary：不执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE
```

## 6. 本地 JSONL dry-run

文件：[managedAuditDryRunAdapterCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterCandidate.ts)

```ts
const dryRunDirectory = await mkdtemp(path.join(root, "managed-audit-v215-"));
const dryRunFile = path.join(dryRunDirectory, "managed-audit-adapter-candidate.jsonl");
await appendFile(dryRunFile, `${JSON.stringify(record)}\n`, "utf8");
```

本版真的做了一次 Node 本地 dry-run 写入，而不是只写报告。随后读取同一文件，按 `requestId` 查询，并计算三组 digest：

```text
digestBeforeAppend
digestAfterAppend
digestAfterRepeatRead
```

最后：

```ts
await rm(dryRunDirectory, { recursive: true, force: true });
```

测试会确认 `.tmp/managed-audit-v215-*` 没有残留。

## 7. ready 计算

文件：[managedAuditDryRunAdapterCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditDryRunAdapterCandidate.ts)

```ts
checks.readyForManagedAuditDryRunAdapterCandidate = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditDryRunAdapterCandidate")
  .every(([, value]) => value);
```

v215 ready 必须同时满足：

```text
v214 archive verification ready
Java v77 receipt accepted
mini-kv v86 receipt accepted
本地 append/query/digest/cleanup 成功
UPSTREAM_ACTIONS_ENABLED=false
生产 audit / restore / Java 写入 / mini-kv 写入全部 blocked
```

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-audit-dry-run-adapter-candidate",
```

接口支持：

```text
/api/v1/audit/managed-audit-dry-run-adapter-candidate
/api/v1/audit/managed-audit-dry-run-adapter-candidate?format=markdown
```

JSON 给自动验证消费，Markdown 给归档和人工复查使用。

## 9. 测试重点

文件：[managedAuditDryRunAdapterCandidate.test.ts](D:/nodeproj/orderops-node/test/managedAuditDryRunAdapterCandidate.test.ts)

测试覆盖：

```text
正常本地 JSONL adapter dry-run 通过
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown 路由可访问
```

并且确认：

```text
dryRunDirectoryRemoved=true
appendRecordCount=1
queryByRequestIdCount=1
digestAfterAppend == digestAfterRepeatRead
connectsManagedAudit=false
restoreExecutionAllowed=false
```

## 本版项目进度

v215 把 managed audit 主线推进到了“本地 adapter candidate”阶段。和之前纯归档/计划版本相比，它多了一个真实的 Node 本地写入闭环，但仍然严格限制在 `.tmp` 内，并在本轮完成清理。

下一阶段应该先验证 v215 archive，再讨论真实 adapter 的生产级硬门槛，例如存储配置、身份绑定、恢复流程、失败处理和长期保留策略。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditDryRunAdapterCandidate.test.ts，3 tests 已通过
全量测试：157 files / 533 tests 已通过
npm run build：已通过
Chrome screenshot：c/215/图片/managed-audit-dry-run-adapter-candidate-v215.png 已生成
HTTP smoke：127.0.0.1:4321，candidateState=local-dry-run-adapter-verified
HTTP smoke：ready=true，readyForProductionAudit=false，connectsManagedAudit=false，restoreExecutionAllowed=false，appendRecordCount=1，queryByRequestIdCount=1，dryRunDirectoryRemoved=true，Markdown 200
```
