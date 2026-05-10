import type { AppConfig } from "../config.js";
import { AuditLog } from "./auditLog.js";
import { OperationDispatchLedger } from "./operationDispatch.js";
import type { OperationDispatchStatus } from "./operationDispatch.js";
import { OperationIntentStore } from "./operationIntent.js";
import type { OperationIntentEventType, OperationIntentStatus } from "./operationIntent.js";

export interface OpsSummary {
  service: "orderops-node";
  generatedAt: string;
  safety: {
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
  };
  mutationRateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  audit: ReturnType<AuditLog["summary"]>;
  intents: {
    total: number;
    byStatus: Record<OperationIntentStatus, number>;
    byTarget: Record<string, number>;
    byRisk: Record<string, number>;
    latest?: {
      id: string;
      action: string;
      status: OperationIntentStatus;
      operatorId: string;
      createdAt: string;
    };
  };
  dispatches: {
    total: number;
    byStatus: Record<OperationDispatchStatus, number>;
    upstreamTouched: number;
    latest?: {
      id: string;
      intentId: string;
      action: string;
      status: OperationDispatchStatus;
      requestedBy: string;
      createdAt: string;
    };
  };
  events: {
    total: number;
    byType: Record<OperationIntentEventType, number>;
    latest?: {
      id: string;
      intentId: string;
      type: OperationIntentEventType;
      at: string;
    };
  };
  signals: {
    blockedIntents: number;
    pendingConfirmations: number;
    confirmedIntents: number;
    rejectedDispatches: number;
    dryRunDispatches: number;
    rateLimitedRequests: number;
    upstreamTouchedDispatches: number;
  };
}

interface OpsSummaryDeps {
  config: AppConfig;
  auditLog: AuditLog;
  operationIntents: OperationIntentStore;
  operationDispatches: OperationDispatchLedger;
}

export function createOpsSummary(deps: OpsSummaryDeps): OpsSummary {
  const audit = deps.auditLog.summary();
  const auditEvents = deps.auditLog.list(200);
  const intents = deps.operationIntents.list(1000);
  const dispatches = deps.operationDispatches.list(1000);
  const events = deps.operationIntents.listEvents({ limit: 1000 });
  const intentStatus = countBy<OperationIntentStatus>(intents.map((intent) => intent.status));
  const dispatchStatus = countBy<OperationDispatchStatus>(dispatches.map((dispatch) => dispatch.status));

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    safety: {
      upstreamProbesEnabled: deps.config.upstreamProbesEnabled,
      upstreamActionsEnabled: deps.config.upstreamActionsEnabled,
    },
    mutationRateLimit: {
      windowMs: deps.config.mutationRateLimitWindowMs,
      maxRequests: deps.config.mutationRateLimitMax,
    },
    audit,
    intents: {
      total: intents.length,
      byStatus: intentStatus,
      byTarget: countBy(intents.map((intent) => intent.plan.target)),
      byRisk: countBy(intents.map((intent) => intent.plan.risk)),
      latest: intents[0] === undefined
        ? undefined
        : {
          id: intents[0].id,
          action: intents[0].plan.action,
          status: intents[0].status,
          operatorId: intents[0].operator.id,
          createdAt: intents[0].createdAt,
        },
    },
    dispatches: {
      total: dispatches.length,
      byStatus: dispatchStatus,
      upstreamTouched: dispatches.filter((dispatch) => dispatch.upstreamTouched).length,
      latest: dispatches[0] === undefined
        ? undefined
        : {
          id: dispatches[0].id,
          intentId: dispatches[0].intentId,
          action: dispatches[0].action,
          status: dispatches[0].status,
          requestedBy: dispatches[0].requestedBy,
          createdAt: dispatches[0].createdAt,
        },
    },
    events: {
      total: events.length,
      byType: countBy<OperationIntentEventType>(events.map((event) => event.type)),
      latest: events[0] === undefined
        ? undefined
        : {
          id: events[0].id,
          intentId: events[0].intentId,
          type: events[0].type,
          at: events[0].at,
        },
    },
    signals: {
      blockedIntents: intentStatus.blocked ?? 0,
      pendingConfirmations: intentStatus["pending-confirmation"] ?? 0,
      confirmedIntents: intentStatus.confirmed ?? 0,
      rejectedDispatches: dispatchStatus.rejected ?? 0,
      dryRunDispatches: dispatchStatus["dry-run-completed"] ?? 0,
      rateLimitedRequests: auditEvents.filter((event) => event.statusCode === 429).length,
      upstreamTouchedDispatches: dispatches.filter((dispatch) => dispatch.upstreamTouched).length,
    },
  };
}

function countBy<T extends string>(values: T[]): Record<T, number> {
  return values.reduce<Record<T, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {} as Record<T, number>);
}
