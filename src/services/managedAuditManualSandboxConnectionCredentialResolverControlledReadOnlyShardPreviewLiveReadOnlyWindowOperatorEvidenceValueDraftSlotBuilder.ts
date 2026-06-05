import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_DRAFT_VERSIONS = [
  "Node v887",
  "Node v888",
  "Node v889",
  "Node v890",
  "Node v891",
  "Node v892",
  "Node v893",
  "Node v894",
  "Node v895",
  "Node v896",
  "Node v897",
  "Node v898",
  "Node v899",
  "Node v900",
  "Node v901",
  "Node v902",
  "Node v903",
  "Node v904",
  "Node v905",
  "Node v906",
  "Node v907",
  "Node v908",
  "Node v909",
  "Node v910",
  "Node v911",
] as const;

interface ValueDraftTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftVersion;
  code: string;
  sourcePreflightSlotCode: string;
  operatorInstruction: string;
}

const VALUE_DRAFT_TEMPLATES: readonly ValueDraftTemplate[] = Object.freeze([
  template("Node v887", "VALUE_DRAFT_SOURCE_PACKET_READY",
    "IMPORT_PREFLIGHT_SOURCE_PACKET_READY",
    "Draft only the source packet readiness fields; do not paste raw response bodies or live payload text."),
  template("Node v888", "VALUE_DRAFT_CONTROL_COUNT",
    "IMPORT_PREFLIGHT_CONTROL_COUNT",
    "Draft expected and observed control counts from an operator-reviewed packet, keeping integers only."),
  template("Node v889", "VALUE_DRAFT_VERSION_ORDER",
    "IMPORT_PREFLIGHT_VERSION_ORDER",
    "Draft canonical version-order labels after the operator checks the source sequence."),
  template("Node v890", "VALUE_DRAFT_SOURCE_RECORD_MAPPING",
    "IMPORT_PREFLIGHT_SOURCE_RECORD_MAPPING",
    "Draft source mapping counts without storing the mapped evidence records themselves."),
  template("Node v891", "VALUE_DRAFT_PENDING_CAPTURE_STATE",
    "IMPORT_PREFLIGHT_PENDING_CAPTURE_STATE",
    "Draft pending-capture state labels and keep already-captured runtime evidence out."),
  template("Node v892", "VALUE_DRAFT_REQUIRED_FIELDS",
    "IMPORT_PREFLIGHT_REQUIRED_FIELDS",
    "Draft required-field completion counts after the operator verifies every field name."),
  template("Node v893", "VALUE_DRAFT_ACCEPTANCE_CRITERIA",
    "IMPORT_PREFLIGHT_ACCEPTANCE_CRITERIA",
    "Draft acceptance-criterion statuses only after the operator confirms the criteria."),
  template("Node v894", "VALUE_DRAFT_REDACTION_RULES",
    "IMPORT_PREFLIGHT_REDACTION_RULES",
    "Draft redaction coverage counts and preserve the preflight redaction rule exactly."),
  template("Node v895", "VALUE_DRAFT_MANUAL_INPUT_STATE",
    "IMPORT_PREFLIGHT_MANUAL_INPUT_STATE",
    "Draft manual-input state labels while leaving actual operator-entered values absent."),
  template("Node v896", "VALUE_DRAFT_RUNTIME_PAYLOAD_EXCLUSION",
    "IMPORT_PREFLIGHT_RUNTIME_PAYLOAD_EXCLUSION",
    "Draft runtime-payload exclusion flags and reject any pasted payload text."),
  template("Node v897", "VALUE_DRAFT_SYNTHETIC_EVIDENCE_REJECTION",
    "IMPORT_PREFLIGHT_SYNTHETIC_EVIDENCE_REJECTION",
    "Draft synthetic-evidence rejection flags and keep synthetic samples out of the package."),
  template("Node v898", "VALUE_DRAFT_TARGET_COVERAGE",
    "IMPORT_PREFLIGHT_TARGET_COVERAGE",
    "Draft target coverage counts for Node, Java, and mini-kv without starting sibling services."),
  template("Node v899", "VALUE_DRAFT_CLEANUP_COVERAGE",
    "IMPORT_PREFLIGHT_CLEANUP_COVERAGE",
    "Draft cleanup coverage labels for the eventual operator evidence packet."),
  template("Node v900", "VALUE_DRAFT_FAILURE_CLASS_COVERAGE",
    "IMPORT_PREFLIGHT_FAILURE_CLASS_COVERAGE",
    "Draft failure-class coverage labels without duplicating or expanding failure taxonomies."),
  template("Node v901", "VALUE_DRAFT_SECRET_EXCLUSION",
    "IMPORT_PREFLIGHT_SECRET_EXCLUSION",
    "Draft secret-exclusion confirmation fields and reject credential or token values."),
  template("Node v902", "VALUE_DRAFT_READ_ONLY_BOUNDARY",
    "IMPORT_PREFLIGHT_READ_ONLY_BOUNDARY",
    "Draft read-only boundary confirmations and keep every downstream action non-mutating."),
  template("Node v903", "VALUE_DRAFT_WRITE_BLOCK",
    "IMPORT_PREFLIGHT_WRITE_BLOCK",
    "Draft write-block confirmations and keep routing promotion disabled."),
  template("Node v904", "VALUE_DRAFT_SERVICE_START_BLOCK",
    "IMPORT_PREFLIGHT_SERVICE_START_BLOCK",
    "Draft service-start block confirmations without starting Java, mini-kv, or Node preview servers."),
  template("Node v905", "VALUE_DRAFT_PRODUCTION_EXECUTION_BLOCK",
    "IMPORT_PREFLIGHT_PRODUCTION_EXECUTION_BLOCK",
    "Draft production-execution block confirmations while keeping production execution unavailable."),
  template("Node v906", "VALUE_DRAFT_NODE_TARGET",
    "IMPORT_PREFLIGHT_NODE_TARGET",
    "Draft Node target status labels and digest references, not raw route responses."),
  template("Node v907", "VALUE_DRAFT_JAVA_TARGET",
    "IMPORT_PREFLIGHT_JAVA_TARGET",
    "Draft Java target status labels from operator review while Node remains a non-blocking peer."),
  template("Node v908", "VALUE_DRAFT_MINI_KV_TARGET",
    "IMPORT_PREFLIGHT_MINI_KV_TARGET",
    "Draft mini-kv target status labels and keep the command boundary at SHARDJSON."),
  template("Node v909", "VALUE_DRAFT_POLICY_ARCHIVE_TARGETS",
    "IMPORT_PREFLIGHT_POLICY_ARCHIVE_TARGETS",
    "Draft policy/archive digest references without importing archive payloads."),
  template("Node v910", "VALUE_DRAFT_CATALOG_MAINTENANCE_BOUNDARY",
    "IMPORT_PREFLIGHT_CATALOG_MAINTENANCE_BOUNDARY",
    "Draft catalog maintenance confirmations so future value import keeps the split module boundary."),
  template("Node v911", "VALUE_DRAFT_CLOSEOUT",
    "IMPORT_PREFLIGHT_CLOSEOUT",
    "Draft closeout confirmations and keep Java and mini-kv marked recommended parallel."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlots(
  preflightSlots: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot[] {
  const preflightSlotsByCode = new Map(preflightSlots.map((preflightSlot) => [preflightSlot.code, preflightSlot]));

  return VALUE_DRAFT_TEMPLATES.map((slotTemplate, index) =>
    createValueDraftSlot(slotTemplate, preflightSlotsByCode.get(slotTemplate.sourcePreflightSlotCode), index));
}

function createValueDraftSlot(
  slotTemplate: ValueDraftTemplate,
  preflightSlot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot | undefined,
  index: number,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot {
  const sourcePreflightSlotMapped = preflightSlot !== undefined;
  const sourcePreflightValueNotImported = preflightSlot?.importValueState === "not-imported"
    && preflightSlot.manualValueState === "not-entered"
    && preflightSlot.readyForOperatorImport === false;
  const sourcePreflightSlotReady = sourcePreflightSlotMapped
    && preflightSlot.sourceWorksheetControlPassed
    && sourcePreflightValueNotImported
    && preflightSlot.importFieldNames.length > 0
    && preflightSlot.normalizerRule.length > 0
    && preflightSlot.validationRule.length > 0
    && preflightSlot.redactionRule.length > 0
    && preflightSlot.importBlockRule.length > 0;

  return {
    order: index + 1,
    nodeVersion: slotTemplate.nodeVersion,
    code: slotTemplate.code,
    kind: slotKind(preflightSlot),
    scope: preflightSlot?.scope ?? "ledger",
    sourcePreflightSlotCode: slotTemplate.sourcePreflightSlotCode,
    sourcePreflightNodeVersion: preflightSlot?.nodeVersion ?? "Node v862",
    sourcePreflightSlotMapped,
    sourcePreflightSlotReady,
    sourcePreflightControlPassed: preflightSlot?.sourceWorksheetControlPassed ?? false,
    sourcePreflightValueNotImported,
    draftFieldNames: [...(preflightSlot?.importFieldNames ?? [])],
    draftValueState: "awaiting-operator-value",
    actualValueState: "not-supplied",
    readyForOperatorValueDraft: sourcePreflightSlotReady,
    readyForOperatorImport: false,
    readyForEvidenceImport: false,
    draftAcceptanceRule: preflightSlot?.validationRule ?? "",
    draftNormalizerRule: preflightSlot?.normalizerRule ?? "",
    draftRedactionRule: preflightSlot?.redactionRule ?? "",
    draftImportBlockRule: preflightSlot?.importBlockRule ?? "",
    draftMissingValuePolicy: preflightSlot?.missingValuePolicy ?? "",
    operatorInstruction: slotTemplate.operatorInstruction,
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
  preflightSlot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot | undefined,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlotKind {
  if (preflightSlot?.kind === "target-import-preflight-slot") {
    return "target-value-draft-slot";
  }
  if (preflightSlot?.kind === "policy-archive-import-preflight-slot") {
    return "policy-archive-value-draft-slot";
  }
  if (preflightSlot?.kind === "maintenance-import-preflight-slot") {
    return "maintenance-value-draft-slot";
  }
  if (preflightSlot?.kind === "closeout-import-preflight-slot") {
    return "closeout-value-draft-slot";
  }
  return "ledger-value-draft-slot";
}

function template(
  nodeVersion: ValueDraftTemplate["nodeVersion"],
  code: string,
  sourcePreflightSlotCode: string,
  operatorInstruction: string,
): ValueDraftTemplate {
  return {
    nodeVersion,
    code,
    sourcePreflightSlotCode,
    operatorInstruction,
  };
}
