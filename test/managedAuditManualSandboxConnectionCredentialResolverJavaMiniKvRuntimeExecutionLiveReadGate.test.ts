import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution live-read gate", () => {
  it("accepts the approved local loopback GET-only live-read gate without running smoke", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate.v1",
      gateState: "runtime-execution-live-read-gate-ready",
      gateDecision: "accept-approved-local-loopback-get-only-live-read-gate-for-next-smoke",
      readyForRuntimeExecutionLiveReadGate: true,
      readyForApprovedLocalLoopbackReadOnlySmoke: true,
      readyForRuntimeExecutionPacket: true,
      activeNodeVersion: "Node v406",
      sourceNodeVersion: "Node v405",
      javaSourceVersion: "Java v167",
      miniKvSourceVersion: "mini-kv v158",
      gateOnly: true,
      runtimeGateRequiresSeparateSmokeRun: true,
      runtimeExecutionPacketPresent: true,
      runtimeExecutionPacketExecutable: true,
      runtimeGateApprovalPresent: true,
      concreteLoopbackPortsAssigned: true,
      executionAttempted: false,
      runtimeSmokeAttempted: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV405: {
        sourceVersion: "Node v405",
        readyForRuntimeExecutionCanonicalApprovalInputValueValidation: true,
        readyForRuntimeExecutionPacket: true,
        readyForRuntimeLiveReadGate: true,
        checkCount: 32,
        passedCheckCount: 32,
        productionBlockerCount: 0,
        targetInputCount: 3,
        presentTargetInputCount: 3,
        validTargetInputCount: 3,
      },
      liveReadGate: {
        gateMode: "runtime-execution-live-read-gate",
        gateDecision: "accept-approved-local-loopback-get-only-live-read-gate-for-next-smoke",
        approvalCorrelationId: "approval-v405-20260531T130805-codex-auto",
        approvalWindowId: "runtime-window-v405-20260531T130805",
        packetId: "runtime-execution-packet-v405-20260531T130805",
        targetCount: 2,
        readyTargetCount: 2,
        packetExecutable: true,
        liveReadGateInputValidated: true,
        localLoopbackOnly: true,
        concreteLoopbackPortsAssigned: true,
        serviceOwnersResolved: true,
        smokeTargetsGetOnly: true,
        cleanupProofRequired: true,
        cleanupRuleCount: 3,
        operatorOwnsServiceLifecycle: true,
        nodeMayStartServices: false,
        nodeMayStopServices: false,
        nodeMayMutateUpstream: false,
        runtimeSmokeAttempted: false,
        executionAttempted: false,
        managedAuditConnectionOpened: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        activeShardRoutingEnabled: false,
        liveReadGateOpenForNextSmoke: true,
        nextNodeVersionSuggested: "Node v407",
      },
      checks: {
        sourceNodeV405Ready: true,
        sourceNodeV405HasNoBlockers: true,
        sourceNodeV405DidNotExecuteRuntime: true,
        canonicalInputsStillPresent: true,
        canonicalInputsStillValid: true,
        approvalCorrelationIdStable: true,
        approvalWindowStillValid: true,
        runtimePacketExecutable: true,
        runtimeGateApprovalPresent: true,
        loopbackHostsAreLocal: true,
        loopbackPortsConcrete: true,
        serviceOwnersDeclared: true,
        javaSmokeTargetDeclared: true,
        miniKvSmokeTargetDeclared: true,
        smokeTargetsGetOnly: true,
        javaSmokeTargetHealthGet: true,
        miniKvSmokeTargetHealthGet: true,
        cleanupProofRequired: true,
        cleanupRulesSafe: true,
        upstreamProbesApproved: true,
        upstreamActionsDisabled: true,
        operatorVerified: true,
        operatorCleanupAcknowledged: true,
        credentialValueReadDenied: true,
        rawEndpointParsingDenied: true,
        managedAuditConnectionDenied: true,
        writeOperationsDenied: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        executionStillNotAttempted: true,
        activeShardPrototypeStillDisabled: true,
        gateDigestStable: true,
        readyForRuntimeExecutionLiveReadGate: true,
      },
      summary: {
        sourceCheckCount: 32,
        sourcePassedCheckCount: 32,
        targetCount: 2,
        readyTargetCount: 2,
        cleanupRuleCount: 3,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
        readyForApprovedLocalLoopbackReadOnlySmoke: true,
      },
    });
    expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.liveReadGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.serviceTargets).toEqual([
      expect.objectContaining({
        owner: "java",
        serviceOwner: "java-platform-operator",
        host: "127.0.0.1",
        port: 8080,
        method: "GET",
        path: "/actuator/health",
        readyForNextSmoke: true,
      }),
      expect.objectContaining({
        owner: "mini-kv",
        serviceOwner: "mini-kv-service-owner",
        host: "127.0.0.1",
        port: 6424,
        method: "GET",
        path: "/health",
        readyForNextSmoke: true,
      }),
    ]);
  }, 180_000);

  it("exposes JSON and Markdown through the audit route table", async () => {
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate.v1",
        activeNodeVersion: "Node v406",
        sourceNodeVersion: "Node v405",
        readyForRuntimeExecutionLiveReadGate: true,
        readyForApprovedLocalLoopbackReadOnlySmoke: true,
        startsJavaService: false,
        startsMiniKvService: false,
        runtimeSmokeAttempted: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Live Read Gate");
      expect(markdown.body).toContain("approval-v405-20260531T130805-codex-auto");
      expect(markdown.body).toContain("No production blockers.");
      expect(markdown.body).toContain("LIVE_READ_GATE_IS_NOT_RUNTIME_SMOKE");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-406",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v405-20260531T130805-codex-auto",
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
