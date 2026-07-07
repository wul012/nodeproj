import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeProfile,
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
      ["Ready for Node v385 archive verification", profile.readyForNodeV385ArchiveVerification],
      ["Evidence intake only", profile.evidenceIntakeOnly],
      ["Live read gate allowed", profile.liveReadGateAllowed],
      ["Runtime probe allowed", profile.runtimeProbeAllowed],
      ["Reruns live read", profile.rerunsLiveRead],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
      ["Active shard prototype enabled", profile.activeShardPrototypeEnabled],
    ],
    sections: [
      { heading: "Source Node v383", entries: profile.sourceNodeV383 },
      { heading: "Java v159 Live Read Gate Plan", entries: profile.javaLiveReadGatePlan },
      { heading: "mini-kv v150 Live Read Gate Plan", entries: profile.miniKvLiveReadGatePlan },
      { heading: "mini-kv v149 Frozen Consumer Handoff", entries: profile.miniKvFrozenConsumerHandoff },
      {
        heading: "Evidence Files",
        lines: [
          profile.javaLiveReadGatePlanFile,
          profile.miniKvLiveReadGatePlanFile,
          profile.miniKvFrozenConsumerHandoffFile,
        ].map((file) =>
          `- ${file.id}: exists=${file.exists}; fallback=${file.usedHistoricalFallback}; bytes=${file.byteLength}; digest=${file.digest}; resolved=${file.resolvedPath}`),
      },
      { heading: "Intake", entries: profile.intake },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
