import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion release archive routes", () => {
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

});
