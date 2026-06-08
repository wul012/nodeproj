import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeVersion =
  | "Node v1212"
  | "Node v1213"
  | "Node v1214"
  | "Node v1215"
  | "Node v1216"
  | "Node v1217"
  | "Node v1218"
  | "Node v1219"
  | "Node v1220"
  | "Node v1221"
  | "Node v1222"
  | "Node v1223"
  | "Node v1224"
  | "Node v1225"
  | "Node v1226"
  | "Node v1227"
  | "Node v1228"
  | "Node v1229"
  | "Node v1230"
  | "Node v1231"
  | "Node v1232"
  | "Node v1233"
  | "Node v1234"
  | "Node v1235"
  | "Node v1236";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind =
  | "identity-intake-field"
  | "digest-binding-intake-field"
  | "signature-envelope-intake-field"
  | "source-evidence-intake-field"
  | "value-binding-intake-field"
  | "policy-intake-field"
  | "execution-lock-intake-field"
  | "archive-closeout-intake-field";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode =
  | "text-package-metadata"
  | "digest-intake-pin"
  | "signature-envelope-intake-check"
  | "policy-intake-check"
  | "execution-lock-intake-check"
  | "intake-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind =
  | "identity-intake-guard"
  | "digest-binding-intake-guard"
  | "signature-envelope-intake-guard"
  | "source-evidence-intake-guard"
  | "value-binding-intake-guard"
  | "policy-intake-guard"
  | "execution-lock-intake-guard"
  | "archive-closeout-intake-guard";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeVersion;
  code: string;
  intakeFieldName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind;
  fieldMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode;
  sourceInstructionSlotCode: string;
  sourceInstructionGuardCode: string;
  sourceInstructionSlotKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind;
  sourceInstructionSlotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode;
  expectedShape: string;
  intakePurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind;
  sourceIntakeFieldCode: string;
  sourceInstructionGuardKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind
    | "";
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeVersion;
  code: string;
  intakeFieldName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind;
  fieldMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode;
  sourceInstructionSlotCode: string;
  sourceInstructionSlotReady: boolean;
  sourceInstructionSlotKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind
    | "";
  sourceInstructionSlotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode
    | "";
  sourceInstructionSlotReadOnly: boolean;
  sourceInstructionMaterialized: boolean;
  sourceDraftArtifactCreated: boolean;
  sourceSignedDraftTextPresent: boolean;
  sourceDraftSignaturePayloadPresent: boolean;
  sourceApprovalGrantPresent: boolean;
  sourceInstructionGuardCode: string;
  sourceInstructionGuardReady: boolean;
  sourceInstructionGuardKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind
    | "";
  sourceInstructionGuardReadOnly: boolean;
  sourceInstructionGuardBlocksDraftArtifactCreation: boolean;
  sourceInstructionGuardBlocksSignedDraftText: boolean;
  sourceInstructionGuardBlocksSignaturePayload: boolean;
  sourceInstructionGuardBlocksApprovalGrant: boolean;
  sourceInstructionGuardBlocksRuntimePayload: boolean;
  sourceInstructionGuardBlocksWrites: boolean;
  sourceInstructionGuardBlocksSiblingMutation: boolean;
  expectedShape: string;
  intakePurpose: string;
  readyForHumanSignedApprovalDraftTextPackageIntakeField: boolean;
  draftTextPackageFieldMaterialized: false;
  draftTextPackageAccepted: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind;
  sourceIntakeFieldCode: string;
  sourceIntakeFieldReady: boolean;
  sourceInstructionGuardKind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind
    | "";
  guardCode: string;
  guardText: string;
  rejectsMissingIntakeField: boolean;
  blocksDraftTextPackageAcceptance: true;
  blocksSignedDraftText: true;
  blocksSignaturePayload: true;
  blocksApprovalGrant: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForHumanSignedApprovalDraftTextPackageIntakeGuard: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates {
  sourceInstructionPreflightReady: boolean;
  intakeFieldCountComplete: boolean;
  intakeGuardCountComplete: boolean;
  fieldVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  sourceInstructionSlotsReady: boolean;
  sourceInstructionGuardsReady: boolean;
  allIntakeFieldsReady: boolean;
  allIntakeGuardsReady: boolean;
  allExpectedShapesDeclared: boolean;
  allIntakePurposesDeclared: boolean;
  allGuardTextsDeclared: boolean;
  allSourceInstructionSlotsReadOnly: boolean;
  allSourceInstructionGuardsReadOnly: boolean;
  allFieldsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allGuardsRejectMissingIntakeFields: boolean;
  allGuardsBlockDraftTextPackageAcceptance: boolean;
  allGuardsBlockSignedDraftText: boolean;
  allGuardsBlockSignaturePayload: boolean;
  allGuardsBlockApprovalGrant: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  sourceInstructionPreflightDigestPresent: boolean;
  sourceAuthoringReadinessDigestPresent: boolean;
  sourceReviewPackageDigestPresent: boolean;
  sourceDraftReadinessDigestPresent: boolean;
  sourceDraftPreflightDigestPresent: boolean;
  sourceArtifactPreflightDigestPresent: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  digestIntakeFieldsReady: boolean;
  sourceStillNoInstructionMaterialization: boolean;
  sourceStillNoDraftArtifact: boolean;
  sourceStillNoSignedDraftText: boolean;
  sourceStillNoSignaturePayload: boolean;
  sourceStillNoApprovalGrant: boolean;
  intakeReadyButNoPackageAccepted: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  requiresManualDraftTextPackageSubmission: boolean;
  requiresDetachedSignatureOutOfBand: boolean;
  requiresDigestRecheckBeforeAcceptance: boolean;
  requiresSeparateApprovalGrantReview: boolean;
  nextStepRequiresOfflineArtifactReview: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake {
  signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236";
  sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight[
      "signedApprovalCaptureArtifactDraftInstructionPreflightVersion"
    ];
  artifactDraftTextPackageIntakeState:
    "ready-for-signed-approval-artifact-draft-text-package-intake" | "blocked";
  readyForSignedApprovalArtifactDraftTextPackageIntake: boolean;
  readyForHumanSignedApprovalDraftTextPackageSubmission: boolean;
  readyForHumanSignedApprovalDraftInstructionAuthoring:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight[
      "readyForHumanSignedApprovalDraftInstructionAuthoring"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  intakeFieldCount: number;
  intakeGuardCount: number;
  identityIntakeFieldCount: number;
  digestBindingIntakeFieldCount: number;
  signatureEnvelopeIntakeFieldCount: number;
  sourceEvidenceIntakeFieldCount: number;
  valueBindingIntakeFieldCount: number;
  policyIntakeFieldCount: number;
  executionLockIntakeFieldCount: number;
  archiveCloseoutIntakeFieldCount: number;
  digestModeIntakeFieldCount: number;
  readyIntakeFieldCount: number;
  readyIntakeGuardCount: number;
  digestBindingIntakeGuardCount: number;
  signatureEnvelopeIntakeGuardCount: number;
  policyIntakeGuardCount: number;
  executionLockIntakeGuardCount: number;
  archiveCloseoutIntakeGuardCount: number;
  expectedDraftTextPackageFieldCount: number;
  actualDraftTextPackageFieldCount: 0;
  acceptedDraftTextPackageCount: 0;
  draftInstructionMaterializedCount: 0;
  draftArtifactCreated: false;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: string;
  sourceSignedApprovalCaptureArtifactDraftReadinessDigest: string;
  sourceSignedApprovalCaptureArtifactDraftPreflightDigest: string;
  sourceSignedApprovalCaptureArtifactPreflightDigest: string;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  fields:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageIntakeDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
