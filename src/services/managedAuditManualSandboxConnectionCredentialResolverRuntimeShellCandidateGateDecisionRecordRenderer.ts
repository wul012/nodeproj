import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile,
  RuntimeShellCandidateGateDecisionNoGoCondition,
  RuntimeShellCandidateGateDecisionRequirement,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver runtime shell candidate gate decision record",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision record state", profile.decisionRecordState],
      ["Runtime shell decision", profile.runtimeShellDecision],
      [
        "Ready for decision record",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
      ],
      ["Ready for Java v135 + mini-kv v132 echo request", profile.readyForParallelJavaV135MiniKvV132EchoRequest],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v298", entries: profile.sourceNodeV298 },
      { heading: "Decision Record", entries: renderDecisionRecord(profile) },
      {
        heading: "Required Evidence",
        list: profile.decisionRecord.requiredEvidence.map(formatRequirement),
        emptyText: "No required evidence.",
      },
      {
        heading: "Explicit No-Go Conditions",
        list: profile.decisionRecord.explicitNoGoConditions.map(formatNoGoCondition),
        emptyText: "No no-go conditions.",
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No runtime shell candidate gate decision record blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No runtime shell candidate gate decision record warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No runtime shell candidate gate decision record recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderDecisionRecord(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile,
): object {
  return {
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
  };
}

function formatRequirement(requirement: RuntimeShellCandidateGateDecisionRequirement): string {
  return `${requirement.id}: ${requirement.status} - ${requirement.label}; evidence=${requirement.currentEvidence}; requiredBeforeRuntimeShell=${requirement.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: RuntimeShellCandidateGateDecisionNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
