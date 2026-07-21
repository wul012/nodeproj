import type {
  DeclaredIntakeProfile,
} from "./intakeTypes.js";
import { renderVerificationReportMarkdown } from "../../verificationReportBuilder.js";

export function renderDeclaredIntakeMarkdown(
  profile: DeclaredIntakeProfile,
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
      ["Ready for Node v389 archive verification", profile.readyForNodeV389ArchiveVerification],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
      ["Evidence intake only", profile.evidenceIntakeOnly],
      ["Declared operator lifecycle evidence present", profile.declaredOperatorLifecycleEvidencePresent],
      ["Runtime gate requires separate approval", profile.runtimeGateRequiresSeparateApproval],
      ["Live read gate allowed", profile.liveReadGateAllowed],
      ["Runtime probe allowed", profile.runtimeProbeAllowed],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
      ["Active shard prototype enabled", profile.activeShardPrototypeEnabled],
    ],
    sections: [
      { heading: "Source Node v387", entries: profile.sourceNodeV387 },
      { heading: "Java v161 Declared Operator Lifecycle", entries: profile.javaDeclaredOperatorLifecycle },
      { heading: "mini-kv v152 Declared Operator Lifecycle", entries: profile.miniKvDeclaredOperatorLifecycle },
      { heading: "mini-kv v151 Frozen Operator Template", entries: profile.miniKvFrozenOperatorTemplate },
      {
        heading: "Evidence Files",
        lines: [
          profile.javaDeclaredOperatorLifecycleFile,
          profile.miniKvDeclaredOperatorLifecycleFile,
          profile.miniKvFrozenOperatorTemplateFile,
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
