import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightVersion =
  | "Node v1187"
  | "Node v1188"
  | "Node v1189"
  | "Node v1190"
  | "Node v1191"
  | "Node v1192"
  | "Node v1193"
  | "Node v1194"
  | "Node v1195"
  | "Node v1196"
  | "Node v1197"
  | "Node v1198"
  | "Node v1199"
  | "Node v1200"
  | "Node v1201"
  | "Node v1202"
  | "Node v1203"
  | "Node v1204"
  | "Node v1205"
  | "Node v1206"
  | "Node v1207"
  | "Node v1208"
  | "Node v1209"
  | "Node v1210"
  | "Node v1211";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind =
  | "identity-instruction-slot"
  | "digest-binding-instruction-slot"
  | "signature-envelope-instruction-slot"
  | "source-evidence-instruction-slot"
  | "value-binding-instruction-slot"
  | "policy-instruction-slot"
  | "execution-lock-instruction-slot"
  | "archive-closeout-instruction-slot";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode =
  | "human-instruction-metadata"
  | "digest-instruction-pin"
  | "policy-instruction-check"
  | "execution-lock-instruction-check"
  | "instruction-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind =
  | "identity-instruction-guard"
  | "digest-binding-instruction-guard"
  | "signature-envelope-instruction-guard"
  | "source-evidence-instruction-guard"
  | "value-binding-instruction-guard"
  | "policy-instruction-guard"
  | "execution-lock-instruction-guard"
  | "archive-closeout-instruction-guard";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightVersion;
  code: string;
  instructionSlotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode;
  sourceAuthoringRequirementCode: string;
  sourceAuthoringBlockerCode: string;
  sourceAuthoringRequirementKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind;
  sourceAuthoringRequirementMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode;
  instructionPurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind;
  sourceInstructionSlotCode: string;
  sourceAuthoringBlockerKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind;
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightVersion;
  code: string;
  instructionSlotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode;
  sourceAuthoringRequirementCode: string;
  sourceAuthoringRequirementReady: boolean;
  sourceAuthoringRequirementKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind
    | "";
  sourceAuthoringRequirementMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode
    | "";
  sourceAuthoringRequirementReadOnly: boolean;
  sourceAuthoringInstructionMaterialized: boolean;
  sourceDraftArtifactCreated: boolean;
  sourceSignedDraftTextPresent: boolean;
  sourceDraftSignaturePayloadPresent: boolean;
  sourceApprovalGrantPresent: boolean;
  sourceAuthoringBlockerCode: string;
  sourceAuthoringBlockerReady: boolean;
  sourceAuthoringBlockerKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind
    | "";
  sourceAuthoringBlockerReadOnly: boolean;
  sourceAuthoringBlockerBlocksInstructionMaterialization: boolean;
  sourceAuthoringBlockerBlocksDraftArtifactCreation: boolean;
  sourceAuthoringBlockerBlocksSignedDraftText: boolean;
  sourceAuthoringBlockerBlocksSignaturePayload: boolean;
  sourceAuthoringBlockerBlocksApprovalGrant: boolean;
  sourceAuthoringBlockerBlocksRuntimePayload: boolean;
  sourceAuthoringBlockerBlocksWrites: boolean;
  sourceAuthoringBlockerBlocksSiblingMutation: boolean;
  instructionPurpose: string;
  readyForHumanSignedApprovalDraftInstructionSlot: boolean;
  instructionMaterialized: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind;
  sourceInstructionSlotCode: string;
  sourceInstructionSlotReady: boolean;
  sourceAuthoringBlockerKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind
    | "";
  guardCode: string;
  guardText: string;
  rejectsMissingInstructionSlot: boolean;
  blocksInstructionMaterialization: true;
  blocksDraftArtifactCreation: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForHumanSignedApprovalDraftInstructionGuard: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates {
  sourceAuthoringReadinessReady: boolean;
  instructionSlotCountComplete: boolean;
  instructionGuardCountComplete: boolean;
  slotVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  sourceAuthoringRequirementsReady: boolean;
  sourceAuthoringBlockersReady: boolean;
  allInstructionSlotsReady: boolean;
  allInstructionGuardsReady: boolean;
  allInstructionPurposesDeclared: boolean;
  allGuardTextsDeclared: boolean;
  allSourceRequirementsReadOnly: boolean;
  allSourceBlockersReadOnly: boolean;
  allSlotsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allGuardsRejectMissingInstructions: boolean;
  allGuardsBlockInstructionMaterialization: boolean;
  allGuardsBlockDraftArtifactCreation: boolean;
  allGuardsBlockSignedDraftText: boolean;
  allGuardsBlockSignaturePayload: boolean;
  allGuardsBlockApprovalGrant: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  sourceAuthoringReadinessDigestPresent: boolean;
  sourceReviewPackageDigestPresent: boolean;
  sourceDraftReadinessDigestPresent: boolean;
  sourceDraftPreflightDigestPresent: boolean;
  sourceArtifactPreflightDigestPresent: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  digestInstructionSlotsReady: boolean;
  sourceStillNoInstructionMaterialization: boolean;
  sourceStillNoDraftArtifact: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  instructionPreflightReadyButUnmaterialized: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresOfflineHumanInstructionAuthoring: boolean;
  requiresSeparateDraftTextPackage: boolean;
  requiresDetachedSignatureOutOfBand: boolean;
  requiresDigestRecheckBeforeDraftText: boolean;
  nextStepRequiresManualDraftTextPackage: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight {
  signedApprovalCaptureArtifactDraftInstructionPreflightVersion: "Node v1211";
  sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness[
      "signedApprovalCaptureArtifactDraftAuthoringReadinessVersion"
    ];
  artifactDraftInstructionPreflightState:
    "ready-for-signed-approval-artifact-draft-instruction-preflight" | "blocked";
  readyForSignedApprovalArtifactDraftInstructionPreflight: boolean;
  readyForHumanSignedApprovalDraftInstructionAuthoring: boolean;
  readyForHumanSignedApprovalDraftArtifactAuthoring:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness[
      "readyForHumanSignedApprovalDraftArtifactAuthoring"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  instructionSlotCount: number;
  instructionGuardCount: number;
  identityInstructionSlotCount: number;
  digestBindingInstructionSlotCount: number;
  signatureEnvelopeInstructionSlotCount: number;
  sourceEvidenceInstructionSlotCount: number;
  valueBindingInstructionSlotCount: number;
  policyInstructionSlotCount: number;
  executionLockInstructionSlotCount: number;
  archiveCloseoutInstructionSlotCount: number;
  digestModeInstructionSlotCount: number;
  readyInstructionSlotCount: number;
  readyInstructionGuardCount: number;
  digestBindingInstructionGuardCount: number;
  signatureEnvelopeInstructionGuardCount: number;
  policyInstructionGuardCount: number;
  executionLockInstructionGuardCount: number;
  archiveCloseoutInstructionGuardCount: number;
  draftInstructionMaterializedCount: 0;
  draftArtifactCreated: false;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactPreflightDigest: string;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  slots:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftInstructionPreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
