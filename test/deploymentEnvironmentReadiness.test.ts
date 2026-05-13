import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createDeploymentEnvironmentReadinessGate,
} from "../src/services/deploymentEnvironmentReadiness.js";

describe("deployment environment readiness", () => {
  it("reports missing production environment settings as blockers", () => {
    const gate = createDeploymentEnvironmentReadinessGate(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    expect(gate).toMatchObject({
      gateVersion: "deployment-environment-readiness.v1",
      readyForDeployment: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      checks: {
        upstreamActionsStillDisabled: true,
        authIssuerConfigured: true,
        authSecretConfigured: false,
        signedTokenContractPasses: false,
        realIdentityProviderConnected: false,
        accessGuardEnforcementEnabled: false,
        retentionDaysConfigured: false,
        auditMaxFileBytesConfigured: false,
        auditRotationEnabled: false,
        auditBackupEnabled: false,
        managedAuditStoreUrlConfigured: false,
        managedAuditStoreAdapterConnected: false,
      },
    });
    expect(gate.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "AUTH_TOKEN_SECRET_MISSING",
      "SIGNED_TOKEN_CONTRACT_FAILING",
      "REAL_IDP_NOT_CONNECTED",
      "ACCESS_GUARD_ENFORCEMENT_DISABLED",
      "AUDIT_RETENTION_DAYS_MISSING",
      "AUDIT_STORE_URL_MISSING",
      "MANAGED_AUDIT_ADAPTER_MISSING",
    ]));
  });

  it("passes rehearsal configuration checks while keeping real IdP and managed adapter blockers", () => {
    const gate = createDeploymentEnvironmentReadinessGate(loadReadyRehearsalConfig());

    expect(gate.checks).toMatchObject({
      upstreamActionsStillDisabled: true,
      authIssuerConfigured: true,
      authSecretConfigured: true,
      signedTokenContractPasses: true,
      realIdentityProviderConnected: false,
      accessGuardEnforcementEnabled: true,
      retentionDaysConfigured: true,
      auditMaxFileBytesConfigured: true,
      auditRotationEnabled: true,
      auditBackupEnabled: true,
      managedAuditStoreUrlConfigured: true,
      managedAuditStoreAdapterConnected: false,
    });
    expect(gate.summary.deployableRehearsalPassedCount).toBe(9);
    expect(gate.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_IDP_NOT_CONNECTED",
      "MANAGED_AUDIT_ADAPTER_MISSING",
    ]);
  });

  it("exposes deployment environment readiness routes in JSON and Markdown", async () => {
    const app = await buildApp(loadReadyRehearsalConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/environment-readiness",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/environment-readiness?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        gateVersion: "deployment-environment-readiness.v1",
        checks: {
          signedTokenContractPasses: true,
          managedAuditStoreUrlConfigured: true,
          managedAuditStoreAdapterConnected: false,
        },
        readyForDeployment: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Deployment environment readiness");
      expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
      expect(markdown.body).toContain("MANAGED_AUDIT_ADAPTER_MISSING");
    } finally {
      await app.close();
    }
  });
});

function loadReadyRehearsalConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
  });
}
