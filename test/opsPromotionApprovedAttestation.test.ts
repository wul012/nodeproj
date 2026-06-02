import { describe, expect, it } from "vitest";

import {
  buildApprovedPromotionTestApp,
  recordApprovedPromotionDecision,
} from "./support/opsPromotionApprovedReviewSupport.js";

describe("ops promotion approved attestation routes", () => {
  it("records an approved promotion review and validates attestation routes", async () => {
    const app = await buildApprovedPromotionTestApp();

    try {
      const decision = await recordApprovedPromotionDecision(app);
      const attestation = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation",
      });
      const attestationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation?format=markdown",
      });
      const attestationVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation/verification",
      });
      const attestationVerificationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation/verification?format=markdown",
      });

      expect(decision.statusCode).toBe(201);
      expect(decision.json()).toMatchObject({
        outcome: "approved",
        readyForPromotion: true,
        review: {
          decision: "approved",
          readyForPromotion: true,
          summary: {
            readinessState: "ready",
            runbookState: "ready",
            baselineState: "current",
          },
        },
      });
      expect(attestation.statusCode).toBe(200);
      expect(attestation.json()).toMatchObject({
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
          latestReadyForPromotion: true,
          latestDigestValid: true,
        },
        checks: {
          manifestVerified: true,
          artifactsVerified: true,
          archiveReady: true,
          latestDecisionReady: true,
          integrityVerified: true,
        },
      });
      expect(attestation.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(attestation.json().nextActions).toEqual([
        "Archive attestation is ready; attach the seal digest to the promotion handoff record.",
      ]);
      expect(attestationReport.statusCode).toBe(200);
      expect(attestationReport.headers["content-type"]).toContain("text/markdown");
      expect(attestationReport.body).toContain("- Handoff ready: true");
      expect(attestationReport.body).toContain(`- Seal digest: sha256:${attestation.json().sealDigest.value}`);
      expect(attestationVerification.statusCode).toBe(200);
      expect(attestationVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          sealDigestValid: true,
          verificationDigestValid: true,
          manifestDigestMatches: true,
          archiveNameMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          decisionMatches: true,
          checksMatch: true,
          evidenceSourcesMatch: true,
          nextActionsMatch: true,
        },
        summary: {
          latestDecisionId: decision.json().id,
          evidenceSourceCount: 3,
          handoffReady: true,
        },
      });
      expect(attestationVerification.json().nextActions).toEqual([
        "Attestation verification is complete; keep the verified seal digest with the promotion handoff record.",
      ]);
      expect(attestationVerificationReport.statusCode).toBe(200);
      expect(attestationVerificationReport.headers["content-type"]).toContain("text/markdown");
      expect(attestationVerificationReport.body).toContain("- Handoff ready: true");
      expect(attestationVerificationReport.body).toContain("- Seal digest valid: true");
    } finally {
      await app.close();
    }
  });
});
