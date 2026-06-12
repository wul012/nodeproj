import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready", profile.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Live Smoke", entries: profile.sourceLiveSmoke },
      { heading: "Record Summary", entries: profile.recordSummary },
      { heading: "Cleanup Proof", entries: profile.cleanupProof },
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
