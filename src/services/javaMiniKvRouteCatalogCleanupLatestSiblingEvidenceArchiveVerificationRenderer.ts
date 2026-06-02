import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile,
): string {
  return [
    "# Java / mini-kv route catalog cleanup latest sibling evidence archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Archive verification state: ${profile.archiveVerificationState}`,
    `- Ready: ${profile.readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification}`,
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
    ...Object.entries(profile.archiveFiles).flatMap(([key, file]) => [
      `- ${key}: ${file.exists ? "present" : "missing"}`,
      `  - Path: ${file.path}`,
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
