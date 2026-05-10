# 20 - V16 ops checkpoint diff

V16 在 V15 checkpoint ledger 之后，新增本地 checkpoint diff：

```text
GET /api/v1/ops/checkpoints/diff?baseId=...&targetId=...
```

它比较两个已保存 checkpoint 的 `decision`、`signals`、`runbook.totals` 和 runbook step 状态变化。这个接口只读取 Node 内存里的 checkpoint，不访问 Java / mini-kv。

## 1. Diff 方向

文件：`src/services/opsCheckpointDiff.ts`

V16 定义了四种变化方向：

```ts
export type OpsCheckpointDiffDirection = "improved" | "regressed" | "unchanged" | "changed";
```

含义是：

- `improved`：目标 checkpoint 比基准更好。
- `regressed`：目标 checkpoint 比基准更差。
- `unchanged`：没有变化。
- `changed`：发生变化，但无法简单归为好或坏。

## 2. 值变化结构

文件：`src/services/opsCheckpointDiff.ts`

```ts
export interface OpsCheckpointValueChange<T = number | boolean | string> {
  from: T;
  to: T;
  delta?: number;
  direction: OpsCheckpointDiffDirection;
}
```

数字变化会带 `delta`，例如 `blockedIntents: 0 -> 1` 时 `delta=1`。

## 3. Step 变化结构

文件：`src/services/opsCheckpointDiff.ts`

```ts
export interface OpsCheckpointStepChange {
  id: string;
  title: string;
  status: OpsCheckpointValueChange<OpsRunbookStepStatus>;
}
```

它专门记录 runbook step 状态变化，例如：

```text
BLOCKED_INTENTS: done -> todo
```

## 4. Diff 输出结构

文件：`src/services/opsCheckpointDiff.ts`

```ts
export interface OpsCheckpointDiff {
  service: "orderops-node";
  generatedAt: string;
  base: {
    id: string;
    sequence: number;
    digest: string;
    createdAt: string;
  };
  target: {
    id: string;
    sequence: number;
    digest: string;
    createdAt: string;
  };
  direction: OpsCheckpointDiffDirection;
```

`base` 是旧 checkpoint，`target` 是新 checkpoint。

## 5. decision diff

文件：`src/services/opsCheckpointDiff.ts`

V16 会比较 V15 checkpoint 的决策摘要：

```ts
decision: {
  readinessState: OpsCheckpointValueChange;
  runbookState: OpsCheckpointValueChange;
  readyForExecution: OpsCheckpointValueChange<boolean>;
  blockers: OpsCheckpointValueChange<number>;
  todos: OpsCheckpointValueChange<number>;
};
```

创建 diff 时：

```ts
const decision = {
  readinessState: compareRankedValue(base.decision.readinessState, target.decision.readinessState, stateRank),
  runbookState: compareRankedValue(base.decision.runbookState, target.decision.runbookState, stateRank),
  readyForExecution: compareBooleanReady(base.decision.readyForExecution, target.decision.readyForExecution),
  blockers: compareNumber(base.decision.blockers, target.decision.blockers, lowerIsBetter),
  todos: compareNumber(base.decision.todos, target.decision.todos, lowerIsBetter),
};
```

这里 `blockers` 和 `todos` 是越低越好。

## 6. 状态排名

文件：`src/services/opsCheckpointDiff.ts`

readiness/runbook 状态用 rank 比较：

```ts
const stateRank: Record<string, number> = {
  blocked: 0,
  "action-required": 1,
  warning: 1,
  ready: 2,
};
```

step 状态也有 rank：

```ts
const stepStatusRank: Record<OpsRunbookStepStatus, number> = {
  blocked: 0,
  todo: 1,
  info: 2,
  done: 3,
};
```

所以 `done -> todo` 会被判断为 regression。

## 7. signals diff

文件：`src/services/opsCheckpointDiff.ts`

signals 来自 V15 checkpoint 里的 `snapshot.summary.signals`：

```ts
const signals = compareNumberRecord(
  base.snapshot.summary.signals,
  target.snapshot.summary.signals,
  (_key, from, to) => lowerIsBetter(from, to),
);
```

这里所有 signal 都按“数值越低越好”处理，比如：

- `blockedIntents`
- `pendingConfirmations`
- `rejectedDispatches`
- `rateLimitedRequests`
- `upstreamTouchedDispatches`

## 8. runbook totals diff

文件：`src/services/opsCheckpointDiff.ts`

runbook totals 有些是越低越好，有些不是：

```ts
const runbookTotals = compareNumberRecord(base.snapshot.runbook.totals, target.snapshot.runbook.totals, totalsDirection);
```

