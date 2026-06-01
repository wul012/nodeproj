import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestEvidence,
  type JavaMiniKvRouteCatalogCleanupLatestEvidence,
} from "./javaMiniKvRouteCatalogCleanupLatestEvidence.js";

export {
  renderJavaMiniKvRouteCatalogCleanupLatestEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-evidence";

export interface JavaMiniKvRouteCatalogCleanupLatestEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v476";
  sourceNodeVersion: "Node v475";
  readyForRouteCatalogCleanupLatestEvidenceReport: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  evidenceIntakeOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  evidence: JavaMiniKvRouteCatalogCleanupLatestEvidence;
  summary: JavaMiniKvRouteCatalogCleanupLatestEvidence["summary"];
  checks: JavaMiniKvRouteCatalogCleanupLatestEvidence["checks"];
  evidenceEndpoints: {
    reportJson: string;
    reportMarkdown: string;
    sourcePlan: "docs/plans3/v475-post-java-mini-kv-latest-route-catalog-cleanup-evidence-intake-roadmap.md";
    nextPlan: "docs/plans3/v476-post-java-mini-kv-latest-route-catalog-cleanup-evidence-report-roadmap.md";
    nextNodeVersion: "Node v477";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupLatestEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupLatestEvidence();
  const ready = evidence.summary.checkCount > 0
    && evidence.summary.checkCount === evidence.summary.passedCheckCount
    && evidence.summary.presentFileCount === evidence.summary.fileCount;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-latest-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v476",
    sourceNodeVersion: "Node v475",
    readyForRouteCatalogCleanupLatestEvidenceReport: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    evidenceIntakeOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    evidence,
    summary: evidence.summary,
    checks: evidence.checks,
    evidenceEndpoints: {
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan: "docs/plans3/v475-post-java-mini-kv-latest-route-catalog-cleanup-evidence-intake-roadmap.md",
      nextPlan: "docs/plans3/v476-post-java-mini-kv-latest-route-catalog-cleanup-evidence-report-roadmap.md",
      nextNodeVersion: "Node v477",
    },
    nextActions: ready
      ? [
        "Archive and verify this latest evidence report before consuming Java v209 or mini-kv v194.",
        "Keep dirty Java v210-like and mini-kv v195-like work out of Node evidence until tagged.",
        "Keep route catalog cleanup evidence read-only and non-authoritative for runtime execution.",
      ]
      : [
        "Repair missing frozen latest evidence before exposing follow-up reports.",
        "Do not read rolling sibling files to satisfy latest evidence.",
      ],
  };
}
