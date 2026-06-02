import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup twenty-version run closeout", () => {
  it("summarizes v506-v521 and prepares the next fifteen versions", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout.v1",
      closeoutState: "ready",
      activeNodeVersion: "Node v522",
      sourceNodeVersion: "Node v521",
      readyForRouteCatalogCleanupTwentyVersionRunCloseout: true,
      closeoutOnly: true,
      executionAllowed: false,
      summary: {
        completedVersionCount: 16,
        remainingVersionCount: 15,
        routeCount: 217,
        javaMiniKvDomainRouteCount: 53,
        cleanupHandoffRouteGroupRouteCount: 19,
      },
      routeCatalog: {
        routeCount: 217,
        javaMiniKvDomainRouteCount: 53,
        cleanupHandoffRouteGroupRouteCount: 19,
      },
      stabilityVerifier: {
        ready: true,
        activeNodeVersion: "Node v520",
        sourceNodeVersion: "Node v519",
      },
    });
    expect(closeout.completedVersions).toHaveLength(16);
    expect(closeout.remainingVersions).toEqual([
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
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);
    expect(renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutMarkdown(closeout))
      .toContain("remainingVersionCount: 15");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
