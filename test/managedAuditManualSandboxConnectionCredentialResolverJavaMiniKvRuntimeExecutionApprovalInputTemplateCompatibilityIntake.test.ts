import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input template compatibility intake", () => {
  it("consumes Java v166 and mini-kv v157 template compatibility while keeping runtime blocked", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake.v1",
      intakeState: "runtime-execution-approval-input-template-compatibility-intake-blocked",
      intakeDecision: "record-upstream-template-compatibility-and-keep-runtime-blocked",
      readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v403",
      sourceNodeVersion: "Node v402",
      javaSourceVersion: "Java v166",
      miniKvSourceVersion: "mini-kv v157",
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
      sourceNodeV402: {
        sourceVersion: "Node v402",
        templateValidatorState: "runtime-execution-approval-input-templates-published-runtime-blocked",
        readyForRuntimeExecutionApprovalInputTemplateValidator: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        checkCount: 22,
        passedCheckCount: 22,
        productionBlockerCount: 3,
      },
      javaV166TemplateCompatibility: {
        sourceVersion: "Java v166",
        evidenceKind: "java-runtime-execution-approval-input-template-compatibility",
        present: true,
        complete: true,
        status: "passed",
        readOnly: true,
        executionAllowed: false,
        sourceContractHandoffVersion: "Java v165",
        sourceCanonicalJavaInputVersion: "Java v164",
        lastTemplateValidatorNodeVersion: "Node v402",
        nodeTemplateValidatorPresent: true,
        templatesAreApprovalInputs: false,
        canonicalApprovalInputsCreatedByJava: false,
        canonicalTargetPathCount: 3,
        templateArchivePathCount: 3,
        blockedCanonicalInputCount: 3,
      },
      miniKvV157TemplateValidatorEcho: {
        sourceVersion: "mini-kv v157",
        evidenceKind: "mini-kv-runtime-execution-approval-input-template-validator-echo",
        present: true,
        complete: true,
        releaseVersion: "v157",
        status: "runtime-execution-approval-input-template-validator-echo-read-only",
        readOnly: true,
        executionAllowed: false,
        echoMode: "template-validator-echo-no-canonical-inputs",
        templateOnlyInputCount: 3,
        templateArchivePathCount: 3,
        canonicalTargetPathCount: 3,
        canonicalRuntimeInputPresent: false,
        templateCopiedToCanonicalInput: false,
        sharedApprovalCorrelationIdPresent: false,
        templatesAuthorizeRuntime: false,
        failClosedOnTemplateOnlyInputs: true,
      },
      compatibilityIntake: {
        intakeMode: "runtime-execution-approval-input-template-compatibility-intake",
        intakeDecision: "record-upstream-template-compatibility-and-keep-runtime-blocked",
        upstreamCompatibilityReceiptCount: 2,
        compatibleUpstreamCount: 2,
        canonicalInputCount: 3,
        presentCanonicalInputCount: 0,
        validCanonicalInputCount: 0,
        templatesRemainTemplateOnly: true,
        runtimeGateStillClosed: true,
        nextNodeVersionSuggested: "Node v404",
      },
      checks: {
        sourceNodeV402Ready: true,
        sourceNodeV402StillBlocksRuntime: true,
        javaV166EvidencePresent: true,
        javaV166StatusPassed: true,
        javaV166ReceiptComplete: true,
        javaV166BindsNodeV402: true,
        javaV166DoesNotCreateCanonicalInputs: true,
        javaV166DoesNotApproveRuntime: true,
        miniKvV157EvidencePresent: true,
        miniKvV157ReleaseCurrent: true,
        miniKvV157StatusEcho: true,
        miniKvV157EchoComplete: true,
        miniKvV157DoesNotCreateCanonicalInputs: true,
        miniKvV157DoesNotApproveRuntime: true,
        templateMatrixCountStable: true,
        canonicalTargetsRemainAbsent: true,
        compatibilityRecordsComplete: true,
        runtimePacketStillAbsent: true,
        runtimeGateStillClosed: true,
        executionStillDenied: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        compatibilityDigestStable: true,
        readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: true,
      },
      summary: {
        checkCount: 28,
        passedCheckCount: 28,
        sourceCheckCount: 22,
        sourcePassedCheckCount: 22,
        javaCompatibilityReady: true,
        miniKvTemplateEchoReady: true,
        upstreamCompatibilityReceiptCount: 2,
        compatibleUpstreamCount: 2,
        canonicalInputCount: 3,
        presentCanonicalInputCount: 0,
        validCanonicalInputCount: 0,
        missingCanonicalInputCount: 3,
        productionBlockerCount: 3,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "NODE_APPROVED_RUNTIME_WINDOW_INPUT_NOT_PRESENT",
      "CORRELATED_OPERATOR_APPROVAL_RECORD_INPUT_NOT_PRESENT",
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_INPUT_NOT_PRESENT",
    ]);
    expect(profile.compatibilityIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

  it("uses frozen historical fallback for Java v166 and mini-kv v157 evidence", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake({
          config: loadTestConfig(),
        });

      expect(profile.javaV166TemplateCompatibility.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/166/evidence/java-shard-readiness-runtime-execution-approval-input-template-compatibility-v166.json",
      );
      expect(profile.miniKvV157TemplateValidatorEcho.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v157.json",
      );
      expect(profile.javaV166TemplateCompatibility.complete).toBe(true);
      expect(profile.miniKvV157TemplateValidatorEcho.complete).toBe(true);
      expect(profile.summary.passedCheckCount).toBe(profile.summary.checkCount);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake.v1",
        activeNodeVersion: "Node v403",
        sourceNodeVersion: "Node v402",
        javaSourceVersion: "Java v166",
        miniKvSourceVersion: "mini-kv v157",
        readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Java v166 Template Compatibility");
      expect(markdown.body).toContain("mini-kv v157 Template Validator Echo");
      expect(markdown.body).toContain("UPSTREAM_COMPATIBILITY_IS_NOT_RUNTIME_APPROVAL");
      expect(markdown.body).toContain("CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_INPUT_NOT_PRESENT");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-403",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v403-template-compatibility",
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
