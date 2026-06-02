import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification.js";
import {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationRenderer.js";

describe("Java/mini-kv route catalog cleanup latest sibling evidence archive verification", () => {
  it("verifies the v541 archive and preserves closed runtime boundaries", () => {
    const verification = loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification({
      config: loadTestConfig(),
    });

    expect(verification).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification.v1",
      archiveVerificationState: "ready",
      activeNodeVersion: "Node v542",
      sourceNodeVersion: "Node v541",
      readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification: true,
      archiveVerificationOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sourceReport: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report.v1",
        activeNodeVersion: "Node v540",
        sourceNodeVersion: "Node v538",
        ciStabilizationVersion: "Node v539",
        ready: true,
        reportState: "ready",
        checkCount: 13,
        passedCheckCount: 13,
        javaLatestCleanVersion: "Java v274",
        miniKvLatestCleanVersion: "v247",
        miniKvEvidenceDigest: "fnv1a64:9fb71e13c517fff8",
      },
      routeCatalog: {
        groupCount: 50,
        routeCount: 224,
        javaMiniKvDomainRouteCount: 60,
        cleanupHandoffRouteGroupRouteCount: 26,
      },
      summary: {
        archiveFileCount: 3,
        presentArchiveFileCount: 3,
        sourceCheckCount: 13,
        sourcePassedCheckCount: 13,
      },
    });
    expect(verification.summary.checkCount).toBe(verification.summary.passedCheckCount);
    expect(Object.values(verification.checks).every(Boolean)).toBe(true);
    expect(verification.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(verification.archiveFiles.markdown.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationMarkdown(verification))
      .toContain("summaryDigestsMatchFiles: true");
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
