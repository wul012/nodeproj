export function dashboardHtml(): string {
  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OrderOps</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f7f9;
      --panel: #ffffff;
      --panel-soft: #eef3f8;
      --text: #172033;
      --muted: #667085;
      --line: #d9e0e8;
      --ok: #18794e;
      --warn: #b54708;
      --bad: #b42318;
      --accent: #2557a7;
      --accent-2: #0f766e;
      --shadow: 0 10px 30px rgba(23, 32, 51, 0.08);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
      letter-spacing: 0;
    }

    button,
    input,
    select,
    textarea {
      font: inherit;
    }

    .shell {
      max-width: 1240px;
      margin: 0 auto;
      padding: 20px;
    }

    .topbar {
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 20px;
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .brand h1 {
      margin: 0;
      font-size: 24px;
      line-height: 1.15;
    }

    .brand span,
    .time {
      color: var(--muted);
      font-size: 13px;
    }

    .grid {
      display: grid;
      gap: 16px;
    }

    .status-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-bottom: 16px;
    }

    .work-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: start;
    }

    .audit-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
      margin-bottom: 16px;
    }

    .card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 16px;
      min-width: 0;
    }

    .status-card {
      min-height: 132px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: space-between;
    }

    .card h2 {
      margin: 0 0 14px;
      font-size: 16px;
      line-height: 1.2;
    }

    .metric-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .metric-name {
      font-size: 14px;
      color: var(--muted);
    }

    .metric-value {
      font-size: 28px;
      line-height: 1;
      font-weight: 750;
      overflow-wrap: anywhere;
    }

    .badge {
      min-width: 74px;
      min-height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      border: 1px solid transparent;
    }

    .online {
      color: var(--ok);
      background: #e9f7ef;
      border-color: #b7e4c7;
    }

    .degraded {
      color: var(--warn);
      background: #fff4e5;
      border-color: #ffd8a8;
    }

    .offline {
      color: var(--bad);
      background: #fff0f0;
      border-color: #ffc9c9;
    }

    .disabled {
      color: #475467;
      background: #f2f4f7;
      border-color: #d0d5dd;
    }

    .muted {
      color: var(--muted);
      font-size: 13px;
      overflow-wrap: anywhere;
    }

    .row {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .row input,
    .row select {
      flex: 1 1 220px;
      min-width: 180px;
    }

    .row button {
      flex: 0 0 auto;
    }

    .stack {
      display: grid;
      gap: 10px;
    }

    input,
    select,
    textarea {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fff;
      color: var(--text);
      padding: 10px 11px;
      min-height: 40px;
      outline: none;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(37, 87, 167, 0.14);
    }

    select {
      appearance: none;
      cursor: pointer;
    }

    textarea {
      resize: vertical;
      min-height: 96px;
      line-height: 1.45;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
      font-size: 13px;
    }

    button {
      min-height: 40px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fff;
      color: var(--text);
      padding: 8px 12px;
      font-weight: 650;
      cursor: pointer;
    }

    button.primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }

    button.secondary {
      background: var(--accent-2);
      border-color: var(--accent-2);
      color: #fff;
    }

    button:disabled {
      cursor: wait;
      opacity: 0.7;
    }

    .output {
      min-height: 180px;
      max-height: 420px;
      overflow: auto;
      border-radius: 6px;
      border: 1px solid var(--line);
      background: #101828;
      color: #d8dee9;
      padding: 12px;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    @media (max-width: 880px) {
      .status-grid,
      .work-grid,
      .audit-grid,
      .split {
        grid-template-columns: 1fr;
      }

      .topbar {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header class="topbar">
      <div class="brand">
        <h1>OrderOps</h1>
        <span>Node control plane for order-platform and mini-kv</span>
      </div>
      <div class="time" id="sampledAt">Waiting for first sample</div>
    </header>

    <section class="grid status-grid">
      <article class="card status-card">
        <div class="metric-head">
          <div class="metric-name">Node gateway</div>
          <div class="badge online" id="nodeState">online</div>
        </div>
        <div class="metric-value" id="nodeUptime">0s</div>
        <div class="muted" id="nodeMeta">pid pending</div>
      </article>

      <article class="card status-card">
        <div class="metric-head">
          <div class="metric-name">Java order platform</div>
          <div class="badge offline" id="javaState">offline</div>
        </div>
        <div class="metric-value" id="javaLatency">-</div>
        <div class="muted" id="javaMessage">No sample yet</div>
      </article>

      <article class="card status-card">
        <div class="metric-head">
          <div class="metric-name">mini-kv</div>
          <div class="badge offline" id="kvState">offline</div>
        </div>
        <div class="metric-value" id="kvLatency">-</div>
        <div class="muted" id="kvMessage">No sample yet</div>
      </article>
    </section>

    <section class="grid audit-grid">
      <article class="card">
        <div class="metric-name">Audit total</div>
        <div class="metric-value" id="auditTotal">0</div>
        <div class="muted">Recent in-memory requests</div>
      </article>
      <article class="card">
        <div class="metric-name">Success</div>
        <div class="metric-value" id="auditSuccess">0</div>
        <div class="muted">2xx and 3xx responses</div>
      </article>
      <article class="card">
        <div class="metric-name">Errors</div>
        <div class="metric-value" id="auditErrors">0</div>
        <div class="muted">4xx and 5xx responses</div>
      </article>
      <article class="card">
        <div class="metric-name">Average</div>
        <div class="metric-value" id="auditAverage">0ms</div>
        <div class="muted" id="auditLatest">No requests yet</div>
      </article>
    </section>

    <section class="grid audit-grid">
      <article class="card">
        <div class="metric-name">Probe mode</div>
        <div class="metric-value" id="probeMode">-</div>
        <div class="muted">UPSTREAM_PROBES_ENABLED</div>
      </article>
      <article class="card">
        <div class="metric-name">Action mode</div>
        <div class="metric-value" id="actionMode">-</div>
        <div class="muted">UPSTREAM_ACTIONS_ENABLED</div>
      </article>
      <article class="card">
        <div class="metric-name">Order upstream</div>
        <div class="muted" id="orderUpstream">-</div>
      </article>
      <article class="card">
        <div class="metric-name">mini-kv upstream</div>
        <div class="muted" id="kvUpstream">-</div>
      </article>
    </section>

    <section class="grid work-grid">
      <article class="card">
        <h2>Order Platform</h2>
        <div class="row">
          <button class="primary" data-action="products">Products</button>
          <button data-action="outbox">Outbox</button>
        </div>
        <div class="row">
          <input id="orderId" placeholder="Order ID" inputmode="numeric">
          <button data-action="order">Load Order</button>
        </div>
        <textarea id="orderBody">{"customerId":"11111111-1111-1111-1111-111111111111","items":[{"productId":1,"quantity":1}]}</textarea>
        <div class="row">
          <input id="idempotencyKey" placeholder="Idempotency-Key" value="orderops-demo-001">
          <button class="secondary" data-action="createOrder">Create</button>
        </div>
      </article>

      <article class="card">
        <h2>mini-kv</h2>
        <div class="split">
          <input id="kvKey" placeholder="Key" value="orderops:demo">
          <input id="kvTtl" placeholder="TTL seconds">
        </div>
        <input id="kvValue" placeholder="Value" value="hello-from-orderops">
        <div class="row">
          <button class="primary" data-action="kvGet">Get</button>
          <button class="secondary" data-action="kvSet">Set</button>
          <button data-action="kvDelete">Delete</button>
          <button data-action="kvPing">Ping</button>
        </div>
        <div class="row">
          <input id="rawCommand" placeholder="Raw command" value="SIZE">
          <button data-action="rawCommand">Run</button>
        </div>
      </article>
    </section>

    <section class="card" style="margin-top:16px">
      <h2>Audit</h2>
      <div class="row">
        <button class="primary" data-action="auditSummary">Summary</button>
        <button data-action="auditEvents">Recent Events</button>
        <button data-action="runtimeConfig">Runtime Config</button>
      </div>
      <div class="row">
        <select id="planAction" aria-label="Action plan">
          <option value="order-products">Order: list products</option>
          <option value="order-outbox">Order: list outbox events</option>
          <option value="order-load">Order: load order</option>
          <option value="order-create">Order: create order</option>
          <option value="order-pay">Order: pay order</option>
          <option value="order-cancel">Order: cancel order</option>
          <option value="kv-status">mini-kv: ping and size</option>
          <option value="kv-get">mini-kv: get key</option>
          <option value="kv-set">mini-kv: set key</option>
          <option value="kv-delete">mini-kv: delete key</option>
          <option value="kv-command">mini-kv: raw command</option>
        </select>
        <button class="secondary" data-action="planAction">Plan Action</button>
        <button data-action="planCatalog">Catalog</button>
      </div>
      <div class="row">
        <input id="operatorId" placeholder="Operator ID" value="local-dev">
        <select id="operatorRole" aria-label="Operator role">
          <option value="admin">admin</option>
          <option value="operator">operator</option>
          <option value="viewer">viewer</option>
        </select>
        <input id="intentReason" placeholder="Reason" value="local V6 check">
        <button class="primary" data-action="createIntent">Create Intent</button>
        <button data-action="listIntents">List Intents</button>
      </div>
      <div class="row">
        <input id="intentId" placeholder="Intent ID">
        <input id="confirmText" placeholder="CONFIRM kv-set">
        <button class="secondary" data-action="confirmIntent">Confirm Intent</button>
        <button data-action="intentTimeline">Timeline</button>
        <button data-action="intentEvents">Event Feed</button>
      </div>
    </section>

    <section class="card" style="margin-top:16px">
      <h2>Output</h2>
      <pre class="output" id="output"></pre>
    </section>
  </main>

  <script>
    const $ = (id) => document.getElementById(id);
    const output = $("output");

    function setBadge(id, state) {
      const el = $(id);
      el.className = "badge " + state;
      el.textContent = state;
    }

    function write(data) {
      output.textContent = JSON.stringify(data, null, 2);
    }

    function flash(message) {
      output.textContent = message + "\n" + output.textContent;
    }

    async function api(path, options = {}) {
      const response = await fetch(path, {
        ...options,
        headers: {
          "content-type": "application/json",
          ...(options.headers || {}),
        },
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      if (!response.ok) {
        throw data;
      }
      return data;
    }

    function renderSnapshot(snapshot) {
      $("sampledAt").textContent = "Sampled " + snapshot.sampledAt;
      setBadge("nodeState", snapshot.node.state);
      $("nodeUptime").textContent = snapshot.node.uptimeSeconds + "s";
      $("nodeMeta").textContent = "pid " + snapshot.node.pid + " on " + snapshot.node.version;

      setBadge("javaState", snapshot.javaOrderPlatform.state);
      $("javaLatency").textContent = snapshot.javaOrderPlatform.latencyMs === undefined ? "-" : snapshot.javaOrderPlatform.latencyMs + "ms";
      $("javaMessage").textContent = snapshot.javaOrderPlatform.message || "";

      setBadge("kvState", snapshot.miniKv.state);
      $("kvLatency").textContent = snapshot.miniKv.latencyMs === undefined ? "-" : snapshot.miniKv.latencyMs + "ms";
      $("kvMessage").textContent = snapshot.miniKv.message || "";
    }

    async function refreshStatus() {
      renderSnapshot(await api("/api/v1/sources/status"));
    }

    async function refreshAudit() {
      const summary = await api("/api/v1/audit/summary");
      $("auditTotal").textContent = summary.total;
      $("auditSuccess").textContent = summary.success;
      $("auditErrors").textContent = summary.clientError + summary.serverError;
      $("auditAverage").textContent = summary.averageDurationMs + "ms";
      $("auditLatest").textContent = summary.latest ? summary.latest.method + " " + summary.latest.path : "No requests yet";
      return summary;
    }

    async function refreshRuntimeConfig() {
      const config = await api("/api/v1/runtime/config");
      $("probeMode").textContent = config.safety.upstreamProbesEnabled ? "on" : "off";
      $("actionMode").textContent = config.safety.upstreamActionsEnabled ? "on" : "off";
      $("orderUpstream").textContent = config.upstreams.orderPlatformUrl;
      $("kvUpstream").textContent = config.upstreams.miniKv;
      return config;
    }

    document.body.addEventListener("click", async (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) {
        return;
      }

      const action = button.dataset.action;
      button.disabled = true;
      try {
        if (action === "products") {
          write(await api("/api/v1/order-platform/products"));
        }
        if (action === "outbox") {
          write(await api("/api/v1/order-platform/outbox/events"));
        }
        if (action === "order") {
          write(await api("/api/v1/order-platform/orders/" + encodeURIComponent($("orderId").value)));
        }
        if (action === "createOrder") {
          write(await api("/api/v1/order-platform/orders", {
            method: "POST",
            headers: { "idempotency-key": $("idempotencyKey").value },
            body: $("orderBody").value,
          }));
        }
        if (action === "kvGet") {
          write(await api("/api/v1/mini-kv/" + encodeURIComponent($("kvKey").value)));
        }
        if (action === "kvSet") {
          const body = { value: $("kvValue").value };
          const ttl = Number($("kvTtl").value);
          if (Number.isInteger(ttl) && ttl > 0) {
            body.ttlSeconds = ttl;
          }
          write(await api("/api/v1/mini-kv/" + encodeURIComponent($("kvKey").value), {
            method: "PUT",
            body: JSON.stringify(body),
          }));
        }
        if (action === "kvDelete") {
          write(await api("/api/v1/mini-kv/" + encodeURIComponent($("kvKey").value), { method: "DELETE" }));
        }
        if (action === "kvPing") {
          write(await api("/api/v1/mini-kv/status"));
        }
        if (action === "rawCommand") {
          write(await api("/api/v1/mini-kv/commands", {
            method: "POST",
            body: JSON.stringify({ command: $("rawCommand").value }),
          }));
        }
        if (action === "auditSummary") {
          write(await refreshAudit());
        }
        if (action === "auditEvents") {
          write(await api("/api/v1/audit/events?limit=20"));
          void refreshAudit().catch(() => {});
        }
        if (action === "runtimeConfig") {
          write(await refreshRuntimeConfig());
        }
        if (action === "planAction") {
          write(await api("/api/v1/action-plans", {
            method: "POST",
            body: JSON.stringify({ action: $("planAction").value }),
          }));
        }
        if (action === "planCatalog") {
          write(await api("/api/v1/action-plans/catalog"));
        }
        if (action === "createIntent") {
          const intent = await api("/api/v1/operation-intents", {
            method: "POST",
            body: JSON.stringify({
              action: $("planAction").value,
              operatorId: $("operatorId").value,
              role: $("operatorRole").value,
              reason: $("intentReason").value,
            }),
          });
          $("intentId").value = intent.id;
          $("confirmText").value = intent.confirmation.requiredText;
          write(intent);
        }
        if (action === "listIntents") {
          write(await api("/api/v1/operation-intents?limit=20"));
        }
        if (action === "confirmIntent") {
          write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/confirm", {
            method: "POST",
            body: JSON.stringify({
              operatorId: $("operatorId").value,
              confirmText: $("confirmText").value,
            }),
          }));
        }
        if (action === "intentTimeline") {
          write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/timeline?limit=30"));
        }
        if (action === "intentEvents") {
          write(await api("/api/v1/operation-intent-events?limit=30"));
        }
      } catch (error) {
        write(error);
      } finally {
        button.disabled = false;
      }
    });

    const events = new EventSource("/api/v1/events/ops");
    events.addEventListener("snapshot", (event) => renderSnapshot(JSON.parse(event.data)));
    events.addEventListener("error", () => flash("Live stream disconnected; polling fallback is active."));
    setInterval(() => {
      if (events.readyState !== EventSource.OPEN) {
        void refreshStatus().catch(write);
      }
    }, 5000);
    void refreshStatus().catch(write);
    void refreshAudit().catch(() => {});
    void refreshRuntimeConfig().catch(() => {});
  </script>
</body>
</html>`;
}
