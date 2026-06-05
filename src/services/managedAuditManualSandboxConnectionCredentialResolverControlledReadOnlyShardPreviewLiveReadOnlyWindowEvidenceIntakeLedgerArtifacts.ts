import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecord,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntry,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerTypes.js";

const EXPECTED_INTAKE_LEDGER_VERSIONS = [
  "Node v792",
  "Node v793",
  "Node v794",
  "Node v795",
  "Node v796",
  "Node v797",
  "Node v798",
  "Node v799",
  "Node v800",
  "Node v801",
  "Node v802",
  "Node v803",
  "Node v804",
  "Node v805",
  "Node v806",
  "Node v807",
  "Node v808",
  "Node v809",
  "Node v810",
  "Node v811",
] as const;

const REQUIRED_TARGETS: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget[] = [
  "node-http",
  "java-http",
  "mini-kv-tcp",
  "archive",
  "policy",
];

type IntakeTemplate = Pick<ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntry,
  "nodeVersion" | "code" | "kind" | "sourceEvidenceRecordCode" | "intakeSlot"
  | "operatorInputInstruction" | "missingInputPolicy">;

const INTAKE_TEMPLATES: readonly IntakeTemplate[] = Object.freeze([
  entry("Node v792", "INTAKE_SOURCE_WORKSHEET_REVIEW", "source-intake",
    "EVIDENCE_SOURCE_WORKSHEET_CHECK", "source-worksheet-intake",
    "Enter the source worksheet digest and state copied from the v771 worksheet.",
    "Block intake if the source worksheet digest or state is missing."),
  entry("Node v793", "INTAKE_OPERATOR_CONTEXT_ENTRY", "operator-intake",
    "EVIDENCE_OPERATOR_CONTEXT_RECORD", "operator-context-intake",
    "Enter operator role, approval reference, and read-only environment flags.",
    "Block intake if approval reference or action-disabled flag is missing."),
  entry("Node v794", "INTAKE_NODE_HEALTH_ENTRY", "command-intake",
    "EVIDENCE_NODE_HEALTH_RECORD", "node-health-intake",
    "Enter Node health status, header names, latency, and summary.",
    "Triage Node health instead of accepting incomplete status evidence."),
  entry("Node v795", "INTAKE_NODE_MARKDOWN_ENTRY", "command-intake",
    "EVIDENCE_NODE_MARKDOWN_RECORD", "node-markdown-intake",
    "Enter Markdown status, content type, section count, and profile digest.",
    "Block archive intake if Markdown section coverage is missing."),
  entry("Node v796", "INTAKE_JAVA_SHARD_READINESS_ENTRY", "command-intake",
    "EVIDENCE_JAVA_SHARD_READINESS_RECORD", "java-shard-readiness-intake",
    "Enter Java status code, shard count, slot count, and routing mode.",
    "Mark Java evidence as triaged if the operator-started Java read is absent."),
  entry("Node v797", "INTAKE_MINI_KV_SHARDJSON_ENTRY", "command-intake",
    "EVIDENCE_MINI_KV_SHARDJSON_RECORD", "mini-kv-shardjson-intake",
    "Enter mini-kv command, shard map count, slot count, and routing mode.",
    "Reject intake if the command is not SHARDJSON."),
  entry("Node v798", "INTAKE_HEADER_REDACTION_ENTRY", "policy-intake",
    "EVIDENCE_HEADER_REDACTION_RECORD", "header-redaction-intake",
    "Enter header name count, redacted value count, and redaction policy.",
    "Reject intake if any header value is present."),
  entry("Node v799", "INTAKE_MINI_KV_ALLOWLIST_ENTRY", "policy-intake",
    "EVIDENCE_MINI_KV_ALLOWLIST_RECORD", "mini-kv-allowlist-intake",
    "Enter allowed command, forbidden command count, and allowlist decision.",
    "Reject intake if mutating commands are present."),
  entry("Node v800", "INTAKE_FORBIDDEN_OPERATION_ENTRY", "policy-intake",
    "EVIDENCE_FORBIDDEN_OPERATION_RECORD", "forbidden-operation-intake",
    "Enter write routing, LOAD/RESTORE/COMPACT, and sibling mutation flags.",
    "Reject intake if any forbidden operation flag is true."),
  entry("Node v801", "INTAKE_NODE_ACCEPTANCE_ENTRY", "acceptance-intake",
    "EVIDENCE_NODE_ACCEPTANCE_RULE", "node-acceptance-intake",
    "Enter Node evidence status, digest, and failure class.",
    "Keep Node evidence pending if digest or triage class is missing."),
  entry("Node v802", "INTAKE_JAVA_ACCEPTANCE_ENTRY", "acceptance-intake",
    "EVIDENCE_JAVA_ACCEPTANCE_RULE", "java-acceptance-intake",
    "Enter Java evidence status, read-only status, and failure class.",
    "Keep Java evidence pending if read-only status is not explicit."),
  entry("Node v803", "INTAKE_MINI_KV_ACCEPTANCE_ENTRY", "acceptance-intake",
    "EVIDENCE_MINI_KV_ACCEPTANCE_RULE", "mini-kv-acceptance-intake",
    "Enter mini-kv evidence status, command, and failure class.",
    "Reject intake if mini-kv command is not SHARDJSON."),
  entry("Node v804", "INTAKE_NODE_CLEANUP_ENTRY", "cleanup-intake",
    "EVIDENCE_NODE_CLEANUP_RECORD", "node-cleanup-intake",
    "Enter Node process owner, PID if started, and close result.",
    "Block closeout if a Node operator process lacks cleanup result."),
  entry("Node v805", "INTAKE_SIBLING_CLEANUP_ENTRY", "cleanup-intake",
    "EVIDENCE_SIBLING_CLEANUP_RECORD", "sibling-cleanup-intake",
    "Enter Java and mini-kv cleanup owners plus sibling close result.",
    "Block closeout if sibling cleanup ownership is not recorded."),
  entry("Node v806", "INTAKE_NODE_FAILURE_TRIAGE_ENTRY", "failure-intake",
    "EVIDENCE_NODE_FAILURE_TRIAGE_RECORD", "node-failure-triage-intake",
    "Enter Node failure class, retry decision, and stop decision.",
    "Reject retry if it would require a write or service mutation."),
  entry("Node v807", "INTAKE_SIBLING_FAILURE_TRIAGE_ENTRY", "failure-intake",
    "EVIDENCE_SIBLING_FAILURE_TRIAGE_RECORD", "sibling-failure-triage-intake",
    "Enter sibling failure class, retry decision, and stop decision.",
    "Reject retry if upstream actions would be enabled."),
  entry("Node v808", "INTAKE_ARCHIVE_SNAPSHOT_ENTRY", "archive-intake",
    "EVIDENCE_ARCHIVE_SNAPSHOT_RECORD", "archive-snapshot-intake",
    "Enter archive snapshot digest, record count, and cleanup record count.",
    "Block archive verification if counts do not match the packet."),
  entry("Node v809", "INTAKE_ARCHIVE_VERIFICATION_ENTRY", "archive-intake",
    "EVIDENCE_ARCHIVE_VERIFICATION_RECORD", "archive-verification-intake",
    "Enter archive verification digest, passed gate count, and blocked reasons.",
    "Block release if archive verification digest is missing."),
  entry("Node v810", "INTAKE_GO_NO_GO_RECEIPT_ENTRY", "handoff-intake",
    "EVIDENCE_GO_NO_GO_RECEIPT_RECORD", "go-no-go-receipt-intake",
    "Enter manual decision, decision scope, and production execution flag.",
    "Reject decision if production execution is allowed."),
  entry("Node v811", "INTAKE_LEDGER_CLOSEOUT_ENTRY", "closeout",
    "EVIDENCE_PACKET_CLOSEOUT_RECORD", "intake-ledger-closeout",
    "Enter intake ledger digest and confirm all entries remain awaiting manual entry.",
    "Block closeout if any entry imports runtime payload or synthetic evidence."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger(
  evidencePacket: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger {
  const sourceRecordsByCode = new Map(evidencePacket.records.map((record) => [record.code, record]));
  const entries = INTAKE_TEMPLATES.map((template, index) =>
    createLedgerEntry(template, sourceRecordsByCode.get(template.sourceEvidenceRecordCode), index));
  const targets = new Set(entries.map((ledgerEntry) => ledgerEntry.target));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerGates = {
    sourceEvidencePacketReady: evidencePacket.readyForManualEvidenceCapture,
    entryCountComplete: entries.length === EXPECTED_INTAKE_LEDGER_VERSIONS.length,
    versionsSequential: entries.every((ledgerEntry, index) =>
      ledgerEntry.nodeVersion === EXPECTED_INTAKE_LEDGER_VERSIONS[index]),
    eachEntryMapsEvidenceRecord: entries.every((ledgerEntry) =>
      sourceRecordsByCode.has(ledgerEntry.sourceEvidenceRecordCode)),
    sourceRecordsPendingManualCapture: evidencePacket.records
      .every((record) => record.captureState === "pending-manual-capture"),
    requiredFieldsPreserved: entries.every((ledgerEntry) => ledgerEntry.preservedRequiredFields.length > 0)
      && entries.reduce((count, ledgerEntry) => count + ledgerEntry.preservedRequiredFields.length, 0)
        === evidencePacket.requiredFieldCount,
    acceptanceCriteriaPreserved: entries.every((ledgerEntry) => ledgerEntry.preservedAcceptanceCriteria.length > 0)
      && entries.reduce((count, ledgerEntry) => count + ledgerEntry.preservedAcceptanceCriteria.length, 0)
        === evidencePacket.acceptanceCriterionCount,
    redactionRulesPreserved: entries.every((ledgerEntry) => ledgerEntry.preservedRedactionRule.length > 0),
    manualInputStateOnly: entries.every((ledgerEntry) =>
      ledgerEntry.captureInputState === "awaiting-manual-entry"),
    noRuntimePayloadImported: entries.every((ledgerEntry) => !ledgerEntry.importsRuntimePayload),
    noSyntheticEvidenceAccepted: entries.every((ledgerEntry) => !ledgerEntry.acceptsSyntheticEvidence),
    targetCoverageComplete: REQUIRED_TARGETS.every((target) => targets.has(target)),
    cleanupEntriesPresent: entries.filter((ledgerEntry) => ledgerEntry.cleanupRequired).length
      === evidencePacket.cleanupRecordCount,
    failureClassesPresent: new Set(entries.map((ledgerEntry) => ledgerEntry.failureClass)).size === entries.length,
    noSecretValues: entries.every((ledgerEntry) => !ledgerEntry.containsSecretValue),
    allEntriesReadOnly: entries.every((ledgerEntry) => ledgerEntry.readOnly),
    noWritesAllowed: entries.every((ledgerEntry) => !ledgerEntry.writesAllowed),
    noAutomaticServiceStart: entries.every((ledgerEntry) =>
      !ledgerEntry.automaticServiceStart && !ledgerEntry.startsServices),
    productionExecutionBlocked: !evidencePacket.readyForProductionExecution && !evidencePacket.executionAllowed,
  };
  const blockedReasonCodes = createIntakeLedgerBlockedReasons(gates);
  const readyForManualEvidenceIntake = blockedReasonCodes.length === 0;
  const ledgerDigest = sha256StableJson({
    ledgerVersion: "Node v811",
    inputEvidencePacketVersion: evidencePacket.evidencePacketVersion,
    evidencePacketDigest: evidencePacket.evidencePacketDigest,
    entries: entries.map((ledgerEntry) => [
      ledgerEntry.order,
      ledgerEntry.nodeVersion,
      ledgerEntry.code,
      ledgerEntry.kind,
      ledgerEntry.sourceEvidenceRecordCode,
      ledgerEntry.intakeSlot,
      ledgerEntry.preservedRequiredFields,
      ledgerEntry.preservedAcceptanceCriteria,
      ledgerEntry.captureInputState,
      ledgerEntry.failureClass,
    ]),
    gates,
  });

  return {
    ledgerVersion: "Node v811",
    inputEvidencePacketVersion: "Node v791",
    ledgerState: readyForManualEvidenceIntake ? "ready-for-manual-evidence-intake" : "blocked",
    readyForManualEvidenceIntake,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    entryCount: entries.length,
    targetCount: targets.size,
    requiredFieldCount: entries.reduce((count, ledgerEntry) =>
      count + ledgerEntry.preservedRequiredFields.length, 0),
    acceptanceCriterionCount: entries.reduce((count, ledgerEntry) =>
      count + ledgerEntry.preservedAcceptanceCriteria.length, 0),
    cleanupEntryCount: entries.filter((ledgerEntry) => ledgerEntry.cleanupRequired).length,
    failureClassCount: new Set(entries.map((ledgerEntry) => ledgerEntry.failureClass)).size,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    entries,
    ledgerDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function createLedgerEntry(
  template: IntakeTemplate,
  sourceRecord: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecord | undefined,
  index: number,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntry {
  return {
    order: index + 1,
    nodeVersion: template.nodeVersion,
    code: template.code,
    kind: template.kind,
    sourceEvidenceRecordCode: template.sourceEvidenceRecordCode,
    owner: sourceRecord?.owner ?? "operator",
    target: sourceRecord?.target ?? "policy",
    intakeSlot: template.intakeSlot,
    preservedRequiredFields: sourceRecord?.requiredFields ?? [],
    preservedAcceptanceCriteria: sourceRecord?.acceptanceCriteria ?? [],
    preservedRedactionRule: sourceRecord?.redactionRule ?? "",
    operatorInputInstruction: template.operatorInputInstruction,
    missingInputPolicy: template.missingInputPolicy,
    cleanupRequired: sourceRecord?.cleanupRequired ?? false,
    failureClass: sourceRecord?.failureClass ?? `${template.code}-source-missing`,
    captureInputState: "awaiting-manual-entry",
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

function entry(
  nodeVersion: IntakeTemplate["nodeVersion"],
  code: string,
  kind: IntakeTemplate["kind"],
  sourceEvidenceRecordCode: string,
  intakeSlot: string,
  operatorInputInstruction: string,
  missingInputPolicy: string,
): IntakeTemplate {
  return {
    nodeVersion,
    code,
    kind,
    sourceEvidenceRecordCode,
    intakeSlot,
    operatorInputInstruction,
    missingInputPolicy,
  };
}

function createIntakeLedgerBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerGates,
): string[] {
  return [
    gates.sourceEvidencePacketReady ? null : "SOURCE_EVIDENCE_PACKET_NOT_READY",
    gates.entryCountComplete ? null : "EVIDENCE_INTAKE_ENTRY_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "EVIDENCE_INTAKE_VERSIONS_NOT_SEQUENTIAL",
    gates.eachEntryMapsEvidenceRecord ? null : "EVIDENCE_INTAKE_SOURCE_RECORD_MISSING",
    gates.sourceRecordsPendingManualCapture ? null : "EVIDENCE_INTAKE_SOURCE_ALREADY_CAPTURED",
    gates.requiredFieldsPreserved ? null : "EVIDENCE_INTAKE_REQUIRED_FIELDS_NOT_PRESERVED",
    gates.acceptanceCriteriaPreserved ? null : "EVIDENCE_INTAKE_ACCEPTANCE_CRITERIA_NOT_PRESERVED",
    gates.redactionRulesPreserved ? null : "EVIDENCE_INTAKE_REDACTION_RULES_NOT_PRESERVED",
    gates.manualInputStateOnly ? null : "EVIDENCE_INTAKE_NOT_MANUAL_INPUT_ONLY",
    gates.noRuntimePayloadImported ? null : "EVIDENCE_INTAKE_RUNTIME_PAYLOAD_IMPORTED",
    gates.noSyntheticEvidenceAccepted ? null : "EVIDENCE_INTAKE_SYNTHETIC_EVIDENCE_ACCEPTED",
    gates.targetCoverageComplete ? null : "EVIDENCE_INTAKE_TARGET_COVERAGE_INCOMPLETE",
    gates.cleanupEntriesPresent ? null : "EVIDENCE_INTAKE_CLEANUP_ENTRIES_MISSING",
    gates.failureClassesPresent ? null : "EVIDENCE_INTAKE_FAILURE_CLASSES_MISSING",
    gates.noSecretValues ? null : "EVIDENCE_INTAKE_SECRET_VALUE_PRESENT",
    gates.allEntriesReadOnly ? null : "EVIDENCE_INTAKE_ENTRY_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "EVIDENCE_INTAKE_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "EVIDENCE_INTAKE_AUTOMATIC_SERVICE_START_ENABLED",
    gates.productionExecutionBlocked ? null : "EVIDENCE_INTAKE_PRODUCTION_EXECUTION_ENABLED",
  ].filter((reason): reason is string => reason !== null);
}
