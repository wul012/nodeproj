import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeProfile,
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
      ["Ready for Node v379 archive verification", profile.readyForNodeV379ArchiveVerification],
      ["Evidence intake only", profile.evidenceIntakeOnly],
      ["Reruns live read", profile.rerunsLiveRead],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v377", entries: profile.sourceNodeV377 },
      { heading: "Java v156 Verification", entries: profile.javaVerification },
      { heading: "Java v155 Index", entries: profile.javaIndex },
      { heading: "mini-kv v146 Snapshot", entries: profile.miniKvEvidence },
      {
        heading: "Evidence Files",
        lines: [profile.javaVerificationFile, profile.javaIndexFile, profile.miniKvSnapshotFile]
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
