import { describe, expect, it } from "vitest";

import {
  buildApp,
  cleanupHandoffRouteCounts,
  completeHeaders,
  expectMarkdownRouteCount,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_SIBLING_WORKSPACE_AVAILABILITY_CLOSEOUT_ROUTE_PATH,
  loadTestConfig,
} from "./support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.js";

describe("Java/mini-kv route catalog cleanup latest sibling handoff audit routes", () => {
  it("exposes latest Java v274 and mini-kv v247 sibling evidence through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v540",
        sourceNodeVersion: "Node v538",
        ciStabilizationVersion: "Node v539",
        readyForRouteCatalogCleanupLatestSiblingEvidenceReport: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        summary: {
          fileCount: 4,
          presentFileCount: 4,
          checkCount: 13,
          passedCheckCount: 13,
          javaLatestCleanVersion: "Java v274",
          miniKvLatestCleanVersion: "v247",
          currentRouteCount: 224,
          currentJavaMiniKvDomainRouteCount: 60,
          currentCleanupHandoffRouteGroupRouteCount: 26,
        },
        routeCatalog: {
          routeCount: cleanupHandoffRouteCounts.latestSiblingEvidence,
          javaMiniKvDomainRouteCount: 60,
          cleanupHandoffRouteGroupRouteCount: 26,
        },
        evidence: {
          javaReceipt: {
            version: "Java v274",
            boundaryRuntimeClosed: true,
          },
          miniKvRelease: {
            releaseVersion: "v247",
            evidenceDigest: "fnv1a64:9fb71e13c517fff8",
            runtimeBoundaryClosed: true,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup latest sibling evidence report");
      expect(markdown.body).toContain("Java v274 Receipt");
      expect(markdown.body).toContain("mini-kv v247 Release");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes latest sibling evidence archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v542",
        sourceNodeVersion: "Node v541",
        readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceReport: {
          activeNodeVersion: "Node v540",
          sourceNodeVersion: "Node v538",
          ciStabilizationVersion: "Node v539",
          ready: true,
          checkCount: 13,
          passedCheckCount: 13,
          javaLatestCleanVersion: "Java v274",
          miniKvLatestCleanVersion: "v247",
        },
        routeCatalog: {
          routeCount: cleanupHandoffRouteCounts.latestSiblingEvidence,
          javaMiniKvDomainRouteCount: 60,
          cleanupHandoffRouteGroupRouteCount: 26,
        },
        summary: {
          archiveFileCount: 3,
          presentArchiveFileCount: 3,
          checkCount: 17,
          passedCheckCount: 17,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup latest sibling evidence archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
      expectMarkdownRouteCount(markdown.body, cleanupHandoffRouteCounts.latestSiblingEvidence);
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes latest sibling live smoke archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v546",
        sourceNodeVersion: "Node v545",
        readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceLiveSmoke: {
          activeNodeVersion: "Node v545",
          sourceNodeVersion: "Node v544",
          ready: true,
          recordCount: 9,
          passedRecordCount: 9,
          checkCount: 14,
          passedCheckCount: 14,
          cleanupPassed: true,
          afterListeningSocketCount: 0,
        },
        recordSummary: {
          nodeRecordCount: 3,
          javaRecordCount: 2,
          miniKvRecordCount: 4,
          proxyBypassHttpRecordCount: 5,
        },
        summary: {
          archiveFileCount: 4,
          presentArchiveFileCount: 4,
          checkCount: 24,
          passedCheckCount: 24,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup latest sibling live smoke archive verification");
      expect(markdown.body).toContain("localProxyBypassRecorded: true");
      expect(markdown.body).toContain("cleanupProofPassed: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes latest sibling live smoke archive verification route archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v549",
        sourceNodeVersion: "Node v548",
        readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceRouteArchive: {
          ready: true,
          statusCodeJson: 200,
          statusCodeMarkdown: 200,
          routeCount: cleanupHandoffRouteCounts.latestSiblingLiveSmokeRouteArchiveVerification,
          javaMiniKvDomainRouteCount: 62,
          cleanupHandoffRouteGroupRouteCount: 28,
        },
        summary: {
          archiveFileCount: 3,
          presentArchiveFileCount: 3,
          sourceCheckCount: 24,
          sourcePassedCheckCount: 24,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification");
      expect(markdown.body).toContain("summaryRouteCatalogCountsMatchSourceArchive: true");
      expect(markdown.body).toContain("currentRouteCatalogCoversSourceArchive: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes sibling workspace availability closeout through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_SIBLING_WORKSPACE_AVAILABILITY_CLOSEOUT_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_SIBLING_WORKSPACE_AVAILABILITY_CLOSEOUT_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-sibling-workspace-availability-closeout.v1",
        closeoutState: "ready",
        activeNodeVersion: "Node v556",
        sourceNodeVersion: "Node v555",
        readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout: true,
        closeoutOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        siblingWorkspaceMode: {
          localLiveSiblingReposBundledInWorkspace: false,
          liveSiblingStartupRequiredByDefault: false,
          historicalFixturesAvailable: true,
          nodeMayUseLiveSiblingReposWhenProvided: true,
        },
        upstreamBoundary: {
          java: "recommended-parallel",
          miniKv: "recommended-parallel",
          nodeWaitsForFreshSiblingEvidence: false,
          defaultEvidenceMode: "historical-fixture",
        },
        summary: {
          historicalFixtureRootCount: 2,
          presentHistoricalFixtureRootCount: 2,
          localLiveSiblingRepoRequiredCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup sibling workspace availability closeout");
      expect(markdown.body).toContain("liveSiblingStartupRequiredByDefault: false");
      expect(markdown.body).toContain("Keep Java and mini-kv progress parallel");
    } finally {
      await app.close();
    }
  }, 180_000);
});
