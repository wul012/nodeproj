import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan";

describe("managed audit manual sandbox connection credential resolver approval prerequisite artifact intake plan", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("defines the v306 artifact contract after the v305 upstream echo verification", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1",
      planState: "approval-prerequisite-artifact-intake-plan-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan: true,
      approvalPrerequisiteArtifactIntakePlanOnly: true,
      readOnlyArtifactContract: true,
      consumesNodeV305StopPrerequisiteUpstreamEchoVerification: true,
      sourceNodeVerificationVersion: "Node v305",
      nextJavaVersion: "Java v142",
      nextMiniKvVersion: "mini-kv v135",
      nextNodeVerificationVersion: "Node v307",
      readyForParallelJavaV142MiniKvV135Echo: true,
      readyForNodeV307BeforeUpstreamEcho: false,
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
      realResolverImplementationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
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
      sourceNodeV305: {
        sourceVersion: "Node v305",
        verificationState: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        sourceSpan: "Node v304 + Java v141 + mini-kv v134",
        upstreamEchoAligned: true,
        prerequisiteGateStillBlocked: true,
        sideEffectBoundariesAligned: true,
        prerequisiteCount: 6,
        missingRuntimePrerequisiteCount: 6,
        noGoConditionCount: 8,
        productionBlockerCount: 0,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        approvalLedgerWritten: false,
      },
      artifactIntakePlan: {
        artifactName: "managed-audit-runtime-shell-approval-prerequisite-artifact",
        artifactVersion: "approval-prerequisite-artifact.v1",
        intakeMode: "approval-prerequisite-artifact-intake-plan-only",
        sourceSpan: "Node v305 + planned Java v142 + planned mini-kv v135",
        requiredFieldCount: 12,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 9,
        noGoBoundaryCount: 12,
        javaMiniKvEchoCanRunInParallel: true,
        implementationStillBlocked: true,
      },
      necessityProof: {
        proofComplete: true,
        consumer: "Java v142 + mini-kv v135, then Node v307",
      },
      checks: {
        sourceNodeV305Ready: true,
        sourceNodeV305UpstreamEchoAligned: true,
        sourceNodeV305PrerequisiteGateBlocked: true,
        sourceNodeV305SideEffectsClosed: true,
        requiredArtifactFieldsDocumented: true,
        prohibitedArtifactFieldsDocumented: true,
        rejectionReasonsDocumented: true,
        noGoBoundariesClosed: true,
        necessityProofDocumented: true,
        javaMiniKvEchoRequestExplicitlyParallel: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        runtimeShellImplementationStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan: true,
      },
      summary: {
        prerequisiteCountFromNodeV305: 6,
        missingRuntimePrerequisiteCountFromNodeV305: 6,
        noGoConditionCountFromNodeV305: 8,
        requiredFieldCount: 12,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 9,
        noGoBoundaryCount: 12,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.artifactIntakePlan.artifactDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV305.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV305.sourceNodeV304DecisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.artifactIntakePlan.requiredFields.map((field) => field.id)).toEqual([
      "artifact_id",
      "source_node_verification",
      "operator_approval_reference",
      "credential_handle_review_status",
      "endpoint_handle_allowlist_review_status",
      "no_network_safety_test_reference",
      "manual_abort_semantics_reference",
      "rollback_semantics_reference",
      "java_echo_required_version",
      "mini_kv_receipt_required_version",
      "created_by_operator_identity",
      "audit_correlation_id",
    ]);
    expect(profile.artifactIntakePlan.prohibitedFields.map((field) => field.id)).toEqual(expect.arrayContaining([
      "credential_value",
      "raw_endpoint_url",
      "secret_provider_config",
      "resolver_client_config",
      "mini_kv_write_command",
    ]));
    expect(profile.artifactIntakePlan.rejectionReasons.map((reason) => reason.code)).toEqual(expect.arrayContaining([
      "CREDENTIAL_VALUE_PRESENT",
      "RAW_ENDPOINT_URL_PRESENT",
      "JAVA_OR_MINIKV_ECHO_MISSING",
      "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED",
      "WRITE_OR_SCHEMA_MUTATION_REQUESTED",
    ]));
    expect(profile.artifactIntakePlan.noGoBoundaries.every((boundary) => boundary.allowed === false)).toBe(true);
    expect(profile.artifactIntakePlan.upstreamEchoRequests).toEqual([
      expect.objectContaining({
        project: "java",
        version: "Java v142",
        canRunInParallel: true,
        mustRemainReadOnly: true,
      }),
      expect.objectContaining({
        project: "mini-kv",
        version: "mini-kv v135",
        canRunInParallel: true,
        mustRemainReadOnly: true,
      }),
    ]);
  });

  it("uses committed historical fallback through the v305 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({
      config: loadTestConfig(),
    });

    expect(profile.planState).toBe("approval-prerequisite-artifact-intake-plan-ready");
    expect(profile.sourceNodeV305.readyForUpstreamEchoVerification).toBe(true);
    expect(profile.checks.sourceNodeV305UpstreamEchoAligned).toBe(true);
    expect(profile.checks.sourceNodeV305PrerequisiteGateBlocked).toBe(true);
    expect(profile.readyForParallelJavaV142MiniKvV135Echo).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.planState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan)
      .toBe(false);
    expect(profile.readyForParallelJavaV142MiniKvV135Echo).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.runtimeShellInvocationAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1",
        planState: "approval-prerequisite-artifact-intake-plan-ready",
        sourceNodeVerificationVersion: "Node v305",
        nextJavaVersion: "Java v142",
        nextMiniKvVersion: "mini-kv v135",
        nextNodeVerificationVersion: "Node v307",
        readyForParallelJavaV142MiniKvV135Echo: true,
        artifactIntakePlan: {
          requiredFieldCount: 12,
          prohibitedFieldCount: 8,
          rejectionReasonCount: 9,
          noGoBoundaryCount: 12,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver approval prerequisite artifact intake plan",
      );
      expect(markdown.body).toContain("approval-prerequisite-artifact-intake-plan-ready");
      expect(markdown.body).toContain("Required Fields");
      expect(markdown.body).toContain("Prohibited Fields");
      expect(markdown.body).toContain("Upstream Echo Requests");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-306",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v306-artifact-intake-plan",
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
