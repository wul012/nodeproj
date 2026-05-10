# 17 - V13 ops handoff report

V13 在 V11 `ops summary` 和 V12 `readiness` 之上，加了一个本地交接报告接口：

```text
GET /api/v1/ops/handoff-report
GET /api/v1/ops/handoff-report?format=markdown
```

它的目标不是执行操作，而是把当前 Node 控制面的证据打包：sources、summary、readiness、最近 audit、intent、dispatch、timeline event。默认 `UPSTREAM_PROBES_ENABLED=false` 时，sources 里的 Java / mini-kv 仍然是 disabled，不会连接你的另外两个项目。

## 1. 报告输入

文件：`src/services/opsHandoffReport.ts`

V13 的 report service 不自己去查全局状态，而是接收路由层已经准备好的数据：

```ts
export interface OpsHandoffReportInput {
  sources: OpsSnapshot;
  summary: OpsSummary;
  readiness: OpsReadiness;
  auditEvents: AuditEvent[];
  intents: OperationIntent[];
  dispatches: OperationDispatch[];
  intentEvents: OperationIntentEvent[];
  limit: number;
}
```

这样设计的好处是边界很清楚：

- `sources` 来自原来的 `OpsSnapshotService`。
- `summary` 来自 V11 的 `createOpsSummary`。
- `readiness` 来自 V12 的 `createOpsReadiness`。
- 最近记录从内存 ledger 读取。

## 2. 报告输出结构

文件：`src/services/opsHandoffReport.ts`

报告结构里保留完整 summary/readiness，同时把最近活动放到 `recent`：

```ts
export interface OpsHandoffReport {
  service: "orderops-node";
  reportId: string;
  generatedAt: string;
  sources: OpsSnapshot;
  summary: OpsSummary;
  readiness: OpsReadiness;
  recent: {
    limit: number;
    auditEvents: AuditEvent[];
    intents: OperationIntent[];
    dispatches: OperationDispatch[];
    intentEvents: OperationIntentEvent[];
  };
  guidance: string[];
}
```

`reportId` 用来标识这次交接报告：

```ts
reportId: randomUUID(),
```

## 3. 创建 handoff report

文件：`src/services/opsHandoffReport.ts`

核心函数只是组装，不做副作用：

```ts
export function createOpsHandoffReport(input: OpsHandoffReportInput): OpsHandoffReport {
  return {
    service: "orderops-node",
    reportId: randomUUID(),
    generatedAt: new Date().toISOString(),
    sources: input.sources,
    summary: input.summary,
    readiness: input.readiness,
```

最近活动也原样放进去：

```ts
recent: {
  limit: input.limit,
  auditEvents: input.auditEvents,
  intents: input.intents,
  dispatches: input.dispatches,
  intentEvents: input.intentEvents,
},
guidance: createGuidance(input),
```

也就是说，V13 不修改 intent，不确认 dispatch，也不清空 audit log。

## 4. guidance 的来源

文件：`src/services/opsHandoffReport.ts`

报告里的建议优先复用 V12 readiness 的 `nextActions`：

```ts
const actions = input.readiness.nextActions.length === 0
  ? ["Readiness has no blocker or warning next actions."]
  : input.readiness.nextActions;
```

然后补充本地调试建议：

```ts
input.sources.javaOrderPlatform.state === "disabled" || input.sources.miniKv.state === "disabled"
  ? "Probe mode is disabled; coordinate a window before enabling live upstream probes."
  : undefined,
```

如果还没有 dry-run dispatch，也会提示先跑通 dry-run：

```ts
input.summary.signals.dryRunDispatches === 0
  ? "Complete at least one confirmed dry-run dispatch before considering real upstream execution."
  : undefined,
```

最后用 `Set` 去重：

```ts
return [...new Set(guidance.filter((item): item is string => item !== undefined))];
```

## 5. Markdown 渲染

文件：`src/services/opsHandoffReport.ts`

V13 支持 `format=markdown`，方便复制到日志、周报或归档说明：

```ts
export function renderOpsHandoffMarkdown(report: OpsHandoffReport): string {
  const blockers = report.readiness.checks.filter((check) => check.severity === "blocker");
  const warnings = report.readiness.checks.filter((check) => check.severity === "warning");
```

