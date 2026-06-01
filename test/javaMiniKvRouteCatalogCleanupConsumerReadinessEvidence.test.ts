import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv route catalog cleanup consumer readiness evidence", () => {
  it("summarizes Java v220-v224 digest readiness and mini-kv v202-v209 continuity evidence", () => {
    const evidence = loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence();

    expect(evidence.summary).toMatchObject({
      fileCount: 15,
      presentFileCount: 15,
      checkCount: 21,
      passedCheckCount: 21,
      javaGuardCount: 20,
      javaDigestEvidenceCount: 5,
      miniKvVersionedReleaseCount: 8,
      miniKvLatestVersionedRelease: "v209",
      miniKvLatestObservedAuditRelease: "v210",
      miniKvLatestVersionedFixtureCount: 65,
      miniKvBoundaryGroupCount: 40,
    });
    expect(evidence.javaV220ConsumerEvidenceDigest).toMatchObject({
      version: "Java v220",
      status: "passed",
      digestEvidenceCount: 5,
      digestCheckCount: 7,
      boundaryRuntimeClosed: true,
    });
    expect(evidence.javaV224ConsumerReadinessCompletion).toMatchObject({
      version: "Java v224",
      guardCount: 5,
      validationCount: 2,
    });
    expect(evidence.miniKvPostCloseoutReleases.map((release) => release.releaseVersion)).toEqual([
      "v202",
      "v203",
      "v204",
      "v205",
      "v206",
      "v207",
      "v208",
      "v209",
    ]);
    expect(evidence.miniKvLatestAuditNote).toMatchObject({
      releaseVersion: "v210",
      sourceVersionedRelease: "v209",
      rollingCurrentRejectedForBaseline: true,
      noteMentionsFallbackV209: true,
      noteMentionsTcpSmoke: true,
    });
  });

  it("resolves consumer readiness inputs from frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const evidence = loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence();

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
