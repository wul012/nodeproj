import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record";

describe("managed audit manual sandbox connection credential resolver runtime shell chain stop-or-prerequisite decision record", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("records the v304 runtime shell chain decision as blocked by explicit prerequisites", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record.v1",
      decisionRecordState: "runtime-shell-chain-stop-or-prerequisite-decision-record-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord: true,
      readOnlyDecisionRecord: true,
      runtimeShellChainStopOrPrerequisiteDecisionRecordOnly: true,
      consumesNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: true,
      readyForParallelJavaV141MiniKvV134EchoRequest: true,
      readyForNodeV305StopPrerequisiteUpstreamEchoVerification: false,
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
      sourceNodeV303: {
        sourceVersion: "Node v303",
        verificationState: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready",
        readyForPostDecisionPlanIntakeUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        activeNodeVerificationVersion: "Node v303",
        legacyNodeV302ConsumerMarkerAccepted: true,
        sourceSpan: "Node v301 + Node v302 + Java v136 + mini-kv v133",
        sourceNodeV301Ready: true,
        sourceNodeV302QualityPassReady: true,
        javaV136EchoReady: true,
        miniKvV133ReceiptReady: true,
        upstreamEchoAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        productionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      decisionRecord: {
        recordMode: "runtime-shell-chain-stop-or-prerequisite-decision-record-only",
        decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell",
        sourceSpan: "Node v303 + Java v136 + mini-kv v133",
        decision: "require-explicit-approval-prerequisites-before-runtime-shell",
        selectedPath: "continue-only-as-blocked-prerequisite-review",
        stopRuntimeShellChainWithoutPrerequisites: true,
        allowsParallelJavaV141MiniKvV134EchoRequest: true,
        allowsNodeV305BeforeUpstreamEcho: false,
        allowsDisabledRuntimeShellImplementation: false,
        allowsDisabledRuntimeShellInvocation: false,
        allowsRealResolverImplementation: false,
        allowsSecretProviderInstantiation: false,
        allowsResolverClientInstantiation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsManagedAuditConnection: false,
        allowsSchemaMigration: false,
        allowsApprovalLedgerWrite: false,
        allowsAutomaticUpstreamStart: false,
        prerequisiteCount: 6,
        missingRuntimePrerequisiteCount: 6,
        noGoConditionCount: 8,
        necessityProof: {
          consumer: "Java v141 and mini-kv v134, then Node v305",
          proofComplete: true,
        },
      },
      checks: {
        sourceNodeV303Loaded: true,
        sourceNodeV303Ready: true,
        sourceNodeV303UpstreamEchoAligned: true,
        sourceNodeV303KeepsRuntimeBlocked: true,
        sourceNodeV303KeepsSideEffectsClosed: true,
        decisionSelectsPrerequisiteGate: true,
        decisionRecordBlocksRuntimeShell: true,
        decisionRecordStillReadOnly: true,
        requiredPrerequisitesDocumented: true,
        missingRuntimePrerequisitesBlockImplementation: true,
        necessityProofComplete: true,
        parallelJavaV141MiniKvV134EchoRecommended: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord: true,
      },
      summary: {
        prerequisiteCount: 6,
        missingRuntimePrerequisiteCount: 6,
        noGoConditionCount: 8,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV303.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.decisionRecord.requiredPrerequisites.map((item) => [item.id, item.status])).toEqual([
      ["operator-approval-artifact", "documented-missing"],
      ["credential-handle-readiness", "documented-missing"],
      ["raw-endpoint-allowlist-review", "documented-missing"],
      ["no-network-test-fixture", "documented-missing"],
      ["manual-abort-and-rollback-semantics", "documented-missing"],
      ["java-mini-kv-prerequisite-echo", "documented-missing"],
    ]);
    expect(profile.decisionRecord.explicitNoGoConditions.map((condition) => condition.code)).toContain(
      "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED",
    );
  });

  it("uses committed historical fixture fallback through the v303 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile.decisionRecordState).toBe("runtime-shell-chain-stop-or-prerequisite-decision-record-ready");
    expect(profile.sourceNodeV303.readyForPostDecisionPlanIntakeUpstreamEchoVerification).toBe(true);
    expect(profile.sourceNodeV303.upstreamEchoAligned).toBe(true);
    expect(profile.decisionRecord.necessityProof.whyV303CannotBeReused).toContain("v303");
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.decisionRecordState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record.v1",
        decisionRecordState: "runtime-shell-chain-stop-or-prerequisite-decision-record-ready",
        runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
        readyForParallelJavaV141MiniKvV134EchoRequest: true,
        decisionRecord: {
          decision: "require-explicit-approval-prerequisites-before-runtime-shell",
          allowsDisabledRuntimeShellImplementation: false,
          allowsCredentialValueRead: false,
          allowsManagedAuditConnection: false,
          missingRuntimePrerequisiteCount: 6,
        },
        checks: {
          sourceNodeV303UpstreamEchoAligned: true,
          decisionRecordBlocksRuntimeShell: true,
          decisionRecordStillReadOnly: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell chain stop-or-prerequisite decision record",
      );
      expect(markdown.body).toContain("runtime-shell-chain-stop-or-prerequisite-decision-record-ready");
      expect(markdown.body).toContain("RUN_JAVA_V141_AND_MINIKV_V134_IN_PARALLEL");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-304",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v304-runtime-shell-chain-stop-prerequisite-decision",
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
