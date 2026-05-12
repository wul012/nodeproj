# 81. Node v77：Fixture evidence archive snapshot

## 模块角色

v77 新增 `upstreamContractFixtureArchive.ts`，作用是把 fixture report 和 drift diagnostics 组合成一份只读 archive snapshot。

前两层证据分别是：

```text
upstreamContractFixtures.ts：读取 Java / mini-kv fixture，并判断样本是否有效
upstreamContractFixtureDrift.ts：检查 fixture 是否字段漂移、映射缺失
```

v77 新增第三层：

```text
upstreamContractFixtureArchive.ts：把前两层 digest、路径、关键字段归档成 snapshot
```

## 入口函数

入口函数先复用 v75 的 drift diagnostics：

```ts
export async function loadUpstreamContractFixtureArchiveSnapshot(
  config: Pick<AppConfig, "javaExecutionContractFixturePath" | "miniKvCheckJsonFixturePath">,
): Promise<UpstreamContractFixtureArchiveSnapshot> {
  return createUpstreamContractFixtureArchiveSnapshot(
    await loadUpstreamContractFixtureDriftDiagnostics(config),
  );
}
```

这里没有重新读取 fixture 文件，也没有复制 v74/v75 的校验逻辑。archive snapshot 站在已有 diagnostics 结果上做归档。

## snapshot 的有效性

核心判断：

```ts
const fixtureReport = diagnostics.fixtureReport;
const valid = fixtureReport.valid && diagnostics.valid;
const hasDrift = diagnostics.summary.issueCount > 0;
```

也就是说，只有 fixture report 有效、drift diagnostics 有效时，archive snapshot 才有效。

`hasDrift` 不靠猜，而是直接读取：

```ts
diagnostics.summary.issueCount
```

## digest 归档

v77 把前两层 digest 合并到 `digests`：

```ts
const digests = {
  fixtureReportDigest: `${fixtureReport.fixtureDigest.algorithm}:${fixtureReport.fixtureDigest.value}`,
  driftDigest: `${diagnostics.driftDigest.algorithm}:${diagnostics.driftDigest.value}`,
  ...optionalString("javaContractDigest", fixtureReport.summary.javaContractDigest),
  ...optionalString("miniKvCommandDigest", fixtureReport.summary.miniKvCommandDigest),
};
```

这让归档文件可以同时说明：

```text
当前 fixture report 是哪一版
当前 drift diagnostics 是哪一版
Java contractDigest 是什么
mini-kv commandDigest 是什么
```

## source path 归档

snapshot 明确保存来源路径：

```ts
const sourcePaths = {
  javaExecutionContractFixturePath: fixtureReport.sources.java.path,
  miniKvCheckJsonFixturePath: fixtureReport.sources.miniKv.path,
};
```

这点很重要。它证明 Node smoke 用的是实际 Java / mini-kv 样本文件，而不是手写在测试里的临时 mock。

## keyFields

Java 关键字段：

```ts
contractVersion
contractDigest
approvalDigest
replayEligibilityDigest
replayPreconditionsSatisfied
digestVerificationMode
expectedSideEffectCount
```

mini-kv 关键字段：

```ts
schemaVersion
commandDigest
readOnly
executionAllowed
sideEffectCount
durability
```

drift 关键字段：

```ts
issueCount
errorCount
warningCount
missingMappingCount
```

这些字段共同回答：

```text
这份 archive snapshot 引用了哪些上游样本、样本是否漂移、是否仍然只读安全。
```

## archive digest

v77 自己也生成 `fixtureArchiveDigest`：

```ts
value: crypto.createHash("sha256")
  .update(stableJson({
    service: snapshot.service,
    valid: snapshot.valid,
    summary: snapshot.summary,
    digests: snapshot.digests,
    sourcePaths: snapshot.sourcePaths,
    keyFields: snapshot.keyFields,
    evidenceEndpoints: snapshot.evidenceEndpoints,
    nextActions: snapshot.nextActions,
  }))
  .digest("hex"),
```

`generatedAt` 不进入 digest，这样同一份证据内容不会因为生成时间变化而改变摘要。

## 路由层

新增路由：

```ts
GET /api/v1/upstream-contract-fixtures/archive-snapshot
```

Markdown 输出：

```ts
GET /api/v1/upstream-contract-fixtures/archive-snapshot?format=markdown
```

对应代码：

```ts
const snapshot = await loadUpstreamContractFixtureArchiveSnapshot(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderUpstreamContractFixtureArchiveSnapshotMarkdown(snapshot);
}
```

## 一句话总结

v77 把“当前 Node smoke 到底引用了哪份 Java / mini-kv fixture 证据”变成一份带 digest、source path、关键字段和 Markdown 输出的只读归档快照。
