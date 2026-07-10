import type {
  CredentialResolverDecisionField,
  CredentialResolverNoGoCondition,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver decision record",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision state", profile.decisionState],
      ["Ready for credential resolver decision record", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v259", entries: profile.sourceNodeV259 },
      { heading: "Decision Record", entries: {
      decisionDigest: profile.decisionRecord.decisionDigest,
      recordMode: profile.decisionRecord.recordMode,
      decisionScope: profile.decisionRecord.decisionScope,
      decisionStatus: profile.decisionRecord.decisionStatus,
      sourceSpan: profile.decisionRecord.sourceSpan,
      endpointHandle: profile.decisionRecord.endpointHandle,
      credentialHandle: profile.decisionRecord.credentialHandle,
      resolverPolicyHandle: profile.decisionRecord.resolverPolicyHandle,
      approvalMarker: profile.decisionRecord.approvalMarker,
      resolverMode: profile.decisionRecord.resolverMode,
      resolverCandidateImplementation: profile.decisionRecord.resolverCandidateImplementation,
      requiredDecisionFieldCount: profile.decisionRecord.requiredDecisionFieldCount,
      explicitNoGoConditionCount: profile.decisionRecord.explicitNoGoConditionCount,
      credentialValueMayBeRead: profile.decisionRecord.credentialValueMayBeRead,
      rawEndpointUrlMayBeParsed: profile.decisionRecord.rawEndpointUrlMayBeParsed,
      managedAuditConnectionMayOpen: profile.decisionRecord.managedAuditConnectionMayOpen,
      schemaMigrationMayExecute: profile.decisionRecord.schemaMigrationMayExecute,
      externalRequestMayBeSent: profile.decisionRecord.externalRequestMayBeSent,
      } },
      { heading: "Required Decision Fields", list: profile.decisionRecord.requiredDecisionFields.map(formatDecisionField), emptyText: "No required decision fields." },
      { heading: "Explicit No-Go Conditions", list: profile.decisionRecord.explicitNoGoConditions.map(formatNoGoCondition), emptyText: "No no-go conditions." },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No credential resolver decision blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No credential resolver decision warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No credential resolver decision recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function formatDecisionField(field: CredentialResolverDecisionField): string {
  return `${field.id}: ${field.label}; source=${field.expectedSource}; evidence=${field.acceptedEvidence}; nodeMayReadValue=${field.nodeMayReadValue}`;
}

function formatNoGoCondition(condition: CredentialResolverNoGoCondition): string {
  return `${condition.code}: ${condition.condition}; action=${condition.action}`;
}
