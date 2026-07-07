import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeRenderer.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake";

describe("managed audit manual sandbox connection credential resolver abort rollback semantics contract intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("defines a non-executing abort/rollback semantics contract after the v325 closure review", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake.v1",
      contractState: "abort-rollback-semantics-contract-intake-ready",
      governanceChainDecision: "continue-only-for-abort-rollback-semantics-contract-intake",
      readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake: true,
      abortRollbackSemanticsContractIntakeOnly: true,
      readOnlyAbortRollbackSemanticsContract: true,
      consumesNodeV325NoNetworkSafetyFixturePrerequisiteClosureReview: true,
      consumesNodeV313PrerequisiteCatalog: true,
      activeNodeContractVersion: "Node v326",
      targetPrerequisiteId: "abort-rollback-semantics",
      nextJavaVersion: "Java v150",
      nextMiniKvVersion: "mini-kv v142",
      nextNodeVerificationVersion: "Node v327",
      readyForParallelJavaV150MiniKvV142Echo: true,
      readyForNodeV327BeforeUpstreamEcho: false,
      readyForFinalPrerequisiteClosureReview: false,
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
      runtimeShellCommandRendered: false,
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
      abortRollbackSemanticsExecuted: false,
      rollbackExecutionAllowed: false,
      deploymentActionAllowed: false,
      javaSqlExecutionAllowed: false,
      miniKvWriteCommandAllowed: false,
      httpRequestSent: false,
      tcpConnectionAttempted: false,
      networkSocketOpened: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV325: {
        sourceVersion: "Node v325",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review.v1",
        reviewState: "no-network-safety-fixture-prerequisite-closure-review-ready",
        readyForNoNetworkSafetyFixturePrerequisiteClosureReview: true,
        prerequisiteClosureDecision: "advance-no-network-safety-fixture-only",
        completedPrerequisiteCount: 5,
        remainingPrerequisiteCount: 1,
        originalPrerequisiteCount: 6,
        nextConcretePrerequisiteId: "abort-rollback-semantics",
        nextConcretePrerequisiteContractRequired: true,
        nextNodeVersionSuggested: "Node v326",
        chainContinuationAllowed: true,
        runtimeShellStillBlocked: true,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        networkSafetyFixtureExecuted: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        networkSocketOpened: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      abortRollbackSemanticsContract: {
        contractName: "managed-audit-abort-rollback-semantics",
        contractVersion: "abort-rollback-semantics.v1",
        contractMode: "abort-rollback-semantics-contract-intake-only",
        sourceSpan: "Node v325 closure review + Node v313 catalog",
        targetPrerequisiteId: "abort-rollback-semantics",
        requiredFieldCount: 10,
        prohibitedFieldCount: 14,
        rejectionReasonCount: 6,
        noGoBoundaryCount: 11,
        upstreamEchoRequestCount: 2,
        implementationStillBlocked: true,
        abortRollbackExecutionAllowed: false,
      },
      prerequisiteTransition: {
        prerequisiteId: "abort-rollback-semantics",
        catalogLabel: "Abort and rollback semantics",
        beforeV326: "still-missing",
        afterV326: "contract-intake-defined",
        closureRequiresUpstreamEcho: true,
        completedPrerequisiteCountBeforeV326: 5,
        remainingPrerequisiteCountBeforeV326: 1,
        preservesSignedHumanApprovalArtifactClosure: true,
        preservesCredentialHandleApprovalClosure: true,
        preservesEndpointHandleAllowlistApprovalClosure: true,
        preservesNoNetworkSafetyFixtureClosure: true,
        closesAbortRollbackSemantics: false,
      },
      checks: {
        sourceNodeV325Ready: true,
        sourceNodeV325PointsToAbortRollbackSemantics: true,
        sourceNodeV325KeepsRuntimeBlocked: true,
        sourceNodeV325KeepsSideEffectsClosed: true,
        abortRollbackSemanticsStillMissingInSource: true,
        catalogTargetMatchesAbortRollbackSemantics: true,
        contractRequiredFieldsDocumented: true,
        contractProhibitedFieldsDocumented: true,
        rejectionReasonsDocumented: true,
        noGoBoundariesClosed: true,
        prerequisiteTransitionScopedToAbortRollbackSemantics: true,
        necessityProofDocumented: true,
        javaMiniKvEchoRequestExplicitlyParallel: true,
        contractStaysNonSecretAndNonExecuting: true,
        abortRollbackExecutionStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        runtimeShellImplementationStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake: true,
      },
      summary: {
        sourceCompletedPrerequisiteCount: 5,
        sourceRemainingPrerequisiteCount: 1,
        requiredFieldCount: 10,
        prohibitedFieldCount: 14,
        rejectionReasonCount: 6,
        noGoBoundaryCount: 11,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV325.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.abortRollbackSemanticsContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV325.remainingPrerequisiteIds).toEqual(["abort-rollback-semantics"]);
    expect(profile.abortRollbackSemanticsContract.requiredFields.map((field) => field.id)).toEqual([
      "manual_abort_marker",
      "rollback_runbook_reference",
      "operator_confirmation_handle",
      "approval_correlation_id",
      "cleanup_evidence_marker",
      "idempotent_noop_failure_policy",
      "rollback_authority_boundary",
      "abort_reason_code",
      "recovery_checkpoint_reference",
      "audit_digest",
    ]);
    expect(profile.abortRollbackSemanticsContract.prohibitedFields.map((field) => field.id)).toEqual(
      expect.arrayContaining([
        "credential_value",
        "raw_endpoint_url",
        "runtime_shell_command",
        "rollback_execution_action",
        "mini_kv_write_command",
        "java_sql_execution",
      ]),
    );
    expect(profile.abortRollbackSemanticsContract.upstreamEchoRequests.map((request) => request.version)).toEqual([
      "Java v150",
      "mini-kv v142",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    const normalizedMarkdown =
      renderManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeMarkdown({
        ...profile,
        generatedAt: "2026-07-07T00:00:00.000Z",
      });
    expect(normalizedMarkdown.endsWith("\n")).toBe(true);
    expect(normalizedMarkdown.match(/^## /gm)).toHaveLength(11);
    expect(normalizedMarkdown.match(/^### /gm)).toHaveLength(5);
    expect(normalizedMarkdown.length).toBe(13_704);
    expect(sha256(normalizedMarkdown)).toBe("e0e36ab78e4ca9c6ecd526268390353cb0b78a935c9d88e05f977ea1bcf57e6d");
  }, 180_000);

  it("keeps the v325 historical fixture fallback path available", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake({
      config: loadTestConfig(),
    });

    expect(profile.contractState).toBe("abort-rollback-semantics-contract-intake-ready");
    expect(profile.sourceNodeV325.readyForNoNetworkSafetyFixturePrerequisiteClosureReview).toBe(true);
    expect(profile.prerequisiteTransition.afterV326).toBe("contract-intake-defined");
    expect(profile.readyForParallelJavaV150MiniKvV142Echo).toBe(true);
    expect(profile.readyForNodeV327BeforeUpstreamEcho).toBe(false);
  }, 180_000);

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.contractState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.abortRollbackSemanticsExecuted).toBe(false);
    expect(profile.rollbackExecutionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake.v1",
        contractState: "abort-rollback-semantics-contract-intake-ready",
        activeNodeContractVersion: "Node v326",
        targetPrerequisiteId: "abort-rollback-semantics",
        readyForParallelJavaV150MiniKvV142Echo: true,
        abortRollbackSemanticsContract: {
          contractVersion: "abort-rollback-semantics.v1",
          requiredFieldCount: 10,
          prohibitedFieldCount: 14,
          abortRollbackExecutionAllowed: false,
        },
        prerequisiteTransition: {
          afterV326: "contract-intake-defined",
          closureRequiresUpstreamEcho: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver abort/rollback semantics contract intake",
      );
      expect(markdown.body).toContain("abort-rollback-semantics");
      expect(markdown.body).toContain("Java v150");
      expect(markdown.body).toContain("mini-kv v142");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-326",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v326-abort-rollback-contract-intake",
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

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}
