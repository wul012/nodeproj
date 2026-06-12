import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewProfile,
  SignedHumanApprovalArtifactClosurePrerequisite,
  SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver signed human approval artifact prerequisite closure review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Prerequisite closure decision", profile.prerequisiteClosureDecision],
      [
        "Ready for closure review",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview,
      ],
      ["Active Node review version", profile.activeNodeReviewVersion],
      ["Ready for credential handle contract intake", profile.readyForCredentialHandleContractIntake],
      ["New Java + mini-kv echo requested", profile.newJavaMiniKvEchoRequested],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v315", lines: renderSourceNodeV315(profile.sourceNodeV315) },
      { heading: "Closure Review", lines: renderClosureReview(profile.closureReview) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No signed human approval artifact prerequisite closure review blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No signed human approval artifact prerequisite closure review warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No signed human approval artifact prerequisite closure review recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV315(
  reference: SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    verificationState: reference.verificationState,
    readyForSignedHumanApprovalArtifactContractUpstreamEchoVerification:
      reference.readyForSignedHumanApprovalArtifactContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: reference.readOnlyUpstreamEchoVerification,
    verificationDigest: reference.verificationDigest,
    sourceSpan: reference.sourceSpan,
    upstreamEchoAligned: reference.upstreamEchoAligned,
    artifactContractAligned: reference.artifactContractAligned,
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

function renderPrerequisites(prerequisites: SignedHumanApprovalArtifactClosurePrerequisite[]): string[] {
  return renderList(
    prerequisites.map((prerequisite) =>
      `${prerequisite.id}: ${prerequisite.closureState}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}; opensRuntimeShell=${prerequisite.opensRuntimeShell}; evidence=${prerequisite.evidence}`),
    "No prerequisites.",
  );
}

function renderClosureReview(
  review: ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewProfile[
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
