import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverPreImplementationReadinessAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewMarkdown),
];
