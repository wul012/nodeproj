import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Gate state", profile.gateState],
      ["Gate decision", profile.gateDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Java source version", profile.javaSourceVersion],
      ["mini-kv source version", profile.miniKvSourceVersion],
      ["Ready for runtime execution live-read gate", profile.readyForRuntimeExecutionLiveReadGate],
      ["Ready for approved local loopback read-only smoke", profile.readyForApprovedLocalLoopbackReadOnlySmoke],
      ["Runtime execution packet executable", profile.runtimeExecutionPacketExecutable],
      ["Runtime gate approval present", profile.runtimeGateApprovalPresent],
      ["Execution attempted", profile.executionAttempted],
      ["Runtime smoke attempted", profile.runtimeSmokeAttempted],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v405", entries: profile.sourceNodeV405 },
      { heading: "Service Targets", lines: profile.serviceTargets.flatMap((target) => renderEntries(target)) },
      { heading: "Live Read Gate", entries: profile.liveReadGate },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
