import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRealReadAdapterImportedWindowResultPacket,
} from "../src/services/realReadAdapterImportedWindowResultPacket.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("real-read adapter imported window result packet", () => {
  it("builds an imported operator-window sample while preserving the closed baseline", async () => {
    const profile = await loadRealReadAdapterImportedWindowResultPacket({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "real-read-adapter-imported-window-result-packet.v1",
      packetState: "closed-baseline-with-imported-window-sample",
      readyForRealReadAdapterImportedWindowResultPacket: true,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      packet: {
        sourceVerificationState: "verified-closed-window-archive",
        baselineKind: "closed-window-baseline",
        importedResultKind: "operator-window-result",
        javaEvidenceVersion: "Java v69",
        miniKvEvidenceVersion: "mini-kv v78",
        upstreamProbesEnabledForImportedSample: true,
        upstreamActionsEnabledForImportedSample: false,
        nodeStartedUpstreams: false,
        productionWriteAuthorized: false,
        importedAsProductionPassEvidence: false,
      },
      closedWindowBaseline: {
        sourceArchiveState: "closed-window-evidence-archived",
        sourceRehearsalState: "closed-skipped",
        sourceTaxonomyState: "closed-window-classified",
        readOnlyWindowOpen: false,
        attemptedProbeCount: 0,
      },
      operatorWindowResult: {
        sampleVersion: "real-read-adapter-imported-window-result-sample.v1",
        windowId: "operator-window-sample-v196",
        importedRecordCount: 5,
        passedRecordCount: 5,
        skippedRecordCount: 0,
        blockedRecordCount: 0,
        readOnlyWindowOpen: true,
        operatorOwnsUpstreamLifecycle: true,
        nodeStartedUpstreams: false,
        importedAsProductionPassEvidence: false,
      },
      upstreamVerificationHints: {
        java: {
          hintVersion: "java-release-approval-rehearsal-verification-hint.v1",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v3",
          noLedgerWriteProved: true,
          nodeMayTreatAsProductionAuthorization: false,
        },
        miniKv: {
          runtimeVersion: "0.78.0",
          taxonomyDigest: "fnv1a64:f92fcba55feb26a2",
          verificationSampleConsumer: "Node v196 imported window result packet",
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
        },
      },
      checks: {
        sourceArchiveVerificationReady: true,
        sourceVerificationDigestValid: true,
        sourceArchiveDigestValid: true,
        closedWindowBaselineRecognized: true,
        operatorWindowSamplePresent: true,
        closedBaselineAndImportedWindowDistinguished: true,
        javaV69VerificationHintReady: true,
        miniKvV78SmokeVerificationReady: true,
        importedRecordSetComplete: true,
        importedRecordsReadOnly: true,
        noBlockedRecordsImported: true,
        upstreamActionsStillDisabled: true,
        nodeDoesNotStartUpstreams: true,
        productionPassStillFalse: true,
        readyForProductionOperationsStillFalse: true,
        readyForRealReadAdapterImportedWindowResultPacket: true,
      },
      summary: {
        packetCheckCount: 16,
        passedPacketCheckCount: 16,
        importedRecordCount: 5,
        passedRecordCount: 5,
        productionBlockerCount: 0,
      },
    });
    expect(profile.packet.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sampleDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceArchiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamVerificationHints.java.warningDigest).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(profile.importedRecords).toHaveLength(5);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("blocks the packet when upstream actions are enabled", async () => {
    const profile = await loadRealReadAdapterImportedWindowResultPacket({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForRealReadAdapterImportedWindowResultPacket).toBe(false);
    expect(profile.readyForProductionOperations).toBe(false);
    expect(profile.checks.sourceArchiveVerificationReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes imported window result packet routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const headers = {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-imported-window-result-packet",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-adapter-imported-window-result-packet?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-adapter-imported-window-result-packet.v1",
        packetState: "closed-baseline-with-imported-window-sample",
        readyForRealReadAdapterImportedWindowResultPacket: true,
        packet: {
          importedResultKind: "operator-window-result",
          importedAsProductionPassEvidence: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read adapter imported window result packet");
      expect(markdown.body).toContain("closed-baseline-with-imported-window-sample");
      expect(markdown.body).toContain("java-release-approval-rehearsal-response-schema.v3");
      expect(markdown.body).toContain("fnv1a64:f92fcba55feb26a2");
    } finally {
      await app.close();
    }
  });
});

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
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("should not call Java when UPSTREAM_PROBES_ENABLED=false");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("should not call Java when UPSTREAM_PROBES_ENABLED=false");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("should not call mini-kv when UPSTREAM_PROBES_ENABLED=false");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("should not call mini-kv when UPSTREAM_PROBES_ENABLED=false");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("should not call mini-kv when UPSTREAM_PROBES_ENABLED=false");
  }
}
