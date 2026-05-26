import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-review";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v336 and opens only Node v338 archive verification", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-review.v1",
      bodyCandidateReviewState: "disabled-runtime-shell-design-draft-body-candidate-review-ready",
      bodyCandidateReviewDecision: "archive-before-disabled-design-draft-body",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview:
        true,
      readOnlyBodyCandidateReview: true,
      bodyCandidateReviewOnly: true,
      consumesNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: true,
      activeNodeVersion: "Node v337",
      sourceNodeVersion: "Node v336",
      readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: true,
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
      sourceNodeV336: {
        archiveVerificationState: "disabled-design-draft-body-intake-archive-verified",
        archiveVerificationDecision: "proceed-to-disabled-design-draft-body-candidate-review",
        readyForArchiveVerification: true,
        readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      necessityProof: {
        blockerResolved: "body-intake-archive-verified-but-body-candidate-not-reviewed",
        consumer: "Node v338 body candidate archive verification",
        proofComplete: true,
      },
      bodyCandidateReview: {
        recordMode: "disabled-runtime-shell-design-draft-body-candidate-review-only",
        decision: "archive-before-disabled-design-draft-body",
        sourceSpan: "Node v336 disabled design draft body intake archive verification",
        candidateScope: "review-whether-disabled-design-draft-body-is-ready-for-archive-before-any-body-draft",
        requiresArchiveVerificationBeforeBodyDraft: true,
        requestsJavaMiniKvEcho: false,
        reviewQuestionCount: 5,
        stopConditionCount: 8,
        allowsDisabledRuntimeShellDesignDraftNow: false,
        allowsDisabledRuntimeShellDesignDraftOutlineNow: false,
        allowsRuntimeShellImplementation: false,
        allowsRuntimeShellInvocation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsMiniKvWriteOrAdminCommand: false,
        allowsAutomaticUpstreamStart: false,
        readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: true,
        nextNodeVersionSuggested: "Node v338",
      },
      checks: {
        sourceNodeV336Ready: true,
        sourceNodeV336AllowsBodyCandidateReviewOnly: true,
        sourceNodeV336KeepsDesignDraftClosed: true,
        sourceNodeV336KeepsRuntimeAndSideEffectsClosed: true,
        necessityProofComplete: true,
        bodyCandidateReviewOnly: true,
        reviewQuestionsAnswered: true,
        archiveVerificationRequiredBeforeBodyDraft: true,
        noUpstreamEchoRequested: true,
        noBodyDraftCreated: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview:
          true,
      },
      summary: {
        sourceNodeV336CheckCount: 29,
        sourceNodeV336PassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        reviewQuestionCount: 5,
        answeredReviewQuestionCount: 5,
        stopConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.bodyCandidateReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV336.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v336 source archive verification is blocked", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v337-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.bodyCandidateReviewState).toBe("blocked");
    expect(profile.bodyCandidateReviewDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview)
      .toBe(false);
    expect(profile.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.bodyCandidateReview.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V336_NOT_READY",
      "NODE_V336_DID_NOT_ALLOW_BODY_CANDIDATE_REVIEW",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.bodyCandidateReviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview)
      .toBe(false);
    expect(profile.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V336_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-review.v1",
        bodyCandidateReviewState: "disabled-runtime-shell-design-draft-body-candidate-review-ready",
        activeNodeVersion: "Node v337",
        sourceNodeVersion: "Node v336",
        readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        bodyCandidateReview: {
          decision: "archive-before-disabled-design-draft-body",
          candidateScope: "review-whether-disabled-design-draft-body-is-ready-for-archive-before-any-body-draft",
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v338",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate review",
      );
      expect(markdown.body).toContain("Ready for Node v338 body candidate archive verification: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-337",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v337-body-candidate-review",
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
