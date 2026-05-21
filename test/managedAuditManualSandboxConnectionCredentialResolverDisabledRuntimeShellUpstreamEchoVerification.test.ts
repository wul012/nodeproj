import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v295 with Java v133 and mini-kv v130 without opening runtime execution", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification.v1",
      verificationState: "disabled-runtime-shell-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      disabledRuntimeShellUpstreamEchoVerificationOnly: true,
      consumesNodeV295DisabledRuntimeShellDesignReview: true,
      consumesJavaV133DisabledRuntimeShellHandoffEcho: true,
      consumesMiniKvV130DisabledRuntimeShellNonParticipationReceipt: true,
      planVersionCorrectionApplied: true,
      plannedJavaVersion: "Java v132",
      actualJavaEchoVersion: "Java v133",
      readyForNodeV297RuntimeShellImplementationCandidateGate: true,
      readyForNodeV297RuntimeShellImplementation: false,
      readyForDisabledRuntimeShellImplementation: false,
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      resolverClientInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV295: {
        sourceVersion: "Node v295",
        designReviewState: "disabled-runtime-shell-design-review-ready",
        readyForDesignReview: true,
        readyForParallelUpstreamEchoRequest: true,
        readyForNodeV296RuntimeShellImplementation: false,
        decision: "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation",
        reviewQuestionCount: 11,
        yesReviewQuestionCount: 11,
        productionBlockerCount: 0,
        runtimeShellImplemented: false,
        executionAllowed: false,
      },
      upstreamEvidence: {
        javaV133: {
          sourceVersion: "Java v133",
          plannedVersionCorrection: "Java v132 was quality optimization; Java v133 contains the handoff echo",
          evidencePresent: true,
          verificationDocumented: true,
          handoffEchoPresent: true,
          readyForNodeV296: true,
          handoffEchoMode: "java-v133-credential-resolver-disabled-runtime-shell-handoff-echo-only",
          designReviewEchoed: true,
          parallelUpstreamEchoRequestEchoed: true,
          noRuntimeImplementation: true,
          noRuntimeInvocation: true,
          credentialValueBoundaryClosed: true,
          rawEndpointBoundaryClosed: true,
          providerClientBoundaryClosed: true,
          connectionBoundaryClosed: true,
          ledgerSqlSchemaBoundaryClosed: true,
          automaticUpstreamStartBlocked: true,
        },
        miniKvV130: {
          sourceVersion: "mini-kv v130",
          evidencePresent: true,
          verificationDocumented: true,
          releaseVersion: "v130",
          consumerHint: "Node v296 disabled runtime shell upstream echo verification",
          sourceNodeV295Ready: true,
          miniKvNonParticipationRecorded: true,
          readyForNodeV296: true,
          readOnly: true,
          executionAllowed: false,
          runtimeShellImplemented: false,
          runtimeShellInvocationAllowed: false,
          disabledRuntimeShellParticipates: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          providerClientInstantiationAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          productionBlockerCount: 0,
        },
      },
      echoVerification: {
        verificationMode:
          "node-v295-plus-java-v133-plus-mini-kv-v130-disabled-runtime-shell-upstream-echo-verification-only",
        sourceSpan: "Node v295 + Java v133 + mini-kv v130",
        sourceNodeV295Ready: true,
        javaV133HandoffReady: true,
        miniKvV130ReceiptReady: true,
        planVersionCorrectionApplied: true,
        upstreamEchoAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        readyForNodeV297RuntimeShellImplementationCandidateGate: true,
        readyForRuntimeShellImplementation: false,
      },
      checks: {
        sourceNodeV295Ready: true,
        sourceNodeV295KeepsImplementationBlocked: true,
        javaV133EvidencePresent: true,
        javaV133HandoffEchoReady: true,
        miniKvV130EvidencePresent: true,
        miniKvV130NonParticipationReceiptReady: true,
        planVersionCorrectionDocumented: true,
        upstreamEchoConsumerAligned: true,
        nodeJavaMiniKvDecisionAligned: true,
        runtimeShellImplementationStillForbidden: true,
        runtimeShellInvocationStillForbidden: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        providerClientBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        loadCompactRestoreSetnxexStillBlocked: true,
        autoStartBoundaryClosed: true,
        auditAndOrderAuthorityForbidden: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.miniKvV130.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("uses committed historical fixture fallback for Java v133 and mini-kv v130", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("disabled-runtime-shell-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV133.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV130.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(normalizePath(profile.upstreamEvidence.javaV133.evidenceFiles[0]?.resolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoSupport.java",
    );
    expect(normalizePath(profile.upstreamEvidence.miniKvV130.evidenceFiles[0]?.resolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-runtime-shell-non-participation-receipt.json",
    );
    expect(profile.planVersionCorrectionApplied).toBe(true);
    expect(profile.actualJavaEchoVersion).toBe("Java v133");
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification)
      .toBe(false);
    expect(profile.readyForNodeV297RuntimeShellImplementationCandidateGate).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.readyForNodeV297RuntimeShellImplementation).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification.v1",
        verificationState: "disabled-runtime-shell-upstream-echo-verification-ready",
        plannedJavaVersion: "Java v132",
        actualJavaEchoVersion: "Java v133",
        readyForNodeV297RuntimeShellImplementation: false,
        upstreamEvidence: {
          javaV133: {
            readyForNodeV296: true,
          },
          miniKvV130: {
            readyForNodeV296: true,
            releaseVersion: "v130",
          },
        },
        checks: {
          planVersionCorrectionDocumented: true,
          nodeJavaMiniKvDecisionAligned: true,
          runtimeShellImplementationStillForbidden: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell upstream echo verification",
      );
      expect(markdown.body).toContain("Actual Java echo version: Java v133");
      expect(markdown.body).toContain("PLAN_VERSION_CORRECTION_APPLIED");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-296",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v296-disabled-runtime-shell-upstream-echo",
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
    PORT: "4371",
    ...overrides,
  });
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}
