import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep,
  ControlledReadOnlyShardPreviewSourceMatrixConsumer,
  ControlledReadOnlyShardPreviewSourceMatrixDriftSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

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
  const stepSafetySummary = {
    routingActivationAllowedStepCount: planStepRecords.filter((step) => step.routingActivationAllowed).length,
    writesAllowedStepCount: planStepRecords.filter((step) => step.writesAllowed).length,
  };
  const riskSummary = createConsumptionPlanRiskSummary(
    stepStatusSummary,
    stepSafetySummary,
    driftSummary.blockingFindingCount,
  );
  const promotionHold = createConsumptionPlanPromotionHold(riskSummary);

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
    stepSafetySummary,
    riskSummary,
    promotionHold,
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
        stepSafetySummary,
        riskSummary,
        promotionHold,
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

function createConsumptionPlanRiskSummary(
  stepStatusSummary: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan["stepStatusSummary"],
  stepSafetySummary: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan["stepSafetySummary"],
  blockingFindingCount: number,
): ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan["riskSummary"] {
  const unsafeStepCount =
    stepSafetySummary.routingActivationAllowedStepCount + stepSafetySummary.writesAllowedStepCount;
  const riskReasonCodes = [
    stepStatusSummary.blockedStepCount > 0 ? "PLAN_HAS_BLOCKED_STEPS" : null,
    stepStatusSummary.reviewStepCount > 0 ? "PLAN_HAS_REVIEW_STEPS" : null,
    unsafeStepCount > 0 ? "PLAN_HAS_UNSAFE_STEPS" : null,
    blockingFindingCount > 0 ? "PLAN_HAS_BLOCKING_FINDINGS" : null,
  ].filter((reason): reason is string => reason !== null);
  const riskLevel = unsafeStepCount > 0
    ? "unsafe"
    : stepStatusSummary.blockedStepCount > 0 || blockingFindingCount > 0
      ? "blocked"
      : stepStatusSummary.reviewStepCount > 0
        ? "review"
        : "none";

  return {
    riskLevel,
    reviewRequired: stepStatusSummary.reviewStepCount > 0,
    blocked: riskLevel === "blocked" || riskLevel === "unsafe",
    unsafeStepCount,
    riskReasonCodes,
  };
}

function createConsumptionPlanPromotionHold(
  riskSummary: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan["riskSummary"],
): ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan["promotionHold"] {
  const holdState = riskSummary.blocked
    ? "repair-required"
    : riskSummary.reviewRequired
      ? "read-only-review-required"
      : "none";
  const nextAllowedAction = riskSummary.blocked
    ? "repair-plan-risk"
    : riskSummary.reviewRequired
      ? "review-read-only-risk"
      : "consume-read-only-plan";
  const closureCriteria = createPromotionHoldClosureCriteria(holdState, riskSummary.riskReasonCodes);

  return {
    holdState,
    nextAllowedAction,
    reasonCodes: riskSummary.riskReasonCodes,
    routingPromotionAllowed: false,
    writePromotionAllowed: false,
    serviceStartupAllowed: false,
    closureCriteria,
    closureCriterionCount: closureCriteria.length,
  };
}

function createPromotionHoldClosureCriteria(
  holdState: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan["promotionHold"]["holdState"],
  reasonCodes: readonly string[],
): string[] {
  if (holdState === "repair-required") {
    return [
      `repairRiskReasons=${reasonCodes.join("|") || "none"}`,
      "confirmRoutingPromotionAllowed=false",
      "confirmWritePromotionAllowed=false",
      "confirmServiceStartupAllowed=false",
    ];
  }

  if (holdState === "read-only-review-required") {
    return [
      `reviewRiskReasons=${reasonCodes.join("|") || "none"}`,
      "confirmReadOnlyPlanConsumptionOnly=true",
      "confirmRoutingPromotionAllowed=false",
      "confirmWritePromotionAllowed=false",
      "confirmServiceStartupAllowed=false",
    ];
  }

  return [
    "confirmReadOnlyPlanConsumptionOnly=true",
    "confirmRoutingPromotionAllowed=false",
    "confirmWritePromotionAllowed=false",
    "confirmServiceStartupAllowed=false",
  ];
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

