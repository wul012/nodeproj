import crypto from "node:crypto";

import type { AppConfig } from "../config.js";
import { AppHttpError } from "../errors.js";
import { createActionPlan } from "./actionPlanner.js";
import type { ActionKey, ActionPlan, ActionRisk, ActionTarget } from "./actionPlanner.js";

export const operatorRoles = ["viewer", "operator", "admin"] as const;

export type OperatorRole = (typeof operatorRoles)[number];
export type OperationIntentStatus = "blocked" | "pending-confirmation" | "confirmed" | "expired";
export type PolicyBlockReason = "UPSTREAM_ACTIONS_ENABLED=false" | "ROLE_NOT_ALLOWED";

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

interface OperationIntentStoreOptions {
  ttlMs?: number;
  maxItems?: number;
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
  private readonly ttlMs: number;
  private readonly maxItems: number;

  constructor(
    private readonly config: AppConfig,
    options: OperationIntentStoreOptions = {},
  ) {
    this.ttlMs = options.ttlMs ?? 10 * 60 * 1000;
    this.maxItems = options.maxItems ?? 200;
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
    this.trim();
    return cloneIntent(intent);
  }

  confirm(intentId: string, input: ConfirmOperationIntentInput): OperationIntent {
    const intent = this.requireIntent(intentId);
    const now = new Date();
    const current = this.expireIfNeeded(intent, now);

    if (current.status !== "pending-confirmation") {
      throw new AppHttpError(409, "INTENT_NOT_CONFIRMABLE", "Operation intent is not waiting for confirmation", {
        intentId,
        status: current.status,
      });
    }

    if (input.operatorId.trim() !== current.operator.id) {
      throw new AppHttpError(403, "INTENT_OPERATOR_MISMATCH", "Only the operator who created the intent can confirm it", {
        intentId,
      });
    }

    if (input.confirmText.trim() !== current.confirmation.requiredText) {
      throw new AppHttpError(400, "INTENT_CONFIRM_TEXT_MISMATCH", "Confirmation text does not match the required phrase", {
        requiredText: current.confirmation.requiredText,
      });
    }

    current.status = "confirmed";
    current.updatedAt = now.toISOString();
    current.confirmation.confirmedAt = now.toISOString();
    current.confirmation.confirmedBy = current.operator.id;
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
    }

    return intent;
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
