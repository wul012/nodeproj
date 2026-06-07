import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightVersion =
  | "Node v1087"
  | "Node v1088"
  | "Node v1089"
  | "Node v1090"
  | "Node v1091"
  | "Node v1092"
  | "Node v1093"
  | "Node v1094"
  | "Node v1095"
  | "Node v1096"
  | "Node v1097"
  | "Node v1098"
  | "Node v1099"
  | "Node v1100"
  | "Node v1101"
  | "Node v1102"
  | "Node v1103"
  | "Node v1104"
  | "Node v1105"
  | "Node v1106"
  | "Node v1107"
  | "Node v1108"
  | "Node v1109"
  | "Node v1110"
  | "Node v1111";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldKind =
  | "identity-draft-field"
  | "digest-binding-draft-field"
  | "signature-envelope-draft-field"
  | "source-evidence-draft-field"
  | "value-binding-draft-field"
  | "policy-draft-field"
  | "execution-lock-draft-field"
  | "closeout-draft-field";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuardKind =
  | "required-field-guard"
  | "digest-binding-guard"
  | "signature-envelope-guard"
  | "policy-guard"
  | "no-execution-guard"
  | "closeout-guard";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldMode =
  | "manual-entry-placeholder"
  | "digest-reference"
  | "policy-code"
  | "boolean-lock"
  | "detached-signature-placeholder";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightVersion;
  code: string;
  fieldName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldKind;
  fieldMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldMode;
  sourceArtifactFragmentCode: string;
  requiredArtifactFragmentName: string;
  draftBlockerCode: string;
  fieldPurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuardKind;
  sourceDraftFieldCode: string;
  rejectionCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightVersion;
  code: string;
  fieldName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldKind;
  fieldMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldMode;
  sourceArtifactFragmentCode: string;
  sourceArtifactFragmentReady: boolean;
  sourceArtifactSealReady: boolean;
  sourceArtifactStillBlocked: boolean;
  requiredArtifactFragmentName: string;
  requiredArtifactFragmentPresent: boolean;
  draftBlockerCode: string;
  fieldPurpose: string;
  requiredForArtifactDraftPreflight: true;
  draftArtifactCreated: false;
  draftSignaturePayloadPresent: false;
  approvalGrantEmitted: false;
  readyForSignedApprovalArtifactDraftPreflightField: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuardKind;
  sourceDraftFieldCode: string;
  sourceDraftFieldReady: boolean;
  rejectionCode: string;
  guardText: string;
  rejectsMissingField: boolean;
  blocksUnsignedDraft: true;
  blocksAutoCapture: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForSignedApprovalArtifactDraftPreflightGuard: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates {
  sourceSignedApprovalCaptureArtifactPreflightReady: boolean;
  draftFieldCountComplete: boolean;
  draftGuardCountComplete: boolean;
  fieldVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  sourceArtifactFragmentsReady: boolean;
  sourceArtifactSealsReady: boolean;
  allFieldsReady: boolean;
  allGuardsReady: boolean;
  allFieldsRequired: boolean;
  allFieldPurposesDeclared: boolean;
  allDraftBlockersDeclared: boolean;
  allRequiredArtifactFragmentsCovered: boolean;
  allGuardsRejectMissingFields: boolean;
  allGuardsBlockUnsignedDraft: boolean;
  allGuardsBlockAutoCapture: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  sourceArtifactPreflightDigestPresent: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  sourceArtifactPreflightStillPreflightOnly: boolean;
  sourceArtifactStillBlocked: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  noDraftArtifactCreated: boolean;
  noDraftSignaturePayload: boolean;
  noApprovalGrantEmitted: boolean;
  noSignedApprovalPresent: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  allFieldsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresManualSignedApprovalDraft: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight {
  signedApprovalCaptureArtifactDraftPreflightVersion: "Node v1111";
  sourceSignedApprovalCaptureArtifactPreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight[
      "signedApprovalCaptureArtifactPreflightVersion"
    ];
  artifactDraftPreflightState: "ready-for-signed-approval-artifact-draft-preflight" | "blocked";
  readyForSignedApprovalArtifactDraftPreflight: boolean;
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  draftFieldCount: number;
  draftGuardCount: number;
  identityDraftFieldCount: number;
  digestBindingDraftFieldCount: number;
  signatureEnvelopeDraftFieldCount: number;
  sourceEvidenceDraftFieldCount: number;
  valueBindingDraftFieldCount: number;
  policyDraftFieldCount: number;
  executionLockDraftFieldCount: number;
  closeoutDraftFieldCount: number;
  requiredDraftFieldCount: number;
  readyDraftFieldCount: number;
  readyDraftGuardCount: number;
  draftBlockerCount: number;
  digestBindingGuardCount: number;
  signatureEnvelopeGuardCount: number;
  policyGuardCount: number;
  noExecutionGuardCount: number;
  draftArtifactCreated: false;
  draftArtifactMaterializedCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactPreflightDigest: string;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  fields:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard[];
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftPreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
