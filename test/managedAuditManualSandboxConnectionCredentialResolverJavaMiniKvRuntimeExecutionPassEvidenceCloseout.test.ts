import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-closeout";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution pass evidence closeout", () => {
  it("closes out the v405-v408 evidence chain without rerunning smoke", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-closeout.v1",
      closeoutState: "runtime-execution-pass-evidence-closeout-ready",
      closeoutDecision: "close-runtime-execution-pass-evidence-chain",
      readyForRuntimeExecutionPassEvidenceCloseout: true,
      readyForRuntimeExecutionChainHandoff: true,
      activeNodeVersion: "Node v409",
      sourceNodeVersion: "Node v408",
      sourceStageVersions: ["Node v405", "Node v406", "Node v407", "Node v408"],
      javaSourceVersion: "Java v167",
      miniKvSourceVersion: "mini-kv v158",
      closeoutOnly: true,
      archiveVerificationOnly: true,
      rerunsSmoke: false,
      startsJavaService: false,
      startsMiniKvService: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      javaMiniKvRecommendedParallel: true,
      nodeIsUpstreamPreApprovalBlocker: false,
      closeout: {
        verificationMode: "runtime-execution-pass-evidence-closeout",
        sourceSummaryCount: 4,
        readyStageCount: 4,
        totalCheckCount: 114,
        totalPassedCheckCount: 114,
        totalProductionBlockerCount: 0,
        v407CleanupPassed: true,
        v408ArchiveReferenceCount: 7,
        v408PresentArchiveReferenceCount: 7,
        v408FullVitestFiles: 341,
        v408FullVitestTests: 1166,
        closeoutDecision: "close-runtime-execution-pass-evidence-chain",
        nextNodeVersionSuggested: "Node v410",
      },
      checks: {
        v405SummaryPresent: true,
        v406SummaryPresent: true,
        v407SummaryPresent: true,
        v408SummaryPresent: true,
        v408HttpArchivePresent: true,
        v408MarkdownArchivePresent: true,
        v408BrowserSnapshotPresent: true,
        v408ScreenshotPresent: true,
        v408ExplanationPresent: true,
        v408WalkthroughPresent: true,
        chainVersionOrderValid: true,
        v405CanonicalApprovalReady: true,
        v405CanonicalApprovalHasConcreteInputs: true,
        v405NoRuntimeExecutionOrServiceStart: true,
        v406LiveReadGateReady: true,
        v406TargetsReady: true,
        v406NoRuntimeExecutionOrServiceStart: true,
        v407ApprovedLoopbackSmokePassed: true,
        v407TargetsPassed: true,
        v407CleanupProofPassed: true,
        v407NoRouteOwnedServiceStartOrExecution: true,
        v408ArchiveVerificationReady: true,
        v408ArchiveReferencesComplete: true,
        v408DoesNotRerunOrStartServices: true,
        v408NoManagedAuditCredentialRawEndpointOrExecution: true,
        sourceChecksAllPassedAcrossChain: true,
        noProductionBlockersAcrossChain: true,
        verificationResultsRecordedForV406ThroughV408: true,
        closeoutDigestStable: true,
        readyForRuntimeExecutionPassEvidenceCloseout: true,
      },
      summary: {
        sourceSummaryCount: 4,
        archiveReferenceCount: 7,
        presentArchiveReferenceCount: 7,
        readyStageCount: 4,
        totalSourceCheckCount: 114,
        totalSourcePassedCheckCount: 114,
        totalSourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.closeout.closeoutDigest).toMatch(/^[a-f0-9]{64}$/);
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
        activeNodeVersion: "Node v409",
        sourceNodeVersion: "Node v408",
        readyForRuntimeExecutionPassEvidenceCloseout: true,
        closeoutOnly: true,
        rerunsSmoke: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Closeout");
      expect(markdown.body).toContain("No production blockers.");
      expect(markdown.body).toContain("CLOSEOUT_DOES_NOT_RERUN_SMOKE");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-409",
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
