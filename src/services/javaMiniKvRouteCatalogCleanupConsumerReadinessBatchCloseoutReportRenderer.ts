import type {
  JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport.js";
import {
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup consumer readiness batch closeout",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Closeout state", report.closeoutState],
      ["Ready", report.readyForRouteCatalogCleanupConsumerReadinessBatchCloseout],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Cross-Project Mode", entries: report.crossProjectMode },
      { heading: "Closed Versions", lines: report.closedVersions.map((version) => `- ${version}`) },
      { heading: "Route Catalog", entries: report.routeCatalog },
      { heading: "Source Archive", entries: report.sourceArchive },
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Files", lines: Object.values(report.files).flatMap((file) => [
        `- ${file.path}: ${file.exists ? "present" : "missing"}`,
        `  - Size bytes: ${file.sizeBytes}`,
        `  - SHA-256: ${file.sha256 ?? "missing"}`,
      ]) },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
