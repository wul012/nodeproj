import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification route archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready", profile.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Route Archive", entries: profile.sourceRouteArchive },
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
