import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowStage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerTypes.js";
import {
  renderVerificationBlockedReasonLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerMarkdown(
  ledger: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window stage ledger",
    meta: [
      ["Ledger version", ledger.ledgerVersion],
      ["Ledger state", ledger.ledgerState],
      ["Ready for manual live read-only window", ledger.readyForManualLiveReadOnlyWindow],
      ["Ready for production execution", ledger.readyForProductionExecution],
      ["Stage count", ledger.stageCount],
      ["Ready stages", ledger.readyStageCount],
      ["Blocked stages", ledger.blockedStageCount],
      ["Cleanup required stages", ledger.cleanupRequiredStageCount],
      ["Owner count", ledger.ownerCount],
      ["Passed gates", `${ledger.passedGateCount}/${ledger.gateCount}`],
      ["Ledger digest", ledger.ledgerDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(ledger.gates), bodyLeadingBlankLine: false },
      { heading: "Stages", lines: ledger.stages.flatMap(renderStage), bodyLeadingBlankLine: false },
      {
        heading: "Blocked Reasons",
        lines: renderVerificationBlockedReasonLines(ledger.blockedReasonCodes),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderStage(stage: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStage): string[] {
  return [
    `### ${stage.order}. ${stage.nodeVersion} ${stage.code}`,
    `- Category: ${stage.category}`,
    `- Owner: ${stage.owner}`,
    `- State: ${stage.state}`,
    `- Evidence: ${stage.evidence}`,
    `- Next action: ${stage.nextAction}`,
    `- Cleanup required: ${stage.cleanupRequired}`,
    `- Read-only: ${stage.readOnly}`,
    `- Writes allowed: ${stage.writesAllowed}`,
    `- Automatic service start: ${stage.automaticServiceStart}`,
    "",
  ];
}
