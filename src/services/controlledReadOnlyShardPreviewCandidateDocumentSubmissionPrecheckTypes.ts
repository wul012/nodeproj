import type {
  ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckKind,
  ControlledReadOnlyShardPreviewCandidateDocumentRequestItemKind,
  ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.js";

export type ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckVersion =
  | "Node v1387"
  | "Node v1388"
  | "Node v1389"
  | "Node v1390"
  | "Node v1391"
  | "Node v1392"
  | "Node v1393"
  | "Node v1394"
  | "Node v1395"
  | "Node v1396"
  | "Node v1397"
  | "Node v1398"
  | "Node v1399"
  | "Node v1400"
  | "Node v1401"
  | "Node v1402"
  | "Node v1403"
  | "Node v1404"
  | "Node v1405"
  | "Node v1406"
  | "Node v1407"
  | "Node v1408"
  | "Node v1409"
  | "Node v1410"
  | "Node v1411";

export type ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind =
  | "source-lineage-submission-checkpoint"
  | "artifact-shape-submission-checkpoint"
  | "operator-provenance-submission-checkpoint"
  | "comparison-result-submission-checkpoint"
  | "identity-digest-submission-checkpoint"
  | "signature-envelope-submission-checkpoint"
  | "evidence-handle-submission-checkpoint"
  | "policy-lock-submission-checkpoint"
  | "approval-separation-submission-checkpoint"
  | "archive-closeout-submission-checkpoint"
  | "missing-document-submission-checkpoint"
  | "synthetic-document-submission-checkpoint"
  | "unreviewed-document-submission-checkpoint"
  | "import-evaluation-freeze-submission-checkpoint"
  | "execution-write-mutation-freeze-submission-checkpoint"
  | "request-instruction-coverage-submission-checkpoint"
  | "acceptance-criterion-coverage-submission-checkpoint"
  | "document-envelope-shape-submission-checkpoint"
  | "operator-review-window-submission-checkpoint"
  | "redaction-boundary-submission-checkpoint"
  | "secret-value-absence-submission-checkpoint"
  | "runtime-payload-absence-submission-checkpoint"
  | "disabled-probe-state-submission-checkpoint"
  | "archive-reference-handoff-submission-checkpoint"
  | "submission-closeout-submission-checkpoint";

export type ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorKind =
  | "source-lineage-submission-validator"
  | "artifact-shape-submission-validator"
  | "operator-provenance-submission-validator"
  | "comparison-result-submission-validator"
  | "identity-digest-submission-validator"
  | "signature-envelope-submission-validator"
  | "evidence-handle-submission-validator"
  | "policy-lock-submission-validator"
  | "approval-separation-submission-validator"
  | "archive-closeout-submission-validator"
  | "missing-document-submission-validator"
  | "synthetic-document-submission-validator"
  | "unreviewed-document-submission-validator"
  | "import-evaluation-freeze-submission-validator"
  | "execution-write-mutation-freeze-submission-validator"
  | "request-instruction-coverage-submission-validator"
  | "acceptance-criterion-coverage-submission-validator"
  | "document-envelope-shape-submission-validator"
  | "operator-review-window-submission-validator"
  | "redaction-boundary-submission-validator"
  | "secret-value-absence-submission-validator"
  | "runtime-payload-absence-submission-validator"
  | "disabled-probe-state-submission-validator"
  | "archive-reference-handoff-submission-validator"
  | "submission-closeout-submission-validator";

export interface ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckVersion;
  code: string;
  checkpointName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind;
  validatorKind: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorKind;
  sourceRequestItemKinds: ControlledReadOnlyShardPreviewCandidateDocumentRequestItemKind[];
  sourceRequestCheckKinds: ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckKind[];
  submissionInstruction: string;
  validationCriterion: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorKind;
  sourceCheckpointCode: string;
  validatorText: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoint {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckVersion;
  code: string;
  checkpointName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind;
  sourceRequestItemCodes: string[];
  sourceRequestCheckCodes: string[];
  sourceReady: boolean;
  candidateFields: string[];
  candidateFieldCount: number;
  submissionInstruction: string;
  validationCriterion: string;
  readyForCandidateDocumentSubmissionCheckpoint: boolean;
  requiresReviewedRealCandidateDocument: true;
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

export interface ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidator {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorKind;
  sourceCheckpointCode: string;
  sourceCheckpointReady: boolean;
  validatorText: string;
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
  readyForCandidateDocumentSubmissionValidator: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckGates {
  sourceRequestPackageReady: boolean;
  checkpointCountComplete: boolean;
  validatorCountComplete: boolean;
  checkpointVersionsSequential: boolean;
  validatorVersionsSequential: boolean;
  allRequestItemsCovered: boolean;
  allAcceptanceChecksCovered: boolean;
  allRequiredFieldsCarried: boolean;
  submittedFieldCountMatchesRequest: boolean;
  allCheckpointsReady: boolean;
  allValidatorsReady: boolean;
  allCheckpointsReadOnly: boolean;
  allValidatorsReadOnly: boolean;
  allCheckpointsRequireReviewedRealCandidateDocument: boolean;
  allValidatorsRejectMissingCandidateDocument: boolean;
  allValidatorsRejectSyntheticCandidateDocument: boolean;
  allValidatorsQuarantineUnreviewedCandidateDocument: boolean;
  allValidatorsBlockCandidatePayloadImport: boolean;
  allValidatorsBlockCandidateEvaluation: boolean;
  allValidatorsBlockCandidateAcceptance: boolean;
  allValidatorsBlockApprovalGrant: boolean;
  allValidatorsBlockSignedApproval: boolean;
  allValidatorsBlockRuntimePayload: boolean;
  allValidatorsBlockWrites: boolean;
  allValidatorsBlockSiblingMutation: boolean;
  sourceRealCandidateDocumentStillAbsent: boolean;
  sourceSyntheticCandidateDocumentStillAbsent: boolean;
  submissionRealCandidateDocumentStillAbsent: boolean;
  submissionPayloadImportStillBlocked: boolean;
  submissionEvaluationStillBlocked: boolean;
  submissionAcceptanceStillBlocked: boolean;
  sourceDocumentRequestStillBlocked: boolean;
  sourceDocumentIntakeStillBlocked: boolean;
  sourcePayloadImportStillBlocked: boolean;
  sourceEvaluationStillBlocked: boolean;
  sourceExecutionStillBlocked: boolean;
  sourceWritesStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  disabledProbeStateNotAssumedReady: boolean;
  nextStepRequiresReviewedRealCandidateDocumentSubmission: boolean;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck {
  candidateDocumentSubmissionPrecheckVersion: "Node v1411";
  sourceCandidateDocumentRequestPackageVersion:
    ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage[
      "candidateDocumentRequestPackageVersion"
    ];
  candidateDocumentSubmissionPrecheckState:
    "ready-for-reviewed-real-candidate-document-submission-precheck" | "blocked";
  readyForCandidateDocumentSubmissionPrecheck: boolean;
  readyForReviewedRealCandidateDocumentSubmission: false;
  readyForCandidateDocumentIntake: false;
  readyForCandidatePayloadImport: false;
  readyForCandidateEvaluation: false;
  readyForApprovalGrant: false;
  readyForSignedApproval: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  checkpointCount: number;
  validatorCount: number;
  sourceRequestItemCount: number;
  sourceAcceptanceCheckCount: number;
  readyCheckpointCount: number;
  readyValidatorCount: number;
  requiredCandidateFieldCount: number;
  submissionCandidateFieldCount: number;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  sourceCandidateDocumentRequestPackageDigest: string;
  checkpoints: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoint[];
  validators: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidator[];
  gates: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  candidateDocumentSubmissionPrecheckDigest: string;
  candidateDocumentSubmissionAllowed: false;
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
