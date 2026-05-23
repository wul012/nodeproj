import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake";

describe("managed audit manual sandbox connection credential resolver signed human approval artifact contract intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("defines a non-secret signed human approval artifact contract from the v312 paused prerequisite state", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1",
      contractState: "signed-human-approval-artifact-contract-intake-ready",
      governanceChainDecision: "continue-only-for-signed-human-approval-artifact-contract-intake",
      readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake: true,
      signedHumanApprovalArtifactContractIntakeOnly: true,
      readOnlyArtifactContract: true,
      consumesNodeV312GovernanceStopPrerequisiteClosureDecision: true,
      consumesNodeV313PrerequisiteCatalog: true,
      activeNodeContractVersion: "Node v314",
      targetPrerequisiteId: "signed-human-approval-artifact",
      nextJavaVersion: "Java v145",
      nextMiniKvVersion: "mini-kv v138",
      nextNodeVerificationVersion: "Node v315",
      readyForParallelJavaV145MiniKvV138Echo: true,
      readyForNodeV315BeforeUpstreamEcho: false,
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
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
      sourceNodeV312: {
        sourceVersion: "Node v312",
        decisionState: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready",
        readyForClosureDecision: true,
        completedPrerequisiteCount: 1,
        remainingPrerequisiteCount: 5,
        chainContinuationAllowed: false,
        nextConcretePrerequisiteContractRequired: true,
        completedPrerequisiteIds: ["java-mini-kv-decision-echo"],
      },
      signedArtifactContract: {
        artifactName: "managed-audit-signed-human-approval-artifact",
        artifactVersion: "signed-human-approval-artifact.v1",
        contractMode: "signed-human-approval-artifact-contract-intake-only",
        sourceSpan: "Node v312 + Node v313 catalog",
        targetPrerequisiteId: "signed-human-approval-artifact",
        requiredFieldCount: 11,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 8,
        upstreamEchoRequestCount: 2,
        implementationStillBlocked: true,
      },
      prerequisiteTransition: {
        prerequisiteId: "signed-human-approval-artifact",
        catalogLabel: "Signed human approval artifact",
        beforeV314: "still-missing",
        afterV314: "contract-intake-defined",
        closureRequiresUpstreamEcho: true,
        closesCredentialHandleApproval: false,
        closesEndpointHandleAllowlistApproval: false,
        closesNoNetworkSafetyFixture: false,
        closesAbortRollbackSemantics: false,
      },
      checks: {
        sourceNodeV312Ready: true,
        sourceNodeV312KeepsGovernancePaused: true,
        signedHumanApprovalArtifactStillMissingInSource: true,
        catalogTargetMatchesSignedArtifact: true,
        contractRequiredFieldsDocumented: true,
        contractProhibitedFieldsDocumented: true,
        rejectionReasonsDocumented: true,
        noGoBoundariesClosed: true,
        prerequisiteTransitionScopedToSignedArtifact: true,
        necessityProofDocumented: true,
        javaMiniKvEchoRequestExplicitlyParallel: true,
        contractStaysNonSecret: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        runtimeShellImplementationStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake: true,
      },
      summary: {
        sourceRemainingPrerequisiteCount: 5,
        requiredFieldCount: 11,
        prohibitedFieldCount: 8,
        rejectionReasonCount: 5,
        noGoBoundaryCount: 8,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV312.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.signedArtifactContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV312.remainingPrerequisiteIds).toEqual(expect.arrayContaining([
      "signed-human-approval-artifact",
      "credential-handle-approval",
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ]));
    expect(profile.signedArtifactContract.requiredFields.map((field) => field.id)).toEqual([
      "artifact_id",
      "approval_correlation_id",
      "operator_identity_handle",
      "signer_identity_handle",
      "policy_version",
      "artifact_digest",
      "issued_at",
      "expires_at",
      "review_status",
      "no_network_assertion",
      "rollback_abort_reference",
    ]);
    expect(profile.signedArtifactContract.prohibitedFields.map((field) => field.id)).toEqual(expect.arrayContaining([
      "credential_value",
      "raw_endpoint_url",
      "signing_private_key",
      "external_request_payload",
    ]));
    expect(profile.signedArtifactContract.upstreamEchoRequests.map((request) => request.version)).toEqual([
      "Java v145",
      "mini-kv v138",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("keeps historical fixture fallback available through the v312 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake({
      config: loadTestConfig(),
    });

    expect(profile.contractState).toBe("signed-human-approval-artifact-contract-intake-ready");
    expect(profile.sourceNodeV312.readyForClosureDecision).toBe(true);
    expect(profile.prerequisiteTransition.afterV314).toBe("contract-intake-defined");
    expect(profile.readyForParallelJavaV145MiniKvV138Echo).toBe(true);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.contractState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1",
        contractState: "signed-human-approval-artifact-contract-intake-ready",
        activeNodeContractVersion: "Node v314",
        targetPrerequisiteId: "signed-human-approval-artifact",
        readyForParallelJavaV145MiniKvV138Echo: true,
        signedArtifactContract: {
          artifactVersion: "signed-human-approval-artifact.v1",
          requiredFieldCount: 11,
          prohibitedFieldCount: 8,
        },
        prerequisiteTransition: {
          afterV314: "contract-intake-defined",
          closureRequiresUpstreamEcho: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver signed human approval artifact contract intake",
      );
      expect(markdown.body).toContain("signed-human-approval-artifact");
      expect(markdown.body).toContain("Java v145");
      expect(markdown.body).toContain("mini-kv v138");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-314",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v314-signed-human-artifact-contract",
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
