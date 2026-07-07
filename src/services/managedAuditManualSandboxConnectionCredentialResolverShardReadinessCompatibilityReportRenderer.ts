import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile,
  ShardReadinessCompatibilityFieldCheck,
  ShardReadinessCompatibilityProjectReport,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver shard readiness compatibility report",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Compatibility state", profile.compatibilityState],
      ["Compatibility decision", profile.compatibilityDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source static Node version", profile.sourceStaticNodeVersion],
      ["Source archive Node version", profile.sourceArchiveNodeVersion],
      ["Ready for Node v374 minimal shard readiness regular gate", profile.readyForNodeV374MinimalShardReadinessRegularGate],
      ["Compatibility report only", profile.compatibilityReportOnly],
      ["Reruns live read", profile.rerunsLiveRead],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Mutates Java state", profile.mutatesJavaState],
      ["Mutates mini-kv state", profile.mutatesMiniKvState],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v370", entries: profile.sourceNodeV370 },
      { heading: "Source Node v372", entries: profile.sourceNodeV372 },
      { heading: "Project Reports", lines: profile.projectReports.flatMap(renderProjectReport) },
      { heading: "Field Checks", lines: profile.fieldChecks.map(renderFieldCheck) },
      { heading: "Compatibility Report", entries: profile.compatibilityReport },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderProjectReport(report: ShardReadinessCompatibilityProjectReport): string[] {
  return [
    `- ${report.project}:`,
    `  - staticSourceVersion: ${report.staticSourceVersion}`,
    `  - liveSourceVersion: ${report.liveSourceVersion}`,
    `  - staticReady: ${report.staticReady}`,
    `  - liveReady: ${report.liveReady}`,
    `  - readOnlySafe: ${report.readOnlySafe}`,
    `  - executionBlocked: ${report.executionBlocked}`,
    `  - activeShardingEnabled: ${report.activeShardingEnabled}`,
    `  - fieldCount: ${report.fieldCount}`,
    `  - matchedFieldCount: ${report.matchedFieldCount}`,
    `  - mismatchedFields: ${report.mismatchedFields.length === 0 ? "none" : report.mismatchedFields.join(", ")}`,
    `  - compatibleForRegularGate: ${report.compatibleForRegularGate}`,
  ];
}

function renderFieldCheck(check: ShardReadinessCompatibilityFieldCheck): string {
  return `- ${check.project}.${check.field}: static=${String(check.staticValue)}; live=${String(check.liveValue)}; matches=${check.matches}`;
}
