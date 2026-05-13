import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  loadProductionConnectionDryRunChangeRequest,
} from "../src/services/productionConnectionDryRunChangeRequest.js";

describe("production connection dry-run change request", () => {
  it("creates an archivable non-executable change request for future production connections", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-dry-run-change-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      runtime.auditLog.record({
        requestId: "req-dry-run-change",
        method: "GET",
        path: "/api/v1/production/connection-dry-run-change-request",
        statusCode: 200,
        durationMs: 5,
      });

      const profile = await loadProductionConnectionDryRunChangeRequest({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });

      expect(profile).toMatchObject({
        profileVersion: "production-connection-dry-run-change-request.v1",
        readyForDryRunArchive: true,
        readyForProductionConnections: false,
        readOnly: true,
        executionAllowed: false,
        changeRequest: {
          id: "production-connection-dry-run-change-request",
          version: "production-connection-change-request.v1",
          dryRun: true,
          executable: false,
          archiveReady: true,
          implementationPrecheckVersion: "production-connection-implementation-precheck.v1",
          upstreamActionsEnabled: false,
        },
        checks: {
          implementationPrecheckLoaded: true,
          implementationPrecheckEvidenceReady: true,
          auditAdapterConnectionItemPresent: true,
          idpJwksConnectionItemPresent: true,
          rollbackItemPresent: true,
          ownerApprovalItemPresent: true,
          dryRunOnly: true,
          changeRequestExecutable: false,
          archiveReady: true,
          realConnectionAttempted: false,
          upstreamActionsStillDisabled: true,
          readyForProductionConnections: false,
        },
        summary: {
          changeItemCount: 4,
          executableItemCount: 0,
          approvalRequiredCount: 4,
          rollbackRequiredCount: 3,
          productionBlockerCount: 2,
        },
      });
      expect(profile.changeRequest.changeRequestDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.changeItems.map((item) => [item.id, item.executable, item.dryRunOnly])).toEqual([
        ["managed-audit-adapter-connection", false, true],
        ["idp-jwks-connection", false, true],
        ["rollback-disablement", false, true],
        ["owner-approval", false, true],
      ]);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "OWNER_APPROVALS_PENDING",
        "DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks archive readiness when implementation precheck evidence is incomplete or actions are enabled", async () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const profile = await loadProductionConnectionDryRunChangeRequest({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
    });

    expect(profile.readyForDryRunArchive).toBe(false);
    expect(profile.checks).toMatchObject({
      implementationPrecheckLoaded: true,
      implementationPrecheckEvidenceReady: false,
      archiveReady: false,
      upstreamActionsStillDisabled: false,
      realConnectionAttempted: false,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "IMPLEMENTATION_PRECHECK_EVIDENCE_NOT_READY",
      "UPSTREAM_ACTIONS_ENABLED",
      "OWNER_APPROVALS_PENDING",
      "DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE",
    ]));
  });

  it("exposes dry-run change request routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-dry-run-change-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-change-request",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-change-request?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-connection-dry-run-change-request.v1",
        readyForDryRunArchive: true,
        changeRequest: {
          dryRun: true,
          executable: false,
          archiveReady: true,
        },
        checks: {
          implementationPrecheckEvidenceReady: true,
          archiveReady: true,
          realConnectionAttempted: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production connection dry-run change request");
      expect(markdown.body).toContain("OWNER_APPROVALS_PENDING");
      expect(markdown.body).toContain("DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
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
