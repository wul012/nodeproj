import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan-archive-verification";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body preparation plan archive verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies the v341 archive and opens only Node v343 body draft candidate planning", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan-archive-verification.v1",
      archiveVerificationState: "disabled-design-draft-body-preparation-plan-archive-verified",
      archiveVerificationDecision: "preparation-plan-archive-verified-before-body-draft",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification:
        true,
      readOnlyArchiveVerification: true,
      archiveVerificationOnly: true,
      consumesNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: true,
      activeNodeVersion: "Node v342",
      sourceNodeVersion: "Node v341",
      readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: true,
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
      sourceNodeV341: {
        preparationPlanState: "disabled-runtime-shell-design-draft-body-preparation-plan-ready",
        preparationPlanDecision: "prepare-disabled-body-draft-plan-after-archive-verification",
        readyForPreparationPlan: true,
        readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceCheckCount: 25,
        sourcePassedCheckCount: 25,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceSectionPlanCount: 8,
        sourceEvidenceMappingCount: 6,
        sourceStopConditionCount: 8,
        sourceDraftGuardCount: 8,
        sourceEnforcedDraftGuardCount: 8,
        sourcePlannedSectionCount: 8,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      archiveVerification: {
        verificationMode: "read-only-v341-preparation-plan-archive-verification",
        decision: "preparation-plan-archive-verified-before-body-draft",
        archiveRoot: "d/341",
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
        readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: true,
        nextNodeVersionSuggested: "Node v343",
      },
      checks: {
        sourceNodeV341Ready: true,
        sourceNodeV341RequiresArchiveVerification: true,
        sourceNodeV341KeepsDesignDraftClosed: true,
        sourceNodeV341KeepsRuntimeAndSideEffectsClosed: true,
        archiveFilesPresent: true,
        jsonEvidenceMatchesSourceDigest: true,
        jsonEvidenceKeepsPreparationPlanReady: true,
        markdownEvidenceRecordsPreparationBoundary: true,
        smokeSummaryRecordsFallbackAndRouteSuccess: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsValidationAndScreenshotFallback: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV341AndV342: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification:
          true,
      },
      summary: {
        sourceNodeV341CheckCount: 25,
        sourceNodeV341PassedCheckCount: 25,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceSectionPlanCount: 8,
        sourceEvidenceMappingCount: 6,
        sourceStopConditionCount: 8,
        sourceDraftGuardCount: 8,
        sourceEnforcedDraftGuardCount: 8,
        sourcePlannedSectionCount: 8,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV341.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v341 archive is unavailable", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v342-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.archiveVerificationDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.archiveVerification.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate).toBe(false);
    expect(profile.summary.presentArchiveFileCount).toBe(0);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V341_NOT_READY",
      "ARCHIVE_FILES_MISSING",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification)
      .toBe(false);
    expect(profile.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V341_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan-archive-verification.v1",
        archiveVerificationState: "disabled-design-draft-body-preparation-plan-archive-verified",
        activeNodeVersion: "Node v342",
        sourceNodeVersion: "Node v341",
        readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        archiveVerification: {
          decision: "preparation-plan-archive-verified-before-body-draft",
          rerunsSourceEndpoint: false,
          writesBodyDraftNow: false,
          opensDisabledDesignDraftBodyNow: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v343",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body preparation plan archive verification",
      );
      expect(markdown.body).toContain("Ready for Node v343 body draft candidate: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-342",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v342-preparation-plan-archive-verification",
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


