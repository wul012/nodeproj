import {
  loadManagedAuditAdapterDisabledShell,
  renderManagedAuditAdapterDisabledShellMarkdown,
} from "../services/managedAuditAdapterDisabledShell.js";
import {
  loadManagedAuditAdapterImplementationPrecheckPacket,
  renderManagedAuditAdapterImplementationPrecheckPacketMarkdown,
} from "../services/managedAuditAdapterImplementationPrecheckPacket.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditAdapterImplementationAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-adapter-implementation-precheck-packet", (deps) => loadManagedAuditAdapterImplementationPrecheckPacket({
    config: deps.config,
  }), renderManagedAuditAdapterImplementationPrecheckPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-adapter-disabled-shell", (deps) => loadManagedAuditAdapterDisabledShell({
    config: deps.config,
  }), renderManagedAuditAdapterDisabledShellMarkdown),
];
