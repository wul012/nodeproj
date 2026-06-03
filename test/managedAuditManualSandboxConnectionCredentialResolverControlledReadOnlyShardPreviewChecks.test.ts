import { describe, expect, it } from "vitest";

import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
  createNextActions,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview checks", () => {
  it("blocks source matrix consumption plans that allow routing activation or writes", async () => {
    const config = loadTestConfig();
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config,
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });
    const unsafePlan = {
      ...profile.preview.sourceMatrixConsumptionPlan,
      stepSafetySummary: {
        routingActivationAllowedStepCount: 1,
        writesAllowedStepCount: 1,
      },
      riskSummary: {
        riskLevel: "unsafe" as const,
        reviewRequired: true,
        blocked: true,
        unsafeStepCount: 2,
        riskReasonCodes: ["PLAN_HAS_UNSAFE_STEPS"],
      },
      promotionHold: {
        ...profile.preview.sourceMatrixConsumptionPlan.promotionHold,
        routingPromotionAllowed: true,
        writePromotionAllowed: true,
        serviceStartupAllowed: true,
        closureCriteria: [],
        closureCriterionCount: 0,
      },
      readOnlyReviewScope: {
        scopeState: "ready-for-read-only-review",
        allowedOperations: [],
        forbiddenOperations: ["activate-shard-router"],
        allowedOperationCount: 1,
        forbiddenOperationCount: 1,
      },
    } as unknown as typeof profile.preview.sourceMatrixConsumptionPlan;
    const checks = createChecks(
      config,
      profile.reads.java,
      profile.reads.miniKv,
      profile.preview.previewDigest,
      unsafePlan,
    );

    expect(checks.sourceMatrixConsumptionPlanReady).toBe(true);
    expect(checks.sourceMatrixConsumptionPlanHasNoBlockedSteps).toBe(true);
    expect(checks.sourceMatrixConsumptionPlanHasNoUnsafeSteps).toBe(false);
    expect(checks.sourceMatrixConsumptionPlanRiskAccepted).toBe(false);
    expect(checks.sourceMatrixConsumptionPlanPromotionHoldSafe).toBe(false);
    expect(checks.sourceMatrixConsumptionPlanPromotionHoldClosureReady).toBe(false);
    expect(checks.sourceMatrixConsumptionPlanReadOnlyReviewScopeSafe).toBe(false);

    const blockers = collectProductionBlockers(checks);
    expect(blockers.map((blocker) => blocker.code)).toContain("SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_UNSAFE_STEPS");
    expect(blockers.map((blocker) => blocker.code)).toContain("SOURCE_MATRIX_CONSUMPTION_PLAN_RISK_BLOCKED");
    expect(blockers.map((blocker) => blocker.code))
      .toContain("SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_UNSAFE");
    expect(blockers.map((blocker) => blocker.code))
      .toContain("SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_CLOSURE_NOT_READY");
    expect(blockers.map((blocker) => blocker.code))
      .toContain("SOURCE_MATRIX_CONSUMPTION_PLAN_REVIEW_SCOPE_UNSAFE");

    checks.readyForControlledReadOnlyShardPreview = Object.entries(checks)
      .filter(([key]) => key !== "readyForControlledReadOnlyShardPreview")
      .every(([, value]) => value);
    expect(checks.readyForControlledReadOnlyShardPreview).toBe(false);

    expect(collectRecommendations(false, unsafePlan)[0]?.message)
      .toContain("routingActivationAllowedSteps=1, writesAllowedSteps=1");
    expect(collectRecommendations(false, unsafePlan)[0]?.message)
      .toContain("level=unsafe, reviewRequired=true, blocked=true, unsafeSteps=2, reasons=PLAN_HAS_UNSAFE_STEPS");
    expect(collectRecommendations(false, unsafePlan)[0]?.message)
      .toContain("routingPromotionAllowed=true, writePromotionAllowed=true, serviceStartupAllowed=true");
    expect(createNextActions(false, unsafePlan)[1])
      .toContain("routingActivationAllowedSteps=1, writesAllowedSteps=1");
    expect(createNextActions(false, unsafePlan)[2])
      .toContain("level=unsafe, reviewRequired=true, blocked=true, unsafeSteps=2");
    expect(createNextActions(false, unsafePlan)[3])
      .toContain("routingPromotionAllowed=true, writePromotionAllowed=true, serviceStartupAllowed=true");
  });

  it("keeps read-only ready guidance warning-only when both sources are inactive routing previews", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(collectWarnings(profile.reads.java, profile.reads.miniKv)).toEqual([
      expect.objectContaining({
        code: "PREVIEW_CONFIRMS_READINESS_NOT_ACTIVE_ROUTING",
        severity: "warning",
      }),
    ]);
    expect(collectRecommendations(true, profile.preview.sourceMatrixConsumptionPlan)[0]?.code)
      .toBe("CONSUME_SOURCE_MATRIX_PLAN_READ_ONLY");
    expect(createNextActions(true, profile.preview.sourceMatrixConsumptionPlan)).toEqual([
      expect.stringContaining("without routing activation"),
      expect.stringContaining("routingActivationAllowedSteps=0, writesAllowedSteps=0"),
      expect.stringContaining("level=review, reviewRequired=true, blocked=false, unsafeSteps=0"),
      expect.stringContaining("state=read-only-review-required, nextAllowedAction=review-read-only-risk"),
      expect.stringContaining("independently started services"),
    ]);
  });
});
