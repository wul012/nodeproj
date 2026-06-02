import {
  renderEntries,
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification,
): string {
  return [
    "# Java / mini-kv route catalog cleanup twenty-version run closeout archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Archive verification state: ${profile.archiveVerificationState}`,
    `- Ready: ${profile.readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Report",
    "",
    ...renderEntries(profile.sourceReport),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Archive Files",
    "",
    ...Object.values(profile.archiveFiles).flatMap((file) => [
      `- ${file.path}: ${file.exists ? "present" : "missing"}`,
      `  - Size bytes: ${file.sizeBytes}`,
      `  - SHA-256: ${file.sha256 ?? "missing"}`,
    ]),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}
