import { describe, expect, it } from "vitest";

import {
  buildApprovedPromotionTestApp,
  recordApprovedPromotionDecision,
} from "./support/opsPromotionApprovedReviewSupport.js";

describe("ops promotion approved completion and release evidence routes", () => {
  it("records an approved promotion review and validates completion and release evidence routes", async () => {
    const app = await buildApprovedPromotionTestApp();

    try {
      const decision = await recordApprovedPromotionDecision(app);
      const handoffCompletion = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion",
      });
      const handoffCompletionReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion?format=markdown",
      });
      const handoffCompletionVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      const handoffCompletionVerificationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification?format=markdown",
      });
      const releaseEvidence = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence",
      });
      const releaseEvidenceReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence?format=markdown",
      });
      const releaseEvidenceVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence/verification",
      });
      const releaseEvidenceVerificationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence/verification?format=markdown",
      });

      expect(handoffCompletion.statusCode).toBe(200);
      expect(handoffCompletion.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          closureVerified: true,
          closureDigestValid: true,
          closureItemsValid: true,
          referenceChecksValid: true,
          closeoutReady: true,
          closureItemCount: 7,
          completionStepCount: 5,
        },
      });
      expect(handoffCompletion.json().completionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffCompletion.json().closureDigest.value).toBe(handoffCompletion.json().verifiedClosureDigest.value);
      expect(handoffCompletion.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(handoffCompletion.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        ready: true,
      });
      expect(handoffCompletion.json().nextActions).toEqual([
        "Promotion handoff completion is ready; archive the completion digest with the final release evidence.",
      ]);
      expect(handoffCompletionReport.statusCode).toBe(200);
      expect(handoffCompletionReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffCompletionReport.body).toContain("# Promotion handoff completion");
      expect(handoffCompletionReport.body).toContain("- Handoff ready: true");
      expect(handoffCompletionReport.body).toContain("- Closeout ready: true");
      expect(handoffCompletionReport.body).toContain(`- Completion digest: sha256:${handoffCompletion.json().completionDigest.value}`);
      expect(handoffCompletionVerification.statusCode).toBe(200);
      expect(handoffCompletionVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          completionDigestValid: true,
          coveredFieldsMatch: true,
          completionStepsValid: true,
          completionNameMatches: true,
          closureNameMatches: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          closureDigestMatches: true,
          verifiedClosureDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          latestDecisionId: decision.json().id,
          completionStepCount: 5,
          handoffReady: true,
          closeoutReady: true,
        },
      });
      expect(handoffCompletionVerification.json().completionDigest.value).toBe(
        handoffCompletionVerification.json().recomputedCompletionDigest.value,
      );
      expect(handoffCompletionVerification.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(handoffCompletionVerification.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        readyMatches: true,
      });
      expect(handoffCompletionVerification.json().nextActions).toEqual([
        "Handoff completion verification is complete; archive the verified completion digest with the final release evidence.",
      ]);
      expect(handoffCompletionVerificationReport.statusCode).toBe(200);
      expect(handoffCompletionVerificationReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffCompletionVerificationReport.body).toContain("# Promotion handoff completion verification");
      expect(handoffCompletionVerificationReport.body).toContain("- Handoff ready: true");
      expect(handoffCompletionVerificationReport.body).toContain("- Completion digest valid: true");
      expect(releaseEvidence.statusCode).toBe(200);
      expect(releaseEvidence.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          completionVerified: true,
          completionDigestValid: true,
          completionStepsValid: true,
          closureReferenceValid: true,
          closeoutReady: true,
          completionStepCount: 5,
          evidenceItemCount: 5,
        },
      });
      expect(releaseEvidence.json().evidenceDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(releaseEvidence.json().completionDigest.value).toBe(releaseEvidence.json().verifiedCompletionDigest.value);
      expect(releaseEvidence.json().closureDigest.value).toBe(releaseEvidence.json().verifiedClosureDigest.value);
      expect(releaseEvidence.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(releaseEvidence.json().evidenceItems[4]).toMatchObject({
        name: "final-closeout-state",
        valid: true,
        source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      expect(releaseEvidence.json().nextActions).toEqual([
        "Release evidence is ready; store the evidence digest with the final release archive.",
      ]);
      expect(releaseEvidenceReport.statusCode).toBe(200);
      expect(releaseEvidenceReport.headers["content-type"]).toContain("text/markdown");
      expect(releaseEvidenceReport.body).toContain("# Promotion release evidence");
      expect(releaseEvidenceReport.body).toContain("- Handoff ready: true");
      expect(releaseEvidenceReport.body).toContain("- Closeout ready: true");
      expect(releaseEvidenceReport.body).toContain(`- Evidence digest: sha256:${releaseEvidence.json().evidenceDigest.value}`);
      expect(releaseEvidenceVerification.statusCode).toBe(200);
      expect(releaseEvidenceVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          evidenceDigestValid: true,
          coveredFieldsMatch: true,
          evidenceItemsValid: true,
          evidenceNameMatches: true,
          completionNameMatches: true,
          closureNameMatches: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          completionDigestMatches: true,
          verifiedCompletionDigestMatches: true,
          closureDigestMatches: true,
          verifiedClosureDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          latestDecisionId: decision.json().id,
          evidenceItemCount: 5,
          handoffReady: true,
          closeoutReady: true,
        },
      });
      expect(releaseEvidenceVerification.json().evidenceDigest.value).toBe(
        releaseEvidenceVerification.json().recomputedEvidenceDigest.value,
      );
      expect(releaseEvidenceVerification.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(releaseEvidenceVerification.json().evidenceItems[4]).toMatchObject({
        name: "final-closeout-state",
        valid: true,
        digestMatches: true,
      });
      expect(releaseEvidenceVerification.json().nextActions).toEqual([
        "Release evidence verification is complete; store the verified evidence digest with the final release archive.",
      ]);
      expect(releaseEvidenceVerificationReport.statusCode).toBe(200);
      expect(releaseEvidenceVerificationReport.headers["content-type"]).toContain("text/markdown");
      expect(releaseEvidenceVerificationReport.body).toContain("# Promotion release evidence verification");
      expect(releaseEvidenceVerificationReport.body).toContain("- Handoff ready: true");
      expect(releaseEvidenceVerificationReport.body).toContain("- Evidence digest valid: true");
    } finally {
      await app.close();
    }
  });
});
