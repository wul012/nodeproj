import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadCodeWalkthroughDocumentationQualityGate,
} from "../src/services/codeWalkthroughDocumentationQualityGate.js";

const ROUTE = "/api/v1/audit/code-walkthrough-documentation-quality-gate";

describe("code walkthrough documentation quality gate", () => {
  it("verifies the bucketed walkthrough directory without opening runtime execution", () => {
    const profile = loadCodeWalkthroughDocumentationQualityGate({ config: loadTestConfig() });

    expect(profile).toMatchObject({
      profileVersion: "code-walkthrough-documentation-quality-gate.v1",
      qualityGateState: "verified-quality-gate",
      readyForCodeWalkthroughDocumentationQualityGate: true,
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
        root: "代码讲解记录_生产雏形阶段3",
        enforcementFloorRecord: 2063,
        chineseEnforcementFloorRecord: 2070,
        minChineseCharacters: 3000,
        activeNodeVersionRange: "Node v2058-v2108",
        historicalLegacyBlocking: false,
      },
      checks: {
        walkthroughRootExists: true,
        stageReadmePresent: true,
        standardDocumentPresent: true,
        sampleDocumentPresent: true,
        expectedBucketsPresent: true,
        rootHasNoMarkdownOverflow: true,
        bucketAlignmentStable: true,
        enforcedWalkthroughsPresent: true,
        noEnforcedPlaceholderWalkthroughs: true,
        enforcedWalkthroughsMeetRequiredShape: true,
        enforcedChineseWalkthroughsMeetFloor: true,
        noRepetitiveParagraphPadding: true,
        noOversizedDetailedWalkthroughSection: true,
        noForbiddenExecutionClaims: true,
        batchWalkthroughPolicyDocumented: true,
        historicalLegacyAllowedButVisible: true,
        scanCompleted: true,
        readyForCodeWalkthroughDocumentationQualityGate: true,
      },
    });
    expect(profile.summary.totalWalkthroughCount).toBeGreaterThan(1600);
    expect(profile.summary.enforcedWalkthroughCount).toBeGreaterThanOrEqual(2);
    expect(profile.summary.enforcedMissingRequiredShapeCount).toBe(0);
    expect(profile.summary.enforcedChineseWritingCount).toBeGreaterThanOrEqual(10);
    expect(profile.summary.enforcedChineseWritingShortCount).toBe(0);
    expect(profile.summary.repetitiveParagraphPaddingCount).toBe(0);
    expect(profile.summary.oversizedDetailedWalkthroughCount).toBe(0);
    expect(profile.summary.minimumScannableH2SectionCount).toBeGreaterThan(0);
    expect(profile.summary.largestH2SectionChineseCharacters).toBeGreaterThan(0);
    expect(profile.summary.enforcedPlaceholderCount).toBe(0);
    expect(profile.bucketSummary.r2000.enforcedMarkdownCount).toBeGreaterThanOrEqual(2);
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
        profileVersion: "code-walkthrough-documentation-quality-gate.v1",
        qualityGateState: "verified-quality-gate",
        readyForCodeWalkthroughDocumentationQualityGate: true,
        executionAllowed: false,
        connectsManagedAudit: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Code walkthrough documentation quality gate");
      expect(markdown.body).toContain("## Enforced Walkthroughs");
      expect(markdown.body).toContain("code-walkthrough-documentation-quality-gate.v1");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-code-walkthrough-quality",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-code-walkthrough-quality-gate",
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
    PORT: "4341",
    ...overrides,
  });
}
