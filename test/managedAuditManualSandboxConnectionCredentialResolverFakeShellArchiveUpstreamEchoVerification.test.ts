import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver fake shell archive upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v266 with Java v110 and mini-kv v117 without opening a real resolver", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification.v1",
      verificationState: "credential-resolver-fake-shell-archive-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      archiveVerificationOnly: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
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
      sourceNodeV266: {
        sourceVersion: "Node v266",
        archiveVerificationState: "credential-resolver-fake-shell-archive-verification-ready",
        readyForArchiveVerification: true,
        sourceNodeV264Ready: true,
        sourceNodeV265Ready: true,
        sourceNodeV265ConsumesUpstreamEchoes: true,
        archiveFileCount: 9,
        requiredSnippetCount: 24,
        matchedSnippetCount: 24,
        checkCount: 28,
        passedCheckCount: 28,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
        readOnlyArchiveVerification: true,
        archiveVerificationRerunsFakeShellBehavior: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      },
      upstreamEchoes: {
        javaV110: {
          sourceVersion: "Java v110",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v30",
          archiveEchoMode: "java-v110-credential-resolver-fake-shell-archive-echo-receipt-only",
          consumedNodeVersion: "Node v266",
          consumedNodeProfile:
            "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1",
          nextNodeConsumerVersion: "Node v267",
          archiveFileCount: 9,
          requiredSnippetCount: 24,
          matchedSnippetCount: 24,
          checkCount: 28,
          passedCheckCount: 28,
          productionBlockerCount: 0,
          sourceNodeV264ContractEchoed: true,
          sourceNodeV265UpstreamEchoed: true,
          archiveEvidenceEchoed: true,
          archiveSnippetsEchoed: true,
          routeResponsesEchoed: true,
          readOnlyArchiveBoundaryEchoed: true,
          noFakeShellRerunEchoed: true,
          sideEffectBoundaryEchoed: true,
          upstreamActionsStillDisabledEchoed: true,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          connectsManagedAudit: false,
          approvalLedgerWritten: false,
          sqlExecuted: false,
          schemaMigrationExecuted: false,
          automaticUpstreamStart: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV267Alignment: true,
        },
        miniKvV117: {
          sourceVersion: "mini-kv v117",
          receiptVersion: "mini-kv-credential-resolver-fake-shell-archive-non-participation-receipt.v1",
          releaseVersion: "v117",
          consumerHint: "Node v267 credential resolver fake-shell archive upstream echo verification",
          sourceArchiveProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1",
          sourceArchiveVerificationState: "credential-resolver-fake-shell-archive-verification-ready",
          sourceReadyForCredentialResolverFakeShellArchiveVerification: true,
          sourceReadOnlyArchiveVerification: true,
          sourceArchiveVerificationRerunsFakeShellBehavior: false,
          sourceNodeV264Ready: true,
          sourceNodeV265Ready: true,
          sourceNodeV265ConsumesUpstreamEchoes: true,
          archiveFileCount: 9,
          requiredSnippetCount: 24,
          matchedSnippetCount: 24,
          checkCount: 28,
          passedCheckCount: 28,
          productionBlockerCount: 0,
          warningCount: 1,
          recommendationCount: 2,
          archiveFilesReadByMiniKv: false,
          archiveVerificationRerunsFakeShellBehavior: false,
          readOnly: true,
          executionAllowed: false,
          archiveVerificationOnly: true,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          externalAuditServiceAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          storageWriteAllowed: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          credentialValueStored: false,
          credentialValueIncluded: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlIncluded: false,
          externalRequestSent: false,
          schemaMigrationExecutionAllowed: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          managedAuditStorageBackend: false,
          orderAuthoritative: false,
          readyForNodeV267Alignment: true,
        },
      },
      echoVerification: {
        verificationMode: "java-v110-plus-mini-kv-v117-fake-shell-archive-upstream-echo-verification-only",
        sourceSpan: "Node v266 + Java v110 + mini-kv v117",
        sourceNodeV266Ready: true,
        javaV110EchoReady: true,
        miniKvV117NonParticipationReady: true,
        archiveCountsAligned: true,
        archiveSnippetsAligned: true,
        archiveNoRerunAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        nodeV267BlocksRealResolver: true,
      },
      checks: {
        sourceNodeV266Ready: true,
        sourceNodeV266RouteResponsesVerified: true,
        javaV110EchoReady: true,
        miniKvV117NonParticipationReady: true,
        archiveCountsAligned: true,
        archiveSnippetsAligned: true,
        archiveNoRerunAligned: true,
        readOnlyArchiveBoundaryAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification: true,
      },
      summary: {
        archiveFileCount: 9,
        requiredSnippetCount: 24,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV266.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV117.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(7);
    expect(profile.summary.matchedSnippetCount).toBe(32);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("credential-resolver-fake-shell-archive-upstream-echo-verification-ready");
    expect(profile.upstreamEchoes.javaV110.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV117.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV110.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/110/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV117.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-fake-shell-archive-non-participation-receipt.json",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification)
      .toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
    expect(profile.secretProviderInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification.v1",
        verificationState: "credential-resolver-fake-shell-archive-upstream-echo-verification-ready",
        readOnlyUpstreamEchoVerification: true,
        sourceNodeV266: {
          archiveFileCount: 9,
          requiredSnippetCount: 24,
          matchedSnippetCount: 24,
        },
        upstreamEchoes: {
          javaV110: {
            nextNodeConsumerVersion: "Node v267",
            readyForNodeV267Alignment: true,
          },
          miniKvV117: {
            releaseVersion: "v117",
            readyForNodeV267Alignment: true,
            archiveFilesReadByMiniKv: false,
            resolverClientInstantiated: false,
            secretProviderInstantiated: false,
          },
        },
        checks: {
          archiveCountsAligned: true,
          archiveSnippetsAligned: true,
          archiveNoRerunAligned: true,
          resolverBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver fake shell archive upstream echo verification",
      );
      expect(markdown.body).toContain("credential-resolver-fake-shell-archive-upstream-echo-verification-ready");
      expect(markdown.body).toContain("KEEP_SECRET_PROVIDER_OUT_OF_SCOPE");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-267",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v267-credential-resolver-fake-shell-archive-upstream-echo-verification",
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
    PORT: "4367",
    ...overrides,
  });
}
