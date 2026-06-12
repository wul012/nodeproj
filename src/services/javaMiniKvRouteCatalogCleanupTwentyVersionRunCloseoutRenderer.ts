import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout,
} from "./javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutMarkdown(
  closeout: JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup twenty-version run closeout",
    meta: [
      ["Service", closeout.service],
      ["Generated at", closeout.generatedAt],
      ["Profile version", closeout.profileVersion],
      ["Closeout state", closeout.closeoutState],
      ["Ready", closeout.readyForRouteCatalogCleanupTwentyVersionRunCloseout],
      ["Active Node version", closeout.activeNodeVersion],
      ["Source Node version", closeout.sourceNodeVersion],
      ["Execution allowed", closeout.executionAllowed],
    ],
    sections: [
      { heading: "Cross-Project Mode", entries: closeout.crossProjectMode },
      { heading: "Completed Versions", lines: closeout.completedVersions.map((version) => `- ${version}`) },
      { heading: "Remaining Versions", lines: closeout.remainingVersions.map((version) => `- ${version}`) },
      { heading: "Route Catalog", entries: closeout.routeCatalog },
      { heading: "Stability Verifier", entries: closeout.stabilityVerifier },
      { heading: "Summary", entries: closeout.summary },
      { heading: "Checks", entries: closeout.checks },
      { heading: "Next Actions", list: closeout.nextActions, emptyText: "No next actions." },
    ],
  });
}
