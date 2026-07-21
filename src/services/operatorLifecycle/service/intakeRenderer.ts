import type {
  ServiceIntakeProfile,
} from "./intakeTypes.js";
import { renderVerificationReportMarkdown } from "../../verificationReportBuilder.js";

export function renderServiceIntakeMarkdown(
  profile: ServiceIntakeProfile,
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
      ["Ready for Node v387 archive verification", profile.readyForNodeV387ArchiveVerification],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
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
      { heading: "Source Node v385", entries: profile.sourceNodeV385 },
      { heading: "Java v160 Operator Service Lifecycle", entries: profile.javaOperatorServiceLifecycle },
      { heading: "mini-kv v151 Operator Service Lifecycle Template", entries: profile.miniKvOperatorServiceLifecycleTemplate },
      { heading: "mini-kv v150 Frozen Live Read Gate Plan", entries: profile.miniKvFrozenLiveReadGatePlan },
      {
        heading: "Evidence Files",
        lines: [
          profile.javaOperatorServiceLifecycleFile,
          profile.miniKvOperatorServiceLifecycleTemplateFile,
          profile.miniKvFrozenLiveReadGatePlanFile,
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
