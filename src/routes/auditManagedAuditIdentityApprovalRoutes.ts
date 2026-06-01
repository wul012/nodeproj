import {
  loadManagedAuditIdentityApprovalBindingContract,
  renderManagedAuditIdentityApprovalBindingContractMarkdown,
} from "../services/managedAuditIdentityApprovalBindingContract.js";
import {
  loadManagedAuditIdentityApprovalProvenanceDryRunPacket,
  renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown,
} from "../services/managedAuditIdentityApprovalProvenanceDryRunPacket.js";
import {
  loadManagedAuditIdentityApprovalProvenancePacketVerificationReport,
  renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown,
} from "../services/managedAuditIdentityApprovalProvenancePacketVerificationReport.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditIdentityApprovalAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-identity-approval-binding-contract", (deps) => loadManagedAuditIdentityApprovalBindingContract({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalBindingContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-identity-approval-provenance-dry-run-packet", (deps) => loadManagedAuditIdentityApprovalProvenanceDryRunPacket({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-identity-approval-provenance-packet-verification-report", (deps) => loadManagedAuditIdentityApprovalProvenancePacketVerificationReport({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown),
];
