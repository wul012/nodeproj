import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification.js";

describe("Java/mini-kv fresh baseline batch closeout archive verification", () => {
  it("verifies the v514 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout-archive-verification.v1",
      activeNodeVersion: "Node v515",
      sourceNodeVersion: "Node v514",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout.v1",
        activeNodeVersion: "Node v512",
        sourceNodeVersion: "Node v511",
        ready: true,
        checkCount: 14,
        passedCheckCount: 14,
        closedVersionCount: 5,
        routeCount: 213,
        javaMiniKvDomainRouteCount: 49,
        cleanupHandoffRouteGroupRouteCount: 15,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 14,
        sourcePassedCheckCount: 14,
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
