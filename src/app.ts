import crypto from "node:crypto";
import { performance } from "node:perf_hooks";

import Fastify from "fastify";
import type { FastifyInstance } from "fastify";

import { MiniKvClient } from "./clients/miniKvClient.js";
import { OrderPlatformClient } from "./clients/orderPlatformClient.js";
import type { AppConfig } from "./config.js";
import { isAppHttpError } from "./errors.js";
import { registerActionPlanRoutes } from "./routes/actionPlanRoutes.js";
import { registerAuditRoutes } from "./routes/auditRoutes.js";
import { registerDashboardRoutes } from "./routes/dashboardRoutes.js";
import { registerMiniKvRoutes } from "./routes/miniKvRoutes.js";
import { registerOrderPlatformRoutes } from "./routes/orderPlatformRoutes.js";
import { registerOpsSummaryRoutes } from "./routes/opsSummaryRoutes.js";
import { registerOperationApprovalDecisionRoutes } from "./routes/operationApprovalDecisionRoutes.js";
import { registerOperationApprovalEvidenceRoutes } from "./routes/operationApprovalEvidenceRoutes.js";
import { registerOperationApprovalExecutionGateArchiveRoutes } from "./routes/operationApprovalExecutionGateArchiveRoutes.js";
import { registerOperationApprovalRequestRoutes } from "./routes/operationApprovalRequestRoutes.js";
import { registerOperationDispatchRoutes } from "./routes/operationDispatchRoutes.js";
import { registerOperationIntentRoutes } from "./routes/operationIntentRoutes.js";
import { registerOperationPreflightRoutes } from "./routes/operationPreflightRoutes.js";
import { registerStatusRoutes } from "./routes/statusRoutes.js";
import { evaluateAccessGuard, type AccessGuardEvaluation } from "./services/accessGuard.js";
import { authEnforcementActive } from "./services/authEnforcementRehearsal.js";
import type { AuditAccessGuardContext, AuditOperatorIdentityContext } from "./services/auditLog.js";
import { createAuditStoreRuntime } from "./services/auditStoreFactory.js";
import { MutationRateLimiter } from "./services/mutationRateLimiter.js";
import { OpsBaselineStore } from "./services/opsBaseline.js";
import { OpsCheckpointLedger } from "./services/opsCheckpoint.js";
import { OpsPromotionDecisionLedger } from "./services/opsPromotionDecision.js";
import { OpsSnapshotService } from "./services/opsSnapshotService.js";
import { ProductionConnectionDryRunApprovalLedger } from "./services/productionConnectionDryRunApprovalLedger.js";
import { OperationApprovalDecisionLedger } from "./services/operationApprovalDecision.js";
import { OperationApprovalExecutionGateArchiveLedger } from "./services/operationApprovalExecutionGateArchive.js";
import { OperationApprovalRequestLedger } from "./services/operationApprovalRequest.js";
import { OperationDispatchLedger } from "./services/operationDispatch.js";
import { OperationIntentStore } from "./services/operationIntent.js";
import { createVerifiedTokenAuditContext } from "./services/verifiedIdentityAuditBinding.js";