Markdown 里会写出 readiness：

```ts
`- Readiness: ${report.readiness.state}`,
`- Ready for upstream execution: ${report.readiness.readyForUpstreamExecution ? "yes" : "no"}`,
```

也会写出 sources：

```ts
`- Java order platform: ${report.sources.javaOrderPlatform.state} (${report.sources.javaOrderPlatform.message ?? "no message"})`,
`- mini-kv: ${report.sources.miniKv.state} (${report.sources.miniKv.message ?? "no message"})`,
```

在默认安全配置下，这两行应该显示 `disabled`，表示没有触碰上游。

## 6. Route 组装流程

文件：`src/routes/opsSummaryRoutes.ts`

V13 在 ops routes 里新增 query：

```ts
interface OpsHandoffReportQuery {
  format?: "json" | "markdown";
  limit?: number;
}
```

路由 schema 限制 `format` 和 `limit`：

```ts
format: { type: "string", enum: ["json", "markdown"] },
limit: { type: "integer", minimum: 1, maximum: 100 },
```

实际组装时，先生成 summary 和 readiness：

```ts
const summary = createOpsSummary(deps);
const readiness = createOpsReadiness(summary);
```

然后采样 sources，并读取最近记录：

```ts
const report = createOpsHandoffReport({
  sources: await deps.snapshots.sample(),
  summary,
  readiness,
  auditEvents: deps.auditLog.list(limit),
  intents: deps.operationIntents.list(limit),
  dispatches: deps.operationDispatches.list(limit),
  intentEvents: deps.operationIntents.listEvents({ limit }),
  limit,
});
```

这里的关键点是：`deps.snapshots.sample()` 是否触碰上游由 `UPSTREAM_PROBES_ENABLED` 控制。默认 false 时，`OpsSnapshotService` 会直接返回 disabled。

## 7. JSON / Markdown 分支

文件：`src/routes/opsSummaryRoutes.ts`

如果请求 Markdown：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsHandoffMarkdown(report);
}
```

否则返回 JSON：

```ts
return report;
```

所以同一个 report service 支持机器读取和人工阅读两种形态。

## 8. app 注入依赖

文件：`src/app.ts`

V13 给 ops routes 多传了 `snapshots`：

```ts
await registerOpsSummaryRoutes(app, { config, auditLog, operationIntents, operationDispatches, snapshots });
```

这保持了项目一贯的依赖注入风格：service 在 `app.ts` 创建，route 只拿自己需要的依赖。

## 9. Dashboard 入口

文件：`src/ui/dashboard.ts`

V13 在 Audit 操作区加了一个按钮：

```html
<button data-action="opsHandoffReport">Handoff Report</button>
```

点击后读取 JSON 版报告：

```js
if (action === "opsHandoffReport") {
  write(await api("/api/v1/ops/handoff-report?limit=10"));
}
```

这个按钮只读本地报告，不会触发 Java / mini-kv 写操作。

## 10. 测试覆盖

文件：`test/opsHandoffReport.test.ts`

第一个测试先创建一个 blocked intent 和 rejected dispatch，然后读取报告：

```ts
const report = await app.inject({
  method: "GET",
  url: "/api/v1/ops/handoff-report?limit=5",
});
```

断言默认 probe 关闭时，上游是 disabled：

```ts
sources: {
  javaOrderPlatform: {
    state: "disabled",
  },
  miniKv: {
    state: "disabled",
  },
},
```

同时报告必须带出本地 signals：

```ts
summary: {
  signals: {
    blockedIntents: 1,
    rejectedDispatches: 1,
    upstreamTouchedDispatches: 0,
  },
},
```

第二个测试验证 Markdown：

```ts
expect(response.headers["content-type"]).toContain("text/markdown");
expect(response.body).toContain("# OrderOps Handoff Report");
expect(response.body).toContain("- Readiness: blocked");
```

## 一句话总结

V13 把“这一轮 Node 控制面的状态证据”做成了可机器读取、也可人工阅读的 handoff report；它延续默认安全策略，不会打断 Java 高并发项目和 mini_kv 的调试流程。
