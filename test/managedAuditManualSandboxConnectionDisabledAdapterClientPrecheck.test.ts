import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
} from "../src/services/managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.js";

describe("managed audit manual sandbox connection disabled adapter client precheck", () => {
  it("defines disabled adapter client precheck without implementing or calling a real client", () => {
    const profile = loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1",
      precheckState: "disabled-adapter-client-precheck-ready",
      readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readOnlyPrecheck: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV251: {
        sourceVersion: "Node v251",
        decisionState: "manual-sandbox-connection-decision-record-ready",
        readyForDecisionRecord: true,
        requiredDecisionFieldCount: 7,
        noGoConditionCount: 8,
        connectionStillBlocked: true,
        credentialValueStillBlocked: true,
        schemaMigrationStillBlocked: true,
        autoStartStillBlocked: true,
      },
      disabledAdapterClientPrecheck: {
        adapterMode: "disabled-client-precheck-only",
        clientImplementationStatus: "not-implemented",
        clientMayBeInstantiated: false,
        externalRequestMayBeSent: false,
        credentialValueMayBeLoaded: false,
        optInGateRequired: true,
        requiredEnvHandleCount: 5,
        failureClassCount: 6,
        dryRunResponseFieldCount: 10,
        optInGate: {
          gateName: "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED",
          requiredValueForFutureConnection: "true",
          currentDefault: "false",
          precheckTreatsEnabledAsBlocked: true,
          operatorApprovalRequired: true,
        },
        dryRunResponseShape: {
          readyState: "disabled-adapter-client-precheck-ready",
          connectionAttempted: false,
          credentialValueRead: false,
          externalRequestSent: false,
          schemaMigrationExecuted: false,
        },
      },
      checks: {
        sourceNodeV251Ready: true,
        sourceDecisionRecordStillBlocksConnection: true,
        sourceDecisionRecordStillBlocksCredentialValue: true,
        sourceDecisionRecordStillBlocksSchemaMigration: true,
        sourceDecisionRecordStillBlocksAutoStart: true,
        requiredEnvHandlesDeclared: true,
        envHandlesRemainHandleOnly: true,
        optInGateDeclared: true,
        optInGateDefaultDisabled: true,
        failureTaxonomyDeclared: true,
        dryRunResponseShapeDeclared: true,
        adapterClientNotImplemented: true,
        clientInstantiationBlocked: true,
        externalRequestBlocked: true,
        credentialValueLoadBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck: true,
      },
      summary: {
        requiredEnvHandleCount: 5,
        failureClassCount: 6,
        dryRunResponseFieldCount: 10,
        reusedNoGoConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV251.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.disabledAdapterClientPrecheck.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.disabledAdapterClientPrecheck.requiredEnvHandles.map((handle) => handle.name)).toEqual([
      "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
      "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
    ]);
    expect(profile.disabledAdapterClientPrecheck.failureTaxonomy.map((failure) => failure.code)).toContain(
      "CREDENTIAL_VALUE_REQUESTED",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.precheckState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1",
        precheckState: "disabled-adapter-client-precheck-ready",
        disabledAdapterClientPrecheck: {
          adapterMode: "disabled-client-precheck-only",
          clientMayBeInstantiated: false,
          externalRequestMayBeSent: false,
          credentialValueMayBeLoaded: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection disabled adapter client precheck");
      expect(markdown.body).toContain("disabled-adapter-client-precheck-ready");
      expect(markdown.body).toContain("CREDENTIAL_VALUE_REQUESTED");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-252",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v252-disabled-adapter-client-precheck",
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
    PORT: "4352",
    ...overrides,
  });
}
