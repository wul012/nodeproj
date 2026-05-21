import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver implementation plan upstream echo verification", () => {
  it("verifies Java v121 and mini-kv v126 echoes without opening resolver runtime", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification.v1",
      verificationState: "credential-resolver-implementation-plan-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      implementationPlanUpstreamEchoVerificationOnly: true,
      consumesNodeV283ImplementationPlanDraft: true,
      consumesJavaV121ImplementationPlanEcho: true,
      consumesMiniKvV126ImplementationPlanNonParticipationReceipt: true,
      originalExpectedNodeVerificationVersion: "Node v284",
      executedAsNodeVersion: "Node v286",
      readyForTestOnlyFakeHarnessPrecheck: false,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      testOnlyFakeHarnessAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV283: {
        sourceVersion: "Node v283",
        planState: "credential-resolver-implementation-plan-draft-ready",
        readyForImplementationPlanDraft: true,
        readyForJavaV121MiniKvV126Echo: true,
        interfaceBoundaryCount: 7,
        requiredArtifactCount: 21,
        prohibitedActionCount: 21,
        javaEchoRequirementCount: 4,
        miniKvReceiptRequirementCount: 4,
        realResolverImplementationAllowed: false,
        testOnlyFakeHarnessAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
      },
      upstreamEchoes: {
        javaV121: {
          sourceVersion: "Java v121",
          evidencePresent: true,
          verificationDocumented: true,
          planEchoMode: "java-v121-credential-resolver-implementation-plan-echo-only",
          sourceSpan: "Node v283",
          originalExpectedNodeVerificationVersion: "Node v284",
          readyForOriginalNodeV284Verification: true,
          javaPlanDigestRequirementNamed: true,
          concretePlanDigestValueEchoed: false,
          proofClaimCount: 11,
          nodeVerificationActionCount: 11,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          approvalLedgerWritten: false,
          schemaMigrationExecuted: false,
          automaticUpstreamStart: false,
        },
        miniKvV126: {
          sourceVersion: "mini-kv v126",
          evidencePresent: true,
          verificationDocumented: true,
          receiptVersion: "mini-kv-credential-resolver-implementation-plan-non-participation-receipt.v1",
          releaseVersion: "v126",
          consumerHint: "Node v284 credential resolver implementation plan upstream echo verification",
          sourcePlanState: "credential-resolver-implementation-plan-draft-ready",
          readOnly: true,
          executionAllowed: false,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          credentialValueReadAllowed: false,
          credentialValueRead: false,
          credentialValueLoaded: false,
          credentialValueStored: false,
          credentialValueIncluded: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlRendered: false,
          rawEndpointUrlIncluded: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          storageWriteAllowed: false,
          approvalLedgerWritten: false,
          schemaMigrationExecuted: false,
          automaticUpstreamStart: false,
          managedAuditStorageBackend: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
        },
      },
      echoVerification: {
        verificationMode: "java-v121-plus-mini-kv-v126-implementation-plan-upstream-echo-verification-only",
        sourceSpan: "Node v283 + Java v121 + mini-kv v126",
        sourceNodeV283Ready: true,
        javaV121EchoReady: true,
        miniKvV126NonParticipationReady: true,
        planDigestAligned: true,
        reviewDigestAligned: true,
        interfaceBoundariesAligned: true,
        requiredArtifactsAligned: true,
        prohibitedActionsAligned: true,
        javaRequirementIdsAligned: true,
        miniKvRequirementIdsAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        originalExpectedNodeV284SatisfiedByNodeV286: true,
        readyForNodeV287TestOnlyFakeHarnessPrecheck: true,
      },
      checks: {
        sourceNodeV283Ready: true,
        sourceNodeV283KeepsImplementationBlocked: true,
        javaV121EchoReady: true,
        javaV121DocumentsNodeV283Consumption: true,
        javaV121KeepsRuntimeSideEffectsBlocked: true,
        miniKvV126ReceiptReady: true,
        miniKvV126DocumentsNodeV283Consumption: true,
        miniKvV126KeepsRuntimeSideEffectsBlocked: true,
        planDigestAlignedWithMiniKv: true,
        reviewDigestAlignedWithMiniKv: true,
        boundaryCodesAligned: true,
        requiredArtifactsAligned: true,
        prohibitedActionsAligned: true,
        javaRequirementIdsAligned: true,
        miniKvRequirementIdsAligned: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        resolverBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        sideEffectBoundaryClosed: true,
        nodeVersionOffsetDocumented: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification: true,
      },
      summary: {
        checkCount: 28,
        passedCheckCount: 28,
        evidenceFileCount: 6,
        matchedSnippetCount: 21,
        sourceCheckCount: 28,
        sourcePassedCheckCount: 28,
        interfaceBoundaryCount: 7,
        requiredArtifactCount: 21,
        prohibitedActionCount: 21,
        javaEchoRequirementCount: 4,
        miniKvReceiptRequirementCount: 4,
        javaProofClaimCount: 11,
        javaNodeVerificationActionCount: 11,
        miniKvCheckCount: 28,
        miniKvPassedCheckCount: 28,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV283.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV283.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV126.planDigest).toBe(profile.sourceNodeV283.planDigest);
    expect(profile.upstreamEchoes.miniKvV126.reviewDigest).toBe(profile.sourceNodeV283.reviewDigest);
    expect(profile.upstreamEchoes.javaV121.javaRequirementIds).toEqual([
      "java-v121-consumes-node-v283-plan",
      "java-v121-approval-artifact-boundary",
      "java-v121-schema-migration-boundary",
      "java-v121-failure-taxonomy-echo",
    ]);
    expect(profile.upstreamEchoes.miniKvV126.miniKvRequirementIds).toEqual([
      "mini-kv-v126-consumes-node-v283-plan",
      "mini-kv-v126-no-storage-backend",
      "mini-kv-v126-no-secret-or-endpoint",
      "mini-kv-v126-no-write-command",
    ]);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("blocks the verification if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("keeps historical fixture fallback viable for GitHub runner checks", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification({
        config: loadTestConfig(),
      });

      expect(profile.verificationState).toBe("credential-resolver-implementation-plan-upstream-echo-verification-ready");
      expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
      expect(profile.upstreamEchoes.javaV121.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceiptBuilder.java",
      );
      expect(profile.upstreamEchoes.miniKvV126.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-implementation-plan-non-participation-receipt.json",
      );
      expect(profile.upstreamEchoes.miniKvV126.planDigest).toBe(profile.sourceNodeV283.planDigest);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification.v1",
        verificationState: "credential-resolver-implementation-plan-upstream-echo-verification-ready",
        executedAsNodeVersion: "Node v286",
        echoVerification: {
          readyForNodeV287TestOnlyFakeHarnessPrecheck: true,
        },
        evidenceEndpoints: {
          nextNodeVersion: "Node v287",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver implementation plan upstream echo verification",
      );
      expect(markdown.body).toContain("Java v121");
      expect(markdown.body).toContain("mini-kv v126");
      expect(markdown.body).toContain("Node v286");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-286",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v286-implementation-plan-upstream-echo-verification",
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
    ...overrides,
  });
}
