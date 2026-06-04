import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStep,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketMarkdown(
  packet: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
): string {
  return [
    "# Controlled read-only shard preview live read-only window rehearsal packet",
    "",
    `- Packet version: ${packet.packetVersion}`,
    `- Packet state: ${packet.packetState}`,
    `- Ready for manual live read-only rehearsal: ${packet.readyForManualLiveReadOnlyRehearsal}`,
    `- Ready for live execution: ${packet.readyForLiveExecution}`,
    `- Ready for production execution: ${packet.readyForProductionExecution}`,
    `- Step count: ${packet.stepCount}`,
    `- Owner count: ${packet.ownerCount}`,
    `- Evidence slot count: ${packet.evidenceSlotCount}`,
    `- Cleanup required steps: ${packet.cleanupRequiredStepCount}`,
    `- Failure class count: ${packet.failureClassCount}`,
    `- Passed gates: ${packet.passedGateCount}/${packet.gateCount}`,
    `- Packet digest: ${packet.packetDigest}`,
    "",
    "## Gates",
    ...renderEntries(packet.gates),
    "",
    "## Steps",
    ...packet.steps.flatMap(renderStep),
    "",
    "## Blocked Reasons",
    ...(packet.blockedReasonCodes.length === 0
      ? ["- none"]
      : packet.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
}

function renderStep(step: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStep): string[] {
  return [
    `### ${step.order}. ${step.nodeVersion} ${step.code}`,
    `- Kind: ${step.kind}`,
    `- Source runbook section: ${step.sourceRunbookSectionCode}`,
    `- Owner: ${step.owner}`,
    `- Rehearsal instruction: ${step.rehearsalInstruction}`,
    `- Evidence slot: ${step.evidenceSlot}`,
    `- Failure class: ${step.failureClass}`,
    `- Cleanup required: ${step.cleanupRequired}`,
    `- Read-only: ${step.readOnly}`,
    `- Writes allowed: ${step.writesAllowed}`,
    `- Automatic service start: ${step.automaticServiceStart}`,
    "",
  ];
}
