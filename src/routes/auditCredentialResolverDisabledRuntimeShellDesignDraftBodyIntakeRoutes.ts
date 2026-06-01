import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverDisabledRuntimeShellDesignDraftBodyIntakeAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMarkdown),
];
