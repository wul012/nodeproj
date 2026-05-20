export const dashboardClientScript = String.raw`
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

    function renderScenarioVerification(verification) {
      const checks = verification.checks || {};
      setBadge("scenarioVerificationState", verification.valid ? "online" : "degraded");
      setText("scenarioVerificationValidSignal", formatBool(verification.valid));
      setText("scenarioVerificationDigestSignal", formatBool(checks.matrixDigestValid));
      setText(
        "scenarioVerificationScenarioCountSignal",
        formatBool(checks.scenarioCountValid) + " / total " + formatNumber(verification.summary.totalScenarios),
      );
      setText("scenarioVerificationBlockedReplaySignal", formatBool(checks.blockedReplaySemanticsStable));
      setText("scenarioVerificationMiniKvReadSignal", formatBool(checks.miniKvReadSemanticsStable));
      setText("scenarioVerificationMatrixValiditySignal", formatBool(checks.matrixValidityConsistent));
      setText(
        "scenarioVerificationExpectedIdsSignal",
        "present " + formatBool(checks.expectedScenarioIdsPresent) + " / unexpected " + formatBool(!checks.noUnexpectedScenarioIds),
      );
      setText("scenarioVerificationSourcePathsSignal", formatBool(checks.sourcePathsPresent));
      setText(
        "scenarioVerificationDriftSignal",
        formatBool(checks.driftIssueCountMatches) + " / issues " + formatNumber(verification.summary.issueCount),
      );
    }

    async function refreshScenarioVerification() {
      const verification = await api("/api/v1/upstream-contract-fixtures/scenario-matrix/verification");
      renderScenarioVerification(verification);
      return verification;
    }

    function renderScenarioArchiveBundle(bundle) {
      const summary = bundle.summary || {};
      setBadge("scenarioArchiveBundleState", bundle.valid ? "online" : "degraded");
      setText("scenarioArchiveBundleValidSignal", formatBool(bundle.valid));
      setText(
        "scenarioArchiveBundleReadExecuteSignal",
        "read_only " + formatBool(bundle.readOnly) + " / execution_allowed " + formatBool(bundle.executionAllowed),
      );
      setText(
        "scenarioArchiveBundleSourcePathSignal",
        formatNumber(summary.sourcePathCount) + "/" + formatNumber(summary.totalScenarios),
      );
      setText("scenarioArchiveBundleDigestSignal", bundle.archiveBundleDigest.algorithm + ":" + bundle.archiveBundleDigest.value);
      setText("scenarioArchiveBundleVerificationDigestSignal", bundle.digests.verificationDigest);
      setText("scenarioArchiveBundleMatrixDigestSignal", bundle.digests.matrixDigest);
      setText(
        "scenarioArchiveBundleScenarioSignal",
        formatNumber(summary.validScenarios) + "/" + formatNumber(summary.totalScenarios) + " valid / ready " + formatNumber(summary.diagnosticReadyScenarios),
      );
      setText("scenarioArchiveBundleIssueSignal", formatNumber(summary.issueCount));
      setText("scenarioArchiveBundleEvidenceSignal", formatNumber((bundle.scenarioEvidence || []).length) + " records");
    }

    async function refreshScenarioArchiveBundle() {
      const bundle = await api("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle");
      renderScenarioArchiveBundle(bundle);
      return bundle;
    }

    function renderScenarioArchiveVerification(verification) {
      const checks = verification.checks || {};
      const summary = verification.summary || {};
      setBadge("scenarioArchiveVerificationState", verification.valid ? "online" : "degraded");
      setText("scenarioArchiveVerificationValidSignal", formatBool(verification.valid));
      setText("scenarioArchiveVerificationDigestSignal", formatBool(checks.archiveBundleDigestValid));
      setText("scenarioArchiveVerificationVerificationDigestSignal", formatBool(checks.verificationDigestValid));
      setText("scenarioArchiveVerificationReadOnlySignal", formatBool(checks.readOnlyStillTrue));
      setText("scenarioArchiveVerificationExecutionSignal", formatBool(checks.executionAllowedStillFalse));
      setText("scenarioArchiveVerificationBundleValiditySignal", formatBool(checks.bundleValidityConsistent));
      setText(
        "scenarioArchiveVerificationSourcePathSignal",
        formatBool(checks.sourcePathCountValid) + " / " + formatNumber(summary.sourcePathCount) + "/" + formatNumber(summary.totalScenarios),
      );
      setText(
        "scenarioArchiveVerificationScenarioEvidenceSignal",
        formatBool(checks.scenarioEvidenceCountValid) + " / " + formatNumber(summary.scenarioEvidenceCount),
      );
      setText(
        "scenarioArchiveVerificationIssueSignal",
        "issues " + formatNumber(summary.issueCount) + " / clean " + formatBool(checks.noScenarioIssues),
      );
    }

    async function refreshScenarioArchiveVerification() {
      const verification = await api("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification");
      renderScenarioArchiveVerification(verification);
      return verification;
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
        if (action === "scenarioVerification") {
          write(await refreshScenarioVerification());
        }
        if (action === "scenarioVerificationMarkdown") {
          const response = await fetch("/api/v1/upstream-contract-fixtures/scenario-matrix/verification?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "scenarioArchiveBundle") {
          write(await refreshScenarioArchiveBundle());
        }
        if (action === "scenarioArchiveBundleMarkdown") {
          const response = await fetch("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
        if (action === "scenarioArchiveVerification") {
          write(await refreshScenarioArchiveVerification());
        }
        if (action === "scenarioArchiveVerificationMarkdown") {
          const response = await fetch("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification?format=markdown");
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
    void refreshScenarioVerification().catch(() => {});
    void refreshScenarioArchiveBundle().catch(() => {});
    void refreshScenarioArchiveVerification().catch(() => {});
    void refreshOpsSummary().catch(() => {});
    void refreshOpsReadiness().catch(() => {});
`;
