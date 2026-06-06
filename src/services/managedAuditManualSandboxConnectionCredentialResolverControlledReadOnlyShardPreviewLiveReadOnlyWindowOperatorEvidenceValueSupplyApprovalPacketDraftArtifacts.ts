import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadValueSupplyApprovalPacketDraftEvidenceFiles,
  loadValueSupplyApprovalPacketDraftEvidenceSnippets,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftEvidence.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_VERSIONS,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlotBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft(
  envelope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft {
  const files = loadValueSupplyApprovalPacketDraftEvidenceFiles();
  const snippets = loadValueSupplyApprovalPacketDraftEvidenceSnippets();
  const slots = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlots({
    sourceValueSupplyEnvelopeReady: envelope.readyForValueSupplyEnvelopeReview,
    valueSupplyEnvelopeSlots: envelope.slots,
    files,
    snippets,
  });
  const fileList = Object.values(files);
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftGates = {
    sourceValueSupplyEnvelopeReady: envelope.readyForValueSupplyEnvelopeReview,
    approvalPacketDraftSlotCountComplete:
      slots.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_VERSIONS.length,
    versionsSequential: slots.every((slot, index) =>
      slot.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_VERSIONS[index]),
    sourceValueSupplyEnvelopeSlotsReady: slots.every((slot) => slot.sourceValueSupplyEnvelopeSlotReady),
    allEvidenceFilesPresent: fileList.every((file) => file.exists),
    allEvidenceSnippetsMatched: snippets.every((snippet) => snippet.matched),
    javaV658ValueSupplyEvidenceCovered: projectEvidenceCovered(slots, "java", 12),
    miniKvV610ValueSupplyEvidenceCovered: projectEvidenceCovered(slots, "miniKv", 12),
    nodeV961ValueSupplyEnvelopeCovered: projectEvidenceCovered(slots, "node", 1),
    allDraftSlotsReadyForReview: slots.every((slot) => slot.readyForValueSupplyApprovalPacketDraft),
    allApprovalFieldsDeclared: slots.every((slot) => slot.approvalFieldNames.length > 0),
    allReviewRecordFieldsDeclared: slots.every((slot) => slot.requiredReviewRecordFields.length > 0),
    allApprovalPoliciesRequireSignedHumanApproval: slots.every((slot) =>
      slot.policy.approvalPolicy === "signed-human-approval-required"),
    missingValuePolicyFailClosed: slots.every((slot) => slot.policy.missingValuePolicy === "fail-closed"),
    malformedValuePolicyRejects: slots.every((slot) => slot.policy.malformedValuePolicy === "reject"),
    redactionPolicyRedactsBeforePersist: slots.every((slot) =>
      slot.policy.redactionPolicy === "redact-before-persist"),
    provenancePolicyRequiresSourceEvidence: slots.every((slot) =>
      slot.policy.provenancePolicy === "source-evidence-required"),
    noApprovalCaptured: slots.every((slot) => !slot.approvalCaptured),
    noApprovalGrantPresent: slots.every((slot) => !slot.approvalGrantPresent),
    noSignedApprovalPresent: slots.every((slot) => !slot.signedApprovalPresent),
    operatorIdentityStillPending: slots.every((slot) => !slot.operatorIdentityPresent),
    approvalTimestampStillPending: slots.every((slot) => !slot.approvalTimestampPresent),
    noValuesSupplied: slots.every((slot) => slot.suppliedValueCount === 0),
    noValuesAccepted: slots.every((slot) => slot.acceptedValueCount === 0),
    noValuesImported: slots.every((slot) => slot.importedValueCount === 0),
    operatorValueSupplyStillDisabled:
      !envelope.readyForOperatorValueSupply && slots.every((slot) => !slot.readyForOperatorValueSupply),
    operatorValueSubmissionStillDisabled: slots.every((slot) => !slot.readyForOperatorValueSubmission),
    evidenceImportStillBlocked:
      !envelope.readyForEvidenceImport && slots.every((slot) => !slot.readyForEvidenceImport),
    manualEntryStillBlocked:
      !envelope.readyForManualEvidenceEntry && slots.every((slot) => !slot.readyForManualEvidenceEntry),
    runtimePayloadStillBlocked: slots.every((slot) => !slot.readyForRuntimePayload),
    liveExecutionStillBlocked:
      !envelope.readyForLiveExecution && slots.every((slot) => !slot.readyForLiveExecution),
    productionExecutionStillBlocked:
      !envelope.readyForProductionExecution && slots.every((slot) => !slot.readyForProductionExecution),
    noRuntimePayloadImported:
      !envelope.importsRuntimePayload && slots.every((slot) => !slot.importsRuntimePayload),
    noSyntheticEvidenceAccepted:
      !envelope.acceptsSyntheticEvidence && slots.every((slot) => !slot.acceptsSyntheticEvidence),
    noSecretValues: !envelope.containsSecretValue && slots.every((slot) => !slot.containsSecretValue),
    allSlotsReadOnly: slots.every((slot) => slot.readOnly),
    noWritesAllowed: !envelope.writeRoutingAllowed && slots.every((slot) => !slot.writesAllowed),
    noAutomaticServiceStart:
      !envelope.startsServices && slots.every((slot) => !slot.automaticServiceStart && !slot.startsServices),
    noSiblingMutation: !envelope.mutatesSiblingState && slots.every((slot) => !slot.mutatesSiblingState),
    historicalFallbackReady: fileList
      .filter((file) => file.path.startsWith("D:/javaproj/") || file.path.startsWith("D:/C/mini-kv/"))
      .every((file) => file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces")),
    noLiveServiceRequired: true,
    nextStepRequiresSignedApprovalPacket: true,
  };
  const blockedReasonCodes = createApprovalPacketDraftBlockedReasons(gates);
  const readyForValueSupplyApprovalPacketDraft = blockedReasonCodes.length === 0;
  const approvalPacketDraftDigest = sha256StableJson({
    approvalPacketDraftVersion: "Node v986",
    sourceValueSupplyEnvelopeVersion: envelope.valueSupplyEnvelopeVersion,
    sourceValueSupplyEnvelopeDigest: envelope.valueSupplyEnvelopeDigest,
    files: fileList.map((file) => [file.id, file.exists, file.digest]),
    snippets: snippets.map((snippet) => [snippet.id, snippet.matched]),
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.project,
      slot.sourceValueSupplyEnvelopeSlotCode,
      slot.evidenceFileId,
      slot.evidenceSnippetId,
      slot.policy.code,
      slot.approvalFieldNames,
      slot.requiredReviewRecordFields,
    ]),
    gates,
  });

  return {
    approvalPacketDraftVersion: "Node v986",
    sourceValueSupplyEnvelopeVersion: "Node v961",
    javaValueSupplyEvidenceVersion: "Java v658",
    miniKvValueSupplyEvidenceVersion: "mini-kv v610",
    draftState: readyForValueSupplyApprovalPacketDraft
      ? "ready-for-value-supply-approval-packet-draft"
      : "blocked",
    readyForValueSupplyApprovalPacketDraft,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForManualEvidenceEntry: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    draftSlotCount: slots.length,
    javaEvidenceSlotCount: slots.filter((slot) => slot.project === "java").length,
    miniKvEvidenceSlotCount: slots.filter((slot) => slot.project === "miniKv").length,
    nodeValueSupplyEnvelopeSlotCount: slots.filter((slot) => slot.project === "node").length,
    fileCount: fileList.length,
    presentFileCount: fileList.filter((file) => file.exists).length,
    snippetCount: snippets.length,
    matchedSnippetCount: snippets.filter((snippet) => snippet.matched).length,
    historicalFixtureResolvedFileCount: fileList.filter((file) =>
      file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces")).length,
    approvalFieldCount: slots.reduce((count, slot) => count + slot.approvalFieldNames.length, 0),
    reviewRecordFieldCount: slots.reduce((count, slot) => count + slot.requiredReviewRecordFields.length, 0),
    suppliedValueCount: 0,
    acceptedValueCount: 0,
    importedValueCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    operatorIdentityPresent: false,
    approvalTimestampPresent: false,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    files,
    snippets,
    slots,
    approvalPacketDraftDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function projectEvidenceCovered(
  slots: readonly {
    project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject;
    evidenceFilePresent: boolean;
    evidenceSnippetMatched: boolean;
  }[],
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
  expectedCount: number,
): boolean {
  const projectSlots = slots.filter((slot) => slot.project === project);
  return projectSlots.length === expectedCount
    && projectSlots.every((slot) => slot.evidenceFilePresent && slot.evidenceSnippetMatched);
}

function createApprovalPacketDraftBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftGates,
): string[] {
  return [
    gates.sourceValueSupplyEnvelopeReady ? null : "SOURCE_VALUE_SUPPLY_ENVELOPE_NOT_READY",
    gates.approvalPacketDraftSlotCountComplete ? null : "APPROVAL_PACKET_DRAFT_SLOT_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "APPROVAL_PACKET_DRAFT_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceValueSupplyEnvelopeSlotsReady ? null : "APPROVAL_PACKET_SOURCE_ENVELOPE_SLOTS_NOT_READY",
    gates.allEvidenceFilesPresent ? null : "APPROVAL_PACKET_DRAFT_EVIDENCE_FILES_MISSING",
    gates.allEvidenceSnippetsMatched ? null : "APPROVAL_PACKET_DRAFT_EVIDENCE_SNIPPETS_NOT_MATCHED",
    gates.javaV658ValueSupplyEvidenceCovered ? null : "JAVA_V658_VALUE_SUPPLY_EVIDENCE_NOT_COVERED",
    gates.miniKvV610ValueSupplyEvidenceCovered ? null : "MINI_KV_V610_VALUE_SUPPLY_EVIDENCE_NOT_COVERED",
    gates.nodeV961ValueSupplyEnvelopeCovered ? null : "NODE_V961_VALUE_SUPPLY_ENVELOPE_NOT_COVERED",
    gates.allDraftSlotsReadyForReview ? null : "APPROVAL_PACKET_DRAFT_SLOTS_NOT_READY_FOR_REVIEW",
    gates.allApprovalFieldsDeclared ? null : "APPROVAL_PACKET_FIELDS_MISSING",
    gates.allReviewRecordFieldsDeclared ? null : "APPROVAL_PACKET_REVIEW_FIELDS_MISSING",
    gates.allApprovalPoliciesRequireSignedHumanApproval ? null : "APPROVAL_PACKET_POLICY_NOT_SIGNED_HUMAN",
    gates.missingValuePolicyFailClosed ? null : "APPROVAL_PACKET_MISSING_VALUE_POLICY_NOT_FAIL_CLOSED",
    gates.malformedValuePolicyRejects ? null : "APPROVAL_PACKET_MALFORMED_VALUE_POLICY_NOT_REJECTING",
    gates.redactionPolicyRedactsBeforePersist ? null : "APPROVAL_PACKET_REDACTION_POLICY_NOT_SAFE",
    gates.provenancePolicyRequiresSourceEvidence ? null : "APPROVAL_PACKET_PROVENANCE_POLICY_NOT_REQUIRED",
    gates.noApprovalCaptured ? null : "APPROVAL_PACKET_APPROVAL_ALREADY_CAPTURED",
    gates.noApprovalGrantPresent ? null : "APPROVAL_PACKET_GRANT_PRESENT",
    gates.noSignedApprovalPresent ? null : "APPROVAL_PACKET_SIGNED_APPROVAL_PRESENT",
    gates.operatorIdentityStillPending ? null : "APPROVAL_PACKET_OPERATOR_IDENTITY_PRESENT",
    gates.approvalTimestampStillPending ? null : "APPROVAL_PACKET_APPROVAL_TIMESTAMP_PRESENT",
    gates.noValuesSupplied ? null : "APPROVAL_PACKET_VALUES_SUPPLIED",
    gates.noValuesAccepted ? null : "APPROVAL_PACKET_VALUES_ACCEPTED",
    gates.noValuesImported ? null : "APPROVAL_PACKET_VALUES_IMPORTED",
    gates.operatorValueSupplyStillDisabled ? null : "APPROVAL_PACKET_OPERATOR_SUPPLY_ENABLED",
    gates.operatorValueSubmissionStillDisabled ? null : "APPROVAL_PACKET_OPERATOR_SUBMISSION_ENABLED",
    gates.evidenceImportStillBlocked ? null : "APPROVAL_PACKET_EVIDENCE_IMPORT_ENABLED",
    gates.manualEntryStillBlocked ? null : "APPROVAL_PACKET_MANUAL_ENTRY_ENABLED",
    gates.runtimePayloadStillBlocked ? null : "APPROVAL_PACKET_RUNTIME_PAYLOAD_ENABLED",
    gates.liveExecutionStillBlocked ? null : "APPROVAL_PACKET_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "APPROVAL_PACKET_PRODUCTION_EXECUTION_ENABLED",
    gates.noRuntimePayloadImported ? null : "APPROVAL_PACKET_RUNTIME_PAYLOAD_IMPORTED",
    gates.noSyntheticEvidenceAccepted ? null : "APPROVAL_PACKET_SYNTHETIC_EVIDENCE_ACCEPTED",
    gates.noSecretValues ? null : "APPROVAL_PACKET_SECRET_VALUE_PRESENT",
    gates.allSlotsReadOnly ? null : "APPROVAL_PACKET_SLOT_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "APPROVAL_PACKET_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "APPROVAL_PACKET_SERVICE_START_ENABLED",
    gates.noSiblingMutation ? null : "APPROVAL_PACKET_MUTATES_SIBLING_STATE",
    gates.historicalFallbackReady ? null : "APPROVAL_PACKET_HISTORICAL_FALLBACK_NOT_READY",
    gates.noLiveServiceRequired ? null : "APPROVAL_PACKET_LIVE_SERVICE_REQUIRED",
    gates.nextStepRequiresSignedApprovalPacket ? null : "APPROVAL_PACKET_NEXT_STEP_NOT_SIGNED_APPROVAL",
  ].filter((reason): reason is string => reason !== null);
}
