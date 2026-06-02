import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion archive routes", () => {
  it("builds a promotion archive bundle as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const empty = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "archive-reviewer",
          note: "build archive bundle",
        },
      });
      const jsonBundle = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive",
      });
      const markdownBundle = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive?format=markdown",
      });

      expect(empty.statusCode).toBe(200);
      expect(empty.json()).toMatchObject({
        service: "orderops-node",
        state: "empty",
        summary: {
          totalDecisions: 0,
          integrityValid: true,
          sequenceOrder: "empty",
        },
        nextActions: ["Record a promotion decision before building an archive bundle."],
      });
      expect(empty.json().archiveName).toMatch(/^promotion-archive-[a-f0-9]{12}$/);
      expect(empty.json().summary.integrityRootDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(decision.statusCode).toBe(201);
      expect(jsonBundle.statusCode).toBe(200);
      expect(jsonBundle.json()).toMatchObject({
        service: "orderops-node",
        state: "attention-required",
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          latestSequence: 1,
          latestOutcome: "blocked",
          latestReadyForPromotion: false,
          latestDigestValid: true,
          integrityValid: true,
          sequenceOrder: "contiguous",
        },
        latestEvidence: {
          decisionId: decision.json().id,
          verdict: "verified-blocked",
          summary: {
            digest: decision.json().digest.value,
            digestValid: true,
          },
        },
        integrity: {
          valid: true,
          totalRecords: 1,
        },
      });
      expect(jsonBundle.json().archiveName).toMatch(/^promotion-archive-[a-f0-9]{12}$/);
      expect(jsonBundle.json().summary.integrityRootDigest).toBe(jsonBundle.json().integrity.rootDigest.value);
      expect(jsonBundle.json().nextActions.length).toBeGreaterThan(0);
      expect(markdownBundle.statusCode).toBe(200);
      expect(markdownBundle.headers["content-type"]).toContain("text/markdown");
      expect(markdownBundle.body).toContain("# Promotion archive bundle");
      expect(markdownBundle.body).toContain("- State: attention-required");
      expect(markdownBundle.body).toContain(`- Archive name: ${jsonBundle.json().archiveName}`);
      expect(markdownBundle.body).toContain(`- Integrity root digest: sha256:${jsonBundle.json().summary.integrityRootDigest}`);
      expect(markdownBundle.body).toContain("## Latest Decision Evidence");
      expect(markdownBundle.body).toContain(`- Decision id: ${decision.json().id}`);
      expect(markdownBundle.body).toContain("## Ledger Integrity");
    } finally {
      await app.close();
    }
  });

  it("builds a promotion archive manifest as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyManifest = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/manifest",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "manifest-reviewer",
          note: "build archive manifest",
        },
      });
      const manifest = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/manifest",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/manifest?format=markdown",
      });

      expect(emptyManifest.statusCode).toBe(200);
      expect(emptyManifest.json()).toMatchObject({
        service: "orderops-node",
        state: "empty",
        summary: {
          totalDecisions: 0,
          integrityValid: true,
          sequenceOrder: "empty",
        },
      });
      expect(emptyManifest.json().manifestDigest).toMatchObject({
        algorithm: "sha256",
        coveredFields: ["archiveName", "state", "summary", "artifacts", "nextActions"],
      });
      expect(emptyManifest.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyManifest.json().artifacts.map((artifact: { name: string }) => artifact.name)).toEqual([
        "archive-summary",
        "latest-evidence",
        "ledger-integrity",
      ]);
      expect(emptyManifest.json().artifacts[1]).toMatchObject({
        name: "latest-evidence",
        present: false,
      });
      expect(decision.statusCode).toBe(201);
      expect(manifest.statusCode).toBe(200);
      expect(manifest.json()).toMatchObject({
        service: "orderops-node",
        state: "attention-required",
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          latestSequence: 1,
          latestOutcome: "blocked",
          latestReadyForPromotion: false,
          latestDigestValid: true,
          integrityValid: true,
          sequenceOrder: "contiguous",
        },
      });
      expect(manifest.json().archiveName).toMatch(/^promotion-archive-[a-f0-9]{12}$/);
      expect(manifest.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
      const artifacts = manifest.json().artifacts as Array<{
        name: string;
        present: boolean;
        source: string;
        digest: { algorithm: string; value: string };
      }>;
      expect(artifacts).toHaveLength(3);
      expect(artifacts[0]).toMatchObject({
        name: "archive-summary",
        present: true,
        source: "/api/v1/ops/promotion-archive",
      });
      expect(artifacts[1]).toMatchObject({
        name: "latest-evidence",
        present: true,
        source: `/api/v1/ops/promotion-decisions/${decision.json().id}/evidence`,
      });
      expect(artifacts[2]).toMatchObject({
        name: "ledger-integrity",
        present: true,
        source: "/api/v1/ops/promotion-decisions/integrity",
      });
      expect(artifacts[2].digest.value).toBe(manifest.json().summary.integrityRootDigest);
      expect(artifacts.every((artifact) => artifact.digest.algorithm === "sha256")).toBe(true);
      expect(artifacts.every((artifact) => /^[a-f0-9]{64}$/.test(artifact.digest.value))).toBe(true);
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion archive manifest");
      expect(markdown.body).toContain(`- Archive name: ${manifest.json().archiveName}`);
      expect(markdown.body).toContain(`- Manifest digest: sha256:${manifest.json().manifestDigest.value}`);
      expect(markdown.body).toContain("## Artifacts");
      expect(markdown.body).toContain("### archive-summary");
      expect(markdown.body).toContain("### latest-evidence");
      expect(markdown.body).toContain("### ledger-integrity");
      expect(markdown.body).toContain("## Next Actions");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion archive manifest as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "verification-reviewer",
          note: "verify archive manifest",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "empty",
        checks: {
          manifestDigestValid: true,
          artifactsValid: true,
          archiveNameMatches: true,
          stateMatches: true,
          summaryMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          artifactCount: 3,
        },
      });
      expect(emptyVerification.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyVerification.json().manifestDigest.value).toBe(emptyVerification.json().recomputedManifestDigest.value);
      expect(emptyVerification.json().artifacts.every((artifact: { valid: boolean }) => artifact.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "attention-required",
        checks: {
          manifestDigestValid: true,
          artifactsValid: true,
          archiveNameMatches: true,
          stateMatches: true,
          summaryMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          artifactCount: 3,
        },
      });
      expect(verification.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().manifestDigest.value).toBe(verification.json().recomputedManifestDigest.value);
      expect(verification.json().summary.integrityRootDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().artifacts.map((artifact: { name: string }) => artifact.name)).toEqual([
        "archive-summary",
        "latest-evidence",
        "ledger-integrity",
      ]);
      expect(verification.json().artifacts.every((artifact: { valid: boolean }) => artifact.valid)).toBe(true);
      expect(verification.json().artifacts.every((artifact: { digestMatches: boolean }) => artifact.digestMatches)).toBe(true);
      expect(verification.json().artifacts[1]).toMatchObject({
        name: "latest-evidence",
        valid: true,
        source: `/api/v1/ops/promotion-decisions/${decision.json().id}/evidence`,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion archive verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Manifest digest: sha256:${verification.json().manifestDigest.value}`);
      expect(markdown.body).toContain("## Checks");
      expect(markdown.body).toContain("### archive-summary");
      expect(markdown.body).toContain("### latest-evidence");
      expect(markdown.body).toContain("### ledger-integrity");
    } finally {
      await app.close();
    }
  });

  it("seals a promotion archive attestation as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyAttestation = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "attestation-reviewer",
          note: "seal archive attestation",
        },
      });
      const attestation = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation?format=markdown",
      });

      expect(emptyAttestation.statusCode).toBe(200);
      expect(emptyAttestation.json()).toMatchObject({
        service: "orderops-node",
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        checks: {
          manifestVerified: true,
          artifactsVerified: true,
          archiveReady: false,
          latestDecisionReady: false,
          integrityVerified: true,
        },
      });
      expect(emptyAttestation.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyAttestation.json().verificationDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyAttestation.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyAttestation.json().sealDigest.coveredFields).toEqual([
        "archiveName",
        "state",
        "handoffReady",
        "manifestDigest",
        "verificationDigest",
        "decision",
        "checks",
        "evidenceSources",
        "nextActions",
      ]);
      expect(decision.statusCode).toBe(201);
      expect(attestation.statusCode).toBe(200);
      expect(attestation.json()).toMatchObject({
        service: "orderops-node",
        state: "blocked",
        handoffReady: false,
        decision: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          latestSequence: 1,
          latestOutcome: "blocked",
          latestReadyForPromotion: false,
          latestDigestValid: true,
        },
        checks: {
          manifestVerified: true,
          artifactsVerified: true,
          archiveReady: false,
          latestDecisionReady: false,
          integrityVerified: true,
        },
      });
      expect(attestation.json().title).toContain(attestation.json().archiveName);
      expect(attestation.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(attestation.json().verificationDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(attestation.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(attestation.json().evidenceSources.map((source: { name: string }) => source.name)).toEqual([
        "archive-summary",
        "latest-evidence",
        "ledger-integrity",
      ]);
      expect(attestation.json().evidenceSources.every((source: { verified: boolean }) => source.verified)).toBe(true);
      expect(attestation.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion archive attestation");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Seal digest: sha256:${attestation.json().sealDigest.value}`);
      expect(markdown.body).toContain("## Evidence Sources");
      expect(markdown.body).toContain("### latest-evidence");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion archive attestation seal as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "attestation-verifier",
          note: "verify archive attestation seal",
        },
      });
      const attestationVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/attestation/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
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
          totalDecisions: 0,
          evidenceSourceCount: 3,
          handoffReady: false,
        },
      });
      expect(emptyVerification.json().sealDigest.value).toBe(emptyVerification.json().recomputedSealDigest.value);
      expect(emptyVerification.json().verificationDigest.value).toBe(emptyVerification.json().recomputedVerificationDigest.value);
      expect(decision.statusCode).toBe(201);
      expect(attestationVerification.statusCode).toBe(200);
      expect(attestationVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
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
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          evidenceSourceCount: 3,
          handoffReady: false,
        },
      });
      expect(attestationVerification.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(attestationVerification.json().verificationDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(attestationVerification.json().sealDigest.value).toBe(attestationVerification.json().recomputedSealDigest.value);
      expect(attestationVerification.json().verificationDigest.value).toBe(attestationVerification.json().recomputedVerificationDigest.value);
      expect(attestationVerification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion archive attestation verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Seal digest: sha256:${attestationVerification.json().sealDigest.value}`);
      expect(markdown.body).toContain("## Checks");
      expect(markdown.body).toContain("## Summary");
    } finally {
      await app.close();
    }
  });

});
