import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetTypes.js";

const EXPECTED_WORKSHEET_VERSIONS = [
  "Node v837",
  "Node v838",
  "Node v839",
  "Node v840",
  "Node v841",
  "Node v842",
  "Node v843",
  "Node v844",
  "Node v845",
  "Node v846",
  "Node v847",
  "Node v848",
  "Node v849",
  "Node v850",
  "Node v851",
  "Node v852",
  "Node v853",
  "Node v854",
  "Node v855",
  "Node v856",
  "Node v857",
  "Node v858",
  "Node v859",
  "Node v860",
  "Node v861",
] as const;

const REQUIRED_SCOPES: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope[] = [
  "ledger",
  "node",
  "java",
  "miniKv",
  "policyArchive",
  "maintenance",
  "crossProject",
];

interface WorksheetTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetVersion;
  code: string;
  sourceReviewControlCode: string;
  worksheetFieldNames: string[];
  operatorPrompt: string;
  validationRule: string;
  redactionRule: string;
  missingValuePolicy: string;
}

const WORKSHEET_TEMPLATES: readonly WorksheetTemplate[] = Object.freeze([
  slot("Node v837", "ENTRY_WORKSHEET_SOURCE_PACKET_READY",
    "INTAKE_REVIEW_SOURCE_PACKET_READY", ["sourcePacketReady", "sourcePacketDigest"],
    "Enter the reviewed source packet readiness flag and digest.",
    "Value must match the reviewed source packet readiness decision.", "Digest only; no response body.",
    "Block entry worksheet if source packet readiness is missing."),
  slot("Node v838", "ENTRY_WORKSHEET_CONTROL_COUNT",
    "INTAKE_REVIEW_CONTROL_COUNT_COMPLETE", ["reviewControlCount", "expectedControlCount"],
    "Enter observed and expected review control counts.",
    "Observed count must equal twenty-five.", "Counts only.", "Block entry worksheet if counts differ."),
  slot("Node v839", "ENTRY_WORKSHEET_VERSION_ORDER",
    "INTAKE_REVIEW_VERSION_ORDER", ["firstControlVersion", "lastControlVersion", "versionOrderStatus"],
    "Enter first version, last version, and order status.",
    "Versions must run from Node v812 through Node v836.", "Version labels only.",
    "Block entry worksheet if version order is unclear."),
  slot("Node v840", "ENTRY_WORKSHEET_SOURCE_RECORD_MAPPING",
    "INTAKE_REVIEW_SOURCE_RECORD_MAPPING", ["mappedControlCount", "missingMappingCount"],
    "Enter mapped control count and missing mapping count.",
    "Missing mapping count must be zero.", "Counts only.", "Block entry worksheet if mappings are missing."),
  slot("Node v841", "ENTRY_WORKSHEET_PENDING_CAPTURE_STATE",
    "INTAKE_REVIEW_PENDING_CAPTURE_STATE", ["pendingCaptureCount", "alreadyCapturedCount"],
    "Enter pending and already-captured source record counts.",
    "Already-captured count must be zero.", "Counts only.", "Block entry worksheet if capture state changed."),
  slot("Node v842", "ENTRY_WORKSHEET_REQUIRED_FIELDS",
    "INTAKE_REVIEW_REQUIRED_FIELDS_PRESERVED", ["requiredFieldCount", "missingRequiredFieldCount"],
    "Enter required field count and missing required field count.",
    "Missing required field count must be zero.", "Field names only; no values.",
    "Block entry worksheet if a required field is missing."),
  slot("Node v843", "ENTRY_WORKSHEET_ACCEPTANCE_CRITERIA",
    "INTAKE_REVIEW_ACCEPTANCE_CRITERIA_PRESERVED", ["acceptanceCriterionCount", "missingCriterionCount"],
    "Enter acceptance criterion count and missing criterion count.",
    "Missing criterion count must be zero.", "Criteria labels only.", "Block entry worksheet if criteria are missing."),
  slot("Node v844", "ENTRY_WORKSHEET_REDACTION_RULES",
    "INTAKE_REVIEW_REDACTION_RULES_PRESERVED", ["redactionRuleCount", "missingRedactionRuleCount"],
    "Enter redaction rule count and missing redaction rule count.",
    "Missing redaction rule count must be zero.", "Redaction rule text only; no secret value.",
    "Block entry worksheet if redaction rules are missing."),
  slot("Node v845", "ENTRY_WORKSHEET_MANUAL_INPUT_STATE",
    "INTAKE_REVIEW_MANUAL_INPUT_STATE", ["manualInputState", "nonManualStateCount"],
    "Enter manual input state and non-manual state count.",
    "Manual input state must remain awaiting operator review.", "State labels only.",
    "Block entry worksheet if a non-manual state appears."),
  slot("Node v846", "ENTRY_WORKSHEET_RUNTIME_PAYLOAD_EXCLUSION",
    "INTAKE_REVIEW_RUNTIME_PAYLOAD_EXCLUSION", ["runtimePayloadImported", "runtimePayloadImportCount"],
    "Enter runtime payload import flag and count.",
    "Runtime payload import must be false and count zero.", "Boolean and count only.",
    "Block entry worksheet if runtime payload is present."),
  slot("Node v847", "ENTRY_WORKSHEET_SYNTHETIC_EVIDENCE_REJECTION",
    "INTAKE_REVIEW_SYNTHETIC_EVIDENCE_REJECTION", ["syntheticEvidenceAccepted", "syntheticEvidenceCount"],
    "Enter synthetic evidence accepted flag and count.",
    "Synthetic evidence accepted must be false and count zero.", "Boolean and count only.",
    "Block entry worksheet if synthetic evidence is accepted."),
  slot("Node v848", "ENTRY_WORKSHEET_TARGET_COVERAGE",
    "INTAKE_REVIEW_TARGET_COVERAGE", ["targetScopeCount", "missingTargetScopeCount"],
    "Enter covered target scope count and missing target scope count.",
    "Missing target scope count must be zero.", "Scope names only.", "Block entry worksheet if a target scope is missing."),
  slot("Node v849", "ENTRY_WORKSHEET_CLEANUP_COVERAGE",
    "INTAKE_REVIEW_CLEANUP_COVERAGE", ["cleanupSlotCount", "missingCleanupSlotCount"],
    "Enter cleanup slot count and missing cleanup slot count.",
    "Missing cleanup slot count must be zero.", "Counts and owner names only.",
    "Block entry worksheet if cleanup coverage is missing."),
  slot("Node v850", "ENTRY_WORKSHEET_FAILURE_CLASS_COVERAGE",
    "INTAKE_REVIEW_FAILURE_CLASS_COVERAGE", ["failureClassCount", "duplicateFailureClassCount"],
    "Enter failure class count and duplicate failure class count.",
    "Duplicate failure class count must be zero.", "Failure class labels only.",
    "Block entry worksheet if failure classes are ambiguous."),
  slot("Node v851", "ENTRY_WORKSHEET_SECRET_EXCLUSION",
    "INTAKE_REVIEW_SECRET_EXCLUSION", ["secretValuePresent", "secretValueCount"],
    "Enter secret value present flag and secret value count.",
    "Secret value present must be false and count zero.", "Boolean and count only.",
    "Block entry worksheet if a secret value is present."),
  slot("Node v852", "ENTRY_WORKSHEET_READ_ONLY_BOUNDARY",
    "INTAKE_REVIEW_READ_ONLY_BOUNDARY", ["readOnlyControlCount", "nonReadOnlyControlCount"],
    "Enter read-only and non-read-only control counts.",
    "Non-read-only control count must be zero.", "Counts only.", "Block entry worksheet if a control is not read-only."),
  slot("Node v853", "ENTRY_WORKSHEET_WRITE_BLOCK",
    "INTAKE_REVIEW_WRITE_BLOCK", ["writesAllowed", "writeRouteCount"],
    "Enter writes allowed flag and write route count.",
    "Writes allowed must be false and write route count zero.", "Boolean and count only.",
    "Block entry worksheet if a write path is present."),
  slot("Node v854", "ENTRY_WORKSHEET_SERVICE_START_BLOCK",
    "INTAKE_REVIEW_SERVICE_START_BLOCK", ["automaticServiceStart", "startedServiceCount"],
    "Enter service start flag and started service count.",
    "Automatic service start must be false and count zero.", "Boolean and count only.",
    "Block entry worksheet if a service start path is present."),
  slot("Node v855", "ENTRY_WORKSHEET_PRODUCTION_EXECUTION_BLOCK",
    "INTAKE_REVIEW_PRODUCTION_EXECUTION_BLOCK", ["productionExecutionAllowed", "productionExecutionCount"],
    "Enter production execution allowed flag and production execution count.",
    "Production execution allowed must be false and count zero.", "Boolean and count only.",
    "Block entry worksheet if production execution is enabled."),
  slot("Node v856", "ENTRY_WORKSHEET_NODE_TARGET",
    "INTAKE_REVIEW_NODE_TARGET", ["nodeHealthEvidenceStatus", "nodeMarkdownEvidenceStatus"],
    "Enter Node health and Markdown evidence statuses.",
    "Each status must be pending, accepted, or triaged later by an explicit importer.",
    "Status labels and digests only.", "Keep Node target pending if either status is missing."),
  slot("Node v857", "ENTRY_WORKSHEET_JAVA_TARGET",
    "INTAKE_REVIEW_JAVA_TARGET", ["javaReadinessEvidenceStatus", "javaAcceptanceStatus"],
    "Enter Java readiness and acceptance statuses.",
    "Java statuses must be operator-provided; Node must not start Java.",
    "Status labels and read-only summaries only.", "Keep Java target pending if status is missing."),
  slot("Node v858", "ENTRY_WORKSHEET_MINI_KV_TARGET",
    "INTAKE_REVIEW_MINI_KV_TARGET", ["miniKvShardJsonStatus", "miniKvAcceptanceStatus"],
    "Enter mini-kv SHARDJSON and acceptance statuses.",
    "mini-kv command must remain SHARDJSON.", "Status labels and command name only.",
    "Keep mini-kv target pending if status is missing."),
  slot("Node v859", "ENTRY_WORKSHEET_POLICY_ARCHIVE_TARGETS",
    "INTAKE_REVIEW_POLICY_ARCHIVE_TARGETS", ["policyEvidenceStatus", "archiveEvidenceStatus"],
    "Enter policy and archive evidence statuses.",
    "Policy/archive statuses must not include runtime payload.", "Status labels and digest references only.",
    "Keep policy/archive target pending if status is missing."),
  slot("Node v860", "ENTRY_WORKSHEET_CATALOG_MAINTENANCE_BOUNDARY",
    "INTAKE_REVIEW_RENDERER_MAINTENANCE_BOUNDARY", ["rendererSplitConfirmed", "catalogBuilderUsed"],
    "Enter renderer split and catalog builder confirmation.",
    "Both maintenance confirmations must be true.", "Boolean confirmations only.",
    "Block closeout if maintenance boundaries are not confirmed."),
  slot("Node v861", "ENTRY_WORKSHEET_CLOSEOUT",
    "INTAKE_REVIEW_PACKAGE_CLOSEOUT", ["worksheetDigest", "javaMiniKvParallelPlan"],
    "Enter worksheet digest and cross-project parallel plan.",
    "Parallel plan must state Java and mini-kv can continue without waiting for Node.",
    "Digest and plan label only.", "Block closeout if digest or parallel plan is missing."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet(
  reviewPackage: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet {
  const controlsByCode = new Map(reviewPackage.controls.map((control) => [control.code, control]));
  const slots = WORKSHEET_TEMPLATES.map((template, index) =>
    createWorksheetSlot(template, controlsByCode.get(template.sourceReviewControlCode), index));
  const scopes = new Set(slots.map((worksheetSlot) => worksheetSlot.scope));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetGates = {
    sourceReviewPackageReady: reviewPackage.readyForOperatorIntakeReview,
    slotCountComplete: slots.length === EXPECTED_WORKSHEET_VERSIONS.length,
    versionsSequential: slots.every((worksheetSlot, index) =>
      worksheetSlot.nodeVersion === EXPECTED_WORKSHEET_VERSIONS[index]),
    eachSlotMapsReviewControl: slots.every((worksheetSlot) =>
      controlsByCode.has(worksheetSlot.sourceReviewControlCode)),
    sourceControlsPassed: slots.every((worksheetSlot) => worksheetSlot.sourceReviewControlPassed),
    blankManualEntryOnly: slots.every((worksheetSlot) =>
      worksheetSlot.manualValueState === "not-entered" && !worksheetSlot.readyForOperatorEntry),
    worksheetFieldsPresent: slots.every((worksheetSlot) => worksheetSlot.worksheetFieldNames.length > 0),
    operatorPromptsPresent: slots.every((worksheetSlot) => worksheetSlot.operatorPrompt.length > 0),
    validationRulesPresent: slots.every((worksheetSlot) => worksheetSlot.validationRule.length > 0),
    redactionRulesPresent: slots.every((worksheetSlot) => worksheetSlot.redactionRule.length > 0),
    targetScopesCovered: REQUIRED_SCOPES.every((scope) => scopes.has(scope)),
    maintenanceSlotPresent: slots.some((worksheetSlot) => worksheetSlot.kind === "maintenance-slot"),
    closeoutSlotPresent: slots.some((worksheetSlot) => worksheetSlot.kind === "closeout-slot"),
    crossProjectParallelPlanClear: slots.some((worksheetSlot) =>
      worksheetSlot.scope === "crossProject"
      && worksheetSlot.validationRule.includes("Java and mini-kv can continue")),
    noRuntimePayloadImported: !reviewPackage.importsRuntimePayload
      && slots.every((worksheetSlot) => !worksheetSlot.importsRuntimePayload),
    noSyntheticEvidenceAccepted: !reviewPackage.acceptsSyntheticEvidence
      && slots.every((worksheetSlot) => !worksheetSlot.acceptsSyntheticEvidence),
    noSecretValues: !reviewPackage.containsSecretValue && slots.every((worksheetSlot) => !worksheetSlot.containsSecretValue),
    allSlotsReadOnly: slots.every((worksheetSlot) => worksheetSlot.readOnly),
    noWritesAllowed: !reviewPackage.writeRoutingAllowed && slots.every((worksheetSlot) => !worksheetSlot.writesAllowed),
    noAutomaticServiceStart: !reviewPackage.startsServices
      && slots.every((worksheetSlot) => !worksheetSlot.automaticServiceStart && !worksheetSlot.startsServices),
    productionExecutionBlocked: !reviewPackage.readyForProductionExecution && !reviewPackage.executionAllowed,
  };
  const blockedReasonCodes = createWorksheetBlockedReasons(gates);
  const readyForOperatorEntryWorksheet = blockedReasonCodes.length === 0;
  const worksheetDigest = sha256StableJson({
    worksheetVersion: "Node v861",
    sourceReviewPackageVersion: reviewPackage.packageVersion,
    sourceReviewPackageDigest: reviewPackage.packageDigest,
    slots: slots.map((worksheetSlot) => [
      worksheetSlot.order,
      worksheetSlot.nodeVersion,
      worksheetSlot.code,
      worksheetSlot.kind,
      worksheetSlot.scope,
      worksheetSlot.sourceReviewControlCode,
      worksheetSlot.worksheetFieldNames,
      worksheetSlot.manualValueState,
    ]),
    gates,
  });

  return {
    worksheetVersion: "Node v861",
    sourceReviewPackageVersion: "Node v836",
    worksheetState: readyForOperatorEntryWorksheet ? "ready-for-operator-entry-worksheet" : "blocked",
    readyForOperatorEntryWorksheet,
    readyForManualEvidenceEntry: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    slotCount: slots.length,
    ledgerCheckSlotCount: slots.filter((worksheetSlot) => worksheetSlot.kind === "ledger-check-slot").length,
    targetEntrySlotCount: slots.filter((worksheetSlot) => worksheetSlot.kind === "target-entry-slot").length,
    policyArchiveSlotCount: slots.filter((worksheetSlot) => worksheetSlot.kind === "policy-archive-slot").length,
    maintenanceSlotCount: slots.filter((worksheetSlot) => worksheetSlot.kind === "maintenance-slot").length,
    closeoutSlotCount: slots.filter((worksheetSlot) => worksheetSlot.kind === "closeout-slot").length,
    scopeCount: scopes.size,
    worksheetFieldCount: slots.reduce((count, worksheetSlot) =>
      count + worksheetSlot.worksheetFieldNames.length, 0),
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    slots,
    worksheetDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function createWorksheetSlot(
  template: WorksheetTemplate,
  sourceControl: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl | undefined,
  index: number,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot {
  return {
    order: index + 1,
    nodeVersion: template.nodeVersion,
    code: template.code,
    kind: slotKind(sourceControl),
    scope: sourceControl?.scope ?? "ledger",
    sourceReviewControlCode: template.sourceReviewControlCode,
    sourceReviewControlPassed: sourceControl?.sourceGatePassed ?? false,
    worksheetFieldNames: [...template.worksheetFieldNames],
    operatorPrompt: template.operatorPrompt,
    validationRule: template.validationRule,
    redactionRule: template.redactionRule,
    missingValuePolicy: template.missingValuePolicy,
    manualValueState: "not-entered",
    readyForOperatorEntry: false,
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
  sourceControl: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl | undefined,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlotKind {
  if (sourceControl?.kind === "target-intake-review") {
    return "target-entry-slot";
  }
  if (sourceControl?.kind === "archive-policy-review") {
    return "policy-archive-slot";
  }
  if (sourceControl?.kind === "maintenance-boundary-review") {
    return "maintenance-slot";
  }
  if (sourceControl?.kind === "closeout") {
    return "closeout-slot";
  }
  return "ledger-check-slot";
}

function slot(
  nodeVersion: WorksheetTemplate["nodeVersion"],
  code: string,
  sourceReviewControlCode: string,
  worksheetFieldNames: string[],
  operatorPrompt: string,
  validationRule: string,
  redactionRule: string,
  missingValuePolicy: string,
): WorksheetTemplate {
  return {
    nodeVersion,
    code,
    sourceReviewControlCode,
    worksheetFieldNames,
    operatorPrompt,
    validationRule,
    redactionRule,
    missingValuePolicy,
  };
}

function createWorksheetBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetGates,
): string[] {
  return [
    gates.sourceReviewPackageReady ? null : "SOURCE_REVIEW_PACKAGE_NOT_READY",
    gates.slotCountComplete ? null : "MANUAL_ENTRY_WORKSHEET_SLOT_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "MANUAL_ENTRY_WORKSHEET_VERSIONS_NOT_SEQUENTIAL",
    gates.eachSlotMapsReviewControl ? null : "MANUAL_ENTRY_WORKSHEET_REVIEW_CONTROL_MISSING",
    gates.sourceControlsPassed ? null : "MANUAL_ENTRY_WORKSHEET_SOURCE_CONTROLS_NOT_PASSED",
    gates.blankManualEntryOnly ? null : "MANUAL_ENTRY_WORKSHEET_NOT_BLANK",
    gates.worksheetFieldsPresent ? null : "MANUAL_ENTRY_WORKSHEET_FIELDS_MISSING",
    gates.operatorPromptsPresent ? null : "MANUAL_ENTRY_WORKSHEET_PROMPTS_MISSING",
    gates.validationRulesPresent ? null : "MANUAL_ENTRY_WORKSHEET_VALIDATION_RULES_MISSING",
    gates.redactionRulesPresent ? null : "MANUAL_ENTRY_WORKSHEET_REDACTION_RULES_MISSING",
    gates.targetScopesCovered ? null : "MANUAL_ENTRY_WORKSHEET_SCOPE_COVERAGE_INCOMPLETE",
    gates.maintenanceSlotPresent ? null : "MANUAL_ENTRY_WORKSHEET_MAINTENANCE_SLOT_MISSING",
    gates.closeoutSlotPresent ? null : "MANUAL_ENTRY_WORKSHEET_CLOSEOUT_SLOT_MISSING",
    gates.crossProjectParallelPlanClear ? null : "MANUAL_ENTRY_WORKSHEET_CROSS_PROJECT_PLAN_NOT_CLEAR",
    gates.noRuntimePayloadImported ? null : "MANUAL_ENTRY_WORKSHEET_RUNTIME_PAYLOAD_IMPORTED",
    gates.noSyntheticEvidenceAccepted ? null : "MANUAL_ENTRY_WORKSHEET_SYNTHETIC_EVIDENCE_ACCEPTED",
    gates.noSecretValues ? null : "MANUAL_ENTRY_WORKSHEET_SECRET_VALUE_PRESENT",
    gates.allSlotsReadOnly ? null : "MANUAL_ENTRY_WORKSHEET_SLOT_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "MANUAL_ENTRY_WORKSHEET_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "MANUAL_ENTRY_WORKSHEET_SERVICE_START_ENABLED",
    gates.productionExecutionBlocked ? null : "MANUAL_ENTRY_WORKSHEET_PRODUCTION_EXECUTION_ENABLED",
  ].filter((reason): reason is string => reason !== null);
}
