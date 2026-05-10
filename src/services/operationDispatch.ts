import crypto from "node:crypto";

import { AppHttpError } from "../errors.js";
import { OperationIntentStore } from "./operationIntent.js";
import type { ActionKey, ActionTarget } from "./actionPlanner.js";
import type { OperationIntent } from "./operationIntent.js";

export type OperationDispatchMode = "dry-run";
export type OperationDispatchStatus = "rejected" | "dry-run-completed";

export interface OperationDispatchInput {
  intentId: string;
  requestedBy: string;
  mode?: OperationDispatchMode;
}

export interface OperationDispatch {
  id: string;
  intentId: string;
  action: ActionKey;
  target: ActionTarget;
  mode: OperationDispatchMode;
  status: OperationDispatchStatus;
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
  upstreamTouched: false;
  nodeRoute: OperationIntent["plan"]["nodeRoute"];
  wouldCall: OperationIntent["plan"]["wouldCall"];
  safety: OperationIntent["plan"]["safety"];
  rejection?: {
    code: string;
    message: string;
    intentStatus: OperationIntent["status"];
  };
}

interface OperationDispatchLedgerOptions {
  maxItems?: number;
}

export class OperationDispatchLedger {
  private readonly dispatches = new Map<string, OperationDispatch>();
  private readonly maxItems: number;

  constructor(
    private readonly intents: OperationIntentStore,
    options: OperationDispatchLedgerOptions = {},
  ) {
    this.maxItems = options.maxItems ?? 200;
  }

  create(input: OperationDispatchInput): OperationDispatch {
    const requestedBy = normalizeRequestedBy(input.requestedBy);
    const mode = input.mode ?? "dry-run";
    if (mode !== "dry-run") {
      throw new AppHttpError(400, "UNSUPPORTED_DISPATCH_MODE", "Only dry-run dispatch mode is supported");
    }

    const intent = this.intents.get(input.intentId);
    const now = new Date().toISOString();
    const base = {
      id: crypto.randomUUID(),
      intentId: intent.id,
      action: intent.plan.action,
      target: intent.plan.target,
      mode,
      requestedBy,
      createdAt: now,
      updatedAt: now,
      upstreamTouched: false as const,
      nodeRoute: { ...intent.plan.nodeRoute },
      wouldCall: structuredClone(intent.plan.wouldCall),
      safety: { ...intent.plan.safety },
    };

    if (intent.status !== "confirmed") {
      const dispatch: OperationDispatch = {
        ...base,
        status: "rejected",
        rejection: {
          code: "INTENT_NOT_CONFIRMED",
          message: "Only confirmed operation intents can be dispatched",
          intentStatus: intent.status,
        },
      };
      this.save(dispatch);
      this.intents.recordDispatchEvent(intent.id, "intent.dispatch.rejected", "Dispatch was rejected because the intent is not confirmed", {
        dispatchId: dispatch.id,
        requestedBy,
        intentStatus: intent.status,
      });
      return cloneDispatch(dispatch);
    }

    const dispatch: OperationDispatch = {
      ...base,
      status: "dry-run-completed",
    };
    this.save(dispatch);
    this.intents.recordDispatchEvent(intent.id, "intent.dispatch.dry_run_completed", "Dry-run dispatch completed without touching the upstream", {
      dispatchId: dispatch.id,
      requestedBy,
      upstreamTouched: false,
    });
    return cloneDispatch(dispatch);
  }

  list(limit = 20): OperationDispatch[] {
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.maxItems);
    return [...this.dispatches.values()]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, safeLimit)
      .map(cloneDispatch);
  }

  listByIntent(intentId: string, limit = 20): OperationDispatch[] {
    this.intents.get(intentId);
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.maxItems);
    return [...this.dispatches.values()]
      .filter((dispatch) => dispatch.intentId === intentId)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, safeLimit)
      .map(cloneDispatch);
  }

  get(dispatchId: string): OperationDispatch {
    const dispatch = this.dispatches.get(dispatchId);
    if (!dispatch) {
      throw new AppHttpError(404, "DISPATCH_NOT_FOUND", "Operation dispatch was not found", { dispatchId });
    }

    return cloneDispatch(dispatch);
  }

  private save(dispatch: OperationDispatch): void {
    this.dispatches.set(dispatch.id, dispatch);
    if (this.dispatches.size <= this.maxItems) {
      return;
    }

    const oldest = [...this.dispatches.values()].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    for (const item of oldest.slice(0, this.dispatches.size - this.maxItems)) {
      this.dispatches.delete(item.id);
    }
  }
}

function normalizeRequestedBy(requestedBy: string): string {
  const normalized = requestedBy.trim();
  if (normalized.length === 0 || normalized.length > 80) {
    throw new AppHttpError(400, "INVALID_DISPATCH_REQUESTER", "requestedBy must be 1-80 characters");
  }

  return normalized;
}

function cloneDispatch(dispatch: OperationDispatch): OperationDispatch {
  return structuredClone(dispatch);
}
