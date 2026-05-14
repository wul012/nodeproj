# 176-deployment-evidence-verification-v172

## 版本定位

Node v172 是 `deployment evidence verification`。它不再新增上游证据，而是复核 Node v171 已经生成的 `deployment evidence intake gate`。

本版验证四件事：

- v171 intake digest 是否有效。
- Java v60 deployment runbook 字段是否完整。
- mini-kv v69 release artifact digest package 字段是否完整。
- Node 仍然不允许 deployment / rollback / SQL / secret / database / restore 执行。

## 核心入口

实现位于 `src/services/deploymentEvidenceVerification.ts`：

```ts
export function loadDeploymentEvidenceVerification(config: AppConfig): DeploymentEvidenceVerificationProfile {
  const intakeGate = loadDeploymentEvidenceIntakeGate(config);
  const checks = createChecks(config, intakeGate);
  const verificationDigest = digestVerification({ ... });
  checks.verificationDigestValid = isReleaseReportDigest(verificationDigest);
  completeAggregateReadyCheck(checks, "readyForDeploymentEvidenceVerification");
}
```

这个函数先加载 v171，再对 v171 的输出做二次验证。它不是重新接入 Java / mini-kv，也不读取两个仓库文件。

## digest 验证

v172 会检查：

```ts
sourceIntakeDigestValid: isReleaseReportDigest(intakeGate.gate.intakeDigest),
sourceSummaryDigestValid: isReleaseReportDigest(intakeGate.gate.sourceSummaryDigest),
```

并生成自己的：

```ts
verificationDigest
```

这样 v171 是 intake 证据，v172 是 verification 证据，两个 digest 分层存在。

## Java v60 验证

v172 从 v171 的 `javaProductionDeploymentRunbookContract` 中复核：

```ts
javaDeploymentWindowFieldsVerified
javaMigrationFieldsVerified
javaSecretBoundaryVerified
javaNoExecutionBoundaryVerified
```

这些字段共同保证：

- deployment window owner 存在。
- rollback approver 存在。
- migration direction 不允许 SQL 执行。
- Node 不读 production secret。
- Node 不触发 Java deployment / rollback。

## mini-kv v69 验证

v172 从 v171 的 `miniKvReleaseArtifactDigestPackage` 中复核：

```ts
miniKvDigestFieldsVerified
miniKvRestoreDrillVerified
miniKvOperatorConfirmationVerified
miniKvNoExecutionBoundaryVerified
miniKvOrderAuthorityBoundaryVerified
```

这些字段共同保证 mini-kv v69 只是发布产物摘要包：

- 有 binary / WAL / Snapshot / fixture digest 字段。
- restore drill 只使用 `CHECKJSON`。
- operator confirmation 字段存在。
- 不执行 LOAD / COMPACT / SETNXEX。
- 不成为 Java order authority。

## 路由接入

