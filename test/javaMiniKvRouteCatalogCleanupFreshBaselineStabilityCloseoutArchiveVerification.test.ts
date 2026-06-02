import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification.js";

describe("Java/mini-kv fresh baseline stability closeout archive verification", () => {
  it("verifies the v519 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-archive-verification.v1",
      activeNodeVersion: "Node v520",
      sourceNodeVersion: "Node v519",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout.v1",
        activeNodeVersion: "Node v517",
        sourceNodeVersion: "Node v516",
        ready: true,
        checkCount: 10,
        passedCheckCount: 10,
        routeCount: 215,
        javaMiniKvDomainRouteCount: 51,
        cleanupHandoffRouteGroupRouteCount: 17,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 10,
        sourcePassedCheckCount: 10,
      },
    });
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(Object.values(profile.checks).every(Boolean)).toBe(true);
    expect(profile.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveFiles.markdown.sha256).toMatch(/^[a-f0-9]{64}$/);
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
