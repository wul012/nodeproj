import type {
  JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile,
} from "./javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.js";
import {
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup sibling workspace availability closeout",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Closeout state", profile.closeoutState],
      ["Ready", profile.readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Sibling Workspace Mode", entries: profile.siblingWorkspaceMode },
      { heading: "Historical Fixture Roots", lines: Object.entries(profile.historicalFixtureRoots).flatMap(([key, root]) => [
        `- ${key}: ${root.exists ? "present" : "missing"}`,
        `  - Path: ${root.path}`,
      ]) },
      { heading: "Upstream Boundary", entries: profile.upstreamBoundary },
      { heading: "Source Chain Closeout", entries: profile.sourceChainCloseout },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
