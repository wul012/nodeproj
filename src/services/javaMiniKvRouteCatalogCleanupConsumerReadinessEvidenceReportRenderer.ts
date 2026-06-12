import type {
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport.js";
import {
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReportMarkdown(
  report: JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup consumer readiness evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["Profile version", report.profileVersion],
      ["Report state", report.reportState],
      ["Ready", report.readyForRouteCatalogCleanupConsumerReadinessEvidenceReport],
      ["Active Node version", report.activeNodeVersion],
      ["Source Node version", report.sourceNodeVersion],
      ["Execution allowed", report.executionAllowed],
    ],
    sections: [
      { heading: "Summary", entries: report.summary },
      { heading: "Checks", entries: report.checks },
      { heading: "Java v220 Consumer Evidence Digest", entries: report.evidence.javaV220ConsumerEvidenceDigest },
      {
        heading: "Java v220 Consumer Evidence Digest Fixture",
        entries: report.evidence.javaV220ConsumerEvidenceDigestFixture,
      },
      { heading: "Java v221-v224 Consumer Readiness Guards", lines: [
        report.evidence.javaV221ConsumerEvidenceDigestSnapshotFreeze,
        report.evidence.javaV222ConsumerEvidenceDigestHistoricalCompatibility,
        report.evidence.javaV223ConsumerEvidenceDigestIntegrity,
        report.evidence.javaV224ConsumerReadinessCompletion,
      ].flatMap((guard) => [
        `- ${guard.version}: ${guard.scope}`,
        `  - status: ${guard.status}`,
        `  - guardCount: ${guard.guardCount}`,
        `  - boundaryRuntimeClosed: ${guard.boundaryRuntimeClosed}`,
      ]) },
      { heading: "mini-kv v202-v209 Versioned Continuity", lines: report.evidence.miniKvPostCloseoutReleases.flatMap((release) => [
        `- ${release.releaseVersion}: ${release.status}`,
        `  - previousConsumedReleaseVersion: ${release.previousConsumedReleaseVersion}`,
        `  - sourceFrozenReleaseVersion: ${release.sourceFrozenReleaseVersion}`,
        `  - evidenceDigest: ${release.evidenceDigest}`,
        `  - historicalFixtureCount: ${release.historicalFixtureCount}`,
      ]) },
      { heading: "mini-kv v210 Audit Note", entries: report.evidence.miniKvLatestAuditNote },
      { heading: "Evidence Files", lines: renderVerificationEvidenceFileReferenceLines(Object.values(report.evidence.files)) },
      { heading: "Evidence Endpoints", entries: report.evidenceEndpoints },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}
