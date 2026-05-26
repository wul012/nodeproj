import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-review";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft candidate review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v330 and opens only Node v332 archive verification", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-review.v1",
      candidateReviewState: "disabled-runtime-shell-design-draft-candidate-review-ready",
      candidateReviewDecision: "archive-before-disabled-design-draft-outline",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview: true,
      readOnlyCandidateReview: true,
      disabledRuntimeShellDesignDraftCandidateReviewOnly: true,
      consumesNodeV330CandidateGateUpstreamHardeningReview: true,
      activeNodeVersion: "Node v331",
      sourceNodeVersion: "Node v330",
      readyForNodeV332ArchiveVerification: true,
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
      sourceNodeV330: {
        reviewState: "candidate-gate-upstream-hardening-review-ready",
        upstreamAlignmentDecision: "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review",
        readyForCandidateGateUpstreamHardeningReview: true,
        readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForRuntimeShellImplementation: false,
        readyForRuntimeShellInvocation: false,
        sourceSpan: "Node v329 + Java v151/v152 + mini-kv v143",
        sourceProductionBlockerCount: 0,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      necessityProof: {
        blockerResolved: "input-hardening-aligned-but-design-draft-is-not-yet-reviewable",
        consumer: "Node v332 archive verification",
        proofComplete: true,
      },
      candidateReview: {
        recordMode: "disabled-runtime-shell-design-draft-candidate-review-only",
        decision: "archive-before-disabled-design-draft-outline",
        sourceSpan: "Node v330 candidate gate upstream hardening review",
        candidateScope: "review-whether-a-disabled-runtime-shell-design-draft-is-worth-archiving-before-any-outline",
        requiresArchiveVerificationBeforeDesignDraft: true,
        requestsJavaMiniKvEcho: false,
        readyForNodeV332ArchiveVerification: true,
        allowsDisabledRuntimeShellDesignDraftNow: false,
        allowsDisabledRuntimeShellDesignDraftOutline: false,
        allowsRuntimeShellImplementation: false,
        allowsRuntimeShellInvocation: false,
        allowsRealResolverImplementation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsMiniKvWriteOrAdminCommand: false,
        allowsAutomaticUpstreamStart: false,
        nextNodeVersionSuggested: "Node v332",
      },
      checks: {
        sourceNodeV330Ready: true,
        sourceNodeV330AllowsCandidateReviewOnly: true,
        sourceNodeV330KeepsDesignDraftClosed: true,
        sourceNodeV330KeepsRuntimeAndSideEffectsClosed: true,
        necessityProofComplete: true,
        candidateReviewOnly: true,
        reviewQuestionsAnswered: true,
        archiveVerificationRequiredBeforeDesignDraft: true,
        noUpstreamEchoRequested: true,
        noRuntimeDesignDraftCreated: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview: true,
      },
      summary: {
        sourceNodeV330CheckCount: 21,
        sourceNodeV330PassedCheckCount: 21,
        sourceProductionBlockerCount: 0,
        reviewQuestionCount: 5,
        answeredReviewQuestionCount: 5,
        stopConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.candidateReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.reviewQuestions.map((entry) => entry.answered)).toEqual([true, true, true, true, true]);
  }, 60000);

  it("fails closed when the source v330 hardening review is blocked", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview({
        config: loadTestConfig(),
        evidencePaths: {
          javaV151EvidencePath: path.join(process.cwd(), "fixtures", "missing-java-v151.md"),
          javaV152EvidencePath: path.join(process.cwd(), "fixtures", "missing-java-v152.md"),
          miniKvV143ReceiptPath: path.join(process.cwd(), "fixtures", "missing-mini-kv-v143.json"),
        },
      });

    expect(profile.candidateReviewState).toBe("blocked");
    expect(profile.candidateReviewDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview)
      .toBe(false);
    expect(profile.readyForNodeV332ArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V330_NOT_READY",
      "NODE_V330_DID_NOT_ALLOW_CANDIDATE_REVIEW",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.candidateReviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview)
      .toBe(false);
    expect(profile.readyForNodeV332ArchiveVerification).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V330_NOT_READY",
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-review.v1",
        candidateReviewState: "disabled-runtime-shell-design-draft-candidate-review-ready",
        activeNodeVersion: "Node v331",
        sourceNodeVersion: "Node v330",
        readyForNodeV332ArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        candidateReview: {
          decision: "archive-before-disabled-design-draft-outline",
          requiresArchiveVerificationBeforeDesignDraft: true,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v332",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft candidate review",
      );
      expect(markdown.body).toContain("Ready for Node v332 archive verification: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("Requests Java/mini-kv echo: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-331",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v331-design-draft-candidate-review",
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