`done` 越高越好：

```ts
if (key === "done") {
  if (to === from) {
    return "unchanged";
  }

  return to > from ? "improved" : "regressed";
}
```

`steps` 和 `info` 只标记为 `changed`：

```ts
if (key === "steps" || key === "info") {
  return to === from ? "unchanged" : "changed";
}
```

其他如 `blocked`、`todo` 仍然是越低越好。

## 9. stepChanges

文件：`src/services/opsCheckpointDiff.ts`

V16 把 base 的步骤先建成 Map：

```ts
const baseSteps = new Map(base.snapshot.runbook.steps.map((step) => [step.id, step]));
```

然后遍历 target：

```ts
return target.snapshot.runbook.steps
  .map((targetStep) => {
    const baseStep = baseSteps.get(targetStep.id);
    if (baseStep === undefined || baseStep.status === targetStep.status) {
      return undefined;
    }
```

只有状态变化的 step 才会进入 `stepChanges`：

```ts
return {
  id: targetStep.id,
  title: targetStep.title,
  status: compareRankedValue(baseStep.status, targetStep.status, stepStatusRank),
};
```

## 10. 总方向

文件：`src/services/opsCheckpointDiff.ts`

总体方向遵循一个保守规则：

```ts
function summarizeDirection(directions: OpsCheckpointDiffDirection[]): OpsCheckpointDiffDirection {
  if (directions.includes("regressed")) {
    return "regressed";
  }

  if (directions.includes("improved")) {
    return "improved";
  }
```

只要有 regression，总体就是 `regressed`。这符合控制面安全思路：先看风险有没有变差。

## 11. Route

文件：`src/routes/opsSummaryRoutes.ts`

V16 新增 query：

```ts
interface DiffOpsCheckpointQuery {
  baseId: string;
  targetId: string;
}
```

路由 schema 要求两个 id：

```ts
required: ["baseId", "targetId"],
```

处理逻辑：

```ts
app.get<{ Querystring: DiffOpsCheckpointQuery }>("/api/v1/ops/checkpoints/diff", {
```

```ts
}, async (request) => createOpsCheckpointDiff(
  deps.opsCheckpoints.get(request.query.baseId),
  deps.opsCheckpoints.get(request.query.targetId),
));
```

这个固定路由必须放在 `:checkpointId` 路由前面，否则 `diff` 会被当成 checkpoint id。

## 12. Dashboard

文件：`src/ui/dashboard.ts`

V16 新增按钮：

```html
<button data-action="opsDiffCheckpoints">Diff Latest</button>
```

点击后先取最新两个 checkpoint：

```js
const listed = await api("/api/v1/ops/checkpoints?limit=2");
```

不足两个时直接给本地提示：

```js
write({ error: "NEED_TWO_CHECKPOINTS", message: "Create at least two checkpoints before diffing." });
```

有两个时，拿较老的做 base，较新的做 target：

```js
const target = listed.checkpoints[0];
const base = listed.checkpoints[1];
write(await api("/api/v1/ops/checkpoints/diff?baseId=" + encodeURIComponent(base.id) + "&targetId=" + encodeURIComponent(target.id)));
```

## 13. 测试覆盖

文件：`test/opsCheckpointDiff.test.ts`

第一个测试先创建一个 checkpoint，再制造 blocked intent，再创建第二个 checkpoint：

```ts
const base = await app.inject({
  method: "POST",
  url: "/api/v1/ops/checkpoints",
```

然后读取 diff：

```ts
const diff = await app.inject({
  method: "GET",
  url: `/api/v1/ops/checkpoints/diff?baseId=${base.json().id}&targetId=${target.json().id}`,
});
```

断言 `blockedIntents` 从 0 到 1：

```ts
blockedIntents: {
  from: 0,
  to: 1,
  delta: 1,
  direction: "regressed",
},
```

并且 `BLOCKED_INTENTS` step 从 done 变成 todo：

```ts
expect.objectContaining({
  id: "BLOCKED_INTENTS",
  status: expect.objectContaining({
    from: "done",
    to: "todo",
    direction: "regressed",
  }),
}),
```

第二个测试创建两个状态相同的 checkpoint，diff 必须 unchanged：

```ts
expect(diff.json()).toMatchObject({
  direction: "unchanged",
  summary: {
    changedSignals: 0,
    changedRunbookTotals: 0,
    changedSteps: 0,
```

## 一句话总结

V16 让 V15 的 checkpoint 不只是“留证”，还能做“对比”：两次调试之间哪些安全信号变好、变差或没变，一眼能看到。
