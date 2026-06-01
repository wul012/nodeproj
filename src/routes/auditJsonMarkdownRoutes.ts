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
import { managedAuditManualSandboxConnectionAdapterClientAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionAdapterClientRoutes.js";
import { managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionCommandRoutes.js";
import { managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionFakeTransportRoutes.js";
import { managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionPacketRoutes.js";
import { managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes } from "./auditManagedAuditManualSandboxConnectionPrecheckRoutes.js";
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

  ...managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes,

  ...managedAuditManualSandboxConnectionAdapterClientAuditJsonMarkdownRoutes,

  ...managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes,

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
