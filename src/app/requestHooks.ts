import { performance } from "node:perf_hooks";

import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { evaluateAccessGuard, type AccessGuardEvaluation } from "../services/accessGuard.js";
import { authEnforcementActive } from "../services/authEnforcementRehearsal.js";
import type {
  AuditAccessGuardContext,
  AuditLog,
  AuditOperatorIdentityContext,
} from "../services/auditLog.js";
import { createVerifiedTokenAuditContext } from "../services/verifiedIdentityAuditBinding.js";

export interface RequestAuditContexts {
  accessGuards: WeakMap<object, AuditAccessGuardContext>;
  operatorIdentities: WeakMap<object, AuditOperatorIdentityContext>;
}

export function installAccessHooks(
  app: FastifyInstance,
  config: AppConfig,
): RequestAuditContexts {
  const contexts: RequestAuditContexts = {
    accessGuards: new WeakMap(),
    operatorIdentities: new WeakMap(),
  };

  app.addHook("onRequest", async (request, reply) => {
    reply.header("x-orderops-service", "orderops-node");
    reply.header("x-orderops-request-id", request.id);
    reply.header("access-control-allow-origin", "*");
  });

  app.addHook("onRequest", async (request, reply) => {
    const evaluation = evaluateAccessGuard({
      method: request.method,
      path: request.url,
      headers: request.headers,
    });
    contexts.accessGuards.set(request, toAccessContext(evaluation));
    contexts.operatorIdentities.set(
      request,
      toOperatorContext(evaluation, request.headers.authorization, config),
    );

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

  registerCorsPreflight(app);
  return contexts;
}

export function installAuditHooks(
  app: FastifyInstance,
  auditLog: AuditLog,
  contexts: RequestAuditContexts,
): void {
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
      accessGuard: contexts.accessGuards.get(request),
      operatorIdentity: contexts.operatorIdentities.get(request),
      statusCode: reply.statusCode,
      durationMs: startedAt === undefined ? 0 : performance.now() - startedAt,
    });
  });
}

function registerCorsPreflight(app: FastifyInstance): void {
  app.options("/*", async (_request, reply) => {
    reply
      .header("access-control-allow-origin", "*")
      .header("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS")
      .header(
        "access-control-allow-headers",
        "authorization,content-type,idempotency-key,x-orderops-operator-id,x-orderops-roles",
      )
      .code(204)
      .send();
  });
}

function toAccessContext(evaluation: AccessGuardEvaluation): AuditAccessGuardContext {
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

function toOperatorContext(
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
