import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion =
  | "Node v1237"
  | "Node v1238"
  | "Node v1239"
  | "Node v1240"
  | "Node v1241"
  | "Node v1242"
  | "Node v1243"
  | "Node v1244"
  | "Node v1245"
  | "Node v1246"
  | "Node v1247"
  | "Node v1248"
  | "Node v1249"
  | "Node v1250"
  | "Node v1251"
  | "Node v1252"
  | "Node v1253"
  | "Node v1254"
  | "Node v1255"
  | "Node v1256"
  | "Node v1257"
  | "Node v1258"
  | "Node v1259"
  | "Node v1260"
  | "Node v1261";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind =
  | "identity-review-criterion"
  | "digest-binding-review-criterion"
  | "signature-envelope-review-criterion"
  | "source-evidence-review-criterion"
  | "value-binding-review-criterion"
  | "policy-review-criterion"
  | "execution-lock-review-criterion"
  | "archive-closeout-review-criterion";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode =
  | "offline-review-metadata"
  | "digest-review-pin"
  | "signature-envelope-review-check"
  | "policy-review-check"
  | "execution-lock-review-check"
  | "review-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind =
  | "identity-review-control"
  | "digest-binding-review-control"
  | "signature-envelope-review-control"
  | "source-evidence-review-control"
  | "value-binding-review-control"
  | "policy-review-control"
  | "execution-lock-review-control"
  | "archive-closeout-review-control";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion;
  code: string;
  reviewCriterionName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind;
  criterionMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode;
  sourceIntakeFieldCode: string;
  sourceIntakeGuardCode: string;
  sourceIntakeFieldKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind;
  sourceIntakeFieldMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode;
  expectedShape: string;
  reviewPurpose: string;
  reviewQuestion: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind;
  sourceReviewCriterionCode: string;
  sourceIntakeGuardKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind
    | "";
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion;
  code: string;
  reviewCriterionName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind;
  criterionMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode;
  sourceIntakeFieldCode: string;
  sourceIntakeFieldReady: boolean;
  sourceIntakeFieldKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind
    | "";
  sourceIntakeFieldMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode
    | "";
  sourceIntakeFieldReadOnly: boolean;
  sourceDraftTextPackageFieldMaterialized: boolean;
  sourceDraftTextPackageAccepted: boolean;
  sourceSignedDraftTextPresent: boolean;
  sourceDraftSignaturePayloadPresent: boolean;
  sourceApprovalGrantPresent: boolean;
  sourceIntakeGuardCode: string;
  sourceIntakeGuardReady: boolean;
  sourceIntakeGuardKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind
    | "";
  sourceIntakeGuardReadOnly: boolean;
  sourceIntakeGuardBlocksDraftTextPackageAcceptance: boolean;
  sourceIntakeGuardBlocksSignedDraftText: boolean;
  sourceIntakeGuardBlocksSignaturePayload: boolean;
  sourceIntakeGuardBlocksApprovalGrant: boolean;
  sourceIntakeGuardBlocksRuntimePayload: boolean;
  sourceIntakeGuardBlocksWrites: boolean;
  sourceIntakeGuardBlocksSiblingMutation: boolean;
  expectedShape: string;
  reviewPurpose: string;
  reviewQuestion: string;
  readyForOfflineSignedApprovalDraftTextPackageReviewCriterion: boolean;
  reviewCriterionMaterialized: false;
  draftTextPackageReviewed: false;
  draftTextPackageApproved: false;
  draftTextPackageRejected: false;
  signedDraftTextPresent: false;
  draftSignaturePayloadPresent: false;
  approvalGrantPresent: false;
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind;
  sourceReviewCriterionCode: string;
  sourceReviewCriterionReady: boolean;
  sourceIntakeGuardKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind
    | "";
  guardCode: string;
  guardText: string;
  rejectsUnreviewableCriterion: boolean;
  blocksDraftTextPackageReview: true;
  blocksDraftTextPackageApproval: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForOfflineSignedApprovalDraftTextPackageReviewControl: boolean;
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightGates {
  sourceTextPackageIntakeReady: boolean;
  reviewCriterionCountComplete: boolean;
  reviewControlCountComplete: boolean;
  criterionVersionsSequential: boolean;
  controlVersionsSequential: boolean;
  sourceIntakeFieldsReady: boolean;
  sourceIntakeGuardsReady: boolean;
  allReviewCriteriaReady: boolean;
  allReviewControlsReady: boolean;
  allReviewQuestionsDeclared: boolean;
  allReviewPurposesDeclared: boolean;
  allControlTextsDeclared: boolean;
  allSourceIntakeFieldsReadOnly: boolean;
  allSourceIntakeGuardsReadOnly: boolean;
  allCriteriaReadOnly: boolean;
  allControlsReadOnly: boolean;
  allControlsRejectUnreviewableCriteria: boolean;
  allControlsBlockDraftTextPackageReview: boolean;
  allControlsBlockDraftTextPackageApproval: boolean;
  allControlsBlockSignedDraftText: boolean;
  allControlsBlockSignaturePayload: boolean;
  allControlsBlockApprovalGrant: boolean;
  allControlsBlockRuntimePayload: boolean;
  allControlsBlockWrites: boolean;
  allControlsBlockSiblingMutation: boolean;
  sourceTextPackageIntakeDigestPresent: boolean;
  sourceInstructionPreflightDigestPresent: boolean;
  sourceAuthoringReadinessDigestPresent: boolean;
  sourceReviewPackageDigestPresent: boolean;
  sourceDraftReadinessDigestPresent: boolean;
  sourceDraftPreflightDigestPresent: boolean;
  sourceArtifactPreflightDigestPresent: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  digestReviewCriteriaReady: boolean;
  sourceStillNoActualDraftTextPackageFields: boolean;
  sourceStillNoAcceptedDraftTextPackage: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  reviewPreflightReadyButNoPackageReviewed: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresOfflineArtifactReview: boolean;
  requiresSeparateHumanReviewer: boolean;
  requiresDigestRecheckBeforeReview: boolean;
  requiresSeparateApprovalGrantReview: boolean;
  nextStepRequiresManualArtifactSubmission: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight {
  signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: "Node v1261";
  sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake[
      "signedApprovalCaptureArtifactDraftTextPackageIntakeVersion"
    ];
  artifactDraftTextPackageReviewPreflightState:
    "ready-for-signed-approval-artifact-draft-text-package-review-preflight" | "blocked";
  readyForSignedApprovalArtifactDraftTextPackageReviewPreflight: boolean;
  readyForOfflineSignedApprovalDraftTextPackageReview: boolean;
  readyForHumanSignedApprovalDraftTextPackageSubmission:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake[
      "readyForHumanSignedApprovalDraftTextPackageSubmission"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  reviewCriterionCount: number;
  reviewControlCount: number;
  identityReviewCriterionCount: number;
  digestBindingReviewCriterionCount: number;
  signatureEnvelopeReviewCriterionCount: number;
  sourceEvidenceReviewCriterionCount: number;
  valueBindingReviewCriterionCount: number;
  policyReviewCriterionCount: number;
  executionLockReviewCriterionCount: number;
  archiveCloseoutReviewCriterionCount: number;
  digestModeReviewCriterionCount: number;
  readyReviewCriterionCount: number;
  readyReviewControlCount: number;
  digestBindingReviewControlCount: number;
  signatureEnvelopeReviewControlCount: number;
  policyReviewControlCount: number;
  executionLockReviewControlCount: number;
  archiveCloseoutReviewControlCount: number;
  expectedDraftTextPackageFieldCount: number;
  actualDraftTextPackageFieldCount: 0;
  acceptedDraftTextPackageCount: 0;
  reviewedDraftTextPackageCount: 0;
  approvedDraftTextPackageCount: 0;
  rejectedDraftTextPackageCount: 0;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest: string;
  sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactPreflightDigest: string;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  criteria:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion[];
  controls:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
