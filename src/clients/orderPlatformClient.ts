import { performance } from "node:perf_hooks";

import { AppHttpError } from "../errors.js";
import type { UpstreamJsonResponse } from "../types.js";

export interface OrderPlatformOpsOverview {
  sampledAt?: string;
  application?: {
    name?: string;
    profiles?: string[];
    startedAt?: string;
    uptimeSeconds?: number;
  };
  orders?: {
    total?: number;
  };
  inventory?: {
    items?: number;
  };
  outbox?: {
    pending?: number;
  };
  failedEvents?: {
    total?: number;
    pendingReplayApprovals?: number;
    latestFailedAt?: string | null;
  };
}

export interface OrderPlatformFailedEventSummary {
  sampledAt?: string;
  totalFailedEvents?: number;
  pendingReplayApprovals?: number;
  approvedReplayApprovals?: number;
  rejectedReplayApprovals?: number;
  latestFailedAt?: string | null;
  latestApprovalAt?: string | null;
  replayBacklog?: number;
}

export interface OrderPlatformFailedEventReplayReadiness {
  sampledAt?: string;
  failedEventId?: number;
  exists?: boolean;
  eventType?: string | null;
  aggregateType?: string | null;
  aggregateId?: string | null;
  failedAt?: string | null;
  managementStatus?: string | null;
  replayApprovalStatus?: string | null;
  replayBacklogPosition?: number | null;
  eligibleForReplay?: boolean;
  requiresApproval?: boolean;
  blockedBy?: string[];
  warnings?: string[];
  nextAllowedActions?: string[];
  latestReplayAttempt?: unknown;
  latestApproval?: unknown;
}

export interface OrderPlatformFailedEventReplaySimulation {
  sampledAt?: string;
  failedEventId?: number;
  exists?: boolean;
  eligibleForReplay?: boolean;
  wouldReplay?: boolean;
  wouldPublishOutbox?: boolean;
  wouldChangeManagementStatus?: boolean;
  requiredApprovalStatus?: string | null;
  idempotencyKeyHint?: string | null;
  expectedAggregateId?: string | null;
  expectedSideEffects?: string[];
  blockedBy?: string[];
  warnings?: string[];
  nextAllowedActions?: string[];
}

export interface OrderPlatformFailedEventApprovalStatus {
  sampledAt?: string;
  failedEventId?: number;
  exists?: boolean;
  failedEventStatus?: string | null;
  managementStatus?: string | null;
  approvalStatus?: string | null;
  requiredApprovalStatus?: string | null;
  approvalRequested?: boolean;
  approvalPending?: boolean;
  approvedForReplay?: boolean;
  rejected?: boolean;
  requestReason?: string | null;
  requestedBy?: string | null;
  requestedAt?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  reviewNote?: string | null;
  historyCount?: number;
  latestApproval?: {
    action?: string | null;
    status?: string | null;
    operatorId?: string | null;
    operatorRole?: string | null;
    note?: string | null;
    changedAt?: string | null;
  } | null;
  approvalBlockedBy?: string[];
  nextAllowedActions?: string[];
}

interface JsonRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export class OrderPlatformClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeoutMs: number,
  ) {}

  health(): Promise<UpstreamJsonResponse> {
    return this.request("/actuator/health");
  }

  opsOverview(): Promise<UpstreamJsonResponse<OrderPlatformOpsOverview>> {
    return this.request("/api/v1/ops/overview");
  }

  failedEventsSummary(): Promise<UpstreamJsonResponse<OrderPlatformFailedEventSummary>> {
    return this.request("/api/v1/failed-events/summary");
  }

  failedEventReplayReadiness(failedEventId: string): Promise<UpstreamJsonResponse<OrderPlatformFailedEventReplayReadiness>> {
    return this.request(`/api/v1/failed-events/${encodeURIComponent(failedEventId)}/replay-readiness`);
  }

  failedEventReplaySimulation(failedEventId: string): Promise<UpstreamJsonResponse<OrderPlatformFailedEventReplaySimulation>> {
    return this.request(`/api/v1/failed-events/${encodeURIComponent(failedEventId)}/replay-simulation`);
  }

  failedEventApprovalStatus(failedEventId: string): Promise<UpstreamJsonResponse<OrderPlatformFailedEventApprovalStatus>> {
    return this.request(`/api/v1/failed-events/${encodeURIComponent(failedEventId)}/approval-status`);
  }

  listProducts(): Promise<UpstreamJsonResponse> {
    return this.request("/api/v1/products");
  }

  listOutboxEvents(): Promise<UpstreamJsonResponse> {
    return this.request("/api/v1/outbox/events");
  }

  getOrder(orderId: string): Promise<UpstreamJsonResponse> {
    return this.request(`/api/v1/orders/${encodeURIComponent(orderId)}`);
  }

  createOrder(idempotencyKey: string, body: unknown): Promise<UpstreamJsonResponse> {
    return this.request("/api/v1/orders", {
      method: "POST",
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
      body,
    });
  }

  payOrder(orderId: string): Promise<UpstreamJsonResponse> {
    return this.request(`/api/v1/orders/${encodeURIComponent(orderId)}/pay`, {
      method: "POST",
    });
  }

  cancelOrder(orderId: string): Promise<UpstreamJsonResponse> {
    return this.request(`/api/v1/orders/${encodeURIComponent(orderId)}/cancel`, {
      method: "POST",
    });
  }

  private async request<T = unknown>(path: string, options: JsonRequestOptions = {}): Promise<UpstreamJsonResponse<T>> {
    const started = performance.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: options.method ?? "GET",
        headers: {
          accept: "application/json",
          ...(options.body === undefined ? {} : { "content-type": "application/json" }),
          ...options.headers,
        },
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: controller.signal,
      });

      const text = await response.text();
      const data = parseBody(text) as T;
      const latencyMs = Math.round(performance.now() - started);

      if (!response.ok) {
        throw new AppHttpError(response.status, "ORDER_PLATFORM_HTTP_ERROR", "Order platform returned an error", {
          upstreamStatusCode: response.status,
          body: data,
        });
      }

      return {
        statusCode: response.status,
        latencyMs,
        data,
      };
    } catch (error) {
      if (error instanceof AppHttpError) {
        throw error;
      }

      const message = error instanceof Error ? error.message : String(error);
      if (error instanceof Error && error.name === "AbortError") {
        throw new AppHttpError(504, "ORDER_PLATFORM_TIMEOUT", `Order platform timed out after ${this.timeoutMs}ms`);
      }

      throw new AppHttpError(502, "ORDER_PLATFORM_UNAVAILABLE", `Order platform is unavailable: ${message}`);
    } finally {
      clearTimeout(timeout);
    }
  }
}

function parseBody(text: string): unknown {
  if (text.trim().length === 0) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
