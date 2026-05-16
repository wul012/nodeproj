import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog } from "../src/services/auditLog.js";
import {
  describeAuditStoreRuntime,
} from "../src/services/auditStoreFactory.js";
import {
  loadManagedAuditPersistenceBoundaryCandidate,
} from "../src/services/managedAuditPersistenceBoundaryCandidate.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("managed audit persistence boundary candidate", () => {
  it("consumes v207, Java v74, and mini-kv v83 evidence without connecting a real adapter", async () => {
    const config = loadTestConfig();
    const profile = await loadManagedAuditPersistenceBoundaryCandidate({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-persistence-boundary-candidate.v1",
      candidateState: "ready-for-managed-audit-dry-run",
      readyForManagedAuditPersistenceBoundaryCandidate: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      candidate: {
        sourceManagedContractVersion: "managed-audit-store-contract.v1",
        sourceManagedBoundaryVersion: "managed-audit-adapter-boundary.v1",
        sourceManagedReadinessVersion: "managed-audit-readiness-summary.v1",
        javaHandoffHintVersion: "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1",
        miniKvProvenanceDigest: "fnv1a64:c1c0896fc6b77fe2",
        candidateSinkMode: "file-or-sqlite-dry-run-candidate",
        candidateRetentionDays: 30,
        candidateRotationPolicy: "size-and-age-rotation-candidate",
        realManagedAdapterConnected: false,
        externalAuditSystemAccessed: false,
        productionAuditRecordAllowed: false,
      },
      checks: {
        sourceTriageReady: true,
        sourceTriageSelectedManagedAuditFirst: true,
        sourceTriageStillBlocksProduction: true,
        managedStoreContractReadyForCandidate: true,
        managedAdapterBoundaryDocumented: true,
        managedReadinessStillBlocksProduction: true,
        javaV74HandoffAccepted: true,
        javaV74NoWriteBoundaryValid: true,
        miniKvV83ProvenanceAccepted: true,
        miniKvV83NoRestoreOrProductionClaim: true,
        dryRunCandidatesDefined: true,
        failureModesDefined: true,
        v209DryRunRequirementsDefined: true,
        noRealManagedAdapterConnected: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        readyForManagedAuditPersistenceBoundaryCandidate: true,
      },
      summary: {
        dryRunCandidateCount: 2,
        failureModeCount: 4,
        v209RequirementCount: 4,
        productionBlockerCount: 0,
      },
    });
    expect(profile.candidate.candidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.candidate.sourceTriageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.javaV74.handoffFieldPaths).toContain("verificationHint.warningDigest");
    expect(profile.upstreamEvidence.miniKvV83).toMatchObject({
      projectVersion: "0.83.0",
      artifactPathHint: "c/83/",
      productionBinaryClaimed: false,
    });
    expect(profile.adapterCandidate.dryRunStoreCandidates.map((candidate) => candidate.id)).toEqual([
      "file-jsonl",
      "sqlite",
    ]);
  });

  it("blocks when upstream actions are enabled", async () => {
    const config = loadTestConfig({
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const profile = await loadManagedAuditPersistenceBoundaryCandidate({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.candidateState).toBe("blocked");
    expect(profile.readyForManagedAuditPersistenceBoundaryCandidate).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-persistence-boundary-candidate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-persistence-boundary-candidate?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-persistence-boundary-candidate.v1",
        candidateState: "ready-for-managed-audit-dry-run",
        readyForProductionAudit: false,
        candidate: {
          candidateSinkMode: "file-or-sqlite-dry-run-candidate",
          miniKvProvenanceDigest: "fnv1a64:c1c0896fc6b77fe2",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit persistence boundary candidate");
      expect(markdown.body).toContain("java-release-approval-rehearsal-audit-persistence-handoff-hint.v1");
      expect(markdown.body).toContain("RUN_NODE_V209_DRY_RUN_VERIFICATION");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-208",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v208-managed-audit-candidate",
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
    PORT: "4305",
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit candidate must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit candidate must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("managed audit candidate must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit candidate must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("managed audit candidate must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("managed audit candidate must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit candidate must not call mini-kv");
  }
}
