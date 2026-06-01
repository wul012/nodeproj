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

      expect(javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes).toHaveLength(4);
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
