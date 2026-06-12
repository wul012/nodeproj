import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutMarkdown(
  closeout: JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup fresh baseline stability closeout",
    meta: [
      ["Service", closeout.service],
      ["Generated at", closeout.generatedAt],
      ["Profile version", closeout.profileVersion],
      ["Closeout state", closeout.closeoutState],
      ["Ready", closeout.readyForRouteCatalogCleanupFreshBaselineStabilityCloseout],
      ["Active Node version", closeout.activeNodeVersion],
      ["Source Node version", closeout.sourceNodeVersion],
      ["Execution allowed", closeout.executionAllowed],
    ],
    sections: [
      { heading: "Cross-Project Mode", entries: closeout.crossProjectMode },
      { heading: "Closed Versions", lines: closeout.closedVersions.map((version) => `- ${version}`) },
      { heading: "Route Catalog", entries: closeout.routeCatalog },
      { heading: "Source Archive", entries: closeout.sourceArchive },
      { heading: "Archive Verification", entries: closeout.archiveVerification },
      { heading: "Summary", entries: closeout.summary },
      { heading: "Checks", entries: closeout.checks },
      { heading: "Next Actions", list: closeout.nextActions, emptyText: "No next actions." },
    ],
  });
}
