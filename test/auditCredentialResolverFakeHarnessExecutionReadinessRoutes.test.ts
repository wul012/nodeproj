import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  credentialResolverFakeHarnessExecutionReadinessAuditJsonMarkdownRoutes,
} from "../src/routes/auditCredentialResolverFakeHarnessExecutionReadinessRoutes.js";

const LATEST_FAKE_HARNESS_EXECUTION_READINESS_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("credential resolver fake-harness execution readiness audit route group", () => {
  it("keeps execution-denied and readiness decision routes registered through the shared route table", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = credentialResolverFakeHarnessExecutionReadinessAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: LATEST_FAKE_HARNESS_EXECUTION_READINESS_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${LATEST_FAKE_HARNESS_EXECUTION_READINESS_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(4);
      expect(paths[0]).toBe(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      );
      expect(paths).toContain(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification",
      );
      expect(paths).toContain(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      );
      expect(paths).toContain(LATEST_FAKE_HARNESS_EXECUTION_READINESS_ROUTE);
      expect(routeTableSource).toContain("...credentialResolverFakeHarnessExecutionReadinessAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification");
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification.v1",
        verificationState:
          "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready",
        readOnlyUpstreamEchoVerification: true,
        fakeHarnessReadinessBlockedDecisionVerificationOnly: true,
        readyForDisabledRuntimeShellPlanning: false,
        readyForManagedAuditResolverImplementation: false,
        realResolverImplementationAllowed: false,
        testOnlyFakeHarnessExecutionAllowed: false,
        fakeHarnessRuntimeEnabled: false,
        fakeHarnessInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        fakeSecretProviderInstantiated: false,
        fakeResolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
        upstreamEvidence: {
          javaV131: {
            readyForNodeV293: true,
          },
          miniKvV129: {
            readyForNodeV293: true,
            releaseVersion: "v129",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("fake harness readiness blocked decision upstream echo verification");
      expect(markdown.body).toContain("fake-harness-readiness-blocked-decision-upstream-echo-verification-ready");
      expect(markdown.body).toContain("RUN_V294_DISABLED_RUNTIME_SHELL_PRE_PLAN_INTAKE");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-424",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v424-route-split",
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4424",
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
