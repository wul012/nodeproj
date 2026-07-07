import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeProfile,
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
      ["Ready for Node v383 archive verification", profile.readyForNodeV383ArchiveVerification],
      ["Evidence intake only", profile.evidenceIntakeOnly],
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
      { heading: "Source Node v381", entries: profile.sourceNodeV381 },
      { heading: "Java v158 Boundary Handoff", entries: profile.javaHandoff },
      { heading: "mini-kv v149 Consumer Handoff", entries: profile.miniKvHandoff },
      { heading: "mini-kv v148 Frozen Active Plan", entries: profile.miniKvFrozenPlan },
      {
        heading: "Evidence Files",
        lines: [profile.javaHandoffFile, profile.miniKvHandoffFile, profile.miniKvFrozenPlanFile]
          .map((file) => `- ${file.id}: exists=${file.exists}; fallback=${file.usedHistoricalFallback}; bytes=${file.byteLength}; digest=${file.digest}; resolved=${file.resolvedPath}`),
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
