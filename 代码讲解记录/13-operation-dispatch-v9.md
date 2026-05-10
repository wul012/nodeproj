# 13 - V9 本地 dry-run dispatch ledger

V9 给 confirmed intent 增加一个“本地 dispatch ledger”。它的作用不是执行 Java / mini-kv，而是把“准备派发执行”这件事变成一条可查询的本地记录。

默认情况下，`UPSTREAM_ACTIONS_ENABLED=false` 时 intent 会是 `blocked`，dispatch 会返回 rejected；如果在测试里把 action gate 打开，让 intent 能进入 confirmed，dispatch 也只会变成 `dry-run-completed`，不会触碰上游。

## 1. Dispatch 状态

文件：`src/services/operationDispatch.ts`

V9 的 dispatch 只有两种状态：

```ts
export type OperationDispatchStatus = "rejected" | "dry-run-completed";
```

模式也只有一种：

```ts
export type OperationDispatchMode = "dry-run";
```

这明确表达：当前版本不是执行器，而是执行前的本地 ledger。

## 2. Dispatch 结构

文件：`src/services/operationDispatch.ts`

```ts
export interface OperationDispatch {
  id: string;
  intentId: string;
  action: ActionKey;
  target: ActionTarget;
  mode: OperationDispatchMode;
  status: OperationDispatchStatus;
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
  upstreamTouched: false;
  nodeRoute: OperationIntent["plan"]["nodeRoute"];
  wouldCall: OperationIntent["plan"]["wouldCall"];
  safety: OperationIntent["plan"]["safety"];
  rejection?: {
    code: string;
    message: string;
    intentStatus: OperationIntent["status"];
  };
}
```

这里最关键的字段是：

```ts
upstreamTouched: false;
```

V9 每条 dispatch 都明确声明没有触碰上游。

## 3. 创建 dispatch 时先取 intent

文件：`src/services/operationDispatch.ts`

```ts
const intent = this.intents.get(input.intentId);
```

这里拿的是 intent 的快照，dispatch 只读取 plan 里的 `nodeRoute`、`wouldCall`、`safety`，不调用 `OrderPlatformClient`，也不调用 `MiniKvClient`。

基础字段来自 intent：

```ts
const base = {
  id: crypto.randomUUID(),
  intentId: intent.id,
  action: intent.plan.action,
  target: intent.plan.target,
  mode,
  requestedBy,
  createdAt: now,
  updatedAt: now,
  upstreamTouched: false as const,
  nodeRoute: { ...intent.plan.nodeRoute },
  wouldCall: structuredClone(intent.plan.wouldCall),
  safety: { ...intent.plan.safety },
};
```

## 4. 非 confirmed intent 会被拒绝

文件：`src/services/operationDispatch.ts`

```ts
if (intent.status !== "confirmed") {
  const dispatch: OperationDispatch = {
    ...base,
    status: "rejected",
    rejection: {
      code: "INTENT_NOT_CONFIRMED",
      message: "Only confirmed operation intents can be dispatched",
      intentStatus: intent.status,
    },
  };
```

然后记录到 ledger：

```ts
this.save(dispatch);
```

同时写入 intent timeline：

```ts
this.intents.recordDispatchEvent(intent.id, "intent.dispatch.rejected", "Dispatch was rejected because the intent is not confirmed", {
  dispatchId: dispatch.id,
  requestedBy,
  intentStatus: intent.status,
});
```

这样 blocked intent 被 dispatch 的尝试也会留下痕迹。

## 5. confirmed intent 只做 dry-run completed

文件：`src/services/operationDispatch.ts`

```ts
const dispatch: OperationDispatch = {
  ...base,
  status: "dry-run-completed",
};
```

然后写 timeline：

```ts
this.intents.recordDispatchEvent(intent.id, "intent.dispatch.dry_run_completed", "Dry-run dispatch completed without touching the upstream", {
  dispatchId: dispatch.id,
  requestedBy,
  upstreamTouched: false,
});
```