`src/routes/statusRoutes.ts` 新增：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/deployment-evidence-verification",
  () => Promise.resolve(loadDeploymentEvidenceVerification(deps.config)),
  renderDeploymentEvidenceVerificationMarkdown,
);
```

对应：

- JSON：`/api/v1/production/deployment-evidence-verification`
- Markdown：`/api/v1/production/deployment-evidence-verification?format=markdown`

## 测试覆盖

新增 `test/deploymentEvidenceVerification.test.ts`，覆盖：

- 正常情况下 verification ready。
- `UPSTREAM_ACTIONS_ENABLED=true` 时 verification blocked。
- JSON / Markdown 路由可访问并包含 Java v60、mini-kv v69 和推荐下一步。

v172 的意义是把“证据入口”变成“可复核证据”，为下一步推荐并行 Java v61 + mini-kv v70 提供稳定 Node 侧前置。

## 项目进度说明

从三项目总线看，v172 属于生产雏形阶段的 Node 侧验证层：

- Java v60 已提供 deployment runbook contract。
- mini-kv v69 已提供 release artifact digest package。
- Node v171 已把两边证据汇入 intake gate。
- Node v172 在 v171 之上做 digest、字段完整性和 no-execution 边界复核。

因此本版不是继续堆 summary，而是把“能收证据”推进到“能复核证据”。完成后，下一步应回到上游项目补新证据：推荐并行 Java v61 + mini-kv v70，再由 Node v173 消费。

## 实际代码路径

核心文件：

```text
src/services/deploymentEvidenceVerification.ts
test/deploymentEvidenceVerification.test.ts
src/routes/statusRoutes.ts
```

文档和归档：

```text
README.md
docs/plans/v169-post-production-environment-preflight-roadmap.md
docs/plans/README.md
c/172/解释/deployment-evidence-verification-v172.md
c/172/图片/deployment-evidence-verification-v172.png
```

这些文件共同形成 v172 的闭环：代码提供 profile，路由暴露 JSON/Markdown，测试锁住行为，计划说明下一步，归档保存运行证据。

## 关键代码 1：复用 v171 作为输入

`loadDeploymentEvidenceVerification()` 的第一步是加载 v171：

```ts
const intakeGate = loadDeploymentEvidenceIntakeGate(config);
const checks = createChecks(config, intakeGate);
```

这说明 v172 不直接读 Java / mini-kv 仓库，也不重新定义两边证据。它消费的是 Node v171 已经固化过的 intake gate。这样做的好处是职责清楚：

- v171 负责 evidence intake。
- v172 负责 evidence verification。
- 后续 v173 再负责 release window readiness packet。

## 关键代码 2：verification digest 分层

v172 会基于 v171 输出生成自己的 digest：

```ts
const verificationDigest = digestVerification({
  profileVersion: "deployment-evidence-verification.v1",
  sourceIntakeDigest: intakeGate.gate.intakeDigest,
  sourceProfileVersion: intakeGate.profileVersion,
  javaVersion: intakeGate.gate.javaVersion,
  miniKvVersion: intakeGate.gate.miniKvVersion,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    verificationDigestValid: undefined,
    readyForDeploymentEvidenceVerification: undefined,
  },
});
```

这里特意把 `verificationDigestValid` 和 `readyForDeploymentEvidenceVerification` 排除在 digest 输入之外，避免“digest 校验自身”的循环依赖。随后再执行：

```ts
checks.verificationDigestValid = isReleaseReportDigest(verificationDigest);
completeAggregateReadyCheck(checks, "readyForDeploymentEvidenceVerification");
```

所以 v172 的最终 ready 状态来自所有基础 check 的聚合结果，而不是手写布尔值。

## 关键代码 3：Java v60 字段复核

`createChecks()` 中 Java 侧复核包括：

```ts
javaDeploymentWindowFieldsVerified
javaMigrationFieldsVerified
javaSecretBoundaryVerified
javaNoExecutionBoundaryVerified
```

这些 check 不是检查 Java 是否已经部署，而是检查 Java v60 的 contract 是否仍然表达了安全边界。例如：

```ts
javaRunbook.deploymentWindow?.nodeMayTriggerDeployment === false
javaRunbook.databaseMigration?.rollbackSqlExecutionAllowed === false
javaRunbook.secretSourceConfirmation?.nodeMayReadSecretValues === false
```

这三类字段分别挡住 Node 自动部署、Node 执行 rollback SQL、Node 读取生产 secret。

## 关键代码 4：mini-kv v69 字段复核

mini-kv 侧复核包括：

```ts
miniKvDigestFieldsVerified
miniKvRestoreDrillVerified
miniKvOperatorConfirmationVerified
miniKvNoExecutionBoundaryVerified
miniKvOrderAuthorityBoundaryVerified
```

重点是两个边界：

```ts
miniKvPackage.writeCommandsExecuted === false
miniKvPackage.restoreExecutionAllowed === false
```

以及：

```ts
miniKvPackage.orderAuthoritative === false
miniKvPackage.connectedToJavaTransactionChain === false
```

前者保证 mini-kv v69 没有真的执行写入、管理命令或 restore；后者保证 mini-kv 仍然不是 Java 订单权威存储。

## 关键代码 5：运行时动作开关

v172 继续检查运行时配置：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled
  && intakeGate.gate.upstreamActionsEnabled === false
  && intakeGate.checks.upstreamActionsStillDisabled === true
```

如果有人把 `UPSTREAM_ACTIONS_ENABLED=true` 打开，v172 会进入 blocked：

```ts
expect(profile.verificationState).toBe("blocked");
expect(profile.readyForDeploymentEvidenceVerification).toBe(false);
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
```

这条测试确保“verification ready”不可能在动作开关打开时误报。

## 路由和展示

`statusRoutes.ts` 注册：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/deployment-evidence-verification",
  () => Promise.resolve(loadDeploymentEvidenceVerification(deps.config)),
  renderDeploymentEvidenceVerificationMarkdown,
);
```

所以同一份 profile 同时支持 JSON 和 Markdown。JSON 给自动化验证，Markdown 给人工 review 和截图归档。

## 测试结论

`test/deploymentEvidenceVerification.test.ts` 覆盖三类行为：

- 正常配置下，22 个 check 全部通过。
- `UPSTREAM_ACTIONS_ENABLED=true` 时进入 blocked。
- JSON / Markdown route 都可以通过 access guard 访问，并包含 Java v60、mini-kv v69 和 `PROCEED_TO_PARALLEL_JAVA_V61_MINI_KV_V70`。

这让 v172 具备一个完整小闭环：有实现、有安全负例、有路由、有 Markdown、有归档证据。
