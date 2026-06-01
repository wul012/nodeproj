import {
  renderEntries,
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile,
): string {
  return [
    "# Java / mini-kv route catalog cleanup verification checklist evidence archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Archive verification state: ${profile.archiveVerificationState}`,
    `- Ready: ${profile.readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification}`,
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
