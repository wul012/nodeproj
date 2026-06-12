import { describe, expect, it } from "vitest";

import {
  buildApp,
  cleanupHandoffRouteCounts,
  completeHeaders,
  expectMarkdownRouteCount,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH,
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadTestConfig,
} from "./support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.js";

describe("Java/mini-kv route catalog cleanup consumer readiness handoff audit routes", () => {
  it("exposes consumer readiness evidence through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v492",
        sourceNodeVersion: "Node v491",
        readyForRouteCatalogCleanupConsumerReadinessEvidenceReport: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        summary: {
          fileCount: 15,
          presentFileCount: 15,
          checkCount: 21,
          passedCheckCount: 21,
          javaGuardCount: 20,
          miniKvLatestVersionedRelease: "v209",
          miniKvLatestObservedAuditRelease: "v210",
        },
        evidence: {
          javaV224ConsumerReadinessCompletion: {
            version: "Java v224",
            guardCount: 5,
          },
          miniKvLatestAuditNote: {
            releaseVersion: "v210",
            sourceVersionedRelease: "v209",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup consumer readiness evidence report");
      expect(markdown.body).toContain("Java v220 Consumer Evidence Digest");
      expect(markdown.body).toContain("mini-kv v202-v209 Versioned Continuity");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes consumer readiness archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v494",
        sourceNodeVersion: "Node v493",
        readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        sourceReport: {
          activeNodeVersion: "Node v492",
          sourceNodeVersion: "Node v491",
          ready: true,
          checkCount: 21,
          passedCheckCount: 21,
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
        .toContain("# Java / mini-kv route catalog cleanup consumer readiness evidence archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes consumer readiness batch closeout through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout.v1",
        closeoutState: "ready",
        activeNodeVersion: "Node v496",
        sourceNodeVersion: "Node v495",
        readyForRouteCatalogCleanupConsumerReadinessBatchCloseout: true,
        executionAllowed: false,
        routeCatalog: {
          routeCount: cleanupHandoffRouteCounts.consumerReadinessBatchCloseout,
          javaMiniKvDomainRouteCount: 43,
          cleanupHandoffRouteGroupRouteCount: 9,
        },
        summary: {
          fileCount: 22,
          presentFileCount: 22,
          checkCount: 15,
          passedCheckCount: 15,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup consumer readiness batch closeout");
      expectMarkdownRouteCount(markdown.body, cleanupHandoffRouteCounts.consumerReadinessBatchCloseout);
      expect(markdown.body).toContain("javaDirtyWorktreeExcluded: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes consumer readiness batch closeout archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v499",
        sourceNodeVersion: "Node v498",
        readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        sourceReport: {
          activeNodeVersion: "Node v496",
          sourceNodeVersion: "Node v495",
          ready: true,
          checkCount: 15,
          passedCheckCount: 15,
          routeCountAtCloseout: cleanupHandoffRouteCounts.consumerReadinessBatchCloseout,
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
        .toContain("# Java / mini-kv route catalog cleanup consumer readiness batch closeout archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes readiness handoff evidence through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v502",
        sourceNodeVersion: "Node v501",
        readyForRouteCatalogCleanupReadinessHandoffEvidenceReport: true,
        executionAllowed: false,
        summary: {
          fileCount: 10,
          presentFileCount: 10,
          checkCount: 16,
          passedCheckCount: 16,
          javaLatestCleanVersion: "Java v231",
          miniKvLatestCleanVersion: "v212",
        },
        evidence: {
          javaV231ConsumerReadinessHandoffOpsEvidenceAlignment: {
            version: "Java v231",
            guardCount: 5,
          },
          miniKvV212RouteCatalogPostCloseoutRetentionAudit: {
            releaseVersion: "v212",
            previousConsumedReleaseVersion: "v211",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup readiness handoff evidence report");
      expect(markdown.body).toContain("Java v225 Readiness Handoff");
      expect(markdown.body).toContain("mini-kv v211-v212 Retention");
    } finally {
      await app.close();
    }
  }, 180_000);

  it("exposes readiness handoff archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v504",
        sourceNodeVersion: "Node v503",
        readyForRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        sourceReport: {
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
          checkCount: 16,
          passedCheckCount: 16,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup readiness handoff evidence archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
    } finally {
      await app.close();
    }
  }, 180_000);

});
