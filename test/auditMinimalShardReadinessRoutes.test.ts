import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { minimalShardReadinessAuditJsonMarkdownRoutes } from "../src/routes/auditMinimalShardReadinessRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";
const LATEST_MINIMAL_SHARD_READINESS_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview";

describe("minimal shard readiness audit route group", () => {
  it("keeps contract, live-read, compatibility, and regular-gate routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = minimalShardReadinessAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: LATEST_MINIMAL_SHARD_READINESS_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${LATEST_MINIMAL_SHARD_READINESS_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(7);
      expect(paths[0]).toBe(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate",
      );
      expect(paths).toContain(LATEST_MINIMAL_SHARD_READINESS_ROUTE);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: minimalShardReadinessAuditJsonMarkdownRoutes,
      });
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        activeNodeVersion: "Node v613",
        sourceNodeVersion: "Node v612",
        previewOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        activeShardRouterAllowed: false,
        writeRoutingAllowed: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("controlled read-only shard preview");
      expect(markdown.body).toContain("## Source Matrix");
      expect(markdown.body).toContain("## Source Matrix Consumer");
      expect(markdown.body).toContain("## Source Matrix Drift Summary");
      expect(markdown.body).toContain("## Source Matrix Review Checklist");
      expect(markdown.body).toContain("## Source Matrix Review Digest");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot Summary Export");
      expect(markdown.body).toContain("## Source Matrix Handoff Notes");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer");
      expect(markdown.body).toContain("Summary state: blocked");
      expect(markdown.body).toContain("Summary digest scope: read-only-handoff-summary");
      expect(markdown.body).toContain("Decision: blocked");
      expect(markdown.body).toContain("Starts Java service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-414",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v414-route-split",
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
