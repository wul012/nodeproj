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
