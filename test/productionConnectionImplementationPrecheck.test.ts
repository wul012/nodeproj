import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  loadProductionConnectionImplementationPrecheck,
} from "../src/services/productionConnectionImplementationPrecheck.js";

describe("production connection implementation precheck", () => {
  it("combines config, failure rehearsal, and summary v10 without allowing real connections", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-impl-precheck-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      runtime.auditLog.record({
        requestId: "req-impl-precheck",
        method: "GET",
        path: "/api/v1/production/connection-implementation-precheck",
        statusCode: 200,
        durationMs: 4,
      });

      const profile = await loadProductionConnectionImplementationPrecheck({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });

      expect(profile).toMatchObject({
        profileVersion: "production-connection-implementation-precheck.v1",
        readyForImplementation: false,
        readOnly: true,
        executionAllowed: false,
        stage: {
          name: "production-connection-implementation-precheck",
          productionConnectionConfigContractVersion: "production-connection-config-contract.v1",
          productionConnectionFailureModeRehearsalVersion: "production-connection-failure-mode-rehearsal.v1",
          productionReadinessSummaryV10Version: "production-readiness-summary.v10",
          upstreamActionsEnabled: false,
        },
        checks: {
          configContractReady: true,
          failureModeRehearsalReady: true,
          readinessSummaryV10Ready: true,
          realConnectionAttemptAllowed: false,
          noDatabaseConnectionAttempted: true,
          noJwksNetworkFetch: true,
          noExternalIdpCall: true,
          upstreamActionsStillDisabled: true,
          humanAuditOwnerApprovalPresent: false,
          humanIdpOwnerApprovalPresent: false,
          rollbackOwnerApprovalPresent: false,
          readyForImplementation: false,
        },
        summary: {
          precheckItemCount: 8,
          passedPrecheckItemCount: 5,
          missingHumanConfirmationCount: 3,
          productionBlockerCount: 4,
        },
      });
      expect(profile.precheckItems.map((item) => [item.id, item.status])).toEqual([
        ["config-contract-ready", "pass"],
        ["failure-mode-rehearsal-ready", "pass"],
        ["summary-v10-evidence-ready", "pass"],
        ["upstream-actions-disabled", "pass"],
        ["no-external-connection-attempts", "pass"],
        ["audit-owner-approval", "missing"],
        ["idp-owner-approval", "missing"],
        ["rollback-owner-approval", "missing"],
      ]);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "HUMAN_AUDIT_OWNER_APPROVAL_MISSING",
        "HUMAN_IDP_OWNER_APPROVAL_MISSING",
        "ROLLBACK_OWNER_APPROVAL_MISSING",
        "REAL_CONNECTION_ATTEMPT_NOT_ALLOWED",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("surfaces incomplete evidence and unsafe upstream actions before implementation planning", async () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const profile = await loadProductionConnectionImplementationPrecheck({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
    });

    expect(profile.checks).toMatchObject({
      configContractReady: false,
      failureModeRehearsalReady: false,
      readinessSummaryV10Ready: false,
      upstreamActionsStillDisabled: false,
      realConnectionAttemptAllowed: false,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "CONFIG_CONTRACT_NOT_READY",
      "FAILURE_MODE_REHEARSAL_NOT_READY",
      "SUMMARY_V10_NOT_READY",
      "UPSTREAM_ACTIONS_ENABLED",
      "REAL_CONNECTION_ATTEMPT_NOT_ALLOWED",
    ]));
  });

  it("exposes production connection implementation precheck routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-impl-precheck-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-implementation-precheck",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-implementation-precheck?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-connection-implementation-precheck.v1",
        checks: {
          configContractReady: true,
          failureModeRehearsalReady: true,
          readinessSummaryV10Ready: true,
          realConnectionAttemptAllowed: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production connection implementation precheck");
      expect(markdown.body).toContain("HUMAN_AUDIT_OWNER_APPROVAL_MISSING");
      expect(markdown.body).toContain("REAL_CONNECTION_ATTEMPT_NOT_ALLOWED");
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
