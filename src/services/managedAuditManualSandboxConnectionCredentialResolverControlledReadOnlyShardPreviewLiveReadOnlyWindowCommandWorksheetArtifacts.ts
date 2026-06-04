import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStep,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.js";

const EXPECTED_WORKSHEET_VERSIONS = [
  "Node v752",
  "Node v753",
  "Node v754",
  "Node v755",
  "Node v756",
  "Node v757",
  "Node v758",
  "Node v759",
  "Node v760",
  "Node v761",
  "Node v762",
  "Node v763",
  "Node v764",
  "Node v765",
  "Node v766",
  "Node v767",
  "Node v768",
  "Node v769",
  "Node v770",
  "Node v771",
] as const;

type WorksheetTemplate = Omit<ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStep,
  "order"
  | "containsSecretValue"
  | "readOnly"
  | "writesAllowed"
  | "automaticServiceStart"
  | "startsServices"
  | "mutatesSiblingState">;

const WORKSHEET_TEMPLATES: readonly WorksheetTemplate[] = Object.freeze([
  step("Node v752", "WORKSHEET_SOURCE_REHEARSAL_PACKET_CHECK", "source-check", "REHEARSAL_PACKET_CLOSEOUT",
    "node", "archive", false, "Review source rehearsal packet digest and blocked reasons.",
    "Source rehearsal packet is ready for manual command review.", "source-rehearsal-packet-review",
    null, "source-rehearsal-packet-blocked"),
  step("Node v753", "WORKSHEET_ENVIRONMENT_LOCK_CHECK", "environment-precheck", "REHEARSAL_OWNER_DRY_RUN",
    "operator", "policy", true, "Confirm UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
    "Probe window is explicitly read-only and actions remain disabled.", "environment-lock-record",
    null, "environment-lock-missing"),
  step("Node v754", "WORKSHEET_NODE_HEALTH_READ_TEMPLATE", "command-template", "REHEARSAL_NODE_TARGET_DRY_RUN",
    "node", "node-http", true, "GET /health with identity and approval headers.",
    "Node health responds without requiring write routing.", "node-health-read-record",
    null, "node-health-read-failed"),
  step("Node v755", "WORKSHEET_NODE_MARKDOWN_READ_TEMPLATE", "command-template", "REHEARSAL_NODE_TARGET_DRY_RUN",
    "node", "node-http", true, "GET controlled shard preview route with format=markdown.",
    "Node Markdown route returns controlled read-only shard preview evidence.", "node-markdown-read-record",
    null, "node-markdown-read-failed"),
  step("Node v756", "WORKSHEET_JAVA_SHARD_READINESS_TEMPLATE", "command-template", "REHEARSAL_JAVA_TARGET_DRY_RUN",
    "java", "java-http", true, "GET /api/v1/ops/shard-readiness from an operator-started Java service.",
    "Java returns shard readiness without mutation.", "java-shard-readiness-record",
    null, "java-shard-readiness-failed"),
  step("Node v757", "WORKSHEET_MINI_KV_SHARDJSON_TEMPLATE", "command-template", "REHEARSAL_MINI_KV_TARGET_DRY_RUN",
    "miniKv", "mini-kv-tcp", true, "Send SHARDJSON to an operator-started mini-kv TCP endpoint.",
    "mini-kv returns shard JSON readiness without LOAD/RESTORE/COMPACT.", "mini-kv-shardjson-record",
    null, "mini-kv-shardjson-failed"),
  step("Node v758", "WORKSHEET_HEADER_REDACTION_TEMPLATE", "header-template", "REHEARSAL_HEADER_POLICY_CHECK",
    "node", "policy", true, "Record header names and redact all header values.",
    "Archive contains header policy names only, not secret values.", "header-redaction-record",
    null, "header-redaction-failed"),
  step("Node v759", "WORKSHEET_MINI_KV_ALLOWLIST_TEMPLATE", "command-template", "REHEARSAL_COMMAND_ALLOWLIST_CHECK",
    "miniKv", "policy", true, "Confirm mini-kv command allowlist contains SHARDJSON only for this window.",
    "Allowed command list has no mutating commands.", "mini-kv-allowlist-record",
    null, "mini-kv-allowlist-failed"),
  step("Node v760", "WORKSHEET_FORBIDDEN_OPERATION_CONFIRMATION", "environment-precheck",
    "REHEARSAL_FORBIDDEN_OPERATION_CHECK", "crossProject", "policy", true,
    "Confirm write routing, LOAD, RESTORE, COMPACT, and sibling mutation remain forbidden.",
    "Forbidden operations are absent from the manual window.", "forbidden-operation-confirmation-record",
    null, "forbidden-operation-confirmation-failed"),
  step("Node v761", "WORKSHEET_EVIDENCE_CAPTURE_NODE", "evidence-capture", "REHEARSAL_EVIDENCE_SLOT_DRY_RUN",
    "node", "archive", true, "Capture Node status, route status, and digest summary.",
    "Node evidence slot is complete and redacted.", "node-evidence-capture-record",
    null, "node-evidence-capture-missing"),
  step("Node v762", "WORKSHEET_EVIDENCE_CAPTURE_JAVA", "evidence-capture", "REHEARSAL_EVIDENCE_SLOT_DRY_RUN",
    "java", "archive", true, "Capture Java status code and shard readiness summary.",
    "Java evidence slot is complete and redacted.", "java-evidence-capture-record",
    null, "java-evidence-capture-missing"),
  step("Node v763", "WORKSHEET_EVIDENCE_CAPTURE_MINI_KV", "evidence-capture", "REHEARSAL_EVIDENCE_SLOT_DRY_RUN",
    "miniKv", "archive", true, "Capture mini-kv command result and shard map summary.",
    "mini-kv evidence slot is complete and redacted.", "mini-kv-evidence-capture-record",
    null, "mini-kv-evidence-capture-missing"),
  step("Node v764", "WORKSHEET_CLEANUP_CAPTURE_NODE", "cleanup-capture", "REHEARSAL_CLEANUP_SLOT_DRY_RUN",
    "node", "archive", true, "Record any Node process opened by the operator and its close result.",
    "Node cleanup slot proves no operator-started process remains.", "node-cleanup-capture-record",
    "node-process-cleanup-slot", "node-cleanup-missing"),
  step("Node v765", "WORKSHEET_CLEANUP_CAPTURE_SIBLING", "cleanup-capture", "REHEARSAL_CLEANUP_SLOT_DRY_RUN",
    "crossProject", "archive", true, "Record Java and mini-kv operator-started process cleanup results.",
    "Sibling cleanup slot proves Node did not own or leave sibling services running.", "sibling-cleanup-capture-record",
    "sibling-process-cleanup-slot", "sibling-cleanup-missing"),
  step("Node v766", "WORKSHEET_FAILURE_TRIAGE_NODE", "failure-triage",
    "REHEARSAL_READINESS_VERIFICATION_DRY_RUN", "node", "policy", true,
    "Classify Node route, header, or Markdown failures before retry.",
    "Node failures have a documented read-only retry or stop decision.", "node-failure-triage-record",
    null, "node-failure-triage-missing"),
  step("Node v767", "WORKSHEET_FAILURE_TRIAGE_JAVA_MINI_KV", "failure-triage",
    "REHEARSAL_READINESS_VERIFICATION_DRY_RUN", "crossProject", "policy", true,
    "Classify Java and mini-kv read failures without enabling write actions.",
    "Sibling failures have a documented read-only retry or stop decision.", "sibling-failure-triage-record",
    null, "sibling-failure-triage-missing"),
  step("Node v768", "WORKSHEET_ARCHIVE_SNAPSHOT_RECORD", "archive-input",
    "REHEARSAL_ARCHIVE_SNAPSHOT_DRY_RUN", "node", "archive", true,
    "Prepare archive snapshot fields from command, evidence, cleanup, and failure records.",
    "Archive snapshot has complete bounded inputs.", "archive-snapshot-record",
    null, "archive-snapshot-record-missing"),
  step("Node v769", "WORKSHEET_ARCHIVE_VERIFICATION_RECORD", "archive-input",
    "REHEARSAL_ARCHIVE_VERIFICATION_DRY_RUN", "node", "archive", true,
    "Prepare archive verification gates and digest references.",
    "Archive verification inputs can be checked without live mutation.", "archive-verification-record",
    null, "archive-verification-record-missing"),
  step("Node v770", "WORKSHEET_GO_NO_GO_RECORD", "handoff", "REHEARSAL_GO_NO_GO_SCOPE_CHECK",
    "operator", "policy", true, "Record manual go/no-go decision for read-only command review only.",
    "Go/no-go remains scoped to manual read-only review, not production.", "go-no-go-record",
    null, "go-no-go-record-missing"),
  step("Node v771", "WORKSHEET_CLOSEOUT_RECORD", "closeout", "REHEARSAL_PACKET_CLOSEOUT",
    "node", "archive", false, "Close the command worksheet and keep live execution disabled.",
    "Worksheet is ready for manual command review and still not live execution.", "worksheet-closeout-record",
    null, "worksheet-closeout-blocked"),
]);

