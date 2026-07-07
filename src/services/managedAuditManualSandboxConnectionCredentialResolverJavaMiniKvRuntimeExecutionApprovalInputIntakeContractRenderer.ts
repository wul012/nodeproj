import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Intake state", profile.intakeState],
      ["Intake decision", profile.intakeDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Java source version", profile.javaSourceVersion],
      ["mini-kv source version", profile.miniKvSourceVersion],
      [
        "Ready for runtime execution approval input intake contract",
        profile.readyForRuntimeExecutionApprovalInputIntakeContract,
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
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
      ["Active shard prototype enabled", profile.activeShardPrototypeEnabled],
    ],
    sections: [
      { heading: "Source Node v399", entries: profile.sourceNodeV399 },
      { heading: "Java v164 Approval Gate Input", entries: profile.javaV164ApprovalGateInput },
      { heading: "mini-kv v155 Approval Gate Input Precheck", entries: profile.miniKvV155ApprovalGateInputPrecheck },
      {
        heading: "Required Node Approval Inputs",
        lines: [
          ...profile.nodeApprovalGateInputs.flatMap(renderNodeInput),
          "## Handoff Requirements",
          "",
          ...profile.handoffRequirements.flatMap(renderHandoffRequirement),
          "## Intake Contract",
          "",
          ...renderEntries(profile.intakeContract),
        ],
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderNodeInput(input: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile["nodeApprovalGateInputs"][number]): string[] {
  return [
    `- ${input.label}`,
    `  - key: ${input.key}`,
    `  - owner: ${input.owner}`,
    `  - present: ${input.present}`,
    `  - complete: ${input.complete}`,
    `  - file: ${JSON.stringify(input.file)}`,
    `  - missingReasonCode: ${input.missingReasonCode}`,
    `  - requiredContents: ${JSON.stringify(input.requiredContents)}`,
  ];
}

function renderHandoffRequirement(
  requirement: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile["handoffRequirements"][number],
): string[] {
  return [
    `- ${requirement.id}`,
    `  - owner: ${requirement.owner}`,
    `  - currentStatus: ${requirement.currentStatus}`,
    `  - blocksRuntime: ${requirement.blocksRuntime}`,
    `  - expectedEvidence: ${requirement.expectedEvidence}`,
    `  - currentEvidence: ${requirement.currentEvidence}`,
    `  - nextAction: ${requirement.nextAction}`,
  ];
}
