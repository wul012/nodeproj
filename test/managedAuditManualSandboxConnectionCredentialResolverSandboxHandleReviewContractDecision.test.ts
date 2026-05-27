import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision";

describe("managed audit manual sandbox connection credential resolver sandbox handle review contract decision", () => {
  it("consumes Node v355 and defines a non-secret sandbox handle review contract decision", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1",
      decisionState: "sandbox-handle-review-contract-decision-ready",
      decision: "define-sandbox-handle-review-contract",
      readyForSandboxHandleReviewContractDecision: true,
      readyForNodeV357SandboxHandleReviewContractDecisionArchiveVerification: true,
      consumesNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification: true,
      activeNodeVersion: "Node v356",
      sourceNodeVersion: "Node v355",
      contractDecisionOnly: true,
      sandboxHandleReviewOnly: true,
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
      sourceNodeV355: {
        sourceVersion: "Node v355",
        archiveVerificationState: "sandbox-handle-review-prerequisite-intake-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-intake",
        readyForArchiveVerification: true,
        readyForNodeV356ContractDecision: true,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        checkCount: 29,
        passedCheckCount: 29,
        prerequisiteInputCount: 5,
        closedScopeCount: 9,
        productionBlockerCount: 0,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      necessityProof: {
        blockerResolved: "sandbox-handle-review-needs-contract-decision-after-archive-verification",
        consumedBy:
          "Node v357 sandbox handle review contract decision archive verification or later non-secret handle review gate",
      },
      decisionRecord: {
        decisionMode: "sandbox-handle-review-contract-decision",
        sourceSpan: "Node v355 sandbox handle review prerequisite intake archive verification",
        decision: "define-sandbox-handle-review-contract",
        contractInputCount: 5,
        contractSectionCount: 6,
        permitsOnlyNonSecretContract: true,
        requestsCredentialValue: false,
        requestsRawEndpointUrl: false,
        instantiatesProviderClient: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        opensManagedAuditConnection: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v357",
      },
      checks: {
        sourceNodeV355Ready: true,
        sourceArchiveVerificationAllowsContractDecision: true,
        sourceArchiveFilesComplete: true,
        sourceChecksAllPassed: true,
        necessityProofPresent: true,
        contractInputsComplete: true,
        contractSectionsComplete: true,
        contractInputsNonSecret: true,
        contractSectionsNonSecret: true,
        contractDoesNotRequestRawEndpoint: true,
        contractDoesNotAllowNetwork: true,
        decisionDigestStable: true,
        decisionLimitedToContract: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplemented: true,
        noRuntimeShellInvoked: true,
        noManagedAuditHttpTcp: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noJavaMiniKvEchoRequired: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForSandboxHandleReviewContractDecision: true,
      },
      summary: {
        contractInputCount: 5,
        contractSectionCount: 6,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV355.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.contractInputs.every((input) =>
      !input.containsSecretValue && !input.containsRawEndpointUrl && !input.allowsNetworkConnection
    )).toBe(true);
    expect(profile.contractSections.every((section) =>
      !section.containsSecretValue && !section.opensManagedAuditConnection && !section.mutatesUpstreamState
    )).toBe(true);
  }, 60000);

  it("fails closed when Node v355 evidence is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v356-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision({
          config: loadTestConfig(),
          sourceArchiveRoot: emptyProjectRoot,
        });

      expect(profile.decisionState).toBe("blocked");
      expect(profile.decision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewContractDecision).toBe(false);
      expect(profile.readyForNodeV357SandboxHandleReviewContractDecisionArchiveVerification).toBe(false);
      expect(profile.sourceNodeV355.readyForArchiveVerification).toBe(false);
      expect(profile.sourceNodeV355.readyForNodeV356ContractDecision).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V355_NOT_READY",
        "NODE_V355_DECISION_NOT_ALLOWED",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1",
        decisionState: "sandbox-handle-review-contract-decision-ready",
        decision: "define-sandbox-handle-review-contract",
        activeNodeVersion: "Node v356",
        sourceNodeVersion: "Node v355",
        contractDecisionOnly: true,
        sandboxHandleReviewOnly: true,
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review contract decision",
      );
      expect(markdown.body).toContain("Decision: define-sandbox-handle-review-contract");
      expect(markdown.body).toContain("Ready for v357 archive verification: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-356",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v356-contract-decision",
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
