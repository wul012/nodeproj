import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_IMPORT_PREFLIGHT_VERSIONS = [
  "Node v862",
  "Node v863",
  "Node v864",
  "Node v865",
  "Node v866",
  "Node v867",
  "Node v868",
  "Node v869",
  "Node v870",
  "Node v871",
  "Node v872",
  "Node v873",
  "Node v874",
  "Node v875",
  "Node v876",
  "Node v877",
  "Node v878",
  "Node v879",
  "Node v880",
  "Node v881",
  "Node v882",
  "Node v883",
  "Node v884",
  "Node v885",
  "Node v886",
] as const;

interface ImportPreflightTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightVersion;
  code: string;
  sourceWorksheetSlotCode: string;
  normalizerRule: string;
  importBlockRule: string;
}

const IMPORT_PREFLIGHT_TEMPLATES: readonly ImportPreflightTemplate[] = Object.freeze([
  template("Node v862", "IMPORT_PREFLIGHT_SOURCE_PACKET_READY",
    "ENTRY_WORKSHEET_SOURCE_PACKET_READY", "Normalize source packet readiness to boolean plus digest text.",
    "Reject import if readiness or digest is missing."),
  template("Node v863", "IMPORT_PREFLIGHT_CONTROL_COUNT",
    "ENTRY_WORKSHEET_CONTROL_COUNT", "Normalize control counts to integers.",
    "Reject import if observed count does not equal expected count."),
  template("Node v864", "IMPORT_PREFLIGHT_VERSION_ORDER",
    "ENTRY_WORKSHEET_VERSION_ORDER", "Normalize version labels and order status to canonical strings.",
    "Reject import if version order is not explicitly sequential."),
  template("Node v865", "IMPORT_PREFLIGHT_SOURCE_RECORD_MAPPING",
    "ENTRY_WORKSHEET_SOURCE_RECORD_MAPPING", "Normalize mapping counts to integers.",
    "Reject import if any source record mapping is missing."),
  template("Node v866", "IMPORT_PREFLIGHT_PENDING_CAPTURE_STATE",
    "ENTRY_WORKSHEET_PENDING_CAPTURE_STATE", "Normalize capture-state counts to integers.",
    "Reject import if the worksheet claims already-captured runtime evidence."),
  template("Node v867", "IMPORT_PREFLIGHT_REQUIRED_FIELDS",
    "ENTRY_WORKSHEET_REQUIRED_FIELDS", "Normalize required-field counts to integers.",
    "Reject import if required fields are missing."),
  template("Node v868", "IMPORT_PREFLIGHT_ACCEPTANCE_CRITERIA",
    "ENTRY_WORKSHEET_ACCEPTANCE_CRITERIA", "Normalize acceptance-criterion counts to integers.",
    "Reject import if acceptance criteria are incomplete."),
  template("Node v869", "IMPORT_PREFLIGHT_REDACTION_RULES",
    "ENTRY_WORKSHEET_REDACTION_RULES", "Normalize redaction rule counts to integers.",
    "Reject import if redaction rules are incomplete."),
  template("Node v870", "IMPORT_PREFLIGHT_MANUAL_INPUT_STATE",
    "ENTRY_WORKSHEET_MANUAL_INPUT_STATE", "Normalize manual input state to a canonical status string.",
    "Reject import if any non-manual state appears."),
  template("Node v871", "IMPORT_PREFLIGHT_RUNTIME_PAYLOAD_EXCLUSION",
    "ENTRY_WORKSHEET_RUNTIME_PAYLOAD_EXCLUSION", "Normalize runtime payload flags to boolean plus count.",
    "Reject import if runtime payload import is present."),
  template("Node v872", "IMPORT_PREFLIGHT_SYNTHETIC_EVIDENCE_REJECTION",
    "ENTRY_WORKSHEET_SYNTHETIC_EVIDENCE_REJECTION", "Normalize synthetic evidence flags to boolean plus count.",
    "Reject import if synthetic evidence is accepted."),
  template("Node v873", "IMPORT_PREFLIGHT_TARGET_COVERAGE",
    "ENTRY_WORKSHEET_TARGET_COVERAGE", "Normalize target scope coverage to count fields.",
    "Reject import if target scope coverage is incomplete."),
  template("Node v874", "IMPORT_PREFLIGHT_CLEANUP_COVERAGE",
    "ENTRY_WORKSHEET_CLEANUP_COVERAGE", "Normalize cleanup coverage to count fields.",
    "Reject import if cleanup coverage is incomplete."),
  template("Node v875", "IMPORT_PREFLIGHT_FAILURE_CLASS_COVERAGE",
    "ENTRY_WORKSHEET_FAILURE_CLASS_COVERAGE", "Normalize failure class coverage to count fields.",
    "Reject import if failure classes are duplicated or ambiguous."),
  template("Node v876", "IMPORT_PREFLIGHT_SECRET_EXCLUSION",
    "ENTRY_WORKSHEET_SECRET_EXCLUSION", "Normalize secret exclusion to boolean plus count.",
    "Reject import if any secret value is present."),
  template("Node v877", "IMPORT_PREFLIGHT_READ_ONLY_BOUNDARY",
    "ENTRY_WORKSHEET_READ_ONLY_BOUNDARY", "Normalize read-only boundary counts to integers.",
    "Reject import if a non-read-only control is present."),
  template("Node v878", "IMPORT_PREFLIGHT_WRITE_BLOCK",
    "ENTRY_WORKSHEET_WRITE_BLOCK", "Normalize write-block flags to boolean plus route count.",
    "Reject import if write routing is allowed."),
  template("Node v879", "IMPORT_PREFLIGHT_SERVICE_START_BLOCK",
    "ENTRY_WORKSHEET_SERVICE_START_BLOCK", "Normalize service-start flags to boolean plus count.",
    "Reject import if any service-start path is enabled."),
  template("Node v880", "IMPORT_PREFLIGHT_PRODUCTION_EXECUTION_BLOCK",
    "ENTRY_WORKSHEET_PRODUCTION_EXECUTION_BLOCK", "Normalize production execution flags to boolean plus count.",
    "Reject import if production execution is enabled."),
  template("Node v881", "IMPORT_PREFLIGHT_NODE_TARGET",
    "ENTRY_WORKSHEET_NODE_TARGET", "Normalize Node target statuses to status labels and digest references.",
    "Reject import if Node target status includes raw response payload."),
  template("Node v882", "IMPORT_PREFLIGHT_JAVA_TARGET",
    "ENTRY_WORKSHEET_JAVA_TARGET", "Normalize Java target statuses to status labels and read-only summaries.",
    "Reject import if the plan requires Node to start Java."),
  template("Node v883", "IMPORT_PREFLIGHT_MINI_KV_TARGET",
    "ENTRY_WORKSHEET_MINI_KV_TARGET", "Normalize mini-kv target statuses to status labels and command name.",
    "Reject import if the command is not SHARDJSON."),
  template("Node v884", "IMPORT_PREFLIGHT_POLICY_ARCHIVE_TARGETS",
    "ENTRY_WORKSHEET_POLICY_ARCHIVE_TARGETS", "Normalize policy and archive status fields to labels and digest references.",
    "Reject import if policy/archive status includes runtime payload."),
  template("Node v885", "IMPORT_PREFLIGHT_CATALOG_MAINTENANCE_BOUNDARY",
    "ENTRY_WORKSHEET_CATALOG_MAINTENANCE_BOUNDARY", "Normalize maintenance confirmations to booleans.",
    "Reject import if renderer split or catalog builder confirmation is missing."),
  template("Node v886", "IMPORT_PREFLIGHT_CLOSEOUT",
    "ENTRY_WORKSHEET_CLOSEOUT", "Normalize worksheet digest and parallel-plan label.",
    "Reject import if Java and mini-kv parallel plan is absent."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlots(
  worksheetSlots: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot[] {
  const worksheetSlotsByCode = new Map(worksheetSlots.map((worksheetSlot) => [worksheetSlot.code, worksheetSlot]));

  return IMPORT_PREFLIGHT_TEMPLATES.map((slotTemplate, index) =>
    createImportPreflightSlot(slotTemplate, worksheetSlotsByCode.get(slotTemplate.sourceWorksheetSlotCode), index));
}

function createImportPreflightSlot(
  slotTemplate: ImportPreflightTemplate,
  worksheetSlot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot | undefined,
  index: number,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot {
  return {
    order: index + 1,
    nodeVersion: slotTemplate.nodeVersion,
    code: slotTemplate.code,
    kind: slotKind(worksheetSlot),
    scope: worksheetSlot?.scope ?? "ledger",
    sourceWorksheetSlotCode: slotTemplate.sourceWorksheetSlotCode,
    sourceWorksheetNodeVersion: worksheetSlot?.nodeVersion ?? "Node v837",
    sourceWorksheetSlotBlank: worksheetSlot?.manualValueState === "not-entered"
      && worksheetSlot.readyForOperatorEntry === false,
    sourceWorksheetControlPassed: worksheetSlot?.sourceReviewControlPassed ?? false,
    importFieldNames: [...(worksheetSlot?.worksheetFieldNames ?? [])],
    expectedValueState: "operator-supplied-later",
    normalizerRule: slotTemplate.normalizerRule,
    validationRule: worksheetSlot?.validationRule ?? "",
    redactionRule: worksheetSlot?.redactionRule ?? "",
    importBlockRule: slotTemplate.importBlockRule,
    missingValuePolicy: worksheetSlot?.missingValuePolicy ?? "",
    importValueState: "not-imported",
    manualValueState: "not-entered",
    readyForOperatorImport: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
    readOnly: true,
    writesAllowed: false,
    automaticServiceStart: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

function slotKind(
  worksheetSlot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot | undefined,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlotKind {
  if (worksheetSlot?.kind === "target-entry-slot") {
    return "target-import-preflight-slot";
  }
  if (worksheetSlot?.kind === "policy-archive-slot") {
    return "policy-archive-import-preflight-slot";
  }
  if (worksheetSlot?.kind === "maintenance-slot") {
    return "maintenance-import-preflight-slot";
  }
  if (worksheetSlot?.kind === "closeout-slot") {
    return "closeout-import-preflight-slot";
  }
  return "ledger-import-preflight-slot";
}

function template(
  nodeVersion: ImportPreflightTemplate["nodeVersion"],
  code: string,
  sourceWorksheetSlotCode: string,
  normalizerRule: string,
  importBlockRule: string,
): ImportPreflightTemplate {
  return {
    nodeVersion,
    code,
    sourceWorksheetSlotCode,
    normalizerRule,
    importBlockRule,
  };
}
