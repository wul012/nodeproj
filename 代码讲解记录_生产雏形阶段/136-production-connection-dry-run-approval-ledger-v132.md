# 第一百三十二版代码讲解：production connection dry-run approval ledger

本版目标是给 v130 的 dry-run change request 增加本地审批记录能力。

它不是生产执行审批，也不会打开真实连接。本版只允许：

```text
approve dry-run change request
reject dry-run change request
记录 reviewer / decision / reason / changeRequestDigest
生成 approvalDigest
```

## 本版所处项目进度

v130 已经有：

```text
production connection dry-run change request
```

v131 已经把它纳入：

```text
production readiness summary v11
```

v132 向生产级流程靠近一步：让 dry-run 变更单可以被本地 reviewer 做 approve/reject 记录，并能用 digest 归档。

## 新增服务

新增文件：

```text
src/services/productionConnectionDryRunApprovalLedger.ts
```

核心类：

```ts
export class ProductionConnectionDryRunApprovalLedger {
  private readonly records = new Map<string, ProductionConnectionDryRunApprovalRecord>();
  private nextSequence = 1;
```

这是 app 级内存 ledger。它的定位和项目里已有的 intent / approval / promotion ledger 一致：先把流程和证据做扎实，后续再考虑持久化。

## 创建审批记录

入口方法：

```ts
async create(input: CreateProductionConnectionDryRunApprovalInput, context: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionConnectionDryRunApprovalRecord> {
  const changeRequest = await loadProductionConnectionDryRunChangeRequest(context);
```

创建审批前，它会重新读取当前 dry-run change request。

然后校验调用方提交的 digest：

```ts
const expectedDigest = normalizeDigest(input.changeRequestDigest);
const currentDigest = changeRequest.changeRequest.changeRequestDigest;
if (expectedDigest !== currentDigest) {
  throw new AppHttpError(409, "DRY_RUN_CHANGE_REQUEST_DIGEST_MISMATCH", "Dry-run approval must reference the current change request digest", {
    expected: expectedDigest,
    current: currentDigest,
  });
}
```

这一步很关键：审批记录不能随便批准一个旧变更单或伪造变更单，必须绑定当前 dry-run change request digest。

## 审批记录字段

审批记录主体：

```ts
const recordWithoutDigest = {
  service: "orderops-node" as const,
  profileVersion: "production-connection-dry-run-approval.v1" as const,
  approvalId: randomUUID(),
  sequence: this.nextSequence,
  createdAt: new Date().toISOString(),
  reviewer: normalizeReviewer(input.reviewer),
  decision: input.decision,
  reason: normalizeReason(input.reason),
  changeRequestDigest: currentDigest,
  changeRequestVersion: changeRequest.changeRequest.version,
  dryRunOnly: true as const,
  executable: false as const,
  realConnectionAttempted: false as const,
```

这里明确保留三个安全字段：

```text
dryRunOnly=true
executable=false
realConnectionAttempted=false
```

即使 reviewer 选择 approve，它也只是批准 dry-run evidence，不会触发真实连接。

## Approval Digest

本版新增：

```ts
export function digestProductionConnectionDryRunApproval(
  record: Omit<ProductionConnectionDryRunApprovalRecord, "approvalDigest">,
): ProductionConnectionDryRunApprovalDigest {
  return {
    algorithm: "sha256",
    value: createHash("sha256")
      .update(stableJson({
        service: record.service,
        profileVersion: record.profileVersion,
        approvalId: record.approvalId,
```

digest 覆盖字段包括：

```text
approvalId
sequence
createdAt
reviewer
decision
reason
changeRequestDigest
dryRunOnly
executable
realConnectionAttempted
readyForApprovalArchive
```

这样 v133 可以复核审批记录有没有被改过。

## Ledger Snapshot

本版还提供 ledger profile：

```ts
snapshot(config: Pick<AppConfig, "upstreamActionsEnabled">, limit = 20): ProductionConnectionDryRunApprovalLedgerProfile {
  const approvals = this.list(limit);
  const latestApproval = approvals[0];
```

核心 checks：

```ts
const checks = {
  approvalRecordPresent: latestApproval !== undefined,
  latestApprovalDigestValid,
  latestChangeRequestDigestMatches: latestApproval !== undefined && latestApproval.changeRequestDigest.length === 64,
  latestDecisionAllowed: latestApproval !== undefined && productionConnectionDryRunApprovalDecisions.includes(latestApproval.decision),
  latestRealConnectionAttempted: false as const,
  upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  readyForApprovalArchive: latestApproval !== undefined
    && latestApproval.readyForApprovalArchive
    && latestApprovalDigestValid
    && config.upstreamActionsEnabled === false,
};
```

正常 smoke 里：

```text
readyForApprovalArchive=true
approvalRecordCount=1
productionBlockerCount=0
```

## HTTP 入口

新增路由：

```text
GET  /api/v1/production/connection-dry-run-approvals
GET  /api/v1/production/connection-dry-run-approvals?format=markdown
GET  /api/v1/production/connection-dry-run-approvals/latest
GET  /api/v1/production/connection-dry-run-approvals/latest?format=markdown
GET  /api/v1/production/connection-dry-run-approvals/:approvalId
POST /api/v1/production/connection-dry-run-approvals
```

POST 路由：

```ts
app.post<{ Body: CreateProductionConnectionApprovalBody }>("/api/v1/production/connection-dry-run-approvals", {
  schema: {
    body: {
      type: "object",
      required: ["decision", "reviewer", "changeRequestDigest"],
```

请求体必须带：

```text
decision=approve|reject
reviewer
reason
changeRequestDigest
```

## Access Policy

本版把新 POST 路由加入 approval policy：

```ts
pathPatterns: [
  "/api/v1/operation-approval-requests",
  "/api/v1/operation-approval-requests/:requestId/decision",
  "/api/v1/production/connection-dry-run-approvals",
],
minimumRole: "approver",
```

这样在 `ACCESS_GUARD_ENFORCEMENT_ENABLED=true` 的 smoke 中，approver header 可以通过 dry-run access guard。

## 测试覆盖

新增测试：

```text
test/productionConnectionDryRunApprovalLedger.test.ts
```

核心断言：

```ts
expect(approval).toMatchObject({
  profileVersion: "production-connection-dry-run-approval.v1",
  decision: "approve",
  dryRunOnly: true,
  executable: false,
  realConnectionAttempted: false,
  readyForApprovalArchive: true,
});
```

digest 校验失败断言：

```ts
await expect(ledger.create({
  decision: "reject",
  reviewer: "release-approver",
  changeRequestDigest: "0".repeat(64),
}, context)).rejects.toMatchObject({
  statusCode: 409,
  code: "DRY_RUN_CHANGE_REQUEST_DIGEST_MISMATCH",
});
```

这证明 stale digest 不能被审批。

## README、运行调试和归档

README 新增：

```text
Production connection dry-run approval ledger
POST /api/v1/production/connection-dry-run-approvals
```

本版运行：

```text
npm run typecheck
npx vitest run test/productionConnectionDryRunApprovalLedger.test.ts
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

归档：

```text
b/132/图片/production-connection-dry-run-approval-ledger.png
b/132/解释/运行调试说明.md
```

## 一句话总结

v132 把 dry-run change request 推进到“可本地审批、可 digest 归档”的阶段，但审批仍然只针对 dry-run evidence，真实数据库、真实 IdP、真实上游动作都没有被触发。
