import {
  createAuditRetentionIntegrityEvidence,
  renderAuditRetentionIntegrityEvidenceMarkdown,
} from "../services/auditRetentionIntegrityEvidence.js";
import {
  createAuditStoreEnvConfigProfile,
  renderAuditStoreEnvConfigProfileMarkdown,
} from "../services/auditStoreEnvConfigProfile.js";
import {
  createAuditStoreRuntimeProfile,
  renderAuditStoreRuntimeProfileMarkdown,
} from "../services/auditStoreRuntimeProfile.js";
import {
  createFileAuditRestartEvidenceReport,
  renderFileAuditRestartEvidenceMarkdown,
} from "../services/fileAuditRestartEvidence.js";
import {
  createManagedAuditReadinessSummary,
  renderManagedAuditReadinessSummaryMarkdown,
} from "../services/managedAuditReadinessSummary.js";
import {
  createManagedAuditStoreContractProfile,
  renderManagedAuditStoreContractMarkdown,
} from "../services/managedAuditStoreContract.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const foundationalAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/store-profile", (deps) => createAuditStoreRuntimeProfile({
    currentEventCount: deps.auditLog.summary().total,
    runtime: deps.auditStoreRuntime,
  }), renderAuditStoreRuntimeProfileMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/store-config-profile", (deps) => createAuditStoreEnvConfigProfile({
    auditStoreKind: deps.config.auditStoreKind,
    auditStorePath: deps.config.auditStorePath,
    auditStoreUrl: deps.config.auditStoreUrl,
  }), renderAuditStoreEnvConfigProfileMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/file-restart-evidence", (deps) => createFileAuditRestartEvidenceReport({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
  }), renderFileAuditRestartEvidenceMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/retention-integrity-evidence", (deps) => createAuditRetentionIntegrityEvidence({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
  }), renderAuditRetentionIntegrityEvidenceMarkdown),

  auditJsonMarkdownRoute(
    "/api/v1/audit/managed-store-contract",
    (deps) => createManagedAuditStoreContractProfile(deps.config),
    renderManagedAuditStoreContractMarkdown,
  ),

  auditJsonMarkdownRoute("/api/v1/audit/managed-readiness-summary", (deps) => createManagedAuditReadinessSummary({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
  }), renderManagedAuditReadinessSummaryMarkdown),
];
