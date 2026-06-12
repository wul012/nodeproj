import type {
  JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup fresh baseline evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupFreshBaselineEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Java v232-v239 Readiness Handoff Receipts", lines: report.evidence.javaReceipts.flatMap((receipt) => [
        `- ${receipt.version}: ${receipt.scope}`,
        `  - status: ${receipt.status}`,
        `  - guardCount: ${receipt.guardCount}`,
        `  - validationCount: ${receipt.validationCount}`,
        `  - boundaryRuntimeClosed: ${receipt.boundaryRuntimeClosed}`,
      ]) },
      { heading: "mini-kv v213-v220 Post-Closeout Continuity", lines: report.evidence.miniKvReleases.flatMap((release) => [
        `- ${release.releaseVersion}: ${release.status}`,
        `  - previousConsumedReleaseVersion: ${release.previousConsumedReleaseVersion}`,
        `  - sourceFrozenReleaseVersion: ${release.sourceFrozenReleaseVersion}`,
        `  - stageSequence: ${release.stageSequence}`,
        `  - historicalFixtureCount: ${release.historicalFixtureCount}`,
        `  - evidenceDigest: ${release.evidenceDigest}`,
      ]) },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
