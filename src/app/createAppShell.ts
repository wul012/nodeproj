import crypto from "node:crypto";

import Fastify, { type FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { isAppHttpError } from "../errors.js";

export function createAppShell(config: AppConfig): FastifyInstance {
  const app = Fastify({
    logger: { level: config.logLevel },
    genReqId: () => crypto.randomUUID(),
  });

  app.setErrorHandler((error, request, reply) => {
    reply.header("x-orderops-request-id", request.id);
    if (isAppHttpError(error)) {
      reply.code(error.statusCode).send({
        error: error.code,
        message: error.message,
        details: error.details,
        requestId: request.id,
      });
      return;
    }

    const candidate = error as { statusCode?: unknown; message?: unknown };
    const statusCode = typeof candidate.statusCode === "number" && candidate.statusCode >= 400
      ? candidate.statusCode
      : 500;
    reply.code(statusCode).send({
      error: statusCode === 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR",
      message: typeof candidate.message === "string" ? candidate.message : "Request failed",
      requestId: request.id,
    });
  });

  return app;
}
