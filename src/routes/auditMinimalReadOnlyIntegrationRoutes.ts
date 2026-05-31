import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut,
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const minimalReadOnlyIntegrationAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal({
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive({
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution({
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffMarkdown),
];
