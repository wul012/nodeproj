import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup CI/catalog health closeout", () => {
  it("closes the v527-v531 gate and prepares the v532-v536 health segment", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout.v1",
      closeoutState: "ready",
      activeNodeVersion: "Node v532",
      sourceNodeVersion: "Node v531",
      readyForRouteCatalogCleanupCiCatalogHealthCloseout: true,
      closeoutOnly: true,
      executionAllowed: false,
      closedGate: {
        versionSpan: "v527-v531",
        archiveVerifierReady: true,
        archiveVerifierCheckCount: 16,
        archiveVerifierPassedCheckCount: 16,
      },
      routeQuality: {
        ready: true,
        routeRegistrationCount: 221,
        routeGroupCount: 50,
        catalogIntegrityReady: true,
        routeTableMatchesCatalog: true,
      },
      ciObservation: {
        checkedBeforeVersion: "Node v532",
        lastKnownSuccessfulVersion: "Node v525",
        conclusion: "no-new-failure-observed",
      },
      routeCatalog: {
        routeCount: 221,
        javaMiniKvDomainRouteCount: 57,
        cleanupHandoffRouteGroupRouteCount: 23,
      },
      summary: {
        plannedSegmentVersionCount: 5,
        routeCount: 221,
        javaMiniKvDomainRouteCount: 57,
        cleanupHandoffRouteGroupRouteCount: 23,
      },
    });
    expect(closeout.plannedSegment).toEqual(["v532", "v533", "v534", "v535", "v536"]);
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);
    expect(renderJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutMarkdown(closeout))
      .toContain("ciObservationHasNoNewFailure: true");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
