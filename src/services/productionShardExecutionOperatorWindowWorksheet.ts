import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionFailureMatrix } from "./productionShardExecutionFailureMatrix.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-operator-window-worksheet";

const WORKSHEET_STEPS = [
  {
    order: 1,
    checkpoint: "lock-v2078-v2080-digests",
    owner: "node",
    requiredEvidence: "v2078, v2079, and v2080 readiness digests are recorded before window discussion.",
  },
  {
    order: 2,
    checkpoint: "confirm-signed-approval-placeholder",
    owner: "operator",
    requiredEvidence: "operator confirms that production execution remains blocked without a signed artifact.",
  },
  {
    order: 3,
    checkpoint: "confirm-java-mini-kv-owner-lifecycle",
    owner: "cross-project",
    requiredEvidence: "Java and mini-kv owners remain responsible for starting and stopping their own services.",
  },
  {
    order: 4,
    checkpoint: "record-read-only-probe-outcome",
    owner: "node",
    requiredEvidence: "read-only probe outcome is archived with no write or migration commands.",
  },
  {
    order: 5,
    checkpoint: "record-cleanup-proof",
    owner: "cross-project",
    requiredEvidence: "owned-process cleanup proof or explicit no-start proof is archived.",
  },
] as const;

export function loadProductionShardExecutionOperatorWindowWorksheet(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionFailureMatrix(input);
  const sources = [profileSource("node-v2080-failure-matrix", source, "Failure, abort, and rollback matrix")];
  const controls = [
    satisfiedControl({
      id: "worksheet-has-ordered-checkpoints",
      title: "Operator worksheet has ordered checkpoints",
      owner: "operator",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: WORKSHEET_STEPS.map((step) => `${step.order}:${step.checkpoint}`).join(","),
      nextAction: "Use this worksheet as the source for v2082 candidate archive verification.",
    }),
    satisfiedControl({
      id: "worksheet-preserves-service-owner-boundary",
      title: "Worksheet preserves Java and mini-kv lifecycle ownership",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "confirm-java-mini-kv-owner-lifecycle",
      nextAction: "Do not let Node-owned routes start or stop sibling runtimes.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2080Ready: source.readyForNextStage,
    sourceV2080DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveWorksheetStepsPresent: WORKSHEET_STEPS.length === 5,
    worksheetStepsOrdered: WORKSHEET_STEPS.every((step, index) => step.order === index + 1),
    digestLockStepFirst: WORKSHEET_STEPS[0]?.checkpoint === "lock-v2078-v2080-digests",
    signedApprovalBlockerStepPresent: WORKSHEET_STEPS.some((step) =>
      step.checkpoint === "confirm-signed-approval-placeholder"),
    serviceOwnerLifecycleStepPresent: WORKSHEET_STEPS.some((step) =>
      step.checkpoint === "confirm-java-mini-kv-owner-lifecycle"),
    readOnlyOutcomeArchiveStepPresent: WORKSHEET_STEPS.some((step) =>
      step.checkpoint === "record-read-only-probe-outcome"),
    cleanupProofStepPresent: WORKSHEET_STEPS.some((step) => step.checkpoint === "record-cleanup-proof"),
    noWorksheetStepAuthorizesWrites: WORKSHEET_STEPS.every((step) =>
      !step.requiredEvidence.toLowerCase().includes("write commands allowed")),
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution operator window worksheet",
    profileVersion: "production-shard-execution-operator-window-worksheet.v1",
    stageId: "operator-window-worksheet",
    activeNodeVersion: "Node v2081",
    sourceNodeVersion: "Node v2080",
    readyState: "operator-window-worksheet-ready",
    readyDecision: "accept-operator-window-worksheet",
    sources,
    controls,
    stagePayload: {
      worksheetSteps: WORKSHEET_STEPS,
      operatorRule: "The worksheet may prepare an execution conversation; it cannot open a production window.",
      growthStopCondition:
        "Do not add more worksheet steps unless a later control adds a new source digest or cleanup artifact.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2081-production-shard-execution-operator-window-worksheet-roadmap.md",
      "docs/plans3/v2082-production-shard-execution-candidate-archive-verification-roadmap.md",
    ),
    nextActions: [
      "Use v2081 as the human-readable operator sequence for the v2082 archive verification packet.",
      "Keep the approval placeholder visible so a worksheet cannot be confused with authorization.",
      "Archive either cleanup proof or explicit no-start proof before closing any candidate rehearsal.",
    ],
    warnings: [
      {
        code: "WORKSHEET_IS_NOT_WINDOW_OPEN",
        severity: "warning",
        source: "node-v2081",
        message: "v2081 orders the evidence conversation but still cannot open a production execution window.",
      },
    ],
    recommendations: [
      {
        code: "VERIFY_CANDIDATE_ARCHIVE_NEXT",
        severity: "recommendation",
        source: "node-v2081",
        message: "Verify v2078-v2081 candidate artifacts together before any new feature work.",
      },
    ],
  });
}

export { renderProductionShardExecutionReadinessMarkdown as renderProductionShardExecutionOperatorWindowWorksheetMarkdown };
