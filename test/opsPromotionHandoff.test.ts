import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion handoff routes", () => {
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

  it("builds a promotion handoff completion as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyCompletion = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "completion-reviewer",
          note: "build handoff completion",
        },
      });
      const completion = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion?format=markdown",
      });

      expect(emptyCompletion.statusCode).toBe(200);
      expect(emptyCompletion.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          closureVerified: true,
          closureDigestValid: true,
          closureItemsValid: true,
          referenceChecksValid: true,
          closeoutReady: false,
          closureItemCount: 7,
          completionStepCount: 5,
        },
      });
      expect(emptyCompletion.json().completionName).toMatch(/^promotion-completion-[a-f0-9]{12}$/);
      expect(emptyCompletion.json().completionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyCompletion.json().completionDigest.coveredFields).toEqual([
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "closureDigest",
        "verifiedClosureDigest",
        "decision",
        "verification",
        "completionSteps",
        "nextActions",
      ]);
      expect(emptyCompletion.json().closureDigest.value).toBe(emptyCompletion.json().verifiedClosureDigest.value);
      expect(emptyCompletion.json().completionSteps.map((step: { name: string }) => step.name)).toEqual([
        "closure-created",
        "closure-verified",
        "closure-items-verified",
        "receipt-chain-verified",
        "handoff-readiness-recorded",
      ]);
      expect(emptyCompletion.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(emptyCompletion.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        ready: false,
      });
      expect(decision.statusCode).toBe(201);
      expect(completion.statusCode).toBe(200);
      expect(completion.json()).toMatchObject({
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
          closureVerified: true,
          closureDigestValid: true,
          closureItemsValid: true,
          referenceChecksValid: true,
          closeoutReady: false,
          closureItemCount: 7,
          completionStepCount: 5,
        },
      });
      expect(completion.json().completionName).toMatch(/^promotion-completion-[a-f0-9]{12}$/);
      expect(completion.json().completionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(completion.json().closureDigest.value).toBe(completion.json().verifiedClosureDigest.value);
      expect(completion.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(completion.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        ready: false,
      });
      expect(completion.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff completion");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Completion digest: sha256:${completion.json().completionDigest.value}`);
      expect(markdown.body).toContain("- Closeout ready: false");
      expect(markdown.body).toContain("## Completion Steps");
      expect(markdown.body).toContain("### handoff-readiness-recorded");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion handoff completion as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "completion-verifier",
          note: "verify handoff completion",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
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
          totalDecisions: 0,
          completionStepCount: 5,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().completionDigest.value).toBe(emptyVerification.json().recomputedCompletionDigest.value);
      expect(emptyVerification.json().completionSteps.map((step: { name: string }) => step.name)).toEqual([
        "closure-created",
        "closure-verified",
        "closure-items-verified",
        "receipt-chain-verified",
        "handoff-readiness-recorded",
      ]);
      expect(emptyVerification.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(emptyVerification.json().completionSteps.every((step: { digestMatches: boolean }) => step.digestMatches)).toBe(true);
      expect(emptyVerification.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        readyMatches: true,
      });
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
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
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          completionStepCount: 5,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().completionName).toMatch(/^promotion-completion-[a-f0-9]{12}$/);
      expect(verification.json().completionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().completionDigest.value).toBe(verification.json().recomputedCompletionDigest.value);
      expect(verification.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(verification.json().completionSteps.every((step: { digestMatches: boolean }) => step.digestMatches)).toBe(true);
      expect(verification.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        readyMatches: true,
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff completion verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Completion digest: sha256:${verification.json().completionDigest.value}`);
      expect(markdown.body).toContain("- Completion digest valid: true");
      expect(markdown.body).toContain("## Completion Steps");
      expect(markdown.body).toContain("### handoff-readiness-recorded");
    } finally {
      await app.close();
    }
  });

});
