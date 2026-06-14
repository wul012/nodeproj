import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for test-only shell upstream echo verification", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      {
        heading: "Source Node v264",
        entries: {
          sourceVersion: profile.sourceNodeV264.sourceVersion,
          profileVersion: profile.sourceNodeV264.profileVersion,
          shellContractState: profile.sourceNodeV264.shellContractState,
          readyForTestOnlyShellContract: profile.sourceNodeV264.readyForTestOnlyShellContract,
          shellMode: profile.sourceNodeV264.shellMode,
          resolverKind: profile.sourceNodeV264.resolverKind,
          requestShapeFieldCount: profile.sourceNodeV264.requestShapeFieldCount,
          responseShapeFieldCount: profile.sourceNodeV264.responseShapeFieldCount,
          failureMappingCount: profile.sourceNodeV264.failureMappingCount,
          guardConditionCount: profile.sourceNodeV264.guardConditionCount,
          readyForNodeV265: profile.sourceNodeV264.readyForNodeV265TestOnlyShellUpstreamEchoVerification,
        },
      },
      {
        heading: "Java v107 Echo",
        entries: {
          sourceVersion: profile.upstreamEchoes.javaV107.sourceVersion,
          responseSchemaVersion: profile.upstreamEchoes.javaV107.responseSchemaVersion,
          markerField: profile.upstreamEchoes.javaV107.markerField,
          consumedNodeVersion: profile.upstreamEchoes.javaV107.consumedNodeVersion,
          nextNodeConsumerVersion: profile.upstreamEchoes.javaV107.nextNodeConsumerVersion,
          shellMode: profile.upstreamEchoes.javaV107.shellMode,
          resolverKind: profile.upstreamEchoes.javaV107.resolverKind,
          requestShapeFieldCount: profile.upstreamEchoes.javaV107.requestShapeFieldCount,
          responseShapeFieldCount: profile.upstreamEchoes.javaV107.responseShapeFieldCount,
          failureMappingCount: profile.upstreamEchoes.javaV107.failureMappingCount,
          guardConditionCount: profile.upstreamEchoes.javaV107.guardConditionCount,
          readyForNodeV265: profile.upstreamEchoes.javaV107.readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
        },
      },
      {
        heading: "mini-kv v116 Non-Participation",
        entries: {
          sourceVersion: profile.upstreamEchoes.miniKvV116.sourceVersion,
          receiptVersion: profile.upstreamEchoes.miniKvV116.receiptVersion,
          releaseVersion: profile.upstreamEchoes.miniKvV116.releaseVersion,
          consumerHint: profile.upstreamEchoes.miniKvV116.consumerHint,
          receiptDigest: profile.upstreamEchoes.miniKvV116.receiptDigest,
          sourceContractProfileVersion: profile.upstreamEchoes.miniKvV116.sourceContractProfileVersion,
          sourceContractState: profile.upstreamEchoes.miniKvV116.sourceContractState,
          sourceShellMode: profile.upstreamEchoes.miniKvV116.sourceShellMode,
          sourceResolverKind: profile.upstreamEchoes.miniKvV116.sourceResolverKind,
          readyForNodeV265Alignment: profile.upstreamEchoes.miniKvV116.readyForNodeV265Alignment,
        },
      },
      { heading: "Java v109 Optimization Context", entries: profile.optimizationContext.javaV109 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No test-only resolver shell upstream echo verification blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No test-only resolver shell upstream echo verification warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No test-only resolver shell upstream echo verification recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
