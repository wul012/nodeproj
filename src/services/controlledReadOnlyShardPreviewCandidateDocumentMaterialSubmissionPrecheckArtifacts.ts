import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VERSIONS,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckCatalog.js";
import {
  createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoints,
  createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidators,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckBuilder.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoint,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheck,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckGates,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidator,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";

type MaterialRequestPackage = ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage;
type SubmissionCheckpoint = ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoint;
type SubmissionValidator = ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidator;
type SubmissionGates = ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckGates;

function createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckGates(
  requestPackage: MaterialRequestPackage,
  checkpoints: readonly SubmissionCheckpoint[],
  validators: readonly SubmissionValidator[],
): SubmissionGates {
  const expectedVersions =
    [...CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VERSIONS];
  const sourceRequestItemCodes = new Set(checkpoints.flatMap((checkpoint) =>
    checkpoint.sourceMaterialRequestItemCodes));
  const sourceAcceptanceCheckCodes = new Set(checkpoints.flatMap((checkpoint) =>
    checkpoint.sourceMaterialAcceptanceCheckCodes));
  const submissionFields = [...new Set(checkpoints.flatMap((checkpoint) => checkpoint.materialFields))];
  const sourceFields = [...new Set(requestPackage.requestItems.flatMap((item) => item.materialFields))];

  return {
    sourceMaterialRequestPackageReady:
      requestPackage.readyForCandidateDocumentMaterialRequestPackage,
    checkpointCountComplete: checkpoints.length === 10,
    validatorCountComplete: validators.length === 10,
    checkpointVersionsSequential:
      checkpoints.map((checkpoint) => checkpoint.nodeVersion).join("|") === expectedVersions.join("|"),
    validatorVersionsSequential:
      validators.map((validator) => validator.nodeVersion).join("|") === expectedVersions.join("|"),
    allSourceRequestItemsCovered:
      requestPackage.requestItems.every((item) => sourceRequestItemCodes.has(item.code)),
    allSourceAcceptanceChecksCovered:
      requestPackage.acceptanceChecks.every((check) => sourceAcceptanceCheckCodes.has(check.code)),
    allRequiredFieldsCarried:
      sourceFields.every((field) => submissionFields.includes(field)),
    submissionFieldCountMatchesSource:
      submissionFields.length === requestPackage.requestedMaterialFieldCount,
    allCheckpointsReady:
      checkpoints.every((checkpoint) => checkpoint.readyForCandidateDocumentMaterialSubmissionCheckpoint),
    allValidatorsReady:
      validators.every((validator) => validator.readyForCandidateDocumentMaterialSubmissionValidator),
    allCheckpointsReadOnly:
      checkpoints.every((checkpoint) =>
        checkpoint.readOnly && !checkpoint.writesAllowed && !checkpoint.startsServices
        && !checkpoint.mutatesSiblingState),
    allValidatorsReadOnly:
      validators.every((validator) =>
        validator.readOnly && !validator.writesAllowed && !validator.startsServices
        && !validator.mutatesSiblingState),
    allCheckpointsRequireReviewedRealMaterial:
      checkpoints.every((checkpoint) => checkpoint.requiresReviewedRealCandidateDocumentMaterial),
    allValidatorsRejectMissingMaterial:
      validators.every((validator) => validator.rejectsMissingMaterial),
    allValidatorsRejectSyntheticMaterial:
      validators.every((validator) => validator.rejectsSyntheticMaterial),
    allValidatorsQuarantineUnreviewedMaterial:
      validators.every((validator) => validator.quarantinesUnreviewedMaterial),
    allValidatorsBlockMaterialIntake:
      validators.every((validator) => validator.blocksMaterialIntake),
    allValidatorsBlockPayloadImport:
      validators.every((validator) => validator.blocksCandidatePayloadImport),
    allValidatorsBlockEvaluation:
      validators.every((validator) => validator.blocksCandidateEvaluation),
    allValidatorsBlockAcceptance:
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
    sourceRealMaterialStillAbsent:
      requestPackage.realCandidateDocumentCount === 0,
    precheckRealMaterialStillAbsent:
      checkpoints.every((checkpoint) => checkpoint.realCandidateDocumentCount === 0),
    precheckMaterialIntakeStillBlocked:
      checkpoints.every((checkpoint) => checkpoint.reviewedRealCandidateDocumentMaterialPresent === false)
      && validators.every((validator) => validator.blocksMaterialIntake),
    precheckPayloadImportStillBlocked:
      checkpoints.every((checkpoint) => checkpoint.importedCandidatePayloadCount === 0)
      && validators.every((validator) => validator.blocksCandidatePayloadImport),
    precheckEvaluationStillBlocked:
      checkpoints.every((checkpoint) => checkpoint.evaluatedCandidatePayloadCount === 0)
      && validators.every((validator) => validator.blocksCandidateEvaluation),
    sourceDocumentSubmissionStillBlocked:
      !requestPackage.candidateDocumentSubmissionAllowed,
    sourceDocumentIntakeStillBlocked:
      !requestPackage.candidateDocumentIntakeAllowed,
    sourceMaterialIntakeStillBlocked:
      !requestPackage.candidateDocumentMaterialIntakeAllowed,
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
    sourcePackageDigestPresent:
      /^[a-f0-9]{64}$/.test(requestPackage.candidateDocumentMaterialRequestPackageDigest),
    nextStepRequiresExternalMaterialSubmission: true,
  };
}

function createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckBlockedReasons(
  gates: SubmissionGates,
): string[] {
  const reasonByGate: Record<keyof SubmissionGates, string> = {
    sourceMaterialRequestPackageReady:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_REQUEST_PACKAGE_NOT_READY",
    checkpointCountComplete: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CHECKPOINTS_NOT_COMPLETE",
    validatorCountComplete: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_NOT_COMPLETE",
    checkpointVersionsSequential:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CHECKPOINT_VERSIONS_NOT_SEQUENTIAL",
    validatorVersionsSequential:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATOR_VERSIONS_NOT_SEQUENTIAL",
    allSourceRequestItemsCovered:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_REQUEST_ITEMS_NOT_COVERED",
    allSourceAcceptanceChecksCovered:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_CHECKS_NOT_COVERED",
    allRequiredFieldsCarried: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_FIELDS_NOT_CARRIED",
    submissionFieldCountMatchesSource:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_FIELD_COUNT_MISMATCH",
    allCheckpointsReady: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CHECKPOINTS_BLOCKED",
    allValidatorsReady: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_BLOCKED",
    allCheckpointsReadOnly: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CHECKPOINTS_NOT_READ_ONLY",
    allValidatorsReadOnly: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_NOT_READ_ONLY",
    allCheckpointsRequireReviewedRealMaterial:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CHECKPOINTS_ALLOW_UNREVIEWED_MATERIAL",
    allValidatorsRejectMissingMaterial:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_MISSING_MATERIAL",
    allValidatorsRejectSyntheticMaterial:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_SYNTHETIC_MATERIAL",
    allValidatorsQuarantineUnreviewedMaterial:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_SKIP_QUARANTINE",
    allValidatorsBlockMaterialIntake:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_MATERIAL_INTAKE",
    allValidatorsBlockPayloadImport:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_PAYLOAD_IMPORT",
    allValidatorsBlockEvaluation:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_EVALUATION",
    allValidatorsBlockAcceptance:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_ACCEPTANCE",
    allValidatorsBlockApprovalGrant:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_APPROVAL_GRANT",
    allValidatorsBlockSignedApproval:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_SIGNED_APPROVAL",
    allValidatorsBlockRuntimePayload:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_RUNTIME_PAYLOAD",
    allValidatorsBlockWrites:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_WRITES",
    allValidatorsBlockSiblingMutation:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_ALLOW_SIBLING_MUTATION",
    sourceRealMaterialStillAbsent:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_REAL_MATERIAL_PRESENT",
    precheckRealMaterialStillAbsent:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_REAL_MATERIAL_PRESENT",
    precheckMaterialIntakeStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_MATERIAL_INTAKE_ENABLED_TOO_EARLY",
    precheckPayloadImportStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_PAYLOAD_IMPORTED_TOO_EARLY",
    precheckEvaluationStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_EVALUATED_TOO_EARLY",
    sourceDocumentSubmissionStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_DOCUMENT_SUBMISSION_ENABLED_TOO_EARLY",
    sourceDocumentIntakeStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_DOCUMENT_INTAKE_ENABLED_TOO_EARLY",
    sourceMaterialIntakeStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_MATERIAL_INTAKE_ENABLED_TOO_EARLY",
    sourcePayloadImportStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_PAYLOAD_IMPORT_ENABLED_TOO_EARLY",
    sourceEvaluationStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_EVALUATION_ENABLED_TOO_EARLY",
    sourceExecutionStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_EXECUTION_ENABLED_TOO_EARLY",
    sourceWritesStillBlocked:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_WRITES_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SIDE_EFFECTS_ENABLED",
    sourcePackageDigestPresent:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_DIGEST_MISSING",
    nextStepRequiresExternalMaterialSubmission:
      "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_NEXT_STEP_NOT_EXTERNAL_SUBMISSION",
  };

  return (Object.entries(gates) as [keyof SubmissionGates, boolean][])
    .filter(([, passed]) => !passed)
    .map(([gate]) => reasonByGate[gate]);
}

export function createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheck(
  requestPackage: MaterialRequestPackage,
): ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheck {
  const checkpoints =
    createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoints(requestPackage);
  const validators =
    createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidators(checkpoints);
  const gates = createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckGates(
    requestPackage,
    checkpoints,
    validators,
  );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckBlockedReasons(gates);
  const readyForCandidateDocumentMaterialSubmissionPrecheck = blockedReasonCodes.length === 0;
  const submissionMaterialFields = [...new Set(checkpoints.flatMap((checkpoint) => checkpoint.materialFields))];
  const candidateDocumentMaterialSubmissionPrecheckDigest = sha256StableJson({
    candidateDocumentMaterialSubmissionPrecheckVersion: "Node v1456",
    sourceCandidateDocumentMaterialRequestPackageVersion:
      requestPackage.candidateDocumentMaterialRequestPackageVersion,
    sourceCandidateDocumentMaterialRequestPackageDigest:
      requestPackage.candidateDocumentMaterialRequestPackageDigest,
    checkpoints: checkpoints.map((checkpoint) => [
      checkpoint.order,
      checkpoint.nodeVersion,
      checkpoint.code,
      checkpoint.kind,
      checkpoint.sourceMaterialRequestItemCodes,
      checkpoint.sourceMaterialAcceptanceCheckCodes,
      checkpoint.materialFields,
      checkpoint.readyForCandidateDocumentMaterialSubmissionCheckpoint,
    ]),
    validators: validators.map((validator) => [
      validator.order,
      validator.nodeVersion,
      validator.code,
      validator.kind,
      validator.sourceCheckpointCode,
      validator.readyForCandidateDocumentMaterialSubmissionValidator,
    ]),
    gates,
  });

  return {
    candidateDocumentMaterialSubmissionPrecheckVersion: "Node v1456",
    sourceCandidateDocumentMaterialRequestPackageVersion:
      requestPackage.candidateDocumentMaterialRequestPackageVersion,
    candidateDocumentMaterialSubmissionPrecheckState:
      readyForCandidateDocumentMaterialSubmissionPrecheck
        ? "ready-for-reviewed-real-candidate-document-material-submission-precheck"
        : "blocked",
    readyForCandidateDocumentMaterialSubmissionPrecheck,
    readyForReviewedRealCandidateDocumentMaterialSubmission: false,
    readyForCandidateDocumentMaterialIntake: false,
    readyForCandidatePayloadImport: false,
    readyForCandidateEvaluation: false,
    readyForApprovalGrant: false,
    readyForSignedApproval: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    checkpointCount: checkpoints.length,
    validatorCount: validators.length,
    sourceMaterialRequestItemCount: requestPackage.materialRequestItemCount,
    sourceMaterialAcceptanceCheckCount: requestPackage.materialAcceptanceCheckCount,
    readyCheckpointCount:
      checkpoints.filter((checkpoint) => checkpoint.readyForCandidateDocumentMaterialSubmissionCheckpoint).length,
    readyValidatorCount:
      validators.filter((validator) => validator.readyForCandidateDocumentMaterialSubmissionValidator).length,
    requiredMaterialFieldCount: requestPackage.requestedMaterialFieldCount,
    submissionMaterialFieldCount: submissionMaterialFields.length,
    reviewedRealCandidateDocumentMaterialPresent: false,
    realCandidateDocumentCount: 0,
    syntheticCandidateDocumentCount: 0,
    stagedCandidateDocumentCount: 0,
    importedCandidatePayloadCount: 0,
    evaluatedCandidatePayloadCount: 0,
    acceptedCandidatePayloadCount: 0,
    rejectedCandidatePayloadCount: 0,
    sourceCandidateDocumentMaterialRequestPackageDigest:
      requestPackage.candidateDocumentMaterialRequestPackageDigest,
    checkpoints,
    validators,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    candidateDocumentMaterialSubmissionPrecheckDigest,
    candidateDocumentSubmissionAllowed: false,
    candidateDocumentIntakeAllowed: false,
    candidateDocumentMaterialSubmissionAllowed: false,
    candidateDocumentMaterialIntakeAllowed: false,
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
