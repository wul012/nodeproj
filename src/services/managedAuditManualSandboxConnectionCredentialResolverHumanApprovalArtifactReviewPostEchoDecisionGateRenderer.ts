import { renderEntries, renderList, renderMessages } from "./liveProbeReportUtils.js";
import type {
  HumanApprovalArtifactReviewPostEchoNoGoCondition,
  HumanApprovalArtifactReviewPostEchoPrerequisite,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Decision gate state: ${profile.decisionGateState}`,
    `- Runtime shell chain decision: ${profile.runtimeShellChainDecision}`,
    `- Ready for decision gate: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate}`,
    `- Ready for Java v144 + mini-kv v137 echo request: ${profile.readyForParallelJavaV144MiniKvV137EchoRequest}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Runtime shell invocation allowed: ${profile.runtimeShellInvocationAllowed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v309",
    "",
    ...renderEntries(profile.sourceNodeV309),
    "",
    "## Decision Gate",
    "",
    ...renderEntries({
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
    }),
    "",
    "## Required Post-Echo Prerequisites",
    "",
    ...renderList(
      profile.decisionGate.requiredPrerequisites.map(formatPrerequisite),
      "No post-echo prerequisites.",
    ),
    "",
    "## Explicit No-Go Conditions",
    "",
    ...renderList(
      profile.decisionGate.explicitNoGoConditions.map(formatNoGoCondition),
      "No no-go conditions.",
    ),
    "",
    "## Necessity Proof",
    "",
    ...renderEntries(profile.decisionGate.necessityProof),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No human approval artifact review post-echo decision gate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No human approval artifact review post-echo decision gate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No human approval artifact review post-echo decision gate recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function formatPrerequisite(prerequisite: HumanApprovalArtifactReviewPostEchoPrerequisite): string {
  return `${prerequisite.id}: ${prerequisite.status} - ${prerequisite.label}; evidence=${prerequisite.currentEvidence}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: HumanApprovalArtifactReviewPostEchoNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
