import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-archive-verification";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution pass evidence archive verification", () => {
  it("verifies v407 pass evidence archive and cleanup proof without rerunning smoke", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-archive-verification.v1",
      verificationState: "runtime-execution-pass-evidence-archive-verified",
      verificationDecision: "accept-v407-pass-evidence-and-cleanup-proof-archive",
      readyForRuntimeExecutionPassEvidenceArchiveVerification: true,
      readyForRuntimeExecutionPassEvidenceCloseout: true,
      activeNodeVersion: "Node v408",
      sourceNodeVersion: "Node v407",
      archiveVerificationOnly: true,
      rerunsSmoke: false,
      startsJavaService: false,
      startsMiniKvService: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      archiveVerification: {
        verificationMode: "runtime-execution-pass-evidence-archive-verification",
        archiveProfileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke.v1",
        activeNodeVersion: "Node v407",
        sourceNodeVersion: "Node v406",
        smokeState: "approved-local-loopback-read-only-smoke-passed",
        smokeDecision: "accept-read-only-smoke-pass-evidence",
        readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: true,
        checkCount: 21,
        passedCheckCount: 21,
        productionBlockerCount: 0,
        attemptedTargetCount: 2,
        passedTargetCount: 2,
        failedTargetCount: 0,
        skippedTargetCount: 0,
        cleanupPassed: true,
        afterListeningSocketCount: 0,
        fullVitestFiles: 340,
        fullVitestTests: 1164,
        nextNodeVersionSuggested: "Node v409",
      },
      checks: {
        httpArchivePresent: true,
        summaryArchivePresent: true,
        cleanupProofPresent: true,
        browserSnapshotPresent: true,
        screenshotPresent: true,
        explanationPresent: true,
        walkthroughPresent: true,
        v407ProfileVersionValid: true,
        v407ActiveVersionValid: true,
        v407SourceVersionValid: true,
        v407SmokePassed: true,
        v407ReadyForPassArchive: true,
        v407ChecksAllPassed: true,
        v407ProductionBlockersClear: true,
        v407TargetsAllPassed: true,
        v407NoSkippedOrFailedTargets: true,
        v407RouteDidNotStartServices: true,
        v407NoManagedAuditCredentialRawEndpointOrWrites: true,
        sourceNodeV406ReadyInArchive: true,
        summaryMatchesHttpArchive: true,
        cleanupProofPassed: true,
        cleanupProofNoListeningSockets: true,
        cleanupProofPortsCovered: true,
        verificationResultsRecorded: true,
        fullVitestRecorded: true,
        typecheckAndBuildRecorded: true,
        verificationDigestStable: true,
        readyForRuntimeExecutionPassEvidenceArchiveVerification: true,
      },
      summary: {
        archiveReferenceCount: 7,
        presentArchiveReferenceCount: 7,
        sourceCheckCount: 21,
        sourcePassedCheckCount: 21,
        sourceProductionBlockerCount: 0,
        cleanupPassed: true,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.archiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 180_000);

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
        activeNodeVersion: "Node v408",
        sourceNodeVersion: "Node v407",
        readyForRuntimeExecutionPassEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        rerunsSmoke: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Archive Verification");
      expect(markdown.body).toContain("No production blockers.");
      expect(markdown.body).toContain("ARCHIVE_VERIFICATION_DOES_NOT_RERUN_SMOKE");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-408",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v405-20260531T130805-codex-auto",
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
