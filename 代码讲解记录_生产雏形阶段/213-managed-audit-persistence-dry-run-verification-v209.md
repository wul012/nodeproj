# Node v209 managed audit persistence dry-run verification 代码讲解

## 模块角色

v209 接在 v208 后面。v208 只是定义 managed audit persistence 的候选边界；v209 开始验证这个边界是否真的能跑起来：

```text
在 Node 本地临时目录写一条 dry-run audit record
按 requestId 查询
生成稳定 digest
删除临时目录
确认不写 Java / mini-kv / 外部审计系统
```

这让项目从“审计存储方向设计”推进到“审计持久化 dry-run 小闭环已验证”。它仍然不是生产审计系统，但已经具备继续绑定 operator identity 和 approval record 的基础。

## 1. 服务入口

文件：[managedAuditPersistenceDryRunVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceDryRunVerification.ts)

```ts
export async function loadManagedAuditPersistenceDryRunVerification(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
})
```

入口沿用 v208 的依赖，因为 v209 必须先消费 v208 candidate。这里传入 `orderPlatform` 和 `miniKv` 不是为了调用上游，而是为了让 v208 的加载链路保持一致；测试会用 throwing fake 确认没有真实上游调用。

## 2. 消费 v208 candidate

文件：[managedAuditPersistenceDryRunVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceDryRunVerification.ts)

```ts
const sourceCandidate = await loadManagedAuditPersistenceBoundaryCandidate({
  config: input.config,
  runtime: input.runtime,
  auditLog: input.auditLog,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
```

v209 不是另起炉灶，而是直接消费 v208。核心检查是：

```ts
sourceCandidateReady:
  sourceCandidate.readyForManagedAuditPersistenceBoundaryCandidate
  && sourceCandidate.candidateState === "ready-for-managed-audit-dry-run"
```

如果 v208 candidate 不 ready，v209 会进入 `blocked`，不会假装 dry-run 已经可靠。

## 3. dry-run record 结构

文件：[managedAuditPersistenceDryRunVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceDryRunVerification.ts)

```ts
function createDryRunRecord(sourceCandidate: ManagedAuditPersistenceBoundaryCandidateProfile): DryRunAuditRecord {
  return {
    recordVersion: "managed-audit-dry-run-record.v1",
    requestId: "managed-audit-dry-run-v209-request",
    operatorId: "operator:v209-dry-run",
    eventType: "MANAGED_AUDIT_DRY_RUN_APPEND_QUERY_DIGEST",
```

这个 record 不是业务审计记录，而是用于验证 managed audit persistence 边界的样本记录。它明确记录来源版本：

```ts
source: {
  nodeSourceVersion: "Node v209",
  candidateSourceVersion: "Node v208",
  javaSourceVersion: "Java v74",
  miniKvSourceVersion: "mini-kv v83",
}
```

这保证后续排查时能知道：本条 dry-run record 是由 Node v209 消费 v208、Java v74、mini-kv v83 证据产生的。

## 4. 写入边界

文件：[managedAuditPersistenceDryRunVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceDryRunVerification.ts)

```ts
const root = path.resolve(process.cwd(), ".tmp");
await mkdir(root, { recursive: true });
const directory = await mkdtemp(path.join(root, "managed-audit-v209-"));
const filePath = path.join(directory, "audit-dry-run.jsonl");
```

v209 的文件写入只发生在 Node 项目根目录下的 `.tmp/managed-audit-v209-*`。这和 v208 的 `temp-directory-only` 要求对应。

它没有写 `data/`、没有迁移 audit 文件、没有创建 sqlite 文件，也没有连接外部 audit store。

## 5. append / query / digest

文件：[managedAuditPersistenceDryRunVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceDryRunVerification.ts)

```ts
const digestBeforeAppend = await digestFile(filePath);
await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
const digestAfterAppend = await digestFile(filePath);
const queried = await queryRecordsByRequestId(filePath, record.requestId);
const digestAfterRepeatRead = await digestFile(filePath);
```

