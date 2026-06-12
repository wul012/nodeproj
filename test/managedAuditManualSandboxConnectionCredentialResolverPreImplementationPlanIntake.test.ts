import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver pre-implementation plan intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("turns the v268 missing requirements into ten defined pre-implementation boundaries", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1",
      planIntakeState: "credential-resolver-pre-implementation-plan-intake-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake: true,
      planIntakeOnly: true,
      readOnlyPlanIntake: true,
      readyForCredentialResolverPreImplementationPlan: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV269: {
        sourceVersion: "Node v269",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification.v1",
        verificationState:
          "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready",
        readyForBlockedDecisionUpstreamEchoVerification: true,
        sourceSpan: "Node v268 + Java v111 + mini-kv v118",
        sourceNodeV268Ready: true,
        javaV111EchoReady: true,
        miniKvV118NonParticipationReady: true,
        blockedDecisionAligned: true,
        missingRequirementBlockersAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        checkCount: 22,
        passedCheckCount: 22,
        sourceCheckCount: 25,
        sourcePassedCheckCount: 15,
        missingPreImplementationRequirementCount: 10,
        productionBlockerCount: 0,
        readyForCredentialResolverPreImplementationPlan: false,
        realResolverImplementationAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      },
      preImplementationPlan: {
        planVersion: "node-v270-credential-resolver-pre-implementation-plan-intake.v1",
        planMode: "plan-intake-only",
        sourceSpan: "Node v269",
        boundaryCount: 10,
        definedBoundaryCount: 10,
        allRequiredBoundariesDefined: true,
        realResolverImplementationAllowed: false,
        secretProviderRuntimeAllowed: false,
        credentialValueReadAllowed: false,
        rawEndpointUrlParseAllowed: false,
        externalRequestAllowed: false,
        schemaMigrationAllowed: false,
        approvalLedgerWriteAllowed: false,
        automaticUpstreamStartAllowed: false,
      },
      planIntake: {
        intakeMode: "node-v270-plan-intake-only",
        consumedNodeVersion: "Node v269",
        requiredBoundaryCount: 10,
        definedBoundaryCount: 10,
        missingBoundaryCount: 0,
        planDocumentPresent: true,
        credentialHandleBoundaryDefined: true,
        endpointHandleBoundaryDefined: true,
        secretProviderStubDefined: true,
        operatorApprovalBoundaryDefined: true,
        rollbackBoundaryDefined: true,
        redactionPolicyDefined: true,
        externalRequestSimulationDefined: true,
        schemaMigrationPolicyDefined: true,
        auditLedgerWritePolicyDefined: true,
        nextJavaEchoVersion: "Java v112",
        nextMiniKvReceiptVersion: "mini-kv v119",
        nextNodeVerificationVersion: "Node v272",
      },
      checks: {
        sourceNodeV269Ready: true,
        sourceNodeV269KeepsBlockedDecision: true,
        sourceNodeV269KeepsRealResolverBlocked: true,
        planDocumentPresent: true,
        credentialHandleBoundaryDefined: true,
        endpointHandleBoundaryDefined: true,
        secretProviderStubDefined: true,
        operatorApprovalBoundaryDefined: true,
        rollbackBoundaryDefined: true,
        redactionPolicyDefined: true,
        externalRequestSimulationDefined: true,
        schemaMigrationPolicyDefined: true,
        auditLedgerWritePolicyDefined: true,
        allTenBoundariesDefined: true,
        credentialValueStillForbidden: true,
        rawEndpointStillForbidden: true,
        secretProviderRuntimeStillDisabled: true,
        realResolverClientStillDisabled: true,
        externalRequestStillSimulationOnly: true,
        schemaMigrationStillReviewOnly: true,
        auditLedgerWriteStillReviewOnly: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake: true,
      },
      summary: {
        sourceCheckCount: 22,
        sourcePassedCheckCount: 22,
        boundaryCount: 10,
        definedBoundaryCount: 10,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV269.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preImplementationPlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.planIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preImplementationPlan.boundaries.map((boundary) => boundary.requirementFromV268)).toEqual([
      "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
      "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
      "ENDPOINT_HANDLE_BOUNDARY_MISSING",
      "SECRET_PROVIDER_STUB_MISSING",
      "OPERATOR_APPROVAL_BOUNDARY_MISSING",
      "ROLLBACK_BOUNDARY_MISSING",
      "REDACTION_POLICY_MISSING",
      "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
      "SCHEMA_MIGRATION_POLICY_MISSING",
      "AUDIT_LEDGER_WRITE_POLICY_MISSING",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.prohibitedActionCount).toBeGreaterThanOrEqual(20);
  });

  it("uses committed historical fixture fallback for source v269 checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({
      config: loadTestConfig(),
    });

    expect(profile.planIntakeState).toBe("credential-resolver-pre-implementation-plan-intake-ready");
    expect(profile.sourceNodeV269.readyForBlockedDecisionUpstreamEchoVerification).toBe(true);
    expect(profile.preImplementationPlan.allRequiredBoundariesDefined).toBe(true);
    expect(profile.readyForCredentialResolverPreImplementationPlan).toBe(true);
    expect(profile.realResolverImplementationAllowed).toBe(false);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.planIntakeState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake).toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.readyForCredentialResolverPreImplementationPlan).toBe(true);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1",
        planIntakeState: "credential-resolver-pre-implementation-plan-intake-ready",
        readyForCredentialResolverPreImplementationPlan: true,
        realResolverImplementationAllowed: false,
        sourceNodeV269: {
          sourceVersion: "Node v269",
          missingPreImplementationRequirementCount: 10,
          readyForCredentialResolverPreImplementationPlan: false,
        },
        preImplementationPlan: {
          boundaryCount: 10,
          definedBoundaryCount: 10,
          allRequiredBoundariesDefined: true,
        },
        planIntake: {
          nextJavaEchoVersion: "Java v112",
          nextMiniKvReceiptVersion: "mini-kv v119",
          nextNodeVerificationVersion: "Node v272",
        },
        checks: {
          allTenBoundariesDefined: true,
          credentialValueStillForbidden: true,
          rawEndpointStillForbidden: true,
          externalRequestStillSimulationOnly: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver pre-implementation plan intake",
      );
      expect(markdown.body).toContain("credential-resolver-pre-implementation-plan-intake-ready");
      expect(markdown.body).toContain("RUN_V271_STATUS_ROUTES_QUALITY_BRANCH");
      expect(markdown.body).toContain("RUN_PARALLEL_JAVA_V112_MINI_KV_V119");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-270",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v270-credential-resolver-pre-implementation-plan-intake",
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4370",
    ...overrides,
  });
}
