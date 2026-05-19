import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection sandbox endpoint handle preflight review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("reviews sandbox endpoint and credential handles without resolving values or connecting", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1",
      reviewState: "sandbox-endpoint-handle-preflight-review-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview: true,
      readOnlyPreflightReview: true,
      endpointHandleOnly: true,
      credentialHandleOnly: true,
      rawEndpointUrlParsed: false,
      rawEndpointUrlIncluded: false,
      credentialValueRead: false,
      externalRequestSent: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV257: {
        sourceVersion: "Node v257",
        verificationState: "fake-transport-packet-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        requestShapeAligned: true,
        responseShapeAligned: true,
        timeoutBoundaryAligned: true,
        failureMappingAligned: true,
        cleanupBoundaryAligned: true,
        archiveNoRerunAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        storesManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        evidenceFileCount: 6,
        matchedSnippetCount: 33,
        readyForNodeV258PreflightReview: true,
      },
      preflightReview: {
        reviewMode: "sandbox-endpoint-handle-preflight-review-only",
        sourceSpan: "Node v257",
        endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
        credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        ownerApprovalArtifactId: "owner-approval-artifact-review-only",
        schemaRehearsalId: "schema-migration-rehearsal-review-only",
        operatorWindowMarker: "manual-sandbox-endpoint-window-review-only",
        endpointHandleReviewed: true,
        credentialHandleReviewed: true,
        ownerApprovalArtifactReviewed: true,
        networkAllowlistReview: {
          reviewRequired: true,
          allowlistHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_NETWORK_ALLOWLIST_HANDLE",
          rawHostIncluded: false,
          cidrIncluded: false,
          reviewed: true,
        },
        tlsPolicyReview: {
          reviewRequired: true,
          policyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_TLS_POLICY_HANDLE",
          certificateMaterialIncluded: false,
          privateKeyIncluded: false,
          reviewed: true,
        },
        redactionPolicy: {
          reviewRequired: true,
          policyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_REDACTION_POLICY_HANDLE",
          credentialValueRedacted: true,
          rawEndpointUrlRedacted: true,
          payloadSecretRedacted: true,
          reviewed: true,
        },
        operatorWindow: {
          manualWindowRequired: true,
          windowOpen: false,
          executionBlockedUntilWindowOpen: true,
          operatorIdentityRequired: true,
          approvalCorrelationRequired: true,
          reviewed: true,
        },
        nextRequiredEchoVersions: ["Java v104", "mini-kv v113"],
      },
      checks: {
        sourceNodeV257Ready: true,
        sourceNodeV257BoundariesAligned: true,
        endpointHandleOnly: true,
        credentialHandleOnly: true,
        ownerApprovalArtifactPresent: true,
        networkAllowlistReviewReady: true,
        tlsPolicyReviewReady: true,
        redactionPolicyReady: true,
        operatorWindowReviewReady: true,
        noRawEndpointUrlParsed: true,
        noRawEndpointUrlIncluded: true,
        noCredentialValueRead: true,
        noExternalRequestSent: true,
        noSchemaMigrationExecuted: true,
        noUpstreamAutoStart: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview: true,
      },
      summary: {
        requiredReviewItemCount: 7,
        completedReviewItemCount: 7,
        forbiddenOperationCount: 7,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV257.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preflightReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preflightReview.requiredReviewItems).toContain("network allowlist review");
    expect(profile.preflightReview.forbiddenOperations).toEqual([
      "read credential value",
      "parse raw endpoint URL",
      "send real managed audit request",
      "execute schema migration",
      "write approval ledger",
      "start Java or mini-kv",
      "promote mini-kv to managed audit storage backend",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("keeps historical fallback compatible for GitHub runner checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({
      config: loadTestConfig(),
    });

    expect(profile.reviewState).toBe("sandbox-endpoint-handle-preflight-review-ready");
    expect(profile.sourceNodeV257.readyForNodeV258PreflightReview).toBe(true);
    expect(profile.preflightReview.endpointHandle).toBe("ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE");
    expect(profile.preflightReview.credentialHandle).toBe("ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE");
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1",
        reviewState: "sandbox-endpoint-handle-preflight-review-ready",
        preflightReview: {
          endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
          credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          nextRequiredEchoVersions: ["Java v104", "mini-kv v113"],
        },
        checks: {
          endpointHandleOnly: true,
          noRawEndpointUrlParsed: true,
          noExternalRequestSent: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint handle preflight review",
      );
      expect(markdown.body).toContain("sandbox-endpoint-handle-preflight-review-ready");
      expect(markdown.body).toContain("RUN_PARALLEL_UPSTREAM_ECHO_ROUND");
    } finally {
      await app.close();
    }
  }, 15000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-258",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v258-sandbox-endpoint-handle-preflight-review",
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
    PORT: "4358",
    ...overrides,
  });
}
