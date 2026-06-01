import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification.js";

describe("Java/mini-kv verification checklist evidence archive verification", () => {
  it("verifies the v488 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-archive-verification.v1",
      activeNodeVersion: "Node v489",
      sourceNodeVersion: "Node v488",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report.v1",
        activeNodeVersion: "Node v487",
        sourceNodeVersion: "Node v486",
        ready: true,
        checkCount: 18,
        passedCheckCount: 18,
        javaVerificationItemCount: 7,
        miniKvV201ReleaseVersion: "v201",
        miniKvV201BoundaryGroupCount: 40,
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
