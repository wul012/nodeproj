import type { FastifyInstance, FastifyReply } from "fastify";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import { assertMutationAllowed, mutationScope, MutationRateLimiter } from "../services/mutationRateLimiter.js";
import {
  OperationApprovalDecisionLedger,
} from "../services/operationApprovalDecision.js";
import {
  createOperationApprovalEvidenceVerification,
  OperationApprovalEvidenceService,
} from "../services/operationApprovalEvidence.js";
import {
  createOperationApprovalExecutionGatePreview,
  type OperationApprovalExecutionGatePreview,
} from "../services/operationApprovalExecutionGatePreview.js";
import {
  createOperationApprovalExecutionGateArchiveVerification,
  OperationApprovalExecutionGateArchiveLedger,
  renderOperationApprovalExecutionGateArchiveMarkdown,
  renderOperationApprovalExecutionGateArchiveVerificationMarkdown,
} from "../services/operationApprovalExecutionGateArchive.js";
import {
  createOperationApprovalExecutionContractArchiveBundle,
  renderOperationApprovalExecutionContractArchiveBundleMarkdown,
} from "../services/operationApprovalExecutionContractArchiveBundle.js";
import {
  createOperationApprovalHandoffBundle,
} from "../services/operationApprovalHandoffBundle.js";
import {
  OperationApprovalRequestLedger,
} from "../services/operationApprovalRequest.js";

interface OperationApprovalExecutionGateArchiveRouteDeps {
  config: AppConfig;
  operationApprovalRequests: OperationApprovalRequestLedger;
  operationApprovalDecisions: OperationApprovalDecisionLedger;
  operationApprovalExecutionGateArchives: OperationApprovalExecutionGateArchiveLedger;
  mutationRateLimiter: MutationRateLimiter;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}

interface ApprovalRequestParams {
  requestId: string;
}

interface ArchiveParams {
  archiveId: string;
}

interface CreateArchiveBody {
  reviewer?: string;
  note?: string;
}

interface ListArchiveQuery {
  limit?: number;
}

interface GetArchiveQuery {
  format?: "json" | "markdown";
}

export async function registerOperationApprovalExecutionGateArchiveRoutes(
  app: FastifyInstance,
  deps: OperationApprovalExecutionGateArchiveRouteDeps,
): Promise<void> {
  const evidenceService = new OperationApprovalEvidenceService(deps.config, deps.orderPlatform, deps.miniKv);

  app.get<{ Querystring: ListArchiveQuery }>("/api/v1/operation-approval-execution-gate-archives", {
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
    archives: deps.operationApprovalExecutionGateArchives.list(request.query.limit ?? 20),
  }));

  app.get<{ Params: ArchiveParams; Querystring: GetArchiveQuery }>("/api/v1/operation-approval-execution-gate-archives/:archiveId/verification", {
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
    const record = deps.operationApprovalExecutionGateArchives.get(request.params.archiveId);
    const verification = createOperationApprovalExecutionGateArchiveVerification(
      record,
      deps.operationApprovalRequests.get(record.requestId),
      deps.operationApprovalDecisions.getByRequest(record.requestId),
    );

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationApprovalExecutionGateArchiveVerificationMarkdown(verification);
    }

    return verification;
  });

  app.get<{ Params: ArchiveParams; Querystring: GetArchiveQuery }>("/api/v1/operation-approval-execution-gate-archives/:archiveId/execution-contract-bundle", {
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
    const record = deps.operationApprovalExecutionGateArchives.get(request.params.archiveId);
    const verification = createOperationApprovalExecutionGateArchiveVerification(
      record,
      deps.operationApprovalRequests.get(record.requestId),
      deps.operationApprovalDecisions.getByRequest(record.requestId),
    );
    const bundle = createOperationApprovalExecutionContractArchiveBundle(record, verification);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationApprovalExecutionContractArchiveBundleMarkdown(bundle);
    }

    return bundle;
  });

  app.get<{ Params: ArchiveParams; Querystring: GetArchiveQuery }>("/api/v1/operation-approval-execution-gate-archives/:archiveId", {
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
    const record = deps.operationApprovalExecutionGateArchives.get(request.params.archiveId);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationApprovalExecutionGateArchiveMarkdown(record);
    }

    return record;
  });

  app.post<{ Params: ApprovalRequestParams; Body: CreateArchiveBody }>("/api/v1/operation-approval-requests/:requestId/execution-gate-archive", {
    schema: {
      body: {
        type: "object",
        properties: {
          reviewer: { type: "string", minLength: 1, maxLength: 80 },
          note: { type: "string", minLength: 1, maxLength: 400 },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    applyMutationRateLimit(
      reply,
      deps.mutationRateLimiter.consume(mutationScope("operation-approval-execution-gate-archives:create", request.body?.reviewer ?? "dashboard")),
    );
    const preview = await createCurrentExecutionGatePreview(evidenceService, deps, request.params.requestId);
    const record = deps.operationApprovalExecutionGateArchives.create({
      preview,
      reviewer: request.body?.reviewer,
      note: request.body?.note,
    });

    reply.code(201);
    return record;
  });
}

async function createCurrentExecutionGatePreview(
  evidenceService: OperationApprovalEvidenceService,
  deps: OperationApprovalExecutionGateArchiveRouteDeps,
  requestId: string,
): Promise<OperationApprovalExecutionGatePreview> {
  const report = await evidenceService.createReport(
    deps.operationApprovalRequests.get(requestId),
    deps.operationApprovalDecisions.getByRequest(requestId),
  );
  const verification = createOperationApprovalEvidenceVerification(report);
  const bundle = createOperationApprovalHandoffBundle(report, verification);
  return createOperationApprovalExecutionGatePreview(bundle);
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
