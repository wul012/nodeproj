import type {
  JavaMiniKvRouteCatalogCleanupLatestEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupLatestEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupLatestEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupLatestEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Java v207 Controller Split", entries: report.evidence.javaV207ControllerSplit },
      { heading: "Java v208 Endpoint Catalog", entries: report.evidence.javaV208EndpointCatalog },
      { heading: "Java v208 Endpoint Catalog Fixture", entries: report.evidence.javaV208EndpointCatalogFixture },
      { heading: "mini-kv v193 Handoff Audit Freeze", entries: report.evidence.miniKvV193HandoffAuditFreeze },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
