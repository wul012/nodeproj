import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewSource,
  ControlledReadOnlyShardPreviewSourceMatrix,
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep,
  ControlledReadOnlyShardPreviewSourceMatrixConsumer,
  ControlledReadOnlyShardPreviewSourceMatrixDriftFinding,
  ControlledReadOnlyShardPreviewSourceMatrixDriftSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const REQUIRED_MATRIX_SOURCES: readonly ControlledReadOnlyShardPreviewSource[] = Object.freeze(["java", "miniKv"]);

export function createSourceMatrixConsumer(
  sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix,
): ControlledReadOnlyShardPreviewSourceMatrixConsumer {
  const observedSources = uniqueSources(sourceMatrix.sources.map((source) => source.source));
  const missingSources = REQUIRED_MATRIX_SOURCES.filter((source) => !observedSources.includes(source));
  const gates = {
    observedRequiredSources: missingSources.length === 0 && observedSources.length === REQUIRED_MATRIX_SOURCES.length,
    allSourcesReady: sourceMatrix.allSourcesReady,
    shardCountsComparable: sourceMatrix.shardCountsComparable,
    slotCountsComparable: sourceMatrix.slotCountsComparable,
    routingModesDeclared: sourceMatrix.routingModes.length > 0,
    readOnlyConsumerOnly: true as const,
  };
  const gateValues = Object.values(gates);
  const readyForControlledReadOnlyConsumption = gateValues.every(Boolean);

  return {
    consumerVersion: "Node v599",
    inputSourceVersion: "Node v598",
    decision: readyForControlledReadOnlyConsumption ? "ready-for-controlled-read-only-consumption" : "blocked",
    readyForControlledReadOnlyConsumption,
    requiredSources: [...REQUIRED_MATRIX_SOURCES],
    observedSources,
    missingSources,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    comparison: {
      routingModes: sourceMatrix.routingModes,
      routingModeCount: sourceMatrix.routingModes.length,
      javaShardCount: sourceMatrix.sources.find((source) => source.source === "java")?.shardCount ?? null,
      miniKvShardCount: sourceMatrix.sources.find((source) => source.source === "miniKv")?.shardCount ?? null,
      shardCountDelta: sourceMatrix.shardCountDelta,
      javaSlotCount: sourceMatrix.sources.find((source) => source.source === "java")?.slotCount ?? null,
      miniKvSlotCount: sourceMatrix.sources.find((source) => source.source === "miniKv")?.slotCount ?? null,
      slotCountDelta: sourceMatrix.slotCountDelta,
    },
    blockedReasonCodes: createSourceMatrixConsumerBlockedReasons(gates),
    activatesRouting: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixDriftSummary(
  sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix,
  sourceMatrixConsumer: ControlledReadOnlyShardPreviewSourceMatrixConsumer,
): ControlledReadOnlyShardPreviewSourceMatrixDriftSummary {
  const java = sourceMatrix.sources.find((source) => source.source === "java") ?? null;
  const miniKv = sourceMatrix.sources.find((source) => source.source === "miniKv") ?? null;
  const findings: ControlledReadOnlyShardPreviewSourceMatrixDriftFinding[] = [
    createComparableDriftFinding("routingMode", java?.routingMode ?? null, miniKv?.routingMode ?? null,
      "Routing modes differ across read-only shard readiness sources."),
    createComparableDriftFinding("shardCount", java?.shardCount ?? null, miniKv?.shardCount ?? null,
      "Shard counts differ across read-only shard readiness sources."),
    createComparableDriftFinding("slotCount", java?.slotCount ?? null, miniKv?.slotCount ?? null,
      "Slot counts differ across read-only shard readiness sources."),
  ];

  if (!sourceMatrixConsumer.readyForControlledReadOnlyConsumption) {
    findings.unshift({
      dimension: "consumerReadiness",
      status: "blocked",
      severity: "blocker",
      javaValue: null,
      miniKvValue: null,
      message: `Source matrix consumer is blocked: ${sourceMatrixConsumer.blockedReasonCodes.join(", ") || "unknown"}.`,
    });
  }

  const driftFindingCount = findings.filter((finding) => finding.status === "drift-detected").length;
  const blockingFindingCount = findings.filter((finding) => finding.severity === "blocker").length;
  const readyForControlledDriftReview =
    sourceMatrixConsumer.readyForControlledReadOnlyConsumption && blockingFindingCount === 0;

  return {
    summaryVersion: "Node v600",
    inputConsumerVersion: "Node v599",
    driftState: readyForControlledDriftReview
      ? driftFindingCount > 0 ? "controlled-drift-detected" : "aligned"
      : "blocked",
    readyForControlledDriftReview,
    findingCount: findings.length,
    driftFindingCount,
    blockingFindingCount,
    comparableFindingCount: findings.filter((finding) =>
      finding.status === "aligned" || finding.status === "drift-detected").length,
    findings,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixConsumptionPlan(
  sourceMatrixConsumer: ControlledReadOnlyShardPreviewSourceMatrixConsumer,
  driftSummary: ControlledReadOnlyShardPreviewSourceMatrixDriftSummary,
): ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan {
  const readyForReadOnlyConsumptionPlan =
    sourceMatrixConsumer.readyForControlledReadOnlyConsumption
    && driftSummary.readyForControlledDriftReview
    && driftSummary.blockingFindingCount === 0;
  const planStepRecords: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep[] = readyForReadOnlyConsumptionPlan
    ? [
      createConsumptionPlanStepRecord(1, "observe-sources", "ready",
        `observeSources=${sourceMatrixConsumer.observedSources.join("|") || "none"}`),
      createConsumptionPlanStepRecord(2, "compare-routing-modes", "ready",
        `compareRoutingModes=${sourceMatrixConsumer.comparison.routingModes.join("|") || "none"}`),
      createConsumptionPlanStepRecord(3, "review-drift-findings",
        driftSummary.driftFindingCount > 0 ? "needs-review" : "ready",
        `reviewDriftFindings=${driftSummary.driftFindingCount}`),
      createConsumptionPlanStepRecord(4, "keep-routing-disabled", "ready", "keepRoutingActivation=false"),
    ]
    : [
      createConsumptionPlanStepRecord(1, "repair-blocked-reasons", "blocked",
        `blockedReasons=${sourceMatrixConsumer.blockedReasonCodes.join("|") || "none"}`),
      createConsumptionPlanStepRecord(2, "review-blocking-findings", "blocked",
        `blockingFindings=${driftSummary.blockingFindingCount}`),
      createConsumptionPlanStepRecord(3, "keep-routing-disabled", "ready", "keepRoutingActivation=false"),
    ];
  const planSteps = planStepRecords.map((step) => step.evidence);
  const stepStatusSummary = {
    readyStepCount: planStepRecords.filter((step) => step.status === "ready").length,
    reviewStepCount: planStepRecords.filter((step) => step.status === "needs-review").length,
    blockedStepCount: planStepRecords.filter((step) => step.status === "blocked").length,
  };

  return {
    planVersion: "Node v638",
    inputConsumerVersion: "Node v599",
    inputDriftSummaryVersion: "Node v600",
    planState: readyForReadOnlyConsumptionPlan ? "ready-for-read-only-consumption-plan" : "blocked",
    readyForReadOnlyConsumptionPlan,
    reviewMode: "read-only-drift-review",
    observedSources: sourceMatrixConsumer.observedSources,
    missingSources: sourceMatrixConsumer.missingSources,
    routingModes: sourceMatrixConsumer.comparison.routingModes,
    blockedReasonCodes: sourceMatrixConsumer.blockedReasonCodes,
    driftFindingCount: driftSummary.driftFindingCount,
    blockingFindingCount: driftSummary.blockingFindingCount,
    planSteps,
    planStepCount: planSteps.length,
    planStepRecords,
    planStepRecordCount: planStepRecords.length,
    stepStatusSummary,
    planDigest: {
      algorithm: "sha256",
      scope: "source-matrix-consumption-plan",
      value: sha256StableJson({
        planVersion: "Node v638",
        inputConsumerVersion: "Node v599",
        inputDriftSummaryVersion: "Node v600",
        planState: readyForReadOnlyConsumptionPlan ? "ready-for-read-only-consumption-plan" : "blocked",
        planSteps,
        planStepRecords,
        stepStatusSummary,
      }),
      coveredStepCount: planSteps.length,
    },
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

function createConsumptionPlanStepRecord(
  order: number,
  code: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep["code"],
  status: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep["status"],
  evidence: string,
): ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep {
  return {
    order,
    code,
    status,
    evidence,
    routingActivationAllowed: false,
    writesAllowed: false,
  };
}

function createSourceMatrixConsumerBlockedReasons(
  gates: ControlledReadOnlyShardPreviewSourceMatrixConsumer["gates"],
): string[] {
  return [
    gates.observedRequiredSources ? null : "MISSING_REQUIRED_SOURCE",
    gates.allSourcesReady ? null : "SOURCE_NOT_READY",
    gates.shardCountsComparable ? null : "SHARD_COUNTS_NOT_COMPARABLE",
    gates.slotCountsComparable ? null : "SLOT_COUNTS_NOT_COMPARABLE",
    gates.routingModesDeclared ? null : "ROUTING_MODE_NOT_DECLARED",
  ].filter((reason): reason is string => reason !== null);
}

function createComparableDriftFinding(
  dimension: Exclude<ControlledReadOnlyShardPreviewSourceMatrixDriftFinding["dimension"], "consumerReadiness">,
  javaValue: string | number | null,
  miniKvValue: string | number | null,
  driftMessage: string,
): ControlledReadOnlyShardPreviewSourceMatrixDriftFinding {
  if (javaValue === null || miniKvValue === null) {
    return {
      dimension,
      status: "not-comparable",
      severity: "blocker",
      javaValue,
      miniKvValue,
      message: "Source values are not both present, so controlled drift review is blocked.",
    };
  }

  if (javaValue === miniKvValue) {
    return {
      dimension,
      status: "aligned",
      severity: "info",
      javaValue,
      miniKvValue,
      message: "Source values are aligned.",
    };
  }

  return {
    dimension,
    status: "drift-detected",
    severity: "warning",
    javaValue,
    miniKvValue,
    message: driftMessage,
  };
}

function uniqueSources(
  sources: ControlledReadOnlyShardPreviewSource[],
): ControlledReadOnlyShardPreviewSource[] {
  return REQUIRED_MATRIX_SOURCES.filter((source) => sources.includes(source));
}
