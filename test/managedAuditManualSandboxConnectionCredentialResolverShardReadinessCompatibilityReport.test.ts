import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report";

describe("managed audit manual sandbox connection credential resolver shard readiness compatibility report", () => {
  it("compares v370 static evidence with v371/v372 archived live-read evidence without rerunning upstreams", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report.v1",
      compatibilityState: "shard-readiness-compatible-for-regular-gate",
      compatibilityDecision: "prepare-minimal-shard-readiness-regular-gate",
      readyForShardReadinessCompatibilityReport: true,
      readyForNodeV374MinimalShardReadinessRegularGate: true,
      activeNodeVersion: "Node v373",
      sourceStaticNodeVersion: "Node v370",
      sourceArchiveNodeVersion: "Node v372",
      consumesNodeV370ShardReadinessContractConsumerGate: true,
      consumesNodeV372LiveReadArchiveVerification: true,
      compatibilityReportOnly: true,
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
      sourceNodeV370: {
        sourceVersion: "Node v370",
        gateState: "shard-readiness-contract-consumer-gate-ready",
        gateDecision: "consume-java-and-mini-kv-shard-readiness-evidence",
        readyForShardReadinessContractConsumerGate: true,
        readyForNodeV371MinimalShardReadinessLiveReadGate: true,
        evidenceSourceCount: 2,
        readyEvidenceSourceCount: 2,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      },
      sourceNodeV372: {
        sourceVersion: "Node v372",
        archiveVerificationState: "minimal-shard-readiness-live-read-archive-verified",
        archiveVerificationDecision: "archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report",
        readyForMinimalShardReadinessLiveReadArchiveVerification: true,
        readyForNodeV373ShardReadinessCompatibilityReport: true,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        productionBlockerCount: 0,
        rerunsLiveRead: false,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      },
      compatibilityReport: {
        reportMode: "shard-readiness-compatibility-report",
        sourceSpan: "Node v370 static contract plus Node v371/v372 archived live-read evidence",
        comparesStaticAndLiveEvidence: true,
        consumesArchiveVerificationOnly: true,
        rerunsLiveRead: false,
        startsUpstreamServices: false,
        stopsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        nextNodeVersionSuggested: "Node v374",
      },
      checks: {
        sourceNodeV370Ready: true,
        sourceNodeV372ArchiveReady: true,
        sourceDigestChainAligned: true,
        javaStaticEvidenceReady: true,
        javaLiveReadArchivedReady: true,
        javaStaticLiveFieldsCompatible: true,
        javaReadOnlyBoundarySafe: true,
        miniKvStaticEvidenceReady: true,
        miniKvLiveReadArchivedReady: true,
        miniKvStaticLiveFieldsCompatible: true,
        miniKvReadOnlyBoundarySafe: true,
        bothProjectsCompatible: true,
        archiveVerificationOnly: true,
        noLiveReadRerun: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        reportDigestStable: true,
        readyForShardReadinessCompatibilityReport: true,
      },
      summary: {
        projectReportCount: 2,
        compatibleProjectCount: 2,
        fieldCheckCount: 18,
        matchedFieldCheckCount: 18,
        mismatchedFieldCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV370.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV372.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.compatibilityReport.reportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.projectReports.map((report) => report.project)).toEqual(["advanced-order-platform", "mini-kv"]);
    expect(profile.projectReports.every((report) => report.compatibleForRegularGate)).toBe(true);
    expect(profile.fieldChecks.every((field) => field.matches)).toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v371/v372 archive chain is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v373-empty-"));

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

      expect(profile.compatibilityState).toBe("blocked");
      expect(profile.compatibilityDecision).toBe("blocked");
      expect(profile.readyForShardReadinessCompatibilityReport).toBe(false);
      expect(profile.readyForNodeV374MinimalShardReadinessRegularGate).toBe(false);
      expect(profile.sourceNodeV372.readyForMinimalShardReadinessLiveReadArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V370_NOT_READY",
        "SOURCE_NODE_V372_ARCHIVE_NOT_READY",
        "PROJECT_COMPATIBILITY_INCOMPLETE",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report.v1",
        compatibilityState: "shard-readiness-compatible-for-regular-gate",
        activeNodeVersion: "Node v373",
        sourceStaticNodeVersion: "Node v370",
        sourceArchiveNodeVersion: "Node v372",
        compatibilityReportOnly: true,
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
        "# Managed audit manual sandbox connection credential resolver shard readiness compatibility report",
      );
      expect(markdown.body).toContain("Compatibility decision: prepare-minimal-shard-readiness-regular-gate");
      expect(markdown.body).toContain("Ready for Node v374 minimal shard readiness regular gate: true");
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
    "x-orderops-operator-id": "auditor-373",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v373-shard-compatibility",
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
