import type { AppConfig } from "../config.js";
import { AppHttpError } from "../errors.js";

export type ActionTarget = "order-platform" | "mini-kv";
export type ActionRisk = "diagnostic" | "read" | "write";
export type ActionGate = "probes" | "actions";

export const actionKeys = [
  "order-products",
  "order-outbox",
  "order-load",
  "failed-event-replay-readiness",
  "order-create",
  "order-pay",
  "order-cancel",
  "kv-status",
  "kv-get",
  "kv-set",
  "kv-delete",
  "kv-command",
] as const;

export type ActionKey = (typeof actionKeys)[number];

export interface ActionPlanInput {
  action: ActionKey;
  target?: ActionTarget;
}

interface ActionDefinition {
  action: ActionKey;
  target: ActionTarget;
  label: string;
  risk: ActionRisk;
  gate?: ActionGate;
  requires: string[];
  nodeRoute: {
    method: string;
    path: string;
  };
  upstream: (config: AppConfig) => {
    type: "http" | "tcp";
    endpoint: string;
    method?: string;
    path?: string;
    command?: string;
  };
}

export interface ActionPlan {
  dryRun: true;
  generatedAt: string;
  action: ActionKey;
  target: ActionTarget;
  label: string;
  risk: ActionRisk;
  requires: string[];
  allowed: boolean;
  blockedBy?: string;
  reason: string;
  nextStep: string;
  nodeRoute: ActionDefinition["nodeRoute"];
  wouldCall: ReturnType<ActionDefinition["upstream"]>;
  safety: {
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
  };
}

const definitions: Record<ActionKey, ActionDefinition> = {
  "order-products": {
    action: "order-products",
    target: "order-platform",
    label: "List products",
    risk: "read",
    requires: [],
    nodeRoute: { method: "GET", path: "/api/v1/order-platform/products" },
    upstream: (config) => ({
      type: "http",
      endpoint: config.orderPlatformUrl,
      method: "GET",
      path: "/api/v1/products",
    }),
  },
  "order-outbox": {
    action: "order-outbox",
    target: "order-platform",
    label: "List outbox events",
    risk: "read",
    requires: [],
    nodeRoute: { method: "GET", path: "/api/v1/order-platform/outbox/events" },
    upstream: (config) => ({
      type: "http",
      endpoint: config.orderPlatformUrl,
      method: "GET",
      path: "/api/v1/outbox/events",
    }),
  },
  "order-load": {
    action: "order-load",
    target: "order-platform",
    label: "Load order",
    risk: "read",
    requires: ["orderId"],
    nodeRoute: { method: "GET", path: "/api/v1/order-platform/orders/:orderId" },
    upstream: (config) => ({
      type: "http",
      endpoint: config.orderPlatformUrl,
      method: "GET",
      path: "/api/v1/orders/:orderId",
    }),
  },
  "failed-event-replay-readiness": {
    action: "failed-event-replay-readiness",
    target: "order-platform",
    label: "Check failed-event replay readiness",
    risk: "read",
    gate: "probes",
    requires: ["failedEventId"],
    nodeRoute: { method: "GET", path: "/api/v1/order-platform/failed-events/:failedEventId/replay-readiness" },
    upstream: (config) => ({
      type: "http",
      endpoint: config.orderPlatformUrl,
      method: "GET",
      path: "/api/v1/failed-events/:failedEventId/replay-readiness",
    }),
  },
  "order-create": {
    action: "order-create",
    target: "order-platform",
    label: "Create order",
    risk: "write",
    requires: ["idempotencyKey", "orderBody"],
    nodeRoute: { method: "POST", path: "/api/v1/order-platform/orders" },
    upstream: (config) => ({
      type: "http",
      endpoint: config.orderPlatformUrl,
      method: "POST",
      path: "/api/v1/orders",
    }),
  },
  "order-pay": {
    action: "order-pay",
    target: "order-platform",
    label: "Pay order",
    risk: "write",
    requires: ["orderId"],
    nodeRoute: { method: "POST", path: "/api/v1/order-platform/orders/:orderId/pay" },
    upstream: (config) => ({
      type: "http",
      endpoint: config.orderPlatformUrl,
      method: "POST",
      path: "/api/v1/orders/:orderId/pay",
    }),
  },
  "order-cancel": {
    action: "order-cancel",
    target: "order-platform",
    label: "Cancel order",
    risk: "write",
    requires: ["orderId"],
    nodeRoute: { method: "POST", path: "/api/v1/order-platform/orders/:orderId/cancel" },
    upstream: (config) => ({
      type: "http",
      endpoint: config.orderPlatformUrl,
      method: "POST",
      path: "/api/v1/orders/:orderId/cancel",
    }),
  },
  "kv-status": {
    action: "kv-status",
    target: "mini-kv",
    label: "Ping and size",
    risk: "diagnostic",
    requires: [],
    nodeRoute: { method: "GET", path: "/api/v1/mini-kv/status" },
    upstream: (config) => ({
      type: "tcp",
      endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
      command: "PING orderops; SIZE",
    }),
  },
  "kv-get": {
    action: "kv-get",
    target: "mini-kv",
    label: "Get key",
    risk: "read",
    requires: ["key"],
    nodeRoute: { method: "GET", path: "/api/v1/mini-kv/:key" },
    upstream: (config) => ({
      type: "tcp",
      endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
      command: "GET <key>; TTL <key>",
    }),
  },
  "kv-set": {
    action: "kv-set",
    target: "mini-kv",
    label: "Set key",
    risk: "write",
    requires: ["key", "value", "ttlSeconds?"],
    nodeRoute: { method: "PUT", path: "/api/v1/mini-kv/:key" },
    upstream: (config) => ({
      type: "tcp",
      endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
      command: "SET <key> <value>; optional EXPIRE <key> <ttlSeconds>",
    }),
  },
  "kv-delete": {
    action: "kv-delete",
    target: "mini-kv",
    label: "Delete key",
    risk: "write",
    requires: ["key"],
    nodeRoute: { method: "DELETE", path: "/api/v1/mini-kv/:key" },
    upstream: (config) => ({
      type: "tcp",
      endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
      command: "DEL <key>",
    }),
  },
  "kv-command": {
    action: "kv-command",
    target: "mini-kv",
    label: "Run raw command",
    risk: "write",
    requires: ["command"],
    nodeRoute: { method: "POST", path: "/api/v1/mini-kv/commands" },
    upstream: (config) => ({
      type: "tcp",
      endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
      command: "<validated gateway command>",
    }),
  },
};

