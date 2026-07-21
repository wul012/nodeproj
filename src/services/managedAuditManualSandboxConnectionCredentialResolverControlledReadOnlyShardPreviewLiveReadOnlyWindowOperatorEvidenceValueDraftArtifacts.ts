import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightTypes.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_DRAFT_VERSIONS,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlotBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

const REQUIRED_SCOPES: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope[] = [
  "ledger",
  "node",
  "java",
  "miniKv",
  "policyArchive",
  "maintenance",
  "crossProject",
];

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft {
  const slots = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlots(
    preflight.slots,
  );
  const preflightSlotCodes = new Set(preflight.slots.map((preflightSlot) => preflightSlot.code));
  const scopes = new Set(slots.map((slot) => slot.scope));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftGates = {
    sourceImportPreflightReady: preflight.readyForOperatorEvidenceImportPreflight,
    valueDraftSlotCountComplete: slots.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_DRAFT_VERSIONS.length,
    versionsSequential: slots.every((slot, index) =>
      slot.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_DRAFT_VERSIONS[index]),
    eachSlotMapsPreflightSlot: slots.every((slot) => preflightSlotCodes.has(slot.sourcePreflightSlotCode)),
    sourcePreflightControlsPassed: slots.every((slot) => slot.sourcePreflightControlPassed),
    sourcePreflightSlotsNotImported: slots.every((slot) => slot.sourcePreflightValueNotImported),
    sourcePreflightFieldsPresent: slots.every((slot) => slot.draftFieldNames.length > 0),
    sourcePreflightNormalizersPresent: slots.every((slot) => slot.draftNormalizerRule.length > 0),
    sourcePreflightValidationRulesPresent: slots.every((slot) => slot.draftAcceptanceRule.length > 0),
    sourcePreflightRedactionRulesPresent: slots.every((slot) => slot.draftRedactionRule.length > 0),
    sourcePreflightBlockRulesPresent: slots.every((slot) => slot.draftImportBlockRule.length > 0),
    draftFieldsPresent: slots.every((slot) => slot.draftFieldNames.length > 0),
    operatorInstructionsPresent: slots.every((slot) => slot.operatorInstruction.length > 0),
    draftValuesAwaitingOperator: slots.every((slot) => slot.draftValueState === "awaiting-operator-value"),
    noActualValuesSupplied: slots.every((slot) => slot.actualValueState === "not-supplied"),
    targetScopesCovered: REQUIRED_SCOPES.every((scope) => scopes.has(scope)),
    maintenanceDraftPresent: slots.some((slot) => slot.kind === "maintenance-value-draft-slot"),
    closeoutDraftPresent: slots.some((slot) => slot.kind === "closeout-value-draft-slot"),
    crossProjectParallelPlanClear: slots.some((slot) =>
      slot.scope === "crossProject" && slot.operatorInstruction.includes("recommended parallel")),
    noRuntimePayloadImported: !preflight.importsRuntimePayload && slots.every((slot) => !slot.importsRuntimePayload),
    noSyntheticEvidenceAccepted: !preflight.acceptsSyntheticEvidence && slots.every((slot) =>
      !slot.acceptsSyntheticEvidence),
    noSecretValues: !preflight.containsSecretValue && slots.every((slot) => !slot.containsSecretValue),
    allSlotsReadOnly: slots.every((slot) => slot.readOnly),
    noWritesAllowed: !preflight.writeRoutingAllowed && slots.every((slot) => !slot.writesAllowed),
    noAutomaticServiceStart: !preflight.startsServices && slots.every((slot) =>
      !slot.automaticServiceStart && !slot.startsServices),
    productionExecutionBlocked: !preflight.readyForProductionExecution && !preflight.executionAllowed,
  };
  const blockedReasonCodes = createValueDraftBlockedReasons(gates);
  const readyForOperatorEvidenceValueDraft = blockedReasonCodes.length === 0;
  const valueDraftDigest = sha256StableJson({
    valueDraftVersion: "Node v911",
    sourceImportPreflightVersion: preflight.preflightVersion,
    sourceImportPreflightDigest: preflight.importPreflightDigest,
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.scope,
      slot.sourcePreflightSlotCode,
      slot.draftFieldNames,
      slot.draftValueState,
      slot.actualValueState,
    ]),
    gates,
  });

  return {
    valueDraftVersion: "Node v911",
    sourceImportPreflightVersion: "Node v886",
    valueDraftState: readyForOperatorEvidenceValueDraft
      ? "ready-for-operator-evidence-value-draft"
      : "blocked",
    readyForOperatorEvidenceValueDraft,
    readyForManualEvidenceEntry: false,
    readyForEvidenceImport: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    valueDraftSlotCount: slots.length,
    ledgerValueDraftSlotCount: slots.filter((slot) => slot.kind === "ledger-value-draft-slot").length,
    targetValueDraftSlotCount: slots.filter((slot) => slot.kind === "target-value-draft-slot").length,
    policyArchiveValueDraftSlotCount:
      slots.filter((slot) => slot.kind === "policy-archive-value-draft-slot").length,
    maintenanceValueDraftSlotCount:
      slots.filter((slot) => slot.kind === "maintenance-value-draft-slot").length,
    closeoutValueDraftSlotCount: slots.filter((slot) => slot.kind === "closeout-value-draft-slot").length,
    scopeCount: scopes.size,
    draftFieldCount: slots.reduce((count, slot) => count + slot.draftFieldNames.length, 0),
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    slots,
    valueDraftDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function createValueDraftBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceImportPreflightReady, "SOURCE_IMPORT_PREFLIGHT_NOT_READY"],
    [gates.valueDraftSlotCountComplete, "VALUE_DRAFT_SLOT_COUNT_INCOMPLETE"],
    [gates.versionsSequential, "VALUE_DRAFT_VERSIONS_NOT_SEQUENTIAL"],
    [gates.eachSlotMapsPreflightSlot, "VALUE_DRAFT_PREFLIGHT_SLOT_MISSING"],
    [gates.sourcePreflightControlsPassed, "VALUE_DRAFT_SOURCE_PREFLIGHT_CONTROLS_NOT_PASSED"],
    [gates.sourcePreflightSlotsNotImported, "VALUE_DRAFT_SOURCE_PREFLIGHT_VALUES_IMPORTED"],
    [gates.sourcePreflightFieldsPresent, "VALUE_DRAFT_SOURCE_FIELDS_MISSING"],
    [gates.sourcePreflightNormalizersPresent, "VALUE_DRAFT_SOURCE_NORMALIZERS_MISSING"],
    [gates.sourcePreflightValidationRulesPresent, "VALUE_DRAFT_SOURCE_VALIDATION_RULES_MISSING"],
    [gates.sourcePreflightRedactionRulesPresent, "VALUE_DRAFT_SOURCE_REDACTION_RULES_MISSING"],
    [gates.sourcePreflightBlockRulesPresent, "VALUE_DRAFT_SOURCE_BLOCK_RULES_MISSING"],
    [gates.draftFieldsPresent, "VALUE_DRAFT_FIELDS_MISSING"],
    [gates.operatorInstructionsPresent, "VALUE_DRAFT_OPERATOR_INSTRUCTIONS_MISSING"],
    [gates.draftValuesAwaitingOperator, "VALUE_DRAFT_VALUES_NOT_AWAITING_OPERATOR"],
    [gates.noActualValuesSupplied, "VALUE_DRAFT_ACTUAL_VALUES_SUPPLIED"],
    [gates.targetScopesCovered, "VALUE_DRAFT_SCOPE_COVERAGE_INCOMPLETE"],
    [gates.maintenanceDraftPresent, "VALUE_DRAFT_MAINTENANCE_SLOT_MISSING"],
    [gates.closeoutDraftPresent, "VALUE_DRAFT_CLOSEOUT_SLOT_MISSING"],
    [gates.crossProjectParallelPlanClear, "VALUE_DRAFT_CROSS_PROJECT_PLAN_NOT_CLEAR"],
    [gates.noRuntimePayloadImported, "VALUE_DRAFT_RUNTIME_PAYLOAD_IMPORTED"],
    [gates.noSyntheticEvidenceAccepted, "VALUE_DRAFT_SYNTHETIC_EVIDENCE_ACCEPTED"],
    [gates.noSecretValues, "VALUE_DRAFT_SECRET_VALUE_PRESENT"],
    [gates.allSlotsReadOnly, "VALUE_DRAFT_SLOT_NOT_READ_ONLY"],
    [gates.noWritesAllowed, "VALUE_DRAFT_WRITES_ALLOWED"],
    [gates.noAutomaticServiceStart, "VALUE_DRAFT_SERVICE_START_ENABLED"],
    [gates.productionExecutionBlocked, "VALUE_DRAFT_PRODUCTION_EXECUTION_ENABLED"],
  ]);
}
