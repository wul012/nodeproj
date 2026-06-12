import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup consumer readiness batch closeout archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready", profile.readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification],
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
