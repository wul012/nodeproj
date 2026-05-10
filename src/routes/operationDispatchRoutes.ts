import type { FastifyInstance, FastifyReply } from "fastify";

import { assertMutationAllowed, mutationScope, MutationRateLimiter } from "../services/mutationRateLimiter.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import type { OperationDispatchMode } from "../services/operationDispatch.js";

interface OperationDispatchRouteDeps {
  operationDispatches: OperationDispatchLedger;
  mutationRateLimiter: MutationRateLimiter;
}

interface CreateDispatchBody {
  intentId: string;
  requestedBy: string;
  mode?: OperationDispatchMode;
}

interface DispatchParams {
  dispatchId: string;
}

interface IntentDispatchParams {
  intentId: string;
}

interface ListDispatchQuery {
  limit?: number;
}

export async function registerOperationDispatchRoutes(app: FastifyInstance, deps: OperationDispatchRouteDeps): Promise<void> {
  app.get<{ Querystring: ListDispatchQuery }>("/api/v1/operation-dispatches", {
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
    dispatches: deps.operationDispatches.list(request.query.limit ?? 20),
  }));

  app.get<{ Params: DispatchParams }>("/api/v1/operation-dispatches/:dispatchId", async (request) =>
    deps.operationDispatches.get(request.params.dispatchId));

  app.get<{ Params: IntentDispatchParams; Querystring: ListDispatchQuery }>("/api/v1/operation-intents/:intentId/dispatches", {
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
    dispatches: deps.operationDispatches.listByIntent(request.params.intentId, request.query.limit ?? 20),
  }));

  app.post<{ Body: CreateDispatchBody }>("/api/v1/operation-dispatches", {
    schema: {
      body: {
        type: "object",
        required: ["intentId", "requestedBy"],
        properties: {
          intentId: { type: "string", minLength: 1 },
          requestedBy: { type: "string", minLength: 1, maxLength: 80 },
          mode: { type: "string", enum: ["dry-run"] },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    applyMutationRateLimit(reply, deps.mutationRateLimiter.consume(mutationScope("operation-dispatches:create", request.body.requestedBy)));
    const dispatch = deps.operationDispatches.create(request.body);
    if (dispatch.status === "rejected") {
      reply.code(409);
      return dispatch;
    }

    reply.code(201);
    return dispatch;
  });

  app.post<{ Params: IntentDispatchParams }>("/api/v1/operation-intents/:intentId/dispatch", async (request, reply) => {
    const requestedBy = request.headers["x-requested-by"]?.toString() ?? "dashboard";
    applyMutationRateLimit(reply, deps.mutationRateLimiter.consume(mutationScope("operation-dispatches:create", requestedBy)));
    const dispatch = deps.operationDispatches.create({
      intentId: request.params.intentId,
      requestedBy,
      mode: "dry-run",
    });

    if (dispatch.status === "rejected") {
      reply.code(409);
      return dispatch;
    }

    reply.code(201);
    return dispatch;
  });
}

function applyMutationRateLimit(reply: FastifyReply, decision: ReturnType<MutationRateLimiter["consume"]>): void {
  reply
    .header("x-mutation-ratelimit-limit", decision.limit)
    .header("x-mutation-ratelimit-remaining", decision.remaining)
    .header("x-mutation-ratelimit-reset", decision.resetAt);

  if (!decision.allowed) {
    reply.header("retry-after", decision.retryAfterSeconds);
  }

  assertMutationAllowed(decision);
}
