import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate archive verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies the v343 archive and keeps the next design step non-runtime", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification.v1",
      archiveVerificationState: "disabled-design-draft-body-draft-candidate-archive-verified",
      archiveVerificationDecision: "body-draft-candidate-archive-verified-before-next-design-step",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification:
        true,
      readOnlyArchiveVerification: true,
      archiveVerificationOnly: true,
      consumesNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: true,
      activeNodeVersion: "Node v344",
      sourceNodeVersion: "Node v343",
      readyForNextDisabledDesignDraftStep: true,
      readyForDisabledRuntimeShellDesignDraft: false,
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
      sourceNodeV343: {
        draftCandidateState: "disabled-runtime-shell-design-draft-body-draft-candidate-ready",
        draftCandidateDecision: "record-disabled-body-draft-candidate-under-non-runtime-boundary",
        readyForDraftCandidate: true,
        readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        sourceCheckCount: 22,
        sourcePassedCheckCount: 22,
        sourceProductionBlockerCount: 0,
        sourceSectionCount: 8,
        sourceEvidenceCitationCount: 8,
        sourceSafetyGuardCount: 9,
        sourceStopConditionCount: 8,
        writesDesignBodyText: true,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      archiveVerification: {
        verificationMode: "read-only-v343-body-draft-candidate-archive-verification",
        decision: "body-draft-candidate-archive-verified-before-next-design-step",
        archiveRoot: "d/343",
        verifiesRouteAndMarkdown: true,
        verifiesSmokeSummary: true,
        verifiesScreenshotAndExplanation: true,
        verifiesCodeWalkthroughAndPlanIndex: true,
        verifiesCandidateDigest: true,
        rerunsSourceEndpoint: false,
        writesDesignDraftNow: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        requestsJavaMiniKvEcho: false,
        readyForNextDisabledDesignDraftStep: true,
        nextNodeVersionSuggested: "Node v345",
      },
      checks: {
        sourceNodeV343Ready: true,
        sourceNodeV343AllowsArchiveVerification: true,
        sourceNodeV343KeepsRuntimeAndSideEffectsClosed: true,
        archiveFilesPresent: true,
        jsonEvidenceMatchesSourceDigest: true,
        jsonEvidenceKeepsCandidateReady: true,
        markdownEvidenceRecordsDraftCandidateBoundary: true,
        smokeSummaryRecordsFallbackAndRouteSuccess: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsValidationAndScreenshotFallback: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV343AndV344: true,
        archiveVerificationDigestStable: true,
        archiveVerificationDoesNotRerunEndpoint: true,
        noDesignDraftOpened: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification:
          true,
      },
      summary: {
        sourceNodeV343CheckCount: 22,
        sourceNodeV343PassedCheckCount: 22,
        sourceProductionBlockerCount: 0,
        sourceSectionCount: 8,
        sourceEvidenceCitationCount: 8,
        sourceSafetyGuardCount: 9,
        sourceStopConditionCount: 8,
        archiveFileCount: 10,
        presentArchiveFileCount: 10,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV343.candidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v343 archive is unavailable", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v344-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.archiveVerificationDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification)
      .toBe(false);
    expect(profile.readyForNextDisabledDesignDraftStep).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.archiveVerification.readyForNextDisabledDesignDraftStep).toBe(false);
    expect(profile.summary.presentArchiveFileCount).toBe(0);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V343_NOT_READY",
      "ARCHIVE_FILES_MISSING",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification)
      .toBe(false);
    expect(profile.readyForNextDisabledDesignDraftStep).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V343_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification.v1",
        archiveVerificationState: "disabled-design-draft-body-draft-candidate-archive-verified",
        activeNodeVersion: "Node v344",
        sourceNodeVersion: "Node v343",
        readyForNextDisabledDesignDraftStep: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        executionAllowed: false,
        archiveVerification: {
          decision: "body-draft-candidate-archive-verified-before-next-design-step",
          rerunsSourceEndpoint: false,
          writesDesignDraftNow: false,
          implementsRuntimeShell: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v345",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate archive verification",
      );
      expect(markdown.body).toContain("Ready for next disabled design draft step: true");
      expect(markdown.body).toContain("Ready for runtime shell implementation: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-344",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v344-body-draft-candidate-archive-verification",
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
