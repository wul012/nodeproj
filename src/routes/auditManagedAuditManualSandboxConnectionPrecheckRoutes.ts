import {
  loadManagedAuditManualSandboxConnectionPrecheckPacket,
  renderManagedAuditManualSandboxConnectionPrecheckPacketMarkdown,
} from "../services/managedAuditManualSandboxConnectionPrecheckPacket.js";
import {
  loadPrecheckReceiptVerification,
  renderPrecheckReceiptMarkdown,
} from "../services/precheckReceipt/verification.js";
import {
  loadManagedAuditManualSandboxConnectionRehearsalGuard,
  renderManagedAuditManualSandboxConnectionRehearsalGuardMarkdown,
} from "../services/managedAuditManualSandboxConnectionRehearsalGuard.js";
import {
  loadManagedAuditSandboxCodeHealthPass,
  renderManagedAuditSandboxCodeHealthPassMarkdown,
} from "../services/managedAuditSandboxCodeHealthPass.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet", (deps) => loadManagedAuditManualSandboxConnectionPrecheckPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPrecheckPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification", (deps) => loadPrecheckReceiptVerification({
    config: deps.config,
  }), renderPrecheckReceiptMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-sandbox-code-health-pass", (deps) => loadManagedAuditSandboxCodeHealthPass({
    config: deps.config,
  }), renderManagedAuditSandboxCodeHealthPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard", (deps) => loadManagedAuditManualSandboxConnectionRehearsalGuard({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionRehearsalGuardMarkdown),
];
