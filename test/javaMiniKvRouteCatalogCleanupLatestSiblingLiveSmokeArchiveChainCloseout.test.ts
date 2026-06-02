import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup latest sibling live smoke archive chain closeout", () => {
  it("closes the v545-v553 archive verifier chain without opening runtime authority", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-chain-closeout.v1",
      activeNodeVersion: "Node v554",
      sourceNodeVersion: "Node v553",
      closeoutState: "ready",
      readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout: true,
      closeoutOnly: true,
      exposesNewRoute: false,
      startsJavaService: false,
      startsMiniKvService: false,
      executionAllowed: false,
      crossProjectMode: {
        java: "recommended-parallel",
        miniKv: "recommended-parallel",
        nodeWaitsForFreshSiblingEvidence: false,
        siblingEvidenceMode: "archived-fixture-only",
      },
      latestVerifier: {
        ready: true,
        activeNodeVersion: "Node v553",
        sourceNodeVersion: "Node v552",
        sourceArchiveRouteCount: 226,
        sourceArchiveJavaMiniKvRouteCount: 62,
        sourceArchiveCleanupHandoffRouteCount: 28,
        archivedRouteCatalogRouteCount: 227,
        archivedRouteCatalogJavaMiniKvRouteCount: 63,
        archivedRouteCatalogCleanupHandoffRouteCount: 29,
      },
      currentRouteCatalog: {
        groupCount: 50,
        routeCount: 227,
        javaMiniKvDomainRouteCount: 63,
        cleanupHandoffRouteGroupRouteCount: 29,
      },
      summary: {
        completedNodeVersionCount: 9,
        routeCount: 227,
        javaMiniKvDomainRouteCount: 63,
        cleanupHandoffRouteGroupRouteCount: 29,
      },
    });
    expect(closeout.completedNodeVersions).toEqual([
      "v545",
      "v546",
      "v547",
      "v548",
      "v549",
      "v550",
      "v551",
      "v552",
      "v553",
    ]);
    expect(closeout.latestVerifier.checkCount).toBe(closeout.latestVerifier.passedCheckCount);
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);

    const markdown = renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutMarkdown(closeout);
    expect(markdown).toContain("chainGrowthStoppedUnlessPublicConsumerAppears: true");
    expect(markdown).toContain("Stop the latest sibling live-smoke archive-verifier chain");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
