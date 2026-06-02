import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidence,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv route catalog cleanup fresh baseline evidence", () => {
  it("summarizes clean Java v232-v239 and mini-kv v213-v220 evidence", () => {
    const evidence = loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidence();

    expect(evidence.summary).toMatchObject({
      fileCount: 16,
      presentFileCount: 16,
      checkCount: 9,
      passedCheckCount: 9,
      javaReceiptCount: 8,
      javaGuardCount: 40,
      javaValidationCount: 16,
      javaLatestCleanVersion: "Java v239",
      miniKvVersionedReleaseCount: 8,
      miniKvLatestCleanVersion: "v220",
      miniKvLatestHistoricalFixtureCount: 76,
      miniKvBoundaryGroupCount: 40,
    });
    expect(evidence.javaReceipts.map((receipt) => receipt.version)).toEqual([
      "Java v232",
      "Java v233",
      "Java v234",
      "Java v235",
      "Java v236",
      "Java v237",
      "Java v238",
      "Java v239",
    ]);
    expect(evidence.miniKvReleases.map((release) => release.releaseVersion)).toEqual([
      "v213",
      "v214",
      "v215",
      "v216",
      "v217",
      "v218",
      "v219",
      "v220",
    ]);
    expect(evidence.miniKvReleases.at(-1)).toMatchObject({
      releaseVersion: "v220",
      sourceFrozenReleaseVersion: "v219",
      stageSequence: 20,
      trackedPostCloseoutReleaseCount: 20,
      nodeBatchCloseoutVersion: "Node v498",
    });
    expect(Object.values(evidence.checks).every(Boolean)).toBe(true);
  });

  it("resolves the fresh baseline from frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const evidence = loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidence();

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
