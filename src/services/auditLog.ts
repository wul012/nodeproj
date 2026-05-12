import { randomUUID } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

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

export interface AuditStore {
  record(event: AuditEvent): void;
  list(limit: number): AuditEvent[];
  clear(): void;
  size(): number;
}

export interface AuditLogOptions {
  capacity?: number;
  store?: AuditStore;
}

const defaultCapacity = 200;

export class InMemoryAuditStore implements AuditStore {
  private readonly events: AuditEvent[] = [];

  constructor(private readonly capacity = defaultCapacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Audit store capacity must be a positive integer");
    }
  }

  record(event: AuditEvent): void {
    this.events.unshift(event);
    if (this.events.length > this.capacity) {
      this.events.length = this.capacity;
    }
  }

  list(limit = 50): AuditEvent[] {
    return this.events.slice(0, Math.min(limit, this.capacity));
  }

  clear(): void {
    this.events.length = 0;
  }

  size(): number {
    return this.events.length;
  }
}

export class FileBackedAuditStore implements AuditStore {
  private readonly memory: InMemoryAuditStore;

  constructor(
    private readonly filePath: string,
    private readonly capacity = defaultCapacity,
  ) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Audit store capacity must be a positive integer");
    }

    mkdirSync(path.dirname(filePath), { recursive: true });
    this.memory = new InMemoryAuditStore(capacity);
    this.loadExistingEvents();
  }

  record(event: AuditEvent): void {
    this.memory.record(event);
    appendFileSync(this.filePath, `${JSON.stringify(event)}\n`, "utf8");
  }

  list(limit = 50): AuditEvent[] {
    return this.memory.list(limit);
  }

  clear(): void {
    this.memory.clear();
    writeFileSync(this.filePath, "", "utf8");
  }

  size(): number {
    return this.memory.size();
  }

  private loadExistingEvents(): void {
    if (!existsSync(this.filePath)) {
      return;
    }

    const events = readFileSync(this.filePath, "utf8")
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .map(parseAuditEvent)
      .filter((event): event is AuditEvent => event !== undefined)
      .slice(-this.capacity)
      .reverse();

    for (const event of events.reverse()) {
      this.memory.record(event);
    }
  }
}

export class AuditLog {
  private readonly capacity: number;
  private readonly store: AuditStore;

  constructor(capacityOrOptions: number | AuditLogOptions = defaultCapacity) {
    const options = typeof capacityOrOptions === "number"
      ? { capacity: capacityOrOptions }
      : capacityOrOptions;
    this.capacity = options.capacity ?? defaultCapacity;

    if (!Number.isInteger(this.capacity) || this.capacity <= 0) {
      throw new Error("AuditLog capacity must be a positive integer");
    }

    this.store = options.store ?? new InMemoryAuditStore(this.capacity);
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

    this.store.record(event);

    return event;
  }

  list(limit = 50): AuditEvent[] {
    const normalizedLimit = Math.min(Math.max(Math.floor(limit), 1), this.capacity);
    return this.store.list(normalizedLimit);
  }

  summary(): AuditSummary {
    const events = this.store.list(this.capacity);
    const total = events.length;
    const success = events.filter((event) => event.outcome === "success").length;
    const clientError = events.filter((event) => event.outcome === "client_error").length;
    const serverError = events.filter((event) => event.outcome === "server_error").length;
    const durationTotal = events.reduce((sum, event) => sum + event.durationMs, 0);
    const byRouteGroup = events.reduce<Record<string, number>>((groups, event) => {
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
      latest: events[0],
    };
  }

  clear(): void {
    this.store.clear();
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

function parseAuditEvent(line: string): AuditEvent | undefined {
  try {
    const value: unknown = JSON.parse(line);
    if (!isAuditEvent(value)) {
      return undefined;
    }
    return value;
  } catch {
    return undefined;
  }
}

function isAuditEvent(value: unknown): value is AuditEvent {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const event = value as Record<string, unknown>;
  return typeof event.id === "string"
    && typeof event.requestId === "string"
    && typeof event.method === "string"
    && typeof event.path === "string"
    && typeof event.routeGroup === "string"
    && typeof event.statusCode === "number"
    && (event.outcome === "success" || event.outcome === "client_error" || event.outcome === "server_error")
    && typeof event.durationMs === "number"
    && typeof event.occurredAt === "string";
}
