import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for disabled precheck upstream echo verification", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v262", entries: profile.sourceNodeV262 },
      {
        heading: "Java v106 Echo",
        entries: {
          sourceVersion: profile.upstreamEchoes.javaV106.sourceVersion,
          responseSchemaVersion: profile.upstreamEchoes.javaV106.responseSchemaVersion,
          markerField: profile.upstreamEchoes.javaV106.markerField,
          consumedNodeVersion: profile.upstreamEchoes.javaV106.consumedNodeVersion,
          consumedNodeProfile: profile.upstreamEchoes.javaV106.consumedNodeProfile,
          nextNodeConsumerVersion: profile.upstreamEchoes.javaV106.nextNodeConsumerVersion,
          precheckMode: profile.upstreamEchoes.javaV106.precheckMode,
          requiredEnvHandleCount: profile.upstreamEchoes.javaV106.requiredEnvHandleCount,
          optInGateCount: profile.upstreamEchoes.javaV106.optInGateCount,
          failureClassCount: profile.upstreamEchoes.javaV106.failureClassCount,
          dryRunResponseFieldCount: profile.upstreamEchoes.javaV106.dryRunResponseFieldCount,
          inheritedNoGoConditionCount: profile.upstreamEchoes.javaV106.inheritedNoGoConditionCount,
          readyForNodeV263: profile.upstreamEchoes.javaV106.readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
        },
      },
      {
        heading: "mini-kv v115 Non-Participation",
        entries: {
          sourceVersion: profile.upstreamEchoes.miniKvV115.sourceVersion,
          receiptVersion: profile.upstreamEchoes.miniKvV115.receiptVersion,
          releaseVersion: profile.upstreamEchoes.miniKvV115.releaseVersion,
          consumerHint: profile.upstreamEchoes.miniKvV115.consumerHint,
          receiptDigest: profile.upstreamEchoes.miniKvV115.receiptDigest,
          sourcePrecheckProfileVersion: profile.upstreamEchoes.miniKvV115.sourcePrecheckProfileVersion,
          sourcePrecheckState: profile.upstreamEchoes.miniKvV115.sourcePrecheckState,
          sourcePrecheckMode: profile.upstreamEchoes.miniKvV115.sourcePrecheckMode,
          disabledPrecheckMode: profile.upstreamEchoes.miniKvV115.disabledPrecheckMode,
          disabledPrecheckReadyState: profile.upstreamEchoes.miniKvV115.disabledPrecheckReadyState,
          readyForNodeV263Alignment: profile.upstreamEchoes.miniKvV115.readyForNodeV263Alignment,
        },
      },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No disabled resolver upstream echo verification blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No disabled resolver upstream echo verification warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No disabled resolver upstream echo verification recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
