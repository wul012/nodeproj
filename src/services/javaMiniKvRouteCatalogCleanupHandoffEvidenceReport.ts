import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupHandoffEvidence,
  type JavaMiniKvRouteCatalogCleanupHandoffEvidence,
} from "./javaMiniKvRouteCatalogCleanupHandoffEvidence.js";

export {
  renderJavaMiniKvRouteCatalogCleanupHandoffEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupHandoffEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-handoff-evidence";

export interface JavaMiniKvRouteCatalogCleanupHandoffEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-handoff-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v474";
  sourceNodeVersion: "Node v473";
  readyForRouteCatalogCleanupHandoffEvidenceReport: boolean;
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
  evidence: JavaMiniKvRouteCatalogCleanupHandoffEvidence;
  summary: JavaMiniKvRouteCatalogCleanupHandoffEvidence["summary"];
  checks: JavaMiniKvRouteCatalogCleanupHandoffEvidence["checks"];
  evidenceEndpoints: {
    reportJson: string;
    reportMarkdown: string;
    sourcePlan: "docs/plans3/v473-post-java-mini-kv-route-catalog-cleanup-handoff-evidence-roadmap.md";
    nextPlan: "docs/plans3/v474-post-java-mini-kv-route-catalog-cleanup-handoff-evidence-report-roadmap.md";
    nextNodeVersion: "Node v475";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupHandoffEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupHandoffEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupHandoffEvidence();
  const ready = evidence.summary.checkCount > 0
    && evidence.summary.checkCount === evidence.summary.passedCheckCount
    && evidence.summary.presentFileCount === evidence.summary.fileCount;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup handoff evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-handoff-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v474",
    sourceNodeVersion: "Node v473",
    readyForRouteCatalogCleanupHandoffEvidenceReport: ready,
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
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan: "docs/plans3/v473-post-java-mini-kv-route-catalog-cleanup-handoff-evidence-roadmap.md",
      nextPlan: "docs/plans3/v474-post-java-mini-kv-route-catalog-cleanup-handoff-evidence-report-roadmap.md",
      nextNodeVersion: "Node v475",
    },
    nextActions: ready
      ? [
        "Archive and verify this JSON/Markdown report before consuming the next Java or mini-kv tag.",
        "Keep Java and mini-kv parallel; Node v474 consumes frozen evidence only.",
        "Do not turn route catalog cleanup handoff evidence into runtime execution authority.",
      ]
      : [
        "Repair missing frozen Java or mini-kv handoff evidence before exposing the report.",
        "Do not read dirty sibling working trees to satisfy the report.",
      ],
  };
}
