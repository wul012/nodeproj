import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { EvidenceRecord } from "./operationPreflight.js";
import type { OperationPreflightReport } from "./operationPreflightReport.js";

export interface OperationExecutionPreviewInput {
  failedEventId?: string;
  command?: string;
  key?: string;
  value?: string;
}

export type OperationExecutionPreviewState = "blocked" | "review-required" | "ready";

export interface OperationExecutionPreview {
  service: "orderops-node";
  generatedAt: string;
  intentId: string;
  action: string;
  target: string;
  state: OperationExecutionPreviewState;
  preflightDigest: OperationPreflightReport["preflightDigest"];
  preflightState: OperationPreflightReport["state"];
  wouldCall: OperationPreflightReport["preflight"]["actionPlan"]["wouldCall"];
  evidence: {
    javaReplaySimulation: EvidenceRecord;
    miniKvCommandExplain: EvidenceRecord;
  };
  expectedSideEffects: string[];
  hardBlockers: string[];
  warnings: string[];
  nextActions: string[];
  readyForApprovalRequest: boolean;
  preflightReport: OperationPreflightReport;
}

export class OperationExecutionPreviewService {
  constructor(
    private readonly config: AppConfig,
    private readonly orderPlatform: OrderPlatformClient,
    private readonly miniKv: MiniKvClient,
  ) {}

  async create(
    report: OperationPreflightReport,
    input: OperationExecutionPreviewInput,
  ): Promise<OperationExecutionPreview> {
    const evidence = {
      javaReplaySimulation: await this.collectJavaReplaySimulation(report, input.failedEventId),
      miniKvCommandExplain: await this.collectMiniKvCommandExplain(report, input),
    };
    const expectedSideEffects = collectExpectedSideEffects(evidence);
    const hardBlockers = collectExecutionHardBlockers(report, evidence);
    const warnings = collectExecutionWarnings(report, evidence);
    const state = resolveExecutionState(hardBlockers, warnings);

    return {
      service: "orderops-node",
      generatedAt: new Date().toISOString(),
      intentId: report.intentId,
      action: report.summary.action,
      target: report.summary.target,
      state,
      preflightDigest: report.preflightDigest,
      preflightState: report.state,
      wouldCall: report.preflight.actionPlan.wouldCall,
      evidence,
      expectedSideEffects,
      hardBlockers,
      warnings,
      nextActions: collectNextActions(state, hardBlockers, warnings),
      readyForApprovalRequest: report.preflight.confirmation.confirmed && hardBlockers.length === 0,
      preflightReport: report,
    };
  }

