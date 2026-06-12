import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass";

describe("managed audit manual sandbox connection credential resolver runtime shell post-decision continuation catalog quality pass", () => {
  it("records the Node v302 catalog refactor without consuming unfinished upstream evidence", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass.v1",
      qualityPassState: "runtime-shell-post-decision-continuation-catalog-quality-pass-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass: true,
      readOnlyQualityPass: true,
      consumesNodeV301PostDecisionContinuationPlanIntake: true,
      consumesJavaV136PostDecisionPlanIntakeEcho: false,
      consumesMiniKvV133PostDecisionPlanIntakeReceipt: false,
      readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: false,
      readyForDisabledRuntimeShellImplementation: false,
      readyForDisabledRuntimeShellInvocation: false,
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
      catalogScope: {
        catalogVersion: "runtime-shell-post-decision-continuation-catalog.v1",
        sourceVersion: "Node v301",
        currentVersion: "Node v302",
        nextVerificationVersion: "Node v303",
        continuationOptionCount: 4,
        selectedContinuationOptionCount: 1,
        rejectedRuntimeImplementationOptionCount: 1,
        duplicatedOptionBuilderRemoved: true,
        duplicatedNecessityProofBuilderRemoved: true,
        v301LegacyNodeV302ReferenceKeptAsCompatibilityMarker: true,
        activeNodeVerificationTarget: "Node v303",
      },
      sourceNodeV301: {
        planIntakeState: "runtime-shell-post-decision-continuation-plan-intake-ready",
        readyForPlanIntake: true,
        readOnlyPlanIntake: true,
        catalogVersion: "runtime-shell-post-decision-continuation-catalog.v1",
        legacyNextNodeVerificationVersion: "Node v302",
        nextNodeVerificationVersion: "Node v303",
        readyForParallelJavaV136MiniKvV133EchoRequest: true,
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
        productionBlockerCount: 0,
      },
      checks: {
        sourceNodeV301Ready: true,
        sourceNodeV301UsesCatalog: true,
        nodeV303IsActiveVerificationTarget: true,
        legacyNodeV302ReferenceRetainedOnlyForCompatibility: true,
        continuationOptionsCataloged: true,
        necessityProofCataloged: true,
        noJavaV136Consumption: true,
        noMiniKvV133Consumption: true,
        noRuntimeShellImplementation: true,
        noRuntimeShellInvocation: true,
        noCredentialRead: true,
        noRawEndpointParse: true,
        noExternalRequest: true,
        noLedgerOrSchemaWrite: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass: true,
      },
      summary: {
        continuationOptionCount: 4,
        selectedContinuationOptionCount: 1,
        rejectedRuntimeImplementationOptionCount: 1,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.qualityPassState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass)
      .toBe(false);
    expect(profile.consumesJavaV136PostDecisionPlanIntakeEcho).toBe(false);
    expect(profile.consumesMiniKvV133PostDecisionPlanIntakeReceipt).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
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
          "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass.v1",
        qualityPassState: "runtime-shell-post-decision-continuation-catalog-quality-pass-ready",
        consumesJavaV136PostDecisionPlanIntakeEcho: false,
        consumesMiniKvV133PostDecisionPlanIntakeReceipt: false,
        catalogScope: {
          currentVersion: "Node v302",
          activeNodeVerificationTarget: "Node v303",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver runtime shell post-decision continuation catalog quality pass",
      );
      expect(markdown.body).toContain("runtime-shell-post-decision-continuation-catalog-quality-pass-ready");
      expect(markdown.body).toContain("Consumes Java v136: false");
      expect(markdown.body).toContain("Ready for Node v303: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-302",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v302-runtime-shell-post-decision-catalog-quality-pass",
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
