import {
  loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision,
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewMarkdown),
];
