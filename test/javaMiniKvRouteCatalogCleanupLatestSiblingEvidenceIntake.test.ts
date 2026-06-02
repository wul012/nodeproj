import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv route catalog cleanup latest sibling evidence intake", () => {
  it("freezes Java v274 and mini-kv v247 as the latest clean sibling evidence", () => {
    const intake = loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake();

    expect(intake.readyForRouteCatalogCleanupLatestSiblingEvidenceIntake).toBe(true);
    expect(intake.summary).toMatchObject({
      fileCount: 4,
      presentFileCount: 4,
      snippetCount: 4,
      matchedSnippetCount: 4,
      checkCount: 13,
      passedCheckCount: 13,
      javaLatestCleanVersion: "Java v274",
      javaGuardCount: 4,
      javaValidationCount: 3,
      miniKvLatestCleanVersion: "v247",
      miniKvEvidenceDigest: "fnv1a64:9fb71e13c517fff8",
      miniKvHistoricalFixtureCount: 103,
      routeCount: 223,
      javaMiniKvDomainRouteCount: 59,
      cleanupHandoffRouteGroupRouteCount: 25,
    });
    expect(intake.javaReceipt).toMatchObject({
      version: "Java v274",
      status: "passed",
      scope: "v1 contract consumer readiness handoff fifteen-version completion",
      readOnly: true,
      executionAllowed: false,
      boundaryRuntimeClosed: true,
    });
    expect(intake.miniKvRelease).toMatchObject({
      releaseVersion: "v247",
      sourceFrozenReleaseVersion: "v246",
      sourceFrozenFixturePath: "fixtures/release/shard-readiness-v246.json",
      continuityStage: "post-closeout-continuity-node-v522-final-verification-route-readiness",
      stageSequence: 47,
      trackedPostCloseoutReleaseCount: 47,
      nodeBatchCloseoutVersion: "Node v522",
      readyForNextNodeBatch: true,
      runtimeBoundaryClosed: true,
    });
    expect(intake.crossProjectMode).toEqual({
      java: "recommended-parallel",
      miniKv: "recommended-parallel",
      nodeWaitsForFreshSiblingEvidence: false,
      consumedFreshSiblingEvidence: true,
    });
    expect(Object.values(intake.checks).every(Boolean)).toBe(true);
  });

  it("resolves the latest sibling intake from historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const intake = loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake();

      expect(intake.summary.checkCount).toBe(intake.summary.passedCheckCount);
      expect(Object.values(intake.files).every((file) => file.exists)).toBe(true);
      expect(Object.values(intake.files).every((file) =>
        file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces"),
      )).toBe(true);
      expect(intake.miniKvRelease.releaseVersion).toBe("v247");
      expect(intake.javaReceipt.version).toBe("Java v274");
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });
});
