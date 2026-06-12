import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup twenty-version run closeout archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready", profile.readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Report", entries: profile.sourceReport },
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
