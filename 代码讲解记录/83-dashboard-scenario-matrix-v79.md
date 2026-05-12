# 代码讲解：Node v79 Dashboard scenario matrix panel

## 入口位置

v79 的主要改动在 `src/ui/dashboard.ts`。它没有新增后端执行能力，而是把 v78 已有的只读接口接到 Dashboard：

```ts
async function refreshScenarioMatrix() {
  const matrix = await api("/api/v1/upstream-contract-fixtures/scenario-matrix");
  renderScenarioMatrix(matrix);
  return matrix;
}
```

这里复用了页面已有的 `api()` helper，所以仍走普通 HTTP GET，不会携带任何写操作语义。

## 页面展示

Dashboard 新增了三个卡片：

```html
<h2>Scenario Matrix</h2>
<div class="signal-value" id="scenarioMatrixDigestSignal">-</div>
<div class="signal-value" id="scenarioMatrixCountSignal">-</div>
<div class="signal-value" id="scenarioMatrixIssueSignal">-</div>
```

第一张卡展示矩阵整体状态：`matrixDigest`、场景数量、有效数量和 issue 数。它对应 v78 service 里的 `summary.totalScenarios`、`summary.validScenarios`、`summary.issueCount`。

Java 和 mini-kv 被拆成两张卡：

```html
<div class="signal-value" id="scenarioJavaApprovedSignal">-</div>
<div class="signal-value" id="scenarioJavaBlockedSignal">-</div>
<div class="signal-value" id="scenarioMiniKvWriteSignal">-</div>
<div class="signal-value" id="scenarioMiniKvReadSignal">-</div>
```

这四个 DOM id 正好对应 scenario matrix 中的四个固定场景：

```text
java-approved-replay-contract
java-blocked-replay-contract
mini-kv-write-checkjson
mini-kv-read-checkjson
```

## 渲染逻辑

`renderScenarioMatrix()` 是本版核心逻辑：

```ts
setBadge("scenarioMatrixState", matrix.valid ? "online" : "degraded");
setText("scenarioMatrixDigestSignal", matrix.matrixDigest.algorithm + ":" + matrix.matrixDigest.value);
setText(
  "scenarioMatrixCountSignal",
  formatNumber(matrix.summary.validScenarios) + "/" + formatNumber(matrix.summary.totalScenarios) + " valid / ready " + formatNumber(matrix.summary.diagnosticReadyScenarios),
);
```

这里没有把 `matrix.valid` 当作执行许可，只是把它映射成 Dashboard 的展示状态。真正的上游动作仍然受 `UPSTREAM_ACTIONS_ENABLED` 和后端 guard 控制。

单个场景使用 `formatScenarioStatus()`：

```ts
return [
  "valid " + formatBool(scenario.valid),
  "ready " + formatBool(scenario.diagnosticReady),
  "failing " + formatNumber(scenario.failingCheckCount) + "/" + formatNumber(scenario.checkCount),
].join(" / ");
```

所以页面上看到的 `valid yes / ready yes / failing 0/12` 不是手写文案，而是来自 scenario matrix 的真实字段。

## 操作按钮

Audit 区新增两个只读按钮：

```html
<button data-action="scenarioMatrix">Scenario Matrix</button>
<button data-action="scenarioMatrixMarkdown">Scenario Matrix Markdown</button>
```

点击 JSON 按钮时会调用 `refreshScenarioMatrix()` 并把完整 JSON 写入 Output；点击 Markdown 按钮时读取：

```text
/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown
```

这和 Fixture Report / Fixture Drift 的按钮风格一致，便于后续 v80 做 verification report。

## 测试覆盖

`test/dashboard.test.ts` 增加了结构断言，锁住：

- 新面板标题 `Scenario Matrix`
- 汇总 DOM id：`scenarioMatrixState`、`scenarioMatrixDigestSignal`、`scenarioMatrixCountSignal`、`scenarioMatrixIssueSignal`
- 四个场景 DOM id
- `/api/v1/upstream-contract-fixtures/scenario-matrix` 端点字符串
- `scenarioMatrix` / `scenarioMatrixMarkdown` 两个 action
- `renderScenarioMatrix` / `refreshScenarioMatrix` 两个函数名

这类测试不模拟浏览器交互，但能防止后续重构时把 Dashboard 入口、按钮或 endpoint 文案误删。
