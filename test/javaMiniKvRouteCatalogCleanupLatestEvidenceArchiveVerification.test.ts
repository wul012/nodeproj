import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification.js";

describe("Java/mini-kv latest evidence archive verification", () => {
  it("verifies the v477 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-latest-evidence-archive-verification.v1",
      activeNodeVersion: "Node v478",
      sourceNodeVersion: "Node v477",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupLatestEvidenceArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-evidence-report.v1",
        activeNodeVersion: "Node v476",
        sourceNodeVersion: "Node v475",
        ready: true,
        checkCount: 16,
        passedCheckCount: 16,
        javaEndpointCatalogCount: 6,
        miniKvReleaseVersion: "v193",
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 16,
        sourcePassedCheckCount: 16,
      },
    });
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
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
