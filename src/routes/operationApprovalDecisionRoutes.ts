import type { FastifyInstance, FastifyReply } from "fastify";

import { assertMutationAllowed, mutationScope, MutationRateLimiter } from "../services/mutationRateLimiter.js";
import {
  OperationApprovalDecisionLedger,
  operationApprovalDecisionValues,
  renderOperationApprovalDecisionMarkdown,
} from "../services/operationApprovalDecision.js";
import type { OperationApprovalDecisionValue } from "../services/operationApprovalDecision.js";

interface OperationApprovalDecisionRouteDeps {
  operationApprovalDecisions: OperationApprovalDecisionLedger;
  mutationRateLimiter: MutationRateLimiter;
}

interface ApprovalRequestParams {
  requestId: string;
}

interface ApprovalDecisionParams {
  decisionId: string;
}

interface CreateApprovalDecisionBody {
  decision: OperationApprovalDecisionValue;
  reviewer: string;
  reason?: string;
}

interface ListApprovalDecisionQuery {
  limit?: number;
}

interface GetApprovalDecisionQuery {
  format?: "json" | "markdown";
}

export async function registerOperationApprovalDecisionRoutes(
  app: FastifyInstance,
  deps: OperationApprovalDecisionRouteDeps,
): Promise<void> {
  app.get<{ Querystring: ListApprovalDecisionQuery }>("/api/v1/operation-approval-decisions", {
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
    decisions: deps.operationApprovalDecisions.list(request.query.limit ?? 20),
  }));

  app.get<{ Params: ApprovalDecisionParams; Querystring: GetApprovalDecisionQuery }>("/api/v1/operation-approval-decisions/:decisionId", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          format: { type: "string", enum: ["json", "markdown"] },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const decision = deps.operationApprovalDecisions.get(request.params.decisionId);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationApprovalDecisionMarkdown(decision);
    }

    return decision;
  });

  app.post<{ Params: ApprovalRequestParams; Body: CreateApprovalDecisionBody }>("/api/v1/operation-approval-requests/:requestId/decision", {
    schema: {
      body: {
        type: "object",
        required: ["decision", "reviewer"],
        properties: {
          decision: { type: "string", enum: operationApprovalDecisionValues },
          reviewer: { type: "string", minLength: 1, maxLength: 80 },
          reason: { type: "string", maxLength: 400 },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    applyMutationRateLimit(
      reply,
      deps.mutationRateLimiter.consume(mutationScope("operation-approval-decisions:create", request.body.reviewer)),
    );
    const decision = deps.operationApprovalDecisions.create({
      requestId: request.params.requestId,
      decision: request.body.decision,
      reviewer: request.body.reviewer,
      reason: request.body.reason,
    });

    reply.code(201);
    return decision;
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
