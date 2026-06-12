import type {
  JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup verification checklist evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupVerificationChecklistEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      {
        heading: "Java v215 Consumer Verification Checklist",
        entries: report.evidence.javaV215ConsumerVerificationChecklist,
      },
      {
        heading: "Java v215 Consumer Verification Checklist Fixture",
        entries: report.evidence.javaV215ConsumerVerificationChecklistFixture,
      },
      {
        heading: "Java v216 Consumer Verification Checklist Snapshot Freeze",
        entries: report.evidence.javaV216ConsumerVerificationChecklistSnapshotFreeze,
      },
      {
        heading: "Java v217 Consumer Verification Checklist Historical Compatibility",
        entries: report.evidence.javaV217ConsumerVerificationChecklistHistoricalCompatibility,
      },
      {
        heading: "mini-kv v201 Post-Closeout Continuity",
        entries: report.evidence.miniKvV201RouteCatalogCleanupPostCloseoutContinuity,
      },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
