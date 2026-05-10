import { randomUUID } from "node:crypto";

export type AuditOutcome = "success" | "client_error" | "server_error";

export interface AuditEvent {
  id: string;
  requestId: string;
  method: string;
  path: string;
  routeGroup: string;
  statusCode: number;
  outcome: AuditOutcome;
  durationMs: number;
  occurredAt: string;
}

export interface AuditSummary {
  total: number;
  success: number;
  clientError: number;
  serverError: number;
  averageDurationMs: number;
  byRouteGroup: Record<string, number>;
  latest?: AuditEvent;
}

export interface AuditRecordInput {
  requestId: string;
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
}

const defaultCapacity = 200;

export class AuditLog {
  private readonly events: AuditEvent[] = [];

  constructor(private readonly capacity = defaultCapacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("AuditLog capacity must be a positive integer");
    }
  }

  record(input: AuditRecordInput): AuditEvent {
    const event: AuditEvent = {
      id: randomUUID(),
      requestId: input.requestId,
      method: input.method.toUpperCase(),
      path: normalizePath(input.path),
      routeGroup: routeGroupForPath(input.path),
      statusCode: input.statusCode,
      outcome: outcomeForStatus(input.statusCode),
      durationMs: Math.max(0, Math.round(input.durationMs)),
      occurredAt: new Date().toISOString(),
    };

    this.events.unshift(event);
    if (this.events.length > this.capacity) {
      this.events.length = this.capacity;
    }

    return event;
  }

  list(limit = 50): AuditEvent[] {
    const normalizedLimit = Math.min(Math.max(Math.floor(limit), 1), this.capacity);
    return this.events.slice(0, normalizedLimit);
  }

  summary(): AuditSummary {
    const total = this.events.length;
    const success = this.events.filter((event) => event.outcome === "success").length;
    const clientError = this.events.filter((event) => event.outcome === "client_error").length;
    const serverError = this.events.filter((event) => event.outcome === "server_error").length;
    const durationTotal = this.events.reduce((sum, event) => sum + event.durationMs, 0);
    const byRouteGroup = this.events.reduce<Record<string, number>>((groups, event) => {
      groups[event.routeGroup] = (groups[event.routeGroup] ?? 0) + 1;
      return groups;
    }, {});

    return {
      total,
      success,
      clientError,
      serverError,
      averageDurationMs: total === 0 ? 0 : Math.round(durationTotal / total),
      byRouteGroup,
      latest: this.events[0],
    };
  }

  clear(): void {
    this.events.length = 0;
  }
}

export function routeGroupForPath(path: string): string {
  const normalized = normalizePath(path);

  if (normalized === "/" || normalized.startsWith("/ui")) {
    return "dashboard";
  }

  if (normalized === "/health") {
    return "health";
  }

  if (normalized.startsWith("/api/v1/order-platform")) {
    return "order-platform";
  }

  if (normalized.startsWith("/api/v1/mini-kv")) {
    return "mini-kv";
  }

  if (normalized.startsWith("/api/v1/sources") || normalized.startsWith("/api/v1/events")) {
    return "status";
  }

  if (normalized.startsWith("/api/v1/audit")) {
    return "audit";
  }

  if (normalized.startsWith("/api/v1/operation-")) {
    return "operations";
  }

  if (normalized.startsWith("/api/v1/ops")) {
    return "ops";
  }

  return "other";
}

export function outcomeForStatus(statusCode: number): AuditOutcome {
  if (statusCode >= 500) {
    return "server_error";
  }

  if (statusCode >= 400) {
    return "client_error";
  }

  return "success";
}

function normalizePath(path: string): string {
  const [pathname] = path.split("?", 1);
  return pathname || "/";
}
