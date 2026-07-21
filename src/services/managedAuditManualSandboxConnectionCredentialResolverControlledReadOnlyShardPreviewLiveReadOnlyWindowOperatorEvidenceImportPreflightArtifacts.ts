import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetTypes.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_IMPORT_PREFLIGHT_VERSIONS,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlotBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightTypes.js";
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight(
  worksheet: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight {
  const slots = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlots(
    worksheet.slots,
  );
  const worksheetSlotCodes = new Set(worksheet.slots.map((worksheetSlot) => worksheetSlot.code));
  const scopes = new Set(slots.map((slot) => slot.scope));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightGates = {
    sourceWorksheetReady: worksheet.readyForOperatorEntryWorksheet,
    preflightSlotCountComplete: slots.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_IMPORT_PREFLIGHT_VERSIONS.length,
    versionsSequential: slots.every((slot, index) =>
      slot.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_IMPORT_PREFLIGHT_VERSIONS[index]),
    eachSlotMapsWorksheetSlot: slots.every((slot) => worksheetSlotCodes.has(slot.sourceWorksheetSlotCode)),
    sourceWorksheetControlsPassed: slots.every((slot) => slot.sourceWorksheetControlPassed),
    sourceWorksheetSlotsBlank: slots.every((slot) => slot.sourceWorksheetSlotBlank),
    importFieldNamesPresent: slots.every((slot) => slot.importFieldNames.length > 0),
    normalizerRulesPresent: slots.every((slot) => slot.normalizerRule.length > 0),
    validationRulesPresent: slots.every((slot) => slot.validationRule.length > 0),
    redactionRulesPresent: slots.every((slot) => slot.redactionRule.length > 0),
    importBlockRulesPresent: slots.every((slot) => slot.importBlockRule.length > 0),
    missingValuePoliciesPreserved: slots.every((slot) => slot.missingValuePolicy.length > 0),
    targetScopesCovered: REQUIRED_SCOPES.every((scope) => scopes.has(scope)),
    maintenancePreflightPresent: slots.some((slot) => slot.kind === "maintenance-import-preflight-slot"),
    closeoutPreflightPresent: slots.some((slot) => slot.kind === "closeout-import-preflight-slot"),
    crossProjectParallelPlanClear: slots.some((slot) =>
      slot.scope === "crossProject" && slot.validationRule.includes("Java and mini-kv can continue")),
    noValuesImported: slots.every((slot) =>
      slot.importValueState === "not-imported"
      && slot.manualValueState === "not-entered"
      && !slot.readyForOperatorImport),
    noRuntimePayloadImported: !worksheet.importsRuntimePayload && slots.every((slot) => !slot.importsRuntimePayload),
    noSyntheticEvidenceAccepted: !worksheet.acceptsSyntheticEvidence && slots.every((slot) =>
      !slot.acceptsSyntheticEvidence),
    noSecretValues: !worksheet.containsSecretValue && slots.every((slot) => !slot.containsSecretValue),
    allSlotsReadOnly: slots.every((slot) => slot.readOnly),
    noWritesAllowed: !worksheet.writeRoutingAllowed && slots.every((slot) => !slot.writesAllowed),
    noAutomaticServiceStart: !worksheet.startsServices && slots.every((slot) =>
      !slot.automaticServiceStart && !slot.startsServices),
    productionExecutionBlocked: !worksheet.readyForProductionExecution && !worksheet.executionAllowed,
  };
  const blockedReasonCodes = createImportPreflightBlockedReasons(gates);
  const readyForOperatorEvidenceImportPreflight = blockedReasonCodes.length === 0;
  const importPreflightDigest = sha256StableJson({
    preflightVersion: "Node v886",
    sourceWorksheetVersion: worksheet.worksheetVersion,
    sourceWorksheetDigest: worksheet.worksheetDigest,
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.scope,
      slot.sourceWorksheetSlotCode,
      slot.importFieldNames,
      slot.importValueState,
    ]),
    gates,
  });

  return {
    preflightVersion: "Node v886",
    sourceWorksheetVersion: "Node v861",
    preflightState: readyForOperatorEvidenceImportPreflight
      ? "ready-for-operator-evidence-import-preflight"
      : "blocked",
    readyForOperatorEvidenceImportPreflight,
    readyForManualEvidenceEntry: false,
    readyForEvidenceImport: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    preflightSlotCount: slots.length,
    ledgerImportPreflightSlotCount:
      slots.filter((slot) => slot.kind === "ledger-import-preflight-slot").length,
    targetImportPreflightSlotCount:
      slots.filter((slot) => slot.kind === "target-import-preflight-slot").length,
    policyArchiveImportPreflightSlotCount:
      slots.filter((slot) => slot.kind === "policy-archive-import-preflight-slot").length,
    maintenanceImportPreflightSlotCount:
      slots.filter((slot) => slot.kind === "maintenance-import-preflight-slot").length,
    closeoutImportPreflightSlotCount:
      slots.filter((slot) => slot.kind === "closeout-import-preflight-slot").length,
    scopeCount: scopes.size,
    importFieldCount: slots.reduce((count, slot) => count + slot.importFieldNames.length, 0),
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    slots,
    importPreflightDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function createImportPreflightBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceWorksheetReady, "SOURCE_WORKSHEET_NOT_READY"],
    [gates.preflightSlotCountComplete, "IMPORT_PREFLIGHT_SLOT_COUNT_INCOMPLETE"],
    [gates.versionsSequential, "IMPORT_PREFLIGHT_VERSIONS_NOT_SEQUENTIAL"],
    [gates.eachSlotMapsWorksheetSlot, "IMPORT_PREFLIGHT_WORKSHEET_SLOT_MISSING"],
    [gates.sourceWorksheetControlsPassed, "IMPORT_PREFLIGHT_SOURCE_WORKSHEET_CONTROLS_NOT_PASSED"],
    [gates.sourceWorksheetSlotsBlank, "IMPORT_PREFLIGHT_SOURCE_WORKSHEET_NOT_BLANK"],
    [gates.importFieldNamesPresent, "IMPORT_PREFLIGHT_FIELD_NAMES_MISSING"],
    [gates.normalizerRulesPresent, "IMPORT_PREFLIGHT_NORMALIZER_RULES_MISSING"],
    [gates.validationRulesPresent, "IMPORT_PREFLIGHT_VALIDATION_RULES_MISSING"],
    [gates.redactionRulesPresent, "IMPORT_PREFLIGHT_REDACTION_RULES_MISSING"],
    [gates.importBlockRulesPresent, "IMPORT_PREFLIGHT_BLOCK_RULES_MISSING"],
    [gates.missingValuePoliciesPreserved, "IMPORT_PREFLIGHT_MISSING_VALUE_POLICIES_MISSING"],
    [gates.targetScopesCovered, "IMPORT_PREFLIGHT_SCOPE_COVERAGE_INCOMPLETE"],
    [gates.maintenancePreflightPresent, "IMPORT_PREFLIGHT_MAINTENANCE_SLOT_MISSING"],
    [gates.closeoutPreflightPresent, "IMPORT_PREFLIGHT_CLOSEOUT_SLOT_MISSING"],
    [gates.crossProjectParallelPlanClear, "IMPORT_PREFLIGHT_CROSS_PROJECT_PLAN_NOT_CLEAR"],
    [gates.noValuesImported, "IMPORT_PREFLIGHT_VALUES_IMPORTED"],
    [gates.noRuntimePayloadImported, "IMPORT_PREFLIGHT_RUNTIME_PAYLOAD_IMPORTED"],
    [gates.noSyntheticEvidenceAccepted, "IMPORT_PREFLIGHT_SYNTHETIC_EVIDENCE_ACCEPTED"],
    [gates.noSecretValues, "IMPORT_PREFLIGHT_SECRET_VALUE_PRESENT"],
    [gates.allSlotsReadOnly, "IMPORT_PREFLIGHT_SLOT_NOT_READ_ONLY"],
    [gates.noWritesAllowed, "IMPORT_PREFLIGHT_WRITES_ALLOWED"],
    [gates.noAutomaticServiceStart, "IMPORT_PREFLIGHT_SERVICE_START_ENABLED"],
    [gates.productionExecutionBlocked, "IMPORT_PREFLIGHT_PRODUCTION_EXECUTION_ENABLED"],
  ]);
}
