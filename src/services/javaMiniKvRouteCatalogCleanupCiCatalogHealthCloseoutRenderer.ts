import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout,
} from "./javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutMarkdown(
  closeout: JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup CI/catalog health closeout",
    meta: [
      ["Service", closeout.service],
      ["Generated at", closeout.generatedAt],
      ["Profile version", closeout.profileVersion],
      ["Closeout state", closeout.closeoutState],
      ["Ready", closeout.readyForRouteCatalogCleanupCiCatalogHealthCloseout],
      ["Active Node version", closeout.activeNodeVersion],
      ["Source Node version", closeout.sourceNodeVersion],
      ["Execution allowed", closeout.executionAllowed],
    ],
    sections: [
      { heading: "Cross-Project Mode", entries: closeout.crossProjectMode },
      { heading: "Closed Gate", entries: closeout.closedGate },
      { heading: "Route Quality", entries: closeout.routeQuality },
      { heading: "CI Observation", entries: closeout.ciObservation },
      { heading: "Planned Segment", lines: closeout.plannedSegment.map((version) => `- ${version}`) },
      { heading: "Route Catalog", entries: closeout.routeCatalog },
      { heading: "Summary", entries: closeout.summary },
      { heading: "Checks", entries: closeout.checks },
      { heading: "Next Actions", list: closeout.nextActions, emptyText: "No next actions." },
    ],
  });
}
