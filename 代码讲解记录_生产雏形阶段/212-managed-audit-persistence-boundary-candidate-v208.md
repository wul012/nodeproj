# Node v208 managed audit persistence boundary candidate 代码讲解

## 模块角色

v208 接在 v207 后面。v207 选出 managed audit 是下一阶段第一优先级，v208 就把这个优先级具体化成一个候选边界。

这个版本不做真实持久化实现，而是回答：

```text
将来审计记录写到哪里？
哪些字段可以从 Java v74 进入 Node managed audit dry-run？
mini-kv v83 的 runtime artifact provenance 如何纳入审计证据？
v209 dry-run 应该验证什么？
```

## 1. 服务入口

文件：[managedAuditPersistenceBoundaryCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceBoundaryCandidate.ts)

```ts
export async function loadManagedAuditPersistenceBoundaryCandidate(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
})
```

入口比普通 profile 多了 `runtime` 和 `auditLog`，因为 v208 需要复用现有 managed audit contract、adapter boundary 和 readiness summary。

## 2. 消费 v207 分诊

文件：[managedAuditPersistenceBoundaryCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceBoundaryCandidate.ts)

```ts
const sourceTriage = await loadPostRealReadProductionHardeningTriage({
  config: input.config,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
```

v208 先读取 v207 的分诊结果，确认 managed audit 是第一优先级：

```ts
sourceTriageSelectedManagedAuditFirst:
  sourceTriage.selectedPriorities[0]?.id === "managed-audit-persistence"
```

这让 v208 和计划保持一致，防止突然跳去做 CI artifact 或 rollback。

## 3. 复用已有 managed audit 模块

文件：[managedAuditPersistenceBoundaryCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceBoundaryCandidate.ts)

```ts
const managedContract = createManagedAuditStoreContractProfile(input.config);
const managedBoundary = createManagedAuditAdapterBoundaryProfile({
  config: input.config,
  runtime: input.runtime,
});
const managedReadiness = createManagedAuditReadinessSummary({
  config: input.config,
  runtime: input.runtime,
  auditLog: input.auditLog,
});
```

这部分很重要：v208 没有重写 managed audit 的老逻辑，而是复用现有三个模块：

```text
managed-store-contract：append/query/digest/retention/backup marker
managed-adapter-boundary：adapter interface 和 runtime selection
managed-readiness-summary：当前仍不能生产化的 readiness 总结
```

因此 v208 是一次“候选边界组合”，不是重复实现。

## 4. Java v74 证据

文件：[managedAuditPersistenceBoundaryCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceBoundaryCandidate.ts)

```ts
function createJavaV74Evidence(): JavaAuditPersistenceHandoffEvidence {
  return {
    hintVersion: "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1",
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v8",
    managedAuditSinkMode: "file-or-sqlite-dry-run-candidate",
    javaLedgerWriteAllowed: false,
    javaManagedAuditWriteAllowed: false,
    javaExternalAuditSystemAccessed: false,
  };
}
```

Java v74 的作用不是让 Java 写审计，而是告诉 Node 哪些只读字段未来可以进入 dry-run audit record：

```text
requestContext.requestId
operatorWindowHint.operatorId
ciEvidenceHint.manifestDigest
liveReadinessHint.runtimeSmokeSessionId
verificationHint.warningDigest
executionBoundaries.nodeMayWriteApprovalLedger
```

同时 Java 明确保持 no-write。

## 5. mini-kv v83 证据

文件：[managedAuditPersistenceBoundaryCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceBoundaryCandidate.ts)

```ts
function createMiniKvV83Evidence(): MiniKvBinaryProvenanceEvidence {
  return {
    projectVersion: "0.83.0",
    provenanceDigest: "fnv1a64:c1c0896fc6b77fe2",
    artifactPathHint: "c/83/",
    productionBinaryClaimed: false,
  };
}
```

mini-kv v83 提供的是 binary provenance hint。它能让 v209 的 dry-run audit record 记住 C++ 侧运行证据的来源，但不会让 mini-kv 进入订单权威链路。

## 6. dry-run 候选存储

文件：[managedAuditPersistenceBoundaryCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceBoundaryCandidate.ts)

```ts
function createDryRunStoreCandidates(): DryRunStoreCandidate[] {
  return [
    { id: "file-jsonl", selectedForV209: true, ... },
    { id: "sqlite", selectedForV209: false, ... },
  ];
}
```

v208 选择 `file-jsonl` 作为 v209 首选，因为项目已有 file audit store 基础，适合做小闭环。

`sqlite` 只作为后续候选，不在 v208 引入依赖。

## 7. v209 验证要求

文件：[managedAuditPersistenceBoundaryCandidate.ts](D:/nodeproj/orderops-node/src/services/managedAuditPersistenceBoundaryCandidate.ts)

```ts
function createDryRunRequirements(): DryRunRequirement[] {
  return [
    "temp-directory-only",
    "append-query-digest",
    "cleanup-after-test",
    "no-java-mini-kv-write",
  ];
}
```

这四条直接约束下一版：

```text
只能写 Node 临时目录
必须 append/query/digest 一条 dry-run 记录
必须清理临时目录
不能写 Java 或 mini-kv
```

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-persistence-boundary-candidate",
```

v208 挂在 audit route 下，而不是 production status route 下，因为它已经进入审计域能力。

接口支持：

```text
/api/v1/audit/managed-persistence-boundary-candidate
/api/v1/audit/managed-persistence-boundary-candidate?format=markdown
```

## 9. 测试覆盖

文件：[managedAuditPersistenceBoundaryCandidate.test.ts](D:/nodeproj/orderops-node/test/managedAuditPersistenceBoundaryCandidate.test.ts)

测试覆盖三类：

```text
正常候选边界：ready-for-managed-audit-dry-run
危险开关：UPSTREAM_ACTIONS_ENABLED=true -> blocked
路由：JSON / Markdown 均可读取
```

测试中的 Java / mini-kv client 都是 throwing fake。如果 v208 意外触发上游调用，测试会失败。

## 本版结论

v208 把 managed audit 从“下一阶段优先方向”推进为“可执行 dry-run 的边界候选”。它仍然不是生产审计系统，但已经给 v209 留出了清晰的小闭环：

```text
在 Node 临时目录写一条 dry-run audit record
按 request id 查询
生成 digest
验证失败模式
清理临时目录
```

## 验证记录

```text
npm run typecheck：通过
聚焦测试：4 files / 12 tests 通过
npm test：150 files / 512 tests 通过
npm run build：通过
Chrome screenshot：c/208/图片/managed-audit-persistence-boundary-candidate-v208.png 已生成
HTTP smoke：127.0.0.1:4313，candidateState=ready-for-managed-audit-dry-run
HTTP smoke：sinkMode=file-or-sqlite-dry-run-candidate，v209RequirementCount=4，readyForProductionAudit=false
HTTP smoke：Markdown 200，包含 Java v74 handoff hint 和 RUN_NODE_V209_DRY_RUN_VERIFICATION
```
