import type { FastifyInstance } from "fastify";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import { OperationIntentStore } from "../services/operationIntent.js";
import { OperationPreflightService } from "../services/operationPreflight.js";
import {
  createOperationPreflightReport,
  createOperationPreflightReportVerification,
  renderOperationPreflightReportMarkdown,
  renderOperationPreflightVerificationMarkdown,
} from "../services/operationPreflightReport.js";

interface OperationPreflightRouteDeps {
  config: AppConfig;
  operationIntents: OperationIntentStore;
  operationDispatches: OperationDispatchLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}

interface IntentParams {
  intentId: string;
}

interface PreflightQuery {
  failedEventId?: string;
  keyPrefix?: string;
}

interface PreflightReportQuery extends PreflightQuery {
  format?: "json" | "markdown";
}

export async function registerOperationPreflightRoutes(app: FastifyInstance, deps: OperationPreflightRouteDeps): Promise<void> {
  const preflight = new OperationPreflightService(
    deps.config,
    deps.operationIntents,
    deps.operationDispatches,
    deps.orderPlatform,
    deps.miniKv,
  );

  app.get<{ Params: IntentParams; Querystring: PreflightReportQuery }>("/api/v1/operation-intents/:intentId/preflight/report", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          failedEventId: { type: "string", pattern: "^[0-9]+$" },
          keyPrefix: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
          format: { type: "string", enum: ["json", "markdown"] },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const report = createOperationPreflightReport(await preflight.create({
      intentId: request.params.intentId,
      failedEventId: request.query.failedEventId,
      keyPrefix: request.query.keyPrefix,
    }));

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationPreflightReportMarkdown(report);
    }

    return report;
  });

  app.get<{ Params: IntentParams; Querystring: PreflightReportQuery }>("/api/v1/operation-intents/:intentId/preflight/verification", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          failedEventId: { type: "string", pattern: "^[0-9]+$" },
          keyPrefix: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
          format: { type: "string", enum: ["json", "markdown"] },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const report = createOperationPreflightReport(await preflight.create({
      intentId: request.params.intentId,
      failedEventId: request.query.failedEventId,
      keyPrefix: request.query.keyPrefix,
    }));
    const verification = createOperationPreflightReportVerification(report);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationPreflightVerificationMarkdown(verification);
    }

    return verification;
  });

  app.get<{ Params: IntentParams; Querystring: PreflightQuery }>("/api/v1/operation-intents/:intentId/preflight", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          failedEventId: { type: "string", pattern: "^[0-9]+$" },
          keyPrefix: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => preflight.create({
    intentId: request.params.intentId,
    failedEventId: request.query.failedEventId,
    keyPrefix: request.query.keyPrefix,
  }));
}
