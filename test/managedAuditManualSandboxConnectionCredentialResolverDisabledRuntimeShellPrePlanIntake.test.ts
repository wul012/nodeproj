import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell pre-plan intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("turns the v293 blocked echo into a disabled runtime shell pre-plan without implementing runtime", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake.v1",
      prePlanIntakeState: "disabled-runtime-shell-pre-plan-intake-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake: true,
      disabledRuntimeShellPrePlanIntakeOnly: true,
      readOnlyPrePlanIntake: true,
      consumesNodeV293BlockedDecisionUpstreamEchoVerification: true,
      readyForDisabledRuntimeShellDesignReview: true,
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
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV293: {
        sourceVersion: "Node v293",
        verificationState:
          "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready",
        readyForBlockedDecisionUpstreamEchoVerification: true,
        sourceSpan: "Node v292 + Java v131 + mini-kv v129",
        sourceNodeV292Ready: true,
        javaV131EchoReady: true,
        miniKvV129RetentionReady: true,
        blockedDecisionAligned: true,
        missingJavaEchoResolved: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        readyForDisabledRuntimeShellPlanning: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      disabledRuntimeShellPrePlan: {
        planVersion: "node-v294-disabled-runtime-shell-pre-plan-intake.v1",
        planMode: "pre-plan-intake-only",
        sourceSpan: "Node v293",
        shellName: "disabled-fake-harness-runtime-shell",
        boundaryCount: 10,
        definedBoundaryCount: 10,
        allRequiredBoundariesDefined: true,
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
      },
      prePlanIntake: {
        intakeMode: "node-v294-disabled-runtime-shell-pre-plan-intake-only",
        consumedNodeVersion: "Node v293",
        requiredBoundaryCount: 10,
        definedBoundaryCount: 10,
        missingBoundaryCount: 0,
        sourceEchoGateDefined: true,
        shellNameAndScopeDefined: true,
        featureFlagPolicyDefined: true,
        credentialHandleOnlyDefined: true,
        endpointHandleOnlyDefined: true,
        providerClientBoundaryDefined: true,
        networkBoundaryDefined: true,
        writeBoundaryDefined: true,
        operatorApprovalBoundaryDefined: true,
        testStrategyAndAbortDefined: true,
        nextNodeReviewVersion: "Node v295",
        nextJavaEchoVersion: "Java v132",
        nextMiniKvReceiptVersion: "mini-kv v130",
      },
      checks: {
        sourceNodeV293Ready: true,
        sourceNodeV293KeepsRuntimeShellBlocked: true,
        sourceNodeV293KeepsExecutionBlocked: true,
        sourceNodeV293KeepsCredentialBoundaryClosed: true,
        sourceNodeV293KeepsEndpointBoundaryClosed: true,
        sourceNodeV293KeepsConnectionBoundaryClosed: true,
        sourceNodeV293KeepsWriteBoundaryClosed: true,
        sourceNodeV293KeepsAutoStartBoundaryClosed: true,
        allTenBoundariesDefined: true,
        runtimeShellImplementationStillForbidden: true,
        runtimeShellInvocationStillForbidden: true,
        providerClientInstantiationStillForbidden: true,
        externalRequestStillForbidden: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
      },
      summary: {
        boundaryCount: 10,
        definedBoundaryCount: 10,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV293.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.disabledRuntimeShellPrePlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.prePlanIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.prohibitedActionCount).toBeGreaterThanOrEqual(20);
  });

  it("uses committed historical fixture fallback through the source v293 evidence chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake({
      config: loadTestConfig(),
    });

    expect(profile.prePlanIntakeState).toBe("disabled-runtime-shell-pre-plan-intake-ready");
    expect(profile.sourceNodeV293.readyForBlockedDecisionUpstreamEchoVerification).toBe(true);
    expect(profile.sourceNodeV293.evidenceFileCount).toBe(5);
    expect(profile.disabledRuntimeShellPrePlan.allRequiredBoundariesDefined).toBe(true);
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.fakeResolverClientInstantiated).toBe(false);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.prePlanIntakeState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake)
      .toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake.v1",
        prePlanIntakeState: "disabled-runtime-shell-pre-plan-intake-ready",
        readyForDisabledRuntimeShellDesignReview: true,
        readyForDisabledRuntimeShellImplementation: false,
        runtimeShellImplemented: false,
        sourceNodeV293: {
          readyForBlockedDecisionUpstreamEchoVerification: true,
          readyForDisabledRuntimeShellPlanning: false,
        },
        disabledRuntimeShellPrePlan: {
          shellName: "disabled-fake-harness-runtime-shell",
          allRequiredBoundariesDefined: true,
          runtimeShellImplementationAllowed: false,
        },
        checks: {
          allTenBoundariesDefined: true,
          runtimeShellImplementationStillForbidden: true,
          externalRequestStillForbidden: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell pre-plan intake",
      );
      expect(markdown.body).toContain("disabled-runtime-shell-pre-plan-intake-ready");
      expect(markdown.body).toContain("RUN_V295_DESIGN_REVIEW");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-294",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v294-disabled-runtime-shell-pre-plan-intake",
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
    PORT: "4369",
    ...overrides,
  });
}
