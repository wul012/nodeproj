import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification.js";
import {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRenderer.js";

describe("Java/mini-kv route catalog cleanup latest sibling live smoke archive verification", () => {
  it("verifies the v545 live smoke archive and cleanup proof", () => {
    const verification = loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification({
      config: loadTestConfig(),
    });

    expect(verification).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1",
      archiveVerificationState: "ready",
      activeNodeVersion: "Node v546",
      sourceNodeVersion: "Node v545",
      readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification: true,
      archiveVerificationOnly: true,
      startsJavaService: false,
      startsMiniKvService: false,
      executionAllowed: false,
      sourceLiveSmoke: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke.v1",
        activeNodeVersion: "Node v545",
        sourceNodeVersion: "Node v544",
        smokeState: "ready",
        ready: true,
        startsJavaService: true,
        startsMiniKvService: true,
        mutatesJavaState: false,
        mutatesMiniKvState: false,
        connectsManagedAudit: false,
        localHttpProxyBypass: "--noproxy *",
        recordCount: 9,
        passedRecordCount: 9,
        failedRecordCount: 0,
        checkCount: 14,
        passedCheckCount: 14,
        cleanupPassed: true,
        afterListeningSocketCount: 0,
      },
      recordSummary: {
        nodeRecordCount: 3,
        javaRecordCount: 2,
        miniKvRecordCount: 4,
        httpRecordCount: 5,
        tcpInlineRecordCount: 4,
        readOnlyRecordCount: 9,
        mutatingRecordCount: 0,
        proxyBypassHttpRecordCount: 5,
        miniKvCommands: ["HEALTH", "COMMANDSJSON", "SHARDJSON", "QUIT"],
      },
      cleanupProof: {
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-cleanup-proof.v1",
        startedProcessCount: 4,
        beforeListeningSocketCount: 0,
        afterListeningSocketCount: 0,
        distRemoved: true,
        cleanupPassed: true,
      },
      summary: {
        archiveFileCount: 4,
        presentArchiveFileCount: 4,
        sourceRecordCount: 9,
        sourcePassedRecordCount: 9,
        sourceCheckCount: 14,
        sourcePassedCheckCount: 14,
      },
    });
    expect(verification.cleanupProof.startedProjects).toEqual(
      expect.arrayContaining(["mini-kv", "java-maven", "java-runtime", "node"]),
    );
    expect(verification.cleanupProof.startedPorts).toEqual(expect.arrayContaining([4190, 8080, 6524]));
    expect(verification.recordSummary.passedRecordIds).toHaveLength(9);
    expect(Object.values(verification.checks).every(Boolean)).toBe(true);
    expect(verification.archiveFiles.json.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(verification.archiveFiles.cleanupProof.sha256).toMatch(/^[a-f0-9]{64}$/);

    const markdown = renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationMarkdown(verification);
    expect(markdown).toContain("localProxyBypassRecorded: true");
    expect(markdown).toContain("cleanupProofPassed: true");
    expect(markdown).toContain('miniKvCommands: ["HEALTH","COMMANDSJSON","SHARDJSON","QUIT"]');
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
