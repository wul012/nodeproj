import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateVersion =
  | "Node v1012"
  | "Node v1013"
  | "Node v1014"
  | "Node v1015"
  | "Node v1016"
  | "Node v1017"
  | "Node v1018"
  | "Node v1019"
  | "Node v1020"
  | "Node v1021"
  | "Node v1022"
  | "Node v1023"
  | "Node v1024"
  | "Node v1025"
  | "Node v1026"
  | "Node v1027"
  | "Node v1028"
  | "Node v1029"
  | "Node v1030"
  | "Node v1031"
  | "Node v1032"
  | "Node v1033"
  | "Node v1034"
  | "Node v1035"
  | "Node v1036";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldKind =
  | "identity-field"
  | "time-field"
  | "source-evidence-field"
  | "value-shape-field"
  | "policy-field"
  | "execution-lock-field"
  | "closeout-field";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseKind =
  | "required-field-clause"
  | "rejection-clause"
  | "evidence-binding-clause"
  | "non-execution-clause"
  | "closeout-clause";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateValueClass =
  | "identifier"
  | "timestamp"
  | "digest"
  | "typed-value-envelope"
  | "policy-code"
  | "boolean-lock"
  | "operator-justification";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateVersion;
  code: string;
  fieldName: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldKind;
  valueClass:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateValueClass;
  sourceReviewControlCode: string;
  requiredReviewControlFieldName: string;
  missingFieldBlockerCode: string;
  fieldPurpose: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseKind;
  sourceTemplateFieldCode: string;
  rejectionCode: string;
  clauseText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateVersion;
  code: string;
  fieldName: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldKind;
  valueClass:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateValueClass;
  sourceReviewControlCode: string;
  sourceReviewControlReady: boolean;
  sourceManualReviewRequired: boolean;
  sourceAutoApprovalBlocked: boolean;
  requiredReviewControlFieldName: string;
  requiredReviewControlFieldPresent: boolean;
  missingFieldBlockerCode: string;
  fieldPurpose: string;
  required: true;
  captureAllowedNow: false;
  valueProvided: false;
  containsSecretValue: false;
  readyForSignedApprovalTemplateField: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseKind;
  sourceTemplateFieldCode: string;
  sourceTemplateFieldReady: boolean;
  rejectionCode: string;
  clauseText: string;
  rejectsMissingField: boolean;
  blocksUnsignedApproval: true;
  blocksAutoApproval: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForSignedApprovalTemplateClause: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates {
  sourceApprovalPacketReviewReady: boolean;
  templateFieldCountComplete: boolean;
  templateClauseCountComplete: boolean;
  fieldVersionsSequential: boolean;
  clauseVersionsSequential: boolean;
  sourceReviewControlsReady: boolean;
  allFieldsReady: boolean;
  allClausesReady: boolean;
  allFieldsRequired: boolean;
  allFieldPurposesDeclared: boolean;
  allMissingFieldBlockersDeclared: boolean;
  allRequiredReviewControlFieldsCovered: boolean;
  allClausesRejectMissingFields: boolean;
  allClausesBlockUnsignedApproval: boolean;
  allClausesBlockAutoApproval: boolean;
  allClausesBlockRuntimePayload: boolean;
  allClausesBlockWrites: boolean;
  allClausesBlockSiblingMutation: boolean;
  sourceReviewDigestPresent: boolean;
  manualReviewStillRequired: boolean;
  autoApprovalStillBlocked: boolean;
  noTemplateValuesProvided: boolean;
  noSecretValues: boolean;
  signedApprovalCaptureStillBlocked: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  allFieldsReadOnly: boolean;
  allClausesReadOnly: boolean;
  noWritesAllowed: boolean;
  noServiceStart: boolean;
  noSiblingMutation: boolean;
  nextStepRequiresSignedApprovalCapturePreflight: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate {
  signedApprovalTemplateVersion: "Node v1036";
  sourceApprovalPacketReviewVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview[
      "approvalPacketReviewVersion"
    ];
  templateState: "ready-for-signed-approval-template-preflight" | "blocked";
  readyForSignedApprovalTemplatePreflight: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  templateFieldCount: number;
  templateClauseCount: number;
  identityFieldCount: number;
  timeFieldCount: number;
  sourceEvidenceFieldCount: number;
  valueShapeFieldCount: number;
  policyFieldCount: number;
  executionLockFieldCount: number;
  closeoutFieldCount: number;
  requiredFieldCount: number;
  readyFieldCount: number;
  readyClauseCount: number;
  missingFieldBlockerCount: number;
  rejectionClauseCount: number;
  nonExecutionClauseCount: number;
  suppliedValueCount: 0;
  acceptedValueCount: 0;
  importedValueCount: 0;
  templateValueProvidedCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceApprovalPacketReviewDigest: string;
  fields: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField[];
  clauses: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause[];
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalTemplateDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
