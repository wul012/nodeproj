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
import type { StatusRouteDeps } from "./statusRouteTypes.js";
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
