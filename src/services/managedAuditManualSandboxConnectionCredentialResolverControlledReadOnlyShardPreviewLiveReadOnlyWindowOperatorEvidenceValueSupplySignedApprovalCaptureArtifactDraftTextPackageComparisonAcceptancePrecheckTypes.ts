import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion =
  | "Node v1312"
  | "Node v1313"
  | "Node v1314"
  | "Node v1315"
  | "Node v1316"
  | "Node v1317"
  | "Node v1318"
  | "Node v1319"
  | "Node v1320"
  | "Node v1321";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind =
  | "source-comparison-preflight-acceptance-checkpoint"
  | "identity-acceptance-checkpoint"
  | "digest-binding-acceptance-checkpoint"
  | "signature-envelope-acceptance-checkpoint"
  | "source-evidence-acceptance-checkpoint"
  | "operator-value-acceptance-checkpoint"
  | "policy-acceptance-checkpoint"
  | "execution-lock-acceptance-checkpoint"
  | "approval-grant-review-acceptance-checkpoint"
  | "archive-closeout-acceptance-checkpoint";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointMode =
  | "source-preflight-readiness"
  | "metadata-acceptance-precheck"
  | "digest-acceptance-precheck"
  | "signature-acceptance-precheck"
  | "source-evidence-acceptance-precheck"
  | "value-binding-acceptance-precheck"
  | "policy-acceptance-precheck"
  | "execution-lock-acceptance-precheck"
  | "approval-grant-review-precheck"
  | "acceptance-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind =
  | "source-comparison-preflight-acceptance-guard"
  | "identity-acceptance-guard"
  | "digest-binding-acceptance-guard"
  | "signature-envelope-acceptance-guard"
  | "source-evidence-acceptance-guard"
  | "operator-value-acceptance-guard"
  | "policy-acceptance-guard"
  | "execution-lock-acceptance-guard"
  | "approval-grant-review-acceptance-guard"
  | "archive-closeout-acceptance-guard";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion;
  code: string;
  checkpointName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind;
  checkpointMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointMode;
  sourceLaneKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind[];
  sourceLaneModes:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode[];
  sourceAcceptanceControlKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind[];
  acceptancePrecheckQuestion: string;
  requiredAcceptanceEvidence: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind;
  sourceCheckpointCode: string;
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion;
  code: string;
  checkpointName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind;
  checkpointMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointMode;
  sourceLaneKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind[];
  sourceLaneModes:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode[];
  sourceAcceptanceControlKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind[];
  sourceComparisonLaneCount: number;
  sourceAcceptanceControlCount: number;
  readySourceComparisonLaneCount: number;
  readySourceAcceptanceControlCount: number;
  sourceComparisonPreflightReady: boolean;
  sourceComparisonPreflightReadOnly: boolean;
  sourceStillNoComparedDraftTextPackage: boolean;
  sourceStillNoAcceptedDraftTextPackage: boolean;
  sourceStillNoRejectedDraftTextPackage: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  acceptancePrecheckQuestion: string;
  requiredAcceptanceEvidence: string;
  readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint: boolean;
  acceptanceCheckpointMaterialized: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind;
  sourceCheckpointCode: string;
  sourceCheckpointReady: boolean;
  guardCode: string;
  guardText: string;
  rejectsMissingAcceptanceEvidence: boolean;
  blocksDraftTextPackageSubmission: true;
  blocksDraftTextPackageComparison: true;
  blocksDraftTextPackageAcceptance: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGates {
  sourceComparisonPreflightReady: boolean;
  checkpointCountComplete: boolean;
  guardCountComplete: boolean;
  checkpointVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  allCheckpointsReady: boolean;
  allGuardsReady: boolean;
  allCheckpointQuestionsDeclared: boolean;
  allRequiredAcceptanceEvidenceDeclared: boolean;
  allGuardTextsDeclared: boolean;
  allSourceComparisonLanesCovered: boolean;
  allSourceAcceptanceControlsCovered: boolean;
  sourceComparisonLaneCountStillTwentyFive: boolean;
  sourceAcceptanceControlCountStillTwentyFive: boolean;
  sourceReadyComparisonLaneCountStillTwentyFive: boolean;
  sourceReadyAcceptanceControlCountStillTwentyFive: boolean;
  digestCheckpointsCoverDigestLanes: boolean;
  executionLockCheckpointCoversExecutionLocks: boolean;
  archiveCloseoutCheckpointPresent: boolean;
  sourceComparisonPreflightDigestPresent: boolean;
  sourceSubmissionPreflightDigestPresent: boolean;
  sourceReviewPreflightDigestPresent: boolean;
  allCheckpointsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allGuardsRejectMissingAcceptanceEvidence: boolean;
  allGuardsBlockDraftTextPackageSubmission: boolean;
  allGuardsBlockDraftTextPackageComparison: boolean;
  allGuardsBlockDraftTextPackageAcceptance: boolean;
  allGuardsBlockSignedDraftText: boolean;
  allGuardsBlockSignaturePayload: boolean;
  allGuardsBlockApprovalGrant: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  sourceStillNoSubmittedDraftTextPackage: boolean;
  sourceStillNoComparedDraftTextPackage: boolean;
  sourceStillNoAcceptedDraftTextPackage: boolean;
  sourceStillNoRejectedDraftTextPackage: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  acceptancePrecheckReadyButNoPackageAccepted: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresSubmittedPackageBeforeAcceptance: boolean;
  requiresOfflinePackageComparisonBeforeAcceptance: boolean;
  requiresSeparateApprovalGrantReviewBeforeAcceptance: boolean;
  nextStepRequiresManualComparedPackageEvidence: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck {
  signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321";
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight[
      "signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion"
    ];
  artifactDraftTextPackageComparisonAcceptancePrecheckState:
    "ready-for-signed-approval-artifact-draft-text-package-comparison-acceptance-precheck" | "blocked";
  readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck: boolean;
  readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck: boolean;
  readyForOfflineSignedApprovalDraftTextPackageComparison:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight[
      "readyForOfflineSignedApprovalDraftTextPackageComparison"
    ];
  readyForManualSignedApprovalDraftTextPackageSubmission:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight[
      "readyForManualSignedApprovalDraftTextPackageSubmission"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  checkpointCount: number;
  guardCount: number;
  sourceComparisonLaneCount: number;
  sourceAcceptanceControlCount: number;
  readyCheckpointCount: number;
  readyGuardCount: number;
  sourceReadinessCheckpointCount: number;
  identityCheckpointCount: number;
  digestBindingCheckpointCount: number;
  signatureEnvelopeCheckpointCount: number;
  sourceEvidenceCheckpointCount: number;
  operatorValueCheckpointCount: number;
  policyCheckpointCount: number;
  executionLockCheckpointCount: number;
  approvalGrantReviewCheckpointCount: number;
  archiveCloseoutCheckpointCount: number;
  expectedDraftTextPackageAcceptanceCheckpointCount: number;
  actualDraftTextPackageAcceptanceEvidenceCount: 0;
  submittedDraftTextPackageCount: 0;
  comparedDraftTextPackageCount: 0;
  acceptedDraftTextPackageCount: 0;
  rejectedDraftTextPackageCount: 0;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest: string;
  checkpoints:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuard[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
