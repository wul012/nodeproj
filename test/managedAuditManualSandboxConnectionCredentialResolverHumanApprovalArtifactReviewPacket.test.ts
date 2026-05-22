import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet";

describe("managed audit manual sandbox connection credential resolver human approval artifact review packet", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("defines the v308 human approval artifact review packet after Node v307 upstream echo alignment", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1",
      reviewPacketState: "human-approval-artifact-review-packet-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket: true,
      humanApprovalArtifactReviewPacketOnly: true,
      readOnlyReviewPacketContract: true,
      consumesNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification: true,
      activeNodeReviewVersion: "Node v308",
      nextJavaVersion: "Java v143",
      nextMiniKvVersion: "mini-kv v136",
      nextNodeVerificationVersion: "Node v309",
      readyForParallelJavaV143MiniKvV136Echo: true,
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
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueProvided: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV307: {
        sourceVersion: "Node v307",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1",
        verificationState: "approval-prerequisite-artifact-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        verificationMode: "approval-prerequisite-artifact-upstream-echo-verification-only",
        sourceSpan: "Node v306 + Java v142 + mini-kv v135",
        upstreamEchoAligned: true,
        artifactContractAligned: true,
        sideEffectBoundariesAligned: true,
        sourceNodeV306PlanState: "approval-prerequisite-artifact-intake-plan-ready",
        sourceNodeV306RequiredFieldCount: 12,
        sourceNodeV306ProhibitedFieldCount: 8,
        sourceNodeV306RejectionReasonCount: 9,
        sourceNodeV306NoGoBoundaryCount: 12,
        sourceNodeV306UpstreamEchoRequestCount: 2,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      reviewPacket: {
        packetName: "managed-audit-runtime-shell-human-approval-artifact-review-packet",
        packetVersion: "human-approval-artifact-review-packet.v1",
        reviewMode: "human-approval-artifact-review-packet-contract-only",
        sourceSpan: "Node v307",
        requiredFieldCount: 9,
        prohibitedFieldCount: 9,
        rejectionReasonCount: 13,
        missingFieldCheckCount: 9,
        noGoBoundaryCount: 12,
        upstreamEchoRequestCount: 2,
        implementationStillBlocked: true,
      },
      necessityProof: {
        nextConsumer: "Java v143 + mini-kv v136, then Node v309",
      },
      checks: {
        sourceNodeV307Ready: true,
        sourceNodeV307UpstreamEchoAligned: true,
        sourceNodeV307ArtifactContractAligned: true,
        sourceNodeV307SideEffectsClosed: true,
        requiredReviewFieldsDocumented: true,
        prohibitedReviewFieldsDocumented: true,
        rejectionReasonsDocumented: true,
        missingFieldChecksDocumented: true,
        noGoBoundariesClosed: true,
        necessityProofDocumented: true,
        javaMiniKvEchoRequestExplicitlyParallel: true,
        reviewPacketStaysContractOnly: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        runtimeShellImplementationStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket: true,
      },
      summary: {
        requiredFieldCount: 9,
        prohibitedFieldCount: 9,
        rejectionReasonCount: 13,
        missingFieldCheckCount: 9,
        noGoBoundaryCount: 12,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV307.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.reviewPacket.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.reviewPacket.requiredFields.map((field) => field.id)).toEqual([
      "artifact_id",
      "operator_approval_reference",
      "credential_handle_review_status",
      "endpoint_handle_allowlist_review_status",
      "no_network_safety_test_reference",
      "manual_abort_semantics_reference",
      "rollback_semantics_reference",
      "created_by_operator_identity",
      "audit_correlation_id",
    ]);
    expect(profile.reviewPacket.prohibitedFields.map((field) => field.id)).toEqual(expect.arrayContaining([
      "credential_value",
      "raw_endpoint_url",
      "secret_provider_config",
      "resolver_client_config",
      "external_request_payload",
      "approval_ledger_mutation",
      "schema_migration_sql",
      "mini_kv_write_command",
      "runtime_shell_invocation_request",
    ]));
    expect(profile.reviewPacket.upstreamEchoRequests).toEqual([
      {
        project: "java",
        version: "Java v143",
        mode: "read-only-human-approval-artifact-review-packet-echo",
        canRunInParallel: true,
        requiredBeforeNodeV309: true,
      },
      {
        project: "mini-kv",
        version: "mini-kv v136",
        mode: "read-only-human-approval-artifact-review-non-participation-receipt",
        canRunInParallel: true,
        requiredBeforeNodeV309: true,
      },
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("uses historical sibling fallback through the v307 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({
      config: loadTestConfig(),
    });

    expect(profile.reviewPacketState).toBe("human-approval-artifact-review-packet-ready");
    expect(profile.sourceNodeV307.sourceChecks.javaV142EvidencePresent).toBe(true);
    expect(profile.sourceNodeV307.sourceChecks.miniKvV135EvidencePresent).toBe(true);
    expect(profile.sourceNodeV307.sourceChecks.upstreamEchoesAligned).toBe(true);
    expect(profile.sourceNodeV307.sourceChecks.sideEffectBoundariesAligned).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewPacketState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.runtimeShellInvocationAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1",
        reviewPacketState: "human-approval-artifact-review-packet-ready",
        activeNodeReviewVersion: "Node v308",
        nextJavaVersion: "Java v143",
        nextMiniKvVersion: "mini-kv v136",
        nextNodeVerificationVersion: "Node v309",
        reviewPacket: {
          requiredFieldCount: 9,
          prohibitedFieldCount: 9,
          noGoBoundaryCount: 12,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver human approval artifact review packet",
      );
      expect(markdown.body).toContain("human-approval-artifact-review-packet-ready");
      expect(markdown.body).toContain("Required Fields");
      expect(markdown.body).toContain("Upstream Echo Requests");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-308",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v308-human-approval-artifact-review-packet",
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
