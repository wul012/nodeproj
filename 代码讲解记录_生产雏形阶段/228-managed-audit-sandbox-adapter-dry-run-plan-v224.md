# Node v224 managed audit sandbox adapter dry-run plan 代码讲解

## 模块角色

v224 不是外部 adapter 连接实现，而是把 v223 的 connection readiness review 转成 sandbox-only dry-run 的执行前计划：

```text
Node v223：确认真实外部 managed audit 连接前仍需 owner / schema / credential review
Node v224：定义 sandbox dry-run 前必须准备哪些证据、禁止哪些动作、质量门槛如何验收
Java v82 + mini-kv v91：下一步推荐并行补只读 guard receipt
```

它的结论可以是 `sandbox-adapter-dry-run-plan-ready`，但仍保持 `readyForManagedAuditSandboxAdapterDryRunPackage=false` 和 `readyForProductionAudit=false`。

## 1. 服务入口

文件：[managedAuditSandboxAdapterDryRunPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPlan.ts)

```ts
export function loadManagedAuditSandboxAdapterDryRunPlan(input: {
  config: AppConfig;
}): ManagedAuditSandboxAdapterDryRunPlanProfile {
```

入口只接收 `AppConfig`。它不依赖 Java client、mini-kv client、audit store，也不启动上游服务。v224 的职责是生成计划 profile，不执行 adapter 连接。

## 2. 消费 Node v223

文件：[managedAuditSandboxAdapterDryRunPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPlan.ts)

```ts
const source = loadManagedAuditExternalAdapterConnectionReadinessReview({ config: input.config });
```

v224 复用 v223 的 review 结论，并要求：

```text
reviewState=ready-for-external-adapter-connection-review
readyForConnectionReadinessReview=true
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
```

也就是说，v224 可以在 v223 证据基础上继续往前规划，但不能越过 v223 的生产阻断边界。

## 3. sandbox plan

文件：[managedAuditSandboxAdapterDryRunPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPlan.ts)

```ts
const requiredEvidence = [
  "Node v223 external adapter connection readiness review digest.",
  "Owner approval artifact identifier for sandbox adapter rehearsal.",
  "Sandbox credential handle name without credential value disclosure.",
  "Schema migration rehearsal checklist without SQL execution.",
  "Failure rollback path and manual abort criteria.",
  "Java v82 approval/schema rehearsal guard receipt.",
  "mini-kv v91 non-participation receipt for sandbox adapter runtime evidence.",
];
```

这里把下一步能不能做 Node v225 的条件写清楚：必须先有 owner approval artifact、sandbox credential handle、schema rehearsal、rollback path，以及 Java v82 / mini-kv v91 的只读 guard receipt。

## 4. 禁止动作

文件：[managedAuditSandboxAdapterDryRunPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPlan.ts)

```ts
externalConnectionExecutionAllowed: false,
managedAuditWriteAllowed: false,
schemaMigrationExecutionAllowed: false,
miniKvStorageBackendAllowed: false,
javaApprovalLedgerWriteAllowed: false,
```

v224 明确只做计划，不允许：

```text
打开真实外部 managed audit 连接
读取 credential value
执行 schema migration SQL
写 Java approval ledger
把 mini-kv 作为 managed audit storage backend
```

这些字段会进入 JSON / Markdown 输出，也会被测试断言。

## 5. 显式质量门槛

文件：[managedAuditSandboxAdapterDryRunPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPlan.ts)

```ts
function createQualityGates(): SandboxAdapterQualityGates {
  return {
    gateSource: "docs/plans/v223-post-external-adapter-readiness-roadmap.md",
    gatesAreHardAcceptanceCriteria: true,
    nodeV224ProfileExportsQualityGates: true,
    nodeManagedAuditServiceFileLimit: "split-before-800-lines",
    nodeRouteRegistrationRequired: "registerAuditJsonMarkdownRoute",
```

这次把用户要求的质量优化写进 profile：不是“计划里顺嘴提一句”，而是成为接口字段和测试断言。这样 Java v82 / mini-kv v91 的拆分、helper 复用、避免膨胀，会在 Node v224 输出里直接可见。

## 6. checks

文件：[managedAuditSandboxAdapterDryRunPlan.ts](D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPlan.ts)

```ts
nodeV223ReviewReady: source.readyForManagedAuditExternalAdapterConnectionReadinessReview
  && source.reviewState === "ready-for-external-adapter-connection-review",
```

```ts
productionCredentialStillForbidden: !sandboxPlan.productionCredentialAllowed
  && !sandboxPlan.credentialValueRequired,
```

```ts
javaMiniKvQualityGatesRecorded: qualityGates.javaV82BuilderOrHelperRequired
  && qualityGates.javaV82OpsEvidenceServiceBloatForbidden
  && qualityGates.miniKvV91RuntimeEvidenceHelperRequired
  && qualityGates.miniKvV91CommandCppIfChainBloatForbidden,
```

v224 的 ready 条件不只是“有 plan”，还要求质量门槛、只读边界、生产阻断和上游 action 开关都保持正确。

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan", () => loadManagedAuditSandboxAdapterDryRunPlan({
  config: deps.config,
}), renderManagedAuditSandboxAdapterDryRunPlanMarkdown);
```

路由继续复用 `registerAuditJsonMarkdownRoute`，没有新增重复 querystring schema。这也满足 v224 的质量门槛。

## 8. 测试覆盖

文件：[managedAuditSandboxAdapterDryRunPlan.test.ts](D:/nodeproj/orderops-node/test/managedAuditSandboxAdapterDryRunPlan.test.ts)

```ts
expect(profile).toMatchObject({
  planState: "sandbox-adapter-dry-run-plan-ready",
  readyForProductionAudit: false,
  connectsManagedAudit: false,
  readsManagedAuditCredential: false,
});
```

测试覆盖：

```text
默认配置：v224 plan ready，仍不连接、不读 credential、不执行 migration
UPSTREAM_ACTIONS_ENABLED=true：plan blocked
JSON / Markdown route：接口可用，Markdown 包含 RUN_PARALLEL_SANDBOX_GUARDS 和 split-before-800-lines
```

## 本版项目进度

v224 完成后，managed audit 主线进入：

```text
external adapter connection readiness review
 -> sandbox adapter dry-run plan
 -> 推荐并行 Java v82 + mini-kv v91 guard receipt
 -> Node v225 sandbox dry-run package
```

下一步不应 Node 抢跑 v225。应先让 Java v82 和 mini-kv v91 推荐并行完成，只读补齐 sandbox 前 guard。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：test/managedAuditExternalAdapterConnectionReadinessReview.test.ts + test/managedAuditSandboxAdapterDryRunPlan.test.ts，6 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，166 files / 565 tests 已通过
npm run build：已通过
Chrome screenshot：已生成 c/224/图片/managed-audit-sandbox-adapter-dry-run-plan-v224.png
HTTP smoke：端口 4333 已通过，planState=sandbox-adapter-dry-run-plan-ready，readyForProductionAudit=false，qualityGates=true，服务已停止
```
