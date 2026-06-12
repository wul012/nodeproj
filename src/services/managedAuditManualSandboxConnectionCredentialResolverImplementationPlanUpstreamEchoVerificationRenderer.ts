import type {
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver implementation plan upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for upstream echo verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification],
      ["Original expected Node verification", profile.originalExpectedNodeVerificationVersion],
      ["Executed as", profile.executedAsNodeVersion],
      ["Ready for real resolver implementation", profile.readyForManagedAuditResolverImplementation],
      ["Ready for test-only fake harness precheck", profile.readyForTestOnlyFakeHarnessPrecheck],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      {
        heading: "Version Offset",
        lines: [profile.nodeVersionOffsetReason],
      },
      {
        heading: "Source Node v283",
        entries: {
          profileVersion: profile.sourceNodeV283.profileVersion,
          planState: profile.sourceNodeV283.planState,
          readyForImplementationPlanDraft: profile.sourceNodeV283.readyForImplementationPlanDraft,
          readyForJavaV121MiniKvV126Echo: profile.sourceNodeV283.readyForJavaV121MiniKvV126Echo,
          planDigest: profile.sourceNodeV283.planDigest,
          reviewDigest: profile.sourceNodeV283.reviewDigest,
          interfaceBoundaryCount: profile.sourceNodeV283.interfaceBoundaryCount,
          requiredArtifactCount: profile.sourceNodeV283.requiredArtifactCount,
          prohibitedActionCount: profile.sourceNodeV283.prohibitedActionCount,
          checkCount: profile.sourceNodeV283.checkCount,
          passedCheckCount: profile.sourceNodeV283.passedCheckCount,
        },
      },
      {
        heading: "Java v121 Echo",
        entries: {
          evidencePresent: profile.upstreamEchoes.javaV121.evidencePresent,
          verificationDocumented: profile.upstreamEchoes.javaV121.verificationDocumented,
          receiptDigest: profile.upstreamEchoes.javaV121.receiptDigest,
          planEchoMode: profile.upstreamEchoes.javaV121.planEchoMode,
          sourceSpan: profile.upstreamEchoes.javaV121.sourceSpan,
          originalExpectedNodeVerificationVersion:
            profile.upstreamEchoes.javaV121.originalExpectedNodeVerificationVersion,
          javaPlanDigestRequirementNamed: profile.upstreamEchoes.javaV121.javaPlanDigestRequirementNamed,
          concretePlanDigestValueEchoed: profile.upstreamEchoes.javaV121.concretePlanDigestValueEchoed,
          proofClaimCount: profile.upstreamEchoes.javaV121.proofClaimCount,
          nodeVerificationActionCount: profile.upstreamEchoes.javaV121.nodeVerificationActionCount,
        },
      },
      {
        heading: "mini-kv v126 Receipt",
        entries: {
          evidencePresent: profile.upstreamEchoes.miniKvV126.evidencePresent,
          verificationDocumented: profile.upstreamEchoes.miniKvV126.verificationDocumented,
          receiptDigest: profile.upstreamEchoes.miniKvV126.receiptDigest,
          releaseVersion: profile.upstreamEchoes.miniKvV126.releaseVersion,
          consumerHint: profile.upstreamEchoes.miniKvV126.consumerHint,
          sourcePlanState: profile.upstreamEchoes.miniKvV126.sourcePlanState,
          planDigest: profile.upstreamEchoes.miniKvV126.planDigest,
          reviewDigest: profile.upstreamEchoes.miniKvV126.reviewDigest,
          readOnly: profile.upstreamEchoes.miniKvV126.readOnly,
          executionAllowed: profile.upstreamEchoes.miniKvV126.executionAllowed,
          connectsManagedAudit: profile.upstreamEchoes.miniKvV126.connectsManagedAudit,
          managedAuditStorageBackend: profile.upstreamEchoes.miniKvV126.managedAuditStorageBackend,
        },
      },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential resolver implementation plan upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential resolver implementation plan upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential resolver implementation plan upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
