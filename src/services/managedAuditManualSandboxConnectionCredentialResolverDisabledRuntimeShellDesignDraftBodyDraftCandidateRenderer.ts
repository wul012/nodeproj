import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
} from "./releaseReportShared.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Draft candidate state": profile.draftCandidateState,
        "Draft candidate decision": profile.draftCandidateDecision,
        "Active Node version": profile.activeNodeVersion,
        "Source Node version": profile.sourceNodeVersion,
        "Ready for v343 body draft candidate":
          profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate,
        "Ready for Node v344 archive verification":
          profile.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification,
        "Ready for disabled runtime shell design draft": profile.readyForDisabledRuntimeShellDesignDraft,
        "Ready for runtime shell implementation": profile.readyForRuntimeShellImplementation,
        "Execution allowed": profile.executionAllowed,
        "Credential value read": profile.credentialValueRead,
        "Raw endpoint URL parsed": profile.rawEndpointUrlParsed,
        "HTTP request sent": profile.httpRequestSent,
        "TCP connection attempted": profile.tcpConnectionAttempted,
        "Java SQL execution allowed": profile.javaSqlExecutionAllowed,
        "mini-kv write command allowed": profile.miniKvWriteCommandAllowed,
        "Automatic upstream start": profile.automaticUpstreamStart,
      },
    ),
    ...renderReleaseReportEntriesSection("Source Node v342", {
      archiveVerificationState: profile.sourceNodeV342.archiveVerificationState,
      archiveVerificationDecision: profile.sourceNodeV342.archiveVerificationDecision,
      readyForArchiveVerification: profile.sourceNodeV342.readyForArchiveVerification,
      readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate:
        profile.sourceNodeV342.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate,
      archiveVerificationDigest: profile.sourceNodeV342.archiveVerificationDigest,
      sourcePlanDigest: profile.sourceNodeV342.sourcePlanDigest,
      sourceChecks: `${profile.sourceNodeV342.sourcePassedCheckCount}/${profile.sourceNodeV342.sourceCheckCount}`,
      sourceArchiveFiles:
        `${profile.sourceNodeV342.sourcePresentArchiveFileCount}/${profile.sourceNodeV342.sourceArchiveFileCount}`,
      sourceProductionBlockers: profile.sourceNodeV342.sourceProductionBlockerCount,
    }),
    ...renderReleaseReportEntriesSection("Necessity Proof", profile.necessityProof),
    ...renderReleaseReportEntriesSection("Draft Candidate", profile.draftCandidate),
    ...renderReleaseReportLineSection(
      "Body Sections",
      profile.bodySections.map((entry) => `- ${entry.id}: ${entry.title}; ${entry.body}`),
    ),
    ...renderReleaseReportLineSection(
      "Evidence Citations",
      profile.evidenceCitations.map((entry) =>
      `- ${entry.id}: ${entry.sourceVersion}; ${entry.citationRole}; cited=${entry.citedByDraftCandidate}`),
    ),
    ...renderReleaseReportLineSection(
      "Safety Guards",
      profile.safetyGuards.map((entry) => `- ${entry.id}: enforced=${entry.enforced}`),
    ),
    ...renderReleaseReportLineSection(
      "Stop Conditions",
      profile.stopConditions.map((entry) => `- ${entry.code}: action=${entry.action}`),
    ),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSection("Summary", {
      Checks: `${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
      "Source Node v342 checks":
        `${profile.summary.sourceNodeV342PassedCheckCount}/${profile.summary.sourceNodeV342CheckCount}`,
      "Source archive files":
        `${profile.summary.sourcePresentArchiveFileCount}/${profile.summary.sourceArchiveFileCount}`,
      "Source production blockers": profile.summary.sourceProductionBlockerCount,
      "Body sections": profile.summary.sectionCount,
      "Evidence citations": profile.summary.evidenceCitationCount,
      "Safety guards": profile.summary.safetyGuardCount,
      "Stop conditions": profile.summary.stopConditionCount,
      "Production blockers": profile.summary.productionBlockerCount,
      Warnings: profile.summary.warningCount,
      Recommendations: profile.summary.recommendationCount,
    }),
    ...renderReleaseReportMessagesSection("Production Blockers", profile.productionBlockers, "No production blockers."),
    ...renderReleaseReportMessagesSection("Warnings", profile.warnings, "No warnings."),
    ...renderReleaseReportMessagesSection("Recommendations", profile.recommendations, "No recommendations."),
    ...renderReleaseReportLineSection("Next Actions", profile.nextActions.map((item) => `- ${item}`)),
  ].join("\n");
}
