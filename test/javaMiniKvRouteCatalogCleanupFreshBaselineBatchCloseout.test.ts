import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout.js";
import {
  renderJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutRenderer.js";

describe("Java/mini-kv route catalog cleanup fresh baseline batch closeout", () => {
  it("closes the v507-v511 fresh baseline report/archive/verifier route chain", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout({
      config: loadTestConfig(),
    });

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout.v1",
      closeoutState: "ready",
      activeNodeVersion: "Node v512",
      sourceNodeVersion: "Node v511",
      readyForRouteCatalogCleanupFreshBaselineBatchCloseout: true,
      closeoutOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      crossProjectMode: {
        java: "recommended-parallel-clean-v239-frozen",
        miniKv: "recommended-parallel-clean-v220-frozen",
        nodeWaitsForFreshSiblingEvidence: false,
      },
      closedVersions: ["v507", "v508", "v509", "v510", "v511"],
      routeCatalog: {
        routeCount: 213,
        javaMiniKvDomainRouteCount: 49,
        cleanupHandoffRouteGroupRouteCount: 15,
      },
      sourceArchive: {
        version: "v509",
        ready: true,
        checkCount: 9,
        passedCheckCount: 9,
        activeNodeVersion: "Node v508",
        sourceNodeVersion: "Node v507",
        javaLatestCleanVersion: "Java v239",
        miniKvLatestCleanVersion: "v220",
        routeCount: 212,
        javaMiniKvDomainRouteCount: 48,
        cleanupHandoffRouteGroupRouteCount: 14,
      },
      archiveVerification: {
        ready: true,
        activeNodeVersion: "Node v510",
        sourceNodeVersion: "Node v509",
      },
      summary: {
        closedVersionCount: 5,
        routeCount: 213,
        javaMiniKvDomainRouteCount: 49,
        cleanupHandoffRouteGroupRouteCount: 15,
        sourceArchiveCheckCount: 9,
        sourceArchivePassedCheckCount: 9,
      },
    });
    expect(closeout.summary.fileCount).toBe(closeout.summary.presentFileCount);
    expect(closeout.summary.checkCount).toBe(closeout.summary.passedCheckCount);
    expect(Object.values(closeout.checks).every(Boolean)).toBe(true);
    expect(renderJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutMarkdown(closeout))
      .toContain("routeCount: 213");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
