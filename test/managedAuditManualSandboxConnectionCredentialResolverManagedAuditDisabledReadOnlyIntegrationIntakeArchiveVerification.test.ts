import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification";

describe("managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake archive verification", () => {
  it("verifies the Node v351 intake archive and prepares a v353 decision record", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification.v1",
      archiveVerificationState: "managed-audit-disabled-read-only-integration-intake-archive-verified",
      archiveVerificationDecision: "archive-managed-audit-disabled-read-only-integration-intake",
      readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: true,
      readyForNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord: true,
      consumesNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake: true,
      activeNodeVersion: "Node v352",
      sourceNodeVersion: "Node v351",
      archiveVerificationOnly: true,
      rerunsLiveProbe: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      readsManagedAuditCredential: false,
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
      sourceNodeV351: {
        sourceVersion: "Node v351",
        intakeState: "managed-audit-disabled-read-only-integration-intake-ready",
        intakeDecision: "define-managed-audit-disabled-read-only-integration-stage",
        readyForIntake: true,
        inputCount: 3,
        closedScopeCount: 7,
        checkCount: 20,
        passedCheckCount: 20,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        productionBlockerCount: 0,
        managedAuditDisabled: true,
        readOnlyIntegrationOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        executionAllowed: false,
      },
      archiveVerification: {
        verificationMode: "managed-audit-disabled-read-only-integration-intake-archive-verification",
        sourceSpan: "Node v351 managed-audit-disabled read-only integration intake",
        archiveRoot: "d/351",
        archiveVerificationDecision: "archive-managed-audit-disabled-read-only-integration-intake",
        verifiesJsonMarkdownAndSummary: true,
        verifiesScreenshotExplanationAndWalkthrough: true,
        verifiesPlanIndex: true,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        opensManagedAuditConnection: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v353",
      },
      checks: {
        archiveFilesPresent: true,
        jsonEvidenceReadable: true,
        jsonProfileVersionValid: true,
        jsonReadyForV352Verification: true,
        jsonIntakeDecisionValid: true,
        intakeInputsRecorded: true,
        closedScopesRecorded: true,
        allChecksPassedInSourceIntake: true,
        summaryMatchesJson: true,
        markdownRecordsDisabledIntake: true,
        screenshotAndHtmlPresent: true,
        explanationRecordsDisabledBoundary: true,
        codeWalkthroughPresent: true,
        planIndexReferencesV351AndV352: true,
        verificationDoesNotRerunProbe: true,
        noUpstreamServiceStartedByNode: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplemented: true,
        noJavaMiniKvEchoRequired: true,
        archiveVerificationDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 10,
        presentArchiveFileCount: 10,
        inputCount: 3,
        closedScopeCount: 7,
        sourceCheckCount: 20,
        sourcePassedCheckCount: 20,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV351.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV351.sourceTransitionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveVerification.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v351 archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v352-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.archiveVerificationState).toBe("blocked");
      expect(profile.archiveVerificationDecision).toBe("blocked");
      expect(profile.readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification).toBe(false);
      expect(profile.readyForNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification.v1",
        archiveVerificationState: "managed-audit-disabled-read-only-integration-intake-archive-verified",
        archiveVerificationDecision: "archive-managed-audit-disabled-read-only-integration-intake",
        activeNodeVersion: "Node v352",
        sourceNodeVersion: "Node v351",
        archiveVerificationOnly: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake archive verification",
      );
      expect(markdown.body).toContain(
        "Archive verification decision: archive-managed-audit-disabled-read-only-integration-intake",
      );
      expect(markdown.body).toContain("Ready for v353 decision record: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-352",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v352-managed-audit-disabled-intake-archive",
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
