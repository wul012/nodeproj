import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate";

describe("managed audit manual sandbox connection credential resolver minimal shard readiness regular gate", () => {
  it("freezes the v370-v373 shard readiness evidence chain as an operator/CI regular gate", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate.v1",
      gateState: "minimal-shard-readiness-regular-gate-ready",
      gateDecision: "freeze-minimal-shard-readiness-regular-gate",
      readyForMinimalShardReadinessRegularGate: true,
      readyForNodeV375RegularGateArchiveVerification: true,
      activeNodeVersion: "Node v374",
      sourceNodeVersion: "Node v373",
      consumesNodeV373ShardReadinessCompatibilityReport: true,
      regularGateOnly: true,
      rerunsLiveRead: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      credentialValueRequested: false,
      credentialValueRead: false,
      rawEndpointUrlRequested: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV373: {
        sourceVersion: "Node v373",
        compatibilityState: "shard-readiness-compatible-for-regular-gate",
        compatibilityDecision: "prepare-minimal-shard-readiness-regular-gate",
        readyForShardReadinessCompatibilityReport: true,
        readyForNodeV374MinimalShardReadinessRegularGate: true,
        projectReportCount: 2,
        compatibleProjectCount: 2,
        fieldCheckCount: 18,
        matchedFieldCheckCount: 18,
        mismatchedFieldCount: 0,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      regularGate: {
        gateMode: "minimal-shard-readiness-regular-gate",
        sourceSpan: "Node v370-v373 shard readiness evidence chain",
        contractVersion: "shard-readiness-regular-gate.v1",
        consumesStaticContractGate: true,
        consumesLiveReadArchive: true,
        consumesArchiveVerification: true,
        consumesCompatibilityReport: true,
        operatorCiReady: true,
        activeShardingEnabled: false,
        readOnlyReadinessOnly: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v375",
      },
      checks: {
        sourceNodeV373Ready: true,
        sourceDigestChainComplete: true,
        sourceProjectReportsComplete: true,
        sourceFieldChecksAllMatched: true,
        sourceProductionBlockersClear: true,
        regularGateDigestStable: true,
        regularGateConsumesFullEvidenceChain: true,
        operatorCiReady: true,
        archiveVerificationOnlyEvidencePreserved: true,
        noLiveReadRerun: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForMinimalShardReadinessRegularGate: true,
      },
      summary: {
        sourceProjectReportCount: 2,
        sourceCompatibleProjectCount: 2,
        sourceFieldCheckCount: 18,
        sourceMatchedFieldCheckCount: 18,
        sourceMismatchedFieldCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV373.compatibilityReportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.regularGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v373 compatibility source is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v374-empty-"));

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

      expect(profile.gateState).toBe("blocked");
      expect(profile.gateDecision).toBe("blocked");
      expect(profile.readyForMinimalShardReadinessRegularGate).toBe(false);
      expect(profile.readyForNodeV375RegularGateArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V373_NOT_READY",
        "SOURCE_PROJECT_REPORTS_INCOMPLETE",
        "OPERATOR_CI_NOT_READY",
      ]));
      expect(profile.rerunsLiveRead).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 60000);

  it("exposes JSON and Markdown through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate.v1",
        gateState: "minimal-shard-readiness-regular-gate-ready",
        activeNodeVersion: "Node v374",
        sourceNodeVersion: "Node v373",
        regularGateOnly: true,
        rerunsLiveRead: false,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal shard readiness regular gate",
      );
      expect(markdown.body).toContain("Gate decision: freeze-minimal-shard-readiness-regular-gate");
      expect(markdown.body).toContain("Ready for Node v375 regular gate archive verification: true");
      expect(markdown.body).toContain("Reruns live read: false");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Stops mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-374",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v374-shard-regular-gate",
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
    ...overrides,
  });
}
