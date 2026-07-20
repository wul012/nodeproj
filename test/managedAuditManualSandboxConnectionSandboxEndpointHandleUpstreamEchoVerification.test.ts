import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection sandbox endpoint handle upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v258 with Java v104 and mini-kv v113 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification.v1",
      verificationState: "sandbox-endpoint-handle-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV258: {
        sourceVersion: "Node v258",
        reviewState: "sandbox-endpoint-handle-preflight-review-ready",
        readyForPreflightReview: true,
        reviewMode: "sandbox-endpoint-handle-preflight-review-only",
        sourceSpan: "Node v257",
        endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
        credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        requiredReviewItemCount: 7,
        completedReviewItemCount: 7,
        forbiddenOperationCount: 7,
        checkCount: 19,
        passedCheckCount: 19,
        productionBlockerCount: 0,
        networkAllowlistReviewReady: true,
        tlsPolicyReviewReady: true,
        redactionPolicyReady: true,
        operatorWindowReviewReady: true,
        rawEndpointUrlParsed: false,
        rawEndpointUrlIncluded: false,
        credentialValueRead: false,
        externalRequestSent: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        storesManagedAuditCredential: false,
        readyForManagedAuditSandboxAdapterConnection: false,
        sourceNodeV257Ready: true,
        sourceNodeV257EvidenceFileCount: 6,
        sourceNodeV257MatchedSnippetCount: 33,
        readyForNodeV259UpstreamEchoVerification: true,
      },
      upstreamEchoes: {
        javaV104: {
          sourceVersion: "Java v104",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v26",
          markerField: "managedAuditSandboxEndpointHandlePreflightEchoMarker",
          consumedByNodeV258Profile:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1",
          nextNodeConsumerVersion: "Node v259",
          endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
          credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          requiredReviewItemCount: 7,
          completedReviewItemCount: 7,
          forbiddenOperationCount: 7,
          sourceEvidenceFileCount: 6,
          sourceMatchedSnippetCount: 33,
          networkAllowlistReviewEchoed: true,
          tlsPolicyReviewEchoed: true,
          redactionPolicyEchoed: true,
          operatorWindowReviewEchoed: true,
          rawEndpointUrlParsed: false,
          rawEndpointUrlIncluded: false,
          credentialValueRead: false,
          externalRequestSent: false,
          schemaMigrationExecuted: false,
          automaticUpstreamStart: false,
          connectsManagedAudit: false,
          approvalLedgerWritten: false,
          javaStarted: false,
          miniKvStarted: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification: true,
        },
        miniKvV113: {
          sourceVersion: "mini-kv v113",
          receiptVersion: "mini-kv-sandbox-endpoint-handle-non-participation-receipt.v1",
          releaseVersion: "v113",
          consumerHint: "Node v259 sandbox endpoint handle upstream echo verification",
          sourcePreflightProfileVersion:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1",
          sourceReviewState: "sandbox-endpoint-handle-preflight-review-ready",
          sourceReviewMode: "sandbox-endpoint-handle-preflight-review-only",
          sourceSpan: "Node v257",
          sourceReadyForPreflightReview: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceReadOnlyPreflightReview: true,
          sourceExecutionAllowed: false,
          sourceConnectsManagedAudit: false,
          sourceReadsManagedAuditCredential: false,
          sourceStoresManagedAuditCredential: false,
          sourceSchemaMigrationExecuted: false,
          sourceAutomaticUpstreamStart: false,
          sourceExternalRequestSent: false,
          sourceRawEndpointUrlParsed: false,
          sourceRawEndpointUrlIncluded: false,
          sourceCredentialValueRead: false,
          sourceRequiredReviewItemCount: 7,
          sourceCompletedReviewItemCount: 7,
          sourceForbiddenOperationCount: 7,
          sourceCheckCount: 19,
          sourcePassedCheckCount: 19,
          sourceProductionBlockerCount: 0,
          sourceNodeV257Ready: true,
          sourceNodeV257BoundariesAligned: true,
          sourceNodeV257EvidenceFileCount: 6,
          sourceNodeV257MatchedSnippetCount: 33,
          sourceNodeV257ReadyForNodeV258PreflightReview: true,
          sourceUpstreamActionsStillDisabled: true,
          endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
          credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          networkAllowlistReady: true,
          tlsPolicyReady: true,
          redactionPolicyReady: true,
          operatorWindowReady: true,
          readOnly: true,
          executionAllowed: false,
          dryRunOnly: true,
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          externalAuditServiceAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          storageWriteAllowed: false,
          managedAuditWriteExecuted: false,
          approvalLedgerWriteAllowed: false,
          approvalLedgerWriteExecuted: false,
          sandboxManagedAuditStateWriteAllowed: false,
          credentialValueRequired: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          credentialValueIncluded: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlIncluded: false,
          externalRequestSent: false,
          schemaRehearsalExecutionAllowed: false,
          schemaMigrationExecutionAllowed: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          managedAuditStorageBackend: false,
          sandboxAuditStorageBackend: false,
          orderAuthoritative: false,
          readyForNodeV259Alignment: true,
        },
      },
      echoVerification: {
        verificationMode: "java-v104-plus-mini-kv-v113-sandbox-endpoint-handle-upstream-echo-verification-only",
        sourceSpan: "Node v258 + Java v104 + mini-kv v113",
        endpointHandleAligned: true,
        credentialHandleAligned: true,
        reviewCountsAligned: true,
        policyReviewsAligned: true,
        operatorWindowAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        miniKvNonParticipationAligned: true,
        nodeV259BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV258Ready: true,
        javaV104EchoReady: true,
        miniKvV113NonParticipationReady: true,
        endpointHandleAligned: true,
        credentialHandleAligned: true,
        reviewCountsAligned: true,
        networkAllowlistAligned: true,
        tlsPolicyAligned: true,
        redactionPolicyAligned: true,
        operatorWindowAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV258.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV113.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(6);
    expect(profile.summary.matchedSnippetCount).toBe(39);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("sandbox-endpoint-handle-upstream-echo-verification-ready");
    expect(profile.upstreamEchoes.javaV104.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV113.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV104.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/104/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV113.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/sandbox-endpoint-handle-non-participation-receipt.json",
    );
  });

  it("freezes portable fallback JSON and Markdown across the hotspot split", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    const stableProfile = {
      ...profile,
      generatedAt: "2026-07-20T00:00:00.000Z",
    };
    const normalizedProfile = normalizeForParity(stableProfile) as typeof stableProfile;
    const json = JSON.stringify(normalizedProfile);
    const markdown = normalizeText(
      renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown(normalizedProfile),
    );

    expect.soft(Buffer.byteLength(json, "utf8")).toBe(26_606);
    expect.soft(sha256(json)).toBe(
      "060e69684b6305216ccc92cb10028a4a38c5fc648caed67f0f8a0373545a1584",
    );
    expect.soft(Buffer.byteLength(markdown, "utf8")).toBe(26_245);
    expect.soft(sha256(markdown)).toBe(
      "159a5ccc99ae6033cbf4de0f4ea1b763d0e5706c2eefbf36e179662453b7ff5b",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification.v1",
        verificationState: "sandbox-endpoint-handle-upstream-echo-verification-ready",
        upstreamEchoes: {
          javaV104: {
            nextNodeConsumerVersion: "Node v259",
            readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification: true,
          },
          miniKvV113: {
            releaseVersion: "v113",
            readyForNodeV259Alignment: true,
            storageWriteAllowed: false,
          },
        },
        checks: {
          endpointHandleAligned: true,
          rawEndpointBoundaryAligned: true,
          autoStartBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint handle upstream echo verification",
      );
      expect(markdown.body).toContain("sandbox-endpoint-handle-upstream-echo-verification-ready");
      expect(markdown.body).toContain("WRITE_V260_DECISION_RECORD_NEXT");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-259",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v259-sandbox-endpoint-handle-upstream-echo-verification",
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
    PORT: "4359",
    ...overrides,
  });
}

function normalizeForParity(value: unknown): unknown {
  if (typeof value === "string") {
    return normalizeText(value);
  }
  if (Array.isArray(value)) {
    return value.map(normalizeForParity);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, normalizeForParity(entry)]),
    );
  }
  return value;
}

function normalizeText(value: string): string {
  const repositoryRoot = process.cwd().replace(/\\/g, "/");
  return value.replace(/\\/g, "/").replaceAll(repositoryRoot, "<repo>");
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
