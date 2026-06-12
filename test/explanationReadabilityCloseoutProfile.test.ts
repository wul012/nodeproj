import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadExplanationReadabilityCloseoutProfile,
} from "../src/services/explanationReadabilityCloseoutProfile.js";

const ROUTE = "/api/v1/audit/explanation-readability-closeout-profile";

describe("explanation readability closeout profile", () => {
  it("summarizes f-folder and code walkthrough readability gates without opening execution", () => {
    const profile = loadExplanationReadabilityCloseoutProfile({ config: loadTestConfig() });

    expect(profile).toMatchObject({
      profileVersion: "explanation-readability-closeout-profile.v1",
      closeoutState: "verified-explanation-readability-closeout",
      readyForExplanationReadabilityCloseout: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyProfile: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      scope: {
        activeVersionRange: "Node v2109-v2113",
        localDocumentationOnly: true,
        sharedMarkdownReadabilityAnalyzer: "src/services/markdownDocumentReadabilitySignals.ts",
        routeGroup: "managed-audit-route-quality",
        javaMiniKvParallelRecommended: true,
      },
      routeCatalog: {
        expectedRouteCount: 254,
        managedAuditRouteCount: 56,
        routeQualityRouteCount: 6,
        closeoutRouteRegistered: true,
      },
      checks: {
        fFolderGateVerified: true,
        codeWalkthroughGateVerified: true,
        noRepetitiveParagraphPadding: true,
        noOversizedDetailedSections: true,
        scannableSectionsMeasured: true,
        routeCatalogIncludesCloseoutProfile: true,
        upstreamActionsStillDisabled: true,
        noSiblingServiceStartup: true,
        noProductionExecutionEnabled: true,
        readyForExplanationReadabilityCloseout: true,
      },
    });
    expect(profile.gates.fFolderExplanationQualityGate.ready).toBe(true);
    expect(profile.gates.codeWalkthroughDocumentationQualityGate.ready).toBe(true);
    expect(profile.summary.gateCount).toBe(2);
    expect(profile.summary.readyGateCount).toBe(2);
    expect(profile.summary.repetitiveParagraphPaddingCount).toBe(0);
    expect(profile.summary.oversizedDetailedSectionCount).toBe(0);
    expect(profile.summary.minimumScannableH2SectionCount).toBeGreaterThan(0);
    expect(profile.productionBlockers).toEqual([]);
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
        profileVersion: "explanation-readability-closeout-profile.v1",
        closeoutState: "verified-explanation-readability-closeout",
        readyForExplanationReadabilityCloseout: true,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Explanation readability closeout profile");
      expect(markdown.body).toContain("## Gates");
      expect(markdown.body).toContain("explanation-readability-closeout-profile.v1");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-explanation-readability-closeout",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-explanation-readability-closeout",
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
    PORT: "4413",
    ...overrides,
  });
}
