import type {
  ForbiddenIntegrationOperation,
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile,
  ReadOnlyIntegrationEnvironmentHandle,
  ReadOnlyIntegrationRequirement,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration window readiness cut",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Readiness state", profile.readinessState],
      ["Readiness decision", profile.readinessDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      [
        "Ready for v345 readiness cut",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut,
      ],
      ["Ready for Node v346 smoke rehearsal", profile.readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal],
      ["Requires Java v153 + mini-kv v144 echo", profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho],
      ["Performs live probe now", profile.performsLiveProbeNow],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Sends Java HTTP request now", profile.sendsJavaHttpRequestNow],
      ["Opens mini-kv TCP socket now", profile.opensMiniKvTcpSocketNow],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
    ],
    sections: [
      { heading: "Source Node v344", entries: profile.sourceNodeV344 },
      { heading: "Readiness Cut", entries: profile.readinessCut },
      { heading: "Java Read-Only Requirements", lines: renderRequirements(profile.javaReadOnlyRequirements) },
      { heading: "mini-kv Read-Only Requirements", lines: renderRequirements(profile.miniKvReadOnlyRequirements) },
      { heading: "Environment Handles", lines: renderEnvironmentHandles(profile.environmentHandles) },
      { heading: "Forbidden Operations", lines: renderForbiddenOperations(profile.forbiddenOperations) },
      { heading: "Checks", entries: profile.checks },
      {
        heading: "Summary",
        lines: [
          `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
          `- Java requirements: ${profile.summary.javaRequirementCount}`,
          `- mini-kv requirements: ${profile.summary.miniKvRequirementCount}`,
          `- Environment handles: ${profile.summary.environmentHandleCount}`,
          `- Forbidden operations: ${profile.summary.forbiddenOperationCount}`,
          `- Production blockers: ${profile.summary.productionBlockerCount}`,
          `- Warnings: ${profile.summary.warningCount}`,
          `- Recommendations: ${profile.summary.recommendationCount}`,
        ],
      },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderRequirements(requirements: readonly ReadOnlyIntegrationRequirement[]): string[] {
  return requirements.map((requirement) =>
    `- ${requirement.project} ${requirement.kind} ${requirement.methodOrCommand}: ${requirement.name}; handle=${requirement.handle}; readOnly=${requirement.readOnly}; mutatesState=${requirement.mutatesState}; existingNodeSupport=${requirement.existingNodeSupport}; boundary=${requirement.expectedBoundary}`);
}

function renderEnvironmentHandles(handles: readonly ReadOnlyIntegrationEnvironmentHandle[]): string[] {
  return handles.map((handle) =>
    `- ${handle.name}: target=${handle.target}; kind=${handle.valueKind}; presentInConfig=${handle.presentInConfig}; secretValue=${handle.secretValue}; rawCredentialValue=${handle.rawCredentialValue}`);
}

function renderForbiddenOperations(operations: readonly ForbiddenIntegrationOperation[]): string[] {
  return operations.map((operation) =>
    `- ${operation.project}: ${operation.operation}; blockedReason=${operation.blockedReason}`);
}
