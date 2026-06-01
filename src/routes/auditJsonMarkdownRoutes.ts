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
  loadManagedAuditAdapterDisabledShell,
  renderManagedAuditAdapterDisabledShellMarkdown,
} from "../services/managedAuditAdapterDisabledShell.js";
import {
  loadManagedAuditAdapterImplementationPrecheckPacket,
  renderManagedAuditAdapterImplementationPrecheckPacketMarkdown,
} from "../services/managedAuditAdapterImplementationPrecheckPacket.js";
import {
  loadManagedAuditAdapterProductionHardeningReadinessGate,
  renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown,
} from "../services/managedAuditAdapterProductionHardeningReadinessGate.js";
import {
  loadManagedAuditDryRunAdapterArchiveVerification,
  renderManagedAuditDryRunAdapterArchiveVerificationMarkdown,
} from "../services/managedAuditDryRunAdapterArchiveVerification.js";
import {
  loadManagedAuditDryRunAdapterCandidate,
  renderManagedAuditDryRunAdapterCandidateMarkdown,
} from "../services/managedAuditDryRunAdapterCandidate.js";
import {
  loadManagedAuditExternalAdapterConnectionReadinessReview,
  renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown,
} from "../services/managedAuditExternalAdapterConnectionReadinessReview.js";
import {
  loadManagedAuditLocalAdapterCandidateDryRun,
  renderManagedAuditLocalAdapterCandidateDryRunMarkdown,
} from "../services/managedAuditLocalAdapterCandidateDryRun.js";
import {
  loadManagedAuditLocalAdapterCandidateVerificationReport,
  renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown,
} from "../services/managedAuditLocalAdapterCandidateVerificationReport.js";
import {
  loadManagedAuditManualSandboxAdapterConnectionRunbook,
  renderManagedAuditManualSandboxAdapterConnectionRunbookMarkdown,
} from "../services/managedAuditManualSandboxAdapterConnectionRunbook.js";
import {
  loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal,
  renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown,
} from "../services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
  renderManagedAuditManualSandboxConnectionDryRunRequestEnvelopeMarkdown,
} from "../services/managedAuditManualSandboxConnectionDryRunRequestEnvelope.js";
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
  loadManagedAuditManualSandboxConnectionEvidenceChecklist,
  renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown,
} from "../services/managedAuditManualSandboxConnectionEvidenceChecklist.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorPacket,
  renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown,
} from "../services/managedAuditManualSandboxConnectionOperatorPacket.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorWindowChecklist,
  renderManagedAuditManualSandboxConnectionOperatorWindowChecklistMarkdown,
} from "../services/managedAuditManualSandboxConnectionOperatorWindowChecklist.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification,
  renderManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.js";
