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
  createManagedAuditAdapterBoundaryProfile,
  renderManagedAuditAdapterBoundaryMarkdown,
} from "../services/managedAuditAdapterBoundary.js";
import {
  createManagedAuditAdapterComplianceProfile,
  renderManagedAuditAdapterComplianceMarkdown,
} from "../services/managedAuditAdapterCompliance.js";
import {
  createManagedAuditAdapterRunnerProfile,
  renderManagedAuditAdapterRunnerMarkdown,
} from "../services/managedAuditAdapterRunner.js";
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
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
  renderManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord,
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan,
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket,
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview,
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";
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
  loadManagedAuditPacketRestoreDrillPlan,
  renderManagedAuditPacketRestoreDrillPlanMarkdown,
} from "../services/managedAuditPacketRestoreDrillPlan.js";
import {
  loadManagedAuditPersistenceBoundaryCandidate,
  renderManagedAuditPersistenceBoundaryCandidateMarkdown,
} from "../services/managedAuditPersistenceBoundaryCandidate.js";
import {
  loadManagedAuditPersistenceDryRunVerification,
  renderManagedAuditPersistenceDryRunVerificationMarkdown,
} from "../services/managedAuditPersistenceDryRunVerification.js";
import {
  createManagedAuditReadinessSummary,
  renderManagedAuditReadinessSummaryMarkdown,
} from "../services/managedAuditReadinessSummary.js";
import {
  loadManagedAuditRestoreDrillArchiveVerification,
  renderManagedAuditRestoreDrillArchiveVerificationMarkdown,
} from "../services/managedAuditRestoreDrillArchiveVerification.js";
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

  auditJsonMarkdownRoute("/api/v1/audit/managed-adapter-boundary", (deps) => createManagedAuditAdapterBoundaryProfile({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
  }), renderManagedAuditAdapterBoundaryMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-persistence-boundary-candidate", (deps) => loadManagedAuditPersistenceBoundaryCandidate({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceBoundaryCandidateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-persistence-dry-run-verification", (deps) => loadManagedAuditPersistenceDryRunVerification({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceDryRunVerificationMarkdown),

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

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeMarkdown),

  auditJsonMarkdownRoute(
    "/api/v1/audit/managed-adapter-compliance",
    (deps) => createManagedAuditAdapterComplianceProfile(deps.config),
    renderManagedAuditAdapterComplianceMarkdown,
  ),

  auditJsonMarkdownRoute(
    "/api/v1/audit/managed-adapter-runner",
    (deps) => createManagedAuditAdapterRunnerProfile(deps.config),
    renderManagedAuditAdapterRunnerMarkdown,
  ),
];
