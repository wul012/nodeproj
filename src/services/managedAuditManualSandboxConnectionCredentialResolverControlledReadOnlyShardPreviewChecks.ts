import type { AppConfig } from "../config.js";
import type {
  ControlledReadOnlyShardPreviewChecks,
  ControlledReadOnlyShardPreviewMessage,
  ControlledReadOnlyShardPreviewObservation,
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
  PreviewMessageSource,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function createChecks(
  config: AppConfig,
  java: ControlledReadOnlyShardPreviewObservation,
  miniKv: ControlledReadOnlyShardPreviewObservation,
  previewDigest: string,
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): ControlledReadOnlyShardPreviewChecks {
  return {
    upstreamProbesEnabledForPreview: config.upstreamProbesEnabled,
    upstreamActionsDisabled: !config.upstreamActionsEnabled,
    javaPreviewAttempted: java.attempted,
    javaPreviewPassed: java.status === "passed-read",
    javaReadOnlySafe: java.readOnlySafe,
    javaExecutionBlocked: java.executionBlocked,
    miniKvPreviewAttempted: miniKv.attempted,
    miniKvPreviewPassed: miniKv.status === "passed-read",
    miniKvReadOnlySafe: miniKv.readOnlySafe,
    miniKvExecutionBlocked: miniKv.executionBlocked,
    miniKvBoundarySafe: miniKv.boundarySafe,
    bothPreviewsReady: java.readyForPreview && miniKv.readyForPreview,
    nodeDoesNotStartUpstreams: true,
    nodeDoesNotStopUpstreams: true,
    nodeDoesNotMutateSiblingState: true,
    noActiveShardRouter: true,
    noWriteRouting: true,
    noLoadRestoreCompact: true,
    noManagedAuditConnection: !config.upstreamActionsEnabled,
    noCredentialValueRead: true,
    previewDigestStable: /^[a-f0-9]{64}$/.test(previewDigest),
    sourceMatrixConsumptionPlanReady: sourceMatrixConsumptionPlan.readyForReadOnlyConsumptionPlan,
    sourceMatrixConsumptionPlanHasNoBlockedSteps:
      sourceMatrixConsumptionPlan.stepStatusSummary.blockedStepCount === 0,
    sourceMatrixConsumptionPlanHasNoUnsafeSteps:
      sourceMatrixConsumptionPlan.stepSafetySummary.routingActivationAllowedStepCount === 0
      && sourceMatrixConsumptionPlan.stepSafetySummary.writesAllowedStepCount === 0,
    sourceMatrixConsumptionPlanRiskAccepted:
      !sourceMatrixConsumptionPlan.riskSummary.blocked
      && sourceMatrixConsumptionPlan.riskSummary.riskLevel !== "unsafe",
    sourceMatrixConsumptionPlanPromotionHoldSafe:
      sourceMatrixConsumptionPlan.promotionHold.routingPromotionAllowed === false
      && sourceMatrixConsumptionPlan.promotionHold.writePromotionAllowed === false
      && sourceMatrixConsumptionPlan.promotionHold.serviceStartupAllowed === false,
    sourceMatrixConsumptionPlanPromotionHoldClosureReady:
      sourceMatrixConsumptionPlan.promotionHold.closureCriterionCount
        === sourceMatrixConsumptionPlan.promotionHold.closureCriteria.length
      && sourceMatrixConsumptionPlan.promotionHold.closureCriteria.length > 0
      && sourceMatrixConsumptionPlan.promotionHold.closureCriteria.includes("confirmRoutingPromotionAllowed=false")
      && sourceMatrixConsumptionPlan.promotionHold.closureCriteria.includes("confirmWritePromotionAllowed=false")
      && sourceMatrixConsumptionPlan.promotionHold.closureCriteria.includes("confirmServiceStartupAllowed=false"),
    productionWindowStillBlocked: true,
    readyForControlledReadOnlyShardPreview: false,
  };
}

export function collectProductionBlockers(
  checks: ControlledReadOnlyShardPreviewChecks,
): ControlledReadOnlyShardPreviewMessage[] {
  const rules: Array<[boolean, string, PreviewMessageSource, string]> = [
    [checks.upstreamProbesEnabledForPreview, "UPSTREAM_PROBES_DISABLED", "runtime-boundary", "Enable only the read-only probe flag for this preview window."],
    [checks.upstreamActionsDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-boundary", "UPSTREAM_ACTIONS_ENABLED must stay false for shard preview."],
    [checks.javaPreviewAttempted, "JAVA_PREVIEW_NOT_ATTEMPTED", "java-shard-preview", "Java shard readiness must be read through GET only."],
    [checks.javaPreviewPassed, "JAVA_PREVIEW_FAILED", "java-shard-preview", "Java shard readiness preview must pass read-only checks."],
    [checks.miniKvPreviewAttempted, "MINI_KV_PREVIEW_NOT_ATTEMPTED", "mini-kv-shard-preview", "mini-kv SHARDJSON must be read exactly once."],
    [checks.miniKvPreviewPassed, "MINI_KV_PREVIEW_FAILED", "mini-kv-shard-preview", "mini-kv SHARDJSON preview must pass read-only checks."],
    [checks.miniKvBoundarySafe, "MINI_KV_BOUNDARY_UNSAFE", "mini-kv-shard-preview", "mini-kv must keep write/admin/load/restore/compact boundaries closed."],
    [checks.sourceMatrixConsumptionPlanReady, "SOURCE_MATRIX_CONSUMPTION_PLAN_BLOCKED", "next-plan", "Source matrix consumption plan must be ready before preview can be consumed."],
    [checks.sourceMatrixConsumptionPlanHasNoBlockedSteps, "SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_BLOCKED_STEPS", "next-plan", "Source matrix consumption plan must not contain blocked steps."],
    [checks.sourceMatrixConsumptionPlanHasNoUnsafeSteps, "SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_UNSAFE_STEPS", "next-plan", "Source matrix consumption plan must not allow routing activation or writes."],
    [checks.sourceMatrixConsumptionPlanRiskAccepted, "SOURCE_MATRIX_CONSUMPTION_PLAN_RISK_BLOCKED", "next-plan", "Source matrix consumption plan risk summary must not be blocked or unsafe."],
    [checks.sourceMatrixConsumptionPlanPromotionHoldSafe, "SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_UNSAFE", "next-plan", "Source matrix consumption plan promotion hold must deny routing promotion, writes, and service startup."],
    [checks.sourceMatrixConsumptionPlanPromotionHoldClosureReady, "SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_CLOSURE_NOT_READY", "next-plan", "Source matrix consumption plan promotion hold closure criteria must be complete."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

export function collectWarnings(
  java: ControlledReadOnlyShardPreviewObservation,
  miniKv: ControlledReadOnlyShardPreviewObservation,
): ControlledReadOnlyShardPreviewMessage[] {
  if (java.preview.shardEnabled === false && miniKv.preview.shardEnabled === false) {
    return [{
      code: "PREVIEW_CONFIRMS_READINESS_NOT_ACTIVE_ROUTING",
      severity: "warning",
      source: "runtime-boundary",
      message: "Both sources are read-only readiness previews; this is still not active shard routing.",
    }];
  }
  return [];
}

export function collectRecommendations(
  ready: boolean,
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): ControlledReadOnlyShardPreviewMessage[] {
  const blockedReasons = sourceMatrixConsumptionPlan.blockedReasonCodes.join(", ") || "none";
  const stepRecordSummary = formatPlanStepRecordSummary(sourceMatrixConsumptionPlan);
  const safetySummary = formatPlanSafetySummary(sourceMatrixConsumptionPlan);
  const riskSummary = formatPlanRiskSummary(sourceMatrixConsumptionPlan);
  const promotionHold = formatPlanPromotionHold(sourceMatrixConsumptionPlan);
  return [{
    code: ready ? "CONSUME_SOURCE_MATRIX_PLAN_READ_ONLY" : "REPAIR_SOURCE_MATRIX_CONSUMPTION_PLAN",
    severity: "recommendation",
    source: "next-plan",
    message: ready
      ? `Consume the ${sourceMatrixConsumptionPlan.planStepRecordCount} source matrix plan step records (${stepRecordSummary}) while routing remains disabled; safety ${safetySummary}; risk ${riskSummary}; promotionHold ${promotionHold}.`
      : `Repair the source matrix consumption plan before consumption; blocked reasons: ${blockedReasons}; safety ${safetySummary}; risk ${riskSummary}; promotionHold ${promotionHold}.`,
  }];
}

export function createNextActions(
  ready: boolean,
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string[] {
  if (ready) {
    return [
      `Consume sourceMatrixConsumptionPlan.planStepRecords (${formatPlanStepRecordSummary(sourceMatrixConsumptionPlan)}) without routing activation.`,
      `Preserve sourceMatrixConsumptionPlan.stepSafetySummary (${formatPlanSafetySummary(sourceMatrixConsumptionPlan)}) before any follow-up review.`,
      `Review sourceMatrixConsumptionPlan.riskSummary (${formatPlanRiskSummary(sourceMatrixConsumptionPlan)}) before promoting beyond read-only preview.`,
      `Keep sourceMatrixConsumptionPlan.promotionHold (${formatPlanPromotionHold(sourceMatrixConsumptionPlan)}) active until read-only review closes.`,
      "Keep Java and mini-kv as independently started services; Node still only reads their readiness surfaces.",
    ];
  }

  return [
    `Repair sourceMatrixConsumptionPlan before consumption; blocked reasons: ${sourceMatrixConsumptionPlan.blockedReasonCodes.join(", ") || "none"}.`,
    `Preserve sourceMatrixConsumptionPlan.stepSafetySummary (${formatPlanSafetySummary(sourceMatrixConsumptionPlan)}) while repairing the plan.`,
    `Resolve sourceMatrixConsumptionPlan.riskSummary (${formatPlanRiskSummary(sourceMatrixConsumptionPlan)}) before consumption.`,
    `Keep sourceMatrixConsumptionPlan.promotionHold (${formatPlanPromotionHold(sourceMatrixConsumptionPlan)}) closed while repairing the plan.`,
    "Do not start, stop, write, restore, load, compact, or activate routing from this Node preview.",
  ];
}

function formatPlanStepRecordSummary(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return sourceMatrixConsumptionPlan.planStepRecords
    .map((step) => `${step.code}:${step.status}`)
    .join(", ") || "none";
}

function formatPlanSafetySummary(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return [
    `routingActivationAllowedSteps=${sourceMatrixConsumptionPlan.stepSafetySummary.routingActivationAllowedStepCount}`,
    `writesAllowedSteps=${sourceMatrixConsumptionPlan.stepSafetySummary.writesAllowedStepCount}`,
  ].join(", ");
}

function formatPlanRiskSummary(
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

function formatPlanPromotionHold(
  sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
): string {
  return [
    `state=${sourceMatrixConsumptionPlan.promotionHold.holdState}`,
    `nextAllowedAction=${sourceMatrixConsumptionPlan.promotionHold.nextAllowedAction}`,
    `routingPromotionAllowed=${sourceMatrixConsumptionPlan.promotionHold.routingPromotionAllowed}`,
    `writePromotionAllowed=${sourceMatrixConsumptionPlan.promotionHold.writePromotionAllowed}`,
    `serviceStartupAllowed=${sourceMatrixConsumptionPlan.promotionHold.serviceStartupAllowed}`,
    `reasons=${sourceMatrixConsumptionPlan.promotionHold.reasonCodes.join("|") || "none"}`,
  ].join(", ");
}
