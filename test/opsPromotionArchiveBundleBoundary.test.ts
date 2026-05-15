import { describe, expect, it } from "vitest";

import {
  createOpsPromotionArchiveBundle,
  createOpsPromotionArchiveManifest,
  createOpsPromotionArchiveVerification,
  type OpsPromotionArchiveManifest,
} from "../src/services/opsPromotionArchiveBundle.js";
import type { OpsPromotionDecisionLedgerIntegrity } from "../src/services/opsPromotionDecision.js";

describe("ops promotion archive bundle boundary checks", () => {
  it("rejects a corrupted manifest digest without changing bundle data", () => {
    const bundle = createOpsPromotionArchiveBundle({ integrity: createEmptyIntegrity() });
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const corruptedManifest: OpsPromotionArchiveManifest = {
      ...manifest,
      manifestDigest: {
        ...manifest.manifestDigest,
        value: "0".repeat(64),
      },
    };

    const verification = createOpsPromotionArchiveVerification({ bundle, manifest: corruptedManifest });

    expect(verification.valid).toBe(false);
    expect(verification.checks).toMatchObject({
      manifestDigestValid: false,
      artifactsValid: true,
      archiveNameMatches: true,
      stateMatches: true,
      summaryMatches: true,
      nextActionsMatch: true,
    });
    expect(verification.manifestDigest.value).toBe("0".repeat(64));
    expect(verification.recomputedManifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(verification.recomputedManifestDigest.value).not.toBe(verification.manifestDigest.value);
  });

  it("rejects artifact digest mismatch even when the manifest digest is internally recomputed", () => {
    const bundle = createOpsPromotionArchiveBundle({ integrity: createEmptyIntegrity() });
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const corruptedManifest = createOpsPromotionArchiveManifest({
      ...bundle,
      integrity: {
        ...bundle.integrity,
        rootDigest: {
          algorithm: "sha256",
          value: "f".repeat(64),
        },
      },
    });
    corruptedManifest.archiveName = manifest.archiveName;
    corruptedManifest.state = manifest.state;
    corruptedManifest.summary = manifest.summary;
    corruptedManifest.nextActions = manifest.nextActions;
    corruptedManifest.artifacts = manifest.artifacts.map((artifact) => (
      artifact.name === "ledger-integrity"
        ? {
          ...artifact,
          digest: {
            ...artifact.digest,
            value: "f".repeat(64),
          },
        }
        : artifact
    ));

    const verification = createOpsPromotionArchiveVerification({ bundle, manifest: corruptedManifest });
    const ledgerArtifact = verification.artifacts.find((artifact) => artifact.name === "ledger-integrity");

    expect(verification.valid).toBe(false);
    expect(verification.checks).toMatchObject({
      manifestDigestValid: true,
      artifactsValid: false,
      archiveNameMatches: true,
      stateMatches: true,
      summaryMatches: true,
      nextActionsMatch: true,
    });
    expect(ledgerArtifact).toMatchObject({
      name: "ledger-integrity",
      valid: false,
      presentMatches: true,
      sourceMatches: true,
      digestMatches: false,
    });
  });

  it("rejects missing artifact evidence as a structural archive mismatch", () => {
    const bundle = createOpsPromotionArchiveBundle({ integrity: createEmptyIntegrity() });
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const missingLatestEvidenceManifest: OpsPromotionArchiveManifest = {
      ...manifest,
      artifacts: manifest.artifacts.filter((artifact) => artifact.name !== "latest-evidence"),
    };

    const verification = createOpsPromotionArchiveVerification({ bundle, manifest: missingLatestEvidenceManifest });

    expect(verification.valid).toBe(false);
    expect(verification.checks.artifactsValid).toBe(false);
    expect(verification.checks.manifestDigestValid).toBe(false);
    expect(verification.summary.artifactCount).toBe(2);
    expect(verification.artifacts.map((artifact) => artifact.name)).toEqual([
      "archive-summary",
      "ledger-integrity",
    ]);
  });

  it("rejects archive summary and next-action drift", () => {
    const bundle = createOpsPromotionArchiveBundle({ integrity: createEmptyIntegrity() });
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const driftedManifest: OpsPromotionArchiveManifest = {
      ...manifest,
      summary: {
        ...manifest.summary,
        totalDecisions: 1,
      },
      nextActions: ["operator changed the next action outside archive generation"],
    };

    const verification = createOpsPromotionArchiveVerification({ bundle, manifest: driftedManifest });

    expect(verification.valid).toBe(false);
    expect(verification.checks).toMatchObject({
      manifestDigestValid: false,
      artifactsValid: true,
      archiveNameMatches: true,
      stateMatches: true,
      summaryMatches: false,
      nextActionsMatch: false,
    });
    expect(verification.nextActions).toEqual(["Regenerate the archive manifest before trusting this archive fingerprint."]);
  });
});

function createEmptyIntegrity(overrides: Partial<OpsPromotionDecisionLedgerIntegrity> = {}): OpsPromotionDecisionLedgerIntegrity {
  return {
    service: "orderops-node",
    generatedAt: "2026-05-15T00:00:00.000Z",
    valid: true,
    totalRecords: 0,
    rootDigest: {
      algorithm: "sha256",
      value: "a".repeat(64),
    },
    checks: {
      digestsValid: true,
      sequencesContiguous: true,
      sequenceOrder: "empty",
    },
    records: [],
    ...overrides,
  };
}
