# 代码讲解：Node v83 Dashboard scenario archive bundle panel

## 面板入口

v83 的主要改动在 `src/ui/dashboard.ts`。它在 `Scenario Verification` 后面新增了 `Scenario Archive Bundle` 区块：

```html
<h2>Scenario Archive Bundle</h2>
<div class="badge disabled" id="scenarioArchiveBundleState">pending</div>
<div class="signal-value" id="scenarioArchiveBundleValidSignal">-</div>
<div class="signal-value" id="scenarioArchiveBundleReadExecuteSignal">-</div>
<div class="signal-value" id="scenarioArchiveBundleSourcePathSignal">-</div>
```

这个区块展示的是 v82 已经生成的 archive bundle，不重新生成或修改 fixture。

## 数据刷新

页面新增：

```ts
async function refreshScenarioArchiveBundle() {
  const bundle = await api("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle");
  renderScenarioArchiveBundle(bundle);
  return bundle;
}
```

并在页面启动时自动调用：

```ts
void refreshScenarioArchiveBundle().catch(() => {});
```

所以 Dashboard 打开后会自动展示 archive bundle 的最新状态。

## 渲染逻辑

`renderScenarioArchiveBundle()` 是本版核心：

```ts
setBadge("scenarioArchiveBundleState", bundle.valid ? "online" : "degraded");
setText("scenarioArchiveBundleValidSignal", formatBool(bundle.valid));
setText(
  "scenarioArchiveBundleReadExecuteSignal",
  "read_only " + formatBool(bundle.readOnly) + " / execution_allowed " + formatBool(bundle.executionAllowed),
);
```

这里强调 `readOnly=true` 和 `executionAllowed=false`，让 Dashboard 明确这个 bundle 是 release evidence，不是执行许可。

## digest 展示

v83 单独展示三条 digest 链：

```ts
setText("scenarioArchiveBundleDigestSignal", bundle.archiveBundleDigest.algorithm + ":" + bundle.archiveBundleDigest.value);
setText("scenarioArchiveBundleVerificationDigestSignal", bundle.digests.verificationDigest);
setText("scenarioArchiveBundleMatrixDigestSignal", bundle.digests.matrixDigest);
```

这对应 v82 bundle 的证据链：archive bundle digest 可以追溯到 verification digest 和 matrix digest。

## 覆盖展示

页面还展示 scenario 覆盖和 evidence 数量：

```ts
setText(
  "scenarioArchiveBundleScenarioSignal",
  formatNumber(summary.validScenarios) + "/" + formatNumber(summary.totalScenarios) + " valid / ready " + formatNumber(summary.diagnosticReadyScenarios),
);
setText("scenarioArchiveBundleIssueSignal", formatNumber(summary.issueCount));
setText("scenarioArchiveBundleEvidenceSignal", formatNumber((bundle.scenarioEvidence || []).length) + " records");
```

这让 Dashboard 可以快速确认四个 scenario 都在、没有 issue，并且 scenario evidence 数量符合预期。

## 操作按钮

Audit 区新增两个只读按钮：

```html
<button data-action="scenarioArchiveBundle">Scenario Archive Bundle</button>
<button data-action="scenarioArchiveBundleMarkdown">Scenario Archive Bundle Markdown</button>
```

JSON 按钮调用 `refreshScenarioArchiveBundle()`，Markdown 按钮读取：

```text
/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle?format=markdown
```

本版没有新增后端执行接口，也没有修改 Java / mini-kv。

## 测试覆盖

`test/dashboard.test.ts` 新增结构断言，锁住：

- `Scenario Archive Bundle` 标题
- `scenarioArchiveBundleState`
- `scenarioArchiveBundleValidSignal`
- `scenarioArchiveBundleReadExecuteSignal`
- `scenarioArchiveBundleSourcePathSignal`
- `scenarioArchiveBundleDigestSignal`
- `scenarioArchiveBundleVerificationDigestSignal`
- `scenarioArchiveBundleMatrixDigestSignal`
- `scenarioArchiveBundleScenarioSignal`
- archive bundle endpoint 字符串
- `scenarioArchiveBundle` / `scenarioArchiveBundleMarkdown` 两个 action
- `renderScenarioArchiveBundle` / `refreshScenarioArchiveBundle` 函数名
