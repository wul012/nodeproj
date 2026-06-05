import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntry,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerMarkdown(
  ledger: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
): string {
  return [
    "# Controlled read-only shard preview live read-only window evidence intake ledger",
    "",
    `- Ledger version: ${ledger.ledgerVersion}`,
    `- Ledger state: ${ledger.ledgerState}`,
    `- Ready for manual evidence intake: ${ledger.readyForManualEvidenceIntake}`,
    `- Ready for live execution: ${ledger.readyForLiveExecution}`,
    `- Ready for production execution: ${ledger.readyForProductionExecution}`,
    `- Entry count: ${ledger.entryCount}`,
    `- Target count: ${ledger.targetCount}`,
    `- Required field count: ${ledger.requiredFieldCount}`,
    `- Acceptance criterion count: ${ledger.acceptanceCriterionCount}`,
    `- Cleanup entry count: ${ledger.cleanupEntryCount}`,
    `- Failure class count: ${ledger.failureClassCount}`,
    `- Passed gates: ${ledger.passedGateCount}/${ledger.gateCount}`,
    `- Imports runtime payload: ${ledger.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${ledger.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${ledger.containsSecretValue}`,
    `- Ledger digest: ${ledger.ledgerDigest}`,
    "",
    "## Gates",
    ...renderEntries(ledger.gates),
    "",
    "## Entries",
    ...ledger.entries.flatMap(renderEntry),
    "",
    "## Blocked Reasons",
    ...(ledger.blockedReasonCodes.length === 0
      ? ["- none"]
      : ledger.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
}

function renderEntry(entry: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntry): string[] {
  return [
    `### ${entry.order}. ${entry.nodeVersion} ${entry.code}`,
    `- Kind: ${entry.kind}`,
    `- Source evidence record: ${entry.sourceEvidenceRecordCode}`,
    `- Owner: ${entry.owner}`,
    `- Target: ${entry.target}`,
    `- Intake slot: ${entry.intakeSlot}`,
    `- Preserved required fields: ${entry.preservedRequiredFields.join(", ")}`,
    `- Preserved acceptance criteria: ${entry.preservedAcceptanceCriteria.join("; ")}`,
    `- Preserved redaction rule: ${entry.preservedRedactionRule}`,
    `- Operator input instruction: ${entry.operatorInputInstruction}`,
    `- Missing input policy: ${entry.missingInputPolicy}`,
    `- Cleanup required: ${entry.cleanupRequired}`,
    `- Failure class: ${entry.failureClass}`,
    `- Capture input state: ${entry.captureInputState}`,
    `- Imports runtime payload: ${entry.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${entry.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${entry.containsSecretValue}`,
    `- Writes allowed: ${entry.writesAllowed}`,
    `- Automatic service start: ${entry.automaticServiceStart}`,
    "",
  ];
}
