import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStep,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalTypes.js";

const EXPECTED_REHEARSAL_VERSIONS = [
  "Node v732",
  "Node v733",
  "Node v734",
  "Node v735",
  "Node v736",
  "Node v737",
  "Node v738",
  "Node v739",
  "Node v740",
  "Node v741",
  "Node v742",
  "Node v743",
  "Node v744",
  "Node v745",
  "Node v746",
  "Node v747",
  "Node v748",
  "Node v749",
  "Node v750",
  "Node v751",
] as const;

type RehearsalTemplate = Omit<ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStep,
  "order" | "readOnly" | "writesAllowed" | "automaticServiceStart" | "startsServices" | "mutatesSiblingState">;

const REHEARSAL_TEMPLATES: readonly RehearsalTemplate[] = Object.freeze([
  step("Node v732", "REHEARSAL_SOURCE_PACKAGE_PRECHECK", "preflight", "RUNBOOK_PACKAGE_CLOSEOUT", "node", false,
    "Confirm the runbook package is ready before rehearsal.",
    "source-package-digest", "source-package-blocked"),
  step("Node v733", "REHEARSAL_OWNER_DRY_RUN", "preflight", "OWNER_BINDING_CHECKLIST", "crossProject", true,
    "Dry-run owner, port, PID policy, and cleanup owner collection.",
    "owner-dry-run-record", "owner-missing"),
  step("Node v734", "REHEARSAL_NODE_TARGET_DRY_RUN", "target-read", "NODE_TARGET_CHECKLIST", "node", false,
    "Dry-run Node read target order without opening a server.",
    "node-target-dry-run-record", "node-target-missing"),
  step("Node v735", "REHEARSAL_JAVA_TARGET_DRY_RUN", "target-read", "JAVA_TARGET_CHECKLIST", "java", false,
    "Dry-run Java GET target order without starting Java from Node.",
    "java-target-dry-run-record", "java-target-missing"),
  step("Node v736", "REHEARSAL_MINI_KV_TARGET_DRY_RUN", "target-read", "MINI_KV_TARGET_CHECKLIST", "miniKv", false,
    "Dry-run mini-kv read command order without starting mini-kv from Node.",
    "mini-kv-target-dry-run-record", "mini-kv-target-missing"),
  step("Node v737", "REHEARSAL_HEADER_POLICY_CHECK", "policy-check", "OPERATOR_HEADER_POLICY", "node", false,
    "Check guarded Node header names without storing secret values.",
    "header-policy-record", "header-policy-incomplete"),
  step("Node v738", "REHEARSAL_COMMAND_ALLOWLIST_CHECK", "policy-check", "MINI_KV_COMMAND_ALLOWLIST", "miniKv", false,
    "Check mini-kv command allowlist before live read-only rehearsal.",
    "command-allowlist-record", "command-not-allowlisted"),
  step("Node v739", "REHEARSAL_FORBIDDEN_OPERATION_CHECK", "policy-check", "FORBIDDEN_OPERATION_CHECKLIST",
    "crossProject", false,
    "Check forbidden operation list before live read-only rehearsal.",
    "forbidden-operation-record", "forbidden-operation-present"),
  step("Node v740", "REHEARSAL_EVIDENCE_SLOT_DRY_RUN", "evidence-slot", "EVIDENCE_RECORD_SCHEMA", "crossProject",
    false, "Reserve evidence slots for every future read result.", "evidence-slot-record", "evidence-slot-missing"),
  step("Node v741", "REHEARSAL_CLEANUP_SLOT_DRY_RUN", "cleanup-slot", "CLEANUP_RECORD_SCHEMA", "crossProject",
    true, "Reserve cleanup slots for every future owned process.", "cleanup-slot-record", "cleanup-slot-missing"),
  step("Node v742", "REHEARSAL_READINESS_VERIFICATION_DRY_RUN", "verification", "WINDOW_READINESS_CHECKLIST",
    "node", false, "Dry-run readiness gates without opening a live window.",
    "readiness-verification-record", "readiness-gate-failed"),
  step("Node v743", "REHEARSAL_ORDER_VERIFICATION", "verification", "OPERATOR_RUNBOOK_ORDER", "node", false,
    "Verify rehearsal order matches the operator runbook package.",
    "order-verification-record", "order-drift"),
  step("Node v744", "REHEARSAL_ALIGNMENT_VERIFICATION", "verification", "RUNBOOK_ALIGNMENT_CHECK", "node", false,
    "Verify every rehearsal step maps to a runbook section.",
    "alignment-verification-record", "alignment-drift"),
  step("Node v745", "REHEARSAL_ARCHIVE_SNAPSHOT_DRY_RUN", "archive-input", "ARCHIVE_SNAPSHOT_INPUTS", "node", false,
    "Dry-run archive snapshot inputs without writing live evidence.",
    "archive-snapshot-dry-run-record", "archive-snapshot-input-missing"),
  step("Node v746", "REHEARSAL_ARCHIVE_VERIFICATION_DRY_RUN", "archive-input", "ARCHIVE_VERIFICATION_INPUTS",
    "node", false, "Dry-run archive verification inputs.", "archive-verification-dry-run-record",
    "archive-verification-input-missing"),
  step("Node v747", "REHEARSAL_SUMMARY_LINE_DRY_RUN", "archive-input", "ARCHIVE_SUMMARY_LINES", "node", false,
    "Dry-run compact summary lines.", "summary-line-dry-run-record", "summary-line-missing"),
  step("Node v748", "REHEARSAL_RECEIPT_METADATA_DRY_RUN", "archive-input", "SUMMARY_RECEIPT_METADATA", "node",
    false, "Dry-run receipt metadata boundaries.", "receipt-metadata-dry-run-record", "receipt-metadata-missing"),
  step("Node v749", "REHEARSAL_RECEIPT_ARCHIVE_BOUNDARY_CHECK", "archive-input", "RECEIPT_ARCHIVE_BOUNDARY",
    "node", false, "Dry-run receipt archive boundary checks.", "receipt-archive-boundary-record",
    "receipt-archive-boundary-failed"),
  step("Node v750", "REHEARSAL_GO_NO_GO_SCOPE_CHECK", "handoff", "GO_NO_GO_DECISION_PACKET", "crossProject",
    false, "Confirm go/no-go remains manual live read-only only.", "go-no-go-scope-record", "go-no-go-scope-drift"),
  step("Node v751", "REHEARSAL_PACKET_CLOSEOUT", "closeout", "RUNBOOK_PACKAGE_CLOSEOUT", "node", false,
    "Close the rehearsal packet and keep live execution disabled.",
    "rehearsal-packet-closeout-record", "rehearsal-packet-blocked"),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(
  runbookPackage: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket {
  const runbookSectionCodes = new Set(runbookPackage.sections.map((section) => section.code));
  const steps = REHEARSAL_TEMPLATES.map((template, index) => ({
    ...template,
    order: index + 1,
    readOnly: true as const,
    writesAllowed: false as const,
    automaticServiceStart: false as const,
    startsServices: false as const,
    mutatesSiblingState: false as const,
  }));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketGates = {
    sourceRunbookReady: runbookPackage.readyForOperatorLiveReadOnlyWindow,
    stepCountComplete: steps.length === EXPECTED_REHEARSAL_VERSIONS.length,
    versionsSequential: steps.every((step, index) => step.nodeVersion === EXPECTED_REHEARSAL_VERSIONS[index]),
    eachStepMapsRunbookSection: steps.every((step) => runbookSectionCodes.has(step.sourceRunbookSectionCode)),
    preflightPresent: steps.some((step) => step.kind === "preflight"),
    evidenceSlotsPresent: steps.some((step) => step.kind === "evidence-slot"),
    cleanupSlotsPresent: steps.some((step) => step.kind === "cleanup-slot" && step.cleanupRequired),
    failureClassesPresent: new Set(steps.map((step) => step.failureClass)).size === steps.length,
    allStepsReadOnly: steps.every((step) => step.readOnly),
    noWritesAllowed: steps.every((step) => !step.writesAllowed),
    noAutomaticServiceStart: steps.every((step) => !step.automaticServiceStart),
    productionExecutionBlocked: !runbookPackage.readyForProductionExecution && !runbookPackage.executionAllowed,
  };
  const blockedReasonCodes = createRehearsalPacketBlockedReasons(gates);
  const readyForManualLiveReadOnlyRehearsal = blockedReasonCodes.length === 0;
  const packetDigest = sha256StableJson({
    packetVersion: "Node v751",
    inputRunbookPackageVersion: runbookPackage.packageVersion,
    runbookPackageDigest: runbookPackage.packageDigest,
    steps: steps.map((step) => [
      step.order,
      step.nodeVersion,
      step.code,
      step.kind,
      step.sourceRunbookSectionCode,
      step.evidenceSlot,
      step.failureClass,
    ]),
    gates,
  });

  return {
    packetVersion: "Node v751",
    inputRunbookPackageVersion: "Node v731",
    packetState: readyForManualLiveReadOnlyRehearsal
      ? "ready-for-manual-live-read-only-rehearsal"
      : "blocked",
    readyForManualLiveReadOnlyRehearsal,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    stepCount: steps.length,
    ownerCount: new Set(steps.map((step) => step.owner)).size,
    evidenceSlotCount: new Set(steps.map((step) => step.evidenceSlot)).size,
    cleanupRequiredStepCount: steps.filter((step) => step.cleanupRequired).length,
    failureClassCount: new Set(steps.map((step) => step.failureClass)).size,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    steps,
    packetDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

function step(
  nodeVersion: RehearsalTemplate["nodeVersion"],
  code: string,
  kind: RehearsalTemplate["kind"],
  sourceRunbookSectionCode: string,
  owner: RehearsalTemplate["owner"],
  cleanupRequired: boolean,
  rehearsalInstruction: string,
  evidenceSlot: string,
  failureClass: string,
): RehearsalTemplate {
  return {
    nodeVersion,
    code,
    kind,
    sourceRunbookSectionCode,
    owner,
    cleanupRequired,
    rehearsalInstruction,
    evidenceSlot,
    failureClass,
  };
}

function createRehearsalPacketBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketGates,
): string[] {
  return [
    gates.sourceRunbookReady ? null : "SOURCE_RUNBOOK_PACKAGE_NOT_READY",
    gates.stepCountComplete ? null : "REHEARSAL_STEP_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "REHEARSAL_VERSIONS_NOT_SEQUENTIAL",
    gates.eachStepMapsRunbookSection ? null : "REHEARSAL_RUNBOOK_MAPPING_MISSING",
    gates.preflightPresent ? null : "REHEARSAL_PREFLIGHT_MISSING",
    gates.evidenceSlotsPresent ? null : "REHEARSAL_EVIDENCE_SLOTS_MISSING",
    gates.cleanupSlotsPresent ? null : "REHEARSAL_CLEANUP_SLOTS_MISSING",
    gates.failureClassesPresent ? null : "REHEARSAL_FAILURE_CLASSES_MISSING",
    gates.allStepsReadOnly ? null : "REHEARSAL_STEP_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "REHEARSAL_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "REHEARSAL_AUTOMATIC_SERVICE_START_ENABLED",
    gates.productionExecutionBlocked ? null : "REHEARSAL_PRODUCTION_EXECUTION_ENABLED",
  ].filter((reason): reason is string => reason !== null);
}
