import type { FastifyInstance } from "fastify";

import {
  loadProductionLiveProbeEvidenceArchive,
  renderProductionLiveProbeEvidenceArchiveMarkdown,
} from "../services/productionLiveProbeEvidenceArchive.js";
import {
  loadProductionLiveProbeEvidenceArchiveBundle,
  renderProductionLiveProbeEvidenceArchiveBundleMarkdown,
} from "../services/productionLiveProbeEvidenceArchiveBundle.js";
import {
  loadProductionLiveProbeEvidenceArchiveVerification,
  renderProductionLiveProbeEvidenceArchiveVerificationMarkdown,
} from "../services/productionLiveProbeEvidenceArchiveVerification.js";
import {
  loadProductionLiveProbeHandoffChecklist,
  renderProductionLiveProbeHandoffChecklistMarkdown,
} from "../services/productionLiveProbeHandoffChecklist.js";
import {
  createProductionLiveProbeReadinessContract,
  renderProductionLiveProbeReadinessContractMarkdown,
} from "../services/productionLiveProbeReadinessContract.js";
import {
  loadProductionLiveProbeRealReadSmokeArchiveAdapter,
  renderProductionLiveProbeRealReadSmokeArchiveAdapterMarkdown,
} from "../services/productionLiveProbeRealReadSmokeArchiveAdapter.js";
import {
  loadProductionLiveProbeRealReadSmokeDryRunCommandPackage,
  renderProductionLiveProbeRealReadSmokeDryRunCommandPackageMarkdown,
} from "../services/productionLiveProbeRealReadSmokeDryRunCommandPackage.js";
import {
  loadProductionLiveProbeRealReadSmokeEvidenceCapture,
  renderProductionLiveProbeRealReadSmokeEvidenceCaptureMarkdown,
} from "../services/productionLiveProbeRealReadSmokeEvidenceCapture.js";
import {
  loadProductionLiveProbeRealReadSmokeExecutionRequest,
  renderProductionLiveProbeRealReadSmokeExecutionRequestMarkdown,
} from "../services/productionLiveProbeRealReadSmokeExecutionRequest.js";
import {
  loadProductionLiveProbeRealReadSmokeOperatorRunbook,
  renderProductionLiveProbeRealReadSmokeOperatorRunbookMarkdown,
} from "../services/productionLiveProbeRealReadSmokeOperatorRunbook.js";
import {
  loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification,
  renderProductionLiveProbeRealReadSmokeOperatorRunbookVerificationMarkdown,
} from "../services/productionLiveProbeRealReadSmokeOperatorRunbookVerification.js";
import {
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive,
  renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveMarkdown,
} from "../services/productionLiveProbeRealReadSmokeProductionPassEvidenceArchive.js";
import {
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification,
  renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationMarkdown,
} from "../services/productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.js";
import {
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification,
  renderProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMarkdown,
} from "../services/productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.js";
import {
  loadProductionLiveProbeRealReadSmokeReadinessSwitch,
  renderProductionLiveProbeRealReadSmokeReadinessSwitchMarkdown,
} from "../services/productionLiveProbeRealReadSmokeReadinessSwitch.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive,
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown,
} from "../services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification,
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown,
} from "../services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview,
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown,
} from "../services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture,
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown,
} from "../services/productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket,
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown,
} from "../services/productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.js";
import {
  loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate,
  renderProductionLiveProbeRealReadSmokeReleaseEvidenceGateMarkdown,
} from "../services/productionLiveProbeRealReadSmokeReleaseEvidenceGate.js";
import {
  loadProductionLiveProbeRealReadSmokeResultImporter,
  renderProductionLiveProbeRealReadSmokeResultImporterMarkdown,
} from "../services/productionLiveProbeRealReadSmokeResultImporter.js";
import {
  loadProductionLiveProbeSmokeHarness,
  renderProductionLiveProbeSmokeHarnessMarkdown,
} from "../services/productionLiveProbeSmokeHarness.js";
import {
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";
import type { StatusRouteDeps } from "./statusRouteTypes.js";

export function registerStatusLiveProbeRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-readiness-contract",
      () => createProductionLiveProbeReadinessContract(deps.config),
      renderProductionLiveProbeReadinessContractMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-smoke-harness",
      () => loadProductionLiveProbeSmokeHarness(createSmokeDeps(deps)),
      renderProductionLiveProbeSmokeHarnessMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-evidence-archive",
      () => loadProductionLiveProbeEvidenceArchive(createRuntimeDeps(deps)),
      renderProductionLiveProbeEvidenceArchiveMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-evidence-archive/verification",
      () => loadProductionLiveProbeEvidenceArchiveVerification(createRuntimeDeps(deps)),
      renderProductionLiveProbeEvidenceArchiveVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-evidence-archive/bundle",
      () => loadProductionLiveProbeEvidenceArchiveBundle(createRuntimeDeps(deps)),
      renderProductionLiveProbeEvidenceArchiveBundleMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-handoff-checklist",
      () => loadProductionLiveProbeHandoffChecklist(createRuntimeDeps(deps)),
      renderProductionLiveProbeHandoffChecklistMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-readiness-switch",
      () => loadProductionLiveProbeRealReadSmokeReadinessSwitch(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeReadinessSwitchMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-archive-adapter",
      () => loadProductionLiveProbeRealReadSmokeArchiveAdapter(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeArchiveAdapterMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-execution-request",
      () => loadProductionLiveProbeRealReadSmokeExecutionRequest(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeExecutionRequestMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-result-importer",
      () => loadProductionLiveProbeRealReadSmokeResultImporter(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeResultImporterMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
      () => loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeReleaseEvidenceGateMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-dry-run-command-package",
      () => loadProductionLiveProbeRealReadSmokeDryRunCommandPackage(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeDryRunCommandPackageMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-evidence-capture",
      () => loadProductionLiveProbeRealReadSmokeEvidenceCapture(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeEvidenceCaptureMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification",
      () => loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive",
      () => loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification",
      () => loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-operator-runbook",
      () => loadProductionLiveProbeRealReadSmokeOperatorRunbook(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeOperatorRunbookMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification",
      () => loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeOperatorRunbookVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet",
      () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture",
      () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive",
      () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification",
      () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review",
      () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview(createRuntimeDeps(deps)),
      renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown,
    ),
  ]);
}

function createSmokeDeps(deps: StatusRouteDeps) {
  return {
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  };
}

function createRuntimeDeps(deps: StatusRouteDeps) {
  return {
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  };
}
