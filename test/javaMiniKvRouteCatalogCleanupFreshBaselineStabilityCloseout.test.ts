import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup fresh baseline stability closeout", () => {
  it("summarizes the v512-v516 closeout and live route catalog stability", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout.v1",
      closeoutState: "ready",
      activeNodeVersion: "Node v517",
      sourceNodeVersion: "Node v516",
      readyForRouteCatalogCleanupFreshBaselineStabilityCloseout: true,
      closeoutOnly: true,
      executionAllowed: false,
      closedVersions: ["v512", "v513", "v514", "v515", "v516"],
      routeCatalog: {
        groupCount: 50,
        routeCount: 215,
        javaMiniKvDomainRouteCount: 51,
        cleanupHandoffRouteGroupRouteCount: 17,
      },
      sourceArchive: {
        version: "v514",
        ready: true,
        checkCount: 14,
        passedCheckCount: 14,
        routeCount: 213,
        javaMiniKvDomainRouteCount: 49,
        cleanupHandoffRouteGroupRouteCount: 15,
      },
      archiveVerification: {
        ready: true,
        activeNodeVersion: "Node v515",
        sourceNodeVersion: "Node v514",
      },
      summary: {
        closedVersionCount: 5,
        routeCount: 215,
        javaMiniKvDomainRouteCount: 51,
        cleanupHandoffRouteGroupRouteCount: 17,
      },
    });
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);
    expect(renderJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutMarkdown(closeout))
      .toContain("routeCount: 215");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