这段就是 v209 的核心小闭环：

```text
空文件 digest
append 一条 JSONL
再次计算 digest
按 requestId 查询
重复读取后 digest 保持稳定
```

对应检查：

```ts
appendCovered:
  dryRun.appendRecordCount === 1
  && dryRun.digestBeforeAppend !== dryRun.digestAfterAppend

queryCovered:
  dryRun.queryByRequestIdCount === 1

digestCovered:
  dryRun.digestAfterAppend === dryRun.digestAfterRepeatRead
```

这比 v208 的候选设计更进一步，因为它确实执行了本地文件 append/query/digest。

## 6. cleanup-after-test

文件：[managedAuditPersistenceDryRunVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceDryRunVerification.ts)

```ts
try {
  ...
} finally {
  await rm(directory, { recursive: true, force: true });
}
```

无论 dry-run 成功还是失败，临时目录都会进入 `finally` 清理。

返回结果里还会记录：

```ts
directoryRemoved: !existsSync(directory)
```

对应检查：

```ts
cleanupCovered: dryRun.directoryRemoved
```

这让 HTTP route 也能证明“本次请求产生的临时目录已经删掉”，不是只靠最终人工清理。

## 7. 上游不写保护

文件：[managedAuditPersistenceDryRunVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceDryRunVerification.ts)

```ts
javaWriteAttempted: false,
miniKvWriteAttempted: false,
externalAuditSystemAccessed: false,
productionAuditRecordAllowed: false,
```

这些字段在 `verification` 里直接表达 v209 的边界：本地 dry-run 允许写临时文件，但不允许写 Java、mini-kv 或外部审计系统。

检查项也对应：

```ts
javaMiniKvWriteBlocked: !verification.javaWriteAttempted && !verification.miniKvWriteAttempted
externalAuditSystemNotAccessed: !verification.externalAuditSystemAccessed
productionAuditStillBlocked: !verification.productionAuditRecordAllowed
```

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-persistence-dry-run-verification",
```

接口继续放在 audit route 下，并支持 JSON / Markdown 两种输出：

```text
/api/v1/audit/managed-persistence-dry-run-verification
/api/v1/audit/managed-persistence-dry-run-verification?format=markdown
```

这和 v208 的 boundary candidate endpoint 形成连续证据链。

## 9. 测试覆盖

文件：[managedAuditPersistenceDryRunVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditPersistenceDryRunVerification.test.ts)

测试覆盖三类：

```text
正常 dry-run：写入、查询、digest、清理全部通过
危险开关：UPSTREAM_ACTIONS_ENABLED=true -> blocked
路由：JSON / Markdown 均可读取
```

测试中的 Java / mini-kv client 都是 throwing fake：

```ts
throw new Error("managed audit dry-run verification must not call Java");
```

如果 v209 意外触发 Java 或 mini-kv，测试会直接失败。

## 本版结论

v209 把 managed audit 从“候选边界”推进到了“本地 dry-run 持久化验证”。现在 Node 已经能证明：

```text
一条审计样本记录可以 append
可以按 requestId query
可以生成稳定 digest
可以清理本地临时目录
不会写 Java / mini-kv / 外部审计系统
```

下一步 v210 不应该再重复做文件写入，而应该把 operator identity、approval request、approval decision 和 correlation id 绑定到 audit record shape。

## 验证记录

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests 通过
npm test：151 files / 515 tests 通过
npm run build：通过
Chrome screenshot：c/209/图片/managed-audit-persistence-dry-run-verification-v209.png 已生成
HTTP smoke：127.0.0.1:4314，verificationState=dry-run-verified
HTTP smoke：appendRecordCount=1，queryByRequestIdCount=1，dryRunDirectoryRemoved=true，digestCovered=true
HTTP smoke：readyForProductionAudit=false，Markdown 200，包含 START_NODE_V210_IDENTITY_APPROVAL_BINDING
```
