import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification.js";

describe("Java/mini-kv consumer readiness batch closeout archive verification", () => {
  it("verifies the v498 archived JSON and Markdown route outputs", () => {
    const profile = loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-archive-verification.v1",
      activeNodeVersion: "Node v499",
      sourceNodeVersion: "Node v498",
      archiveVerificationState: "ready",
      readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout.v1",
        activeNodeVersion: "Node v496",
        sourceNodeVersion: "Node v495",
        ready: true,
        checkCount: 15,
        passedCheckCount: 15,
        closedVersionCount: 5,
        routeCountAtCloseout: 207,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 15,
        sourcePassedCheckCount: 15,
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
