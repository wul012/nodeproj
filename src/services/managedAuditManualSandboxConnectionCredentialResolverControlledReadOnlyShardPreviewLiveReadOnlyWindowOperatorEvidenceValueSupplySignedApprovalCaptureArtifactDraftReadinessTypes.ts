import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessVersion =
  | "Node v1112"
  | "Node v1113"
  | "Node v1114"
  | "Node v1115"
  | "Node v1116"
  | "Node v1117"
  | "Node v1118"
  | "Node v1119"
  | "Node v1120"
  | "Node v1121"
  | "Node v1122"
  | "Node v1123"
  | "Node v1124"
  | "Node v1125"
  | "Node v1126"
  | "Node v1127"
  | "Node v1128"
  | "Node v1129"
  | "Node v1130"
  | "Node v1131"
  | "Node v1132"
  | "Node v1133"
  | "Node v1134"
  | "Node v1135"
  | "Node v1136";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneKind =
  | "identity-readiness-lane"
  | "digest-binding-readiness-lane"
  | "signature-envelope-readiness-lane"
  | "source-evidence-readiness-lane"
  | "value-binding-readiness-lane"
  | "policy-readiness-lane"
  | "execution-lock-readiness-lane"
  | "archive-closeout-readiness-lane";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneMode =
  | "manual-review"
  | "digest-pin"
  | "policy-check"
  | "execution-lock"
  | "archive-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlKind =
  | "identity-readiness-control"
  | "digest-binding-readiness-control"
  | "signature-envelope-readiness-control"
  | "source-evidence-readiness-control"
  | "value-binding-readiness-control"
  | "policy-readiness-control"
  | "execution-lock-readiness-control"
  | "archive-closeout-readiness-control";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessVersion;
  code: string;
  laneName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneKind;
  laneMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneMode;
  sourceDraftFieldCode: string;
  sourceDraftGuardCode: string;
  requiredSourceFieldName: string;
  readinessPurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlKind;
  sourceReadinessLaneCode: string;
  blockerCode: string;
  controlText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessVersion;
  code: string;
  laneName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneKind;
  laneMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneMode;
  sourceDraftFieldCode: string;
  sourceDraftFieldName: string;
  sourceDraftFieldReady: boolean;
  sourceDraftFieldStillPreflightOnly: boolean;
  sourceDraftGuardCode: string;
  sourceDraftGuardReady: boolean;
  sourceDraftGuardBlocksUnsignedDraft: boolean;
  sourceDraftGuardBlocksAutoCapture: boolean;
  requiredSourceFieldName: string;
  requiredSourceFieldCovered: boolean;
  readinessPurpose: string;
  manualDraftReviewRequired: true;
  manualDraftMaterialized: false;
  readyForManualSignedApprovalDraftReadinessLane: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlKind;
  sourceReadinessLaneCode: string;
  sourceReadinessLaneReady: boolean;
  blockerCode: string;
  controlText: string;
  rejectsMissingManualDraftReview: boolean;
  blocksAutoMaterialization: true;
  blocksSignedApprovalCapture: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForManualSignedApprovalDraftReadinessControl: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates {
  sourceArtifactDraftPreflightReady: boolean;
  readinessLaneCountComplete: boolean;
  readinessControlCountComplete: boolean;
  laneVersionsSequential: boolean;
  controlVersionsSequential: boolean;
  sourceDraftFieldsReady: boolean;
  sourceDraftGuardsReady: boolean;
  allLanesReady: boolean;
  allControlsReady: boolean;
  allLanePurposesDeclared: boolean;
  allControlTextsDeclared: boolean;
  allSourceFieldsCovered: boolean;
  allSourceGuardsCovered: boolean;
  allDigestBindingsPresent: boolean;
  sourceDraftPreflightDigestPresent: boolean;
  sourceArtifactPreflightDigestPresent: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  sourcePreflightStillReadinessOnly: boolean;
  sourceStillDoesNotCreateDraft: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  sourceStillNoSignedApproval: boolean;
  manualDraftReviewAllowedButNotMaterialized: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  allLanesReadOnly: boolean;
  allControlsReadOnly: boolean;
  allControlsBlockMissingManualDraftReview: boolean;
  allControlsBlockAutoMaterialization: boolean;
  allControlsBlockSignedApprovalCapture: boolean;
  allControlsBlockRuntimePayload: boolean;
  allControlsBlockWrites: boolean;
  allControlsBlockSiblingMutation: boolean;
  noSideEffectsAllowed: boolean;
  requiresHumanDraftAuthoring: boolean;
  requiresDigestRecheckBeforeCapture: boolean;
  requiresSiblingNonMutationEvidence: boolean;
  nextStepRequiresManualDraftArtifactPackage: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness {
  signedApprovalCaptureArtifactDraftReadinessVersion: "Node v1136";
  sourceSignedApprovalCaptureArtifactDraftPreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight[
      "signedApprovalCaptureArtifactDraftPreflightVersion"
    ];
  artifactDraftReadinessState: "ready-for-signed-approval-artifact-draft-readiness" | "blocked";
  readyForSignedApprovalArtifactDraftReadiness: boolean;
  readyForManualSignedApprovalDraftReview: boolean;
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  readinessLaneCount: number;
  readinessControlCount: number;
  identityReadinessLaneCount: number;
  digestBindingReadinessLaneCount: number;
  signatureEnvelopeReadinessLaneCount: number;
  sourceEvidenceReadinessLaneCount: number;
  valueBindingReadinessLaneCount: number;
  policyReadinessLaneCount: number;
  executionLockReadinessLaneCount: number;
  archiveCloseoutReadinessLaneCount: number;
  readyReadinessLaneCount: number;
  readyReadinessControlCount: number;
  digestBindingReadinessControlCount: number;
  signatureEnvelopeReadinessControlCount: number;
  policyReadinessControlCount: number;
  executionLockReadinessControlCount: number;
  archiveCloseoutReadinessControlCount: number;
  manualDraftMaterializedCount: 0;
  draftArtifactCreated: false;
  draftArtifactMaterializedCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactPreflightDigest: string;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  lanes:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane[];
  controls:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl[];
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftReadinessDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
