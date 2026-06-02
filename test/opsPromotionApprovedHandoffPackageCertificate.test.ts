import { describe, expect, it } from "vitest";

import {
  buildApprovedPromotionTestApp,
  recordApprovedPromotionDecision,
} from "./support/opsPromotionApprovedReviewSupport.js";

describe("ops promotion approved handoff package and certificate routes", () => {
  it("records an approved promotion review and validates package and certificate routes", async () => {
    const app = await buildApprovedPromotionTestApp();

    try {
      const decision = await recordApprovedPromotionDecision(app);
      const handoffPackage = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package",
      });
      const handoffPackageReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package?format=markdown",
      });
      const handoffPackageVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package/verification",
      });
      const handoffPackageVerificationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package/verification?format=markdown",
      });
      const handoffCertificate = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate",
      });
      const handoffCertificateReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate?format=markdown",
      });
      const handoffCertificateVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      });
      const handoffCertificateVerificationReport = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate/verification?format=markdown",
      });

      expect(handoffPackage.statusCode).toBe(200);
      expect(handoffPackage.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        summary: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
          evidenceSourceCount: 3,
          attachmentCount: 5,
        },
      });
      expect(handoffPackage.json().packageDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffPackage.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(handoffPackage.json().nextActions).toEqual([
        "Handoff package is ready; share the package digest and verified seal digest with the promotion handoff record.",
      ]);
      expect(handoffPackageReport.statusCode).toBe(200);
      expect(handoffPackageReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffPackageReport.body).toContain("# Promotion handoff package");
      expect(handoffPackageReport.body).toContain("- Handoff ready: true");
      expect(handoffPackageReport.body).toContain(`- Package digest: sha256:${handoffPackage.json().packageDigest.value}`);
      expect(handoffPackageVerification.statusCode).toBe(200);
      expect(handoffPackageVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          packageDigestValid: true,
          attachmentsValid: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          sealDigestMatches: true,
          manifestDigestMatches: true,
          verificationDigestMatches: true,
          summaryMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          latestDecisionId: decision.json().id,
          attachmentCount: 5,
          handoffReady: true,
        },
      });
      expect(handoffPackageVerification.json().packageDigest.value).toBe(handoffPackageVerification.json().recomputedPackageDigest.value);
      expect(handoffPackageVerification.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(handoffPackageVerification.json().nextActions).toEqual([
        "Handoff package verification is complete; share the verified package digest with the promotion handoff record.",
      ]);
      expect(handoffPackageVerificationReport.statusCode).toBe(200);
      expect(handoffPackageVerificationReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffPackageVerificationReport.body).toContain("# Promotion handoff package verification");
      expect(handoffPackageVerificationReport.body).toContain("- Handoff ready: true");
      expect(handoffPackageVerificationReport.body).toContain("- Package digest valid: true");
      expect(handoffCertificate.statusCode).toBe(200);
      expect(handoffCertificate.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          packageVerified: true,
          packageDigestValid: true,
          attachmentsValid: true,
          attachmentCount: 5,
        },
      });
      expect(handoffCertificate.json().certificateDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffCertificate.json().packageDigest.value).toBe(handoffCertificate.json().verifiedPackageDigest.value);
      expect(handoffCertificate.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(handoffCertificate.json().nextActions).toEqual([
        "Promotion handoff certificate is ready; share the certificate digest with the handoff record.",
      ]);
      expect(handoffCertificateReport.statusCode).toBe(200);
      expect(handoffCertificateReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffCertificateReport.body).toContain("# Promotion handoff certificate");
      expect(handoffCertificateReport.body).toContain("- Handoff ready: true");
      expect(handoffCertificateReport.body).toContain(
        `- Certificate digest: sha256:${handoffCertificate.json().certificateDigest.value}`,
      );
      expect(handoffCertificateVerification.statusCode).toBe(200);
      expect(handoffCertificateVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          certificateDigestValid: true,
          coveredFieldsMatch: true,
          attachmentsValid: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          packageDigestMatches: true,
          verifiedPackageDigestMatches: true,
          sealDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          latestDecisionId: decision.json().id,
          attachmentCount: 5,
          handoffReady: true,
        },
      });
      expect(handoffCertificateVerification.json().certificateDigest.value).toBe(
        handoffCertificateVerification.json().recomputedCertificateDigest.value,
      );
      expect(handoffCertificateVerification.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(handoffCertificateVerification.json().nextActions).toEqual([
        "Handoff certificate verification is complete; share the verified certificate digest with the handoff record.",
      ]);
      expect(handoffCertificateVerificationReport.statusCode).toBe(200);
      expect(handoffCertificateVerificationReport.headers["content-type"]).toContain("text/markdown");
      expect(handoffCertificateVerificationReport.body).toContain("# Promotion handoff certificate verification");
      expect(handoffCertificateVerificationReport.body).toContain("- Handoff ready: true");
      expect(handoffCertificateVerificationReport.body).toContain("- Certificate digest valid: true");
    } finally {
      await app.close();
    }
  });
});
