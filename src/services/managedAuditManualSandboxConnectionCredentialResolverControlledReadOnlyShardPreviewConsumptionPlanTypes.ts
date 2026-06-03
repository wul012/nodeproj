import type {
  ControlledReadOnlyShardPreviewSource,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export type ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStepCode =
  | "observe-sources"
  | "compare-routing-modes"
  | "review-drift-findings"
  | "keep-routing-disabled"
  | "repair-blocked-reasons"
  | "review-blocking-findings";

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep {
  order: number;
  code: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStepCode;
  status: "ready" | "needs-review" | "blocked";
  evidence: string;
  routingActivationAllowed: false;
  writesAllowed: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan {
  planVersion: "Node v638";
  inputConsumerVersion: "Node v599";
  inputDriftSummaryVersion: "Node v600";
  planState: "ready-for-read-only-consumption-plan" | "blocked";
  readyForReadOnlyConsumptionPlan: boolean;
  reviewMode: "read-only-drift-review";
  observedSources: ControlledReadOnlyShardPreviewSource[];
  missingSources: ControlledReadOnlyShardPreviewSource[];
  routingModes: string[];
  blockedReasonCodes: string[];
  driftFindingCount: number;
  blockingFindingCount: number;
  planSteps: string[];
  planStepCount: number;
  planStepRecords: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep[];
  planStepRecordCount: number;
  stepStatusSummary: {
    readyStepCount: number;
    reviewStepCount: number;
    blockedStepCount: number;
  };
  stepSafetySummary: {
    routingActivationAllowedStepCount: number;
    writesAllowedStepCount: number;
  };
  riskSummary: {
    riskLevel: "none" | "review" | "blocked" | "unsafe";
    reviewRequired: boolean;
    blocked: boolean;
    unsafeStepCount: number;
    riskReasonCodes: string[];
  };
  promotionHold: {
    holdState: "none" | "read-only-review-required" | "repair-required";
    nextAllowedAction: "consume-read-only-plan" | "review-read-only-risk" | "repair-plan-risk";
    reasonCodes: string[];
    routingPromotionAllowed: false;
    writePromotionAllowed: false;
    serviceStartupAllowed: false;
    closureCriteria: string[];
    closureCriterionCount: number;
  };
  readOnlyReviewScope: {
    scopeState: "ready-for-read-only-consumption" | "ready-for-read-only-review" | "repair-before-read-only-review";
    allowedOperations: string[];
    forbiddenOperations: string[];
    allowedOperationCount: number;
    forbiddenOperationCount: number;
    scopeDigest: {
      algorithm: "sha256";
      scope: "read-only-review-scope";
      value: string;
      coveredAllowedOperationCount: number;
      coveredForbiddenOperationCount: number;
    };
  };
  planDigest: {
    algorithm: "sha256";
    scope: "source-matrix-consumption-plan";
    value: string;
    coveredStepCount: number;
  };
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

