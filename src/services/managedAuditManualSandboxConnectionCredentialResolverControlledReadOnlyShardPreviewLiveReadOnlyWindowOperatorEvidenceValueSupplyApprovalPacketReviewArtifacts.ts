import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_REVIEW_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlCatalog.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControls,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewSlotBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview(
  draft: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview {
  const controls =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControls(
      draft,
    );
  const gates = createApprovalPacketReviewGates(draft, controls);
  const blockedReasonCodes = createApprovalPacketReviewBlockedReasons(gates);
  const readyForValueSupplyApprovalPacketReview = blockedReasonCodes.length === 0;
  const approvalPacketReviewDigest = sha256StableJson({
    approvalPacketReviewVersion: "Node v1011",
    sourceApprovalPacketDraftVersion: draft.approvalPacketDraftVersion,
    sourceApprovalPacketDraftDigest: draft.approvalPacketDraftDigest,
    controls: controls.map((control) => [
      control.order,
      control.nodeVersion,
      control.code,
      control.kind,
      control.scope,
      control.project,
      control.sourceApprovalPacketDraftSlotCode,
      control.requiredApprovalFieldName,
      control.requiredReviewRecordFieldName,
      control.expectedPolicyField,
      control.expectedPolicyValue,
      control.blockerCode,
    ]),
    gates,
  });

  return {
    approvalPacketReviewVersion: "Node v1011",
    sourceApprovalPacketDraftVersion: draft.approvalPacketDraftVersion,
    reviewPackageState: readyForValueSupplyApprovalPacketReview
      ? "ready-for-value-supply-approval-packet-review"
      : "blocked",
    readyForValueSupplyApprovalPacketReview,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    reviewControlCount: controls.length,
    approvalFieldReviewControlCount: countControls(controls, "approval-field-review-control"),
    policyReviewControlCount: countControls(controls, "policy-review-control"),
    sourceEvidenceReviewControlCount: countControls(controls, "source-evidence-review-control"),
    executionLockReviewControlCount: countControls(controls, "execution-lock-review-control"),
    closeoutReviewControlCount: countControls(controls, "closeout-review-control"),
    manualReviewRequiredControlCount: controls.filter((control) => control.manualReviewRequired).length,
    autoApprovalBlockedControlCount: controls.filter((control) => !control.autoApprovalAllowed).length,
    requiredApprovalFieldCoveredCount: controls.filter((control) => control.requiredApprovalFieldPresent).length,
    requiredReviewRecordFieldCoveredCount:
      controls.filter((control) => control.requiredReviewRecordFieldPresent).length,
    policyRequirementSatisfiedCount: controls.filter((control) => control.policyRequirementSatisfied).length,
    acceptanceCriterionCount: controls.filter((control) => control.acceptanceCriterion.length > 0).length,
    suppliedValueCount: 0,
    acceptedValueCount: 0,
    importedValueCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    operatorIdentityPresent: false,
    approvalTimestampPresent: false,
    sourceApprovalPacketDraftDigest: draft.approvalPacketDraftDigest,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    controls,
    approvalPacketReviewDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function createApprovalPacketReviewGates(
  draft: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
  controls: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControl[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewGates {
  return {
    sourceApprovalPacketDraftReady: draft.readyForValueSupplyApprovalPacketDraft,
    reviewControlCountComplete:
      controls.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_REVIEW_VERSIONS.length,
    versionsSequential: controls.every((control, index) =>
      control.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_REVIEW_VERSIONS[index]),
    sourceDraftSlotsReady: controls.every((control) => control.sourceApprovalPacketDraftSlotReady),
    allControlsReadyForReview: controls.every((control) => control.readyForValueSupplyApprovalPacketReview),
    allRequiredApprovalFieldsCovered: controls.every((control) => control.requiredApprovalFieldPresent),
    allRequiredReviewRecordFieldsCovered: controls.every((control) => control.requiredReviewRecordFieldPresent),
    allPolicyRequirementsSatisfied: controls.every((control) => control.policyRequirementSatisfied),
    allControlsHaveReviewerQuestions: controls.every((control) => control.reviewerQuestion.length > 0),
    allControlsHaveAcceptanceCriteria: controls.every((control) => control.acceptanceCriterion.length > 0),
    allControlsHaveBlockerCodes: controls.every((control) => control.blockerCode.length > 0),
    allControlsRequireManualReview: controls.every((control) => control.manualReviewRequired),
    autoApprovalStillBlocked: controls.every((control) => !control.autoApprovalAllowed),
    approvalPacketDraftDigestPresent: /^[a-f0-9]{64}$/.test(draft.approvalPacketDraftDigest),
    signedHumanApprovalStillRequired: controls.every((control) =>
      control.expectedPolicyField !== "approvalPolicy"
      || control.expectedPolicyValue === "signed-human-approval-required"),
    draftOnlyNoGrantPolicyStillHeld: controls
      .filter((control) => control.expectedPolicyField === "packetPolicy")
      .every((control) => control.policyRequirementSatisfied),
    explicitTypedValueEnvelopeRequired: controls
      .filter((control) => control.expectedPolicyField === "valueShapeRule")
      .every((control) => control.policyRequirementSatisfied),
    missingValuePolicyFailClosed: controls
      .filter((control) => control.expectedPolicyField === "missingValuePolicy")
      .every((control) => control.policyRequirementSatisfied),
    malformedValuePolicyRejects: controls
      .filter((control) => control.expectedPolicyField === "malformedValuePolicy")
      .every((control) => control.policyRequirementSatisfied),
    redactionPolicyRedactsBeforePersist: controls
      .filter((control) => control.expectedPolicyField === "redactionPolicy")
      .every((control) => control.policyRequirementSatisfied),
    provenancePolicyRequiresSourceEvidence: controls
      .filter((control) => control.expectedPolicyField === "provenancePolicy")
      .every((control) => control.policyRequirementSatisfied),
    noApprovalCaptured:
      !draft.approvalCaptured && controls.every((control) => !control.approvalCaptured),
    noApprovalGrantPresent:
      !draft.approvalGrantPresent && controls.every((control) => !control.approvalGrantPresent),
    noSignedApprovalPresent:
      !draft.signedApprovalPresent && controls.every((control) => !control.signedApprovalPresent),
    operatorIdentityStillPending:
      !draft.operatorIdentityPresent && controls.every((control) => !control.operatorIdentityPresent),
    approvalTimestampStillPending:
      !draft.approvalTimestampPresent && controls.every((control) => !control.approvalTimestampPresent),
    noValuesSupplied: draft.suppliedValueCount === 0 && controls.every((control) => control.suppliedValueCount === 0),
    noValuesAccepted: draft.acceptedValueCount === 0 && controls.every((control) => control.acceptedValueCount === 0),
    noValuesImported: draft.importedValueCount === 0 && controls.every((control) => control.importedValueCount === 0),
    signedApprovalCaptureStillBlocked: controls.every((control) => !control.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !draft.readyForOperatorValueSupply && controls.every((control) => !control.readyForOperatorValueSupply),
    operatorValueSubmissionStillDisabled:
      !draft.readyForOperatorValueSubmission
      && controls.every((control) => !control.readyForOperatorValueSubmission),
    evidenceImportStillBlocked:
      !draft.readyForEvidenceImport && controls.every((control) => !control.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !draft.readyForRuntimePayload && controls.every((control) => !control.readyForRuntimePayload),
    liveExecutionStillBlocked:
      !draft.readyForLiveExecution && controls.every((control) => !control.readyForLiveExecution),
    productionExecutionStillBlocked:
      !draft.readyForProductionExecution && controls.every((control) => !control.readyForProductionExecution),
    noRuntimePayloadImported:
      !draft.importsRuntimePayload && controls.every((control) => !control.importsRuntimePayload),
    noSyntheticEvidenceAccepted:
      !draft.acceptsSyntheticEvidence && controls.every((control) => !control.acceptsSyntheticEvidence),
    noSecretValues: !draft.containsSecretValue && controls.every((control) => !control.containsSecretValue),
    allControlsReadOnly: controls.every((control) => control.readOnly),
    noWritesAllowed:
      !draft.writeRoutingAllowed && controls.every((control) => !control.writesAllowed),
    noServiceStart:
      !draft.startsServices && controls.every((control) => !control.startsServices),
    noSiblingMutation:
      !draft.mutatesSiblingState && controls.every((control) => !control.mutatesSiblingState),
    nextStepRequiresSignedApprovalTemplate: true,
  };
}

function countControls(
  controls: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControl[],
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlKind,
): number {
  return controls.filter((control) => control.kind === kind).length;
}

function createApprovalPacketReviewBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceApprovalPacketDraftReady, "SOURCE_APPROVAL_PACKET_DRAFT_NOT_READY"],
    [gates.reviewControlCountComplete, "APPROVAL_PACKET_REVIEW_CONTROL_COUNT_INCOMPLETE"],
    [gates.versionsSequential, "APPROVAL_PACKET_REVIEW_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceDraftSlotsReady, "APPROVAL_PACKET_REVIEW_SOURCE_DRAFT_SLOTS_NOT_READY"],
    [gates.allControlsReadyForReview, "APPROVAL_PACKET_REVIEW_CONTROLS_NOT_READY"],
    [gates.allRequiredApprovalFieldsCovered, "APPROVAL_PACKET_REVIEW_APPROVAL_FIELDS_MISSING"],
    [gates.allRequiredReviewRecordFieldsCovered, "APPROVAL_PACKET_REVIEW_RECORD_FIELDS_MISSING"],
    [gates.allPolicyRequirementsSatisfied, "APPROVAL_PACKET_REVIEW_POLICY_REQUIREMENTS_FAILED"],
    [gates.allControlsHaveReviewerQuestions, "APPROVAL_PACKET_REVIEW_QUESTIONS_MISSING"],
    [gates.allControlsHaveAcceptanceCriteria, "APPROVAL_PACKET_REVIEW_ACCEPTANCE_CRITERIA_MISSING"],
    [gates.allControlsHaveBlockerCodes, "APPROVAL_PACKET_REVIEW_BLOCKER_CODES_MISSING"],
    [gates.allControlsRequireManualReview, "APPROVAL_PACKET_REVIEW_MANUAL_REVIEW_NOT_REQUIRED"],
    [gates.autoApprovalStillBlocked, "APPROVAL_PACKET_REVIEW_AUTO_APPROVAL_ENABLED"],
    [gates.approvalPacketDraftDigestPresent, "APPROVAL_PACKET_REVIEW_DRAFT_DIGEST_MISSING"],
    [gates.signedHumanApprovalStillRequired, "APPROVAL_PACKET_REVIEW_SIGNED_HUMAN_NOT_REQUIRED"],
    [gates.draftOnlyNoGrantPolicyStillHeld, "APPROVAL_PACKET_REVIEW_DRAFT_ONLY_POLICY_FAILED"],
    [gates.explicitTypedValueEnvelopeRequired, "APPROVAL_PACKET_REVIEW_TYPED_VALUE_POLICY_FAILED"],
    [gates.missingValuePolicyFailClosed, "APPROVAL_PACKET_REVIEW_MISSING_VALUE_POLICY_FAILED"],
    [gates.malformedValuePolicyRejects, "APPROVAL_PACKET_REVIEW_MALFORMED_VALUE_POLICY_FAILED"],
    [gates.redactionPolicyRedactsBeforePersist, "APPROVAL_PACKET_REVIEW_REDACTION_POLICY_FAILED"],
    [gates.provenancePolicyRequiresSourceEvidence, "APPROVAL_PACKET_REVIEW_PROVENANCE_POLICY_FAILED"],
    [gates.noApprovalCaptured, "APPROVAL_PACKET_REVIEW_APPROVAL_ALREADY_CAPTURED"],
    [gates.noApprovalGrantPresent, "APPROVAL_PACKET_REVIEW_GRANT_PRESENT"],
    [gates.noSignedApprovalPresent, "APPROVAL_PACKET_REVIEW_SIGNED_APPROVAL_PRESENT"],
    [gates.operatorIdentityStillPending, "APPROVAL_PACKET_REVIEW_OPERATOR_IDENTITY_PRESENT"],
    [gates.approvalTimestampStillPending, "APPROVAL_PACKET_REVIEW_APPROVAL_TIMESTAMP_PRESENT"],
    [gates.noValuesSupplied, "APPROVAL_PACKET_REVIEW_VALUES_SUPPLIED"],
    [gates.noValuesAccepted, "APPROVAL_PACKET_REVIEW_VALUES_ACCEPTED"],
    [gates.noValuesImported, "APPROVAL_PACKET_REVIEW_VALUES_IMPORTED"],
    [gates.signedApprovalCaptureStillBlocked, "APPROVAL_PACKET_REVIEW_SIGNED_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "APPROVAL_PACKET_REVIEW_OPERATOR_SUPPLY_ENABLED"],
    [gates.operatorValueSubmissionStillDisabled, "APPROVAL_PACKET_REVIEW_OPERATOR_SUBMISSION_ENABLED"],
    [gates.evidenceImportStillBlocked, "APPROVAL_PACKET_REVIEW_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "APPROVAL_PACKET_REVIEW_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "APPROVAL_PACKET_REVIEW_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "APPROVAL_PACKET_REVIEW_PRODUCTION_EXECUTION_ENABLED"],
    [gates.noRuntimePayloadImported, "APPROVAL_PACKET_REVIEW_RUNTIME_PAYLOAD_IMPORTED"],
    [gates.noSyntheticEvidenceAccepted, "APPROVAL_PACKET_REVIEW_SYNTHETIC_EVIDENCE_ACCEPTED"],
    [gates.noSecretValues, "APPROVAL_PACKET_REVIEW_SECRET_VALUE_PRESENT"],
    [gates.allControlsReadOnly, "APPROVAL_PACKET_REVIEW_CONTROL_NOT_READ_ONLY"],
    [gates.noWritesAllowed, "APPROVAL_PACKET_REVIEW_WRITES_ALLOWED"],
    [gates.noServiceStart, "APPROVAL_PACKET_REVIEW_SERVICE_START_ENABLED"],
    [gates.noSiblingMutation, "APPROVAL_PACKET_REVIEW_SIBLING_MUTATION_ENABLED"],
    [gates.nextStepRequiresSignedApprovalTemplate, "APPROVAL_PACKET_REVIEW_NEXT_STEP_NOT_SIGNED_TEMPLATE"],
  ]);
}
