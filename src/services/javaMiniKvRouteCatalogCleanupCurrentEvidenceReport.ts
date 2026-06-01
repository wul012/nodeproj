import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupCurrentEvidence,
  type JavaMiniKvRouteCatalogCleanupCurrentEvidence,
} from "./javaMiniKvRouteCatalogCleanupCurrentEvidence.js";

export {
  renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupCurrentEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence";

export interface JavaMiniKvRouteCatalogCleanupCurrentEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v482";
  sourceNodeVersion: "Node v481";
  readyForRouteCatalogCleanupCurrentEvidenceReport: boolean;
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
  evidence: JavaMiniKvRouteCatalogCleanupCurrentEvidence;
  summary: JavaMiniKvRouteCatalogCleanupCurrentEvidence["summary"];
  checks: JavaMiniKvRouteCatalogCleanupCurrentEvidence["checks"];
  evidenceEndpoints: {
    reportJson: string;
    reportMarkdown: string;
    sourcePlan: "docs/plans3/v481-post-java-mini-kv-current-route-catalog-cleanup-evidence-intake-roadmap.md";
    nextPlan: "docs/plans3/v482-post-java-mini-kv-current-route-catalog-cleanup-evidence-report-roadmap.md";
    nextNodeVersion: "Node v483";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupCurrentEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupCurrentEvidence();
  const ready = evidence.summary.checkCount > 0
    && evidence.summary.checkCount === evidence.summary.passedCheckCount
    && evidence.summary.presentFileCount === evidence.summary.fileCount;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup current evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v482",
    sourceNodeVersion: "Node v481",
    readyForRouteCatalogCleanupCurrentEvidenceReport: ready,
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
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan: "docs/plans3/v481-post-java-mini-kv-current-route-catalog-cleanup-evidence-intake-roadmap.md",
      nextPlan: "docs/plans3/v482-post-java-mini-kv-current-route-catalog-cleanup-evidence-report-roadmap.md",
      nextNodeVersion: "Node v483",
    },
    nextActions: ready
      ? [
        "Archive this current evidence report before consuming Java v215 or mini-kv v201 work.",
        "Keep Java v215-like and mini-kv v201-like dirty work out of Node evidence until tagged.",
        "Keep current cleanup evidence read-only and non-authoritative for runtime execution.",
      ]
      : [
        "Repair missing frozen current evidence before archiving this report.",
        "Do not read dirty sibling working trees to satisfy current evidence.",
      ],
  };
}
