import type {
  ApprovalRequiredImplementationBoundaryReadiness,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver approval-required implementation readiness review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Ready for implementation readiness review", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview],
      ["Ready for Java v116 + mini-kv v122 echo", profile.readyForJavaV116MiniKvV122Echo],
      ["Ready for managed audit resolver implementation", profile.readyForManagedAuditResolverImplementation],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v275", entries: profile.sourceNodeV275 },
      { heading: "Readiness Review", entries: profile.readinessReview },
      { heading: "Boundary Readiness", list: profile.boundaryReadiness.map(formatBoundaryReadiness), emptyText: "No boundary readiness items." },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No approval-required implementation readiness blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No approval-required implementation readiness warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No approval-required implementation readiness recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function formatBoundaryReadiness(boundary: ApprovalRequiredImplementationBoundaryReadiness): string {
  return [
    `${boundary.code}: ${boundary.readinessState}`,
    `owner=${boundary.owner}`,
    `requirement=${boundary.requirementFromV268}`,
    `requiredArtifacts=${boundary.requiredArtifacts.join(" | ")}`,
    `javaV116=${boundary.javaV116EchoHint}`,
    `miniKvV122=${boundary.miniKvV122ReceiptHint}`,
    `nodeV282=${boundary.nodeV282VerificationHint}`,
    `readyForRuntimeImplementation=${boundary.readyForRuntimeImplementation}`,
  ].join("; ");
}
