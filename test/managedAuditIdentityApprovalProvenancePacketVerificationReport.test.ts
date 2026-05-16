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
  loadManagedAuditIdentityApprovalProvenancePacketVerificationReport,
} from "../src/services/managedAuditIdentityApprovalProvenancePacketVerificationReport.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("managed audit identity approval provenance packet verification report", () => {
  it("verifies v211 packet shape, digests, provenance, cleanup, and v205 quality fixes", async () => {
    const config = loadTestConfig();
    const profile = await loadManagedAuditIdentityApprovalProvenancePacketVerificationReport({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-identity-approval-provenance-packet-verification-report.v1",
      reportState: "packet-verification-ready",
      readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyReport: true,
      sourceLocalDryRunWriteObserved: true,
      additionalWriteSurfaceAdded: false,
      executionAllowed: false,
      sourcePacket: {
        profileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1",
        packetState: "dry-run-packet-verified",
        sourceNodeVersion: "Node v211",
        sourceBindingContractVersion: "Node v210",
        sourceJavaVersion: "Java v75",
        sourceMiniKvVersion: "mini-kv v84",
        targetRecordVersion: "managed-audit-dry-run-record.v2-candidate",
        javaHandoffHintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1",
        miniKvRetentionProvenanceCheckDigest: "fnv1a64:357cc7e9eec3f223",
        localDryRunDirectoryRemoved: true,
      },
      verificationReport: {
        packetVersion: "managed-audit-dry-run-record.v2-candidate",
        identityOperatorId: "operator:v211-dry-run",
        approvalRequestId: "approval-request-v211-dry-run",
        approvalDecisionId: "approval-decision-v211-dry-run",
        approvalCorrelationId: "approval-correlation-v211-dry-run",
        appendPacketCount: 1,
        queryByRequestIdCount: 1,
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        externalAuditSystemAccessed: false,
        productionAuditRecordAllowed: false,
      },
      qualityOptimizations: {
        v205MiniKvReadCommandsAlignedWithRuntime: true,
        v205RuntimeSmokeRecordCountsCentralized: true,
        v205MiniKvReadCommands: ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"],
        v205OptimizationScope: "same-version-light-refactor",
      },
      checks: {
        sourcePacketReady: true,
        sourcePacketStillBlocksProduction: true,
        sourcePacketDigestValid: true,
        sourcePacketVerificationDigestValid: true,
        packetShapeVersionVerified: true,
        identityFieldsVerified: true,
        approvalRequestFieldsVerified: true,
        approvalDecisionFieldsVerified: true,
        correlationTraceDigestVerified: true,
        provenanceFieldsVerified: true,
        cleanupEvidenceVerified: true,
        upstreamWriteBoundaryPreserved: true,
        additionalWriteSurfaceNotAdded: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        v205ReadCommandsAligned: true,
        v205RecordCountsCentralized: true,
        readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport: true,
      },
      summary: {
        productionBlockerCount: 0,
        appendPacketCount: 1,
        queryResultCount: 1,
      },
    });
    expect(profile.sourcePacket.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourcePacket.packetVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourcePacket.sourceBindingContractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verificationReport.reportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verificationReport.traceDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verificationReport.sourceDigestAfterAppend).toBe(profile.verificationReport.sourceDigestAfterRepeatRead);
    expect(await listV211TempDirectories()).toEqual([]);
  });

  it("blocks when upstream actions are enabled", async () => {
    const config = loadTestConfig({
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const profile = await loadManagedAuditIdentityApprovalProvenancePacketVerificationReport({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.reportState).toBe("blocked");
    expect(profile.readyForManagedAuditIdentityApprovalProvenancePacketVerificationReport).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.sourcePacket.localDryRunDirectoryRemoved).toBe(true);
    expect(profile.additionalWriteSurfaceAdded).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-identity-approval-provenance-packet-verification-report.v1",
        reportState: "packet-verification-ready",
        readyForProductionAudit: false,
        sourcePacket: {
          sourceNodeVersion: "Node v211",
          sourceJavaVersion: "Java v75",
          sourceMiniKvVersion: "mini-kv v84",
        },
        checks: {
          cleanupEvidenceVerified: true,
          v205ReadCommandsAligned: true,
          v205RecordCountsCentralized: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit identity approval provenance packet verification report");
      expect(markdown.body).toContain("RUN_RECOMMENDED_PARALLEL_UPSTREAM_MARKERS");
      expect(markdown.body).toContain("SMOKEJSON");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-212",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v212-verification-report",
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
    PORT: "4309",
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
    throw new Error("managed audit packet verification report must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit packet verification report must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("managed audit packet verification report must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit packet verification report must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("managed audit packet verification report must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("managed audit packet verification report must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit packet verification report must not call mini-kv");
  }
}
