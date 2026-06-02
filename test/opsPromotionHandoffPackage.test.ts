import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion handoff package routes", () => {
  it("builds a promotion handoff package as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyPackage = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "package-reviewer",
          note: "build handoff package",
        },
      });
      const handoffPackage = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package?format=markdown",
      });

      expect(emptyPackage.statusCode).toBe(200);
      expect(emptyPackage.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        summary: {
          totalDecisions: 0,
          evidenceSourceCount: 3,
          attachmentCount: 5,
        },
      });
      expect(emptyPackage.json().packageName).toMatch(/^promotion-handoff-[a-f0-9]{12}$/);
      expect(emptyPackage.json().packageDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyPackage.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyPackage.json().attachments.map((attachment: { name: string }) => attachment.name)).toEqual([
        "archive-bundle",
        "archive-manifest",
        "archive-verification",
        "archive-attestation",
        "attestation-verification",
      ]);
      expect(emptyPackage.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(handoffPackage.statusCode).toBe(200);
      expect(handoffPackage.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
          evidenceSourceCount: 3,
          attachmentCount: 5,
        },
      });
      expect(handoffPackage.json().packageName).toMatch(/^promotion-handoff-[a-f0-9]{12}$/);
      expect(handoffPackage.json().packageDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffPackage.json().packageDigest.coveredFields).toEqual([
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "sealDigest",
        "manifestDigest",
        "verificationDigest",
        "summary",
        "attachments",
        "nextActions",
      ]);
      expect(handoffPackage.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffPackage.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffPackage.json().verificationDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(handoffPackage.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(handoffPackage.json().attachments[4]).toMatchObject({
        name: "attestation-verification",
        valid: true,
        source: "/api/v1/ops/promotion-archive/attestation/verification",
      });
      expect(handoffPackage.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff package");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Package digest: sha256:${handoffPackage.json().packageDigest.value}`);
      expect(markdown.body).toContain("## Attachments");
      expect(markdown.body).toContain("### attestation-verification");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion handoff package as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "package-verifier",
          note: "verify handoff package",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-package/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
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
          totalDecisions: 0,
          attachmentCount: 5,
          handoffReady: false,
        },
      });
      expect(emptyVerification.json().packageDigest.value).toBe(emptyVerification.json().recomputedPackageDigest.value);
      expect(emptyVerification.json().attachments.map((attachment: { name: string }) => attachment.name)).toEqual([
        "archive-bundle",
        "archive-manifest",
        "archive-verification",
        "archive-attestation",
        "attestation-verification",
      ]);
      expect(emptyVerification.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
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
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          attachmentCount: 5,
          handoffReady: false,
        },
      });
      expect(verification.json().packageName).toMatch(/^promotion-handoff-[a-f0-9]{12}$/);
      expect(verification.json().packageDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().packageDigest.value).toBe(verification.json().recomputedPackageDigest.value);
      expect(verification.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(verification.json().attachments.every((attachment: { digestMatches: boolean }) => attachment.digestMatches)).toBe(true);
      expect(verification.json().attachments[4]).toMatchObject({
        name: "attestation-verification",
        valid: true,
        source: "/api/v1/ops/promotion-archive/attestation/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff package verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Package digest: sha256:${verification.json().packageDigest.value}`);
      expect(markdown.body).toContain("## Attachments");
      expect(markdown.body).toContain("### attestation-verification");
    } finally {
      await app.close();
    }
  });

});
