import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record";

describe("managed audit manual sandbox connection credential resolver sandbox handle review packet gate decision record", () => {
  it("consumes Node v359 and records a non-executable packet/gate decision", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record.v1",
      decisionState: "sandbox-handle-review-packet-gate-decision-record-ready",
      decision: "advance-to-sandbox-handle-review-prerequisite-closure-review",
      readyForSandboxHandleReviewPacketGateDecisionRecord: true,
      readyForNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification: true,
      consumesNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification: true,
      activeNodeVersion: "Node v360",
      sourceNodeVersion: "Node v359",
      decisionRecordOnly: true,
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
      sourceNodeV359: {
        sourceVersion: "Node v359",
        archiveVerificationState: "sandbox-handle-review-packet-gate-non-secret-intake-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-non-secret-intake",
        readyForArchiveVerification: true,
        readyForNodeV360DecisionRecord: true,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        checkCount: 34,
        passedCheckCount: 34,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      necessityProof: {
        blockerResolved: "verified-packet-gate-intake-archive-needs-explicit-next-stage-decision",
        consumedBy:
          "Node v361 sandbox handle review packet/gate decision record archive verification or later prerequisite closure review",
      },
      decisionRecord: {
        decisionMode: "sandbox-handle-review-packet-gate-decision-record",
        sourceSpan: "Node v359 sandbox handle review packet/gate non-secret intake archive verification",
        decision: "advance-to-sandbox-handle-review-prerequisite-closure-review",
        allowsSandboxHandleReviewPrerequisiteClosure: true,
        allowsHumanReviewDecisionOnly: true,
        requestsCredentialValue: false,
        requestsRawEndpointUrl: false,
        instantiatesProviderClient: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        opensManagedAuditConnection: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v361",
        inputCount: 5,
      },
      checks: {
        sourceNodeV359Ready: true,
        sourceArchiveVerificationAllowsDecision: true,
        sourceArchiveFilesComplete: true,
        sourceChecksAllPassed: true,
        sourcePacketGateShapeComplete: true,
        necessityProofPresent: true,
        decisionInputsComplete: true,
        decisionDigestStable: true,
        decisionLimitedToPrerequisiteClosure: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noManagedAuditHttpTcp: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noJavaMiniKvEchoRequired: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForSandboxHandleReviewPacketGateDecisionRecord: true,
      },
      summary: {
        checkCount: 20,
        passedCheckCount: 20,
        inputCount: 5,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 34,
        sourcePassedCheckCount: 34,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV359.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV359.sourceIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

  it("fails closed when Node v359 evidence is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v360-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord({
          config: loadTestConfig(),
          sourceArchiveRoot: emptyProjectRoot,
        });

      expect(profile.decisionState).toBe("blocked");
      expect(profile.decision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPacketGateDecisionRecord).toBe(false);
      expect(profile.readyForNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification).toBe(false);
      expect(profile.sourceNodeV359.readyForArchiveVerification).toBe(false);
      expect(profile.sourceNodeV359.readyForNodeV360DecisionRecord).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V359_NOT_READY",
        "NODE_V359_DECISION_NOT_ALLOWED",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record.v1",
        decisionState: "sandbox-handle-review-packet-gate-decision-record-ready",
        decision: "advance-to-sandbox-handle-review-prerequisite-closure-review",
        activeNodeVersion: "Node v360",
        sourceNodeVersion: "Node v359",
        decisionRecordOnly: true,
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate decision record",
      );
      expect(markdown.body).toContain("Decision: advance-to-sandbox-handle-review-prerequisite-closure-review");
      expect(markdown.body).toContain("Ready for v361 archive verification: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-360",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v360-packet-gate-decision-record",
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
