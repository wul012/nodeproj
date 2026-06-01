import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence,
  type JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence,
} from "./javaMiniKvRouteCatalogCleanupReadinessHandoffEvidence.js";

export {
  renderJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence";

export interface JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v502";
  sourceNodeVersion: "Node v501";
  readyForRouteCatalogCleanupReadinessHandoffEvidenceReport: boolean;
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
  evidence: JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence;
  summary: JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence["summary"];
  checks: JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence["checks"];
  evidenceEndpoints: {
    reportJson: string;
    reportMarkdown: string;
    sourcePlan: "docs/plans3/v501-post-java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-intake-roadmap.md";
    nextPlan: "docs/plans3/v502-post-java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-report-roadmap.md";
    nextNodeVersion: "Node v503";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence();
  const ready = evidence.summary.checkCount > 0
    && evidence.summary.checkCount === evidence.summary.passedCheckCount
    && evidence.summary.presentFileCount === evidence.summary.fileCount;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup readiness handoff evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v502",
    sourceNodeVersion: "Node v501",
    readyForRouteCatalogCleanupReadinessHandoffEvidenceReport: ready,
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
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_READINESS_HANDOFF_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan: "docs/plans3/v501-post-java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-intake-roadmap.md",
      nextPlan: "docs/plans3/v502-post-java-mini-kv-route-catalog-cleanup-readiness-handoff-evidence-report-roadmap.md",
      nextNodeVersion: "Node v503",
    },
    nextActions: ready
      ? [
        "Archive this readiness handoff evidence report before adding an archive verifier.",
        "Keep Java v232-like and mini-kv v213-like dirty work out of Node evidence until clean tagged.",
      ]
      : [
        "Repair missing frozen readiness handoff evidence before archiving this report.",
        "Do not consume dirty sibling worktrees to satisfy readiness handoff evidence.",
      ],
  };
}
