import type { FastifyInstance } from "fastify";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import { OperationApprovalDecisionLedger } from "../services/operationApprovalDecision.js";
import { OperationApprovalRequestLedger } from "../services/operationApprovalRequest.js";
import {
  createOperationApprovalEvidenceVerification,
  OperationApprovalEvidenceService,
  renderOperationApprovalEvidenceMarkdown,
  renderOperationApprovalEvidenceVerificationMarkdown,
} from "../services/operationApprovalEvidence.js";

interface OperationApprovalEvidenceRouteDeps {
  config: AppConfig;
  operationApprovalRequests: OperationApprovalRequestLedger;
  operationApprovalDecisions: OperationApprovalDecisionLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}

interface ApprovalRequestParams {
  requestId: string;
}

interface ApprovalEvidenceQuery {
  format?: "json" | "markdown";
}

export async function registerOperationApprovalEvidenceRoutes(
  app: FastifyInstance,
  deps: OperationApprovalEvidenceRouteDeps,
): Promise<void> {
  const evidenceService = new OperationApprovalEvidenceService(deps.config, deps.orderPlatform, deps.miniKv);

  app.get<{ Params: ApprovalRequestParams; Querystring: ApprovalEvidenceQuery }>("/api/v1/operation-approval-requests/:requestId/evidence", {
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
    const report = await evidenceService.createReport(
      deps.operationApprovalRequests.get(request.params.requestId),
      deps.operationApprovalDecisions.getByRequest(request.params.requestId),
    );

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationApprovalEvidenceMarkdown(report);
    }

    return report;
  });

  app.get<{ Params: ApprovalRequestParams; Querystring: ApprovalEvidenceQuery }>("/api/v1/operation-approval-requests/:requestId/verification", {
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
    const report = await evidenceService.createReport(
      deps.operationApprovalRequests.get(request.params.requestId),
      deps.operationApprovalDecisions.getByRequest(request.params.requestId),
    );
    const verification = createOperationApprovalEvidenceVerification(report);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperationApprovalEvidenceVerificationMarkdown(verification);
    }

    return verification;
  });
}
