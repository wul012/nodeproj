import {
  loadManagedAuditExternalAdapterConnectionReadinessReview,
  renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown,
} from "../services/managedAuditExternalAdapterConnectionReadinessReview.js";
import {
  loadManagedAuditLocalAdapterCandidateDryRun,
  renderManagedAuditLocalAdapterCandidateDryRunMarkdown,
} from "../services/managedAuditLocalAdapterCandidateDryRun.js";
import {
  loadManagedAuditLocalAdapterCandidateVerificationReport,
  renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown,
} from "../services/managedAuditLocalAdapterCandidateVerificationReport.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditLocalAdapterAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-local-adapter-candidate-dry-run", (deps) => loadManagedAuditLocalAdapterCandidateDryRun({
    config: deps.config,
  }), renderManagedAuditLocalAdapterCandidateDryRunMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-local-adapter-candidate-verification-report", (deps) => loadManagedAuditLocalAdapterCandidateVerificationReport({
    config: deps.config,
  }), renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-external-adapter-connection-readiness-review", (deps) => loadManagedAuditExternalAdapterConnectionReadinessReview({
    config: deps.config,
  }), renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown),
];
