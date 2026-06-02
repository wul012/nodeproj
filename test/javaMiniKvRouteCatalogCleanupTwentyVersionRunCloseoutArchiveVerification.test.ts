import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification.js";
import {
  renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationRenderer.js";

describe("Java/mini-kv route catalog cleanup twenty-version run closeout archive verification", () => {
  it("verifies the v524 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-archive-verification.v1",
      activeNodeVersion: "Node v525",
      sourceNodeVersion: "Node v524",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout.v1",
        activeNodeVersion: "Node v522",
        sourceNodeVersion: "Node v521",
        ready: true,
        checkCount: 9,
        passedCheckCount: 9,
        completedVersionCount: 16,
        remainingVersionCount: 15,
        routeCount: 217,
        javaMiniKvDomainRouteCount: 53,
        cleanupHandoffRouteGroupRouteCount: 19,
        stabilityVerifierReady: true,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 9,
        sourcePassedCheckCount: 9,
        completedVersionCount: 16,
        remainingVersionCount: 15,
      },
    });
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(Object.values(profile.checks).every(Boolean)).toBe(true);
    expect(profile.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archiveFiles.markdown.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationMarkdown(profile))
      .toContain("runtimeBoundaryClosed: true");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
