# 18 - V14 ops runbook checklist

V14 在 V12 readiness 和 V13 handoff report 之后，新增了本地 runbook checklist：

```text
GET /api/v1/ops/runbook
GET /api/v1/ops/runbook?format=markdown
```

它把 summary/readiness 里的信号整理成操作员可读的预检步骤：哪些是 blocked，哪些是 todo，哪些已 done，哪些只是 info。它不访问 Java / mini-kv，也不执行真实上游动作。

## 1. 状态类型

文件：`src/services/opsRunbook.ts`

Runbook 有三个总状态：

```ts
export type OpsRunbookState = "blocked" | "action-required" | "ready";
```

每个步骤有四种状态：

```ts
export type OpsRunbookStepStatus = "blocked" | "todo" | "done" | "info";
```

含义是：

- `blocked`：必须先解除，否则不能进入执行阶段。
- `todo`：没有硬阻断，但还需要操作员处理。
- `done`：该步骤通过。
- `info`：提示性步骤，不影响 ready。

## 2. 单个步骤结构

文件：`src/services/opsRunbook.ts`

```ts
export interface OpsRunbookStep {
  id: string;
  title: string;
  status: OpsRunbookStepStatus;
  detail: string;
  evidence?: number | boolean | string;
  nextAction?: string;
}
```

`evidence` 保存判断依据，例如 `UPSTREAM_ACTIONS_ENABLED=false` 或 `dryRunDispatches=0`。

`nextAction` 保存下一步建议，通常来自 V12 readiness 的 `nextActions`。

## 3. Runbook 响应结构

文件：`src/services/opsRunbook.ts`

```ts
export interface OpsRunbook {
  service: "orderops-node";
  generatedAt: string;
  state: OpsRunbookState;
  readyForExecution: boolean;
  totals: {
    steps: number;
    blocked: number;
    todo: number;
    done: number;
    info: number;
  };
  steps: OpsRunbookStep[];
```

它还带一份简化 summary：

```ts
summary: {
  readinessState: OpsReadiness["state"];
  readyForUpstreamExecution: boolean;
  safety: OpsSummary["safety"];
  signals: OpsSummary["signals"];
};
```

所以调用方既能看 checklist，也能看到原始信号来源。

## 4. 创建 runbook

文件：`src/services/opsRunbook.ts`

核心函数先构建步骤，再统计状态：

```ts
export function createOpsRunbook(summary: OpsSummary, readiness: OpsReadiness): OpsRunbook {
  const steps = buildSteps(summary, readiness);
  const blocked = countStatus(steps, "blocked");
  const todo = countStatus(steps, "todo");
  const done = countStatus(steps, "done");
  const info = countStatus(steps, "info");
```

总状态由步骤决定：

```ts
const state: OpsRunbookState = blocked > 0 ? "blocked" : todo > 0 ? "action-required" : "ready";
```

只有 `state === "ready"` 才算真正可执行：

```ts
readyForExecution: state === "ready",
```

这里比 V12 readiness 更偏操作流程：V12 的 dry-run 缺失只是 info，V14 的 runbook 会把它升级成 todo。

## 5. 复用 readiness 的 nextAction

文件：`src/services/opsRunbook.ts`

Runbook 不重复硬编码所有建议，而是先从 readiness checks 建一个映射：

```ts
const nextActionByCode = new Map(readiness.checks.map((check) => [check.code, check.nextAction]));
```

例如动作闸门步骤复用 `UPSTREAM_ACTION_GATE` 的 nextAction：

```ts
nextAction: nextActionByCode.get("UPSTREAM_ACTION_GATE"),
```

这样 V12 的判断逻辑和 V14 的操作清单保持一致。

## 6. 动作闸门步骤

文件：`src/services/opsRunbook.ts`

默认 `UPSTREAM_ACTIONS_ENABLED=false` 时，runbook 是 blocked：

```ts
{
  id: "ACTION_GATE",
  title: "Open upstream action gate only during an integration window",
  status: summary.safety.upstreamActionsEnabled ? "done" : "blocked",
  detail: summary.safety.upstreamActionsEnabled
    ? "UPSTREAM_ACTIONS_ENABLED is true."
    : "UPSTREAM_ACTIONS_ENABLED is false, so real upstream execution is blocked.",
  evidence: summary.safety.upstreamActionsEnabled,
  nextAction: nextActionByCode.get("UPSTREAM_ACTION_GATE"),
},
```

这是保护 Java 高并发项目和 mini_kv 的第一道门。

## 7. 探测模式步骤

文件：`src/services/opsRunbook.ts`

