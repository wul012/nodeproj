import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowStage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerTypes.js";

const EXPECTED_STAGE_VERSIONS = [
  "Node v692",
  "Node v693",
  "Node v694",
  "Node v695",
  "Node v696",
  "Node v697",
  "Node v698",
  "Node v699",
  "Node v700",
  "Node v701",
  "Node v702",
  "Node v703",
  "Node v704",
  "Node v705",
  "Node v706",
  "Node v707",
  "Node v708",
  "Node v709",
  "Node v710",
  "Node v711",
] as const;

type StageTemplate = Omit<ControlledReadOnlyShardPreviewLiveReadOnlyWindowStage,
  "order" | "state" | "readOnly" | "writesAllowed" | "automaticServiceStart" | "startsServices"
  | "mutatesSiblingState" | "productionExecutionAllowed">;

const STAGE_TEMPLATES: readonly StageTemplate[] = Object.freeze([
  stage("Node v692", "WINDOW_OWNER_BINDING", "process-ownership", "crossProject", true,
    "Bind explicit owners for Node, Java, and mini-kv processes before a live read-only window.",
    "Record owner, port, PID policy, and cleanup owner before opening the window."),
  stage("Node v693", "NODE_READ_TARGET_SPEC", "read-target", "node", false,
    "Node read targets are health plus controlled preview JSON and Markdown.",
    "Keep Node targets GET-only and require operator headers where the route enforces access guard."),
  stage("Node v694", "JAVA_READ_TARGET_SPEC", "read-target", "java", false,
    "Java contributes only shard-readiness and health-style GET targets.",
    "Confirm Java start/stop is owner-controlled and does not perform writes."),
  stage("Node v695", "MINI_KV_READ_TARGET_SPEC", "read-target", "miniKv", false,
    "mini-kv contributes SHARDJSON and SHARDROUTEVERIFYREPORTJSON read commands.",
    "Keep SET, DEL, EXPIRE, LOAD, RESTORE, and COMPACT outside the window."),
  stage("Node v696", "FORBIDDEN_OPERATION_POLICY", "verification", "crossProject", false,
    "The window policy rejects write routing, active shard routing, and admin commands.",
    "Fail the window if any forbidden operation appears in a target manifest."),
  stage("Node v697", "WINDOW_EVIDENCE_MANIFEST", "evidence", "crossProject", false,
    "Evidence must include request/command, read-only result, digest, and owner.",
    "Archive evidence records only after all targets have explicit read-only outcomes."),
  stage("Node v698", "PROCESS_CLEANUP_RECORD", "cleanup", "crossProject", true,
    "Every process started for the window must have a cleanup record.",
    "Record stopped=true or a concrete blocked cleanup reason before closeout."),
  stage("Node v699", "WINDOW_READINESS_VERIFICATION", "verification", "node", false,
    "Node verifies candidate digest, stage ledger shape, and safety flags.",
    "Run focused verification before opening any manual live read-only window."),
  stage("Node v700", "OPERATOR_RUNBOOK", "handoff", "crossProject", false,
    "Operator runbook lists ordered reads, headers, commands, and cleanup.",
    "Use the runbook as the manual window checklist."),
  stage("Node v701", "OPERATOR_RUNBOOK_VERIFICATION", "verification", "node", false,
    "Runbook verification checks target order and forbidden-operation coverage.",
    "Block the window if runbook and stage ledger diverge."),
  stage("Node v702", "WINDOW_ARCHIVE_SNAPSHOT", "archive", "node", false,
    "Archive snapshot records ledger digest and target sections.",
    "Keep archive snapshot non-secret and read-only."),
  stage("Node v703", "WINDOW_ARCHIVE_VERIFICATION", "verification", "node", false,
    "Archive verification recomputes the ledger digest and section counts.",
    "Fail closed if archive digest or section count drifts."),
  stage("Node v704", "WINDOW_ARCHIVE_SUMMARY", "archive", "node", false,
    "Archive summary gives a compact pass/blocker line set.",
    "Use the summary for handoff rather than duplicating full evidence."),
  stage("Node v705", "WINDOW_ARCHIVE_SUMMARY_RECEIPT", "archive", "node", false,
    "Summary receipt records digest, line count, and blocker count.",
    "Keep receipt as metadata and do not treat it as execution evidence."),
  stage("Node v706", "WINDOW_RECEIPT_ARCHIVE", "archive", "node", false,
    "Receipt archive snapshots the summary receipt for later comparison.",
    "Store only non-secret digest and count fields."),
  stage("Node v707", "WINDOW_RECEIPT_ARCHIVE_VERIFICATION", "verification", "node", false,
    "Receipt archive verification confirms digest and non-secret boundaries.",
    "Block if runtime payloads or credentials appear in archived receipt metadata."),
  stage("Node v708", "LIVE_READ_ONLY_GO_NO_GO", "handoff", "crossProject", false,
    "Go/no-go stays limited to manual live read-only execution.",
    "Require a separate approval path before any write or production execution."),
  stage("Node v709", "POST_WINDOW_EVIDENCE_SPEC", "evidence", "crossProject", false,
    "Post-window evidence must include target results and cleanup outcome.",
    "Do not call a skipped or mixed window production pass evidence."),
  stage("Node v710", "NEXT_ACTION_HANDOFF", "handoff", "crossProject", false,
    "Next action is the explicitly owned live read-only window.",
    "Hand Java and mini-kv only their owned start/stop and read-only target requirements."),
  stage("Node v711", "TWENTY_VERSION_CLOSEOUT", "closeout", "node", false,
    "Closeout confirms twenty stage records, safety gates, and digest.",
    "Proceed to live read-only execution only after the ledger remains green."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(
  verification: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger {
  const sourceReady = verification.readyForManualLiveReadOnlyWindow;
  const stageState: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStage["state"] =
    sourceReady ? "ready" : "blocked";
  const stages = STAGE_TEMPLATES.map((template, index) => ({
    ...template,
    order: index + 1,
    state: stageState,
    readOnly: true as const,
    writesAllowed: false as const,
    automaticServiceStart: false as const,
    startsServices: false as const,
    mutatesSiblingState: false as const,
    productionExecutionAllowed: false as const,
  }));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerGates = {
    sourceVerificationReady: sourceReady,
    stageCountComplete: stages.length === EXPECTED_STAGE_VERSIONS.length,
    stageVersionsSequential: stages.every((stage, index) => stage.nodeVersion === EXPECTED_STAGE_VERSIONS[index]),
    allStagesReadOnly: stages.every((stage) => stage.readOnly),
    noWritesAllowed: stages.every((stage) => !stage.writesAllowed),
    noAutomaticServiceStart: stages.every((stage) => !stage.automaticServiceStart),
    cleanupCoverageComplete: stages
      .filter((stage) => stage.category === "process-ownership" || stage.category === "cleanup")
      .every((stage) => stage.cleanupRequired),
    noProductionExecution: stages.every((stage) => !stage.productionExecutionAllowed),
  };
  const blockedReasonCodes = createStageLedgerBlockedReasons(gates);
  const readyForManualLiveReadOnlyWindow = blockedReasonCodes.length === 0;
  const ledgerDigest = sha256StableJson({
    ledgerVersion: "Node v711",
    inputCandidateVerificationVersion: verification.verificationVersion,
    candidateDigestValue: verification.candidateDigestValue,
    stages: stages.map((stage) => [
      stage.order,
      stage.nodeVersion,
      stage.code,
      stage.category,
      stage.owner,
      stage.cleanupRequired,
    ]),
    gates,
  });

  return {
    ledgerVersion: "Node v711",
    inputCandidateVerificationVersion: "Node v691",
    ledgerState: readyForManualLiveReadOnlyWindow ? "ready-for-manual-live-read-only-window" : "blocked",
    readyForManualLiveReadOnlyWindow,
    readyForProductionExecution: false,
    stageCount: stages.length,
    readyStageCount: stages.filter((stage) => stage.state === "ready").length,
    blockedStageCount: stages.filter((stage) => stage.state === "blocked").length,
    cleanupRequiredStageCount: stages.filter((stage) => stage.cleanupRequired).length,
    ownerCount: new Set(stages.map((stage) => stage.owner)).size,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    stages,
    ledgerDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

function stage(
  nodeVersion: StageTemplate["nodeVersion"],
  code: string,
  category: StageTemplate["category"],
  owner: StageTemplate["owner"],
  cleanupRequired: boolean,
  evidence: string,
  nextAction: string,
): StageTemplate {
  return {
    nodeVersion,
    code,
    category,
    owner,
    cleanupRequired,
    evidence,
    nextAction,
  };
}

function createStageLedgerBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerGates,
): string[] {
  return [
    gates.sourceVerificationReady ? null : "SOURCE_CANDIDATE_VERIFICATION_NOT_READY",
    gates.stageCountComplete ? null : "LIVE_READ_ONLY_STAGE_COUNT_INCOMPLETE",
    gates.stageVersionsSequential ? null : "LIVE_READ_ONLY_STAGE_VERSIONS_NOT_SEQUENTIAL",
    gates.allStagesReadOnly ? null : "LIVE_READ_ONLY_STAGE_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "LIVE_READ_ONLY_STAGE_WRITES_ALLOWED",
    gates.noAutomaticServiceStart ? null : "LIVE_READ_ONLY_STAGE_AUTOMATIC_START_ENABLED",
    gates.cleanupCoverageComplete ? null : "LIVE_READ_ONLY_STAGE_CLEANUP_INCOMPLETE",
    gates.noProductionExecution ? null : "LIVE_READ_ONLY_STAGE_PRODUCTION_EXECUTION_ENABLED",
  ].filter((reason): reason is string => reason !== null);
}
