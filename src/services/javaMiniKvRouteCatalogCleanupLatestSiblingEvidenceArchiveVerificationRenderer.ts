import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest sibling evidence archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready", profile.readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification],
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
        lines: Object.entries(profile.archiveFiles).flatMap(([key, file]) => [
          `- ${key}: ${file.exists ? "present" : "missing"}`,
          `  - Path: ${file.path}`,
          `  - Size bytes: ${file.sizeBytes}`,
          `  - SHA-256: ${file.sha256 ?? "missing"}`,
        ]),
      },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
