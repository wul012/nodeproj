import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification";

describe("managed audit manual sandbox connection credential resolver sandbox handle review contract decision archive verification", () => {
  it("verifies the Node v356 contract decision archive and prepares v358", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification.v1",
      archiveVerificationState: "sandbox-handle-review-contract-decision-archive-verified",
      archiveVerificationDecision: "archive-sandbox-handle-review-contract-decision",
      readyForSandboxHandleReviewContractDecisionArchiveVerification: true,
      readyForNodeV358SandboxHandleReviewPacketOrGateIntake: true,
      consumesNodeV356SandboxHandleReviewContractDecision: true,
      activeNodeVersion: "Node v357",
      sourceNodeVersion: "Node v356",
      archiveVerificationOnly: true,
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
      sourceNodeV356: {
        sourceVersion: "Node v356",
        decisionState: "sandbox-handle-review-contract-decision-ready",
        decision: "define-sandbox-handle-review-contract",
        readyForContractDecision: true,
        readyForNodeV357ArchiveVerification: true,
        contractInputCount: 5,
        contractSectionCount: 6,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        checkCount: 25,
        passedCheckCount: 25,
        productionBlockerCount: 0,
        contractDecisionOnly: true,
        sandboxHandleReviewOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "sandbox-handle-review-contract-decision-archive-verification",
        sourceSpan: "Node v356 sandbox handle review contract decision",
        archiveRoot: "d/356",
        archiveVerificationDecision: "archive-sandbox-handle-review-contract-decision",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanAndArchiveIndexes: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v358",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonReadyForV357Verification: true,
        jsonDecisionValid: true,
        contractInputsRecorded: true,
        contractSectionsRecorded: true,
        allChecksPassedInSourceDecision: true,
        sourceNodeV355ArchiveEvidenceRecorded: true,
        summaryMatchesJson: true,
        markdownRecordsContractDecision: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsContractBoundary: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV356AndV357: true,
        archiveIndexReferencesV356: true,
        routeRecordedInArchive: true,
        verificationDoesNotRerunProbe: true,
        noUpstreamServiceStartedByNode: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointUrlRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noJavaMiniKvEchoRequired: true,
        archiveVerificationDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForSandboxHandleReviewContractDecisionArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        contractInputCount: 5,
        contractSectionCount: 6,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 25,
        sourcePassedCheckCount: 25,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV356.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV356.sourceArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(30);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v356 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v357-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewContractDecisionArchiveVerification).toBe(false);
      expect(profile.readyForNodeV358SandboxHandleReviewPacketOrGateIntake).toBe(false);
      expect(profile.summary.presentArchiveFileCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "ARCHIVE_FILES_MISSING",
        "ARCHIVE_JSON_UNREADABLE",
        "ARCHIVE_JSON_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification.v1",
        archiveVerificationState: "sandbox-handle-review-contract-decision-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-contract-decision",
        activeNodeVersion: "Node v357",
        sourceNodeVersion: "Node v356",
        archiveVerificationOnly: true,
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review contract decision archive verification",
      );
      expect(markdown.body).toContain("Archive verification decision: archive-sandbox-handle-review-contract-decision");
      expect(markdown.body).toContain("Ready for v358 sandbox handle review packet/gate intake: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-357",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v357-contract-archive",
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
