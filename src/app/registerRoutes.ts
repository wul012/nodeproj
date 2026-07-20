import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { registerActionPlanRoutes } from "../routes/actionPlanRoutes.js";
import { registerAuditRoutes } from "../routes/auditRoutes.js";
import { registerMiniKvRoutes } from "../routes/miniKvRoutes.js";
import { registerOperationApprovalDecisionRoutes } from "../routes/operationApprovalDecisionRoutes.js";
import { registerOperationApprovalEvidenceRoutes } from "../routes/operationApprovalEvidenceRoutes.js";
import { registerOperationApprovalExecutionGateArchiveRoutes } from "../routes/operationApprovalExecutionGateArchiveRoutes.js";
import { registerOperationApprovalRequestRoutes } from "../routes/operationApprovalRequestRoutes.js";
import { registerOperationDispatchRoutes } from "../routes/operationDispatchRoutes.js";
import { registerOperationIntentRoutes } from "../routes/operationIntentRoutes.js";
import { registerOperationPreflightRoutes } from "../routes/operationPreflightRoutes.js";
import { registerOrderPlatformRoutes } from "../routes/orderPlatformRoutes.js";
import { registerOpsSummaryRoutes } from "../routes/opsSummaryRoutes.js";
import { registerDashboardRoutes, registerStatusRoutes } from "../routes/statusRoutes.js";
import type { AppRuntimeDeps } from "./runtimeDeps.js";

interface AppRouteContext {
  app: FastifyInstance;
  config: AppConfig;
  deps: AppRuntimeDeps;
}

interface AppRouteStage {
  name: string;
  register: (context: AppRouteContext) => void | Promise<void>;
}

const APP_ROUTE_STAGES = Object.freeze([
  { name: "dashboard", register: registerDashboardStage },
  { name: "audit", register: registerAuditStage },
  { name: "action-plan", register: registerActionPlanStage },
  { name: "operation-preflight", register: registerPreflightStage },
  { name: "approval-request", register: registerApprovalRequestStage },
  { name: "approval-decision", register: registerApprovalDecisionStage },
  { name: "approval-evidence", register: registerApprovalEvidenceStage },
  { name: "execution-gate-archive", register: registerExecutionArchiveStage },
  { name: "operation-intent", register: registerIntentStage },
  { name: "operation-dispatch", register: registerDispatchStage },
  { name: "ops-summary", register: registerOpsSummaryStage },
  { name: "status", register: registerStatusStage },
  { name: "metrics", register: registerMetricsStage },
  { name: "order-platform", register: registerOrderPlatformStage },
  { name: "mini-kv", register: registerMiniKvStage },
] satisfies readonly AppRouteStage[]);

export const APP_ROUTE_STAGE_NAMES = Object.freeze(
  APP_ROUTE_STAGES.map((stage) => stage.name),
);

export async function registerAppRoutes(
  app: FastifyInstance,
  config: AppConfig,
  deps: AppRuntimeDeps,
): Promise<void> {
  const context = { app, config, deps };
  for (const stage of APP_ROUTE_STAGES) {
    await stage.register(context);
  }
}

async function registerDashboardStage({ app }: AppRouteContext): Promise<void> {
  await registerDashboardRoutes(app);
}

async function registerAuditStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerAuditRoutes(app, {
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime.description,
    config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  });
}

async function registerActionPlanStage({ app, config }: AppRouteContext): Promise<void> {
  await registerActionPlanRoutes(app, { config });
}

async function registerPreflightStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerOperationPreflightRoutes(app, {
    config,
    operationIntents: deps.operationIntents,
    operationDispatches: deps.operationDispatches,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  });
}

async function registerApprovalRequestStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerOperationApprovalRequestRoutes(app, {
    config,
    operationIntents: deps.operationIntents,
    operationDispatches: deps.operationDispatches,
    operationApprovalRequests: deps.operationApprovalRequests,
    mutationRateLimiter: deps.mutationRateLimiter,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  });
}

async function registerApprovalDecisionStage({ app, deps }: AppRouteContext): Promise<void> {
  await registerOperationApprovalDecisionRoutes(app, {
    operationApprovalDecisions: deps.operationApprovalDecisions,
    mutationRateLimiter: deps.mutationRateLimiter,
  });
}

async function registerApprovalEvidenceStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerOperationApprovalEvidenceRoutes(app, {
    config,
    operationApprovalRequests: deps.operationApprovalRequests,
    operationApprovalDecisions: deps.operationApprovalDecisions,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  });
}

async function registerExecutionArchiveStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerOperationApprovalExecutionGateArchiveRoutes(app, {
    config,
    operationApprovalRequests: deps.operationApprovalRequests,
    operationApprovalDecisions: deps.operationApprovalDecisions,
    operationApprovalExecutionGateArchives: deps.operationApprovalExecutionGateArchives,
    mutationRateLimiter: deps.mutationRateLimiter,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  });
}

async function registerIntentStage({ app, deps }: AppRouteContext): Promise<void> {
  await registerOperationIntentRoutes(app, {
    operationIntents: deps.operationIntents,
    mutationRateLimiter: deps.mutationRateLimiter,
  });
}

async function registerDispatchStage({ app, deps }: AppRouteContext): Promise<void> {
  await registerOperationDispatchRoutes(app, {
    operationDispatches: deps.operationDispatches,
    mutationRateLimiter: deps.mutationRateLimiter,
  });
}

async function registerOpsSummaryStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerOpsSummaryRoutes(app, {
    config,
    auditLog: deps.auditLog,
    operationIntents: deps.operationIntents,
    operationDispatches: deps.operationDispatches,
    opsCheckpoints: deps.opsCheckpoints,
    opsBaseline: deps.opsBaseline,
    opsPromotionDecisions: deps.opsPromotionDecisions,
    snapshots: deps.snapshots,
  });
}

async function registerStatusStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerStatusRoutes(app, {
    config,
    snapshots: deps.snapshots,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime.description,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  });
}

function registerMetricsStage({ app, deps }: AppRouteContext): void {
  app.get("/api/v1/metrics", async (_request, reply) => {
    reply.header("cache-control", "no-store");
    return deps.upstreamMetrics.snapshot();
  });
}

async function registerOrderPlatformStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerOrderPlatformRoutes(app, {
    orderPlatform: deps.orderPlatform,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
  });
}

async function registerMiniKvStage({ app, config, deps }: AppRouteContext): Promise<void> {
  await registerMiniKvRoutes(app, {
    miniKv: deps.miniKv,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
  });
}
