import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.js";

describe("managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck", () => {
  it("defines a disabled credential resolver precheck without instantiating resolver or secret provider", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1",
      precheckState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck: true,
      readOnlyDisabledPrecheck: true,
      disabledCredentialResolverPrecheckOnly: true,
      credentialResolverExecutionAllowed: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueLoaded: false,
      credentialValueStored: false,
      credentialValueIncluded: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlIncluded: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV261: {
        sourceVersion: "Node v261",
        verificationState: "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        verificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
        sourceSpan: "Node v260 + Java v105 + mini-kv v114",
        sourceNodeV260Ready: true,
        javaV105EchoReady: true,
        miniKvV114NonParticipationReady: true,
        decisionRecordAligned: true,
        requiredDecisionFieldsAligned: true,
        explicitNoGoConditionsAligned: true,
        resolverPolicyAligned: true,
        approvalMarkerAligned: true,
        operatorIdentityAligned: true,
        approvalCorrelationAligned: true,
        redactionAndFallbackAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        credentialResolverExecutionAllowed: false,
        credentialValueRead: false,
        credentialValueLoaded: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        connectsManagedAudit: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        readyForNodeV262CredentialResolverDisabledPrecheck: true,
      },
      disabledCredentialResolverPrecheck: {
        precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
        resolverImplementationStatus: "not-implemented",
        secretProviderImplementationStatus: "not-implemented",
        resolverClientMayBeInstantiated: false,
        secretProviderMayBeInstantiated: false,
        credentialValueMayBeLoaded: false,
        rawEndpointUrlMayBeParsed: false,
        externalRequestMayBeSent: false,
        optInGateRequired: true,
        requiredEnvHandleCount: 6,
        optInGateCount: 2,
        failureClassCount: 7,
        dryRunResponseFieldCount: 12,
        inheritedNoGoConditionCount: 9,
        dryRunResponseShape: {
          readyState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          credentialValueRead: false,
          credentialValueLoaded: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          schemaMigrationExecuted: false,
        },
      },
      checks: {
        sourceNodeV261Ready: true,
        sourceVerificationStillBlocksCredentialResolution: true,
        sourceVerificationStillBlocksCredentialValue: true,
        sourceVerificationStillBlocksRawEndpoint: true,
        sourceVerificationStillBlocksConnection: true,
        sourceVerificationStillBlocksWrites: true,
        sourceVerificationStillBlocksAutoStart: true,
        requiredEnvHandlesDeclared: true,
        envHandlesRemainHandleOnly: true,
        optInGatesDeclared: true,
        optInGatesDefaultDisabled: true,
        failureTaxonomyDeclared: true,
        dryRunResponseShapeDeclared: true,
        resolverImplementationStillAbsent: true,
        secretProviderImplementationStillAbsent: true,
        resolverClientInstantiationBlocked: true,
        secretProviderInstantiationBlocked: true,
        credentialValueLoadBlocked: true,
        rawEndpointParseBlocked: true,
        externalRequestBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck: true,
      },
      summary: {
        requiredEnvHandleCount: 6,
        optInGateCount: 2,
        failureClassCount: 7,
        dryRunResponseFieldCount: 12,
        inheritedNoGoConditionCount: 9,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV261.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.disabledCredentialResolverPrecheck.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.disabledCredentialResolverPrecheck.requiredEnvHandles.map((handle) => handle.name)).toEqual([
      "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
    ]);
    expect(profile.disabledCredentialResolverPrecheck.failureTaxonomy.map((failure) => failure.code)).toEqual([
      "RESOLVER_DISABLED",
      "APPROVAL_MARKER_MISSING",
      "CREDENTIAL_HANDLE_MISSING",
      "CREDENTIAL_VALUE_REQUESTED",
      "RAW_ENDPOINT_URL_REQUESTED",
      "EXTERNAL_REQUEST_REQUESTED",
      "SCHEMA_MIGRATION_REQUESTED",
    ]);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.precheckState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.secretProviderInstantiated).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1",
        precheckState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
        disabledCredentialResolverPrecheck: {
          precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
          resolverClientMayBeInstantiated: false,
          secretProviderMayBeInstantiated: false,
          externalRequestMayBeSent: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck",
      );
      expect(markdown.body).toContain("sandbox-endpoint-credential-resolver-disabled-precheck-ready");
      expect(markdown.body).toContain("CREDENTIAL_VALUE_REQUESTED");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-262",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v262-credential-resolver-disabled-precheck",
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
    PORT: "4362",
    ...overrides,
  });
}
