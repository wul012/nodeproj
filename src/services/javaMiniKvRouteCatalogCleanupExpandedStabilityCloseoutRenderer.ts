import {
  renderEntries,
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout,
} from "./javaMiniKvRouteCatalogCleanupExpandedStabilityCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutMarkdown(
  closeout: JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout,
): string {
  return [
    "# Java / mini-kv route catalog cleanup expanded stability closeout",
    "",
    `- Service: ${closeout.service}`,
    `- Generated at: ${closeout.generatedAt}`,
    `- Profile version: ${closeout.profileVersion}`,
    `- Closeout state: ${closeout.closeoutState}`,
    `- Ready: ${closeout.readyForRouteCatalogCleanupExpandedStabilityCloseout}`,
    `- Active Node version: ${closeout.activeNodeVersion}`,
    `- Source Node version: ${closeout.sourceNodeVersion}`,
    `- Execution allowed: ${closeout.executionAllowed}`,
    "",
    "## Cross-Project Mode",
    "",
    ...renderEntries(closeout.crossProjectMode),
    "",
    "## Closed Gate",
    "",
    ...renderEntries(closeout.closedGate),
    "",
    "## Planned Segment",
    "",
    ...closeout.plannedSegment.map((version) => `- ${version}`),
    "",
    "## Route Catalog",
    "",
    ...renderEntries(closeout.routeCatalog),
    "",
    "## Summary",
    "",
    ...renderEntries(closeout.summary),
    "",
    "## Checks",
    "",
    ...renderEntries(closeout.checks),
    "",
    "## Next Actions",
    "",
    ...renderList(closeout.nextActions, "No next actions."),
    "",
  ].join("\n");
}
