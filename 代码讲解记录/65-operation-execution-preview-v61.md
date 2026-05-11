# 第六十一版代码讲解：Operation execution preview

本版目标来自：

```text
docs/plans/v59-post-preflight-control-roadmap.md
Node v61：Operation execution preview
```

当前依赖已经就绪：

```text
Java v39：失败事件 replay simulation
mini-kv v48：EXPLAINJSON command explain
```

v61 的目标不是执行真实 replay，也不是执行 mini-kv 写命令，而是把 v60 的 preflight report 继续推进成“执行前预演”。

## 1. Java client：接入 replay simulation

文件：

```text
src/clients/orderPlatformClient.ts
```

新增类型：

```ts
export interface OrderPlatformFailedEventReplaySimulation {
  sampledAt?: string;
  failedEventId?: number;
  exists?: boolean;
  eligibleForReplay?: boolean;
  wouldReplay?: boolean;
  wouldPublishOutbox?: boolean;
  wouldChangeManagementStatus?: boolean;
  requiredApprovalStatus?: string | null;
  idempotencyKeyHint?: string | null;
  expectedAggregateId?: string | null;
  expectedSideEffects?: string[];
  blockedBy?: string[];
  warnings?: string[];
  nextAllowedActions?: string[];
}
```

新增方法：

```ts
failedEventReplaySimulation(failedEventId: string): Promise<UpstreamJsonResponse<OrderPlatformFailedEventReplaySimulation>> {
  return this.request(`/api/v1/failed-events/${encodeURIComponent(failedEventId)}/replay-simulation`);
}
```

这是只读 GET，配合 Java v39 的 simulation endpoint。

## 2. mini-kv client：接入 EXPLAINJSON

文件：

```text
src/clients/miniKvClient.ts
```

新增结构：

```ts
export interface MiniKvExplainJson {
  command?: string;
  category?: "read" | "write" | "admin" | "meta" | string;
  mutates_store?: boolean;
  touches_wal?: boolean;
  key?: string | null;
  requires_value?: boolean;
  ttl_sensitive?: boolean;
  allowed_by_parser?: boolean;
  warnings?: string[];
}
```

新增方法：

```ts
async explainJson(command: string): Promise<MiniKvExplainJsonResult> {
  const normalizedCommand = normalizeExplainCommand(command);
  const result = await this.execute(`EXPLAINJSON ${normalizedCommand}`);
  return {
    ...result,
    explanation: parseMiniKvExplainJson(result.response),
  };
}
```

注意这里解释的是“将要执行的命令”，不是执行命令本身。

## 3. EXPLAINJSON 的输入保护

文件：

```text
src/clients/miniKvClient.ts
```

`normalizeExplainCommand()` 先复用网关白名单：

```ts
function normalizeExplainCommand(command: string): string {
  validateRawGatewayCommand(command);
  const normalized = command.trim();
  if (normalized.toUpperCase().startsWith("EXPLAINJSON")) {
    throw new AppHttpError(400, "INVALID_MINIKV_EXPLAIN_COMMAND", "EXPLAINJSON expects the command to explain, not a nested EXPLAINJSON command");
  }

  return normalized;
}
```

这让 Node 只能解释已有白名单内的命令，并且禁止 `EXPLAINJSON EXPLAINJSON ...` 这类嵌套。

## 4. mini-kv explain probe route

文件：

```text
src/routes/miniKvRoutes.ts
```

新增：

```ts
app.get<{ Querystring: ExplainCommandQuery }>("/api/v1/mini-kv/explain", {
```

核心处理：

```ts
assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "mini-kv");
return deps.miniKv.explainJson(request.query.command);
```

它走 `UPSTREAM_PROBES_ENABLED`，不是 `UPSTREAM_ACTIONS_ENABLED`，因为这里只读解释命令风险。

## 5. Java replay simulation proxy route

文件：

```text
src/routes/orderPlatformRoutes.ts
```

新增：

```ts
app.get<{ Params: FailedEventParams }>("/api/v1/order-platform/failed-events/:failedEventId/replay-simulation", {
```

核心处理：

```ts
assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "advanced-order-platform");
const response = await deps.orderPlatform.failedEventReplaySimulation(request.params.failedEventId);
return response.data;
```

这同样是 probe-gated 只读能力。

## 6. Action planner：新增 simulation action

文件：

```text
src/services/actionPlanner.ts
```

新增 action key：

```ts
"failed-event-replay-simulation",
```

定义：

```ts
"failed-event-replay-simulation": {
  action: "failed-event-replay-simulation",
  target: "order-platform",
  label: "Simulate failed-event replay",
  risk: "read",
  gate: "probes",
  requires: ["failedEventId"],
  nodeRoute: { method: "GET", path: "/api/v1/order-platform/failed-events/:failedEventId/replay-simulation" },
  upstream: (config) => ({
    type: "http",
    endpoint: config.orderPlatformUrl,
    method: "GET",
    path: "/api/v1/failed-events/:failedEventId/replay-simulation",
  }),
},
```

它属于 read/probe，不属于真实 replay 执行动作。

## 7. Execution preview service

文件：

```text
src/services/operationExecutionPreview.ts
```

核心输出：

```ts
export interface OperationExecutionPreview {
  service: "orderops-node";
  generatedAt: string;
  intentId: string;
  action: string;
  target: string;
  state: OperationExecutionPreviewState;
  preflightDigest: OperationPreflightReport["preflightDigest"];
  preflightState: OperationPreflightReport["state"];
  wouldCall: OperationPreflightReport["preflight"]["actionPlan"]["wouldCall"];
  evidence: {
    javaReplaySimulation: EvidenceRecord;
    miniKvCommandExplain: EvidenceRecord;
  };
  expectedSideEffects: string[];
  hardBlockers: string[];
  warnings: string[];
  nextActions: string[];
  readyForApprovalRequest: boolean;
  preflightReport: OperationPreflightReport;
}
```

