import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewVersion =
  | "Node v987"
  | "Node v988"
  | "Node v989"
  | "Node v990"
  | "Node v991"
  | "Node v992"
  | "Node v993"
  | "Node v994"
  | "Node v995"
  | "Node v996"
  | "Node v997"
  | "Node v998"
  | "Node v999"
  | "Node v1000"
  | "Node v1001"
  | "Node v1002"
  | "Node v1003"
  | "Node v1004"
  | "Node v1005"
  | "Node v1006"
  | "Node v1007"
  | "Node v1008"
  | "Node v1009"
  | "Node v1010"
  | "Node v1011";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlKind =
  | "approval-field-review-control"
  | "policy-review-control"
  | "source-evidence-review-control"
  | "execution-lock-review-control"
  | "closeout-review-control";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlScope =
  | "operator-identity"
  | "approval-timestamp"
  | "value-shape"
  | "redaction"
  | "provenance"
  | "source-evidence"
  | "non-execution"
  | "closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewPolicyField =
  | "approvalPolicy"
  | "packetPolicy"
  | "valueShapeRule"
  | "missingValuePolicy"
  | "malformedValuePolicy"
  | "redactionPolicy"
  | "provenancePolicy";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlKind;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlScope;
  sourceApprovalPacketDraftSlotCode: string;
  requiredApprovalFieldName: string;
  requiredReviewRecordFieldName: string;
  expectedPolicyField: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewPolicyField;
  expectedPolicyValue: string;
  reviewerQuestion: string;
  acceptanceCriterion: string;
  blockerCode: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControl {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlKind;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlScope;
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject;
  sourceApprovalPacketDraftSlotCode: string;
  sourceApprovalPacketDraftSlotReady: boolean;
  sourceApprovalPacketDraftSlotProject:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject;
  sourceApprovalPacketDraftPolicyCode: string;
  requiredApprovalFieldName: string;
  requiredApprovalFieldPresent: boolean;
  requiredReviewRecordFieldName: string;
  requiredReviewRecordFieldPresent: boolean;
  expectedPolicyField:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewPolicyField;
  expectedPolicyValue: string;
  policyRequirementSatisfied: boolean;
  reviewerQuestion: string;
  acceptanceCriterion: string;
  blockerCode: string;
  manualReviewRequired: true;
  autoApprovalAllowed: false;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  operatorIdentityPresent: false;
  approvalTimestampPresent: false;
  suppliedValueCount: 0;
  acceptedValueCount: 0;
  importedValueCount: 0;
  readyForValueSupplyApprovalPacketReview: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewGates {
  sourceApprovalPacketDraftReady: boolean;
  reviewControlCountComplete: boolean;
  versionsSequential: boolean;
  sourceDraftSlotsReady: boolean;
  allControlsReadyForReview: boolean;
  allRequiredApprovalFieldsCovered: boolean;
  allRequiredReviewRecordFieldsCovered: boolean;
  allPolicyRequirementsSatisfied: boolean;
  allControlsHaveReviewerQuestions: boolean;
  allControlsHaveAcceptanceCriteria: boolean;
  allControlsHaveBlockerCodes: boolean;
  allControlsRequireManualReview: boolean;
  autoApprovalStillBlocked: boolean;
  approvalPacketDraftDigestPresent: boolean;
  signedHumanApprovalStillRequired: boolean;
  draftOnlyNoGrantPolicyStillHeld: boolean;
  explicitTypedValueEnvelopeRequired: boolean;
  missingValuePolicyFailClosed: boolean;
  malformedValuePolicyRejects: boolean;
  redactionPolicyRedactsBeforePersist: boolean;
  provenancePolicyRequiresSourceEvidence: boolean;
  noApprovalCaptured: boolean;
  noApprovalGrantPresent: boolean;
  noSignedApprovalPresent: boolean;
  operatorIdentityStillPending: boolean;
  approvalTimestampStillPending: boolean;
  noValuesSupplied: boolean;
  noValuesAccepted: boolean;
  noValuesImported: boolean;
  signedApprovalCaptureStillBlocked: boolean;
  operatorValueSupplyStillDisabled: boolean;
  operatorValueSubmissionStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noRuntimePayloadImported: boolean;
  noSyntheticEvidenceAccepted: boolean;
  noSecretValues: boolean;
  allControlsReadOnly: boolean;
  noWritesAllowed: boolean;
  noServiceStart: boolean;
  noSiblingMutation: boolean;
  nextStepRequiresSignedApprovalTemplate: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview {
  approvalPacketReviewVersion: "Node v1011";
  sourceApprovalPacketDraftVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft[
      "approvalPacketDraftVersion"
    ];
  reviewPackageState: "ready-for-value-supply-approval-packet-review" | "blocked";
  readyForValueSupplyApprovalPacketReview: boolean;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  reviewControlCount: number;
  approvalFieldReviewControlCount: number;
  policyReviewControlCount: number;
  sourceEvidenceReviewControlCount: number;
  executionLockReviewControlCount: number;
  closeoutReviewControlCount: number;
  manualReviewRequiredControlCount: number;
  autoApprovalBlockedControlCount: number;
  requiredApprovalFieldCoveredCount: number;
  requiredReviewRecordFieldCoveredCount: number;
  policyRequirementSatisfiedCount: number;
  acceptanceCriterionCount: number;
  suppliedValueCount: 0;
  acceptedValueCount: 0;
  importedValueCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  operatorIdentityPresent: false;
  approvalTimestampPresent: false;
  sourceApprovalPacketDraftDigest: string;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  controls: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControl[];
  approvalPacketReviewDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
