# 89. Node v85 Dashboard scenario archive verification 代码讲解

## 1. 面板只呈现 v84 的 verification 结果

`src/ui/dashboard.ts` 新增的 `Scenario Archive Verification` 卡片不是重新计算 digest，而是展示后端现有 endpoint 的只读结果：

```ts
<h2>Scenario Archive Verification</h2>
<div class="badge disabled" id="scenarioArchiveVerificationState">pending</div>
```

它把 v84 的 archive bundle verification 拆成三类可读信号：

```ts
id="scenarioArchiveVerificationValidSignal"
id="scenarioArchiveVerificationDigestSignal"
id="scenarioArchiveVerificationVerificationDigestSignal"
id="scenarioArchiveVerificationReadOnlySignal"
id="scenarioArchiveVerificationExecutionSignal"
id="scenarioArchiveVerificationSourcePathSignal"
```

这和上一版 `Scenario Archive Bundle` 面板的关系是：v83/v84 先证明 bundle 存在且可复算，v85 再把这个复核结果放到 Dashboard 首屏可见区域。

## 2. JSON / Markdown 入口复用后端只读 endpoint

Dashboard 面板直接暴露 v84 已有接口：

```ts
<a id="scenarioArchiveVerificationJsonLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification">JSON</a>
<a id="scenarioArchiveVerificationMarkdownLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification?format=markdown">Markdown</a>
```

这里没有新增执行入口，只有 evidence 查看入口。按钮区也同样只是读取：

```ts
<button data-action="scenarioArchiveVerification">Scenario Archive Verification</button>
<button data-action="scenarioArchiveVerificationMarkdown">Scenario Archive Verification Markdown</button>
```

## 3. 渲染函数只读映射 checks 和 summary

前端渲染函数读取 `verification.checks` 和 `verification.summary`：

```ts
function renderScenarioArchiveVerification(verification) {
  const checks = verification.checks || {};
  const summary = verification.summary || {};
  setBadge("scenarioArchiveVerificationState", verification.valid ? "online" : "degraded");
  setText("scenarioArchiveVerificationDigestSignal", formatBool(checks.archiveBundleDigestValid));
  setText("scenarioArchiveVerificationVerificationDigestSignal", formatBool(checks.verificationDigestValid));
}
```

边界字段单独展示，避免把 “证据有效” 误读成 “允许执行”：

```ts
setText("scenarioArchiveVerificationReadOnlySignal", formatBool(checks.readOnlyStillTrue));
setText("scenarioArchiveVerificationExecutionSignal", formatBool(checks.executionAllowedStillFalse));
setText("scenarioArchiveVerificationBundleValiditySignal", formatBool(checks.bundleValidityConsistent));
```

覆盖率字段保留数量，方便以后对接 release evidence index：

```ts
formatBool(checks.sourcePathCountValid) + " / " + formatNumber(summary.sourcePathCount) + "/" + formatNumber(summary.totalScenarios)
formatBool(checks.scenarioEvidenceCountValid) + " / " + formatNumber(summary.scenarioEvidenceCount)
"issues " + formatNumber(summary.issueCount) + " / clean " + formatBool(checks.noScenarioIssues)
```

## 4. 页面加载自动刷新

新增刷新函数只调用一个只读 endpoint：

```ts
async function refreshScenarioArchiveVerification() {
  const verification = await api("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification");
  renderScenarioArchiveVerification(verification);
  return verification;
}
```

页面初始化时自动刷新：

```ts
void refreshScenarioArchiveVerification().catch(() => {});
```

因此打开 Dashboard 后，不需要手点按钮就能看到 archive verification 当前状态。

## 5. 结构测试锁住 Dashboard 契约

`test/dashboard.test.ts` 把面板标题、DOM id、endpoint、按钮 action、渲染函数和刷新函数都纳入断言：

```ts
expect(html).toContain("Scenario Archive Verification");
expect(html).toContain('id="scenarioArchiveVerificationState"');
expect(html).toContain("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification");
expect(html).toContain('data-action="scenarioArchiveVerification"');
expect(html).toContain("function renderScenarioArchiveVerification");
expect(html).toContain("refreshScenarioArchiveVerification");
```

这类测试不是验证样式，而是防止以后重构 Dashboard 时把证据入口、自动刷新或只读按钮误删。
