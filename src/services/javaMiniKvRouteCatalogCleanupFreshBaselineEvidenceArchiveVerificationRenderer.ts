import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup fresh baseline evidence archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready", profile.readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Report", entries: profile.sourceReport },
      { heading: "Route Catalog", entries: profile.routeCatalog },
      { heading: "Summary", entries: profile.summary },
      { heading: "Checks", entries: profile.checks },
      {
        heading: "Archive Files",
        lines: Object.values(profile.archiveFiles).flatMap((file) => [
          `- ${file.path}: ${file.exists ? "present" : "missing"}`,
          `  - Size bytes: ${file.sizeBytes}`,
          `  - SHA-256: ${file.sha256 ?? "missing"}`,
        ]),
      },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
