import { expect } from "vitest";

export { buildApp } from "../../src/app.js";
import { loadConfig } from "../../src/config.js";
import {
  javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
} from "../../src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupHandoffEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupLatestEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupCurrentEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupExpandedStabilityCloseout.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReport.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_SIBLING_WORKSPACE_AVAILABILITY_CLOSEOUT_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.js";
export {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_PATH,
} from "../../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./auditJsonMarkdownRouteCatalogTestSupport.js";

export function expectJavaMiniKvRouteCatalogCleanupHandoffRouteGroupRegistered(): void {
  expect(javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes).toHaveLength(30);
  expectAuditRouteGroupRegisteredThroughCatalog({
    routes: javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
  });
}

export function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-474",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v474-route-catalog-cleanup-handoff-report",
  };
}

export function loadTestConfig(overrides: Record<string, string> = {}) {
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
