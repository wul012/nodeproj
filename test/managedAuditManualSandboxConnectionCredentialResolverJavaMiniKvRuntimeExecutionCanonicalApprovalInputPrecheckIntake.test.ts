import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution canonical approval input precheck intake", () => {
  it("consumes Java v167 and mini-kv v158 canonical approval input prechecks while keeping runtime blocked", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake.v1",
      intakeState: "runtime-execution-canonical-approval-input-precheck-intake-blocked",
      intakeDecision: "record-canonical-approval-input-precheck-and-keep-runtime-blocked",
      readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: true,
      readyForRuntimeExecutionPacket: false,
      readyForRuntimeLiveReadGate: false,
      activeNodeVersion: "Node v404",
      sourceNodeVersion: "Node v403",
      javaSourceVersion: "Java v167",
      miniKvSourceVersion: "mini-kv v158",
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
      sourceNodeV403: {
        sourceVersion: "Node v403",
        intakeState: "runtime-execution-approval-input-template-compatibility-intake-blocked",
        readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        checkCount: 28,
        passedCheckCount: 28,
        productionBlockerCount: 3,
        compatibleUpstreamCount: 2,
        missingCanonicalInputCount: 3,
      },
      javaV167TemplateCompatibilityIntake: {
        sourceVersion: "Java v167",
        evidenceKind: "java-runtime-execution-approval-input-template-compatibility-intake",
        present: true,
        complete: true,
        status: "passed",
        readOnly: true,
        executionAllowed: false,
        compatibilityIntakeReceiptPresent: true,
        compatibilityIntakeReceiptComplete: true,
        nodeCompatibilityIntakePresent: true,
        nodeCompatibilityIntakeComplete: true,
        sourceTemplateCompatibilityReceiptComplete: true,
        sourceJavaInputCanonical: true,
        nodeTemplateValidatorPresent: true,
        templatesAreApprovalInputs: false,
        canonicalApprovalInputsCreatedByJava: false,
        canonicalApprovalInputsCreatedByNodeV403: false,
        nodeApprovedRuntimeWindowPresent: false,
        correlatedOperatorApprovalRecordPresent: false,
        completeCrossProjectRuntimeExecutionPacketPresent: false,
        sourceTemplateCompatibilityVersion: "Java v166",
        sourceContractHandoffVersion: "Java v165",
        sourceCanonicalJavaInputVersion: "Java v164",
        sourceNodeTemplateValidatorVersion: "Node v402",
        nodeCompatibilityIntakeVersion: "Node v403",
        miniKvTemplateEchoVersion: "mini-kv v157",
        nextNodeConsumerHint: "Node v404",
        canonicalTargetPathCount: 3,
        templateArchivePathCount: 3,
        blockedCanonicalInputCount: 3,
        productionBlockerCount: 3,
      },
      miniKvV158CanonicalApprovalInputPrecheck: {
        sourceVersion: "mini-kv v158",
        evidenceKind: "mini-kv-runtime-execution-canonical-approval-input-precheck",
        present: true,
        complete: true,
        releaseVersion: "v158",
        status: "runtime-execution-canonical-approval-input-precheck-read-only",
        readOnly: true,
        executionAllowed: false,
        precheckMode: "blocked-missing-canonical-approval-inputs",
        sourceFrozenReleaseVersion: "v157",
        sourceNodeCompatibilityVersion: "Node v403 template compatibility intake",
        canonicalInputRoot: "e/398/input",
        requiredCanonicalInputCount: 3,
        presentCanonicalInputCount: 0,
        missingCanonicalInputCount: 3,
        requiredCanonicalInputPathCount: 3,
        nodeApprovedRuntimeWindowCanonicalPresent: false,
        correlatedOperatorApprovalRecordCanonicalPresent: false,
        completeCrossProjectRuntimeExecutionPacketCanonicalPresent: false,
        canonicalApprovalInputsComplete: false,
        sharedApprovalCorrelationIdPresent: false,
        sharedApprovalCorrelationIdValidated: false,
        templatesAcceptedAsCanonicalInputs: false,
        templateCompatibilityEvidenceAcceptedAsApproval: false,
        runtimeExecutionPacketPresent: false,
        runtimeExecutionPacketExecutable: false,
        failClosedOnMissingCanonicalInputs: true,
      },
      canonicalApprovalInputPrecheckIntake: {
        intakeMode: "runtime-execution-canonical-approval-input-precheck-intake",
        intakeDecision: "record-canonical-approval-input-precheck-and-keep-runtime-blocked",
        upstreamPrecheckReceiptCount: 2,
        completeUpstreamPrecheckCount: 2,
        canonicalInputCount: 3,
        presentCanonicalInputCount: 0,
        validCanonicalInputCount: 0,
        missingCanonicalInputCount: 3,
        sharedApprovalCorrelationIdValidated: false,
        runtimeGateStillClosed: true,
        nextNodeVersionSuggested: "Node v405",
      },
      checks: {
        sourceNodeV403Ready: true,
        sourceNodeV403StillBlocksRuntime: true,
        javaV167EvidencePresent: true,
        javaV167StatusPassed: true,
        javaV167ReceiptComplete: true,
        javaV167BindsNodeV403: true,
        javaV167DoesNotCreateCanonicalInputs: true,
        javaV167LeavesCanonicalInputsMissing: true,
        javaV167DoesNotApproveRuntime: true,
        miniKvV158EvidencePresent: true,
        miniKvV158ReleaseCurrent: true,
        miniKvV158StatusPrecheck: true,
        miniKvV158PrecheckComplete: true,
        miniKvV158BindsNodeV403: true,
        miniKvV158CanonicalCountsBlocked: true,
        miniKvV158DoesNotAcceptTemplatesAsCanonical: true,
        miniKvV158RequiresRealApprovalValues: true,
        miniKvV158DoesNotApproveRuntime: true,
        canonicalTargetsRemainAbsent: true,
        precheckRecordsComplete: true,
        runtimePacketStillAbsent: true,
        runtimeGateStillClosed: true,
        executionStillDenied: true,
        noAutomaticUpstreamStartStop: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        activeShardPrototypeStillDisabled: true,
        precheckDigestStable: true,
        readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: true,
      },
      summary: {
        checkCount: 31,
        passedCheckCount: 31,
        sourceCheckCount: 28,
        sourcePassedCheckCount: 28,
        javaCompatibilityIntakeReady: true,
        miniKvCanonicalPrecheckReady: true,
        upstreamPrecheckReceiptCount: 2,
        completeUpstreamPrecheckCount: 2,
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
    expect(profile.canonicalApprovalInputPrecheckIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

  it("uses frozen historical fallback for Java v167 and mini-kv v158 evidence", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake({
          config: loadTestConfig(),
        });

      expect(profile.javaV167TemplateCompatibilityIntake.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/167/evidence/java-shard-readiness-runtime-execution-approval-input-template-compatibility-intake-v167.json",
      );
      expect(profile.miniKvV158CanonicalApprovalInputPrecheck.file.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v158.json",
      );
      expect(profile.javaV167TemplateCompatibilityIntake.complete).toBe(true);
      expect(profile.miniKvV158CanonicalApprovalInputPrecheck.complete).toBe(true);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake.v1",
        activeNodeVersion: "Node v404",
        sourceNodeVersion: "Node v403",
        javaSourceVersion: "Java v167",
        miniKvSourceVersion: "mini-kv v158",
        readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: true,
        readyForRuntimeExecutionPacket: false,
        readyForRuntimeLiveReadGate: false,
        startsJavaService: false,
        startsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Java v167 Template Compatibility Intake");
      expect(markdown.body).toContain("mini-kv v158 Canonical Approval Input Precheck");
      expect(markdown.body).toContain("UPSTREAM_PRECHECK_IS_NOT_RUNTIME_APPROVAL");
      expect(markdown.body).toContain("CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_INPUT_NOT_PRESENT");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-404",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v404-canonical-precheck",
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
