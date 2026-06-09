import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";

export type ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckVersion =
  | "Node v1447"
  | "Node v1448"
  | "Node v1449"
  | "Node v1450"
  | "Node v1451"
  | "Node v1452"
  | "Node v1453"
  | "Node v1454"
  | "Node v1455"
  | "Node v1456";

export type ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointKind =
  | "material-source-package-submission-checkpoint"
  | "reviewer-identity-submission-checkpoint"
  | "document-origin-submission-checkpoint"
  | "digest-canonical-body-submission-checkpoint"
  | "field-table-submission-checkpoint"
  | "comparison-binding-submission-checkpoint"
  | "signature-attestation-submission-checkpoint"
  | "redaction-secret-submission-checkpoint"
  | "runtime-import-freeze-submission-checkpoint"
  | "closeout-archive-submission-checkpoint";

export type ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorKind =
  | "material-source-package-submission-validator"
  | "reviewer-identity-submission-validator"
  | "document-origin-submission-validator"
  | "digest-canonical-body-submission-validator"
  | "field-table-submission-validator"
  | "comparison-binding-submission-validator"
  | "signature-attestation-submission-validator"
  | "redaction-secret-submission-validator"
  | "runtime-import-freeze-submission-validator"
  | "closeout-archive-submission-validator";

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckVersion;
  code: string;
  checkpointName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointKind;
  validatorKind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorKind;
  sourceMaterialRequestItemKinds: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind[];
  sourceMaterialRequestCheckKinds: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind[];
  submissionInstruction: string;
  validationRule: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorKind;
  sourceCheckpointCode: string;
  validatorText: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoint {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckVersion;
  code: string;
  checkpointName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointKind;
  sourceMaterialRequestItemCodes: string[];
  sourceMaterialAcceptanceCheckCodes: string[];
  sourceReady: boolean;
  materialFields: string[];
  materialFieldCount: number;
  submissionInstruction: string;
  validationRule: string;
  readyForCandidateDocumentMaterialSubmissionCheckpoint: boolean;
  requiresReviewedRealCandidateDocumentMaterial: true;
  reviewedRealCandidateDocumentMaterialPresent: false;
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

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidator {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorKind;
  sourceCheckpointCode: string;
  sourceCheckpointReady: boolean;
  validatorText: string;
  rejectsMissingMaterial: true;
  rejectsSyntheticMaterial: true;
  quarantinesUnreviewedMaterial: true;
  blocksMaterialIntake: true;
  blocksCandidatePayloadImport: true;
  blocksCandidateEvaluation: true;
  blocksCandidateAcceptance: true;
  blocksApprovalGrant: true;
  blocksSignedApproval: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForCandidateDocumentMaterialSubmissionValidator: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckGates {
  sourceMaterialRequestPackageReady: boolean;
  checkpointCountComplete: boolean;
  validatorCountComplete: boolean;
  checkpointVersionsSequential: boolean;
  validatorVersionsSequential: boolean;
  allSourceRequestItemsCovered: boolean;
  allSourceAcceptanceChecksCovered: boolean;
  allRequiredFieldsCarried: boolean;
  submissionFieldCountMatchesSource: boolean;
  allCheckpointsReady: boolean;
  allValidatorsReady: boolean;
  allCheckpointsReadOnly: boolean;
  allValidatorsReadOnly: boolean;
  allCheckpointsRequireReviewedRealMaterial: boolean;
  allValidatorsRejectMissingMaterial: boolean;
  allValidatorsRejectSyntheticMaterial: boolean;
  allValidatorsQuarantineUnreviewedMaterial: boolean;
  allValidatorsBlockMaterialIntake: boolean;
  allValidatorsBlockPayloadImport: boolean;
  allValidatorsBlockEvaluation: boolean;
  allValidatorsBlockAcceptance: boolean;
  allValidatorsBlockApprovalGrant: boolean;
  allValidatorsBlockSignedApproval: boolean;
  allValidatorsBlockRuntimePayload: boolean;
  allValidatorsBlockWrites: boolean;
  allValidatorsBlockSiblingMutation: boolean;
  sourceRealMaterialStillAbsent: boolean;
  precheckRealMaterialStillAbsent: boolean;
  precheckMaterialIntakeStillBlocked: boolean;
  precheckPayloadImportStillBlocked: boolean;
  precheckEvaluationStillBlocked: boolean;
  sourceDocumentSubmissionStillBlocked: boolean;
  sourceDocumentIntakeStillBlocked: boolean;
  sourceMaterialIntakeStillBlocked: boolean;
  sourcePayloadImportStillBlocked: boolean;
  sourceEvaluationStillBlocked: boolean;
  sourceExecutionStillBlocked: boolean;
  sourceWritesStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  sourcePackageDigestPresent: boolean;
  nextStepRequiresExternalMaterialSubmission: boolean;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheck {
  candidateDocumentMaterialSubmissionPrecheckVersion: "Node v1456";
  sourceCandidateDocumentMaterialRequestPackageVersion:
    ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage[
      "candidateDocumentMaterialRequestPackageVersion"
    ];
  candidateDocumentMaterialSubmissionPrecheckState:
    "ready-for-reviewed-real-candidate-document-material-submission-precheck" | "blocked";
  readyForCandidateDocumentMaterialSubmissionPrecheck: boolean;
  readyForReviewedRealCandidateDocumentMaterialSubmission: false;
  readyForCandidateDocumentMaterialIntake: false;
  readyForCandidatePayloadImport: false;
  readyForCandidateEvaluation: false;
  readyForApprovalGrant: false;
  readyForSignedApproval: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  checkpointCount: number;
  validatorCount: number;
  sourceMaterialRequestItemCount: number;
  sourceMaterialAcceptanceCheckCount: number;
  readyCheckpointCount: number;
  readyValidatorCount: number;
  requiredMaterialFieldCount: number;
  submissionMaterialFieldCount: number;
  reviewedRealCandidateDocumentMaterialPresent: false;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  sourceCandidateDocumentMaterialRequestPackageDigest: string;
  checkpoints: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoint[];
  validators: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidator[];
  gates: ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  candidateDocumentMaterialSubmissionPrecheckDigest: string;
  candidateDocumentSubmissionAllowed: false;
  candidateDocumentIntakeAllowed: false;
  candidateDocumentMaterialSubmissionAllowed: false;
  candidateDocumentMaterialIntakeAllowed: false;
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