export async function buildApp(config: AppConfig): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: config.logLevel,
    },
    genReqId: () => crypto.randomUUID(),
  });

  app.setErrorHandler((error, _request, reply) => {
    if (isAppHttpError(error)) {
      reply.code(error.statusCode).send({
        error: error.code,
        message: error.message,
        details: error.details,
      });
      return;
    }

    const errorWithStatus = error as { statusCode?: unknown; message?: unknown };
    const statusCode =
      typeof errorWithStatus.statusCode === "number" && errorWithStatus.statusCode >= 400
        ? errorWithStatus.statusCode
        : 500;
    reply.code(statusCode).send({
      error: statusCode === 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR",
      message: typeof errorWithStatus.message === "string" ? errorWithStatus.message : "Request failed",
    });
  });

  const requestAccessGuards = new WeakMap<object, AuditAccessGuardContext>();
  const requestOperatorIdentities = new WeakMap<object, AuditOperatorIdentityContext>();

  app.addHook("onRequest", async (_request, reply) => {
    reply.header("x-orderops-service", "orderops-node");
    reply.header("access-control-allow-origin", "*");
  });

  app.addHook("onRequest", async (request, reply) => {
    const evaluation = evaluateAccessGuard({
      method: request.method,
      path: request.url,
      headers: request.headers,
    });
    requestAccessGuards.set(request, toAuditAccessGuardContext(evaluation));
    requestOperatorIdentities.set(request, toAuditOperatorIdentityContext(evaluation, request.headers.authorization, config));

    reply
      .header("x-orderops-access-guard-mode", evaluation.mode)
      .header("x-orderops-access-policy-id", evaluation.policyId ?? "unmatched")
      .header("x-orderops-access-route-group", evaluation.routeGroup)
      .header("x-orderops-access-required-role", evaluation.requiredRole ?? "none")
      .header("x-orderops-access-matched-roles", evaluation.matchedRoles.join(","))
      .header("x-orderops-access-would-deny", String(evaluation.wouldDeny))
      .header("x-orderops-access-reason", evaluation.reason)
      .header("x-orderops-auth-mode", config.orderopsAuthMode)
      .header("x-orderops-access-enforcement", String(authEnforcementActive(config)));

    if (request.method === "OPTIONS" || !authEnforcementActive(config) || !evaluation.wouldDeny) {
      return;
    }

    const statusCode = evaluation.reason === "missing_identity" ? 401 : 403;
    return reply.code(statusCode).send({
      error: statusCode === 401 ? "ACCESS_GUARD_UNAUTHENTICATED" : "ACCESS_GUARD_FORBIDDEN",
      message: statusCode === 401
        ? "Operator identity is required by access guard rehearsal enforcement."
        : "Operator identity does not have the required role for this route.",
      details: {
        authMode: config.orderopsAuthMode,
        enforcement: "rehearsal",
        policyId: evaluation.policyId ?? "unmatched",
        routeGroup: evaluation.routeGroup,
        requiredRole: evaluation.requiredRole ?? "none",
        matchedRoles: evaluation.matchedRoles,
        reason: evaluation.reason,
      },
    });
  });

  app.options("/*", async (_request, reply) => {
    reply
      .header("access-control-allow-origin", "*")
      .header("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS")
      .header("access-control-allow-headers", "authorization,content-type,idempotency-key,x-orderops-operator-id,x-orderops-roles")
      .code(204)
      .send();
  });

  const orderPlatform = new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs);
  const miniKv = new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs);
  const snapshots = new OpsSnapshotService(orderPlatform, miniKv, config.upstreamProbesEnabled);
  const auditStoreRuntime = createAuditStoreRuntime(config);
  const auditLog = auditStoreRuntime.auditLog;
  const mutationRateLimiter = new MutationRateLimiter({
    windowMs: config.mutationRateLimitWindowMs,
    maxRequests: config.mutationRateLimitMax,
  });
  const opsCheckpoints = new OpsCheckpointLedger();
  const opsBaseline = new OpsBaselineStore();
  const opsPromotionDecisions = new OpsPromotionDecisionLedger();
  const productionConnectionDryRunApprovals = new ProductionConnectionDryRunApprovalLedger();
  const operationIntents = new OperationIntentStore(config);
  const operationDispatches = new OperationDispatchLedger(operationIntents);
  const operationApprovalRequests = new OperationApprovalRequestLedger();
  const operationApprovalDecisions = new OperationApprovalDecisionLedger(operationApprovalRequests);
  const operationApprovalExecutionGateArchives = new OperationApprovalExecutionGateArchiveLedger();
  const requestStartTimes = new WeakMap<object, number>();

  app.addHook("onRequest", async (request) => {
    requestStartTimes.set(request, performance.now());
  });

  app.addHook("onResponse", async (request, reply) => {
    const startedAt = requestStartTimes.get(request);
    auditLog.record({
      requestId: request.id,
      method: request.method,
      path: request.url,
      accessGuard: requestAccessGuards.get(request),
      operatorIdentity: requestOperatorIdentities.get(request),
      statusCode: reply.statusCode,
      durationMs: startedAt === undefined ? 0 : performance.now() - startedAt,
    });
  });

  await registerDashboardRoutes(app);
  await registerAuditRoutes(app, { auditLog, auditStoreRuntime: auditStoreRuntime.description, config });
  await registerActionPlanRoutes(app, { config });
  await registerOperationPreflightRoutes(app, {
    config,
    operationIntents,
    operationDispatches,
    orderPlatform,
    miniKv,
  });
  await registerOperationApprovalRequestRoutes(app, {
    config,
    operationIntents,
    operationDispatches,
    operationApprovalRequests,
    mutationRateLimiter,
    orderPlatform,
    miniKv,
  });
  await registerOperationApprovalDecisionRoutes(app, {
    operationApprovalDecisions,
    mutationRateLimiter,
  });
  await registerOperationApprovalEvidenceRoutes(app, {
    config,
    operationApprovalRequests,
    operationApprovalDecisions,
    orderPlatform,
    miniKv,
  });
  await registerOperationApprovalExecutionGateArchiveRoutes(app, {
    config,
    operationApprovalRequests,
    operationApprovalDecisions,
    operationApprovalExecutionGateArchives,
    mutationRateLimiter,
    orderPlatform,
    miniKv,
  });
  await registerOperationIntentRoutes(app, { operationIntents, mutationRateLimiter });
  await registerOperationDispatchRoutes(app, { operationDispatches, mutationRateLimiter });
  await registerOpsSummaryRoutes(app, {
    config,
    auditLog,
    operationIntents,
    operationDispatches,
    opsCheckpoints,
    opsBaseline,
    opsPromotionDecisions,
    snapshots,
  });
  await registerStatusRoutes(app, {
    config,
    snapshots,
    auditLog,
    auditStoreRuntime: auditStoreRuntime.description,
    productionConnectionDryRunApprovals,
  });
  await registerOrderPlatformRoutes(app, {
    orderPlatform,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
  });
  await registerMiniKvRoutes(app, {
    miniKv,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
  });

  return app;
}

