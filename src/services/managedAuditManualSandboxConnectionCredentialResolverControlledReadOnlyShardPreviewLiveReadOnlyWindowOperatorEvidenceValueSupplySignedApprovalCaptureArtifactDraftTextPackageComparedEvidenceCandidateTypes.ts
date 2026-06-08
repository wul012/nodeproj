import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRuleKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion =
  | "Node v1352"
  | "Node v1353"
  | "Node v1354"
  | "Node v1355"
  | "Node v1356"
  | "Node v1357"
  | "Node v1358"
  | "Node v1359"
  | "Node v1360"
  | "Node v1361";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionKind =
  | "source-lineage-candidate-section"
  | "artifact-shape-candidate-section"
  | "operator-provenance-candidate-section"
  | "comparison-result-candidate-section"
  | "identity-digest-candidate-section"
  | "signature-envelope-candidate-section"
  | "evidence-handle-candidate-section"
  | "policy-lock-candidate-section"
  | "approval-separation-candidate-section"
  | "archive-closeout-candidate-section";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockerKind =
  | "source-lineage-candidate-blocker"
  | "artifact-shape-candidate-blocker"
  | "operator-provenance-candidate-blocker"
  | "comparison-result-candidate-blocker"
  | "identity-digest-candidate-blocker"
  | "signature-envelope-candidate-blocker"
  | "evidence-handle-candidate-blocker"
  | "policy-lock-candidate-blocker"
  | "approval-separation-candidate-blocker"
  | "archive-closeout-candidate-blocker";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion;
  code: string;
  sectionName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionKind;
  sourceRuleKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRuleKind[];
  candidateFields: string[];
  candidateQuestion: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockerTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockerKind;
  sourceSectionCode: string;
  blockerText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSection {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion;
  code: string;
  sectionName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionKind;
  sourceRuleKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRuleKind[];
  sourceEvaluationRuleCount: number;
  readySourceEvaluationRuleCount: number;
  sourceEvaluationGuardCount: number;
  readySourceEvaluationGuardCount: number;
  candidateFields: string[];
  candidateFieldCount: number;
  candidateQuestion: string;
  readyForComparedEvidenceCandidateBlueprintSection: boolean;
  realCandidateValueCount: 0;
  syntheticCandidateValueCount: 0;
  materializedCandidateValueCount: 0;
  acceptedCandidateValueCount: 0;
  rejectedCandidateValueCount: 0;
  blockedByMissingRealCandidate: true;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlocker {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockerKind;
  sourceSectionCode: string;
  sourceSectionReady: boolean;
  blockerText: string;
  rejectsMissingCandidate: true;
  rejectsSyntheticCandidate: true;
  blocksCandidateMaterialization: true;
  blocksCandidateAcceptance: true;
  blocksApprovalGrant: true;
  blocksSignedApproval: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForComparedEvidenceCandidateBlueprintBlocker: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateGates {
  sourceEvaluationPreflightReady: boolean;
  sectionCountComplete: boolean;
  blockerCountComplete: boolean;
  sectionVersionsSequential: boolean;
  blockerVersionsSequential: boolean;
  allSourceEvaluationRulesCovered: boolean;
  allSourceEvaluationGuardsCovered: boolean;
  allSectionsReady: boolean;
  allBlockersReady: boolean;
  allCandidateFieldsDeclared: boolean;
  candidateFieldCountMatchesSourceRules: boolean;
  candidateFieldNamesUnique: boolean;
  sourceEvaluationRuleCountStillTwenty: boolean;
  sourceEvaluationGuardCountStillTwenty: boolean;
  sourceRealCandidateStillAbsent: boolean;
  sourceSyntheticCandidateStillAbsent: boolean;
  candidateValuesStillAbsent: boolean;
  candidateMaterializationStillBlocked: boolean;
  candidateAcceptanceStillBlocked: boolean;
  allSectionsReadOnly: boolean;
  allBlockersReadOnly: boolean;
  allBlockersRejectSyntheticCandidate: boolean;
  allBlockersBlockApprovalGrant: boolean;
  allBlockersBlockSignedApproval: boolean;
  allBlockersBlockRuntimePayload: boolean;
  allBlockersBlockWrites: boolean;
  allBlockersBlockSiblingMutation: boolean;
  signedApprovalDraftStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresRealComparedPackageEvidenceCandidate: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate {
  signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361";
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight[
      "signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion"
    ];
  artifactDraftTextPackageComparedEvidenceCandidateState:
    "waiting-for-real-compared-package-evidence-candidate" | "blocked";
  readyForComparedEvidenceCandidateBlueprintContract: boolean;
  readyForRealComparedPackageEvidenceCandidateIntake: false;
  readyForComparedEvidenceEvaluationPreflightContract:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight[
      "readyForComparedEvidenceEvaluationPreflightContract"
    ];
  readyForRealComparedPackageEvidenceEvaluation: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  blueprintSectionCount: number;
  blueprintBlockerCount: number;
  sourceEvaluationRuleCount: number;
  sourceEvaluationGuardCount: number;
  readyBlueprintSectionCount: number;
  readyBlueprintBlockerCount: number;
  candidateFieldCount: number;
  expectedCandidateFieldCountFromPreflight: number;
  realComparedPackageEvidenceCandidateValueCount: 0;
  syntheticComparedPackageEvidenceCandidateValueCount: 0;
  materializedComparedPackageEvidenceCandidateValueCount: 0;
  acceptedComparedPackageEvidenceCandidateValueCount: 0;
  rejectedComparedPackageEvidenceCandidateValueCount: 0;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest: string;
  sections:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSection[];
  blockers:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlocker[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest: string;
  candidateBlueprintMaterializationAllowed: false;
  candidateEvaluationAllowed: false;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
