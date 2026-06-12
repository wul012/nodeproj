import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest sibling evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupLatestSiblingEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["CI stabilization version", report.ciStabilizationVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Java v274 Receipt", entries: report.evidence.javaReceipt },
      { heading: "mini-kv v247 Release", entries: report.evidence.miniKvRelease },
      { heading: "Route Catalog", entries: report.routeCatalog },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      {
        heading: "Documentation Snippets",
        lines: report.evidence.snippets.map((snippet) =>
          `- ${snippet.id}: ${snippet.matched ? "matched" : "missing"}`),
      },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
