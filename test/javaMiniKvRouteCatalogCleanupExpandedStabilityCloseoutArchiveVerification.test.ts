import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification.js";
import {
  renderJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerificationMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerificationRenderer.js";

describe("Java/mini-kv route catalog cleanup expanded stability closeout archive verification", () => {
  it("verifies the v529 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-expanded-stability-closeout-archive-verification.v1",
      activeNodeVersion: "Node v530",
      sourceNodeVersion: "Node v529",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-expanded-stability-closeout.v1",
        activeNodeVersion: "Node v527",
        sourceNodeVersion: "Node v526",
        ready: true,
        checkCount: 9,
        passedCheckCount: 9,
        plannedSegmentVersionCount: 5,
        routeCount: 219,
        javaMiniKvDomainRouteCount: 55,
        cleanupHandoffRouteGroupRouteCount: 21,
        closedGateReady: true,
        closedGateCheckCount: 16,
        closedGatePassedCheckCount: 16,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 9,
        sourcePassedCheckCount: 9,
        plannedSegmentVersionCount: 5,
      },
    });
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(Object.values(profile.checks).every(Boolean)).toBe(true);
    expect(profile.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveFiles.markdown.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(renderJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerificationMarkdown(profile))
      .toContain("jsonClosedGateReady: true");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
