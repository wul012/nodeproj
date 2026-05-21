import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver runtime shell post-decision continuation plan intake",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Plan intake state: ${profile.planIntakeState}`,
    `- Ready for v301 plan intake: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake}`,
    `- Ready for Java v136 + mini-kv v133: ${profile.readyForParallelJavaV136MiniKvV133EchoRequest}`,
    `- Ready for Node v302: ${profile.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Runtime shell invocation allowed: ${profile.runtimeShellInvocationAllowed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v300",
    "",
    ...renderEntries(profile.sourceNodeV300),
    "",
    "## Continuation Plan Intake",
    "",
    ...renderEntries({
      intakeDigest: profile.continuationPlanIntake.intakeDigest,
      intakeMode: profile.continuationPlanIntake.intakeMode,
      sourceSpan: profile.continuationPlanIntake.sourceSpan,
      selectedContinuationDecision:
        profile.continuationPlanIntake.selectedContinuationDecision,
      decisionOptionCount: profile.continuationPlanIntake.decisionOptionCount,
      selectedDecisionOptionCount:
        profile.continuationPlanIntake.selectedDecisionOptionCount,
      rejectedRuntimeImplementationOptionCount:
        profile.continuationPlanIntake.rejectedRuntimeImplementationOptionCount,
      nextJavaEchoVersion: profile.continuationPlanIntake.nextJavaEchoVersion,
      nextMiniKvReceiptVersion:
        profile.continuationPlanIntake.nextMiniKvReceiptVersion,
      nextNodeVerificationVersion:
        profile.continuationPlanIntake.nextNodeVerificationVersion,
      runtimeShellImplementationAllowed:
        profile.continuationPlanIntake.runtimeShellImplementationAllowed,
      runtimeShellInvocationAllowed:
        profile.continuationPlanIntake.runtimeShellInvocationAllowed,
      externalRequestAllowed:
        profile.continuationPlanIntake.externalRequestAllowed,
      approvalLedgerWriteAllowed:
        profile.continuationPlanIntake.approvalLedgerWriteAllowed,
    }),
    "",
    "## Continuation Options",
    "",
    ...profile.continuationPlanIntake.continuationOptions.map((option) =>
      `- ${option.code}: ${option.status}; ${option.rationale}`),
    "",
    "## Necessity Proof",
    "",
    ...renderEntries(profile.necessityProof),
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
    ...renderMessages(profile.productionBlockers, "No post-decision continuation plan-intake blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No post-decision continuation plan-intake warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No post-decision continuation plan-intake recommendations."),
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