它把 v60 的 report digest 作为输入证据的一部分：

```ts
preflightDigest: report.preflightDigest,
preflightState: report.state,
wouldCall: report.preflight.actionPlan.wouldCall,
```

## 8. Java simulation evidence

文件：

```text
src/services/operationExecutionPreview.ts
```

只对 `failed-event-replay-simulation` action 生效：

```ts
if (report.summary.action !== "failed-event-replay-simulation") {
  return {
    status: "not_applicable",
    message: "Intent action does not target Java failed-event replay simulation.",
  };
}
```

缺少 `failedEventId` 时只生成 missing context：

```ts
if (failedEventId === undefined || failedEventId.trim().length === 0) {
  return {
    status: "missing_context",
    message: "Provide failedEventId to collect Java replay simulation evidence.",
  };
}
```

真正访问上游时仍是只读：

```ts
const response = await this.orderPlatform.failedEventReplaySimulation(failedEventId);
```

## 9. mini-kv EXPLAINJSON evidence

文件：

```text
src/services/operationExecutionPreview.ts
```

mini-kv action 会推导要解释的命令：

```ts
function inferMiniKvPreviewCommand(action: string, input: OperationExecutionPreviewInput): string | undefined {
  const key = normalizeKey(input.key) ?? "orderops:preview";
  const value = normalizeValue(input.value) ?? "preview-value";
  switch (action) {
    case "kv-status":
      return "PING orderops";
    case "kv-get":
      return `GET ${key}`;
    case "kv-set":
      return `SET ${key} ${value}`;
    case "kv-delete":
      return `DEL ${key}`;
    case "kv-command":
      return input.command?.trim() || undefined;
    default:
      return undefined;
  }
}
```

对 `kv-command`，必须提供 `command`，否则 preview 会给出 `MINIKV_COMMAND_REQUIRED`。

## 10. expected side effects

文件：

```text
src/services/operationExecutionPreview.ts
```

Java simulation 会提取：

```ts
effects.push(...readStringArray(evidence.javaReplaySimulation.details.simulation, "expectedSideEffects"));
if (evidence.javaReplaySimulation.details.simulation.wouldReplay === true) {
  effects.push("java.failed-event.would-replay");
}
```

mini-kv explain 会提取：

```ts
if (evidence.miniKvCommandExplain.details.explanation.mutates_store === true) {
  effects.push("mini-kv.store-would-mutate");
}
if (evidence.miniKvCommandExplain.details.explanation.touches_wal === true) {
  effects.push("mini-kv.wal-would-be-touched");
}
```

这就是 execution preview 比 preflight 更接近真实执行前预演的地方。

## 11. execution-preview route

文件：

```text
src/routes/operationPreflightRoutes.ts
```

新增：

```ts
app.get<{ Params: IntentParams; Querystring: ExecutionPreviewQuery }>("/api/v1/operation-intents/:intentId/execution-preview", {
```

先生成 preflight report：

```ts
const report = createOperationPreflightReport(await preflight.create({
  intentId: request.params.intentId,
  failedEventId: request.query.failedEventId,
  keyPrefix: request.query.keyPrefix,
}));
```

再生成 execution preview：

```ts
return executionPreview.create(report, {
  failedEventId: request.query.failedEventId,
  command: request.query.command,
  key: request.query.key,
  value: request.query.value,
});
```

所以 v61 是建立在 v59 preflight 和 v60 report digest 上的。

## 12. Dashboard 入口

文件：

```text
src/ui/dashboard.ts
```

新增 action 选项：

```html
<option value="failed-event-replay-simulation">Order: replay simulation</option>
```

Intent 操作区新增：

```html
<button data-action="intentExecutionPreview">Execution Preview</button>
```

点击后会带上：

```text
failedEventId
keyPrefix
rawCommand
kvKey
kvValue
```

然后请求：

```text
/api/v1/operation-intents/:intentId/execution-preview
```

## 13. 测试覆盖

新增：

```text
test/operationExecutionPreview.test.ts
```

覆盖 mini-kv EXPLAINJSON：

```ts
expect(executionPreview.expectedSideEffects).toEqual([
  "mini-kv.store-would-mutate",
  "mini-kv.wal-would-be-touched",
]);
```

覆盖 Java replay simulation：

```ts
expect(executionPreview.expectedSideEffects).toEqual([
  "order-event-replayed",
  "outbox-message-created",
  "java.failed-event.would-replay",
  "java.outbox.would-publish",
  "java.failed-event.status-would-change",
]);
```

覆盖默认安全：

```ts
expect(preview.json().hardBlockers).toEqual([
  "UPSTREAM_ACTIONS_ENABLED=false",
  "INTENT_STATUS_BLOCKED",
]);
```

还更新：

```text
test/actionPlanner.test.ts
test/miniKvCommandValidation.test.ts
test/miniKvKeyInventory.test.ts
test/orderPlatformReplayReadiness.test.ts
test/dashboard.test.ts
```

## 14. 本版不做

```text
不真实执行 Java replay
不真实执行 mini-kv raw command
不批量处理多个 intent
不绕过 Java / mini-kv 自己的安全规则
不修改 Java 项目
不修改 mini-kv 项目
```

一句话总结：v61 把“preflight 报告”升级为“execution preview”，让 Node 在真实执行前能看到 Java replay simulation 和 mini-kv EXPLAINJSON 的预计影响。
