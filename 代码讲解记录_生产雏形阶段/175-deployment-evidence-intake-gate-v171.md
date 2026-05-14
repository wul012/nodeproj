# 175-deployment-evidence-intake-gate-v171

## 版本定位

Node v171 是 `deployment evidence intake gate`。它在 Java v60 和 mini-kv v69 都完成后推进，负责把两边的只读部署证据汇入 Node 控制面。

本版不是生产执行器。它只生成 JSON/Markdown intake gate，不启动 Java，不启动 mini-kv，不执行部署、回滚、SQL、restore 或任何写命令。

## 关键代码

核心实现位于 `src/services/deploymentEvidenceIntakeGate.ts`。

入口函数是：

```ts
export function loadDeploymentEvidenceIntakeGate(config: AppConfig): DeploymentEvidenceIntakeGateProfile {
  const postV166Summary = loadPostV166ReadinessSummary(config);
  const intakeSteps = createIntakeSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, postV166Summary, intakeSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForDeploymentEvidenceIntakeGate");
}
```

这段逻辑说明 v171 有三个输入：

- Node v169 `post-v166 readiness summary`
- Java v60 `production deployment runbook contract`
- mini-kv v69 `release artifact digest package`

它不读取 Java / mini-kv 仓库文件，而是把已经完成的版本证据固化成 Node 可验证的只读引用。

## Java v60 引用

Java v60 证据被建模为 `JAVA_V60_DEPLOYMENT_RUNBOOK`：

```ts
contractVersion: "java-production-deployment-runbook-contract.v1",
contractEndpoint: "/contracts/production-deployment-runbook-contract.sample.json",
deploymentWindow: {
  owner: "release-window-owner",
  rollbackApprover: "rollback-approval-owner",
  operatorStartRequired: true,
  nodeMayScheduleWindow: false,
  nodeMayTriggerDeployment: false,
}
```

这里重点不是让 Node 触发部署，而是证明 Java 已经提供部署窗口 owner、rollback approver、迁移方向和 secret source confirmation 的只读 contract。

`createChecks()` 里会验证：

```ts
javaDeploymentWindowComplete
javaMigrationDirectionClosed
javaSecretSourceConfirmationClosed
javaNodeConsumptionReadOnly
javaProductionBoundaryClosed
```

这些 check 共同保证 Java v60 仍然不允许 Node 部署、回滚、执行 SQL、读取 secret 或连接生产库。

## mini-kv v69 引用

mini-kv v69 证据被建模为 `MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE`：

```ts
packageVersion: "mini-kv-release-artifact-digest-package.v1",
artifactDigestIds: [
  "binary-digest",
  "wal-checksum-evidence",
  "snapshot-digest-evidence",
  "fixture-digest",
],
restoreDrillCommands: [
  "CHECKJSON LOAD data/release-artifact-drill.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX release:token 30 value",
]
```

这里的 `CHECKJSON` 是解释和风险检查，不是实际执行。对应 check 是：

```ts
miniKvRestoreDrillProfileReadOnly
miniKvExecutionBoundariesClosed
miniKvOrderAuthorityClosed
```

这保证 mini-kv v69 仍然只是发布产物摘要包，不会变成 Java 订单权威存储，也不会执行 restore。

## 路由接入

`src/routes/statusRoutes.ts` 新增：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/deployment-evidence-intake-gate",
  () => Promise.resolve(loadDeploymentEvidenceIntakeGate(deps.config)),
  renderDeploymentEvidenceIntakeGateMarkdown,
);
```

因此同一个 endpoint 支持：

- JSON：`/api/v1/production/deployment-evidence-intake-gate`
- Markdown：`/api/v1/production/deployment-evidence-intake-gate?format=markdown`

## 测试覆盖

新增 `test/deploymentEvidenceIntakeGate.test.ts`，覆盖三类行为：

- 正常情况下 gate 为 `ready-for-manual-deployment-evidence-review`。
- `UPSTREAM_ACTIONS_ENABLED=true` 时 gate 会 blocked。
- JSON 和 Markdown 路由都能通过 access guard 访问，并包含 Java v60 / mini-kv v69 证据。

本版的价值是把 Java v60 与 mini-kv v69 的并行成果真正接入 Node 控制面，同时仍然严格维持只读、dry-run、人工 review 边界。
