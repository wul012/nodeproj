import http from "node:http";
import net from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import type { MiniKvClient } from "../src/clients/miniKvClient.js";
import type { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { loadConfig } from "../src/config.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

const javaEvidence = {
  project: "advanced-order-platform",
  version: "Java v289",
  readOnly: true,
  executionAllowed: false,
  shardEnabled: false,
  shardCount: 0,
  slotCount: 0,
  routingMode: "read-only-preview",
  evidencePath: "e/289/evidence/java-shard-readiness-v289.json",
  status: "passed",
};

const miniKvEvidence = {
  contract: "shard-readiness.v1",
  evidenceType: "shard_readiness",
  project: "mini-kv",
  version: "0.262.0",
  releaseVersion: "v262",
  readOnly: true,
  executionAllowed: false,
  shardEnabled: false,
  shardCount: 1,
  slotCount: 16,
  routingMode: "single-shard-readiness-prototype",
  evidencePath: "fixtures/release/shard-readiness-v262.json",
  status: "prototype-ready-read-only",
  evidenceDigest: "fnv1a64:22d3c4815a440804",
  shardMap: [
    { shardId: "shard-0", slotStart: 0, slotEnd: 15, readOnly: true, writesAllowed: false },
  ],
  keyRoutingSamples: [
    { key: "orderops:alpha", slot: 5, shardId: "shard-0" },
    { key: "audit:receipt:001", slot: 9, shardId: "shard-0" },
  ],
  boundaries: {
    orderAuthoritative: false,
    auditAuthoritative: false,
    writeCommandsAllowed: false,
    adminCommandsAllowed: false,
    loadRestoreCompactAllowed: false,
  },
  diagnostics: {
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
    loadRestoreCompactExecuted: false,
  },
};

const servers: Array<{ close: () => Promise<void> }> = [];

afterEach(async () => {
  while (servers.length > 0) {
    await servers.pop()?.close();
  }
});

describe("managed audit manual sandbox connection credential resolver controlled read-only shard preview", () => {
  it("passes with read-only Java and mini-kv shard preview evidence", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview.v1",
      previewState: "controlled-read-only-shard-preview-ready",
      previewDecision: "preview-java-and-mini-kv-shard-readiness",
      readyForControlledReadOnlyShardPreview: true,
      activeNodeVersion: "Node v601",
      sourceNodeVersion: "Node v600",
      consumesNodeV580MaturityRunCloseout: true,
      previewOnly: true,
      liveReadOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      activeShardRouterAllowed: false,
      writeRoutingAllowed: false,
      loadRestoreCompactAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      reads: {
        java: {
          attempted: true,
          status: "passed-read",
          transport: "http-json",
          endpoint: "GET /api/v1/ops/shard-readiness",
          command: null,
          readOnlySafe: true,
          executionBlocked: true,
          boundarySafe: true,
          readyForPreview: true,
        },
        miniKv: {
          attempted: true,
          status: "passed-read",
          transport: "tcp-command",
          command: "SHARDJSON",
          readOnlySafe: true,
          executionBlocked: true,
          boundarySafe: true,
          readyForPreview: true,
        },
      },
      preview: {
        java: {
          version: "Java v289",
          shardCount: 0,
          slotCount: 0,
          routingMode: "read-only-preview",
        },
        miniKv: {
          version: "0.262.0",
          releaseVersion: "v262",
          shardCount: 1,
          slotCount: 16,
          shardMapCount: 1,
          keyRoutingSampleCount: 2,
        },
        combinedSlotCount: 16,
        combinedShardCount: 1,
        bothReadOnly: true,
        bothExecutionBlocked: true,
        sourceMatrix: {
          sourceCount: 2,
          readySourceCount: 2,
          failedSourceCount: 0,
          skippedSourceCount: 0,
          routingModes: ["read-only-preview", "single-shard-readiness-prototype"],
          shardCountDelta: 1,
          slotCountDelta: 16,
          shardCountsComparable: true,
          slotCountsComparable: true,
          allSourcesReady: true,
          sources: [
            {
              source: "java",
              project: "advanced-order-platform",
              version: "Java v289",
              status: "passed-read",
              readyForPreview: true,
              readOnlySafe: true,
              executionBlocked: true,
              shardCount: 0,
              slotCount: 0,
              routingMode: "read-only-preview",
              endpoint: "GET /api/v1/ops/shard-readiness",
              command: null,
            },
            {
              source: "miniKv",
              project: "mini-kv",
              version: "0.262.0",
              releaseVersion: "v262",
              status: "passed-read",
              readyForPreview: true,
              readOnlySafe: true,
              executionBlocked: true,
              shardCount: 1,
              slotCount: 16,
              routingMode: "single-shard-readiness-prototype",
              command: "SHARDJSON",
            },
          ],
        },
        sourceMatrixConsumer: {
          consumerVersion: "Node v599",
          inputSourceVersion: "Node v598",
          decision: "ready-for-controlled-read-only-consumption",
          readyForControlledReadOnlyConsumption: true,
          requiredSources: ["java", "miniKv"],
          observedSources: ["java", "miniKv"],
          missingSources: [],
          gateCount: 6,
          passedGateCount: 6,
          gates: {
            observedRequiredSources: true,
            allSourcesReady: true,
            shardCountsComparable: true,
            slotCountsComparable: true,
            routingModesDeclared: true,
            readOnlyConsumerOnly: true,
          },
          comparison: {
            routingModes: ["read-only-preview", "single-shard-readiness-prototype"],
            routingModeCount: 2,
            javaShardCount: 0,
            miniKvShardCount: 1,
            shardCountDelta: 1,
            javaSlotCount: 0,
            miniKvSlotCount: 16,
            slotCountDelta: 16,
          },
          blockedReasonCodes: [],
          activatesRouting: false,
          startsServices: false,
          mutatesSiblingState: false,
        },
        sourceMatrixDriftSummary: {
          summaryVersion: "Node v600",
          inputConsumerVersion: "Node v599",
          driftState: "controlled-drift-detected",
          readyForControlledDriftReview: true,
          findingCount: 3,
          driftFindingCount: 3,
          blockingFindingCount: 0,
          comparableFindingCount: 3,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
          startsServices: false,
          mutatesSiblingState: false,
          findings: [
            {
              dimension: "routingMode",
              status: "drift-detected",
              severity: "warning",
              javaValue: "read-only-preview",
              miniKvValue: "single-shard-readiness-prototype",
            },
            {
              dimension: "shardCount",
              status: "drift-detected",
              severity: "warning",
              javaValue: 0,
              miniKvValue: 1,
            },
            {
              dimension: "slotCount",
              status: "drift-detected",
              severity: "warning",
              javaValue: 0,
              miniKvValue: 16,
            },
          ],
        },
        sourceMatrixReviewChecklist: {
          checklistVersion: "Node v601",
          inputDriftSummaryVersion: "Node v600",
          checklistState: "ready-for-controlled-review",
          readyForOperatorReview: true,
          itemCount: 4,
          readyItemCount: 3,
          reviewItemCount: 1,
          blockedItemCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
          startsServices: false,
          mutatesSiblingState: false,
          items: [
            {
              order: 1,
              check: "confirm-source-matrix-consumer",
              status: "ready",
              severity: "info",
              routingActivationAllowed: false,
            },
            {
              order: 2,
              check: "review-controlled-drift-findings",
              status: "needs-review",
              severity: "warning",
              routingActivationAllowed: false,
            },
            {
              order: 3,
              check: "confirm-routing-remains-disabled",
              status: "ready",
              severity: "info",
              routingActivationAllowed: false,
            },
            {
              order: 4,
              check: "confirm-sibling-projects-can-continue",
              status: "ready",
              severity: "info",
              routingActivationAllowed: false,
            },
          ],
        },
      },
      checks: {
        upstreamProbesEnabledForPreview: true,
        upstreamActionsDisabled: true,
        bothPreviewsReady: true,
        nodeDoesNotStartUpstreams: true,
        nodeDoesNotStopUpstreams: true,
        nodeDoesNotMutateSiblingState: true,
        noActiveShardRouter: true,
        noWriteRouting: true,
        noLoadRestoreCompact: true,
        noManagedAuditConnection: true,
        productionWindowStillBlocked: true,
        readyForControlledReadOnlyShardPreview: true,
      },
      summary: {
        checkCount: 23,
        passedCheckCount: 23,
        attemptedReadCount: 2,
        passedReadCount: 2,
        failedReadCount: 0,
        skippedReadCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.preview.previewDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

  it("fails closed without reading upstreams when probes are disabled", async () => {
    let javaCalls = 0;
    let miniKvCalls = 0;
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: {
          shardReadiness: async () => {
            javaCalls += 1;
            return { statusCode: 200, latencyMs: 1, data: javaEvidence };
          },
        } as OrderPlatformClient,
        miniKv: {
          shardJson: async () => {
            miniKvCalls += 1;
            return {
              command: "SHARDJSON",
              response: JSON.stringify(miniKvEvidence),
              latencyMs: 1,
              readiness: miniKvEvidence,
            };
          },
        } as MiniKvClient,
      });

    expect(profile.previewState).toBe("blocked");
    expect(profile.readyForControlledReadOnlyShardPreview).toBe(false);
    expect(profile.reads.java.status).toBe("skipped-probes-disabled");
    expect(profile.reads.miniKv.status).toBe("skipped-probes-disabled");
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_DISABLED",
      "JAVA_PREVIEW_NOT_ATTEMPTED",
      "MINI_KV_PREVIEW_NOT_ATTEMPTED",
    ]));
    expect(javaCalls).toBe(0);
    expect(miniKvCalls).toBe(0);
    expect(profile.startsJavaService).toBe(false);
    expect(profile.startsMiniKvService).toBe(false);
    expect(profile.preview.sourceMatrixConsumer).toMatchObject({
      decision: "blocked",
      readyForControlledReadOnlyConsumption: false,
      observedSources: ["java", "miniKv"],
      missingSources: [],
      passedGateCount: 2,
      gates: {
        observedRequiredSources: true,
        allSourcesReady: false,
        shardCountsComparable: false,
        slotCountsComparable: false,
        routingModesDeclared: false,
        readOnlyConsumerOnly: true,
      },
      blockedReasonCodes: [
        "SOURCE_NOT_READY",
        "SHARD_COUNTS_NOT_COMPARABLE",
        "SLOT_COUNTS_NOT_COMPARABLE",
        "ROUTING_MODE_NOT_DECLARED",
      ],
      activatesRouting: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(profile.preview.sourceMatrixDriftSummary).toMatchObject({
      driftState: "blocked",
      readyForControlledDriftReview: false,
      findingCount: 4,
      driftFindingCount: 0,
      blockingFindingCount: 4,
      comparableFindingCount: 0,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
      findings: [
        {
          dimension: "consumerReadiness",
          status: "blocked",
          severity: "blocker",
        },
        {
          dimension: "routingMode",
          status: "not-comparable",
          severity: "blocker",
        },
        {
          dimension: "shardCount",
          status: "not-comparable",
          severity: "blocker",
        },
        {
          dimension: "slotCount",
          status: "not-comparable",
          severity: "blocker",
        },
      ],
    });
    expect(profile.preview.sourceMatrixReviewChecklist).toMatchObject({
      checklistState: "blocked",
      readyForOperatorReview: false,
      itemCount: 4,
      readyItemCount: 2,
      reviewItemCount: 0,
      blockedItemCount: 2,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
      items: [
        {
          order: 1,
          check: "confirm-source-matrix-consumer",
          status: "blocked",
          severity: "blocker",
        },
        {
          order: 2,
          check: "review-controlled-drift-findings",
          status: "blocked",
          severity: "blocker",
        },
        {
          order: 3,
          check: "confirm-routing-remains-disabled",
          status: "ready",
          severity: "info",
        },
        {
          order: 4,
          check: "confirm-sibling-projects-can-continue",
          status: "ready",
          severity: "info",
        },
      ],
    });
  }, 60000);

  it("exposes JSON and Markdown through the audit route table using mock read-only services", async () => {
    const javaServer = await startJavaServer();
    const miniKvServer = await startMiniKvServer();
    servers.push(javaServer, miniKvServer);
    const app = await buildApp(loadTestConfig({
      ORDER_PLATFORM_URL: javaServer.url,
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: String(miniKvServer.port),
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        previewState: "controlled-read-only-shard-preview-ready",
        previewDecision: "preview-java-and-mini-kv-shard-readiness",
        activeNodeVersion: "Node v601",
        sourceNodeVersion: "Node v600",
        previewOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        activeShardRouterAllowed: false,
        writeRoutingAllowed: false,
        loadRestoreCompactAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("controlled read-only shard preview");
      expect(markdown.body).toContain("Preview decision: preview-java-and-mini-kv-shard-readiness");
      expect(markdown.body).toContain("## Source Matrix");
      expect(markdown.body).toContain("## Source Matrix Consumer");
      expect(markdown.body).toContain("## Source Matrix Drift Summary");
      expect(markdown.body).toContain("## Source Matrix Review Checklist");
      expect(markdown.body).toContain("Ready source count: 2");
      expect(markdown.body).toContain("Ready for controlled read-only consumption: true");
      expect(markdown.body).toContain("Drift state: controlled-drift-detected");
      expect(markdown.body).toContain("Checklist state: ready-for-controlled-review");
      expect(markdown.body).toContain("Routing modes: read-only-preview, single-shard-readiness-prototype");
      expect(markdown.body).toContain("Command: SHARDJSON");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("LOAD/RESTORE/COMPACT allowed: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function fakeOrderPlatform(): OrderPlatformClient {
  return {
    shardReadiness: async () => ({
      statusCode: 200,
      latencyMs: 3,
      data: javaEvidence,
    }),
  } as OrderPlatformClient;
}

function fakeMiniKv(): MiniKvClient {
  return {
    shardJson: async () => ({
      command: "SHARDJSON",
      response: JSON.stringify(miniKvEvidence),
      latencyMs: 4,
      readiness: miniKvEvidence,
    }),
  } as MiniKvClient;
}

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-581",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v581-controlled-read-only-shard-preview",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "true",
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

async function startJavaServer(): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/api/v1/ops/shard-readiness") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(javaEvidence));
      return;
    }
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "not_found" }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Java mock server did not expose a TCP port");
  }
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

async function startMiniKvServer(): Promise<{ port: number; close: () => Promise<void> }> {
  const server = net.createServer((socket) => {
    socket.setEncoding("utf8");
    socket.on("data", (chunk) => {
      if (chunk.trim().toUpperCase() === "SHARDJSON") {
        socket.end(`${JSON.stringify(miniKvEvidence)}\n`);
        return;
      }
      socket.end("ERR unknown command\n");
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("mini-kv mock server did not expose a TCP port");
  }
  return {
    port: address.port,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}
