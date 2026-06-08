import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeTypes.js";

export type ControlledReadOnlyShardPreviewCandidateDocumentRequestVersion =
  | "Node v1372"
  | "Node v1373"
  | "Node v1374"
  | "Node v1375"
  | "Node v1376"
  | "Node v1377"
  | "Node v1378"
  | "Node v1379"
  | "Node v1380"
  | "Node v1381"
  | "Node v1382"
  | "Node v1383"
  | "Node v1384"
  | "Node v1385"
  | "Node v1386";

export type ControlledReadOnlyShardPreviewCandidateDocumentRequestItemKind =
  | "source-lineage-document-request"
  | "artifact-shape-document-request"
  | "operator-provenance-document-request"
  | "comparison-result-document-request"
  | "identity-digest-document-request"
  | "signature-envelope-document-request"
  | "evidence-handle-document-request"
  | "policy-lock-document-request"
  | "approval-separation-document-request"
  | "archive-closeout-document-request"
  | "missing-document-rejection-request"
  | "synthetic-document-rejection-request"
  | "unreviewed-document-quarantine-request"
  | "import-evaluation-freeze-request"
  | "execution-write-mutation-freeze-request";

export type ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckKind =
  | "source-lineage-document-request-check"
  | "artifact-shape-document-request-check"
  | "operator-provenance-document-request-check"
  | "comparison-result-document-request-check"
  | "identity-digest-document-request-check"
  | "signature-envelope-document-request-check"
  | "evidence-handle-document-request-check"
  | "policy-lock-document-request-check"
  | "approval-separation-document-request-check"
  | "archive-closeout-document-request-check"
  | "missing-document-rejection-request-check"
  | "synthetic-document-rejection-request-check"
  | "unreviewed-document-quarantine-request-check"
  | "import-evaluation-freeze-request-check"
  | "execution-write-mutation-freeze-request-check";

export interface ControlledReadOnlyShardPreviewCandidateDocumentRequestItemTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentRequestVersion;
  code: string;
  itemName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentRequestItemKind;
  sourceSlotKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotKind[];
  sourceGuardKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardKind[];
  requestInstruction: string;
  acceptanceCriterion: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentRequestVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckKind;
  sourceItemCode: string;
  checkText: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentRequestItem {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentRequestVersion;
  code: string;
  itemName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentRequestItemKind;
  sourceSlotCodes: string[];
  sourceGuardCodes: string[];
  sourceReady: boolean;
  candidateFields: string[];
  candidateFieldCount: number;
  requestInstruction: string;
  acceptanceCriterion: string;
  readyForCandidateDocumentRequestItem: boolean;
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

export interface ControlledReadOnlyShardPreviewCandidateDocumentRequestCheck {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentRequestVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckKind;
  sourceItemCode: string;
  sourceItemReady: boolean;
  checkText: string;
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
  readyForCandidateDocumentRequestCheck: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentRequestGates {
  sourceCandidateIntakeReady: boolean;
  requestItemCountComplete: boolean;
  acceptanceCheckCountComplete: boolean;
  requestVersionsSequential: boolean;
  checkVersionsSequential: boolean;
  allIntakeSlotsCovered: boolean;
  allIntakeGuardsCovered: boolean;
  allRequiredFieldsRequested: boolean;
  requestedFieldCountMatchesIntake: boolean;
  allRequestItemsReady: boolean;
  allAcceptanceChecksReady: boolean;
  allRequestItemsReadOnly: boolean;
  allAcceptanceChecksReadOnly: boolean;
  allRequestsRequireRealCandidateDocument: boolean;
  allChecksRejectMissingCandidateDocument: boolean;
  allChecksRejectSyntheticCandidateDocument: boolean;
  allChecksQuarantineUnreviewedCandidateDocument: boolean;
  allChecksBlockCandidatePayloadImport: boolean;
  allChecksBlockCandidateEvaluation: boolean;
  allChecksBlockCandidateAcceptance: boolean;
  allChecksBlockApprovalGrant: boolean;
  allChecksBlockSignedApproval: boolean;
  allChecksBlockRuntimePayload: boolean;
  allChecksBlockWrites: boolean;
  allChecksBlockSiblingMutation: boolean;
  sourceRealCandidateDocumentStillAbsent: boolean;
  sourceSyntheticCandidateDocumentStillAbsent: boolean;
  requestRealCandidateDocumentStillAbsent: boolean;
  requestPayloadImportStillBlocked: boolean;
  requestEvaluationStillBlocked: boolean;
  requestAcceptanceStillBlocked: boolean;
  sourceDocumentIntakeStillBlocked: boolean;
  sourcePayloadImportStillBlocked: boolean;
  sourceEvaluationStillBlocked: boolean;
  sourceExecutionStillBlocked: boolean;
  sourceWritesStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresRealComparedPackageEvidenceCandidateDocument: boolean;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage {
  candidateDocumentRequestPackageVersion: "Node v1386";
  sourceCandidateIntakeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake[
      "signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion"
    ];
  candidateDocumentRequestPackageState:
    "ready-for-real-compared-package-evidence-candidate-document-request" | "blocked";
  readyForCandidateDocumentRequestPackage: boolean;
  readyForRealComparedPackageEvidenceCandidateDocument: false;
  readyForCandidateDocumentIntake: false;
  readyForCandidatePayloadImport: false;
  readyForCandidateEvaluation: false;
  readyForApprovalGrant: false;
  readyForSignedApproval: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  requestItemCount: number;
  acceptanceCheckCount: number;
  sourceIntakeSlotCount: number;
  sourceIntakeGuardCount: number;
  readyRequestItemCount: number;
  readyAcceptanceCheckCount: number;
  requiredCandidateFieldCount: number;
  requestedCandidateFieldCount: number;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  sourceCandidateIntakeDigest: string;
  requestItems: ControlledReadOnlyShardPreviewCandidateDocumentRequestItem[];
  acceptanceChecks: ControlledReadOnlyShardPreviewCandidateDocumentRequestCheck[];
  gates: ControlledReadOnlyShardPreviewCandidateDocumentRequestGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  candidateDocumentRequestPackageDigest: string;
  candidateDocumentRequestAllowed: false;
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
