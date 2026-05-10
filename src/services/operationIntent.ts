import crypto from "node:crypto";

import type { AppConfig } from "../config.js";
import { AppHttpError } from "../errors.js";
import { createActionPlan } from "./actionPlanner.js";
import type { ActionKey, ActionPlan, ActionRisk, ActionTarget } from "./actionPlanner.js";

export const operatorRoles = ["viewer", "operator", "admin"] as const;

export type OperatorRole = (typeof operatorRoles)[number];
export type OperationIntentStatus = "blocked" | "pending-confirmation" | "confirmed" | "expired";
export type PolicyBlockReason = "UPSTREAM_ACTIONS_ENABLED=false" | "ROLE_NOT_ALLOWED";
export type OperationIntentEventType =
  | "intent.created"
  | "intent.blocked"
  | "intent.awaiting_confirmation"
  | "intent.confirmation.accepted"
  | "intent.confirmation.rejected"
  | "intent.expired";

export interface OperationIntentInput {
  action: ActionKey;
  target?: ActionTarget;
  operatorId: string;
  role: OperatorRole;
  reason?: string;
}

export interface ConfirmOperationIntentInput {
  operatorId: string;
  confirmText: string;
}

export interface PolicyDecision {
  allowed: boolean;
  requiredRole: OperatorRole;
  actualRole: OperatorRole;
  blockedBy?: PolicyBlockReason;
  message: string;
}

export interface OperationIntent {
  id: string;
  status: OperationIntentStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  operator: {
    id: string;
    role: OperatorRole;
  };
  reason: string;
  plan: ActionPlan;
  policy: PolicyDecision;
  confirmation: {
    requiredText: string;
    confirmedAt?: string;
    confirmedBy?: string;
  };
}

export interface OperationIntentEvent {
  id: string;
  intentId: string;
  type: OperationIntentEventType;
  at: string;
  action: ActionKey;
  target: ActionTarget;
  status: OperationIntentStatus;
  actor: {
    id: string;
    role: OperatorRole;
  };
  message: string;
  details?: Record<string, unknown>;
}

export interface OperationIntentEventQuery {
  intentId?: string;
  type?: OperationIntentEventType;
  limit?: number;
}

interface OperationIntentStoreOptions {
  ttlMs?: number;
  maxItems?: number;
  maxEvents?: number;
}

const roleRank: Record<OperatorRole, number> = {
  viewer: 0,
  operator: 1,
  admin: 2,
};

const requiredRoleByRisk: Record<ActionRisk, OperatorRole> = {
  diagnostic: "viewer",
  read: "operator",
  write: "admin",
};

export class OperationIntentStore {
  private readonly intents = new Map<string, OperationIntent>();
  private readonly events: OperationIntentEvent[] = [];
  private readonly ttlMs: number;
  private readonly maxItems: number;
  private readonly maxEvents: number;

  constructor(
    private readonly config: AppConfig,
    options: OperationIntentStoreOptions = {},
  ) {
    this.ttlMs = options.ttlMs ?? 10 * 60 * 1000;
    this.maxItems = options.maxItems ?? 200;
    this.maxEvents = options.maxEvents ?? 1000;
  }

  create(input: OperationIntentInput): OperationIntent {
    const operatorId = input.operatorId.trim();
    if (operatorId.length === 0 || operatorId.length > 80) {
      throw new AppHttpError(400, "INVALID_OPERATOR_ID", "operatorId must be 1-80 characters");
    }

    const plan = createActionPlan(this.config, input);
    const now = new Date();
    const policy = evaluatePolicy(plan, input.role);
    const status: OperationIntentStatus = policy.allowed ? "pending-confirmation" : "blocked";
    const intent: OperationIntent = {
      id: crypto.randomUUID(),
      status,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + this.ttlMs).toISOString(),
      operator: {
        id: operatorId,
        role: input.role,
      },
      reason: normalizeReason(input.reason),
      plan,
      policy,
      confirmation: {
        requiredText: `CONFIRM ${plan.action}`,
      },
    };

