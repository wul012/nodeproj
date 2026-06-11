import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupExtendedRunFinalCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup extended run final closeout", () => {
  it("summarizes the v523-v537 extension and final public verifier gate", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-extended-run-final-closeout.v1",
      closeoutState: "ready",
      activeNodeVersion: "Node v537",
      sourceNodeVersion: "Node v536",
      readyForRouteCatalogCleanupExtendedRunFinalCloseout: true,
      closeoutOnly: true,
      executionAllowed: false,
      finalGate: {
        versionSpan: "v532-v536",
        archiveVerifierReady: true,
        archiveVerifierCheckCount: 17,
        archiveVerifierPassedCheckCount: 17,
      },
      routeQuality: {
        ready: true,
        routeGroupCount: 51,
        catalogIntegrityReady: true,
        routeTableMatchesCatalog: true,
      },
      ciObservation: {
        checkedBeforeVersion: "Node v537",
        lastKnownSuccessfulVersion: "Node v530",
        latestObservedState: "in-progress",
        conclusion: "no-new-failure-observed",
      },
      routeCatalog: {
        routeCount: 223,
        javaMiniKvDomainRouteCount: 59,
        cleanupHandoffRouteGroupRouteCount: 25,
      },
      summary: {
        completedFollowUpVersionCount: 15,
        routeCount: 223,
        javaMiniKvDomainRouteCount: 59,
        cleanupHandoffRouteGroupRouteCount: 25,
      },
    });
    expect(closeout.completedFollowUpVersions).toEqual([
      "v523",
      "v524",
      "v525",
      "v526",
      "v527",
      "v528",
      "v529",
      "v530",
      "v531",
      "v532",
      "v533",
      "v534",
      "v535",
      "v536",
      "v537",
    ]);
    expect(closeout.routeQuality.routeRegistrationCount)
      .toBeGreaterThanOrEqual(closeout.routeCatalog.routeCount);
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);
    expect(renderJavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseoutMarkdown(closeout))
      .toContain("completedFollowUpVersionCount: 15");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
