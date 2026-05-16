import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog } from "../src/services/auditLog.js";
import {
  describeAuditStoreRuntime,
} from "../src/services/auditStoreFactory.js";
import {
  loadManagedAuditPacketRestoreDrillPlan,
} from "../src/services/managedAuditPacketRestoreDrillPlan.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("managed audit packet restore drill plan", () => {
  it("consumes v212, Java v76, and mini-kv v85 receipts without executing restore", async () => {
    const config = loadTestConfig();
    const profile = await loadManagedAuditPacketRestoreDrillPlan({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-packet-restore-drill-plan.v1",
      drillState: "ready-for-manual-dry-run-plan",
      readyForManagedAuditPacketRestoreDrillPlan: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyPlan: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      automaticUpstreamStart: false,
      sourceVerificationReport: {
        profileVersion: "managed-audit-identity-approval-provenance-packet-verification-report.v1",
        reportState: "packet-verification-ready",
        sourcePacketLocalCleanupVerified: true,
        sourceLocalDryRunWriteObserved: true,
      },
      upstreamReceipts: {
        javaV76: {
          sourceVersion: "Java v76",
          markerVersion: "java-release-approval-rehearsal-approval-handoff-verification-marker.v1",
          consumedByNodeVersion: "Node v211",
          consumedPacketRequestId: "managed-audit-v211-identity-approval-provenance-request",
          appendQueryDigestCleanupCovered: true,
          readyForNodeV213RestoreDrillPlan: true,
          javaApprovalDecisionCreated: false,
          javaApprovalLedgerWritten: false,
          managedAuditWriteExecuted: false,
          restoreExecuted: false,
        },
        miniKvV85: {
          sourceVersion: "mini-kv v85",
          projectVersion: "0.85.0",
          consumer: "Node v213 managed audit packet restore drill plan",
          consumedBy: "Node v211 managed audit identity approval provenance dry-run packet",
          consumedReleaseVersion: "v84",
          consumedCheckDigest: "fnv1a64:357cc7e9eec3f223",
          currentArtifactPathHint: "c/85/",
          markerDigest: "fnv1a64:1ea4570c967cfdb1",
          readOnly: true,
          executionAllowed: false,
          replayExecuted: false,
          managedAuditWriteExecuted: false,
          restoreExecuted: false,
          orderAuthoritative: false,
        },
      },
      restoreDrillPlan: {
        planMode: "manual-dry-run-plan-only",
        packetSourceVersion: "Node v211",
        verificationSourceVersion: "Node v212",
        javaReceiptVersion: "Java v76",
        miniKvReceiptVersion: "mini-kv v85",
        normalizedEvidenceRoot: "project-relative",
        expectedPacketFileName: "managed-audit-packet.jsonl",
        expectedPacketRequestId: "managed-audit-v211-identity-approval-provenance-request",
        expectedPacketVersion: "managed-audit-dry-run-record.v2-candidate",
        stepCount: 6,
        forbiddenOperationCount: 6,
      },
      normalizedEvidenceHints: {
        nodeV211Archive: "c/211/",
        nodeV212Archive: "c/212/",
        javaV76Archive: "c/76/",
        miniKvV85Archive: "c/85/",
      },
      checks: {
        sourceVerificationReportReady: true,
        sourcePacketStillBlocksProduction: true,
        sourceCleanupEvidenceVerified: true,
        javaV76MarkerAccepted: true,
        javaV76ReadyForNodeV213: true,
        javaV76NoWriteBoundary: true,
        miniKvV85ReplayMarkerAccepted: true,
        miniKvV85ReadOnly: true,
        miniKvV85NoRestoreOrAuditWrite: true,
        evidenceHintsNormalized: true,
        drillStepsDryRunOnly: true,
        forbiddenOperationsCovered: true,
        noAutomaticUpstreamStart: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        restoreExecutionStillBlocked: true,
        readyForManagedAuditPacketRestoreDrillPlan: true,
      },
      summary: {
        drillStepCount: 6,
        forbiddenOperationCount: 6,
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceVerificationReport.reportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceVerificationReport.sourcePacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.restoreDrillPlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(Object.values(profile.normalizedEvidenceHints).every((value) => !/^[A-Za-z]:[\\/]/.test(value))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.id)).toEqual([
      "connect-real-managed-audit",
      "replay-packet-to-production",
      "create-java-approval-decision",
      "execute-mini-kv-restore",
      "start-upstreams-automatically",
      "enable-upstream-actions",
    ]);
    expect(await listV211TempDirectories()).toEqual([]);
  });

  it("blocks when upstream actions are enabled", async () => {
    const config = loadTestConfig({
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const profile = await loadManagedAuditPacketRestoreDrillPlan({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.drillState).toBe("blocked");
    expect(profile.readyForManagedAuditPacketRestoreDrillPlan).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.restoreExecutionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-packet-restore-drill-plan",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-packet-restore-drill-plan?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-packet-restore-drill-plan.v1",
        drillState: "ready-for-manual-dry-run-plan",
        readyForProductionAudit: false,
        restoreExecutionAllowed: false,
        upstreamReceipts: {
          javaV76: {
            readyForNodeV213RestoreDrillPlan: true,
          },
          miniKvV85: {
            markerDigest: "fnv1a64:1ea4570c967cfdb1",
          },
        },
        checks: {
          evidenceHintsNormalized: true,
          restoreExecutionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit packet restore drill plan");
      expect(markdown.body).toContain("DRILL_PLAN_ONLY");
      expect(markdown.body).toContain("mini-kv v85");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-213",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v213-restore-drill",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4310",
    ...overrides,
  });
}

async function listV211TempDirectories(): Promise<string[]> {
  const root = path.resolve(process.cwd(), ".tmp");
  if (!existsSync(root)) {
    return [];
  }

  return (await readdir(root, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("managed-audit-v211-"))
    .map((entry) => entry.name);
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit packet restore drill plan must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit packet restore drill plan must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("managed audit packet restore drill plan must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit packet restore drill plan must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("managed audit packet restore drill plan must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("managed audit packet restore drill plan must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit packet restore drill plan must not call mini-kv");
  }
}
