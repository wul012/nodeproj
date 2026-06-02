import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion handoff certificate routes", () => {
  it("builds a promotion handoff certificate as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyCertificate = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "certificate-reviewer",
          note: "build handoff certificate",
        },
      });
      const certificate = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate?format=markdown",
      });

      expect(emptyCertificate.statusCode).toBe(200);
      expect(emptyCertificate.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          packageVerified: true,
          packageDigestValid: true,
          attachmentsValid: true,
          attachmentCount: 5,
        },
      });
      expect(emptyCertificate.json().certificateName).toMatch(/^promotion-certificate-[a-f0-9]{12}$/);
      expect(emptyCertificate.json().certificateDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyCertificate.json().certificateDigest.coveredFields).toEqual([
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "attachments",
        "nextActions",
      ]);
      expect(emptyCertificate.json().packageDigest.value).toBe(emptyCertificate.json().verifiedPackageDigest.value);
      expect(emptyCertificate.json().attachments.map((attachment: { name: string }) => attachment.name)).toEqual([
        "archive-bundle",
        "archive-manifest",
        "archive-verification",
        "archive-attestation",
        "attestation-verification",
      ]);
      expect(emptyCertificate.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(certificate.statusCode).toBe(200);
      expect(certificate.json()).toMatchObject({
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
          packageVerified: true,
          packageDigestValid: true,
          attachmentsValid: true,
          attachmentCount: 5,
        },
      });
      expect(certificate.json().certificateName).toMatch(/^promotion-certificate-[a-f0-9]{12}$/);
      expect(certificate.json().certificateDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(certificate.json().packageDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(certificate.json().verifiedPackageDigest.value).toBe(certificate.json().packageDigest.value);
      expect(certificate.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(certificate.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(certificate.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff certificate");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Certificate digest: sha256:${certificate.json().certificateDigest.value}`);
      expect(markdown.body).toContain("## Verification");
      expect(markdown.body).toContain("### attestation-verification");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion handoff certificate as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "certificate-verifier",
          note: "verify handoff certificate",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
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
          totalDecisions: 0,
          attachmentCount: 5,
          handoffReady: false,
        },
      });
      expect(emptyVerification.json().certificateDigest.value).toBe(emptyVerification.json().recomputedCertificateDigest.value);
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
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          attachmentCount: 5,
          handoffReady: false,
        },
      });
      expect(verification.json().certificateName).toMatch(/^promotion-certificate-[a-f0-9]{12}$/);
      expect(verification.json().certificateDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().certificateDigest.value).toBe(verification.json().recomputedCertificateDigest.value);
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
      expect(markdown.body).toContain("# Promotion handoff certificate verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Certificate digest: sha256:${verification.json().certificateDigest.value}`);
      expect(markdown.body).toContain("- Certificate digest valid: true");
      expect(markdown.body).toContain("## Attachments");
      expect(markdown.body).toContain("### attestation-verification");
    } finally {
      await app.close();
    }
  });

});
