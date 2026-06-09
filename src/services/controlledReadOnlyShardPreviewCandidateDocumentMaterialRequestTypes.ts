import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";

export type ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestVersion =
  | "Node v1422"
  | "Node v1423"
  | "Node v1424"
  | "Node v1425"
  | "Node v1426"
  | "Node v1427"
  | "Node v1428"
  | "Node v1429"
  | "Node v1430"
  | "Node v1431"
  | "Node v1432"
  | "Node v1433"
  | "Node v1434"
  | "Node v1435"
  | "Node v1436"
  | "Node v1437"
  | "Node v1438"
  | "Node v1439"
  | "Node v1440"
  | "Node v1441"
  | "Node v1442"
  | "Node v1443"
  | "Node v1444"
  | "Node v1445"
  | "Node v1446";

export type ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind =
  | "source-precheck-material-request"
  | "reviewed-document-envelope-material-request"
  | "field-completeness-material-request"
  | "operator-review-attestation-material-request"
  | "identity-signature-material-request"
  | "evidence-policy-material-request"
  | "redaction-secret-boundary-material-request"
  | "runtime-payload-freeze-material-request"
  | "execution-write-mutation-freeze-material-request"
  | "archive-handoff-closeout-material-request"
  | "human-reviewer-identity-material-request"
  | "document-source-uri-material-request"
  | "document-sha256-digest-material-request"
  | "canonical-markdown-body-material-request"
  | "field-value-table-material-request"
  | "comparison-binding-table-material-request"
  | "signature-attestation-material-request"
  | "approval-separation-attestation-material-request"
  | "redaction-log-material-request"
  | "secret-absence-attestation-material-request"
  | "runtime-payload-absence-attestation-material-request"
  | "import-freeze-attestation-material-request"
  | "evaluation-freeze-attestation-material-request"
  | "archive-reference-index-material-request"
  | "submission-closeout-note-material-request";

export type ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind =
  | "source-precheck-material-request-check"
  | "reviewed-document-envelope-material-request-check"
  | "field-completeness-material-request-check"
  | "operator-review-attestation-material-request-check"
  | "identity-signature-material-request-check"
  | "evidence-policy-material-request-check"
  | "redaction-secret-boundary-material-request-check"
  | "runtime-payload-freeze-material-request-check"
  | "execution-write-mutation-freeze-material-request-check"
  | "archive-handoff-closeout-material-request-check"
  | "human-reviewer-identity-material-request-check"
  | "document-source-uri-material-request-check"
  | "document-sha256-digest-material-request-check"
  | "canonical-markdown-body-material-request-check"
  | "field-value-table-material-request-check"
  | "comparison-binding-table-material-request-check"
  | "signature-attestation-material-request-check"
  | "approval-separation-attestation-material-request-check"
  | "redaction-log-material-request-check"
  | "secret-absence-attestation-material-request-check"
  | "runtime-payload-absence-attestation-material-request-check"
  | "import-freeze-attestation-material-request-check"
  | "evaluation-freeze-attestation-material-request-check"
  | "archive-reference-index-material-request-check"
  | "submission-closeout-note-material-request-check";

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestVersion;
  code: string;
  itemName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind;
  checkKind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind;
  sourceIntakeSlotKinds: ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind[];
  sourceIntakeGuardKinds: ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind[];
  materialInstruction: string;
  acceptanceCriterion: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind;
  sourceRequestItemCode: string;
  checkText: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItem {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestVersion;
  code: string;
  itemName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind;
  sourceIntakeSlotCodes: string[];
  sourceIntakeGuardCodes: string[];
  sourceReady: boolean;
  materialFields: string[];
  materialFieldCount: number;
  materialInstruction: string;
  acceptanceCriterion: string;
  readyForCandidateDocumentMaterialRequestItem: boolean;
  requiresReviewedRealCandidateDocument: true;
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

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheck {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind;
  sourceRequestItemCode: string;
  sourceRequestItemReady: boolean;
  checkText: string;
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
  readyForCandidateDocumentMaterialRequestCheck: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestGates {
  sourceIntakePacketReady: boolean;
  materialRequestItemCountComplete: boolean;
  materialAcceptanceCheckCountComplete: boolean;
  itemVersionsSequential: boolean;
  checkVersionsSequential: boolean;
  allSourceSlotsCovered: boolean;
  allSourceGuardsCovered: boolean;
  allRequiredFieldsCarried: boolean;
  requestedFieldCountMatchesSource: boolean;
  allItemsReady: boolean;
  allChecksReady: boolean;
  allItemsReadOnly: boolean;
  allChecksReadOnly: boolean;
  allItemsRequireReviewedRealCandidateDocument: boolean;
  allChecksRejectMissingMaterial: boolean;
  allChecksRejectSyntheticMaterial: boolean;
  allChecksQuarantineUnreviewedMaterial: boolean;
  allChecksBlockMaterialIntake: boolean;
  allChecksBlockPayloadImport: boolean;
  allChecksBlockEvaluation: boolean;
  allChecksBlockAcceptance: boolean;
  allChecksBlockApprovalGrant: boolean;
  allChecksBlockSignedApproval: boolean;
  allChecksBlockRuntimePayload: boolean;
  allChecksBlockWrites: boolean;
  allChecksBlockSiblingMutation: boolean;
  sourceRealDocumentStillAbsent: boolean;
  requestRealDocumentStillAbsent: boolean;
  requestMaterialIntakeStillBlocked: boolean;
  requestPayloadImportStillBlocked: boolean;
  requestEvaluationStillBlocked: boolean;
  sourceDocumentSubmissionStillBlocked: boolean;
  sourceDocumentIntakeStillBlocked: boolean;
  sourcePayloadImportStillBlocked: boolean;
  sourceEvaluationStillBlocked: boolean;
  sourceExecutionStillBlocked: boolean;
  sourceWritesStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  sourcePacketDigestPresent: boolean;
  nextStepRequiresExternalReviewedMaterial: boolean;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage {
  candidateDocumentMaterialRequestPackageVersion: "Node v1446";
  sourceCandidateDocumentIntakePacketVersion:
    ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket["candidateDocumentIntakePacketVersion"];
  candidateDocumentMaterialRequestPackageState:
    "ready-for-reviewed-real-candidate-document-material-request" | "blocked";
  readyForCandidateDocumentMaterialRequestPackage: boolean;
  readyForReviewedRealCandidateDocumentSubmission: false;
  readyForCandidateDocumentMaterialIntake: false;
  readyForCandidatePayloadImport: false;
  readyForCandidateEvaluation: false;
  readyForApprovalGrant: false;
  readyForSignedApproval: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  materialRequestItemCount: number;
  materialAcceptanceCheckCount: number;
  sourceIntakeSlotCount: number;
  sourceIntakeGuardCount: number;
  readyMaterialRequestItemCount: number;
  readyMaterialAcceptanceCheckCount: number;
  requiredMaterialFieldCount: number;
  requestedMaterialFieldCount: number;
  reviewedRealCandidateDocumentMaterialPresent: false;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  sourceCandidateDocumentIntakePacketDigest: string;
  requestItems: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItem[];
  acceptanceChecks: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheck[];
  gates: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  candidateDocumentMaterialRequestPackageDigest: string;
  candidateDocumentSubmissionAllowed: false;
  candidateDocumentIntakeAllowed: false;
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
