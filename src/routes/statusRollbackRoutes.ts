import type { FastifyInstance } from "fastify";

import {
  loadReleaseRollbackReadinessRunbook,
  renderReleaseRollbackReadinessRunbookMarkdown,
} from "../services/releaseRollbackReadinessRunbook.js";
import {
  loadRollbackEvidenceRunbook,
  renderRollbackEvidenceRunbookMarkdown,
} from "../services/rollbackEvidenceRunbook.js";
import {
  loadRollbackExecutionPreflightContract,
  renderRollbackExecutionPreflightContractMarkdown,
} from "../services/rollbackExecutionPreflightContract.js";
import {
  loadRollbackWindowReadinessChecklist,
  renderRollbackWindowReadinessChecklistMarkdown,
} from "../services/rollbackWindowReadinessChecklist.js";
import {
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";
import type { StatusRouteDeps } from "./statusRouteTypes.js";

export function registerStatusRollbackRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/production/release-rollback-readiness-runbook",
      () => loadReleaseRollbackReadinessRunbook(deps.config),
      renderReleaseRollbackReadinessRunbookMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/rollback-window-readiness-checklist",
      () => loadRollbackWindowReadinessChecklist(deps.config),
      renderRollbackWindowReadinessChecklistMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/rollback-execution-preflight-contract",
      () => loadRollbackExecutionPreflightContract(deps.config),
      renderRollbackExecutionPreflightContractMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/deployment/rollback-runbook",
      () => loadRollbackEvidenceRunbook(deps.config),
      renderRollbackEvidenceRunbookMarkdown,
    ),
  ]);
}
