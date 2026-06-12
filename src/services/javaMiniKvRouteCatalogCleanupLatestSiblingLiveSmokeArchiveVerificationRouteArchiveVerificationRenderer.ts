import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready", profile.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Route Archive", entries: profile.sourceRouteArchive },
      { heading: "Source Verifier", entries: profile.sourceVerifier },
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
