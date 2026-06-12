import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver disabled fake harness contract upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
      ],
      ["Consumes Node v288", profile.consumesNodeV288DisabledFakeHarnessContract],
      ["Consumes Java v122-v126", profile.consumesJavaV122V126QualityAndEchoEvidence],
      ["Consumes mini-kv v127", profile.consumesMiniKvV127DisabledFakeHarnessNonParticipationReceipt],
      ["Fake harness runtime enabled", profile.fakeHarnessRuntimeEnabled],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v288", entries: profile.sourceNodeV288 },
      {
        heading: "Java v122-v126 Evidence",
        entries: {
          evidencePresent: profile.upstreamEchoes.javaV122V126.evidencePresent,
          verificationDocumented: profile.upstreamEchoes.javaV122V126.verificationDocumented,
          evidenceDigest: profile.upstreamEchoes.javaV122V126.evidenceDigest,
          completedVersions: profile.upstreamEchoes.javaV122V126.completedVersions,
          integrationTestSplitVersions: profile.upstreamEchoes.javaV122V126.integrationTestSplitVersions,
          integrationTestSplitComplete: profile.upstreamEchoes.javaV122V126.integrationTestSplitComplete,
          evidenceServiceCatalogStopgapApplied:
            profile.upstreamEchoes.javaV122V126.evidenceServiceCatalogStopgapApplied,
          boundaryCatalogPresent: profile.upstreamEchoes.javaV122V126.boundaryCatalogPresent,
          noFakeHarnessRuntimeDocumented:
            profile.upstreamEchoes.javaV122V126.noFakeHarnessRuntimeDocumented,
          credentialValueBoundaryDocumented:
            profile.upstreamEchoes.javaV122V126.credentialValueBoundaryDocumented,
          rawEndpointBoundaryDocumented:
            profile.upstreamEchoes.javaV122V126.rawEndpointBoundaryDocumented,
          managedAuditConnectionBoundaryDocumented:
            profile.upstreamEchoes.javaV122V126.managedAuditConnectionBoundaryDocumented,
          ledgerAndSqlBoundaryDocumented:
            profile.upstreamEchoes.javaV122V126.ledgerAndSqlBoundaryDocumented,
        },
      },
      {
        heading: "mini-kv v127 Receipt",
        entries: {
          evidencePresent: profile.upstreamEchoes.miniKvV127.evidencePresent,
          verificationDocumented: profile.upstreamEchoes.miniKvV127.verificationDocumented,
          receiptDigest: profile.upstreamEchoes.miniKvV127.receiptDigest,
          receiptVersion: profile.upstreamEchoes.miniKvV127.receiptVersion,
          releaseVersion: profile.upstreamEchoes.miniKvV127.releaseVersion,
          consumerHint: profile.upstreamEchoes.miniKvV127.consumerHint,
          sourceContract: profile.upstreamEchoes.miniKvV127.sourceContract,
          contractDigest: profile.upstreamEchoes.miniKvV127.contractDigest,
          readyForNodeV289UpstreamEchoVerification:
            profile.upstreamEchoes.miniKvV127.readyForNodeV289UpstreamEchoVerification,
          readOnly: profile.upstreamEchoes.miniKvV127.readOnly,
          executionAllowed: profile.upstreamEchoes.miniKvV127.executionAllowed,
          fakeHarnessRuntimeEnabled: profile.upstreamEchoes.miniKvV127.fakeHarnessRuntimeEnabled,
          fakeHarnessRuntimeImplemented: profile.upstreamEchoes.miniKvV127.fakeHarnessRuntimeImplemented,
          credentialValueRead: profile.upstreamEchoes.miniKvV127.credentialValueRead,
          rawEndpointUrlParsed: profile.upstreamEchoes.miniKvV127.rawEndpointUrlParsed,
          externalRequestSent: profile.upstreamEchoes.miniKvV127.externalRequestSent,
          connectsManagedAudit: profile.upstreamEchoes.miniKvV127.connectsManagedAudit,
          managedAuditStorageBackend: profile.upstreamEchoes.miniKvV127.managedAuditStorageBackend,
        },
      },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No disabled fake harness contract upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No disabled fake harness contract upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No disabled fake harness contract upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
