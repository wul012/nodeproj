import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeProfile,
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
      ["Ready for Node v381 archive verification", profile.readyForNodeV381ArchiveVerification],
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
      { heading: "Source Node v379", entries: profile.sourceNodeV379 },
      { heading: "Java v157 Handoff", entries: profile.javaHandoff },
      { heading: "mini-kv v147 Frozen Snapshot", entries: profile.miniKvEvidence },
      {
        heading: "Evidence Files",
        lines: [profile.javaHandoffFile, profile.miniKvSnapshotFile]
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
