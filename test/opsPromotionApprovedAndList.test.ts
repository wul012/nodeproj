import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion approved review and listing routes", () => {
  it("records an approved promotion review after local evidence is complete", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_ACTIONS_ENABLED: "true",
      UPSTREAM_PROBES_ENABLED: "true",
    }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-status",
          operatorId: "decision-viewer",
          role: "viewer",
          reason: "v19 decision approved test",
        },
      });
      await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${created.json().id}/confirm`,
        payload: {
          operatorId: "decision-viewer",
          confirmText: created.json().confirmation.requiredText,
        },
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: created.json().id,
          requestedBy: "decision-viewer",
        },
      });
      const checkpoint = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "decision-viewer",
          note: "approved evidence",
        },
      });
      await app.inject({
        method: "PUT",
        url: "/api/v1/ops/baseline",
        payload: {
          checkpointId: checkpoint.json().id,
          actor: "decision-viewer",
          note: "approved baseline",
        },
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-viewer",
          note: "approved decision",
        },
      });
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

  it("lists and retrieves promotion decisions newest first", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const first = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-admin",
          note: "first",
        },
      });
      const second = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-admin",
          note: "second",
        },
      });
      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions?limit=10",
      });
      const retrieved = await app.inject({
        method: "GET",
        url: `/api/v1/ops/promotion-decisions/${first.json().id}`,
      });
      const missing = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions/missing-decision",
      });

      expect(first.statusCode).toBe(201);
      expect(second.statusCode).toBe(201);
      expect(listed.statusCode).toBe(200);
      expect(listed.json().decisions.map((decision: { sequence: number }) => decision.sequence)).toEqual([2, 1]);
      expect(retrieved.statusCode).toBe(200);
      expect(retrieved.json()).toMatchObject({
        id: first.json().id,
        sequence: 1,
        note: "first",
      });
      expect(missing.statusCode).toBe(404);
      expect(missing.json()).toMatchObject({
        error: "OPS_PROMOTION_DECISION_NOT_FOUND",
      });
    } finally {
      await app.close();
    }
  });
});
