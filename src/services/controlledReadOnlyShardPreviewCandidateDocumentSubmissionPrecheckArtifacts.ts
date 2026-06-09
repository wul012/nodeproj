import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VERSIONS,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCatalog.js";
import {
  createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoints,
  createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidators,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckBuilder.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoint,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckGates,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidator,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.js";

type RequestPackage = ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage;
type SubmissionCheckpoint = ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoint;
type SubmissionValidator = ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidator;
type SubmissionGates = ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckGates;

function createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckGates(
  requestPackage: RequestPackage,
  checkpoints: readonly SubmissionCheckpoint[],
  validators: readonly SubmissionValidator[],
): SubmissionGates {
  const expectedVersions = [...CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VERSIONS];
  const coveredRequestItemCodes = new Set(checkpoints.flatMap((checkpoint) => checkpoint.sourceRequestItemCodes));
  const coveredAcceptanceCheckCodes = new Set(checkpoints.flatMap((checkpoint) => checkpoint.sourceRequestCheckCodes));
  const submissionCandidateFields = checkpoints.flatMap((checkpoint) => checkpoint.candidateFields);

  return {
    sourceRequestPackageReady: requestPackage.readyForCandidateDocumentRequestPackage,
    checkpointCountComplete: checkpoints.length === 25,
    validatorCountComplete: validators.length === 25,
    checkpointVersionsSequential:
      checkpoints.map((checkpoint) => checkpoint.nodeVersion).join("|") === expectedVersions.join("|"),
    validatorVersionsSequential:
      validators.map((validator) => validator.nodeVersion).join("|") === expectedVersions.join("|"),
    allRequestItemsCovered:
      requestPackage.requestItems.every((item) => coveredRequestItemCodes.has(item.code)),
    allAcceptanceChecksCovered:
      requestPackage.acceptanceChecks.every((check) => coveredAcceptanceCheckCodes.has(check.code)),
    allRequiredFieldsCarried:
      requestPackage.requestItems.every((item) =>
        item.candidateFields.every((field) => submissionCandidateFields.includes(field))),
    submittedFieldCountMatchesRequest:
      submissionCandidateFields.length === requestPackage.requestedCandidateFieldCount,
    allCheckpointsReady:
      checkpoints.every((checkpoint) => checkpoint.readyForCandidateDocumentSubmissionCheckpoint),
    allValidatorsReady:
      validators.every((validator) => validator.readyForCandidateDocumentSubmissionValidator),
    allCheckpointsReadOnly:
      checkpoints.every((checkpoint) =>
        checkpoint.readOnly && !checkpoint.writesAllowed && !checkpoint.startsServices && !checkpoint.mutatesSiblingState),
    allValidatorsReadOnly:
      validators.every((validator) =>
        validator.readOnly && !validator.writesAllowed && !validator.startsServices && !validator.mutatesSiblingState),
    allCheckpointsRequireReviewedRealCandidateDocument:
      checkpoints.every((checkpoint) => checkpoint.requiresReviewedRealCandidateDocument),
    allValidatorsRejectMissingCandidateDocument:
      validators.every((validator) => validator.rejectsMissingCandidateDocument),
    allValidatorsRejectSyntheticCandidateDocument:
      validators.every((validator) => validator.rejectsSyntheticCandidateDocument),
    allValidatorsQuarantineUnreviewedCandidateDocument:
      validators.every((validator) => validator.quarantinesUnreviewedCandidateDocument),
    allValidatorsBlockCandidatePayloadImport:
      validators.every((validator) => validator.blocksCandidatePayloadImport),
    allValidatorsBlockCandidateEvaluation:
      validators.every((validator) => validator.blocksCandidateEvaluation),
    allValidatorsBlockCandidateAcceptance:
      validators.every((validator) => validator.blocksCandidateAcceptance),
    allValidatorsBlockApprovalGrant:
      validators.every((validator) => validator.blocksApprovalGrant),
    allValidatorsBlockSignedApproval:
      validators.every((validator) => validator.blocksSignedApproval),
    allValidatorsBlockRuntimePayload:
      validators.every((validator) => validator.blocksRuntimePayload),
    allValidatorsBlockWrites:
      validators.every((validator) => validator.blocksWrites),
    allValidatorsBlockSiblingMutation:
      validators.every((validator) => validator.blocksSiblingMutation),
    sourceRealCandidateDocumentStillAbsent:
      requestPackage.realCandidateDocumentCount === 0,
    sourceSyntheticCandidateDocumentStillAbsent:
      requestPackage.syntheticCandidateDocumentCount === 0,
    submissionRealCandidateDocumentStillAbsent:
      checkpoints.every((checkpoint) => checkpoint.realCandidateDocumentCount === 0),
    submissionPayloadImportStillBlocked:
      checkpoints.every((checkpoint) => checkpoint.importedCandidatePayloadCount === 0)
      && validators.every((validator) => validator.blocksCandidatePayloadImport),
    submissionEvaluationStillBlocked:
      checkpoints.every((checkpoint) => checkpoint.evaluatedCandidatePayloadCount === 0)
      && validators.every((validator) => validator.blocksCandidateEvaluation),
    submissionAcceptanceStillBlocked:
      checkpoints.every((checkpoint) =>
        checkpoint.acceptedCandidatePayloadCount === 0
        && checkpoint.rejectedCandidatePayloadCount === 0)
      && validators.every((validator) => validator.blocksCandidateAcceptance),
    sourceDocumentRequestStillBlocked:
      !requestPackage.candidateDocumentRequestAllowed,
    sourceDocumentIntakeStillBlocked:
      !requestPackage.candidateDocumentIntakeAllowed,
    sourcePayloadImportStillBlocked:
      !requestPackage.candidatePayloadImportAllowed,
    sourceEvaluationStillBlocked:
      !requestPackage.candidateEvaluationAllowed,
    sourceExecutionStillBlocked:
      !requestPackage.executionAllowed,
    sourceWritesStillBlocked:
      !requestPackage.writeRoutingAllowed,
    noSideEffectsAllowed:
      !requestPackage.executionAllowed
      && !requestPackage.writeRoutingAllowed
      && !requestPackage.startsServices
      && !requestPackage.mutatesSiblingState
      && !requestPackage.importsRuntimePayload,
    disabledProbeStateNotAssumedReady: true,
    nextStepRequiresReviewedRealCandidateDocumentSubmission: true,
  };
}

function createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckBlockedReasons(
  gates: SubmissionGates,
): string[] {
  const reasonByGate: Record<keyof SubmissionGates, string> = {
    sourceRequestPackageReady: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_REQUEST_PACKAGE_NOT_READY",
    checkpointCountComplete: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINTS_NOT_COMPLETE",
    validatorCountComplete: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_NOT_COMPLETE",
    checkpointVersionsSequential: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINT_VERSIONS_NOT_SEQUENTIAL",
    validatorVersionsSequential: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATOR_VERSIONS_NOT_SEQUENTIAL",
    allRequestItemsCovered: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_REQUEST_ITEMS_NOT_COVERED",
    allAcceptanceChecksCovered: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_ACCEPTANCE_CHECKS_NOT_COVERED",
    allRequiredFieldsCarried: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_FIELDS_NOT_CARRIED",
    submittedFieldCountMatchesRequest: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_FIELD_COUNT_MISMATCH",
    allCheckpointsReady: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINTS_BLOCKED",
    allValidatorsReady: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_BLOCKED",
    allCheckpointsReadOnly: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINTS_NOT_READ_ONLY",
    allValidatorsReadOnly: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_NOT_READ_ONLY",
    allCheckpointsRequireReviewedRealCandidateDocument: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINTS_ALLOW_UNREVIEWED_DOCUMENT",
    allValidatorsRejectMissingCandidateDocument: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_MISSING_DOCUMENT",
    allValidatorsRejectSyntheticCandidateDocument: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_SYNTHETIC_DOCUMENT",
    allValidatorsQuarantineUnreviewedCandidateDocument: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_SKIP_QUARANTINE",
    allValidatorsBlockCandidatePayloadImport: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_PAYLOAD_IMPORT",
    allValidatorsBlockCandidateEvaluation: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_EVALUATION",
    allValidatorsBlockCandidateAcceptance: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_ACCEPTANCE",
    allValidatorsBlockApprovalGrant: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_APPROVAL_GRANT",
    allValidatorsBlockSignedApproval: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_SIGNED_APPROVAL",
    allValidatorsBlockRuntimePayload: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_RUNTIME_PAYLOAD",
    allValidatorsBlockWrites: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_WRITES",
    allValidatorsBlockSiblingMutation: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_SIBLING_MUTATION",
    sourceRealCandidateDocumentStillAbsent: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_REAL_DOCUMENT_ALREADY_PRESENT",
    sourceSyntheticCandidateDocumentStillAbsent: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_SYNTHETIC_DOCUMENT_PRESENT",
    submissionRealCandidateDocumentStillAbsent: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_REAL_DOCUMENT_ALREADY_PRESENT",
    submissionPayloadImportStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_PAYLOAD_IMPORTED_TOO_EARLY",
    submissionEvaluationStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_EVALUATED_TOO_EARLY",
    submissionAcceptanceStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_ACCEPTED_OR_REJECTED_TOO_EARLY",
    sourceDocumentRequestStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_REQUEST_ENABLED_TOO_EARLY",
    sourceDocumentIntakeStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_INTAKE_ENABLED_TOO_EARLY",
    sourcePayloadImportStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_PAYLOAD_IMPORT_ENABLED_TOO_EARLY",
    sourceEvaluationStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_EVALUATION_ENABLED_TOO_EARLY",
    sourceExecutionStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_EXECUTION_ENABLED_TOO_EARLY",
    sourceWritesStillBlocked: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_WRITES_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SIDE_EFFECTS_ENABLED",
    disabledProbeStateNotAssumedReady: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_DISABLED_PROBE_STATE_ASSUMED_READY",
    nextStepRequiresReviewedRealCandidateDocumentSubmission: "CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_NEXT_STEP_NOT_REAL_SUBMISSION",
  };

  return (Object.entries(gates) as [keyof SubmissionGates, boolean][])
    .filter(([, passed]) => !passed)
    .map(([gate]) => reasonByGate[gate]);
}

export function createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck(
  requestPackage: RequestPackage,
): ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck {
  const checkpoints = createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoints(requestPackage);
  const validators = createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidators(checkpoints);
  const gates = createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckGates(
    requestPackage,
    checkpoints,
    validators,
  );
  const blockedReasonCodes = createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckBlockedReasons(gates);
  const readyForCandidateDocumentSubmissionPrecheck = blockedReasonCodes.length === 0;
  const submissionCandidateFieldCount = checkpoints.reduce(
    (sum, checkpoint) => sum + checkpoint.candidateFieldCount,
    0,
  );
  const candidateDocumentSubmissionPrecheckDigest = sha256StableJson({
    candidateDocumentSubmissionPrecheckVersion: "Node v1411",
    sourceCandidateDocumentRequestPackageVersion: requestPackage.candidateDocumentRequestPackageVersion,
    sourceCandidateDocumentRequestPackageDigest: requestPackage.candidateDocumentRequestPackageDigest,
    checkpoints: checkpoints.map((checkpoint) => [
      checkpoint.order,
      checkpoint.nodeVersion,
      checkpoint.code,
      checkpoint.kind,
      checkpoint.sourceRequestItemCodes,
      checkpoint.sourceRequestCheckCodes,
      checkpoint.candidateFields,
      checkpoint.readyForCandidateDocumentSubmissionCheckpoint,
    ]),
    validators: validators.map((validator) => [
      validator.order,
      validator.nodeVersion,
      validator.code,
      validator.kind,
      validator.sourceCheckpointCode,
      validator.readyForCandidateDocumentSubmissionValidator,
    ]),
    gates,
  });

  return {
    candidateDocumentSubmissionPrecheckVersion: "Node v1411",
    sourceCandidateDocumentRequestPackageVersion: requestPackage.candidateDocumentRequestPackageVersion,
    candidateDocumentSubmissionPrecheckState:
      readyForCandidateDocumentSubmissionPrecheck
        ? "ready-for-reviewed-real-candidate-document-submission-precheck"
        : "blocked",
    readyForCandidateDocumentSubmissionPrecheck,
    readyForReviewedRealCandidateDocumentSubmission: false,
    readyForCandidateDocumentIntake: false,
    readyForCandidatePayloadImport: false,
    readyForCandidateEvaluation: false,
    readyForApprovalGrant: false,
    readyForSignedApproval: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    checkpointCount: checkpoints.length,
    validatorCount: validators.length,
    sourceRequestItemCount: requestPackage.requestItemCount,
    sourceAcceptanceCheckCount: requestPackage.acceptanceCheckCount,
    readyCheckpointCount:
      checkpoints.filter((checkpoint) => checkpoint.readyForCandidateDocumentSubmissionCheckpoint).length,
    readyValidatorCount:
      validators.filter((validator) => validator.readyForCandidateDocumentSubmissionValidator).length,
    requiredCandidateFieldCount: requestPackage.requestedCandidateFieldCount,
    submissionCandidateFieldCount,
    realCandidateDocumentCount: 0,
    syntheticCandidateDocumentCount: 0,
    stagedCandidateDocumentCount: 0,
    importedCandidatePayloadCount: 0,
    evaluatedCandidatePayloadCount: 0,
    acceptedCandidatePayloadCount: 0,
    rejectedCandidatePayloadCount: 0,
    sourceCandidateDocumentRequestPackageDigest: requestPackage.candidateDocumentRequestPackageDigest,
    checkpoints,
    validators,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    candidateDocumentSubmissionPrecheckDigest,
    candidateDocumentSubmissionAllowed: false,
    candidateDocumentIntakeAllowed: false,
    candidatePayloadImportAllowed: false,
    candidateEvaluationAllowed: false,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}
