import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver approval-required implementation readiness upstream echo verification", () => {
  it("verifies Node v282 against Java v116 and mini-kv v122 without opening implementation", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification.v1",
      verificationState: "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      approvalRequiredImplementationReadinessEchoVerificationOnly: true,
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
      sourceNodeV281: {
        sourceVersion: "Node v281",
        reviewState: "credential-resolver-approval-required-implementation-readiness-review-ready",
        readyForApprovalRequiredImplementationReadinessReview: true,
        readyForJavaV116MiniKvV122Echo: true,
        boundaryCount: 6,
        requiredArtifactCount: 18,
        checkCount: 21,
        passedCheckCount: 21,
        readyForManagedAuditResolverImplementation: false,
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
      upstreamEchoes: {
        javaV116: {
          sourceVersion: "Java v116",
          boundaryCount: 6,
          requiredArtifactCount: 18,
          proofClaimCount: 11,
          readyForNodeV282Verification: true,
          readyForNodeV282Alignment: true,
          readyForManagedAuditResolverImplementation: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          connectsManagedAudit: false,
          approvalLedgerWritten: false,
          sqlExecuted: false,
          schemaMigrationExecuted: false,
          automaticUpstreamStart: false,
          javaStartedNodeOrMiniKv: false,
        },
        miniKvV122: {
          sourceVersion: "mini-kv v122",
          releaseVersion: "v122",
          consumerHint:
            "Node v282 credential resolver approval-required implementation readiness upstream echo verification",
          boundaryCount: 6,
          requiredArtifactCount: 18,
          readyForNodeV282Alignment: true,
          readOnly: true,
          executionAllowed: false,
          readyForManagedAuditResolverImplementation: false,
          realResolverImplementationAllowed: false,
        },
      },
      echoVerification: {
        verificationMode:
          "java-v116-plus-mini-kv-v122-approval-required-implementation-readiness-upstream-echo-verification-only",
        sourceSpan: "Node v281 + Java v116 + mini-kv v122",
        sourceNodeV281Ready: true,
        javaV116EchoReady: true,
        miniKvV122NonParticipationReady: true,
        boundaryReadinessAligned: true,
        requiredArtifactsAligned: true,
        readinessCountsAligned: true,
        javaProofClaimsAligned: true,
        miniKvReceiptAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        readyForNodeV283ImplementationPlanDraft: true,
      },
      checks: {
        sourceNodeV281Ready: true,
        sourceNodeV281KeepsRuntimeImplementationBlocked: true,
        javaV116EchoReady: true,
        javaV116DocumentsNodeV281Consumption: true,
        javaV116KeepsRuntimeSideEffectsBlocked: true,
        miniKvV122ReceiptReady: true,
        miniKvV122DocumentsNodeV281Consumption: true,
        miniKvV122KeepsRuntimeSideEffectsBlocked: true,
        boundaryCodesAligned: true,
        requiredArtifactsAligned: true,
        readinessCountsAligned: true,
        proofClaimsAligned: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        resolverBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification: true,
      },
      summary: {
        checkCount: 23,
        passedCheckCount: 23,
        boundaryCount: 6,
        requiredArtifactCount: 18,
        sourceCheckCount: 21,
        sourcePassedCheckCount: 21,
        javaProofClaimCount: 11,
        miniKvCheckCount: 21,
        miniKvPassedCheckCount: 21,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.evidenceEndpoints.nextNodeVersion).toBe("Node v283");
    expect(profile.productionBlockers).toHaveLength(0);
    expect(profile.warnings.map((warning) => warning.code)).toEqual([
      "IMPLEMENTATION_STILL_BLOCKED",
      "DASHBOARD_QUALITY_VERSION_PENDING",
    ]);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toEqual([
      "RUN_NODE_V283_PLAN_DRAFT",
      "SCHEDULE_DASHBOARD_QUALITY_VERSION",
    ]);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(true);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(true);
  });

  it("blocks if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification({
        config: loadTestConfig(),
      });

      expect(profile.verificationState)
        .toBe("credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready");
      expect(profile.upstreamEchoes.javaV116.evidenceFiles.every((file) => file.exists)).toBe(true);
      expect(profile.upstreamEchoes.miniKvV122.evidenceFiles.every((file) => file.exists)).toBe(true);
      expect(profile.upstreamEchoes.javaV116.evidenceFiles[3]?.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/v116-snapshot/ImplementationReadinessEchoReceiptBuilder.java",
      );
      expect(profile.upstreamEchoes.miniKvV122.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-approval-required-implementation-readiness-non-participation-receipt.json",
      );
      expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
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
          "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification.v1",
        verificationState: "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready",
        readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification: true,
        echoVerification: {
          sourceSpan: "Node v281 + Java v116 + mini-kv v122",
          readyForNodeV283ImplementationPlanDraft: true,
        },
        evidenceEndpoints: {
          nextNodeVersion: "Node v283",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver approval-required implementation readiness upstream echo verification",
      );
      expect(markdown.body).toContain("credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Node v283");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-282",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v282-upstream-echo-verification",
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
