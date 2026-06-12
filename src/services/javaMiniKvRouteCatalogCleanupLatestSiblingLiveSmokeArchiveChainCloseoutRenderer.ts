import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke archive chain closeout",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Closeout state", profile.closeoutState],
      ["Ready", profile.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Completed Node Versions", lines: profile.completedNodeVersions.map((version) => `- ${version}`) },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Latest Verifier", entries: profile.latestVerifier },
      { heading: "Current Route Catalog", entries: profile.currentRouteCatalog },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
