import {
  renderVerificationArchiveFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v353 decision record", profile.readyForNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord],
      ["Reruns live probe", profile.rerunsLiveProbe],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Secret provider instantiated", profile.secretProviderInstantiated],
      ["Resolver client instantiated", profile.resolverClientInstantiated],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v351", entries: profile.sourceNodeV351 },
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
