# Node v210 managed audit identity approval binding contract 代码讲解

## 模块角色

v210 接在 v209 之后。v209 证明了 managed audit dry-run record 可以在 Node 本地临时目录完成 append/query/digest/cleanup；v210 则开始解决更接近生产的问题：

```text
这条 audit record 应该绑定哪个 operator？
对应哪个 approval request？
对应哪个 approval decision？
如何用 correlation id 和 digest 串起来？
缺字段时下一版应该如何阻断？
```

所以 v210 是一次 schema/contract 版本。它不创建真实 approval decision，不写 approval ledger，不连接真实 managed audit store。

## 1. 服务入口

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
export async function loadManagedAuditIdentityApprovalBindingContract(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
})
```

入口和 v209 类似，因为它要先消费 v209 的 dry-run verification。传入 `orderPlatform` 和 `miniKv` 仍然不是为了调用上游，而是为了复用 v209 的加载链路；测试里的 throwing fake 会保证没有 Java/mini-kv 调用。

## 2. 消费 v209 dry-run

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
const sourceDryRun = await loadManagedAuditPersistenceDryRunVerification({
  config: input.config,
  runtime: input.runtime,
  auditLog: input.auditLog,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
```

v210 先确认 v209 真的完成：

```ts
sourceDryRunVerified:
  sourceDryRun.readyForManagedAuditPersistenceDryRunVerification
  && sourceDryRun.verificationState === "dry-run-verified"
```

这避免 v210 在没有 dry-run 持久化证据时直接定义后续 packet。

## 3. 目标 record 版本

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
targetRecordVersion: "managed-audit-dry-run-record.v2-candidate",
sourceRecordVersion: sourceDryRun.dryRunRecord.recordVersion,
schemaOnly: true,
```

这里明确 v210 只是给 v211 准备 `v2-candidate` shape。v209 的 `managed-audit-dry-run-record.v1` 已经证明能写，v210 让下一版 record 多出 identity / approval / provenance 绑定。

## 4. operator identity 绑定

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
identity: {
  identityVersion: "operator-identity-contract.v1",
  operatorIdPath: "operatorIdentity.operatorId",
  authenticatedPath: "operatorIdentity.authenticated",
  rolesPath: "operatorIdentity.roles",
  authSourcePath: "operatorIdentity.authSource",
  verifiedTokenPath: "operatorIdentity.verifiedToken",
}
```

这些字段来自已有审计上下文：

文件：[auditLog.ts](D:/nodeproj/orderops-node/src/services/auditLog.ts)

```ts
export interface AuditOperatorIdentityContext {
  identityVersion: "operator-identity-contract.v1";
  authenticated: boolean;
  operatorId?: string;
  roles: string[];
  authSource: "none" | "headers";
  rawRoles: string[];
  rejectedRoles: string[];
  verifiedToken?: AuditVerifiedTokenContext;
}
```

v210 的价值是把已有身份上下文正式映射进 managed audit record 候选，而不是新造一套身份字段。

## 5. approval request 绑定

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
approvalRequest: {
  requestIdPath: "approvalRequest.requestId",
  intentIdPath: "approvalRequest.intentId",
  actionPath: "approvalRequest.action",
  targetPath: "approvalRequest.target",
  statusPath: "approvalRequest.status",
  previewDigestPath: "approvalRequest.previewDigest",
  preflightDigestPath: "approvalRequest.preflightDigest",
}
```

这对应已有 `OperationApprovalRequest`：

文件：[operationApprovalRequest.ts](D:/nodeproj/orderops-node/src/services/operationApprovalRequest.ts)

```ts
export interface OperationApprovalRequest {
  requestId: string;
  intentId: string;
  action: string;
  target: string;
  status: OperationApprovalRequestStatus;
  preflightDigest: OperationExecutionPreview["preflightDigest"];
  previewDigest: OperationApprovalDigest;
}
```

v210 只绑定字段，不创建新的 approval request。

## 6. approval decision 绑定

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
approvalDecision: {
  decisionIdPath: "approvalDecision.decisionId",
  decisionPath: "approvalDecision.decision",
  reviewerPath: "approvalDecision.reviewer",
  reasonPath: "approvalDecision.reason",
  decisionDigestPath: "approvalDecision.decisionDigest",
  upstreamTouchedPath: "approvalDecision.upstreamTouched",
  allowedValues: ["approved", "rejected"],
}
```

