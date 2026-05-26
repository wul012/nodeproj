import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-archive-verification";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft candidate archive verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies the v331 archive and opens only Node v333 outline intake", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-archive-verification.v1",
      archiveVerificationState: "disabled-design-draft-candidate-archive-verified",
      archiveVerificationDecision: "proceed-to-disabled-design-draft-outline-intake",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification:
        true,
      readOnlyArchiveVerification: true,
      archiveVerificationOnly: true,
      consumesNodeV331DisabledRuntimeShellDesignDraftCandidateReview: true,
      activeNodeVersion: "Node v332",
      sourceNodeVersion: "Node v331",
      readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: true,
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
      sourceNodeV331: {
        candidateReviewState: "disabled-runtime-shell-design-draft-candidate-review-ready",
        candidateReviewDecision: "archive-before-disabled-design-draft-outline",
        readyForCandidateReview: true,
        readyForNodeV332ArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceProductionBlockerCount: 0,
        reviewQuestionCount: 5,
        stopConditionCount: 8,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      archiveVerification: {
        verificationMode: "read-only-v331-archive-verification",
        decision: "proceed-to-disabled-design-draft-outline-intake",
        archiveRoot: "d/331",
        verifiesRouteAndMarkdown: true,
        verifiesSmokeSummary: true,
        verifiesScreenshotAndExplanation: true,
        verifiesCodeWalkthroughAndPlanIndex: true,
        verifiesHistoricalFallbackArchive: true,
        rerunsSourceEndpoint: false,
        opensDisabledDesignDraftOutlineNow: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        requestsJavaMiniKvEcho: false,
        readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: true,
        nextNodeVersionSuggested: "Node v333",
      },
      checks: {
        sourceNodeV331Ready: true,
        sourceNodeV331RequiresArchiveVerification: true,
        sourceNodeV331KeepsDesignDraftClosed: true,
        sourceNodeV331KeepsRuntimeAndSideEffectsClosed: true,
        archiveFilesPresent: true,
        jsonEvidenceMatchesSourceDigest: true,
        jsonEvidenceKeepsCandidateReviewReady: true,
        markdownEvidenceRecordsCandidateBoundary: true,
        smokeSummaryRecordsFallbackAndRouteSuccess: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsValidationAndScreenshotFallback: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV331AndV332: true,
        archiveVerificationDigestStable: true,
        archiveVerificationDoesNotRerunEndpoint: true,
        noRuntimeDesignDraftCreated: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification:
          true,
      },
      summary: {
        sourceNodeV331CheckCount: 22,
        sourceNodeV331PassedCheckCount: 22,
        sourceProductionBlockerCount: 0,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV331.candidateReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v331 archive is unavailable", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v332-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.archiveVerificationDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.archiveVerification.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake).toBe(false);
    expect(profile.summary.presentArchiveFileCount).toBe(0);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "ARCHIVE_FILES_MISSING",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V331_NOT_READY",
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.automaticUpstreamStart).toBe(false);
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-archive-verification.v1",
        archiveVerificationState: "disabled-design-draft-candidate-archive-verified",
        activeNodeVersion: "Node v332",
        sourceNodeVersion: "Node v331",
        readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        archiveVerification: {
          decision: "proceed-to-disabled-design-draft-outline-intake",
          rerunsSourceEndpoint: false,
          opensDisabledDesignDraftOutlineNow: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v333",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft candidate archive verification",
      );
      expect(markdown.body).toContain("Ready for Node v333 disabled design draft outline intake: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-332",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v332-design-draft-candidate-archive-verification",
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
