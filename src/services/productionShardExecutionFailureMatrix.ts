import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionCandidateContract } from "./productionShardExecutionCandidateContract.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-failure-matrix";

const FAILURE_MATRIX = [
  {
    class: "pre-window-evidence-missing",
    abortOwner: "node",
    rollbackAction: "none",
    archiveRequired: true,
  },
  {
    class: "operator-approval-mismatch",
    abortOwner: "operator",
    rollbackAction: "none",
    archiveRequired: true,
  },
  {
    class: "java-read-probe-failed",
    abortOwner: "java",
    rollbackAction: "stop-owned-read-only-window",
    archiveRequired: true,
  },
  {
    class: "mini-kv-read-probe-failed",
    abortOwner: "mini-kv",
    rollbackAction: "stop-owned-read-only-window",
    archiveRequired: true,
  },
  {
    class: "cleanup-proof-missing",
    abortOwner: "cross-project",
    rollbackAction: "keep-execution-denied-until-cleanup-proof",
    archiveRequired: true,
  },
] as const;

export function loadProductionShardExecutionFailureMatrix(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionCandidateContract(input);
  const sources = [profileSource("node-v2079-candidate-contract", source, "Disabled shard execution candidate contract")];
  const controls = [
    satisfiedControl({
      id: "failure-classes-cover-candidate-phases",
      title: "Failure classes cover candidate phases",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: FAILURE_MATRIX.map((item) => item.class).join(","),
      nextAction: "Use these classes as the v2081 worksheet stop conditions.",
    }),
    satisfiedControl({
      id: "archive-required-for-every-failure",
      title: "Every failure class requires archive evidence",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "archiveRequired=true for every matrix row",
      nextAction: "Do not let an operator close the window without an outcome archive.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2079Ready: source.readyForNextStage,
    sourceV2079DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveFailureClassesNamed: FAILURE_MATRIX.length === 5,
    nodeFailureClassPresent: FAILURE_MATRIX.some((item) => item.abortOwner === "node"),
    operatorFailureClassPresent: FAILURE_MATRIX.some((item) => item.abortOwner === "operator"),
    javaFailureClassPresent: FAILURE_MATRIX.some((item) => item.abortOwner === "java"),
    miniKvFailureClassPresent: FAILURE_MATRIX.some((item) => item.abortOwner === "mini-kv"),
    crossProjectCleanupFailurePresent: FAILURE_MATRIX.some((item) => item.abortOwner === "cross-project"),
    everyFailureRequiresArchive: FAILURE_MATRIX.every((item) => item.archiveRequired),
    noFailureClassAllowsWriteRollback: FAILURE_MATRIX.every((item) => !item.rollbackAction.includes("write")),
    cleanupFailureKeepsExecutionDenied:
      FAILURE_MATRIX.some((item) => item.class === "cleanup-proof-missing"
        && item.rollbackAction === "keep-execution-denied-until-cleanup-proof"),
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution failure, abort, and rollback matrix",
    profileVersion: "production-shard-execution-failure-matrix.v1",
    stageId: "failure-matrix",
    activeNodeVersion: "Node v2080",
    sourceNodeVersion: "Node v2079",
    readyState: "failure-matrix-ready",
    readyDecision: "accept-failure-abort-rollback-matrix",
    sources,
    controls,
    stagePayload: {
      failureMatrix: FAILURE_MATRIX,
      invariant: "Any failed row archives evidence and leaves production execution disabled.",
      growthStopCondition:
        "Add a new failure class only when a new candidate phase or upstream runtime behavior appears.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2080-production-shard-execution-failure-matrix-roadmap.md",
      "docs/plans3/v2081-production-shard-execution-operator-window-worksheet-roadmap.md",
    ),
    nextActions: [
      "Use v2080 as the stop-condition source for the v2081 operator window worksheet.",
      "Keep failure handling archive-first and write-free.",
      "Require Java and mini-kv owner acknowledgement only for the rows they own.",
    ],
    warnings: [
      {
        code: "FAILURE_MATRIX_HAS_NO_PRODUCTION_AUTHORITY",
        severity: "warning",
        source: "node-v2080",
        message: "The matrix explains how to stop safely; it does not authorize production execution.",
      },
    ],
    recommendations: [
      {
        code: "BUILD_OPERATOR_WORKSHEET_NEXT",
        severity: "recommendation",
        source: "node-v2080",
        message: "Turn the failure matrix into a concrete operator window worksheet with ordered evidence checkpoints.",
      },
    ],
  });
}

export { renderProductionShardExecutionReadinessMarkdown as renderProductionShardExecutionFailureMatrixMarkdown };
