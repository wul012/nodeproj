import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupHandoffEvidence,
} from "../src/services/javaMiniKvRouteCatalogCleanupHandoffEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv route catalog cleanup handoff evidence", () => {
  it("summarizes the latest Java and mini-kv read-only handoff evidence", () => {
    const evidence = loadJavaMiniKvRouteCatalogCleanupHandoffEvidence();

    expect(evidence.summary).toMatchObject({
      fileCount: 4,
      presentFileCount: 4,
      javaReadTargetCount: 5,
      javaFixtureTargetCount: 5,
      javaEndpointPairCount: 6,
    });
    expect(evidence.summary.checkCount).toBe(evidence.summary.passedCheckCount);
    expect(evidence.javaV202ConsumerProbePlan).toMatchObject({
      version: "Java v202",
      readOnly: true,
      executionAllowed: false,
      probesAreGetOnly: true,
    });
    expect(evidence.javaV206EndpointPairIntegrity).toMatchObject({
      version: "Java v206",
      v1ContractEndpointPairCount: 6,
      newRouteAdded: false,
      productionCodeChanged: false,
    });
    expect(evidence.miniKvV191RouteCatalogHandoff).toMatchObject({
      releaseVersion: "v191",
      status: "node-route-catalog-cleanup-closeout-handoff-read-only",
      readOnly: true,
      executionAllowed: false,
      rollingCurrentUsedForHistoricalBaseline: false,
    });
  });

  it("uses frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const evidence = loadJavaMiniKvRouteCatalogCleanupHandoffEvidence();

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
