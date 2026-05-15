# 189-real-read-rehearsal-intake-v185

## 版本定位

Node v185 是 `real-read rehearsal intake`。

它接在这条链路后面：

```text
Node v183：opsPromotionArchiveBundle stable digest 拆分
Node v184：opsPromotionArchiveBundle boundary tests
Java v66：release approval rehearsal 只读 endpoint
mini-kv v75：restore boundary smoke manifest
    ->
Node v185：real-read rehearsal intake
```

这版的重点不是继续堆 fixture，而是把 Java v66 和 mini-kv v75 的“更接近真实运行”的只读证据合成 Node 侧 intake。

## 核心入口

实现文件：

```text
src/services/realReadRehearsalIntake.ts
```

入口函数：

```ts
export function loadRealReadRehearsalIntake(config: AppConfig): RealReadRehearsalIntakeProfile
```

它返回：

```ts
profileVersion: "real-read-rehearsal-intake.v1"
intakeState: "ready-for-real-read-rehearsal-review"
readOnly: true
rehearsalOnly: true
executionAllowed: false
```

这几个字段说明 v185 是 intake，不是执行器。

## Java v66 输入

Java v66 被固化为：

```ts
const JAVA_V66_RELEASE_APPROVAL_REHEARSAL = {
  plannedVersion: "Java v66",
  rehearsalVersion: "java-release-approval-rehearsal.v1",
  endpoint: "/api/v1/ops/release-approval-rehearsal",
  rehearsalMode: "READ_ONLY_RELEASE_APPROVAL_REHEARSAL",
  readOnly: true,
  executionAllowed: false,
}
```

Java v66 的价值在于它不是普通 fixture，而是真实功能型只读 endpoint。Node v185 学习这个节奏：只读消费、归一化、生成 intake，但仍不触发审批或 ledger 写入。

Java 边界也被显式编码：

```ts
nodeMayCreateApprovalDecision: false,
nodeMayWriteApprovalLedger: false,
nodeMayTriggerDeployment: false,
nodeMayTriggerRollback: false,
nodeMayExecuteRollbackSql: false,
requiresProductionDatabase: false,
requiresProductionSecrets: false,
```

这些字段保证 Node 不能把 rehearsal endpoint 误用成生产执行入口。

## mini-kv v75 输入

mini-kv v75 被固化为：

```ts
const MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST = {
  plannedVersion: "mini-kv v75",
  smokeManifestVersion: "mini-kv-restore-boundary-smoke-manifest.v1",
  projectVersion: "0.75.0",
  releaseVersion: "v75",
  path: "fixtures/release/restore-boundary-smoke-manifest.json",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  javaTransactionChainConnected: false,
}
```

真实 smoke 命令只作为证据解释：

```ts
commandCount: 8,
includesInfoJson: true,
includesStorageJson: true,
includesHealth: true,
includesGetTokenNoWriteProof: true,
writeCommandsExecuted: false,
adminCommandsExecuted: false,
runtimeWriteObserved: false,
realReadRehearsalInput: true,
```

这里尤其重要的是 `GET restore:real-read-token` 的 no-write proof：它证明 `SETNXEX` 没有真实执行。

## Intake Checks

核心检查由 `createChecks()` 生成。

Java 检查：

```ts
javaV66ReleaseApprovalRehearsalReady
javaRehearsalEndpointKnown
javaRehearsalReadOnly
javaExecutionBlocked
javaLiveSignalsPresent
javaRealReplayStillBlocked
javaNodeConsumptionSafe
javaProductionBoundariesClosed
```

mini-kv 检查：

```ts
miniKvV75RestoreBoundarySmokeManifestReady
miniKvSmokeManifestVersionReady
miniKvReadOnly
miniKvExecutionBlocked
miniKvNotOrderAuthoritative
miniKvSmokeCommandsReadOnly
miniKvNodeConsumptionReady
```

Node 自身检查：

```ts
upstreamActionsStillDisabled
noAutomaticUpstreamStart
noApprovalDecisionCreated
noApprovalLedgerWrite
noReleaseExecution
noDeploymentExecution
noRollbackExecution
noRollbackSqlExecution
noRestoreExecution
noProductionSecretRead
noProductionDatabaseConnection
```

最后用：

```ts
completeAggregateReadyCheck(checks, "readyForRealReadRehearsalReview");
```

只有全部检查通过，`readyForRealReadRehearsalReview` 才会变成 true。

## Digest

v185 生成 intake digest：

```ts
const intakeDigestPayload = {
  profileVersion: "real-read-rehearsal-intake.v1",
  javaRehearsalVersion: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.rehearsalVersion,
  javaEndpoint: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.endpoint,
  miniKvSmokeManifestVersion: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeManifestVersion,
  miniKvSmokeManifestId: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeTarget.smokeManifestId,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  upstreamProbesEnabled: config.upstreamProbesEnabled,
  checks,
};
```

digest 覆盖来源版本、入口、运行开关和检查结果，避免 intake 只是临时页面拼接。

## 禁止操作

`createForbiddenOperations()` 明确封住危险动作：

```ts
forbid("Start Java from Node v185", ...)
forbid("Start mini-kv from Node v185", ...)
forbid("Create approval decision from Node v185", ...)
forbid("Write approval ledger from Node v185", ...)
forbid("Execute rollback SQL from Node v185", ...)
forbid("Execute mini-kv LOAD from Node v185", ...)
forbid("Execute mini-kv COMPACT from Node v185", ...)
forbid("Execute mini-kv SETNXEX from Node v185", ...)
forbid("Execute mini-kv restore from Node v185", ...)
```

这和用户要求一致：需要真实联调或启动另外两个项目时必须明确提出，不能由 Node 自动做。

## 路由接入

路由文件：

```text
src/routes/statusRoutes.ts
```

新增：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/real-read-rehearsal-intake", ...)
```

支持 JSON 和 Markdown：

```text
/api/v1/production/real-read-rehearsal-intake
/api/v1/production/real-read-rehearsal-intake?format=markdown
```

## 测试

测试文件：

```text
test/realReadRehearsalIntake.test.ts
```

覆盖三层：

1. service 直接生成 intake，检查 Java v66、mini-kv v75、禁止执行边界。
2. `UPSTREAM_ACTIONS_ENABLED=true` 时必须 blocked。
3. HTTP route 同时返回 JSON 和 Markdown。

关键断言：

```ts
expect(profile.intakeState).toBe("ready-for-real-read-rehearsal-review");
expect(profile.executionAllowed).toBe(false);
expect(profile.intakeSteps.every((step) => step.readOnly && !step.startsJava && !step.startsMiniKv)).toBe(true);
```

这保证 v185 是只读 intake，不是启动器。

## 计划更新

本轮还新增：

```text
docs/plans/v185-post-real-read-rehearsal-roadmap.md
```

这份 plan 明确吸收用户关注的 1、3、4：

- `opsPromotionArchiveBundle.ts` 必须继续加速拆分。
- 三项目下一阶段转向真实能力落地。
- 学习 Java v66 的真实只读 endpoint 节奏。

## 验证命令

本版本运行了：

```text
npm run typecheck
npx vitest run test/realReadRehearsalIntake.test.ts
npx vitest run test/realReadRehearsalIntake.test.ts test/releaseApprovalDecisionRehearsalPacket.test.ts
npm test
npm run build
```

全量测试通过：

```text
Test Files  132 passed (132)
Tests       453 passed (453)
```
