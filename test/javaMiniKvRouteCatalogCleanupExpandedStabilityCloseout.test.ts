import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupExpandedStabilityCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup expanded stability closeout", () => {
  it("closes the v522-v526 gate and prepares the v527-v531 stability segment", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-expanded-stability-closeout.v1",
      closeoutState: "ready",
      activeNodeVersion: "Node v527",
      sourceNodeVersion: "Node v526",
      readyForRouteCatalogCleanupExpandedStabilityCloseout: true,
      closeoutOnly: true,
      executionAllowed: false,
      closedGate: {
        versionSpan: "v522-v526",
        archiveVerifierReady: true,
        archiveVerifierCheckCount: 16,
        archiveVerifierPassedCheckCount: 16,
        sourceCompletedVersionCount: 16,
        sourceRemainingVersionCount: 15,
      },
      routeCatalog: {
        routeCount: 219,
        javaMiniKvDomainRouteCount: 55,
        cleanupHandoffRouteGroupRouteCount: 21,
      },
      summary: {
        plannedSegmentVersionCount: 5,
        routeCount: 219,
        javaMiniKvDomainRouteCount: 55,
        cleanupHandoffRouteGroupRouteCount: 21,
      },
    });
    expect(closeout.plannedSegment).toEqual(["v527", "v528", "v529", "v530", "v531"]);
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);
    expect(renderJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutMarkdown(closeout))
      .toContain("plannedSegmentVersionCount: 5");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
