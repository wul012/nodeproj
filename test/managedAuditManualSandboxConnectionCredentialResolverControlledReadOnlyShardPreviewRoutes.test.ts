import http from "node:http";
import net from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  completeHeaders,
  javaEvidence,
  loadTestConfig,
  miniKvEvidence,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const servers: Array<{ close: () => Promise<void> }> = [];

afterEach(async () => {
  while (servers.length > 0) {
    await servers.pop()?.close();
  }
});

describe("managed audit manual sandbox connection credential resolver controlled read-only shard preview routes", () => {
  it("exposes JSON and Markdown through the audit route table using mock read-only services", async () => {
    const javaServer = await startJavaServer();
    const miniKvServer = await startMiniKvServer();
    servers.push(javaServer, miniKvServer);
    const app = await buildApp(loadTestConfig({
      ORDER_PLATFORM_URL: javaServer.url,
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: String(miniKvServer.port),
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        previewState: "controlled-read-only-shard-preview-ready",
        previewDecision: "preview-java-and-mini-kv-shard-readiness",
        activeNodeVersion: "Node v638",
        sourceNodeVersion: "Node v637",
        previewOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        activeShardRouterAllowed: false,
        writeRoutingAllowed: false,
        loadRestoreCompactAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("controlled read-only shard preview");
      expect(markdown.body).toContain("Preview decision: preview-java-and-mini-kv-shard-readiness");
      expect(markdown.body).toContain("## Source Matrix");
      expect(markdown.body).toContain("## Source Matrix Consumer");
      expect(markdown.body).toContain("## Source Matrix Drift Summary");
      expect(markdown.body).toContain("## Source Matrix Consumption Plan");
      expect(markdown.body).toContain("## Source Matrix Review Checklist");
      expect(markdown.body).toContain("## Source Matrix Review Digest");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot Summary Export");
      expect(markdown.body).toContain("## Source Matrix Handoff Notes");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Export");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt Archive Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Snapshot");
      expect(markdown.body)
        .toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Verification");
      expect(markdown.body).toContain("## Live Read-Only Window Rehearsal Packet");
      expect(markdown.body).toContain("## Live Read-Only Window Command Worksheet");
      expect(markdown.body).toContain("readyForManualCommandReview: true");
      expect(markdown.body).toContain("commandTemplateCount: 20");
      expect(markdown.body).toContain("containsSecretValue: false");
      expect(markdown.body).toContain("## Live Read-Only Window Evidence Packet");
      expect(markdown.body).toContain("readyForManualEvidenceCapture: true");
      expect(markdown.body).toContain("commandEvidenceRecordCount: 4");
      expect(markdown.body).toContain("runtimePayloadCaptured: false");
      expect(markdown.body).toContain("## Live Read-Only Window Evidence Intake Ledger");
      expect(markdown.body).toContain("readyForManualEvidenceIntake: true");
      expect(markdown.body).toContain("entryCount: 20");
      expect(markdown.body).toContain("## Live Read-Only Window Evidence Intake Review Package");
      expect(markdown.body).toContain("readyForOperatorIntakeReview: true");
      expect(markdown.body).toContain("readyForManualEvidenceEntry: false");
      expect(markdown.body).toContain("controlCount: 25");
      expect(markdown.body).toContain("## Live Read-Only Window Manual Evidence Entry Worksheet");
      expect(markdown.body).toContain("worksheetState: ready-for-operator-entry-worksheet");
      expect(markdown.body).toContain("readyForOperatorEntryWorksheet: true");
      expect(markdown.body).toContain("readyForManualEvidenceEntry: false");
      expect(markdown.body).toContain("slotCount: 25");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Import Preflight");
      expect(markdown.body).toContain("preflightState: ready-for-operator-evidence-import-preflight");
      expect(markdown.body).toContain("readyForOperatorEvidenceImportPreflight: true");
      expect(markdown.body).toContain("readyForEvidenceImport: false");
      expect(markdown.body).toContain("preflightSlotCount: 25");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Value Draft");
      expect(markdown.body).toContain("valueDraftState: ready-for-operator-evidence-value-draft");
      expect(markdown.body).toContain("readyForOperatorEvidenceValueDraft: true");
      expect(markdown.body).toContain("valueDraftSlotCount: 25");
      expect(markdown.body).toContain("draftFieldCount: 51");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Fresh Sibling Intake");
      expect(markdown.body).toContain("intakeState: ready-for-fresh-sibling-evidence-intake");
      expect(markdown.body).toContain("readyForFreshSiblingEvidenceIntake: true");
      expect(markdown.body).toContain("readyForOperatorValueSupply: false");
      expect(markdown.body).toContain("intakeSlotCount: 25");
      expect(markdown.body).toContain("matchedSnippetCount: 25");
      expect(markdown.body).toContain("historicalFixtureResolvedFileCount: 7");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Value Supply Envelope");
      expect(markdown.body).toContain("envelopeState: ready-for-value-supply-envelope-review");
      expect(markdown.body).toContain("readyForValueSupplyEnvelopeReview: true");
      expect(markdown.body).toContain("readyForOperatorValueSupply: false");
      expect(markdown.body).toContain("envelopeSlotCount: 25");
      expect(markdown.body).toContain("javaValueDraftEvidenceVersion: Java v633");
      expect(markdown.body).toContain("miniKvValueDraftEvidenceVersion: mini-kv v585");
      expect(markdown.body).toContain("suppliedValueCount: 0");
      expect(markdown.body).toContain("acceptedValueCount: 0");
      expect(markdown.body).toContain("importedValueCount: 0");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Approval Packet Draft");
      expect(markdown.body).toContain("draftState: ready-for-value-supply-approval-packet-draft");
      expect(markdown.body).toContain("readyForValueSupplyApprovalPacketDraft: true");
      expect(markdown.body).toContain("readyForOperatorValueSubmission: false");
      expect(markdown.body).toContain("draftSlotCount: 25");
      expect(markdown.body).toContain("javaValueSupplyEvidenceVersion: Java v658");
      expect(markdown.body).toContain("miniKvValueSupplyEvidenceVersion: mini-kv v610");
      expect(markdown.body).toContain("approvalCaptured: false");
      expect(markdown.body).toContain("approvalGrantPresent: false");
      expect(markdown.body).toContain("signedApprovalPresent: false");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Approval Packet Review");
      expect(markdown.body).toContain("reviewPackageState: ready-for-value-supply-approval-packet-review");
      expect(markdown.body).toContain("readyForValueSupplyApprovalPacketReview: true");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("reviewControlCount: 25");
      expect(markdown.body).toContain("manualReviewRequiredControlCount: 25");
      expect(markdown.body).toContain("autoApprovalBlockedControlCount: 25");
      expect(markdown.body).toContain("approvalPacketReviewVersion: Node v1011");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Template");
      expect(markdown.body).toContain("templateState: ready-for-signed-approval-template-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalTemplatePreflight: true");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("templateFieldCount: 25");
      expect(markdown.body).toContain("templateClauseCount: 25");
      expect(markdown.body).toContain("missingFieldBlockerCount: 25");
      expect(markdown.body).toContain("signedApprovalTemplateVersion: Node v1036");
      expect(markdown.body).toContain("Ready source count: 2");
      expect(markdown.body).toContain("Ready for controlled read-only consumption: true");
      expect(markdown.body).toContain("Drift state: controlled-drift-detected");
      expect(markdown.body).toContain("Plan state: ready-for-read-only-consumption-plan");
      expect(markdown.body).toContain("Ready for read-only consumption plan: true");
      expect(markdown.body).toContain("Plan digest scope: source-matrix-consumption-plan");
      expect(markdown.body).toContain("Checklist state: ready-for-controlled-review");
      expect(markdown.body).toContain("Ready for controlled review archive: true");
      expect(markdown.body).toContain("Archive state: ready-for-controlled-review-archive");
      expect(markdown.body).toContain("Export state: ready-for-summary-export");
      expect(markdown.body).toContain("Summary digest scope: archive-snapshot-summary-lines");
      expect(markdown.body).toContain("Summary digest covered line count: 5");
      expect(markdown.body).toContain("Handoff state: ready-for-read-only-handoff");
      expect(markdown.body).toContain("Handoff digest scope: read-only-handoff-notes");
      expect(markdown.body).toContain("Summary state: ready-for-read-only-handoff-summary");
      expect(markdown.body).toContain("Ready for read-only handoff summary: true");
      expect(markdown.body).toContain("Summary digest scope: read-only-handoff-summary");
      expect(markdown.body).toContain("Summary digest covered audience count: 4");
      expect(markdown.body).toContain("Decision: ready-for-read-only-summary-consumption");
      expect(markdown.body).toContain("Ready for read-only summary consumption: true");
      expect(markdown.body).toContain("Export state: ready-for-read-only-summary-consumer-export");
      expect(markdown.body).toContain("Export digest scope: handoff-summary-consumer-export-lines");
      expect(markdown.body).toContain("Receipt state: ready-for-read-only-summary-consumer-receipt");
      expect(markdown.body).toContain("Receipt digest scope: handoff-summary-consumer-receipt");
      expect(markdown.body).toContain("Snapshot state: ready-for-read-only-summary-consumer-receipt-archive");
      expect(markdown.body).toContain("Snapshot digest scope: handoff-summary-consumer-receipt-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-summary-consumer-receipt-archive-verification");
      expect(markdown.body).toContain("Ready for read-only summary consumer receipt archive verification: true");
      expect(markdown.body).toContain("Coverage state: ready-for-read-only-handoff-route-coverage");
      expect(markdown.body).toContain("Coverage digest scope: handoff-route-markdown-sections");
      expect(markdown.body).toContain("Verification state: ready-for-read-only-handoff-route-coverage-verification");
      expect(markdown.body).toContain("Ready for read-only handoff route coverage verification: true");
      expect(markdown.body).toContain("Snapshot state: ready-for-read-only-handoff-route-coverage-archive");
      expect(markdown.body).toContain("Snapshot digest scope: handoff-route-coverage-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-handoff-route-coverage-archive-verification");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive verification: true");
      expect(markdown.body).toContain("Summary state: ready-for-read-only-handoff-route-coverage-archive-summary");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary: true");
      expect(markdown.body).toContain("Summary digest scope: handoff-route-coverage-archive-summary-lines");
      expect(markdown.body)
        .toContain("Receipt state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt: true");
      expect(markdown.body).toContain("Receipt digest scope: handoff-route-coverage-archive-summary-receipt");
      expect(markdown.body)
        .toContain("Snapshot state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt archive: true");
      expect(markdown.body)
        .toContain("Snapshot digest scope: handoff-route-coverage-archive-summary-receipt-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt archive verification: true");
      expect(markdown.body).toContain("Routing modes: read-only-preview, single-shard-readiness-prototype");
      expect(markdown.body).toContain("Command: SHARDJSON");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("LOAD/RESTORE/COMPACT allowed: false");
      expect(markdown.body).toContain("## Next Actions");
      expect(markdown.body).toContain("Consume sourceMatrixConsumptionPlan.planStepRecords");
      expect(markdown.body).toContain("observeSources=java|miniKv");
      expect(markdown.body).toContain("### Consumption Plan Step Records");
      expect(markdown.body).toContain("3. review-drift-findings: needs-review");
      expect(markdown.body).toContain("Ready step count: 3");
      expect(markdown.body).toContain("Review step count: 1");
      expect(markdown.body).toContain("Blocked step count: 0");
      expect(markdown.body).toContain("Routing activation allowed step count: 0");
      expect(markdown.body).toContain("Writes allowed step count: 0");
      expect(markdown.body).toContain("Risk level: review");
      expect(markdown.body).toContain("Review required: true");
      expect(markdown.body).toContain("Unsafe step count: 0");
      expect(markdown.body).toContain("Risk reason codes: PLAN_HAS_REVIEW_STEPS");
      expect(markdown.body).toContain("Promotion hold state: read-only-review-required");
      expect(markdown.body).toContain("Promotion hold next allowed action: review-read-only-risk");
      expect(markdown.body).toContain("Routing promotion allowed: false");
      expect(markdown.body).toContain("Write promotion allowed: false");
      expect(markdown.body).toContain("Service startup allowed: false");
      expect(markdown.body).toContain("Promotion hold closure criterion count: 5");
      expect(markdown.body).toContain("reviewRiskReasons=PLAN_HAS_REVIEW_STEPS");
      expect(markdown.body).toContain("Read-only review scope state: ready-for-read-only-review");
      expect(markdown.body)
        .toContain("Read-only review allowed operations: consume-plan-step-records, review-risk-summary, verify-promotion-hold-closure");
      expect(markdown.body)
        .toContain("Read-only review forbidden operations: activate-shard-router, enable-write-routing, start-sibling-services, mutate-sibling-state");
      expect(markdown.body).toContain("Read-only review scope digest scope: read-only-review-scope");
      expect(markdown.body)
        .toContain("Read-only review scope digest covered forbidden operation count: 4");
      expect(markdown.body)
        .toContain("state=ready-for-read-only-review, allowed=consume-plan-step-records|review-risk-summary|verify-promotion-hold-closure");
      expect(markdown.body)
        .toContain("digestScope=read-only-review-scope, coveredAllowed=3, coveredForbidden=4");
      expect(markdown.body).toContain("routingActivationAllowedSteps=0, writesAllowedSteps=0");
      expect(markdown.body)
        .toContain("level=review, reviewRequired=true, blocked=false, unsafeSteps=0, reasons=PLAN_HAS_REVIEW_STEPS");
      expect(markdown.body)
        .toContain("state=read-only-review-required, nextAllowedAction=review-read-only-risk");
      expect(markdown.body).toContain("closureCriterionCount=5");
    } finally {
      await app.close();
    }
  }, 60000);
});

async function startJavaServer(): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/api/v1/ops/shard-readiness") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(javaEvidence));
      return;
    }
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "not_found" }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Java mock server did not expose a TCP port");
  }
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

async function startMiniKvServer(): Promise<{ port: number; close: () => Promise<void> }> {
  const server = net.createServer((socket) => {
    socket.setEncoding("utf8");
    socket.on("data", (chunk) => {
      if (chunk.trim().toUpperCase() === "SHARDJSON") {
        socket.end(`${JSON.stringify(miniKvEvidence)}\n`);
        return;
      }
      socket.end("ERR unknown command\n");
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("mini-kv mock server did not expose a TCP port");
  }
  return {
    port: address.port,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}
