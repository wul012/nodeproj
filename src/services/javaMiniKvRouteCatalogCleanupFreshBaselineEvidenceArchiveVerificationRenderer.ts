import {
  renderEntries,
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile,
): string {
  return [
    "# Java / mini-kv route catalog cleanup fresh baseline evidence archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Archive verification state: ${profile.archiveVerificationState}`,
    `- Ready: ${profile.readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Report",
    "",
    ...renderEntries(profile.sourceReport),
    "",
    "## Route Catalog",
    "",
    ...renderEntries(profile.routeCatalog),
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
