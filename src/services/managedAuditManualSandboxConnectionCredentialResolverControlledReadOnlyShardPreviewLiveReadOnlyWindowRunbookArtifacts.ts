import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSection,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookTypes.js";

const EXPECTED_RUNBOOK_VERSIONS = [
  "Node v712",
  "Node v713",
  "Node v714",
  "Node v715",
  "Node v716",
  "Node v717",
  "Node v718",
  "Node v719",
  "Node v720",
  "Node v721",
  "Node v722",
  "Node v723",
  "Node v724",
  "Node v725",
  "Node v726",
  "Node v727",
  "Node v728",
  "Node v729",
  "Node v730",
  "Node v731",
] as const;

type RunbookTemplate = Omit<ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSection,
  "order" | "readOnly" | "writesAllowed" | "automaticServiceStart" | "startsServices" | "mutatesSiblingState">;

const RUNBOOK_TEMPLATES: readonly RunbookTemplate[] = Object.freeze([
  section("Node v712", "OWNER_BINDING_CHECKLIST", "owner", "crossProject", true, "WINDOW_OWNER_BINDING",
    "Confirm Node, Java, and mini-kv owners before opening the window.",
    "owner ids, ports, pid policy, cleanup owners"),
  section("Node v713", "NODE_TARGET_CHECKLIST", "target", "node", false, "NODE_READ_TARGET_SPEC",
    "Call only Node health and controlled preview read-only endpoints.",
    "Node target responses and route digests"),
  section("Node v714", "JAVA_TARGET_CHECKLIST", "target", "java", false, "JAVA_READ_TARGET_SPEC",
    "Call only Java read-only shard-readiness or health-style GET targets.",
    "Java GET response status and shard-readiness digest"),
  section("Node v715", "MINI_KV_TARGET_CHECKLIST", "target", "miniKv", false, "MINI_KV_READ_TARGET_SPEC",
    "Call only mini-kv read commands listed in the candidate.",
    "mini-kv command responses and read-only report digest"),
  section("Node v716", "OPERATOR_HEADER_POLICY", "header-policy", "node", false, "NODE_READ_TARGET_SPEC",
    "Attach operator, role, verification, and approval-correlation headers to guarded Node reads.",
    "header names and non-secret correlation id"),
  section("Node v717", "MINI_KV_COMMAND_ALLOWLIST", "command-policy", "miniKv", false, "MINI_KV_READ_TARGET_SPEC",
    "Use SHARDJSON and SHARDROUTEVERIFYREPORTJSON only.",
    "allowlisted command list"),
  section("Node v718", "FORBIDDEN_OPERATION_CHECKLIST", "forbidden-operation", "crossProject", false,
    "FORBIDDEN_OPERATION_POLICY",
    "Reject write routing, active routing activation, SET, DEL, EXPIRE, LOAD, RESTORE, and COMPACT.",
    "forbidden operation list"),
  section("Node v719", "EVIDENCE_RECORD_SCHEMA", "evidence", "crossProject", false, "WINDOW_EVIDENCE_MANIFEST",
    "Record request or command, owner, digest, result status, and read-only flag.",
    "evidence schema fields"),
  section("Node v720", "CLEANUP_RECORD_SCHEMA", "cleanup", "crossProject", true, "PROCESS_CLEANUP_RECORD",
    "Record stopped=true or a concrete cleanup blocker for every owned process.",
    "cleanup schema fields"),
  section("Node v721", "WINDOW_READINESS_CHECKLIST", "verification", "node", false, "WINDOW_READINESS_VERIFICATION",
    "Verify source candidate, stage ledger, target coverage, and safety flags before any live window.",
    "readiness gate result and ledger digest"),
  section("Node v722", "OPERATOR_RUNBOOK_ORDER", "handoff", "crossProject", false, "OPERATOR_RUNBOOK",
    "Execute the read-only checklist in ledger order.",
    "ordered runbook section ids"),
  section("Node v723", "RUNBOOK_ALIGNMENT_CHECK", "verification", "node", false, "OPERATOR_RUNBOOK_VERIFICATION",
    "Compare runbook sections with source stage codes before handoff.",
    "alignment result and mismatches"),
  section("Node v724", "ARCHIVE_SNAPSHOT_INPUTS", "archive", "node", false, "WINDOW_ARCHIVE_SNAPSHOT",
    "Snapshot only ledger digest, package digest, target sections, and non-secret metadata.",
    "archive snapshot inputs"),
  section("Node v725", "ARCHIVE_VERIFICATION_INPUTS", "verification", "node", false, "WINDOW_ARCHIVE_VERIFICATION",
    "Recompute digest and section counts after the future live window archive.",
    "archive verification gates"),
  section("Node v726", "ARCHIVE_SUMMARY_LINES", "archive", "node", false, "WINDOW_ARCHIVE_SUMMARY",
    "Summarize pass, skipped, mixed, blockers, and cleanup outcome without duplicating full evidence.",
    "summary line schema"),
  section("Node v727", "SUMMARY_RECEIPT_METADATA", "archive", "node", false, "WINDOW_ARCHIVE_SUMMARY_RECEIPT",
    "Record summary digest, line count, and blocker count as metadata only.",
    "receipt metadata fields"),
  section("Node v728", "RECEIPT_ARCHIVE_BOUNDARY", "archive", "node", false, "WINDOW_RECEIPT_ARCHIVE",
    "Archive only non-secret receipt metadata for later comparison.",
    "receipt archive boundary"),
  section("Node v729", "RECEIPT_ARCHIVE_VERIFICATION", "verification", "node", false,
    "WINDOW_RECEIPT_ARCHIVE_VERIFICATION",
    "Verify receipt archive metadata excludes credentials and runtime payloads.",
    "receipt archive verification gates"),
  section("Node v730", "GO_NO_GO_DECISION_PACKET", "handoff", "crossProject", false, "LIVE_READ_ONLY_GO_NO_GO",
    "Limit go/no-go to manual live read-only execution.",
    "go/no-go decision scope"),
  section("Node v731", "RUNBOOK_PACKAGE_CLOSEOUT", "closeout", "node", false, "TWENTY_VERSION_CLOSEOUT",
    "Close the runbook package and hand off the next action to a real read-only window.",
    "package digest and closeout gates"),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(
  stageLedger: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage {
  const stageCodes = new Set(stageLedger.stages.map((stage) => stage.code));
  const sections = RUNBOOK_TEMPLATES.map((template, index) => ({
    ...template,
    order: index + 1,
    readOnly: true as const,
    writesAllowed: false as const,
    automaticServiceStart: false as const,
    startsServices: false as const,
    mutatesSiblingState: false as const,
  }));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageGates = {
    sourceStageLedgerReady: stageLedger.readyForManualLiveReadOnlyWindow,
    sectionCountComplete: sections.length === EXPECTED_RUNBOOK_VERSIONS.length,
    versionsSequential: sections.every((section, index) => section.nodeVersion === EXPECTED_RUNBOOK_VERSIONS[index]),
    eachSectionMapsStage: sections.every((section) => stageCodes.has(section.verifiesStageCode)),
    allSectionsReadOnly: sections.every((section) => section.readOnly),
    noWritesAllowed: sections.every((section) => !section.writesAllowed),
    noAutomaticServiceStart: sections.every((section) => !section.automaticServiceStart),
    cleanupInstructionsPresent: sections
      .filter((section) => section.kind === "owner" || section.kind === "cleanup")
      .every((section) => section.cleanupRequired && section.requiredEvidence.includes("cleanup")),
    nodeJavaMiniKvTargetsCovered: ["node", "java", "miniKv"].every((owner) =>
      sections.some((section) => section.kind === "target" && section.owner === owner)),
    productionExecutionBlocked: !stageLedger.readyForProductionExecution && !stageLedger.executionAllowed,
  };
  const blockedReasonCodes = createRunbookPackageBlockedReasons(gates);
  const readyForOperatorLiveReadOnlyWindow = blockedReasonCodes.length === 0;
  const packageDigest = sha256StableJson({
    packageVersion: "Node v731",
    inputStageLedgerVersion: stageLedger.ledgerVersion,
    stageLedgerDigest: stageLedger.ledgerDigest,
    sections: sections.map((section) => [
      section.order,
      section.nodeVersion,
      section.code,
      section.kind,
      section.owner,
      section.verifiesStageCode,
    ]),
    gates,
  });

  return {
    packageVersion: "Node v731",
    inputStageLedgerVersion: "Node v711",
    packageState: readyForOperatorLiveReadOnlyWindow
      ? "ready-for-operator-live-read-only-window"
      : "blocked",
    readyForOperatorLiveReadOnlyWindow,
    readyForProductionExecution: false,
    sectionCount: sections.length,
    ownerCount: new Set(sections.map((section) => section.owner)).size,
    cleanupRequiredSectionCount: sections.filter((section) => section.cleanupRequired).length,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    sections,
    packageDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

function section(
  nodeVersion: RunbookTemplate["nodeVersion"],
  code: string,
  kind: RunbookTemplate["kind"],
  owner: RunbookTemplate["owner"],
  cleanupRequired: boolean,
  verifiesStageCode: string,
  operatorInstruction: string,
  requiredEvidence: string,
): RunbookTemplate {
  return {
    nodeVersion,
    code,
    kind,
    owner,
    cleanupRequired,
    verifiesStageCode,
    operatorInstruction,
    requiredEvidence,
  };
}

function createRunbookPackageBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageGates,
): string[] {
  return [
    gates.sourceStageLedgerReady ? null : "SOURCE_STAGE_LEDGER_NOT_READY",
    gates.sectionCountComplete ? null : "RUNBOOK_SECTION_COUNT_INCOMPLETE",
    gates.versionsSequential ? null : "RUNBOOK_VERSIONS_NOT_SEQUENTIAL",
    gates.eachSectionMapsStage ? null : "RUNBOOK_SECTION_STAGE_MAPPING_MISSING",
    gates.allSectionsReadOnly ? null : "RUNBOOK_SECTION_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "RUNBOOK_SECTION_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "RUNBOOK_AUTOMATIC_SERVICE_START_ENABLED",
    gates.cleanupInstructionsPresent ? null : "RUNBOOK_CLEANUP_INSTRUCTIONS_MISSING",
    gates.nodeJavaMiniKvTargetsCovered ? null : "RUNBOOK_TARGET_OWNERS_INCOMPLETE",
    gates.productionExecutionBlocked ? null : "RUNBOOK_PRODUCTION_EXECUTION_ENABLED",
  ].filter((reason): reason is string => reason !== null);
}
