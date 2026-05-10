import type { FastifyInstance } from "fastify";

import { actionKeys } from "../services/actionPlanner.js";
import { OperationIntentStore, operatorRoles } from "../services/operationIntent.js";
import type { ActionKey, ActionTarget } from "../services/actionPlanner.js";
import type { ConfirmOperationIntentInput, OperatorRole } from "../services/operationIntent.js";

interface OperationIntentRouteDeps {
  operationIntents: OperationIntentStore;
}

interface CreateIntentBody {
  action: ActionKey;
  target?: ActionTarget;
  operatorId: string;
  role: OperatorRole;
  reason?: string;
}

interface IntentParams {
  intentId: string;
}

interface ListIntentQuery {
  limit?: number;
}

const targetKeys = ["order-platform", "mini-kv"] as const;

export async function registerOperationIntentRoutes(app: FastifyInstance, deps: OperationIntentRouteDeps): Promise<void> {
  app.get<{ Querystring: ListIntentQuery }>("/api/v1/operation-intents", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 200 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => ({
    intents: deps.operationIntents.list(request.query.limit ?? 20),
  }));

  app.get<{ Params: IntentParams }>("/api/v1/operation-intents/:intentId", async (request) =>
    deps.operationIntents.get(request.params.intentId));

  app.post<{ Body: CreateIntentBody }>("/api/v1/operation-intents", {
    schema: {
      body: {
        type: "object",
        required: ["action", "operatorId", "role"],
        properties: {
          action: { type: "string", enum: actionKeys },
          target: { type: "string", enum: targetKeys },
          operatorId: { type: "string", minLength: 1, maxLength: 80 },
          role: { type: "string", enum: operatorRoles },
          reason: { type: "string", maxLength: 400 },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const intent = deps.operationIntents.create(request.body);
    reply.code(201);
    return intent;
  });

  app.post<{ Params: IntentParams; Body: ConfirmOperationIntentInput }>("/api/v1/operation-intents/:intentId/confirm", {
    schema: {
      body: {
        type: "object",
        required: ["operatorId", "confirmText"],
        properties: {
          operatorId: { type: "string", minLength: 1, maxLength: 80 },
          confirmText: { type: "string", minLength: 1, maxLength: 120 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => deps.operationIntents.confirm(request.params.intentId, request.body));
}
