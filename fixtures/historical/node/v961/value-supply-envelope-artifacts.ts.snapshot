import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadValueSupplyEnvelopeEvidenceFiles,
  loadValueSupplyEnvelopeEvidenceSnippets,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeEvidence.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_ENVELOPE_VERSIONS,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlotBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope(
  freshSiblingIntake: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope {
  const files = loadValueSupplyEnvelopeEvidenceFiles();
  const snippets = loadValueSupplyEnvelopeEvidenceSnippets();
  const slots = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlots({
    sourceFreshSiblingIntakeReady: freshSiblingIntake.readyForFreshSiblingEvidenceIntake,
    freshSiblingIntakeSlots: freshSiblingIntake.slots,
    files,
    snippets,
  });
  const fileList = Object.values(files);
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeGates = {
    sourceFreshSiblingIntakeReady: freshSiblingIntake.readyForFreshSiblingEvidenceIntake,
    valueSupplyEnvelopeSlotCountComplete:
      slots.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_ENVELOPE_VERSIONS.length,
    versionsSequential: slots.every((slot, index) =>
      slot.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_ENVELOPE_VERSIONS[index]),
    sourceFreshSiblingSlotsReady: slots.every((slot) => slot.sourceFreshSiblingIntakeSlotReady),
    allEvidenceFilesPresent: fileList.every((file) => file.exists),
    allEvidenceSnippetsMatched: snippets.every((snippet) => snippet.matched),
    javaV633ValueDraftEvidenceCovered: projectEvidenceCovered(slots, "java", 12),
    miniKvV585ValueDraftEvidenceCovered: projectEvidenceCovered(slots, "miniKv", 12),
    nodeV936FreshSiblingIntakeCovered: projectEvidenceCovered(slots, "node", 1),
    allEnvelopeSlotsReadyForReview: slots.every((slot) => slot.readyForValueSupplyEnvelopeReview),
    noValuesSupplied: slots.every((slot) => slot.suppliedValueCount === 0),
    noValuesAccepted: slots.every((slot) => slot.acceptedValueCount === 0),
    noValuesImported: slots.every((slot) => slot.importedValueCount === 0),
    allEnvelopeFieldsDeclared: slots.every((slot) => slot.envelopeFieldNames.length > 0),
    allSupplyPoliciesExplicit: slots.every((slot) =>
      slot.valueSupplyPolicy === "explicit-operator-value-required"),
    missingValuePolicyBlocksSupply: slots.every((slot) => slot.missingValuePolicy === "block-value-supply"),
    operatorValueSupplyStillDisabled:
      !freshSiblingIntake.readyForOperatorValueSupply && slots.every((slot) => !slot.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !freshSiblingIntake.readyForEvidenceImport && slots.every((slot) => !slot.readyForEvidenceImport),
    manualEntryStillBlocked:
      !freshSiblingIntake.readyForManualEvidenceEntry && slots.every((slot) => !slot.readyForManualEvidenceEntry),
    liveExecutionStillBlocked:
      !freshSiblingIntake.readyForLiveExecution && slots.every((slot) => !slot.readyForLiveExecution),
    productionExecutionStillBlocked:
      !freshSiblingIntake.readyForProductionExecution && slots.every((slot) => !slot.readyForProductionExecution),
    noRuntimePayloadImported:
      !freshSiblingIntake.importsRuntimePayload && slots.every((slot) => !slot.importsRuntimePayload),
    noSyntheticEvidenceAccepted:
      !freshSiblingIntake.acceptsSyntheticEvidence && slots.every((slot) => !slot.acceptsSyntheticEvidence),
    noSecretValues: !freshSiblingIntake.containsSecretValue && slots.every((slot) => !slot.containsSecretValue),
    allSlotsReadOnly: slots.every((slot) => slot.readOnly),
    noWritesAllowed: !freshSiblingIntake.writeRoutingAllowed && slots.every((slot) => !slot.writesAllowed),
    noAutomaticServiceStart:
      !freshSiblingIntake.startsServices && slots.every((slot) => !slot.automaticServiceStart && !slot.startsServices),
    noSiblingMutation: !freshSiblingIntake.mutatesSiblingState && slots.every((slot) => !slot.mutatesSiblingState),
    historicalFallbackReady: fileList.every((file) =>
      file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces")),
    noLiveServiceRequired: true,
    nextStepRequiresExplicitOperatorValues: true,
  };
  const blockedReasonCodes = createValueSupplyEnvelopeBlockedReasons(gates);
  const readyForValueSupplyEnvelopeReview = blockedReasonCodes.length === 0;
  const valueSupplyEnvelopeDigest = sha256StableJson({
    valueSupplyEnvelopeVersion: "Node v961",
    sourceFreshSiblingIntakeVersion: freshSiblingIntake.freshSiblingIntakeVersion,
    sourceFreshSiblingIntakeDigest: freshSiblingIntake.freshSiblingIntakeDigest,
    files: fileList.map((file) => [file.id, file.exists, file.digest]),
    snippets: snippets.map((snippet) => [snippet.id, snippet.matched]),
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.project,
      slot.sourceFreshSiblingIntakeSlotCode,
      slot.evidenceFileId,
      slot.evidenceSnippetId,
      slot.envelopeFieldNames,
      slot.envelopeValueState,
    ]),
    gates,
  });

  return {
    valueSupplyEnvelopeVersion: "Node v961",
    sourceFreshSiblingIntakeVersion: "Node v936",
    javaValueDraftEvidenceVersion: "Java v633",
    javaValueDraftResponseVersion: "Java v632",
    miniKvValueDraftEvidenceVersion: "mini-kv v585",
    envelopeState: readyForValueSupplyEnvelopeReview
      ? "ready-for-value-supply-envelope-review"
      : "blocked",
    readyForValueSupplyEnvelopeReview,
    readyForOperatorValueSupply: false,
    readyForEvidenceImport: false,
    readyForManualEvidenceEntry: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    envelopeSlotCount: slots.length,
    javaEvidenceSlotCount: slots.filter((slot) => slot.project === "java").length,
    miniKvEvidenceSlotCount: slots.filter((slot) => slot.project === "miniKv").length,
    nodeFreshSiblingIntakeSlotCount: slots.filter((slot) => slot.project === "node").length,
    fileCount: fileList.length,
    presentFileCount: fileList.filter((file) => file.exists).length,
    snippetCount: snippets.length,
    matchedSnippetCount: snippets.filter((snippet) => snippet.matched).length,
    historicalFixtureResolvedFileCount:
      fileList.filter((file) => file.resolvedPath.replace(/\\/g, "/")
        .includes("fixtures/historical/sibling-workspaces")).length,
    suppliedValueCount: 0,
    acceptedValueCount: 0,
    importedValueCount: 0,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    files,
    snippets,
    slots,
    valueSupplyEnvelopeDigest,
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
    project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject;
    evidenceFilePresent: boolean;
    evidenceSnippetMatched: boolean;
  }[],
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject,
  expectedCount: number,
): boolean {
  const projectSlots = slots.filter((slot) => slot.project === project);
  return projectSlots.length === expectedCount
    && projectSlots.every((slot) => slot.evidenceFilePresent && slot.evidenceSnippetMatched);
}

function createValueSupplyEnvelopeBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeGates,
): string[] {
  return [
    gates.sourceFreshSiblingIntakeReady ? null : "SOURCE_FRESH_SIBLING_INTAKE_NOT_READY",
    gates.valueSupplyEnvelopeSlotCountComplete ? null : "VALUE_SUPPLY_ENVELOPE_SLOT_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "VALUE_SUPPLY_ENVELOPE_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceFreshSiblingSlotsReady ? null : "VALUE_SUPPLY_SOURCE_FRESH_SIBLING_SLOTS_NOT_READY",
    gates.allEvidenceFilesPresent ? null : "VALUE_SUPPLY_ENVELOPE_EVIDENCE_FILES_MISSING",
    gates.allEvidenceSnippetsMatched ? null : "VALUE_SUPPLY_ENVELOPE_EVIDENCE_SNIPPETS_NOT_MATCHED",
    gates.javaV633ValueDraftEvidenceCovered ? null : "JAVA_V633_VALUE_DRAFT_EVIDENCE_NOT_COVERED",
    gates.miniKvV585ValueDraftEvidenceCovered ? null : "MINI_KV_V585_VALUE_DRAFT_EVIDENCE_NOT_COVERED",
    gates.nodeV936FreshSiblingIntakeCovered ? null : "NODE_V936_FRESH_SIBLING_INTAKE_NOT_COVERED",
    gates.allEnvelopeSlotsReadyForReview ? null : "VALUE_SUPPLY_ENVELOPE_SLOTS_NOT_READY_FOR_REVIEW",
    gates.noValuesSupplied ? null : "VALUE_SUPPLY_VALUES_SUPPLIED",
    gates.noValuesAccepted ? null : "VALUE_SUPPLY_VALUES_ACCEPTED",
    gates.noValuesImported ? null : "VALUE_SUPPLY_VALUES_IMPORTED",
    gates.allEnvelopeFieldsDeclared ? null : "VALUE_SUPPLY_ENVELOPE_FIELDS_MISSING",
    gates.allSupplyPoliciesExplicit ? null : "VALUE_SUPPLY_POLICIES_NOT_EXPLICIT",
    gates.missingValuePolicyBlocksSupply ? null : "VALUE_SUPPLY_MISSING_VALUE_POLICY_NOT_BLOCKING",
    gates.operatorValueSupplyStillDisabled ? null : "VALUE_SUPPLY_OPERATOR_SUPPLY_ENABLED",
    gates.evidenceImportStillBlocked ? null : "VALUE_SUPPLY_EVIDENCE_IMPORT_ENABLED",
    gates.manualEntryStillBlocked ? null : "VALUE_SUPPLY_MANUAL_ENTRY_ENABLED",
    gates.liveExecutionStillBlocked ? null : "VALUE_SUPPLY_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "VALUE_SUPPLY_PRODUCTION_EXECUTION_ENABLED",
    gates.noRuntimePayloadImported ? null : "VALUE_SUPPLY_RUNTIME_PAYLOAD_IMPORTED",
    gates.noSyntheticEvidenceAccepted ? null : "VALUE_SUPPLY_SYNTHETIC_EVIDENCE_ACCEPTED",
    gates.noSecretValues ? null : "VALUE_SUPPLY_SECRET_VALUE_PRESENT",
    gates.allSlotsReadOnly ? null : "VALUE_SUPPLY_SLOT_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "VALUE_SUPPLY_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "VALUE_SUPPLY_SERVICE_START_ENABLED",
    gates.noSiblingMutation ? null : "VALUE_SUPPLY_MUTATES_SIBLING_STATE",
    gates.historicalFallbackReady ? null : "VALUE_SUPPLY_HISTORICAL_FALLBACK_NOT_READY",
    gates.noLiveServiceRequired ? null : "VALUE_SUPPLY_LIVE_SERVICE_REQUIRED",
    gates.nextStepRequiresExplicitOperatorValues ? null : "VALUE_SUPPLY_NEXT_VALUES_NOT_EXPLICIT",
  ].filter((reason): reason is string => reason !== null);
}
