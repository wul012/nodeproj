import { describe, expect, it } from "vitest";

import {
  buildApp,
  cleanupHandoffRouteCounts,
  completeHeaders,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadTestConfig,
} from "./support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.js";

describe("Java/mini-kv route catalog cleanup stability closeout handoff audit routes", () => {
  it("exposes twenty-version run closeout through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout.v1",
        closeoutState: "ready",
        activeNodeVersion: "Node v522",
        sourceNodeVersion: "Node v521",
        readyForRouteCatalogCleanupTwentyVersionRunCloseout: true,
        closeoutOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        summary: {
          completedVersionCount: 16,
          remainingVersionCount: 15,
          routeCount: cleanupHandoffRouteCounts.twentyVersionRunCloseout,
          javaMiniKvDomainRouteCount: 53,
          cleanupHandoffRouteGroupRouteCount: 19,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup twenty-version run closeout");
      expect(markdown.body).toContain("remainingVersionCount: 15");
      expect(markdown.body).toContain("javaMiniKvParallelRecommended: true");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes twenty-version run closeout archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v525",
        sourceNodeVersion: "Node v524",
        readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceReport: {
          activeNodeVersion: "Node v522",
          sourceNodeVersion: "Node v521",
          ready: true,
          checkCount: 9,
          passedCheckCount: 9,
          completedVersionCount: 16,
          remainingVersionCount: 15,
          routeCount: cleanupHandoffRouteCounts.twentyVersionRunCloseout,
          javaMiniKvDomainRouteCount: 53,
          cleanupHandoffRouteGroupRouteCount: 19,
        },
        summary: {
          archiveFileCount: 3,
          presentArchiveFileCount: 3,
          checkCount: 16,
          passedCheckCount: 16,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup twenty-version run closeout archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
      expect(markdown.body).toContain("runtimeBoundaryClosed: true");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes expanded stability closeout through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-expanded-stability-closeout.v1",
        closeoutState: "ready",
        activeNodeVersion: "Node v527",
        sourceNodeVersion: "Node v526",
        readyForRouteCatalogCleanupExpandedStabilityCloseout: true,
        closeoutOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        closedGate: {
          versionSpan: "v522-v526",
          archiveVerifierReady: true,
          archiveVerifierCheckCount: 16,
          archiveVerifierPassedCheckCount: 16,
        },
        summary: {
          plannedSegmentVersionCount: 5,
          routeCount: cleanupHandoffRouteCounts.expandedStabilityCloseout,
          javaMiniKvDomainRouteCount: 55,
          cleanupHandoffRouteGroupRouteCount: 21,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup expanded stability closeout");
      expect(markdown.body).toContain("plannedSegmentVersionCount: 5");
      expect(markdown.body).toContain("javaMiniKvParallelRecommended: true");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes expanded stability closeout archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-expanded-stability-closeout-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v530",
        sourceNodeVersion: "Node v529",
        readyForRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceReport: {
          activeNodeVersion: "Node v527",
          sourceNodeVersion: "Node v526",
          ready: true,
          checkCount: 9,
          passedCheckCount: 9,
          plannedSegmentVersionCount: 5,
          routeCount: cleanupHandoffRouteCounts.expandedStabilityCloseout,
          javaMiniKvDomainRouteCount: 55,
          cleanupHandoffRouteGroupRouteCount: 21,
        },
        summary: {
          archiveFileCount: 3,
          presentArchiveFileCount: 3,
          checkCount: 16,
          passedCheckCount: 16,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup expanded stability closeout archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
      expect(markdown.body).toContain("runtimeBoundaryClosed: true");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes CI/catalog health closeout through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout.v1",
        closeoutState: "ready",
        activeNodeVersion: "Node v532",
        sourceNodeVersion: "Node v531",
        readyForRouteCatalogCleanupCiCatalogHealthCloseout: true,
        closeoutOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        closedGate: {
          versionSpan: "v527-v531",
          archiveVerifierReady: true,
          archiveVerifierCheckCount: 16,
          archiveVerifierPassedCheckCount: 16,
        },
        routeQuality: {
          ready: true,
          routeRegistrationCount: 221,
          routeGroupCount: 50,
        },
        summary: {
          plannedSegmentVersionCount: 5,
          routeCount: cleanupHandoffRouteCounts.ciCatalogHealthCloseout,
          javaMiniKvDomainRouteCount: 57,
          cleanupHandoffRouteGroupRouteCount: 23,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup CI/catalog health closeout");
      expect(markdown.body).toContain("ciObservationHasNoNewFailure: true");
      expect(markdown.body).toContain("javaMiniKvParallelRecommended: true");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes CI/catalog health closeout archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v535",
        sourceNodeVersion: "Node v534",
        readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        sourceReport: {
          activeNodeVersion: "Node v532",
          sourceNodeVersion: "Node v531",
          ready: true,
          checkCount: 10,
          passedCheckCount: 10,
          plannedSegmentVersionCount: 5,
          routeCount: cleanupHandoffRouteCounts.ciCatalogHealthCloseout,
          javaMiniKvDomainRouteCount: 57,
          cleanupHandoffRouteGroupRouteCount: 23,
          routeQualityReady: true,
          routeQualityRegistrationCount: 221,
          ciNoNewFailureObserved: true,
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
        .toContain("# Java / mini-kv route catalog cleanup CI/catalog health closeout archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
      expect(markdown.body).toContain("runtimeBoundaryClosed: true");
    } finally {
      await app.close();
    }
  }, 60000);

});
