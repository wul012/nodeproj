import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  EndpointHandleAllowlistApprovalContract,
  ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeProfile,
  SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Contract state", profile.contractState],
      ["Governance chain decision", profile.governanceChainDecision],
      [
        "Ready for contract intake",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake,
      ],
      ["Active Node contract version", profile.activeNodeContractVersion],
      ["Target prerequisite id", profile.targetPrerequisiteId],
      ["Ready for Java v147 + mini-kv v140 echo", profile.readyForParallelJavaV147MiniKvV140Echo],
      ["Ready for Node v321 before upstream echo", profile.readyForNodeV321BeforeUpstreamEcho],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Secret provider instantiated", profile.secretProviderInstantiated],
      ["Resolver client instantiated", profile.resolverClientInstantiated],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v319", lines: renderSourceNodeV319(profile.sourceNodeV319) },
      {
        heading: "Endpoint Handle Allowlist Approval Contract",
        lines: renderContract(profile.endpointHandleAllowlistApprovalContract),
      },
      { heading: "Prerequisite Transition", entries: profile.prerequisiteTransition },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No endpoint handle allowlist approval contract intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No endpoint handle allowlist approval contract intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No endpoint handle allowlist approval contract intake recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV319(
  reference: SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    reviewState: reference.reviewState,
    readyForCredentialHandleApprovalPrerequisiteClosureReview:
      reference.readyForCredentialHandleApprovalPrerequisiteClosureReview,
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

function renderContract(contract: EndpointHandleAllowlistApprovalContract): string[] {
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