const REQUIRED_TARGETS = ["node-http", "java-http", "mini-kv-tcp", "archive", "policy"] as const;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(
  rehearsalPacket: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet {
  const rehearsalStepCodes = new Set(rehearsalPacket.steps.map((step) => step.code));
  const steps = WORKSHEET_TEMPLATES.map((template, index) => ({
    ...template,
    order: index + 1,
    containsSecretValue: false as const,
    readOnly: true as const,
    writesAllowed: false as const,
    automaticServiceStart: false as const,
    startsServices: false as const,
    mutatesSiblingState: false as const,
  }));
  const targets = new Set(steps.map((step) => step.target));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetGates = {
    sourceRehearsalReady: rehearsalPacket.readyForManualLiveReadOnlyRehearsal,
    stepCountComplete: steps.length === EXPECTED_WORKSHEET_VERSIONS.length,
    versionsSequential: steps.every((step, index) => step.nodeVersion === EXPECTED_WORKSHEET_VERSIONS[index]),
    eachStepMapsRehearsalStep: steps.every((step) => rehearsalStepCodes.has(step.sourceRehearsalStepCode)),
    commandTemplatesPresent: steps.every((step) => step.commandTemplate.length > 0),
    targetCoverageComplete: REQUIRED_TARGETS.every((target) => targets.has(target)),
    evidenceSlotsPresent: new Set(steps.map((step) => step.evidenceSlot)).size === steps.length,
    cleanupSlotsPresent: steps.filter((step) => step.kind === "cleanup-capture")
      .every((step) => step.cleanupSlot !== null),
    failureClassesPresent: new Set(steps.map((step) => step.failureClass)).size === steps.length,
    noSecretValues: steps.every((step) => !step.containsSecretValue),
    allStepsReadOnly: steps.every((step) => step.readOnly),
    noWritesAllowed: steps.every((step) => !step.writesAllowed),
    noAutomaticServiceStart: steps.every((step) => !step.automaticServiceStart && !step.startsServices),
    productionExecutionBlocked: !rehearsalPacket.readyForProductionExecution && !rehearsalPacket.executionAllowed,
  };
  const blockedReasonCodes = createWorksheetBlockedReasons(gates);
  const readyForManualCommandReview = blockedReasonCodes.length === 0;
  const worksheetDigest = sha256StableJson({
    worksheetVersion: "Node v771",
    inputRehearsalPacketVersion: rehearsalPacket.packetVersion,
    rehearsalPacketDigest: rehearsalPacket.packetDigest,
    steps: steps.map((step) => [
      step.order,
      step.nodeVersion,
      step.code,
      step.kind,
      step.sourceRehearsalStepCode,
      step.target,
      step.evidenceSlot,
      step.cleanupSlot,
      step.failureClass,
    ]),
    gates,
  });

  return {
    worksheetVersion: "Node v771",
    inputRehearsalPacketVersion: "Node v751",
    worksheetState: readyForManualCommandReview ? "ready-for-manual-command-review" : "blocked",
    readyForManualCommandReview,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    stepCount: steps.length,
    commandTemplateCount: steps.filter((step) => step.commandTemplate.length > 0).length,
    targetCount: targets.size,
    evidenceSlotCount: new Set(steps.map((step) => step.evidenceSlot)).size,
    cleanupSlotCount: new Set(steps.map((step) => step.cleanupSlot).filter((slot): slot is string => slot !== null))
      .size,
    failureClassCount: new Set(steps.map((step) => step.failureClass)).size,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    steps,
    worksheetDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    containsSecretValue: false,
  };
}

function step(
  nodeVersion: WorksheetTemplate["nodeVersion"],
  code: string,
  kind: WorksheetTemplate["kind"],
  sourceRehearsalStepCode: string,
  owner: WorksheetTemplate["owner"],
  target: WorksheetTemplate["target"],
  requiresOperatorInput: boolean,
  commandTemplate: string,
  expectedReadOnlyResult: string,
  evidenceSlot: string,
  cleanupSlot: string | null,
  failureClass: string,
): WorksheetTemplate {
  return {
    nodeVersion,
    code,
    kind,
    sourceRehearsalStepCode,
    owner,
    target,
    requiresOperatorInput,
    commandTemplate,
    expectedReadOnlyResult,
    evidenceSlot,
    cleanupSlot,
    failureClass,
  };
}

function createWorksheetBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetGates,
): string[] {
  return [
    gates.sourceRehearsalReady ? null : "SOURCE_REHEARSAL_PACKET_NOT_READY",
    gates.stepCountComplete ? null : "COMMAND_WORKSHEET_STEP_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "COMMAND_WORKSHEET_VERSIONS_NOT_SEQUENTIAL",
    gates.eachStepMapsRehearsalStep ? null : "COMMAND_WORKSHEET_REHEARSAL_MAPPING_MISSING",
    gates.commandTemplatesPresent ? null : "COMMAND_WORKSHEET_TEMPLATE_MISSING",
    gates.targetCoverageComplete ? null : "COMMAND_WORKSHEET_TARGET_COVERAGE_INCOMPLETE",
    gates.evidenceSlotsPresent ? null : "COMMAND_WORKSHEET_EVIDENCE_SLOTS_MISSING",
    gates.cleanupSlotsPresent ? null : "COMMAND_WORKSHEET_CLEANUP_SLOTS_MISSING",
    gates.failureClassesPresent ? null : "COMMAND_WORKSHEET_FAILURE_CLASSES_MISSING",
    gates.noSecretValues ? null : "COMMAND_WORKSHEET_SECRET_VALUE_PRESENT",
    gates.allStepsReadOnly ? null : "COMMAND_WORKSHEET_STEP_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "COMMAND_WORKSHEET_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "COMMAND_WORKSHEET_AUTOMATIC_SERVICE_START_ENABLED",
    gates.productionExecutionBlocked ? null : "COMMAND_WORKSHEET_PRODUCTION_EXECUTION_ENABLED",
  ].filter((reason): reason is string => reason !== null);
}