这说明 dispatch 生命周期已经跑通，但仍然不执行真实网络调用。

## 6. IntentStore 开放 dispatch 事件入口

文件：`src/services/operationIntent.ts`

V9 给 intent store 加了一个很窄的事件写入口：

```ts
recordDispatchEvent(
  intentId: string,
  type: Extract<OperationIntentEventType, "intent.dispatch.rejected" | "intent.dispatch.dry_run_completed">,
  message: string,
  details?: Record<string, unknown>,
): void {
  const intent = this.requireIntent(intentId);
  this.recordEvent(intent, type, message, details);
}
```

注意它只允许 dispatch 相关事件，不把通用 `recordEvent` 暴露出去。

## 7. 新增 dispatch 路由

文件：`src/routes/operationDispatchRoutes.ts`

V9 新增：

```ts
GET  /api/v1/operation-dispatches
GET  /api/v1/operation-dispatches/:dispatchId
GET  /api/v1/operation-intents/:intentId/dispatches
POST /api/v1/operation-dispatches
POST /api/v1/operation-intents/:intentId/dispatch
```

创建 dispatch 的路由：

```ts
app.post<{ Body: CreateDispatchBody }>("/api/v1/operation-dispatches", {
  schema: {
    body: {
      type: "object",
      required: ["intentId", "requestedBy"],
      properties: {
        intentId: { type: "string", minLength: 1 },
        requestedBy: { type: "string", minLength: 1, maxLength: 80 },
        mode: { type: "string", enum: ["dry-run"] },
      },
      additionalProperties: false,
    },
  },
}, async (request, reply) => {
  const dispatch = deps.operationDispatches.create(request.body);
  if (dispatch.status === "rejected") {
    reply.code(409);
    return dispatch;
  }

  reply.code(201);
  return dispatch;
});
```

rejected 返回 409，dry-run completed 返回 201。

## 8. app.ts 装配

文件：`src/app.ts`

V9 创建 dispatch ledger：

```ts
const operationIntents = new OperationIntentStore(config);
const operationDispatches = new OperationDispatchLedger(operationIntents);
```

然后注册路由：

```ts
await registerOperationIntentRoutes(app, { operationIntents });
await registerOperationDispatchRoutes(app, { operationDispatches });
```

## 9. Dashboard 入口

文件：`src/ui/dashboard.ts`

V9 在 intent 操作区加了：

```html
<button class="primary" data-action="dispatchIntent">Dispatch Dry Run</button>
<button data-action="listDispatches">Dispatches</button>
```

点击 dispatch：

```js
if (action === "dispatchIntent") {
  write(await api("/api/v1/operation-dispatches", {
    method: "POST",
    body: JSON.stringify({
      intentId: $("intentId").value,
      requestedBy: $("operatorId").value || "dashboard",
      mode: "dry-run",
    }),
  }));
}
```

## 10. 测试覆盖

文件：`test/operationDispatch.test.ts`

blocked intent dispatch 会被拒绝：

```ts
expect(dispatch).toMatchObject({
  intentId: intent.id,
  status: "rejected",
  mode: "dry-run",
  upstreamTouched: false,
  rejection: {
    code: "INTENT_NOT_CONFIRMED",
    intentStatus: "blocked",
  },
});
```

confirmed intent dispatch 会 dry-run completed：

```ts
expect(dispatch).toMatchObject({
  intentId: intent.id,
  status: "dry-run-completed",
  mode: "dry-run",
  upstreamTouched: false,
});
```

并且 timeline 会记录：

```ts
"intent.dispatch.dry_run_completed"
```

## 一句话总结

V9 把“确认之后准备执行”也纳入本地可追踪流程，但仍然不触碰 Java / mini-kv，为后面真正接执行器、审批队列或持久化 outbox 留了清晰入口。
