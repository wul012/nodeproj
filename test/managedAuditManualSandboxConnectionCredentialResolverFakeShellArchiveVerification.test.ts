import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.js";

describe("managed audit manual sandbox connection credential resolver fake shell archive verification", () => {
  it("verifies v264 and v265 archive evidence without rerunning fake shell behavior", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1",
      archiveVerificationState: "credential-resolver-fake-shell-archive-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyArchiveVerification: true,
      archiveVerificationRerunsFakeShellBehavior: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV264: {
        sourceVersion: "Node v264",
        shellContractState: "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready",
        readyForTestOnlyShellContract: true,
        shellMode: "test-only-fake-resolver-contract",
        resolverKind: "fake-in-memory",
        requestShapeFieldCount: 9,
        responseShapeFieldCount: 13,
        failureMappingCount: 7,
        guardConditionCount: 10,
        fakeResolverOnly: true,
        handleOnlyRequest: true,
        credentialResolverExecutionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        connectsManagedAudit: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      },
      sourceNodeV265: {
        sourceVersion: "Node v265",
        verificationState: "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        verificationMode:
          "java-v107-plus-mini-kv-v116-test-only-resolver-shell-upstream-echo-verification-only",
        sourceSpan: "Node v264 + Java v107 + mini-kv v116",
        sourceNodeV264Ready: true,
        javaV107EchoReady: true,
        miniKvV116NonParticipationReady: true,
        javaV109OptimizationContextReady: true,
        requestShapeFieldCount: 9,
        responseShapeFieldCount: 13,
        failureMappingCount: 7,
        guardConditionCount: 10,
        checkCount: 20,
        passedCheckCount: 20,
        productionBlockerCount: 0,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        credentialResolverExecutionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        connectsManagedAudit: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      },
      archiveVerification: {
        evidenceSpan: "Node v264 credential resolver fake shell contract + Node v265 upstream echo archive",
        sourceNodeV264RoutePath:
          "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
        sourceNodeV265RoutePath:
          "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
        archiveVerificationReadsFilesOnly: true,
        archiveVerificationRerunsFakeShellBehavior: false,
        upstreamActionsEnabled: false,
        productionAuditAllowed: false,
      },
      archivedEvidence: {
        archiveRoots: ["c/264/", "c/265/"],
        sourceVersions: ["Node v264", "Node v265"],
        requiredSnippetCount: 24,
        matchedSnippetCount: 24,
      },
      checks: {
        sourceNodeV264Ready: true,
        sourceNodeV264DigestValid: true,
        sourceNodeV265Ready: true,
        sourceNodeV265DigestValid: true,
        sourceNodeV265ConsumesUpstreamEchoes: true,
        archiveFilesPresent: true,
        archiveFilesNonEmpty: true,
        v264HtmlPresent: true,
        v264ScreenshotPresent: true,
        v264ScreenshotNonEmpty: true,
        v264ExplanationPresent: true,
        v264CodeWalkthroughPresent: true,
        v265HtmlPresent: true,
        v265ScreenshotPresent: true,
        v265ScreenshotNonEmpty: true,
        v265ExplanationPresent: true,
        v265CodeWalkthroughPresent: true,
        archiveSnippetsMatched: true,
        v264ArchiveRecordsFakeShellContract: true,
        v265ArchiveRecordsUpstreamEchoVerification: true,
        walkthroughsRecordImplementationAndVerification: true,
        activePlanPointsToV266ArchiveVerification: true,
        routeResponsesVerified: true,
        noArchiveVerificationFakeShellRerun: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 9,
        requiredSnippetCount: 24,
        matchedSnippetCount: 24,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV264.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV265.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.archiveVerificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.archiveVerificationRerunsFakeShellBehavior).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
    expect(profile.secretProviderInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1",
        archiveVerificationState: "credential-resolver-fake-shell-archive-verification-ready",
        readOnlyArchiveVerification: true,
        archiveVerificationRerunsFakeShellBehavior: false,
        sourceNodeV264: {
          requestShapeFieldCount: 9,
          responseShapeFieldCount: 13,
          failureMappingCount: 7,
          guardConditionCount: 10,
        },
        sourceNodeV265: {
          sourceNodeV264Ready: true,
          javaV107EchoReady: true,
          miniKvV116NonParticipationReady: true,
          javaV109OptimizationContextReady: true,
        },
        checks: {
          archiveFilesPresent: true,
          archiveSnippetsMatched: true,
          noArchiveVerificationFakeShellRerun: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver fake shell archive verification",
      );
      expect(markdown.body).toContain("credential-resolver-fake-shell-archive-verification-ready");
      expect(markdown.body).toContain("WRITE_POST_V266_PLAN");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-266",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v266-credential-resolver-fake-shell-archive-verification",
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
    PORT: "4366",
    ...overrides,
  });
}
