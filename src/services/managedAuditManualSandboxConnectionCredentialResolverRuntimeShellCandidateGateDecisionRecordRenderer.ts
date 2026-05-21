import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile,
  RuntimeShellCandidateGateDecisionNoGoCondition,
  RuntimeShellCandidateGateDecisionRequirement,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver runtime shell candidate gate decision record",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Decision record state: ${profile.decisionRecordState}`,
    `- Runtime shell decision: ${profile.runtimeShellDecision}`,
    `- Ready for decision record: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord}`,
    `- Ready for Java v135 + mini-kv v132 echo request: ${profile.readyForParallelJavaV135MiniKvV132EchoRequest}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Runtime shell invocation allowed: ${profile.runtimeShellInvocationAllowed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v298",
    "",
    ...renderEntries(profile.sourceNodeV298),
    "",
    "## Decision Record",
    "",
    ...renderEntries({
      decisionDigest: profile.decisionRecord.decisionDigest,
      recordMode: profile.decisionRecord.recordMode,
      decisionScope: profile.decisionRecord.decisionScope,
      sourceSpan: profile.decisionRecord.sourceSpan,
      decision: profile.decisionRecord.decision,
      decisionReason: profile.decisionRecord.decisionReason,
      upstreamEchoVerified: profile.decisionRecord.upstreamEchoVerified,
      allowsParallelJavaV135MiniKvV132EchoRequest:
        profile.decisionRecord.allowsParallelJavaV135MiniKvV132EchoRequest,
      allowsNodeV300BeforeUpstreamEcho:
        profile.decisionRecord.allowsNodeV300BeforeUpstreamEcho,
      allowsDisabledRuntimeShellImplementation:
        profile.decisionRecord.allowsDisabledRuntimeShellImplementation,
      allowsDisabledRuntimeShellInvocation:
        profile.decisionRecord.allowsDisabledRuntimeShellInvocation,
      allowsCredentialValueRead: profile.decisionRecord.allowsCredentialValueRead,
      allowsRawEndpointUrlParse: profile.decisionRecord.allowsRawEndpointUrlParse,
      allowsManagedAuditConnection: profile.decisionRecord.allowsManagedAuditConnection,
      requiredEvidenceCount: profile.decisionRecord.requiredEvidenceCount,
      noGoConditionCount: profile.decisionRecord.noGoConditionCount,
    }),
    "",
    "## Required Evidence",
    "",
    ...renderList(
      profile.decisionRecord.requiredEvidence.map(formatRequirement),
      "No required evidence.",
    ),
    "",
    "## Explicit No-Go Conditions",
    "",
    ...renderList(
      profile.decisionRecord.explicitNoGoConditions.map(formatNoGoCondition),
      "No no-go conditions.",
    ),
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
    ...renderMessages(profile.productionBlockers, "No runtime shell candidate gate decision record blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No runtime shell candidate gate decision record warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No runtime shell candidate gate decision record recommendations."),
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

function formatRequirement(requirement: RuntimeShellCandidateGateDecisionRequirement): string {
  return `${requirement.id}: ${requirement.status} - ${requirement.label}; evidence=${requirement.currentEvidence}; requiredBeforeRuntimeShell=${requirement.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: RuntimeShellCandidateGateDecisionNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
