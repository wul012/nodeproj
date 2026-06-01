import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.js";

describe("Java/mini-kv current evidence archive verification", () => {
  it("verifies the v483 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-archive-verification.v1",
      activeNodeVersion: "Node v484",
      sourceNodeVersion: "Node v483",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-report.v1",
        activeNodeVersion: "Node v482",
        sourceNodeVersion: "Node v481",
        ready: true,
        checkCount: 18,
        passedCheckCount: 18,
        javaCatalogedArtifactCount: 6,
        miniKvV200ReleaseVersion: "v200",
        miniKvV200BoundaryGroupCount: 39,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 18,
        sourcePassedCheckCount: 18,
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
