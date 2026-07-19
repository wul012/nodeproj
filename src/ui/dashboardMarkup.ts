import { dashboardScenarioMarkup } from "./dashboardScenarioMarkup.js";

export const dashboardMarkup = String.raw`
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
${dashboardScenarioMarkup}
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
        <button data-action="scenarioVerification">Scenario Verification</button>
        <button data-action="scenarioVerificationMarkdown">Scenario Verification Markdown</button>
        <button data-action="scenarioArchiveBundle">Scenario Archive Bundle</button>
        <button data-action="scenarioArchiveBundleMarkdown">Scenario Archive Bundle Markdown</button>
        <button data-action="scenarioArchiveVerification">Scenario Archive Verification</button>
        <button data-action="scenarioArchiveVerificationMarkdown">Scenario Archive Verification Markdown</button>
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

`;
