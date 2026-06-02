import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification.js";

describe("Java/mini-kv fresh baseline evidence archive verification", () => {
  it("verifies the v509 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification.v1",
      activeNodeVersion: "Node v510",
      sourceNodeVersion: "Node v509",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report.v1",
        activeNodeVersion: "Node v508",
        sourceNodeVersion: "Node v507",
        ready: true,
        checkCount: 9,
        passedCheckCount: 9,
        javaLatestCleanVersion: "Java v239",
        miniKvLatestCleanVersion: "v220",
      },
      routeCatalog: {
        routeCount: 212,
        javaMiniKvDomainRouteCount: 48,
        cleanupHandoffRouteGroupRouteCount: 14,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 9,
        sourcePassedCheckCount: 9,
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