  private async collectJavaReplaySimulation(report: OperationPreflightReport, failedEventId: string | undefined): Promise<EvidenceRecord> {
    if (report.summary.action !== "failed-event-replay-simulation") {
      return {
        status: "not_applicable",
        message: "Intent action does not target Java failed-event replay simulation.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; Java replay simulation was not requested.",
      };
    }
    if (failedEventId === undefined || failedEventId.trim().length === 0) {
      return {
        status: "missing_context",
        message: "Provide failedEventId to collect Java replay simulation evidence.",
      };
    }

    try {
      const response = await this.orderPlatform.failedEventReplaySimulation(failedEventId);
      return {
        status: "available",
        message: "Java replay simulation evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          simulation: response.data,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectMiniKvCommandExplain(report: OperationPreflightReport, input: OperationExecutionPreviewInput): Promise<EvidenceRecord> {
    if (report.summary.target !== "mini-kv") {
      return {
        status: "not_applicable",
        message: "Intent target is not mini-kv.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; mini-kv EXPLAINJSON was not requested.",
      };
    }

    const command = inferMiniKvPreviewCommand(report.summary.action, input);
    if (command === undefined) {
      return {
        status: "missing_context",
        message: "Provide command to collect mini-kv EXPLAINJSON evidence for raw command intents.",
      };
    }

    try {
      const response = await this.miniKv.explainJson(command);
      return {
        status: "available",
        message: "mini-kv EXPLAINJSON evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          command,
          explanation: response.explanation,
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

function inferMiniKvPreviewCommand(action: string, input: OperationExecutionPreviewInput): string | undefined {
  const key = normalizeKey(input.key) ?? "orderops:preview";
  const value = normalizeValue(input.value) ?? "preview-value";
  switch (action) {
    case "kv-status":
      return "PING orderops";
    case "kv-get":
      return `GET ${key}`;
    case "kv-set":
      return `SET ${key} ${value}`;
    case "kv-delete":
      return `DEL ${key}`;
    case "kv-command":
      return input.command?.trim() || undefined;
    default:
      return undefined;
  }
}

function collectExecutionHardBlockers(report: OperationPreflightReport, evidence: OperationExecutionPreview["evidence"]): string[] {
  const blockers = [...report.preflight.hardBlockers];
  if (evidence.javaReplaySimulation.status === "missing_context") {
    blockers.push("FAILED_EVENT_ID_REQUIRED");
  }
  if (evidence.javaReplaySimulation.status === "unavailable") {
    blockers.push("JAVA_REPLAY_SIMULATION_UNAVAILABLE");
  }
  if (evidence.javaReplaySimulation.status === "available" && javaSimulationBlocked(evidence.javaReplaySimulation.details)) {
    blockers.push("JAVA_REPLAY_SIMULATION_BLOCKED");
  }
  if (evidence.miniKvCommandExplain.status === "missing_context") {
    blockers.push("MINIKV_COMMAND_REQUIRED");
  }
  if (evidence.miniKvCommandExplain.status === "unavailable") {
    blockers.push("MINIKV_COMMAND_EXPLAIN_UNAVAILABLE");
  }
  return [...new Set(blockers)];
}

function collectExecutionWarnings(report: OperationPreflightReport, evidence: OperationExecutionPreview["evidence"]): string[] {
  const warnings = [...report.preflight.warnings];
  if (evidence.javaReplaySimulation.status === "available" && javaSimulationHasWarnings(evidence.javaReplaySimulation.details)) {
    warnings.push("JAVA_REPLAY_SIMULATION_WARNINGS");
  }
  if (evidence.miniKvCommandExplain.status === "available" && miniKvExplainMutates(evidence.miniKvCommandExplain.details)) {
    warnings.push("MINIKV_EXPLAIN_MUTATING_COMMAND");
  }
  if (evidence.miniKvCommandExplain.status === "available" && miniKvExplainTouchesWal(evidence.miniKvCommandExplain.details)) {
    warnings.push("MINIKV_EXPLAIN_TOUCHES_WAL");
  }
  return [...new Set(warnings)];
}

function collectExpectedSideEffects(evidence: OperationExecutionPreview["evidence"]): string[] {
  const effects: string[] = [];
  if (evidence.javaReplaySimulation.status === "available" && isRecord(evidence.javaReplaySimulation.details) && isRecord(evidence.javaReplaySimulation.details.simulation)) {
    effects.push(...readStringArray(evidence.javaReplaySimulation.details.simulation, "expectedSideEffects"));
    if (evidence.javaReplaySimulation.details.simulation.wouldReplay === true) {
      effects.push("java.failed-event.would-replay");
    }
    if (evidence.javaReplaySimulation.details.simulation.wouldPublishOutbox === true) {
      effects.push("java.outbox.would-publish");
    }
    if (evidence.javaReplaySimulation.details.simulation.wouldChangeManagementStatus === true) {
      effects.push("java.failed-event.status-would-change");
    }
  }
  if (evidence.miniKvCommandExplain.status === "available" && isRecord(evidence.miniKvCommandExplain.details) && isRecord(evidence.miniKvCommandExplain.details.explanation)) {
    if (evidence.miniKvCommandExplain.details.explanation.mutates_store === true) {
      effects.push("mini-kv.store-would-mutate");
    }
    if (evidence.miniKvCommandExplain.details.explanation.touches_wal === true) {
      effects.push("mini-kv.wal-would-be-touched");
    }
  }
  return [...new Set(effects)];
}

function resolveExecutionState(hardBlockers: string[], warnings: string[]): OperationExecutionPreviewState {
  if (hardBlockers.length > 0) {
    return "blocked";
  }
  if (warnings.length > 0) {
    return "review-required";
  }
  return "ready";
}

function collectNextActions(state: OperationExecutionPreviewState, hardBlockers: string[], warnings: string[]): string[] {
  if (state === "blocked") {
    return [`Resolve execution preview blockers before requesting approval: ${hardBlockers.join(", ")}`];
  }
  if (state === "review-required") {
    return [
      `Review execution preview warnings before approval: ${warnings.join(", ")}`,
      "Attach this execution preview to the operation approval request.",
    ];
  }
  return ["Execution preview is ready; attach it to the operation approval request."];
}

function javaSimulationBlocked(details: unknown): boolean {
  if (!isRecord(details) || !isRecord(details.simulation)) {
    return false;
  }
  const simulation = details.simulation;
  return simulation.exists === false || simulation.eligibleForReplay === false || readStringArray(simulation, "blockedBy").length > 0;
}

function javaSimulationHasWarnings(details: unknown): boolean {
  return isRecord(details) && isRecord(details.simulation) && readStringArray(details.simulation, "warnings").length > 0;
}

function miniKvExplainMutates(details: unknown): boolean {
  return isRecord(details) && isRecord(details.explanation) && details.explanation.mutates_store === true;
}

function miniKvExplainTouchesWal(details: unknown): boolean {
  return isRecord(details) && isRecord(details.explanation) && details.explanation.touches_wal === true;
}

function normalizeKey(key: string | undefined): string | undefined {
  const normalized = key?.trim();
  return normalized && /^[A-Za-z0-9:_-]{1,160}$/.test(normalized) ? normalized : undefined;
}

function normalizeValue(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized && normalized.length <= 256 && !/[\r\n\s]/.test(normalized) ? normalized : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStringArray(data: Record<string, unknown>, field: string): string[] {
  const value = data[field];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}