import {
  loadManagedAuditManualSandboxConnectionPacketVerification,
  renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionPacketVerification.js";
import {
  loadManagedAuditManualSandboxConnectionPrecheckPacket,
  renderManagedAuditManualSandboxConnectionPrecheckPacketMarkdown,
} from "../services/managedAuditManualSandboxConnectionPrecheckPacket.js";
import {
  loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
  renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.js";
import {
  loadManagedAuditManualSandboxConnectionDecisionRecord,
  renderManagedAuditManualSandboxConnectionDecisionRecordMarkdown,
} from "../services/managedAuditManualSandboxConnectionDecisionRecord.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
  renderManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckMarkdown,
} from "../services/managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.js";
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
  loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
  renderManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractMarkdown,
} from "../services/managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";
import {
  loadManagedAuditManualSandboxConnectionRehearsalGuard,
  renderManagedAuditManualSandboxConnectionRehearsalGuardMarkdown,
} from "../services/managedAuditManualSandboxConnectionRehearsalGuard.js";
import {
  loadManagedAuditManualSandboxConnectionPreconditionIntake,
  renderManagedAuditManualSandboxConnectionPreconditionIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionPreconditionIntake.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightGate,
  renderManagedAuditManualSandboxConnectionPreflightGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionPreflightGate.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightVerification,
  renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionPreflightVerification.js";
import {
  loadManagedAuditManualSandboxConnectionReadinessGate,
  renderManagedAuditManualSandboxConnectionReadinessGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionReadinessGate.js";
import {
  loadManagedAuditManualSandboxConnectionRehearsalPacketReview,
  renderManagedAuditManualSandboxConnectionRehearsalPacketReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionRehearsalPacketReview.js";
import {
  createManagedAuditReadinessSummary,
  renderManagedAuditReadinessSummaryMarkdown,
} from "../services/managedAuditReadinessSummary.js";
import {
  loadManagedAuditRouteHelperQualityPass,
  renderManagedAuditRouteHelperQualityPassMarkdown,
} from "../services/managedAuditRouteHelperQualityPass.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  renderManagedAuditRouteRegistrationTableQualityPassMarkdown,
} from "../services/managedAuditRouteRegistrationTableQualityPass.js";
import {
  loadManagedAuditSandboxCodeHealthPass,
  renderManagedAuditSandboxCodeHealthPassMarkdown,
} from "../services/managedAuditSandboxCodeHealthPass.js";
import {
  loadManagedAuditSandboxAdapterDryRunPackage,
  renderManagedAuditSandboxAdapterDryRunPackageMarkdown,
} from "../services/managedAuditSandboxAdapterDryRunPackage.js";
import {
  loadManagedAuditSandboxAdapterDryRunPlan,
  renderManagedAuditSandboxAdapterDryRunPlanMarkdown,
} from "../services/managedAuditSandboxAdapterDryRunPlan.js";
import {
  createManagedAuditStoreContractProfile,
  renderManagedAuditStoreContractMarkdown,
} from "../services/managedAuditStoreContract.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";
import { credentialResolverApprovalRequiredReadinessAuditJsonMarkdownRoutes } from "./auditCredentialResolverApprovalRequiredReadinessRoutes.js";
import { credentialResolverCredentialHandleApprovalAuditJsonMarkdownRoutes } from "./auditCredentialResolverCredentialHandleApprovalRoutes.js";
import { credentialResolverDisabledRuntimeShellDesignDraftBodyCandidateAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateRoutes.js";
import { credentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRoutes.js";
import { credentialResolverDisabledRuntimeShellDesignDraftBodyIntakeAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeRoutes.js";
import { credentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionRoutes.js";
import { credentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanRoutes.js";
import { credentialResolverDisabledRuntimeShellDesignDraftCandidateAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellDesignDraftCandidateRoutes.js";
import { credentialResolverDisabledRuntimeShellDesignDraftOutlineAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellDesignDraftOutlineRoutes.js";
import { credentialResolverEndpointHandleAllowlistApprovalAuditJsonMarkdownRoutes } from "./auditCredentialResolverEndpointHandleAllowlistApprovalRoutes.js";
import { credentialResolverFakeShellReadinessAuditJsonMarkdownRoutes } from "./auditCredentialResolverFakeShellReadinessRoutes.js";
import { credentialResolverFinalPrerequisiteAuditJsonMarkdownRoutes } from "./auditCredentialResolverFinalPrerequisiteRoutes.js";
import { credentialResolverFakeHarnessContractAuditJsonMarkdownRoutes } from "./auditCredentialResolverFakeHarnessContractRoutes.js";
import { credentialResolverFakeHarnessExecutionReadinessAuditJsonMarkdownRoutes } from "./auditCredentialResolverFakeHarnessExecutionReadinessRoutes.js";
import { credentialResolverDisabledRuntimeShellReadinessAuditJsonMarkdownRoutes } from "./auditCredentialResolverDisabledRuntimeShellReadinessRoutes.js";
import { credentialResolverHumanApprovalArtifactReviewAuditJsonMarkdownRoutes } from "./auditCredentialResolverHumanApprovalArtifactReviewRoutes.js";
import { credentialResolverImplementationPlanAuditJsonMarkdownRoutes } from "./auditCredentialResolverImplementationPlanRoutes.js";
import { credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes } from "./auditCredentialResolverImplementationCandidateGateRoutes.js";
import { credentialResolverNoNetworkSafetyFixtureAuditJsonMarkdownRoutes } from "./auditCredentialResolverNoNetworkSafetyFixtureRoutes.js";
import { credentialResolverPreImplementationReadinessAuditJsonMarkdownRoutes } from "./auditCredentialResolverPreImplementationReadinessRoutes.js";
import { credentialResolverRuntimeShellDecisionAuditJsonMarkdownRoutes } from "./auditCredentialResolverRuntimeShellDecisionRoutes.js";
import { credentialResolverRuntimeShellPostDecisionAuditJsonMarkdownRoutes } from "./auditCredentialResolverRuntimeShellPostDecisionRoutes.js";
import { credentialResolverRuntimeShellPrerequisiteAuditJsonMarkdownRoutes } from "./auditCredentialResolverRuntimeShellPrerequisiteRoutes.js";
import { credentialResolverSignedHumanApprovalArtifactAuditJsonMarkdownRoutes } from "./auditCredentialResolverSignedHumanApprovalArtifactRoutes.js";
import { javaMiniKvActiveShardPlanAuditJsonMarkdownRoutes } from "./auditJavaMiniKvActiveShardPlanRoutes.js";
import { javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes } from "./auditJavaMiniKvDeclaredOperatorLifecycleRoutes.js";
import { javaMiniKvRuntimeExecutionAuditJsonMarkdownRoutes } from "./auditJavaMiniKvRuntimeExecutionRoutes.js";
import { javaMiniKvShardReadinessEvidenceAuditJsonMarkdownRoutes } from "./auditJavaMiniKvShardReadinessEvidenceRoutes.js";
import { managedAuditAdapterAuditJsonMarkdownRoutes } from "./auditManagedAuditAdapterRoutes.js";
import { managedAuditDisabledReadOnlyIntegrationAuditJsonMarkdownRoutes } from "./auditManagedAuditDisabledReadOnlyIntegrationRoutes.js";
import { managedAuditIdentityApprovalAuditJsonMarkdownRoutes } from "./auditManagedAuditIdentityApprovalRoutes.js";
import { managedAuditPersistenceAuditJsonMarkdownRoutes } from "./auditManagedAuditPersistenceRoutes.js";
import { managedAuditRestoreDrillAuditJsonMarkdownRoutes } from "./auditManagedAuditRestoreDrillRoutes.js";
import { minimalReadOnlyIntegrationAuditJsonMarkdownRoutes } from "./auditMinimalReadOnlyIntegrationRoutes.js";
import { minimalShardReadinessAuditJsonMarkdownRoutes } from "./auditMinimalShardReadinessRoutes.js";
import { sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes } from "./auditSandboxEndpointCredentialResolverRoutes.js";
import { sandboxHandleReviewAuditJsonMarkdownRoutes } from "./auditSandboxHandleReviewRoutes.js";

export const auditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
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

  ...managedAuditAdapterAuditJsonMarkdownRoutes,

  ...managedAuditPersistenceAuditJsonMarkdownRoutes,

  ...managedAuditIdentityApprovalAuditJsonMarkdownRoutes,

  ...managedAuditRestoreDrillAuditJsonMarkdownRoutes,

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-dry-run-adapter-candidate", (deps) => loadManagedAuditDryRunAdapterCandidate({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterCandidateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-dry-run-adapter-archive-verification", (deps) => loadManagedAuditDryRunAdapterArchiveVerification({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate", (deps) => loadManagedAuditAdapterProductionHardeningReadinessGate({
    config: deps.config,
  }), renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-route-helper-quality-pass", (deps) => loadManagedAuditRouteHelperQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteHelperQualityPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-route-registration-table-quality-pass", (deps) => loadManagedAuditRouteRegistrationTableQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteRegistrationTableQualityPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-adapter-implementation-precheck-packet", (deps) => loadManagedAuditAdapterImplementationPrecheckPacket({
    config: deps.config,
  }), renderManagedAuditAdapterImplementationPrecheckPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-adapter-disabled-shell", (deps) => loadManagedAuditAdapterDisabledShell({
    config: deps.config,
  }), renderManagedAuditAdapterDisabledShellMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-local-adapter-candidate-dry-run", (deps) => loadManagedAuditLocalAdapterCandidateDryRun({
    config: deps.config,
  }), renderManagedAuditLocalAdapterCandidateDryRunMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-local-adapter-candidate-verification-report", (deps) => loadManagedAuditLocalAdapterCandidateVerificationReport({
    config: deps.config,
  }), renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-external-adapter-connection-readiness-review", (deps) => loadManagedAuditExternalAdapterConnectionReadinessReview({
    config: deps.config,
  }), renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan", (deps) => loadManagedAuditSandboxAdapterDryRunPlan({
    config: deps.config,
  }), renderManagedAuditSandboxAdapterDryRunPlanMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package", (deps) => loadManagedAuditSandboxAdapterDryRunPackage({
    config: deps.config,
  }), renderManagedAuditSandboxAdapterDryRunPackageMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook", (deps) => loadManagedAuditManualSandboxAdapterConnectionRunbook({
    config: deps.config,
  }), renderManagedAuditManualSandboxAdapterConnectionRunbookMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist", (deps) => loadManagedAuditManualSandboxConnectionEvidenceChecklist({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet", (deps) => loadManagedAuditManualSandboxConnectionOperatorPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification", (deps) => loadManagedAuditManualSandboxConnectionPacketVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate", (deps) => loadManagedAuditManualSandboxConnectionPreflightGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPreflightGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification", (deps) => loadManagedAuditManualSandboxConnectionPreflightVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review", (deps) => loadManagedAuditManualSandboxConnectionRehearsalPacketReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionRehearsalPacketReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal", (deps) => loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake", (deps) => loadManagedAuditManualSandboxConnectionPreconditionIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPreconditionIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope", (deps) => loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDryRunRequestEnvelopeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate", (deps) => loadManagedAuditManualSandboxConnectionReadinessGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionReadinessGateMarkdown),

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

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet", (deps) => loadManagedAuditManualSandboxConnectionPrecheckPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPrecheckPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification", (deps) => loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-sandbox-code-health-pass", (deps) => loadManagedAuditSandboxCodeHealthPass({
    config: deps.config,
  }), renderManagedAuditSandboxCodeHealthPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard", (deps) => loadManagedAuditManualSandboxConnectionRehearsalGuard({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionRehearsalGuardMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record", (deps) => loadManagedAuditManualSandboxConnectionDecisionRecord({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDecisionRecordMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck", (deps) => loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract", (deps) => loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet", (deps) => loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown),

  ...sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes,

  ...credentialResolverFakeShellReadinessAuditJsonMarkdownRoutes,

  ...credentialResolverPreImplementationReadinessAuditJsonMarkdownRoutes,

  ...credentialResolverApprovalRequiredReadinessAuditJsonMarkdownRoutes,

  ...credentialResolverImplementationPlanAuditJsonMarkdownRoutes,

  ...credentialResolverFakeHarnessContractAuditJsonMarkdownRoutes,

  ...credentialResolverFakeHarnessExecutionReadinessAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellReadinessAuditJsonMarkdownRoutes,

  ...credentialResolverRuntimeShellDecisionAuditJsonMarkdownRoutes,

  ...credentialResolverRuntimeShellPostDecisionAuditJsonMarkdownRoutes,

  ...credentialResolverRuntimeShellPrerequisiteAuditJsonMarkdownRoutes,

  ...credentialResolverHumanApprovalArtifactReviewAuditJsonMarkdownRoutes,

  ...credentialResolverSignedHumanApprovalArtifactAuditJsonMarkdownRoutes,

  ...credentialResolverCredentialHandleApprovalAuditJsonMarkdownRoutes,

  ...credentialResolverEndpointHandleAllowlistApprovalAuditJsonMarkdownRoutes,

  ...credentialResolverNoNetworkSafetyFixtureAuditJsonMarkdownRoutes,

  ...credentialResolverFinalPrerequisiteAuditJsonMarkdownRoutes,

  ...credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellDesignDraftCandidateAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellDesignDraftOutlineAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellDesignDraftBodyIntakeAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellDesignDraftBodyCandidateAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanAuditJsonMarkdownRoutes,

  ...credentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateAuditJsonMarkdownRoutes,

  ...minimalReadOnlyIntegrationAuditJsonMarkdownRoutes,

  ...minimalShardReadinessAuditJsonMarkdownRoutes,

  ...javaMiniKvShardReadinessEvidenceAuditJsonMarkdownRoutes,

  ...javaMiniKvActiveShardPlanAuditJsonMarkdownRoutes,

  ...javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes,

  ...javaMiniKvRuntimeExecutionAuditJsonMarkdownRoutes,

  ...managedAuditDisabledReadOnlyIntegrationAuditJsonMarkdownRoutes,

  ...sandboxHandleReviewAuditJsonMarkdownRoutes,

];
