import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("production readiness summary v5", () => {
  it("summarizes v108 auth and v109 audit evidence while keeping production operations blocked", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-readiness-v5-"));
    const auditPath = path.join(directory, "audit.jsonl");
    const config = loadV110Config({
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: auditPath,
      AUDIT_RETENTION_DAYS: "30",
      AUDIT_MAX_FILE_BYTES: "1048576",
      AUDIT_ROTATION_ENABLED: "true",
      AUDIT_BACKUP_ENABLED: "true",
    });
    const app = await buildApp(config);

    try {
      await app.inject({
        method: "GET",
        url: "/health",
      });
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v5",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const summary = response.json();

      expect(response.statusCode).toBe(200);
      expect(summary).toMatchObject({
        service: "orderops-node",
        summaryVersion: "production-readiness-summary.v5",
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        checks: {
          previousSummaryAvailable: true,
          upstreamBoundaryEvidenceReady: true,
          authRehearsalProfileReady: true,
          authEnforcementCurrentlyRejects: false,
          signedCredentialAuthReady: false,
          auditRetentionIntegrityEvidenceReady: true,
          managedAuditStoreReady: false,
          upstreamActionsStillDisabled: true,
          executionStillBlocked: true,
          productionBlockersRemain: true,
        },
        summary: {
          categoryCount: 4,
          readyCategoryCount: 2,
          notReadyCategoryCount: 2,
          authSampleCount: 3,
          auditRetentionPolicyConfigured: true,
        },
      });
      expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "AUTH_ENFORCEMENT_NOT_ENABLED",
        "SIGNED_AUTH_MIDDLEWARE_MISSING",
        "MANAGED_AUDIT_STORE_MISSING",
      ]));
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("reports rehearsal enforcement when the switch is explicitly enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-readiness-v5-enforced-"));
    const auditPath = path.join(directory, "audit.jsonl");
    const app = await buildApp(loadV110Config({
      ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: auditPath,
      AUDIT_RETENTION_DAYS: "30",
      AUDIT_MAX_FILE_BYTES: "1048576",
      AUDIT_ROTATION_ENABLED: "true",
      AUDIT_BACKUP_ENABLED: "true",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v5",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        checks: {
          authEnforcementCurrentlyRejects: true,
          signedCredentialAuthReady: false,
          auditRetentionIntegrityEvidenceReady: true,
          managedAuditStoreReady: false,
        },
        evidence: {
          authEnforcement: {
            enforcementEnabled: true,
            rejectsRequests: true,
            sampleStatuses: {
              "missing-identity": 401,
              "insufficient-role": 403,
              "allowed-auditor": 200,
            },
          },
        },
      });
      expect(json.json().productionBlockers.map((blocker: { code: string }) => blocker.code)).not.toContain("AUTH_ENFORCEMENT_NOT_ENABLED");
      expect(json.json().productionBlockers.map((blocker: { code: string }) => blocker.code)).toContain("SIGNED_AUTH_MIDDLEWARE_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes production readiness summary v5 routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-readiness-v5-route-"));
    const auditPath = path.join(directory, "audit.jsonl");
    const app = await buildApp(loadV110Config({
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: auditPath,
      AUDIT_RETENTION_DAYS: "30",
      AUDIT_MAX_FILE_BYTES: "1048576",
      AUDIT_ROTATION_ENABLED: "true",
      AUDIT_BACKUP_ENABLED: "true",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v5",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v5?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "production-readiness-summary.v5",
        readyForProductionOperations: false,
        checks: {
          upstreamBoundaryEvidenceReady: true,
          auditRetentionIntegrityEvidenceReady: true,
          executionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v5");
      expect(markdown.body).toContain("SIGNED_AUTH_MIDDLEWARE_MISSING");
      expect(markdown.body).toContain("MANAGED_AUDIT_STORE_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadV110Config(overrides: NodeJS.ProcessEnv = {}) {
  const evidenceDir = path.join(process.cwd(), "fixtures", "upstream-production-evidence");

  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    JAVA_REPLAY_AUDIT_APPROVED_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-audit-approved.sample.json"),
    JAVA_REPLAY_AUDIT_BLOCKED_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-audit-blocked.sample.json"),
    JAVA_REPLAY_EVIDENCE_INDEX_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-evidence-index.sample.json"),
    MINIKV_RESTART_RECOVERY_EVIDENCE_FIXTURE_PATH: path.join(evidenceDir, "mini-kv-restart-recovery-evidence.json"),
    MINIKV_RECOVERY_FIXTURE_INDEX_PATH: path.join(evidenceDir, "mini-kv-recovery-fixtures-index.json"),
    ...overrides,
  });
}
