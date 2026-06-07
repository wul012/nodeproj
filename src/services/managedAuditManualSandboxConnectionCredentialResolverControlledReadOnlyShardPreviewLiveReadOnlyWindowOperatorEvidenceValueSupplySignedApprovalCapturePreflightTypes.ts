import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightVersion =
  | "Node v1037"
  | "Node v1038"
  | "Node v1039"
  | "Node v1040"
  | "Node v1041"
  | "Node v1042"
  | "Node v1043"
  | "Node v1044"
  | "Node v1045"
  | "Node v1046"
  | "Node v1047"
  | "Node v1048"
  | "Node v1049"
  | "Node v1050"
  | "Node v1051"
  | "Node v1052"
  | "Node v1053"
  | "Node v1054"
  | "Node v1055"
  | "Node v1056"
  | "Node v1057"
  | "Node v1058"
  | "Node v1059"
  | "Node v1060"
  | "Node v1061";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputKind =
  | "identity-input"
  | "time-input"
  | "digest-binding-input"
  | "capture-channel-input"
  | "signature-policy-input"
  | "operator-statement-input"
  | "source-evidence-input"
  | "value-binding-input"
  | "policy-input"
  | "execution-lock-input"
  | "closeout-input";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestationKind =
  | "required-input-attestation"
  | "digest-binding-attestation"
  | "policy-attestation"
  | "no-execution-attestation"
  | "closeout-attestation";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightValueMode =
  | "operator-entry-placeholder"
  | "digest-reference"
  | "policy-code"
  | "boolean-lock"
  | "approval-statement";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightVersion;
  code: string;
  inputName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputKind;
  valueMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightValueMode;
  sourceTemplateFieldCode: string;
  requiredTemplateFieldName: string;
  captureBlockerCode: string;
  inputPurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestationTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestationKind;
  sourceCaptureInputCode: string;
  rejectionCode: string;
  attestationText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightVersion;
  code: string;
  inputName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputKind;
  valueMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightValueMode;
  sourceTemplateFieldCode: string;
  sourceTemplateFieldReady: boolean;
  sourceTemplateFieldRequired: boolean;
  sourceTemplateCaptureBlocked: boolean;
  requiredTemplateFieldName: string;
  requiredTemplateFieldPresent: boolean;
  captureBlockerCode: string;
  inputPurpose: string;
  requiredForCapturePreflight: true;
  captureValueProvided: false;
  capturedNow: false;
  rawSignatureMaterialPresent: false;
  approvalGrantEmitted: false;
  readyForSignedApprovalCapturePreflightInput: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestationKind;
  sourceCaptureInputCode: string;
  sourceCaptureInputReady: boolean;
  rejectionCode: string;
  attestationText: string;
  rejectsMissingInput: boolean;
  blocksUnsignedCapture: true;
  blocksAutoCapture: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForSignedApprovalCapturePreflightAttestation: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates {
  sourceSignedApprovalTemplateReady: boolean;
  captureInputCountComplete: boolean;
  captureAttestationCountComplete: boolean;
  inputVersionsSequential: boolean;
  attestationVersionsSequential: boolean;
  sourceTemplateFieldsReady: boolean;
  allInputsReady: boolean;
  allAttestationsReady: boolean;
  allInputsRequired: boolean;
  allInputPurposesDeclared: boolean;
  allCaptureBlockersDeclared: boolean;
  allRequiredTemplateFieldsCovered: boolean;
  allAttestationsRejectMissingInputs: boolean;
  allAttestationsBlockUnsignedCapture: boolean;
  allAttestationsBlockAutoCapture: boolean;
  allAttestationsBlockRuntimePayload: boolean;
  allAttestationsBlockWrites: boolean;
  allAttestationsBlockSiblingMutation: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  sourceTemplateStillPreflightOnly: boolean;
  sourceTemplateStillBlocksCapture: boolean;
  operatorValueSupplyStillDisabled: boolean;
  noCaptureValuesProvided: boolean;
  noRawSignatureMaterial: boolean;
  noApprovalGrantEmitted: boolean;
  noSignedApprovalPresent: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  allInputsReadOnly: boolean;
  allAttestationsReadOnly: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresSignedApprovalCaptureArtifactPreflight: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight {
  signedApprovalCapturePreflightVersion: "Node v1061";
  sourceSignedApprovalTemplateVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate[
      "signedApprovalTemplateVersion"
    ];
  preflightState: "ready-for-signed-approval-capture-preflight" | "blocked";
  readyForSignedApprovalCapturePreflight: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  captureInputCount: number;
  captureAttestationCount: number;
  identityInputCount: number;
  timeInputCount: number;
  digestBindingInputCount: number;
  captureChannelInputCount: number;
  signaturePolicyInputCount: number;
  operatorStatementInputCount: number;
  sourceEvidenceInputCount: number;
  valueBindingInputCount: number;
  policyInputCount: number;
  executionLockInputCount: number;
  closeoutInputCount: number;
  requiredInputCount: number;
  readyInputCount: number;
  readyAttestationCount: number;
  missingInputBlockerCount: number;
  digestBindingAttestationCount: number;
  policyAttestationCount: number;
  noExecutionAttestationCount: number;
  captureValueProvidedCount: 0;
  rawSignatureMaterialCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  inputs:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput[];
  attestations:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation[];
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCapturePreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
