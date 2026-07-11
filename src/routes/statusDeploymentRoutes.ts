import type { FastifyInstance } from "fastify";

import {
  createDeploymentEnvironmentReadinessGate,
  renderDeploymentEnvironmentReadinessMarkdown,
} from "../services/deploymentEnvironmentReadiness.js";
import {
  createDeploymentSafetyProfile,
  renderDeploymentSafetyProfileMarkdown,
} from "../services/deploymentSafetyProfile.js";
import {
  loadProductionConnectionArchiveVerification,
  renderProductionConnectionArchiveVerificationMarkdown,
} from "../services/productionConnectionArchiveVerification.js";
import {
  createProductionConnectionConfigContractProfile,
  renderProductionConnectionConfigContractMarkdown,
} from "../services/productionConnectionConfigContract.js";
import {
  loadProductionConnectionDryRunChangeRequest,
  renderProductionConnectionDryRunChangeRequestMarkdown,
} from "../services/productionConnectionDryRunChangeRequest.js";
import {
  createProductionConnectionFailureModeRehearsalProfile,
  renderProductionConnectionFailureModeRehearsalMarkdown,
} from "../services/productionConnectionFailureModeRehearsal.js";
import {
  loadProductionConnectionImplementationPrecheck,
  renderProductionConnectionImplementationPrecheckMarkdown,
} from "../services/productionConnectionImplementationPrecheck.js";
import {
  productionConnectionDryRunApprovalDecisions,
  renderProductionConnectionDryRunApprovalLedgerMarkdown,
  renderProductionConnectionDryRunApprovalMarkdown,
} from "../services/productionConnectionDryRunApprovalLedger.js";
import type {
  CreateProductionConnectionApprovalBody,
  FixtureReportQuery,
  ProductionConnectionApprovalParams,
  ProductionConnectionApprovalQuery,
  StatusRouteDeps,
} from "./statusRouteTypes.js";
import {
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";

export function registerStatusDeploymentRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/deployment/safety-profile",
      () => createDeploymentSafetyProfile(deps.config),
      renderDeploymentSafetyProfileMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/deployment/environment-readiness",
      () => createDeploymentEnvironmentReadinessGate(deps.config),
      renderDeploymentEnvironmentReadinessMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/connection-config-contract",
      () => createProductionConnectionConfigContractProfile(deps.config),
      renderProductionConnectionConfigContractMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/connection-failure-mode-rehearsal",
      () => createProductionConnectionFailureModeRehearsalProfile(deps.config),
      renderProductionConnectionFailureModeRehearsalMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/connection-implementation-precheck",
      () => loadProductionConnectionImplementationPrecheck({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionConnectionImplementationPrecheckMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/connection-dry-run-change-request",
      () => loadProductionConnectionDryRunChangeRequest({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionConnectionDryRunChangeRequestMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/connection-archive-verification",
      () => loadProductionConnectionArchiveVerification({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
        productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
      }),
      renderProductionConnectionArchiveVerificationMarkdown,
    ),
  ]);
}

export function registerStatusProductionConnectionApprovalRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  app.get<{ Querystring: ProductionConnectionApprovalQuery }>(
    "/api/v1/production/connection-dry-run-approvals",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            format: { type: "string", enum: ["json", "markdown"] },
            limit: { type: "integer", minimum: 1, maximum: 100 },
          },
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      const profile = deps.productionConnectionDryRunApprovals.snapshot(deps.config, request.query.limit ?? 20);

      if (request.query.format === "markdown") {
        reply.type("text/markdown; charset=utf-8");
        return renderProductionConnectionDryRunApprovalLedgerMarkdown(profile);
      }

      return profile;
    },
  );

  app.get<{ Querystring: FixtureReportQuery }>(
    "/api/v1/production/connection-dry-run-approvals/latest",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            format: { type: "string", enum: ["json", "markdown"] },
          },
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      const approval = deps.productionConnectionDryRunApprovals.latest();
      if (approval === undefined) {
        reply.code(404);
        return {
          error: "DRY_RUN_APPROVAL_NOT_FOUND",
          message: "No production connection dry-run approval has been recorded",
        };
      }

      if (request.query.format === "markdown") {
        reply.type("text/markdown; charset=utf-8");
        return renderProductionConnectionDryRunApprovalMarkdown(approval);
      }

      return approval;
    },
  );

  app.get<{ Params: ProductionConnectionApprovalParams; Querystring: FixtureReportQuery }>(
    "/api/v1/production/connection-dry-run-approvals/:approvalId",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            format: { type: "string", enum: ["json", "markdown"] },
          },
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      const approval = deps.productionConnectionDryRunApprovals.get(request.params.approvalId);

      if (request.query.format === "markdown") {
        reply.type("text/markdown; charset=utf-8");
        return renderProductionConnectionDryRunApprovalMarkdown(approval);
      }

      return approval;
    },
  );

  app.post<{ Body: CreateProductionConnectionApprovalBody }>(
    "/api/v1/production/connection-dry-run-approvals",
    {
      schema: {
        body: {
          type: "object",
          required: ["decision", "reviewer", "changeRequestDigest"],
          properties: {
            decision: { type: "string", enum: productionConnectionDryRunApprovalDecisions },
            reviewer: { type: "string", minLength: 1, maxLength: 80 },
            reason: { type: "string", maxLength: 400 },
            changeRequestDigest: { type: "string", minLength: 64, maxLength: 64 },
          },
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      const approval = await deps.productionConnectionDryRunApprovals.create(request.body, {
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      });

      reply.code(201);
      return approval;
    },
  );
}
