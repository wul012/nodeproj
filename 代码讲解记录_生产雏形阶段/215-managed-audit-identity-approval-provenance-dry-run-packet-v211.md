# Node v211 managed audit identity approval provenance dry-run packet 代码讲解

## 模块角色

v211 是 v209-v211 这一小段 managed audit 主线的收口：

```text
v209：验证一条本地 dry-run audit record 可以 append/query/digest/cleanup
v210：定义 identity / approval / correlation 字段绑定 contract
v211：把 v210 contract、Java v75 handoff、mini-kv v84 provenance 合成一条 dry-run packet
```

它仍然不是生产审计系统。它只在 Node 本地 `.tmp` 临时目录写一条 JSONL packet，随后查询、digest、清理。

## 1. 服务入口

文件：[managedAuditIdentityApprovalProvenanceDryRunPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts)

```ts
export async function loadManagedAuditIdentityApprovalProvenanceDryRunPacket(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
})
```

入口仍然传入 Java / mini-kv client，但测试用 throwing fake 保护：v211 不会真正调用 Java 或 mini-kv，也不会启动两边项目。

## 2. 消费 v210 binding contract

文件：[managedAuditIdentityApprovalProvenanceDryRunPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts)

```ts
const sourceBinding = await loadManagedAuditIdentityApprovalBindingContract({
  config: input.config,
  runtime: input.runtime,
  auditLog: input.auditLog,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
```

v211 先确认 v210 contract ready：

```ts
sourceBindingContractReady:
  sourceBinding.readyForManagedAuditIdentityApprovalBindingContract
  && sourceBinding.contractState === "ready-for-identity-approval-dry-run-packet"
```

如果 v210 不 ready，v211 不会继续宣称 packet 已验证。

## 3. Java v75 证据

文件：[managedAuditIdentityApprovalProvenanceDryRunPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts)

```ts
function createJavaV75Evidence(...): JavaApprovalRecordHandoffEvidence {
  return {
    hintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1",
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v9",
    approvalBindingContractVersion: sourceBinding.profileVersion,
    approvalRecordHandoffContextComplete: true,
    javaApprovalDecisionCreated: false,
    javaApprovalLedgerWritten: false,
    javaApprovalRecordPersisted: false,
  };
}
```

Java v75 给的是 approval record handoff hint，不是生产审批记录。v211 只把这些字段作为 dry-run packet 的 provenance 输入。

## 4. mini-kv v84 证据

文件：[managedAuditIdentityApprovalProvenanceDryRunPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts)

```ts
function createMiniKvV84Evidence(): MiniKvRetentionProvenanceEvidence {
  return {
    projectVersion: "0.84.0",
    expectedBinaryProvenanceDigest: "fnv1a64:c682f9c827129e40",
    retentionProvenanceCheckDigest: "fnv1a64:357cc7e9eec3f223",
    managedAuditWriteExecuted: false,
  };
}
```

mini-kv v84 的作用是说明运行时证据留存路径和二进制 provenance 已对齐。它不是审计存储，也不会写 managed audit。

## 5. dry-run packet 结构

文件：[managedAuditIdentityApprovalProvenanceDryRunPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts)

```ts
const packetWithoutDigest = {
  packetVersion: sourceBinding.contract.targetRecordVersion,
  requestId: "managed-audit-v211-identity-approval-provenance-request",
  source: {
    nodeSourceVersion: "Node v211",
    bindingContractVersion: "Node v210",
    javaSourceVersion: "Java v75",
    miniKvSourceVersion: "mini-kv v84",
  },
```

这个 packet 把四类信息合在一起：

```text
identity
approvalRequest
approvalDecision
correlation
provenance
boundaries
```

其中 approval decision 是 dry-run 形状：

```ts
approvalDecision: {
  decisionId: "approval-decision-v211-dry-run",
  decision: "approved",
  upstreamTouched: false,
}
```

这不会创建真实 approval decision。

## 6. 本地 JSONL 写入

文件：[managedAuditIdentityApprovalProvenanceDryRunPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts)

```ts
const root = path.resolve(process.cwd(), ".tmp");
await mkdir(root, { recursive: true });
const directory = await mkdtemp(path.join(root, "managed-audit-v211-"));
const filePath = path.join(directory, "managed-audit-packet.jsonl");
```

写入只发生在 `.tmp/managed-audit-v211-*`，文件名是：

```text
managed-audit-packet.jsonl
```

这和 v209 的临时写入模式一致，但 v211 写的是带 identity / approval / provenance 的 v2 candidate packet。

## 7. append/query/digest/cleanup

文件：[managedAuditIdentityApprovalProvenanceDryRunPacket.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.ts)

```ts
await appendFile(filePath, `${JSON.stringify(packet)}\n`, "utf8");
const queried = await queryPacketsByRequestId(filePath, packet.requestId);
const digestAfterRepeatRead = await digestFile(filePath);
```

对应检查：

```ts
appendCovered: packetRun.appendPacketCount === 1
queryCovered: packetRun.queryByRequestIdCount === 1
digestCovered: packetRun.digestAfterAppend === packetRun.digestAfterRepeatRead
cleanupCovered: packetRun.directoryRemoved
```

临时目录在 `finally` 中删除，HTTP route 响应也会携带 `dryRunDirectoryRemoved=true`。

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet",
```

接口支持：

```text
/api/v1/audit/managed-identity-approval-provenance-dry-run-packet
/api/v1/audit/managed-identity-approval-provenance-dry-run-packet?format=markdown
```

## 本版结论

v211 让 managed audit 主线从“字段设计”进入“完整本地 packet 证据”。现在 Node 已经能把身份、审批、Java handoff 和 mini-kv provenance 汇成一条可写、可查、可 digest、可清理的 dry-run packet。

但它仍然保持：

```text
不创建真实 approval decision
不写 approval ledger
不连接真实 managed audit
不写 Java / mini-kv
不打开生产窗口
```

## 验证记录

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests 通过
npm test：153 files / 521 tests 通过
npm run build：通过
Chrome screenshot：c/211/图片/managed-audit-identity-approval-provenance-dry-run-packet-v211.png 已生成
HTTP smoke：127.0.0.1:4316，packetState=dry-run-packet-verified
HTTP smoke：appendPacketCount=1，queryByRequestIdCount=1，dryRunDirectoryRemoved=true
HTTP smoke：readyForProductionAudit=false，miniKvRetentionProvenanceCheckDigest=fnv1a64:357cc7e9eec3f223，Markdown 200
```
