# 第一百三十版代码讲解：production connection dry-run change request

本版目标是把未来真实生产连接实现拆成可审查的 dry-run 变更单。

它仍然不连接数据库、不 fetch JWKS、不调用真实 IdP，也不允许执行真实上游动作。本版的核心是：

```text
把 managed audit adapter connection
把 IdP/JWKS verifier connection
把 rollback disablement
把 owner approval
整理成只读、不可执行、可归档的 change request
```

## 本版所处项目进度

v129 已经新增：

```text
src/services/productionConnectionImplementationPrecheck.ts
```

它回答的是：

```text
能不能开始做真实连接实现前的预检？
```

v130 回答的是：

```text
如果未来要做真实连接，实现任务应该如何拆、如何审查、如何归档？
```

所以 v130 不是执行版，而是 change request 版。

## 新增服务

新增文件：

```text
src/services/productionConnectionDryRunChangeRequest.ts
```

入口函数：

```ts
export async function loadProductionConnectionDryRunChangeRequest(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionConnectionDryRunChangeRequestProfile> {
  const precheck = await loadProductionConnectionImplementationPrecheck(input);
  const changeItems = createChangeItems();
```

它直接依赖 v129 precheck：

```text
v129 precheck ready
 -> v130 dry-run change request archive ready
```

但它不会把 `readyForProductionConnections` 变成 true。

## Change Request

本版核心对象：

```ts
changeRequest: {
  id: "production-connection-dry-run-change-request",
  version: "production-connection-change-request.v1",
  dryRun: true,
  executable: false,
  archiveReady: checks.archiveReady,
  implementationPrecheckVersion: precheck.profileVersion,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  changeRequestDigest,
},
```

这里有三个重点：

```text
dryRun=true
executable=false
archiveReady=true
```

也就是：可审查、可归档，但不能执行。

## Change Items

本版新增 4 个变更项：

```ts
id:
  | "managed-audit-adapter-connection"
  | "idp-jwks-connection"
  | "rollback-disablement"
  | "owner-approval";
```

managed audit adapter 项：

```ts
{
  id: "managed-audit-adapter-connection",
  action: "prepare-managed-audit-adapter-target",
  status: "review-required",
  dryRunOnly: true,
  executable: false,
  approvalRequired: true,
  rollbackRequired: true,
  risk: "high",
}
```

IdP/JWKS 项：

```ts
{
  id: "idp-jwks-connection",
  action: "prepare-idp-jwks-verifier-target",
  status: "review-required",
  dryRunOnly: true,
  executable: false,
  approvalRequired: true,
  rollbackRequired: true,
  risk: "high",
}
```

这让未来真实连接工作不会混成一个大改动。

## Archive Ready 判断

核心判断：

```ts
checks.archiveReady = checks.implementationPrecheckLoaded
  && checks.implementationPrecheckEvidenceReady
  && checks.auditAdapterConnectionItemPresent
  && checks.idpJwksConnectionItemPresent
  && checks.rollbackItemPresent
  && checks.ownerApprovalItemPresent
  && checks.dryRunOnly
  && checks.realConnectionAttempted === false
  && checks.upstreamActionsStillDisabled;
```

正常配置下：

```text
readyForDryRunArchive=true
```

但：

```text
readyForProductionConnections=false
executionAllowed=false
```

## Digest

本版给 dry-run change request 加了 SHA-256 摘要：

```ts
function digestChangeRequest(value: unknown): string {
  return createHash("sha256")
    .update(JSON.stringify(value))
    .digest("hex");
}
```

digest 覆盖：

```text
profileVersion
implementationPrecheckVersion
archiveReady
upstreamActionsEnabled
changeItems
```

HTTP smoke 中验证 digest 长度为 64。

## 生产阻塞项

正常配置下，本版 blocker 是：

```text
OWNER_APPROVALS_PENDING
DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE
```

对应代码：

```ts
addMessage(blockers, false, "OWNER_APPROVALS_PENDING", "dry-run-change-request", "Audit, IdP, and release owner approvals remain pending outside this read-only profile.");
addMessage(blockers, checks.changeRequestExecutable, "DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE", "dry-run-change-request", "This change request is intentionally non-executable and cannot perform real production connection work.");
```

这两个 blocker 不是 bug，而是安全边界：变更单可以归档，但不能执行真实连接。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/connection-dry-run-change-request
GET /api/v1/production/connection-dry-run-change-request?format=markdown
```

路由代码：

```ts
const profile = await loadProductionConnectionDryRunChangeRequest({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
});
```

Markdown 输出方便作为变更审查材料归档。

## 测试覆盖

新增测试：

```text
test/productionConnectionDryRunChangeRequest.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-connection-dry-run-change-request.v1",
  readyForDryRunArchive: true,
  readyForProductionConnections: false,
  changeRequest: {
    dryRun: true,
    executable: false,
    archiveReady: true,
  },
});
```

变更项断言：

```ts
expect(profile.changeItems.map((item) => [item.id, item.executable, item.dryRunOnly])).toEqual([
  ["managed-audit-adapter-connection", false, true],
  ["idp-jwks-connection", false, true],
  ["rollback-disablement", false, true],
  ["owner-approval", false, true],
]);
```

## README、运行调试和归档

README 新增：

```text
Production connection dry-run change request
GET /api/v1/production/connection-dry-run-change-request
```

本版运行：

```text
npm run typecheck
npx vitest run test/productionConnectionDryRunChangeRequest.test.ts
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

归档：

```text
b/130/图片/production-connection-dry-run-change-request.png
b/130/解释/运行调试说明.md
```

## 一句话总结

v130 把未来真实连接实现推进成“可审查、可归档、不可执行”的 dry-run 变更单，系统更接近生产流程，但仍守住不连接真实数据库和真实 IdP 的安全边界。
