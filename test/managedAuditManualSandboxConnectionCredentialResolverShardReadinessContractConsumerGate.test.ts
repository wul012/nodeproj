import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate";

describe("managed audit manual sandbox connection credential resolver shard readiness contract consumer gate", () => {
  it("consumes Java v153 and mini-kv v144 shard readiness evidence without starting upstreams", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate.v1",
      gateState: "shard-readiness-contract-consumer-gate-ready",
      gateDecision: "consume-java-and-mini-kv-shard-readiness-evidence",
      readyForShardReadinessContractConsumerGate: true,
      readyForNodeV371MinimalShardReadinessLiveReadGate: true,
      activeNodeVersion: "Node v370",
      sourceNodeVersion: "Node v369",
      consumesNodeV369OperatorCiRegularGateHandoff: true,
      consumesJavaV153ShardReadinessEcho: true,
      consumesMiniKvV144ShardReadinessPrototype: true,
      contractConsumerOnly: true,
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
      sourceNodeV369: {
        sourceVersion: "Node v369",
        handoffState: "operator-ci-regular-gate-handoff-ready",
        handoffDecision: "freeze-read-only-and-shard-readiness-contracts",
        readyForOperatorCiRegularGateHandoff: true,
        readyForNodeV370ShardReadinessContractConsumerGate: true,
        frozenContractCount: 2,
        sourceCheckCount: 30,
        sourcePassedCheckCount: 30,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        executionAllowed: false,
      },
      javaShardReadiness: {
        project: "advanced-order-platform",
        sourceVersion: "Java v153",
        requiredFieldCount: 10,
        presentRequiredFieldCount: 10,
        missingRequiredFields: [],
        readOnlySafe: true,
        executionBlocked: true,
        shardCountValid: true,
        slotCountValid: true,
        routingModePresent: true,
        statusAccepted: true,
        boundarySafe: true,
        readyForNodeConsumption: true,
        evidence: {
          project: "advanced-order-platform",
          version: "Java v153",
          readOnly: true,
          executionAllowed: false,
          shardEnabled: false,
          shardCount: 0,
          slotCount: 0,
          routingMode: "fixture",
          evidencePath: "e/153/evidence/java-shard-readiness-v153.json",
          status: "passed",
        },
      },
      miniKvShardReadiness: {
        project: "mini-kv",
        sourceVersion: "mini-kv v144",
        requiredFieldCount: 10,
        presentRequiredFieldCount: 10,
        missingRequiredFields: [],
        readOnlySafe: true,
        executionBlocked: true,
        shardCountValid: true,
        slotCountValid: true,
        routingModePresent: true,
        statusAccepted: true,
        sourceSpecificPrototypeValueAccepted: true,
        boundarySafe: true,
        readyForNodeConsumption: true,
        contractVersionObserved: "shard-readiness.v1",
        evidence: {
          project: "mini-kv",
          version: "0.102.0",
          releaseVersion: "v144",
          readOnly: true,
          executionAllowed: false,
          shardEnabled: false,
          shardCount: 1,
          slotCount: 16,
          routingMode: "single-shard-readiness-prototype",
          evidencePath: "fixtures/release/shard-readiness.json",
          status: "prototype-ready-read-only",
        },
      },
      gate: {
        gateMode: "shard-readiness-contract-consumer",
        sourceSpan: "Node v369 handoff plus Java v153 and mini-kv v144 shard readiness evidence",
        consumesContracts: ["read-only-integration.v1", "shard-readiness.v1"],
        consumesSiblingEvidence: ["Java v153", "mini-kv v144"],
        nodeRole: "contract-consumer-and-integration-gate",
        automaticUpstreamStart: false,
        externalReadWindowRequiredForLiveGate: true,
        nextNodeVersionSuggested: "Node v371",
      },
      checks: {
        sourceNodeV369Ready: true,
        sourceNodeV369ContractsFrozen: true,
        sourceNodeV369BoundariesClosed: true,
        javaEvidenceFilePresent: true,
        javaEvidenceRequiredFieldsComplete: true,
        javaEvidenceReadOnly: true,
        javaEvidenceExecutionBlocked: true,
        javaShardCountValid: true,
        javaSlotCountValid: true,
        javaRoutingModePresent: true,
        javaStatusAccepted: true,
        miniKvEvidenceFilePresent: true,
        miniKvEvidenceRequiredFieldsComplete: true,
        miniKvEvidenceReadOnly: true,
        miniKvEvidenceExecutionBlocked: true,
        miniKvShardCountValid: true,
        miniKvSlotCountValid: true,
        miniKvRoutingModePresent: true,
        miniKvStatusAccepted: true,
        miniKvBoundarySafe: true,
        bothEvidenceSourcesReady: true,
        digestCoverageComplete: true,
        historicalFallbackCovered: true,
        nodeDoesNotStartUpstreams: true,
        nodeDoesNotMutateSiblingState: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForShardReadinessContractConsumerGate: true,
      },
      summary: {
        checkCount: 31,
        passedCheckCount: 31,
        evidenceSourceCount: 2,
        readyEvidenceSourceCount: 2,
        requiredFieldCount: 20,
        presentRequiredFieldCount: 20,
        missingRequiredFieldCount: 0,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV369.sourceHandoffDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV369.sourcePlanDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.gate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.javaShardReadiness.evidenceFile.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.miniKvShardReadiness.evidenceFile.digest).toMatch(/^[a-f0-9]{64}$/);
  }, 180_000);

  it("uses historical sibling-workspace fixtures when forced for GitHub runner compatibility", () => {
    const previous = process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
    process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
          config: loadTestConfig(),
        });

      expect(profile.readyForShardReadinessContractConsumerGate).toBe(true);
      expect(profile.javaShardReadiness.evidenceFile.usedHistoricalFallback).toBe(true);
      expect(profile.miniKvShardReadiness.evidenceFile.usedHistoricalFallback).toBe(true);
      expect(profile.javaShardReadiness.evidenceFile.resolvedPath.replace(/\\/g, "/"))
        .toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/153/evidence/java-shard-readiness-v153.json");
      expect(profile.miniKvShardReadiness.evidenceFile.resolvedPath.replace(/\\/g, "/"))
        .toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v144.json");
    } finally {
      if (previous === undefined) {
        delete process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
      } else {
        process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = previous;
      }
    }
  }, 180_000);

  it("fails closed when source archives and frozen evidence are unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v370-empty-"));
    const previous = process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;

    try {
      process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "false";
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
          config: loadTestConfig(),
          archiveRoot: emptyProjectRoot,
        });

      expect(profile.sourceNodeV369.handoffState).toBe("blocked");
      expect(profile.gateState).toBe("blocked");
      expect(profile.gateDecision).toBe("blocked");
      expect(profile.readyForShardReadinessContractConsumerGate).toBe(false);
      expect(profile.readyForNodeV371MinimalShardReadinessLiveReadGate).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SOURCE_NODE_V369_NOT_READY",
        "SOURCE_CONTRACTS_NOT_FROZEN",
      ]));
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.executionAllowed).toBe(false);
    } finally {
      if (previous === undefined) {
        delete process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
      } else {
        process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = previous;
      }
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
          "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate.v1",
        gateState: "shard-readiness-contract-consumer-gate-ready",
        gateDecision: "consume-java-and-mini-kv-shard-readiness-evidence",
        activeNodeVersion: "Node v370",
        sourceNodeVersion: "Node v369",
        contractConsumerOnly: true,
        startsJavaService: false,
        startsMiniKvService: false,
        mutatesJavaState: false,
        mutatesMiniKvState: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver shard readiness contract consumer gate",
      );
      expect(markdown.body).toContain("Gate decision: consume-java-and-mini-kv-shard-readiness-evidence");
      expect(markdown.body).toContain("Java v153");
      expect(markdown.body).toContain("mini-kv v144");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-370",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v370-shard-readiness-consumer-gate",
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
