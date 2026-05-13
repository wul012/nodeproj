import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createProductionConnectionFailureModeRehearsalProfile,
} from "../src/services/productionConnectionFailureModeRehearsal.js";

describe("production connection failure-mode rehearsal", () => {
  it("simulates production connection failures without external calls", () => {
    const profile = createProductionConnectionFailureModeRehearsalProfile(loadTestConfig("tmp-audit.jsonl"));

    expect(profile).toMatchObject({
      profileVersion: "production-connection-failure-mode-rehearsal.v1",
      readyForProductionConnections: false,
      readOnly: true,
      executionAllowed: false,
      targetContext: {
        configContractVersion: "production-connection-config-contract.v1",
        auditCurrentTargetKind: "file",
        auditProductionTargetKind: "managed-audit-adapter",
        idpCurrentTargetKind: "jwks-configured",
        idpProductionTargetKind: "oidc-jwt-jwks",
        actualMissingEnv: [],
        upstreamActionsEnabled: false,
      },
      checks: {
        configContractReady: true,
        auditConnectionMissingCovered: true,
        idpJwksTimeoutSimulated: true,
        credentialsMissingCovered: true,
        safeFallbackCovered: true,
        noDatabaseConnectionAttempted: true,
        noAuditWritePerformed: true,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        realManagedAdapterConnected: false,
        realIdpVerifierConnected: false,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        scenarioCount: 4,
        passedScenarioCount: 4,
        productionBlockerCount: 2,
      },
    });
    expect(profile.scenarios.map((scenario) => [scenario.id, scenario.actualOutcome, scenario.passed])).toEqual([
      ["audit-connection-missing", "blocked", true],
      ["idp-jwks-timeout-simulated", "blocked", true],
      ["credentials-missing", "blocked", true],
      ["safe-fallback", "blocked", true],
    ]);
    expect(profile.scenarios.every((scenario) => !scenario.databaseConnectionAttempted)).toBe(true);
    expect(profile.scenarios.every((scenario) => !scenario.auditWritePerformed)).toBe(true);
    expect(profile.scenarios.every((scenario) => !scenario.jwksNetworkFetchAttempted)).toBe(true);
    expect(profile.scenarios.every((scenario) => !scenario.externalIdpCallAttempted)).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
    ]);
  });

  it("surfaces incomplete config contract and unsafe upstream actions", () => {
    const profile = createProductionConnectionFailureModeRehearsalProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.checks).toMatchObject({
      configContractReady: false,
      credentialsMissingCovered: true,
      upstreamActionsStillDisabled: false,
    });
    expect(profile.targetContext.actualMissingEnv).toEqual(expect.arrayContaining([
      "AUDIT_STORE_URL",
      "ORDEROPS_IDP_ISSUER",
      "ORDEROPS_IDP_AUDIENCE",
      "ORDEROPS_IDP_JWKS_URL",
    ]));
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "CONFIG_CONTRACT_INCOMPLETE",
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("exposes production connection failure-mode rehearsal routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-connection-failure-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-failure-mode-rehearsal",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-failure-mode-rehearsal?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-connection-failure-mode-rehearsal.v1",
        checks: {
          configContractReady: true,
          auditConnectionMissingCovered: true,
          idpJwksTimeoutSimulated: true,
          credentialsMissingCovered: true,
          safeFallbackCovered: true,
          noDatabaseConnectionAttempted: true,
          noJwksNetworkFetch: true,
          realManagedAdapterConnected: false,
          realIdpVerifierConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production connection failure-mode rehearsal");
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
