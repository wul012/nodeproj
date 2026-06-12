import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver production readiness decision gate", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("blocks real credential resolver pre-implementation until the required boundaries are planned", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1",
      decisionGateState: "blocked",
      readinessDecision: "blocked",
      decisionGateEvaluated: true,
      productionReadinessGateOnly: true,
      readOnlyDecisionGate: true,
      readyForCredentialResolverPreImplementationPlan: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
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
      automaticUpstreamStart: false,
      sourceNodeV267: {
        sourceVersion: "Node v267",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification.v1",
        verificationState: "credential-resolver-fake-shell-archive-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        sourceSpan: "Node v266 + Java v110 + mini-kv v117",
        sourceNodeV266Ready: true,
        javaV110EchoReady: true,
        miniKvV117NonParticipationReady: true,
        archiveCountsAligned: true,
        archiveSnippetsAligned: true,
        archiveNoRerunAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        nodeV267BlocksRealResolver: true,
        checkCount: 18,
        passedCheckCount: 18,
        archiveFileCount: 9,
        evidenceFileCount: 7,
        requiredSnippetCount: 24,
        matchedSnippetCount: 32,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
        readOnlyUpstreamEchoVerification: true,
        archiveVerificationOnly: true,
        readyForManagedAuditSandboxAdapterConnection: false,
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
        automaticUpstreamStart: false,
      },
      preImplementationRequirements: {
        planDocumentPresent: false,
        credentialHandleBoundaryDefined: false,
        endpointHandleBoundaryDefined: false,
        secretProviderStubDefined: false,
        operatorApprovalBoundaryDefined: false,
        rollbackBoundaryDefined: false,
        redactionPolicyDefined: false,
        externalRequestSimulationDefined: false,
        schemaMigrationPolicyDefined: false,
        auditLedgerWritePolicyDefined: false,
      },
      productionReadinessDecision: {
        decisionMode: "node-v268-production-readiness-decision-gate-only",
        sourceSpan: "Node v267",
        decision: "blocked",
        allowsRealResolverPreImplementationPlan: false,
        allowsRealCredentialResolverImplementation: false,
        allowsSecretProviderStub: false,
        allowsSecretProviderRuntime: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsManagedAuditConnection: false,
        allowsSchemaMigration: false,
        allowsApprovalLedgerWrite: false,
        allowsAutomaticUpstreamStart: false,
        nextPlanRequiredBeforeImplementation: true,
      },
      checks: {
        decisionGateEvaluated: true,
        sourceNodeV267Ready: true,
        sourceNodeV267BlocksRealResolver: true,
        archiveEchoChainReady: true,
        credentialBoundaryStillClosed: true,
        rawEndpointBoundaryStillClosed: true,
        resolverBoundaryStillClosed: true,
        connectionBoundaryStillClosed: true,
        writeBoundaryStillClosed: true,
        autoStartBoundaryStillClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        preImplementationPlanPresent: false,
        credentialHandleBoundaryDefined: false,
        endpointHandleBoundaryDefined: false,
        secretProviderStubDefined: false,
        operatorApprovalBoundaryDefined: false,
        rollbackBoundaryDefined: false,
        redactionPolicyDefined: false,
        externalRequestSimulationDefined: false,
        schemaMigrationPolicyDefined: false,
        auditLedgerWritePolicyDefined: false,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        realResolverImplementationStillBlocked: true,
      },
      summary: {
        checkCount: 25,
        passedCheckCount: 15,
        sourceCheckCount: 18,
        sourcePassedCheckCount: 18,
        archiveFileCount: 9,
        evidenceFileCount: 7,
        requiredSnippetCount: 24,
        matchedSnippetCount: 32,
        missingPreImplementationRequirementCount: 10,
        productionBlockerCount: 10,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV267.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionReadinessDecision.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
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
  });

  it("keeps GitHub runner style fallback compatible with the v267 source chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({
      config: loadTestConfig(),
    });

    expect(profile.sourceNodeV267.readyForUpstreamEchoVerification).toBe(true);
    expect(profile.sourceNodeV267.evidenceFileCount).toBe(7);
    expect(profile.checks.sourceNodeV267Ready).toBe(true);
    expect(profile.readinessDecision).toBe("blocked");
    expect(profile.readyForCredentialResolverPreImplementationPlan).toBe(false);
  });

  it("adds runtime blockers when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
      "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
    ]));
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.secretProviderInstantiated).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1",
        decisionGateState: "blocked",
        readinessDecision: "blocked",
        readOnlyDecisionGate: true,
        sourceNodeV267: {
          sourceVersion: "Node v267",
          verificationState: "credential-resolver-fake-shell-archive-upstream-echo-verification-ready",
          nodeV267BlocksRealResolver: true,
        },
        productionReadinessDecision: {
          decision: "blocked",
          nextPlanRequiredBeforeImplementation: true,
        },
        checks: {
          sourceNodeV267Ready: true,
          archiveEchoChainReady: true,
          preImplementationPlanPresent: false,
          realResolverImplementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver production readiness decision gate",
      );
      expect(markdown.body).toContain("REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING");
      expect(markdown.body).toContain("WRITE_SUCCESSOR_PLAN");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-268",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v268-credential-resolver-production-readiness-decision-gate",
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
    PORT: "4368",
    ...overrides,
  });
}
