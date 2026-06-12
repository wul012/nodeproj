import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.js";

describe("managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell contract", () => {
  it("defines a fake resolver shell contract without credential, raw endpoint, or external request effects", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1",
      shellContractState: "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract: true,
      testOnlyShell: true,
      readOnlyContract: true,
      fakeResolverOnly: true,
      handleOnlyRequest: true,
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
      sourceNodeV263: {
        sourceVersion: "Node v263",
        verificationState: "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready",
        readyForDisabledPrecheckUpstreamEchoVerification: true,
        verificationMode:
          "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only",
        sourceSpan: "Node v262 + Java v106 + mini-kv v115",
        sourceNodeV262Ready: true,
        javaV106EchoReady: true,
        miniKvV115NonParticipationReady: true,
        disabledPrecheckAligned: true,
        requiredEnvHandlesAligned: true,
        optInGatesAligned: true,
        failureTaxonomyAligned: true,
        dryRunResponseShapeAligned: true,
        inheritedNoGoConditionsAligned: true,
        sourceNodeV261Aligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        credentialResolverExecutionAllowed: false,
        credentialValueRead: false,
        credentialValueLoaded: false,
        credentialValueStored: false,
        credentialValueIncluded: false,
        rawEndpointUrlParsed: false,
        rawEndpointUrlIncluded: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        connectsManagedAudit: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        checkCount: 19,
        passedCheckCount: 19,
        productionBlockerCount: 0,
        readyForNodeV264CredentialResolverTestOnlyShellContract: true,
      },
      resolverShellContract: {
        shellName: "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell",
        shellMode: "test-only-fake-resolver-contract",
        resolverKind: "fake-in-memory",
        realResolverImplemented: false,
        realSecretProviderAllowed: false,
        fakeResolverOnly: true,
        resolverClientMayBeInstantiatedForProduction: false,
        secretProviderMayBeInstantiated: false,
        credentialValueMayBeLoaded: false,
        rawEndpointUrlMayBeParsed: false,
        externalRequestMayBeSent: false,
        requestShapeFieldCount: 9,
        responseShapeFieldCount: 13,
        failureMappingCount: 7,
        guardConditionCount: 10,
        requestShape: {
          credentialHandleOnly: true,
          credentialValueAccepted: false,
          endpointHandleOnly: true,
          rawEndpointUrlAccepted: false,
          resolverPolicyHandleRequired: true,
          approvalMarkerRequired: true,
          payloadMayContainSecrets: false,
        },
        responseShape: {
          fakeResolverResponseOnly: true,
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          credentialValueRead: false,
          credentialValueLoaded: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
        },
        fakeResolverProbe: {
          requestId: "managed-audit-v264-test-only-resolver-shell-probe",
          resolverKind: "fake-in-memory",
          acceptedByFakeResolver: true,
          responseStatus: "fake-resolver-accepted",
          responseCode: "TEST_ONLY_FAKE_RESOLVER",
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          credentialValueRead: false,
          credentialValueLoaded: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
        },
      },
      checks: {
        sourceNodeV263Ready: true,
        sourceStillBlocksCredentialResolution: true,
        sourceStillBlocksCredentialValue: true,
        sourceStillBlocksRawEndpoint: true,
        sourceStillBlocksConnection: true,
        sourceStillBlocksWrites: true,
        sourceStillBlocksAutoStart: true,
        fakeResolverOnly: true,
        requestShapeHandleOnly: true,
        responseShapeNoSideEffects: true,
        failureMappingCoversSourceTaxonomy: true,
        guardConditionsDeclared: true,
        fakeResolverProbeCovered: true,
        fakeResolverProbeNoCredentialRead: true,
        fakeResolverProbeNoExternalRequest: true,
        fakeResolverProbeNoProductionWrite: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract: true,
      },
      summary: {
        requestShapeFieldCount: 9,
        responseShapeFieldCount: 13,
        failureMappingCount: 7,
        guardConditionCount: 10,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV263.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.resolverShellContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.resolverShellContract.fakeResolverProbe.probeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.resolverShellContract.failureMapping.map((mapping) => mapping.sourceFailureCode)).toEqual([
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
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.shellContractState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.secretProviderInstantiated).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1",
        shellContractState: "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready",
        resolverShellContract: {
          resolverKind: "fake-in-memory",
          realResolverImplemented: false,
          realSecretProviderAllowed: false,
          externalRequestMayBeSent: false,
          credentialValueMayBeLoaded: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell contract",
      );
      expect(markdown.body).toContain("sandbox-endpoint-credential-resolver-test-only-shell-contract-ready");
      expect(markdown.body).toContain("TEST_ONLY_CREDENTIAL_VALUE_REQUESTED");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-264",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v264-credential-resolver-test-only-shell-contract",
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
    PORT: "4364",
    ...overrides,
  });
}
