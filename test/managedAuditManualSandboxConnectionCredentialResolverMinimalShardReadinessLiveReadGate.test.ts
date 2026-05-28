import http from "node:http";
import net from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import type { MiniKvClient } from "../src/clients/miniKvClient.js";
import type { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate";

const javaEvidence = {
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
};

const miniKvEvidence = {
  contract: "shard-readiness.v1",
  evidenceType: "shard_readiness",
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
  shardMap: [{ shardId: "shard-0", slotStart: 0, slotEnd: 15, storagePath: "not-created", readOnly: true, writesAllowed: false }],
  keyRoutingSamples: [
    { key: "orderops:alpha", slot: 5, shardId: "shard-0" },
    { key: "audit:receipt:001", slot: 9, shardId: "shard-0" },
    { key: "mini-kv:health", slot: 14, shardId: "shard-0" },
  ],
  boundaries: {
    orderAuthoritative: false,
    auditAuthoritative: false,
    writeCommandsAllowed: false,
    adminCommandsAllowed: false,
    loadRestoreCompactAllowed: false,
    setnxexExecutionAllowed: false,
    multiProcessStarted: false,
    storageDirectoriesCreated: false,
  },
  diagnostics: {
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
    loadRestoreCompactExecuted: false,
    nodeConsumer: "Node v370 shard readiness contract consumer gate",
    javaEchoExpected: "Java shard-readiness echo may consume the same shard-readiness.v1 fields",
  },
  evidenceDigest: "fnv1a64:22d3c4815a440804",
  notes: [
    "read-only shard readiness prototype",
    "single logical shard only",
    "slot table is evidence, not active storage routing",
    "does not create shard directories or start extra processes",
    "not order or audit authoritative",
  ],
};

const servers: Array<{ close: () => Promise<void> }> = [];

afterEach(async () => {
  while (servers.length > 0) {
    await servers.pop()?.close();
  }
});

describe("managed audit manual sandbox connection credential resolver minimal shard readiness live-read gate", () => {
  it("passes when Java and mini-kv live reads match the v370 static evidence", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate.v1",
      gateState: "minimal-shard-readiness-live-read-gate-ready",
      gateDecision: "archive-minimal-shard-readiness-live-read",
      readyForMinimalShardReadinessLiveReadGate: true,
      readyForNodeV372LiveReadArchiveVerification: true,
      activeNodeVersion: "Node v371",
      sourceNodeVersion: "Node v370",
      consumesNodeV370ShardReadinessContractConsumerGate: true,
      liveReadOnly: true,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      executionAllowed: false,
      sourceNodeV370: {
        sourceVersion: "Node v370",
        gateState: "shard-readiness-contract-consumer-gate-ready",
        gateDecision: "consume-java-and-mini-kv-shard-readiness-evidence",
        readyForShardReadinessContractConsumerGate: true,
        readyForNodeV371MinimalShardReadinessLiveReadGate: true,
        evidenceSourceCount: 2,
        readyEvidenceSourceCount: 2,
        productionBlockerCount: 0,
      },
      liveReads: {
        java: {
          project: "advanced-order-platform",
          sourceVersion: "Java v153 live",
          attempted: true,
          status: "passed-read",
          transport: "http-json",
          endpoint: "GET /api/v1/ops/shard-readiness",
          command: null,
          statusCode: 200,
          missingRequiredFields: [],
          readOnlySafe: true,
          executionBlocked: true,
          compatibleWithV370Evidence: true,
          boundarySafe: true,
          readyForGate: true,
        },
        miniKv: {
          project: "mini-kv",
          sourceVersion: "mini-kv v144 live",
          attempted: true,
          status: "passed-read",
          transport: "tcp-command",
          command: "SHARDJSON",
          statusCode: null,
          missingRequiredFields: [],
          readOnlySafe: true,
          executionBlocked: true,
          compatibleWithV370Evidence: true,
          boundarySafe: true,
          readyForGate: true,
        },
      },
      checks: {
        sourceNodeV370Ready: true,
        sourceNodeV370EvidenceSourcesReady: true,
        upstreamProbesEnabledForLiveRead: true,
        javaLiveReadAttempted: true,
        javaLiveReadPassed: true,
        javaRequiredFieldsComplete: true,
        javaReadOnlySafe: true,
        javaExecutionBlocked: true,
        javaCompatibleWithV370Evidence: true,
        miniKvLiveReadAttempted: true,
        miniKvLiveReadPassed: true,
        miniKvRequiredFieldsComplete: true,
        miniKvReadOnlySafe: true,
        miniKvExecutionBlocked: true,
        miniKvCompatibleWithV370Evidence: true,
        miniKvBoundarySafe: true,
        bothLiveReadsReady: true,
        digestStable: true,
        nodeDoesNotStartUpstreams: true,
        nodeDoesNotStopUpstreams: true,
        nodeDoesNotMutateSiblingState: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForMinimalShardReadinessLiveReadGate: true,
      },
      summary: {
        checkCount: 27,
        passedCheckCount: 27,
        attemptedReadCount: 2,
        passedReadCount: 2,
        failedReadCount: 0,
        skippedReadCount: 0,
        requiredFieldCount: 20,
        presentRequiredFieldCount: 20,
        missingRequiredFieldCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.gate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV370.sourceGateDigest).toMatch(/^[a-f0-9]{64}$/);
  }, 60000);

  it("fails closed without attempting reads when upstream probes are disabled", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForMinimalShardReadinessLiveReadGate).toBe(false);
    expect(profile.liveReads.java.status).toBe("skipped-probes-disabled");
    expect(profile.liveReads.miniKv.status).toBe("skipped-probes-disabled");
    expect(profile.liveReads.java.attempted).toBe(false);
    expect(profile.liveReads.miniKv.attempted).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_DISABLED",
      "JAVA_LIVE_READ_NOT_ATTEMPTED",
      "MINI_KV_LIVE_READ_NOT_ATTEMPTED",
    ]));
    expect(profile.startsJavaService).toBe(false);
    expect(profile.startsMiniKvService).toBe(false);
  }, 60000);

  it("exposes JSON and Markdown through the audit route table using mock live services", async () => {
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate.v1",
        gateState: "minimal-shard-readiness-live-read-gate-ready",
        gateDecision: "archive-minimal-shard-readiness-live-read",
        activeNodeVersion: "Node v371",
        sourceNodeVersion: "Node v370",
        startsJavaService: false,
        startsMiniKvService: false,
        stopsJavaService: false,
        stopsMiniKvService: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal shard readiness live-read gate",
      );
      expect(markdown.body).toContain("Gate decision: archive-minimal-shard-readiness-live-read");
      expect(markdown.body).toContain("Java v153 live");
      expect(markdown.body).toContain("mini-kv v144 live");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Stops mini-kv service: false");
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
    "x-orderops-operator-id": "auditor-371",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v371-live-read-gate",
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
