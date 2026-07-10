import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Smoke state", profile.smokeState],
      ["Smoke decision", profile.smokeDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Java source version", profile.javaSourceVersion],
      ["mini-kv source version", profile.miniKvSourceVersion],
      ["Ready for approved local loopback read-only smoke", profile.readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke],
      ["Ready for pass evidence archive", profile.readyForRuntimeExecutionPassEvidenceArchive],
      ["Upstream probes enabled", profile.upstreamProbesEnabled],
      ["Upstream actions enabled", profile.upstreamActionsEnabled],
      ["Starts Java service from route", profile.startsJavaServiceFromRoute],
      ["Starts mini-kv service from route", profile.startsMiniKvServiceFromRoute],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v406", entries: profile.sourceNodeV406 },
      { heading: "Targets", lines: profile.targets.flatMap((target) => renderEntries(target)) },
      { heading: "Records", lines: profile.records.flatMap((record) => renderEntries(record)) },
      { heading: "Smoke Session", entries: profile.smokeSession },
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
