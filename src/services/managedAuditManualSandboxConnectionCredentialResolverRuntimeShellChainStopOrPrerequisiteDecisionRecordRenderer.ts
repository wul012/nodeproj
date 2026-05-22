import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile,
  RuntimeShellChainNoGoCondition,
  RuntimeShellChainPrerequisite,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver runtime shell chain stop-or-prerequisite decision record",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Decision record state: ${profile.decisionRecordState}`,
    `- Runtime shell chain decision: ${profile.runtimeShellChainDecision}`,
    `- Ready for decision record: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord}`,
    `- Ready for Java v141 + mini-kv v134 echo request: ${profile.readyForParallelJavaV141MiniKvV134EchoRequest}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Runtime shell invocation allowed: ${profile.runtimeShellInvocationAllowed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v303",
    "",
    ...renderEntries(profile.sourceNodeV303),
    "",
    "## Decision Record",
    "",
    ...renderEntries({
      decisionDigest: profile.decisionRecord.decisionDigest,
      recordMode: profile.decisionRecord.recordMode,
      decisionScope: profile.decisionRecord.decisionScope,
      sourceSpan: profile.decisionRecord.sourceSpan,
      decision: profile.decisionRecord.decision,
      selectedPath: profile.decisionRecord.selectedPath,
      decisionReason: profile.decisionRecord.decisionReason,
      stopRuntimeShellChainWithoutPrerequisites:
        profile.decisionRecord.stopRuntimeShellChainWithoutPrerequisites,
      allowsParallelJavaV141MiniKvV134EchoRequest:
        profile.decisionRecord.allowsParallelJavaV141MiniKvV134EchoRequest,
      allowsNodeV305BeforeUpstreamEcho:
        profile.decisionRecord.allowsNodeV305BeforeUpstreamEcho,
      allowsDisabledRuntimeShellImplementation:
        profile.decisionRecord.allowsDisabledRuntimeShellImplementation,
      allowsDisabledRuntimeShellInvocation:
        profile.decisionRecord.allowsDisabledRuntimeShellInvocation,
      allowsCredentialValueRead: profile.decisionRecord.allowsCredentialValueRead,
      allowsRawEndpointUrlParse: profile.decisionRecord.allowsRawEndpointUrlParse,
      allowsManagedAuditConnection: profile.decisionRecord.allowsManagedAuditConnection,
      prerequisiteCount: profile.decisionRecord.prerequisiteCount,
      missingRuntimePrerequisiteCount: profile.decisionRecord.missingRuntimePrerequisiteCount,
      noGoConditionCount: profile.decisionRecord.noGoConditionCount,
    }),
    "",
    "## Required Prerequisites",
    "",
    ...renderList(
      profile.decisionRecord.requiredPrerequisites.map(formatPrerequisite),
      "No required prerequisites.",
    ),
    "",
    "## Explicit No-Go Conditions",
    "",
    ...renderList(
      profile.decisionRecord.explicitNoGoConditions.map(formatNoGoCondition),
      "No no-go conditions.",
    ),
    "",
    "## Necessity Proof",
    "",
    ...renderEntries(profile.decisionRecord.necessityProof),
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
    ...renderMessages(profile.productionBlockers, "No runtime shell chain decision record blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No runtime shell chain decision record warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No runtime shell chain decision record recommendations."),
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

function formatPrerequisite(prerequisite: RuntimeShellChainPrerequisite): string {
  return `${prerequisite.id}: ${prerequisite.status} - ${prerequisite.label}; evidence=${prerequisite.currentEvidence}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: RuntimeShellChainNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
