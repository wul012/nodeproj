import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import { loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification as loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationCore } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationCore.js";
import { renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown as renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdownModule } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationRenderer.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("keeps the stable entrypoint aligned with the split core and renderer modules", () => {
    expect(loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification).toBe(
      loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationCore,
    );
    expect(
      renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
    ).toBe(
      renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdownModule,
    );
  });

  it("verifies Node v262 with Java v106 and mini-kv v115 without opening credential resolver boundaries", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification.v1",
      verificationState: "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification:
        true,
      readOnlyUpstreamEchoVerification: true,
      disabledCredentialResolverPrecheckOnly: true,
      credentialResolverExecutionAllowed: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueLoaded: false,
      credentialValueStored: false,
      credentialValueIncluded: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlIncluded: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV262: {
        sourceVersion: "Node v262",
        precheckState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
        readyForDisabledPrecheck: true,
        precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
        resolverImplementationStatus: "not-implemented",
        secretProviderImplementationStatus: "not-implemented",
        requiredEnvHandleCount: 6,
        optInGateCount: 2,
        failureClassCount: 7,
        dryRunResponseFieldCount: 12,
        inheritedNoGoConditionCount: 9,
        sourceNodeV261Ready: true,
        sourceVerificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
        sourceSpan: "Node v260 + Java v105 + mini-kv v114",
        sourceBlocksCredentialResolution: true,
        sourceCredentialBoundaryAligned: true,
        sourceRawEndpointBoundaryAligned: true,
        sourceConnectionBoundaryAligned: true,
        sourceWriteBoundaryAligned: true,
        sourceAutoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        resolverClientMayBeInstantiated: false,
        secretProviderMayBeInstantiated: false,
        credentialValueMayBeLoaded: false,
        rawEndpointUrlMayBeParsed: false,
        externalRequestMayBeSent: false,
        credentialResolverExecutionAllowed: false,
        credentialValueRead: false,
        credentialValueLoaded: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        connectsManagedAudit: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        checkCount: 24,
        passedCheckCount: 24,
        productionBlockerCount: 0,
        readyForNodeV263DisabledPrecheckUpstreamEchoVerification: true,
      },
      upstreamEchoes: {
        javaV106: {
          sourceVersion: "Java v106",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v28",
          markerField: "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker",
          consumedNodeVersion: "Node v262",
          consumedNodeProfile:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1",
          nextNodeConsumerVersion: "Node v263",
          precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
          sourceVerificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
          requiredEnvHandleCount: 6,
          optInGateCount: 2,
          failureClassCount: 7,
          dryRunResponseFieldCount: 12,
          inheritedNoGoConditionCount: 9,
          sourceCheckCount: 20,
          sourcePassedCheckCount: 20,
          resolverImplementationStatus: "not-implemented",
          secretProviderImplementationStatus: "not-implemented",
          resolverClientMayBeInstantiated: false,
          secretProviderMayBeInstantiated: false,
          credentialValueMayBeLoaded: false,
          rawEndpointUrlMayBeParsed: false,
          externalRequestMayBeSent: false,
          credentialResolverExecutionAllowed: false,
          connectsManagedAudit: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: true,
        },
        miniKvV115: {
          sourceVersion: "mini-kv v115",
          receiptVersion: "mini-kv-disabled-credential-resolver-precheck-non-participation-receipt.v1",
          releaseVersion: "v115",
          consumerHint: "Node v263 disabled credential resolver upstream echo verification",
          sourcePrecheckProfileVersion:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1",
          sourcePrecheckState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
          sourcePrecheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
          sourceSpan: "Node v260 + Java v105 + mini-kv v114",
          sourceReadyForDisabledPrecheck: true,
          sourceRequiredEnvHandleCount: 6,
          sourceOptInGateCount: 2,
          sourceFailureClassCount: 7,
          sourceDryRunResponseFieldCount: 12,
          sourceInheritedNoGoConditionCount: 9,
          sourceCheckCount: 24,
          sourcePassedCheckCount: 24,
          sourceNodeV261Ready: true,
          sourceNodeV261VerificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
          sourceNodeV261Span: "Node v260 + Java v105 + mini-kv v114",
          sourceNodeV261BlocksCredentialResolution: true,
          sourceNodeV261CredentialBoundaryAligned: true,
          sourceNodeV261RawEndpointBoundaryAligned: true,
          sourceNodeV261ConnectionBoundaryAligned: true,
          sourceNodeV261WriteBoundaryAligned: true,
          sourceNodeV261AutoStartBoundaryAligned: true,
          disabledPrecheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
          disabledPrecheckReadyState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
          resolverImplementationStatus: "not-implemented",
          secretProviderImplementationStatus: "not-implemented",
          resolverClientMayBeInstantiated: false,
          secretProviderMayBeInstantiated: false,
          credentialValueMayBeLoaded: false,
          rawEndpointUrlMayBeParsed: false,
          externalRequestMayBeSent: false,
          optInGateRequired: true,
          requiredEnvHandleCount: 6,
          optInGateCount: 2,
          failureClassCount: 7,
          dryRunResponseFieldCount: 12,
          inheritedNoGoConditionCount: 9,
          readOnly: true,
          executionAllowed: false,
          dryRunOnly: true,
          disabledCredentialResolverPrecheckOnly: true,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          connectionExecutionAllowed: false,
          storageWriteAllowed: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          schemaMigrationExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          managedAuditStorageBackend: false,
          orderAuthoritative: false,
          readyForNodeV263Alignment: true,
        },
      },
      echoVerification: {
        verificationMode:
          "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only",
        sourceSpan: "Node v262 + Java v106 + mini-kv v115",
        disabledPrecheckAligned: true,
        requiredEnvHandlesAligned: true,
        optInGatesAligned: true,
        failureTaxonomyAligned: true,
        dryRunResponseShapeAligned: true,
        inheritedNoGoConditionsAligned: true,
        sourceNodeV261Aligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        miniKvNonParticipationAligned: true,
        nodeV263BlocksCredentialResolution: true,
      },
      checks: {
        sourceNodeV262Ready: true,
        javaV106EchoReady: true,
        miniKvV115NonParticipationReady: true,
        disabledPrecheckAligned: true,
        requiredEnvHandlesAligned: true,
        optInGatesAligned: true,
        failureTaxonomyAligned: true,
        dryRunResponseShapeAligned: true,
        inheritedNoGoConditionsAligned: true,
        sourceNodeV261Aligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification:
          true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV262.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV115.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.sourceNodeV262.requiredEnvHandleNames).toEqual([
      "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
      "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
    ]);
    expect(profile.upstreamEchoes.miniKvV115.failureTaxonomyCodes).toContain("CREDENTIAL_VALUE_REQUESTED");
    expect(profile.upstreamEchoes.miniKvV115.failureTaxonomyCodes).toContain("RAW_ENDPOINT_URL_REQUESTED");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(7);
    expect(profile.summary.matchedSnippetCount).toBe(38);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe(
      "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready",
    );
    expect(profile.upstreamEchoes.javaV106.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV115.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV106.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/106/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV115.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/disabled-credential-resolver-precheck-non-participation-receipt.json",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(
      profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
    ).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
    expect(profile.secretProviderInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification.v1",
        verificationState: "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready",
        upstreamEchoes: {
          javaV106: {
            nextNodeConsumerVersion: "Node v263",
            readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: true,
          },
          miniKvV115: {
            releaseVersion: "v115",
            readyForNodeV263Alignment: true,
            credentialResolverInvoked: false,
            secretProviderInstantiated: false,
            resolverClientInstantiated: false,
          },
        },
        checks: {
          disabledPrecheckAligned: true,
          credentialBoundaryAligned: true,
          connectionBoundaryAligned: true,
          autoStartBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck upstream echo verification",
      );
      expect(markdown.body).toContain("sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready");
      expect(markdown.body).toContain("KEEP_REAL_RESOLVER_OUT_OF_SCOPE");
    } finally {
      await app.close();
    }
  }, 15000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-263",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v263-credential-resolver-disabled-precheck-upstream-echo-verification",
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
    PORT: "4363",
    ...overrides,
  });
}
