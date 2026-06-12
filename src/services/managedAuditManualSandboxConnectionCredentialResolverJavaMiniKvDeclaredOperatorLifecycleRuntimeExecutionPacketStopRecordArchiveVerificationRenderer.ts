import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for Node v394 runtime execution artifact intake", profile.readyForNodeV394RuntimeExecutionArtifactIntake],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
      ["Archive verification only", profile.archiveVerificationOnly],
      ["Runtime execution packet present", profile.runtimeExecutionPacketPresent],
      ["Runtime execution packet executable", profile.runtimeExecutionPacketExecutable],
      ["Runtime gate approval present", profile.runtimeGateApprovalPresent],
      ["Concrete loopback ports assigned", profile.concreteLoopbackPortsAssigned],
      ["Missing runtime execution artifact count", profile.missingRuntimeExecutionArtifactCount],
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
      { heading: "Source Node v392", entries: profile.sourceNodeV392 },
      { heading: "Replay From Frozen Evidence", entries: profile.replay },
      { heading: "Archive Verification", entries: profile.archiveVerification },
      {
        heading: "Archive References",
        lines: Object.values(profile.archiveReferences)
          .filter((value): value is { path: string; exists: boolean; byteLength: number; digest: string | null } =>
            typeof value === "object" && value !== null && "path" in value)
          .map((file) => `- ${file.path}: exists=${file.exists}; bytes=${file.byteLength}; digest=${file.digest}`),
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No production blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No recommendations.",
      },
      {
        heading: "Next Actions",
        list: profile.nextActions,
        emptyText: "No next actions.",
      },
    ],
  });
}
