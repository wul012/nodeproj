import type {
  ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver fake harness readiness blocked decision upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for v293 echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification,
      ],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Fake harness runtime enabled", profile.fakeHarnessRuntimeEnabled],
    ],
    sections: [
      { heading: "Source Node v292", entries: profile.sourceNodeV292 },
      {
        heading: "Java v131 Direct Echo",
        entries: {
          evidencePresent: profile.upstreamEvidence.javaV131.evidencePresent,
          verificationDocumented: profile.upstreamEvidence.javaV131.verificationDocumented,
          directExecutionDeniedEchoPresent:
            profile.upstreamEvidence.javaV131.directExecutionDeniedEchoPresent,
          readyForNodeV293: profile.upstreamEvidence.javaV131.readyForNodeV293,
          echoMode: profile.upstreamEvidence.javaV131.echoMode,
          noFakeHarnessRuntime: profile.upstreamEvidence.javaV131.noFakeHarnessRuntime,
          credentialValueBoundaryClosed:
            profile.upstreamEvidence.javaV131.credentialValueBoundaryClosed,
          rawEndpointBoundaryClosed:
            profile.upstreamEvidence.javaV131.rawEndpointBoundaryClosed,
          managedAuditConnectionBoundaryClosed:
            profile.upstreamEvidence.javaV131.managedAuditConnectionBoundaryClosed,
          ledgerSqlSchemaBoundaryClosed:
            profile.upstreamEvidence.javaV131.ledgerSqlSchemaBoundaryClosed,
        },
      },
      {
        heading: "mini-kv v129 Retention Check",
        entries: {
          evidencePresent: profile.upstreamEvidence.miniKvV129.evidencePresent,
          verificationDocumented: profile.upstreamEvidence.miniKvV129.verificationDocumented,
          receiptVersion: profile.upstreamEvidence.miniKvV129.receiptVersion,
          releaseVersion: profile.upstreamEvidence.miniKvV129.releaseVersion,
          consumerHint: profile.upstreamEvidence.miniKvV129.consumerHint,
          receiptDigest: profile.upstreamEvidence.miniKvV129.receiptDigest,
          readyForNodeV293: profile.upstreamEvidence.miniKvV129.readyForNodeV293,
          sourceNodeV292Ready: profile.upstreamEvidence.miniKvV129.sourceNodeV292Ready,
          v128ReceiptDigestStable:
            profile.upstreamEvidence.miniKvV129.v128ReceiptDigestStable,
          readOnly: profile.upstreamEvidence.miniKvV129.readOnly,
          executionAllowed: profile.upstreamEvidence.miniKvV129.executionAllowed,
          fakeHarnessRuntimeImplemented:
            profile.upstreamEvidence.miniKvV129.fakeHarnessRuntimeImplemented,
          credentialValueRead: profile.upstreamEvidence.miniKvV129.credentialValueRead,
          rawEndpointUrlParsed: profile.upstreamEvidence.miniKvV129.rawEndpointUrlParsed,
          externalRequestSent: profile.upstreamEvidence.miniKvV129.externalRequestSent,
          connectsManagedAudit: profile.upstreamEvidence.miniKvV129.connectsManagedAudit,
        },
      },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No v293 upstream echo blockers.",
      },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No v293 upstream echo warnings." },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No v293 upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", lines: profile.nextActions.map((action) => `- ${action}`) },
    ],
  });
}
