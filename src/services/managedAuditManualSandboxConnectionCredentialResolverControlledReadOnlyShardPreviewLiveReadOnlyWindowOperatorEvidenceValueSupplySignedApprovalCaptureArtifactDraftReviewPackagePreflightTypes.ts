import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion =
  | "Node v1137"
  | "Node v1138"
  | "Node v1139"
  | "Node v1140"
  | "Node v1141"
  | "Node v1142"
  | "Node v1143"
  | "Node v1144"
  | "Node v1145"
  | "Node v1146"
  | "Node v1147"
  | "Node v1148"
  | "Node v1149"
  | "Node v1150"
  | "Node v1151"
  | "Node v1152"
  | "Node v1153"
  | "Node v1154"
  | "Node v1155"
  | "Node v1156"
  | "Node v1157"
  | "Node v1158"
  | "Node v1159"
  | "Node v1160"
  | "Node v1161";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotKind =
  | "identity-review-package-slot"
  | "digest-binding-review-package-slot"
  | "signature-envelope-review-package-slot"
  | "source-evidence-review-package-slot"
  | "value-binding-review-package-slot"
  | "policy-review-package-slot"
  | "execution-lock-review-package-slot"
  | "archive-closeout-review-package-slot";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotMode =
  | "manual-review-package-entry"
  | "digest-review-package-entry"
  | "policy-review-package-entry"
  | "execution-lock-review-package-entry"
  | "archive-closeout-review-package-entry";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardKind =
  | "identity-review-package-guard"
  | "digest-binding-review-package-guard"
  | "signature-envelope-review-package-guard"
  | "source-evidence-review-package-guard"
  | "value-binding-review-package-guard"
  | "policy-review-package-guard"
  | "execution-lock-review-package-guard"
  | "archive-closeout-review-package-guard";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion;
  code: string;
  packageSlotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotMode;
  sourceReadinessLaneCode: string;
  sourceReadinessControlCode: string;
  requiredReadinessLaneMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneMode;
  reviewPackagePurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardKind;
  sourcePackageSlotCode: string;
  blockerCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion;
  code: string;
  packageSlotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotMode;
  sourceReadinessLaneCode: string;
  sourceReadinessLaneReady: boolean;
  sourceReadinessLaneKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneKind
    | "";
  sourceReadinessLaneMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneMode
    | "";
  sourceReadinessLaneReadOnly: boolean;
  sourceReadinessLaneManualReviewRequired: boolean;
  sourceReadinessLaneManualDraftMaterialized: boolean;
  sourceReadinessControlCode: string;
  sourceReadinessControlReady: boolean;
  sourceReadinessControlKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlKind
    | "";
  sourceReadinessControlReadOnly: boolean;
  sourceReadinessControlBlocksAutoMaterialization: boolean;
  sourceReadinessControlBlocksSignedApprovalCapture: boolean;
  sourceReadinessControlBlocksRuntimePayload: boolean;
  requiredReadinessLaneMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneMode;
  requiredReadinessLaneModeCovered: boolean;
  reviewPackagePurpose: string;
  readyForManualSignedApprovalDraftReviewPackageSlot: boolean;
  packageSlotMaterialized: false;
  packageArtifactCreated: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardKind;
  sourcePackageSlotCode: string;
  sourcePackageSlotReady: boolean;
  blockerCode: string;
  guardText: string;
  rejectsMissingReviewPackageSlot: boolean;
  blocksPackageMaterialization: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForManualSignedApprovalDraftReviewPackageGuard: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates {
  sourceArtifactDraftReadinessReady: boolean;
  packageSlotCountComplete: boolean;
  packageGuardCountComplete: boolean;
  slotVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  sourceReadinessLanesReady: boolean;
  sourceReadinessControlsReady: boolean;
  allSlotsReady: boolean;
  allGuardsReady: boolean;
  allSlotPurposesDeclared: boolean;
  allGuardTextsDeclared: boolean;
  allReadinessLaneModesCovered: boolean;
  allSourceReadinessLanesReadOnly: boolean;
  allSourceReadinessControlsReadOnly: boolean;
  allSlotsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allGuardsRejectMissingPackageSlots: boolean;
  allGuardsBlockPackageMaterialization: boolean;
  allGuardsBlockSignedDraftText: boolean;
  allGuardsBlockSignaturePayload: boolean;
  allGuardsBlockApprovalGrant: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  sourceReadinessDigestPresent: boolean;
  sourceDraftPreflightDigestPresent: boolean;
  sourceArtifactPreflightDigestPresent: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  digestPackageSlotsReady: boolean;
  sourceReadinessStillReadOnly: boolean;
  sourceStillNoDraftMaterialization: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  sourceStillNoSignedApproval: boolean;
  reviewPackageAllowedButNotMaterialized: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresHumanDraftArtifactAuthoring: boolean;
  requiresDetachedSignatureOutOfBand: boolean;
  requiresDigestRecheckBeforeDraftMaterialization: boolean;
  requiresSiblingNonMutationEvidence: boolean;
  nextStepRequiresManualDraftArtifactAuthoring: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight {
  signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: "Node v1161";
  sourceSignedApprovalCaptureArtifactDraftReadinessVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness[
      "signedApprovalCaptureArtifactDraftReadinessVersion"
    ];
  artifactDraftReviewPackagePreflightState:
    "ready-for-signed-approval-artifact-draft-review-package-preflight" | "blocked";
  readyForSignedApprovalArtifactDraftReviewPackagePreflight: boolean;
  readyForManualSignedApprovalDraftReviewPackage: boolean;
  readyForManualSignedApprovalDraftReview:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness[
      "readyForManualSignedApprovalDraftReview"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  packageSlotCount: number;
  packageGuardCount: number;
  identityReviewPackageSlotCount: number;
  digestBindingReviewPackageSlotCount: number;
  signatureEnvelopeReviewPackageSlotCount: number;
  sourceEvidenceReviewPackageSlotCount: number;
  valueBindingReviewPackageSlotCount: number;
  policyReviewPackageSlotCount: number;
  executionLockReviewPackageSlotCount: number;
  archiveCloseoutReviewPackageSlotCount: number;
  digestModeReviewPackageSlotCount: number;
  readyPackageSlotCount: number;
  readyPackageGuardCount: number;
  digestBindingReviewPackageGuardCount: number;
  signatureEnvelopeReviewPackageGuardCount: number;
  policyReviewPackageGuardCount: number;
  executionLockReviewPackageGuardCount: number;
  archiveCloseoutReviewPackageGuardCount: number;
  packageSlotMaterializedCount: 0;
  packageArtifactCreated: false;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactPreflightDigest: string;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  slots:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard[];
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
