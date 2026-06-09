import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_VERSIONS,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCatalog.js";
import {
  createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestChecks,
  createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItems,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestBuilder.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheck,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestGates,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItem,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";

type IntakePacket = ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket;
type MaterialRequestItem = ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItem;
type MaterialRequestCheck = ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheck;
type MaterialRequestGates = ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestGates;

function createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestGates(
  packet: IntakePacket,
  requestItems: readonly MaterialRequestItem[],
  acceptanceChecks: readonly MaterialRequestCheck[],
): MaterialRequestGates {
  const expectedVersions = [...CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_VERSIONS];
  const sourceSlotCodes = new Set(requestItems.flatMap((item) => item.sourceIntakeSlotCodes));
  const sourceGuardCodes = new Set(requestItems.flatMap((item) => item.sourceIntakeGuardCodes));
  const requestedFields = [...new Set(requestItems.flatMap((item) => item.materialFields))];
  const sourceFields = [...new Set(packet.slots.flatMap((slot) => slot.candidateFields))];

  return {
    sourceIntakePacketReady: packet.readyForCandidateDocumentIntakePacket,
    materialRequestItemCountComplete: requestItems.length === 25,
    materialAcceptanceCheckCountComplete: acceptanceChecks.length === 25,
    itemVersionsSequential:
      requestItems.map((item) => item.nodeVersion).join("|") === expectedVersions.join("|"),
    checkVersionsSequential:
      acceptanceChecks.map((check) => check.nodeVersion).join("|") === expectedVersions.join("|"),
    allSourceSlotsCovered:
      packet.slots.every((slot) => sourceSlotCodes.has(slot.code)),
    allSourceGuardsCovered:
      packet.guards.every((guard) => sourceGuardCodes.has(guard.code)),
    allRequiredFieldsCarried:
      sourceFields.every((field) => requestedFields.includes(field)),
    requestedFieldCountMatchesSource:
      requestedFields.length === packet.intakeCandidateFieldCount,
    allItemsReady:
      requestItems.every((item) => item.readyForCandidateDocumentMaterialRequestItem),
    allChecksReady:
      acceptanceChecks.every((check) => check.readyForCandidateDocumentMaterialRequestCheck),
    allItemsReadOnly:
      requestItems.every((item) =>
        item.readOnly && !item.writesAllowed && !item.startsServices && !item.mutatesSiblingState),
    allChecksReadOnly:
      acceptanceChecks.every((check) =>
        check.readOnly && !check.writesAllowed && !check.startsServices && !check.mutatesSiblingState),
    allItemsRequireReviewedRealCandidateDocument:
      requestItems.every((item) => item.requiresReviewedRealCandidateDocument),
    allChecksRejectMissingMaterial:
      acceptanceChecks.every((check) => check.rejectsMissingMaterial),
    allChecksRejectSyntheticMaterial:
      acceptanceChecks.every((check) => check.rejectsSyntheticMaterial),
    allChecksQuarantineUnreviewedMaterial:
      acceptanceChecks.every((check) => check.quarantinesUnreviewedMaterial),
    allChecksBlockMaterialIntake:
      acceptanceChecks.every((check) => check.blocksMaterialIntake),
    allChecksBlockPayloadImport:
      acceptanceChecks.every((check) => check.blocksCandidatePayloadImport),
    allChecksBlockEvaluation:
      acceptanceChecks.every((check) => check.blocksCandidateEvaluation),
    allChecksBlockAcceptance:
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
    sourceRealDocumentStillAbsent:
      packet.realCandidateDocumentCount === 0,
    requestRealDocumentStillAbsent:
      requestItems.every((item) => item.realCandidateDocumentCount === 0),
    requestMaterialIntakeStillBlocked:
      requestItems.every((item) => item.reviewedRealCandidateDocumentMaterialPresent === false)
      && acceptanceChecks.every((check) => check.blocksMaterialIntake),
    requestPayloadImportStillBlocked:
      requestItems.every((item) => item.importedCandidatePayloadCount === 0)
      && acceptanceChecks.every((check) => check.blocksCandidatePayloadImport),
    requestEvaluationStillBlocked:
      requestItems.every((item) => item.evaluatedCandidatePayloadCount === 0)
      && acceptanceChecks.every((check) => check.blocksCandidateEvaluation),
    sourceDocumentSubmissionStillBlocked:
      !packet.candidateDocumentSubmissionAllowed,
    sourceDocumentIntakeStillBlocked:
      !packet.candidateDocumentIntakeAllowed,
    sourcePayloadImportStillBlocked:
      !packet.candidatePayloadImportAllowed,
    sourceEvaluationStillBlocked:
      !packet.candidateEvaluationAllowed,
    sourceExecutionStillBlocked:
      !packet.executionAllowed,
    sourceWritesStillBlocked:
      !packet.writeRoutingAllowed,
    noSideEffectsAllowed:
      !packet.executionAllowed
      && !packet.writeRoutingAllowed
      && !packet.startsServices
      && !packet.mutatesSiblingState
      && !packet.importsRuntimePayload,
    sourcePacketDigestPresent:
      /^[a-f0-9]{64}$/.test(packet.candidateDocumentIntakePacketDigest),
    nextStepRequiresExternalReviewedMaterial: true,
  };
}

function createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestBlockedReasons(
  gates: MaterialRequestGates,
): string[] {
  const reasonByGate: Record<keyof MaterialRequestGates, string> = {
    sourceIntakePacketReady: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_INTAKE_PACKET_NOT_READY",
    materialRequestItemCountComplete: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEMS_NOT_COMPLETE",
    materialAcceptanceCheckCountComplete: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_NOT_COMPLETE",
    itemVersionsSequential: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEM_VERSIONS_NOT_SEQUENTIAL",
    checkVersionsSequential: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECK_VERSIONS_NOT_SEQUENTIAL",
    allSourceSlotsCovered: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_SLOTS_NOT_COVERED",
    allSourceGuardsCovered: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_GUARDS_NOT_COVERED",
    allRequiredFieldsCarried: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_FIELDS_NOT_CARRIED",
    requestedFieldCountMatchesSource: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_FIELD_COUNT_MISMATCH",
    allItemsReady: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEMS_BLOCKED",
    allChecksReady: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_BLOCKED",
    allItemsReadOnly: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEMS_NOT_READ_ONLY",
    allChecksReadOnly: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_NOT_READ_ONLY",
    allItemsRequireReviewedRealCandidateDocument: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEMS_ALLOW_UNREVIEWED_MATERIAL",
    allChecksRejectMissingMaterial: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_MISSING_MATERIAL",
    allChecksRejectSyntheticMaterial: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_SYNTHETIC_MATERIAL",
    allChecksQuarantineUnreviewedMaterial: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_SKIP_QUARANTINE",
    allChecksBlockMaterialIntake: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_MATERIAL_INTAKE",
    allChecksBlockPayloadImport: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_PAYLOAD_IMPORT",
    allChecksBlockEvaluation: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_EVALUATION",
    allChecksBlockAcceptance: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_ACCEPTANCE",
    allChecksBlockApprovalGrant: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_APPROVAL_GRANT",
    allChecksBlockSignedApproval: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_SIGNED_APPROVAL",
    allChecksBlockRuntimePayload: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_RUNTIME_PAYLOAD",
    allChecksBlockWrites: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_WRITES",
    allChecksBlockSiblingMutation: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_ALLOW_SIBLING_MUTATION",
    sourceRealDocumentStillAbsent: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_REAL_DOCUMENT_PRESENT",
    requestRealDocumentStillAbsent: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_REAL_DOCUMENT_PRESENT",
    requestMaterialIntakeStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_MATERIAL_INTAKE_ENABLED_TOO_EARLY",
    requestPayloadImportStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_PAYLOAD_IMPORTED_TOO_EARLY",
    requestEvaluationStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_EVALUATED_TOO_EARLY",
    sourceDocumentSubmissionStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_SUBMISSION_ENABLED_TOO_EARLY",
    sourceDocumentIntakeStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_INTAKE_ENABLED_TOO_EARLY",
    sourcePayloadImportStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_PAYLOAD_IMPORT_ENABLED_TOO_EARLY",
    sourceEvaluationStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_EVALUATION_ENABLED_TOO_EARLY",
    sourceExecutionStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_EXECUTION_ENABLED_TOO_EARLY",
    sourceWritesStillBlocked: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_WRITES_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SIDE_EFFECTS_ENABLED",
    sourcePacketDigestPresent: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_DIGEST_MISSING",
    nextStepRequiresExternalReviewedMaterial: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_NEXT_STEP_NOT_EXTERNAL_MATERIAL",
  };

  return (Object.entries(gates) as [keyof MaterialRequestGates, boolean][])
    .filter(([, passed]) => !passed)
    .map(([gate]) => reasonByGate[gate]);
}

export function createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage(
  packet: IntakePacket,
): ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage {
  const requestItems = createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItems(packet);
  const acceptanceChecks = createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestChecks(requestItems);
  const gates = createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestGates(
    packet,
    requestItems,
    acceptanceChecks,
  );
  const blockedReasonCodes = createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestBlockedReasons(gates);
  const readyForCandidateDocumentMaterialRequestPackage = blockedReasonCodes.length === 0;
  const requestedMaterialFields = [...new Set(requestItems.flatMap((item) => item.materialFields))];
  const candidateDocumentMaterialRequestPackageDigest = sha256StableJson({
    candidateDocumentMaterialRequestPackageVersion: "Node v1446",
    sourceCandidateDocumentIntakePacketVersion: packet.candidateDocumentIntakePacketVersion,
    sourceCandidateDocumentIntakePacketDigest: packet.candidateDocumentIntakePacketDigest,
    requestItems: requestItems.map((item) => [
      item.order,
      item.nodeVersion,
      item.code,
      item.kind,
      item.sourceIntakeSlotCodes,
      item.sourceIntakeGuardCodes,
      item.materialFields,
      item.readyForCandidateDocumentMaterialRequestItem,
    ]),
    acceptanceChecks: acceptanceChecks.map((check) => [
      check.order,
      check.nodeVersion,
      check.code,
      check.kind,
      check.sourceRequestItemCode,
      check.readyForCandidateDocumentMaterialRequestCheck,
    ]),
    gates,
  });

  return {
    candidateDocumentMaterialRequestPackageVersion: "Node v1446",
    sourceCandidateDocumentIntakePacketVersion: packet.candidateDocumentIntakePacketVersion,
    candidateDocumentMaterialRequestPackageState:
      readyForCandidateDocumentMaterialRequestPackage
        ? "ready-for-reviewed-real-candidate-document-material-request"
        : "blocked",
    readyForCandidateDocumentMaterialRequestPackage,
    readyForReviewedRealCandidateDocumentSubmission: false,
    readyForCandidateDocumentMaterialIntake: false,
    readyForCandidatePayloadImport: false,
    readyForCandidateEvaluation: false,
    readyForApprovalGrant: false,
    readyForSignedApproval: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    materialRequestItemCount: requestItems.length,
    materialAcceptanceCheckCount: acceptanceChecks.length,
    sourceIntakeSlotCount: packet.intakeSlotCount,
    sourceIntakeGuardCount: packet.intakeGuardCount,
    readyMaterialRequestItemCount:
      requestItems.filter((item) => item.readyForCandidateDocumentMaterialRequestItem).length,
    readyMaterialAcceptanceCheckCount:
      acceptanceChecks.filter((check) => check.readyForCandidateDocumentMaterialRequestCheck).length,
    requiredMaterialFieldCount: packet.intakeCandidateFieldCount,
    requestedMaterialFieldCount: requestedMaterialFields.length,
    reviewedRealCandidateDocumentMaterialPresent: false,
    realCandidateDocumentCount: 0,
    syntheticCandidateDocumentCount: 0,
    stagedCandidateDocumentCount: 0,
    importedCandidatePayloadCount: 0,
    evaluatedCandidatePayloadCount: 0,
    acceptedCandidatePayloadCount: 0,
    rejectedCandidatePayloadCount: 0,
    sourceCandidateDocumentIntakePacketDigest: packet.candidateDocumentIntakePacketDigest,
    requestItems,
    acceptanceChecks,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    candidateDocumentMaterialRequestPackageDigest,
    candidateDocumentSubmissionAllowed: false,
    candidateDocumentIntakeAllowed: false,
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
