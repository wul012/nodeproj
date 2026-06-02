import { describe, expect, it } from "vitest";

import {
  buildApprovedPromotionTestApp,
  recordApprovedPromotionDecision,
} from "./support/opsPromotionApprovedReviewSupport.js";

describe("ops promotion approved handoff receipt and closure routes", () => {
  it("records an approved promotion review and validates receipt and closure routes", async () => {
    const app = await buildApprovedPromotionTestApp();

    try {
      const decision = await recordApprovedPromotionDecision(app);
      const handoffReceipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt",
      });
      const handoffReceiptReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt?format=markdown",
      });
      const handoffReceiptVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      });
      const handoffReceiptVerificationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt/verification?format=markdown",
      });
      const handoffClosure = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure",
      });
      const handoffClosureReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure?format=markdown",
      });
      const handoffClosureVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      });
      const handoffClosureVerificationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure/verification?format=markdown",
      });

      expect(handoffReceipt.statusCode).toBe(200);
      expect(handoffReceipt.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          certificateVerified: true,
          certificateDigestValid: true,
          packageReferenceValid: true,
          sealReferenceValid: true,
          attachmentsValid: true,
          milestoneCount: 5,
          attachmentCount: 5,
        },
      });
      expect(handoffReceipt.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffReceipt.json().certificateDigest.value).toBe(handoffReceipt.json().verifiedCertificateDigest.value);
      expect(handoffReceipt.json().packageDigest.value).toBe(handoffReceipt.json().verifiedPackageDigest.value);
      expect(handoffReceipt.json().milestones.every((milestone: { valid: boolean }) => milestone.valid)).toBe(true);
      expect(handoffReceipt.json().nextActions).toEqual([
        "Promotion handoff receipt is ready; store the receipt digest with the final handoff record.",
      ]);
      expect(handoffReceiptReport.statusCode).toBe(200);
      expect(handoffReceiptReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffReceiptReport.body).toContain("# Promotion handoff receipt");
      expect(handoffReceiptReport.body).toContain("- Handoff ready: true");
      expect(handoffReceiptReport.body).toContain(`- Receipt digest: sha256:${handoffReceipt.json().receiptDigest.value}`);
      expect(handoffReceiptVerification.statusCode).toBe(200);
      expect(handoffReceiptVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          receiptDigestValid: true,
          coveredFieldsMatch: true,
          milestonesValid: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          certificateDigestMatches: true,
          verifiedCertificateDigestMatches: true,
          packageDigestMatches: true,
          verifiedPackageDigestMatches: true,
          sealDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          latestDecisionId: decision.json().id,
          milestoneCount: 5,
          handoffReady: true,
        },
      });
      expect(handoffReceiptVerification.json().receiptDigest.value).toBe(
        handoffReceiptVerification.json().recomputedReceiptDigest.value,
      );
      expect(handoffReceiptVerification.json().milestones.every((milestone: { valid: boolean }) => milestone.valid)).toBe(true);
      expect(handoffReceiptVerification.json().nextActions).toEqual([
        "Handoff receipt verification is complete; store the verified receipt digest with the final handoff record.",
      ]);
      expect(handoffReceiptVerificationReport.statusCode).toBe(200);
      expect(handoffReceiptVerificationReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffReceiptVerificationReport.body).toContain("# Promotion handoff receipt verification");
      expect(handoffReceiptVerificationReport.body).toContain("- Handoff ready: true");
      expect(handoffReceiptVerificationReport.body).toContain("- Receipt digest valid: true");
      expect(handoffClosure.statusCode).toBe(200);
      expect(handoffClosure.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          receiptVerified: true,
          receiptDigestValid: true,
          milestoneReferencesValid: true,
          certificateReferenceValid: true,
          packageReferenceValid: true,
          sealReferenceValid: true,
          milestoneCount: 5,
          closureItemCount: 7,
        },
      });
      expect(handoffClosure.json().closureDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffClosure.json().receiptDigest.value).toBe(handoffClosure.json().verifiedReceiptDigest.value);
      expect(handoffClosure.json().certificateDigest.value).toBe(handoffClosure.json().verifiedCertificateDigest.value);
      expect(handoffClosure.json().packageDigest.value).toBe(handoffClosure.json().verifiedPackageDigest.value);
      expect(handoffClosure.json().closureItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(handoffClosure.json().nextActions).toEqual([
        "Promotion handoff closure is ready; record the closure digest and mark the handoff closed.",
      ]);
      expect(handoffClosureReport.statusCode).toBe(200);
      expect(handoffClosureReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffClosureReport.body).toContain("# Promotion handoff closure");
      expect(handoffClosureReport.body).toContain("- Handoff ready: true");
      expect(handoffClosureReport.body).toContain(`- Closure digest: sha256:${handoffClosure.json().closureDigest.value}`);
      expect(handoffClosureVerification.statusCode).toBe(200);
      expect(handoffClosureVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          closureDigestValid: true,
          coveredFieldsMatch: true,
          closureItemsValid: true,
          closureNameMatches: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          receiptDigestMatches: true,
          verifiedReceiptDigestMatches: true,
          certificateDigestMatches: true,
          verifiedCertificateDigestMatches: true,
          packageDigestMatches: true,
          verifiedPackageDigestMatches: true,
          sealDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          latestDecisionId: decision.json().id,
          closureItemCount: 7,
          handoffReady: true,
        },
      });
      expect(handoffClosureVerification.json().closureDigest.value).toBe(
        handoffClosureVerification.json().recomputedClosureDigest.value,
      );
      expect(handoffClosureVerification.json().closureItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(handoffClosureVerification.json().nextActions).toEqual([
        "Handoff closure verification is complete; store the verified closure digest with the final handoff record.",
      ]);
      expect(handoffClosureVerificationReport.statusCode).toBe(200);
      expect(handoffClosureVerificationReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffClosureVerificationReport.body).toContain("# Promotion handoff closure verification");
      expect(handoffClosureVerificationReport.body).toContain("- Handoff ready: true");
      expect(handoffClosureVerificationReport.body).toContain("- Closure digest valid: true");
    } finally {
      await app.close();
    }
  });
});
