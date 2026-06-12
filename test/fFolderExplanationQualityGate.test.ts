import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadFFolderExplanationQualityGate,
} from "../src/services/fFolderExplanationQualityGate.js";

const ROUTE = "/api/v1/audit/f-folder-explanation-quality-gate";

describe("f-folder explanation quality gate", () => {
  it("verifies enforced f-folder explanations without opening production execution", () => {
    const profile = loadFFolderExplanationQualityGate({ config: loadTestConfig() });

    expect(profile).toMatchObject({
      profileVersion: "f-folder-explanation-quality-gate.v1",
      qualityGateState: "verified-quality-gate",
      readyForFFolderExplanationQualityGate: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyQualityGate: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      scanScope: {
        root: "f",
        explanationDirName: "解释",
        imageDirName: "图片",
        enforcementFloorVersion: 2094,
        activeNodeVersionRange: "Node v2094-v2103",
        minBytes: 9000,
        minChineseCharacters: 3000,
        minCodePathReferences: 4,
        historicalLegacyBlocking: false,
      },
      checks: {
        fRootExists: true,
        enforcedExplanationsPresent: true,
        enforcedVersionsHaveExplanationDirs: true,
        noEmptyImageDirectories: true,
        noShortEnforcedExplanations: true,
        enforcedChineseDepthMet: true,
        enforcedRequiredShapeMet: true,
        enforcedCodePathDensityMet: true,
        noEnforcedPlaceholderExplanations: true,
        noForbiddenExecutionClaims: true,
        scanCompleted: true,
        readyForFFolderExplanationQualityGate: true,
      },
    });
    expect(profile.summary.enforcedExplanationCount).toBeGreaterThanOrEqual(11);
    expect(profile.summary.enforcedCompliantExplanationCount).toBe(profile.summary.enforcedExplanationCount);
    expect(profile.summary.shortExplanationCount).toBe(0);
    expect(profile.summary.shallowChineseExplanationCount).toBe(0);
    expect(profile.summary.lowCodePathDensityCount).toBe(0);
    expect(profile.blockers).toEqual([]);
    expect(profile.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("exposes JSON and Markdown through the audit route table", async () => {
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
        profileVersion: "f-folder-explanation-quality-gate.v1",
        qualityGateState: "verified-quality-gate",
        readyForFFolderExplanationQualityGate: true,
        executionAllowed: false,
        connectsManagedAudit: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# F-folder explanation quality gate");
      expect(markdown.body).toContain("## Enforced Explanations");
      expect(markdown.body).toContain("f-folder-explanation-quality-gate.v1");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-f-folder-explanation-quality",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-f-folder-explanation-quality-gate",
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
    PORT: "4399",
    ...overrides,
  });
}
