import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeProfile,
  RuntimePacketRequirementClarification,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Upstream progress intake state", profile.upstreamProgressIntakeState],
      ["Upstream progress decision", profile.upstreamProgressDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      [
        "Ready for Node v397 runtime execution packet prerequisite review",
        profile.readyForNodeV397RuntimeExecutionPacketPrerequisiteReview,
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
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
      ["Active shard prototype enabled", profile.activeShardPrototypeEnabled],
    ],
    sections: [
      { heading: "Source Node v395", entries: profile.sourceNodeV395 },
      { heading: "Java v162 Runtime Artifact Candidate", entries: profile.javaV162RuntimeArtifactCandidate },
      { heading: "mini-kv v153 Runtime Artifact Preflight", entries: profile.miniKvV153RuntimeArtifactPreflight },
      { heading: "Runtime Packet Requirement Clarification", lines: profile.runtimePacketRequirements.flatMap(renderRequirement) },
      { heading: "Upstream Progress Clarification", entries: profile.upstreamProgressClarification },
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

function renderRequirement(requirement: RuntimePacketRequirementClarification): string[] {
  return [
    `- ${requirement.key}: ${requirement.label}`,
    `  - javaCandidateStatus: ${requirement.javaCandidateStatus}`,
    `  - miniKvStatus: ${requirement.miniKvStatus}`,
    `  - operatorOrNodeStatus: ${requirement.operatorOrNodeStatus}`,
    `  - packetSatisfied: ${requirement.packetSatisfied}`,
  ];
}
