import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion handoff receipt routes", () => {
  it("builds a promotion handoff receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyReceipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "receipt-reviewer",
          note: "build handoff receipt",
        },
      });
      const receipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt?format=markdown",
      });

      expect(emptyReceipt.statusCode).toBe(200);
      expect(emptyReceipt.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
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
      expect(emptyReceipt.json().receiptName).toMatch(/^promotion-receipt-[a-f0-9]{12}$/);
      expect(emptyReceipt.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyReceipt.json().receiptDigest.coveredFields).toEqual([
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "milestones",
        "nextActions",
      ]);
      expect(emptyReceipt.json().certificateDigest.value).toBe(emptyReceipt.json().verifiedCertificateDigest.value);
      expect(emptyReceipt.json().packageDigest.value).toBe(emptyReceipt.json().verifiedPackageDigest.value);
      expect(emptyReceipt.json().milestones.map((milestone: { name: string }) => milestone.name)).toEqual([
        "handoff-package",
        "verified-handoff-package",
        "archive-seal",
        "handoff-certificate",
        "certificate-verification",
      ]);
      expect(emptyReceipt.json().milestones.every((milestone: { valid: boolean }) => milestone.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(receipt.statusCode).toBe(200);
      expect(receipt.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        decision: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
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
      expect(receipt.json().receiptName).toMatch(/^promotion-receipt-[a-f0-9]{12}$/);
      expect(receipt.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.json().certificateDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.json().certificateDigest.value).toBe(receipt.json().verifiedCertificateDigest.value);
      expect(receipt.json().packageDigest.value).toBe(receipt.json().verifiedPackageDigest.value);
      expect(receipt.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.json().milestones.every((milestone: { valid: boolean }) => milestone.valid)).toBe(true);
      expect(receipt.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff receipt");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Receipt digest: sha256:${receipt.json().receiptDigest.value}`);
      expect(markdown.body).toContain("## Milestones");
      expect(markdown.body).toContain("### certificate-verification");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion handoff receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "receipt-verifier",
          note: "verify handoff receipt",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-receipt/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
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
          totalDecisions: 0,
          milestoneCount: 5,
          handoffReady: false,
        },
      });
      expect(emptyVerification.json().receiptDigest.value).toBe(emptyVerification.json().recomputedReceiptDigest.value);
      expect(emptyVerification.json().milestones.map((milestone: { name: string }) => milestone.name)).toEqual([
        "handoff-package",
        "verified-handoff-package",
        "archive-seal",
        "handoff-certificate",
        "certificate-verification",
      ]);
      expect(emptyVerification.json().milestones.every((milestone: { valid: boolean }) => milestone.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
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
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          milestoneCount: 5,
          handoffReady: false,
        },
      });
      expect(verification.json().receiptName).toMatch(/^promotion-receipt-[a-f0-9]{12}$/);
      expect(verification.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().receiptDigest.value).toBe(verification.json().recomputedReceiptDigest.value);
      expect(verification.json().milestones.every((milestone: { valid: boolean }) => milestone.valid)).toBe(true);
      expect(verification.json().milestones.every((milestone: { digestMatches: boolean }) => milestone.digestMatches)).toBe(true);
      expect(verification.json().milestones[4]).toMatchObject({
        name: "certificate-verification",
        valid: true,
        source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff receipt verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Receipt digest: sha256:${verification.json().receiptDigest.value}`);
      expect(markdown.body).toContain("- Receipt digest valid: true");
      expect(markdown.body).toContain("## Milestones");
      expect(markdown.body).toContain("### certificate-verification");
    } finally {
      await app.close();
    }
  });

});