    this.intents.set(intent.id, intent);
    this.recordEvent(intent, "intent.created", "Operation intent was created", {
      reason: intent.reason,
    });
    this.recordEvent(
      intent,
      status === "blocked" ? "intent.blocked" : "intent.awaiting_confirmation",
      policy.message,
      policy.blockedBy ? { blockedBy: policy.blockedBy, requiredRole: policy.requiredRole } : { requiredRole: policy.requiredRole },
    );
    this.trim();
    return cloneIntent(intent);
  }

  confirm(intentId: string, input: ConfirmOperationIntentInput): OperationIntent {
    const intent = this.requireIntent(intentId);
    const now = new Date();
    const current = this.expireIfNeeded(intent, now);

    if (current.status !== "pending-confirmation") {
      this.recordEvent(current, "intent.confirmation.rejected", "Confirmation was rejected because the intent is not confirmable", {
        attemptedBy: input.operatorId.trim(),
        status: current.status,
      });
      throw new AppHttpError(409, "INTENT_NOT_CONFIRMABLE", "Operation intent is not waiting for confirmation", {
        intentId,
        status: current.status,
      });
    }

    if (input.operatorId.trim() !== current.operator.id) {
      this.recordEvent(current, "intent.confirmation.rejected", "Confirmation was rejected because the operator did not match", {
        attemptedBy: input.operatorId.trim(),
      });
      throw new AppHttpError(403, "INTENT_OPERATOR_MISMATCH", "Only the operator who created the intent can confirm it", {
        intentId,
      });
    }

    if (input.confirmText.trim() !== current.confirmation.requiredText) {
      this.recordEvent(current, "intent.confirmation.rejected", "Confirmation was rejected because the phrase did not match", {
        attemptedBy: input.operatorId.trim(),
        requiredText: current.confirmation.requiredText,
      });
      throw new AppHttpError(400, "INTENT_CONFIRM_TEXT_MISMATCH", "Confirmation text does not match the required phrase", {
        requiredText: current.confirmation.requiredText,
      });
    }

    current.status = "confirmed";
    current.updatedAt = now.toISOString();
    current.confirmation.confirmedAt = now.toISOString();
    current.confirmation.confirmedBy = current.operator.id;
    this.recordEvent(current, "intent.confirmation.accepted", "Operation intent was confirmed", {
      confirmedBy: current.operator.id,
    });
    return cloneIntent(current);
  }

  list(limit = 20): OperationIntent[] {
    this.expireStale(new Date());
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.maxItems);
    return [...this.intents.values()]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, safeLimit)
      .map(cloneIntent);
  }

  get(intentId: string): OperationIntent {
    const intent = this.requireIntent(intentId);
    return cloneIntent(this.expireIfNeeded(intent, new Date()));
  }

  listEvents(query: OperationIntentEventQuery = {}): OperationIntentEvent[] {
    this.expireStale(new Date());
    const safeLimit = Math.min(Math.max(Math.floor(query.limit ?? 50), 1), this.maxEvents);
    return this.events
      .filter((event) => query.intentId === undefined || event.intentId === query.intentId)
      .filter((event) => query.type === undefined || event.type === query.type)
      .slice(-safeLimit)
      .reverse()
      .map(cloneEvent);
  }

  getTimeline(intentId: string, limit = 50): { intent: OperationIntent; events: OperationIntentEvent[] } {
    const intent = this.get(intentId);
    return {
      intent,
      events: this.listEvents({ intentId, limit }).reverse(),
    };
  }

  private requireIntent(intentId: string): OperationIntent {
    const intent = this.intents.get(intentId);
    if (!intent) {
      throw new AppHttpError(404, "INTENT_NOT_FOUND", "Operation intent was not found", { intentId });
    }

    return intent;
  }

  private expireStale(now: Date): void {
    for (const intent of this.intents.values()) {
      this.expireIfNeeded(intent, now);
    }
  }

  private expireIfNeeded(intent: OperationIntent, now: Date): OperationIntent {
    if (intent.status === "pending-confirmation" && Date.parse(intent.expiresAt) <= now.getTime()) {
      intent.status = "expired";
      intent.updatedAt = now.toISOString();
      this.recordEvent(intent, "intent.expired", "Operation intent expired before confirmation", {
        expiresAt: intent.expiresAt,
      });
    }

    return intent;
  }

  private recordEvent(
    intent: OperationIntent,
    type: OperationIntentEventType,
    message: string,
    details?: Record<string, unknown>,
  ): void {
    this.events.push({
      id: crypto.randomUUID(),
      intentId: intent.id,
      type,
      at: new Date().toISOString(),
      action: intent.plan.action,
      target: intent.plan.target,
      status: intent.status,
      actor: { ...intent.operator },
      message,
      ...(details === undefined ? {} : { details }),
    });

    if (this.events.length > this.maxEvents) {
      this.events.splice(0, this.events.length - this.maxEvents);
    }
  }

  private trim(): void {
    if (this.intents.size <= this.maxItems) {
      return;
    }

    const oldest = [...this.intents.values()].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    for (const intent of oldest.slice(0, this.intents.size - this.maxItems)) {
      this.intents.delete(intent.id);
    }
  }
}

export function evaluatePolicy(plan: ActionPlan, role: OperatorRole): PolicyDecision {
  const requiredRole = requiredRoleByRisk[plan.risk];
  if (!plan.allowed) {
    return {
      allowed: false,
      requiredRole,
      actualRole: role,
      blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
      message: "The upstream action gate is closed; this intent cannot become confirmable yet.",
    };
  }

  if (roleRank[role] < roleRank[requiredRole]) {
    return {
      allowed: false,
      requiredRole,
      actualRole: role,
      blockedBy: "ROLE_NOT_ALLOWED",
      message: `Role ${role} cannot confirm ${plan.risk} actions; required role is ${requiredRole}.`,
    };
  }

  return {
    allowed: true,
    requiredRole,
    actualRole: role,
    message: "Policy passed; the intent is waiting for explicit confirmation.",
  };
}

function normalizeReason(reason: string | undefined): string {
  const normalized = reason?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 400) : "local-dev";
}

function cloneIntent(intent: OperationIntent): OperationIntent {
  return structuredClone(intent);
}

function cloneEvent(event: OperationIntentEvent): OperationIntentEvent {
  return structuredClone(event);
}
