import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverImplementationPlanAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationMarkdown),
];
