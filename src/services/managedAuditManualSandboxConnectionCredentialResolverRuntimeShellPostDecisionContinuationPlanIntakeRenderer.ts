import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver runtime shell post-decision continuation plan intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Plan intake state", profile.planIntakeState],
      [
        "Ready for v301 plan intake",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
      ],
      ["Ready for Java v136 + mini-kv v133", profile.readyForParallelJavaV136MiniKvV133EchoRequest],
      [
        "Ready for Node v303",
        profile.readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification,
      ],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v300", entries: profile.sourceNodeV300 },
      { heading: "Continuation Plan Intake", entries: renderContinuationPlanIntake(profile) },
      {
        heading: "Continuation Options",
        lines: profile.continuationPlanIntake.continuationOptions.map((option) =>
          `- ${option.code}: ${option.status}; ${option.rationale}`),
      },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No post-decision continuation plan-intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No post-decision continuation plan-intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No post-decision continuation plan-intake recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderContinuationPlanIntake(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeProfile,
): object {
  return {
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
    legacyNextNodeVerificationVersion:
      profile.continuationPlanIntake.legacyNextNodeVerificationVersion,
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
  };
}
