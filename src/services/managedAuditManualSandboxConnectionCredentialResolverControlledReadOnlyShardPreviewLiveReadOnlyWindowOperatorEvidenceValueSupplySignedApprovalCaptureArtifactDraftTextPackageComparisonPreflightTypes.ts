import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion =
  | "Node v1287"
  | "Node v1288"
  | "Node v1289"
  | "Node v1290"
  | "Node v1291"
  | "Node v1292"
  | "Node v1293"
  | "Node v1294"
  | "Node v1295"
  | "Node v1296"
  | "Node v1297"
  | "Node v1298"
  | "Node v1299"
  | "Node v1300"
  | "Node v1301"
  | "Node v1302"
  | "Node v1303"
  | "Node v1304"
  | "Node v1305"
  | "Node v1306"
  | "Node v1307"
  | "Node v1308"
  | "Node v1309"
  | "Node v1310"
  | "Node v1311";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind =
  | "identity-comparison-lane"
  | "digest-binding-comparison-lane"
  | "signature-envelope-comparison-lane"
  | "source-evidence-comparison-lane"
  | "value-binding-comparison-lane"
  | "policy-comparison-lane"
  | "execution-lock-comparison-lane"
  | "archive-closeout-comparison-lane";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode =
  | "metadata-comparison-lane"
  | "digest-recheck-lane"
  | "signature-envelope-comparison-lane"
  | "policy-comparison-lane"
  | "execution-lock-comparison-lane"
  | "comparison-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind =
  | "identity-acceptance-control"
  | "digest-binding-acceptance-control"
  | "signature-envelope-acceptance-control"
  | "source-evidence-acceptance-control"
  | "value-binding-acceptance-control"
  | "policy-acceptance-control"
  | "execution-lock-acceptance-control"
  | "archive-closeout-acceptance-control";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion;
  code: string;
  comparisonLaneName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind;
  laneMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode;
  sourceSubmissionSlotCode: string;
  sourceComparisonControlCode: string;
  sourceSubmissionSlotKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind;
  sourceSubmissionSlotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode;
  requiredComparisonEvidence: string;
  digestRecheckQuestion: string;
  acceptanceQuestion: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind;
  sourceComparisonLaneCode: string;
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion;
  code: string;
  comparisonLaneName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind;
  laneMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode;
  sourceSubmissionSlotCode: string;
  sourceSubmissionSlotReady: boolean;
  sourceSubmissionSlotKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind
    | "";
  sourceSubmissionSlotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode
    | "";
  sourceSubmissionSlotReadOnly: boolean;
  sourceSubmissionSlotMaterialized: boolean;
  sourceDraftTextPackageSubmitted: boolean;
  sourceDraftTextPackageCompared: boolean;
  sourceDraftTextPackageAccepted: boolean;
  sourceDraftTextPackageRejected: boolean;
  sourceSignedDraftTextPresent: boolean;
  sourceDraftSignaturePayloadPresent: boolean;
  sourceApprovalGrantPresent: boolean;
  sourceComparisonControlCode: string;
  sourceComparisonControlReady: boolean;
  sourceComparisonControlKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind
    | "";
  sourceComparisonControlReadOnly: boolean;
  sourceComparisonControlRejectsUnsubmittedSlot: boolean;
  sourceComparisonControlBlocksDraftTextPackageComparison: boolean;
  sourceComparisonControlBlocksDraftTextPackageAcceptance: boolean;
  sourceComparisonControlBlocksSignedDraftText: boolean;
  sourceComparisonControlBlocksSignaturePayload: boolean;
  sourceComparisonControlBlocksApprovalGrant: boolean;
  sourceComparisonControlBlocksRuntimePayload: boolean;
  sourceComparisonControlBlocksWrites: boolean;
  sourceComparisonControlBlocksSiblingMutation: boolean;
  requiredComparisonEvidence: string;
  digestRecheckQuestion: string;
  acceptanceQuestion: string;
  readyForOfflineSignedApprovalDraftTextPackageComparisonLane: boolean;
  comparisonLaneMaterialized: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind;
  sourceComparisonLaneCode: string;
  sourceComparisonLaneReady: boolean;
  guardCode: string;
  guardText: string;
  rejectsUncomparedLane: boolean;
  blocksDraftTextPackageSubmission: true;
  blocksDraftTextPackageComparison: true;
  blocksDraftTextPackageAcceptance: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightGates {
  sourceSubmissionPreflightReady: boolean;
  comparisonLaneCountComplete: boolean;
  acceptanceControlCountComplete: boolean;
  laneVersionsSequential: boolean;
  controlVersionsSequential: boolean;
  sourceSubmissionSlotsReady: boolean;
  sourceComparisonControlsReady: boolean;
  allComparisonLanesReady: boolean;
  allAcceptanceControlsReady: boolean;
  allRequiredComparisonEvidenceDeclared: boolean;
  allDigestRecheckQuestionsDeclared: boolean;
  allAcceptanceQuestionsDeclared: boolean;
  allControlTextsDeclared: boolean;
  allSourceSubmissionSlotsReadOnly: boolean;
  allSourceComparisonControlsReadOnly: boolean;
  allComparisonLanesReadOnly: boolean;
  allAcceptanceControlsReadOnly: boolean;
  allControlsRejectUncomparedLanes: boolean;
  allControlsBlockDraftTextPackageSubmission: boolean;
  allControlsBlockDraftTextPackageComparison: boolean;
  allControlsBlockDraftTextPackageAcceptance: boolean;
  allControlsBlockSignedDraftText: boolean;
  allControlsBlockSignaturePayload: boolean;
  allControlsBlockApprovalGrant: boolean;
  allControlsBlockRuntimePayload: boolean;
  allControlsBlockWrites: boolean;
  allControlsBlockSiblingMutation: boolean;
  sourceSubmissionPreflightDigestPresent: boolean;
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
  digestComparisonLanesReady: boolean;
  sourceStillNoSubmittedDraftTextPackage: boolean;
  sourceStillNoComparedDraftTextPackage: boolean;
  sourceStillNoAcceptedDraftTextPackage: boolean;
  sourceStillNoRejectedDraftTextPackage: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  comparisonPreflightReadyButNoPackageCompared: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresManualArtifactSubmission: boolean;
  requiresOfflinePackageComparison: boolean;
  requiresDigestRecheckBeforeAcceptance: boolean;
  requiresSeparateApprovalGrantReview: boolean;
  nextStepRequiresSubmittedPackageComparison: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight {
  signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: "Node v1311";
  sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight[
      "signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion"
    ];
  artifactDraftTextPackageComparisonPreflightState:
    "ready-for-signed-approval-artifact-draft-text-package-comparison-preflight" | "blocked";
  readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight: boolean;
  readyForOfflineSignedApprovalDraftTextPackageComparison: boolean;
  readyForManualSignedApprovalDraftTextPackageSubmission:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight[
      "readyForManualSignedApprovalDraftTextPackageSubmission"
    ];
  readyForOfflineSignedApprovalDraftTextPackageReview:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight[
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
  comparisonLaneCount: number;
  acceptanceControlCount: number;
  identityComparisonLaneCount: number;
  digestBindingComparisonLaneCount: number;
  signatureEnvelopeComparisonLaneCount: number;
  sourceEvidenceComparisonLaneCount: number;
  valueBindingComparisonLaneCount: number;
  policyComparisonLaneCount: number;
  executionLockComparisonLaneCount: number;
  archiveCloseoutComparisonLaneCount: number;
  digestModeComparisonLaneCount: number;
  readyComparisonLaneCount: number;
  readyAcceptanceControlCount: number;
  digestBindingAcceptanceControlCount: number;
  signatureEnvelopeAcceptanceControlCount: number;
  policyAcceptanceControlCount: number;
  executionLockAcceptanceControlCount: number;
  archiveCloseoutAcceptanceControlCount: number;
  expectedDraftTextPackageComparisonLaneCount: number;
  actualDraftTextPackageComparisonCount: 0;
  submittedDraftTextPackageCount: 0;
  comparedDraftTextPackageCount: 0;
  acceptedDraftTextPackageCount: 0;
  rejectedDraftTextPackageCount: 0;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest: string;
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
  lanes:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane[];
  controls:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
