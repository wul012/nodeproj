import type {
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function formatPlanStepRecordSummary(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return sourceMatrixConsumptionPlan.planStepRecords
    .map((step) => `${step.code}:${step.status}`)
    .join(", ") || "none";
}

export function formatPlanSafetySummary(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return [
    `routingActivationAllowedSteps=${sourceMatrixConsumptionPlan.stepSafetySummary.routingActivationAllowedStepCount}`,
    `writesAllowedSteps=${sourceMatrixConsumptionPlan.stepSafetySummary.writesAllowedStepCount}`,
  ].join(", ");
}

export function formatPlanRiskSummary(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return [
    `level=${sourceMatrixConsumptionPlan.riskSummary.riskLevel}`,
    `reviewRequired=${sourceMatrixConsumptionPlan.riskSummary.reviewRequired}`,
    `blocked=${sourceMatrixConsumptionPlan.riskSummary.blocked}`,
    `unsafeSteps=${sourceMatrixConsumptionPlan.riskSummary.unsafeStepCount}`,
    `reasons=${sourceMatrixConsumptionPlan.riskSummary.riskReasonCodes.join("|") || "none"}`,
  ].join(", ");
}

export function formatPlanPromotionHold(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return [
    `state=${sourceMatrixConsumptionPlan.promotionHold.holdState}`,
    `nextAllowedAction=${sourceMatrixConsumptionPlan.promotionHold.nextAllowedAction}`,
    `routingPromotionAllowed=${sourceMatrixConsumptionPlan.promotionHold.routingPromotionAllowed}`,
    `writePromotionAllowed=${sourceMatrixConsumptionPlan.promotionHold.writePromotionAllowed}`,
    `serviceStartupAllowed=${sourceMatrixConsumptionPlan.promotionHold.serviceStartupAllowed}`,
    `closureCriterionCount=${sourceMatrixConsumptionPlan.promotionHold.closureCriterionCount}`,
    `reasons=${sourceMatrixConsumptionPlan.promotionHold.reasonCodes.join("|") || "none"}`,
  ].join(", ");
}

export function formatReadOnlyReviewScope(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return [
    `state=${sourceMatrixConsumptionPlan.readOnlyReviewScope.scopeState}`,
    `allowed=${sourceMatrixConsumptionPlan.readOnlyReviewScope.allowedOperations.join("|") || "none"}`,
    `forbidden=${sourceMatrixConsumptionPlan.readOnlyReviewScope.forbiddenOperations.join("|") || "none"}`,
    `digestScope=${sourceMatrixConsumptionPlan.readOnlyReviewScope.scopeDigest.scope}`,
    `coveredAllowed=${sourceMatrixConsumptionPlan.readOnlyReviewScope.scopeDigest.coveredAllowedOperationCount}`,
    `coveredForbidden=${sourceMatrixConsumptionPlan.readOnlyReviewScope.scopeDigest.coveredForbiddenOperationCount}`,
  ].join(", ");
}
