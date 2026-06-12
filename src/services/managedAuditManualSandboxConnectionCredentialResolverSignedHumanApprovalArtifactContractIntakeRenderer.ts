import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeProfile,
  SignedHumanApprovalArtifactContract,
  SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver signed human approval artifact contract intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Contract state", profile.contractState],
      ["Governance chain decision", profile.governanceChainDecision],
      [
        "Ready for contract intake",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake,
      ],
      ["Active Node contract version", profile.activeNodeContractVersion],
      ["Target prerequisite id", profile.targetPrerequisiteId],
      ["Ready for Java v145 + mini-kv v138 echo", profile.readyForParallelJavaV145MiniKvV138Echo],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v312", lines: renderSourceNodeV312(profile.sourceNodeV312) },
      { heading: "Signed Artifact Contract", lines: renderContract(profile.signedArtifactContract) },
      { heading: "Prerequisite Transition", entries: profile.prerequisiteTransition },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No signed human approval artifact contract intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No signed human approval artifact contract intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No signed human approval artifact contract intake recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV312(reference: SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    decisionState: reference.decisionState,
    readyForClosureDecision: reference.readyForClosureDecision,
    decisionDigest: reference.decisionDigest,
    completedPrerequisiteCount: reference.completedPrerequisiteCount,
    remainingPrerequisiteCount: reference.remainingPrerequisiteCount,
    completedPrerequisiteIds: reference.completedPrerequisiteIds,
    remainingPrerequisiteIds: reference.remainingPrerequisiteIds,
    chainContinuationAllowed: reference.chainContinuationAllowed,
    nextConcretePrerequisiteContractRequired: reference.nextConcretePrerequisiteContractRequired,
  });
}

function renderContract(contract: SignedHumanApprovalArtifactContract): string[] {
  return [
    ...renderEntries({
      contractDigest: contract.contractDigest,
      artifactName: contract.artifactName,
      artifactVersion: contract.artifactVersion,
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
    "### Upstream Echo Requests",
    "",
    ...renderList(
      contract.upstreamEchoRequests.map((request) =>
        `${request.project} ${request.version}: ${request.requestedEcho}; readOnly=${request.mustRemainReadOnly}`),
      "No upstream echo requests.",
    ),
  ];
}
