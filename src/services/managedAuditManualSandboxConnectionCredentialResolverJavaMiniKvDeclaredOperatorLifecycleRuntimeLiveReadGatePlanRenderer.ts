import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Plan state", profile.planState],
      ["Plan decision", profile.planDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for Node v391 archive verification", profile.readyForNodeV391ArchiveVerification],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
      ["Runtime gate plan only", profile.runtimeGatePlanOnly],
      ["Operator approval record required", profile.operatorApprovalRecordRequired],
      ["Concrete loopback ports required", profile.concreteLoopbackPortsRequired],
      ["GET-only smoke command required", profile.getOnlySmokeCommandRequired],
      ["Cleanup proof required", profile.cleanupProofRequired],
      ["Runtime gate approval present", profile.runtimeGateApprovalPresent],
      ["Concrete loopback ports assigned", profile.concreteLoopbackPortsAssigned],
      ["Live read gate allowed", profile.liveReadGateAllowed],
      ["Runtime probe allowed", profile.runtimeProbeAllowed],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
      ["Active shard prototype enabled", profile.activeShardPrototypeEnabled],
    ],
    sections: [
      { heading: "Source Node v389", entries: profile.sourceNodeV389 },
      { heading: "Source Node v389 Replay", entries: profile.sourceNodeV389Replay },
      { heading: "Source Node v388 Replay", entries: profile.sourceNodeV388Replay },
      { heading: "Runtime Live Read Gate Plan", entries: profile.runtimeGatePlan },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
