import {
  loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
  renderManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketMarkdown,
} from "../services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification,
  renderManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet", (deps) => loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown),
];
