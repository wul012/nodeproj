import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetMarkdown(
  worksheet: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet,
): string {
  return [
    "# Controlled read-only shard preview live read-only window manual evidence entry worksheet",
    "",
    `- Worksheet version: ${worksheet.worksheetVersion}`,
    `- Source review package version: ${worksheet.sourceReviewPackageVersion}`,
    `- Worksheet state: ${worksheet.worksheetState}`,
    `- Ready for operator entry worksheet: ${worksheet.readyForOperatorEntryWorksheet}`,
    `- Ready for manual evidence entry: ${worksheet.readyForManualEvidenceEntry}`,
    `- Ready for live execution: ${worksheet.readyForLiveExecution}`,
    `- Ready for production execution: ${worksheet.readyForProductionExecution}`,
    `- Slot count: ${worksheet.slotCount}`,
    `- Ledger check slot count: ${worksheet.ledgerCheckSlotCount}`,
    `- Target entry slot count: ${worksheet.targetEntrySlotCount}`,
    `- Policy archive slot count: ${worksheet.policyArchiveSlotCount}`,
    `- Maintenance slot count: ${worksheet.maintenanceSlotCount}`,
    `- Closeout slot count: ${worksheet.closeoutSlotCount}`,
    `- Scope count: ${worksheet.scopeCount}`,
    `- Worksheet field count: ${worksheet.worksheetFieldCount}`,
    `- Passed gates: ${worksheet.passedGateCount}/${worksheet.gateCount}`,
    `- Imports runtime payload: ${worksheet.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${worksheet.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${worksheet.containsSecretValue}`,
    `- Worksheet digest: ${worksheet.worksheetDigest}`,
    "",
    "## Gates",
    ...renderEntries(worksheet.gates),
    "",
    "## Slots",
    ...worksheet.slots.flatMap(renderSlot),
    "",
    "## Blocked Reasons",
    ...(worksheet.blockedReasonCodes.length === 0
      ? ["- none"]
      : worksheet.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
}

function renderSlot(
  slot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot,
): string[] {
  return [
    `### ${slot.order}. ${slot.nodeVersion} ${slot.code}`,
    `- Kind: ${slot.kind}`,
    `- Scope: ${slot.scope}`,
    `- Source review control: ${slot.sourceReviewControlCode}`,
    `- Source review control passed: ${slot.sourceReviewControlPassed}`,
    `- Worksheet field names: ${slot.worksheetFieldNames.join(", ")}`,
    `- Operator prompt: ${slot.operatorPrompt}`,
    `- Validation rule: ${slot.validationRule}`,
    `- Redaction rule: ${slot.redactionRule}`,
    `- Missing value policy: ${slot.missingValuePolicy}`,
    `- Manual value state: ${slot.manualValueState}`,
    `- Ready for operator entry: ${slot.readyForOperatorEntry}`,
    `- Imports runtime payload: ${slot.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${slot.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${slot.containsSecretValue}`,
    `- Writes allowed: ${slot.writesAllowed}`,
    `- Automatic service start: ${slot.automaticServiceStart}`,
    "",
  ];
}
