# 80. Node v76：Dashboard fixture diagnostics panel

## 模块角色

v76 不新增后端执行能力，只增强 Dashboard 的只读观察面。

上一版 v75 已经有两个后端入口：

```text
GET /api/v1/upstream-contract-fixtures
GET /api/v1/upstream-contract-fixtures/drift-diagnostics
```

v76 的作用是把这两个入口的重要字段直接展示出来，避免调试时只能看 JSON。

## 面板结构

Dashboard 新增第一块卡片：

```ts
<h2>Fixture Report</h2>
<div class="badge disabled" id="fixtureReportState">pending</div>
```

这块卡片展示总状态和两个样本状态：

```ts
<div class="signal-value" id="fixtureDigestSignal">-</div>
<div class="signal-value" id="fixtureJavaStatusSignal">-</div>
<div class="signal-value" id="fixtureMiniKvStatusSignal">-</div>
```

它对应的是 `UpstreamContractFixtureReport` 里的：

```ts
report.valid
report.fixtureDigest
report.summary.javaFixtureStatus
report.summary.miniKvFixtureStatus
```

## Java fixture 展示

Java 面板直接引用 fixture report 的 summary 字段：

```ts
setText("fixtureJavaContractDigestSignal", formatDigest(report.summary.javaContractDigest));
setText("fixtureJavaPreconditionsSignal", formatBool(report.summary.javaReplayPreconditionsSatisfied));
setText("fixtureJavaExecutionChecksSignal", formatCheckRatio(report.checks, "java"));
setText("fixtureJavaSideEffectsSignal", formatNumber(report.summary.javaExpectedSideEffectCount));
```

这里没有重新计算 Java contract，只是把 v74/v75 已验证过的字段展示出来。

`formatCheckRatio(report.checks, "java")` 会统计所有以 `java` 开头的检查项，例如：

```text
javaContractDigestValid
javaReplayEligibilityDigestValid
javaReplayPreconditionsSatisfied
```

这样面板能显示类似：

```text
9/9 ok
```

## mini-kv 与 drift 展示

mini-kv 面板展示 CHECKJSON 的只读语义：

```ts
setText("fixtureMiniKvCommandDigestSignal", formatDigest(report.summary.miniKvCommandDigest));
setText("fixtureMiniKvReadExecuteSignal", "read_only " + formatBool(report.summary.miniKvReadOnly) + " / execution_allowed " + formatBool(report.summary.miniKvExecutionAllowed));
setText("fixtureMiniKvSideEffectsSignal", formatNumber(report.summary.miniKvSideEffectCount));
```

最关键的是继续表达：

```text
read_only yes
execution_allowed no
```

这说明 Dashboard 只展示 CHECKJSON 证据，不执行 mini-kv 写命令。

drift diagnostics 展示：

```ts
setText("fixtureDriftSignal", (drift.summary.issueCount > 0 ? "yes" : "no") + " / issues " + formatNumber(drift.summary.issueCount) + " / errors " + formatNumber(drift.summary.errorCount));
setText("fixtureDriftMappingSignal", "missing " + formatNumber(drift.summary.missingMappingCount) + " / total " + formatNumber(drift.mappings.length));
```

这对应 v75 的核心判断：

```text
issueCount
errorCount
missingMappingCount
```

## 刷新流程

Dashboard 通过一个函数同时读取两个只读接口：

```ts
async function refreshFixtureDiagnostics() {
  const [report, drift] = await Promise.all([
    api("/api/v1/upstream-contract-fixtures"),
    api("/api/v1/upstream-contract-fixtures/drift-diagnostics"),
  ]);
  renderFixtureDiagnostics(report, drift);
  return { fixtureReport: report, driftDiagnostics: drift };
}
```

这里用 `Promise.all` 是因为两个接口都是只读查询，互不依赖。

## Markdown 链接

v76 也保留直接打开 Markdown 的入口：

```ts
<a id="fixtureReportMarkdownLink" href="/api/v1/upstream-contract-fixtures?format=markdown">Markdown</a>
<a id="fixtureDriftMarkdownLink" href="/api/v1/upstream-contract-fixtures/drift-diagnostics?format=markdown">Markdown</a>
```

这让后续归档可以直接引用 Markdown 证据，不需要人工复制 JSON 后再整理。

## 一句话总结

v76 把 fixture report 和 fixture drift diagnostics 从“接口能看”推进到“Dashboard 能扫一眼判断”，但它仍然是纯只读展示层，不改变 Java / mini-kv，也不打开真实执行路径。
