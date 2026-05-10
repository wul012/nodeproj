# 21 - V17 ops baseline tracking

V17 在 V15 checkpoint 和 V16 checkpoint diff 之后，新增本地 baseline tracking：

```text
GET    /api/v1/ops/baseline
PUT    /api/v1/ops/baseline
DELETE /api/v1/ops/baseline
```

它允许把某个 checkpoint 设为“本地基线”，之后用最新 checkpoint 和基线做 diff，判断当前状态是否 drifted。它只读取 Node 内存 checkpoint，不触碰 Java / mini-kv。

## 1. baseline 状态

文件：`src/services/opsBaseline.ts`

```ts
export type OpsBaselineState = "unset" | "current" | "drifted";
```

三个状态含义：

- `unset`：还没有设置 baseline。
- `current`：baseline 就是最新 checkpoint。
- `drifted`：最新 checkpoint 已经不是 baseline，需要看 diff。

## 2. baseline 输入

文件：`src/services/opsBaseline.ts`

```ts
export interface OpsBaselineInput {
  actor?: string;
  note?: string;
}
```

设置 baseline 时可以记录是谁设置的，以及原因说明。

## 3. baseline 引用

文件：`src/services/opsBaseline.ts`

Baseline 不复制完整 checkpoint，只保存引用和摘要：

```ts
export interface OpsBaselineRef {
  checkpointId: string;
  sequence: number;
  digest: string;
  checkpointCreatedAt: string;
  setAt: string;
  setBy: string;
  note: string;
}
```

这样 baseline 本身很轻量，真正 diff 时再从 checkpoint ledger 读取完整 checkpoint。

## 4. baseline status

文件：`src/services/opsBaseline.ts`

```ts
export interface OpsBaselineStatus {
  service: "orderops-node";
  generatedAt: string;
  state: OpsBaselineState;
  baseline?: OpsBaselineRef;
  latest?: {
    checkpointId: string;
    sequence: number;
    digest: string;
    createdAt: string;
  };
  diff?: OpsCheckpointDiff;
  guidance: string[];
}
```

如果已经有 baseline，且存在更新的 checkpoint，`diff` 会直接放进 status 响应里。

## 5. baseline store

文件：`src/services/opsBaseline.ts`

Store 只保存一个 baseline：

```ts
export class OpsBaselineStore {
  private baseline?: OpsBaselineRef;
```

设置 baseline：

```ts
set(checkpoint: OpsCheckpoint, input: OpsBaselineInput = {}): OpsBaselineRef {
  this.baseline = {
    checkpointId: checkpoint.id,
    sequence: checkpoint.sequence,
    digest: checkpoint.digest.value,
    checkpointCreatedAt: checkpoint.createdAt,
    setAt: new Date().toISOString(),
    setBy: normalizeActor(input.actor),
    note: normalizeNote(input.note),
  };
```

读取时返回浅拷贝：

```ts
get(): OpsBaselineRef | undefined {
  return this.baseline === undefined ? undefined : { ...this.baseline };
}
```

清除：

```ts
clear(): OpsBaselineRef | undefined {
  const cleared = this.get();
  this.baseline = undefined;
  return cleared;
}
```

## 6. status 生成

文件：`src/services/opsBaseline.ts`

未设置 baseline 时：

```ts
if (input.baseline === undefined) {
  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    state: "unset",
    latest: input.latest === undefined ? undefined : checkpointSummary(input.latest),
    guidance: ["Create a checkpoint and set it as the local baseline before tracking drift."],
  };
}
```

有 baseline 时，先找最新 checkpoint：

```ts
const latest = input.latest ?? input.baselineCheckpoint;
```

如果最新 checkpoint 不是 baseline，就调用 V16 的 diff：

```ts
const diff = input.baselineCheckpoint !== undefined && latest !== undefined && latest.id !== input.baselineCheckpoint.id
  ? createOpsCheckpointDiff(input.baselineCheckpoint, latest)
  : undefined;
```

状态由是否存在 diff 决定：

```ts
const state: OpsBaselineState = diff === undefined ? "current" : "drifted";
```

## 7. guidance

文件：`src/services/opsBaseline.ts`

baseline 仍然是最新 checkpoint 时：

```ts
return ["Baseline is the latest checkpoint; create a later checkpoint to detect drift."];
```

如果 diff 退化：

```ts
if (diff?.direction === "regressed") {
  return ["Latest checkpoint regressed from the baseline; review changed signals and runbook steps before promotion."];
}
```

