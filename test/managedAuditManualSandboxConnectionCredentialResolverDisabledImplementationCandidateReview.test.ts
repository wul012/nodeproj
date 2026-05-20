import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review";

describe("managed audit manual sandbox connection credential resolver disabled implementation candidate review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("classifies v272 boundaries into disabled candidate and approval-required groups", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1",
      reviewState: "credential-resolver-disabled-implementation-candidate-review-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview: true,
      disabledImplementationCandidateReviewOnly: true,
      readOnlyCandidateReview: true,
      readyForDisabledResolverInterfaceCandidate: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV272: {
        sourceVersion: "Node v272",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification.v1",
        verificationState:
          "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready",
        readyForPlanIntakeUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        planIntakeEchoVerificationOnly: true,
        sourceSpan: "Node v270 + Java v112 + mini-kv v119",
        readyForCredentialResolverPreImplementationPlan: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        realResolverImplementationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
        planVersion: "node-v270-credential-resolver-pre-implementation-plan-intake.v1",
        planMode: "plan-intake-only",
        boundaryCount: 10,
        definedBoundaryCount: 10,
        missingBoundaryCount: 0,
        sourceNodeV270Ready: true,
        javaV112EchoReady: true,
        miniKvV119NonParticipationReady: true,
        planCountsAligned: true,
        boundaryCodesAligned: true,
        requirementCodesAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        checkCount: 22,
        passedCheckCount: 22,
        sourceCheckCount: 26,
        sourcePassedCheckCount: 26,
        productionBlockerCount: 0,
      },
      disabledImplementationCandidate: {
        candidateVersion: "node-v273-credential-resolver-disabled-implementation-candidate-review.v1",
        candidateMode: "disabled-interface-and-fake-wiring-review-only",
        sourceSpan: "Node v272",
        candidateDecisionCount: 10,
        candidateReadyDecisionCount: 4,
        approvalRequiredDecisionCount: 6,
        disabledInterfaceCandidateAllowed: true,
        fakeWiringReviewAllowed: true,
        realResolverImplementationAllowed: false,
        secretProviderRuntimeAllowed: false,
        credentialValueReadAllowed: false,
        rawEndpointUrlParseAllowed: false,
        externalRequestAllowed: false,
        schemaMigrationAllowed: false,
        approvalLedgerWriteAllowed: false,
        automaticUpstreamStartAllowed: false,
        interfaceShape: {
          interfaceVersion: "disabled-credential-resolver-interface-candidate.v1",
          requestFields: [
            "credentialHandle",
            "endpointHandle",
            "resolverPolicyHandle",
            "operatorIdentity",
            "approvalCorrelationId",
            "manualWindowMarker",
          ],
          responseFields: [
            "resolverState",
            "resolvedCredentialValue",
            "rawEndpointUrl",
            "redactionApplied",
            "externalRequestSent",
            "failureClass",
            "auditDigest",
          ],
          failureClasses: [
            "disabled-by-config",
            "missing-credential-handle",
            "missing-endpoint-handle",
            "operator-approval-required",
            "manual-window-required",
            "real-runtime-forbidden",
          ],
          handleOnlyRequest: true,
          includesCredentialValue: false,
          includesRawEndpointUrl: false,
          sendsExternalRequest: false,
          instantiatesSecretProvider: false,
          instantiatesResolverClient: false,
        },
        fakeWiringReview: {
          fakeWiringReviewOnly: true,
          fakeRuntimeInstantiated: false,
          realSecretProviderAllowed: false,
          realManagedAuditTransportAllowed: false,
          externalRequestAllowed: false,
          cleanupArtifactCount: 0,
        },
      },
      checks: {
        sourceNodeV272Ready: true,
        sourceNodeV272KeepsReadOnlyEchoOnly: true,
        sourceNodeV272KeepsRealResolverBlocked: true,
        sourceNodeV272KeepsBoundaryAlignment: true,
        allCandidateDecisionsCovered: true,
        candidateReadyBoundariesLimited: true,
        approvalRequiredBoundariesPreserved: true,
        interfaceShapeHandleOnly: true,
        fakeWiringReviewOnly: true,
        credentialValueStillForbidden: true,
        rawEndpointStillForbidden: true,
        secretProviderRuntimeStillDisabled: true,
        resolverClientStillDisabled: true,
        externalRequestStillBlocked: true,
        schemaMigrationStillBlocked: true,
        ledgerWriteStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview: true,
      },
      summary: {
        sourceCheckCount: 22,
        sourcePassedCheckCount: 22,
        candidateDecisionCount: 10,
        candidateReadyDecisionCount: 4,
        approvalRequiredDecisionCount: 6,
        requestFieldCount: 6,
        responseFieldCount: 7,
        failureClassCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV272.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV272.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV272.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.disabledImplementationCandidate.candidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.disabledImplementationCandidate.decisions
      .filter((decision) => decision.disposition === "disabled-candidate-ready")
      .map((decision) => decision.code)).toEqual([
      "PLAN_DOCUMENT",
      "DISABLED_SECRET_PROVIDER_STUB",
      "REDACTION_POLICY",
      "EXTERNAL_REQUEST_SIMULATION",
    ]);
    expect(profile.disabledImplementationCandidate.decisions
      .filter((decision) => decision.disposition === "approval-required")
      .map((decision) => decision.code)).toEqual([
      "CREDENTIAL_HANDLE",
      "ENDPOINT_HANDLE",
      "OPERATOR_APPROVAL",
      "ROLLBACK_BOUNDARY",
      "SCHEMA_MIGRATION_POLICY",
      "AUDIT_LEDGER_WRITE_POLICY",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("uses committed historical fixture fallback through the v272 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({
      config: loadTestConfig(),
    });

    expect(profile.reviewState).toBe("credential-resolver-disabled-implementation-candidate-review-ready");
    expect(profile.sourceNodeV272.javaV112EchoReady).toBe(true);
    expect(profile.sourceNodeV272.miniKvV119NonParticipationReady).toBe(true);
    expect(profile.checks.sourceNodeV272KeepsBoundaryAlignment).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.realResolverImplementationAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1",
        reviewState: "credential-resolver-disabled-implementation-candidate-review-ready",
        readyForDisabledResolverInterfaceCandidate: true,
        sourceNodeV272: {
          verificationState:
            "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready",
          boundaryCount: 10,
          missingBoundaryCount: 0,
        },
        disabledImplementationCandidate: {
          candidateDecisionCount: 10,
          candidateReadyDecisionCount: 4,
          approvalRequiredDecisionCount: 6,
          interfaceShape: {
            handleOnlyRequest: true,
            includesCredentialValue: false,
            includesRawEndpointUrl: false,
          },
        },
        checks: {
          allCandidateDecisionsCovered: true,
          candidateReadyBoundariesLimited: true,
          approvalRequiredBoundariesPreserved: true,
          fakeWiringReviewOnly: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled implementation candidate review",
      );
      expect(markdown.body).toContain("credential-resolver-disabled-implementation-candidate-review-ready");
      expect(markdown.body).toContain("RUN_PARALLEL_JAVA_V113_MINI_KV_V120");
      expect(markdown.body).toContain("VERIFY_WITH_NODE_V274_AFTER_UPSTREAM_ECHO");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-273",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v273-disabled-implementation-candidate-review",
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
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4373",
    ...overrides,
  });
}
