import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidence,
  type JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineEvidence.js";

export {
  renderJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence";

export interface JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v508";
  sourceNodeVersion: "Node v507";
  readyForRouteCatalogCleanupFreshBaselineEvidenceReport: boolean;
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
  evidence: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence;
  summary: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence["summary"];
  checks: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence["checks"];
  evidenceEndpoints: {
    reportJson: string;
    reportMarkdown: string;
    sourcePlan: "docs/plans3/v507-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-intake-roadmap.md";
    nextPlan: "docs/plans3/v508-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-roadmap.md";
    nextNodeVersion: "Node v509";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidence();
  const ready = evidence.summary.checkCount > 0
    && evidence.summary.checkCount === evidence.summary.passedCheckCount
    && evidence.summary.presentFileCount === evidence.summary.fileCount;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup fresh baseline evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v508",
    sourceNodeVersion: "Node v507",
    readyForRouteCatalogCleanupFreshBaselineEvidenceReport: ready,
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
    summary: evidence.summary,
    checks: evidence.checks,
    evidenceEndpoints: {
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan:
        "docs/plans3/v507-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-intake-roadmap.md",
      nextPlan:
        "docs/plans3/v508-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-roadmap.md",
      nextNodeVersion: "Node v509",
    },
    nextActions: ready
      ? [
        "Archive this fresh baseline evidence report before adding an archive verifier.",
        "Let Java and mini-kv continue in parallel; Node has frozen the required sibling evidence.",
      ]
      : [
        "Repair missing fresh baseline evidence before archiving this report.",
        "Do not open Java or mini-kv runtime authority to satisfy report readiness.",
      ],
  };
}
