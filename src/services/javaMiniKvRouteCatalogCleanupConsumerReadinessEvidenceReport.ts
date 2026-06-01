import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
  type JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.js";

export {
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence";

export interface JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report.v1";
  reportState: "ready" | "blocked";
  activeNodeVersion: "Node v492";
  sourceNodeVersion: "Node v491";
  readyForRouteCatalogCleanupConsumerReadinessEvidenceReport: boolean;
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
  evidence: JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence;
  summary: JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["summary"];
  checks: JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["checks"];
  evidenceEndpoints: {
    reportJson: string;
    reportMarkdown: string;
    sourcePlan:
      "docs/plans3/v491-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-intake-roadmap.md";
    nextPlan:
      "docs/plans3/v492-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-roadmap.md";
    nextNodeVersion: "Node v493";
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport {
  void input.config;
  const evidence = loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence();
  const ready = evidence.summary.checkCount > 0
    && evidence.summary.checkCount === evidence.summary.passedCheckCount
    && evidence.summary.presentFileCount === evidence.summary.fileCount;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup consumer readiness evidence report",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report.v1",
    reportState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v492",
    sourceNodeVersion: "Node v491",
    readyForRouteCatalogCleanupConsumerReadinessEvidenceReport: ready,
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
      reportJson: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH,
      reportMarkdown: `${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ROUTE_PATH}?format=markdown`,
      sourcePlan:
        "docs/plans3/v491-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-intake-roadmap.md",
      nextPlan:
        "docs/plans3/v492-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-roadmap.md",
      nextNodeVersion: "Node v493",
    },
    nextActions: ready
      ? [
        "Archive this consumer readiness evidence report before adding an archive verifier.",
        "Keep mini-kv v210 as an audit note until a versioned fixture is available.",
        "Let Java and mini-kv continue parallel work; Node does not require fresh sibling changes for v493.",
      ]
      : [
        "Repair missing frozen consumer readiness evidence before archiving this report.",
        "Do not read Java dirty worktree files or mini-kv rolling current as historical baselines.",
      ],
  };
}
