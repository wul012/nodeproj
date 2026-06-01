import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.js";

describe("Java/mini-kv consumer readiness evidence archive verification", () => {
  it("verifies the v493 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification.v1",
      activeNodeVersion: "Node v494",
      sourceNodeVersion: "Node v493",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report.v1",
        activeNodeVersion: "Node v492",
        sourceNodeVersion: "Node v491",
        ready: true,
        checkCount: 21,
        passedCheckCount: 21,
        javaGuardCount: 20,
        miniKvLatestVersionedRelease: "v209",
        miniKvLatestObservedAuditRelease: "v210",
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 21,
        sourcePassedCheckCount: 21,
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
