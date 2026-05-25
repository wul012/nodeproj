import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review";

describe("managed audit manual sandbox connection credential resolver final prerequisite closure review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v327 readiness and closes the six-prerequisite catalog without opening runtime", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review.v1",
      reviewState: "final-prerequisite-closure-review-ready",
      prerequisiteClosureDecision: "advance-abort-rollback-semantics-and-close-prerequisites",
      readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview: true,
      readOnlyClosureReview: true,
      finalPrerequisiteClosureReviewOnly: true,
      consumesNodeV327ReadOnlyCrossProjectReadinessRunner: true,
      activeNodeReviewVersion: "Node v328",
      sourceNodeReadinessVersion: "Node v327",
      targetPrerequisiteId: "abort-rollback-semantics",
      allPrerequisitesClosed: true,
      readyForImplementationCandidateGate: true,
      nextNodeVersionSuggested: "Node v329",
      nextPlanRequired: true,
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
      sourceNodeV327: {
        runnerState: "read-only-cross-project-readiness-ready",
        readyForReadOnlyCrossProjectReadinessReport: true,
        readyForFinalPrerequisiteClosureReview: true,
        sourceNodeContractVersion: "Node v326",
        sourceJavaVersion: "Java v150",
        sourceMiniKvVersion: "mini-kv v142",
        targetPrerequisiteId: "abort-rollback-semantics",
        javaV150ReadyForNodeConsumption: true,
        miniKvV142ReadyForNodeConsumption: true,
        sideEffectSafetyMatrixClosed: true,
        sourceProductionBlockerCount: 0,
        executionAllowed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      closureReview: {
        reviewMode: "final-prerequisite-closure-review-only",
        sourceSpan: "Node v327",
        movedPrerequisiteId: "abort-rollback-semantics",
        movedFrom: "contract-intake-and-cross-project-readiness-complete",
        movedTo: "final-prerequisite-complete",
        completedPrerequisiteCount: 6,
        remainingPrerequisiteCount: 0,
        originalPrerequisiteCount: 6,
        allPrerequisitesClosed: true,
        nextNodeVersionSuggested: "Node v329",
        nextStepMode: "implementation-candidate-gate-only",
        runtimeShellStillBlocked: true,
      },
      checks: {
        sourceNodeV327Ready: true,
        sourceNodeV327ReadinessReportReady: true,
        sourceNodeV327FinalClosureReady: true,
        sourceNodeV327KeepsRuntimeBlocked: true,
        sourceNodeV327KeepsSideEffectsClosed: true,
        sourceJavaV150Consumed: true,
        sourceMiniKvV142Consumed: true,
        abortRollbackSemanticsCanClose: true,
        allSixPrerequisitesCompleted: true,
        noPrerequisitesRemain: true,
        finalClosureDoesNotOpenRuntime: true,
        implementationCandidateGateOnly: true,
        noNewJavaMiniKvEchoRequested: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview: true,
      },
      summary: {
        sourceNodeV327CheckCount: 22,
        sourceNodeV327PassedCheckCount: 22,
        originalPrerequisiteCount: 6,
        completedPrerequisiteCount: 6,
        remainingPrerequisiteCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.closureDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.completedPrerequisites.map((entry) => entry.id)).toEqual([
      "signed-human-approval-artifact",
      "credential-handle-approval",
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
      "abort-rollback-semantics",
      "java-mini-kv-decision-echo",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the source v327 readiness runner is blocked", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview({
      config: loadTestConfig(),
      evidencePaths: {
        javaV150EvidencePath: path.join(process.cwd(), "fixtures", "missing-java-v150.md"),
        miniKvV142ReceiptPath: path.join(process.cwd(), "fixtures", "missing-mini-kv-v142.json"),
      },
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview)
      .toBe(false);
    expect(profile.readyForImplementationCandidateGate).toBe(false);
    expect(profile.sourceNodeV327.runnerState).toBe("blocked");
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V327_NOT_READY",
      "NODE_V327_REPORT_NOT_READY",
      "NODE_V327_FINAL_CLOSURE_NOT_READY",
      "JAVA_V150_NOT_CONSUMED",
      "MINI_KV_V142_NOT_CONSUMED",
    ]));
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.executionAllowed).toBe(false);
    expect(profile.rollbackExecutionAllowed).toBe(false);
  }, 60000);

  it("blocks final closure when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V327_NOT_READY",
      "NODE_V327_REPORT_NOT_READY",
      "NODE_V327_FINAL_CLOSURE_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review.v1",
        reviewState: "final-prerequisite-closure-review-ready",
        activeNodeReviewVersion: "Node v328",
        sourceNodeReadinessVersion: "Node v327",
        allPrerequisitesClosed: true,
        readyForImplementationCandidateGate: true,
        readyForRuntimeShellImplementation: false,
        executionAllowed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        closureReview: {
          completedPrerequisiteCount: 6,
          remainingPrerequisiteCount: 0,
          nextStepMode: "implementation-candidate-gate-only",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver final prerequisite closure review",
      );
      expect(markdown.body).toContain("Node v327");
      expect(markdown.body).toContain("Completed Prerequisites");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-328",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v328-final-prerequisite-closure",
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
