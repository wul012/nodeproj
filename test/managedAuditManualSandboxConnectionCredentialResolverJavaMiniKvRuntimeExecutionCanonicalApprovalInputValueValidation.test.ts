import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution canonical approval input value validation", () => {
  it("validates all three canonical approval inputs without starting runtime services", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation.v1",
      validationState: "runtime-execution-canonical-approval-input-value-validation-ready",
      validationDecision: "accept-canonical-approval-input-values-for-next-live-read-gate",
      readyForRuntimeExecutionCanonicalApprovalInputValueValidation: true,
      readyForRuntimeExecutionPacket: true,
      readyForRuntimeLiveReadGate: true,
      activeNodeVersion: "Node v405",
      sourceNodeVersion: "Node v404",
      javaSourceVersion: "Java v167",
      miniKvSourceVersion: "mini-kv v158",
      runtimeExecutionArtifactsComplete: true,
      runtimeExecutionPacketPresent: true,
      runtimeExecutionPacketExecutable: true,
      runtimeGateApprovalPresent: true,
      concreteLoopbackPortsAssigned: true,
      executionAttempted: false,
      startsJavaService: false,
      startsMiniKvService: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV404: {
        sourceVersion: "Node v404",
        readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        checkCount: 31,
        passedCheckCount: 31,
      },
      valueValidation: {
        validationMode: "runtime-execution-canonical-approval-input-value-validation",
        validationDecision: "accept-canonical-approval-input-values-for-next-live-read-gate",
        targetInputCount: 3,
        presentTargetInputCount: 3,
        validTargetInputCount: 3,
        sharedApprovalCorrelationId: "approval-v405-20260531T130805-codex-auto",
        sharedApprovalCorrelationIdValidated: true,
        approvalWindowId: "runtime-window-v405-20260531T130805",
        packetId: "runtime-execution-packet-v405-20260531T130805",
        windowTimeRangeValid: true,
        allowedHttpMethodsGetOnly: true,
        serviceOwnersPresent: true,
        smokeCommandsGetOnly: true,
        cleanupRulesPresent: true,
        runtimeExecutionPacketPresent: true,
        runtimeExecutionPacketExecutable: true,
        readyForRuntimeLiveReadGate: true,
        runtimeGateStillClosed: true,
        nextNodeVersionSuggested: "Node v406",
      },
      checks: {
        sourceNodeV404Ready: true,
        sourceNodeV404StillBlocksRuntime: true,
        nodeRuntimeWindowInputPresent: true,
        operatorApprovalRecordInputPresent: true,
        crossProjectRuntimePacketInputPresent: true,
        nodeRuntimeWindowInputValid: true,
        operatorApprovalRecordInputValid: true,
        crossProjectRuntimePacketInputValid: true,
        noRequiredPlaceholders: true,
        sharedApprovalCorrelationIdMatches: true,
        operatorBindsRuntimeWindow: true,
        packetReferencesCanonicalInputs: true,
        packetBindsExpectedVersions: true,
        windowTimeRangeValid: true,
        loopbackPortsMatchPacket: true,
        allowedHttpMethodsGetOnly: true,
        credentialValueReadDenied: true,
        rawEndpointParsingDenied: true,
        managedAuditConnectionDenied: true,
        writeOperationsDenied: true,
        serviceOwnersPresent: true,
        smokeCommandsGetOnly: true,
        cleanupRulesPresent: true,
        runtimeExecutionPacketPresent: true,
        runtimeExecutionPacketExecutable: true,
        readyForRuntimeLiveReadGate: true,
        executionStillNotAttempted: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        activeShardPrototypeStillDisabled: true,
        validationDigestStable: true,
        readyForRuntimeExecutionCanonicalApprovalInputValueValidation: true,
      },
      summary: {
        sourceCheckCount: 31,
        sourcePassedCheckCount: 31,
        targetInputCount: 3,
        presentTargetInputCount: 3,
        validTargetInputCount: 3,
        sharedApprovalCorrelationIdValidated: true,
        readyForRuntimeExecutionPacket: true,
        readyForRuntimeLiveReadGate: true,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.inputReferences.map((input) => [input.key, input.present, input.validShape])).toEqual([
      ["nodeApprovedRuntimeWindow", true, true],
      ["correlatedOperatorApprovalRecord", true, true],
      ["crossProjectRuntimeExecutionPacket", true, true],
    ]);
    expect(profile.valueValidation.validationDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation.v1",
        activeNodeVersion: "Node v405",
        sourceNodeVersion: "Node v404",
        readyForRuntimeExecutionCanonicalApprovalInputValueValidation: true,
        readyForRuntimeExecutionPacket: true,
        readyForRuntimeLiveReadGate: true,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Value Validation");
      expect(markdown.body).toContain("approval-v405-20260531T130805-codex-auto");
      expect(markdown.body).toContain("No production blockers.");
      expect(markdown.body).toContain("VALUE_VALIDATION_IS_NOT_RUNTIME_EXECUTION");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-405",
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
