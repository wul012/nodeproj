import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeProfile,
  NoNetworkSafetyFixtureContract,
  SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver no-network safety fixture contract intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Contract state", profile.contractState],
      ["Governance chain decision", profile.governanceChainDecision],
      [
        "Ready for contract intake",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake,
      ],
      ["Active Node contract version", profile.activeNodeContractVersion],
      ["Target prerequisite id", profile.targetPrerequisiteId],
      ["Ready for Java v149 + mini-kv v141 echo", profile.readyForParallelJavaV149MiniKvV141Echo],
      ["Ready for Node v324 before upstream echo", profile.readyForNodeV324BeforeUpstreamEcho],
      ["Network safety fixture executed", profile.networkSafetyFixtureExecuted],
      ["HTTP request sent", profile.httpRequestSent],
      ["TCP connection attempted", profile.tcpConnectionAttempted],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Secret provider instantiated", profile.secretProviderInstantiated],
      ["Resolver client instantiated", profile.resolverClientInstantiated],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v322", lines: renderSourceNodeV322(profile.sourceNodeV322) },
      { heading: "No-Network Safety Fixture Contract", lines: renderContract(profile.noNetworkSafetyFixtureContract) },
      { heading: "Prerequisite Transition", entries: profile.prerequisiteTransition },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No no-network safety fixture contract intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No no-network safety fixture contract intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No no-network safety fixture contract intake recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV322(
  reference: SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    reviewState: reference.reviewState,
    readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview:
      reference.readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview,
    reviewDigest: reference.reviewDigest,
    completedPrerequisiteCount: reference.completedPrerequisiteCount,
    remainingPrerequisiteCount: reference.remainingPrerequisiteCount,
    originalPrerequisiteCount: reference.originalPrerequisiteCount,
    nextConcretePrerequisiteId: reference.nextConcretePrerequisiteId,
    nextConcretePrerequisiteContractRequired: reference.nextConcretePrerequisiteContractRequired,
    nextNodeVersionSuggested: reference.nextNodeVersionSuggested,
    chainContinuationAllowed: reference.chainContinuationAllowed,
    runtimeShellStillBlocked: reference.runtimeShellStillBlocked,
    completedPrerequisiteIds: reference.completedPrerequisiteIds,
    remainingPrerequisiteIds: reference.remainingPrerequisiteIds,
  });
}

function renderContract(contract: NoNetworkSafetyFixtureContract): string[] {
  return [
    ...renderEntries({
      contractDigest: contract.contractDigest,
      contractName: contract.contractName,
      contractVersion: contract.contractVersion,
      contractMode: contract.contractMode,
      sourceSpan: contract.sourceSpan,
      targetPrerequisiteId: contract.targetPrerequisiteId,
      purpose: contract.purpose,
      requiredFieldCount: contract.requiredFieldCount,
      prohibitedFieldCount: contract.prohibitedFieldCount,
      rejectionReasonCount: contract.rejectionReasonCount,
      noGoBoundaryCount: contract.noGoBoundaryCount,
      upstreamEchoRequestCount: contract.upstreamEchoRequestCount,
      implementationStillBlocked: contract.implementationStillBlocked,
      fixtureExecutionAllowed: contract.fixtureExecutionAllowed,
    }),
    "",
    "### Required Fields",
    "",
    ...renderList(
      contract.requiredFields.map((field) => `${field.id}: ${field.acceptedShape}; ${field.purpose}`),
      "No required fields.",
    ),
    "",
    "### Prohibited Fields",
    "",
    ...renderList(
      contract.prohibitedFields.map((field) => `${field.id}: ${field.rejectionCode}; ${field.reason}`),
      "No prohibited fields.",
    ),
    "",
    "### Rejection Reasons",
    "",
    ...renderList(
      contract.rejectionReasons.map((reason) => `${reason.code}: ${reason.source}; ${reason.message}`),
      "No rejection reasons.",
    ),
    "",
    "### No-Go Boundaries",
    "",
    ...renderList(
      contract.noGoBoundaries.map((boundary) => `${boundary.id}: allowed=${boundary.allowed}; ${boundary.message}`),
      "No no-go boundaries.",
    ),
    "",
    "### Upstream Echo Requests",
    "",
    ...renderList(
      contract.upstreamEchoRequests.map((request) =>
        `${request.project} ${request.version}: ${request.requestedEcho}; readOnly=${request.mustRemainReadOnly}`),
      "No upstream echo requests.",
    ),
  ];
}
