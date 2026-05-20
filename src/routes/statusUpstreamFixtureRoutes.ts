import type { FastifyInstance } from "fastify";

import type { StatusRouteDeps } from "./statusRouteTypes.js";
import {
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";
import {
  loadUpstreamContractFixtureReport,
  renderUpstreamContractFixtureReportMarkdown,
} from "../services/upstreamContractFixtures.js";
import {
  loadUpstreamContractFixtureDriftDiagnostics,
  renderUpstreamContractFixtureDriftDiagnosticsMarkdown,
} from "../services/upstreamContractFixtureDrift.js";
import {
  loadUpstreamContractFixtureArchiveSnapshot,
  renderUpstreamContractFixtureArchiveSnapshotMarkdown,
} from "../services/upstreamContractFixtureArchive.js";
import {
  loadUpstreamContractFixtureScenarioMatrix,
  renderUpstreamContractFixtureScenarioMatrixMarkdown,
} from "../services/upstreamContractFixtureScenarioMatrix.js";
import {
  loadUpstreamContractFixtureScenarioMatrixVerification,
  renderUpstreamContractFixtureScenarioMatrixVerificationMarkdown,
} from "../services/upstreamContractFixtureScenarioMatrixVerification.js";
import {
  loadUpstreamContractFixtureScenarioVerificationArchiveBundle,
  renderUpstreamContractFixtureScenarioVerificationArchiveBundleMarkdown,
} from "../services/upstreamContractFixtureScenarioVerificationArchiveBundle.js";
import {
  loadUpstreamContractFixtureScenarioVerificationArchiveBundleVerification,
  renderUpstreamContractFixtureScenarioVerificationArchiveBundleVerificationMarkdown,
} from "../services/upstreamContractFixtureScenarioVerificationArchiveBundleVerification.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceIndex,
  renderUpstreamContractFixtureScenarioReleaseEvidenceIndexMarkdown,
} from "../services/upstreamContractFixtureScenarioReleaseEvidenceIndex.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
  renderUpstreamContractFixtureScenarioReleaseEvidenceReadinessGateMarkdown,
} from "../services/upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.js";
import {
  loadUpstreamProductionEvidenceIntake,
  renderUpstreamProductionEvidenceIntakeMarkdown,
} from "../services/upstreamProductionEvidenceIntake.js";

export function registerStatusUpstreamFixtureRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/upstreams/production-evidence-intake",
      () => loadUpstreamProductionEvidenceIntake(deps.config),
      renderUpstreamProductionEvidenceIntakeMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures",
      () => loadUpstreamContractFixtureReport(deps.config),
      renderUpstreamContractFixtureReportMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/drift-diagnostics",
      () => loadUpstreamContractFixtureDriftDiagnostics(deps.config),
      renderUpstreamContractFixtureDriftDiagnosticsMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/archive-snapshot",
      () => loadUpstreamContractFixtureArchiveSnapshot(deps.config),
      renderUpstreamContractFixtureArchiveSnapshotMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/scenario-matrix",
      () => loadUpstreamContractFixtureScenarioMatrix(deps.config),
      renderUpstreamContractFixtureScenarioMatrixMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/scenario-matrix/verification",
      () => loadUpstreamContractFixtureScenarioMatrixVerification(deps.config),
      renderUpstreamContractFixtureScenarioMatrixVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle",
      () => loadUpstreamContractFixtureScenarioVerificationArchiveBundle(deps.config),
      renderUpstreamContractFixtureScenarioVerificationArchiveBundleMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification",
      () => loadUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(deps.config),
      renderUpstreamContractFixtureScenarioVerificationArchiveBundleVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index",
      () => loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(deps.config),
      renderUpstreamContractFixtureScenarioReleaseEvidenceIndexMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
      () => loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(deps.config),
      renderUpstreamContractFixtureScenarioReleaseEvidenceReadinessGateMarkdown,
    ),
  ]);
}
