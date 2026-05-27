import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body pre-draft decision", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v338 and opens only Node v340 archive verification", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision.v1",
      preDraftDecisionState: "disabled-runtime-shell-design-draft-body-pre-draft-decision-ready",
      preDraftDecision: "prepare-body-draft-under-disabled-boundary-after-archive",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision:
        true,
      readOnlyPreDraftDecision: true,
      preDraftDecisionOnly: true,
      consumesNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: true,
      activeNodeVersion: "Node v339",
      sourceNodeVersion: "Node v338",
      readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: true,
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
      sourceNodeV338: {
        archiveVerificationState: "disabled-design-draft-body-candidate-archive-verified",
        archiveVerificationDecision: "body-candidate-archive-verified-before-design-body",
        readyForArchiveVerification: true,
        readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        sourceReviewQuestionCount: 5,
        sourceAnsweredReviewQuestionCount: 5,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      necessityProof: {
        blockerResolved: "body-candidate-archive-verified-but-pre-draft-decision-not-recorded",
        consumer: "Node v340 pre-draft decision archive verification",
        proofComplete: true,
      },
      preDraftDecisionRecord: {
        decisionMode: "disabled-runtime-shell-design-draft-body-pre-draft-decision-only",
        decision: "prepare-body-draft-under-disabled-boundary-after-archive",
        sourceSpan: "Node v338 disabled design draft body candidate archive verification",
        preDraftScope: "decide-whether-a-future-disabled-body-draft-may-be-prepared-without-writing-it-now",
        requiresArchiveVerificationBeforeBodyDraft: true,
        requestsJavaMiniKvEcho: false,
        decisionQuestionCount: 5,
        preparationControlCount: 6,
        stopConditionCount: 8,
        allowsBodyDraftPreparation: true,
        writesBodyDraftNow: false,
        allowsDisabledRuntimeShellDesignDraftNow: false,
        allowsDisabledRuntimeShellDesignDraftOutlineNow: false,
        allowsRuntimeShellImplementation: false,
        allowsRuntimeShellInvocation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsMiniKvWriteOrAdminCommand: false,
        allowsAutomaticUpstreamStart: false,
        readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: true,
        nextNodeVersionSuggested: "Node v340",
      },
      checks: {
        sourceNodeV338Ready: true,
        sourceNodeV338AllowsPreDraftDecisionOnly: true,
        sourceNodeV338KeepsDesignDraftClosed: true,
        sourceNodeV338KeepsRuntimeAndSideEffectsClosed: true,
        necessityProofComplete: true,
        preDraftDecisionOnly: true,
        decisionQuestionsAnswered: true,
        preparationControlsEnforced: true,
        archiveVerificationRequiredBeforeBodyDraft: true,
        noUpstreamEchoRequested: true,
        noBodyDraftWritten: true,
        noRuntimeImplementationCreated: true,
        noRuntimeInvocationAllowed: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noProviderClientInstantiated: true,
        noExternalRequestSent: true,
        noJavaOrMiniKvWrites: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision:
          true,
      },
      summary: {
        sourceNodeV338CheckCount: 29,
        sourceNodeV338PassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        sourceReviewQuestionCount: 5,
        sourceAnsweredReviewQuestionCount: 5,
        decisionQuestionCount: 5,
        answeredDecisionQuestionCount: 5,
        preparationControlCount: 6,
        enforcedPreparationControlCount: 6,
        stopConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.preDraftDecisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV338.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v338 source archive verification is blocked", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v339-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.preDraftDecisionState).toBe("blocked");
    expect(profile.preDraftDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision)
      .toBe(false);
    expect(profile.readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.preDraftDecisionRecord.readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V338_NOT_READY",
      "NODE_V338_DID_NOT_ALLOW_PRE_DRAFT_DECISION",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.preDraftDecisionState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision)
      .toBe(false);
    expect(profile.readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V338_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision.v1",
        preDraftDecisionState: "disabled-runtime-shell-design-draft-body-pre-draft-decision-ready",
        activeNodeVersion: "Node v339",
        sourceNodeVersion: "Node v338",
        readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        preDraftDecisionRecord: {
          decision: "prepare-body-draft-under-disabled-boundary-after-archive",
          preDraftScope: "decide-whether-a-future-disabled-body-draft-may-be-prepared-without-writing-it-now",
          requestsJavaMiniKvEcho: false,
          writesBodyDraftNow: false,
          nextNodeVersionSuggested: "Node v340",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body pre-draft decision",
      );
      expect(markdown.body).toContain("Ready for Node v340 pre-draft decision archive verification: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-339",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v339-body-pre-draft-decision",
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
