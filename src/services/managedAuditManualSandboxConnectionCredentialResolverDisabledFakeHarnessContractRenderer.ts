import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled fake harness contract",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Contract state", profile.contractState],
      [
        "Ready for disabled fake harness contract",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
      ],
      ["Ready for Java v122 + mini-kv v127 echo", profile.readyForJavaV122MiniKvV127ParallelEcho],
      ["Fake harness runtime enabled", profile.fakeHarnessRuntimeEnabled],
      ["Runtime invocation allowed", profile.disabledFakeHarnessContract.runtimeInvocationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v287", entries: profile.sourceNodeV287 },
      {
        heading: "Disabled Fake Harness Contract",
        entries: {
          contractDigest: profile.disabledFakeHarnessContract.contractDigest,
          contractMode: profile.disabledFakeHarnessContract.contractMode,
          sourceSpan: profile.disabledFakeHarnessContract.sourceSpan,
          contractName: profile.disabledFakeHarnessContract.contractName,
          runtimeToggleName: profile.disabledFakeHarnessContract.runtimeToggleName,
          defaultRuntimeToggleValue: profile.disabledFakeHarnessContract.defaultRuntimeToggleValue,
          invocationState: profile.disabledFakeHarnessContract.invocationState,
          runtimeImplementationPresent: profile.disabledFakeHarnessContract.runtimeImplementationPresent,
          runtimeInvocationAllowed: profile.disabledFakeHarnessContract.runtimeInvocationAllowed,
        },
      },
      {
        heading: "Required Inputs",
        list: profile.disabledFakeHarnessContract.requiredInputs,
        emptyText: "No required inputs.",
      },
      {
        heading: "Allowed Outputs",
        list: profile.disabledFakeHarnessContract.allowedOutputs,
        emptyText: "No allowed outputs.",
      },
      {
        heading: "Prohibited Inputs",
        list: profile.disabledFakeHarnessContract.prohibitedInputs,
        emptyText: "No prohibited inputs.",
      },
      {
        heading: "Required Artifacts",
        list: profile.disabledFakeHarnessContract.requiredArtifacts,
        emptyText: "No required artifacts.",
      },
      {
        heading: "Contract Assertions",
        list: profile.disabledFakeHarnessContract.contractAssertions,
        emptyText: "No contract assertions.",
      },
      {
        heading: "Prohibited Actions",
        list: profile.disabledFakeHarnessContract.prohibitedActions,
        emptyText: "No prohibited actions.",
      },
      {
        heading: "Boundary Summary",
        entries: {
          credentialHandleOnly: profile.disabledFakeHarnessContract.credentialBoundary.credentialHandleOnly,
          credentialValueRead: profile.disabledFakeHarnessContract.credentialBoundary.credentialValueRead,
          credentialValueProvided: profile.disabledFakeHarnessContract.credentialBoundary.credentialValueProvided,
          endpointHandleOnly: profile.disabledFakeHarnessContract.endpointBoundary.endpointHandleOnly,
          rawEndpointUrlParsed: profile.disabledFakeHarnessContract.endpointBoundary.rawEndpointUrlParsed,
          rawEndpointUrlRendered: profile.disabledFakeHarnessContract.endpointBoundary.rawEndpointUrlRendered,
          realSecretProviderInstantiated:
            profile.disabledFakeHarnessContract.providerClientBoundary.realSecretProviderInstantiated,
          realResolverClientInstantiated:
            profile.disabledFakeHarnessContract.providerClientBoundary.realResolverClientInstantiated,
          fakeSecretProviderInstantiated:
            profile.disabledFakeHarnessContract.providerClientBoundary.fakeSecretProviderInstantiated,
          fakeResolverClientInstantiated:
            profile.disabledFakeHarnessContract.providerClientBoundary.fakeResolverClientInstantiated,
          externalRequestSent: profile.disabledFakeHarnessContract.networkBoundary.externalRequestSent,
          connectsManagedAudit: profile.disabledFakeHarnessContract.networkBoundary.connectsManagedAudit,
          executionAllowed: profile.disabledFakeHarnessContract.writeBoundary.executionAllowed,
          schemaMigrationExecuted: profile.disabledFakeHarnessContract.writeBoundary.schemaMigrationExecuted,
          approvalLedgerWritten: profile.disabledFakeHarnessContract.writeBoundary.approvalLedgerWritten,
          automaticUpstreamStart: profile.disabledFakeHarnessContract.autoStartBoundary.automaticUpstreamStart,
        },
      },
      { heading: "Upstream Echo Requirement", entries: profile.upstreamEchoRequirement },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No disabled fake harness contract blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No disabled fake harness contract warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No disabled fake harness contract recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
