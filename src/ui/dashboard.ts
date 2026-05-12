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

    .overview-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
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

    .signal-list {
      display: grid;
      gap: 8px;
    }

    .signal-row {
      display: grid;
      grid-template-columns: minmax(120px, 0.7fr) minmax(0, 1fr);
      gap: 10px;
      align-items: baseline;
      min-height: 24px;
      border-bottom: 1px solid #eef2f6;
      padding-bottom: 7px;
    }

    .signal-row:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .signal-label {
      color: var(--muted);
      font-size: 12px;
    }

    .signal-value {
      font-size: 13px;
      font-weight: 700;
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
      .overview-grid,
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

    <section class="grid overview-grid">
      <article class="card">
        <div class="metric-head">
          <h2>Fixture Report</h2>
          <div class="badge disabled" id="fixtureReportState">pending</div>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Digest</div>
            <div class="signal-value" id="fixtureDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Java fixture</div>
            <div class="signal-value" id="fixtureJavaStatusSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">mini-kv fixture</div>
            <div class="signal-value" id="fixtureMiniKvStatusSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Endpoints</div>
            <div class="signal-value">
              <a id="fixtureReportJsonLink" href="/api/v1/upstream-contract-fixtures">JSON</a>
              /
              <a id="fixtureReportMarkdownLink" href="/api/v1/upstream-contract-fixtures?format=markdown">Markdown</a>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Java Contract Fixture</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Contract digest</div>
            <div class="signal-value" id="fixtureJavaContractDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Preconditions</div>
            <div class="signal-value" id="fixtureJavaPreconditionsSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Execution checks</div>
            <div class="signal-value" id="fixtureJavaExecutionChecksSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Side effects</div>
            <div class="signal-value" id="fixtureJavaSideEffectsSignal">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>mini-kv Fixture Drift</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Command digest</div>
            <div class="signal-value" id="fixtureMiniKvCommandDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Read / execute</div>
            <div class="signal-value" id="fixtureMiniKvReadExecuteSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Side effects</div>
            <div class="signal-value" id="fixtureMiniKvSideEffectsSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Drift</div>
            <div class="signal-value" id="fixtureDriftSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Mappings</div>
            <div class="signal-value" id="fixtureDriftMappingSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Drift endpoints</div>
            <div class="signal-value">
              <a id="fixtureDriftJsonLink" href="/api/v1/upstream-contract-fixtures/drift-diagnostics">JSON</a>
              /
              <a id="fixtureDriftMarkdownLink" href="/api/v1/upstream-contract-fixtures/drift-diagnostics?format=markdown">Markdown</a>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="grid overview-grid">
      <article class="card">
        <div class="metric-head">
          <h2>Scenario Matrix</h2>
          <div class="badge disabled" id="scenarioMatrixState">pending</div>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Matrix digest</div>
            <div class="signal-value" id="scenarioMatrixDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Scenarios</div>
            <div class="signal-value" id="scenarioMatrixCountSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Issues</div>
            <div class="signal-value" id="scenarioMatrixIssueSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Endpoints</div>
            <div class="signal-value">
              <a id="scenarioMatrixJsonLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix">JSON</a>
              /
              <a id="scenarioMatrixMarkdownLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown">Markdown</a>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Java Scenario Matrix</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Approved replay</div>
            <div class="signal-value" id="scenarioJavaApprovedSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Blocked replay</div>
            <div class="signal-value" id="scenarioJavaBlockedSignal">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>mini-kv Scenario Matrix</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Write CHECKJSON</div>
            <div class="signal-value" id="scenarioMiniKvWriteSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Read CHECKJSON</div>
            <div class="signal-value" id="scenarioMiniKvReadSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Drift</div>
            <div class="signal-value" id="scenarioMatrixDriftSignal">-</div>
          </div>
        </div>
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

    <section class="grid overview-grid">
      <article class="card">
        <div class="metric-head">
          <h2>Upstream Overview</h2>
          <div class="badge disabled" id="overviewOverallState">pending</div>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Safety</div>
            <div class="signal-value" id="overviewSafety">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Java</div>
            <div class="signal-value" id="overviewJavaState">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">mini-kv</div>
            <div class="signal-value" id="overviewKvState">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Next</div>
            <div class="signal-value" id="overviewNextAction">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Java Signals</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Health</div>
            <div class="signal-value" id="javaHealthSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Business</div>
            <div class="signal-value" id="javaBusinessSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Orders</div>
            <div class="signal-value" id="javaOrdersSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Failed summary</div>
            <div class="signal-value" id="javaFailedSummarySignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Replay backlog</div>
            <div class="signal-value" id="javaBacklogSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Pending approvals</div>
            <div class="signal-value" id="javaApprovalsSignal">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>mini-kv Signals</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Identity</div>
            <div class="signal-value" id="kvIdentitySignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Store</div>
            <div class="signal-value" id="kvStoreSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">WAL / metrics</div>
            <div class="signal-value" id="kvWalSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Catalog</div>
            <div class="signal-value" id="kvCommandSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Risk counts</div>
            <div class="signal-value" id="kvRiskSignal">-</div>
          </div>
        </div>
      </article>
    </section>

    <section class="grid audit-grid">
      <article class="card">
        <div class="metric-name">Ops intents</div>
        <div class="metric-value" id="opsIntentTotal">0</div>
        <div class="muted" id="opsIntentSignal">No intents yet</div>
      </article>
      <article class="card">
        <div class="metric-name">Dispatches</div>
        <div class="metric-value" id="opsDispatchTotal">0</div>
        <div class="muted" id="opsDispatchSignal">No dispatches yet</div>
      </article>
      <article class="card">
        <div class="metric-name">Timeline events</div>
        <div class="metric-value" id="opsEventTotal">0</div>
        <div class="muted" id="opsEventSignal">No events yet</div>
      </article>
      <article class="card">
        <div class="metric-name">Rate limited</div>
        <div class="metric-value" id="opsRateLimited">0</div>
        <div class="muted" id="opsRateLimitConfig">-</div>
      </article>
    </section>

    <section class="grid audit-grid">
      <article class="card">
        <div class="metric-name">Readiness</div>
        <div class="metric-value" id="opsReadinessState">-</div>
        <div class="muted" id="opsReadinessReady">Not checked</div>
      </article>
      <article class="card">
        <div class="metric-name">Blockers</div>
        <div class="metric-value" id="opsReadinessBlockers">0</div>
        <div class="muted" id="opsReadinessBlockerText">No blockers checked</div>
      </article>
      <article class="card">
        <div class="metric-name">Warnings</div>
        <div class="metric-value" id="opsReadinessWarnings">0</div>
        <div class="muted" id="opsReadinessWarningText">No warnings checked</div>
      </article>
      <article class="card">
        <div class="metric-name">Next action</div>
        <div class="muted" id="opsReadinessNext">-</div>
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
        <div class="row">
          <input id="failedEventId" placeholder="Failed event ID" inputmode="numeric">
          <button data-action="failedEventReadiness">Replay Readiness</button>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Replay readiness</div>
            <div class="signal-value" id="failedEventReadinessSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Blockers</div>
            <div class="signal-value" id="failedEventBlockersSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Next actions</div>
            <div class="signal-value" id="failedEventNextActionsSignal">-</div>
          </div>
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
        <div class="row">
          <input id="kvPrefix" placeholder="Key prefix" value="orderops:">
          <button data-action="kvInventory">Key Inventory</button>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Inventory</div>
            <div class="signal-value" id="kvInventorySignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Truncated</div>
            <div class="signal-value" id="kvInventoryTruncatedSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Keys</div>
            <div class="signal-value" id="kvInventoryKeysSignal">-</div>
          </div>
        </div>
      </article>
    </section>

    <section class="card" style="margin-top:16px">
      <h2>Audit</h2>
      <div class="row">
        <button class="primary" data-action="auditSummary">Summary</button>
        <button data-action="auditEvents">Recent Events</button>
        <button data-action="runtimeConfig">Runtime Config</button>
        <button data-action="upstreamOverview">Upstream Overview</button>
        <button data-action="fixtureDiagnostics">Fixture Diagnostics</button>
        <button data-action="fixtureReportMarkdown">Fixture Report Markdown</button>
        <button data-action="fixtureDriftMarkdown">Fixture Drift Markdown</button>
        <button data-action="scenarioMatrix">Scenario Matrix</button>
        <button data-action="scenarioMatrixMarkdown">Scenario Matrix Markdown</button>
        <button data-action="opsSummary">Ops Summary</button>
        <button data-action="opsReadiness">Readiness</button>
        <button data-action="opsRunbook">Runbook</button>
        <button data-action="opsCreateCheckpoint">Create Checkpoint</button>
        <button data-action="opsListCheckpoints">Checkpoints</button>
        <button data-action="opsDiffCheckpoints">Diff Latest</button>
        <button data-action="opsSetBaseline">Set Baseline</button>
        <button data-action="opsBaseline">Baseline</button>
        <button data-action="opsPromotionReview">Promotion Review</button>
        <button data-action="opsRecordPromotionDecision">Record Decision</button>
        <button data-action="opsPromotionDecisions">Decisions</button>
        <button data-action="opsVerifyPromotionDecision">Verify Latest Decision</button>
        <button data-action="opsPromotionEvidence">Evidence Report</button>
        <button data-action="opsPromotionIntegrity">Ledger Integrity</button>
        <button data-action="opsPromotionIntegrityReport">Integrity Report</button>
        <button data-action="opsPromotionArchive">Archive Bundle</button>
        <button data-action="opsPromotionArchiveReport">Archive Report</button>
        <button data-action="opsPromotionArchiveManifest">Archive Manifest</button>
        <button data-action="opsPromotionArchiveManifestReport">Manifest Report</button>
        <button data-action="opsPromotionArchiveVerification">Archive Verification</button>
        <button data-action="opsPromotionArchiveVerificationReport">Verification Report</button>
        <button data-action="opsPromotionArchiveAttestation">Archive Attestation</button>
        <button data-action="opsPromotionArchiveAttestationReport">Attestation Report</button>
        <button data-action="opsPromotionArchiveAttestationVerification">Attestation Verification</button>
        <button data-action="opsPromotionArchiveAttestationVerificationReport">Attestation Verification Report</button>
        <button data-action="opsPromotionHandoffPackage">Handoff Package</button>
        <button data-action="opsPromotionHandoffPackageReport">Handoff Package Report</button>
        <button data-action="opsPromotionHandoffPackageVerification">Package Verification</button>
        <button data-action="opsPromotionHandoffPackageVerificationReport">Package Verification Report</button>
        <button data-action="opsPromotionHandoffCertificate">Handoff Certificate</button>
        <button data-action="opsPromotionHandoffCertificateReport">Handoff Certificate Report</button>
        <button data-action="opsPromotionHandoffCertificateVerification">Certificate Verification</button>
        <button data-action="opsPromotionHandoffCertificateVerificationReport">Certificate Verification Report</button>
        <button data-action="opsPromotionHandoffReceipt">Handoff Receipt</button>
        <button data-action="opsPromotionHandoffReceiptReport">Handoff Receipt Report</button>
        <button data-action="opsPromotionHandoffReceiptVerification">Receipt Verification</button>
        <button data-action="opsPromotionHandoffReceiptVerificationReport">Receipt Verification Report</button>
        <button data-action="opsPromotionHandoffClosure">Handoff Closure</button>
        <button data-action="opsPromotionHandoffClosureReport">Handoff Closure Report</button>
        <button data-action="opsPromotionHandoffClosureVerification">Closure Verification</button>
        <button data-action="opsPromotionHandoffClosureVerificationReport">Closure Verification Report</button>
        <button data-action="opsPromotionHandoffCompletion">Handoff Completion</button>
        <button data-action="opsPromotionHandoffCompletionReport">Completion Report</button>
        <button data-action="opsPromotionHandoffCompletionVerification">Completion Verification</button>
        <button data-action="opsPromotionHandoffCompletionVerificationReport">Completion Verification Report</button>
        <button data-action="opsPromotionReleaseEvidence">Release Evidence</button>
        <button data-action="opsPromotionReleaseEvidenceReport">Release Evidence Report</button>
        <button data-action="opsPromotionReleaseEvidenceVerification">Release Evidence Verification</button>
        <button data-action="opsPromotionReleaseEvidenceVerificationReport">Release Evidence Verification Report</button>
        <button data-action="opsPromotionReleaseArchive">Release Archive</button>
        <button data-action="opsPromotionReleaseArchiveReport">Release Archive Report</button>
        <button data-action="opsPromotionReleaseArchiveVerification">Release Archive Verification</button>
        <button data-action="opsPromotionReleaseArchiveVerificationReport">Release Archive Verification Report</button>
        <button data-action="opsPromotionDeploymentApproval">Deployment Approval</button>
        <button data-action="opsPromotionDeploymentApprovalReport">Deployment Approval Report</button>
        <button data-action="opsPromotionDeploymentApprovalVerification">Deployment Approval Verification</button>
        <button data-action="opsPromotionDeploymentApprovalVerificationReport">Deployment Approval Verification Report</button>
        <button data-action="opsPromotionDeploymentChangeRecord">Deployment Change Record</button>
        <button data-action="opsPromotionDeploymentChangeRecordReport">Deployment Change Record Report</button>
        <button data-action="opsPromotionDeploymentChangeRecordVerification">Deployment Change Verification</button>
        <button data-action="opsPromotionDeploymentChangeRecordVerificationReport">Deployment Change Verification Report</button>
        <button data-action="opsPromotionDeploymentExecutionRecord">Deployment Execution Record</button>
        <button data-action="opsPromotionDeploymentExecutionRecordReport">Deployment Execution Record Report</button>
        <button data-action="opsPromotionDeploymentExecutionRecordVerification">Deployment Execution Verification</button>
        <button data-action="opsPromotionDeploymentExecutionRecordVerificationReport">Deployment Execution Verification Report</button>
        <button data-action="opsPromotionDeploymentExecutionReceipt">Deployment Execution Receipt</button>
        <button data-action="opsPromotionDeploymentExecutionReceiptReport">Deployment Execution Receipt Report</button>
        <button data-action="opsPromotionDeploymentExecutionReceiptVerification">Deployment Receipt Verification</button>
        <button data-action="opsPromotionDeploymentExecutionReceiptVerificationReport">Deployment Receipt Verification Report</button>
        <button data-action="opsPromotionReleaseAuditTrailRecord">Release Audit Trail Record</button>
        <button data-action="opsPromotionReleaseAuditTrailRecordReport">Release Audit Trail Report</button>
        <button data-action="opsHandoffReport">Handoff Report</button>
      </div>
      <div class="row">
        <select id="planAction" aria-label="Action plan">
          <option value="order-products">Order: list products</option>
          <option value="order-outbox">Order: list outbox events</option>
          <option value="order-load">Order: load order</option>
          <option value="failed-event-replay-readiness">Order: replay readiness</option>
          <option value="failed-event-replay-simulation">Order: replay simulation</option>
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
        <input id="intentReason" placeholder="Reason" value="local V8 check">
        <input id="intentKey" placeholder="Idempotency-Key" value="v8-local-intent-001">
        <button class="primary" data-action="createIntent">Create Intent</button>
        <button data-action="listIntents">List Intents</button>
      </div>
      <div class="row">
        <input id="intentId" placeholder="Intent ID">
        <input id="confirmText" placeholder="CONFIRM kv-set">
        <button class="secondary" data-action="confirmIntent">Confirm Intent</button>
        <button class="primary" data-action="dispatchIntent">Dispatch Dry Run</button>
        <button data-action="intentPreflight">Preflight</button>
        <button data-action="intentPreflightReport">Report</button>
        <button data-action="intentPreflightVerification">Verify Report</button>
        <button data-action="intentExecutionPreview">Execution Preview</button>
        <button class="secondary" data-action="createApprovalRequest">Request Approval</button>
        <button data-action="listApprovalRequests">Approval Requests</button>
        <button data-action="intentTimeline">Timeline</button>
        <button data-action="intentEvents">Event Feed</button>
        <button data-action="listDispatches">Dispatches</button>
      </div>
      <div class="row">
        <input id="approvalRequestId" placeholder="Approval Request ID">
        <input id="approvalDecisionReason" placeholder="Decision reason" value="reviewed local approval evidence">
        <button class="secondary" data-action="approveApprovalRequest">Approve Request</button>
        <button data-action="rejectApprovalRequest">Reject Request</button>
        <button data-action="listApprovalDecisions">Approval Decisions</button>
        <button class="secondary" data-action="approvalEvidenceReport">Evidence Report</button>
        <button data-action="approvalEvidenceVerification">Verify Evidence</button>
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

    function setText(id, value) {
      $(id).textContent = value === undefined || value === null || value === "" ? "-" : String(value);
    }

    function formatBool(value) {
      if (value === true) {
        return "yes";
      }
      if (value === false) {
        return "no";
      }
      return "-";
    }

    function formatNumber(value) {
      return Number.isFinite(value) ? String(value) : "-";
    }

    function formatAvailable(value) {
      return value === true ? "available" : "missing";
    }

    function formatList(value) {
      return Array.isArray(value) && value.length > 0 ? value.join(", ") : "-";
    }

    function formatDigest(value) {
      return typeof value === "string" && value.length > 0 ? value : "-";
    }

    function formatCheckRatio(checks, prefix) {
      const entries = Object.entries(checks || {}).filter(([name]) => name.startsWith(prefix));
      const passing = entries.filter(([, value]) => value === true).length;
      return entries.length === 0 ? "-" : passing + "/" + entries.length + " ok";
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

    function renderUpstreamOverview(overview) {
      const java = overview.upstreams.javaOrderPlatform;
      const kv = overview.upstreams.miniKv;
      const javaSignals = java.signals || {};
      const kvSignals = kv.signals || {};
      const javaOrders = javaSignals.orders || {};
      const javaOutbox = javaSignals.outbox || {};
      const commandCounts = kvSignals.commandCatalogCounts || {};

      setBadge("overviewOverallState", overview.overallState);
      setText("overviewSafety", "probes " + (overview.safety.upstreamProbesEnabled ? "on" : "off") + " / actions " + (overview.safety.upstreamActionsEnabled ? "on" : "off"));
      setText("overviewJavaState", java.state + (java.latencyMs === undefined ? "" : " / " + java.latencyMs + "ms"));
      setText("overviewKvState", kv.state + (kv.latencyMs === undefined ? "" : " / " + kv.latencyMs + "ms"));
      setText("overviewNextAction", overview.recommendedNextActions[0]);

      setText("javaHealthSignal", javaSignals.healthStatus || java.state);
      setText("javaBusinessSignal", formatAvailable(javaSignals.businessOverviewAvailable));
      setText("javaOrdersSignal", "orders " + formatNumber(javaOrders.total) + " / outbox " + formatNumber(javaOutbox.pending));
      setText("javaFailedSummarySignal", formatAvailable(javaSignals.failedEventSummaryAvailable));
      setText("javaBacklogSignal", formatNumber(javaSignals.failedEventReplayBacklog));
      setText("javaApprovalsSignal", formatNumber(javaSignals.failedEventPendingReplayApprovals));

      setText("kvIdentitySignal", (kvSignals.version || "-") + " / " + ((kvSignals.protocol || []).join(",") || "-"));
      setText("kvStoreSignal", "keys " + formatNumber(kvSignals.liveKeys));
      setText("kvWalSignal", "wal " + formatBool(kvSignals.walEnabled) + " / metrics " + formatBool(kvSignals.metricsEnabled));
      setText("kvCommandSignal", formatAvailable(kvSignals.commandCatalogAvailable) + " / total " + formatNumber(commandCounts.total));
      setText("kvRiskSignal", "write " + formatNumber(kvSignals.writeCommandCount) + " / admin " + formatNumber(kvSignals.adminCommandCount) + " / mutating " + formatNumber(kvSignals.mutatingCommandCount));
      setText("kvInventorySignal", formatAvailable(kvSignals.keyInventoryAvailable) + " / count " + formatNumber(kvSignals.keyInventoryKeyCount));
      setText("kvInventoryTruncatedSignal", formatBool(kvSignals.keyInventoryTruncated) + " / limit " + formatNumber(kvSignals.keyInventoryLimit));
      setText("kvInventoryKeysSignal", formatList(kvSignals.keyInventorySampleKeys));
    }

    function renderFailedEventReadiness(readiness) {
      const state = readiness.exists === false
        ? "not found"
        : (readiness.eligibleForReplay ? "eligible" : "blocked");
      setText("failedEventReadinessSignal", state + " / approval " + (readiness.requiresApproval ? "required" : "not required"));
      setText("failedEventBlockersSignal", formatList(readiness.blockedBy));
      setText("failedEventNextActionsSignal", formatList(readiness.nextAllowedActions));
    }

    async function refreshFailedEventReadiness() {
      const failedEventId = $("failedEventId").value.trim();
      if (!/^\\d+$/.test(failedEventId)) {
        throw { error: "FAILED_EVENT_ID_REQUIRED", message: "Enter a numeric failed event ID." };
      }
      const readiness = await api("/api/v1/order-platform/failed-events/" + encodeURIComponent(failedEventId) + "/replay-readiness");
      renderFailedEventReadiness(readiness);
      return readiness;
    }

    function renderMiniKvKeyInventory(result) {
      const inventory = result.inventory || result;
      setText("kvInventorySignal", "prefix " + (inventory.prefix || "-") + " / count " + formatNumber(inventory.key_count));
      setText("kvInventoryTruncatedSignal", formatBool(inventory.truncated) + " / limit " + formatNumber(inventory.limit));
      setText("kvInventoryKeysSignal", formatList(inventory.keys));
    }

    function renderFixtureDiagnostics(report, drift) {
      setBadge("fixtureReportState", report.valid ? "online" : "degraded");
      setText("fixtureDigestSignal", report.fixtureDigest.algorithm + ":" + report.fixtureDigest.value);
      setText("fixtureJavaStatusSignal", report.summary.javaFixtureStatus);
      setText("fixtureMiniKvStatusSignal", report.summary.miniKvFixtureStatus);

      setText("fixtureJavaContractDigestSignal", formatDigest(report.summary.javaContractDigest));
      setText("fixtureJavaPreconditionsSignal", formatBool(report.summary.javaReplayPreconditionsSatisfied));
      setText("fixtureJavaExecutionChecksSignal", formatCheckRatio(report.checks, "java"));
      setText("fixtureJavaSideEffectsSignal", formatNumber(report.summary.javaExpectedSideEffectCount));

      setText("fixtureMiniKvCommandDigestSignal", formatDigest(report.summary.miniKvCommandDigest));
      setText("fixtureMiniKvReadExecuteSignal", "read_only " + formatBool(report.summary.miniKvReadOnly) + " / execution_allowed " + formatBool(report.summary.miniKvExecutionAllowed));
      setText("fixtureMiniKvSideEffectsSignal", formatNumber(report.summary.miniKvSideEffectCount));
      setText("fixtureDriftSignal", (drift.summary.issueCount > 0 ? "yes" : "no") + " / issues " + formatNumber(drift.summary.issueCount) + " / errors " + formatNumber(drift.summary.errorCount));
      setText("fixtureDriftMappingSignal", "missing " + formatNumber(drift.summary.missingMappingCount) + " / total " + formatNumber(drift.mappings.length));
    }

    async function refreshFixtureDiagnostics() {
      const [report, drift] = await Promise.all([
        api("/api/v1/upstream-contract-fixtures"),
        api("/api/v1/upstream-contract-fixtures/drift-diagnostics"),
      ]);
      renderFixtureDiagnostics(report, drift);
      return { fixtureReport: report, driftDiagnostics: drift };
    }

    function findScenario(matrix, id) {
      return (matrix.scenarios || []).find((scenario) => scenario.id === id);
    }

    function formatScenarioStatus(scenario) {
      if (!scenario) {
        return "-";
      }
      return [
        "valid " + formatBool(scenario.valid),
        "ready " + formatBool(scenario.diagnosticReady),
        "failing " + formatNumber(scenario.failingCheckCount) + "/" + formatNumber(scenario.checkCount),
      ].join(" / ");
    }

    function renderScenarioMatrix(matrix) {
      setBadge("scenarioMatrixState", matrix.valid ? "online" : "degraded");
      setText("scenarioMatrixDigestSignal", matrix.matrixDigest.algorithm + ":" + matrix.matrixDigest.value);
      setText(
        "scenarioMatrixCountSignal",
        formatNumber(matrix.summary.validScenarios) + "/" + formatNumber(matrix.summary.totalScenarios) + " valid / ready " + formatNumber(matrix.summary.diagnosticReadyScenarios),
      );
      setText(
        "scenarioMatrixIssueSignal",
        "issues " + formatNumber(matrix.summary.issueCount) + " / drift " + formatBool(matrix.driftSummary.hasDrift),
      );
      setText("scenarioJavaApprovedSignal", formatScenarioStatus(findScenario(matrix, "java-approved-replay-contract")));
      setText("scenarioJavaBlockedSignal", formatScenarioStatus(findScenario(matrix, "java-blocked-replay-contract")));
      setText("scenarioMiniKvWriteSignal", formatScenarioStatus(findScenario(matrix, "mini-kv-write-checkjson")));
      setText("scenarioMiniKvReadSignal", formatScenarioStatus(findScenario(matrix, "mini-kv-read-checkjson")));
      setText("scenarioMatrixDriftSignal", "issues " + formatNumber(matrix.driftSummary.issueCount));
    }

    async function refreshScenarioMatrix() {
      const matrix = await api("/api/v1/upstream-contract-fixtures/scenario-matrix");
      renderScenarioMatrix(matrix);
      return matrix;
    }

    async function refreshMiniKvKeyInventory() {
      const prefix = $("kvPrefix").value.trim();
      const query = prefix.length > 0 ? "?prefix=" + encodeURIComponent(prefix) : "";
      const inventory = await api("/api/v1/mini-kv/keys" + query);
      renderMiniKvKeyInventory(inventory);
      return inventory;
    }

    async function refreshUpstreamOverview() {
      const overview = await api("/api/v1/upstreams/overview");
      renderUpstreamOverview(overview);
      return overview;
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

    async function refreshOpsSummary() {
      const summary = await api("/api/v1/ops/summary");
      $("opsIntentTotal").textContent = summary.intents.total;
      $("opsIntentSignal").textContent = "blocked " + summary.signals.blockedIntents + " / pending " + summary.signals.pendingConfirmations;
      $("opsDispatchTotal").textContent = summary.dispatches.total;
      $("opsDispatchSignal").textContent = "rejected " + summary.signals.rejectedDispatches + " / dry-run " + summary.signals.dryRunDispatches;
      $("opsEventTotal").textContent = summary.events.total;
      $("opsEventSignal").textContent = summary.events.latest ? summary.events.latest.type : "No events yet";
      $("opsRateLimited").textContent = summary.signals.rateLimitedRequests;
      $("opsRateLimitConfig").textContent = summary.mutationRateLimit.maxRequests + " per " + Math.round(summary.mutationRateLimit.windowMs / 1000) + "s";
      return summary;
    }

    async function refreshOpsReadiness() {
      const readiness = await api("/api/v1/ops/readiness");
      $("opsReadinessState").textContent = readiness.state;
      $("opsReadinessReady").textContent = readiness.readyForUpstreamExecution ? "ready for execution" : "not ready for execution";
      $("opsReadinessBlockers").textContent = readiness.blockers;
      $("opsReadinessWarnings").textContent = readiness.warnings;
      const firstBlocker = readiness.checks.find((check) => check.severity === "blocker");
      const firstWarning = readiness.checks.find((check) => check.severity === "warning");
      $("opsReadinessBlockerText").textContent = firstBlocker ? firstBlocker.code : "No blockers";
      $("opsReadinessWarningText").textContent = firstWarning ? firstWarning.code : "No warnings";
      $("opsReadinessNext").textContent = readiness.nextActions[0] || "No action needed";
      return readiness;
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
        if (action === "failedEventReadiness") {
          write(await refreshFailedEventReadiness());
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
        if (action === "kvInventory") {
          write(await refreshMiniKvKeyInventory());
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
        if (action === "upstreamOverview") {
          write(await refreshUpstreamOverview());
        }
        if (action === "fixtureDiagnostics") {
          write(await refreshFixtureDiagnostics());
        }
        if (action === "fixtureReportMarkdown") {
          const response = await fetch("/api/v1/upstream-contract-fixtures?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "fixtureDriftMarkdown") {
          const response = await fetch("/api/v1/upstream-contract-fixtures/drift-diagnostics?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "scenarioMatrix") {
          write(await refreshScenarioMatrix());
        }
        if (action === "scenarioMatrixMarkdown") {
          const response = await fetch("/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsSummary") {
          write(await refreshOpsSummary());
        }
        if (action === "opsReadiness") {
          write(await refreshOpsReadiness());
        }
        if (action === "opsRunbook") {
          write(await api("/api/v1/ops/runbook"));
        }
        if (action === "opsCreateCheckpoint") {
          write(await api("/api/v1/ops/checkpoints", {
            method: "POST",
            body: JSON.stringify({
              actor: $("operatorId").value || "dashboard",
              note: $("intentReason").value || "dashboard checkpoint",
            }),
          }));
        }
        if (action === "opsListCheckpoints") {
          write(await api("/api/v1/ops/checkpoints?limit=10"));
        }
        if (action === "opsDiffCheckpoints") {
          const listed = await api("/api/v1/ops/checkpoints?limit=2");
          if (listed.checkpoints.length < 2) {
            write({ error: "NEED_TWO_CHECKPOINTS", message: "Create at least two checkpoints before diffing." });
          } else {
            const target = listed.checkpoints[0];
            const base = listed.checkpoints[1];
            write(await api("/api/v1/ops/checkpoints/diff?baseId=" + encodeURIComponent(base.id) + "&targetId=" + encodeURIComponent(target.id)));
          }
        }
        if (action === "opsSetBaseline") {
          const listed = await api("/api/v1/ops/checkpoints?limit=1");
          if (listed.checkpoints.length < 1) {
            write({ error: "NEED_CHECKPOINT", message: "Create a checkpoint before setting the baseline." });
          } else {
            write(await api("/api/v1/ops/baseline", {
              method: "PUT",
              body: JSON.stringify({
                checkpointId: listed.checkpoints[0].id,
                actor: $("operatorId").value || "dashboard",
                note: $("intentReason").value || "dashboard baseline",
              }),
            }));
          }
        }
        if (action === "opsBaseline") {
          write(await api("/api/v1/ops/baseline"));
        }
        if (action === "opsPromotionReview") {
          write(await api("/api/v1/ops/promotion-review"));
        }
        if (action === "opsRecordPromotionDecision") {
          write(await api("/api/v1/ops/promotion-decisions", {
            method: "POST",
            body: JSON.stringify({
              reviewer: $("operatorId").value || "dashboard",
              note: $("intentReason").value || "dashboard promotion decision",
            }),
          }));
        }
        if (action === "opsPromotionDecisions") {
          write(await api("/api/v1/ops/promotion-decisions?limit=10"));
        }
        if (action === "opsVerifyPromotionDecision") {
          const listed = await api("/api/v1/ops/promotion-decisions?limit=1");
          if (listed.decisions.length < 1) {
            write({ error: "NEED_PROMOTION_DECISION", message: "Record a promotion decision before verification." });
          } else {
            write(await api("/api/v1/ops/promotion-decisions/" + encodeURIComponent(listed.decisions[0].id) + "/verification"));
          }
        }
        if (action === "opsPromotionEvidence") {
          const listed = await api("/api/v1/ops/promotion-decisions?limit=1");
          if (listed.decisions.length < 1) {
            write({ error: "NEED_PROMOTION_DECISION", message: "Record a promotion decision before building evidence." });
          } else {
            const response = await fetch("/api/v1/ops/promotion-decisions/" + encodeURIComponent(listed.decisions[0].id) + "/evidence?format=markdown");
            if (!response.ok) {
              throw await response.json();
            }
            output.textContent = await response.text();
          }
        }
        if (action === "opsPromotionIntegrity") {
          write(await api("/api/v1/ops/promotion-decisions/integrity"));
        }
        if (action === "opsPromotionIntegrityReport") {
          const response = await fetch("/api/v1/ops/promotion-decisions/integrity?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionArchive") {
          write(await api("/api/v1/ops/promotion-archive"));
        }
        if (action === "opsPromotionArchiveReport") {
          const response = await fetch("/api/v1/ops/promotion-archive?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionArchiveManifest") {
          write(await api("/api/v1/ops/promotion-archive/manifest"));
        }
        if (action === "opsPromotionArchiveManifestReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/manifest?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionArchiveVerification") {
          write(await api("/api/v1/ops/promotion-archive/verification"));
        }
        if (action === "opsPromotionArchiveVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionArchiveAttestation") {
          write(await api("/api/v1/ops/promotion-archive/attestation"));
        }
        if (action === "opsPromotionArchiveAttestationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/attestation?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionArchiveAttestationVerification") {
          write(await api("/api/v1/ops/promotion-archive/attestation/verification"));
        }
        if (action === "opsPromotionArchiveAttestationVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/attestation/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffPackage") {
          write(await api("/api/v1/ops/promotion-archive/handoff-package"));
        }
        if (action === "opsPromotionHandoffPackageReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-package?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffPackageVerification") {
          write(await api("/api/v1/ops/promotion-archive/handoff-package/verification"));
        }
        if (action === "opsPromotionHandoffPackageVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-package/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffCertificate") {
          write(await api("/api/v1/ops/promotion-archive/handoff-certificate"));
        }
        if (action === "opsPromotionHandoffCertificateReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-certificate?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffCertificateVerification") {
          write(await api("/api/v1/ops/promotion-archive/handoff-certificate/verification"));
        }
        if (action === "opsPromotionHandoffCertificateVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-certificate/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffReceipt") {
          write(await api("/api/v1/ops/promotion-archive/handoff-receipt"));
        }
        if (action === "opsPromotionHandoffReceiptReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-receipt?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffReceiptVerification") {
          write(await api("/api/v1/ops/promotion-archive/handoff-receipt/verification"));
        }
        if (action === "opsPromotionHandoffReceiptVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-receipt/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffClosure") {
          write(await api("/api/v1/ops/promotion-archive/handoff-closure"));
        }
        if (action === "opsPromotionHandoffClosureReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-closure?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffClosureVerification") {
          write(await api("/api/v1/ops/promotion-archive/handoff-closure/verification"));
        }
        if (action === "opsPromotionHandoffClosureVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-closure/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffCompletion") {
          write(await api("/api/v1/ops/promotion-archive/handoff-completion"));
        }
        if (action === "opsPromotionHandoffCompletionReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-completion?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionHandoffCompletionVerification") {
          write(await api("/api/v1/ops/promotion-archive/handoff-completion/verification"));
        }
        if (action === "opsPromotionHandoffCompletionVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-completion/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionReleaseEvidence") {
          write(await api("/api/v1/ops/promotion-archive/release-evidence"));
        }
        if (action === "opsPromotionReleaseEvidenceReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/release-evidence?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionReleaseEvidenceVerification") {
          write(await api("/api/v1/ops/promotion-archive/release-evidence/verification"));
        }
        if (action === "opsPromotionReleaseEvidenceVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/release-evidence/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionReleaseArchive") {
          write(await api("/api/v1/ops/promotion-archive/release-archive"));
        }
        if (action === "opsPromotionReleaseArchiveReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/release-archive?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionReleaseArchiveVerification") {
          write(await api("/api/v1/ops/promotion-archive/release-archive/verification"));
        }
        if (action === "opsPromotionReleaseArchiveVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/release-archive/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentApproval") {
          write(await api("/api/v1/ops/promotion-archive/deployment-approval"));
        }
        if (action === "opsPromotionDeploymentApprovalReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-approval?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentApprovalVerification") {
          write(await api("/api/v1/ops/promotion-archive/deployment-approval/verification"));
        }
        if (action === "opsPromotionDeploymentApprovalVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-approval/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentChangeRecord") {
          write(await api("/api/v1/ops/promotion-archive/deployment-change-record"));
        }
        if (action === "opsPromotionDeploymentChangeRecordReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-change-record?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentChangeRecordVerification") {
          write(await api("/api/v1/ops/promotion-archive/deployment-change-record/verification"));
        }
        if (action === "opsPromotionDeploymentChangeRecordVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-change-record/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentExecutionRecord") {
          write(await api("/api/v1/ops/promotion-archive/deployment-execution-record"));
        }
        if (action === "opsPromotionDeploymentExecutionRecordReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-record?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentExecutionRecordVerification") {
          write(await api("/api/v1/ops/promotion-archive/deployment-execution-record/verification"));
        }
        if (action === "opsPromotionDeploymentExecutionRecordVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-record/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentExecutionReceipt") {
          write(await api("/api/v1/ops/promotion-archive/deployment-execution-receipt"));
        }
        if (action === "opsPromotionDeploymentExecutionReceiptReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-receipt?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionDeploymentExecutionReceiptVerification") {
          write(await api("/api/v1/ops/promotion-archive/deployment-execution-receipt/verification"));
        }
        if (action === "opsPromotionDeploymentExecutionReceiptVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-receipt/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsPromotionReleaseAuditTrailRecord") {
          write(await api("/api/v1/ops/promotion-archive/release-audit-trail-record"));
        }
        if (action === "opsPromotionReleaseAuditTrailRecordReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/release-audit-trail-record?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "opsHandoffReport") {
          write(await api("/api/v1/ops/handoff-report?limit=10"));
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
          const headers = {};
          if ($("intentKey").value.trim()) {
            headers["idempotency-key"] = $("intentKey").value.trim();
          }
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
        if (action === "intentPreflightReport") {
          const query = new URLSearchParams();
          const failedEventId = $("failedEventId").value.trim();
          const keyPrefix = $("kvPrefix").value.trim();
          query.set("format", "markdown");
          if (failedEventId) {
            query.set("failedEventId", failedEventId);
          }
          if (keyPrefix) {
            query.set("keyPrefix", keyPrefix);
          }
          const response = await fetch("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/preflight/report?" + query.toString());
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "intentPreflightVerification") {
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
          write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/preflight/verification" + suffix));
        }
        if (action === "intentExecutionPreview") {
          const query = new URLSearchParams();
          const failedEventId = $("failedEventId").value.trim();
          const keyPrefix = $("kvPrefix").value.trim();
          const command = $("rawCommand").value.trim();
          const key = $("kvKey").value.trim();
          const value = $("kvValue").value.trim();
          if (failedEventId) {
            query.set("failedEventId", failedEventId);
          }
          if (keyPrefix) {
            query.set("keyPrefix", keyPrefix);
          }
          if (command) {
            query.set("command", command);
          }
          if (key) {
            query.set("key", key);
          }
          if (value) {
            query.set("value", value);
          }
          const suffix = query.toString() ? "?" + query.toString() : "";
          write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/execution-preview" + suffix));
        }
        if (action === "createApprovalRequest") {
          const body = {
            intentId: $("intentId").value,
            requestedBy: $("operatorId").value || "dashboard",
            reviewer: $("operatorId").value || "unassigned",
            decisionReason: $("intentReason").value || "dashboard approval request",
          };
          const failedEventId = $("failedEventId").value.trim();
          const keyPrefix = $("kvPrefix").value.trim();
          const command = $("rawCommand").value.trim();
          const key = $("kvKey").value.trim();
          const value = $("kvValue").value.trim();
          if (failedEventId) {
            body.failedEventId = failedEventId;
          }
          if (keyPrefix) {
            body.keyPrefix = keyPrefix;
          }
          if (command) {
            body.command = command;
          }
          if (key) {
            body.key = key;
          }
          if (value) {
            body.value = value;
          }
          const approvalRequest = await api("/api/v1/operation-approval-requests", {
            method: "POST",
            body: JSON.stringify(body),
          });
          $("approvalRequestId").value = approvalRequest.requestId;
          write(approvalRequest);
        }
        if (action === "listApprovalRequests") {
          write(await api("/api/v1/operation-approval-requests?limit=20"));
        }
        if (action === "approveApprovalRequest" || action === "rejectApprovalRequest") {
          const approvalDecision = await api("/api/v1/operation-approval-requests/" + encodeURIComponent($("approvalRequestId").value) + "/decision", {
            method: "POST",
            body: JSON.stringify({
              decision: action === "approveApprovalRequest" ? "approved" : "rejected",
              reviewer: $("operatorId").value || "dashboard-reviewer",
              reason: $("approvalDecisionReason").value || "dashboard approval decision",
            }),
          });
          write(approvalDecision);
        }
        if (action === "listApprovalDecisions") {
          write(await api("/api/v1/operation-approval-decisions?limit=20"));
        }
        if (action === "approvalEvidenceReport") {
          const response = await fetch("/api/v1/operation-approval-requests/" + encodeURIComponent($("approvalRequestId").value) + "/evidence?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "approvalEvidenceVerification") {
          write(await api("/api/v1/operation-approval-requests/" + encodeURIComponent($("approvalRequestId").value) + "/verification"));
        }
        if (action === "intentTimeline") {
          write(await api("/api/v1/operation-intents/" + encodeURIComponent($("intentId").value) + "/timeline?limit=30"));
        }
        if (action === "intentEvents") {
          write(await api("/api/v1/operation-intent-events?limit=30"));
        }
        if (action === "listDispatches") {
          write(await api("/api/v1/operation-dispatches?limit=20"));
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
    void refreshUpstreamOverview().catch(() => {});
    void refreshFixtureDiagnostics().catch(() => {});
    void refreshScenarioMatrix().catch(() => {});
    void refreshOpsSummary().catch(() => {});
    void refreshOpsReadiness().catch(() => {});
  </script>
</body>
</html>`;
}
