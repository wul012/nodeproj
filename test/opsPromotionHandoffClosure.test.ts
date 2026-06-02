import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion handoff closure routes", () => {
  it("builds a promotion handoff closure as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyClosure = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "closure-reviewer",
          note: "build handoff closure",
        },
      });
      const closure = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure?format=markdown",
      });

      expect(emptyClosure.statusCode).toBe(200);
      expect(emptyClosure.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
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
      expect(emptyClosure.json().closureName).toMatch(/^promotion-closure-[a-f0-9]{12}$/);
      expect(emptyClosure.json().closureDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyClosure.json().closureDigest.coveredFields).toEqual([
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "receiptDigest",
        "verifiedReceiptDigest",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "closureItems",
        "nextActions",
      ]);
      expect(emptyClosure.json().receiptDigest.value).toBe(emptyClosure.json().verifiedReceiptDigest.value);
      expect(emptyClosure.json().certificateDigest.value).toBe(emptyClosure.json().verifiedCertificateDigest.value);
      expect(emptyClosure.json().packageDigest.value).toBe(emptyClosure.json().verifiedPackageDigest.value);
      expect(emptyClosure.json().closureItems.map((item: { name: string }) => item.name)).toEqual([
        "handoff-receipt",
        "verified-handoff-receipt",
        "handoff-certificate",
        "verified-handoff-certificate",
        "handoff-package",
        "verified-handoff-package",
        "archive-seal",
      ]);
      expect(emptyClosure.json().closureItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(closure.statusCode).toBe(200);
      expect(closure.json()).toMatchObject({
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
      expect(closure.json().closureName).toMatch(/^promotion-closure-[a-f0-9]{12}$/);
      expect(closure.json().closureDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(closure.json().receiptDigest.value).toBe(closure.json().verifiedReceiptDigest.value);
      expect(closure.json().certificateDigest.value).toBe(closure.json().verifiedCertificateDigest.value);
      expect(closure.json().packageDigest.value).toBe(closure.json().verifiedPackageDigest.value);
      expect(closure.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(closure.json().closureItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(closure.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff closure");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Closure digest: sha256:${closure.json().closureDigest.value}`);
      expect(markdown.body).toContain("## Closure Items");
      expect(markdown.body).toContain("### verified-handoff-receipt");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion handoff closure as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "closure-verifier",
          note: "verify handoff closure",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-closure/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
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
          totalDecisions: 0,
          closureItemCount: 7,
          handoffReady: false,
        },
      });
      expect(emptyVerification.json().closureDigest.value).toBe(emptyVerification.json().recomputedClosureDigest.value);
      expect(emptyVerification.json().closureItems.map((item: { name: string }) => item.name)).toEqual([
        "handoff-receipt",
        "verified-handoff-receipt",
        "handoff-certificate",
        "verified-handoff-certificate",
        "handoff-package",
        "verified-handoff-package",
        "archive-seal",
      ]);
      expect(emptyVerification.json().closureItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
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
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          closureItemCount: 7,
          handoffReady: false,
        },
      });
      expect(verification.json().closureName).toMatch(/^promotion-closure-[a-f0-9]{12}$/);
      expect(verification.json().closureDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().closureDigest.value).toBe(verification.json().recomputedClosureDigest.value);
      expect(verification.json().closureItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().closureItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(verification.json().closureItems[1]).toMatchObject({
        name: "verified-handoff-receipt",
        valid: true,
        source: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff closure verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Closure digest: sha256:${verification.json().closureDigest.value}`);
      expect(markdown.body).toContain("- Closure digest valid: true");
      expect(markdown.body).toContain("## Closure Items");
      expect(markdown.body).toContain("### verified-handoff-receipt");
    } finally {
      await app.close();
    }
  });

});
