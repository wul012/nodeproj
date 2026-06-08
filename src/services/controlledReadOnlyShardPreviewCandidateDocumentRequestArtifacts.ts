import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_REQUEST_VERSIONS,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestCatalog.js";
import {
  createControlledReadOnlyShardPreviewCandidateDocumentRequestChecks,
  createControlledReadOnlyShardPreviewCandidateDocumentRequestItems,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestBuilder.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentRequestCheck,
  ControlledReadOnlyShardPreviewCandidateDocumentRequestGates,
  ControlledReadOnlyShardPreviewCandidateDocumentRequestItem,
  ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeTypes.js";

type CandidateIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake;
type RequestItem = ControlledReadOnlyShardPreviewCandidateDocumentRequestItem;
type RequestCheck = ControlledReadOnlyShardPreviewCandidateDocumentRequestCheck;
type RequestGates = ControlledReadOnlyShardPreviewCandidateDocumentRequestGates;

function createControlledReadOnlyShardPreviewCandidateDocumentRequestGates(
  intake: CandidateIntake,
  requestItems: readonly RequestItem[],
  acceptanceChecks: readonly RequestCheck[],
): RequestGates {
  const expectedVersions = [...CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_REQUEST_VERSIONS];
  const coveredSlotCodes = new Set(requestItems.flatMap((item) => item.sourceSlotCodes));
  const coveredGuardCodes = new Set(requestItems.flatMap((item) => item.sourceGuardCodes));
  const requestedCandidateFields = requestItems.flatMap((item) => item.candidateFields);

  return {
    sourceCandidateIntakeReady: intake.readyForComparedEvidenceCandidateIntakePreflightContract,
    requestItemCountComplete: requestItems.length === 15,
    acceptanceCheckCountComplete: acceptanceChecks.length === 15,
    requestVersionsSequential:
      requestItems.map((item) => item.nodeVersion).join("|") === expectedVersions.join("|"),
    checkVersionsSequential:
      acceptanceChecks.map((check) => check.nodeVersion).join("|") === expectedVersions.join("|"),
    allIntakeSlotsCovered:
      intake.slots.every((slot) => coveredSlotCodes.has(slot.code)),
    allIntakeGuardsCovered:
      intake.guards.every((guard) => coveredGuardCodes.has(guard.code)),
    allRequiredFieldsRequested:
      intake.slots.every((slot) =>
        slot.candidateFields.every((field) => requestedCandidateFields.includes(field))),
    requestedFieldCountMatchesIntake:
      requestedCandidateFields.length === intake.requiredCandidateFieldCount,
    allRequestItemsReady:
      requestItems.every((item) => item.readyForCandidateDocumentRequestItem),
    allAcceptanceChecksReady:
      acceptanceChecks.every((check) => check.readyForCandidateDocumentRequestCheck),
    allRequestItemsReadOnly:
      requestItems.every((item) =>
        item.readOnly && !item.writesAllowed && !item.startsServices && !item.mutatesSiblingState),
    allAcceptanceChecksReadOnly:
      acceptanceChecks.every((check) =>
        check.readOnly && !check.writesAllowed && !check.startsServices && !check.mutatesSiblingState),
    allRequestsRequireRealCandidateDocument:
      requestItems.every((item) => item.requiresRealCandidateDocument),
    allChecksRejectMissingCandidateDocument:
      acceptanceChecks.every((check) => check.rejectsMissingCandidateDocument),
    allChecksRejectSyntheticCandidateDocument:
      acceptanceChecks.every((check) => check.rejectsSyntheticCandidateDocument),
    allChecksQuarantineUnreviewedCandidateDocument:
      acceptanceChecks.every((check) => check.quarantinesUnreviewedCandidateDocument),
    allChecksBlockCandidatePayloadImport:
      acceptanceChecks.every((check) => check.blocksCandidatePayloadImport),
    allChecksBlockCandidateEvaluation:
      acceptanceChecks.every((check) => check.blocksCandidateEvaluation),
    allChecksBlockCandidateAcceptance:
      acceptanceChecks.every((check) => check.blocksCandidateAcceptance),
    allChecksBlockApprovalGrant:
      acceptanceChecks.every((check) => check.blocksApprovalGrant),
    allChecksBlockSignedApproval:
      acceptanceChecks.every((check) => check.blocksSignedApproval),
    allChecksBlockRuntimePayload:
      acceptanceChecks.every((check) => check.blocksRuntimePayload),
    allChecksBlockWrites:
      acceptanceChecks.every((check) => check.blocksWrites),
    allChecksBlockSiblingMutation:
      acceptanceChecks.every((check) => check.blocksSiblingMutation),
    sourceRealCandidateDocumentStillAbsent:
      intake.realCandidateDocumentCount === 0,
    sourceSyntheticCandidateDocumentStillAbsent:
      intake.syntheticCandidateDocumentCount === 0,
    requestRealCandidateDocumentStillAbsent:
      requestItems.every((item) => item.realCandidateDocumentCount === 0),
    requestPayloadImportStillBlocked:
      requestItems.every((item) => item.importedCandidatePayloadCount === 0)
      && acceptanceChecks.every((check) => check.blocksCandidatePayloadImport),
    requestEvaluationStillBlocked:
      requestItems.every((item) => item.evaluatedCandidatePayloadCount === 0)
      && acceptanceChecks.every((check) => check.blocksCandidateEvaluation),
    requestAcceptanceStillBlocked:
      requestItems.every((item) =>
        item.acceptedCandidatePayloadCount === 0
        && item.rejectedCandidatePayloadCount === 0)
      && acceptanceChecks.every((check) => check.blocksCandidateAcceptance),
    sourceDocumentIntakeStillBlocked:
      !intake.candidateDocumentIntakeAllowed,
    sourcePayloadImportStillBlocked:
      !intake.candidatePayloadImportAllowed,
    sourceEvaluationStillBlocked:
      !intake.candidateEvaluationAllowed,
    sourceExecutionStillBlocked:
      !intake.executionAllowed,
    sourceWritesStillBlocked:
      !intake.writeRoutingAllowed,
    noSideEffectsAllowed:
      !intake.executionAllowed
      && !intake.writeRoutingAllowed
      && !intake.startsServices
      && !intake.mutatesSiblingState
      && !intake.importsRuntimePayload,
    nextStepRequiresRealComparedPackageEvidenceCandidateDocument: true,
  };
}

function createControlledReadOnlyShardPreviewCandidateDocumentRequestBlockedReasons(
  gates: RequestGates,
): string[] {
  const reasonByGate: Record<keyof RequestGates, string> = {
    sourceCandidateIntakeReady: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_INTAKE_NOT_READY",
    requestItemCountComplete: "CANDIDATE_DOCUMENT_REQUEST_ITEMS_NOT_COMPLETE",
    acceptanceCheckCountComplete: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_NOT_COMPLETE",
    requestVersionsSequential: "CANDIDATE_DOCUMENT_REQUEST_ITEM_VERSIONS_NOT_SEQUENTIAL",
    checkVersionsSequential: "CANDIDATE_DOCUMENT_REQUEST_CHECK_VERSIONS_NOT_SEQUENTIAL",
    allIntakeSlotsCovered: "CANDIDATE_DOCUMENT_REQUEST_INTAKE_SLOTS_NOT_COVERED",
    allIntakeGuardsCovered: "CANDIDATE_DOCUMENT_REQUEST_INTAKE_GUARDS_NOT_COVERED",
    allRequiredFieldsRequested: "CANDIDATE_DOCUMENT_REQUEST_FIELDS_NOT_REQUESTED",
    requestedFieldCountMatchesIntake: "CANDIDATE_DOCUMENT_REQUEST_FIELD_COUNT_MISMATCH",
    allRequestItemsReady: "CANDIDATE_DOCUMENT_REQUEST_ITEMS_BLOCKED",
    allAcceptanceChecksReady: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_BLOCKED",
    allRequestItemsReadOnly: "CANDIDATE_DOCUMENT_REQUEST_ITEMS_NOT_READ_ONLY",
    allAcceptanceChecksReadOnly: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_NOT_READ_ONLY",
    allRequestsRequireRealCandidateDocument: "CANDIDATE_DOCUMENT_REQUESTS_ALLOW_MISSING_REAL_DOCUMENT",
    allChecksRejectMissingCandidateDocument: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_MISSING_DOCUMENT",
    allChecksRejectSyntheticCandidateDocument: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_SYNTHETIC_DOCUMENT",
    allChecksQuarantineUnreviewedCandidateDocument: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_SKIP_QUARANTINE",
    allChecksBlockCandidatePayloadImport: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_PAYLOAD_IMPORT",
    allChecksBlockCandidateEvaluation: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_EVALUATION",
    allChecksBlockCandidateAcceptance: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_ACCEPTANCE",
    allChecksBlockApprovalGrant: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_APPROVAL_GRANT",
    allChecksBlockSignedApproval: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_SIGNED_APPROVAL",
    allChecksBlockRuntimePayload: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_RUNTIME_PAYLOAD",
    allChecksBlockWrites: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_WRITES",
    allChecksBlockSiblingMutation: "CANDIDATE_DOCUMENT_REQUEST_CHECKS_ALLOW_SIBLING_MUTATION",
    sourceRealCandidateDocumentStillAbsent: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_REAL_DOCUMENT_ALREADY_PRESENT",
    sourceSyntheticCandidateDocumentStillAbsent: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_SYNTHETIC_DOCUMENT_PRESENT",
    requestRealCandidateDocumentStillAbsent: "CANDIDATE_DOCUMENT_REQUEST_REAL_DOCUMENT_ALREADY_PRESENT",
    requestPayloadImportStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_PAYLOAD_IMPORTED_TOO_EARLY",
    requestEvaluationStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_EVALUATED_TOO_EARLY",
    requestAcceptanceStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_ACCEPTED_OR_REJECTED_TOO_EARLY",
    sourceDocumentIntakeStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_INTAKE_ENABLED_TOO_EARLY",
    sourcePayloadImportStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_PAYLOAD_IMPORT_ENABLED_TOO_EARLY",
    sourceEvaluationStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_EVALUATION_ENABLED_TOO_EARLY",
    sourceExecutionStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_EXECUTION_ENABLED_TOO_EARLY",
    sourceWritesStillBlocked: "CANDIDATE_DOCUMENT_REQUEST_SOURCE_WRITES_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "CANDIDATE_DOCUMENT_REQUEST_SIDE_EFFECTS_ENABLED",
    nextStepRequiresRealComparedPackageEvidenceCandidateDocument: "CANDIDATE_DOCUMENT_REQUEST_NEXT_STEP_NOT_REAL_DOCUMENT",
  };

  return (Object.entries(gates) as [keyof RequestGates, boolean][])
    .filter(([, passed]) => !passed)
    .map(([gate]) => reasonByGate[gate]);
}

export function createControlledReadOnlyShardPreviewCandidateDocumentRequestPackage(
  intake: CandidateIntake,
): ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage {
  const requestItems = createControlledReadOnlyShardPreviewCandidateDocumentRequestItems(intake);
  const acceptanceChecks = createControlledReadOnlyShardPreviewCandidateDocumentRequestChecks(requestItems);
  const gates = createControlledReadOnlyShardPreviewCandidateDocumentRequestGates(
    intake,
    requestItems,
    acceptanceChecks,
  );
  const blockedReasonCodes = createControlledReadOnlyShardPreviewCandidateDocumentRequestBlockedReasons(gates);
  const readyForCandidateDocumentRequestPackage = blockedReasonCodes.length === 0;
  const requestedCandidateFieldCount = requestItems.reduce(
    (sum, item) => sum + item.candidateFieldCount,
    0,
  );
  const candidateDocumentRequestPackageDigest = sha256StableJson({
    candidateDocumentRequestPackageVersion: "Node v1386",
    sourceCandidateIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion,
    sourceCandidateIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest,
    requestItems: requestItems.map((item) => [
      item.order,
      item.nodeVersion,
      item.code,
      item.kind,
      item.sourceSlotCodes,
      item.sourceGuardCodes,
      item.candidateFields,
      item.readyForCandidateDocumentRequestItem,
    ]),
    acceptanceChecks: acceptanceChecks.map((check) => [
      check.order,
      check.nodeVersion,
      check.code,
      check.kind,
      check.sourceItemCode,
      check.readyForCandidateDocumentRequestCheck,
    ]),
    gates,
  });

  return {
    candidateDocumentRequestPackageVersion: "Node v1386",
    sourceCandidateIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion,
    candidateDocumentRequestPackageState:
      readyForCandidateDocumentRequestPackage
        ? "ready-for-real-compared-package-evidence-candidate-document-request"
        : "blocked",
    readyForCandidateDocumentRequestPackage,
    readyForRealComparedPackageEvidenceCandidateDocument: false,
    readyForCandidateDocumentIntake: false,
    readyForCandidatePayloadImport: false,
    readyForCandidateEvaluation: false,
    readyForApprovalGrant: false,
    readyForSignedApproval: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    requestItemCount: requestItems.length,
    acceptanceCheckCount: acceptanceChecks.length,
    sourceIntakeSlotCount: intake.intakeSlotCount,
    sourceIntakeGuardCount: intake.intakeGuardCount,
    readyRequestItemCount:
      requestItems.filter((item) => item.readyForCandidateDocumentRequestItem).length,
    readyAcceptanceCheckCount:
      acceptanceChecks.filter((check) => check.readyForCandidateDocumentRequestCheck).length,
    requiredCandidateFieldCount: intake.requiredCandidateFieldCount,
    requestedCandidateFieldCount,
    realCandidateDocumentCount: 0,
    syntheticCandidateDocumentCount: 0,
    stagedCandidateDocumentCount: 0,
    importedCandidatePayloadCount: 0,
    evaluatedCandidatePayloadCount: 0,
    acceptedCandidatePayloadCount: 0,
    rejectedCandidatePayloadCount: 0,
    sourceCandidateIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest,
    requestItems,
    acceptanceChecks,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    candidateDocumentRequestPackageDigest,
    candidateDocumentRequestAllowed: false,
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
