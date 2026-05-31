import {
  loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner,
  renderManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverFinalPrerequisiteAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewMarkdown),
];
