import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record";

describe("managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration decision record", () => {
  it("consumes Node v352 and records a non-secret sandbox handle prerequisite decision", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record.v1",
      decisionState: "managed-audit-disabled-read-only-integration-decision-record-ready",
      decision: "advance-to-sandbox-handle-review-prerequisite-intake",
      readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord: true,
      readyForNodeV354SandboxHandleReviewPrerequisiteIntake: true,
      consumesNodeV352ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: true,
      activeNodeVersion: "Node v353",
      sourceNodeVersion: "Node v352",
      decisionRecordOnly: true,
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
      sourceNodeV352: {
        sourceVersion: "Node v352",
        archiveVerificationState: "managed-audit-disabled-read-only-integration-intake-archive-verified",
        archiveVerificationDecision: "archive-managed-audit-disabled-read-only-integration-intake",
        readyForArchiveVerification: true,
        readyForNodeV353DecisionRecord: true,
        archiveFileCount: 10,
        presentArchiveFileCount: 10,
        checkCount: 27,
        passedCheckCount: 27,
        inputCount: 3,
        closedScopeCount: 7,
        productionBlockerCount: 0,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        executionAllowed: false,
      },
      necessityProof: {
        blockerResolved: "verified-disabled-intake-needs-explicit-next-stage-decision",
        consumedBy: "Node v354 sandbox handle review prerequisite intake or disabled checkpoint",
      },
      decisionRecord: {
        decisionMode: "managed-audit-disabled-read-only-integration-decision-record",
        sourceSpan: "Node v352 managed-audit-disabled read-only integration intake archive verification",
        decision: "advance-to-sandbox-handle-review-prerequisite-intake",
        allowsSandboxHandleReviewPreparation: true,
        requestsCredentialValue: false,
        requestsRawEndpointUrl: false,
        instantiatesProviderClient: false,
        implementsRuntimeShell: false,
        opensManagedAuditConnection: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v354",
        inputCount: 4,
      },
      checks: {
        sourceNodeV352Ready: true,
        sourceArchiveVerificationAllowsDecision: true,
        sourceArchiveFilesComplete: true,
        sourceChecksAllPassed: true,
        necessityProofPresent: true,
        decisionInputsComplete: true,
        decisionDigestStable: true,
        decisionLimitedToPrerequisiteIntake: true,
        noCredentialValueRequested: true,
        noRawEndpointUrlRequested: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplemented: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noJavaMiniKvEchoRequired: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord: true,
      },
      summary: {
        inputCount: 4,
        sourceArchiveFileCount: 10,
        sourcePresentArchiveFileCount: 10,
        sourceCheckCount: 27,
        sourcePassedCheckCount: 27,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV352.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when Node v352 evidence is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v353-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord({
          config: loadTestConfig(),
          sourceArchiveRoot: emptyProjectRoot,
        });

      expect(profile.decisionState).toBe("blocked");
      expect(profile.decision).toBe("blocked");
      expect(profile.readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord).toBe(false);
      expect(profile.readyForNodeV354SandboxHandleReviewPrerequisiteIntake).toBe(false);
      expect(profile.sourceNodeV352.readyForArchiveVerification).toBe(false);
      expect(profile.sourceNodeV352.readyForNodeV353DecisionRecord).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V352_NOT_READY",
        "NODE_V352_DECISION_NOT_ALLOWED",
        "SOURCE_ARCHIVE_FILES_INCOMPLETE",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record.v1",
        decisionState: "managed-audit-disabled-read-only-integration-decision-record-ready",
        decision: "advance-to-sandbox-handle-review-prerequisite-intake",
        activeNodeVersion: "Node v353",
        sourceNodeVersion: "Node v352",
        decisionRecordOnly: true,
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
        "# Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration decision record",
      );
      expect(markdown.body).toContain("Decision: advance-to-sandbox-handle-review-prerequisite-intake");
      expect(markdown.body).toContain("Ready for v354 sandbox handle review prerequisite intake: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-353",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v353-disabled-decision-record",
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
