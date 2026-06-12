import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.js";
import { loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification as loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationCore } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationCore.js";
import { renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown as renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdownModule } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationRenderer.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection sandbox endpoint credential resolver upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("keeps the stable entrypoint aligned with the split core and renderer modules", () => {
    expect(loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification).toBe(
      loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationCore,
    );
    expect(renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown).toBe(
      renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdownModule,
    );
  });

  it("verifies Node v260 with Java v105 and mini-kv v114 without resolving credentials", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification.v1",
      verificationState: "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
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
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV260: {
        sourceVersion: "Node v260",
        decisionState: "sandbox-endpoint-credential-resolver-decision-record-ready",
        readyForCredentialResolverDecisionRecord: true,
        recordMode: "sandbox-endpoint-credential-resolver-decision-record-only",
        decisionScope: "managed-audit-sandbox-endpoint-credential-resolver",
        decisionStatus: "human-review-required-before-credential-resolution",
        sourceSpan: "Node v259 sandbox endpoint handle upstream echo verification",
        endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
        credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
        approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
        operatorIdentityRequired: true,
        approvalCorrelationRequired: true,
        resolverMode: "policy-record-only-no-value-read",
        resolverCandidateImplementation: "not-implemented",
        requiredDecisionFieldCount: 8,
        explicitNoGoConditionCount: 9,
        credentialValueMayBeRead: false,
        credentialValueMayBeLoaded: false,
        credentialValueMayBeStored: false,
        rawEndpointUrlMayBeParsed: false,
        managedAuditConnectionMayOpen: false,
        schemaMigrationMayExecute: false,
        externalRequestMayBeSent: false,
        nodeMayStartJavaOrMiniKv: false,
        miniKvMayActAsManagedAuditStorage: false,
        approvalLedgerMayBeWritten: false,
        checkCount: 20,
        passedCheckCount: 20,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
        sourceNodeV259Ready: true,
        sourceNodeV259EvidenceFileCount: 6,
        sourceNodeV259MatchedSnippetCount: 39,
        readyForNodeV261CredentialResolverUpstreamEchoVerification: true,
      },
      upstreamEchoes: {
        javaV105: {
          sourceVersion: "Java v105",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v27",
          markerField: "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker",
          consumedNodeVersion: "Node v260",
          consumedNodeProfile:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1",
          nextNodeConsumerVersion: "Node v261",
          endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
          credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
          approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
          resolverMode: "policy-record-only-no-value-read",
          resolverCandidateImplementation: "not-implemented",
          requiredDecisionFieldCount: 8,
          explicitNoGoConditionCount: 9,
          sourceEvidenceFileCount: 6,
          sourceMatchedSnippetCount: 39,
          sourceCheckCount: 19,
          credentialValueMayBeRead: false,
          rawEndpointUrlMayBeParsed: false,
          externalRequestMayBeSent: false,
          schemaMigrationMayExecute: false,
          approvalLedgerMayBeWritten: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          javaStarted: false,
          miniKvStarted: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification: true,
        },
        miniKvV114: {
          sourceVersion: "mini-kv v114",
          receiptVersion: "mini-kv-credential-resolver-non-participation-receipt.v1",
          releaseVersion: "v114",
          consumerHint: "Node v261 credential resolver upstream echo verification",
          sourceDecisionProfileVersion:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1",
          sourceDecisionState: "sandbox-endpoint-credential-resolver-decision-record-ready",
          sourceRecordMode: "sandbox-endpoint-credential-resolver-decision-record-only",
          sourceDecisionScope: "managed-audit-sandbox-endpoint-credential-resolver",
          sourceDecisionStatus: "human-review-required-before-credential-resolution",
          sourceSpan: "Node v259 sandbox endpoint handle upstream echo verification",
          sourceReadyForDecisionRecord: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceReadOnlyDecisionRecord: true,
          sourceCredentialResolverDecisionOnly: true,
          sourceExecutionAllowed: false,
          sourceConnectsManagedAudit: false,
          sourceReadsManagedAuditCredential: false,
          sourceStoresManagedAuditCredential: false,
          sourceCredentialValueRead: false,
          sourceCredentialValueLoaded: false,
          sourceCredentialValueIncluded: false,
          sourceRawEndpointUrlParsed: false,
          sourceRawEndpointUrlIncluded: false,
          sourceExternalRequestSent: false,
          sourceSchemaMigrationExecuted: false,
          sourceAutomaticUpstreamStart: false,
          sourceRequiredDecisionFieldCount: 8,
          sourceExplicitNoGoConditionCount: 9,
          sourceCheckCount: 20,
          sourcePassedCheckCount: 20,
          sourceProductionBlockerCount: 0,
          sourceWarningCount: 2,
          sourceRecommendationCount: 2,
          sourceNodeV259Ready: true,
          sourceNodeV259BlocksRealConnection: true,
          sourceNodeV259CredentialBoundaryAligned: true,
          sourceNodeV259RawEndpointBoundaryAligned: true,
          sourceNodeV259WriteBoundaryAligned: true,
          sourceNodeV259AutoStartBoundaryAligned: true,
          sourceNodeV259KeepsMiniKvNonParticipant: true,
          sourceNodeV259EvidenceFileCount: 6,
          sourceNodeV259MatchedSnippetCount: 39,
          sourceNodeV259ReadyForNodeV260DecisionRecord: true,
          sourceUpstreamActionsStillDisabled: true,
          endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
          credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
          approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
          operatorIdentityRequired: true,
          approvalCorrelationRequired: true,
          resolverMode: "policy-record-only-no-value-read",
          resolverCandidateImplementation: "not-implemented",
          requiredDecisionFieldCount: 8,
          explicitNoGoConditionCount: 9,
          readOnly: true,
          executionAllowed: false,
          dryRunOnly: true,
          credentialResolverDecisionOnly: true,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          secretProviderInstantiated: false,
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
          credentialValueStored: false,
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
          readyForNodeV261Alignment: true,
        },
      },
      echoVerification: {
        verificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
        sourceSpan: "Node v260 + Java v105 + mini-kv v114",
        decisionRecordAligned: true,
        requiredDecisionFieldsAligned: true,
        explicitNoGoConditionsAligned: true,
        resolverPolicyAligned: true,
        approvalMarkerAligned: true,
        operatorIdentityAligned: true,
        approvalCorrelationAligned: true,
        redactionAndFallbackAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        miniKvNonParticipationAligned: true,
        nodeV261BlocksCredentialResolution: true,
      },
      checks: {
        sourceNodeV260Ready: true,
        javaV105EchoReady: true,
        miniKvV114NonParticipationReady: true,
        decisionRecordAligned: true,
        requiredDecisionFieldsAligned: true,
        explicitNoGoConditionsAligned: true,
        resolverPolicyAligned: true,
        approvalMarkerAligned: true,
        operatorIdentityAligned: true,
        approvalCorrelationAligned: true,
        redactionAndFallbackAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV260.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV114.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.sourceNodeV260.requiredDecisionFieldIds).toEqual([
      "endpoint-handle",
      "credential-handle",
      "resolver-policy-handle",
      "approval-marker",
      "operator-identity",
      "approval-correlation",
      "redaction-policy",
      "fallback-rotation-plan",
    ]);
    expect(profile.upstreamEchoes.miniKvV114.explicitNoGoConditionCodes).toContain("CREDENTIAL_VALUE_REQUIRED");
    expect(profile.upstreamEchoes.miniKvV114.explicitNoGoConditionCodes).toContain("REAL_CONNECTION_REQUIRED");
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(6);
    expect(profile.summary.matchedSnippetCount).toBe(45);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("sandbox-endpoint-credential-resolver-upstream-echo-verification-ready");
    expect(profile.upstreamEchoes.javaV105.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV114.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV105.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/105/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV114.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-non-participation-receipt.json",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.credentialValueRead).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification.v1",
        verificationState: "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready",
        upstreamEchoes: {
          javaV105: {
            nextNodeConsumerVersion: "Node v261",
            readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification: true,
          },
          miniKvV114: {
            releaseVersion: "v114",
            readyForNodeV261Alignment: true,
            credentialResolverInvoked: false,
            secretProviderInstantiated: false,
          },
        },
        checks: {
          resolverPolicyAligned: true,
          credentialBoundaryAligned: true,
          connectionBoundaryAligned: true,
          autoStartBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint credential resolver upstream echo verification",
      );
      expect(markdown.body).toContain("sandbox-endpoint-credential-resolver-upstream-echo-verification-ready");
      expect(markdown.body).toContain("WRITE_V262_DISABLED_PRECHECK_NEXT");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-261",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v261-credential-resolver-upstream-echo-verification",
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
    PORT: "4361",
    ...overrides,
  });
}
