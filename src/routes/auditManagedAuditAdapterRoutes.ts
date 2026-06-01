import {
  createManagedAuditAdapterBoundaryProfile,
  renderManagedAuditAdapterBoundaryMarkdown,
} from "../services/managedAuditAdapterBoundary.js";
import {
  createManagedAuditAdapterComplianceProfile,
  renderManagedAuditAdapterComplianceMarkdown,
} from "../services/managedAuditAdapterCompliance.js";
import {
  createManagedAuditAdapterRunnerProfile,
  renderManagedAuditAdapterRunnerMarkdown,
} from "../services/managedAuditAdapterRunner.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditAdapterAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-adapter-boundary", (deps) => createManagedAuditAdapterBoundaryProfile({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
  }), renderManagedAuditAdapterBoundaryMarkdown),

  auditJsonMarkdownRoute(
    "/api/v1/audit/managed-adapter-compliance",
    (deps) => createManagedAuditAdapterComplianceProfile(deps.config),
    renderManagedAuditAdapterComplianceMarkdown,
  ),

  auditJsonMarkdownRoute(
    "/api/v1/audit/managed-adapter-runner",
    (deps) => createManagedAuditAdapterRunnerProfile(deps.config),
    renderManagedAuditAdapterRunnerMarkdown,
  ),
];
