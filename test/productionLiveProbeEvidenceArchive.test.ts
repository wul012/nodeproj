import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "../src/services/productionConnectionDryRunChangeRequest.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeEvidenceArchive,
} from "../src/services/productionLiveProbeEvidenceArchive.js";

describe("production live probe evidence archive", () => {
  it("archives contract, smoke harness, and summary v13 evidence without treating skipped probes as production pass", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-archive-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      const changeRequest = await loadProductionConnectionDryRunChangeRequest({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      await ledger.create({
        decision: "approve",
        reviewer: "live-probe-archive-approver",
        reason: "approve v138 live probe archive evidence",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const archive = await loadProductionLiveProbeEvidenceArchive({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(archive).toMatchObject({
        profileVersion: "production-live-probe-evidence-archive.v1",
        readyForArchiveRecord: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        archive: {
          contractProfileVersion: "production-live-probe-readiness-contract.v1",
          smokeHarnessProfileVersion: "production-live-probe-smoke-harness.v1",
          summaryVersion: "production-readiness-summary.v13",
          liveProbeEvidenceMode: "skipped",
          plannedProbeCount: 5,
          passedProbeCount: 0,
          skippedProbeCount: 5,
          blockedProbeCount: 0,
          writeProbeAttempted: false,
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          readyForLiveProbeEvidence: true,
          readyForProductionOperations: false,
        },
        checks: {
          contractVersionValid: true,
          smokeHarnessVersionValid: true,
          summaryV13VersionValid: true,
          summaryV13EvidenceReady: true,
          smokeEvidenceReady: true,
          smokeProbeCountMatchesContract: true,
          smokePassOrSkippedOnly: true,
          liveProbeWritesAttempted: false,
          upstreamActionsStillDisabled: true,
          skippedEvidenceNotProductionPass: true,
          archiveDigestValid: true,
          readyForArchiveRecord: true,
        },
        summary: {
          artifactCount: 3,
          archivedArtifactCount: 3,
          productionBlockerCount: 0,
        },
      });
      expect(archive.archive.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(archive.warnings.map((warning) => warning.code)).toEqual([
        "LIVE_PROBE_SKIPPED_ARCHIVED_NOT_PRODUCTION_PASS",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks archive readiness when summary v13 review evidence is incomplete", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-archive-missing-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      const archive = await loadProductionLiveProbeEvidenceArchive({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: new ProductionConnectionDryRunApprovalLedger(),
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(archive.readyForArchiveRecord).toBe(false);
      expect(archive.checks).toMatchObject({
        contractVersionValid: true,
        smokeHarnessVersionValid: true,
        summaryV13VersionValid: true,
        summaryV13EvidenceReady: false,
        smokeEvidenceReady: true,
        smokeProbeCountMatchesContract: true,
        upstreamActionsStillDisabled: true,
      });
      expect(archive.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "SUMMARY_V13_EVIDENCE_NOT_READY",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes live probe evidence archive routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-archive-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const changeRequest = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-change-request",
        headers,
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/production/connection-dry-run-approvals",
        headers,
        payload: {
          decision: "approve",
          reviewer: "approver-1",
          reason: "approve v138 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-evidence-archive",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-evidence-archive?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-evidence-archive.v1",
        readyForArchiveRecord: true,
        archive: {
          liveProbeEvidenceMode: "skipped",
          plannedProbeCount: 5,
          skippedProbeCount: 5,
          writeProbeAttempted: false,
        },
        checks: {
          skippedEvidenceNotProductionPass: true,
          readyForArchiveRecord: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe evidence archive");
      expect(markdown.body).toContain("LIVE_PROBE_SKIPPED_ARCHIVED_NOT_PRODUCTION_PASS");
      expect(markdown.body).toContain("No live probe archive blockers.");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 10000);
});

function loadTestConfig(auditStorePath: string) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
  });
}