这对应已有 `OperationApprovalDecision`：

文件：[operationApprovalDecision.ts](D:/nodeproj/orderops-node/src/services/operationApprovalDecision.ts)

```ts
export interface OperationApprovalDecision {
  decisionId: string;
  requestId: string;
  decision: OperationApprovalDecisionValue;
  reviewer: string;
  reason: string;
  upstreamTouched: false;
  decisionDigest: OperationApprovalDecisionDigest;
}
```

特别重要的是 `upstreamTouched=false`。v210 仍然只是审批证据绑定，不执行 Java 或 mini-kv 上游动作。

## 7. 缺字段阻断规则

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
function createMissingFieldRules(): MissingFieldRule[] {
  return [
    { id: "missing-operator-identity", ... },
    { id: "missing-approval-request", ... },
    { id: "missing-approval-decision", ... },
    { id: "missing-correlation-id", ... },
    { id: "missing-digest-linkage", ... },
  ];
}
```

这些规则告诉 v211：如果 identity、approval、correlation 或 digest linkage 缺失，就不要生成 dry-run packet。

对应语义：

```text
v211Behavior=block-dry-run-packet
productionWindowAllowed=false
```

## 8. 安全边界检查

文件：[managedAuditIdentityApprovalBindingContract.ts](D:/nodeproj/orderops-node/src/services/managedAuditIdentityApprovalBindingContract.ts)

```ts
noRealApprovalDecisionCreated: !contract.realApprovalDecisionCreated
noRealLedgerWritten: !contract.realApprovalLedgerWritten
noExternalAuditAccessed: !contract.externalAuditSystemAccessed
javaMiniKvWriteBlocked: !contract.javaWriteAttempted && !contract.miniKvWriteAttempted
productionAuditStillBlocked: !contract.productionAuditRecordAllowed
```

这组检查保证 v210 只是 contract，不会变成真实审批或真实审计写入。

## 9. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
app.get<{ Querystring: AuditStoreProfileQuery }>(
  "/api/v1/audit/managed-identity-approval-binding-contract",
```

接口支持：

```text
/api/v1/audit/managed-identity-approval-binding-contract
/api/v1/audit/managed-identity-approval-binding-contract?format=markdown
```

## 本版结论

v210 把 managed audit 从“能写一条临时 dry-run record”推进到“知道这条 record 应该绑定哪些 identity / approval / correlation 字段”。项目离真实生产审计更近了一步，但仍然保持安全边界：

```text
不创建真实 approval decision
不写 approval ledger
不连接真实 managed audit
不写 Java / mini-kv
```

下一步应先推荐并行 Java v75 + mini-kv v84，给 v211 提供上游只读 handoff evidence。

## 验证记录

```text
npm run typecheck：通过
聚焦测试：2 files / 6 tests 通过
npm test：152 files / 518 tests 通过
npm run build：通过
Chrome screenshot：c/210/图片/managed-audit-identity-approval-binding-contract-v210.png 已生成
HTTP smoke：127.0.0.1:4315，contractState=ready-for-identity-approval-dry-run-packet
HTTP smoke：requiredBindingCount=5，missingFieldRuleCount=5，realApprovalDecisionCreated=false，realApprovalLedgerWritten=false
HTTP smoke：readyForProductionAudit=false，Markdown 200，包含 operatorIdentity.operatorId 和 START_NODE_V211_IDENTITY_APPROVAL_DRY_RUN_PACKET
```
