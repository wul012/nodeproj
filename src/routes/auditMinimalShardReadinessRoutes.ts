import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport,
  renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const minimalShardReadinessAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate({
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationMarkdown),

  auditJsonMarkdownRoute(CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE, (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown),
];
