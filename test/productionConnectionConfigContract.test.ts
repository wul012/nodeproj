import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createProductionConnectionConfigContractProfile,
} from "../src/services/productionConnectionConfigContract.js";

describe("production connection config contract", () => {
  it("documents audit and IdP target env without connecting external systems", () => {
    const profile = createProductionConnectionConfigContractProfile(loadTestConfig("tmp-audit.jsonl"));

    expect(profile).toMatchObject({
      profileVersion: "production-connection-config-contract.v1",
      readyForProductionConnections: false,
      readOnly: true,
      executionAllowed: false,
      targets: {
        audit: {
          id: "managed-audit-adapter",
          currentTargetKind: "file",
          productionTargetKind: "managed-audit-adapter",
          connectionEnabled: false,
          realConnectionConnected: false,
          missingEnv: [],
        },
        idp: {
          id: "idp-verifier",
          currentTargetKind: "jwks-configured",
          productionTargetKind: "oidc-jwt-jwks",
          connectionEnabled: false,
          realConnectionConnected: false,
          missingEnv: [],
        },
      },
      safety: {
        upstreamActionsEnabled: false,
        upstreamActionsStillDisabled: true,
        noDatabaseConnectionAttempted: true,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        realManagedAdapterConnected: false,
        realIdpVerifierConnected: false,
      },
      checks: {
        auditTargetKindDocumented: true,
        auditRequiredEnvDocumented: true,
        auditRequiredEnvConfigured: true,
        idpTargetKindDocumented: true,
        idpRequiredEnvDocumented: true,
        idpRequiredEnvConfigured: true,
        noDatabaseConnectionAttempted: true,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        realManagedAdapterConnected: false,
        realIdpVerifierConnected: false,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        targetCount: 2,
        configuredTargetCount: 2,
        missingEnvCount: 0,
        productionBlockerCount: 2,
      },
    });
    expect(profile.targets.audit.requiredEnv.map((item) => item.key)).toEqual([
      "AUDIT_STORE_KIND",
      "AUDIT_STORE_URL",
      "AUDIT_RETENTION_DAYS",
      "AUDIT_MAX_FILE_BYTES",
      "AUDIT_ROTATION_ENABLED",
      "AUDIT_BACKUP_ENABLED",
    ]);
    expect(profile.targets.idp.requiredEnv.map((item) => item.key)).toEqual([
      "ORDEROPS_IDP_ISSUER",
      "ORDEROPS_IDP_AUDIENCE",
      "ORDEROPS_IDP_JWKS_URL",
      "ORDEROPS_IDP_CLOCK_SKEW_SECONDS",
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
    ]);
  });

  it("surfaces missing env and unsafe upstream actions", () => {
    const profile = createProductionConnectionConfigContractProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.checks).toMatchObject({
      auditRequiredEnvConfigured: false,
      idpRequiredEnvConfigured: false,
      upstreamActionsStillDisabled: false,
    });
    expect(profile.targets.audit.missingEnv).toEqual(expect.arrayContaining([
      "AUDIT_STORE_URL",
      "AUDIT_RETENTION_DAYS",
      "AUDIT_MAX_FILE_BYTES",
      "AUDIT_ROTATION_ENABLED",
      "AUDIT_BACKUP_ENABLED",
    ]));
    expect(profile.targets.idp.missingEnv).toEqual(expect.arrayContaining([
      "ORDEROPS_IDP_ISSUER",
      "ORDEROPS_IDP_AUDIENCE",
      "ORDEROPS_IDP_JWKS_URL",
    ]));
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "AUDIT_REQUIRED_ENV_MISSING",
      "IDP_REQUIRED_ENV_MISSING",
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("exposes production connection config contract routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-connection-config-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-config-contract",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-config-contract?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-connection-config-contract.v1",
        checks: {
          auditRequiredEnvConfigured: true,
          idpRequiredEnvConfigured: true,
          noDatabaseConnectionAttempted: true,
          noJwksNetworkFetch: true,
          realManagedAdapterConnected: false,
          realIdpVerifierConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production connection config contract");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
      expect(markdown.body).toContain("REAL_IDP_VERIFIER_NOT_CONNECTED");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig(auditStorePath: string) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
  });
}
