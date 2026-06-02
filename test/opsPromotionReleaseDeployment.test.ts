import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion release and deployment routes", () => {
  it("builds promotion release evidence as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyEvidence = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "release-evidence-reviewer",
          note: "build release evidence",
        },
      });
      const evidence = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence?format=markdown",
      });

      expect(emptyEvidence.statusCode).toBe(200);
      expect(emptyEvidence.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          completionVerified: true,
          completionDigestValid: true,
          completionStepsValid: true,
          closureReferenceValid: true,
          closeoutReady: false,
          completionStepCount: 5,
          evidenceItemCount: 5,
        },
      });
      expect(emptyEvidence.json().evidenceName).toMatch(/^promotion-release-evidence-[a-f0-9]{12}$/);
      expect(emptyEvidence.json().evidenceDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyEvidence.json().evidenceDigest.coveredFields).toEqual([
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "completionDigest",
        "verifiedCompletionDigest",
        "closureDigest",
        "verifiedClosureDigest",
        "decision",
        "verification",
        "evidenceItems",
        "nextActions",
      ]);
      expect(emptyEvidence.json().completionDigest.value).toBe(emptyEvidence.json().verifiedCompletionDigest.value);
      expect(emptyEvidence.json().closureDigest.value).toBe(emptyEvidence.json().verifiedClosureDigest.value);
      expect(emptyEvidence.json().evidenceItems.map((item: { name: string }) => item.name)).toEqual([
        "handoff-completion",
        "verified-handoff-completion",
        "handoff-closure",
        "verified-handoff-closure",
        "final-closeout-state",
      ]);
      expect(emptyEvidence.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(evidence.statusCode).toBe(200);
      expect(evidence.json()).toMatchObject({
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
          completionVerified: true,
          completionDigestValid: true,
          completionStepsValid: true,
          closureReferenceValid: true,
          closeoutReady: false,
          completionStepCount: 5,
          evidenceItemCount: 5,
        },
      });
      expect(evidence.json().evidenceName).toMatch(/^promotion-release-evidence-[a-f0-9]{12}$/);
      expect(evidence.json().evidenceDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(evidence.json().completionDigest.value).toBe(evidence.json().verifiedCompletionDigest.value);
      expect(evidence.json().closureDigest.value).toBe(evidence.json().verifiedClosureDigest.value);
      expect(evidence.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(evidence.json().evidenceItems[1]).toMatchObject({
        name: "verified-handoff-completion",
        valid: true,
        source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      expect(evidence.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion release evidence");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Evidence digest: sha256:${evidence.json().evidenceDigest.value}`);
      expect(markdown.body).toContain("- Closeout ready: false");
      expect(markdown.body).toContain("## Evidence Items");
      expect(markdown.body).toContain("### verified-handoff-completion");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion release evidence as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "release-evidence-verifier",
          note: "verify release evidence",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
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
          totalDecisions: 0,
          evidenceItemCount: 5,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().evidenceDigest.value).toBe(emptyVerification.json().recomputedEvidenceDigest.value);
      expect(emptyVerification.json().evidenceItems.map((item: { name: string }) => item.name)).toEqual([
        "handoff-completion",
        "verified-handoff-completion",
        "handoff-closure",
        "verified-handoff-closure",
        "final-closeout-state",
      ]);
      expect(emptyVerification.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().evidenceItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
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
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          evidenceItemCount: 5,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().evidenceName).toMatch(/^promotion-release-evidence-[a-f0-9]{12}$/);
      expect(verification.json().evidenceDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().evidenceDigest.value).toBe(verification.json().recomputedEvidenceDigest.value);
      expect(verification.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().evidenceItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(verification.json().evidenceItems[1]).toMatchObject({
        name: "verified-handoff-completion",
        valid: true,
        source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion release evidence verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Evidence digest: sha256:${verification.json().evidenceDigest.value}`);
      expect(markdown.body).toContain("- Evidence digest valid: true");
      expect(markdown.body).toContain("## Evidence Items");
      expect(markdown.body).toContain("### verified-handoff-completion");
    } finally {
      await app.close();
    }
  });

  it("builds promotion release archive as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyArchive = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "release-archive-reviewer",
          note: "build release archive",
        },
      });
      const evidence = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-evidence",
      });
      const releaseArchive = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive?format=markdown",
      });

      expect(emptyArchive.statusCode).toBe(200);
      expect(emptyArchive.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          evidenceVerified: true,
          evidenceDigestValid: true,
          evidenceItemsValid: true,
          evidenceReferenceValid: true,
          closeoutReady: false,
          evidenceItemCount: 5,
          archiveItemCount: 4,
        },
      });
      expect(emptyArchive.json().releaseArchiveName).toMatch(/^promotion-release-archive-[a-f0-9]{12}$/);
      expect(emptyArchive.json().releaseArchiveDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyArchive.json().archiveItems.map((item: { name: string }) => item.name)).toEqual([
        "release-evidence",
        "verified-release-evidence",
        "handoff-completion",
        "final-archive-state",
      ]);
      expect(emptyArchive.json().archiveItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(evidence.statusCode).toBe(200);
      expect(releaseArchive.statusCode).toBe(200);
      expect(releaseArchive.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          evidenceVerified: true,
          evidenceDigestValid: true,
          evidenceItemsValid: true,
          evidenceReferenceValid: true,
          closeoutReady: false,
          evidenceItemCount: 5,
          archiveItemCount: 4,
        },
      });
      expect(releaseArchive.json().releaseArchiveName).toMatch(/^promotion-release-archive-[a-f0-9]{12}$/);
      expect(releaseArchive.json().releaseArchiveDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(releaseArchive.json().releaseArchiveDigest.coveredFields).toEqual([
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "evidenceDigest",
        "verifiedEvidenceDigest",
        "completionDigest",
        "closureDigest",
        "decision",
        "verification",
        "archiveItems",
        "nextActions",
      ]);
      expect(releaseArchive.json().evidenceDigest.value).toBe(evidence.json().evidenceDigest.value);
      expect(releaseArchive.json().evidenceDigest.value).toBe(releaseArchive.json().verifiedEvidenceDigest.value);
      expect(releaseArchive.json().archiveItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(releaseArchive.json().archiveItems[1]).toMatchObject({
        name: "verified-release-evidence",
        valid: true,
        source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      });
      expect(releaseArchive.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion release archive");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Release archive digest: sha256:${releaseArchive.json().releaseArchiveDigest.value}`);
      expect(markdown.body).toContain("- Evidence reference valid: true");
      expect(markdown.body).toContain("## Archive Items");
      expect(markdown.body).toContain("### verified-release-evidence");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion release archive as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "release-archive-verifier",
          note: "verify release archive",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        checks: {
          releaseArchiveDigestValid: true,
          coveredFieldsMatch: true,
          archiveItemsValid: true,
          releaseArchiveNameMatches: true,
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
          evidenceDigestMatches: true,
          verifiedEvidenceDigestMatches: true,
          completionDigestMatches: true,
          closureDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          archiveItemCount: 4,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().releaseArchiveDigest.value).toBe(
        emptyVerification.json().recomputedReleaseArchiveDigest.value,
      );
      expect(emptyVerification.json().archiveItems.map((item: { name: string }) => item.name)).toEqual([
        "release-evidence",
        "verified-release-evidence",
        "handoff-completion",
        "final-archive-state",
      ]);
      expect(emptyVerification.json().archiveItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().archiveItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        checks: {
          releaseArchiveDigestValid: true,
          coveredFieldsMatch: true,
          archiveItemsValid: true,
          releaseArchiveNameMatches: true,
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
          evidenceDigestMatches: true,
          verifiedEvidenceDigestMatches: true,
          completionDigestMatches: true,
          closureDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          archiveItemCount: 4,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().releaseArchiveName).toMatch(/^promotion-release-archive-[a-f0-9]{12}$/);
      expect(verification.json().releaseArchiveDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().releaseArchiveDigest.value).toBe(verification.json().recomputedReleaseArchiveDigest.value);
      expect(verification.json().archiveItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().archiveItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(verification.json().archiveItems[1]).toMatchObject({
        name: "verified-release-evidence",
        valid: true,
        source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion release archive verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Release archive digest: sha256:${verification.json().releaseArchiveDigest.value}`);
      expect(markdown.body).toContain("- Release archive digest valid: true");
      expect(markdown.body).toContain("## Archive Items");
      expect(markdown.body).toContain("### verified-release-evidence");
    } finally {
      await app.close();
    }
  });

  it("builds promotion deployment approval as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyApproval = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-approval-reviewer",
          note: "build deployment approval",
        },
      });
      const releaseArchive = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive",
      });
      const approval = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval?format=markdown",
      });

      expect(emptyApproval.statusCode).toBe(200);
      expect(emptyApproval.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          releaseArchiveVerified: true,
          releaseArchiveDigestValid: true,
          archiveItemsValid: true,
          releaseArchiveReferenceValid: true,
          closeoutReady: false,
          archiveItemCount: 4,
          approvalItemCount: 4,
        },
      });
      expect(emptyApproval.json().approvalName).toMatch(/^promotion-deployment-approval-[a-f0-9]{12}$/);
      expect(emptyApproval.json().approvalDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyApproval.json().approvalItems.map((item: { name: string }) => item.name)).toEqual([
        "release-archive",
        "verified-release-archive",
        "verified-release-evidence",
        "deployment-approval-state",
      ]);
      expect(emptyApproval.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(releaseArchive.statusCode).toBe(200);
      expect(approval.statusCode).toBe(200);
      expect(approval.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          releaseArchiveVerified: true,
          releaseArchiveDigestValid: true,
          archiveItemsValid: true,
          releaseArchiveReferenceValid: true,
          closeoutReady: false,
          archiveItemCount: 4,
          approvalItemCount: 4,
        },
      });
      expect(approval.json().approvalName).toMatch(/^promotion-deployment-approval-[a-f0-9]{12}$/);
      expect(approval.json().approvalDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(approval.json().approvalDigest.coveredFields).toEqual([
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "releaseArchiveDigest",
        "verifiedReleaseArchiveDigest",
        "evidenceDigest",
        "decision",
        "verification",
        "approvalItems",
        "nextActions",
      ]);
      expect(approval.json().releaseArchiveDigest.value).toBe(releaseArchive.json().releaseArchiveDigest.value);
      expect(approval.json().releaseArchiveDigest.value).toBe(approval.json().verifiedReleaseArchiveDigest.value);
      expect(approval.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(approval.json().approvalItems[1]).toMatchObject({
        name: "verified-release-archive",
        valid: true,
        source: "/api/v1/ops/promotion-archive/release-archive/verification",
      });
      expect(approval.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment approval");
      expect(markdown.body).toContain("- Approval ready: false");
      expect(markdown.body).toContain(`- Approval digest: sha256:${approval.json().approvalDigest.value}`);
      expect(markdown.body).toContain("- Release archive reference valid: true");
      expect(markdown.body).toContain("## Approval Items");
      expect(markdown.body).toContain("### verified-release-archive");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment approval as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-approval-verifier",
          note: "verify deployment approval",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        checks: {
          approvalDigestValid: true,
          coveredFieldsMatch: true,
          approvalItemsValid: true,
          approvalNameMatches: true,
          releaseArchiveNameMatches: true,
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
          approvalReadyMatches: true,
          releaseArchiveDigestMatches: true,
          verifiedReleaseArchiveDigestMatches: true,
          evidenceDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          approvalItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().approvalDigest.value).toBe(
        emptyVerification.json().recomputedApprovalDigest.value,
      );
      expect(emptyVerification.json().approvalItems.map((item: { name: string }) => item.name)).toEqual([
        "release-archive",
        "verified-release-archive",
        "verified-release-evidence",
        "deployment-approval-state",
      ]);
      expect(emptyVerification.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().approvalItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        checks: {
          approvalDigestValid: true,
          coveredFieldsMatch: true,
          approvalItemsValid: true,
          approvalNameMatches: true,
          releaseArchiveNameMatches: true,
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
          approvalReadyMatches: true,
          releaseArchiveDigestMatches: true,
          verifiedReleaseArchiveDigestMatches: true,
          evidenceDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          approvalItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().approvalName).toMatch(/^promotion-deployment-approval-[a-f0-9]{12}$/);
      expect(verification.json().approvalDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().approvalDigest.value).toBe(verification.json().recomputedApprovalDigest.value);
      expect(verification.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().approvalItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(verification.json().approvalItems[1]).toMatchObject({
        name: "verified-release-archive",
        valid: true,
        source: "/api/v1/ops/promotion-archive/release-archive/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment approval verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Approval digest: sha256:${verification.json().approvalDigest.value}`);
      expect(markdown.body).toContain("- Approval digest valid: true");
      expect(markdown.body).toContain("## Approval Items");
      expect(markdown.body).toContain("### verified-release-archive");
    } finally {
      await app.close();
    }
  });

  it("builds promotion deployment change record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyChangeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-change-reviewer",
          note: "build deployment change record",
        },
      });
      const approval = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval",
      });
      const changeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record?format=markdown",
      });

      expect(emptyChangeRecord.statusCode).toBe(200);
      expect(emptyChangeRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          approvalVerified: true,
          approvalDigestValid: true,
          approvalItemsValid: true,
          approvalReferenceValid: true,
          closeoutReady: false,
          approvalItemCount: 4,
          changeItemCount: 4,
        },
      });
      expect(emptyChangeRecord.json().changeRecordName).toMatch(/^promotion-deployment-change-[a-f0-9]{12}$/);
      expect(emptyChangeRecord.json().changeDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyChangeRecord.json().changeItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-approval",
        "verified-deployment-approval",
        "verified-release-archive",
        "deployment-change-state",
      ]);
      expect(emptyChangeRecord.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(approval.statusCode).toBe(200);
      expect(changeRecord.statusCode).toBe(200);
      expect(changeRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          approvalVerified: true,
          approvalDigestValid: true,
          approvalItemsValid: true,
          approvalReferenceValid: true,
          closeoutReady: false,
          approvalItemCount: 4,
          changeItemCount: 4,
        },
      });
      expect(changeRecord.json().changeRecordName).toMatch(/^promotion-deployment-change-[a-f0-9]{12}$/);
      expect(changeRecord.json().changeDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(changeRecord.json().changeDigest.coveredFields).toEqual([
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "approvalDigest",
        "verifiedApprovalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "changeItems",
        "nextActions",
      ]);
      expect(changeRecord.json().approvalDigest.value).toBe(approval.json().approvalDigest.value);
      expect(changeRecord.json().approvalDigest.value).toBe(changeRecord.json().verifiedApprovalDigest.value);
      expect(changeRecord.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(changeRecord.json().changeItems[1]).toMatchObject({
        name: "verified-deployment-approval",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      expect(changeRecord.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment change record");
      expect(markdown.body).toContain("- Change ready: false");
      expect(markdown.body).toContain(`- Change digest: sha256:${changeRecord.json().changeDigest.value}`);
      expect(markdown.body).toContain("- Approval reference valid: true");
      expect(markdown.body).toContain("## Change Items");
      expect(markdown.body).toContain("### verified-deployment-approval");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment change record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-change-verifier",
          note: "verify deployment change record",
        },
      });
      const changeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        checks: {
          changeDigestValid: true,
          coveredFieldsMatch: true,
          changeItemsValid: true,
          changeRecordNameMatches: true,
          approvalDigestMatches: true,
          verifiedApprovalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          changeItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().changeDigest.value).toBe(emptyVerification.json().recomputedChangeDigest.value);
      expect(emptyVerification.json().changeItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-approval",
        "verified-deployment-approval",
        "verified-release-archive",
        "deployment-change-state",
      ]);
      expect(emptyVerification.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().changeItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(changeRecord.statusCode).toBe(200);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        checks: {
          changeDigestValid: true,
          coveredFieldsMatch: true,
          changeItemsValid: true,
          changeRecordNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          changeReadyMatches: true,
          approvalDigestMatches: true,
          verifiedApprovalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          changeItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().changeRecordName).toBe(changeRecord.json().changeRecordName);
      expect(verification.json().changeDigest.value).toBe(changeRecord.json().changeDigest.value);
      expect(verification.json().changeDigest.value).toBe(verification.json().recomputedChangeDigest.value);
      expect(verification.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().changeItems.every((item: { sourceMatches: boolean }) => item.sourceMatches)).toBe(true);
      expect(verification.json().changeItems[1]).toMatchObject({
        name: "verified-deployment-approval",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment change record verification");
      expect(markdown.body).toContain("- Change digest valid: true");
      expect(markdown.body).toContain(`- Recomputed change digest: sha256:${verification.json().recomputedChangeDigest.value}`);
      expect(markdown.body).toContain("## Change Items");
      expect(markdown.body).toContain("### verified-deployment-approval");
      expect(markdown.body).toContain("## Summary");
    } finally {
      await app.close();
    }
  });

  it("builds promotion deployment execution record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyExecutionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-execution-reviewer",
          note: "build deployment execution record",
        },
      });
      const changeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const changeRecordVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      const executionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record?format=markdown",
      });

      expect(emptyExecutionRecord.statusCode).toBe(200);
      expect(emptyExecutionRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          changeRecordVerified: true,
          changeDigestValid: true,
          changeItemsValid: true,
          changeReferenceValid: true,
          closeoutReady: false,
          changeItemCount: 4,
          executionItemCount: 4,
        },
      });
      expect(emptyExecutionRecord.json().executionName).toMatch(/^promotion-deployment-execution-[a-f0-9]{12}$/);
      expect(emptyExecutionRecord.json().executionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyExecutionRecord.json().executionItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-change-record",
        "verified-deployment-change-record",
        "deployment-approval",
        "deployment-execution-state",
      ]);
      expect(emptyExecutionRecord.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(changeRecord.statusCode).toBe(200);
      expect(changeRecordVerification.statusCode).toBe(200);
      expect(executionRecord.statusCode).toBe(200);
      expect(executionRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          changeRecordVerified: true,
          changeDigestValid: true,
          changeItemsValid: true,
          changeReferenceValid: true,
          closeoutReady: false,
          changeItemCount: 4,
          executionItemCount: 4,
        },
      });
      expect(executionRecord.json().executionName).toMatch(/^promotion-deployment-execution-[a-f0-9]{12}$/);
      expect(executionRecord.json().executionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(executionRecord.json().executionDigest.coveredFields).toEqual([
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "changeDigest",
        "verifiedChangeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "executionItems",
        "nextActions",
      ]);
      expect(executionRecord.json().changeRecordName).toBe(changeRecord.json().changeRecordName);
      expect(executionRecord.json().changeDigest.value).toBe(changeRecord.json().changeDigest.value);
      expect(executionRecord.json().changeDigest.value).toBe(changeRecordVerification.json().recomputedChangeDigest.value);
      expect(executionRecord.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(executionRecord.json().executionItems[1]).toMatchObject({
        name: "verified-deployment-change-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      expect(executionRecord.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution record");
      expect(markdown.body).toContain("- Execution ready: false");
      expect(markdown.body).toContain(`- Execution digest: sha256:${executionRecord.json().executionDigest.value}`);
      expect(markdown.body).toContain("- Change record verified: true");
      expect(markdown.body).toContain("## Execution Items");
      expect(markdown.body).toContain("### verified-deployment-change-record");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment execution record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-execution-verifier",
          note: "verify deployment execution record",
        },
      });
      const executionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        checks: {
          executionDigestValid: true,
          coveredFieldsMatch: true,
          executionItemsValid: true,
          executionNameMatches: true,
          changeRecordNameMatches: true,
          changeDigestMatches: true,
          verifiedChangeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          executionItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().executionDigest.value).toBe(emptyVerification.json().recomputedExecutionDigest.value);
      expect(emptyVerification.json().executionItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-change-record",
        "verified-deployment-change-record",
        "deployment-approval",
        "deployment-execution-state",
      ]);
      expect(emptyVerification.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().executionItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(executionRecord.statusCode).toBe(200);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        checks: {
          executionDigestValid: true,
          coveredFieldsMatch: true,
          executionItemsValid: true,
          executionNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          changeReadyMatches: true,
          executionReadyMatches: true,
          changeDigestMatches: true,
          verifiedChangeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          executionItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().executionName).toBe(executionRecord.json().executionName);
      expect(verification.json().executionDigest.value).toBe(executionRecord.json().executionDigest.value);
      expect(verification.json().executionDigest.value).toBe(verification.json().recomputedExecutionDigest.value);
      expect(verification.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().executionItems.every((item: { sourceMatches: boolean }) => item.sourceMatches)).toBe(true);
      expect(verification.json().executionItems[1]).toMatchObject({
        name: "verified-deployment-change-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution record verification");
      expect(markdown.body).toContain("- Execution digest valid: true");
      expect(markdown.body).toContain(`- Recomputed execution digest: sha256:${verification.json().recomputedExecutionDigest.value}`);
      expect(markdown.body).toContain("## Execution Items");
      expect(markdown.body).toContain("### verified-deployment-change-record");
      expect(markdown.body).toContain("## Summary");
    } finally {
      await app.close();
    }
  });

  it("builds promotion deployment execution receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyReceipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-receipt-reviewer",
          note: "build deployment execution receipt",
        },
      });
      const executionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const executionRecordVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      const executionReceipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt?format=markdown",
      });

      expect(emptyReceipt.statusCode).toBe(200);
      expect(emptyReceipt.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          executionRecordVerified: true,
          executionDigestValid: true,
          executionItemsValid: true,
          executionReferenceValid: true,
          closeoutReady: false,
          executionItemCount: 4,
          receiptItemCount: 4,
        },
      });
      expect(emptyReceipt.json().receiptName).toMatch(/^promotion-deployment-receipt-[a-f0-9]{12}$/);
      expect(emptyReceipt.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyReceipt.json().receiptItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-execution-record",
        "verified-deployment-execution-record",
        "deployment-change-record",
        "deployment-receipt-state",
      ]);
      expect(emptyReceipt.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(executionRecord.statusCode).toBe(200);
      expect(executionRecordVerification.statusCode).toBe(200);
      expect(executionReceipt.statusCode).toBe(200);
      expect(executionReceipt.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          executionRecordVerified: true,
          executionDigestValid: true,
          executionItemsValid: true,
          executionReferenceValid: true,
          closeoutReady: false,
          executionItemCount: 4,
          receiptItemCount: 4,
        },
      });
      expect(executionReceipt.json().receiptName).toMatch(/^promotion-deployment-receipt-[a-f0-9]{12}$/);
      expect(executionReceipt.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(executionReceipt.json().receiptDigest.coveredFields).toEqual([
        "receiptName",
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptRecordName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "receiptReady",
        "executionDigest",
        "verifiedExecutionDigest",
        "changeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "receiptItems",
        "nextActions",
      ]);
      expect(executionReceipt.json().executionName).toBe(executionRecord.json().executionName);
      expect(executionReceipt.json().executionDigest.value).toBe(executionRecord.json().executionDigest.value);
      expect(executionReceipt.json().executionDigest.value).toBe(
        executionRecordVerification.json().recomputedExecutionDigest.value,
      );
      expect(executionReceipt.json().receiptRecordName).toBe(executionRecord.json().receiptName);
      expect(executionReceipt.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(executionReceipt.json().receiptItems[1]).toMatchObject({
        name: "verified-deployment-execution-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      expect(executionReceipt.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution receipt");
      expect(markdown.body).toContain("- Receipt ready: false");
      expect(markdown.body).toContain(`- Receipt digest: sha256:${executionReceipt.json().receiptDigest.value}`);
      expect(markdown.body).toContain("- Execution record verified: true");
      expect(markdown.body).toContain("## Receipt Items");
      expect(markdown.body).toContain("### verified-deployment-execution-record");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment execution receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-receipt-verifier",
          note: "verify deployment execution receipt",
        },
      });
      const receipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        checks: {
          receiptDigestValid: true,
          coveredFieldsMatch: true,
          receiptItemsValid: true,
          receiptNameMatches: true,
          executionNameMatches: true,
          executionDigestMatches: true,
          verifiedExecutionDigestMatches: true,
          changeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          receiptItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          receiptReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().receiptDigest.value).toBe(emptyVerification.json().recomputedReceiptDigest.value);
      expect(emptyVerification.json().receiptItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-execution-record",
        "verified-deployment-execution-record",
        "deployment-change-record",
        "deployment-receipt-state",
      ]);
      expect(emptyVerification.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().receiptItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(receipt.statusCode).toBe(200);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        checks: {
          receiptDigestValid: true,
          coveredFieldsMatch: true,
          receiptItemsValid: true,
          receiptNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          changeReadyMatches: true,
          executionReadyMatches: true,
          receiptReadyMatches: true,
          executionDigestMatches: true,
          verifiedExecutionDigestMatches: true,
          changeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          receiptItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          receiptReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().receiptName).toBe(receipt.json().receiptName);
      expect(verification.json().receiptDigest.value).toBe(receipt.json().receiptDigest.value);
      expect(verification.json().receiptDigest.value).toBe(verification.json().recomputedReceiptDigest.value);
      expect(verification.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().receiptItems.every((item: { sourceMatches: boolean }) => item.sourceMatches)).toBe(true);
      expect(verification.json().receiptItems[1]).toMatchObject({
        name: "verified-deployment-execution-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution receipt verification");
      expect(markdown.body).toContain("- Receipt digest valid: true");
      expect(markdown.body).toContain(`- Recomputed receipt digest: sha256:${verification.json().recomputedReceiptDigest.value}`);
      expect(markdown.body).toContain("## Receipt Items");
      expect(markdown.body).toContain("### verified-deployment-execution-record");
      expect(markdown.body).toContain("## Summary");
    } finally {
      await app.close();
    }
  });

  it("builds promotion release audit trail record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyAuditTrail = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-audit-trail-record",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "release-audit-reviewer",
          note: "build release audit trail record",
        },
      });
      const receipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const receiptVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      const auditTrail = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-audit-trail-record",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-audit-trail-record?format=markdown",
      });

      expect(emptyAuditTrail.statusCode).toBe(200);
      expect(emptyAuditTrail.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        auditReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          receiptVerified: true,
          receiptDigestValid: true,
          receiptItemsValid: true,
          receiptReferenceValid: true,
          closeoutReady: false,
          receiptItemCount: 4,
          auditItemCount: 4,
        },
      });
      expect(emptyAuditTrail.json().auditTrailName).toMatch(/^promotion-release-audit-[a-f0-9]{12}$/);
      expect(emptyAuditTrail.json().auditDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyAuditTrail.json().auditItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-execution-receipt",
        "verified-deployment-execution-receipt",
        "deployment-execution-record",
        "release-audit-state",
      ]);
      expect(emptyAuditTrail.json().auditItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(receipt.statusCode).toBe(200);
      expect(receiptVerification.statusCode).toBe(200);
      expect(auditTrail.statusCode).toBe(200);
      expect(auditTrail.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        auditReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          receiptVerified: true,
          receiptDigestValid: true,
          receiptItemsValid: true,
          receiptReferenceValid: true,
          closeoutReady: false,
          receiptItemCount: 4,
          auditItemCount: 4,
        },
      });
      expect(auditTrail.json().auditTrailName).toMatch(/^promotion-release-audit-[a-f0-9]{12}$/);
      expect(auditTrail.json().auditDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(auditTrail.json().auditDigest.coveredFields).toEqual([
        "auditTrailName",
        "receiptName",
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptRecordName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "receiptReady",
        "auditReady",
        "receiptDigest",
        "verifiedReceiptDigest",
        "executionDigest",
        "changeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "auditItems",
        "nextActions",
      ]);
      expect(auditTrail.json().receiptName).toBe(receipt.json().receiptName);
      expect(auditTrail.json().receiptDigest.value).toBe(receipt.json().receiptDigest.value);
      expect(auditTrail.json().receiptDigest.value).toBe(receiptVerification.json().recomputedReceiptDigest.value);
      expect(auditTrail.json().auditItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(auditTrail.json().auditItems[1]).toMatchObject({
        name: "verified-deployment-execution-receipt",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      expect(auditTrail.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion release audit trail record");
      expect(markdown.body).toContain("- Audit ready: false");
      expect(markdown.body).toContain(`- Audit digest: sha256:${auditTrail.json().auditDigest.value}`);
      expect(markdown.body).toContain("- Receipt verified: true");
      expect(markdown.body).toContain("## Audit Items");
      expect(markdown.body).toContain("### verified-deployment-execution-receipt");
    } finally {
      await app.close();
    }
  });

});
