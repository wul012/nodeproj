import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion =
  | "Node v1262"
  | "Node v1263"
  | "Node v1264"
  | "Node v1265"
  | "Node v1266"
  | "Node v1267"
  | "Node v1268"
  | "Node v1269"
  | "Node v1270"
  | "Node v1271"
  | "Node v1272"
  | "Node v1273"
  | "Node v1274"
  | "Node v1275"
  | "Node v1276"
  | "Node v1277"
  | "Node v1278"
  | "Node v1279"
  | "Node v1280"
  | "Node v1281"
  | "Node v1282"
  | "Node v1283"
  | "Node v1284"
  | "Node v1285"
  | "Node v1286";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind =
  | "identity-submission-slot"
  | "digest-binding-submission-slot"
  | "signature-envelope-submission-slot"
  | "source-evidence-submission-slot"
  | "value-binding-submission-slot"
  | "policy-submission-slot"
  | "execution-lock-submission-slot"
  | "archive-closeout-submission-slot";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode =
  | "manual-submission-metadata"
  | "digest-comparison-pin"
  | "signature-envelope-submission-check"
  | "policy-submission-check"
  | "execution-lock-submission-check"
  | "submission-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind =
  | "identity-comparison-control"
  | "digest-binding-comparison-control"
  | "signature-envelope-comparison-control"
  | "source-evidence-comparison-control"
  | "value-binding-comparison-control"
  | "policy-comparison-control"
  | "execution-lock-comparison-control"
  | "archive-closeout-comparison-control";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion;
  code: string;
  submissionSlotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode;
  sourceReviewCriterionCode: string;
  sourceReviewControlCode: string;
  sourceReviewCriterionKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind;
  sourceReviewCriterionMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode;
  expectedShape: string;
  submissionRequirement: string;
  comparisonQuestion: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind;
  sourceSubmissionSlotCode: string;
  sourceReviewControlKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind
    | "";
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion;
  code: string;
  submissionSlotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode;
  sourceReviewCriterionCode: string;
  sourceReviewCriterionReady: boolean;
  sourceReviewCriterionKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind
    | "";
  sourceReviewCriterionMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode
    | "";
  sourceReviewCriterionReadOnly: boolean;
  sourceReviewCriterionMaterialized: boolean;
  sourceDraftTextPackageReviewed: boolean;
  sourceDraftTextPackageApproved: boolean;
  sourceDraftTextPackageRejected: boolean;
  sourceSignedDraftTextPresent: boolean;
  sourceDraftSignaturePayloadPresent: boolean;
  sourceApprovalGrantPresent: boolean;
  sourceReviewControlCode: string;
  sourceReviewControlReady: boolean;
  sourceReviewControlKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind
    | "";
  sourceReviewControlReadOnly: boolean;
  sourceReviewControlBlocksDraftTextPackageReview: boolean;
  sourceReviewControlBlocksDraftTextPackageApproval: boolean;
  sourceReviewControlBlocksSignedDraftText: boolean;
  sourceReviewControlBlocksSignaturePayload: boolean;
  sourceReviewControlBlocksApprovalGrant: boolean;
  sourceReviewControlBlocksRuntimePayload: boolean;
  sourceReviewControlBlocksWrites: boolean;
  sourceReviewControlBlocksSiblingMutation: boolean;
  expectedShape: string;
  submissionRequirement: string;
  comparisonQuestion: string;
  readyForManualSignedApprovalDraftTextPackageSubmissionSlot: boolean;
  submissionSlotMaterialized: false;
  draftTextPackageSubmitted: false;
  draftTextPackageCompared: false;
  draftTextPackageAccepted: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind;
  sourceSubmissionSlotCode: string;
  sourceSubmissionSlotReady: boolean;
  sourceReviewControlKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind
    | "";
  guardCode: string;
  guardText: string;
  rejectsUnsubmittedSlot: boolean;
  blocksDraftTextPackageSubmission: true;
  blocksDraftTextPackageComparison: true;
  blocksDraftTextPackageAcceptance: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForManualSignedApprovalDraftTextPackageComparisonControl: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightGates {
  sourceReviewPreflightReady: boolean;
  submissionSlotCountComplete: boolean;
  comparisonControlCountComplete: boolean;
  slotVersionsSequential: boolean;
  controlVersionsSequential: boolean;
  sourceReviewCriteriaReady: boolean;
  sourceReviewControlsReady: boolean;
  allSubmissionSlotsReady: boolean;
  allComparisonControlsReady: boolean;
  allSubmissionRequirementsDeclared: boolean;
  allComparisonQuestionsDeclared: boolean;
  allControlTextsDeclared: boolean;
  allSourceReviewCriteriaReadOnly: boolean;
  allSourceReviewControlsReadOnly: boolean;
  allSubmissionSlotsReadOnly: boolean;
  allComparisonControlsReadOnly: boolean;
  allControlsRejectUnsubmittedSlots: boolean;
  allControlsBlockDraftTextPackageSubmission: boolean;
  allControlsBlockDraftTextPackageComparison: boolean;
  allControlsBlockDraftTextPackageAcceptance: boolean;
  allControlsBlockSignedDraftText: boolean;
  allControlsBlockSignaturePayload: boolean;
  allControlsBlockApprovalGrant: boolean;
  allControlsBlockRuntimePayload: boolean;
  allControlsBlockWrites: boolean;
  allControlsBlockSiblingMutation: boolean;
  sourceReviewPreflightDigestPresent: boolean;
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
  digestSubmissionSlotsReady: boolean;
  sourceStillNoReviewedDraftTextPackage: boolean;
  sourceStillNoApprovedDraftTextPackage: boolean;
  sourceStillNoRejectedDraftTextPackage: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  submissionPreflightReadyButNoPackageSubmitted: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresManualArtifactSubmission: boolean;
  requiresSeparateComparisonReview: boolean;
  requiresDigestRecheckBeforeComparison: boolean;
  requiresSeparateApprovalGrantReview: boolean;
  nextStepRequiresOfflinePackageComparison: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight {
  signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: "Node v1286";
  sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight[
      "signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion"
    ];
  artifactDraftTextPackageSubmissionPreflightState:
    "ready-for-signed-approval-artifact-draft-text-package-submission-preflight" | "blocked";
  readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight: boolean;
  readyForManualSignedApprovalDraftTextPackageSubmission: boolean;
  readyForOfflineSignedApprovalDraftTextPackageComparison: boolean;
  readyForOfflineSignedApprovalDraftTextPackageReview:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight[
      "readyForOfflineSignedApprovalDraftTextPackageReview"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  submissionSlotCount: number;
  comparisonControlCount: number;
  identitySubmissionSlotCount: number;
  digestBindingSubmissionSlotCount: number;
  signatureEnvelopeSubmissionSlotCount: number;
  sourceEvidenceSubmissionSlotCount: number;
  valueBindingSubmissionSlotCount: number;
  policySubmissionSlotCount: number;
  executionLockSubmissionSlotCount: number;
  archiveCloseoutSubmissionSlotCount: number;
  digestModeSubmissionSlotCount: number;
  readySubmissionSlotCount: number;
  readyComparisonControlCount: number;
  digestBindingComparisonControlCount: number;
  signatureEnvelopeComparisonControlCount: number;
  policyComparisonControlCount: number;
  executionLockComparisonControlCount: number;
  archiveCloseoutComparisonControlCount: number;
  expectedDraftTextPackageSubmissionSlotCount: number;
  actualDraftTextPackageSubmissionCount: 0;
  submittedDraftTextPackageCount: 0;
  comparedDraftTextPackageCount: 0;
  acceptedDraftTextPackageCount: 0;
  rejectedDraftTextPackageCount: 0;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest: string;
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
  slots:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot[];
  controls:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
