# 14 - V10 mutation rate limiter

V10 给 Node 控制台加了一个本地 mutation rate limiter。它只限制会改变本地控制面状态的 POST：

- 创建 operation intent
- 确认 operation intent
- 创建 operation dispatch

它不限制 dashboard、health、timeline、event feed 这些只读接口，也不会访问 Java / mini-kv。

## 1. 配置入口

文件：`src/config.ts`

V10 在 `AppConfig` 里新增：

```ts
mutationRateLimitWindowMs: number;
mutationRateLimitMax: number;
```

默认值：

```ts
mutationRateLimitWindowMs: readNumber(env, "MUTATION_RATE_LIMIT_WINDOW_MS", 60000),
mutationRateLimitMax: readNumber(env, "MUTATION_RATE_LIMIT_MAX", 30),
```

意思是默认每个 actor 每类 mutation 60 秒最多 30 次。

## 2. 限流服务

文件：`src/services/mutationRateLimiter.ts`

核心结构是一个内存 Map：

```ts
export class MutationRateLimiter {
  private readonly buckets = new Map<string, Bucket>();

  constructor(private readonly options: MutationRateLimitOptions) {}
```

每个 bucket 保存当前窗口里的次数和重置时间：

```ts
interface Bucket {
  count: number;
  resetAtMs: number;
}
```

调用 `consume` 时会得到一个 decision：

```ts
export interface MutationRateLimitDecision {
  scope: string;
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: string;
  retryAfterSeconds: number;
  windowMs: number;
}
```

这让路由层可以同时设置 header 和返回稳定错误。

## 3. 固定窗口判断

文件：`src/services/mutationRateLimiter.ts`

每次请求先拿当前 bucket：

```ts
const bucket = this.getBucket(normalizedScope, nowMs);
const allowed = bucket.count < this.options.maxRequests;
if (allowed) {
  bucket.count += 1;
}
```

如果窗口过期，会创建新的 bucket：

```ts
const fresh = {
  count: 0,
  resetAtMs: nowMs + this.options.windowMs,
};
this.buckets.set(scope, fresh);
return fresh;
```

这里是很常见的固定窗口限流，简单、可测、足够适合当前本地控制台。

## 4. scope 设计

文件：`src/services/mutationRateLimiter.ts`

V10 用 action + actor 组成限流维度：

```ts
export function mutationScope(action: string, actor: string): string {
  return `${action}:${normalizeScope(actor)}`;
}
```

例如：

```text
operation-intents:create:local-dev
operation-intents:confirm:local-dev
operation-dispatches:create:local-dev
```

这样创建 intent 的限流不会影响查询 timeline，也不会影响另一个 operator。

## 5. 路由层接入 intent create

文件：`src/routes/operationIntentRoutes.ts`

创建 intent 前先 consume：

```ts
applyMutationRateLimit(reply, deps.mutationRateLimiter.consume(mutationScope("operation-intents:create", request.body.operatorId)));
```

通过之后才会继续：

```ts
const intent = deps.operationIntents.create({
  ...request.body,
  idempotencyKey: headerKey ?? request.body.idempotencyKey,
});
```

所以超限请求不会创建 intent。

## 6. 路由层接入 confirm

文件：`src/routes/operationIntentRoutes.ts`

确认 intent 也被限制：

```ts
applyMutationRateLimit(reply, deps.mutationRateLimiter.consume(mutationScope("operation-intents:confirm", request.body.operatorId)));
return deps.operationIntents.confirm(request.params.intentId, request.body);
```

这能防止脚本不断猜确认短语或不断撞状态机。

## 7. 路由层接入 dispatch

文件：`src/routes/operationDispatchRoutes.ts`

创建 dispatch 前：

```ts
applyMutationRateLimit(reply, deps.mutationRateLimiter.consume(mutationScope("operation-dispatches:create", request.body.requestedBy)));
```

快捷路由 `POST /api/v1/operation-intents/:intentId/dispatch` 使用 header 里的 `x-requested-by`：

```ts
const requestedBy = request.headers["x-requested-by"]?.toString() ?? "dashboard";
applyMutationRateLimit(reply, deps.mutationRateLimiter.consume(mutationScope("operation-dispatches:create", requestedBy)));
```

## 8. Header 和错误

文件：`src/routes/operationIntentRoutes.ts`、`src/routes/operationDispatchRoutes.ts`

通过或失败都会设置：

```ts
reply
  .header("x-mutation-ratelimit-limit", decision.limit)
  .header("x-mutation-ratelimit-remaining", decision.remaining)
  .header("x-mutation-ratelimit-reset", decision.resetAt);
```

失败时额外设置：

```ts
reply.header("retry-after", decision.retryAfterSeconds);
```

然后抛出统一错误：

```ts
throw new AppHttpError(429, "MUTATION_RATE_LIMITED", "Too many mutation requests in the current window", {
  scope: decision.scope,
  limit: decision.limit,
  remaining: decision.remaining,
  resetAt: decision.resetAt,
  retryAfterSeconds: decision.retryAfterSeconds,
  windowMs: decision.windowMs,
});
```

## 9. Runtime config

文件：`src/routes/statusRoutes.ts`

V10 把限流配置暴露到 runtime config：

```ts
mutationRateLimit: {
  windowMs: deps.config.mutationRateLimitWindowMs,
  maxRequests: deps.config.mutationRateLimitMax,
},
```

这样 dashboard 点 `Runtime Config` 时能看到当前限流窗口和上限。

## 10. 测试覆盖

文件：`test/mutationRateLimiter.test.ts`

单元测试验证同一个 scope 超限：

```ts
const first = limiter.consume(mutationScope("operation-intents:create", "Dev-Admin"), 1000);
const second = limiter.consume(mutationScope("operation-intents:create", "dev-admin"), 1001);
const third = limiter.consume(mutationScope("operation-intents:create", "dev-admin"), 1002);

expect(first).toMatchObject({ allowed: true, remaining: 1, limit: 2 });
expect(second).toMatchObject({ allowed: true, remaining: 0, limit: 2 });
expect(third).toMatchObject({ allowed: false, remaining: 0, limit: 2 });
```

路由测试把限制设成 1：

```ts
const app = await buildApp(loadConfig({
  LOG_LEVEL: "silent",
  MUTATION_RATE_LIMIT_MAX: "1",
  MUTATION_RATE_LIMIT_WINDOW_MS: "60000",
}));
```

第一次创建 intent 成功，第二次同 operator 创建 intent 返回 429：

```ts
expect(first.statusCode).toBe(201);
expect(second.statusCode).toBe(429);
expect(second.json()).toMatchObject({
  error: "MUTATION_RATE_LIMITED",
});
```

## 一句话总结

V10 给控制台 mutation 操作加了一道本地防抖和防滥用闸门：它不碰上游，但能保护 Node 控制面不会被重复点击或脚本刷爆。
