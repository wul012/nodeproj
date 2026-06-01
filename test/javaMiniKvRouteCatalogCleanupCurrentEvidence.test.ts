import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupCurrentEvidence,
} from "../src/services/javaMiniKvRouteCatalogCleanupCurrentEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv current route catalog cleanup evidence", () => {
  it("summarizes current Java handoff and mini-kv closeout audit evidence", () => {
    const evidence = loadJavaMiniKvRouteCatalogCleanupCurrentEvidence();

    expect(evidence.summary).toMatchObject({
      fileCount: 6,
      presentFileCount: 6,
      checkCount: 18,
      passedCheckCount: 18,
      javaCatalogedArtifactCount: 6,
      javaConsumerReadTargetCount: 6,
      miniKvV199ArchivedNodeVersionCount: 97,
      miniKvV200HistoricalFixtureCount: 56,
      miniKvV200BoundaryGroupCount: 39,
    });
    expect(evidence.javaV211ConsumerHandoffBundle).toMatchObject({
      version: "Java v211",
      status: "passed",
      readOnly: true,
      executionAllowed: false,
      catalogedArtifactCount: 6,
      requiredEvidenceCount: 9,
      handoffEvidenceCount: 4,
    });
    expect(evidence.javaV211ConsumerHandoffBundleFixture).toMatchObject({
      version: "Java v211",
      contractName: "shard-readiness.v1",
      consumerReadTargetCount: 6,
      fixtureReadTargetCount: 6,
      probesAreGetOnly: true,
    });
    expect(evidence.javaV214ConsumerHandoffBundleIntegrity).toMatchObject({
      version: "Java v214",
      status: "passed",
      guardCount: 6,
      validationCount: 3,
      boundaryRuntimeClosed: true,
    });
    expect(evidence.miniKvV199RouteCatalogCleanupBatchCloseout).toMatchObject({
      releaseVersion: "v199",
      status: "node-route-catalog-cleanup-evidence-batch-closeout-read-only",
      evidenceDigest: "fnv1a64:3a5716f6f09c2b3b",
      previousConsumedReleaseVersion: "v198",
    });
    expect(evidence.miniKvV200RouteCatalogCleanupBatchCloseoutAudit).toMatchObject({
      releaseVersion: "v200",
      status: "node-route-catalog-cleanup-evidence-batch-closeout-audit-read-only",
      evidenceDigest: "fnv1a64:d1e889711b5d8574",
      previousConsumedReleaseVersion: "v199",
      fieldCount: 800,
      groupCount: 39,
    });
  });

  it("resolves current evidence from frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const evidence = loadJavaMiniKvRouteCatalogCleanupCurrentEvidence();

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
