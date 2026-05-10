# 19 - V15 ops checkpoints

V15 在 V13 handoff report 和 V14 runbook checklist 之后，新增了本地 checkpoint ledger：

```text
POST /api/v1/ops/checkpoints
GET  /api/v1/ops/checkpoints
GET  /api/v1/ops/checkpoints/:checkpointId
```

它的作用是把当前 Node 控制面的 `summary`、`readiness`、`runbook` 固化成一条内存检查点，并计算 SHA-256 摘要。它不调用 Java / mini-kv，也不执行代理路由。

## 1. checkpoint 输入

文件：`src/services/opsCheckpoint.ts`

```ts
export interface CreateOpsCheckpointInput {
  actor?: string;
  note?: string;
  summary: OpsSummary;
  readiness: OpsReadiness;
  runbook: OpsRunbook;
}
```

这里的 `summary`、`readiness`、`runbook` 都由 route 从本地内存生成。

`actor` 和 `note` 是给调试归档看的：

- `actor`：谁创建的 checkpoint。
- `note`：这次 checkpoint 的说明。

## 2. checkpoint 输出

文件：`src/services/opsCheckpoint.ts`

```ts
export interface OpsCheckpoint {
  service: "orderops-node";
  id: string;
  sequence: number;
  createdAt: string;
  actor: string;
  note: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
```

每条 checkpoint 都有：

- `id`：UUID。
- `sequence`：本地递增序号。
- `digest.value`：64 位十六进制 SHA-256。

## 3. decision 摘要

文件：`src/services/opsCheckpoint.ts`

checkpoint 里不只保存完整快照，也抽出一个决策摘要：

```ts
decision: {
  readinessState: OpsReadiness["state"];
  runbookState: OpsRunbook["state"];
  readyForExecution: boolean;
  blockers: number;
  todos: number;
};
```

创建时这样计算：

```ts
decision: {
  readinessState: input.readiness.state,
  runbookState: input.runbook.state,
  readyForExecution: input.readiness.readyForUpstreamExecution && input.runbook.readyForExecution,
  blockers: input.readiness.blockers + input.runbook.totals.blocked,
  todos: input.runbook.totals.todo,
},
```

这让列表页不用展开完整 snapshot，也能知道当时是否可执行。

## 4. 完整 snapshot

文件：`src/services/opsCheckpoint.ts`

checkpoint 保存三个完整对象：

```ts
snapshot: {
  summary: structuredClone(input.summary),
  readiness: structuredClone(input.readiness),
  runbook: structuredClone(input.runbook),
},
```

这里用 `structuredClone`，避免后续内存对象变化时影响已经创建的 checkpoint。

## 5. 计算 SHA-256

文件：`src/services/opsCheckpoint.ts`

创建 checkpoint 时先放一个空摘要：

```ts
digest: {
  algorithm: "sha256",
  value: "",
},
```

然后计算：

```ts
checkpoint.digest.value = digestCheckpoint(checkpoint);
```

摘要函数：

```ts
function digestCheckpoint(checkpoint: OpsCheckpoint): string {
  return createHash("sha256")
    .update(stableJson({
      sequence: checkpoint.sequence,
      createdAt: checkpoint.createdAt,
      actor: checkpoint.actor,
      note: checkpoint.note,
      decision: checkpoint.decision,
      snapshot: checkpoint.snapshot,
    }))
    .digest("hex");
}
```

这里没有把 `id` 放进摘要，因为 `id` 是存取标识；摘要更关注“这次捕获的内容”。

## 6. stableJson

文件：`src/services/opsCheckpoint.ts`

为了让对象 key 顺序稳定，V15 写了一个小的稳定 JSON 序列化：

```ts
function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }
```

对象按 key 排序：

```ts
return `{${Object.keys(record)
  .sort()
  .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
  .join(",")}}`;
```

最后普通值走 `JSON.stringify`：

```ts
return JSON.stringify(value);
```

这比直接 `JSON.stringify(object)` 更适合做摘要输入。

## 7. 内存 ledger

文件：`src/services/opsCheckpoint.ts`

ledger 使用 `Map` 保存 checkpoint：

```ts
export class OpsCheckpointLedger {
  private readonly checkpoints = new Map<string, OpsCheckpoint>();
  private nextSequence = 1;
```

