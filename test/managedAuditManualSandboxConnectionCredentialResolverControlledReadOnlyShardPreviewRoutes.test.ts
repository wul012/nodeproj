import http from "node:http";
import net from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  completeHeaders,
  javaEvidence,
  loadTestConfig,
  miniKvEvidence,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const servers: Array<{ close: () => Promise<void> }> = [];

afterEach(async () => {
  while (servers.length > 0) {
    await servers.pop()?.close();
  }
});

describe("managed audit manual sandbox connection credential resolver controlled read-only shard preview routes", () => {
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
        activeNodeVersion: "Node v638",
        sourceNodeVersion: "Node v637",
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
      expect(markdown.body).toContain("## Source Matrix Consumption Plan");
      expect(markdown.body).toContain("## Source Matrix Review Checklist");
      expect(markdown.body).toContain("## Source Matrix Review Digest");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot Summary Export");
      expect(markdown.body).toContain("## Source Matrix Handoff Notes");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Export");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt Archive Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Snapshot");
      expect(markdown.body)
        .toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Verification");
      expect(markdown.body).toContain("Ready source count: 2");
      expect(markdown.body).toContain("Ready for controlled read-only consumption: true");
      expect(markdown.body).toContain("Drift state: controlled-drift-detected");
      expect(markdown.body).toContain("Plan state: ready-for-read-only-consumption-plan");
      expect(markdown.body).toContain("Ready for read-only consumption plan: true");
      expect(markdown.body).toContain("Plan digest scope: source-matrix-consumption-plan");
      expect(markdown.body).toContain("Checklist state: ready-for-controlled-review");
      expect(markdown.body).toContain("Ready for controlled review archive: true");
      expect(markdown.body).toContain("Archive state: ready-for-controlled-review-archive");
      expect(markdown.body).toContain("Export state: ready-for-summary-export");
      expect(markdown.body).toContain("Summary digest scope: archive-snapshot-summary-lines");
      expect(markdown.body).toContain("Summary digest covered line count: 5");
      expect(markdown.body).toContain("Handoff state: ready-for-read-only-handoff");
      expect(markdown.body).toContain("Handoff digest scope: read-only-handoff-notes");
      expect(markdown.body).toContain("Summary state: ready-for-read-only-handoff-summary");
      expect(markdown.body).toContain("Ready for read-only handoff summary: true");
      expect(markdown.body).toContain("Summary digest scope: read-only-handoff-summary");
      expect(markdown.body).toContain("Summary digest covered audience count: 4");
      expect(markdown.body).toContain("Decision: ready-for-read-only-summary-consumption");
      expect(markdown.body).toContain("Ready for read-only summary consumption: true");
      expect(markdown.body).toContain("Export state: ready-for-read-only-summary-consumer-export");
      expect(markdown.body).toContain("Export digest scope: handoff-summary-consumer-export-lines");
      expect(markdown.body).toContain("Receipt state: ready-for-read-only-summary-consumer-receipt");
      expect(markdown.body).toContain("Receipt digest scope: handoff-summary-consumer-receipt");
      expect(markdown.body).toContain("Snapshot state: ready-for-read-only-summary-consumer-receipt-archive");
      expect(markdown.body).toContain("Snapshot digest scope: handoff-summary-consumer-receipt-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-summary-consumer-receipt-archive-verification");
      expect(markdown.body).toContain("Ready for read-only summary consumer receipt archive verification: true");
      expect(markdown.body).toContain("Coverage state: ready-for-read-only-handoff-route-coverage");
      expect(markdown.body).toContain("Coverage digest scope: handoff-route-markdown-sections");
      expect(markdown.body).toContain("Verification state: ready-for-read-only-handoff-route-coverage-verification");
      expect(markdown.body).toContain("Ready for read-only handoff route coverage verification: true");
      expect(markdown.body).toContain("Snapshot state: ready-for-read-only-handoff-route-coverage-archive");
      expect(markdown.body).toContain("Snapshot digest scope: handoff-route-coverage-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-handoff-route-coverage-archive-verification");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive verification: true");
      expect(markdown.body).toContain("Summary state: ready-for-read-only-handoff-route-coverage-archive-summary");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary: true");
      expect(markdown.body).toContain("Summary digest scope: handoff-route-coverage-archive-summary-lines");
      expect(markdown.body)
        .toContain("Receipt state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt: true");
      expect(markdown.body).toContain("Receipt digest scope: handoff-route-coverage-archive-summary-receipt");
      expect(markdown.body)
        .toContain("Snapshot state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt archive: true");
      expect(markdown.body)
        .toContain("Snapshot digest scope: handoff-route-coverage-archive-summary-receipt-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt archive verification: true");
      expect(markdown.body).toContain("Routing modes: read-only-preview, single-shard-readiness-prototype");
      expect(markdown.body).toContain("Command: SHARDJSON");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("LOAD/RESTORE/COMPACT allowed: false");
      expect(markdown.body).toContain("## Next Actions");
      expect(markdown.body).toContain("Consume sourceMatrixConsumptionPlan.planStepRecords");
      expect(markdown.body).toContain("observeSources=java|miniKv");
      expect(markdown.body).toContain("### Consumption Plan Step Records");
      expect(markdown.body).toContain("3. review-drift-findings: needs-review");
      expect(markdown.body).toContain("Ready step count: 3");
      expect(markdown.body).toContain("Review step count: 1");
      expect(markdown.body).toContain("Blocked step count: 0");
      expect(markdown.body).toContain("Routing activation allowed step count: 0");
      expect(markdown.body).toContain("Writes allowed step count: 0");
    } finally {
      await app.close();
    }
  }, 60000);
});

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
