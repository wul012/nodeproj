import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewProfile,
  NoNetworkSafetyFixtureClosurePrerequisite,
  SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver no-network safety fixture prerequisite closure review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Prerequisite closure decision", profile.prerequisiteClosureDecision],
      [
        "Ready for closure review",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview,
      ],
      ["Active Node review version", profile.activeNodeReviewVersion],
      ["Ready for abort/rollback semantics contract intake", profile.readyForAbortRollbackSemanticsContractIntake],
      ["New Java + mini-kv echo requested", profile.newJavaMiniKvEchoRequested],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Network safety fixture executed", profile.networkSafetyFixtureExecuted],
      ["HTTP request sent", profile.httpRequestSent],
      ["TCP connection attempted", profile.tcpConnectionAttempted],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v324", lines: renderSourceNodeV324(profile.sourceNodeV324) },
      { heading: "Closure Review", lines: renderClosureReview(profile.closureReview) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No no-network safety fixture prerequisite closure review blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No no-network safety fixture prerequisite closure review warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No no-network safety fixture prerequisite closure review recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV324(
  reference: SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    verificationState: reference.verificationState,
    readyForNoNetworkSafetyFixtureUpstreamEchoVerification:
      reference.readyForNoNetworkSafetyFixtureUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: reference.readOnlyUpstreamEchoVerification,
    verificationDigest: reference.verificationDigest,
    sourceSpan: reference.sourceSpan,
    sourceNodeV323Ready: reference.sourceNodeV323Ready,
    javaV149EchoReady: reference.javaV149EchoReady,
    miniKvV141ReceiptReady: reference.miniKvV141ReceiptReady,
    upstreamEchoAligned: reference.upstreamEchoAligned,
    noNetworkSafetyFixtureContractAligned: reference.noNetworkSafetyFixtureContractAligned,
    sideEffectBoundariesAligned: reference.sideEffectBoundariesAligned,
    implementationStillBlocked: reference.implementationStillBlocked,
    remainingPrerequisitesAfterV324: reference.remainingPrerequisitesAfterV324,
    contractDigest: reference.contractDigest,
    requiredFieldCount: reference.requiredFieldCount,
    prohibitedFieldCount: reference.prohibitedFieldCount,
    rejectionReasonCount: reference.rejectionReasonCount,
    noGoBoundaryCount: reference.noGoBoundaryCount,
    upstreamEchoRequestCount: reference.upstreamEchoRequestCount,
    sourceProductionBlockerCount: reference.sourceProductionBlockerCount,
  });
}

function renderPrerequisites(prerequisites: NoNetworkSafetyFixtureClosurePrerequisite[]): string[] {
  return renderList(
    prerequisites.map((prerequisite) =>
      `${prerequisite.id}: ${prerequisite.closureState}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}; opensRuntimeShell=${prerequisite.opensRuntimeShell}; evidence=${prerequisite.evidence}`),
    "No prerequisites.",
  );
}

function renderClosureReview(
  review: ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewProfile[
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
