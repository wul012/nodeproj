# 第一百三十三版代码讲解：production connection archive verification

本版目标是把生产连接 dry-run 审查材料打包成可复核的 archive verification。

它验证三类证据：

```text
v129 implementation precheck
v130 dry-run change request
v132 dry-run approval ledger
```

同时继续证明：

```text
没有连接数据库
没有 fetch JWKS
没有调用外部 IdP
没有真实 connection attempt
change request 仍不可执行
```

## 本版所处项目进度

v132 已经让 dry-run change request 可以被本地 reviewer approve/reject。

v133 继续往生产级靠近：不只保存 approval，还要验证 approval digest 和 change request digest 是否匹配，避免归档一个“审批和变更单对不上”的证据包。

## 新增服务

新增文件：

```text
src/services/productionConnectionArchiveVerification.ts
```

入口函数：

```ts
export async function loadProductionConnectionArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
}): Promise<ProductionConnectionArchiveVerificationProfile> {
  const precheck = await loadProductionConnectionImplementationPrecheck(input);
  const changeRequest = await loadProductionConnectionDryRunChangeRequest(input);
  const latestApproval = input.productionConnectionDryRunApprovals.latest();
```

它读取三份证据：

```text
precheck
changeRequest
latestApproval
```

其中 latestApproval 来自 v132 的 app 级内存 ledger。

## 核心 checks

本版最关键的 checks：

```ts
const checks = {
  precheckVersionValid: precheck.profileVersion === "production-connection-implementation-precheck.v1",
  changeRequestDigestValid: /^[a-f0-9]{64}$/.test(changeRequest.changeRequest.changeRequestDigest),
  approvalRecordPresent: latestApproval !== undefined,
  approvalDigestValid,
  approvalDigestMatchesChangeRequest: latestApproval !== undefined
    && latestApproval.changeRequestDigest === changeRequest.changeRequest.changeRequestDigest,
```

这里分别验证：

```text
precheck 是 v129 的正确版本
change request digest 是 64 位 sha256
approval 记录存在
approval digest 可复算
approval 绑定的 changeRequestDigest 等于当前 change request digest
```

## No Real Connection

本版继续明确真实连接没有发生：

```ts
noRealConnectionAttempted: precheck.checks.realConnectionAttemptAllowed === false
  && changeRequest.checks.realConnectionAttempted === false
  && (latestApproval?.realConnectionAttempted ?? false) === false,
```

同时验证：

```ts
dryRunOnly: changeRequest.changeRequest.dryRun === true
  && (latestApproval?.dryRunOnly ?? false) === true,
changeRequestNonExecutable: changeRequest.changeRequest.executable === false
  && (latestApproval?.executable ?? true) === false,
```

所以即使 archive verification 通过，也只是证明 dry-run 证据链完整，不代表真实生产连接已完成。

## Archive Digest

本版新增 archive digest：

```ts
const archiveDigest = digestArchive({
  profileVersion: "production-connection-archive-verification.v1",
  precheckVersion: precheck.profileVersion,
  changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
  approvalDigest: latestApproval?.approvalDigest.value ?? "missing",
  approvalDecision: latestApproval?.decision ?? "missing",
  checks,
});
```

它把 verification 结果固化成一个 64 位摘要，便于 v134 summary 汇总和后续归档。

## 缺 approval 时如何表现

如果没有 v132 approval，verification 会 blocked。

测试覆盖：

```ts
expect(verification.readyForArchiveVerification).toBe(false);
expect(verification.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
  "APPROVAL_RECORD_MISSING",
  "APPROVAL_DIGEST_INVALID",
  "APPROVAL_CHANGE_REQUEST_DIGEST_MISMATCH",
]));
```

这说明 v133 不会假装“没有审批也能归档通过”。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/connection-archive-verification
GET /api/v1/production/connection-archive-verification?format=markdown
```

路由代码：

```ts
const profile = await loadProductionConnectionArchiveVerification({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
});
```

这里复用了 app 里注入的 `productionConnectionDryRunApprovals`，所以同一个 Node 进程里先 POST approval，再 GET verification 能得到 ready 状态。

## 测试覆盖

新增测试：

```text
test/productionConnectionArchiveVerification.test.ts
```

核心断言：

```ts
expect(verification).toMatchObject({
  profileVersion: "production-connection-archive-verification.v1",
  readyForArchiveVerification: true,
  readyForProductionConnections: false,
  checks: {
    approvalDigestValid: true,
    approvalDigestMatchesChangeRequest: true,
    noRealConnectionAttempted: true,
    dryRunOnly: true,
    changeRequestNonExecutable: true,
  },
});
```

route 测试先创建 approval，再读取 verification JSON 和 Markdown。

## README、运行调试和归档

README 新增：

```text
Production connection archive verification
GET /api/v1/production/connection-archive-verification
```

本版运行：

```text
npm run typecheck
npx vitest run test/productionConnectionArchiveVerification.test.ts
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

归档：

```text
b/133/图片/production-connection-archive-verification.png
b/133/解释/运行调试说明.md
```

## 一句话总结

v133 把生产连接 dry-run 审批材料推进到“可复核归档”阶段：precheck、change request、approval digest 能被一起验证，但所有证据仍保持 dry-run、non-executable、no real connection。
