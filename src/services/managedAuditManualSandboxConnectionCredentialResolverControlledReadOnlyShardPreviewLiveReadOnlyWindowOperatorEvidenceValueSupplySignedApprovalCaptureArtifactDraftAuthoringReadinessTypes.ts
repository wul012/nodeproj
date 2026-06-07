import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessVersion =
  | "Node v1162"
  | "Node v1163"
  | "Node v1164"
  | "Node v1165"
  | "Node v1166"
  | "Node v1167"
  | "Node v1168"
  | "Node v1169"
  | "Node v1170"
  | "Node v1171"
  | "Node v1172"
  | "Node v1173"
  | "Node v1174"
  | "Node v1175"
  | "Node v1176"
  | "Node v1177"
  | "Node v1178"
  | "Node v1179"
  | "Node v1180"
  | "Node v1181"
  | "Node v1182"
  | "Node v1183"
  | "Node v1184"
  | "Node v1185"
  | "Node v1186";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind =
  | "identity-authoring-requirement"
  | "digest-binding-authoring-requirement"
  | "signature-envelope-authoring-requirement"
  | "source-evidence-authoring-requirement"
  | "value-binding-authoring-requirement"
  | "policy-authoring-requirement"
  | "execution-lock-authoring-requirement"
  | "archive-closeout-authoring-requirement";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode =
  | "human-authoring-metadata"
  | "digest-authoring-pin"
  | "policy-authoring-check"
  | "execution-lock-authoring-check"
  | "authoring-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind =
  | "identity-authoring-blocker"
  | "digest-binding-authoring-blocker"
  | "signature-envelope-authoring-blocker"
  | "source-evidence-authoring-blocker"
  | "value-binding-authoring-blocker"
  | "policy-authoring-blocker"
  | "execution-lock-authoring-blocker"
  | "archive-closeout-authoring-blocker";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessVersion;
  code: string;
  authoringRequirementName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind;
  requirementMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode;
  sourcePackageSlotCode: string;
  sourcePackageGuardCode: string;
  requiredPackageSlotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotMode;
  authoringPurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind;
  sourceAuthoringRequirementCode: string;
  blockerCode: string;
  blockerText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessVersion;
  code: string;
  authoringRequirementName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind;
  requirementMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode;
  sourcePackageSlotCode: string;
  sourcePackageSlotReady: boolean;
  sourcePackageSlotKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotKind
    | "";
  sourcePackageSlotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotMode
    | "";
  sourcePackageSlotReadOnly: boolean;
  sourcePackageSlotMaterialized: boolean;
  sourcePackageArtifactCreated: boolean;
  sourceSignedDraftTextPresent: boolean;
  sourceDraftSignaturePayloadPresent: boolean;
  sourceApprovalGrantPresent: boolean;
  sourcePackageGuardCode: string;
  sourcePackageGuardReady: boolean;
  sourcePackageGuardKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardKind
    | "";
  sourcePackageGuardReadOnly: boolean;
  sourcePackageGuardBlocksPackageMaterialization: boolean;
  sourcePackageGuardBlocksSignedDraftText: boolean;
  sourcePackageGuardBlocksSignaturePayload: boolean;
  sourcePackageGuardBlocksApprovalGrant: boolean;
  requiredPackageSlotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotMode;
  requiredPackageSlotModeCovered: boolean;
  authoringPurpose: string;
  readyForHumanSignedApprovalDraftArtifactAuthoringRequirement: boolean;
  authoringInstructionMaterialized: false;
  draftArtifactCreated: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind;
  sourceAuthoringRequirementCode: string;
  sourceAuthoringRequirementReady: boolean;
  blockerCode: string;
  blockerText: string;
  rejectsMissingAuthoringRequirement: boolean;
  blocksAuthoringInstructionMaterialization: true;
  blocksDraftArtifactCreation: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForHumanSignedApprovalDraftArtifactAuthoringBlocker: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates {
  sourceReviewPackagePreflightReady: boolean;
  authoringRequirementCountComplete: boolean;
  authoringBlockerCountComplete: boolean;
  requirementVersionsSequential: boolean;
  blockerVersionsSequential: boolean;
  sourcePackageSlotsReady: boolean;
  sourcePackageGuardsReady: boolean;
  allRequirementsReady: boolean;
  allBlockersReady: boolean;
  allAuthoringPurposesDeclared: boolean;
  allBlockerTextsDeclared: boolean;
  allPackageSlotModesCovered: boolean;
  allSourcePackageSlotsReadOnly: boolean;
  allSourcePackageGuardsReadOnly: boolean;
  allRequirementsReadOnly: boolean;
  allBlockersReadOnly: boolean;
  allBlockersRejectMissingRequirements: boolean;
  allBlockersBlockAuthoringMaterialization: boolean;
  allBlockersBlockDraftArtifactCreation: boolean;
  allBlockersBlockSignedDraftText: boolean;
  allBlockersBlockSignaturePayload: boolean;
  allBlockersBlockApprovalGrant: boolean;
  allBlockersBlockRuntimePayload: boolean;
  allBlockersBlockWrites: boolean;
  allBlockersBlockSiblingMutation: boolean;
  sourceReviewPackagePreflightDigestPresent: boolean;
  sourceReadinessDigestPresent: boolean;
  sourceDraftPreflightDigestPresent: boolean;
  sourceArtifactPreflightDigestPresent: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  digestAuthoringRequirementsReady: boolean;
  sourcePackageStillReadOnly: boolean;
  sourceStillNoPackageMaterialization: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  authoringAllowedButNotMaterialized: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresOfflineHumanDraftAuthoring: boolean;
  requiresDetachedSignatureOutOfBand: boolean;
  requiresDigestRecheckBeforeDraftArtifact: boolean;
  nextStepRequiresManualDraftArtifactPackage: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness {
  signedApprovalCaptureArtifactDraftAuthoringReadinessVersion: "Node v1186";
  sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight[
      "signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion"
    ];
  artifactDraftAuthoringReadinessState:
    "ready-for-signed-approval-artifact-draft-authoring-readiness" | "blocked";
  readyForSignedApprovalArtifactDraftAuthoringReadiness: boolean;
  readyForHumanSignedApprovalDraftArtifactAuthoring: boolean;
  readyForManualSignedApprovalDraftReviewPackage:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight[
      "readyForManualSignedApprovalDraftReviewPackage"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  authoringRequirementCount: number;
  authoringBlockerCount: number;
  identityAuthoringRequirementCount: number;
  digestBindingAuthoringRequirementCount: number;
  signatureEnvelopeAuthoringRequirementCount: number;
  sourceEvidenceAuthoringRequirementCount: number;
  valueBindingAuthoringRequirementCount: number;
  policyAuthoringRequirementCount: number;
  executionLockAuthoringRequirementCount: number;
  archiveCloseoutAuthoringRequirementCount: number;
  digestModeAuthoringRequirementCount: number;
  readyAuthoringRequirementCount: number;
  readyAuthoringBlockerCount: number;
  digestBindingAuthoringBlockerCount: number;
  signatureEnvelopeAuthoringBlockerCount: number;
  policyAuthoringBlockerCount: number;
  executionLockAuthoringBlockerCount: number;
  archiveCloseoutAuthoringBlockerCount: number;
  authoringInstructionMaterializedCount: 0;
  draftArtifactCreated: false;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactPreflightDigest: string;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  requirements:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement[];
  blockers:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker[];
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftAuthoringReadinessDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
