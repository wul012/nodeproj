import type {
  JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup readiness handoff evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupReadinessHandoffEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Java v225 Readiness Handoff", entries: report.evidence.javaV225ConsumerReadinessHandoff },
      {
        heading: "Java v225 Readiness Handoff Fixture",
        entries: report.evidence.javaV225ConsumerReadinessHandoffFixture,
      },
      { heading: "Java v226-v231 Readiness Guards", lines: [
        report.evidence.javaV226ConsumerReadinessHandoffSnapshotFreeze,
        report.evidence.javaV227ConsumerReadinessHandoffHistoricalCompatibility,
        report.evidence.javaV228ConsumerReadinessHandoffIntegrity,
        report.evidence.javaV229ConsumerReadinessHandoffRouteInventory,
        report.evidence.javaV230ConsumerReadinessHandoffEvidenceChain,
        report.evidence.javaV231ConsumerReadinessHandoffOpsEvidenceAlignment,
      ].flatMap((guard) => [
        `- ${guard.version}: ${guard.scope}`,
        `  - status: ${guard.status}`,
        `  - guardCount: ${guard.guardCount}`,
        `  - boundaryRuntimeClosed: ${guard.boundaryRuntimeClosed}`,
      ]) },
      { heading: "mini-kv v211-v212 Retention", lines: [
        report.evidence.miniKvV211RouteCatalogPostCloseoutRetention,
        report.evidence.miniKvV212RouteCatalogPostCloseoutRetentionAudit,
      ].flatMap((release) => [
        `- ${release.releaseVersion}: ${release.status}`,
        `  - previousConsumedReleaseVersion: ${release.previousConsumedReleaseVersion}`,
        `  - continuityStage: ${release.continuityStage}`,
        `  - historicalFixtureCount: ${release.historicalFixtureCount}`,
      ]) },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
