import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStep,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetMarkdown(
  worksheet: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet,
): string {
  return [
    "# Controlled read-only shard preview live read-only window command worksheet",
    "",
    `- Worksheet version: ${worksheet.worksheetVersion}`,
    `- Worksheet state: ${worksheet.worksheetState}`,
    `- Ready for manual command review: ${worksheet.readyForManualCommandReview}`,
    `- Ready for live execution: ${worksheet.readyForLiveExecution}`,
    `- Ready for production execution: ${worksheet.readyForProductionExecution}`,
    `- Step count: ${worksheet.stepCount}`,
    `- Command template count: ${worksheet.commandTemplateCount}`,
    `- Target count: ${worksheet.targetCount}`,
    `- Evidence slot count: ${worksheet.evidenceSlotCount}`,
    `- Cleanup slot count: ${worksheet.cleanupSlotCount}`,
    `- Failure class count: ${worksheet.failureClassCount}`,
    `- Passed gates: ${worksheet.passedGateCount}/${worksheet.gateCount}`,
    `- Contains secret value: ${worksheet.containsSecretValue}`,
    `- Worksheet digest: ${worksheet.worksheetDigest}`,
    "",
    "## Gates",
    ...renderEntries(worksheet.gates),
    "",
    "## Steps",
    ...worksheet.steps.flatMap(renderStep),
    "",
    "## Blocked Reasons",
    ...(worksheet.blockedReasonCodes.length === 0
      ? ["- none"]
      : worksheet.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
}

function renderStep(step: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStep): string[] {
  return [
    `### ${step.order}. ${step.nodeVersion} ${step.code}`,
    `- Kind: ${step.kind}`,
    `- Source rehearsal step: ${step.sourceRehearsalStepCode}`,
    `- Owner: ${step.owner}`,
    `- Target: ${step.target}`,
    `- Command template: ${step.commandTemplate}`,
    `- Expected read-only result: ${step.expectedReadOnlyResult}`,
    `- Evidence slot: ${step.evidenceSlot}`,
    `- Cleanup slot: ${step.cleanupSlot ?? "none"}`,
    `- Failure class: ${step.failureClass}`,
    `- Requires operator input: ${step.requiresOperatorInput}`,
    `- Contains secret value: ${step.containsSecretValue}`,
    `- Writes allowed: ${step.writesAllowed}`,
    `- Automatic service start: ${step.automaticServiceStart}`,
    "",
  ];
}
