import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver runtime shell chain stop/prerequisite upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v141 and mini-kv v134 echoes after the Node v304 stop/prerequisite decision", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1",
      verificationState: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      runtimeShellChainStopPrerequisiteUpstreamEchoVerificationOnly: true,
      consumesNodeV304StopPrerequisiteDecisionRecord: true,
      consumesJavaV141StopPrerequisiteDecisionEcho: true,
      consumesMiniKvV134StopPrerequisiteNonParticipationReceipt: true,
      activeNodeVerificationVersion: "Node v305",
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      runtimeShellImplemented: false,
      runtimeShellEnabled: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV304: {
        sourceVersion: "Node v304",
        decisionRecordState: "runtime-shell-chain-stop-or-prerequisite-decision-record-ready",
        readyForDecisionRecord: true,
        readOnlyDecisionRecord: true,
        runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
        sourceSpan: "Node v303 + Java v136 + mini-kv v133",
        selectedPath: "continue-only-as-blocked-prerequisite-review",
        stopRuntimeShellChainWithoutPrerequisites: true,
        allowsParallelJavaV141MiniKvV134EchoRequest: true,
        readyForNodeV305BeforeUpstreamEcho: false,
        prerequisiteCount: 6,
        missingRuntimePrerequisiteCount: 6,
        noGoConditionCount: 8,
        necessityProofComplete: true,
        productionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV141: {
          sourceVersion: "Java v141",
          echoMode: "java-v141-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-only",
          sourceSpan: "Node v304",
          nextNodeVersion: "Node v305",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV304Decision: true,
          readyForNodeV305: true,
          prerequisiteCountEchoed: true,
          noGoConditionCountEchoed: true,
          necessityProofEchoed: true,
          runtimeImplementationRejectedEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV134: {
          sourceVersion: "mini-kv v134",
          receiptVersion: "mini-kv-credential-resolver-runtime-shell-chain-stop-or-prerequisite-non-participation-receipt.v1",
          releaseVersion: "v134",
          consumerHint: "Node v305 runtime shell chain stop/prerequisite upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV304Decision: true,
          readyForNodeV305: true,
          runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
          selectedPath: "continue-only-as-blocked-prerequisite-review",
          prerequisiteCount: 6,
          missingRuntimePrerequisiteCount: 6,
          noGoConditionCount: 8,
          nonParticipationReceiptOnly: true,
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
          auditAuthoritative: false,
          orderAuthoritative: false,
          sideEffectBoundariesClosed: true,
        },
      },
      echoVerification: {
        verificationMode: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-only",
        sourceSpan: "Node v304 + Java v141 + mini-kv v134",
        sourceNodeV304Ready: true,
        javaV141EchoReady: true,
        miniKvV134ReceiptReady: true,
        upstreamEchoAligned: true,
        prerequisiteGateStillBlocked: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV304Ready: true,
        sourceNodeV304RequestsParallelEcho: true,
        sourceNodeV304KeepsRuntimeBlocked: true,
        sourceNodeV304KeepsSideEffectsClosed: true,
        javaV141EvidencePresent: true,
        javaV141EchoesNodeV304: true,
        javaV141ReadyForNodeV305: true,
        javaV141KeepsRuntimeBlocked: true,
        miniKvV134EvidencePresent: true,
        miniKvV134EchoesNodeV304: true,
        miniKvV134ReadyForNodeV305: true,
        miniKvV134KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        prerequisiteGateStillBlocked: true,
        sideEffectBoundariesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification: true,
      },
      summary: {
        prerequisiteCount: 6,
        missingRuntimePrerequisiteCount: 6,
        noGoConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV304.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV141.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV134.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  });

  it("uses committed historical fixture fallback for Java v141 and mini-kv v134", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV141.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV134.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.upstreamEchoesAligned).toBe(true);
    expect(profile.checks.prerequisiteGateStillBlocked).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.readyForDisabledRuntimeShellImplementation).toBe(false);
    expect(profile.runtimeShellImplemented).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1",
        verificationState: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v305",
        upstreamEvidence: {
          javaV141: {
            readyForNodeV305: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV134: {
            readyForNodeV305: true,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          prerequisiteGateStillBlocked: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell chain stop/prerequisite upstream echo verification",
      );
      expect(markdown.body).toContain("runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v141 Echo");
      expect(markdown.body).toContain("mini-kv v134 Receipt");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-305",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v305-runtime-shell-stop-prerequisite-upstream-echo",
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

function normalizePath(value: string) {
  return value.replace(/\\/g, "/");
}
