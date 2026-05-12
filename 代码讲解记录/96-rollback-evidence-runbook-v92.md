# 96. Node v92 Rollback evidence runbook 代码讲解

## 1. v92 的职责

`src/services/rollbackEvidenceRunbook.ts` 新增的是只读回滚证据手册。

核心字段：

```ts
readyForRollbackEvidenceArchive: boolean;
readOnly: true;
executionAllowed: false;
rollbackSteps: RollbackRunbookStep[];
verificationSteps: RollbackRunbookStep[];
stopConditions: RollbackRunbookCondition[];
```

它只生成证据和步骤，不执行服务器、Java 或 mini-kv 回滚命令。

## 2. 汇总 v87-v89 的证据

`loadRollbackEvidenceRunbook()` 会加载或创建三类证据：

```ts
readinessGate: await loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(config)
ciProfile: createCiEvidenceCommandProfile(config)
deploymentProfile: createDeploymentSafetyProfile(config)
```

这让 v92 成为生产化证据链的汇总层，而不是重新造一套判断。

## 3. checks 决定是否可归档

runbook 检查：

```ts
releaseEvidenceReady
ciProfileValid
deploymentProfileHasNoBlockers
rollbackStepsPresent
verificationStepsPresent
stopConditionsPresent
executionStillBlocked
```

只有这些都满足，且 blockerCount=0，`readyForRollbackEvidenceArchive` 才会是 true。

## 4. rollback steps 是人工流程，不是自动执行

本版生成 5 个 rollback steps：

```ts
freeze-upstream-actions
capture-release-evidence
capture-ci-profile
capture-deployment-safety
coordinate-human-rollback
```

其中最后一步明确：

```text
This Node runbook does not execute server, Java, or mini-kv rollback commands.
```

## 5. stop conditions 是安全边界

stop conditions 包括：

```ts
UPSTREAM_ACTIONS_ENABLED
READINESS_BLOCKERS_PRESENT
CI_PROFILE_INVALID
DEPLOYMENT_BLOCKERS_PRESENT
HUMAN_AUTHORIZATION_MISSING
```

这些条件用于发布/回滚评审，防止把“证据 ready”误读成“可以自动回滚”。

## 6. 路由只读输出

`src/routes/statusRoutes.ts` 新增：

```ts
/api/v1/deployment/rollback-runbook
```

并支持：

```ts
?format=markdown
```

测试覆盖 JSON、Markdown、ready=true、executionAllowed=false、stop conditions 等关键契约。
