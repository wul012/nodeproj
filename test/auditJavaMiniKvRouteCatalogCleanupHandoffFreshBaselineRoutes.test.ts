import { describe, expect, it } from "vitest";

import {
  buildApp,
  cleanupHandoffRouteCounts,
  completeHeaders,
  expectMarkdownRouteCount,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadTestConfig,
} from "./support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.js";

describe("Java/mini-kv route catalog cleanup fresh baseline handoff audit routes", () => {
  it("exposes fresh baseline evidence through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v508",
        sourceNodeVersion: "Node v507",
        readyForRouteCatalogCleanupFreshBaselineEvidenceReport: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        summary: {
          fileCount: 16,
          presentFileCount: 16,
          checkCount: 9,
          passedCheckCount: 9,
          javaLatestCleanVersion: "Java v239",
          miniKvLatestCleanVersion: "v220",
        },
        evidence: {
          javaReceipts: expect.arrayContaining([
            expect.objectContaining({
              version: "Java v239",
              scope: "v1 contract consumer readiness handoff completion",
            }),
          ]),
          miniKvReleases: expect.arrayContaining([
            expect.objectContaining({
              releaseVersion: "v220",
              sourceFrozenReleaseVersion: "v219",
              stageSequence: 20,
            }),
          ]),
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup fresh baseline evidence report");
      expect(markdown.body).toContain("Java v232-v239 Readiness Handoff Receipts");
      expect(markdown.body).toContain("mini-kv v213-v220 Post-Closeout Continuity");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes fresh baseline archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v510",
        sourceNodeVersion: "Node v509",
        readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceReport: {
          activeNodeVersion: "Node v508",
          sourceNodeVersion: "Node v507",
          ready: true,
          checkCount: 9,
          passedCheckCount: 9,
          javaLatestCleanVersion: "Java v239",
          miniKvLatestCleanVersion: "v220",
        },
        routeCatalog: {
          routeCount: cleanupHandoffRouteCounts.freshBaselineArchiveVerification,
          javaMiniKvDomainRouteCount: 48,
          cleanupHandoffRouteGroupRouteCount: 14,
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
        .toContain("# Java / mini-kv route catalog cleanup fresh baseline evidence archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
      expectMarkdownRouteCount(markdown.body, cleanupHandoffRouteCounts.freshBaselineArchiveVerification);
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes fresh baseline batch closeout through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout.v1",
        closeoutState: "ready",
        activeNodeVersion: "Node v512",
        sourceNodeVersion: "Node v511",
        readyForRouteCatalogCleanupFreshBaselineBatchCloseout: true,
        closeoutOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        routeCatalog: {
          routeCount: cleanupHandoffRouteCounts.freshBaselineBatchCloseout,
          javaMiniKvDomainRouteCount: 49,
          cleanupHandoffRouteGroupRouteCount: 15,
        },
        sourceArchive: {
          version: "v509",
          ready: true,
          checkCount: 9,
          passedCheckCount: 9,
        },
        summary: {
          closedVersionCount: 5,
          routeCount: cleanupHandoffRouteCounts.freshBaselineBatchCloseout,
          javaMiniKvDomainRouteCount: 49,
          cleanupHandoffRouteGroupRouteCount: 15,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup fresh baseline batch closeout");
      expectMarkdownRouteCount(markdown.body, cleanupHandoffRouteCounts.freshBaselineBatchCloseout);
      expect(markdown.body).toContain("v510VerifierReady: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes fresh baseline batch closeout archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v515",
        sourceNodeVersion: "Node v514",
        readyForRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceReport: {
          activeNodeVersion: "Node v512",
          sourceNodeVersion: "Node v511",
          ready: true,
          checkCount: 14,
          passedCheckCount: 14,
          routeCount: cleanupHandoffRouteCounts.freshBaselineBatchCloseout,
          javaMiniKvDomainRouteCount: 49,
          cleanupHandoffRouteGroupRouteCount: 15,
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
        .toContain("# Java / mini-kv route catalog cleanup fresh baseline batch closeout archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
      expect(markdown.body).toContain("jsonRouteCatalogSnapshotValid: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes fresh baseline stability closeout through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout.v1",
        closeoutState: "ready",
        activeNodeVersion: "Node v517",
        sourceNodeVersion: "Node v516",
        readyForRouteCatalogCleanupFreshBaselineStabilityCloseout: true,
        closeoutOnly: true,
        executionAllowed: false,
        routeCatalog: {
          routeCount: cleanupHandoffRouteCounts.freshBaselineStabilityCloseout,
          javaMiniKvDomainRouteCount: 51,
          cleanupHandoffRouteGroupRouteCount: 17,
        },
        sourceArchive: {
          version: "v514",
          ready: true,
          checkCount: 14,
          passedCheckCount: 14,
        },
        summary: {
          closedVersionCount: 5,
          routeCount: cleanupHandoffRouteCounts.freshBaselineStabilityCloseout,
          javaMiniKvDomainRouteCount: 51,
          cleanupHandoffRouteGroupRouteCount: 17,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup fresh baseline stability closeout");
      expectMarkdownRouteCount(markdown.body, cleanupHandoffRouteCounts.freshBaselineStabilityCloseout);
      expect(markdown.body).toContain("archiveVerifierReady: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes fresh baseline stability archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v520",
        sourceNodeVersion: "Node v519",
        readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceReport: {
          activeNodeVersion: "Node v517",
          sourceNodeVersion: "Node v516",
          ready: true,
          checkCount: 10,
          passedCheckCount: 10,
          routeCount: cleanupHandoffRouteCounts.freshBaselineStabilityCloseout,
          javaMiniKvDomainRouteCount: 51,
          cleanupHandoffRouteGroupRouteCount: 17,
        },
        summary: {
          archiveFileCount: 3,
          presentArchiveFileCount: 3,
          checkCount: 15,
          passedCheckCount: 15,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup fresh baseline stability closeout archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
      expect(markdown.body).toContain("jsonRouteCatalogSnapshotValid: true");
    } finally {
      await app.close();
    }
  }, 180_000);

});
