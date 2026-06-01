import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence,
  type JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence,
} from "./javaMiniKvRouteCatalogCleanupVerificationChecklistEvidence.js";

export {
  renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence";

export interface JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v487";
  sourceNodeVersion: "Node v486";
  readyForRouteCatalogCleanupVerificationChecklistEvidenceReport: boolean;
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
  evidence: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence;
  summary: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence["summary"];
  checks: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence["checks"];
  evidenceEndpoints: {
    reportJson: string;
    reportMarkdown: string;
    sourcePlan: "docs/plans3/v486-post-java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-intake-roadmap.md";
    nextPlan: "docs/plans3/v487-post-java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-roadmap.md";
    nextNodeVersion: "Node v488";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence();
  const ready = evidence.summary.checkCount > 0
    && evidence.summary.checkCount === evidence.summary.passedCheckCount
    && evidence.summary.presentFileCount === evidence.summary.fileCount;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup verification checklist evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v487",
    sourceNodeVersion: "Node v486",
    readyForRouteCatalogCleanupVerificationChecklistEvidenceReport: ready,
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
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan: "docs/plans3/v486-post-java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-intake-roadmap.md",
      nextPlan: "docs/plans3/v487-post-java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-roadmap.md",
      nextNodeVersion: "Node v488",
    },
    nextActions: ready
      ? [
        "Archive this verification checklist evidence report before consuming Java v219 or mini-kv v202 work.",
        "Keep Java v220-like and mini-kv v202-like dirty work out of Node evidence until tagged.",
        "Keep checklist evidence read-only and non-authoritative for runtime execution.",
      ]
      : [
        "Repair missing frozen checklist evidence before archiving this report.",
        "Do not read dirty sibling working trees to satisfy checklist evidence.",
      ],
  };
}
