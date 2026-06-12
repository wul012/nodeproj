import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration regular gate archive verification", () => {
  it("verifies the Node v364 regular gate archive and folds in CI/operator friendly checks", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification.v1",
      archiveVerificationState: "minimal-read-only-integration-regular-gate-archive-verified",
      archiveVerificationDecision: "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check",
      readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification: true,
      readyForNodeV366ExplicitReadWindowGateExecutionDecision: true,
      consumesNodeV364MinimalReadOnlyIntegrationRegularGate: true,
      activeNodeVersion: "Node v365",
      sourceNodeVersion: "Node v364",
      archiveVerificationOnly: true,
      ciOperatorFriendlyCheckIncluded: true,
      rerunsLiveProbe: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      credentialValueRequested: false,
      credentialValueRead: false,
      rawEndpointUrlRequested: false,
      rawEndpointUrlParsed: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV364: {
        sourceVersion: "Node v364",
        gateState: "minimal-read-only-integration-regular-gate-ready",
        gateDecision: "standardize-v349-read-only-smoke-as-regular-gate",
        readyForMinimalReadOnlyIntegrationRegularGate: true,
        readyForNodeV365RegularGateArchiveVerification: true,
        sourceNodeVersion: "Node v350",
        sourceCheckCount: 25,
        sourcePassedCheckCount: 25,
        checkCount: 34,
        passedCheckCount: 34,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        readOnlyTargetCount: 5,
        requiredEnvCount: 4,
        requiredHeaderCount: 4,
        failureClassificationCount: 3,
        artifactExpectationCount: 6,
        productionBlockerCount: 0,
        regularGateOnly: true,
        gateDefinitionOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlParsed: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "minimal-read-only-integration-regular-gate-archive-verification",
        sourceSpan: "Node v364 minimal read-only integration regular gate",
        archiveRoot: "d/364",
        archiveVerificationDecision: "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesCiOperatorFriendlyCheck: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v366",
      },
      ciOperatorFriendlyCheck: {
        checkMode: "focused-ci-operator-friendly-regular-gate",
        buildCommand: "npm.cmd run build",
        smokeRoute:
          "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate",
        requiredHeaderCount: 4,
        readOnlyTargetCount: 5,
        failureClassificationCount: 3,
        splitsVerificationIntoFocusedSteps: true,
        avoidsFullTestBatchByDefault: true,
        requiresExplicitReadWindowForActualProbe: true,
        automaticUpstreamStart: false,
        rerunsJavaMiniKvNow: false,
        opensManagedAuditConnection: false,
        readsCredentialValue: false,
        parsesRawEndpointUrl: false,
        invokesRuntimeShell: false,
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonGateReadyForV365: true,
        jsonSourceV350Ready: true,
        jsonRegularGateRecorded: true,
        jsonReadOnlyTargetsComplete: true,
        jsonSafeEnvComplete: true,
        jsonRequiredHeadersComplete: true,
        jsonFailureClassificationsComplete: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsGateDecision: true,
        markdownRecordsTargetsAndSafeEnv: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsGateAndBoundary: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV365: true,
        planIndexReferencesV364AndV365: true,
        archiveIndexReferencesV364: true,
        routeRecordedInArchive: true,
        archiveVerificationDoesNotRerunProbe: true,
        ciCheckUsesFocusedCommands: true,
        ciCheckDocumentsOperatorHeaders: true,
        ciCheckKeepsReadWindowExplicit: true,
        ciCheckAvoidsLargeTestBatch: true,
        noAutomaticUpstreamStart: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointUrlRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noJavaMiniKvEchoRequired: true,
        archiveVerificationDigestStable: true,
        ciOperatorCheckDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 34,
        sourcePassedCheckCount: 34,
        readOnlyTargetCount: 5,
        requiredEnvCount: 4,
        requiredHeaderCount: 4,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV364.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV364.sourceTransitionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV364.sourceArchiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.ciOperatorFriendlyCheck.checkDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(40);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v364 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v365-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification).toBe(false);
      expect(profile.readyForNodeV366ExplicitReadWindowGateExecutionDecision).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_GATE_NOT_READY",
      ]));
      expect(profile.rerunsLiveProbe).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 180_000);

  it("exposes JSON and Markdown through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification.v1",
        archiveVerificationState: "minimal-read-only-integration-regular-gate-archive-verified",
        archiveVerificationDecision: "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check",
        activeNodeVersion: "Node v365",
        sourceNodeVersion: "Node v364",
        archiveVerificationOnly: true,
        ciOperatorFriendlyCheckIncluded: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration regular gate archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-minimal-read-only-integration-regular-gate-and-ci-operator-check",
      );
      expect(markdown.body).toContain("Ready for v366 explicit read-window gate execution decision: true");
      expect(markdown.body).toContain("focused-ci-operator-friendly-regular-gate");
      expect(markdown.body).toContain("avoidsFullTestBatchByDefault: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-365",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v365-regular-gate-archive",
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
    ...overrides,
  });
}
