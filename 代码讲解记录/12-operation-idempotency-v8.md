# 12 - V8 操作意图幂等键

V8 给 operation intent 创建接口加了 `Idempotency-Key`。同一个操作者、同一份 intent 输入、同一个幂等键重复提交时，Node 不再创建新 intent，而是返回第一次创建的那条 intent。

这版依旧只在 Node 内部工作，不访问 Java / mini-kv。

## 1. 输入增加 idempotencyKey

文件：`src/services/operationIntent.ts`

V8 在创建 intent 的输入里加了可选字段：

```ts
export interface OperationIntentInput {
  action: ActionKey;
  target?: ActionTarget;
  operatorId: string;
  role: OperatorRole;
  reason?: string;
  idempotencyKey?: string;
}
```

这不是业务参数，而是“重复提交保护”的请求参数。

## 2. intent 返回幂等信息

文件：`src/services/operationIntent.ts`

intent 结构里新增：

```ts
idempotency?: {
  keyHash: string;
  reused: boolean;
};
```

`keyHash` 只暴露短 hash，不把原始 key 直接塞进响应里。`reused=false` 表示第一次创建，`reused=true` 表示这次是重复提交 replay。

## 3. 本地幂等索引

文件：`src/services/operationIntent.ts`

Store 里加了索引：

```ts
private readonly idempotencyIndex = new Map<string, IdempotencyRecord>();
```

索引记录 intent id 和请求指纹：

```ts
interface IdempotencyRecord {
  intentId: string;
  fingerprint: string;
}
```

这样同一个 key 重复提交时，可以判断是“同一请求重放”，还是“拿同一个 key 乱提交了另一种动作”。

## 4. key 校验和 hash

文件：`src/services/operationIntent.ts`

幂等 key 会先规范化：

```ts
function normalizeIdempotencyKey(key: string | undefined): string | undefined {
  const normalized = key?.trim();
  if (!normalized) {
    return undefined;
  }

  if (normalized.length > 120 || /[\r\n]/.test(normalized)) {
    throw new AppHttpError(400, "INVALID_IDEMPOTENCY_KEY", "Idempotency-Key must be 1-120 characters without newlines");
  }

  return normalized;
}
```

响应里用 hash：

```ts
function hashIdempotencyKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex").slice(0, 16);
}
```

## 5. 重复提交 replay

文件：`src/services/operationIntent.ts`

创建 intent 时先查幂等索引：

```ts
if (idempotency !== undefined && idempotencyScope !== undefined && fingerprint !== undefined) {
  const existing = this.idempotencyIndex.get(idempotencyScope);
  if (existing !== undefined) {
```

如果 key 已存在，但请求指纹不同，直接返回冲突：

```ts
if (existing.fingerprint !== fingerprint) {
  throw new AppHttpError(409, "IDEMPOTENCY_KEY_CONFLICT", "Idempotency-Key was already used with different intent input", {
    keyHash: hashIdempotencyKey(idempotency),
  });
}
```

如果是同一请求，就记录 replay 事件并返回旧 intent：

```ts
this.recordEvent(existingIntent, "intent.idempotency_replayed", "Operation intent was returned from an idempotency replay", {
  keyHash: hashIdempotencyKey(idempotency),
});
return cloneIntent(existingIntent, true);
```

注意这里不会重新执行策略，也不会创建第二个 intent。

## 6. 新事件类型

文件：`src/services/operationIntent.ts`

V8 给 V7 的事件流加了：

```ts
| "intent.idempotency_replayed"
```

所以 timeline 可以看到：

```text
intent.created
intent.blocked
intent.idempotency_replayed
```

## 7. 路由支持 Header

文件：`src/routes/operationIntentRoutes.ts`

创建 intent 的路由现在支持 `Idempotency-Key` header：

```ts
headers: {
  type: "object",
  properties: {
    "idempotency-key": { type: "string", minLength: 1, maxLength: 120 },
  },
  additionalProperties: true,
},
```

也支持 body 里的 `idempotencyKey`，但如果 header 和 body 同时传且不一致，会报错：

```ts
if (headerKey !== undefined && request.body.idempotencyKey !== undefined && headerKey !== request.body.idempotencyKey) {
  throw new AppHttpError(400, "IDEMPOTENCY_KEY_MISMATCH", "Header and body idempotency keys must match");
}
```

第一次创建返回 `201`，replay 返回 `200`：

```ts
reply.code(intent.idempotency?.reused ? 200 : 201);
```

## 8. Dashboard 入口

文件：`src/ui/dashboard.ts`

V8 给 intent 创建区加了输入框：

```html
<input id="intentKey" placeholder="Idempotency-Key" value="v8-local-intent-001">
```

创建 intent 时带上 header：

```js
const headers = {};
if ($("intentKey").value.trim()) {
  headers["idempotency-key"] = $("intentKey").value.trim();
}
```

```js
const intent = await api("/api/v1/operation-intents", {
  method: "POST",
  headers,
  body: JSON.stringify({
    action: $("planAction").value,
    operatorId: $("operatorId").value,
    role: $("operatorRole").value,
    reason: $("intentReason").value,
  }),
});
```

## 9. 测试覆盖

文件：`test/operationIntent.test.ts`

同一 key + 同一输入会返回同一个 id：

```ts
const first = store.create(input);
const second = store.create(input);

expect(second.id).toBe(first.id);
expect(second.idempotency).toMatchObject({
  reused: true,
});
```

timeline 会追加 replay 事件：

```ts
expect(store.getTimeline(first.id).events.map((event) => event.type)).toEqual([
  "intent.created",
  "intent.blocked",
  "intent.idempotency_replayed",
]);
```

同一个 key 换动作会冲突：

```ts
expect(() => store.create({
  action: "kv-delete",
  operatorId: "dev-admin",
  role: "admin",
  reason: "same submit",
  idempotencyKey: "intent-key-002",
})).toThrow(AppHttpError);
```

路由测试也验证了：

```ts
expect(first.statusCode).toBe(201);
expect(second.statusCode).toBe(200);
expect(second.json().id).toBe(first.json().id);
```

## 一句话总结

V8 解决的是控制台里最常见的“手抖重复提交”问题：重复请求不会制造重复 intent，而是稳定 replay 第一次结果，并把 replay 行为写进 timeline。
