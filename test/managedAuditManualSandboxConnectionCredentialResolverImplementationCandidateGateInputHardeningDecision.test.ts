import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision";

describe("managed audit manual sandbox connection credential resolver implementation candidate gate input-hardening decision", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v328 and opens only the input-hardening candidate gate", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision.v1",
      candidateGateState: "implementation-candidate-gate-input-hardening-decision-ready",
      candidateGateDecision: "require-input-export-hardening-before-disabled-runtime-design",
      readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision:
        true,
      readOnlyDecisionRecord: true,
      implementationCandidateGateOnly: true,
      consumesNodeV328FinalPrerequisiteClosureReview: true,
      activeNodeVersion: "Node v329",
      sourceNodeClosureVersion: "Node v328",
      readyForParallelJavaV151MiniKvV143EchoRequest: true,
      readyForNodeV330CandidateGateUpstreamAlignment: false,
      readyForDisabledRuntimeShellDesignDraft: false,
      readyForRuntimeShellImplementation: false,
      readyForRuntimeShellInvocation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      httpRequestSent: false,
      tcpConnectionAttempted: false,
      networkSocketOpened: false,
      javaServiceStarted: false,
      miniKvServiceStarted: false,
      javaSqlExecutionAllowed: false,
      approvalLedgerWritten: false,
      schemaMigrationExecuted: false,
      rollbackExecutionAllowed: false,
      deploymentActionAllowed: false,
      miniKvWriteCommandAllowed: false,
      miniKvLoadAllowed: false,
      miniKvCompactAllowed: false,
      miniKvRestoreAllowed: false,
      miniKvSetnxexAllowed: false,
      automaticUpstreamStart: false,
      sourceNodeV328: {
        reviewState: "final-prerequisite-closure-review-ready",
        readyForFinalPrerequisiteClosureReview: true,
        allPrerequisitesClosed: true,
        readyForImplementationCandidateGate: true,
        nextNodeVersionSuggested: "Node v329",
        sourceNodeReadinessVersion: "Node v327",
        completedPrerequisiteCount: 6,
        remainingPrerequisiteCount: 0,
        originalPrerequisiteCount: 6,
        nextStepMode: "implementation-candidate-gate-only",
        sourceProductionBlockerCount: 0,
        executionAllowed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      decisionRecord: {
        recordMode: "implementation-candidate-gate-input-hardening-decision-only",
        decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell",
        sourceSpan: "Node v328 final prerequisite closure review",
        decision: "require-input-export-hardening-before-disabled-runtime-design",
        allPrerequisitesClosed: true,
        candidateGateEntered: true,
        allowsParallelJavaV151MiniKvV143EchoRequest: true,
        allowsNodeV330BeforeUpstreamEcho: false,
        allowsDisabledRuntimeShellDesignDraft: false,
        allowsDisabledRuntimeShellImplementation: false,
        allowsDisabledRuntimeShellInvocation: false,
        allowsManagedAuditConnection: false,
        allowsRollbackExecution: false,
        allowsMiniKvWriteOrAdminCommand: false,
        allowsAutomaticUpstreamStart: false,
        inputHardeningRequirementCount: 4,
        noGoConditionCount: 7,
      },
      necessityProof: {
        consumer: "Java v151 and mini-kv v143, then Node v330",
        proofComplete: true,
      },
      checks: {
        sourceNodeV328Ready: true,
        sourceNodeV328ClosedAllPrerequisites: true,
        sourceNodeV328AllowsCandidateGateOnly: true,
        sourceNodeV328KeepsRuntimeBlocked: true,
        sourceNodeV328KeepsSideEffectsClosed: true,
        candidateGateRequiresInputHardening: true,
        candidateGateDoesNotOpenRuntime: true,
        necessityProofComplete: true,
        inputHardeningRequirementsDocumented: true,
        parallelJavaV151MiniKvV143EchoRecommended: true,
        nodeV330BlockedUntilUpstreamEcho: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision:
          true,
      },
      summary: {
        sourceNodeV328CheckCount: 18,
        sourceNodeV328PassedCheckCount: 18,
        sourceProductionBlockerCount: 0,
        inputHardeningRequirementCount: 4,
        noGoConditionCount: 7,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.inputHardeningRequirements.map((entry) => entry.owner))
      .toEqual(["java", "mini-kv", "node", "node"]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the source v328 closure review is blocked", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision({
        config: loadTestConfig(),
        evidencePaths: {
          javaV150EvidencePath: path.join(process.cwd(), "fixtures", "missing-java-v150.md"),
          miniKvV142ReceiptPath: path.join(process.cwd(), "fixtures", "missing-mini-kv-v142.json"),
        },
      });

    expect(profile.candidateGateState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision)
      .toBe(false);
    expect(profile.readyForParallelJavaV151MiniKvV143EchoRequest).toBe(false);
    expect(profile.sourceNodeV328.reviewState).toBe("blocked");
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V328_NOT_READY",
      "NODE_V328_NOT_CANDIDATE_GATE_ONLY",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.candidateGateState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V328_NOT_READY",
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
    expect(profile.automaticUpstreamStart).toBe(false);
  }, 60000);

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
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
          "managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision.v1",
        candidateGateState: "implementation-candidate-gate-input-hardening-decision-ready",
        activeNodeVersion: "Node v329",
        sourceNodeClosureVersion: "Node v328",
        readyForParallelJavaV151MiniKvV143EchoRequest: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        executionAllowed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        decisionRecord: {
          decision: "require-input-export-hardening-before-disabled-runtime-design",
          inputHardeningRequirementCount: 4,
          noGoConditionCount: 7,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver implementation candidate gate input-hardening decision",
      );
      expect(markdown.body).toContain("Input Hardening Requirements");
      expect(markdown.body).toContain("Java v151");
      expect(markdown.body).toContain("mini-kv v143");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-329",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v329-implementation-candidate-gate",
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
    ...overrides,
  });
}
