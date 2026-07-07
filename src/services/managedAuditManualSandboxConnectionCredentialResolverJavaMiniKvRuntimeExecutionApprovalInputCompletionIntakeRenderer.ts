import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile,
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
        "Ready for runtime execution approval input completion intake",
        profile.readyForRuntimeExecutionApprovalInputCompletionIntake,
      ],
      ["Ready for runtime execution packet", profile.readyForRuntimeExecutionPacket],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
      ["Runtime execution artifacts complete", profile.runtimeExecutionArtifactsComplete],
      ["Runtime execution packet executable", profile.runtimeExecutionPacketExecutable],
      ["Runtime gate approval present", profile.runtimeGateApprovalPresent],
      ["Execution attempted", profile.executionAttempted],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v400", entries: profile.sourceNodeV400 },
      { heading: "Java v165 Contract Handoff", entries: profile.javaV165ContractHandoff },
      { heading: "mini-kv v156 Final Approval Input", entries: profile.miniKvV156FinalApprovalInput },
      {
        heading: "Completion Inputs",
        lines: [
          ...profile.completionInputs.flatMap(renderCompletionInput),
          "## Completion Intake",
          "",
          ...renderEntries(profile.completionIntake),
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

function renderCompletionInput(
  input: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile["completionInputs"][number],
): string[] {
  return [
    `- ${input.key}`,
    `  - owner: ${input.owner}`,
    `  - present: ${input.present}`,
    `  - complete: ${input.complete}`,
    `  - blocksRuntime: ${input.blocksRuntime}`,
    `  - evidence: ${input.evidence}`,
    `  - requiredBeforeRuntime: ${input.requiredBeforeRuntime}`,
  ];
}
