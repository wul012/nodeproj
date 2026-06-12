import type {
  JavaMiniKvRouteCatalogCleanupHandoffEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupHandoffEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupHandoffEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupHandoffEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup handoff evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupHandoffEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Java v202 Consumer Probe Plan", entries: report.evidence.javaV202ConsumerProbePlan },
      { heading: "Java v206 Endpoint Pair Integrity", entries: report.evidence.javaV206EndpointPairIntegrity },
      { heading: "mini-kv v191 Handoff", entries: report.evidence.miniKvV191RouteCatalogHandoff },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
