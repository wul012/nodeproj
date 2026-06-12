import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("turns the v294 pre-plan intake into a design review without authorizing runtime", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review.v1",
      designReviewState: "disabled-runtime-shell-design-review-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview: true,
      disabledRuntimeShellDesignReviewOnly: true,
      readOnlyDesignReview: true,
      consumesNodeV294DisabledRuntimeShellPrePlanIntake: true,
      recommendsParallelUpstreamEchoBeforeRuntimeImplementation: true,
      readyForParallelUpstreamEchoRequest: true,
      readyForNodeV296RuntimeShellImplementation: false,
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
      runtimeShellImplemented: false,
      runtimeShellEnabled: false,
      runtimeShellInvocationAllowed: false,
      testOnlyFakeHarnessAllowed: false,
      testOnlyFakeHarnessExecutionAllowed: false,
      realResolverImplementationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV294: {
        sourceVersion: "Node v294",
        prePlanIntakeState: "disabled-runtime-shell-pre-plan-intake-ready",
        readyForDisabledRuntimeShellPrePlanIntake: true,
        readyForDisabledRuntimeShellDesignReview: true,
        boundaryCount: 10,
        definedBoundaryCount: 10,
        allRequiredBoundariesDefined: true,
        missingBoundaryCount: 0,
        nextNodeReviewVersion: "Node v295",
        nextJavaEchoVersion: "Java v132",
        nextMiniKvReceiptVersion: "mini-kv v130",
        runtimeShellImplementationAllowed: false,
        runtimeShellInvocationAllowed: false,
        fakeHarnessRuntimeAllowed: false,
        credentialValueReadAllowed: false,
        rawEndpointUrlParseAllowed: false,
        providerClientInstantiationAllowed: false,
        externalRequestAllowed: false,
        schemaMigrationAllowed: false,
        approvalLedgerWriteAllowed: false,
        automaticUpstreamStartAllowed: false,
        runtimeShellImplemented: false,
        runtimeShellEnabled: false,
        testOnlyFakeHarnessAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      designReview: {
        reviewVersion: "node-v295-disabled-runtime-shell-design-review.v1",
        reviewMode: "design-review-only",
        sourceSpan: "Node v294",
        decision: "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation",
        runtimeShellImplementationAllowed: false,
        runtimeShellInvocationAllowed: false,
        credentialValueReadAllowed: false,
        rawEndpointUrlParseAllowed: false,
        providerClientInstantiationAllowed: false,
        externalRequestAllowed: false,
        schemaMigrationAllowed: false,
        approvalLedgerWriteAllowed: false,
        automaticUpstreamStartAllowed: false,
      },
      checks: {
        sourceNodeV294Ready: true,
        sourceNodeV294DesignReviewReady: true,
        sourceBoundariesComplete: true,
        sourceRuntimeImplementationStillForbidden: true,
        sourceRuntimeInvocationStillForbidden: true,
        sourceCredentialBoundaryClosed: true,
        sourceEndpointBoundaryClosed: true,
        sourceProviderClientBoundaryClosed: true,
        sourceNetworkBoundaryClosed: true,
        sourceWriteBoundaryClosed: true,
        sourceAutoStartBoundaryClosed: true,
        designReviewOnly: true,
        necessityDocumented: true,
        allReviewQuestionsAnswered: true,
        parallelUpstreamEchoRecommended: true,
        noRuntimeImplementationCreated: true,
        noRuntimeInvocationAllowed: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noProviderClientInstantiated: true,
        noExternalRequestSent: true,
        noWritesOrMigrations: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
      },
      summary: {
        sourceBoundaryCount: 10,
        reviewQuestionCount: 11,
        yesReviewQuestionCount: 11,
        recommendedParallelWorkCount: 2,
        stopConditionCount: 3,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV294.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV294.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.designReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.designReview.recommendedParallelWork.map((work) => work.version)).toEqual([
      "Java v132",
      "mini-kv v130",
    ]);
  });

  it("uses committed historical fixture fallback through the v294 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview({
      config: loadTestConfig(),
    });

    expect(profile.designReviewState).toBe("disabled-runtime-shell-design-review-ready");
    expect(profile.sourceNodeV294.readyForDisabledRuntimeShellPrePlanIntake).toBe(true);
    expect(profile.sourceNodeV294.sourceProductionBlockerCount).toBe(0);
    expect(profile.readyForParallelUpstreamEchoRequest).toBe(true);
    expect(profile.readyForNodeV296RuntimeShellImplementation).toBe(false);
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.fakeResolverClientInstantiated).toBe(false);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.designReviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview)
      .toBe(false);
    expect(profile.readyForParallelUpstreamEchoRequest).toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review.v1",
        designReviewState: "disabled-runtime-shell-design-review-ready",
        recommendsParallelUpstreamEchoBeforeRuntimeImplementation: true,
        readyForNodeV296RuntimeShellImplementation: false,
        runtimeShellImplemented: false,
        sourceNodeV294: {
          readyForDisabledRuntimeShellPrePlanIntake: true,
          allRequiredBoundariesDefined: true,
        },
        designReview: {
          decision: "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation",
          runtimeShellImplementationAllowed: false,
          externalRequestAllowed: false,
        },
        checks: {
          designReviewOnly: true,
          parallelUpstreamEchoRecommended: true,
          noRuntimeImplementationCreated: true,
          noExternalRequestSent: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design review",
      );
      expect(markdown.body).toContain("Java v132");
      expect(markdown.body).toContain("mini-kv v130");
      expect(markdown.body).toContain("RECOMMENDED_PARALLEL_JAVA_V132_MINI_KV_V130");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-295",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v295-disabled-runtime-shell-design-review",
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
    PORT: "4370",
    ...overrides,
  });
}
