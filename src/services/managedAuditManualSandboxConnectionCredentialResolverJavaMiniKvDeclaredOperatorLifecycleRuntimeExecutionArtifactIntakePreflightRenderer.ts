import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightProfile,
  RuntimeExecutionArtifactIntakePreflightFileReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Intake preflight state", profile.intakePreflightState],
      ["Intake decision", profile.intakeDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for Node v395 archive verification", profile.readyForNodeV395ArchiveVerification],
      ["Ready for runtime execution packet", profile.readyForRuntimeExecutionPacket],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
      ["Artifact intake preflight only", profile.artifactIntakePreflightOnly],
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
      { heading: "Source Node v393", entries: profile.sourceNodeV393 },
      { heading: "Replay From Frozen Evidence", entries: profile.replay },
      { heading: "Sibling Workspace Snapshot", entries: profile.siblingWorkspaceSnapshot },
      {
        heading: "Runtime Execution Artifact Requirements",
        lines: profile.artifactRequirements.flatMap((artifact) => [
          `- ${artifact.key}: present=${artifact.present}; source=${artifact.source}; missingReasonCode=${artifact.missingReasonCode}`,
          ...artifact.candidatePaths.map((file) =>
            `  - ${file.path}: exists=${file.exists}; bytes=${file.byteLength}; digest=${file.digest}`),
        ]),
      },
      { heading: "Artifact Intake Preflight", entries: profile.artifactIntakePreflight },
      {
        heading: "Source Archive References",
        lines: Object.values(profile.sourceArchiveReferences)
          .filter(isFileReference)
          .map((file) => `- ${file.path}: exists=${file.exists}; bytes=${file.byteLength}; digest=${file.digest}`),
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

function isFileReference(value: unknown): value is RuntimeExecutionArtifactIntakePreflightFileReference {
  return typeof value === "object" && value !== null && "path" in value && "exists" in value;
}
