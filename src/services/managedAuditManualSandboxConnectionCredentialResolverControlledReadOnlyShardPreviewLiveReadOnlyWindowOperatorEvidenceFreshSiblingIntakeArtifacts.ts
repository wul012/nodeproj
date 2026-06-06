import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadFreshSiblingEvidenceFiles,
  loadFreshSiblingEvidenceSnippets,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeEvidence.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_FRESH_SIBLING_INTAKE_VERSIONS,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlotBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake(
  valueDraft: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake {
  const files = loadFreshSiblingEvidenceFiles();
  const snippets = loadFreshSiblingEvidenceSnippets();
  const slots = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlots({
    sourceValueDraftReady: valueDraft.readyForOperatorEvidenceValueDraft,
    valueDraftSlots: valueDraft.slots,
    files,
    snippets,
  });
  const fileList = Object.values(files);
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeGates = {
    sourceValueDraftReady: valueDraft.readyForOperatorEvidenceValueDraft,
    intakeSlotCountComplete:
      slots.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_FRESH_SIBLING_INTAKE_VERSIONS.length,
    versionsSequential: slots.every((slot, index) =>
      slot.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_FRESH_SIBLING_INTAKE_VERSIONS[index]),
    sourceValueDraftSlotsReady: slots.every((slot) => slot.sourceValueDraftSlotReady),
    allEvidenceFilesPresent: fileList.every((file) => file.exists),
    allEvidenceSnippetsMatched: snippets.every((snippet) => snippet.matched),
    javaV608EvidenceCovered: projectEvidenceCovered(slots, "java", 12),
    miniKvV560EvidenceCovered: projectEvidenceCovered(slots, "miniKv", 12),
    nodeV911ValueDraftCovered: projectEvidenceCovered(slots, "node", 1),
    valueDraftStillHasNoActualValues: valueDraft.slots.every((slot) => slot.actualValueState === "not-supplied"),
    evidenceImportStillBlocked: !valueDraft.readyForEvidenceImport
      && slots.every((slot) => !slot.readyForEvidenceImport),
    manualEntryStillBlocked: !valueDraft.readyForManualEvidenceEntry
      && slots.every((slot) => !slot.readyForManualEvidenceEntry),
    liveExecutionStillBlocked: !valueDraft.readyForLiveExecution
      && slots.every((slot) => !slot.readyForLiveExecution),
    productionExecutionStillBlocked: !valueDraft.readyForProductionExecution
      && slots.every((slot) => !slot.readyForProductionExecution),
    noRuntimePayloadImported: !valueDraft.importsRuntimePayload
      && slots.every((slot) => !slot.importsRuntimePayload),
    noSyntheticEvidenceAccepted: !valueDraft.acceptsSyntheticEvidence
      && slots.every((slot) => !slot.acceptsSyntheticEvidence),
    noSecretValues: !valueDraft.containsSecretValue
      && slots.every((slot) => !slot.containsSecretValue),
    allSlotsReadOnly: slots.every((slot) => slot.readOnly),
    noWritesAllowed: !valueDraft.writeRoutingAllowed && slots.every((slot) => !slot.writesAllowed),
    noAutomaticServiceStart: !valueDraft.startsServices
      && slots.every((slot) => !slot.automaticServiceStart && !slot.startsServices),
    noSiblingMutation: !valueDraft.mutatesSiblingState && slots.every((slot) => !slot.mutatesSiblingState),
    crossProjectVersionsCleanAndSynced: true,
    historicalFallbackReady: fileList.every((file) =>
      file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces")),
    noLiveServiceRequired: true,
    nextValueSupplyRequiresExplicitValues: true,
  };
  const blockedReasonCodes = createFreshSiblingIntakeBlockedReasons(gates);
  const readyForFreshSiblingEvidenceIntake = blockedReasonCodes.length === 0;
  const freshSiblingIntakeDigest = sha256StableJson({
    freshSiblingIntakeVersion: "Node v936",
    sourceValueDraftVersion: valueDraft.valueDraftVersion,
    sourceValueDraftDigest: valueDraft.valueDraftDigest,
    files: fileList.map((file) => [file.id, file.exists, file.digest]),
    snippets: snippets.map((snippet) => [snippet.id, snippet.matched]),
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.project,
      slot.sourceValueDraftSlotCode,
      slot.evidenceFileId,
      slot.evidenceSnippetId,
    ]),
    gates,
  });

  return {
    freshSiblingIntakeVersion: "Node v936",
    sourceValueDraftVersion: "Node v911",
    javaEvidenceVersion: "Java v608",
    miniKvEvidenceVersion: "mini-kv v560",
    intakeState: readyForFreshSiblingEvidenceIntake
      ? "ready-for-fresh-sibling-evidence-intake"
      : "blocked",
    readyForFreshSiblingEvidenceIntake,
    readyForOperatorValueSupply: false,
    readyForEvidenceImport: false,
    readyForManualEvidenceEntry: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    intakeSlotCount: slots.length,
    javaEvidenceSlotCount: slots.filter((slot) => slot.project === "java").length,
    miniKvEvidenceSlotCount: slots.filter((slot) => slot.project === "miniKv").length,
    nodeValueDraftAlignmentSlotCount: slots.filter((slot) => slot.project === "node").length,
    crossProjectCloseoutSlotCount:
      slots.filter((slot) => slot.kind === "cross-project-fresh-intake-closeout-slot").length,
    fileCount: fileList.length,
    presentFileCount: fileList.filter((file) => file.exists).length,
    snippetCount: snippets.length,
    matchedSnippetCount: snippets.filter((snippet) => snippet.matched).length,
    historicalFixtureResolvedFileCount:
      fileList.filter((file) => file.resolvedPath.replace(/\\/g, "/")
        .includes("fixtures/historical/sibling-workspaces")).length,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    files,
    snippets,
    slots,
    freshSiblingIntakeDigest,
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
    project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject;
    evidenceFilePresent: boolean;
    evidenceSnippetMatched: boolean;
  }[],
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject,
  expectedCount: number,
): boolean {
  const projectSlots = slots.filter((slot) => slot.project === project);
  return projectSlots.length === expectedCount
    && projectSlots.every((slot) => slot.evidenceFilePresent && slot.evidenceSnippetMatched);
}

function createFreshSiblingIntakeBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeGates,
): string[] {
  return [
    gates.sourceValueDraftReady ? null : "SOURCE_VALUE_DRAFT_NOT_READY",
    gates.intakeSlotCountComplete ? null : "FRESH_SIBLING_INTAKE_SLOT_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "FRESH_SIBLING_INTAKE_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceValueDraftSlotsReady ? null : "FRESH_SIBLING_SOURCE_VALUE_DRAFT_SLOTS_NOT_READY",
    gates.allEvidenceFilesPresent ? null : "FRESH_SIBLING_EVIDENCE_FILES_MISSING",
    gates.allEvidenceSnippetsMatched ? null : "FRESH_SIBLING_EVIDENCE_SNIPPETS_NOT_MATCHED",
    gates.javaV608EvidenceCovered ? null : "JAVA_V608_EVIDENCE_NOT_COVERED",
    gates.miniKvV560EvidenceCovered ? null : "MINI_KV_V560_EVIDENCE_NOT_COVERED",
    gates.nodeV911ValueDraftCovered ? null : "NODE_V911_VALUE_DRAFT_NOT_COVERED",
    gates.valueDraftStillHasNoActualValues ? null : "FRESH_SIBLING_VALUE_DRAFT_HAS_ACTUAL_VALUES",
    gates.evidenceImportStillBlocked ? null : "FRESH_SIBLING_EVIDENCE_IMPORT_ENABLED",
    gates.manualEntryStillBlocked ? null : "FRESH_SIBLING_MANUAL_ENTRY_ENABLED",
    gates.liveExecutionStillBlocked ? null : "FRESH_SIBLING_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "FRESH_SIBLING_PRODUCTION_EXECUTION_ENABLED",
    gates.noRuntimePayloadImported ? null : "FRESH_SIBLING_RUNTIME_PAYLOAD_IMPORTED",
    gates.noSyntheticEvidenceAccepted ? null : "FRESH_SIBLING_SYNTHETIC_EVIDENCE_ACCEPTED",
    gates.noSecretValues ? null : "FRESH_SIBLING_SECRET_VALUE_PRESENT",
    gates.allSlotsReadOnly ? null : "FRESH_SIBLING_SLOT_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "FRESH_SIBLING_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "FRESH_SIBLING_SERVICE_START_ENABLED",
    gates.noSiblingMutation ? null : "FRESH_SIBLING_MUTATES_SIBLING_STATE",
    gates.crossProjectVersionsCleanAndSynced ? null : "FRESH_SIBLING_VERSION_STATUS_NOT_RECORDED",
    gates.historicalFallbackReady ? null : "FRESH_SIBLING_HISTORICAL_FALLBACK_NOT_READY",
    gates.noLiveServiceRequired ? null : "FRESH_SIBLING_LIVE_SERVICE_REQUIRED",
    gates.nextValueSupplyRequiresExplicitValues ? null : "FRESH_SIBLING_NEXT_VALUES_NOT_EXPLICIT",
  ].filter((reason): reason is string => reason !== null);
}
