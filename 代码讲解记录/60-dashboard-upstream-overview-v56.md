# 第五十六版代码讲解：Dashboard 上游观察详情面板

本版先按 `docs/plans/README.md` 的规则读取最新计划，再执行 `docs/plans/v54-post-infojson-roadmap.md` 中的 Node v56：把 v53-v55 已接入的只读上游信号从原始 JSON 输出，整理成 Dashboard 上可扫描的详情面板。

本版只改 Node Dashboard，不改 Java，不改 mini-kv，不新增任何上游写操作。

## 1. 页面结构新增三列详情面板

位置：`src/ui/dashboard.ts`

新增的 HTML 区域是：

```html
<section class="grid overview-grid">
  <article class="card">
    <div class="metric-head">
      <h2>Upstream Overview</h2>
      <div class="badge disabled" id="overviewOverallState">pending</div>
    </div>
    ...
  </article>

  <article class="card">
    <h2>Java Signals</h2>
    ...
  </article>

  <article class="card">
    <h2>mini-kv Signals</h2>
    ...
  </article>
</section>
```

三张卡片分别承担：

```text
Upstream Overview -> 总体状态、安全开关、Java/mini-kv 状态、推荐下一步
Java Signals      -> health、business overview、orders/outbox、failed-event summary、backlog、pending approvals
mini-kv Signals   -> version/protocol、live keys、WAL/metrics、COMMANDSJSON catalog、risk counts
```

这比之前只点 `Upstream Overview` 按钮看 JSON 更适合日常扫视。

## 2. CSS 保持现有控制台风格

新增布局类：

```css
.overview-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 16px;
}
```

新增信号行：

```css
.signal-row {
  display: grid;
  grid-template-columns: minmax(120px, 0.7fr) minmax(0, 1fr);
  gap: 10px;
  align-items: baseline;
  min-height: 24px;
  border-bottom: 1px solid #eef2f6;
  padding-bottom: 7px;
}
```

这里没有做图表和复杂视觉装饰，只把密集信息分行展示，符合当前 Dashboard 的运维控制面定位。

响应式也跟随已有规则：

```css
@media (max-width: 880px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
}
```

## 3. 前端渲染函数读取已有 overview API

本版没有新增后端接口，继续使用 v52-v55 已经稳定的：

```text
GET /api/v1/upstreams/overview
```

新增：

```js
async function refreshUpstreamOverview() {
  const overview = await api("/api/v1/upstreams/overview");
  renderUpstreamOverview(overview);
  return overview;
}
```

页面初始化时自动调用：

```js
void refreshUpstreamOverview().catch(() => {});
```

按钮也从只输出 JSON 改为先刷新面板，再输出原始 JSON：

```js
if (action === "upstreamOverview") {
  write(await refreshUpstreamOverview());
}
```

这保留了原有调试能力，同时让用户不用每次看原始 JSON。

## 4. renderUpstreamOverview 的字段映射

核心函数：

```js
function renderUpstreamOverview(overview) {
  const java = overview.upstreams.javaOrderPlatform;
  const kv = overview.upstreams.miniKv;
  const javaSignals = java.signals || {};
  const kvSignals = kv.signals || {};
  const javaOrders = javaSignals.orders || {};
  const javaOutbox = javaSignals.outbox || {};
  const commandCounts = kvSignals.commandCatalogCounts || {};
  ...
}
```

Java 面板读取：

```js
setText("javaHealthSignal", javaSignals.healthStatus || java.state);
setText("javaBusinessSignal", formatAvailable(javaSignals.businessOverviewAvailable));
setText("javaOrdersSignal", "orders " + formatNumber(javaOrders.total) + " / outbox " + formatNumber(javaOutbox.pending));
setText("javaFailedSummarySignal", formatAvailable(javaSignals.failedEventSummaryAvailable));
setText("javaBacklogSignal", formatNumber(javaSignals.failedEventReplayBacklog));
setText("javaApprovalsSignal", formatNumber(javaSignals.failedEventPendingReplayApprovals));
```

mini-kv 面板读取：

```js
setText("kvIdentitySignal", (kvSignals.version || "-") + " / " + ((kvSignals.protocol || []).join(",") || "-"));
setText("kvStoreSignal", "keys " + formatNumber(kvSignals.liveKeys));
setText("kvWalSignal", "wal " + formatBool(kvSignals.walEnabled) + " / metrics " + formatBool(kvSignals.metricsEnabled));
setText("kvCommandSignal", formatAvailable(kvSignals.commandCatalogAvailable) + " / total " + formatNumber(commandCounts.total));
setText("kvRiskSignal", "write " + formatNumber(kvSignals.writeCommandCount) + " / admin " + formatNumber(kvSignals.adminCommandCount) + " / mutating " + formatNumber(kvSignals.mutatingCommandCount));
```

这些字段都来自后端已有 signals，没有在前端重新发明业务判断。

## 5. 测试覆盖

新增：

```text
test/dashboard.test.ts
```

测试只做稳定 DOM 和脚本入口检查：

```ts
expect(html).toContain("Upstream Overview");
expect(html).toContain('id="javaFailedSummarySignal"');
expect(html).toContain('id="kvRiskSignal"');
expect(html).toContain("function renderUpstreamOverview");
expect(html).toContain("refreshUpstreamOverview");
```

这个测试不模拟浏览器，只保证服务端生成的 Dashboard HTML 包含 v56 的核心面板和刷新函数。

## 6. 真实运行截图

运行截图：

```text
a/56/图片/04-dashboard-upstream-overview.png
```

截图中可以看到：

```text
Upstream Overview: online
Safety: probes on / actions off
Java Signals: business available, failed summary available, replay backlog 0
mini-kv Signals: 0.46.0 / inline,resp, catalog available / total 23, write 3 / admin 4 / mutating 4
```

这说明 v56 达成：用户不用只看 JSON，也能在 Dashboard 一眼看到三项目只读集成状态。
