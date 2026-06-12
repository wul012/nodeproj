import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver human approval artifact review upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v143 and mini-kv v136 echoes after the Node v308 review packet", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1",
      verificationState: "human-approval-artifact-review-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      humanApprovalArtifactReviewUpstreamEchoVerificationOnly: true,
      consumesNodeV308HumanApprovalArtifactReviewPacket: true,
      consumesJavaV143HumanApprovalArtifactReviewPacketEcho: true,
      consumesMiniKvV136HumanApprovalArtifactReviewNonParticipationReceipt: true,
      activeNodeVerificationVersion: "Node v309",
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
    });
    expect(profile.sourceNodeV308.reviewPacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV308.reviewPacketState).toBe("human-approval-artifact-review-packet-ready");
    expect(profile.sourceNodeV308.readyForHumanApprovalArtifactReviewPacket).toBe(true);
    expect(profile.sourceNodeV308.nextJavaVersion).toBe("Java v143");
    expect(profile.sourceNodeV308.nextMiniKvVersion).toBe("mini-kv v136");
    expect(profile.sourceNodeV308.nextNodeVerificationVersion).toBe("Node v309");
    expect(profile.sourceNodeV308.readyForParallelJavaV143MiniKvV136Echo).toBe(true);
    expect(profile.sourceNodeV308.requiredFieldIds).toEqual([
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
    expect(profile.sourceNodeV308.prohibitedFieldIds).toEqual([
      "credential_value",
      "raw_endpoint_url",
      "secret_provider_config",
      "resolver_client_config",
      "external_request_payload",
      "approval_ledger_mutation",
      "schema_migration_sql",
      "mini_kv_write_command",
      "runtime_shell_invocation_request",
    ]);
    expect(profile.sourceNodeV308.rejectionReasonCodes).toEqual([
      "MISSING_ARTIFACT_ID",
      "MISSING_OPERATOR_APPROVAL_REFERENCE",
      "MISSING_CREDENTIAL_HANDLE_REVIEW_STATUS",
      "MISSING_ENDPOINT_HANDLE_ALLOWLIST_REVIEW_STATUS",
      "MISSING_NO_NETWORK_SAFETY_TEST_REFERENCE",
      "MISSING_ABORT_OR_ROLLBACK_SEMANTICS",
      "CREDENTIAL_VALUE_PRESENT",
      "RAW_ENDPOINT_URL_PRESENT",
      "PROVIDER_OR_CLIENT_CONFIG_PRESENT",
      "EXTERNAL_REQUEST_REQUESTED",
      "WRITE_OR_SCHEMA_MUTATION_REQUESTED",
      "MINI_KV_WRITE_OR_AUTHORITY_REQUESTED",
      "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED",
    ]);
    expect(profile.sourceNodeV308.missingFieldCheckCodes).toEqual([
      "MISSING_ARTIFACT_ID",
      "MISSING_OPERATOR_APPROVAL_REFERENCE",
      "MISSING_CREDENTIAL_HANDLE_REVIEW_STATUS",
      "MISSING_ENDPOINT_HANDLE_ALLOWLIST_REVIEW_STATUS",
      "MISSING_NO_NETWORK_SAFETY_TEST_REFERENCE",
      "MISSING_MANUAL_ABORT_SEMANTICS_REFERENCE",
      "MISSING_ROLLBACK_SEMANTICS_REFERENCE",
      "MISSING_CREATED_BY_OPERATOR_IDENTITY",
      "MISSING_AUDIT_CORRELATION_ID",
    ]);
    expect(profile.sourceNodeV308.noGoBoundaryIds).toEqual([
      "credential_value_read",
      "raw_endpoint_url_parse",
      "secret_provider_instantiation",
      "resolver_client_instantiation",
      "fake_provider_or_client",
      "external_http_or_tcp_request",
      "runtime_shell_implementation",
      "runtime_shell_invocation",
      "approval_ledger_write",
      "schema_migration",
      "mini_kv_write_or_authority",
      "automatic_upstream_start",
    ]);
    expect(profile.sourceNodeV308.upstreamEchoRequestVersions).toEqual(["Java v143", "mini-kv v136"]);
    expect(profile.sourceNodeV308.sourceNodeV307.readyForUpstreamEchoVerification).toBe(true);
    expect(profile.sourceNodeV308.sourceNodeV307.sourceChecks.javaV142EvidencePresent).toBe(true);
    expect(profile.sourceNodeV308.sourceNodeV307.sourceChecks.miniKvV135EvidencePresent).toBe(true);
    expect(profile.upstreamEvidence.javaV143.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV136.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification)
      .toBe(true);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("uses historical sibling fallback through the v308 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("human-approval-artifact-review-upstream-echo-verification-ready");
    expect(profile.sourceNodeV308.sourceNodeV307.sourceChecks.javaV142EvidencePresent).toBe(true);
    expect(profile.sourceNodeV308.sourceNodeV307.sourceChecks.miniKvV135EvidencePresent).toBe(true);
    expect(profile.checks.upstreamEchoesAligned).toBe(true);
    expect(profile.checks.reviewPacketContractAligned).toBe(true);
    expect(profile.checks.sideEffectBoundariesAligned).toBe(true);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1",
        verificationState: "human-approval-artifact-review-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v309",
        upstreamEvidence: {
          javaV143: {
            readyForNodeV309: true,
            reviewPacketContractEchoed: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV136: {
            readyForNodeV309: true,
            requiredFieldCount: 9,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          reviewPacketContractAligned: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver human approval artifact review upstream echo verification",
      );
      expect(markdown.body).toContain("human-approval-artifact-review-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v143 Echo");
      expect(markdown.body).toContain("mini-kv v136 Receipt");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-309",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v309-human-approval-artifact-review-upstream-echo-verification",
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
