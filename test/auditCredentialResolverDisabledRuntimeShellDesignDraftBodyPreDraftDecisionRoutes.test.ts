import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  credentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionAuditJsonMarkdownRoutes,
} from "../src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionRoutes.js";

const LATEST_DISABLED_RUNTIME_SHELL_DESIGN_DRAFT_BODY_PRE_DRAFT_DECISION_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("credential resolver disabled runtime shell design draft body pre-draft decision audit route group", () => {
  it("keeps design draft body pre-draft decision routes registered through the shared route table", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = credentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: LATEST_DISABLED_RUNTIME_SHELL_DESIGN_DRAFT_BODY_PRE_DRAFT_DECISION_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${LATEST_DISABLED_RUNTIME_SHELL_DESIGN_DRAFT_BODY_PRE_DRAFT_DECISION_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(2);
      expect(paths[0]).toBe(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision",
      );
      expect(paths).toContain(LATEST_DISABLED_RUNTIME_SHELL_DESIGN_DRAFT_BODY_PRE_DRAFT_DECISION_ROUTE);
      expect(routeTableSource).toContain(
        "...credentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionAuditJsonMarkdownRoutes",
      );
      expect(routeTableSource).not.toContain(
        "loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification",
      );
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification.v1",
        archiveVerificationState: "disabled-design-draft-body-pre-draft-decision-archive-verified",
        archiveVerificationDecision: "pre-draft-decision-archive-verified-before-body-draft",
        activeNodeVersion: "Node v340",
        sourceNodeVersion: "Node v339",
        readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        readyForRuntimeShellImplementation: false,
        readyForRuntimeShellInvocation: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        automaticUpstreamStart: false,
        archiveVerification: {
          decision: "pre-draft-decision-archive-verified-before-body-draft",
          rerunsSourceEndpoint: false,
          writesBodyDraftNow: false,
          opensDisabledDesignDraftBodyNow: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v341",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("disabled runtime shell design draft body pre-draft decision archive verification");
      expect(markdown.body).toContain("Ready for Node v341 body preparation plan: true");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-440",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v440-route-split",
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
    PORT: "4440",
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
