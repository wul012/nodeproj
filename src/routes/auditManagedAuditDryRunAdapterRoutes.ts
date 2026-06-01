import {
  loadManagedAuditAdapterProductionHardeningReadinessGate,
  renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown,
} from "../services/managedAuditAdapterProductionHardeningReadinessGate.js";
import {
  loadManagedAuditDryRunAdapterArchiveVerification,
  renderManagedAuditDryRunAdapterArchiveVerificationMarkdown,
} from "../services/managedAuditDryRunAdapterArchiveVerification.js";
import {
  loadManagedAuditDryRunAdapterCandidate,
  renderManagedAuditDryRunAdapterCandidateMarkdown,
} from "../services/managedAuditDryRunAdapterCandidate.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditDryRunAdapterAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-dry-run-adapter-candidate", (deps) => loadManagedAuditDryRunAdapterCandidate({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterCandidateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-dry-run-adapter-archive-verification", (deps) => loadManagedAuditDryRunAdapterArchiveVerification({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate", (deps) => loadManagedAuditAdapterProductionHardeningReadinessGate({
    config: deps.config,
  }), renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown),
];
