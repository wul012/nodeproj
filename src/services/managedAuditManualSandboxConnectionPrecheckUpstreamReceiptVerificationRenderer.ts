import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection precheck upstream receipt verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for upstream receipt verification",
        profile.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
      ],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v245", entries: profile.sourceNodeV245 },
      { heading: "Java v99 Precheck Echo", entries: profile.upstreamReceipts.javaV99 },
      { heading: "mini-kv v108 Non-Participation", entries: profile.upstreamReceipts.miniKvV108 },
      { heading: "Receipt Verification", entries: profile.receiptVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No precheck upstream receipt verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No precheck upstream receipt verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No precheck upstream receipt verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