export function listActionCatalog(): Array<Omit<ActionDefinition, "upstream">> {
  return actionKeys.map((action) => {
    const definition = definitions[action];
    return {
      action: definition.action,
      target: definition.target,
      label: definition.label,
      risk: definition.risk,
      requires: [...definition.requires],
      nodeRoute: { ...definition.nodeRoute },
    };
  });
}

export function createActionPlan(config: AppConfig, input: ActionPlanInput): ActionPlan {
  const definition = definitions[input.action];
  if (!definition) {
    throw new AppHttpError(400, "UNKNOWN_ACTION_PLAN", "Action plan is not registered", {
      action: input.action,
      allowedActions: actionKeys,
    });
  }

  if (input.target !== undefined && input.target !== definition.target) {
    throw new AppHttpError(400, "ACTION_TARGET_MISMATCH", "Action does not belong to the requested target", {
      action: definition.action,
      requestedTarget: input.target,
      actualTarget: definition.target,
    });
  }

  const gate = definition.gate ?? "actions";
  const allowed = gate === "probes" ? config.upstreamProbesEnabled : config.upstreamActionsEnabled;
  const blockedBy = gate === "probes" ? "UPSTREAM_PROBES_ENABLED=false" : "UPSTREAM_ACTIONS_ENABLED=false";
  return {
    dryRun: true,
    generatedAt: new Date().toISOString(),
    action: definition.action,
    target: definition.target,
    label: definition.label,
    risk: definition.risk,
    requires: [...definition.requires],
    allowed,
    ...(allowed ? {} : { blockedBy }),
    reason: allowed
      ? `The Node ${gate} gate is open; the route would be allowed to call the upstream.`
      : `The Node ${gate} gate is closed; the route will stop inside orderops-node before any upstream call.`,
    nextStep: allowed
      ? "Run the route only when the target project is ready for this traffic."
      : `Set ${gate === "probes" ? "UPSTREAM_PROBES_ENABLED" : "UPSTREAM_ACTIONS_ENABLED"}=true and restart orderops-node when you want this upstream call.`,
    nodeRoute: { ...definition.nodeRoute },
    wouldCall: definition.upstream(config),
    safety: {
      upstreamProbesEnabled: config.upstreamProbesEnabled,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
  };
}
