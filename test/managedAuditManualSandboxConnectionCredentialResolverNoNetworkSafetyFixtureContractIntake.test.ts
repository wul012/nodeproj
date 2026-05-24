import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake";

describe("managed audit manual sandbox connection credential resolver no-network safety fixture contract intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("defines a non-executing no-network safety fixture contract after the v322 closure review", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1",
      contractState: "no-network-safety-fixture-contract-intake-ready",
      governanceChainDecision: "continue-only-for-no-network-safety-fixture-contract-intake",
      readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake: true,
      noNetworkSafetyFixtureContractIntakeOnly: true,
      readOnlyNoNetworkSafetyFixtureContract: true,
      consumesNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReview: true,
      consumesNodeV313PrerequisiteCatalog: true,
      activeNodeContractVersion: "Node v323",
      targetPrerequisiteId: "no-network-safety-fixture",
      nextJavaVersion: "Java v149",
      nextMiniKvVersion: "mini-kv v141",
      nextNodeVerificationVersion: "Node v324",
      readyForParallelJavaV149MiniKvV141Echo: true,
      readyForNodeV324BeforeUpstreamEcho: false,
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
      networkSafetyFixtureExecuted: false,
      httpRequestSent: false,
      tcpConnectionAttempted: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV322: {
        sourceVersion: "Node v322",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review.v1",
        reviewState: "endpoint-handle-allowlist-approval-prerequisite-closure-review-ready",
        readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview: true,
        completedPrerequisiteCount: 4,
        remainingPrerequisiteCount: 2,
        originalPrerequisiteCount: 6,
        nextConcretePrerequisiteId: "no-network-safety-fixture",
        nextConcretePrerequisiteContractRequired: true,
        nextNodeVersionSuggested: "Node v323",
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
      noNetworkSafetyFixtureContract: {
        contractName: "managed-audit-no-network-safety-fixture",
        contractVersion: "no-network-safety-fixture.v1",
        contractMode: "no-network-safety-fixture-contract-intake-only",
        sourceSpan: "Node v322 closure review + Node v313 catalog",
        targetPrerequisiteId: "no-network-safety-fixture",
        requiredFieldCount: 10,
        prohibitedFieldCount: 12,
        rejectionReasonCount: 6,
        noGoBoundaryCount: 10,
        upstreamEchoRequestCount: 2,
        implementationStillBlocked: true,
        fixtureExecutionAllowed: false,
      },
      prerequisiteTransition: {
        prerequisiteId: "no-network-safety-fixture",
        catalogLabel: "No-network safety fixture",
        beforeV323: "still-missing",
        afterV323: "contract-intake-defined",
        closureRequiresUpstreamEcho: true,
        completedPrerequisiteCountBeforeV323: 4,
        remainingPrerequisiteCountBeforeV323: 2,
        preservesSignedHumanApprovalArtifactClosure: true,
        preservesCredentialHandleApprovalClosure: true,
        preservesEndpointHandleAllowlistApprovalClosure: true,
        closesNoNetworkSafetyFixture: false,
        closesAbortRollbackSemantics: false,
      },
      checks: {
        sourceNodeV322Ready: true,
        sourceNodeV322PointsToNoNetworkSafetyFixture: true,
        sourceNodeV322KeepsRuntimeBlocked: true,
        sourceNodeV322KeepsSideEffectsClosed: true,
        noNetworkSafetyFixtureStillMissingInSource: true,
        catalogTargetMatchesNoNetworkSafetyFixture: true,
        contractRequiredFieldsDocumented: true,
        contractProhibitedFieldsDocumented: true,
        rejectionReasonsDocumented: true,
        noGoBoundariesClosed: true,
        prerequisiteTransitionScopedToNoNetworkSafetyFixture: true,
        necessityProofDocumented: true,
        javaMiniKvEchoRequestExplicitlyParallel: true,
        contractStaysNoNetworkAndNonSecret: true,
        fixtureExecutionStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        runtimeShellImplementationStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake: true,
      },
      summary: {
        sourceCompletedPrerequisiteCount: 4,
        sourceRemainingPrerequisiteCount: 2,
        requiredFieldCount: 10,
        prohibitedFieldCount: 12,
        rejectionReasonCount: 6,
        noGoBoundaryCount: 10,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV322.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.noNetworkSafetyFixtureContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV322.remainingPrerequisiteIds).toEqual([
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ]);
    expect(profile.noNetworkSafetyFixtureContract.requiredFields.map((field) => field.id)).toEqual([
      "fixture_id",
      "operator_confirmation_handle",
      "approval_correlation_id",
      "transport_denial_policy_id",
      "expected_denied_transport_classes",
      "required_denial_evidence",
      "forbidden_network_actions",
      "cleanup_marker",
      "timeout_budget_ms",
      "audit_digest",
    ]);
    expect(profile.noNetworkSafetyFixtureContract.prohibitedFields.map((field) => field.id)).toEqual(
      expect.arrayContaining([
        "credential_value",
        "raw_endpoint_url",
        "network_socket_open",
        "http_request_execution",
        "tcp_connection_attempt",
        "upstream_process_start",
        "runtime_shell_invocation",
      ]),
    );
    expect(profile.noNetworkSafetyFixtureContract.upstreamEchoRequests.map((request) => request.version)).toEqual([
      "Java v149",
      "mini-kv v141",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("keeps the v322 historical fixture fallback path available", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake({
      config: loadTestConfig(),
    });

    expect(profile.contractState).toBe("no-network-safety-fixture-contract-intake-ready");
    expect(profile.sourceNodeV322.readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview).toBe(true);
    expect(profile.prerequisiteTransition.afterV323).toBe("contract-intake-defined");
    expect(profile.readyForParallelJavaV149MiniKvV141Echo).toBe(true);
    expect(profile.readyForNodeV324BeforeUpstreamEcho).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.contractState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1",
        contractState: "no-network-safety-fixture-contract-intake-ready",
        activeNodeContractVersion: "Node v323",
        targetPrerequisiteId: "no-network-safety-fixture",
        readyForParallelJavaV149MiniKvV141Echo: true,
        noNetworkSafetyFixtureContract: {
          contractVersion: "no-network-safety-fixture.v1",
          requiredFieldCount: 10,
          prohibitedFieldCount: 12,
          fixtureExecutionAllowed: false,
        },
        prerequisiteTransition: {
          afterV323: "contract-intake-defined",
          closureRequiresUpstreamEcho: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver no-network safety fixture contract intake",
      );
      expect(markdown.body).toContain("no-network-safety-fixture");
      expect(markdown.body).toContain("Java v149");
      expect(markdown.body).toContain("mini-kv v141");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-323",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v323-no-network-fixture-contract-intake",
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
