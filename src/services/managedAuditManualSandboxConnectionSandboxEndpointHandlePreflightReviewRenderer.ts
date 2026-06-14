import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint handle preflight review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Ready for endpoint handle preflight review", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v257", entries: profile.sourceNodeV257 },
      { heading: "Preflight Review", entries: profile.preflightReview },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No sandbox endpoint handle preflight review blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No sandbox endpoint handle preflight review warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No sandbox endpoint handle preflight review recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
