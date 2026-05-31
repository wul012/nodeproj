import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverDisabledRuntimeShellReadinessAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateMarkdown),
];
