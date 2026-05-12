# 代码讲解：Node v84 Scenario archive bundle verification report

## 新增服务

v84 新增 `src/services/upstreamContractFixtureScenarioVerificationArchiveBundleVerification.ts`。入口是：

```ts
export async function loadUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(config) {
  return createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(
    await loadUpstreamContractFixtureScenarioVerificationArchiveBundle(config),
  );
}
```

它先复用 v82 的 archive bundle，再对这个 bundle 做只读复核。

## digest 复算

verification 先去掉旧的 `archiveBundleDigest`，再复算：

```ts
const recomputedArchiveBundleDigest =
  digestUpstreamContractFixtureScenarioVerificationArchiveBundle(stripArchiveBundleDigest(bundle));
```

然后比较：

```ts
archiveBundleDigestValid: bundle.archiveBundleDigest.value === recomputedArchiveBundleDigest.value
```

同时也复算 v82 bundle 里保存的 `verificationDigest`：

```ts
const recomputedVerificationDigest =
  digestUpstreamContractFixtureScenarioMatrixVerification(bundle.verification);
```

这样能确认 bundle 自身没有被改过，也能确认它引用的 verification digest 没有漂移。

## 边界检查

v84 重点锁住只读边界：

```ts
readOnlyStillTrue: bundle.readOnly === true
executionAllowedStillFalse: bundle.executionAllowed === false
```

这两个检查直接对应项目边界：archive bundle verification 只能证明证据链，不是 Java replay 或 mini-kv 写操作的许可。

## 覆盖检查

source path 和 scenario evidence 数量也会重新数：

```ts
sourcePathCountValid:
  bundle.summary.sourcePathCount === expectedScenarioCount
  && sourcePathCount === expectedScenarioCount

scenarioEvidenceCountValid:
  bundle.scenarioEvidence.length === expectedScenarioCount
```

同时检查每个 `scenarioId` 都能在 `scenarioEvidence` 里找到：

```ts
scenarioIdsMatchEvidence:
  bundle.scenarioIds.every((scenarioId) => scenarioEvidenceIds.includes(scenarioId))
```

这保证 release evidence bundle 里四个场景、四个 source path 和四条 evidence 记录是一致的。

## 路由输出

`src/routes/statusRoutes.ts` 新增：

```ts
app.get("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification", ...)
```

JSON 请求返回 verification 对象；`format=markdown` 时返回：

```ts
renderUpstreamContractFixtureScenarioVerificationArchiveBundleVerificationMarkdown(verification)
```

Markdown 包含 Checks、Summary、Evidence Endpoints 和 Next Actions，适合和 v82 archive bundle 一起归档。

## 测试覆盖

`test/upstreamContractFixtureScenarioVerificationArchiveBundleVerification.test.ts` 覆盖：

- 正常 bundle：全部检查为 true。
- 篡改 `archiveBundleDigest.value`：verification 变 invalid。
- JSON / Markdown endpoint 可访问，并包含关键检查项。

本版没有新增执行 endpoint，也没有修改 Java / mini-kv。
