import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record";

describe("managed audit manual sandbox connection credential resolver runtime shell candidate gate decision record", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("records the verified v298 runtime shell candidate gate decision as blocked", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record.v1",
      decisionRecordState: "runtime-shell-candidate-gate-decision-record-ready",
      runtimeShellDecision: "blocked",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord: true,
      readOnlyDecisionRecord: true,
      runtimeShellCandidateGateDecisionRecordOnly: true,
      consumesNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: true,
      readyForParallelJavaV135MiniKvV132EchoRequest: true,
      readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: false,
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
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
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV298: {
        sourceVersion: "Node v298",
        verificationState: "runtime-shell-candidate-gate-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        runtimeShellCandidateGateUpstreamEchoVerificationOnly: true,
        consumesJavaV134RuntimeShellCandidateGateEcho: true,
        consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt: true,
        readyForNodeV299RuntimeShellCandidateGateDecisionRecord: true,
        readyForNodeV299RuntimeShellImplementation: false,
        sourceNodeV297Ready: true,
        javaV134EchoReady: true,
        miniKvV131ReceiptReady: true,
        upstreamEchoAligned: true,
        fiveGateSetAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        javaV134EvidencePresent: true,
        javaV134VerificationDocumented: true,
        miniKvV131EvidencePresent: true,
        miniKvV131VerificationDocumented: true,
        requiredGateCount: 5,
        documentedGateCount: 5,
        reviewEvidenceSatisfiedCount: 5,
        runtimePrerequisiteSatisfiedCount: 0,
        implementationAllowedGateCount: 0,
        productionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellEnabled: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      decisionRecord: {
        recordMode: "runtime-shell-candidate-gate-decision-record-only",
        decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell",
        sourceSpan: "Node v297-v298 + Java v134 + mini-kv v131",
        decision: "blocked",
        upstreamEchoVerified: true,
        allowsParallelJavaV135MiniKvV132EchoRequest: true,
        allowsNodeV300BeforeUpstreamEcho: false,
        allowsDisabledRuntimeShellImplementation: false,
        allowsDisabledRuntimeShellInvocation: false,
        allowsRealResolverImplementation: false,
        allowsFakeHarnessRuntimeImplementation: false,
        allowsSecretProviderInstantiation: false,
        allowsResolverClientInstantiation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsManagedAuditConnection: false,
        allowsSchemaMigration: false,
        allowsApprovalLedgerWrite: false,
        allowsAutomaticUpstreamStart: false,
        requiredEvidenceCount: 4,
        noGoConditionCount: 6,
      },
      checks: {
        sourceNodeV298Loaded: true,
        sourceNodeV298Ready: true,
        sourceNodeV298VerifiedUpstreamEchoes: true,
        sourceNodeV298KeepsRuntimeBlocked: true,
        sourceNodeV298KeepsSideEffectsClosed: true,
        candidateGateDecisionBlocked: true,
        decisionRecordBlocksRuntimeShell: true,
        decisionRecordStillReadOnly: true,
        parallelJavaV135MiniKvV132EchoRecommended: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord: true,
      },
      summary: {
        requiredEvidenceCount: 4,
        missingRequiredEvidenceCount: 0,
        noGoConditionCount: 6,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV298.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.decisionRecord.requiredEvidence.map((item) => [item.id, item.status])).toEqual([
      ["node-v298-upstream-echo-ready", "present"],
      ["java-v134-echo-ready", "present"],
      ["mini-kv-v131-receipt-ready", "present"],
      ["runtime-shell-still-blocked", "present"],
    ]);
    expect(profile.decisionRecord.explicitNoGoConditions.map((condition) => condition.code)).toContain(
      "RUNTIME_SHELL_IMPLEMENTATION_REQUIRED",
    );
  });

  it("uses committed historical fixture fallback for Java v134 and mini-kv v131", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile.decisionRecordState).toBe("runtime-shell-candidate-gate-decision-record-ready");
    expect(normalizePath(profile.sourceNodeV298.javaV134FirstEvidenceResolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoSupport.java",
    );
    expect(normalizePath(profile.sourceNodeV298.miniKvV131FirstEvidenceResolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-runtime-shell-candidate-gate-non-participation-receipt.json",
    );
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.decisionRecordState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record.v1",
        decisionRecordState: "runtime-shell-candidate-gate-decision-record-ready",
        runtimeShellDecision: "blocked",
        readyForParallelJavaV135MiniKvV132EchoRequest: true,
        decisionRecord: {
          decision: "blocked",
          allowsDisabledRuntimeShellImplementation: false,
          allowsCredentialValueRead: false,
          allowsManagedAuditConnection: false,
        },
        checks: {
          sourceNodeV298VerifiedUpstreamEchoes: true,
          decisionRecordBlocksRuntimeShell: true,
          decisionRecordStillReadOnly: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell candidate gate decision record",
      );
      expect(markdown.body).toContain("runtime-shell-candidate-gate-decision-record-ready");
      expect(markdown.body).toContain("RUN_JAVA_V135_AND_MINIKV_V132_IN_PARALLEL");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-299",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v299-runtime-shell-candidate-gate-decision-record",
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
    PORT: "4399",
    ...overrides,
  });
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}
