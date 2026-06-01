import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupHandoffEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupHandoffEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupHandoffEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupLatestEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupLatestEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupLatestEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification,
  renderJavaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerificationMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupCurrentEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification,
  renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification,
  renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification,
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport,
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification,
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupHandoffEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupHandoffEvidenceReportMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupLatestEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupLatestEvidenceReportMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerification({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupLatestEvidenceArchiveVerificationMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceReportMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReportMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReportMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReportMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReportMarkdown,
  ),
];
