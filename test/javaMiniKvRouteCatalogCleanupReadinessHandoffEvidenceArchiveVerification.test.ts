import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerification.js";

describe("Java/mini-kv readiness handoff evidence archive verification", () => {
  it("verifies the v503 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-archive-verification.v1",
      activeNodeVersion: "Node v504",
      sourceNodeVersion: "Node v503",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-report.v1",
        activeNodeVersion: "Node v502",
        sourceNodeVersion: "Node v501",
        ready: true,
        checkCount: 16,
        passedCheckCount: 16,
        javaLatestCleanVersion: "Java v231",
        miniKvLatestCleanVersion: "v212",
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
