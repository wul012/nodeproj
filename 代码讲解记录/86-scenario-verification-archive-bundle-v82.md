# 代码讲解：Node v82 Scenario verification archive bundle

## 新增服务

v82 新增 `src/services/upstreamContractFixtureScenarioVerificationArchiveBundle.ts`。入口是：

```ts
export async function loadUpstreamContractFixtureScenarioVerificationArchiveBundle(config) {
  const matrix = await loadUpstreamContractFixtureScenarioMatrix(config);
  return createUpstreamContractFixtureScenarioVerificationArchiveBundle(
    matrix,
    createUpstreamContractFixtureScenarioMatrixVerification(matrix),
  );
}
```

它先读取 v78 的 scenario matrix，再用 v80 的 verification 复核矩阵，最后把两者打成 archive bundle。

## 只读边界

bundle 对象明确写死：

```ts
readOnly: true
executionAllowed: false
```

这两个字段不是从外部输入推导的，而是 archive bundle 的固定边界：它只能证明 fixture scenario evidence，不能作为真实上游执行许可。

## 摘要字段

bundle 的 `summary` 聚合关键检查：

```ts
const summary = {
  matrixValid: matrix.valid,
  verificationValid: verification.valid,
  matrixDigestValid: checks.matrixDigestValid,
  scenarioCountValid: checks.scenarioCountValid,
  sourcePathsPresent: checks.sourcePathsPresent,
  blockedReplaySemanticsStable: checks.blockedReplaySemanticsStable,
  miniKvReadSemanticsStable: checks.miniKvReadSemanticsStable,
  totalScenarios: matrix.summary.totalScenarios,
  validScenarios: matrix.summary.validScenarios,
  diagnosticReadyScenarios: matrix.summary.diagnosticReadyScenarios,
  issueCount: matrix.summary.issueCount,
  sourcePathCount,
};
```

所以 v82 的有效性不是只看一个布尔值，而是同时要求 matrix、verification、四场景数量、source path、blocked/read 语义都稳定。

## digest 链路

bundle 保存三个 digest：

```ts
const digests = {
  matrixDigest: `${matrix.matrixDigest.algorithm}:${matrix.matrixDigest.value}`,
  recomputedMatrixDigest: `${verification.recomputedMatrixDigest.algorithm}:${verification.recomputedMatrixDigest.value}`,
  verificationDigest: `${verificationDigest.algorithm}:${verificationDigest.value}`,
};
```

`archiveBundleDigest` 再覆盖 bundle 自己的核心字段：

```ts
summary
digests
scenarioIds
sourcePaths
scenarioEvidence
evidenceEndpoints
nextActions
```

这样后续 release evidence 可以引用一个 bundle digest，追溯回 matrix digest 和 verification digest。

## 路由输出

`src/routes/statusRoutes.ts` 新增：

```ts
app.get("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle", ...)
```

普通请求返回 JSON；`format=markdown` 返回：

```ts
renderUpstreamContractFixtureScenarioVerificationArchiveBundleMarkdown(bundle)
```

Markdown 里包含 Summary、Digests、Scenario IDs、Scenario Sources、Scenario Evidence、Evidence Endpoints 和 Next Actions，方便归档。

## 测试覆盖

`test/upstreamContractFixtureScenarioVerificationArchiveBundle.test.ts` 覆盖：

- service 层能生成 valid bundle。
- `readOnly=true`、`executionAllowed=false`。
- 四个 scenario id 和 source path 被固化。
- bundle digest 和 verification digest 格式正确。
- JSON / Markdown endpoint 都能访问。

本版没有新增执行 endpoint，也没有修改 Java / mini-kv。
