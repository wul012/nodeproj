import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverFakeShellReadinessAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateMarkdown),
];
