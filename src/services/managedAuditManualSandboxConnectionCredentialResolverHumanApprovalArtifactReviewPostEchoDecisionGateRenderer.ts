import type {
  HumanApprovalArtifactReviewPostEchoNoGoCondition,
  HumanApprovalArtifactReviewPostEchoPrerequisite,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision gate",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision gate state", profile.decisionGateState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for decision gate",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
      ],
      ["Ready for Java v144 + mini-kv v137 echo request", profile.readyForParallelJavaV144MiniKvV137EchoRequest],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v309", entries: profile.sourceNodeV309 },
      { heading: "Decision Gate", entries: renderDecisionGateEntries(profile) },
      {
        heading: "Required Post-Echo Prerequisites",
        list: profile.decisionGate.requiredPrerequisites.map(formatPrerequisite),
        emptyText: "No post-echo prerequisites.",
      },
      {
        heading: "Explicit No-Go Conditions",
        list: profile.decisionGate.explicitNoGoConditions.map(formatNoGoCondition),
        emptyText: "No no-go conditions.",
      },
      { heading: "Necessity Proof", entries: profile.decisionGate.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No human approval artifact review post-echo decision gate blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No human approval artifact review post-echo decision gate warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No human approval artifact review post-echo decision gate recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderDecisionGateEntries(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile,
): object {
  return {
    decisionDigest: profile.decisionGate.decisionDigest,
    gateMode: profile.decisionGate.gateMode,
    decisionScope: profile.decisionGate.decisionScope,
    sourceSpan: profile.decisionGate.sourceSpan,
    decision: profile.decisionGate.decision,
    selectedPath: profile.decisionGate.selectedPath,
    decisionReason: profile.decisionGate.decisionReason,
    allowsParallelJavaV144MiniKvV137EchoRequest:
      profile.decisionGate.allowsParallelJavaV144MiniKvV137EchoRequest,
    allowsNodeV311BeforeUpstreamEcho: profile.decisionGate.allowsNodeV311BeforeUpstreamEcho,
    allowsDisabledRuntimeShellImplementation:
      profile.decisionGate.allowsDisabledRuntimeShellImplementation,
    allowsDisabledRuntimeShellInvocation:
      profile.decisionGate.allowsDisabledRuntimeShellInvocation,
    allowsCredentialValueRead: profile.decisionGate.allowsCredentialValueRead,
    allowsRawEndpointUrlParse: profile.decisionGate.allowsRawEndpointUrlParse,
    allowsManagedAuditConnection: profile.decisionGate.allowsManagedAuditConnection,
    prerequisiteCount: profile.decisionGate.prerequisiteCount,
    missingPrerequisiteCount: profile.decisionGate.missingPrerequisiteCount,
    noGoConditionCount: profile.decisionGate.noGoConditionCount,
  };
}

function formatPrerequisite(prerequisite: HumanApprovalArtifactReviewPostEchoPrerequisite): string {
  return `${prerequisite.id}: ${prerequisite.status} - ${prerequisite.label}; evidence=${prerequisite.currentEvidence}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: HumanApprovalArtifactReviewPostEchoNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
