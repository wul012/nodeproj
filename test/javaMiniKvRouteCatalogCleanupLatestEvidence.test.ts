import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupLatestEvidence,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv latest route catalog cleanup evidence", () => {
  it("summarizes the latest tagged Java and mini-kv frozen handoff evidence", () => {
    const evidence = loadJavaMiniKvRouteCatalogCleanupLatestEvidence();

    expect(evidence.summary).toMatchObject({
      fileCount: 4,
      presentFileCount: 4,
      checkCount: 16,
      passedCheckCount: 16,
      javaV1RouteCount: 6,
      javaEndpointCatalogCount: 6,
      miniKvArchivedNodeVersionCount: 89,
      miniKvHistoricalFixtureCount: 49,
    });
    expect(evidence.javaV207ControllerSplit).toMatchObject({
      version: "Java v207",
      readOnly: true,
      executionAllowed: false,
      v1RouteCount: 6,
    });
    expect(evidence.javaV208EndpointCatalog).toMatchObject({
      version: "Java v208",
      contractEndpointCount: 6,
      registryPairCount: 7,
      includedInOpsEvidenceProbes: true,
    });
    expect(evidence.javaV208EndpointCatalogFixture).toMatchObject({
      version: "Java v208",
      endpointCount: 6,
      probesAreGetOnly: true,
    });
    expect(evidence.miniKvV193HandoffAuditFreeze).toMatchObject({
      releaseVersion: "v193",
      status: "node-route-catalog-cleanup-closeout-handoff-audit-freeze-read-only",
      previousConsumedReleaseVersion: "v192",
      evidenceDigest: "fnv1a64:0aad0fd5d2732af5",
    });
  });

  it("resolves the latest tagged inputs from frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const evidence = loadJavaMiniKvRouteCatalogCleanupLatestEvidence();

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
