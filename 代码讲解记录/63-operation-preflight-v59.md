# 第五十九版代码讲解：Operation preflight evidence bundle

本版目标来自：

```text
docs/plans/v56-post-dashboard-control-roadmap.md
Node v59：Operation preflight evidence bundle
```

v59 不执行真实 replay，也不默认开启上游写动作。它把一个 operation intent 在执行前需要看的本地策略、确认状态、dispatch 历史和上游只读证据汇总成一个统一 JSON 包。

## 1. 路由入口：按 intent 生成 preflight

文件：

```text
src/routes/operationPreflightRoutes.ts
```

新增路由：

```ts
app.get<{ Params: IntentParams; Querystring: PreflightQuery }>("/api/v1/operation-intents/:intentId/preflight", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        failedEventId: { type: "string", pattern: "^[0-9]+$" },
        keyPrefix: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
      },
      additionalProperties: false,
    },
  },
}, async (request) => preflight.create({
  intentId: request.params.intentId,
  failedEventId: request.query.failedEventId,
  keyPrefix: request.query.keyPrefix,
}));
```

这里有两个可选上下文：

```text
failedEventId -> Java failed-event replay readiness 证据
keyPrefix     -> mini-kv key inventory 证据
```

路由本身只读，不会 dispatch，也不会触碰 Java / mini-kv 的写接口。

## 2. App 组装：放在 intent 通用路由之前

文件：

```text
src/app.ts
```

注册顺序：

```ts
await registerActionPlanRoutes(app, { config });
await registerOperationPreflightRoutes(app, {
  config,
  operationIntents,
  operationDispatches,
  orderPlatform,
  miniKv,
});
await registerOperationIntentRoutes(app, { operationIntents, mutationRateLimiter });
```

`/api/v1/operation-intents/:intentId/preflight` 要先于通用 `:intentId` 路由注册，这样 Fastify 能把 `preflight` 当作子路径，而不是误进单个 intent 查询。

## 3. Service 输出：一个可归档的证据包

文件：

```text
src/services/operationPreflight.ts
```

核心返回结构：

```ts
export interface OperationPreflightBundle {
  service: "orderops-node";
  generatedAt: string;
  intent: {
    id: string;
    status: OperationIntent["status"];
    action: ActionKey;
    target: OperationIntent["plan"]["target"];
    operator: OperationIntent["operator"];
    reason: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
  };
  actionPlan: OperationIntent["plan"];
  policy: OperationIntent["policy"];
  confirmation: OperationIntent["confirmation"] & {
    confirmed: boolean;
  };
  rateLimit: {
    mutationWindowMs: number;
    mutationMaxRequests: number;
    note: string;
  };
  safety: {
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
  };
  dispatches: {
    total: number;
    dryRunCompleted: number;
    rejected: number;
    upstreamTouched: number;
    latest?: OperationDispatch;
    recent: OperationDispatch[];
  };
  evidence: {
    javaReplayReadiness: EvidenceRecord;
    miniKvCommandCatalog: EvidenceRecord;
    miniKvKeyInventory: EvidenceRecord;
  };
  hardBlockers: string[];
  warnings: string[];
  recommendedNextActions: string[];
  readyForDryRunDispatch: boolean;
}
```

这个结构刻意把“本地控制面状态”和“上游只读证据”放在同一个包里，方便截图、归档和人工审阅。

## 4. create() 主流程：先取本地状态，再收集证据

文件：

```text
src/services/operationPreflight.ts
```

主流程：

```ts
async create(input: OperationPreflightInput): Promise<OperationPreflightBundle> {
  const intent = this.operationIntents.get(input.intentId);
  const dispatches = this.operationDispatches.listByIntent(intent.id, 10);
  const evidence = {
    javaReplayReadiness: await this.collectJavaReplayReadiness(intent, input.failedEventId),
    miniKvCommandCatalog: await this.collectMiniKvCommandCatalog(intent),
    miniKvKeyInventory: await this.collectMiniKvKeyInventory(intent, input.keyPrefix),
  };
  const hardBlockers = collectHardBlockers(this.config, intent, evidence);
  const warnings = collectWarnings(intent, evidence);
```

顺序很重要：

```text
intent -> dispatches -> evidence -> hardBlockers / warnings -> recommendedNextActions
```

这样 preflight 既能解释“为什么现在不能派发”，也能解释“如果能派发，还应该先看哪些 warning”。

## 5. Java evidence：只服务 failed-event readiness

文件：

```text
src/services/operationPreflight.ts
```

Java readiness 只在 action 是 `failed-event-replay-readiness` 时才收集：

```ts
if (intent.plan.action !== "failed-event-replay-readiness") {
  return {
    status: "not_applicable",
    message: "Intent action does not target Java failed-event replay readiness.",
  };
}
if (!this.config.upstreamProbesEnabled) {
  return {
    status: "skipped",
    message: "UPSTREAM_PROBES_ENABLED=false; Java replay readiness was not requested.",
  };
}
if (failedEventId === undefined || failedEventId.trim().length === 0) {
  return {
    status: "missing_context",
    message: "Provide failedEventId to collect Java replay readiness evidence.",
  };
}
```

真正请求 Java 的代码仍然是只读 GET：

```ts
const response = await this.orderPlatform.failedEventReplayReadiness(failedEventId);
```

如果 Java 返回 `eligibleForReplay=false` 或 `blockedBy` 非空，preflight 会加硬阻断：

