# 代码讲解：Node v81 Dashboard scenario verification panel

## 面板入口

v81 的主要改动在 `src/ui/dashboard.ts`。它在 v79 的 `Scenario Matrix` 区块后面新增了 `Scenario Verification` 区块：

```html
<h2>Scenario Verification</h2>
<div class="badge disabled" id="scenarioVerificationState">pending</div>
<div class="signal-value" id="scenarioVerificationValidSignal">-</div>
<div class="signal-value" id="scenarioVerificationDigestSignal">-</div>
<div class="signal-value" id="scenarioVerificationScenarioCountSignal">-</div>
```

这个区块展示的是 v80 verification report 的核心结果，不重新定义校验规则。

## 数据刷新

页面新增：

```ts
async function refreshScenarioVerification() {
  const verification = await api("/api/v1/upstream-contract-fixtures/scenario-matrix/verification");
  renderScenarioVerification(verification);
  return verification;
}
```

并在页面启动时自动调用：

```ts
void refreshScenarioVerification().catch(() => {});
```

所以 Dashboard 打开后会自动把 scenario verification 状态填到页面上。

## 渲染逻辑

`renderScenarioVerification()` 只消费 v80 已经生成的 verification 字段：

```ts
const checks = verification.checks || {};
setBadge("scenarioVerificationState", verification.valid ? "online" : "degraded");
setText("scenarioVerificationValidSignal", formatBool(verification.valid));
setText("scenarioVerificationDigestSignal", formatBool(checks.matrixDigestValid));
```

这里的 `online/degraded` 是展示状态，不是执行许可。真实上游动作仍然受 `UPSTREAM_ACTIONS_ENABLED` 和后端 guard 控制。

## 语义与覆盖展示

v81 特意把两个关键语义单独显示：

```ts
setText("scenarioVerificationBlockedReplaySignal", formatBool(checks.blockedReplaySemanticsStable));
setText("scenarioVerificationMiniKvReadSignal", formatBool(checks.miniKvReadSemanticsStable));
```

它们对应 v80 的检查：

- `blockedReplaySemanticsStable`：Java blocked replay 仍是有效诊断样本，不是可执行成功样本。
- `miniKvReadSemanticsStable`：mini-kv `GET` 仍保持 `side_effects=["store_read"]`、`side_effect_count=1` 的解释语义。

覆盖信息也在 Dashboard 展示：

```ts
setText(
  "scenarioVerificationExpectedIdsSignal",
  "present " + formatBool(checks.expectedScenarioIdsPresent) + " / unexpected " + formatBool(!checks.noUnexpectedScenarioIds),
);
setText("scenarioVerificationSourcePathsSignal", formatBool(checks.sourcePathsPresent));
setText(
  "scenarioVerificationDriftSignal",
  formatBool(checks.driftIssueCountMatches) + " / issues " + formatNumber(verification.summary.issueCount),
);
```

这让 Dashboard 可以直接看到四个 scenario id 是否齐全、source path 是否存在、drift issueCount 是否一致。

## 操作按钮

Audit 区新增两个只读按钮：

```html
<button data-action="scenarioVerification">Scenario Verification</button>
<button data-action="scenarioVerificationMarkdown">Scenario Verification Markdown</button>
```

JSON 按钮会调用 `refreshScenarioVerification()` 并把完整对象写入 Output；Markdown 按钮读取：

```text
/api/v1/upstream-contract-fixtures/scenario-matrix/verification?format=markdown
```

这和 v79 的 scenario matrix 按钮保持同一风格。

## 测试覆盖

`test/dashboard.test.ts` 新增结构断言，锁住：

- `Scenario Verification` 标题
- `scenarioVerificationState`
- `scenarioVerificationValidSignal`
- `scenarioVerificationDigestSignal`
- `scenarioVerificationScenarioCountSignal`
- `scenarioVerificationBlockedReplaySignal`
- `scenarioVerificationMiniKvReadSignal`
- `scenarioVerificationSourcePathsSignal`
- verification endpoint 字符串
- `scenarioVerification` / `scenarioVerificationMarkdown` 两个 action
- `renderScenarioVerification` / `refreshScenarioVerification` 函数名

本版没有新增后端执行接口，也没有修改 Java / mini-kv。
