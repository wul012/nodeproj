import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration gate execution archive verification", () => {
  it("verifies the Node v367 gate execution archive without rerunning Java or mini-kv probes", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification.v1",
      archiveVerificationState: "minimal-read-only-integration-gate-execution-archive-verified",
      archiveVerificationDecision: "archive-minimal-read-only-gate-execution-and-operator-ci-handoff",
      readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification: true,
      readyForNodeV369OperatorCiRegularGateHandoff: true,
      consumesNodeV367MinimalReadOnlyIntegrationGateExecution: true,
      activeNodeVersion: "Node v368",
      sourceNodeVersion: "Node v367",
      archiveVerificationOnly: true,
      operatorCiHandoffCheckIncluded: true,
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
      requiresParallelJavaMiniKvReadContractFix: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV367: {
        sourceVersion: "Node v367",
        gateExecutionState: "minimal-read-only-integration-gate-executed",
        gateExecutionResult: "all-read-passed",
        gateExecutionDecision: "archive-read-passed-gate-execution",
        readyForMinimalReadOnlyIntegrationGateExecution: true,
        consumesNodeV366ExplicitReadWindowGateExecutionDecision: true,
        reusesNodeV349MinimalReadOnlySmokeLane: true,
        sourceNodeVersion: "Node v366",
        sourceNodeV366Ready: true,
        externalReadWindowConfirmed: true,
        liveProbePerformedNow: true,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        checkCount: 20,
        passedCheckCount: 20,
        productionBlockerCount: 0,
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
        runtimeShellImplemented: false,
        executionAllowed: false,
        requiresParallelJavaMiniKvReadContractFix: false,
      },
      archiveVerification: {
        verificationMode: "minimal-read-only-integration-gate-execution-archive-verification",
        sourceSpan: "Node v367 minimal read-only integration gate execution",
        archiveRoot: "d/367",
        archiveVerificationDecision: "archive-minimal-read-only-gate-execution-and-operator-ci-handoff",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        verifiesOperatorCiHandoffReadiness: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v369",
      },
      operatorCiHandoffCheck: {
        checkMode: "operator-ci-regular-minimal-read-only-gate-execution",
        sourceRoute:
          "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution",
        expectedPassedTargetCount: 5,
        expectedPassedCheckCount: 20,
        avoidsFullTestBatchByDefault: true,
        splitsVerificationIntoFocusedSteps: true,
        requiresExternalReadWindowForActualProbe: true,
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
        jsonGateExecutionPassed: true,
        jsonSourceNodeV366Ready: true,
        jsonReusedSmokeLaneReady: true,
        jsonGateExecutionRecorded: true,
        jsonTargetResultsComplete: true,
        jsonTargetResultsAllPassed: true,
        jsonTargetResultsReadOnlyNoMutation: true,
        jsonJavaTargetsGetOnly: true,
        jsonMiniKvTargetsReadOnlyCommandsOnly: true,
        jsonCountsMatchTargetResults: true,
        jsonChecksAllPassed: true,
        summaryMatchesJson: true,
        markdownRecordsPassedExecution: true,
        markdownRecordsSourceAndSmokeLane: true,
        browserSnapshotPresent: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsExecutionAndBoundary: true,
        codeWalkthroughPresent: true,
        sourcePlanPointsToV368: true,
        planIndexReferencesV367AndV368: true,
        archiveIndexReferencesV367: true,
        routeRecordedInArchive: true,
        archiveVerificationDoesNotRerunProbe: true,
        operatorCiCheckUsesFocusedCommands: true,
        operatorCiCheckKeepsReadWindowExplicit: true,
        operatorCiCheckAvoidsLargeTestBatch: true,
        noAutomaticUpstreamStart: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointUrlRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noJavaMiniKvFixRequired: true,
        archiveVerificationDigestStable: true,
        operatorCiCheckDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 20,
        sourcePassedCheckCount: 20,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        readOnlyTargetCount: 5,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV367.sourceDecisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV367.reusedSmokeArchiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV367.gateExecutionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorCiHandoffCheck.checkDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.targetResults.map((target) => target.methodOrCommand)).toEqual([
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
      "HEALTH",
      "INFOJSON",
      "STATSJSON",
    ]);
    expect(profile.summary.checkCount).toBe(42);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v367 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v368-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification).toBe(false);
      expect(profile.readyForNodeV369OperatorCiRegularGateHandoff).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "SOURCE_GATE_EXECUTION_NOT_PASSED",
      ]));
      expect(profile.rerunsLiveProbe).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification.v1",
        archiveVerificationState: "minimal-read-only-integration-gate-execution-archive-verified",
        archiveVerificationDecision: "archive-minimal-read-only-gate-execution-and-operator-ci-handoff",
        activeNodeVersion: "Node v368",
        sourceNodeVersion: "Node v367",
        archiveVerificationOnly: true,
        operatorCiHandoffCheckIncluded: true,
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
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration gate execution archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-minimal-read-only-gate-execution-and-operator-ci-handoff",
      );
      expect(markdown.body).toContain("Ready for v369 operator/CI regular gate handoff: true");
      expect(markdown.body).toContain("operator-ci-regular-minimal-read-only-gate-execution");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-368",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v368-gate-execution-archive",
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