```ts
if (evidence.javaReplayReadiness.status === "available" && hasBlockedJavaReadiness(evidence.javaReplayReadiness.details)) {
  blockers.push("JAVA_REPLAY_READINESS_BLOCKED");
}
```

## 6. mini-kv evidence：命令风险 + key inventory

文件：

```text
src/services/operationPreflight.ts
```

mini-kv command catalog 只在 target 是 `mini-kv` 时收集：

```ts
if (intent.plan.target !== "mini-kv") {
  return {
    status: "not_applicable",
    message: "Intent target is not mini-kv.",
  };
}
if (!this.config.upstreamProbesEnabled) {
  return {
    status: "skipped",
    message: "UPSTREAM_PROBES_ENABLED=false; mini-kv command catalog was not requested.",
  };
}
```

命令映射由 action 推导：

```ts
function inferMiniKvCommandNames(action: ActionKey): string[] {
  switch (action) {
    case "kv-status":
      return ["PING", "SIZE"];
    case "kv-get":
      return ["GET", "TTL"];
    case "kv-set":
      return ["SET", "EXPIRE"];
    case "kv-delete":
      return ["DEL"];
    case "kv-command":
      return [];
    default:
      return [];
  }
}
```

`kv-set` 会匹配 `SET` / `EXPIRE`，如果 catalog 里显示它们是写命令，就追加 warning：

```ts
if (evidence.miniKvCommandCatalog.status === "available" && hasMutatingMiniKvCommand(evidence.miniKvCommandCatalog.details)) {
  warnings.push("MINIKV_MUTATING_COMMAND");
}
```

key inventory 使用 v58 接入的 `KEYSJSON`：

```ts
const prefix = keyPrefix?.trim() || "orderops:";
const response = await this.miniKv.keysJson(prefix);
```

所以 v59 是建立在 v57 Java readiness 和 v58 mini-kv inventory 之上的收束版本。

## 7. hardBlockers 和 warnings 的边界

文件：

```text
src/services/operationPreflight.ts
```

硬阻断示例：

```ts
if (!intent.policy.allowed && intent.policy.blockedBy !== undefined) {
  blockers.push(intent.policy.blockedBy);
}
if (intent.status !== "confirmed") {
  blockers.push(`INTENT_STATUS_${intent.status.toUpperCase().replace(/-/g, "_")}`);
}
if (intent.plan.target === "mini-kv" && intent.plan.risk === "write" && !config.upstreamActionsEnabled) {
  blockers.push("UPSTREAM_ACTIONS_ENABLED=false");
}
```

warning 示例：

```ts
if (intent.plan.risk === "write") {
  warnings.push("WRITE_RISK_REQUIRES_EXPLICIT_REVIEW");
}
if (evidence.javaReplayReadiness.status === "skipped" || evidence.miniKvCommandCatalog.status === "skipped" || evidence.miniKvKeyInventory.status === "skipped") {
  warnings.push("UPSTREAM_PROBES_SKIPPED");
}
```

这条线的含义是：

```text
hardBlockers -> 不能继续 dry-run dispatch
warnings     -> 可以继续，但要人工明确看过
```

最终 readiness：

```ts
readyForDryRunDispatch: intent.status === "confirmed" && hardBlockers.length === 0,
```

## 8. Dashboard：Intent 区增加 Preflight

文件：

```text
src/ui/dashboard.ts
```

Intent 操作区新增按钮：

```html
<button data-action="intentPreflight">Preflight</button>
```

点击后把 `failedEventId` 和 `kvPrefix` 作为上下文传给 preflight：

```js
if (action === "intentPreflight") {
  const query = new URLSearchParams();
  const failedEventId = $("failedEventId").value.trim();
  const keyPrefix = $("kvPrefix").value.trim();
  if (failedEventId) {
    query.set("failedEventId", failedEventId);
  }
  if (keyPrefix) {
    query.set("keyPrefix", keyPrefix);
  }
  const suffix = query.toString() ? "?" + query.toString() : "";
  write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/preflight" + suffix));
}
```

这让 Dashboard 能直接把当前 intent 变成一份可复制、可截图的 preflight JSON。

## 9. 测试覆盖

新增：

```text
test/operationPreflight.test.ts
```

覆盖默认安全阻断：

```ts
expect(bundle.hardBlockers).toEqual([
  "UPSTREAM_ACTIONS_ENABLED=false",
  "INTENT_STATUS_BLOCKED",
]);
expect(bundle.evidence.miniKvCommandCatalog.status).toBe("skipped");
```

覆盖 Java readiness 阻断：

```ts
expect(bundle.hardBlockers).toEqual(["JAVA_REPLAY_READINESS_BLOCKED"]);
expect(bundle.readyForDryRunDispatch).toBe(false);
```

覆盖 mini-kv 证据：

```ts
expect(bundle.evidence.miniKvCommandCatalog).toMatchObject({
  status: "available",
  details: {
    actionCommands: ["SET", "EXPIRE"],
    commandCount: 3,
  },
});
```

并更新：

```text
test/dashboard.test.ts
```

确认 Dashboard 里有 `Preflight` 按钮和 `/preflight` 请求。

## 10. 本版不做

```text
不执行 Java replay
不自动创建 Java approval
不默认打开 UPSTREAM_ACTIONS_ENABLED
不执行 mini-kv SET / DEL
不修改 Java 项目
不修改 mini-kv 项目
不做持久化数据库迁移
```

一句话总结：v59 把“能不能做、为什么不能做、做之前看过什么证据”收进一个统一的 Node preflight bundle，为后续真实受控操作打基础。
