import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion decision routes", () => {
  it("records the current blocked promotion review", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-admin",
          note: "capture blocked review",
        },
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        service: "orderops-node",
        sequence: 1,
        reviewer: "decision-admin",
        note: "capture blocked review",
        outcome: "blocked",
        readyForPromotion: false,
        digest: {
          algorithm: "sha256",
        },
        review: {
          decision: "blocked",
          readyForPromotion: false,
          summary: {
            readinessState: "blocked",
            runbookState: "blocked",
            baselineState: "unset",
          },
        },
      });
      expect(response.json().digest.value).toMatch(/^[a-f0-9]{64}$/);
    } finally {
      await app.close();
    }
  });

  it("verifies a recorded promotion decision digest", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-auditor",
          note: "verify digest",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: `/api/v1/ops/promotion-decisions/${decision.json().id}/verification`,
      });
      const missing = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions/missing-decision/verification",
      });

      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        decisionId: decision.json().id,
        sequence: 1,
        valid: true,
        storedDigest: decision.json().digest,
        recomputedDigest: decision.json().digest,
        record: {
          reviewer: "decision-auditor",
          note: "verify digest",
          outcome: "blocked",
          readyForPromotion: false,
          reviewDecision: "blocked",
          reviewReadyForPromotion: false,
          readinessState: "blocked",
          runbookState: "blocked",
          baselineState: "unset",
        },
      });
      expect(verification.json().coveredFields).toEqual([
        "sequence",
        "createdAt",
        "reviewer",
        "note",
        "outcome",
        "readyForPromotion",
        "review",
      ]);
      expect(verification.json().verifiedAt).toEqual(expect.any(String));
      expect(missing.statusCode).toBe(404);
      expect(missing.json()).toMatchObject({
        error: "OPS_PROMOTION_DECISION_NOT_FOUND",
      });
    } finally {
      await app.close();
    }
  });

  it("renders a promotion decision evidence report as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "evidence-reviewer",
          note: "build evidence report",
        },
      });
      const jsonReport = await app.inject({
        method: "GET",
        url: `/api/v1/ops/promotion-decisions/${decision.json().id}/evidence`,
      });
      const markdownReport = await app.inject({
        method: "GET",
        url: `/api/v1/ops/promotion-decisions/${decision.json().id}/evidence?format=markdown`,
      });
      const missing = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions/missing-decision/evidence",
      });

      expect(decision.statusCode).toBe(201);
      expect(jsonReport.statusCode).toBe(200);
      expect(jsonReport.json()).toMatchObject({
        service: "orderops-node",
        decisionId: decision.json().id,
        sequence: 1,
        title: "Promotion decision #1 evidence",
        verdict: "verified-blocked",
        summary: {
          reviewer: "evidence-reviewer",
          note: "build evidence report",
          outcome: "blocked",
          readyForPromotion: false,
          digestValid: true,
          digestAlgorithm: "sha256",
          digest: decision.json().digest.value,
          readinessState: "blocked",
          runbookState: "blocked",
          baselineState: "unset",
        },
        verification: {
          valid: true,
          storedDigest: decision.json().digest,
          recomputedDigest: decision.json().digest,
        },
        decision: {
          id: decision.json().id,
        },
      });
      expect(jsonReport.json().summary.blockerReasons).toBeGreaterThan(0);
      expect(jsonReport.json().summary.reviewReasons).toBeGreaterThan(0);
      expect(jsonReport.json().nextActions.length).toBeGreaterThan(0);
      expect(markdownReport.statusCode).toBe(200);
      expect(markdownReport.headers["content-type"]).toContain("text/markdown");
      expect(markdownReport.body).toContain("# Promotion decision #1 evidence");
      expect(markdownReport.body).toContain("- Verdict: verified-blocked");
      expect(markdownReport.body).toContain("- Digest valid: true");
      expect(markdownReport.body).toContain("## Verification");
      expect(missing.statusCode).toBe(404);
      expect(missing.json()).toMatchObject({
        error: "OPS_PROMOTION_DECISION_NOT_FOUND",
      });
    } finally {
      await app.close();
    }
  });

  it("checks promotion decision ledger integrity across records", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const empty = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions/integrity",
      });
      const first = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "integrity-reviewer",
          note: "first integrity record",
        },
      });
      const second = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "integrity-reviewer",
          note: "second integrity record",
        },
      });
      const integrity = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions/integrity",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions/integrity?format=markdown",
      });

      expect(empty.statusCode).toBe(200);
      expect(empty.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        totalRecords: 0,
        checks: {
          digestsValid: true,
          sequencesContiguous: true,
          sequenceOrder: "empty",
        },
      });
      expect(empty.json().rootDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(first.statusCode).toBe(201);
      expect(second.statusCode).toBe(201);
      expect(integrity.statusCode).toBe(200);
      expect(integrity.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        totalRecords: 2,
        oldestSequence: 1,
        newestSequence: 2,
        checks: {
          digestsValid: true,
          sequencesContiguous: true,
          sequenceOrder: "contiguous",
        },
      });
      expect(integrity.json().rootDigest).toMatchObject({
        algorithm: "sha256",
      });
      expect(integrity.json().rootDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(integrity.json().records.map((record: { sequence: number }) => record.sequence)).toEqual([1, 2]);
      expect(integrity.json().records[0]).toMatchObject({
        id: first.json().id,
        sequence: 1,
        digestValid: true,
        storedDigest: first.json().digest,
        recomputedDigest: first.json().digest,
      });
      expect(integrity.json().records[0].previousChainDigest).toBeUndefined();
      expect(integrity.json().records[0].chainDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(integrity.json().records[1]).toMatchObject({
        id: second.json().id,
        sequence: 2,
        digestValid: true,
        storedDigest: second.json().digest,
        recomputedDigest: second.json().digest,
        previousChainDigest: integrity.json().records[0].chainDigest,
      });
      expect(integrity.json().records[1].chainDigest).toBe(integrity.json().rootDigest.value);
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion decision ledger integrity");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Root digest: sha256:${integrity.json().rootDigest.value}`);
      expect(markdown.body).toContain("## Checks");
      expect(markdown.body).toContain("### Decision 1");
      expect(markdown.body).toContain("### Decision 2");
      expect(markdown.body).toContain(`- Previous chain digest: ${integrity.json().records[0].chainDigest}`);
    } finally {
      await app.close();
    }
  });

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
