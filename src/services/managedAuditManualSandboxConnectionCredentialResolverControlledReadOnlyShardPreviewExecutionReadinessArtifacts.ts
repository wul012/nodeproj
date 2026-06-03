import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewExecutionGapMatrix,
  ControlledReadOnlyShardPreviewExecutionReadinessGate,
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep,
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrix,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const ARCHIVED_CANDIDATE_SECTIONS = Object.freeze([
  "executionGapMatrix",
  "liveReadOnlyPacketCandidate",
  "liveReadOnlyPacketCandidateVerification",
]);

interface ExecutionGapMatrixInput {
  previewState: "controlled-read-only-shard-preview-ready" | "blocked";
  readyForControlledReadOnlyShardPreview: boolean;
  executionAllowed: false;
  writeRoutingAllowed: false;
  loadRestoreCompactAllowed: false;
  sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix;
}

export function createControlledReadOnlyShardPreviewExecutionGapMatrix(
  input: ExecutionGapMatrixInput,
): ControlledReadOnlyShardPreviewExecutionGapMatrix {
  const java = input.sourceMatrix.sources.find((source) => source.source === "java");
  const miniKv = input.sourceMatrix.sources.find((source) => source.source === "miniKv");
  const gates: ControlledReadOnlyShardPreviewExecutionReadinessGate[] = [
    createGate({
      code: "NODE_CONTROLLED_PREVIEW_READY",
      scope: "node",
      passed: input.readyForControlledReadOnlyShardPreview,
      evidence: `previewState=${input.previewState}`,
      nextAction: "Keep the controlled read-only shard preview route as the Node source packet.",
      blocksLiveReadOnlyPacketPlanning: true,
      blocksProductionExecution: true,
    }),
    createGate({
      code: "JAVA_CURRENT_READ_ONLY_EVIDENCE_READY",
      scope: "java",
      passed: java?.readyForPreview === true && java.readOnlySafe && java.executionBlocked,
      evidence: `status=${java?.status ?? "missing"} version=${java?.version ?? "missing"}`,
      nextAction: "Use Java shard-readiness only as a live read-only target.",
      blocksLiveReadOnlyPacketPlanning: true,
      blocksProductionExecution: true,
    }),
    createGate({
      code: "MINI_KV_CURRENT_READ_ONLY_EVIDENCE_READY",
      scope: "miniKv",
      passed: miniKv?.readyForPreview === true && miniKv.readOnlySafe && miniKv.executionBlocked,
      evidence: `status=${miniKv?.status ?? "missing"} version=${miniKv?.version ?? "missing"}`,
      nextAction: "Use mini-kv shard JSON and route verification reports only as live read-only targets.",
      blocksLiveReadOnlyPacketPlanning: true,
      blocksProductionExecution: true,
    }),
    createGate({
      code: "UPSTREAM_ACTIONS_STAY_DISABLED",
      scope: "crossProject",
      passed: !input.executionAllowed && !input.writeRoutingAllowed && !input.loadRestoreCompactAllowed,
      evidence: `executionAllowed=${input.executionAllowed} writeRoutingAllowed=${input.writeRoutingAllowed}`,
      nextAction: "Keep writes, routing activation, LOAD, RESTORE, and COMPACT disabled.",
      blocksLiveReadOnlyPacketPlanning: true,
      blocksProductionExecution: true,
    }),
    createActionRequiredGate(
      "MANUAL_RUNTIME_PROCESS_OWNERS_REQUIRED",
      "crossProject",
      "No owned Java or mini-kv runtime process window is bound to this preview.",
      "Bind explicit owners, ports, and cleanup for the next live read-only window.",
      false,
    ),
    createActionRequiredGate(
      "FRESH_LIVE_READ_ONLY_EVIDENCE_NOT_CAPTURED",
      "crossProject",
      "Current evidence proves controlled preview readiness, not a fresh live three-project window.",
      "Run the next packet against live read-only targets and archive the digest.",
      false,
    ),
    createActionRequiredGate(
      "WRITE_EXECUTION_APPROVAL_NOT_DEFINED",
      "production",
      "Write execution approval remains intentionally undefined.",
      "Define an approval ledger, allowlist, rollback switch, and kill switch before production execution.",
      true,
    ),
    createActionRequiredGate(
      "PRODUCTION_ROLLBACK_BOUNDARY_NOT_BOUND",
      "production",
      "Production rollback and restore boundaries are outside the read-only packet.",
      "Add rollback and restore evidence only after the live read-only packet passes.",
      true,
    ),
  ];
  const readyGateCount = gates.filter((gate) => gate.state === "ready").length;
  const blockedGateCount = gates.filter((gate) => gate.state === "blocked").length;
  const actionRequiredGateCount = gates.filter((gate) => gate.state === "action-required").length;
  const liveReadOnlyPacketPlanningBlockerCount = gates
    .filter((gate) => gate.blocksLiveReadOnlyPacketPlanning && gate.state === "blocked").length;
  const readyForLiveReadOnlyPacketPlanning = liveReadOnlyPacketPlanningBlockerCount === 0;

  return {
    matrixVersion: "Node v689",
    inputPreviewProfileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview.v1",
    sourceNodeVersion: "Node v688",
    matrixState: readyForLiveReadOnlyPacketPlanning ? "ready-for-live-read-only-packet-planning" : "blocked",
    readyForLiveReadOnlyPacketPlanning,
    readyForLiveReadOnlyExecution: false,
    readyForProductionExecution: false,
    gateCount: gates.length,
    readyGateCount,
    actionRequiredGateCount,
    blockedGateCount,
    liveReadOnlyPacketPlanningBlockerCount,
    productionExecutionBlockerCount: gates.filter((gate) => gate.blocksProductionExecution).length,
    gates,
    requiredParallelProjects: ["advanced-order-platform", "mini-kv"],
    nextPacketVersion: "Node v690",
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(
  matrix: ControlledReadOnlyShardPreviewExecutionGapMatrix,
): ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate {
  const processPlan = createProcessPlan();
  const readTargets = createReadTargets();
  const checks = {
    sourceGapMatrixReady: matrix.readyForLiveReadOnlyPacketPlanning,
    manualServiceOwnersPlanned: processPlan
      .filter((step) => step.action !== "stop-owned-process-after-window")
      .every((step) => step.status === "planned" && step.automatic === false),
    cleanupRequiredForEveryProcessStep: processPlan.every((step) => step.cleanupRequired),
    readTargetsComplete: readTargets.length === 6,
    readTargetsStayReadOnly: readTargets.every((target) => target.readOnly && !target.writesAllowed),
    noAutomaticServiceStart: processPlan.every((step) => !step.automatic),
    noWriteRouting: !matrix.writeRoutingAllowed,
    noProductionExecution: !matrix.readyForProductionExecution && !matrix.executionAllowed,
    candidateDigestStable: true,
  };
  const blockedReasonCodes = createPacketCandidateBlockedReasons(checks);
  const gateCount = Object.keys(checks).length;
  const candidateDigest = sha256StableJson({
    candidateVersion: "Node v690",
    inputMatrixVersion: matrix.matrixVersion,
    matrixState: matrix.matrixState,
    processPlan: processPlan.map((step) => [step.id, step.project, step.action]),
    readTargets: readTargets.map((target) => [target.id, target.project, target.protocol, target.target]),
  });
  const readyForManualLiveReadOnlyWindow = blockedReasonCodes.length === 0;

  return {
    candidateVersion: "Node v690",
    inputMatrixVersion: "Node v689",
    candidateState: readyForManualLiveReadOnlyWindow ? "ready-for-manual-live-read-only-window" : "blocked",
    readyForManualLiveReadOnlyWindow,
    readyForProductionExecution: false,
    manualServiceStartRequired: true,
    automaticServiceStart: false,
    processStepCount: processPlan.length,
    readTargetCount: readTargets.length,
    processPlan,
    readTargets,
    checks,
    gateCount,
    passedGateCount: Object.values(checks).filter(Boolean).length,
    blockedReasonCodes,
    candidateDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    nextVerificationVersion: "Node v691",
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(
  candidate: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
): ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification {
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationGates = {
    candidateReady: candidate.readyForManualLiveReadOnlyWindow,
    candidateDigestPresent: /^[a-f0-9]{64}$/.test(candidate.candidateDigest),
    processPlanHasCleanup: candidate.processPlan.every((step) => step.cleanupRequired),
    readTargetsRemainReadOnly: candidate.readTargets.every((target) => target.readOnly && !target.writesAllowed),
    noAutomaticServiceStart: !candidate.automaticServiceStart && candidate.processPlan.every((step) => !step.automatic),
    productionExecutionStillBlocked: !candidate.readyForProductionExecution && !candidate.executionAllowed,
    verificationDoesNotStartServices: true,
  };
  const gateValues = Object.values(gates);
  const blockedReasonCodes = createPacketCandidateVerificationBlockedReasons(gates);
  const readyForManualLiveReadOnlyWindow = blockedReasonCodes.length === 0;

  return {
    verificationVersion: "Node v691",
    inputCandidateVersion: "Node v690",
    verificationState: readyForManualLiveReadOnlyWindow
      ? "verified-manual-live-read-only-window-candidate"
      : "blocked",
    readyForManualLiveReadOnlyWindow,
    readyForProductionExecution: false,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    blockedReasonCodes,
    candidateDigestValue: candidate.candidateDigest,
    archivedSectionCount: ARCHIVED_CANDIDATE_SECTIONS.length,
    archivedSections: [...ARCHIVED_CANDIDATE_SECTIONS],
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    nextAction: "run-three-project-live-read-only-window-with-explicit-process-owners",
  };
}

function createGate(input: {
  code: string;
  scope: ControlledReadOnlyShardPreviewExecutionReadinessGate["scope"];
  passed: boolean;
  evidence: string;
  nextAction: string;
  blocksLiveReadOnlyPacketPlanning: boolean;
  blocksProductionExecution: boolean;
}): ControlledReadOnlyShardPreviewExecutionReadinessGate {
  return {
    code: input.code,
    scope: input.scope,
    state: input.passed ? "ready" : "blocked",
    severity: input.passed ? "info" : "blocker",
    evidence: input.evidence,
    nextAction: input.nextAction,
    blocksLiveReadOnlyPacketPlanning: input.blocksLiveReadOnlyPacketPlanning,
    blocksProductionExecution: input.blocksProductionExecution,
  };
}

function createActionRequiredGate(
  code: string,
  scope: ControlledReadOnlyShardPreviewExecutionReadinessGate["scope"],
  evidence: string,
  nextAction: string,
  blocksProductionExecution: boolean,
): ControlledReadOnlyShardPreviewExecutionReadinessGate {
  return {
    code,
    scope,
    state: "action-required",
    severity: "warning",
    evidence,
    nextAction,
    blocksLiveReadOnlyPacketPlanning: false,
    blocksProductionExecution,
  };
}

function createProcessPlan(): ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep[] {
  return [
    createProcessStep("node-smoke-owner", "orderops-node", "node", "keep-node-smoke-server-under-explicit-owner"),
    createProcessStep("java-read-only-owner", "advanced-order-platform", "java",
      "start-java-read-only-service-under-explicit-owner"),
    createProcessStep("mini-kv-read-only-owner", "mini-kv", "miniKv",
      "start-mini-kv-read-only-service-under-explicit-owner"),
    createProcessStep("owned-process-cleanup", "orderops-node", "node", "stop-owned-process-after-window"),
  ];
}

function createProcessStep(
  id: string,
  project: ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep["project"],
  owner: ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep["owner"],
  action: ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep["action"],
): ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep {
  return {
    id,
    project,
    owner,
    action,
    automatic: false,
    cleanupRequired: true,
    status: "planned",
  };
}

function createReadTargets(): ControlledReadOnlyShardPreviewLiveReadOnlyPacketTarget[] {
  return [
    createReadTarget("node-health", "orderops-node", "http-get", "GET /health", true),
    createReadTarget("node-controlled-preview-json", "orderops-node", "http-get",
      "GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview",
      true),
    createReadTarget("node-controlled-preview-markdown", "orderops-node", "http-get",
      "GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview?format=markdown",
      true),
    createReadTarget("java-shard-readiness", "advanced-order-platform", "http-get",
      "GET /api/v1/ops/shard-readiness", true),
    createReadTarget("mini-kv-shard-json", "mini-kv", "tcp-command", "SHARDJSON", false),
    createReadTarget("mini-kv-route-verify-report-json", "mini-kv", "tcp-command",
      "SHARDROUTEVERIFYREPORTJSON", false),
  ];
}

function createReadTarget(
  id: string,
  project: ControlledReadOnlyShardPreviewLiveReadOnlyPacketTarget["project"],
  protocol: ControlledReadOnlyShardPreviewLiveReadOnlyPacketTarget["protocol"],
  target: string,
  requiredOperatorHeaders: boolean,
): ControlledReadOnlyShardPreviewLiveReadOnlyPacketTarget {
  return {
    id,
    project,
    protocol,
    target,
    readOnly: true,
    writesAllowed: false,
    requiredOperatorHeaders,
  };
}

function createPacketCandidateBlockedReasons(
  checks: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate["checks"],
): string[] {
  return [
    checks.sourceGapMatrixReady ? null : "SOURCE_GAP_MATRIX_NOT_READY",
    checks.manualServiceOwnersPlanned ? null : "MANUAL_SERVICE_OWNERS_NOT_PLANNED",
    checks.cleanupRequiredForEveryProcessStep ? null : "PROCESS_CLEANUP_NOT_REQUIRED",
    checks.readTargetsComplete ? null : "READ_TARGETS_INCOMPLETE",
    checks.readTargetsStayReadOnly ? null : "READ_TARGETS_NOT_READ_ONLY",
    checks.noAutomaticServiceStart ? null : "AUTOMATIC_SERVICE_START_ENABLED",
    checks.noWriteRouting ? null : "WRITE_ROUTING_ENABLED",
    checks.noProductionExecution ? null : "PRODUCTION_EXECUTION_ENABLED",
    checks.candidateDigestStable ? null : "CANDIDATE_DIGEST_NOT_STABLE",
  ].filter((reason): reason is string => reason !== null);
}

function createPacketCandidateVerificationBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationGates,
): string[] {
  return [
    gates.candidateReady ? null : "CANDIDATE_NOT_READY",
    gates.candidateDigestPresent ? null : "CANDIDATE_DIGEST_MISSING",
    gates.processPlanHasCleanup ? null : "PROCESS_PLAN_CLEANUP_MISSING",
    gates.readTargetsRemainReadOnly ? null : "READ_TARGETS_NOT_READ_ONLY",
    gates.noAutomaticServiceStart ? null : "AUTOMATIC_SERVICE_START_ENABLED",
    gates.productionExecutionStillBlocked ? null : "PRODUCTION_EXECUTION_ENABLED",
  ].filter((reason): reason is string => reason !== null);
}
