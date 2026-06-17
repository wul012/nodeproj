import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecord,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketMarkdown(
  packet: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window evidence packet",
    meta: [
      ["Evidence packet version", packet.evidencePacketVersion],
      ["Packet state", packet.packetState],
      ["Ready for manual evidence capture", packet.readyForManualEvidenceCapture],
      ["Ready for live execution", packet.readyForLiveExecution],
      ["Ready for production execution", packet.readyForProductionExecution],
      ["Record count", packet.recordCount],
      ["Target count", packet.targetCount],
      ["Command evidence record count", packet.commandEvidenceRecordCount],
      ["Cleanup record count", packet.cleanupRecordCount],
      ["Failure class count", packet.failureClassCount],
      ["Required field count", packet.requiredFieldCount],
      ["Acceptance criterion count", packet.acceptanceCriterionCount],
      ["Passed gates", `${packet.passedGateCount}/${packet.gateCount}`],
      ["Runtime payload captured", packet.runtimePayloadCaptured],
      ["Contains secret value", packet.containsSecretValue],
      ["Evidence packet digest", packet.evidencePacketDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(packet.gates), bodyLeadingBlankLine: false },
      { heading: "Records", lines: packet.records.flatMap(renderRecord), bodyLeadingBlankLine: false },
      {
        heading: "Blocked Reasons",
        lines: renderBlockedReasons(packet.blockedReasonCodes),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderBlockedReasons(blockedReasonCodes: readonly string[]): string[] {
  return blockedReasonCodes.length === 0
    ? ["- none"]
    : blockedReasonCodes.map((reason) => `- ${reason}`);
}

function renderRecord(record: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecord): string[] {
  return [
    `### ${record.order}. ${record.nodeVersion} ${record.code}`,
    `- Kind: ${record.kind}`,
    `- Source worksheet step: ${record.sourceWorksheetStepCode}`,
    `- Owner: ${record.owner}`,
    `- Target: ${record.target}`,
    `- Record slot: ${record.recordSlot}`,
    `- Required fields: ${record.requiredFields.join(", ")}`,
    `- Acceptance criteria: ${record.acceptanceCriteria.join("; ")}`,
    `- Redaction rule: ${record.redactionRule}`,
    `- Cleanup required: ${record.cleanupRequired}`,
    `- Failure class: ${record.failureClass}`,
    `- Capture state: ${record.captureState}`,
    `- Runtime payload captured: ${record.runtimePayloadCaptured}`,
    `- Contains secret value: ${record.containsSecretValue}`,
    `- Writes allowed: ${record.writesAllowed}`,
    `- Automatic service start: ${record.automaticServiceStart}`,
    "",
  ];
}