probe 关闭时不是硬阻断，而是 todo：

```ts
{
  id: "PROBE_MODE",
  title: "Decide whether live upstream probes are allowed",
  status: summary.safety.upstreamProbesEnabled ? "done" : "todo",
```

原因是不开 probe 仍然可以做本地控制面开发，但如果要进入集成窗口，就要明确是否允许探测真实上游。

## 8. dry-run 证据步骤

文件：`src/services/opsRunbook.ts`

V14 新增的关键价值是把 dry-run 变成 checklist 里的必做项：

```ts
{
  id: "DRY_RUN_EVIDENCE",
  title: "Complete at least one confirmed dry-run dispatch",
  status: summary.signals.dryRunDispatches > 0 ? "done" : "todo",
  detail: "Dry-run dispatch proves the local intent -> confirmation -> dispatch path before real execution.",
  evidence: summary.signals.dryRunDispatches,
```

如果还没有 dry-run，会给出具体下一步：

```ts
nextAction: summary.signals.dryRunDispatches > 0
  ? undefined
  : "Create a confirmable intent, confirm it with the exact phrase, then dispatch in dry-run mode.",
```

## 9. 本地异常信号步骤

文件：`src/services/opsRunbook.ts`

pending confirmation：

```ts
id: "PENDING_CONFIRMATIONS",
status: summary.signals.pendingConfirmations === 0 ? "done" : "todo",
```

blocked intent：

```ts
id: "BLOCKED_INTENTS",
status: summary.signals.blockedIntents === 0 ? "done" : "todo",
```

rejected dispatch：

```ts
id: "REJECTED_DISPATCHES",
status: summary.signals.rejectedDispatches === 0 ? "done" : "todo",
```

rate limit：

```ts
id: "RATE_LIMITED_MUTATIONS",
status: summary.signals.rateLimitedRequests === 0 ? "done" : "todo",
```

这些信号不是硬阻断，但它们代表近期有异常操作痕迹，需要在真实执行前看一眼。

## 10. Markdown 输出

文件：`src/services/opsRunbook.ts`

V14 也支持 Markdown：

```ts
export function renderOpsRunbookMarkdown(runbook: OpsRunbook): string {
  return [
    "# OrderOps Runbook Checklist",
    "",
    `- Generated at: ${runbook.generatedAt}`,
    `- State: ${runbook.state}`,
```

每个 step 这样渲染：

```ts
return `- [${step.status}] ${step.id}: ${step.title}${evidence}\n  - ${step.detail}${nextAction}`;
```

这适合放进调试归档或交接说明。

## 11. Route

文件：`src/routes/opsSummaryRoutes.ts`

V14 新增 query：

```ts
interface OpsRunbookQuery {
  format?: "json" | "markdown";
}
```

路由只读取本地 summary/readiness：

```ts
const summary = createOpsSummary(deps);
const runbook = createOpsRunbook(summary, createOpsReadiness(summary));
```

如果请求 Markdown：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsRunbookMarkdown(runbook);
}
```

否则返回 JSON：

```ts
return runbook;
```

注意：这里没有调用 `deps.snapshots.sample()`，所以 runbook 本身连 probe 都不会触发。

## 12. Dashboard 入口

文件：`src/ui/dashboard.ts`

V14 增加按钮：

```html
<button data-action="opsRunbook">Runbook</button>
```

点击时读取 JSON：

```js
if (action === "opsRunbook") {
  write(await api("/api/v1/ops/runbook"));
}
```

这是一个只读入口。

## 13. 测试覆盖

文件：`test/opsRunbook.test.ts`

默认配置下必须 blocked：

```ts
expect(response.json()).toMatchObject({
  service: "orderops-node",
  state: "blocked",
  readyForExecution: false,
```

默认 checklist 应该包含：

```ts
expect.objectContaining({
  id: "ACTION_GATE",
  status: "blocked",
}),
```

当动作/探测闸门打开，并完成本地 dry-run dispatch 后，runbook 才 ready：

```ts
expect(response.json()).toMatchObject({
  state: "ready",
  readyForExecution: true,
  totals: {
    blocked: 0,
    todo: 0,
    info: 1,
  },
```

Markdown 测试：

```ts
expect(response.body).toContain("# OrderOps Runbook Checklist");
expect(response.body).toContain("- State: blocked");
expect(response.body).toContain("[blocked] ACTION_GATE");
```

## 一句话总结

V14 把 readiness 的机器判断变成了操作员可以逐项检查的 runbook checklist；它仍然只读 Node 本地状态，不触碰 Java / mini-kv。
