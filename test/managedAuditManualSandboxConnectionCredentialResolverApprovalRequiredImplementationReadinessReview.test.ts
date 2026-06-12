import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review";

const APPROVAL_REQUIRED_BOUNDARIES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
];

describe("managed audit manual sandbox connection credential resolver approval-required implementation readiness review", () => {
  it("reviews Node v275 approval-required boundaries for Java v116 and mini-kv v122 without implementation", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review.v1",
      reviewState: "credential-resolver-approval-required-implementation-readiness-review-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview: true,
      implementationReadinessReviewOnly: true,
      readOnlyImplementationReadinessReview: true,
      readyForJavaV116MiniKvV122Echo: true,
      readyForManagedAuditResolverImplementation: false,
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
      sourceNodeV275: {
        sourceVersion: "Node v275",
        verificationState: "credential-resolver-approval-required-boundary-upstream-echo-verification-ready",
        readyForApprovalRequiredBoundaryUpstreamEchoVerification: true,
        sourceSpan: "Node v274 + Java v115 + mini-kv v121",
        sourceCheckCount: 26,
        sourcePassedCheckCount: 26,
        approvalRequiredBoundaryCount: 6,
        approvalRequiredBoundaryCodes: APPROVAL_REQUIRED_BOUNDARIES,
        approvalRequiredBoundaryScopeAligned: true,
        approvalRequiredExplanationsAligned: true,
        prohibitedRuntimeActionsAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
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
      },
      readinessReview: {
        reviewMode: "node-v281-approval-required-implementation-readiness-review-only",
        sourceSpan: "Node v275",
        readinessStage: "pre-implementation-echo-ready",
        implementationStage: "blocked-until-java-v116-mini-kv-v122-and-node-v282",
        allApprovalRequiredBoundariesEchoReady: true,
        allApprovalRequiredBoundariesImplementationBlocked: true,
        allRequiredArtifactsNamed: true,
        javaV116EchoRecommended: true,
        miniKvV122ReceiptRecommended: true,
        nodeV282VerificationRequired: true,
        routeSplitQualityLineClosed: true,
      },
      checks: {
        sourceNodeV275Ready: true,
        sourceBoundaryCountExpected: true,
        sourceBoundaryCodesAligned: true,
        sourceKeepsReadOnlyEchoOnly: true,
        sourceKeepsRealResolverBlocked: true,
        sourceKeepsCredentialBoundaryClosed: true,
        sourceKeepsRawEndpointBoundaryClosed: true,
        sourceKeepsConnectionBoundaryClosed: true,
        sourceKeepsWriteBoundaryClosed: true,
        sourceKeepsAutoStartBoundaryClosed: true,
        boundaryReadinessCountExpected: true,
        allBoundariesEchoReadyForJavaV116: true,
        allBoundariesEchoReadyForMiniKvV122: true,
        allBoundariesStillBlockedForRuntimeImplementation: true,
        allRequiredArtifactsNamed: true,
        routeSplitQualityLineClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview:
          true,
      },
      summary: {
        checkCount: 21,
        passedCheckCount: 21,
        boundaryCount: 6,
        echoReadyBoundaryCount: 6,
        blockedForImplementationBoundaryCount: 6,
        requiredArtifactCount: 18,
        javaV116EchoHintCount: 6,
        miniKvV122ReceiptHintCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.readinessReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.boundaryReadiness.map((boundary) => boundary.code)).toEqual(APPROVAL_REQUIRED_BOUNDARIES);
    expect(profile.boundaryReadiness.every((boundary) => boundary.readyForJavaV116Echo)).toBe(true);
    expect(profile.boundaryReadiness.every((boundary) => boundary.readyForMiniKvV122Receipt)).toBe(true);
    expect(profile.boundaryReadiness.every((boundary) => !boundary.readyForRuntimeImplementation)).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.readyForManagedAuditResolverImplementation).toBe(false);
    expect(profile.realResolverImplementationAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review.v1",
        reviewState: "credential-resolver-approval-required-implementation-readiness-review-ready",
        readyForJavaV116MiniKvV122Echo: true,
        readyForManagedAuditResolverImplementation: false,
        readinessReview: {
          readinessStage: "pre-implementation-echo-ready",
          implementationStage: "blocked-until-java-v116-mini-kv-v122-and-node-v282",
          routeSplitQualityLineClosed: true,
        },
        summary: {
          boundaryCount: 6,
          requiredArtifactCount: 18,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver approval-required implementation readiness review",
      );
      expect(markdown.body).toContain("credential-resolver-approval-required-implementation-readiness-review-ready");
      expect(markdown.body).toContain("RUN_JAVA_V116_AND_MINI_KV_V122_IN_PARALLEL");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-281",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v281-implementation-readiness-review",
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
    PORT: "4382",
    ...overrides,
  });
}
