import {
  loadManagedAuditPacketRestoreDrillPlan,
  renderManagedAuditPacketRestoreDrillPlanMarkdown,
} from "../services/managedAuditPacketRestoreDrillPlan.js";
import {
  loadManagedAuditRestoreDrillArchiveVerification,
  renderManagedAuditRestoreDrillArchiveVerificationMarkdown,
} from "../services/managedAuditRestoreDrillArchiveVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditRestoreDrillAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-packet-restore-drill-plan", (deps) => loadManagedAuditPacketRestoreDrillPlan({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPacketRestoreDrillPlanMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-restore-drill-archive-verification", (deps) => loadManagedAuditRestoreDrillArchiveVerification({
    config: deps.config,
  }), renderManagedAuditRestoreDrillArchiveVerificationMarkdown),
];
