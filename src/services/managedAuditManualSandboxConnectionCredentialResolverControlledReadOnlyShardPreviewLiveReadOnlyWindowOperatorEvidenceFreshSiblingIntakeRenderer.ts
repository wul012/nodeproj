import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeTypes.js";
import {
  renderVerificationBlockedReasonLines,
  renderVerificationReportMarkdown,
  renderVerificationResolvedEvidenceFileDetailLines,
  trimVerificationTrailingBlankLine,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeMarkdown(
  intake: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence fresh sibling intake",
    meta: [
      ["Fresh sibling intake version", intake.freshSiblingIntakeVersion],
      ["Source value draft version", intake.sourceValueDraftVersion],
      ["Java evidence version", intake.javaEvidenceVersion],
      ["mini-kv evidence version", intake.miniKvEvidenceVersion],
      ["Intake state", intake.intakeState],
      ["Ready for fresh sibling evidence intake", intake.readyForFreshSiblingEvidenceIntake],
      ["Ready for operator value supply", intake.readyForOperatorValueSupply],
      ["Ready for evidence import", intake.readyForEvidenceImport],
      ["Ready for manual evidence entry", intake.readyForManualEvidenceEntry],
      ["Ready for live execution", intake.readyForLiveExecution],
      ["Ready for production execution", intake.readyForProductionExecution],
      ["Intake slot count", intake.intakeSlotCount],
      ["Java evidence slot count", intake.javaEvidenceSlotCount],
      ["mini-kv evidence slot count", intake.miniKvEvidenceSlotCount],
      ["Node value draft alignment slot count", intake.nodeValueDraftAlignmentSlotCount],
      ["Cross-project closeout slot count", intake.crossProjectCloseoutSlotCount],
      ["Evidence files present", `${intake.presentFileCount}/${intake.fileCount}`],
      ["Evidence snippets matched", `${intake.matchedSnippetCount}/${intake.snippetCount}`],
      ["Historical fixture resolved file count", intake.historicalFixtureResolvedFileCount],
      ["Passed gates", `${intake.passedGateCount}/${intake.gateCount}`],
      ["Imports runtime payload", intake.importsRuntimePayload],
      ["Accepts synthetic evidence", intake.acceptsSyntheticEvidence],
      ["Contains secret value", intake.containsSecretValue],
      ["Fresh sibling intake digest", intake.freshSiblingIntakeDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(intake.gates), bodyLeadingBlankLine: false },
      {
        heading: "Evidence Files",
        lines: renderVerificationResolvedEvidenceFileDetailLines(Object.values(intake.files)),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Snippets",
        lines: intake.snippets.map((snippet) =>
          `- ${snippet.id}: matched=${snippet.matched}, resolvedPath=${snippet.resolvedPath}`),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Slots",
        lines: trimVerificationTrailingBlankLine(intake.slots.flatMap(renderSlot)),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Blocked Reasons",
        lines: renderVerificationBlockedReasonLines(intake.blockedReasonCodes),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderSlot(
  slot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot,
): string[] {
  return [
    `### ${slot.order}. ${slot.nodeVersion} ${slot.code}`,
    `- Kind: ${slot.kind}`,
    `- Project: ${slot.project}`,
    `- Scope: ${slot.scope}`,
    `- Source value draft slot: ${slot.sourceValueDraftSlotCode}`,
    `- Source value draft node version: ${slot.sourceValueDraftNodeVersion}`,
    `- Source value draft slot ready: ${slot.sourceValueDraftSlotReady}`,
    `- Evidence file id: ${slot.evidenceFileId}`,
    `- Evidence snippet id: ${slot.evidenceSnippetId}`,
    `- Evidence file present: ${slot.evidenceFilePresent}`,
    `- Evidence snippet matched: ${slot.evidenceSnippetMatched}`,
    `- Evidence resolved from historical fixture: ${slot.evidenceResolvedFromHistoricalFixture}`,
    `- Evidence expectation: ${slot.evidenceExpectation}`,
    `- Fresh sibling version: ${slot.freshSiblingVersion}`,
    `- Ready for fresh sibling evidence intake: ${slot.readyForFreshSiblingEvidenceIntake}`,
    `- Ready for operator value supply: ${slot.readyForOperatorValueSupply}`,
    `- Ready for evidence import: ${slot.readyForEvidenceImport}`,
    `- Ready for manual evidence entry: ${slot.readyForManualEvidenceEntry}`,
    `- Ready for live execution: ${slot.readyForLiveExecution}`,
    `- Ready for production execution: ${slot.readyForProductionExecution}`,
    `- Imports runtime payload: ${slot.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${slot.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${slot.containsSecretValue}`,
    `- Writes allowed: ${slot.writesAllowed}`,
    `- Automatic service start: ${slot.automaticServiceStart}`,
    `- Starts services: ${slot.startsServices}`,
    `- Mutates sibling state: ${slot.mutatesSiblingState}`,
    "",
  ];
}
