import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightTypes.js";
import {
  renderVerificationBlockedReasonLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightMarkdown(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence import preflight",
    meta: [
      ["Preflight version", preflight.preflightVersion],
      ["Source worksheet version", preflight.sourceWorksheetVersion],
      ["Preflight state", preflight.preflightState],
      ["Ready for operator evidence import preflight", preflight.readyForOperatorEvidenceImportPreflight],
      ["Ready for manual evidence entry", preflight.readyForManualEvidenceEntry],
      ["Ready for evidence import", preflight.readyForEvidenceImport],
      ["Ready for live execution", preflight.readyForLiveExecution],
      ["Ready for production execution", preflight.readyForProductionExecution],
      ["Preflight slot count", preflight.preflightSlotCount],
      ["Ledger import preflight slot count", preflight.ledgerImportPreflightSlotCount],
      ["Target import preflight slot count", preflight.targetImportPreflightSlotCount],
      ["Policy archive import preflight slot count", preflight.policyArchiveImportPreflightSlotCount],
      ["Maintenance import preflight slot count", preflight.maintenanceImportPreflightSlotCount],
      ["Closeout import preflight slot count", preflight.closeoutImportPreflightSlotCount],
      ["Scope count", preflight.scopeCount],
      ["Import field count", preflight.importFieldCount],
      ["Passed gates", `${preflight.passedGateCount}/${preflight.gateCount}`],
      ["Imports runtime payload", preflight.importsRuntimePayload],
      ["Accepts synthetic evidence", preflight.acceptsSyntheticEvidence],
      ["Contains secret value", preflight.containsSecretValue],
      ["Import preflight digest", preflight.importPreflightDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(preflight.gates), bodyLeadingBlankLine: false },
      { heading: "Slots", lines: preflight.slots.flatMap(renderSlot), bodyLeadingBlankLine: false },
      {
        heading: "Blocked Reasons",
        lines: renderVerificationBlockedReasonLines(preflight.blockedReasonCodes),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderSlot(
  slot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot,
): string[] {
  return [
    `### ${slot.order}. ${slot.nodeVersion} ${slot.code}`,
    `- Kind: ${slot.kind}`,
    `- Scope: ${slot.scope}`,
    `- Source worksheet slot: ${slot.sourceWorksheetSlotCode}`,
    `- Source worksheet slot blank: ${slot.sourceWorksheetSlotBlank}`,
    `- Source worksheet control passed: ${slot.sourceWorksheetControlPassed}`,
    `- Import field names: ${slot.importFieldNames.join(", ")}`,
    `- Expected value state: ${slot.expectedValueState}`,
    `- Normalizer rule: ${slot.normalizerRule}`,
    `- Validation rule: ${slot.validationRule}`,
    `- Redaction rule: ${slot.redactionRule}`,
    `- Import block rule: ${slot.importBlockRule}`,
    `- Missing value policy: ${slot.missingValuePolicy}`,
    `- Import value state: ${slot.importValueState}`,
    `- Manual value state: ${slot.manualValueState}`,
    `- Ready for operator import: ${slot.readyForOperatorImport}`,
    `- Imports runtime payload: ${slot.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${slot.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${slot.containsSecretValue}`,
    `- Writes allowed: ${slot.writesAllowed}`,
    `- Automatic service start: ${slot.automaticServiceStart}`,
    "",
  ];
}
