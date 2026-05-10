# 11 - V7 操作意图时间线

V7 接在 V6 后面：V6 有了 operation intent 状态机，V7 给它补上“事件时间线”。

这版仍然只在 Node 内部记录事件，不执行 Java / mini-kv 上游动作，也不写磁盘。

## 1. 事件类型

文件：`src/services/operationIntent.ts`

V7 新增了 intent 事件类型：

```ts
export type OperationIntentEventType =
  | "intent.created"
  | "intent.blocked"
  | "intent.awaiting_confirmation"
  | "intent.confirmation.accepted"
  | "intent.confirmation.rejected"
  | "intent.expired";
```

这让一个 intent 不只是当前状态，而是能看到它怎么走到当前状态。

## 2. 事件结构

文件：`src/services/operationIntent.ts`

每条事件保存动作、目标、状态、操作者和说明：

```ts
export interface OperationIntentEvent {
  id: string;
  intentId: string;
  type: OperationIntentEventType;
  at: string;
  action: ActionKey;
  target: ActionTarget;
  status: OperationIntentStatus;
  actor: {
    id: string;
    role: OperatorRole;
  };
  message: string;
  details?: Record<string, unknown>;
}
```

这和 `mini-kv` 代码讲解里常见的“先看结构，再看流转”很像：结构定下来，后面的状态变化才容易读。

## 3. Store 里维护事件数组

文件：`src/services/operationIntent.ts`

V7 在 `OperationIntentStore` 里加了事件数组：

```ts
private readonly events: OperationIntentEvent[] = [];
private readonly maxEvents: number;
```

构造函数给默认值：

```ts
this.maxEvents = options.maxEvents ?? 1000;
```

也就是说它是内存事件流，最多保留 1000 条，重启会清空。后续要接 PostgreSQL 或 JSONL 时，可以把这里替换成持久化 repository。

## 4. 创建 intent 时记录事件

文件：`src/services/operationIntent.ts`

V6 创建 intent 后只保存 intent：

```ts
this.intents.set(intent.id, intent);
```

V7 在后面记录两类事件：

```ts
this.recordEvent(intent, "intent.created", "Operation intent was created", {
  reason: intent.reason,
});
```

然后根据策略结果记录 blocked 或等待确认：

```ts
this.recordEvent(
  intent,
  status === "blocked" ? "intent.blocked" : "intent.awaiting_confirmation",
  policy.message,
  policy.blockedBy ? { blockedBy: policy.blockedBy, requiredRole: policy.requiredRole } : { requiredRole: policy.requiredRole },
);
```

默认 `UPSTREAM_ACTIONS_ENABLED=false` 时，一个写操作 intent 会生成：

```text
intent.created
intent.blocked
```

## 5. 确认失败也会留下痕迹

文件：`src/services/operationIntent.ts`

如果 intent 不是 `pending-confirmation`，现在会先记事件，再抛错：

```ts
this.recordEvent(current, "intent.confirmation.rejected", "Confirmation was rejected because the intent is not confirmable", {
  attemptedBy: input.operatorId.trim(),
  status: current.status,
});
```

然后仍然返回 V6 的稳定错误：

```ts
throw new AppHttpError(409, "INTENT_NOT_CONFIRMABLE", "Operation intent is not waiting for confirmation", {
  intentId,
  status: current.status,
});
```

确认人不匹配也记录：

```ts
this.recordEvent(current, "intent.confirmation.rejected", "Confirmation was rejected because the operator did not match", {
  attemptedBy: input.operatorId.trim(),
});
```

确认短语不匹配也记录：

```ts
this.recordEvent(current, "intent.confirmation.rejected", "Confirmation was rejected because the phrase did not match", {
  attemptedBy: input.operatorId.trim(),
  requiredText: current.confirmation.requiredText,
});
```

这样后续排查“谁试图确认失败”就有基础。

## 6. 确认成功和过期事件

文件：`src/services/operationIntent.ts`

确认成功时：

```ts
this.recordEvent(current, "intent.confirmation.accepted", "Operation intent was confirmed", {
  confirmedBy: current.operator.id,
});
```

过期时：

```ts
this.recordEvent(intent, "intent.expired", "Operation intent expired before confirmation", {
  expiresAt: intent.expiresAt,
});
```

这里的 `expireIfNeeded` 只有状态从 `pending-confirmation` 变成 `expired` 时才记录，所以不会无限重复刷过期事件。

## 7. 查询事件和 timeline

文件：`src/services/operationIntent.ts`

事件流查询默认最新在前：

```ts
return this.events
  .filter((event) => query.intentId === undefined || event.intentId === query.intentId)
  .filter((event) => query.type === undefined || event.type === query.type)
  .slice(-safeLimit)
  .reverse()
  .map(cloneEvent);
```

单个 intent 的 timeline 则按生命周期顺序返回：

```ts
return {
  intent,
  events: this.listEvents({ intentId, limit }).reverse(),
};
```

所以：

- event feed：适合看最近发生了什么。
- timeline：适合看某个 intent 怎么一步步变化。

## 8. 路由

文件：`src/routes/operationIntentRoutes.ts`

V7 新增两个 API：

```ts
app.get<{ Querystring: ListIntentEventQuery }>("/api/v1/operation-intent-events", ...)
```

```ts
app.get<{ Params: IntentParams; Querystring: ListIntentQuery }>("/api/v1/operation-intents/:intentId/timeline", ...)
```

事件流支持 `intentId`、`type` 和 `limit`：

```ts
properties: {
  intentId: { type: "string", minLength: 1 },
  type: { type: "string", enum: intentEventTypes },
  limit: { type: "integer", minimum: 1, maximum: 1000 },
},
```

## 9. Dashboard 入口

文件：`src/ui/dashboard.ts`

V7 在 intent 操作区加了两个按钮：

```html
<button data-action="intentTimeline">Timeline</button>
<button data-action="intentEvents">Event Feed</button>
```

点击 timeline：

```js
if (action === "intentTimeline") {
  write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/timeline?limit=30"));
}
```

点击 event feed：

```js
if (action === "intentEvents") {
  write(await api("/api/v1/operation-intent-events?limit=30"));
}
```

## 10. 测试覆盖

文件：`test/operationIntent.test.ts`

默认动作闸门关闭时，事件流最新在前：

```ts
expect(store.listEvents({ intentId: intent.id }).map((event) => event.type)).toEqual([
  "intent.blocked",
  "intent.created",
]);
```

确认成功的 timeline 是生命周期顺序：

```ts
expect(store.getTimeline(intent.id).events.map((event) => event.type)).toEqual([
  "intent.created",
  "intent.awaiting_confirmation",
  "intent.confirmation.accepted",
]);
```

路由测试也覆盖了事件 API：

```ts
const events = await app.inject({
  method: "GET",
  url: "/api/v1/operation-intent-events?limit=5",
});
```

以及单个 intent timeline：

```ts
const timeline = await app.inject({
  method: "GET",
  url: `/api/v1/operation-intents/${created.json().id}/timeline`,
});
```

## 一句话总结

V7 把 intent 从“只有当前状态”升级成“有可追溯生命周期”，后面无论做持久化、审计查询、审批界面还是执行队列，都有了更稳的事件基础。
