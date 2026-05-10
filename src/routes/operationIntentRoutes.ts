import type { FastifyInstance } from "fastify";

import { AppHttpError } from "../errors.js";
import { actionKeys } from "../services/actionPlanner.js";
import { OperationIntentStore, operatorRoles } from "../services/operationIntent.js";
import type { ActionKey, ActionTarget } from "../services/actionPlanner.js";
import type { ConfirmOperationIntentInput, OperationIntentEventType, OperatorRole } from "../services/operationIntent.js";

interface OperationIntentRouteDeps {
  operationIntents: OperationIntentStore;
}

interface CreateIntentBody {
  action: ActionKey;
  target?: ActionTarget;
  operatorId: string;
  role: OperatorRole;
  reason?: string;
  idempotencyKey?: string;
}

interface CreateIntentHeaders {
  "idempotency-key"?: string;
}

interface IntentParams {
  intentId: string;
}

interface ListIntentQuery {
  limit?: number;
}

interface ListIntentEventQuery {
  intentId?: string;
  type?: OperationIntentEventType;
  limit?: number;
}

const targetKeys = ["order-platform", "mini-kv"] as const;
const intentEventTypes = [
  "intent.created",
  "intent.blocked",
  "intent.awaiting_confirmation",
  "intent.idempotency_replayed",
  "intent.confirmation.accepted",
  "intent.confirmation.rejected",
  "intent.dispatch.rejected",
  "intent.dispatch.dry_run_completed",
  "intent.expired",
] as const;

export async function registerOperationIntentRoutes(app: FastifyInstance, deps: OperationIntentRouteDeps): Promise<void> {
  app.get<{ Querystring: ListIntentEventQuery }>("/api/v1/operation-intent-events", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          intentId: { type: "string", minLength: 1 },
          type: { type: "string", enum: intentEventTypes },
          limit: { type: "integer", minimum: 1, maximum: 1000 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => ({
    events: deps.operationIntents.listEvents(request.query),
  }));

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

  app.get<{ Params: IntentParams; Querystring: ListIntentQuery }>("/api/v1/operation-intents/:intentId/timeline", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 1000 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => deps.operationIntents.getTimeline(request.params.intentId, request.query.limit ?? 50));

  app.post<{ Body: CreateIntentBody; Headers: CreateIntentHeaders }>("/api/v1/operation-intents", {
    schema: {
      headers: {
        type: "object",
        properties: {
          "idempotency-key": { type: "string", minLength: 1, maxLength: 120 },
        },
        additionalProperties: true,
      },
      body: {
        type: "object",
        required: ["action", "operatorId", "role"],
        properties: {
          action: { type: "string", enum: actionKeys },
          target: { type: "string", enum: targetKeys },
          operatorId: { type: "string", minLength: 1, maxLength: 80 },
          role: { type: "string", enum: operatorRoles },
          reason: { type: "string", maxLength: 400 },
          idempotencyKey: { type: "string", minLength: 1, maxLength: 120 },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const headerKey = request.headers["idempotency-key"];
    if (headerKey !== undefined && request.body.idempotencyKey !== undefined && headerKey !== request.body.idempotencyKey) {
      throw new AppHttpError(400, "IDEMPOTENCY_KEY_MISMATCH", "Header and body idempotency keys must match");
    }

    const intent = deps.operationIntents.create({
      ...request.body,
      idempotencyKey: headerKey ?? request.body.idempotencyKey,
    });
    reply.code(intent.idempotency?.reused ? 200 : 201);
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
