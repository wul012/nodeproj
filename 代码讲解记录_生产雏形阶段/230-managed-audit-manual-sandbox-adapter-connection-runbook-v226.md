# Node v226 managed audit manual sandbox adapter connection runbook 代码讲解

## 模块角色

v226 是 manual sandbox adapter connection runbook，不是 adapter connection：

```text
Node v225：sandbox adapter dry-run package
Node v226：把 v225 package 转成手工连接演练 runbook
Java v86 + mini-kv v95：下一步推荐并行，只补只读 guard
Node v227：等两边 guard 完成后再消费
```

## 1. 服务入口

文件：[managedAuditManualSandboxAdapterConnectionRunbook.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts)

```ts
export function loadManagedAuditManualSandboxAdapterConnectionRunbook(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxAdapterConnectionRunbookProfile {
```

入口只接收 `AppConfig`，不接 Java client、mini-kv client 或真实 audit adapter client。也就是说，本版没有能力启动上游或打开外部连接。

## 2. 消费 Node v225

文件：[managedAuditManualSandboxAdapterConnectionRunbook.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts)

```ts
const sourcePackage = loadManagedAuditSandboxAdapterDryRunPackage({ config: input.config });
```

v226 只消费 v225 的 package 结果，并把关键边界重新固化到 `sourceNodeV225`：

```ts
sourceNodeV225: {
  sourceVersion: "Node v225",
  profileVersion: sourcePackage.profileVersion,
  packageState: sourcePackage.packageState,
  packageDigest: sourcePackage.packagePlan.packageDigest,
  readyForDryRunPackage: sourcePackage.readyForManagedAuditSandboxAdapterDryRunPackage,
  readyForConnectionFromSource: sourcePackage.readyForManagedAuditSandboxAdapterConnection,
  connectsManagedAudit: sourcePackage.connectsManagedAudit,
  readsManagedAuditCredential: sourcePackage.readsManagedAuditCredential,
  schemaMigrationExecuted: sourcePackage.schemaMigrationExecuted,
}
```

关键点是 `readyForConnectionFromSource=false`，v225 package ready 不等于可以连接。

## 3. operator inputs

文件：[managedAuditManualSandboxAdapterConnectionRunbook.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts)

```ts
function createOperatorInputs(): ManualSandboxOperatorInput[] {
  return [
    input("ownerApprovalArtifactId", "Owner approval artifact id", ...),
    input("sandboxCredentialHandle", "Sandbox credential handle", ...),
    input("schemaRehearsalChecklistId", "Schema rehearsal checklist id", ...),
```

这里把人工窗口需要的输入列成机器可读结构，而不是散落在说明文字里。`sandboxCredentialHandle` 只允许记录：

```text
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
```

不允许出现 credential value。

## 4. checklist

文件：[managedAuditManualSandboxAdapterConnectionRunbook.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts)

```ts
function createChecklist(
  sourcePackage: ManagedAuditSandboxAdapterDryRunPackageProfile,
): ManualSandboxChecklistStep[] {
```

checklist 有 8 步：

```text
source-package
operator-inputs
credential-boundary
schema-rehearsal
rollback
failure-classification
upstream-guards
final-stop-gate
```

每一步都有 `owner`、`action`、`evidenceRequired` 和 `executionBoundary`。这让 v226 更像真实运维 runbook，而不是普通文档。

## 5. forbiddenOperations / pauseConditions

文件：[managedAuditManualSandboxAdapterConnectionRunbook.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts)

```ts
function createForbiddenOperations(): ManualSandboxForbiddenOperation[] {
```

禁止项覆盖：

```text
读 credential value
打开 external managed audit connection
执行 schema migration SQL
写 Java approval ledger
写 mini-kv managed audit state
自动启动外部服务
把 runbook 当成生产 audit approval
```

暂停条件也被结构化：

```ts
pause("CREDENTIAL_VALUE_REQUESTED", "credential-boundary", ...)
pause("UPSTREAM_ACTIONS_ENABLED", "runtime-config", ...)
pause("JAVA_V86_GUARD_MISSING", "upstream-guards", ...)
pause("MINIKV_V95_GUARD_MISSING", "upstream-guards", ...)
```

这正好服务下一步：Java v86 / mini-kv v95 未完成时，Node v227 必须停。

## 6. runbook digest

文件：[managedAuditManualSandboxAdapterConnectionRunbook.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts)

```ts
runbookDigest: sha256StableJson({
  profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1",
  sourcePackageDigest: sourcePackage.packagePlan.packageDigest,
  operatorInputs,
  checklist,
  forbiddenOperations,
  pauseConditions,
  failureTaxonomy,
}),
```

digest 把 v225 package 和 v226 runbook 材料绑定起来。它不包含 secret，不代表连接已执行。

## 7. checks

文件：[managedAuditManualSandboxAdapterConnectionRunbook.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts)

```ts
sourcePackageReady: sourcePackage.readyForManagedAuditSandboxAdapterDryRunPackage
  && sourcePackage.packageState === "sandbox-adapter-dry-run-package-ready",
sourcePackageStillConnectionBlocked: !sourcePackage.readyForManagedAuditSandboxAdapterConnection
  && !sourcePackage.connectsManagedAudit,
credentialValueStillForbidden: true,
schemaMigrationStillBlocked: true,
externalConnectionStillBlocked: true,
```

这组 checks 的方向很明确：v226 可以 ready，但 connection / production / write 全部必须 false。

## 8. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook", () => loadManagedAuditManualSandboxAdapterConnectionRunbook({
  config: deps.config,
}), renderManagedAuditManualSandboxAdapterConnectionRunbookMarkdown);
```

本版没有新增手写 JSON/Markdown 路由分支，继续使用共享 helper。

## 9. 测试覆盖

文件：[managedAuditManualSandboxAdapterConnectionRunbook.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts)

```ts
expect(profile).toMatchObject({
  runbookState: "manual-sandbox-connection-runbook-ready",
  readyForManagedAuditSandboxAdapterConnection: false,
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  readsManagedAuditCredential: false,
});
```

测试覆盖：

```text
默认配置：v226 runbook ready，但 connection/production 仍 blocked
UPSTREAM_ACTIONS_ENABLED=true：runbook blocked
JSON / Markdown route：v226 接口可用
route helper：源码中 v226 路由通过 registerAuditJsonMarkdownRoute 注册
```

## 本版项目进度

v226 完成后，managed audit 主线进入：

```text
sandbox dry-run plan
 -> sandbox dry-run package
 -> manual sandbox connection runbook
```

下一步按全局计划是：

```text
推荐并行 Java v86 + mini-kv v95
```

Node v227 必须等两边完成后再继续。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditSandboxAdapterDryRunPackage.test.ts + test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts，6 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，待最终收口填写
npm run build：待最终收口填写
Chrome screenshot：待最终收口填写
HTTP smoke：待最终收口填写
```
