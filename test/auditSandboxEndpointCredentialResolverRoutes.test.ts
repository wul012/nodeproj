import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes,
} from "../src/routes/auditSandboxEndpointCredentialResolverRoutes.js";

const LATEST_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("sandbox endpoint credential resolver audit route group", () => {
  it("keeps endpoint handle, credential-resolver, disabled-precheck, and test-only shell routes registered", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: LATEST_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${LATEST_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(8);
      expect(paths[0]).toBe(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
      );
      expect(paths).toContain(LATEST_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_ROUTE);
      expect(routeTableSource).toContain("...sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification");
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        verificationState: "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
        readOnlyUpstreamEchoVerification: true,
        testOnlyResolverShellUpstreamEchoVerificationOnly: true,
        fakeResolverOnly: true,
        handleOnlyRequest: true,
        credentialResolverExecutionAllowed: false,
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        automaticUpstreamStart: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("sandbox endpoint credential resolver test-only shell upstream echo verification");
      expect(markdown.body).toContain("KEEP_REAL_RESOLVER_OUT_OF_SCOPE");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-418",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v418-route-split",
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
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    ...overrides,
  });
}

function restoreEnv(previous: string | undefined): void {
  if (previous === undefined) {
    delete process.env[FORCE_FALLBACK_ENV];
    return;
  }

  process.env[FORCE_FALLBACK_ENV] = previous;
}
