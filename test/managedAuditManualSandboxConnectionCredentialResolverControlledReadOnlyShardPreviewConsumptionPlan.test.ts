import { describe, expect, it } from "vitest";

import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview consumption plan", () => {
  it("describes ready read-only source matrix consumption plan steps", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.sourceMatrixConsumptionPlan).toMatchObject({
      planVersion: "Node v638",
      inputConsumerVersion: "Node v599",
      inputDriftSummaryVersion: "Node v600",
      planState: "ready-for-read-only-consumption-plan",
      readyForReadOnlyConsumptionPlan: true,
      reviewMode: "read-only-drift-review",
      observedSources: ["java", "miniKv"],
      missingSources: [],
      routingModes: ["read-only-preview", "single-shard-readiness-prototype"],
      blockedReasonCodes: [],
      driftFindingCount: 3,
      blockingFindingCount: 0,
      planStepCount: 4,
      planStepRecordCount: 4,
      planStepRecords: [
        expect.objectContaining({
          order: 1,
          code: "observe-sources",
          status: "ready",
          evidence: "observeSources=java|miniKv",
          routingActivationAllowed: false,
          writesAllowed: false,
        }),
        expect.objectContaining({
          order: 2,
          code: "compare-routing-modes",
          status: "ready",
          evidence: "compareRoutingModes=read-only-preview|single-shard-readiness-prototype",
          routingActivationAllowed: false,
          writesAllowed: false,
        }),
        expect.objectContaining({
          order: 3,
          code: "review-drift-findings",
          status: "needs-review",
          evidence: "reviewDriftFindings=3",
          routingActivationAllowed: false,
          writesAllowed: false,
        }),
        expect.objectContaining({
          order: 4,
          code: "keep-routing-disabled",
          status: "ready",
          evidence: "keepRoutingActivation=false",
          routingActivationAllowed: false,
          writesAllowed: false,
        }),
      ],
      stepStatusSummary: {
        readyStepCount: 3,
        reviewStepCount: 1,
        blockedStepCount: 0,
      },
      stepSafetySummary: {
        routingActivationAllowedStepCount: 0,
        writesAllowedStepCount: 0,
      },
      riskSummary: {
        riskLevel: "review",
        reviewRequired: true,
        blocked: false,
        unsafeStepCount: 0,
        riskReasonCodes: ["PLAN_HAS_REVIEW_STEPS"],
      },
      promotionHold: {
        holdState: "read-only-review-required",
        nextAllowedAction: "review-read-only-risk",
        reasonCodes: ["PLAN_HAS_REVIEW_STEPS"],
        routingPromotionAllowed: false,
        writePromotionAllowed: false,
        serviceStartupAllowed: false,
      },
      planDigest: {
        algorithm: "sha256",
        scope: "source-matrix-consumption-plan",
        coveredStepCount: 4,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixConsumptionPlan.planDigest.value).toMatch(/^[a-f0-9]{64}$/);
  });

  it("describes blocked read-only source matrix consumption plan repair steps", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.sourceMatrixConsumptionPlan).toMatchObject({
      planVersion: "Node v638",
      planState: "blocked",
      readyForReadOnlyConsumptionPlan: false,
      reviewMode: "read-only-drift-review",
      blockedReasonCodes: [
        "SOURCE_NOT_READY",
        "SHARD_COUNTS_NOT_COMPARABLE",
        "SLOT_COUNTS_NOT_COMPARABLE",
        "ROUTING_MODE_NOT_DECLARED",
      ],
      driftFindingCount: 0,
      blockingFindingCount: 4,
      planStepCount: 3,
      planStepRecordCount: 3,
      planStepRecords: [
        expect.objectContaining({
          order: 1,
          code: "repair-blocked-reasons",
          status: "blocked",
          evidence: expect.stringContaining("SOURCE_NOT_READY"),
          routingActivationAllowed: false,
          writesAllowed: false,
        }),
        expect.objectContaining({
          order: 2,
          code: "review-blocking-findings",
          status: "blocked",
          evidence: "blockingFindings=4",
          routingActivationAllowed: false,
          writesAllowed: false,
        }),
        expect.objectContaining({
          order: 3,
          code: "keep-routing-disabled",
          status: "ready",
          evidence: "keepRoutingActivation=false",
          routingActivationAllowed: false,
          writesAllowed: false,
        }),
      ],
      stepStatusSummary: {
        readyStepCount: 1,
        reviewStepCount: 0,
        blockedStepCount: 2,
      },
      stepSafetySummary: {
        routingActivationAllowedStepCount: 0,
        writesAllowedStepCount: 0,
      },
      riskSummary: {
        riskLevel: "blocked",
        reviewRequired: false,
        blocked: true,
        unsafeStepCount: 0,
        riskReasonCodes: [
          "PLAN_HAS_BLOCKED_STEPS",
          "PLAN_HAS_BLOCKING_FINDINGS",
        ],
      },
      promotionHold: {
        holdState: "repair-required",
        nextAllowedAction: "repair-plan-risk",
        reasonCodes: [
          "PLAN_HAS_BLOCKED_STEPS",
          "PLAN_HAS_BLOCKING_FINDINGS",
        ],
        routingPromotionAllowed: false,
        writePromotionAllowed: false,
        serviceStartupAllowed: false,
      },
      planDigest: {
        algorithm: "sha256",
        scope: "source-matrix-consumption-plan",
        coveredStepCount: 3,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixConsumptionPlan.planDigest.value).toMatch(/^[a-f0-9]{64}$/);
  });
});
