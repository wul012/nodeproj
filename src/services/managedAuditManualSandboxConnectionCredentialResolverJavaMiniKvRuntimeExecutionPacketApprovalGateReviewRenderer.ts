import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewProfile,
  RuntimeExecutionPacketApprovalGateInput,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Approval gate review state", profile.approvalGateReviewState],
      ["Approval gate decision", profile.approvalGateDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      [
        "Ready for Node v399 runtime execution packet approval gate archive verification",
        profile.readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification,
      ],
      ["Ready for runtime execution packet", profile.readyForRuntimeExecutionPacket],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
      ["Runtime execution artifacts complete", profile.runtimeExecutionArtifactsComplete],
      ["Present runtime execution artifact count", profile.presentRuntimeExecutionArtifactCount],
      ["Missing runtime execution artifact count", profile.missingRuntimeExecutionArtifactCount],
      ["Runtime execution packet present", profile.runtimeExecutionPacketPresent],
      ["Runtime execution packet executable", profile.runtimeExecutionPacketExecutable],
      ["Runtime gate approval present", profile.runtimeGateApprovalPresent],
      ["Concrete loopback ports assigned", profile.concreteLoopbackPortsAssigned],
      ["Execution attempted", profile.executionAttempted],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Execution allowed", profile.executionAllowed],
      ["Active shard prototype enabled", profile.activeShardPrototypeEnabled],
    ],
    sections: [
      { heading: "Source Node v397", entries: profile.sourceNodeV397 },
      { heading: "Approval Gate Inputs", lines: profile.approvalGateInputs.flatMap(renderApprovalGateInput) },
      { heading: "Approval Gate Review", entries: profile.approvalGateReview },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderApprovalGateInput(input: RuntimeExecutionPacketApprovalGateInput): string[] {
  return [
    `- ${input.key}`,
    `  - label: ${input.label}`,
    `  - required: ${input.required}`,
    `  - file: ${JSON.stringify(input.file)}`,
    `  - present: ${input.present}`,
    `  - gateSatisfied: ${input.gateSatisfied}`,
    `  - missingReasonCode: ${input.missingReasonCode}`,
  ];
}
