import {
  renderVerificationArchiveFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver minimal shard readiness regular gate archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      [
        "Ready for Node v376 Java/mini-kv shard evidence consumption",
        profile.readyForNodeV376JavaMiniKvShardEvidenceConsumption,
      ],
      ["Archive verification only", profile.archiveVerificationOnly],
      ["Reruns live read", profile.rerunsLiveRead],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v374", entries: profile.sourceNodeV374 },
      { heading: "Archive Verification", entries: profile.archiveVerification },
      {
        heading: "Archive References",
        lines: renderVerificationArchiveFileReferenceLines([
          profile.archiveReferences.jsonEvidence,
          profile.archiveReferences.markdownEvidence,
          profile.archiveReferences.summaryEvidence,
          profile.archiveReferences.browserSnapshot,
          profile.archiveReferences.htmlArchive,
          profile.archiveReferences.screenshot,
          profile.archiveReferences.explanation,
          profile.archiveReferences.codeWalkthrough,
          profile.archiveReferences.sourcePlan,
          profile.archiveReferences.plansIndex,
          profile.archiveReferences.archiveIndex,
        ]),
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
