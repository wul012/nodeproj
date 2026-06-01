import {
  loadManagedAuditManualSandboxConnectionEvidenceChecklist,
  renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown,
} from "../services/managedAuditManualSandboxConnectionEvidenceChecklist.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorPacket,
  renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown,
} from "../services/managedAuditManualSandboxConnectionOperatorPacket.js";
import {
  loadManagedAuditManualSandboxConnectionPacketVerification,
  renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionPacketVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist", (deps) => loadManagedAuditManualSandboxConnectionEvidenceChecklist({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet", (deps) => loadManagedAuditManualSandboxConnectionOperatorPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification", (deps) => loadManagedAuditManualSandboxConnectionPacketVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown),
];
