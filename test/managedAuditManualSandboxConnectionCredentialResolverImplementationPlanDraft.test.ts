import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver implementation plan draft", () => {
  it("drafts Node v283 implementation boundaries without opening resolver runtime", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft.v1",
      planState: "credential-resolver-implementation-plan-draft-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft: true,
      planDraftOnly: true,
      readOnlyPlanDraft: true,
      implementationPlanDraftOnly: true,
      consumesNodeV282ApprovalRequiredImplementationReadinessEchoVerification: true,
      readyForJavaV121MiniKvV126Echo: true,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      testOnlyFakeHarnessAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV282: {
        sourceVersion: "Node v282",
        verificationState: "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready",
        readyForApprovalRequiredImplementationReadinessUpstreamEchoVerification: true,
        readyForNodeV283ImplementationPlanDraft: true,
        sourceSpan: "Node v281 + Java v116 + mini-kv v122",
        sourceNodeV281Ready: true,
        javaV116EchoReady: true,
        miniKvV122NonParticipationReady: true,
        boundaryReadinessAligned: true,
        requiredArtifactsAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        checkCount: 23,
        passedCheckCount: 23,
        boundaryCount: 6,
        requiredArtifactCount: 18,
        realResolverImplementationAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        approvalLedgerWritten: false,
      },
      implementationPlan: {
        planVersion: "node-v283-credential-resolver-implementation-plan-draft.v1",
        planMode: "implementation-plan-draft-only",
        sourceSpan: "Node v282",
        interfaceBoundaryCount: 7,
        allInterfaceBoundariesDefined: true,
        allRequiredArtifactsNamed: true,
        realResolverImplementationAllowed: false,
        testOnlyFakeHarnessAllowed: false,
        secretProviderRuntimeAllowed: false,
        credentialValueReadAllowed: false,
        rawEndpointUrlParseAllowed: false,
        rawEndpointUrlRenderAllowed: false,
        externalRequestAllowed: false,
        schemaMigrationAllowed: false,
        approvalLedgerWriteAllowed: false,
        automaticUpstreamStartAllowed: false,
      },
      implementationPlanReview: {
        reviewMode: "node-v283-implementation-plan-draft-only",
        consumedNodeVersion: "Node v282",
        nextJavaEchoVersion: "Java v121",
        nextMiniKvReceiptVersion: "mini-kv v126",
        nextNodeVerificationVersion: "Node v284",
        fakeHarnessDeferredUntil: "Node v285",
        interfaceBoundaryCount: 7,
        javaEchoRequirementCount: 4,
        miniKvReceiptRequirementCount: 4,
        sourceNodeV282Ready: true,
        implementationStillBlocked: true,
        readyForJavaV121MiniKvV126Echo: true,
      },
      checks: {
        sourceNodeV282Ready: true,
        sourceNodeV282AllowsPlanDraft: true,
        sourceNodeV282KeepsImplementationBlocked: true,
        configHandleContractDefined: true,
        credentialHandleContractDefined: true,
        endpointHandleContractDefined: true,
        approvalArtifactContractDefined: true,
        failureTaxonomyContractDefined: true,
        rollbackGuardContractDefined: true,
        testOnlyFakeHarnessContractDefined: true,
        allInterfaceBoundariesDefined: true,
        allRequiredArtifactsNamed: true,
        javaV121EchoRequirementsDefined: true,
        miniKvV126ReceiptRequirementsDefined: true,
        realResolverImplementationStillBlocked: true,
        testOnlyFakeHarnessStillDeferred: true,
        credentialValueStillForbidden: true,
        rawEndpointStillForbidden: true,
        externalRequestStillForbidden: true,
        secretProviderRuntimeStillDisabled: true,
        resolverClientStillDisabled: true,
        schemaMigrationStillReviewOnly: true,
        approvalLedgerWriteStillReviewOnly: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft: true,
      },
      summary: {
        checkCount: 28,
        passedCheckCount: 28,
        sourceCheckCount: 23,
        sourcePassedCheckCount: 23,
        interfaceBoundaryCount: 7,
        javaEchoRequirementCount: 4,
        miniKvReceiptRequirementCount: 4,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.implementationPlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.implementationPlanReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.implementationPlan.interfaceBoundaries.map((boundary) => boundary.code)).toEqual([
      "CONFIG_HANDLE_CONTRACT",
      "CREDENTIAL_HANDLE_CONTRACT",
      "ENDPOINT_HANDLE_CONTRACT",
      "APPROVAL_ARTIFACT_CONTRACT",
      "FAILURE_TAXONOMY_CONTRACT",
      "ROLLBACK_GUARD_CONTRACT",
      "TEST_ONLY_FAKE_HARNESS_CONTRACT",
    ]);
    expect(profile.productionBlockers).toHaveLength(0);
    expect(profile.warnings.map((warning) => warning.code)).toEqual([
      "IMPLEMENTATION_STILL_BLOCKED",
      "UPSTREAM_ECHO_REQUIRED",
    ]);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toEqual([
      "RUN_PARALLEL_JAVA_V121_MINIKV_V126",
      "VERIFY_WITH_NODE_V284_BEFORE_FAKE_HARNESS",
    ]);
  });

  it("blocks the plan draft if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.planState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft).toBe(false);
    expect(profile.readyForJavaV121MiniKvV126Echo).toBe(false);
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
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
        config: loadTestConfig(),
      });

      expect(profile.planState).toBe("credential-resolver-implementation-plan-draft-ready");
      expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
      expect(profile.sourceNodeV282.sourceVersion).toBe("Node v282");
      expect(profile.sourceNodeV282.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
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
        profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft.v1",
        planState: "credential-resolver-implementation-plan-draft-ready",
        readyForJavaV121MiniKvV126Echo: true,
        evidenceEndpoints: {
          nextRecommendedParallelJavaV121: "Java v121 resolver implementation plan echo",
          nextRecommendedParallelMiniKvV126: "mini-kv v126 resolver implementation plan non-participation receipt",
          nextNodeVerificationVersion: "Node v284",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver implementation plan draft",
      );
      expect(markdown.body).toContain("Java v121");
      expect(markdown.body).toContain("mini-kv v126");
      expect(markdown.body).toContain("Node v285");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-283",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v283-implementation-plan-draft",
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