默认容量是 100：

```ts
constructor(private readonly capacity = 100) {
```

创建时 sequence 递增：

```ts
const sequence = this.nextSequence;
this.nextSequence += 1;
```

超过容量时删除最老的：

```ts
const oldest = [...this.checkpoints.values()].sort((left, right) => left.sequence - right.sequence);
for (const checkpoint of oldest.slice(0, this.checkpoints.size - this.capacity)) {
  this.checkpoints.delete(checkpoint.id);
}
```

## 8. 列表和读取

文件：`src/services/opsCheckpoint.ts`

列表默认最新在前：

```ts
return [...this.checkpoints.values()]
  .sort((left, right) => right.sequence - left.sequence)
  .slice(0, safeLimit)
  .map(cloneCheckpoint);
```

读取不存在的 checkpoint 时抛业务错误：

```ts
throw new AppHttpError(404, "OPS_CHECKPOINT_NOT_FOUND", "Ops checkpoint was not found", { id });
```

`app.ts` 的统一错误处理会把它转成 JSON 404。

## 9. app 注入

文件：`src/app.ts`

V15 在应用启动时创建 checkpoint ledger：

```ts
const opsCheckpoints = new OpsCheckpointLedger();
```

然后注入 ops routes：

```ts
await registerOpsSummaryRoutes(app, { config, auditLog, operationIntents, operationDispatches, opsCheckpoints, snapshots });
```

这保持了项目之前的依赖注入风格。

## 10. Route

文件：`src/routes/opsSummaryRoutes.ts`

列表接口：

```ts
app.get<{ Querystring: ListOpsCheckpointQuery }>("/api/v1/ops/checkpoints", {
```

单条读取：

```ts
app.get<{ Params: OpsCheckpointParams }>("/api/v1/ops/checkpoints/:checkpointId", async (request) =>
  deps.opsCheckpoints.get(request.params.checkpointId));
```

创建接口：

```ts
app.post<{ Body: CreateOpsCheckpointBody }>("/api/v1/ops/checkpoints", {
```

创建时只读取本地 summary/readiness/runbook：

```ts
const summary = createOpsSummary(deps);
const readiness = createOpsReadiness(summary);
const checkpoint = deps.opsCheckpoints.create({
  actor: request.body?.actor,
  note: request.body?.note,
  summary,
  readiness,
  runbook: createOpsRunbook(summary, readiness),
});
```

注意：这里没有调用 `deps.snapshots.sample()`，所以不会触发上游探测。

## 11. Dashboard

文件：`src/ui/dashboard.ts`

V15 新增两个按钮：

```html
<button data-action="opsCreateCheckpoint">Create Checkpoint</button>
<button data-action="opsListCheckpoints">Checkpoints</button>
```

创建 checkpoint 时复用页面上的 operator 和 reason：

```js
if (action === "opsCreateCheckpoint") {
  write(await api("/api/v1/ops/checkpoints", {
    method: "POST",
    body: JSON.stringify({
      actor: $("operatorId").value || "dashboard",
      note: $("intentReason").value || "dashboard checkpoint",
    }),
  }));
}
```

列表：

```js
if (action === "opsListCheckpoints") {
  write(await api("/api/v1/ops/checkpoints?limit=10"));
}
```

## 12. 测试覆盖

文件：`test/opsCheckpoint.test.ts`

创建 checkpoint 后，测试断言摘要存在：

```ts
expect(checkpoint.json().digest.value).toMatch(/^[a-f0-9]{64}$/);
```

断言 blocked intent 被固化到 snapshot：

```ts
snapshot: {
  summary: {
    signals: {
      blockedIntents: 1,
      upstreamTouchedDispatches: 0,
    },
  },
```

列表最新在前：

```ts
expect(listed.json().checkpoints.map((checkpoint: { sequence: number }) => checkpoint.sequence)).toEqual([2, 1]);
```

404 测试：

```ts
expect(response.json()).toMatchObject({
  error: "OPS_CHECKPOINT_NOT_FOUND",
});
```

## 一句话总结

V15 把“当前控制面状态”固化成带 SHA-256 摘要的本地 checkpoint；它方便之后做对比、归档和交接，同时仍然不触碰 Java / mini-kv。
