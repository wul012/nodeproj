import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review";

describe("managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review", () => {
  it("consumes Node v361 and closes the non-executable sandbox handle review prerequisite chain", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review.v1",
      reviewState: "sandbox-handle-review-prerequisite-closure-review-ready",
      prerequisiteClosureDecision: "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
      readyForSandboxHandleReviewPrerequisiteClosureReview: true,
      readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification: true,
      consumesNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification: true,
      activeNodeVersion: "Node v362",
      sourceNodeVersion: "Node v361",
      closureReviewOnly: true,
      readOnlyClosureReview: true,
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
      sourceNodeV361: {
        sourceVersion: "Node v361",
        archiveVerificationState: "sandbox-handle-review-packet-gate-decision-record-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-decision-record",
        readyForArchiveVerification: true,
        readyForPrerequisiteClosureReview: true,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceCheckCount: 20,
        sourcePassedCheckCount: 20,
        sourceProductionBlockerCount: 0,
        inputCount: 5,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      closureReview: {
        reviewMode: "sandbox-handle-review-prerequisite-closure-review-only",
        sourceSpan: "Node v361",
        completedClosureItemCount: 4,
        remainingClosureItemCount: 0,
        originalClosureItemCount: 4,
        movedClosureItemId: "sandbox-handle-review-packet-gate-decision-record",
        movedFrom: "decision-record-complete",
        movedTo: "decision-record-archive-complete",
        closureDecision: "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
        nextNodeVersionSuggested: "Node v363",
        nextJavaVersionRequested: null,
        nextMiniKvVersionRequested: null,
        allowsPrerequisiteClosureArchiveVerification: true,
        allowsCredentialValue: false,
        allowsRawEndpointUrl: false,
        allowsProviderClient: false,
        allowsRuntimeShell: false,
        allowsManagedAuditConnection: false,
        allowsUpstreamMutation: false,
      },
      checks: {
        sourceNodeV361Ready: true,
        sourceArchiveVerificationComplete: true,
        sourceDecisionAllowsClosureReview: true,
        sourceArchiveFilesComplete: true,
        sourceChecksAllPassed: true,
        sourcePacketGateShapePreserved: true,
        sourceKeepsCredentialAndEndpointClosed: true,
        sourceKeepsRuntimeAndConnectionClosed: true,
        sourceKeepsUpstreamsClosed: true,
        closureItemsComplete: true,
        noRemainingClosureItems: true,
        closureDigestStable: true,
        closureDecisionLimitedToNonExecutableReview: true,
        nextStepIsArchiveVerification: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noManagedAuditHttpTcp: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noJavaMiniKvEchoRequired: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForSandboxHandleReviewPrerequisiteClosureReview: true,
      },
      summary: {
        checkCount: 27,
        passedCheckCount: 27,
        sourceCheckCount: 20,
        sourcePassedCheckCount: 20,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        originalClosureItemCount: 4,
        completedClosureItemCount: 4,
        remainingClosureItemCount: 0,
        inputCount: 5,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV361.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV361.sourceDecisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.closureReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 180_000);

  it("fails closed when Node v361 evidence is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v362-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview({
          config: loadTestConfig(),
          sourceArchiveRoot: emptyProjectRoot,
        });

      expect(profile.reviewState).toBe("blocked");
      expect(profile.prerequisiteClosureDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPrerequisiteClosureReview).toBe(false);
      expect(profile.readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification).toBe(false);
      expect(profile.sourceNodeV361.readyForArchiveVerification).toBe(false);
      expect(profile.sourceNodeV361.readyForPrerequisiteClosureReview).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V361_NOT_READY",
        "NODE_V361_ARCHIVE_NOT_COMPLETE",
        "SOURCE_ARCHIVE_FILES_INCOMPLETE",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review.v1",
        reviewState: "sandbox-handle-review-prerequisite-closure-review-ready",
        prerequisiteClosureDecision: "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
        activeNodeVersion: "Node v362",
        sourceNodeVersion: "Node v361",
        closureReviewOnly: true,
        readOnlyClosureReview: true,
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review",
      );
      expect(markdown.body).toContain(
        "Prerequisite closure decision: close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
      );
      expect(markdown.body).toContain("Ready for v363 archive verification: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-362",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v362-prerequisite-closure-review",
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
