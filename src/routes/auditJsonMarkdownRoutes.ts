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
  createManagedAuditReadinessSummary,
  renderManagedAuditReadinessSummaryMarkdown,
} from "../services/managedAuditReadinessSummary.js";
import {
  loadManagedAuditSandboxCodeHealthPass,
  renderManagedAuditSandboxCodeHealthPassMarkdown,
} from "../services/managedAuditSandboxCodeHealthPass.js";
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
import { managedAuditAdapterImplementationAuditJsonMarkdownRoutes } from "./auditManagedAuditAdapterImplementationRoutes.js";
import { managedAuditDisabledReadOnlyIntegrationAuditJsonMarkdownRoutes } from "./auditManagedAuditDisabledReadOnlyIntegrationRoutes.js";
import { managedAuditDryRunAdapterAuditJsonMarkdownRoutes } from "./auditManagedAuditDryRunAdapterRoutes.js";
import { managedAuditIdentityApprovalAuditJsonMarkdownRoutes } from "./auditManagedAuditIdentityApprovalRoutes.js";
import { managedAuditLocalAdapterAuditJsonMarkdownRoutes } from "./auditManagedAuditLocalAdapterRoutes.js";
import { managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionCommandRoutes.js";
import { managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionPacketRoutes.js";
import { managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionReadinessRoutes.js";
import { managedAuditPersistenceAuditJsonMarkdownRoutes } from "./auditManagedAuditPersistenceRoutes.js";
import { managedAuditRouteQualityAuditJsonMarkdownRoutes } from "./auditManagedAuditRouteQualityRoutes.js";
import { managedAuditRestoreDrillAuditJsonMarkdownRoutes } from "./auditManagedAuditRestoreDrillRoutes.js";
import { managedAuditSandboxAdapterAuditJsonMarkdownRoutes } from "./auditManagedAuditSandboxAdapterRoutes.js";
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

  ...managedAuditDryRunAdapterAuditJsonMarkdownRoutes,

  ...managedAuditRouteQualityAuditJsonMarkdownRoutes,

  ...managedAuditAdapterImplementationAuditJsonMarkdownRoutes,

  ...managedAuditLocalAdapterAuditJsonMarkdownRoutes,

  ...managedAuditSandboxAdapterAuditJsonMarkdownRoutes,

  ...managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes,

  ...managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes,

  ...managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes,

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
