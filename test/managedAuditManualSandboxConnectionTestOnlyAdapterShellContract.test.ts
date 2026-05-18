import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
} from "../src/services/managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";

describe("managed audit manual sandbox connection test-only adapter shell contract", () => {
  it("defines a fake-transport shell contract without real connection effects", () => {
    const profile = loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1",
      shellContractState: "test-only-adapter-shell-contract-ready",
      readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      testOnlyShell: true,
      readOnlyContract: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV252: {
        sourceVersion: "Node v252",
        precheckState: "disabled-adapter-client-precheck-ready",
        readyForDisabledAdapterClientPrecheck: true,
        requiredEnvHandleCount: 5,
        failureClassCount: 6,
        dryRunResponseFieldCount: 10,
        clientImplementationStatus: "not-implemented",
        externalRequestStillBlocked: true,
        credentialValueStillBlocked: true,
      },
      testOnlyAdapterShellContract: {
        shellName: "ManagedAuditManualSandboxTestOnlyAdapterShell",
        shellMode: "test-only-fake-transport-contract",
        transportKind: "fake-in-memory",
        realClientImplemented: false,
        realTransportAllowed: false,
        fakeTransportOnly: true,
        clientMayBeInstantiatedForProduction: false,
        externalRequestMayBeSent: false,
        credentialValueMayBeLoaded: false,
        requestShapeFieldCount: 8,
        responseShapeFieldCount: 9,
        failureMappingCount: 6,
        guardConditionCount: 7,
        requestShape: {
          credentialHandleOnly: true,
          credentialValueAccepted: false,
          endpointHandleOnly: true,
          externalUrlAccepted: false,
          payloadMayContainSecrets: false,
        },
        responseShape: {
          fakeTransportResponseOnly: true,
          connectionAttempted: false,
          externalRequestSent: false,
          credentialValueRead: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
        },
        fakeTransportProbe: {
          requestId: "managed-audit-v253-test-only-shell-probe",
          transportKind: "fake-in-memory",
          acceptedByFakeTransport: true,
          responseStatus: "fake-transport-accepted",
          responseCode: "TEST_ONLY_FAKE_TRANSPORT",
          connectionAttempted: false,
          externalRequestSent: false,
          credentialValueRead: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
        },
      },
      checks: {
        sourceNodeV252Ready: true,
        sourceStillBlocksExternalRequest: true,
        sourceStillBlocksCredentialValue: true,
        fakeTransportOnly: true,
        requestShapeHandleOnly: true,
        responseShapeDoesNotClaimRealConnection: true,
        failureMappingCoversSourceTaxonomy: true,
        guardConditionsDeclared: true,
        fakeTransportProbeCovered: true,
        fakeTransportProbeNoExternalRequest: true,
        fakeTransportProbeNoCredentialRead: true,
        fakeTransportProbeNoProductionWrite: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract: true,
      },
      summary: {
        requestShapeFieldCount: 8,
        responseShapeFieldCount: 9,
        failureMappingCount: 6,
        guardConditionCount: 7,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV252.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.testOnlyAdapterShellContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.testOnlyAdapterShellContract.fakeTransportProbe.probeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.testOnlyAdapterShellContract.failureMapping.map((mapping) => mapping.sourceFailureCode)).toEqual([
      "ADAPTER_CLIENT_DISABLED",
      "CREDENTIAL_HANDLE_MISSING",
      "CREDENTIAL_VALUE_REQUESTED",
      "ENDPOINT_HANDLE_MISSING",
      "SCHEMA_REHEARSAL_MISSING",
      "MANUAL_WINDOW_NOT_OPEN",
    ]);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.shellContractState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1",
        shellContractState: "test-only-adapter-shell-contract-ready",
        testOnlyAdapterShellContract: {
          transportKind: "fake-in-memory",
          realClientImplemented: false,
          externalRequestMayBeSent: false,
          credentialValueMayBeLoaded: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection test-only adapter shell contract");
      expect(markdown.body).toContain("test-only-adapter-shell-contract-ready");
      expect(markdown.body).toContain("TEST_ONLY_CREDENTIAL_VALUE_BLOCKED");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-253",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v253-test-only-adapter-shell-contract",
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4353",
    ...overrides,
  });
}
