# 16 - V12 ops readiness

V12 在 V11 的 ops summary 基础上加了本地 readiness gate：`GET /api/v1/ops/readiness`。

它不会探测 Java / mini-kv，也不会执行上游请求，只读取 Node 的本地 summary，然后判断当前控制台是否适合进入“真实上游执行”的阶段。

## 1. Readiness 状态

文件：`src/services/opsReadiness.ts`

V12 定义了三个状态：

```ts
export type OpsReadinessState = "blocked" | "warning" | "ready";
```

检查项分四类：

```ts
export type OpsReadinessSeverity = "blocker" | "warning" | "info" | "pass";
```

含义很直接：

- `blocker`：不能进入真实上游执行。
- `warning`：没有硬阻断，但需要人工看一眼。
- `info`：提示，不影响 readiness。
- `pass`：检查通过。

## 2. Readiness 响应结构

文件：`src/services/opsReadiness.ts`

```ts
export interface OpsReadiness {
  service: "orderops-node";
  generatedAt: string;
  state: OpsReadinessState;
  readyForUpstreamExecution: boolean;
  blockers: number;
  warnings: number;
  checks: OpsReadinessCheck[];
  nextActions: string[];
  summary: {
    safety: OpsSummary["safety"];
    mutationRateLimit: OpsSummary["mutationRateLimit"];
    signals: OpsSummary["signals"];
  };
}
```

它不会返回完整 summary，只带 readiness 判断需要的安全开关、限流配置和 signals。

## 3. 从 summary 生成 readiness

文件：`src/services/opsReadiness.ts`

核心函数：

```ts
export function createOpsReadiness(summary: OpsSummary): OpsReadiness {
  const checks = buildChecks(summary);
  const blockers = checks.filter((check) => check.severity === "blocker").length;
  const warnings = checks.filter((check) => check.severity === "warning").length;
  const state: OpsReadinessState = blockers > 0 ? "blocked" : warnings > 0 ? "warning" : "ready";
```

`readyForUpstreamExecution` 只有 `state === "ready"` 才是 true：

```ts
readyForUpstreamExecution: state === "ready",
```

所以默认安全配置下不会误报 ready。

## 4. 上游动作闸门检查

文件：`src/services/opsReadiness.ts`

默认 `UPSTREAM_ACTIONS_ENABLED=false` 时，这是硬阻断：

```ts
summary.safety.upstreamActionsEnabled
  ? pass("UPSTREAM_ACTION_GATE", "Real upstream action gate is open.", true)
  : blocker(
    "UPSTREAM_ACTION_GATE",
    "Real upstream action gate is closed.",
    false,
    "Set UPSTREAM_ACTIONS_ENABLED=true and restart orderops-node only when Java and mini-kv are ready for traffic.",
  ),
```

这个设计是为了继续保护你正在调试的 Java 高并发项目和 mini_kv。

## 5. 上游探测闸门检查

文件：`src/services/opsReadiness.ts`

`UPSTREAM_PROBES_ENABLED=false` 不是硬阻断，但会 warning：

```ts
summary.safety.upstreamProbesEnabled
  ? pass("UPSTREAM_PROBE_GATE", "Upstream probe mode is enabled.", true)
  : warning(
    "UPSTREAM_PROBE_GATE",
    "Upstream probe mode is disabled, so readiness cannot see live Java or mini-kv health.",
    false,
    "Set UPSTREAM_PROBES_ENABLED=true during a coordinated integration window if live health checks are needed.",
  ),
```

因为不开 probe 时，Node 无法知道 Java / mini-kv 此刻是否健康。

## 6. dispatch 安全检查

文件：`src/services/opsReadiness.ts`

如果任何 dispatch 报告 `upstreamTouched=true`，这是硬阻断：

```ts
summary.signals.upstreamTouchedDispatches === 0
  ? pass("UPSTREAM_TOUCH_GUARD", "No dispatch has touched an upstream.", 0)
  : blocker(
    "UPSTREAM_TOUCH_GUARD",
    "At least one dispatch reports upstreamTouched=true.",
    summary.signals.upstreamTouchedDispatches,
    "Review dispatch history before enabling more execution paths.",
  ),
```

当前项目所有 dispatch 都是 dry-run，所以正常应该一直是 0。

## 7. 本地状态 warning

文件：`src/services/opsReadiness.ts`

pending intent 会 warning：

```ts
summary.signals.pendingConfirmations === 0
  ? pass("PENDING_CONFIRMATIONS", "No intents are waiting for confirmation.", 0)
  : warning(
    "PENDING_CONFIRMATIONS",
    "Some intents are waiting for confirmation.",
    summary.signals.pendingConfirmations,
    "Confirm or let pending intents expire before a real execution window.",
  ),
```

blocked intent、rejected dispatch、rate limited mutation 也类似：

```ts
"BLOCKED_INTENTS"
"REJECTED_DISPATCHES"
"RATE_LIMITED_MUTATIONS"
```

这些不是硬阻断，但说明控制台近期有失败或受限信号。

## 8. dry-run dispatch 检查

文件：`src/services/opsReadiness.ts`

如果已经跑过 dry-run dispatch：

```ts
summary.signals.dryRunDispatches > 0
  ? pass("DRY_RUN_DISPATCH", "At least one dry-run dispatch has completed.", summary.signals.dryRunDispatches)
```

如果没有，则是 info：

```ts
: info(
  "DRY_RUN_DISPATCH",
  "No dry-run dispatch has completed yet.",
  0,
  "Exercise a confirmed intent with dry-run dispatch before real execution work.",
),
```

它不影响 readiness，但会提醒你在真正执行前先跑通 dry-run 路径。

## 9. Route

文件：`src/routes/opsSummaryRoutes.ts`

V12 在 ops route 里新增：

```ts
app.get("/api/v1/ops/readiness", async () => createOpsReadiness(createOpsSummary(deps)));
```

这说明 readiness 是 summary 的派生视图。

## 10. Dashboard

文件：`src/ui/dashboard.ts`

V12 新增 readiness 指标卡：

```html
<div class="metric-name">Readiness</div>
<div class="metric-value" id="opsReadinessState">-</div>
```

```html
<div class="metric-name">Blockers</div>
<div class="metric-value" id="opsReadinessBlockers">0</div>
```

```html
<div class="metric-name">Warnings</div>
<div class="metric-value" id="opsReadinessWarnings">0</div>
```

刷新函数：

```js
async function refreshOpsReadiness() {
  const readiness = await api("/api/v1/ops/readiness");
  $("opsReadinessState").textContent = readiness.state;
  $("opsReadinessReady").textContent = readiness.readyForUpstreamExecution ? "ready for execution" : "not ready for execution";
```

按钮：

```html
<button data-action="opsReadiness">Readiness</button>
```

## 11. 测试覆盖

文件：`test/opsReadiness.test.ts`

默认配置必须 blocked：

```ts
expect(response.json()).toMatchObject({
  service: "orderops-node",
  state: "blocked",
  readyForUpstreamExecution: false,
});
```

动作和探测闸门都打开，且没有 warning signals 时是 ready：

```ts
expect(response.json()).toMatchObject({
  state: "ready",
  readyForUpstreamExecution: true,
  blockers: 0,
  warnings: 0,
});
```

如果存在 blocked intent，即使闸门打开，也会 warning：

```ts
expect(response.json()).toMatchObject({
  state: "warning",
  readyForUpstreamExecution: false,
  blockers: 0,
});
```

## 一句话总结

V12 把“现在能不能进入真实执行阶段”做成了一个本地、可解释、可测试的 readiness gate；默认仍然保护 Java / mini-kv，不会误碰上游。
