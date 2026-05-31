import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverRuntimeShellDecisionAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationMarkdown),
];
