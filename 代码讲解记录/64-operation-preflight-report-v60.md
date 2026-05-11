# 第六十版代码讲解：Preflight Markdown report + digest

本版目标来自：

```text
docs/plans/v59-post-preflight-control-roadmap.md
Node v60：Preflight Markdown report + digest
```

v59 已经能生成 preflight JSON。v60 的目标是把这个 JSON 固化成更适合人工审阅和归档的报告，并给报告来源 bundle 生成 SHA-256 摘要。

## 1. 新增 report service

文件：

```text
src/services/operationPreflightReport.ts
```

新增核心结构：

```ts
export interface OperationPreflightReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  intentId: string;
  state: OperationPreflightReportState;
  preflightDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  summary: {
    action: string;
    target: string;
    risk: string;
    intentStatus: string;
    operatorId: string;
    operatorRole: string;
    policyAllowed: boolean;
    confirmationConfirmed: boolean;
    readyForDryRunDispatch: boolean;
    hardBlockerCount: number;
    warningCount: number;
    dispatchTotal: number;
    dryRunDispatches: number;
    rejectedDispatches: number;
    upstreamTouchedDispatches: number;
    javaReplayReadiness: string;
    miniKvCommandCatalog: string;
    miniKvKeyInventory: string;
  };
  preflight: OperationPreflightBundle;
  nextActions: string[];
}
```

这里保留完整 `preflight`，同时提炼 `summary`。这样 JSON report 既可读，也能回到原始证据包。

## 2. digest：排除生成时间，覆盖证据主体

文件：

```text
src/services/operationPreflightReport.ts
```

digest 覆盖字段：

```ts
const PREFLIGHT_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "intent",
  "actionPlan",
  "policy",
  "confirmation",
  "rateLimit",
  "safety",
  "dispatches",
  "evidence",
  "hardBlockers",
  "warnings",
  "recommendedNextActions",
  "readyForDryRunDispatch",
]);
```

生成摘要：

```ts
function digestOperationPreflight(preflight: OperationPreflightBundle): string {
  return createHash("sha256")
    .update(stableJson({
      service: preflight.service,
      intent: preflight.intent,
      actionPlan: preflight.actionPlan,
      policy: preflight.policy,
      confirmation: preflight.confirmation,
      rateLimit: preflight.rateLimit,
      safety: preflight.safety,
      dispatches: preflight.dispatches,
      evidence: preflight.evidence,
      hardBlockers: preflight.hardBlockers,
      warnings: preflight.warnings,
      recommendedNextActions: preflight.recommendedNextActions,
      readyForDryRunDispatch: preflight.readyForDryRunDispatch,
    }))
    .digest("hex");
}
```

这里不把 `generatedAt` 放进 digest，因为报告生成时间每次都会变。digest 表达的是“这份 preflight evidence 的主体是否一致”。

## 3. stableJson：保证同样对象得到同样摘要

文件：

```text
src/services/operationPreflightReport.ts
```

实现：

```ts
function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
```

对象 key 排序后再 JSON 化，避免因为属性插入顺序不同导致 digest 变化。

## 4. report state：把 blocker / warning 转成人能扫的状态

文件：

```text
src/services/operationPreflightReport.ts
```

状态规则：

```ts
function resolveReportState(preflight: OperationPreflightBundle): OperationPreflightReportState {
  if (preflight.hardBlockers.length > 0) {
    return "blocked";
  }
  if (preflight.warnings.length > 0) {
    return "review-required";
  }
  return "ready";
}
```

含义：

```text
blocked         -> 有 hardBlockers，不应继续
review-required -> 没有硬阻断，但有 warning，需要人工看过
ready           -> 没有 blocker/warning
```

## 5. verification：复算 digest 和摘要

文件：

```text
src/services/operationPreflightReport.ts
```

验证逻辑：

```ts
const checks = {
  digestValid: report.preflightDigest.value === recomputedDigest.value,
  coveredFieldsMatch: stableJson(report.preflightDigest.coveredFields) === stableJson(recomputedDigest.coveredFields),
  intentMatches: report.intentId === report.preflight.intent.id,
  summaryMatches: stableJson(report.summary) === stableJson(recomputedSummary),
  nextActionsMatch: stableJson(report.nextActions) === stableJson(report.preflight.recommendedNextActions),
};
const valid = Object.values(checks).every(Boolean);
```

这不是持久化审计库，而是“当前生成报告是否自洽”的本地 verification。后续如果要把 report 存库，仍可复用同一个 digest 规则。

## 6. Markdown report

文件：

```text
src/services/operationPreflightReport.ts
```

Markdown 入口：

