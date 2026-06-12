import {
  renderVerificationArchiveFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration smoke archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive result", profile.archiveResult],
      ["Archive decision", profile.archiveDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      [
        "Ready for archive verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification,
      ],
      ["Ready for Node v348 rerun decision", profile.readyForNodeV348MinimalReadOnlyIntegrationRerunDecision],
      ["Requires Java v153 + mini-kv v144 echo", profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho],
      ["Reruns live probe", profile.rerunsLiveProbe],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v346", entries: profile.sourceNodeV346 },
      { heading: "Archive Verification", entries: profile.archiveVerification },
      {
        heading: "Archive References",
        lines: renderVerificationArchiveFileReferenceLines([
          profile.archiveReferences.jsonEvidence,
          profile.archiveReferences.markdownEvidence,
          profile.archiveReferences.smokeSummary,
          profile.archiveReferences.browserSnapshot,
          profile.archiveReferences.htmlArchive,
          profile.archiveReferences.screenshot,
          profile.archiveReferences.explanation,
          profile.archiveReferences.codeWalkthrough,
          profile.archiveReferences.activePlan,
          profile.archiveReferences.plansIndex,
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
