import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout,
} from "./javaMiniKvRouteCatalogCleanupExpandedStabilityCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutMarkdown(
  closeout: JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup expanded stability closeout",
    meta: [
      ["Service", closeout.service],
      ["Generated at", closeout.generatedAt],
      ["Profile version", closeout.profileVersion],
      ["Closeout state", closeout.closeoutState],
      ["Ready", closeout.readyForRouteCatalogCleanupExpandedStabilityCloseout],
      ["Active Node version", closeout.activeNodeVersion],
      ["Source Node version", closeout.sourceNodeVersion],
      ["Execution allowed", closeout.executionAllowed],
    ],
    sections: [
      { heading: "Cross-Project Mode", entries: closeout.crossProjectMode },
      { heading: "Closed Gate", entries: closeout.closedGate },
      { heading: "Planned Segment", lines: closeout.plannedSegment.map((version) => `- ${version}`) },
      { heading: "Route Catalog", entries: closeout.routeCatalog },
      { heading: "Summary", entries: closeout.summary },
      { heading: "Checks", entries: closeout.checks },
      { heading: "Next Actions", list: closeout.nextActions, emptyText: "No next actions." },
    ],
  });
}
