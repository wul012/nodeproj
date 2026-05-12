# 代码讲解：Node v80 Scenario matrix verification report

## 新增服务

v80 新增 `src/services/upstreamContractFixtureScenarioMatrixVerification.ts`。它的入口是：

```ts
export async function loadUpstreamContractFixtureScenarioMatrixVerification(config) {
  return createUpstreamContractFixtureScenarioMatrixVerification(
    await loadUpstreamContractFixtureScenarioMatrix(config),
  );
}
```

这里先复用 v78 的 `loadUpstreamContractFixtureScenarioMatrix()` 生成矩阵，再交给 verification 复核。也就是说 v80 不重新读取 Java/mini-kv 网络服务，只读取 fixture 路径，不做真实上游动作。

## digest 复核

v80 把 `digestUpstreamContractFixtureScenarioMatrix()` 从 matrix service 中导出：

```ts
export function digestUpstreamContractFixtureScenarioMatrix(
  matrix: Omit<UpstreamContractFixtureScenarioMatrix, "matrixDigest">,
): UpstreamContractFixtureScenarioMatrixDigest
```

verification 使用 `stripMatrixDigest(matrix)` 去掉旧 digest，再重新计算：

```ts
const recomputedMatrixDigest = digestUpstreamContractFixtureScenarioMatrix(stripMatrixDigest(matrix));
```

然后比较：

```ts
matrixDigestValid: matrix.matrixDigest.value === recomputedMatrixDigest.value
```

这样能验证 matrix 内容没有被改过后还沿用旧 digest。

## 场景覆盖检查

verification 固定要求四个场景：

```ts
const EXPECTED_SCENARIO_IDS = [
  "java-approved-replay-contract",
  "java-blocked-replay-contract",
  "mini-kv-write-checkjson",
  "mini-kv-read-checkjson",
];
```

对应检查包括：

```ts
scenarioCountValid
expectedScenarioIdsPresent
noUnexpectedScenarioIds
summaryCountsMatchScenarios
sourcePathsPresent
```

这些检查不是只看 `matrix.valid`，而是重新数一遍 `matrix.scenarios`，并确认 `summary.totalScenarios`、`validScenarios`、`diagnosticReadyScenarios`、Java/mini-kv 分类数量和真实数组一致。

## blocked/read 语义检查

v80 特意锁住两个容易漂移的语义。

Java blocked replay：

```ts
scenario.role === "blocked-replay"
scenario.keyFields.replayPreconditionsSatisfied === false
Array.isArray(scenario.keyFields.blockedBy)
scenario.keyFields.expectedSideEffectCount === 0
isPositiveNumber(scenario.keyFields.failedExecutionCheckCount)
```

这保证 blocked sample 仍被当作有效诊断样本，而不是执行成功样本。

mini-kv read CHECKJSON：

```ts
scenario.keyFields.command === "GET"
scenario.keyFields.readOnly === true
scenario.keyFields.executionAllowed === false
scenario.keyFields.sideEffects[0] === "store_read"
scenario.keyFields.sideEffectCount === 1
```

这保留了 mini-kv 当前的解释语义：读命令不会执行写操作，但解释字段里仍记录 `store_read`。

## 路由输出

`src/routes/statusRoutes.ts` 新增：

```ts
app.get("/api/v1/upstream-contract-fixtures/scenario-matrix/verification", ...)
```

JSON 请求返回 verification 对象；`format=markdown` 时返回：

```ts
renderUpstreamContractFixtureScenarioMatrixVerificationMarkdown(verification)
```

Markdown 中包含 digest、checks、summary、source paths、四个 scenario checks 和 evidence endpoints，方便归档到 release evidence。

## 测试覆盖

`test/upstreamContractFixtureScenarioMatrixVerification.test.ts` 覆盖三类风险：

- 正常 fixture set：verification 全部通过。
- 人为篡改 `matrixDigest.value`：`matrixDigestValid=false`，整体 invalid。
- Fastify route：JSON / Markdown endpoint 都可访问，并包含关键标题和场景段落。

本版没有新增执行 endpoint，也没有绕过 `UPSTREAM_ACTIONS_ENABLED`。
