import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence,
} from "../src/services/javaMiniKvRouteCatalogCleanupReadinessHandoffEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv route catalog cleanup readiness handoff evidence", () => {
  it("summarizes Java v225-v231 handoff and mini-kv v211-v212 retention evidence", () => {
    const evidence = loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence();

    expect(evidence.summary).toMatchObject({
      fileCount: 10,
      presentFileCount: 10,
      checkCount: 16,
      passedCheckCount: 16,
      javaGuardCount: 30,
      javaLatestCleanVersion: "Java v231",
      miniKvLatestCleanVersion: "v212",
      miniKvLatestHistoricalFixtureCount: 68,
      miniKvBoundaryGroupCount: 40,
    });
    expect(evidence.javaV225ConsumerReadinessHandoff).toMatchObject({
      version: "Java v225",
      status: "passed",
      digestEvidenceCount: 5,
      handoffGuardEvidenceCount: 4,
      boundaryRuntimeClosed: true,
    });
    expect(evidence.javaV231ConsumerReadinessHandoffOpsEvidenceAlignment).toMatchObject({
      version: "Java v231",
      guardCount: 5,
    });
    expect(evidence.miniKvV212RouteCatalogPostCloseoutRetentionAudit).toMatchObject({
      releaseVersion: "v212",
      previousConsumedReleaseVersion: "v211",
      historicalFixtureCount: 68,
      groupCount: 40,
    });
  });

  it("resolves readiness handoff inputs from frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const evidence = loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence();

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
