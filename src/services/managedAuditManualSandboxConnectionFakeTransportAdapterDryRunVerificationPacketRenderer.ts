import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketTypes.js";

export function renderManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketMarkdown(
  profile: ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection fake transport adapter dry-run verification packet",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Packet state", profile.packetState],
      [
        "Ready for fake transport dry-run packet",
        profile.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
      ],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v253", entries: profile.sourceNodeV253 },
      { heading: "Source Node v254", entries: profile.sourceNodeV254 },
      {
        heading: "Packet",
        entries: {
          packetDigest: profile.fakeTransportDryRunPacket.packetDigest,
          packetMode: profile.fakeTransportDryRunPacket.packetMode,
          sourceSpan: profile.fakeTransportDryRunPacket.sourceSpan,
        },
      },
      { heading: "Request", entries: profile.fakeTransportDryRunPacket.request },
      { heading: "Response", entries: profile.fakeTransportDryRunPacket.response },
      { heading: "Timeout Budget", entries: profile.fakeTransportDryRunPacket.timeoutBudget },
      { heading: "Failure Mapping Verification", entries: profile.fakeTransportDryRunPacket.failureMappingVerification },
      { heading: "Cleanup", entries: profile.fakeTransportDryRunPacket.cleanup },
      { heading: "Boundaries", entries: profile.fakeTransportDryRunPacket.boundaries },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No fake transport adapter dry-run packet blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No fake transport adapter dry-run packet warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No fake transport adapter dry-run packet recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
