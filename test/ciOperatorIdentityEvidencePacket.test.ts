import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadCiOperatorIdentityEvidencePacket,
} from "../src/services/ciOperatorIdentityEvidencePacket.js";

describe("CI operator identity evidence packet", () => {
  it("wraps v176 CI evidence hardening and records local smoke identity without production auth", () => {
    const profile = loadCiOperatorIdentityEvidencePacket(
      loadTestConfig("memory://ci-operator-identity-evidence-packet"),
      {
        "x-orderops-operator-id": "smoke-operator-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "ci-operator-identity-evidence-packet.v1",
      packetState: "ready-for-operator-identity-evidence",
      readyForCiOperatorIdentityEvidencePacket: true,
      readyForProductionAuth: false,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readOnly: true,
      executionAllowed: false,
      packet: {
        sourceCiEvidenceHardeningProfileVersion: "ci-evidence-hardening-packet.v1",
        sourceCiEvidenceHardeningPacketState: "ready-for-ci-evidence-hardening",
        identityMode: "header-rehearsal-only",
        localSmokeEndpoint: "/api/v1/ci/operator-identity-evidence-packet",
        localSmokeOperatorId: "smoke-operator-1",
        localSmokeRoles: ["viewer", "operator"],
        localSmokeAuthSource: "headers",
        githubActionsIdentityExpectedOnly: true,
        githubActionsSecretReadAllowed: false,
        productionIdpConnected: false,
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        productionReleaseAuthorized: false,
        productionDeploymentAuthorized: false,
        productionRollbackAuthorized: false,
      },
      localSmokeIdentity: {
        id: "local-smoke-header-identity",
        source: "request-headers",
        operatorId: "smoke-operator-1",
        roles: ["viewer", "operator"],
        authSource: "headers",
        authenticated: true,
        rawRoles: ["viewer", "operator"],
        rejectedRoles: [],
        requiredForLocalSmoke: true,
        productionReady: false,
        readsSecrets: false,
      },
      checks: {
        sourceCiEvidenceHardeningReady: true,
        sourceCiEvidenceHardeningDigestValid: true,
        sourceCiEvidenceHardeningStillBlocksProduction: true,
        localSmokeIdentityAuthenticated: true,
        localSmokeIdentityAuthSourceHeaders: true,
        localSmokeOperatorIdPresent: true,
        localSmokeRolesPresent: true,
        githubActionsIdentityExpectationsComplete: true,
        githubActionsIdentityFieldsNonSecret: true,
        identityBindingRulesComplete: true,
        identityEvidenceStepsReadOnly: true,
        upstreamActionsStillDisabled: true,
        noProductionIdpConnection: true,
        noProductionReleaseAuthorization: true,
        noDeploymentAuthorization: true,
        noRollbackAuthorization: true,
        noJavaOrMiniKvStart: true,
        packetDigestValid: true,
        readyForCiOperatorIdentityEvidencePacket: true,
      },
      artifacts: {
        ciEvidenceHardeningPacket: {
          profileVersion: "ci-evidence-hardening-packet.v1",
          packetState: "ready-for-ci-evidence-hardening",
          readyForCiEvidenceHardeningPacket: true,
          readyForProductionRelease: false,
          readyForProductionDeployment: false,
          readyForProductionRollback: false,
          executionAllowed: false,
        },
        safetyBoundary: {
          nodeMayStartJava: false,
          nodeMayStartMiniKv: false,
          readsProductionSecrets: false,
          connectsProductionIdp: false,
          createsApprovalDecision: false,
          releasesProduction: false,
          deploysProduction: false,
          rollsBackProduction: false,
        },
      },
      summary: {
        checkCount: 23,
        passedCheckCount: 23,
        githubActionsIdentityExpectationCount: 6,
        identityBindingRuleCount: 5,
        identityEvidenceStepCount: 6,
        pauseConditionCount: 7,
        localSmokeRoleCount: 2,
        localSmokeRejectedRoleCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(profile.packet.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceCiEvidenceHardeningPacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.githubActionsIdentityExpectations.map((item) => item.field)).toEqual([
      "GITHUB_ACTOR",
      "GITHUB_TRIGGERING_ACTOR",
      "GITHUB_WORKFLOW",
      "GITHUB_RUN_ID",
      "GITHUB_RUN_ATTEMPT",
      "GITHUB_SHA",
    ]);
    expect(profile.githubActionsIdentityExpectations.every((item) => !item.readFromSecretStore)).toBe(true);
    expect(profile.identityBindingRules.map((item) => item.id)).toContain("identity-does-not-unlock-upstream");
    expect(profile.identityEvidenceSteps.every((step) => (
      step.readOnly
      && !step.executionAllowed
      && !step.upstreamActionsEnabled
    ))).toBe(true);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_RECOMMENDED_PARALLEL_RETENTION_FIXTURES",
    );
  });

  it("blocks the packet when local smoke identity headers are missing", () => {
    const profile = loadCiOperatorIdentityEvidencePacket(
      loadTestConfig("memory://ci-operator-identity-evidence-packet-missing-identity"),
    );

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForCiOperatorIdentityEvidencePacket).toBe(false);
    expect(profile.localSmokeIdentity).toMatchObject({
      operatorId: null,
      roles: [],
      authSource: "none",
      authenticated: false,
    });
    expect(profile.checks.localSmokeIdentityAuthenticated).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "LOCAL_SMOKE_IDENTITY_MISSING",
      "LOCAL_SMOKE_AUTH_SOURCE_NOT_HEADERS",
      "LOCAL_SMOKE_OPERATOR_ID_MISSING",
      "LOCAL_SMOKE_ROLES_MISSING",
    ]));
  });

  it("blocks the packet when upstream actions are enabled", () => {
    const profile = loadCiOperatorIdentityEvidencePacket(
      loadTestConfig("memory://ci-operator-identity-evidence-packet-actions-enabled", {
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      {
        "x-orderops-operator-id": "smoke-operator-1",
        "x-orderops-roles": "viewer",
      },
    );

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForCiOperatorIdentityEvidencePacket).toBe(false);
    expect(profile.packet.upstreamActionsEnabled).toBe(true);
    expect(profile.checks.sourceCiEvidenceHardeningReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes CI operator identity evidence packet routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-ci-operator-identity-packet-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "smoke-operator-1",
        "x-orderops-roles": "viewer,operator",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/ci/operator-identity-evidence-packet",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ci/operator-identity-evidence-packet?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        packetState: "ready-for-operator-identity-evidence",
        readyForCiOperatorIdentityEvidencePacket: true,
        localSmokeIdentity: {
          operatorId: "smoke-operator-1",
          roles: ["viewer", "operator"],
          authSource: "headers",
          authenticated: true,
        },
        checks: {
          sourceCiEvidenceHardeningReady: true,
          localSmokeIdentityAuthenticated: true,
          githubActionsIdentityExpectationsComplete: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# CI operator identity evidence packet");
      expect(markdown.body).toContain("ci-evidence-hardening-packet.v1");
      expect(markdown.body).toContain("### github-actor");
      expect(markdown.body).toContain("### identity-does-not-unlock-upstream");
      expect(markdown.body).toContain("PROCEED_TO_RECOMMENDED_PARALLEL_RETENTION_FIXTURES");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig(auditStorePath: string, overrides: Record<string, string> = {}) {
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
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    ...overrides,
  });
}
