import {
  renderEntries,
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  ApprovalPrerequisiteArtifactIntakePlan,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver approval prerequisite artifact intake plan",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Plan state", profile.planState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for artifact intake plan",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan,
      ],
      ["Ready for parallel Java v142 + mini-kv v135 echo", profile.readyForParallelJavaV142MiniKvV135Echo],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v305", entries: profile.sourceNodeV305 },
      { heading: "Artifact Intake Plan", lines: renderArtifactIntakePlan(profile.artifactIntakePlan) },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No approval prerequisite artifact intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No approval prerequisite artifact intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No approval prerequisite artifact intake recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderArtifactIntakePlan(plan: ApprovalPrerequisiteArtifactIntakePlan): string[] {
  return [
    ...renderEntries({
      artifactDigest: plan.artifactDigest,
      artifactName: plan.artifactName,
      artifactVersion: plan.artifactVersion,
      intakeMode: plan.intakeMode,
      sourceSpan: plan.sourceSpan,
      purpose: plan.purpose,
      requiredFieldCount: plan.requiredFieldCount,
      prohibitedFieldCount: plan.prohibitedFieldCount,
      rejectionReasonCount: plan.rejectionReasonCount,
      noGoBoundaryCount: plan.noGoBoundaryCount,
      javaMiniKvEchoCanRunInParallel: plan.javaMiniKvEchoCanRunInParallel,
      implementationStillBlocked: plan.implementationStillBlocked,
    }),
    "",
    "### Required Fields",
    "",
    ...renderList(
      plan.requiredFields.map((field) =>
        `${field.id}: source=${field.source}; shape=${field.acceptedShape}; purpose=${field.purpose}`),
      "No required artifact fields.",
    ),
    "",
    "### Prohibited Fields",
    "",
    ...renderList(
      plan.prohibitedFields.map((field) => `${field.id}: rejection=${field.rejectionCode}; reason=${field.reason}`),
      "No prohibited artifact fields.",
    ),
    "",
    "### Rejection Reasons",
    "",
    ...renderList(
      plan.rejectionReasons.map((reason) => `${reason.code}: ${reason.source}; ${reason.message}`),
      "No rejection reasons.",
    ),
    "",
    "### No-Go Boundaries",
    "",
    ...renderList(
      plan.noGoBoundaries.map((boundary) => `${boundary.id}: allowed=${boundary.allowed}; ${boundary.message}`),
      "No no-go boundaries.",
    ),
    "",
    "### Upstream Echo Requests",
    "",
    ...renderList(
      plan.upstreamEchoRequests.map((request) =>
        `${request.version}: project=${request.project}; parallel=${request.canRunInParallel}; readOnly=${request.mustRemainReadOnly}; ${request.requestedEcho}`),
      "No upstream echo requests.",
    ),
  ];
}
