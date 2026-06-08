import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion =
  | "Node v1362"
  | "Node v1363"
  | "Node v1364"
  | "Node v1365"
  | "Node v1366"
  | "Node v1367"
  | "Node v1368"
  | "Node v1369"
  | "Node v1370"
  | "Node v1371";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotKind =
  | "source-lineage-candidate-intake-slot"
  | "artifact-shape-candidate-intake-slot"
  | "operator-provenance-candidate-intake-slot"
  | "comparison-result-candidate-intake-slot"
  | "identity-digest-candidate-intake-slot"
  | "signature-envelope-candidate-intake-slot"
  | "evidence-handle-candidate-intake-slot"
  | "policy-lock-candidate-intake-slot"
  | "approval-separation-candidate-intake-slot"
  | "archive-closeout-candidate-intake-slot";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardKind =
  | "source-lineage-candidate-intake-guard"
  | "artifact-shape-candidate-intake-guard"
  | "operator-provenance-candidate-intake-guard"
  | "comparison-result-candidate-intake-guard"
  | "identity-digest-candidate-intake-guard"
  | "signature-envelope-candidate-intake-guard"
  | "evidence-handle-candidate-intake-guard"
  | "policy-lock-candidate-intake-guard"
  | "approval-separation-candidate-intake-guard"
  | "archive-closeout-candidate-intake-guard";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion;
  code: string;
  slotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotKind;
  sourceSectionKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionKind;
  intakeQuestion: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardKind;
  sourceSlotCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlot {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion;
  code: string;
  slotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotKind;
  sourceSectionKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionKind;
  sourceSectionCode: string;
  sourceSectionReady: boolean;
  sourceBlockerReady: boolean;
  candidateFields: string[];
  candidateFieldCount: number;
  intakeQuestion: string;
  readyForComparedEvidenceCandidateIntakeSlot: boolean;
  requiresRealCandidateDocument: true;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardKind;
  sourceSlotCode: string;
  sourceSlotReady: boolean;
  guardText: string;
  rejectsMissingCandidateDocument: true;
  rejectsSyntheticCandidateDocument: true;
  quarantinesUnreviewedCandidateDocument: true;
  blocksCandidatePayloadImport: true;
  blocksCandidateEvaluation: true;
  blocksCandidateAcceptance: true;
  blocksApprovalGrant: true;
  blocksSignedApproval: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForComparedEvidenceCandidateIntakeGuard: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGates {
  sourceCandidateBlueprintReady: boolean;
  slotCountComplete: boolean;
  guardCountComplete: boolean;
  slotVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  allSourceSectionsCovered: boolean;
  allSourceBlockersCovered: boolean;
  allCandidateFieldsCarried: boolean;
  candidateFieldCountMatchesBlueprint: boolean;
  allSlotsReady: boolean;
  allGuardsReady: boolean;
  allSlotsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allSlotsRequireRealCandidateDocument: boolean;
  allGuardsRejectMissingCandidateDocument: boolean;
  allGuardsRejectSyntheticCandidateDocument: boolean;
  allGuardsQuarantineUnreviewedCandidateDocument: boolean;
  allGuardsBlockCandidatePayloadImport: boolean;
  allGuardsBlockCandidateEvaluation: boolean;
  allGuardsBlockCandidateAcceptance: boolean;
  allGuardsBlockApprovalGrant: boolean;
  allGuardsBlockSignedApproval: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  sourceRealCandidateStillAbsent: boolean;
  sourceSyntheticCandidateStillAbsent: boolean;
  realCandidateDocumentStillAbsent: boolean;
  candidatePayloadImportStillBlocked: boolean;
  candidateEvaluationStillBlocked: boolean;
  candidateAcceptanceStillBlocked: boolean;
  evidenceImportStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresRealComparedPackageEvidenceCandidateDocument: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake {
  signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: "Node v1371";
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate[
      "signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion"
    ];
  artifactDraftTextPackageComparedEvidenceCandidateIntakeState:
    "waiting-for-real-compared-package-evidence-candidate-document" | "blocked";
  readyForComparedEvidenceCandidateIntakePreflightContract: boolean;
  readyForRealComparedPackageEvidenceCandidateDocumentIntake: false;
  readyForComparedEvidenceCandidateBlueprintContract:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate[
      "readyForComparedEvidenceCandidateBlueprintContract"
    ];
  readyForCandidatePayloadImport: false;
  readyForCandidateEvaluation: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  intakeSlotCount: number;
  intakeGuardCount: number;
  sourceBlueprintSectionCount: number;
  sourceBlueprintBlockerCount: number;
  readyIntakeSlotCount: number;
  readyIntakeGuardCount: number;
  requiredCandidateFieldCount: number;
  sourceCandidateFieldCount: number;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest: string;
  slots:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlot[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuard[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest: string;
  candidateDocumentIntakeAllowed: false;
  candidatePayloadImportAllowed: false;
  candidateEvaluationAllowed: false;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
