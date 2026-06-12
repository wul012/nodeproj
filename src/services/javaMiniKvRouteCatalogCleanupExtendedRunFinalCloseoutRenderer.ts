import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout,
} from "./javaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseoutMarkdown(
  closeout: JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup extended run final closeout",
    meta: [
      ["Service", closeout.service],
      ["Generated at", closeout.generatedAt],
      ["Profile version", closeout.profileVersion],
      ["Closeout state", closeout.closeoutState],
      ["Ready", closeout.readyForRouteCatalogCleanupExtendedRunFinalCloseout],
      ["Active Node version", closeout.activeNodeVersion],
      ["Source Node version", closeout.sourceNodeVersion],
      ["Execution allowed", closeout.executionAllowed],
    ],
    sections: [
      {
        heading: "Cross-Project Mode",
        entries: closeout.crossProjectMode,
      },
      {
        heading: "Completed Follow-Up Versions",
        lines: closeout.completedFollowUpVersions.map((version) => `- ${version}`),
      },
      { heading: "Final Gate", entries: closeout.finalGate },
      { heading: "Route Quality", entries: closeout.routeQuality },
      { heading: "CI Observation", entries: closeout.ciObservation },
      { heading: "Route Catalog", entries: closeout.routeCatalog },
      { heading: "Summary", entries: closeout.summary },
      { heading: "Checks", entries: closeout.checks },
      { heading: "Next Actions", list: closeout.nextActions, emptyText: "No next actions." },
    ],
  });
}
