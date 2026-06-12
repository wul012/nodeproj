import type {
  JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout.js";
import {
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutMarkdown(
  closeout: JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup fresh baseline batch closeout",
    meta: [
      ["Service", closeout.service],
      ["Generated at", closeout.generatedAt],
      ["Profile version", closeout.profileVersion],
      ["Closeout state", closeout.closeoutState],
      ["Ready", closeout.readyForRouteCatalogCleanupFreshBaselineBatchCloseout],
      ["Active Node version", closeout.activeNodeVersion],
      ["Source Node version", closeout.sourceNodeVersion],
      ["Execution allowed", closeout.executionAllowed],
    ],
    sections: [
      { heading: "Cross-Project Mode", entries: closeout.crossProjectMode },
      { heading: "Closed Versions", lines: closeout.closedVersions.map((version) => `- ${version}`) },
      { heading: "Route Catalog", entries: closeout.routeCatalog },
      { heading: "Source Archive", entries: closeout.sourceArchive },
      { heading: "Archive Verification", entries: closeout.archiveVerification },
      { heading: "Summary", entries: closeout.summary },
      { heading: "Checks", entries: closeout.checks },
      { heading: "Files", lines: Object.values(closeout.files).flatMap((file) => [
        `- ${file.path}: ${file.exists ? "present" : "missing"}`,
        `  - Size bytes: ${file.sizeBytes}`,
        `  - SHA-256: ${file.sha256 ?? "missing"}`,
      ]) },
      { heading: "Next Actions", list: closeout.nextActions, emptyText: "No next actions." },
    ],
  });
}
