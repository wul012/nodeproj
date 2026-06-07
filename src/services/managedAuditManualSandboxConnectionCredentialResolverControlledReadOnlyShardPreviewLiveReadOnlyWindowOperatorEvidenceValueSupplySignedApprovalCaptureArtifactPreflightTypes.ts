import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightVersion =
  | "Node v1062"
  | "Node v1063"
  | "Node v1064"
  | "Node v1065"
  | "Node v1066"
  | "Node v1067"
  | "Node v1068"
  | "Node v1069"
  | "Node v1070"
  | "Node v1071"
  | "Node v1072"
  | "Node v1073"
  | "Node v1074"
  | "Node v1075"
  | "Node v1076"
  | "Node v1077"
  | "Node v1078"
  | "Node v1079"
  | "Node v1080"
  | "Node v1081"
  | "Node v1082"
  | "Node v1083"
  | "Node v1084"
  | "Node v1085"
  | "Node v1086";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentKind =
  | "identity-fragment"
  | "digest-binding-fragment"
  | "signature-envelope-fragment"
  | "source-evidence-fragment"
  | "value-binding-fragment"
  | "policy-fragment"
  | "execution-lock-fragment"
  | "closeout-fragment";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSealKind =
  | "required-fragment-seal"
  | "digest-binding-seal"
  | "signature-envelope-seal"
  | "policy-seal"
  | "no-execution-seal"
  | "closeout-seal";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightValueMode =
  | "operator-entry-placeholder"
  | "digest-reference"
  | "policy-code"
  | "boolean-lock"
  | "detached-signature-placeholder";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightVersion;
  code: string;
  fragmentName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentKind;
  valueMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightValueMode;
  sourceCaptureInputCode: string;
  requiredCaptureInputName: string;
  artifactBlockerCode: string;
  fragmentPurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSealTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSealKind;
  sourceArtifactFragmentCode: string;
  rejectionCode: string;
  sealText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightVersion;
  code: string;
  fragmentName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentKind;
  valueMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightValueMode;
  sourceCaptureInputCode: string;
  sourceCaptureInputReady: boolean;
  sourceCaptureInputRequired: boolean;
  sourceCaptureStillBlocked: boolean;
  requiredCaptureInputName: string;
  requiredCaptureInputPresent: boolean;
  artifactBlockerCode: string;
  fragmentPurpose: string;
  requiredForArtifactPreflight: true;
  artifactMaterialized: false;
  rawSignatureMaterialPresent: false;
  approvalGrantEmitted: false;
  readyForSignedApprovalCaptureArtifactPreflightFragment: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSealKind;
  sourceArtifactFragmentCode: string;
  sourceArtifactFragmentReady: boolean;
  rejectionCode: string;
  sealText: string;
  rejectsMissingFragment: boolean;
  blocksUnsignedArtifact: true;
  blocksAutoMaterialization: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForSignedApprovalCaptureArtifactPreflightSeal: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates {
  sourceSignedApprovalCapturePreflightReady: boolean;
  artifactFragmentCountComplete: boolean;
  artifactSealCountComplete: boolean;
  fragmentVersionsSequential: boolean;
  sealVersionsSequential: boolean;
  sourceCaptureInputsReady: boolean;
  allFragmentsReady: boolean;
  allSealsReady: boolean;
  allFragmentsRequired: boolean;
  allFragmentPurposesDeclared: boolean;
  allArtifactBlockersDeclared: boolean;
  allRequiredCaptureInputsCovered: boolean;
  allSealsRejectMissingFragments: boolean;
  allSealsBlockUnsignedArtifact: boolean;
  allSealsBlockAutoMaterialization: boolean;
  allSealsBlockRuntimePayload: boolean;
  allSealsBlockWrites: boolean;
  allSealsBlockSiblingMutation: boolean;
  sourceCapturePreflightDigestPresent: boolean;
  sourceTemplateDigestPresent: boolean;
  sourceReviewDigestPresent: boolean;
  sourceCapturePreflightStillPreflightOnly: boolean;
  sourceCaptureStillBlocked: boolean;
  operatorValueSupplyStillDisabled: boolean;
  noArtifactMaterialized: boolean;
  noRawSignatureMaterial: boolean;
  noApprovalGrantEmitted: boolean;
  noSignedApprovalPresent: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  allFragmentsReadOnly: boolean;
  allSealsReadOnly: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresSignedApprovalArtifactDraft: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight {
  signedApprovalCaptureArtifactPreflightVersion: "Node v1086";
  sourceSignedApprovalCapturePreflightVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight[
      "signedApprovalCapturePreflightVersion"
    ];
  artifactPreflightState: "ready-for-signed-approval-capture-artifact-preflight" | "blocked";
  readyForSignedApprovalCaptureArtifactPreflight: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  artifactFragmentCount: number;
  artifactSealCount: number;
  identityFragmentCount: number;
  digestBindingFragmentCount: number;
  signatureEnvelopeFragmentCount: number;
  sourceEvidenceFragmentCount: number;
  valueBindingFragmentCount: number;
  policyFragmentCount: number;
  executionLockFragmentCount: number;
  closeoutFragmentCount: number;
  requiredFragmentCount: number;
  readyFragmentCount: number;
  readySealCount: number;
  artifactBlockerCount: number;
  digestBindingSealCount: number;
  signatureEnvelopeSealCount: number;
  policySealCount: number;
  noExecutionSealCount: number;
  artifactMaterializedCount: 0;
  rawSignatureMaterialCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCapturePreflightDigest: string;
  sourceSignedApprovalTemplateDigest: string;
  sourceApprovalPacketReviewDigest: string;
  fragments:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment[];
  seals:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal[];
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactPreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
