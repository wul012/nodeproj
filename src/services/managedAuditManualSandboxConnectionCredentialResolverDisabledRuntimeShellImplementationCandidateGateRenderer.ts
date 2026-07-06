import {
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  DisabledRuntimeShellImplementationCandidateGateItem,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
} from "./releaseReportShared.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Managed audit manual sandbox connection credential resolver disabled runtime shell implementation candidate gate",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Candidate gate state": profile.candidateGateState,
        "Ready for candidate gate":
          profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
        "Ready for Java v134 + mini-kv v131 echo request": profile.readyForParallelJavaV134MiniKvV131EchoRequest,
        "Ready for runtime implementation": profile.readyForDisabledRuntimeShellImplementation,
        "Runtime shell implemented": profile.runtimeShellImplemented,
        "Execution allowed": profile.executionAllowed,
        "Connects managed audit": profile.connectsManagedAudit,
      },
    ),
    ...renderReleaseReportEntriesSection("Source Node v296", profile.sourceNodeV296),
    ...renderReleaseReportEntriesSection("Candidate Gate", {
      gateVersion: profile.candidateGate.gateVersion,
      gateMode: profile.candidateGate.gateMode,
      sourceSpan: profile.candidateGate.sourceSpan,
      gateDecision: profile.candidateGate.gateDecision,
      gateDigest: profile.candidateGate.gateDigest,
      decisionRationale: profile.candidateGate.decisionRationale,
      requiredGateCount: profile.candidateGate.requiredGateCount,
      documentedGateCount: profile.candidateGate.documentedGateCount,
      reviewEvidenceSatisfiedCount: profile.candidateGate.reviewEvidenceSatisfiedCount,
      runtimePrerequisiteSatisfiedCount: profile.candidateGate.runtimePrerequisiteSatisfiedCount,
      implementationAllowedGateCount: profile.candidateGate.implementationAllowedGateCount,
    }),
    ...renderReleaseReportEntriesSection("Necessity", profile.candidateGate.necessity),
    ...renderReleaseReportLineSection("Required Gates", profile.candidateGate.requiredGates.flatMap(renderGate)),
    ...renderReleaseReportLineSection(
      "Stop Conditions",
      renderList(profile.candidateGate.stopConditions, "No candidate gate stop conditions."),
    ),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No disabled runtime shell implementation candidate gate blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No disabled runtime shell implementation candidate gate warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No disabled runtime shell implementation candidate gate recommendations.",
    ),
    ...renderReleaseReportEntriesSection("Evidence Endpoints", profile.evidenceEndpoints),
    ...renderReleaseReportLineSection("Next Actions", profile.nextActions.map((action) => `- ${action}`)),
  ].join("\n");
}

function renderGate(gate: DisabledRuntimeShellImplementationCandidateGateItem): string[] {
  return [
    `- ${gate.code}: ${gate.title}`,
    `  - owner: ${gate.owner}`,
    `  - requirement: ${gate.requirement}`,
    `  - sourceEvidence: ${gate.sourceEvidence}`,
    `  - reviewEvidenceSatisfied: ${gate.reviewEvidenceSatisfied}`,
    `  - runtimePrerequisiteSatisfied: ${gate.runtimePrerequisiteSatisfied}`,
    `  - implementationAllowed: ${gate.implementationAllowed}`,
    `  - failureClass: ${gate.failureClass}`,
  ];
}
