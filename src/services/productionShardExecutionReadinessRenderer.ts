import { renderEntries } from "./liveProbeReportUtils.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderProductionShardExecutionReadinessMarkdown(
  profile: ProductionShardExecutionReadinessProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Stage", profile.stage.stageId],
      ["Active Node version", profile.stage.activeNodeVersion],
      ["Source Node version", profile.stage.sourceNodeVersion],
      ["State", profile.stage.state],
      ["Decision", profile.stage.decision],
      ["Ready for next stage", profile.readyForNextStage],
      ["Ready for production shard execution", profile.readyForProductionShardExecution],
      ["Execution allowed", profile.safety.executionAllowed],
      ["Java / mini-kv recommended parallel", profile.javaMiniKvRecommendedParallel],
    ],
    sections: [
      { heading: "Stage", entries: profile.stage },
      { heading: "Safety Boundary", entries: profile.safety },
      { heading: "Sources", lines: profile.sources.flatMap((source) => renderEntries(source)) },
      { heading: "Controls", lines: profile.controls.flatMap((control) => renderEntries(control)) },
      { heading: "Stage Payload", entries: profile.stagePayload },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
