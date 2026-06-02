import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification.js";
import {
  renderJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerificationMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerificationRenderer.js";

describe("Java/mini-kv route catalog cleanup CI/catalog health closeout archive verification", () => {
  it("verifies the v534 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-archive-verification.v1",
      activeNodeVersion: "Node v535",
      sourceNodeVersion: "Node v534",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout.v1",
        activeNodeVersion: "Node v532",
        sourceNodeVersion: "Node v531",
        ready: true,
        checkCount: 10,
        passedCheckCount: 10,
        plannedSegmentVersionCount: 5,
        routeCount: 221,
        javaMiniKvDomainRouteCount: 57,
        cleanupHandoffRouteGroupRouteCount: 23,
        routeQualityReady: true,
        routeQualityRegistrationCount: 221,
        ciNoNewFailureObserved: true,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 10,
        sourcePassedCheckCount: 10,
        plannedSegmentVersionCount: 5,
      },
    });
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(Object.values(profile.checks).every(Boolean)).toBe(true);
    expect(profile.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveFiles.markdown.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(renderJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerificationMarkdown(profile))
      .toContain("jsonCiObservationValid: true");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
