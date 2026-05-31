import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input template validator", () => {
  it("publishes machine-checkable approval input templates without approving runtime execution", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator.v1",
      templateValidatorState: "runtime-execution-approval-input-templates-published-runtime-blocked",
      templateValidatorDecision: "publish-machine-checkable-input-templates-and-keep-runtime-blocked",
      readyForRuntimeExecutionApprovalInputTemplateValidator: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v402",
      sourceNodeVersion: "Node v401",
      javaSourceVersion: "Java v165",
      miniKvSourceVersion: "mini-kv v156",
      runtimeExecutionArtifactsComplete: false,
      runtimeExecutionPacketPresent: false,
      runtimeExecutionPacketExecutable: false,
      runtimeGateApprovalPresent: false,
      concreteLoopbackPortsAssigned: false,
      executionAttempted: false,
      startsJavaService: false,
      startsMiniKvService: false,
      executionAllowed: false,
      activeShardPrototypeEnabled: false,
      sourceNodeV401: {
        sourceVersion: "Node v401",
        intakeState: "runtime-execution-approval-input-completion-intake-blocked",
        readyForRuntimeExecutionApprovalInputCompletionIntake: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        checkCount: 27,
        passedCheckCount: 27,
        productionBlockerCount: 3,
      },
      templateBundle: {
        bundleMode: "template-only-no-runtime-approval",
        sourceSpan: "Node v401 completion intake + Java v165 + mini-kv v156",
        templateCount: 3,
        targetInputCount: 3,
        presentTargetInputCount: 0,
        validTargetInputCount: 0,
        missingTargetInputCount: 3,
        runtimeGateStillClosed: true,
        nextNodeVersionSuggested: "Node v403",
      },
      checks: {
        sourceNodeV401Ready: true,
        sourceNodeV401StillBlocksRuntime: true,
        templateCountStable: true,
        targetInputCountStable: true,
        templateDigestsStable: true,
        nodeWindowTemplateComplete: true,
        operatorApprovalTemplateComplete: true,
        crossProjectPacketTemplateComplete: true,
        targetPathsCanonical: true,
        templateArchivePathsSeparateFromCanonicalInputs: true,
        noConcreteApprovalInputsPresent: true,
        noConcreteApprovalInputsValid: true,
        runtimePacketStillAbsent: true,
        runtimeGateStillClosed: true,
        executionStillDenied: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        readyForRuntimeExecutionApprovalInputTemplateValidator: true,
      },
      summary: {
        checkCount: 22,
        passedCheckCount: 22,
        sourceCheckCount: 27,
        sourcePassedCheckCount: 27,
        templateCount: 3,
        targetInputCount: 3,
        presentTargetInputCount: 0,
        validTargetInputCount: 0,
        missingTargetInputCount: 3,
        productionBlockerCount: 3,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.templates.map((template) => [template.key, template.targetPath, template.templateArchivePath]))
      .toEqual([
        [
          "nodeApprovedRuntimeWindow",
          "e/398/input/node-approved-runtime-window-v398.json",
          "e/402/input-templates/node-approved-runtime-window-v402.template.json",
        ],
        [
          "correlatedOperatorApprovalRecord",
          "e/398/input/correlated-operator-approval-record-v398.json",
          "e/402/input-templates/correlated-operator-approval-record-v402.template.json",
        ],
        [
          "crossProjectRuntimeExecutionPacket",
          "e/398/input/cross-project-runtime-execution-packet-v398.json",
          "e/402/input-templates/cross-project-runtime-execution-packet-v402.template.json",
        ],
      ]);
    expect(profile.templates.every((template) => /^[a-f0-9]{64}$/.test(template.templateDigest))).toBe(true);
    expect(profile.targetValidations.map((validation) => [validation.key, validation.present, validation.valid]))
      .toEqual([
        ["nodeApprovedRuntimeWindow", false, false],
        ["correlatedOperatorApprovalRecord", false, false],
        ["crossProjectRuntimeExecutionPacket", false, false],
      ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "NODE_APPROVED_RUNTIME_WINDOW_INPUT_NOT_PRESENT",
      "CORRELATED_OPERATOR_APPROVAL_RECORD_INPUT_NOT_PRESENT",
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_INPUT_NOT_PRESENT",
    ]);
  }, 60000);

  it("keeps Java v165 and mini-kv v156 historical fallback compatible", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator({
          config: loadTestConfig(),
        });

      expect(profile.sourceNodeV401.readyForRuntimeExecutionApprovalInputCompletionIntake).toBe(true);
      expect(profile.templateBundle.templateCount).toBe(3);
      expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
      expect(profile.readyForRuntimeExecutionPacket).toBe(false);
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator.v1",
        activeNodeVersion: "Node v402",
        sourceNodeVersion: "Node v401",
        javaSourceVersion: "Java v165",
        miniKvSourceVersion: "mini-kv v156",
        readyForRuntimeExecutionApprovalInputTemplateValidator: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("node-approved-runtime-window-v402.template.json");
      expect(markdown.body).toContain("correlated-operator-approval-record-v402.template.json");
      expect(markdown.body).toContain("cross-project-runtime-execution-packet-v402.template.json");
      expect(markdown.body).toContain("TEMPLATES_ARE_NOT_RUNTIME_APPROVAL");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-402",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v402-template-validator",
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
