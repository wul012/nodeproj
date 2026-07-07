import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewProfile,
  RuntimeExecutionPacketReviewRow,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Contribution review state", profile.contributionReviewState],
      ["Contribution review decision", profile.contributionReviewDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      [
        "Ready for Node v398 runtime execution packet approval gate review",
        profile.readyForNodeV398RuntimeExecutionPacketApprovalGateReview,
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
      { heading: "Source Node v396", entries: profile.sourceNodeV396 },
      {
        heading: "Java v163 Runtime Execution Packet Contribution",
        entries: profile.javaV163RuntimeExecutionPacketContribution,
      },
      { heading: "mini-kv v154 Runtime Execution Candidate", entries: profile.miniKvV154RuntimeExecutionCandidate },
      { heading: "Runtime Execution Packet Review Rows", lines: profile.reviewRows.flatMap(renderReviewRow) },
      { heading: "Contribution Review", entries: profile.contributionReview },
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

function renderReviewRow(row: RuntimeExecutionPacketReviewRow): string[] {
  return [
    `- ${row.key}`,
    `  - javaContribution: ${row.javaContribution}`,
    `  - miniKvContribution: ${row.miniKvContribution}`,
    `  - nodeOrOperatorGap: ${row.nodeOrOperatorGap}`,
    `  - crossProjectAccepted: ${row.crossProjectAccepted}`,
  ];
}
