import type { AppConfig } from "../config.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake,
  type JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake.js";

export {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence";

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v540";
  sourceNodeVersion: "Node v538";
  ciStabilizationVersion: "Node v539";
  readyForRouteCatalogCleanupLatestSiblingEvidenceReport: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  evidenceIntakeOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  evidence: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake;
  routeCatalog: {
    groupCount: 50;
    routeCount: 224;
    javaMiniKvDomainRouteCount: 60;
    cleanupHandoffRouteGroupRouteCount: 26;
  };
  summary: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake["summary"] & {
    currentRouteCount: 224;
    currentJavaMiniKvDomainRouteCount: 60;
    currentCleanupHandoffRouteGroupRouteCount: 26;
  };
  checks: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake["checks"] & {
    reportRouteRegisteredInCurrentCatalog: boolean;
    readyForRouteCatalogCleanupLatestSiblingEvidenceReport: boolean;
  };
  evidenceEndpoints: {
    reportJson: typeof JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH;
    reportMarkdown: string;
    sourcePlan: "docs/plans3/v538-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-intake-roadmap.md";
    currentPlan: "docs/plans3/v540-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-roadmap.md";
    nextPlan: "docs/plans3/v541-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-archive-roadmap.md";
    nextNodeVersion: "Node v541";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake();
  const routeCatalog = {
    groupCount: 50,
    routeCount: 224,
    javaMiniKvDomainRouteCount: 60,
    cleanupHandoffRouteGroupRouteCount: 26,
  } as const;
  const checks = {
    ...evidence.checks,
    reportRouteRegisteredInCurrentCatalog:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount === routeCatalog.groupCount
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount === routeCatalog.routeCount
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"] ===
        routeCatalog.javaMiniKvDomainRouteCount,
    readyForRouteCatalogCleanupLatestSiblingEvidenceReport: false,
  };
  checks.readyForRouteCatalogCleanupLatestSiblingEvidenceReport = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupLatestSiblingEvidenceReport")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupLatestSiblingEvidenceReport;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest sibling evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v540",
    sourceNodeVersion: "Node v538",
    ciStabilizationVersion: "Node v539",
    readyForRouteCatalogCleanupLatestSiblingEvidenceReport: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    evidenceIntakeOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    evidence,
    routeCatalog,
    summary: {
      ...evidence.summary,
      currentRouteCount: routeCatalog.routeCount,
      currentJavaMiniKvDomainRouteCount: routeCatalog.javaMiniKvDomainRouteCount,
      currentCleanupHandoffRouteGroupRouteCount: routeCatalog.cleanupHandoffRouteGroupRouteCount,
    },
    checks,
    evidenceEndpoints: {
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan:
        "docs/plans3/v538-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-intake-roadmap.md",
      currentPlan:
        "docs/plans3/v540-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-roadmap.md",
      nextPlan:
        "docs/plans3/v541-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-archive-roadmap.md",
      nextNodeVersion: "Node v541",
    },
    nextActions: ready
      ? [
        "Archive this latest sibling evidence report before adding an archive verifier.",
        "Keep Java and mini-kv available for a later explicitly planned read-only live smoke.",
      ]
      : [
        "Repair latest sibling evidence intake or route catalog registration before archiving.",
        "Do not start Java or mini-kv to compensate for a Node route registration issue.",
      ],
  };
}
