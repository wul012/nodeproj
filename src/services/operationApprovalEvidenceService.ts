import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { EvidenceRecord } from "./operationPreflight.js";
import type { OperationApprovalDecision } from "./operationApprovalDecision.js";
import type { OperationApprovalRequest } from "./operationApprovalRequest.js";
import { createOperationApprovalEvidenceReport } from "./operationApprovalEvidenceReport.js";
import type { OperationApprovalEvidenceReport } from "./operationApprovalEvidenceTypes.js";
import { inferFailedEventId, inferMiniKvExplainCommand } from "./operationApprovalEvidenceReaders.js";

export class OperationApprovalEvidenceService {
  constructor(
    private readonly config: AppConfig,
    private readonly orderPlatform: OrderPlatformClient,
    private readonly miniKv: MiniKvClient,
  ) {}

  async createReport(
    request: OperationApprovalRequest,
    decision: OperationApprovalDecision | undefined,
  ): Promise<OperationApprovalEvidenceReport> {
    const upstreamEvidence = {
      javaApprovalStatus: await this.collectJavaApprovalStatus(request),
      miniKvExplainCoverage: await this.collectMiniKvExplainCoverage(request),
      javaExecutionContract: await this.collectJavaExecutionContract(request),
      miniKvExecutionContract: await this.collectMiniKvExecutionContract(request),
    };
    return createOperationApprovalEvidenceReport(request, decision, upstreamEvidence);
  }

  private async collectJavaApprovalStatus(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "order-platform" || request.action !== "failed-event-replay-simulation") {
      return {
        status: "not_applicable",
        message: "Approval request does not target Java failed-event approval status.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; Java approval-status evidence was not requested.",
      };
    }

    const failedEventId = inferFailedEventId(request);
    if (failedEventId === undefined) {
      return {
        status: "missing_context",
        message: "No failedEventId was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.orderPlatform.failedEventApprovalStatus(failedEventId);
      return {
        status: "available",
        message: "Java failed-event approval-status evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          failedEventId,
          approvalStatus: response.data,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectMiniKvExplainCoverage(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "mini-kv") {
      return {
        status: "not_applicable",
        message: "Approval request does not target mini-kv EXPLAINJSON coverage.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; mini-kv EXPLAINJSON coverage was not requested.",
      };
    }

    const command = inferMiniKvExplainCommand(request);
    if (command === undefined) {
      return {
        status: "missing_context",
        message: "No mini-kv command was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.miniKv.explainJson(command);
      const sideEffects = Array.isArray(response.explanation.side_effects) ? response.explanation.side_effects : [];
      return {
        status: "available",
        message: "mini-kv EXPLAINJSON coverage evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          command,
          explanation: response.explanation,
          sideEffects,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectJavaExecutionContract(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "order-platform" || request.action !== "failed-event-replay-simulation") {
      return {
        status: "not_applicable",
        message: "Approval request does not target Java failed-event execution contract.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; Java replay execution contract was not requested.",
      };
    }

    const failedEventId = inferFailedEventId(request);
    if (failedEventId === undefined) {
      return {
        status: "missing_context",
        message: "No failedEventId was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.orderPlatform.failedEventReplayExecutionContract(failedEventId);
      return {
        status: "available",
        message: "Java failed-event replay execution contract evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          failedEventId,
          executionContract: response.data,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectMiniKvExecutionContract(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "mini-kv") {
      return {
        status: "not_applicable",
        message: "Approval request does not target mini-kv CHECKJSON execution contract.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; mini-kv CHECKJSON execution contract was not requested.",
      };
    }

    const command = inferMiniKvExplainCommand(request);
    if (command === undefined) {
      return {
        status: "missing_context",
        message: "No mini-kv command was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.miniKv.checkJson(command);
      return {
        status: "available",
        message: "mini-kv CHECKJSON execution contract evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          command,
          contract: response.contract,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
