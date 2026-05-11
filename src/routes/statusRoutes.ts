import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { OpsSnapshotService } from "../services/opsSnapshotService.js";
import { createUpstreamOverview } from "../services/upstreamOverview.js";

interface StatusRouteDeps {
  config: AppConfig;
  snapshots: OpsSnapshotService;
}

export async function registerStatusRoutes(app: FastifyInstance, deps: StatusRouteDeps): Promise<void> {
  app.get("/health", async () => ({
    service: "orderops-node",
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    pid: process.pid,
    version: process.version,
  }));

  app.get("/api/v1/sources/status", async () => deps.snapshots.sample());

  app.get("/api/v1/upstreams/overview", async () => {
    const snapshot = await deps.snapshots.sample();
    return createUpstreamOverview(deps.config, snapshot);
  });

  app.get("/api/v1/runtime/config", async () => ({
    service: "orderops-node",
    safety: {
      upstreamProbesEnabled: deps.config.upstreamProbesEnabled,
      upstreamActionsEnabled: deps.config.upstreamActionsEnabled,
    },
    upstreams: {
      orderPlatformUrl: deps.config.orderPlatformUrl,
      miniKv: `${deps.config.miniKvHost}:${deps.config.miniKvPort}`,
    },
    mutationRateLimit: {
      windowMs: deps.config.mutationRateLimitWindowMs,
      maxRequests: deps.config.mutationRateLimitMax,
    },
    opsSampleIntervalMs: deps.config.opsSampleIntervalMs,
  }));

  app.get("/api/v1/events/ops", (request, reply) => {
    reply.hijack();
    reply.raw.writeHead(200, {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    });

    let closed = false;

    const send = async () => {
      if (closed) {
        return;
      }

      try {
        const snapshot = await deps.snapshots.sample();
        reply.raw.write(`event: snapshot\ndata: ${JSON.stringify(snapshot)}\n\n`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        reply.raw.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`);
      }
    };

    const interval = setInterval(() => {
      void send();
    }, deps.config.opsSampleIntervalMs);

    request.raw.on("close", () => {
      closed = true;
      clearInterval(interval);
    });

    void send();
  });
}
