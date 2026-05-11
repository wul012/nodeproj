import { MiniKvClient } from "../clients/miniKvClient.js";
import { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { ActionKey } from "./actionPlanner.js";
import { OperationDispatchLedger } from "./operationDispatch.js";
import type { OperationDispatch } from "./operationDispatch.js";
import { OperationIntentStore } from "./operationIntent.js";
import type { OperationIntent } from "./operationIntent.js";

export interface OperationPreflightInput {
  intentId: string;
  failedEventId?: string;
  keyPrefix?: string;
}

export interface OperationPreflightBundle {
  service: "orderops-node";
  generatedAt: string;
  intent: {
    id: string;
    status: OperationIntent["status"];
    action: ActionKey;
    target: OperationIntent["plan"]["target"];
    operator: OperationIntent["operator"];
    reason: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
  };
  actionPlan: OperationIntent["plan"];
  policy: OperationIntent["policy"];
  confirmation: OperationIntent["confirmation"] & {
    confirmed: boolean;
  };
  rateLimit: {
    mutationWindowMs: number;
    mutationMaxRequests: number;
    note: string;
  };
  safety: {
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
  };
  dispatches: {
    total: number;
    dryRunCompleted: number;
    rejected: number;
    upstreamTouched: number;
    latest?: OperationDispatch;
    recent: OperationDispatch[];
  };
  evidence: {
    javaReplayReadiness: EvidenceRecord;
    miniKvCommandCatalog: EvidenceRecord;
    miniKvKeyInventory: EvidenceRecord;
  };
  hardBlockers: string[];
  warnings: string[];
  recommendedNextActions: string[];
  readyForDryRunDispatch: boolean;
}

export type EvidenceStatus = "not_applicable" | "skipped" | "missing_context" | "available" | "unavailable";

export interface EvidenceRecord {
  status: EvidenceStatus;
  message: string;
  details?: unknown;
}

export class OperationPreflightService {
  constructor(
    private readonly config: AppConfig,
    private readonly operationIntents: OperationIntentStore,
    private readonly operationDispatches: OperationDispatchLedger,
    private readonly orderPlatform: OrderPlatformClient,
    private readonly miniKv: MiniKvClient,
  ) {}

  async create(input: OperationPreflightInput): Promise<OperationPreflightBundle> {
    const intent = this.operationIntents.get(input.intentId);
    const dispatches = this.operationDispatches.listByIntent(intent.id, 10);
    const evidence = {
      javaReplayReadiness: await this.collectJavaReplayReadiness(intent, input.failedEventId),
      miniKvCommandCatalog: await this.collectMiniKvCommandCatalog(intent),
      miniKvKeyInventory: await this.collectMiniKvKeyInventory(intent, input.keyPrefix),
    };
    const hardBlockers = collectHardBlockers(this.config, intent, evidence);
    const warnings = collectWarnings(intent, evidence);

    return {
      service: "orderops-node",
      generatedAt: new Date().toISOString(),
      intent: {
        id: intent.id,
        status: intent.status,
        action: intent.plan.action,
        target: intent.plan.target,
        operator: intent.operator,
        reason: intent.reason,
        createdAt: intent.createdAt,
        updatedAt: intent.updatedAt,
        expiresAt: intent.expiresAt,
      },
      actionPlan: intent.plan,
      policy: intent.policy,
      confirmation: {
        ...intent.confirmation,
        confirmed: intent.status === "confirmed",
      },
      rateLimit: {
        mutationWindowMs: this.config.mutationRateLimitWindowMs,
        mutationMaxRequests: this.config.mutationRateLimitMax,
        note: "Preflight is read-only and does not consume mutation rate-limit quota.",
      },
      safety: {
        upstreamProbesEnabled: this.config.upstreamProbesEnabled,
        upstreamActionsEnabled: this.config.upstreamActionsEnabled,
      },
      dispatches: summarizeDispatches(dispatches),
      evidence,
      hardBlockers,
      warnings,
      recommendedNextActions: collectNextActions(hardBlockers, warnings, evidence),
      readyForDryRunDispatch: intent.status === "confirmed" && hardBlockers.length === 0,
    };
  }

  private async collectJavaReplayReadiness(intent: OperationIntent, failedEventId: string | undefined): Promise<EvidenceRecord> {
    if (intent.plan.action !== "failed-event-replay-readiness") {
      return {
        status: "not_applicable",
        message: "Intent action does not target Java failed-event replay readiness.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; Java replay readiness was not requested.",
      };
    }
    if (failedEventId === undefined || failedEventId.trim().length === 0) {
      return {
        status: "missing_context",
        message: "Provide failedEventId to collect Java replay readiness evidence.",
      };
    }

    try {
      const response = await this.orderPlatform.failedEventReplayReadiness(failedEventId);
      return {
        status: "available",
        message: "Java replay readiness evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          readiness: response.data,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectMiniKvCommandCatalog(intent: OperationIntent): Promise<EvidenceRecord> {
    if (intent.plan.target !== "mini-kv") {
      return {
        status: "not_applicable",
        message: "Intent target is not mini-kv.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; mini-kv command catalog was not requested.",
      };
    }

    try {
      const response = await this.miniKv.commandsJson();
      const commandNames = inferMiniKvCommandNames(intent.plan.action);
      const commands = Array.isArray(response.catalog.commands) ? response.catalog.commands : [];
      const matchedCommands = commandNames.length === 0
        ? []
        : commands.filter((command) => typeof command.name === "string" && commandNames.includes(command.name.toUpperCase()));
      return {
        status: "available",
        message: "mini-kv command catalog evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          actionCommands: commandNames,
          matchedCommands,
          commandCount: commands.length,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectMiniKvKeyInventory(intent: OperationIntent, keyPrefix: string | undefined): Promise<EvidenceRecord> {
    if (intent.plan.target !== "mini-kv") {
      return {
        status: "not_applicable",
        message: "Intent target is not mini-kv.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; mini-kv key inventory was not requested.",
      };
    }

    const prefix = keyPrefix?.trim() || "orderops:";
    try {
      const response = await this.miniKv.keysJson(prefix);
      return {
        status: "available",
        message: "mini-kv key inventory evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          inventory: response.inventory,
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

function summarizeDispatches(dispatches: OperationDispatch[]): OperationPreflightBundle["dispatches"] {
  return {
    total: dispatches.length,
    dryRunCompleted: dispatches.filter((dispatch) => dispatch.status === "dry-run-completed").length,
    rejected: dispatches.filter((dispatch) => dispatch.status === "rejected").length,
    upstreamTouched: dispatches.filter((dispatch) => dispatch.upstreamTouched).length,
    latest: dispatches[0],
    recent: dispatches,
  };
}

function collectHardBlockers(config: AppConfig, intent: OperationIntent, evidence: OperationPreflightBundle["evidence"]): string[] {
  const blockers: string[] = [];
  if (!intent.policy.allowed && intent.policy.blockedBy !== undefined) {
    blockers.push(intent.policy.blockedBy);
  }
  if (intent.status !== "confirmed") {
    blockers.push(`INTENT_STATUS_${intent.status.toUpperCase().replace(/-/g, "_")}`);
  }
  if (intent.plan.blockedBy !== undefined) {
    blockers.push(intent.plan.blockedBy);
  }
  if (intent.plan.target === "order-platform" && intent.plan.risk === "write" && !config.upstreamActionsEnabled) {
    blockers.push("UPSTREAM_ACTIONS_ENABLED=false");
  }
  if (intent.plan.target === "mini-kv" && intent.plan.risk === "write" && !config.upstreamActionsEnabled) {
    blockers.push("UPSTREAM_ACTIONS_ENABLED=false");
  }
  if (evidence.javaReplayReadiness.status === "missing_context") {
    blockers.push("FAILED_EVENT_ID_REQUIRED");
  }
  if (evidence.javaReplayReadiness.status === "available" && hasBlockedJavaReadiness(evidence.javaReplayReadiness.details)) {
    blockers.push("JAVA_REPLAY_READINESS_BLOCKED");
  }
  if (evidence.miniKvCommandCatalog.status === "unavailable") {
    blockers.push("MINIKV_COMMAND_CATALOG_UNAVAILABLE");
  }
  if (evidence.miniKvKeyInventory.status === "unavailable") {
    blockers.push("MINIKV_KEY_INVENTORY_UNAVAILABLE");
  }
  return [...new Set(blockers)];
}

function collectWarnings(intent: OperationIntent, evidence: OperationPreflightBundle["evidence"]): string[] {
  const warnings: string[] = [];
  if (intent.plan.risk === "write") {
    warnings.push("WRITE_RISK_REQUIRES_EXPLICIT_REVIEW");
  }
  if (evidence.miniKvCommandCatalog.status === "available" && hasMutatingMiniKvCommand(evidence.miniKvCommandCatalog.details)) {
    warnings.push("MINIKV_MUTATING_COMMAND");
  }
  if (evidence.miniKvKeyInventory.status === "available" && hasTruncatedInventory(evidence.miniKvKeyInventory.details)) {
    warnings.push("MINIKV_KEY_INVENTORY_TRUNCATED");
  }
  if (evidence.javaReplayReadiness.status === "skipped" || evidence.miniKvCommandCatalog.status === "skipped" || evidence.miniKvKeyInventory.status === "skipped") {
    warnings.push("UPSTREAM_PROBES_SKIPPED");
  }
  return [...new Set(warnings)];
}

function collectNextActions(
  hardBlockers: string[],
  warnings: string[],
  evidence: OperationPreflightBundle["evidence"],
): string[] {
  if (hardBlockers.length > 0) {
    return [
      `Resolve hard blockers before dry-run dispatch: ${hardBlockers.join(", ")}`,
    ];
  }
  if (warnings.length > 0) {
    return [
      `Review warnings before dispatch: ${warnings.join(", ")}`,
      "Create or inspect a dry-run dispatch, then archive the preflight evidence.",
    ];
  }
  if (evidence.javaReplayReadiness.status === "available" || evidence.miniKvCommandCatalog.status === "available" || evidence.miniKvKeyInventory.status === "available") {
    return ["Evidence is available; create or inspect a dry-run dispatch before any real upstream execution."];
  }
  return ["Create or inspect a dry-run dispatch before any real upstream execution."];
}

function inferMiniKvCommandNames(action: ActionKey): string[] {
  switch (action) {
    case "kv-status":
      return ["PING", "SIZE"];
    case "kv-get":
      return ["GET", "TTL"];
    case "kv-set":
      return ["SET", "EXPIRE"];
    case "kv-delete":
      return ["DEL"];
    case "kv-command":
      return [];
    default:
      return [];
  }
}

function hasBlockedJavaReadiness(details: unknown): boolean {
  if (!isRecord(details) || !isRecord(details.readiness)) {
    return false;
  }
  const readiness = details.readiness;
  return readiness.exists === false || readiness.eligibleForReplay === false || readStringArray(readiness, "blockedBy").length > 0;
}

function hasMutatingMiniKvCommand(details: unknown): boolean {
  if (!isRecord(details) || !Array.isArray(details.matchedCommands)) {
    return false;
  }
  return details.matchedCommands.some((command) =>
    isRecord(command) && (command.mutates_store === true || command.category === "write" || command.category === "admin"));
}

function hasTruncatedInventory(details: unknown): boolean {
  if (!isRecord(details) || !isRecord(details.inventory)) {
    return false;
  }
  return details.inventory.truncated === true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStringArray(data: Record<string, unknown>, field: string): string[] {
  const value = data[field];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}
