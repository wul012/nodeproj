import {
  loadManagedAuditManualSandboxConnectionDryRunCommandPackage,
  renderManagedAuditManualSandboxConnectionDryRunCommandPackageMarkdown,
} from "../services/managedAuditManualSandboxConnectionDryRunCommandPackage.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport,
  renderManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportMarkdown,
} from "../services/managedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorWindowChecklist,
  renderManagedAuditManualSandboxConnectionOperatorWindowChecklistMarkdown,
} from "../services/managedAuditManualSandboxConnectionOperatorWindowChecklist.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification,
  renderManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist", (deps) => loadManagedAuditManualSandboxConnectionOperatorWindowChecklist({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionOperatorWindowChecklistMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification", (deps) => loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package", (deps) => loadManagedAuditManualSandboxConnectionDryRunCommandPackage({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDryRunCommandPackageMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report", (deps) => loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationMarkdown),
];
