import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  AbortRollbackSemanticsContract,
  ManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeProfile,
  SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver abort/rollback semantics contract intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Contract state", profile.contractState],
      ["Governance chain decision", profile.governanceChainDecision],
      [
        "Ready for contract intake",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake,
      ],
      ["Active Node contract version", profile.activeNodeContractVersion],
      ["Target prerequisite id", profile.targetPrerequisiteId],
      ["Ready for Java v150 + mini-kv v142 echo", profile.readyForParallelJavaV150MiniKvV142Echo],
      ["Ready for Node v327 before upstream echo", profile.readyForNodeV327BeforeUpstreamEcho],
      ["Ready for final prerequisite closure review", profile.readyForFinalPrerequisiteClosureReview],
      ["Abort/rollback semantics executed", profile.abortRollbackSemanticsExecuted],
      ["Rollback execution allowed", profile.rollbackExecutionAllowed],
      ["Deployment action allowed", profile.deploymentActionAllowed],
      ["Java SQL execution allowed", profile.javaSqlExecutionAllowed],
      ["mini-kv write command allowed", profile.miniKvWriteCommandAllowed],
      ["Runtime shell command rendered", profile.runtimeShellCommandRendered],
      ["HTTP request sent", profile.httpRequestSent],
      ["TCP connection attempted", profile.tcpConnectionAttempted],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v325", lines: renderSourceNodeV325(profile.sourceNodeV325) },
      { heading: "Abort/Rollback Semantics Contract", lines: renderContract(profile.abortRollbackSemanticsContract) },
      { heading: "Prerequisite Transition", entries: profile.prerequisiteTransition },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No abort/rollback semantics contract intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No abort/rollback semantics contract intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No abort/rollback semantics contract intake recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV325(
  reference: SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    reviewState: reference.reviewState,
    readyForNoNetworkSafetyFixturePrerequisiteClosureReview:
      reference.readyForNoNetworkSafetyFixturePrerequisiteClosureReview,
    reviewDigest: reference.reviewDigest,
    prerequisiteClosureDecision: reference.prerequisiteClosureDecision,
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

function renderContract(contract: AbortRollbackSemanticsContract): string[] {
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
      abortRollbackExecutionAllowed: contract.abortRollbackExecutionAllowed,
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
