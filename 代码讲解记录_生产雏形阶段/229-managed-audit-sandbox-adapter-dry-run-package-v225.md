# Node v225 managed audit sandbox adapter dry-run package 代码讲解

## 模块角色

v225 是 sandbox adapter dry-run package，不是 sandbox adapter connection：

```text
Node v224：定义 sandbox dry-run plan
Java v82：提供 sandbox approval/schema guard receipt
mini-kv v91：提供 sandbox adapter non-participation receipt
mini-kv v94：当前 release fixture 继续保留 v91 起源 receipt，并补齐 v92-v94 质量拆分链
Node v225：把三边证据包成 package，但仍不连接外部审计
```

## 1. 服务入口

文件：[managedAuditSandboxAdapterDryRunPackage.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts)

```ts
export function loadManagedAuditSandboxAdapterDryRunPackage(input: {
  config: AppConfig;
}): ManagedAuditSandboxAdapterDryRunPackageProfile {
```

入口只接收 `AppConfig`，不接 Java client、mini-kv client 或 audit store。它读的是归档和 fixture，不启动上游服务。

## 2. 消费 Node v224

文件：[managedAuditSandboxAdapterDryRunPackage.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts)

```ts
const nodeV224 = loadManagedAuditSandboxAdapterDryRunPlan({ config: input.config });
```

v225 要求 v224 仍然满足：

```text
planState=sandbox-adapter-dry-run-plan-ready
readyForManagedAuditSandboxAdapterDryRunPlan=true
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
qualityGatesExported=true
```

## 3. Java v82 guard

文件：[managedAuditSandboxAdapterDryRunPackage.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts)

```ts
const JAVA_V82_RUNBOOK = "D:/javaproj/advanced-order-platform/c/82/解释/说明.md";
const JAVA_V82_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder.java";
```

v225 通过归档、讲解和 builder 源文件确认：

```text
readyForNodeV225SandboxAdapterDryRunPackage=true
ownerApprovalArtifactRequired=true
schemaMigrationSqlExecutedByJava=false
credentialValueReadByJava=false
builderOrHelperSplitApplied=true
longBooleanConstructorAvoided=true
opsEvidenceServiceOnlyWiresReceipt=true
```

这保证 Java v82 不只是补字段，也确实按计划做了结构优化。

## 4. mini-kv v91/v94 guard

文件：[managedAuditSandboxAdapterDryRunPackage.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts)

```ts
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
```

mini-kv 计划版本是 v91，但当前项目已经推进到 v94。v225 不回退读取旧产物，而是消费当前 v94 release fixture 中保留的 v91 起源 receipt：

```text
consumer_hint=Node v225 managed audit sandbox adapter dry-run package
consumed_release_version=v90
receipt_digest=fnv1a64:41e870043630f686
sandbox_adapter_storage_backend=false
credential_value_read_allowed=false
sandbox_managed_audit_state_write_allowed=false
```

同时 v225 记录：

```text
v91RuntimeEvidenceHelperUsed=true
v92ManagedAuditReceiptFormatterSplit=true
v93RuntimeEvidenceReceiptFormatterSplit=true
v94CommandFormatterSplit=true
```

这说明 mini-kv 后续版本没有破坏 v91 证据，反而把 formatter / command 组织继续拆清楚。

## 5. package digest

文件：[managedAuditSandboxAdapterDryRunPackage.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts)

```ts
packageDigest: sha256StableJson({
  profileVersion: "managed-audit-sandbox-adapter-dry-run-package.v1",
  nodeV224PlanDigest: nodeV224.sandboxPlan.planDigest,
  javaV82ReceiptVersion: javaV82.receiptVersion,
  miniKvSandboxReceiptDigest: miniKvGuard.receiptDigest,
  checks,
  requiredEvidence,
  packageSteps,
  forbiddenOperations,
}),
```

digest 把 Node v224、Java v82、mini-kv v91/v94 的证据压成 v225 自己的 package 指纹。它不是生产 audit record，也不包含 credential value。

## 6. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package", () => loadManagedAuditSandboxAdapterDryRunPackage({
  config: deps.config,
}), renderManagedAuditSandboxAdapterDryRunPackageMarkdown);
```

本版还把旧的 JSON/Markdown 路由样板迁移到 `registerAuditJsonMarkdownRoute`。源码里现在只剩共享 helper 自己包含 `app.get<{ Querystring: AuditStoreProfileQuery }>`。

## 7. 测试覆盖

文件：[managedAuditSandboxAdapterDryRunPackage.test.ts](D:/nodeproj/orderops-node/test/managedAuditSandboxAdapterDryRunPackage.test.ts)

```ts
expect(profile).toMatchObject({
  packageState: "sandbox-adapter-dry-run-package-ready",
  readyForManagedAuditSandboxAdapterConnection: false,
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  readsManagedAuditCredential: false,
});
```

测试覆盖：

```text
默认配置：v225 package ready，但 connection/production 仍 blocked
UPSTREAM_ACTIONS_ENABLED=true：package blocked
JSON / Markdown route：v225 接口可用
旧路由迁移：7 个历史 JSON/Markdown 路由仍返回 text/markdown
```

## 本版项目进度

v225 完成后，managed audit 主线进入：

```text
sandbox adapter dry-run plan
 -> sandbox approval/schema + runtime evidence guards
 -> sandbox adapter dry-run package
```

下一步如果继续推进，应另起新计划：先做 manual sandbox connection runbook，而不是直接从 v225 自动连接。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditExternalAdapterConnectionReadinessReview.test.ts + test/managedAuditSandboxAdapterDryRunPlan.test.ts + test/managedAuditSandboxAdapterDryRunPackage.test.ts，9 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，167 files / 568 tests 已通过
npm run build：已通过
Chrome screenshot：已生成 c/225/图片/managed-audit-sandbox-adapter-dry-run-package-v225.png
HTTP smoke：端口 4334 已通过，packageState=sandbox-adapter-dry-run-package-ready，readyForManagedAuditSandboxAdapterConnection=false，readyForProductionAudit=false，迁移后的 managed-store-contract Markdown 200，服务已停止
```
