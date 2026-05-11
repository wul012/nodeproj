import type { FastifyInstance, FastifyReply } from "fastify";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import { assertMutationAllowed, mutationScope, MutationRateLimiter } from "../services/mutationRateLimiter.js";
import {
  OperationApprovalRequestLedger,
  renderOperationApprovalRequestMarkdown,
} from "../services/operationApprovalRequest.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import { OperationExecutionPreviewService } from "../services/operationExecutionPreview.js";
import { OperationIntentStore } from "../services/operationIntent.js";
import { OperationPreflightService } from "../services/operationPreflight.js";
import { createOperationPreflightReport } from "../services/operationPreflightReport.js";

interface OperationApprovalRequestRouteDeps {
  config: AppConfig;
  operationIntents: OperationIntentStore;
  operationDispatches: OperationDispatchLedger;
  operationApprovalRequests: OperationApprovalRequestLedger;
  mutationRateLimiter: MutationRateLimiter;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}

interface CreateApprovalRequestBody {
  intentId: string;
  requestedBy?: string;
  reviewer?: string;
  decisionReason?: string;
  failedEventId?: string;
  keyPrefix?: string;
  command?: string;
  key?: string;
  value?: string;
}

interface ApprovalRequestParams {
  requestId: string;
}

interface ListApprovalRequestQuery {
  limit?: number;
}

interface GetApprovalRequestQuery {
  format?: "json" | "markdown";
}

export async function registerOperationApprovalRequestRoutes(
  app: FastifyInstance,
  deps: OperationApprovalRequestRouteDeps,
): Promise<void> {
  const preflight = new OperationPreflightService(
    deps.config,
    deps.operationIntents,
    deps.operationDispatches,
    deps.orderPlatform,
    deps.miniKv,
  );
  const executionPreview = new OperationExecutionPreviewService(deps.config, deps.orderPlatform, deps.miniKv);

  app.get<{ Querystring: ListApprovalRequestQuery }>("/api/v1/operation-approval-requests", {
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
    requests: deps.operationApprovalRequests.list(request.query.limit ?? 20),
  }));

  app.get<{ Params: ApprovalRequestParams; Querystring: GetApprovalRequestQuery }>("/api/v1/operation-approval-requests/:requestId", {
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
    const approvalRequest = deps.operationApprovalRequests.get(request.params.requestId);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationApprovalRequestMarkdown(approvalRequest);
    }

    return approvalRequest;
  });

  app.post<{ Body: CreateApprovalRequestBody }>("/api/v1/operation-approval-requests", {
    schema: {
      body: {
        type: "object",
        required: ["intentId"],
        properties: {
          intentId: { type: "string", minLength: 1 },
          requestedBy: { type: "string", minLength: 1, maxLength: 80 },
          reviewer: { type: "string", minLength: 1, maxLength: 80 },
          decisionReason: { type: "string", maxLength: 400 },
          failedEventId: { type: "string", pattern: "^[0-9]+$" },
          keyPrefix: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
          command: { type: "string", minLength: 1, maxLength: 512, pattern: "^[^\\r\\n]+$" },
          key: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
          value: { type: "string", minLength: 1, maxLength: 256, pattern: "^[^\\r\\n\\s]+$" },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    applyMutationRateLimit(
      reply,
      deps.mutationRateLimiter.consume(mutationScope("operation-approval-requests:create", request.body.requestedBy ?? "dashboard")),
    );
    const report = createOperationPreflightReport(await preflight.create({
      intentId: request.body.intentId,
      failedEventId: request.body.failedEventId,
      keyPrefix: request.body.keyPrefix,
    }));
    const preview = await executionPreview.create(report, {
      failedEventId: request.body.failedEventId,
      command: request.body.command,
      key: request.body.key,
      value: request.body.value,
    });
    const approvalRequest = deps.operationApprovalRequests.create({
      preview,
      requestedBy: request.body.requestedBy,
      reviewer: request.body.reviewer,
      decisionReason: request.body.decisionReason,
    });

    reply.code(201);
    return approvalRequest;
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
