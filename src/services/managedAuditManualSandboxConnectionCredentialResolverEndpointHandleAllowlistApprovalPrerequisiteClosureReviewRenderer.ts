import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  EndpointHandleAllowlistApprovalClosurePrerequisite,
  ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewProfile,
  SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval prerequisite closure review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Prerequisite closure decision", profile.prerequisiteClosureDecision],
      [
        "Ready for closure review",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview,
      ],
      ["Active Node review version", profile.activeNodeReviewVersion],
      ["Ready for no-network safety fixture contract intake", profile.readyForNoNetworkSafetyFixtureContractIntake],
      ["New Java + mini-kv echo requested", profile.newJavaMiniKvEchoRequested],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
    ],
    sections: [
      { heading: "Source Node v321", lines: renderSourceNodeV321(profile.sourceNodeV321) },
      { heading: "Closure Review", lines: renderClosureReview(profile.closureReview) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No endpoint handle allowlist prerequisite closure review blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No endpoint handle allowlist prerequisite closure review warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No endpoint handle allowlist prerequisite closure review recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV321(
  reference: SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    verificationState: reference.verificationState,
    readyForEndpointHandleAllowlistApprovalContractUpstreamEchoVerification:
      reference.readyForEndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: reference.readOnlyUpstreamEchoVerification,
    verificationDigest: reference.verificationDigest,
    sourceSpan: reference.sourceSpan,
    sourceNodeV320Ready: reference.sourceNodeV320Ready,
    javaV147EchoReady: reference.javaV147EchoReady,
    miniKvV140ReceiptReady: reference.miniKvV140ReceiptReady,
    upstreamEchoAligned: reference.upstreamEchoAligned,
    endpointHandleAllowlistContractAligned: reference.endpointHandleAllowlistContractAligned,
    sideEffectBoundariesAligned: reference.sideEffectBoundariesAligned,
    implementationStillBlocked: reference.implementationStillBlocked,
    remainingPrerequisitesAfterV321: reference.remainingPrerequisitesAfterV321,
    contractDigest: reference.contractDigest,
    requiredFieldCount: reference.requiredFieldCount,
    prohibitedFieldCount: reference.prohibitedFieldCount,
    rejectionReasonCount: reference.rejectionReasonCount,
    noGoBoundaryCount: reference.noGoBoundaryCount,
    upstreamEchoRequestCount: reference.upstreamEchoRequestCount,
    sourceProductionBlockerCount: reference.sourceProductionBlockerCount,
  });
}

function renderPrerequisites(prerequisites: EndpointHandleAllowlistApprovalClosurePrerequisite[]): string[] {
  return renderList(
    prerequisites.map((prerequisite) =>
      `${prerequisite.id}: ${prerequisite.closureState}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}; opensRuntimeShell=${prerequisite.opensRuntimeShell}; evidence=${prerequisite.evidence}`),
    "No prerequisites.",
  );
}

function renderClosureReview(
  review: ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewProfile[
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
