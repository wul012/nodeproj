import crypto from "node:crypto";
import { performance } from "node:perf_hooks";

import Fastify from "fastify";
import type { FastifyInstance } from "fastify";

import { MiniKvClient } from "./clients/miniKvClient.js";
import { OrderPlatformClient } from "./clients/orderPlatformClient.js";
import type { AppConfig } from "./config.js";
import { isAppHttpError } from "./errors.js";
import { registerActionPlanRoutes } from "./routes/actionPlanRoutes.js";
import { registerAuditRoutes } from "./routes/auditRoutes.js";
import { registerDashboardRoutes } from "./routes/dashboardRoutes.js";
import { registerMiniKvRoutes } from "./routes/miniKvRoutes.js";
import { registerOrderPlatformRoutes } from "./routes/orderPlatformRoutes.js";
import { registerOpsSummaryRoutes } from "./routes/opsSummaryRoutes.js";
import { registerOperationDispatchRoutes } from "./routes/operationDispatchRoutes.js";
import { registerOperationIntentRoutes } from "./routes/operationIntentRoutes.js";
import { registerStatusRoutes } from "./routes/statusRoutes.js";
import { AuditLog } from "./services/auditLog.js";
import { MutationRateLimiter } from "./services/mutationRateLimiter.js";
import { OpsSnapshotService } from "./services/opsSnapshotService.js";
import { OperationDispatchLedger } from "./services/operationDispatch.js";
import { OperationIntentStore } from "./services/operationIntent.js";

export async function buildApp(config: AppConfig): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: config.logLevel,
    },
    genReqId: () => crypto.randomUUID(),
  });

  app.setErrorHandler((error, _request, reply) => {
    if (isAppHttpError(error)) {
      reply.code(error.statusCode).send({
        error: error.code,
        message: error.message,
        details: error.details,
      });
      return;
    }

    const errorWithStatus = error as { statusCode?: unknown; message?: unknown };
    const statusCode =
      typeof errorWithStatus.statusCode === "number" && errorWithStatus.statusCode >= 400
        ? errorWithStatus.statusCode
        : 500;
    reply.code(statusCode).send({
      error: statusCode === 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR",
      message: typeof errorWithStatus.message === "string" ? errorWithStatus.message : "Request failed",
    });
  });

  app.addHook("onRequest", async (_request, reply) => {
    reply.header("x-orderops-service", "orderops-node");
    reply.header("access-control-allow-origin", "*");
  });

  app.options("/*", async (_request, reply) => {
    reply
      .header("access-control-allow-origin", "*")
      .header("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS")
      .header("access-control-allow-headers", "content-type,idempotency-key")
      .code(204)
      .send();
  });

  const orderPlatform = new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs);
  const miniKv = new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs);
  const snapshots = new OpsSnapshotService(orderPlatform, miniKv, config.upstreamProbesEnabled);
  const auditLog = new AuditLog();
  const mutationRateLimiter = new MutationRateLimiter({
    windowMs: config.mutationRateLimitWindowMs,
    maxRequests: config.mutationRateLimitMax,
  });
  const operationIntents = new OperationIntentStore(config);
  const operationDispatches = new OperationDispatchLedger(operationIntents);
  const requestStartTimes = new WeakMap<object, number>();

  app.addHook("onRequest", async (request) => {
    requestStartTimes.set(request, performance.now());
  });

  app.addHook("onResponse", async (request, reply) => {
    const startedAt = requestStartTimes.get(request);
    auditLog.record({
      requestId: request.id,
      method: request.method,
      path: request.url,
      statusCode: reply.statusCode,
      durationMs: startedAt === undefined ? 0 : performance.now() - startedAt,
    });
  });

  await registerDashboardRoutes(app);
  await registerAuditRoutes(app, { auditLog });
  await registerActionPlanRoutes(app, { config });
  await registerOperationIntentRoutes(app, { operationIntents, mutationRateLimiter });
  await registerOperationDispatchRoutes(app, { operationDispatches, mutationRateLimiter });
  await registerOpsSummaryRoutes(app, { config, auditLog, operationIntents, operationDispatches });
  await registerStatusRoutes(app, { config, snapshots });
  await registerOrderPlatformRoutes(app, { orderPlatform, upstreamActionsEnabled: config.upstreamActionsEnabled });
  await registerMiniKvRoutes(app, { miniKv, upstreamActionsEnabled: config.upstreamActionsEnabled });

  return app;
}
