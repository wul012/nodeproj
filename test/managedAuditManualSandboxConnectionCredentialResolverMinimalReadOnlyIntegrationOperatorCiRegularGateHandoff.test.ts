import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration operator/CI regular gate handoff", () => {
  it("freezes read-only and shard-readiness contracts from the v367/v368 evidence chain", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff.v1",
      handoffState: "operator-ci-regular-gate-handoff-ready",
      handoffDecision: "freeze-read-only-and-shard-readiness-contracts",
      readyForOperatorCiRegularGateHandoff: true,
      readyForParallelMiniKvShardReadinessPrototype: true,
      readyForParallelJavaShardReadinessEcho: true,
      readyForNodeV370ShardReadinessContractConsumerGate: true,
      consumesNodeV367GateExecution: true,
      consumesNodeV368GateExecutionArchiveVerification: true,
      activeNodeVersion: "Node v369",
      sourceNodeVersion: "Node v368",
      handoffOnly: true,
      contractFreezeIncluded: true,
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
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV368: {
        sourceVersion: "Node v368",
        archiveVerificationState: "minimal-read-only-integration-gate-execution-archive-verified",
        archiveVerificationDecision: "archive-minimal-read-only-gate-execution-and-operator-ci-handoff",
        readyForArchiveVerification: true,
        readyForNodeV369OperatorCiRegularGateHandoff: true,
        sourceNodeVersion: "Node v367",
        sourceNodeV367GateExecutionResult: "all-read-passed",
        sourceNodeV367GateExecutionDecision: "archive-read-passed-gate-execution",
        sourceCheckCount: 20,
        sourcePassedCheckCount: 20,
        archiveCheckCount: 42,
        archivePassedCheckCount: 42,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        runtimeShellImplemented: false,
        executionAllowed: false,
      },
      handoff: {
        handoffMode: "operator-ci-regular-minimal-read-only-gate",
        sourceSpan: "Node v367 gate execution plus Node v368 archive verification",
        freezesContracts: true,
        readOnlyIntegrationContractVersion: "read-only-integration.v1",
        shardReadinessContractVersion: "shard-readiness.v1",
        actualProbeRequiresExternalReadWindow: true,
        largeTestBatchDefaultAllowed: false,
        automaticUpstreamStart: false,
        managedAuditConnectionAllowed: false,
        nextNodeVersionSuggested: "Node v370",
      },
      parallelShardReadinessPlan: {
        miniKvTrack: {
          recommendedVersion: "mini-kv shard-readiness prototype",
          canRunInParallelWithJava: true,
          consumesContract: "shard-readiness.v1",
          expectedOutput: "read-only JSON/CLI evidence",
        },
        javaTrack: {
          recommendedVersion: "Java shard-readiness echo",
          canRunInParallelWithMiniKv: true,
          consumesContract: "shard-readiness.v1",
          expectedOutput: "fixture-first read-only echo, then live echo",
        },
        nodeTrack: {
          nextVersion: "Node v370",
          waitsForJavaAndMiniKvShardEvidence: true,
          role: "contract-consumer-and-integration-gate",
        },
      },
      checks: {
        sourceNodeV368Ready: true,
        sourceNodeV367GatePassed: true,
        sourceNodeV368ArchiveFilesComplete: true,
        sourceNodeV368ChecksAllPassed: true,
        sourceNodeV368DoesNotRerunProbe: true,
        sourceNodeV368KeepsRuntimeBoundaryClosed: true,
        sourceNodeV368EvidenceFilesPresent: true,
        readOnlyIntegrationContractPresent: true,
        readOnlyIntegrationContractFrozen: true,
        readOnlyIntegrationRequiredFieldsComplete: true,
        readOnlyIntegrationRulesSafe: true,
        shardReadinessContractPresent: true,
        shardReadinessContractFrozen: true,
        shardReadinessRequiredFieldsComplete: true,
        shardReadinessRulesSafe: true,
        handoffDigestStable: true,
        handoffUsesFocusedCommands: true,
        handoffAvoidsLargeTestBatch: true,
        handoffRequiresExternalReadWindowForProbe: true,
        handoffDoesNotStartUpstreams: true,
        parallelShardPlanExplicit: true,
        parallelJavaMiniKvAllowed: true,
        nodeNoLongerBlocksParallelProgress: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noRuntimeShellImplementedOrInvoked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForOperatorCiRegularGateHandoff: true,
      },
      summary: {
        sourceArchiveCheckCount: 42,
        sourceArchivePassedCheckCount: 42,
        sourceGateTargetCount: 5,
        sourceGatePassedTargetCount: 5,
        sourceArchiveFileCount: 9,
        sourcePresentArchiveFileCount: 9,
        frozenContractCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV368.sourceNodeV367ExecutionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV368.v368ArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.handoff.handoffDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.parallelShardReadinessPlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.frozenContracts.map((contract) => contract.contractVersion)).toEqual([
      "read-only-integration.v1",
      "shard-readiness.v1",
    ]);
    expect(profile.frozenContracts.every((contract) => contract.contractState === "frozen")).toBe(true);
    expect(profile.summary.checkCount).toBe(30);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the frozen contracts and source archive are unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v369-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.handoffState).toBe("blocked");
      expect(profile.handoffDecision).toBe("blocked");
      expect(profile.readyForOperatorCiRegularGateHandoff).toBe(false);
      expect(profile.readyForParallelMiniKvShardReadinessPrototype).toBe(false);
      expect(profile.readyForParallelJavaShardReadinessEcho).toBe(false);
      expect(profile.summary.frozenContractCount).toBe(0);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V368_NOT_READY",
        "SOURCE_NODE_V367_GATE_NOT_PASSED",
        "READ_ONLY_CONTRACT_NOT_FROZEN",
        "SHARD_READINESS_CONTRACT_NOT_FROZEN",
      ]));
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff.v1",
        handoffState: "operator-ci-regular-gate-handoff-ready",
        handoffDecision: "freeze-read-only-and-shard-readiness-contracts",
        activeNodeVersion: "Node v369",
        sourceNodeVersion: "Node v368",
        handoffOnly: true,
        contractFreezeIncluded: true,
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
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration operator/CI regular gate handoff",
      );
      expect(markdown.body).toContain("Handoff decision: freeze-read-only-and-shard-readiness-contracts");
      expect(markdown.body).toContain("read-only-integration.v1");
      expect(markdown.body).toContain("shard-readiness.v1");
      expect(markdown.body).toContain("Ready for parallel mini-kv shard readiness prototype: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-369",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v369-operator-ci-handoff",
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
