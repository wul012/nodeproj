import type {
  JavaMiniKvRouteCatalogCleanupCurrentEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupCurrentEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupCurrentEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup current evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupCurrentEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Java v211 Consumer Handoff Bundle", entries: report.evidence.javaV211ConsumerHandoffBundle },
      {
        heading: "Java v211 Consumer Handoff Bundle Fixture",
        entries: report.evidence.javaV211ConsumerHandoffBundleFixture,
      },
      {
        heading: "Java v214 Consumer Handoff Bundle Integrity",
        entries: report.evidence.javaV214ConsumerHandoffBundleIntegrity,
      },
      { heading: "mini-kv v199 Batch Closeout", entries: report.evidence.miniKvV199RouteCatalogCleanupBatchCloseout },
      { heading: "mini-kv v200 Batch Closeout Audit", entries: report.evidence.miniKvV200RouteCatalogCleanupBatchCloseoutAudit },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