function toAuditAccessGuardContext(evaluation: AccessGuardEvaluation): AuditAccessGuardContext {
  return {
    guardVersion: evaluation.guardVersion,
    mode: evaluation.mode,
    rejectsRequests: evaluation.rejectsRequests,
    policyMatched: evaluation.policyMatched,
    policyId: evaluation.policyId,
    routeGroup: evaluation.routeGroup,
    requiredRole: evaluation.requiredRole,
    matchedRoles: evaluation.matchedRoles,
    wouldDeny: evaluation.wouldDeny,
    reason: evaluation.reason,
  };
}

function toAuditOperatorIdentityContext(
  evaluation: AccessGuardEvaluation,
  authorization: string | string[] | undefined,
  config: AppConfig,
): AuditOperatorIdentityContext {
  const context: AuditOperatorIdentityContext = {
    identityVersion: "operator-identity-contract.v1",
    authenticated: evaluation.requestIdentity.authenticated,
    operatorId: evaluation.requestIdentity.operatorId,
    roles: evaluation.requestIdentity.roles,
    authSource: evaluation.requestIdentity.authSource,
    rawRoles: evaluation.requestIdentity.rawRoles,
    rejectedRoles: evaluation.requestIdentity.rejectedRoles,
  };

  if (authorization !== undefined) {
    context.verifiedToken = createVerifiedTokenAuditContext({
      config,
      authorization,
      requiredRole: evaluation.requiredRole ?? "viewer",
    });
  }

  return context;
}