如果 diff 改善：

```ts
if (diff?.direction === "improved") {
  return ["Latest checkpoint improved from the baseline; consider resetting the baseline after review."];
}
```

## 8. app 注入

文件：`src/app.ts`

V17 在应用启动时创建 baseline store：

```ts
const opsBaseline = new OpsBaselineStore();
```

然后注入 ops routes：

```ts
await registerOpsSummaryRoutes(app, { config, auditLog, operationIntents, operationDispatches, opsCheckpoints, opsBaseline, snapshots });
```

## 9. GET baseline

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get("/api/v1/ops/baseline", async () => {
  const baseline = deps.opsBaseline.get();
  const latest = deps.opsCheckpoints.list(1)[0];
  return createOpsBaselineStatus({
    baseline,
    baselineCheckpoint: baseline === undefined ? undefined : deps.opsCheckpoints.get(baseline.checkpointId),
    latest,
  });
});
```

这里的 `latest` 来自 checkpoint ledger 的最新一条。

## 10. PUT baseline

文件：`src/routes/opsSummaryRoutes.ts`

请求 body：

```ts
interface SetOpsBaselineBody {
  checkpointId: string;
  actor?: string;
  note?: string;
}
```

Schema 要求 `checkpointId`：

```ts
required: ["checkpointId"],
```

设置流程：

```ts
const baselineCheckpoint = deps.opsCheckpoints.get(request.body.checkpointId);
const baseline = deps.opsBaseline.set(baselineCheckpoint, request.body);
const latest = deps.opsCheckpoints.list(1)[0];

return createOpsBaselineStatus({
  baseline,
  baselineCheckpoint,
  latest,
});
```

如果 checkpoint 不存在，`deps.opsCheckpoints.get` 会返回 V15 定义的 404。

## 11. DELETE baseline

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.delete("/api/v1/ops/baseline", async () => {
  const cleared = deps.opsBaseline.clear();
  const latest = deps.opsCheckpoints.list(1)[0];

  return {
    cleared,
    ...createOpsBaselineStatus({ latest }),
  };
});
```

删除后状态回到 `unset`。

## 12. Dashboard

文件：`src/ui/dashboard.ts`

V17 新增两个按钮：

```html
<button data-action="opsSetBaseline">Set Baseline</button>
<button data-action="opsBaseline">Baseline</button>
```

设置 baseline 时，Dashboard 自动取最新 checkpoint：

```js
const listed = await api("/api/v1/ops/checkpoints?limit=1");
```

没有 checkpoint 时给本地提示：

```js
write({ error: "NEED_CHECKPOINT", message: "Create a checkpoint before setting the baseline." });
```

有 checkpoint 时调用 PUT：

```js
write(await api("/api/v1/ops/baseline", {
  method: "PUT",
  body: JSON.stringify({
    checkpointId: listed.checkpoints[0].id,
    actor: $("operatorId").value || "dashboard",
    note: $("intentReason").value || "dashboard baseline",
  }),
}));
```

## 13. 测试覆盖

文件：`test/opsBaseline.test.ts`

未设置 baseline：

```ts
expect(response.json()).toMatchObject({
  service: "orderops-node",
  state: "unset",
});
```

设置 checkpoint 为 baseline：

```ts
expect(baseline.json()).toMatchObject({
  state: "current",
  baseline: {
    checkpointId: checkpoint.json().id,
    sequence: 1,
    setBy: "baseline-admin",
    note: "set baseline",
  },
```

制造新 checkpoint 后，baseline 状态 drifted：

```ts
expect(baseline.json()).toMatchObject({
  state: "drifted",
  baseline: {
    checkpointId: base.json().id,
    sequence: 1,
  },
  latest: {
    checkpointId: target.json().id,
    sequence: 2,
  },
```

并且 diff 能看见 blocked intent 退化：

```ts
diff: {
  direction: "regressed",
  signals: {
    blockedIntents: {
      from: 0,
      to: 1,
      direction: "regressed",
    },
  },
},
```

清除 baseline：

```ts
expect(cleared.json()).toMatchObject({
  state: "unset",
  cleared: {
    checkpointId: checkpoint.json().id,
  },
});
```

## 一句话总结

V17 把 checkpoint diff 提升成了 baseline tracking：先定一个基准，再持续对比最新 checkpoint 是否发生 drift，适合长期调试和版本推进。
