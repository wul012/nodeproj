import type {
  ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver production readiness decision gate",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision gate state", profile.decisionGateState],
      ["Readiness decision", profile.readinessDecision],
      ["Ready for pre-implementation plan", profile.readyForCredentialResolverPreImplementationPlan],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v267", entries: profile.sourceNodeV267 },
      { heading: "Pre-Implementation Requirements", entries: profile.preImplementationRequirements },
      { heading: "Production Readiness Decision", entries: profile.productionReadinessDecision },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential resolver production readiness blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential resolver production readiness warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential resolver production readiness recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
