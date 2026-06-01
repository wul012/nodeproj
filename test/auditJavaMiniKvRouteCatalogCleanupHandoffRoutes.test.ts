import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
} from "../src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupHandoffEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupCurrentEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../src/services/javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerification.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("Java/mini-kv route catalog cleanup handoff audit route group", () => {
  it("exposes v473 frozen handoff evidence through JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes).toHaveLength(13);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
      });
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-handoff-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v474",
        sourceNodeVersion: "Node v473",
        readyForRouteCatalogCleanupHandoffEvidenceReport: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        summary: {
          fileCount: 4,
          presentFileCount: 4,
          checkCount: 16,
          passedCheckCount: 16,
          javaEndpointPairCount: 6,
          miniKvArchivedNodeVersionCount: 89,
        },
        evidence: {
          javaV206EndpointPairIntegrity: {
            version: "Java v206",
            v1ContractEndpointPairCount: 6,
          },
          miniKvV191RouteCatalogHandoff: {
            releaseVersion: "v191",
            executionAllowed: false,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup handoff evidence report");
      expect(markdown.body).toContain("Java v206 Endpoint Pair Integrity");
      expect(markdown.body).toContain("mini-kv v191 Handoff");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes latest tagged Java v207/v208 and mini-kv v193 evidence through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v476",
        sourceNodeVersion: "Node v475",
        readyForRouteCatalogCleanupLatestEvidenceReport: true,
        executionAllowed: false,
        summary: {
          fileCount: 4,
          presentFileCount: 4,
          checkCount: 16,
          passedCheckCount: 16,
          javaV1RouteCount: 6,
          javaEndpointCatalogCount: 6,
        },
        evidence: {
          javaV208EndpointCatalog: {
            version: "Java v208",
            contractEndpointCount: 6,
          },
          miniKvV193HandoffAuditFreeze: {
            releaseVersion: "v193",
            previousConsumedReleaseVersion: "v192",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup latest evidence report");
      expect(markdown.body).toContain("Java v208 Endpoint Catalog");
      expect(markdown.body).toContain("mini-kv v193 Handoff Audit Freeze");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes latest evidence archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-latest-evidence-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v478",
        sourceNodeVersion: "Node v477",
        readyForRouteCatalogCleanupLatestEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        sourceReport: {
          activeNodeVersion: "Node v476",
          sourceNodeVersion: "Node v475",
          ready: true,
          checkCount: 16,
          passedCheckCount: 16,
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
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup latest evidence archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes current Java v214 and mini-kv v200 evidence through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v482",
        sourceNodeVersion: "Node v481",
        readyForRouteCatalogCleanupCurrentEvidenceReport: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        summary: {
          fileCount: 6,
          presentFileCount: 6,
          checkCount: 18,
          passedCheckCount: 18,
          javaCatalogedArtifactCount: 6,
          miniKvV200BoundaryGroupCount: 39,
        },
        evidence: {
          javaV214ConsumerHandoffBundleIntegrity: {
            version: "Java v214",
            guardCount: 6,
          },
          miniKvV200RouteCatalogCleanupBatchCloseoutAudit: {
            releaseVersion: "v200",
            previousConsumedReleaseVersion: "v199",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup current evidence report");
      expect(markdown.body).toContain("Java v214 Consumer Handoff Bundle Integrity");
      expect(markdown.body).toContain("mini-kv v200 Batch Closeout Audit");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes current evidence archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v484",
        sourceNodeVersion: "Node v483",
        readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        sourceReport: {
          activeNodeVersion: "Node v482",
          sourceNodeVersion: "Node v481",
          ready: true,
          checkCount: 18,
          passedCheckCount: 18,
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
      expect(markdown.body).toContain("# Java / mini-kv route catalog cleanup current evidence archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes verification checklist evidence through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report.v1",
        reportState: "ready",
        activeNodeVersion: "Node v487",
        sourceNodeVersion: "Node v486",
        readyForRouteCatalogCleanupVerificationChecklistEvidenceReport: true,
        executionAllowed: false,
        summary: {
          fileCount: 6,
          presentFileCount: 6,
          checkCount: 18,
          passedCheckCount: 18,
          javaVerificationItemCount: 7,
          miniKvV201BoundaryGroupCount: 40,
        },
        evidence: {
          javaV217ConsumerVerificationChecklistHistoricalCompatibility: {
            version: "Java v217",
            guardCount: 4,
          },
          miniKvV201RouteCatalogCleanupPostCloseoutContinuity: {
            releaseVersion: "v201",
            previousConsumedReleaseVersion: "v200",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body)
        .toContain("# Java / mini-kv route catalog cleanup verification checklist evidence report");
      expect(markdown.body).toContain("Java v217 Consumer Verification Checklist Historical Compatibility");
      expect(markdown.body).toContain("mini-kv v201 Post-Closeout Continuity");
    } finally {
      await app.close();
    }
  }, 60000);

  it("exposes verification checklist archive verification through the same route group", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-archive-verification.v1",
        archiveVerificationState: "ready",
        activeNodeVersion: "Node v489",
        sourceNodeVersion: "Node v488",
        readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification: true,
        archiveVerificationOnly: true,
        executionAllowed: false,
        sourceReport: {
          activeNodeVersion: "Node v487",
          sourceNodeVersion: "Node v486",
          ready: true,
          checkCount: 18,
          passedCheckCount: 18,
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
        .toContain("# Java / mini-kv route catalog cleanup verification checklist evidence archive verification");
      expect(markdown.body).toContain("summaryDigestsMatchFiles: true");
    } finally {
      await app.close();
    }
  }, 60000);

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
  }, 60000);

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
  }, 60000);

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
          routeCount: 207,
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
      expect(markdown.body).toContain("routeCount: 207");
      expect(markdown.body).toContain("javaDirtyWorktreeExcluded: true");
    } finally {
      await app.close();
    }
  }, 60000);

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
          routeCountAtCloseout: 207,
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
  }, 60000);

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
  }, 60000);

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
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-474",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v474-route-catalog-cleanup-handoff-report",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    ...overrides,
  });
}
