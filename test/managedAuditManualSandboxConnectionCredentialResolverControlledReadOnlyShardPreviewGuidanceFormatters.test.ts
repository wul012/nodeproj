import { describe, expect, it } from "vitest";

import {
  formatPlanPromotionHold,
  formatPlanRiskSummary,
  formatPlanSafetySummary,
  formatPlanStepRecordSummary,
  formatReadOnlyReviewScope,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview guidance formatters", () => {
  it("formats ready consumption plan guidance summaries", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });
    const plan = profile.preview.sourceMatrixConsumptionPlan;

    expect(formatPlanStepRecordSummary(plan))
      .toBe("observe-sources:ready, compare-routing-modes:ready, review-drift-findings:needs-review, keep-routing-disabled:ready");
    expect(formatPlanSafetySummary(plan))
      .toBe("routingActivationAllowedSteps=0, writesAllowedSteps=0");
    expect(formatPlanRiskSummary(plan))
      .toBe("level=review, reviewRequired=true, blocked=false, unsafeSteps=0, reasons=PLAN_HAS_REVIEW_STEPS");
    expect(formatPlanPromotionHold(plan))
      .toContain("state=read-only-review-required, nextAllowedAction=review-read-only-risk");
    expect(formatPlanPromotionHold(plan)).toContain("closureCriterionCount=5");
    expect(formatReadOnlyReviewScope(plan))
      .toContain("state=ready-for-read-only-review, allowed=consume-plan-step-records|review-risk-summary|verify-promotion-hold-closure");
    expect(formatReadOnlyReviewScope(plan))
      .toContain("digestScope=read-only-review-scope, coveredAllowed=3, coveredForbidden=4");
  });

  it("formats blocked consumption plan guidance summaries", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });
    const plan = profile.preview.sourceMatrixConsumptionPlan;

    expect(formatPlanStepRecordSummary(plan))
      .toBe("repair-blocked-reasons:blocked, review-blocking-findings:blocked, keep-routing-disabled:ready");
    expect(formatPlanRiskSummary(plan))
      .toBe("level=blocked, reviewRequired=false, blocked=true, unsafeSteps=0, reasons=PLAN_HAS_BLOCKED_STEPS|PLAN_HAS_BLOCKING_FINDINGS");
    expect(formatPlanPromotionHold(plan))
      .toContain("state=repair-required, nextAllowedAction=repair-plan-risk");
    expect(formatPlanPromotionHold(plan)).toContain("closureCriterionCount=4");
    expect(formatReadOnlyReviewScope(plan))
      .toContain("state=repair-before-read-only-review, allowed=repair-plan-risk|review-promotion-hold-closure");
    expect(formatReadOnlyReviewScope(plan))
      .toContain("digestScope=read-only-review-scope, coveredAllowed=2, coveredForbidden=4");
  });
});

