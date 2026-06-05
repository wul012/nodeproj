import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftMarkdown(
  valueDraft: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft,
): string {
  return [
    "# Controlled read-only shard preview live read-only window operator evidence value draft",
    "",
    `- Value draft version: ${valueDraft.valueDraftVersion}`,
    `- Source import preflight version: ${valueDraft.sourceImportPreflightVersion}`,
    `- Value draft state: ${valueDraft.valueDraftState}`,
    `- Ready for operator evidence value draft: ${valueDraft.readyForOperatorEvidenceValueDraft}`,
    `- Ready for manual evidence entry: ${valueDraft.readyForManualEvidenceEntry}`,
    `- Ready for evidence import: ${valueDraft.readyForEvidenceImport}`,
    `- Ready for live execution: ${valueDraft.readyForLiveExecution}`,
    `- Ready for production execution: ${valueDraft.readyForProductionExecution}`,
    `- Value draft slot count: ${valueDraft.valueDraftSlotCount}`,
    `- Ledger value draft slot count: ${valueDraft.ledgerValueDraftSlotCount}`,
    `- Target value draft slot count: ${valueDraft.targetValueDraftSlotCount}`,
    `- Policy archive value draft slot count: ${valueDraft.policyArchiveValueDraftSlotCount}`,
    `- Maintenance value draft slot count: ${valueDraft.maintenanceValueDraftSlotCount}`,
    `- Closeout value draft slot count: ${valueDraft.closeoutValueDraftSlotCount}`,
    `- Scope count: ${valueDraft.scopeCount}`,
    `- Draft field count: ${valueDraft.draftFieldCount}`,
    `- Passed gates: ${valueDraft.passedGateCount}/${valueDraft.gateCount}`,
    `- Imports runtime payload: ${valueDraft.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${valueDraft.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${valueDraft.containsSecretValue}`,
    `- Value draft digest: ${valueDraft.valueDraftDigest}`,
    "",
    "## Gates",
    ...renderEntries(valueDraft.gates),
    "",
    "## Slots",
    ...valueDraft.slots.flatMap(renderSlot),
    "",
    "## Blocked Reasons",
    ...(valueDraft.blockedReasonCodes.length === 0
      ? ["- none"]
      : valueDraft.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
}

function renderSlot(
  slot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot,
): string[] {
  return [
    `### ${slot.order}. ${slot.nodeVersion} ${slot.code}`,
    `- Kind: ${slot.kind}`,
    `- Scope: ${slot.scope}`,
    `- Source preflight slot: ${slot.sourcePreflightSlotCode}`,
    `- Source preflight slot mapped: ${slot.sourcePreflightSlotMapped}`,
    `- Source preflight slot ready: ${slot.sourcePreflightSlotReady}`,
    `- Source preflight control passed: ${slot.sourcePreflightControlPassed}`,
    `- Source preflight value not imported: ${slot.sourcePreflightValueNotImported}`,
    `- Draft field names: ${slot.draftFieldNames.join(", ")}`,
    `- Draft value state: ${slot.draftValueState}`,
    `- Actual value state: ${slot.actualValueState}`,
    `- Ready for operator value draft: ${slot.readyForOperatorValueDraft}`,
    `- Ready for operator import: ${slot.readyForOperatorImport}`,
    `- Ready for evidence import: ${slot.readyForEvidenceImport}`,
    `- Draft acceptance rule: ${slot.draftAcceptanceRule}`,
    `- Draft normalizer rule: ${slot.draftNormalizerRule}`,
    `- Draft redaction rule: ${slot.draftRedactionRule}`,
    `- Draft import block rule: ${slot.draftImportBlockRule}`,
    `- Draft missing value policy: ${slot.draftMissingValuePolicy}`,
    `- Operator instruction: ${slot.operatorInstruction}`,
    `- Imports runtime payload: ${slot.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${slot.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${slot.containsSecretValue}`,
    `- Writes allowed: ${slot.writesAllowed}`,
    `- Automatic service start: ${slot.automaticServiceStart}`,
    "",
  ];
}
