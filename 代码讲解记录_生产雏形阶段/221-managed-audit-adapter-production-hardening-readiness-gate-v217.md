# Node v217 managed audit adapter production-hardening readiness gate 代码讲解

## 模块角色

v217 是 v215-v216 dry-run adapter 链条之后的生产硬化闸门：

```text
v215：Node 本地 JSONL dry-run adapter candidate
v216：验证 v215 archive 完整性
Java v78：真实 adapter 前置条件只读回执
mini-kv v87：非权威存储只读回执
v217：汇总这些证据，形成 production-hardening readiness gate
```

它的语义要分清：`ready-for-production-hardening-review` 不是 `readyForProductionAudit=true`。v217 只是说明“下一步可以评审真实 adapter 前的硬门槛”，而不是“真实审计写入已经可用”。

## 1. 服务入口

文件：[managedAuditAdapterProductionHardeningReadinessGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGate.ts)

```ts
export function loadManagedAuditAdapterProductionHardeningReadinessGate(input: {
  config: AppConfig;
}): ManagedAuditAdapterProductionHardeningReadinessGateProfile
```

入口只接收 `AppConfig`。这点很重要：它不接收 `OrderPlatformClient`，不接收 `MiniKvClient`，也不接收外部 managed audit client，所以 v217 不会启动或调用 Java / mini-kv，也不会连接真实审计存储。

## 2. 复用 v216 archive verification

文件：[managedAuditAdapterProductionHardeningReadinessGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGate.ts)

```ts
const sourceArchive = loadManagedAuditDryRunAdapterArchiveVerification({ config: input.config });
```

v217 不是重新复跑 v215 的本地 JSONL dry-run，而是消费 v216 已经固化的 archive verification。这样能避免在 readiness gate 里再次写 `.tmp`，也让证据链保持“先产生、再归档、再消费”的顺序。

## 3. Java v78 回执

文件：[managedAuditAdapterProductionHardeningReadinessGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGate.ts)

```ts
interface JavaV78ManagedAuditProductionAdapterPrerequisiteReceipt {
  sourceVersion: "Java v78";
  operatorIdentityPrerequisiteRecorded: true;
  approvalDecisionSourcePrerequisiteRecorded: true;
  ledgerHandoffPrerequisiteRecorded: true;
  retentionOwnerPrerequisiteRecorded: true;
  failureHandlingPrerequisiteRecorded: true;
  rollbackReviewPrerequisiteRecorded: true;
  nodeV217MayConnectManagedAudit: false;
  javaCreatesApprovalDecision: false;
  javaWritesManagedAuditStore: false;
  javaExecutesSql: false;
}
```

Java v78 在 Node 这里被当成“只读前置条件回执”。它说明 operator identity、approval decision source、ledger handoff、retention owner、failure handling、rollback review 都已经有证据，但仍然明确禁止真实 approval / ledger / SQL / deployment / rollback。

## 4. mini-kv v87 回执

文件：[managedAuditAdapterProductionHardeningReadinessGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGate.ts)

```ts
interface MiniKvV87ManagedAuditAdapterNonAuthoritativeStorageReceipt {
  sourceVersion: "mini-kv v87";
  receiptDigest: "fnv1a64:111f0daf1283eab6";
  managedAuditStore: false;
  storageWriteAllowed: false;
  adminCommandsAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
}
```

mini-kv v87 的价值不是“给 Node 一个存储后端”，而是反过来证明：mini-kv 不是 managed audit store，不允许 storage write，不开放 admin commands，不执行 restore，也不承担订单权威状态。

## 5. ready 计算

文件：[managedAuditAdapterProductionHardeningReadinessGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGate.ts)

```ts
checks.readyForManagedAuditAdapterProductionHardeningReadinessGate = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditAdapterProductionHardeningReadinessGate")
  .every(([, value]) => value);
```

ready 仍然由所有 check 合成，而不是手写常量。只要 v216 archive、Java v78 receipt、mini-kv v87 receipt、安全边界或 runtime config 任一项不满足，`gateState` 就会变成 `blocked`。

## 6. 生产硬门槛对象

文件：[managedAuditAdapterProductionHardeningReadinessGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditAdapterProductionHardeningReadinessGate.ts)

```ts
const productionHardeningGate = {
  managedAuditStoreConfigured: checks.managedAuditStoreUrlConfigured,
  managedAuditStoreConnected: false,
  identityApprovalLedgerBound: checks.operatorIdentityPrerequisiteRecorded
    && checks.approvalDecisionSourcePrerequisiteRecorded
    && checks.ledgerHandoffPrerequisiteRecorded,
  externalManagedAuditAccessed: false,
  javaWriteAttempted: false,
  miniKvWriteAttempted: false,
  productionAuditAllowed: false,
};
```

这里把“配置了未来 target”和“真实 adapter 已连接”分开表达。`managedAuditStoreConfigured=true` 只说明有 `AUDIT_STORE_URL` 这类安全配置；`managedAuditStoreConnected=false` 才是当前真实状态。

## 7. route 挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
```

接口支持 JSON 和 Markdown：

```text
/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate
/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate?format=markdown
```

这次没有顺手大改 `auditRoutes.ts` 的重复注册结构，因为 v217 的主任务是 readiness gate。公共 route registrar 已经写进下一份计划，放到 v218 做更合适。

## 8. 测试覆盖

文件：[managedAuditAdapterProductionHardeningReadinessGate.test.ts](D:/nodeproj/orderops-node/test/managedAuditAdapterProductionHardeningReadinessGate.test.ts)

```ts
expect(profile).toMatchObject({
  gateState: "ready-for-production-hardening-review",
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  upstreamReceipts: {
    javaV78: { sourceVersion: "Java v78" },
    miniKvV87: { sourceVersion: "mini-kv v87" },
  },
});
```

测试重点不是“ready 为 true”本身，而是 ready 的同时仍然保证生产写入全关：`readyForProductionAudit=false`、`connectsManagedAudit=false`、`executionAllowed=false`、`restoreExecutionAllowed=false`。

## 本版项目进度

v217 让 Node 从“本地 dry-run adapter candidate”推进到“真实 adapter 前硬门槛 gate”。这已经比 fixture 堆叠更接近生产流程，但仍处在安全闸门阶段。下一步应该先优化 Node 的 audit route / managedAudit helper 重复结构，再由 Java v79 + mini-kv v88 推荐并行补质量回执，最后 Node v219 做真实 adapter wiring 前的 implementation precheck。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditAdapterProductionHardeningReadinessGate.test.ts，4 tests 已通过
全量测试：159 files / 540 tests 已通过
npm run build：已通过
Chrome screenshot：c/217/图片/managed-audit-adapter-production-hardening-readiness-gate-v217.png 已生成
HTTP smoke：127.0.0.1:4326，gateState=ready-for-production-hardening-review
HTTP smoke：ready=true，readyForProductionAudit=false，readyForProductionWindow=false，connectsManagedAudit=false，executionAllowed=false，restoreExecutionAllowed=false，managedAuditStoreConnected=false，javaV78ReceiptAccepted=true，miniKvV87ReceiptAccepted=true，hardPrerequisites=8/8，productionBlockers=0，Markdown 200
```
