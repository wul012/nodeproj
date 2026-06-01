import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
} from "../src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupHandoffEvidenceReport.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("Java/mini-kv route catalog cleanup handoff audit route group", () => {
  it("exposes v473 frozen handoff evidence through JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes).toHaveLength(1);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
      });
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-handoff-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v474",
        sourceNodeVersion: "Node v473",
        readyForRouteCatalogCleanupHandoffEvidenceReport: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        summary: {
          fileCount: 4,
          presentFileCount: 4,
          checkCount: 16,
          passedCheckCount: 16,
          javaEndpointPairCount: 6,
          miniKvArchivedNodeVersionCount: 89,
        },
        evidence: {
          javaV206EndpointPairIntegrity: {
            version: "Java v206",
            v1ContractEndpointPairCount: 6,
          },
          miniKvV191RouteCatalogHandoff: {
            releaseVersion: "v191",
            executionAllowed: false,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup handoff evidence report");
      expect(markdown.body).toContain("Java v206 Endpoint Pair Integrity");
      expect(markdown.body).toContain("mini-kv v191 Handoff");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-474",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v474-route-catalog-cleanup-handoff-report",
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
    ...overrides,
  });
}
