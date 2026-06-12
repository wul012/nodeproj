import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  CredentialHandleApprovalClosurePrerequisite,
  ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewProfile,
  SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver credential handle approval prerequisite closure review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Prerequisite closure decision", profile.prerequisiteClosureDecision],
      [
        "Ready for closure review",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview,
      ],
      ["Active Node review version", profile.activeNodeReviewVersion],
      ["Ready for endpoint handle allowlist contract intake", profile.readyForEndpointHandleAllowlistContractIntake],
      ["New Java + mini-kv echo requested", profile.newJavaMiniKvEchoRequested],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v318", lines: renderSourceNodeV318(profile.sourceNodeV318) },
      { heading: "Closure Review", lines: renderClosureReview(profile.closureReview) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential handle approval prerequisite closure review blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential handle approval prerequisite closure review warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential handle approval prerequisite closure review recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV318(
  reference: SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    verificationState: reference.verificationState,
    readyForCredentialHandleApprovalContractUpstreamEchoVerification:
      reference.readyForCredentialHandleApprovalContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: reference.readOnlyUpstreamEchoVerification,
    verificationDigest: reference.verificationDigest,
    sourceSpan: reference.sourceSpan,
    upstreamEchoAligned: reference.upstreamEchoAligned,
    credentialHandleContractAligned: reference.credentialHandleContractAligned,
    sideEffectBoundariesAligned: reference.sideEffectBoundariesAligned,
    implementationStillBlocked: reference.implementationStillBlocked,
    contractDigest: reference.contractDigest,
    requiredFieldCount: reference.requiredFieldCount,
    prohibitedFieldCount: reference.prohibitedFieldCount,
    rejectionReasonCount: reference.rejectionReasonCount,
    noGoBoundaryCount: reference.noGoBoundaryCount,
    upstreamEchoRequestCount: reference.upstreamEchoRequestCount,
    sourceProductionBlockerCount: reference.sourceProductionBlockerCount,
  });
}

function renderPrerequisites(prerequisites: CredentialHandleApprovalClosurePrerequisite[]): string[] {
  return renderList(
    prerequisites.map((prerequisite) =>
      `${prerequisite.id}: ${prerequisite.closureState}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}; opensRuntimeShell=${prerequisite.opensRuntimeShell}; evidence=${prerequisite.evidence}`),
    "No prerequisites.",
  );
}

function renderClosureReview(
  review: ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewProfile[
    "closureReview"
  ],
): string[] {
  return [
    ...renderEntries({
      reviewDigest: review.reviewDigest,
      reviewMode: review.reviewMode,
      sourceSpan: review.sourceSpan,
      sourceVerificationDigest: review.sourceVerificationDigest,
      completedPrerequisiteCount: review.completedPrerequisiteCount,
      remainingPrerequisiteCount: review.remainingPrerequisiteCount,
      originalPrerequisiteCount: review.originalPrerequisiteCount,
      movedPrerequisiteId: review.movedPrerequisiteId,
      movedFrom: review.movedFrom,
      movedTo: review.movedTo,
      nextConcretePrerequisiteId: review.nextConcretePrerequisiteId,
      nextConcretePrerequisiteContractRequired: review.nextConcretePrerequisiteContractRequired,
      nextNodeVersionSuggested: review.nextNodeVersionSuggested,
      nextJavaVersionRequested: review.nextJavaVersionRequested,
      nextMiniKvVersionRequested: review.nextMiniKvVersionRequested,
      chainContinuationAllowed: review.chainContinuationAllowed,
      runtimeShellStillBlocked: review.runtimeShellStillBlocked,
      closureReason: review.closureReason,
    }),
    "",
    "### Completed Prerequisites",
    "",
    ...renderPrerequisites(review.completedPrerequisites),
    "",
    "### Remaining Prerequisites",
    "",
    ...renderPrerequisites(review.remainingPrerequisites),
  ];
}
