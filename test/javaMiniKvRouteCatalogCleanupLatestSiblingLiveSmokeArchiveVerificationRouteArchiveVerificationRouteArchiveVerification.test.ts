import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.js";
import {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationRenderer.js";

describe("Java/mini-kv route catalog cleanup latest sibling live smoke route archive verifier route archive verification", () => {
  it("verifies the v552 route archive and closed runtime boundaries", () => {
    const verification =
      loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification({
        config: loadTestConfig(),
      });

    expect(verification).toMatchObject({
      profileVersion:
        "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification-route-archive-verification.v1",
      archiveVerificationState: "ready",
      activeNodeVersion: "Node v553",
      sourceNodeVersion: "Node v552",
      readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification:
        true,
      archiveVerificationOnly: true,
      startsJavaService: false,
      startsMiniKvService: false,
      executionAllowed: false,
      sourceRouteArchive: {
        statusCodeJson: 200,
        statusCodeMarkdown: 200,
        ready: true,
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v549",
        sourceNodeVersion: "Node v548",
        checkCount: 18,
        passedCheckCount: 18,
        sourceArchiveRouteCount: 226,
        sourceArchiveJavaMiniKvRouteCount: 62,
        sourceArchiveCleanupHandoffRouteCount: 28,
        archivedRouteCatalogRouteCount: 227,
        archivedRouteCatalogJavaMiniKvRouteCount: 63,
        archivedRouteCatalogCleanupHandoffRouteCount: 29,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 18,
        sourcePassedCheckCount: 18,
      },
    });
    expect(verification.summary.checkCount).toBe(verification.summary.passedCheckCount);
    expect(Object.values(verification.checks).every(Boolean)).toBe(true);
    expect(verification.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(verification.archiveFiles.summary.sha256).toMatch(/^[a-f0-9]{64}$/);

    const markdown =
      renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationMarkdown(
        verification,
      );
    expect(markdown).toContain("summaryDigestsMatchFiles: true");
    expect(markdown).toContain("sourceArchiveCountsMatchV548Baseline: true");
    expect(markdown).toContain("archivedRouteCatalogCountsMatchV552Baseline: true");
    expect(markdown).toContain("currentRouteCatalogCoversArchivedRouteCatalog: true");
    expect(markdown).toContain("noRuntimeAuthorityOpened: true");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
