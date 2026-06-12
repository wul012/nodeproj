import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver runtime shell decision record upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v135 and mini-kv v132 echoes of the Node v299 blocked decision record", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification.v1",
      verificationState: "runtime-shell-decision-record-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      runtimeShellDecisionRecordUpstreamEchoVerificationOnly: true,
      consumesNodeV299RuntimeShellCandidateGateDecisionRecord: true,
      consumesJavaV135RuntimeShellDecisionRecordEcho: true,
      consumesMiniKvV132RuntimeShellDecisionRecordNonParticipationReceipt: true,
      readyForPostRuntimeShellDecisionPlan: true,
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV299: {
        sourceVersion: "Node v299",
        decisionRecordState: "runtime-shell-candidate-gate-decision-record-ready",
        runtimeShellDecision: "blocked",
        readyForDecisionRecord: true,
        readyForParallelJavaV135MiniKvV132EchoRequest: true,
        readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: false,
        upstreamEchoVerified: true,
        requiredEvidenceCount: 4,
        missingRequiredEvidenceCount: 0,
        noGoConditionCount: 6,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV135: {
          sourceVersion: "Java v135",
          receiptVersion:
            "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-decision-record-echo-receipt.v1",
          echoMode: "java-v135-credential-resolver-runtime-shell-decision-record-echo-only",
          sourceSpan: "Node v299",
          nextNodeVersion: "Node v300",
          evidencePresent: true,
          verificationDocumented: true,
          readyForNodeV300: true,
          echoesNodeV299DecisionRecord: true,
          blockedDecisionEchoed: true,
          requiredEvidenceEchoed: true,
          noGoConditionsEchoed: true,
          noRuntimeImplementationEchoed: true,
          noRuntimeInvocationEchoed: true,
          noCredentialReadEchoed: true,
          noRawEndpointParseEchoed: true,
          noExternalRequestEchoed: true,
          noLedgerOrSchemaWriteEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV132: {
          sourceVersion: "mini-kv v132",
          receiptVersion: "mini-kv-credential-resolver-runtime-shell-decision-record-non-participation-receipt.v1",
          releaseVersion: "v132",
          consumerHint: "Node v300 runtime shell decision record upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          readyForNodeV300: true,
          echoesNodeV299DecisionRecord: true,
          blockedDecisionEchoed: true,
          runtimeShellDecisionRecordOnly: true,
          runtimeShellImplemented: false,
          runtimeShellInvocationAllowed: false,
          executionAllowed: false,
          connectsManagedAudit: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          schemaMigrationExecuted: false,
          approvalLedgerWritten: false,
          automaticUpstreamStart: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          sideEffectBoundariesClosed: true,
        },
      },
      echoVerification: {
        verificationMode: "runtime-shell-decision-record-upstream-echo-verification-only",
        sourceSpan: "Node v299 + Java v135 + mini-kv v132",
        sourceNodeV299Ready: true,
        javaV135EchoReady: true,
        miniKvV132ReceiptReady: true,
        upstreamEchoAligned: true,
        blockedDecisionAligned: true,
        requiredEvidenceAligned: true,
        noGoConditionsAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV299Loaded: true,
        sourceNodeV299Ready: true,
        sourceNodeV299DecisionBlocked: true,
        sourceNodeV299KeepsRuntimeBlocked: true,
        sourceNodeV299KeepsSideEffectsClosed: true,
        javaV135EvidencePresent: true,
        javaV135ReadyForNodeV300: true,
        javaV135EchoesNodeV299: true,
        javaV135KeepsRuntimeBlocked: true,
        miniKvV132EvidencePresent: true,
        miniKvV132ReadyForNodeV300: true,
        miniKvV132EchoesNodeV299: true,
        miniKvV132KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification: true,
      },
      summary: {
        requiredEvidenceCount: 4,
        missingRequiredEvidenceCount: 0,
        noGoConditionCount: 6,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV299.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV135.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV132.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v135 and mini-kv v132", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("runtime-shell-decision-record-upstream-echo-verification-ready");
    expect(normalizePath(profile.upstreamEvidence.javaV135.evidenceFiles[0]?.resolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoSupport.java",
    );
    expect(normalizePath(profile.upstreamEvidence.miniKvV132.evidenceFiles[0]?.resolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-runtime-shell-decision-record-non-participation-receipt.json",
    );
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification.v1",
        verificationState: "runtime-shell-decision-record-upstream-echo-verification-ready",
        readyForPostRuntimeShellDecisionPlan: true,
        upstreamEvidence: {
          javaV135: {
            readyForNodeV300: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV132: {
            readyForNodeV300: true,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell decision record upstream echo verification",
      );
      expect(markdown.body).toContain("runtime-shell-decision-record-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v135 Echo");
      expect(markdown.body).toContain("mini-kv v132 Receipt");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-300",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v300-runtime-shell-decision-record-upstream-echo",
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
    ...overrides,
  });
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}
