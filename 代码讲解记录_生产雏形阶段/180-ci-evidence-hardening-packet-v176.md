# 180-ci-evidence-hardening-packet-v176

## 版本定位

Node v176 是 `CI evidence hardening packet`。它接在 Node v175 后面，把“本地版本验证”和“GitHub Actions 证据要求”统一成一个可检查的只读包。

本版不是 CI runner，也不是生产发布器：

- 不执行 release。
- 不执行 deployment。
- 不执行 rollback。
- 不执行 mini-kv restore。
- 不读取 production secret。
- 不启动 Java 或 mini-kv。
- 不打开 `UPSTREAM_ACTIONS_ENABLED=true`。

## 核心入口

实现文件：

```text
src/services/ciEvidenceHardeningPacket.ts
```

入口函数：

```ts
export function loadCiEvidenceHardeningPacket(config: AppConfig): CiEvidenceHardeningPacketProfile {
  const handoffReview = loadReleaseHandoffReadinessReview(config);
  const commandProfile = createCiEvidenceCommandProfile(config);
  const evidenceExpectations = createEvidenceExpectations();
  const ciDifferences = createCiDifferences();
  const hardeningSteps = createHardeningSteps();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    handoffReview,
    commandProfile,
    evidenceExpectations,
    ciDifferences,
    hardeningSteps,
    pauseConditions,
  );
}
```

这里的依赖关系很清楚：

```text
v175 release handoff readiness review
        +
ciEvidenceCommandProfile
        ->
v176 CI evidence hardening packet
```

它消费已有证据，不启动上游，不执行真实动作。

## Packet Digest

v176 生成自己的 packet digest：

```ts
const packetDigest = digestPacket({
  profileVersion: "ci-evidence-hardening-packet.v1",
  sourceHandoffReviewDigest: handoffReview.review.reviewDigest,
  sourceCiProfileVersion: commandProfile.profileVersion,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    packetDigestValid: undefined,
    readyForCiEvidenceHardeningPacket: undefined,
  },
});
```

和前几版一样，digest 排除了自校验字段，避免循环依赖。随后：

```ts
checks.packetDigestValid = isReleaseReportDigest(packetDigest);
completeAggregateReadyCheck(checks, "readyForCiEvidenceHardeningPacket");
```

最终 ready 状态来自 21 个 check 全部通过。

## Evidence Expectations

`createEvidenceExpectations()` 固化 7 类证据：

```text
npm-ci
typecheck
full-test
build
safe-http-smoke
chrome-screenshot
archive-and-cleanup
```

其中 `build`、`safe-http-smoke`、`archive-and-cleanup` 都标记：

```ts
createsTemporaryOutput: true
cleanupRequired: true
```

这和用户设定的清理规则对齐：版本完成后要删除 `.tmp`、`dist`，并停止本轮 Node 服务。

## Local vs GitHub Actions Differences

`createCiDifferences()` 把本地和 GitHub Actions 的差异明确化：

```text
environment-source
process-lifetime
artifact-retention
browser-availability
authorization-boundary
```

例如：

```ts
{
  id: "browser-availability",
  area: "browser",
  localBehavior: "Use local Chrome through Playwright for screenshots.",
  githubActionsBehavior: "Browser screenshots are optional unless the runner provisions a browser.",
  hardeningRule: "Missing CI screenshot does not authorize skipping local visual archive.",
  blocksProductionExecution: true,
}
```

这个规则解释了为什么本地仍然要保留 Chrome 截图，而 CI 不一定强制跑浏览器截图。

## 关键检查

`createChecks()` 保护几个核心边界：

```ts
sourceHandoffReviewReady
sourceHandoffReviewDigestValid
sourceHandoffReviewStillBlocksProduction
ciCommandProfileValid
ciCommandProfileIncludesCoreCommands
ciCommandProfileSafeByDefault
evidenceExpectationsComplete
cleanupExpectationsPresent
ciDifferencesComplete
hardeningStepsReadOnly
upstreamActionsStillDisabled
noWorkflowSecretRead
noJavaOrMiniKvStart
```

其中：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled
noWorkflowSecretRead: true
noJavaOrMiniKvStart: true
```

保证 v176 只做 CI evidence hardening，不把 CI 变成部署或联调执行器。

## Access Policy 小修

本版把 `/api/v1/ci/*` 加入 readiness 路由策略：

```ts
pathPatterns: [
  "/health",
  "/api/v1/runtime/config",
  "/api/v1/ci/*",
  "/api/v1/production/*",
  "/api/v1/security/*",
  "/api/v1/deployment/*",
]
```

原因是新 endpoint 是只读 evidence endpoint。如果 access guard enforcement 开启，`viewer` 应能读取 CI evidence；否则会出现缺失策略导致 403。

对应测试补充：

```text
test/accessPolicyProfile.test.ts
test/accessGuard.test.ts
```

## 路由接入

`statusRoutes.ts` 新增：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/ci/evidence-hardening-packet",
  () => Promise.resolve(loadCiEvidenceHardeningPacket(deps.config)),
  renderCiEvidenceHardeningPacketMarkdown,
);
```

对应：

```text
GET /api/v1/ci/evidence-hardening-packet
GET /api/v1/ci/evidence-hardening-packet?format=markdown
```

## 测试覆盖

新增：

```text
test/ciEvidenceHardeningPacket.test.ts
```

覆盖：

- 正常情况下 21 个 check 全部通过。
- `UPSTREAM_ACTIONS_ENABLED=true` 时 packet blocked。
- JSON / Markdown route 可访问。
- Markdown 包含 `release-handoff-readiness-review.v1`、`chrome-screenshot` 和 `CREATE_NEXT_NON_OVERLAPPING_PLAN`。

v176 的价值是把“每版怎么验证、CI 怎么证明、哪些证据本地必须归档、哪些事情 CI 绝不能做”整理成稳定 contract。它让项目更靠近生产级工程流程，但仍不打开生产执行。
