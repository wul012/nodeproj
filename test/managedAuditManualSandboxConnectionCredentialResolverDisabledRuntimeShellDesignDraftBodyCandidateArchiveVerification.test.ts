import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-archive-verification";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate archive verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies the v337 archive and opens only Node v339 pre-draft decision", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-archive-verification.v1",
      archiveVerificationState: "disabled-design-draft-body-candidate-archive-verified",
      archiveVerificationDecision: "body-candidate-archive-verified-before-design-body",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification:
        true,
      readOnlyArchiveVerification: true,
      archiveVerificationOnly: true,
      consumesNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: true,
      activeNodeVersion: "Node v338",
      sourceNodeVersion: "Node v337",
      readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: true,
      readyForDisabledRuntimeShellDesignDraft: false,
      readyForDisabledRuntimeShellDesignDraftOutline: false,
      readyForRuntimeShellImplementation: false,
      readyForRuntimeShellInvocation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      httpRequestSent: false,
      tcpConnectionAttempted: false,
      networkSocketOpened: false,
      javaServiceStarted: false,
      miniKvServiceStarted: false,
      javaSqlExecutionAllowed: false,
      approvalLedgerWritten: false,
      schemaMigrationExecuted: false,
      rollbackExecutionAllowed: false,
      deploymentActionAllowed: false,
      miniKvWriteCommandAllowed: false,
      miniKvLoadAllowed: false,
      miniKvCompactAllowed: false,
      miniKvRestoreAllowed: false,
      miniKvSetnxexAllowed: false,
      automaticUpstreamStart: false,
      sourceNodeV337: {
        bodyCandidateReviewState: "disabled-runtime-shell-design-draft-body-candidate-review-ready",
        bodyCandidateReviewDecision: "archive-before-disabled-design-draft-body",
        readyForBodyCandidateReview: true,
        readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceCheckCount: 22,
        sourcePassedCheckCount: 22,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        reviewQuestionCount: 5,
        answeredReviewQuestionCount: 5,
        stopConditionCount: 8,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      archiveVerification: {
        verificationMode: "read-only-v337-body-candidate-review-archive-verification",
        decision: "body-candidate-archive-verified-before-design-body",
        archiveRoot: "d/337",
        verifiesRouteAndMarkdown: true,
        verifiesSmokeSummary: true,
        verifiesScreenshotAndExplanation: true,
        verifiesCodeWalkthroughAndPlanIndex: true,
        verifiesHistoricalFallbackArchive: true,
        rerunsSourceEndpoint: false,
        opensDisabledDesignDraftBodyNow: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        requestsJavaMiniKvEcho: false,
        readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: true,
        nextNodeVersionSuggested: "Node v339",
      },
      checks: {
        sourceNodeV337Ready: true,
        sourceNodeV337RequiresArchiveVerification: true,
        sourceNodeV337KeepsDesignDraftClosed: true,
        sourceNodeV337KeepsRuntimeAndSideEffectsClosed: true,
        archiveFilesPresent: true,
        jsonEvidenceMatchesSourceDigest: true,
        jsonEvidenceKeepsBodyCandidateReviewReady: true,
        markdownEvidenceRecordsBodyBoundary: true,
        smokeSummaryRecordsFallbackAndRouteSuccess: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsValidationAndScreenshotFallback: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV337AndV338: true,
        archiveVerificationDigestStable: true,
        archiveVerificationDoesNotRerunEndpoint: true,
        noBodyDraftCreated: true,
        noRuntimeImplementationCreated: true,
        noRuntimeInvocationAllowed: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noProviderClientInstantiated: true,
        noExternalRequestSent: true,
        noJavaOrMiniKvWrites: true,
        noUpstreamEchoRequested: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification:
          true,
      },
      summary: {
        sourceNodeV337CheckCount: 22,
        sourceNodeV337PassedCheckCount: 22,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        reviewQuestionCount: 5,
        answeredReviewQuestionCount: 5,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV337.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v337 archive is unavailable", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v338-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.archiveVerificationDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.archiveVerification.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision).toBe(false);
    expect(profile.summary.presentArchiveFileCount).toBe(0);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V337_NOT_READY",
      "ARCHIVE_FILES_MISSING",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 180_000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V337_NOT_READY",
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.automaticUpstreamStart).toBe(false);
  }, 180_000);

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-archive-verification.v1",
        archiveVerificationState: "disabled-design-draft-body-candidate-archive-verified",
        activeNodeVersion: "Node v338",
        sourceNodeVersion: "Node v337",
        readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        archiveVerification: {
          decision: "body-candidate-archive-verified-before-design-body",
          rerunsSourceEndpoint: false,
          opensDisabledDesignDraftBodyNow: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v339",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate archive verification",
      );
      expect(markdown.body).toContain("Ready for Node v339 pre-draft decision: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-338",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v338-body-candidate-archive-verification",
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
