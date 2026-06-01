import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence,
} from "../src/services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv route catalog cleanup verification checklist evidence", () => {
  it("summarizes Java v215-v217 checklist and mini-kv v201 continuity evidence", () => {
    const evidence = loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence();

    expect(evidence.summary).toMatchObject({
      fileCount: 6,
      presentFileCount: 6,
      checkCount: 18,
      passedCheckCount: 18,
      javaVerificationItemCount: 7,
      javaRequiredEvidenceCount: 5,
      miniKvV201HistoricalFixtureCount: 57,
      miniKvV201BoundaryGroupCount: 40,
    });
    expect(evidence.javaV215ConsumerVerificationChecklist).toMatchObject({
      version: "Java v215",
      status: "passed",
      verificationItemCount: 7,
      requiredEvidenceCount: 5,
      boundaryRuntimeClosed: true,
    });
    expect(evidence.javaV216ConsumerVerificationChecklistSnapshotFreeze).toMatchObject({
      version: "Java v216",
      guardCount: 6,
      validationCount: 2,
    });
    expect(evidence.javaV217ConsumerVerificationChecklistHistoricalCompatibility).toMatchObject({
      version: "Java v217",
      guardCount: 4,
      validationCount: 2,
    });
    expect(evidence.miniKvV201RouteCatalogCleanupPostCloseoutContinuity).toMatchObject({
      releaseVersion: "v201",
      status: "node-route-catalog-cleanup-post-closeout-continuity-read-only",
      previousConsumedReleaseVersion: "v200",
      evidenceDigest: "fnv1a64:9a3abb5ab3aaeb1c",
      fieldCount: 821,
      groupCount: 40,
    });
  });

  it("resolves checklist inputs from frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const evidence = loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence();

      expect(evidence.summary.checkCount).toBe(evidence.summary.passedCheckCount);
      expect(Object.values(evidence.files).every((file) => file.exists)).toBe(true);
      expect(Object.values(evidence.files).every((file) =>
        file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces"),
      )).toBe(true);
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });
});
