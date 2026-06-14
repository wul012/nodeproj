import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver test-only fake harness precheck",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Precheck state", profile.precheckState],
      [
        "Ready for test-only fake harness precheck",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
      ],
      ["Ready for disabled fake harness contract", profile.readyForDisabledFakeHarnessContract],
      ["Ready for real resolver implementation", profile.readyForManagedAuditResolverImplementation],
      ["Fake harness runtime enabled", profile.fakeHarnessRuntimeEnabled],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v286", entries: profile.sourceNodeV286 },
      {
        heading: "Fake Harness Precheck",
        entries: {
          precheckDigest: profile.fakeHarnessPrecheck.precheckDigest,
          precheckMode: profile.fakeHarnessPrecheck.precheckMode,
          sourceSpan: profile.fakeHarnessPrecheck.sourceSpan,
          fakeHarnessName: profile.fakeHarnessPrecheck.fakeHarnessName,
          runtimeToggleName: profile.fakeHarnessPrecheck.runtimeToggleName,
          defaultRuntimeToggleValue: profile.fakeHarnessPrecheck.defaultRuntimeToggleValue,
          fakeHarnessRuntimeEnabled: profile.fakeHarnessPrecheck.fakeHarnessRuntimeEnabled,
          fakeHarnessInvocationAllowed: profile.fakeHarnessPrecheck.fakeHarnessInvocationAllowed,
          testOnlyFakeHarnessExecutionAllowed: profile.fakeHarnessPrecheck.testOnlyFakeHarnessExecutionAllowed,
        },
      },
      {
        heading: "Boundary Summary",
        entries: {
          credentialHandleOnly: profile.fakeHarnessPrecheck.credentialBoundary.credentialHandleOnly,
          credentialValueRead: profile.fakeHarnessPrecheck.credentialBoundary.credentialValueRead,
          credentialValueProvided: profile.fakeHarnessPrecheck.credentialBoundary.credentialValueProvided,
          endpointHandleOnly: profile.fakeHarnessPrecheck.endpointBoundary.endpointHandleOnly,
          rawEndpointUrlParsed: profile.fakeHarnessPrecheck.endpointBoundary.rawEndpointUrlParsed,
          rawEndpointUrlRendered: profile.fakeHarnessPrecheck.endpointBoundary.rawEndpointUrlRendered,
          realSecretProviderInstantiated:
            profile.fakeHarnessPrecheck.providerClientBoundary.realSecretProviderInstantiated,
          realResolverClientInstantiated:
            profile.fakeHarnessPrecheck.providerClientBoundary.realResolverClientInstantiated,
          fakeSecretProviderInstantiated:
            profile.fakeHarnessPrecheck.providerClientBoundary.fakeSecretProviderInstantiated,
          fakeResolverClientInstantiated:
            profile.fakeHarnessPrecheck.providerClientBoundary.fakeResolverClientInstantiated,
          externalRequestSent: profile.fakeHarnessPrecheck.networkBoundary.externalRequestSent,
          connectsManagedAudit: profile.fakeHarnessPrecheck.networkBoundary.connectsManagedAudit,
          executionAllowed: profile.fakeHarnessPrecheck.writeBoundary.executionAllowed,
          schemaMigrationExecuted: profile.fakeHarnessPrecheck.writeBoundary.schemaMigrationExecuted,
          approvalLedgerWritten: profile.fakeHarnessPrecheck.writeBoundary.approvalLedgerWritten,
          automaticUpstreamStart: profile.fakeHarnessPrecheck.autoStartBoundary.automaticUpstreamStart,
        },
      },
      { heading: "Required Artifacts", list: profile.fakeHarnessPrecheck.requiredArtifacts, emptyText: "No required artifacts." },
      { heading: "Prohibited Actions", list: profile.fakeHarnessPrecheck.prohibitedActions, emptyText: "No prohibited actions." },
      { heading: "Upstream Echo Decision", entries: profile.upstreamEchoDecision },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No test-only fake harness precheck blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No test-only fake harness precheck warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No test-only fake harness precheck recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