```ts
export function renderOperationPreflightReportMarkdown(report: OperationPreflightReport): string {
  return [
    "# Operation preflight report",
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- State: ${report.state}`,
    `- Intent id: ${report.intentId}`,
    `- Action: ${report.summary.action}`,
    `- Target: ${report.summary.target}`,
    `- Risk: ${report.summary.risk}`,
    `- Preflight digest: ${report.preflightDigest.algorithm}:${report.preflightDigest.value}`,
    `- Ready for dry-run dispatch: ${report.summary.readyForDryRunDispatch}`,
```

报告分为：

```text
Policy And Confirmation
Safety Flags
Dispatch History
Evidence
Hard Blockers
Warnings
Next Actions
```

这正好对应 v59 preflight bundle 的核心信息。

## 7. Evidence 细节摘要

文件：

```text
src/services/operationPreflightReport.ts
```

报告不会把完整 JSON 全部展开，而是提炼重点：

```ts
if (Array.isArray(details.matchedCommands)) {
  const names = details.matchedCommands
    .filter(isRecord)
    .map((command) => typeof command.name === "string" ? command.name : undefined)
    .filter((name): name is string => name !== undefined);
  if (names.length > 0) {
    lines.push(`- Matched commands: ${names.join(", ")}`);
  }
}
```

对于 mini-kv key inventory：

```ts
if (isRecord(details.inventory)) {
  const keyCount = details.inventory.key_count;
  const truncated = details.inventory.truncated;
  if (typeof keyCount === "number") {
    lines.push(`- Key count: ${keyCount}`);
  }
  if (typeof truncated === "boolean") {
    lines.push(`- Truncated: ${truncated}`);
  }
}
```

对于 Java readiness：

```ts
if (isRecord(details.readiness)) {
  const eligible = details.readiness.eligibleForReplay;
  if (typeof eligible === "boolean") {
    lines.push(`- Eligible for replay: ${eligible}`);
  }
}
```

这样报告既有摘要，也能通过 JSON report 追溯完整 evidence。

## 8. 路由：report 和 verification

文件：

```text
src/routes/operationPreflightRoutes.ts
```

新增 report endpoint：

```ts
app.get<{ Params: IntentParams; Querystring: PreflightReportQuery }>("/api/v1/operation-intents/:intentId/preflight/report", {
```

核心处理：

```ts
const report = createOperationPreflightReport(await preflight.create({
  intentId: request.params.intentId,
  failedEventId: request.query.failedEventId,
  keyPrefix: request.query.keyPrefix,
}));

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOperationPreflightReportMarkdown(report);
}

return report;
```

新增 verification endpoint：

```ts
app.get<{ Params: IntentParams; Querystring: PreflightReportQuery }>("/api/v1/operation-intents/:intentId/preflight/verification", {
```

verification 支持 JSON，也支持 Markdown。

## 9. Dashboard：报告入口

文件：

```text
src/ui/dashboard.ts
```

Intent 区新增：

```html
<button data-action="intentPreflightReport">Report</button>
<button data-action="intentPreflightVerification">Verify Report</button>
```

Report 按钮默认请求 Markdown：

```js
query.set("format", "markdown");
const response = await fetch("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/preflight/report?" + query.toString());
```

这样 Dashboard 输出框里可以直接看到可读的 preflight report。

## 10. 测试覆盖

文件：

```text
test/operationPreflight.test.ts
```

新增 report service 测试：

```ts
expect(report.preflightDigest.value).toMatch(/^[a-f0-9]{64}$/);
expect(verification).toMatchObject({
  service: "orderops-node",
  valid: true,
  intentId: intent.id,
  storedDigest: report.preflightDigest,
  recomputedDigest: report.preflightDigest,
});
```

新增 route 测试：

```ts
const markdownReport = await app.inject({
  method: "GET",
  url: `/api/v1/operation-intents/${intent.id}/preflight/report?format=markdown&keyPrefix=orderops:`,
});
```

验证 Markdown：

```ts
expect(markdownReport.headers["content-type"]).toContain("text/markdown");
expect(markdownReport.body).toContain("# Operation preflight report");
expect(markdownReport.body).toContain(`- Preflight digest: sha256:${jsonReport.json().preflightDigest.value}`);
```

并更新 `test/dashboard.test.ts`，确认 Dashboard 里有 report 和 verification 按钮。

## 11. 本版不做

```text
不执行真实上游动作
不把报告写入数据库
不修改 Java 项目
不修改 mini-kv 项目
不做多 intent 批量报告
```

一句话总结：v60 把 v59 的 preflight JSON 变成“可读、可验、可归档”的报告层，继续为真实执行前的控制面闭环打基础。
