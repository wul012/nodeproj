import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body pre-draft decision archive verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies the v339 archive and opens only Node v341 preparation planning", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification.v1",
      archiveVerificationState: "disabled-design-draft-body-pre-draft-decision-archive-verified",
      archiveVerificationDecision: "pre-draft-decision-archive-verified-before-body-draft",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification:
        true,
      readOnlyArchiveVerification: true,
      archiveVerificationOnly: true,
      consumesNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: true,
      activeNodeVersion: "Node v340",
      sourceNodeVersion: "Node v339",
      readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: true,
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
      sourceNodeV339: {
        preDraftDecisionState: "disabled-runtime-shell-design-draft-body-pre-draft-decision-ready",
        preDraftDecision: "prepare-body-draft-under-disabled-boundary-after-archive",
        readyForPreDraftDecision: true,
        readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceCheckCount: 23,
        sourcePassedCheckCount: 23,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        decisionQuestionCount: 5,
        answeredDecisionQuestionCount: 5,
        preparationControlCount: 6,
        enforcedPreparationControlCount: 6,
        stopConditionCount: 8,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      archiveVerification: {
        verificationMode: "read-only-v339-pre-draft-decision-archive-verification",
        decision: "pre-draft-decision-archive-verified-before-body-draft",
        archiveRoot: "d/339",
        verifiesRouteAndMarkdown: true,
        verifiesSmokeSummary: true,
        verifiesScreenshotAndExplanation: true,
        verifiesCodeWalkthroughAndPlanIndex: true,
        verifiesHistoricalFallbackArchive: true,
        rerunsSourceEndpoint: false,
        writesBodyDraftNow: false,
        opensDisabledDesignDraftBodyNow: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        requestsJavaMiniKvEcho: false,
        readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: true,
        nextNodeVersionSuggested: "Node v341",
      },
      checks: {
        sourceNodeV339Ready: true,
        sourceNodeV339RequiresArchiveVerification: true,
        sourceNodeV339KeepsDesignDraftClosed: true,
        sourceNodeV339KeepsRuntimeAndSideEffectsClosed: true,
        archiveFilesPresent: true,
        jsonEvidenceMatchesSourceDigest: true,
        jsonEvidenceKeepsPreDraftDecisionReady: true,
        markdownEvidenceRecordsPreDraftBoundary: true,
        smokeSummaryRecordsFallbackAndRouteSuccess: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsValidationAndScreenshotFallback: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV339AndV340: true,
        archiveVerificationDigestStable: true,
        archiveVerificationDoesNotRerunEndpoint: true,
        noBodyDraftWritten: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification:
          true,
      },
      summary: {
        sourceNodeV339CheckCount: 23,
        sourceNodeV339PassedCheckCount: 23,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        decisionQuestionCount: 5,
        answeredDecisionQuestionCount: 5,
        preparationControlCount: 6,
        enforcedPreparationControlCount: 6,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV339.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v339 archive is unavailable", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v340-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.archiveVerificationDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.archiveVerification.readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan).toBe(false);
    expect(profile.summary.presentArchiveFileCount).toBe(0);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V339_NOT_READY",
      "ARCHIVE_FILES_MISSING",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V339_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification.v1",
        archiveVerificationState: "disabled-design-draft-body-pre-draft-decision-archive-verified",
        activeNodeVersion: "Node v340",
        sourceNodeVersion: "Node v339",
        readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        archiveVerification: {
          decision: "pre-draft-decision-archive-verified-before-body-draft",
          rerunsSourceEndpoint: false,
          writesBodyDraftNow: false,
          opensDisabledDesignDraftBodyNow: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v341",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body pre-draft decision archive verification",
      );
      expect(markdown.body).toContain("Ready for Node v341 body preparation plan: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-340",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v340-pre-draft-decision-archive-verification",
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
