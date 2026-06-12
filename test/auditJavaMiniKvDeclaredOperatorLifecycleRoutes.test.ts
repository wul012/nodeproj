import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes,
} from "../src/routes/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

const LATEST_DECLARED_OPERATOR_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification";

describe("Java/mini-kv declared operator lifecycle audit route group", () => {
  it("keeps declared operator lifecycle routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: LATEST_DECLARED_OPERATOR_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${LATEST_DECLARED_OPERATOR_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(8);
      expect(paths[0]).toBe(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake",
      );
      expect(paths).toContain(LATEST_DECLARED_OPERATOR_ROUTE);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes,
      });
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        activeNodeVersion: "Node v395",
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("artifact intake preflight archive verification");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-411",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v411-route-split",
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
