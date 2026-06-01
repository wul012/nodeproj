import {
  loadManagedAuditPersistenceBoundaryCandidate,
  renderManagedAuditPersistenceBoundaryCandidateMarkdown,
} from "../services/managedAuditPersistenceBoundaryCandidate.js";
import {
  loadManagedAuditPersistenceDryRunVerification,
  renderManagedAuditPersistenceDryRunVerificationMarkdown,
} from "../services/managedAuditPersistenceDryRunVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditPersistenceAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-persistence-boundary-candidate", (deps) => loadManagedAuditPersistenceBoundaryCandidate({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceBoundaryCandidateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-persistence-dry-run-verification", (deps) => loadManagedAuditPersistenceDryRunVerification({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceDryRunVerificationMarkdown),
];
