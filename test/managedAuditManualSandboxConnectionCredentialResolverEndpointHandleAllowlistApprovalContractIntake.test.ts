import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake";

describe("managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("defines a non-secret endpoint handle allowlist approval contract after the v319 closure review", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake.v1",
      contractState: "endpoint-handle-allowlist-approval-contract-intake-ready",
      governanceChainDecision: "continue-only-for-endpoint-handle-allowlist-approval-contract-intake",
      readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake: true,
      endpointHandleAllowlistApprovalContractIntakeOnly: true,
      readOnlyEndpointHandleAllowlistApprovalContract: true,
      consumesNodeV319CredentialHandleApprovalPrerequisiteClosureReview: true,
      consumesNodeV313PrerequisiteCatalog: true,
      activeNodeContractVersion: "Node v320",
      targetPrerequisiteId: "endpoint-handle-allowlist-approval",
      nextJavaVersion: "Java v147",
      nextMiniKvVersion: "mini-kv v140",
      nextNodeVerificationVersion: "Node v321",
      readyForParallelJavaV147MiniKvV140Echo: true,
      readyForNodeV321BeforeUpstreamEcho: false,
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
      endpointHandleAllowlistApproved: false,
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
      sourceNodeV319: {
        sourceVersion: "Node v319",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review.v1",
        reviewState: "credential-handle-approval-prerequisite-closure-review-ready",
        readyForCredentialHandleApprovalPrerequisiteClosureReview: true,
        completedPrerequisiteCount: 3,
        remainingPrerequisiteCount: 3,
        originalPrerequisiteCount: 6,
        nextConcretePrerequisiteId: "endpoint-handle-allowlist-approval",
        nextConcretePrerequisiteContractRequired: true,
        nextNodeVersionSuggested: "Node v320",
        chainContinuationAllowed: true,
        runtimeShellStillBlocked: true,
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
      endpointHandleAllowlistApprovalContract: {
        contractName: "managed-audit-endpoint-handle-allowlist-approval",
        contractVersion: "endpoint-handle-allowlist-approval.v1",
        contractMode: "endpoint-handle-allowlist-approval-contract-intake-only",
        sourceSpan: "Node v319 closure review + Node v313 catalog",
        targetPrerequisiteId: "endpoint-handle-allowlist-approval",
        requiredFieldCount: 10,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 9,
        upstreamEchoRequestCount: 2,
        implementationStillBlocked: true,
      },
      prerequisiteTransition: {
        prerequisiteId: "endpoint-handle-allowlist-approval",
        catalogLabel: "Endpoint handle allowlist approval",
        beforeV320: "still-missing",
        afterV320: "contract-intake-defined",
        closureRequiresUpstreamEcho: true,
        completedPrerequisiteCountBeforeV320: 3,
        remainingPrerequisiteCountBeforeV320: 3,
        preservesSignedHumanApprovalArtifactClosure: true,
        preservesCredentialHandleApprovalClosure: true,
        closesEndpointHandleAllowlistApproval: false,
        closesNoNetworkSafetyFixture: false,
        closesAbortRollbackSemantics: false,
      },
      checks: {
        sourceNodeV319Ready: true,
        sourceNodeV319PointsToEndpointHandleAllowlist: true,
        sourceNodeV319KeepsRuntimeBlocked: true,
        sourceNodeV319KeepsSideEffectsClosed: true,
        endpointHandleAllowlistApprovalStillMissingInSource: true,
        catalogTargetMatchesEndpointHandleAllowlist: true,
        contractRequiredFieldsDocumented: true,
        contractProhibitedFieldsDocumented: true,
        rejectionReasonsDocumented: true,
        noGoBoundariesClosed: true,
        prerequisiteTransitionScopedToEndpointHandleAllowlist: true,
        necessityProofDocumented: true,
        javaMiniKvEchoRequestExplicitlyParallel: true,
        contractStaysNonSecret: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        runtimeShellImplementationStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake: true,
      },
      summary: {
        sourceCompletedPrerequisiteCount: 3,
        sourceRemainingPrerequisiteCount: 3,
        requiredFieldCount: 10,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 9,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV319.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.endpointHandleAllowlistApprovalContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV319.remainingPrerequisiteIds).toEqual([
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ]);
    expect(profile.endpointHandleAllowlistApprovalContract.requiredFields.map((field) => field.id)).toEqual([
      "endpoint_handle",
      "approval_correlation_id",
      "operator_identity_handle",
      "reviewer_identity_handle",
      "policy_version",
      "approval_status",
      "issued_at",
      "expires_at",
      "revocation_marker",
      "audit_digest",
    ]);
    expect(profile.endpointHandleAllowlistApprovalContract.prohibitedFields.map((field) => field.id)).toEqual(
      expect.arrayContaining([
        "credential_value",
        "raw_endpoint_url",
        "secret_provider_config",
        "resolver_client_config",
        "external_request_payload",
        "approval_ledger_mutation",
        "schema_migration_sql",
      ]),
    );
    expect(profile.endpointHandleAllowlistApprovalContract.upstreamEchoRequests.map((request) => request.version)).toEqual([
      "Java v147",
      "mini-kv v140",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("keeps the v319 historical fixture fallback path available", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake({
      config: loadTestConfig(),
    });

    expect(profile.contractState).toBe("endpoint-handle-allowlist-approval-contract-intake-ready");
    expect(profile.sourceNodeV319.readyForCredentialHandleApprovalPrerequisiteClosureReview).toBe(true);
    expect(profile.prerequisiteTransition.afterV320).toBe("contract-intake-defined");
    expect(profile.readyForParallelJavaV147MiniKvV140Echo).toBe(true);
    expect(profile.readyForNodeV321BeforeUpstreamEcho).toBe(false);
  }, 180_000);

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.contractState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.secretProviderInstantiated).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  }, 180_000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake.v1",
        contractState: "endpoint-handle-allowlist-approval-contract-intake-ready",
        activeNodeContractVersion: "Node v320",
        targetPrerequisiteId: "endpoint-handle-allowlist-approval",
        readyForParallelJavaV147MiniKvV140Echo: true,
        endpointHandleAllowlistApprovalContract: {
          contractVersion: "endpoint-handle-allowlist-approval.v1",
          requiredFieldCount: 10,
          prohibitedFieldCount: 8,
        },
        prerequisiteTransition: {
          afterV320: "contract-intake-defined",
          closureRequiresUpstreamEcho: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract intake",
      );
      expect(markdown.body).toContain("endpoint-handle-allowlist-approval");
      expect(markdown.body).toContain("Java v147");
      expect(markdown.body).toContain("mini-kv v140");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-320",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v320-endpoint-handle-contract",
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


