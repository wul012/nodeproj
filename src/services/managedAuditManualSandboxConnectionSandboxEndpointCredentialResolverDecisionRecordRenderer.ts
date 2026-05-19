import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  CredentialResolverDecisionField,
  CredentialResolverNoGoCondition,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
): string {
  return [
    "# Managed audit manual sandbox connection sandbox endpoint credential resolver decision record",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Decision state: ${profile.decisionState}`,
    `- Ready for credential resolver decision record: ${profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v259",
    "",
    ...renderEntries(profile.sourceNodeV259),
    "",
    "## Decision Record",
    "",
    ...renderEntries({
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
    }),
    "",
    "## Required Decision Fields",
    "",
    ...renderList(profile.decisionRecord.requiredDecisionFields.map(formatDecisionField), "No required decision fields."),
    "",
    "## Explicit No-Go Conditions",
    "",
    ...renderList(profile.decisionRecord.explicitNoGoConditions.map(formatNoGoCondition), "No no-go conditions."),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No credential resolver decision blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No credential resolver decision warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No credential resolver decision recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function formatDecisionField(field: CredentialResolverDecisionField): string {
  return `${field.id}: ${field.label}; source=${field.expectedSource}; evidence=${field.acceptedEvidence}; nodeMayReadValue=${field.nodeMayReadValue}`;
}

function formatNoGoCondition(condition: CredentialResolverNoGoCondition): string {
  return `${condition.code}: ${condition.condition}; action=${condition.action}`;
}
