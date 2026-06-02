import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile,
} from "./javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile,
): string {
  return [
    "# Java / mini-kv route catalog cleanup sibling workspace availability closeout",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Closeout state: ${profile.closeoutState}`,
    `- Ready: ${profile.readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Sibling Workspace Mode",
    "",
    ...renderEntries(profile.siblingWorkspaceMode),
    "",
    "## Historical Fixture Roots",
    "",
    ...Object.entries(profile.historicalFixtureRoots).flatMap(([key, root]) => [
      `- ${key}: ${root.exists ? "present" : "missing"}`,
      `  - Path: ${root.path}`,
    ]),
    "",
    "## Upstream Boundary",
    "",
    ...renderEntries(profile.upstreamBoundary),
    "",
    "## Source Chain Closeout",
    "",
    ...renderEntries(profile.sourceChainCloseout),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}
