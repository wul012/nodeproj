import Fastify from "fastify";
import type { FastifyInstance } from "fastify";

import { MiniKvClient } from "./clients/miniKvClient.js";
import { OrderPlatformClient } from "./clients/orderPlatformClient.js";
import type { AppConfig } from "./config.js";
import { isAppHttpError } from "./errors.js";
import { registerDashboardRoutes } from "./routes/dashboardRoutes.js";
import { registerMiniKvRoutes } from "./routes/miniKvRoutes.js";
import { registerOrderPlatformRoutes } from "./routes/orderPlatformRoutes.js";
import { registerStatusRoutes } from "./routes/statusRoutes.js";
import { OpsSnapshotService } from "./services/opsSnapshotService.js";

export async function buildApp(config: AppConfig): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: config.logLevel,
    },
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
  const snapshots = new OpsSnapshotService(orderPlatform, miniKv);

  await registerDashboardRoutes(app);
  await registerStatusRoutes(app, { config, snapshots });
  await registerOrderPlatformRoutes(app, { orderPlatform });
  await registerMiniKvRoutes(app, { miniKv });

  return app;
}
