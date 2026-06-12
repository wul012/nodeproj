import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { sandboxHandleReviewAuditJsonMarkdownRoutes } from "../src/routes/auditSandboxHandleReviewRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";
const LATEST_SANDBOX_HANDLE_REVIEW_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification";

describe("sandbox handle review audit route group", () => {
  it("keeps prerequisite, contract, packet gate, and closure routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = sandboxHandleReviewAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: LATEST_SANDBOX_HANDLE_REVIEW_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${LATEST_SANDBOX_HANDLE_REVIEW_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(10);
      expect(paths[0]).toBe(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake",
      );
      expect(paths).toContain(LATEST_SANDBOX_HANDLE_REVIEW_ROUTE);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: sandboxHandleReviewAuditJsonMarkdownRoutes,
      });
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        activeNodeVersion: "Node v363",
        sourceNodeVersion: "Node v362",
        archiveVerificationOnly: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("sandbox handle review prerequisite closure review archive verification");
      expect(markdown.body).toContain("Starts Java service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-417",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v417-route-split",
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
