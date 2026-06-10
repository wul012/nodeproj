import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";
import { loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification as loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationCore } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationCore.js";
import { renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown as renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdownModule } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationRenderer.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("keeps the stable entrypoint aligned with the split core and renderer modules", () => {
    expect(loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification).toBe(
      loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationCore,
    );
    expect(
      renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown,
    ).toBe(
      renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdownModule,
    );
  });

  it("aligns Node v264 with Java v107 and mini-kv v116 while keeping Java v109 as optimization context", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification.v1",
      verificationState: "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
        true,
      readOnlyUpstreamEchoVerification: true,
      testOnlyResolverShellUpstreamEchoVerificationOnly: true,
      fakeResolverOnly: true,
      handleOnlyRequest: true,
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
        sourceNodeV263Ready: true,
        sourceVerificationMode:
          "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only",
        sourceSpan: "Node v262 + Java v106 + mini-kv v115",
        sourceCheckCount: 19,
        sourcePassedCheckCount: 19,
        checkCount: 20,
        passedCheckCount: 20,
        productionBlockerCount: 0,
        fakeResolverProbeCovered: true,
        fakeResolverProbeNoCredentialRead: true,
        fakeResolverProbeNoExternalRequest: true,
        fakeResolverProbeNoProductionWrite: true,
        readyForNodeV265TestOnlyShellUpstreamEchoVerification: true,
      },
      upstreamEchoes: {
        javaV107: {
          sourceVersion: "Java v107",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v29",
          markerField: "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker",
          consumedNodeVersion: "Node v264",
          consumedNodeProfile:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1",
          nextNodeConsumerVersion: "Node v265",
          sourceSpan: "Node v264 credential resolver test-only shell contract",
          shellMode: "test-only-fake-resolver-contract",
          shellName: "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell",
          resolverKind: "fake-in-memory",
          requestShapeFieldCount: 9,
          responseShapeFieldCount: 13,
          failureMappingCount: 7,
          guardConditionCount: 10,
          fakeResolverProbeCount: 1,
          requestShapeEchoed: true,
          responseShapeEchoed: true,
          failureMappingEchoed: true,
          guardConditionsEchoed: true,
          fakeResolverProbeEchoed: true,
          fakeResolverOnlyEchoed: true,
          sideEffectBoundaryClosed: true,
          credentialResolverExecutionAllowed: false,
          connectsManagedAudit: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          schemaMigrationExecuted: false,
          productionRecordWritten: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: true,
        },
        miniKvV116: {
          sourceVersion: "mini-kv v116",
          receiptVersion: "mini-kv-test-only-resolver-shell-non-participation-receipt.v1",
          releaseVersion: "v116",
          consumerHint: "Node v265 test-only resolver shell upstream echo verification",
          sourceContractProfileVersion:
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1",
          sourceContractState: "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready",
          sourceShellMode: "test-only-fake-resolver-contract",
          sourceResolverKind: "fake-in-memory",
          sourceRequestShapeFieldCount: 9,
          sourceResponseShapeFieldCount: 13,
          sourceFailureMappingCount: 7,
          sourceGuardConditionCount: 10,
          sourceCheckCount: 20,
          sourcePassedCheckCount: 20,
          sourceProductionBlockerCount: 0,
          sourceNodeV263Ready: true,
          sourceNodeV263CheckCount: 19,
          sourceNodeV263PassedCheckCount: 19,
          fakeResolverProbeRequestId: "managed-audit-v264-test-only-resolver-shell-probe",
          fakeResolverProbeAcceptedByFakeResolver: true,
          fakeResolverProbeNoCredentialRead: true,
          fakeResolverProbeNoExternalRequest: true,
          fakeResolverProbeNoProductionWrite: true,
          readOnly: true,
          executionAllowed: false,
          dryRunOnly: true,
          testOnlyResolverShellContractOnly: true,
          testOnlyShell: true,
          fakeResolverOnly: true,
          handleOnlyRequest: true,
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
          managedAuditStore: false,
          managedAuditStorageBackend: false,
          orderAuthoritative: false,
          fakeResolverProbeExecuted: false,
          readyForNodeV265Alignment: true,
        },
      },
      optimizationContext: {
        javaV109: {
          sourceVersion: "Java v109",
          optimizationOnly: true,
          hardPrerequisiteForNodeV265: false,
          businessMarkerAdded: false,
          managedAuditBoundaryChanged: false,
          responseRecordsSplit: true,
          releaseApprovalRehearsalResponseRecordsPresent: true,
          mainResponseShellLineCount: 68,
          alignedWithNodeV265: true,
        },
      },
      echoVerification: {
        verificationMode:
          "java-v107-plus-mini-kv-v116-test-only-resolver-shell-upstream-echo-verification-only",
        sourceSpan: "Node v264 + Java v107 + mini-kv v116",
        testOnlyShellContractAligned: true,
        requestShapeAligned: true,
        responseShapeAligned: true,
        failureMappingAligned: true,
        guardConditionsAligned: true,
        fakeResolverProbeAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        miniKvNonParticipationAligned: true,
        javaV109OptimizationContextAligned: true,
        nodeV265KeepsRealResolverOutOfScope: true,
      },
      checks: {
        sourceNodeV264Ready: true,
        javaV107EchoReady: true,
        miniKvV116NonParticipationReady: true,
        javaV109OptimizationContextReady: true,
        testOnlyShellContractAligned: true,
        requestShapeAligned: true,
        responseShapeAligned: true,
        failureMappingAligned: true,
        guardConditionsAligned: true,
        fakeResolverProbeAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        miniKvNonParticipationAligned: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
          true,
      },
      summary: {
        requestShapeFieldCount: 9,
        responseShapeFieldCount: 13,
        failureMappingCount: 7,
        guardConditionCount: 10,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV264.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV116.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.sourceNodeV264.requestShapeFields).toEqual([
      "requestId",
      "operation",
      "credentialHandle",
      "endpointHandle",
      "resolverPolicyHandle",
      "approvalMarker",
      "approvalCorrelationId",
      "dryRun",
      "fakeResolverOnly",
    ]);
    expect(profile.upstreamEchoes.miniKvV116.failureClassCodes).toEqual([
      "RESOLVER_DISABLED",
      "APPROVAL_MARKER_MISSING",
      "CREDENTIAL_HANDLE_MISSING",
      "CREDENTIAL_VALUE_REQUESTED",
      "RAW_ENDPOINT_URL_REQUESTED",
      "EXTERNAL_REQUEST_REQUESTED",
      "SCHEMA_MIGRATION_REQUESTED",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(10);
    expect(profile.summary.matchedSnippetCount).toBe(50);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe(
      "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
    );
    expect(profile.upstreamEchoes.javaV107.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV116.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.optimizationContext.javaV109.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV107.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/107/解释/说明.md",
    );
    expect(profile.optimizationContext.javaV109.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/109/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV116.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/test-only-resolver-shell-non-participation-receipt.json",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(
      profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
    ).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.secretProviderInstantiated).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification.v1",
        verificationState: "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
        upstreamEchoes: {
          javaV107: {
            nextNodeConsumerVersion: "Node v265",
            readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: true,
          },
          miniKvV116: {
            releaseVersion: "v116",
            readyForNodeV265Alignment: true,
            credentialResolverInvoked: false,
            secretProviderInstantiated: false,
            resolverClientInstantiated: false,
          },
        },
        optimizationContext: {
          javaV109: {
            hardPrerequisiteForNodeV265: false,
            alignedWithNodeV265: true,
          },
        },
        checks: {
          testOnlyShellContractAligned: true,
          credentialBoundaryAligned: true,
          connectionBoundaryAligned: true,
          autoStartBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell upstream echo verification",
      );
      expect(markdown.body).toContain(
        "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
      );
      expect(markdown.body).toContain("KEEP_REAL_RESOLVER_OUT_OF_SCOPE");
    } finally {
      await app.close();
    }
  }, 15000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-265",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v265-credential-resolver-test-only-shell-upstream-echo-verification",
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
    PORT: "4365",
    ...overrides,
  });
}
