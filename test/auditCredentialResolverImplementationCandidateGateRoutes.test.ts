import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes,
} from "../src/routes/auditCredentialResolverImplementationCandidateGateRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

const LATEST_IMPLEMENTATION_CANDIDATE_GATE_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("credential resolver implementation candidate gate audit route group", () => {
  it("keeps implementation candidate gate hardening routes registered through the shared route table", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());
    try {
      const paths = credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: LATEST_IMPLEMENTATION_CANDIDATE_GATE_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${LATEST_IMPLEMENTATION_CANDIDATE_GATE_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(2);
      expect(paths[0]).toBe(
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision",
      );
      expect(paths).toContain(LATEST_IMPLEMENTATION_CANDIDATE_GATE_ROUTE);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes,
      });
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review.v1",
        reviewState: "candidate-gate-upstream-hardening-review-ready",
        upstreamAlignmentDecision: "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review",
        activeNodeVersion: "Node v330",
        sourceNodeVersion: "Node v329",
        sourceJavaEvidenceExportVersion: "Java v151",
        sourceJavaInputHardeningEchoVersion: "Java v152",
        sourceMiniKvVersion: "mini-kv v143",
        readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForRuntimeShellImplementation: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        miniKvWriteCommandAllowed: false,
        automaticUpstreamStart: false,
        hardeningReview: {
          decision: "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review",
          nextNodeVersionSuggested: "Node v331",
          allowsDisabledRuntimeShellDesignDraftNow: false,
          allowsRuntimeShellImplementation: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("candidate gate upstream hardening review");
      expect(markdown.body).toContain("Java v151");
      expect(markdown.body).toContain("Java v152");
      expect(markdown.body).toContain("mini-kv v143");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-435",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v435-route-split",
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
    PORT: "4435",
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
