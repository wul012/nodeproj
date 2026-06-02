import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.js";
import {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRenderer.js";

describe("Java/mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification", () => {
  it("verifies the v548 route archive and closed runtime boundaries", () => {
    const verification =
      loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification({
        config: loadTestConfig(),
      });

    expect(verification).toMatchObject({
      profileVersion:
        "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification.v1",
      archiveVerificationState: "ready",
      activeNodeVersion: "Node v549",
      sourceNodeVersion: "Node v548",
      readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification: true,
      archiveVerificationOnly: true,
      startsJavaService: false,
      startsMiniKvService: false,
      executionAllowed: false,
      sourceRouteArchive: {
        ready: true,
        archiveVerificationState: "ready",
        statusCodeJson: 200,
        statusCodeMarkdown: 200,
        activeNodeVersion: "Node v546",
        sourceNodeVersion: "Node v545",
        checkCount: 24,
        passedCheckCount: 24,
        routeCount: 226,
        javaMiniKvDomainRouteCount: 62,
        cleanupHandoffRouteGroupRouteCount: 28,
      },
      sourceVerifier: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1",
        activeNodeVersion: "Node v546",
        sourceNodeVersion: "Node v545",
        ready: true,
        archiveVerificationState: "ready",
        checkCount: 24,
        passedCheckCount: 24,
        sourceRecordCount: 9,
        sourcePassedRecordCount: 9,
        sourceCleanupPassed: true,
        sourceAfterListeningSocketCount: 0,
        localHttpProxyBypass: "--noproxy *",
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 24,
        sourcePassedCheckCount: 24,
      },
    });
    expect(verification.summary.checkCount).toBe(verification.summary.passedCheckCount);
    expect(Object.values(verification.checks).every(Boolean)).toBe(true);
    expect(verification.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(verification.archiveFiles.summary.sha256).toMatch(/^[a-f0-9]{64}$/);

    const markdown =
      renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationMarkdown(
        verification,
      );
    expect(markdown).toContain("summaryDigestsMatchFiles: true");
    expect(markdown).toContain("summaryRouteCatalogCountsMatchCurrent: true");
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
