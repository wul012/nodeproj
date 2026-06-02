import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup sibling workspace availability closeout", () => {
  it("keeps Node on historical fixtures unless live sibling repositories are explicitly provided", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-sibling-workspace-availability-closeout.v1",
      activeNodeVersion: "Node v556",
      sourceNodeVersion: "Node v555",
      closeoutState: "ready",
      readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout: true,
      closeoutOnly: true,
      startsJavaService: false,
      startsMiniKvService: false,
      executionAllowed: false,
      siblingWorkspaceMode: {
        localLiveSiblingReposBundledInWorkspace: false,
        liveSiblingStartupRequiredByDefault: false,
        historicalFixturesAvailable: true,
        nodeMayUseLiveSiblingReposWhenProvided: true,
      },
      historicalFixtureRoots: {
        java: {
          exists: true,
        },
        miniKv: {
          exists: true,
        },
      },
      upstreamBoundary: {
        java: "recommended-parallel",
        miniKv: "recommended-parallel",
        nodeWaitsForFreshSiblingEvidence: false,
        defaultEvidenceMode: "historical-fixture",
      },
      sourceChainCloseout: {
        ready: true,
        completedNodeVersionCount: 9,
        routeCount: 227,
        javaMiniKvDomainRouteCount: 63,
        cleanupHandoffRouteGroupRouteCount: 29,
      },
      summary: {
        historicalFixtureRootCount: 2,
        presentHistoricalFixtureRootCount: 2,
        localLiveSiblingRepoRequiredCount: 0,
      },
    });
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);

    const markdown = renderJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutMarkdown(closeout);
    expect(markdown).toContain("liveSiblingStartupRequiredByDefault: false");
    expect(markdown).toContain("Keep Java and mini-kv progress parallel");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
