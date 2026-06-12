import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile,
  RuntimeShellChainNoGoCondition,
  RuntimeShellChainPrerequisite,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver runtime shell chain stop-or-prerequisite decision record",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision record state", profile.decisionRecordState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for decision record",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord,
      ],
      ["Ready for Java v141 + mini-kv v134 echo request", profile.readyForParallelJavaV141MiniKvV134EchoRequest],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v303", entries: profile.sourceNodeV303 },
      { heading: "Decision Record", entries: renderDecisionRecord(profile) },
      {
        heading: "Required Prerequisites",
        list: profile.decisionRecord.requiredPrerequisites.map(formatPrerequisite),
        emptyText: "No required prerequisites.",
      },
      {
        heading: "Explicit No-Go Conditions",
        list: profile.decisionRecord.explicitNoGoConditions.map(formatNoGoCondition),
        emptyText: "No no-go conditions.",
      },
      { heading: "Necessity Proof", entries: profile.decisionRecord.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No runtime shell chain decision record blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No runtime shell chain decision record warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No runtime shell chain decision record recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderDecisionRecord(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile,
): object {
  return {
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
  };
}

function formatPrerequisite(prerequisite: RuntimeShellChainPrerequisite): string {
  return `${prerequisite.id}: ${prerequisite.status} - ${prerequisite.label}; evidence=${prerequisite.currentEvidence}; requiredBeforeRuntimeShell=${prerequisite.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: RuntimeShellChainNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
