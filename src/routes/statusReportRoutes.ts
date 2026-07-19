import type { FastifyInstance, FastifyRequest } from "fastify";

import {
  loadApprovalDecisionPrerequisiteGate,
  renderApprovalDecisionPrerequisiteGateMarkdown,
} from "../services/approvalDecisionPrerequisiteGate.js";
import {
  loadApprovalLedgerDryRunEnvelope,
  renderApprovalLedgerDryRunEnvelopeMarkdown,
} from "../services/approvalLedgerDryRunEnvelope.js";
import {
  loadControlledIdempotencyDrillRunbook,
  renderControlledIdempotencyDrillRunbookMarkdown,
} from "../services/controlledIdempotencyDrillRunbook.js";

import {
  loadCrossProjectCiArtifactRetentionGate,
  renderCrossProjectCiArtifactRetentionGateMarkdown,
} from "../services/crossProjectCiArtifactRetentionGate.js";
import {
  loadCrossProjectEvidenceRetentionGate,
  renderCrossProjectEvidenceRetentionGateMarkdown,
} from "../services/crossProjectEvidenceRetentionGate.js";
import {
  loadCrossProjectReleaseBundleGate,
  renderCrossProjectReleaseBundleGateMarkdown,
} from "../services/crossProjectReleaseBundleGate.js";
import {
  loadCrossProjectReleaseVerificationIntakeGate,
  renderCrossProjectReleaseVerificationIntakeGateMarkdown,
} from "../services/crossProjectReleaseVerificationIntakeGate.js";
import {
  loadDeploymentEvidenceIntakeGate,
  renderDeploymentEvidenceIntakeGateMarkdown,
} from "../services/deploymentEvidenceIntakeGate.js";
import {
  loadDeploymentEvidenceVerification,
  renderDeploymentEvidenceVerificationMarkdown,
} from "../services/deploymentEvidenceVerification.js";
import {
  loadIdempotencyVerticalReadinessReview,
  renderIdempotencyVerticalReadinessReviewMarkdown,
} from "../services/idempotencyVerticalReadinessReview.js";
import {
  loadPostRealReadProductionHardeningTriage,
  renderPostRealReadProductionHardeningTriageMarkdown,
} from "../services/postRealReadProductionHardeningTriage.js";
import {
  loadPostV166ReadinessSummary,
  renderPostV166ReadinessSummaryMarkdown,
} from "../services/postV166ReadinessSummary.js";
import {
  loadProductionEnvironmentPreflightChecklist,
  renderProductionEnvironmentPreflightChecklistMarkdown,
} from "../services/productionEnvironmentPreflightChecklist.js";
import {
  loadProductionReleaseDryRunEnvelope,
  renderProductionReleaseDryRunEnvelopeMarkdown,
} from "../services/productionReleaseDryRunEnvelope.js";
import {
  loadProductionReleasePreApprovalPacket,
  renderProductionReleasePreApprovalPacketMarkdown,
} from "../services/productionReleasePreApprovalPacket.js";
import {
  loadRealReadAdapterEvidenceArchive,
  renderRealReadAdapterEvidenceArchiveMarkdown,
} from "../services/realReadAdapterEvidenceArchive.js";
import {
  loadRealReadAdapterEvidenceArchiveVerification,
  renderRealReadAdapterEvidenceArchiveVerificationMarkdown,
} from "../services/realReadAdapterEvidenceArchiveVerification.js";
import {
  loadRealReadAdapterFailureTaxonomy,
  renderRealReadAdapterFailureTaxonomyMarkdown,
} from "../services/realReadAdapterFailureTaxonomy.js";
import {
  loadRealReadAdapterImportedWindowResultPacket,
  renderRealReadAdapterImportedWindowResultPacketMarkdown,
} from "../services/realReadAdapterImportedWindowResultPacket.js";
import {
  loadRealReadAdapterOperatorWindowRunbook,
  renderRealReadAdapterOperatorWindowRunbookMarkdown,
} from "../services/realReadAdapterOperatorWindowRunbook.js";
import {
  loadRealReadAdapterProductionReadinessCheckpoint,
  renderRealReadAdapterProductionReadinessCheckpointMarkdown,
} from "../services/realReadAdapterProductionReadinessCheckpoint.js";
import {
  loadRealReadAdapterRehearsal,
  renderRealReadAdapterRehearsalMarkdown,
} from "../services/realReadAdapterRehearsal.js";
import {
  loadRealReadRehearsalIntake,
  renderRealReadRehearsalIntakeMarkdown,
} from "../services/realReadRehearsalIntake.js";
import {
  loadRealReadWindowAuditStoreHandoffContract,
  renderRealReadWindowAuditStoreHandoffContractMarkdown,
} from "../services/realReadWindowAuditStoreHandoffContract.js";
import {
  loadRealReadWindowCiArchiveArtifactManifest,
  renderRealReadWindowCiArchiveArtifactManifestMarkdown,
} from "../services/realReadWindowCiArchiveArtifactManifest.js";
import {
  loadRealReadWindowCiArtifactManifestVerification,
  renderRealReadWindowCiArtifactManifestVerificationMarkdown,
} from "../services/realReadWindowCiArtifactManifestVerification.js";
import {
  loadRealReadWindowCiArtifactUploadDryRunContract,
  renderRealReadWindowCiArtifactUploadDryRunContractMarkdown,
} from "../services/realReadWindowCiArtifactUploadDryRunContract.js";
import {
  loadRealReadWindowOperatorIdentityBinding,
  renderRealReadWindowOperatorIdentityBindingMarkdown,
} from "../services/realReadWindowOperatorIdentityBinding.js";
import {
  loadReleaseApprovalDecisionRehearsalPacket,
  renderReleaseApprovalDecisionRehearsalPacketMarkdown,
} from "../services/releaseApprovalDecisionRehearsalPacket.js";
import {
  loadReleaseHandoffReadinessReview,
  renderReleaseHandoffReadinessReviewMarkdown,
} from "../services/releaseHandoffReadinessReview.js";
import {
  loadReleaseWindowReadinessPacket,
  renderReleaseWindowReadinessPacketMarkdown,
} from "../services/releaseWindowReadinessPacket.js";
import {
  loadThreeProjectRealReadRuntimeSmokeArchiveVerification,
  renderThreeProjectRealReadRuntimeSmokeArchiveVerificationMarkdown,
} from "../services/threeProjectRealReadRuntimeSmokeArchiveVerification.js";
import {
  loadThreeProjectRealReadRuntimeSmokeExecutionPacket,
  renderThreeProjectRealReadRuntimeSmokeExecutionPacketMarkdown,
} from "../services/threeProjectRealReadRuntimeSmokeExecutionPacket.js";
import {
  loadThreeProjectRealReadRuntimeSmokePreflight,
  renderThreeProjectRealReadRuntimeSmokePreflightMarkdown,
} from "../services/threeProjectRealReadRuntimeSmokePreflight.js";
import {
  registerHeaderJsonMarkdownRoute,
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";
import type { StatusRouteDeps } from "./statusRouteTypes.js";

export function registerStatusRealReadRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-adapter-rehearsal",
      () => loadRealReadAdapterRehearsal(createAdapterDeps(deps)),
      renderRealReadAdapterRehearsalMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-adapter-operator-window-runbook",
      () => loadRealReadAdapterOperatorWindowRunbook(deps.config),
      renderRealReadAdapterOperatorWindowRunbookMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-adapter-failure-taxonomy",
      () => loadRealReadAdapterFailureTaxonomy(createAdapterDeps(deps)),
      renderRealReadAdapterFailureTaxonomyMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-adapter-evidence-archive",
      () => loadRealReadAdapterEvidenceArchive(createAdapterDeps(deps)),
      renderRealReadAdapterEvidenceArchiveMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-adapter-evidence-archive-verification",
      () => loadRealReadAdapterEvidenceArchiveVerification(createAdapterDeps(deps)),
      renderRealReadAdapterEvidenceArchiveVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-adapter-imported-window-result-packet",
      () => loadRealReadAdapterImportedWindowResultPacket(createAdapterDeps(deps)),
      renderRealReadAdapterImportedWindowResultPacketMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
      () => loadRealReadAdapterProductionReadinessCheckpoint(createAdapterDeps(deps)),
      renderRealReadAdapterProductionReadinessCheckpointMarkdown,
    ),
  ]);

  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/real-read-window-operator-identity-binding",
    (headers) => loadRealReadWindowOperatorIdentityBinding(createWindowDeps(deps, headers)),
    renderRealReadWindowOperatorIdentityBindingMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/real-read-window-audit-store-handoff-contract",
    (headers) => loadRealReadWindowAuditStoreHandoffContract(createWindowDeps(deps, headers)),
    renderRealReadWindowAuditStoreHandoffContractMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/real-read-window-ci-archive-artifact-manifest",
    (headers) => loadRealReadWindowCiArchiveArtifactManifest(createWindowDeps(deps, headers)),
    renderRealReadWindowCiArchiveArtifactManifestMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/real-read-window-ci-artifact-manifest-verification",
    (headers) => loadRealReadWindowCiArtifactManifestVerification(createWindowDeps(deps, headers)),
    renderRealReadWindowCiArtifactManifestVerificationMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract",
    (headers) => loadRealReadWindowCiArtifactUploadDryRunContract(createWindowDeps(deps, headers)),
    renderRealReadWindowCiArtifactUploadDryRunContractMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/cross-project-ci-artifact-retention-gate",
    (headers) => loadCrossProjectCiArtifactRetentionGate(createWindowDeps(deps, headers)),
    renderCrossProjectCiArtifactRetentionGateMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/three-project-real-read-runtime-smoke-preflight",
    (headers) => loadThreeProjectRealReadRuntimeSmokePreflight(createWindowDeps(deps, headers)),
    renderThreeProjectRealReadRuntimeSmokePreflightMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet",
    (headers) => loadThreeProjectRealReadRuntimeSmokeExecutionPacket(createWindowDeps(deps, headers)),
    renderThreeProjectRealReadRuntimeSmokeExecutionPacketMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification",
    (headers) => loadThreeProjectRealReadRuntimeSmokeArchiveVerification(createWindowDeps(deps, headers)),
    renderThreeProjectRealReadRuntimeSmokeArchiveVerificationMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/post-real-read-production-hardening-triage",
    (headers) => loadPostRealReadProductionHardeningTriage(createWindowDeps(deps, headers)),
    renderPostRealReadProductionHardeningTriageMarkdown,
  );
}

export function registerStatusReleaseGateRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/production/idempotency-vertical-readiness-review",
      () => loadIdempotencyVerticalReadinessReview(deps.config),
      renderIdempotencyVerticalReadinessReviewMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/controlled-idempotency-drill-runbook",
      () => loadControlledIdempotencyDrillRunbook(deps.config),
      renderControlledIdempotencyDrillRunbookMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/cross-project-release-verification-intake-gate",
      () => loadCrossProjectReleaseVerificationIntakeGate(deps.config),
      renderCrossProjectReleaseVerificationIntakeGateMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/cross-project-release-bundle-gate",
      () => loadCrossProjectReleaseBundleGate(deps.config),
      renderCrossProjectReleaseBundleGateMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/environment-preflight-checklist",
      () => loadProductionEnvironmentPreflightChecklist(deps.config),
      renderProductionEnvironmentPreflightChecklistMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/post-v166-readiness-summary",
      () => loadPostV166ReadinessSummary(deps.config),
      renderPostV166ReadinessSummaryMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/deployment-evidence-intake-gate",
      () => loadDeploymentEvidenceIntakeGate(deps.config),
      renderDeploymentEvidenceIntakeGateMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/deployment-evidence-verification",
      () => loadDeploymentEvidenceVerification(deps.config),
      renderDeploymentEvidenceVerificationMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/release-window-readiness-packet",
      () => loadReleaseWindowReadinessPacket(deps.config),
      renderReleaseWindowReadinessPacketMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/release-dry-run-envelope",
      () => loadProductionReleaseDryRunEnvelope(deps.config),
      renderProductionReleaseDryRunEnvelopeMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/release-handoff-readiness-review",
      () => loadReleaseHandoffReadinessReview(deps.config),
      renderReleaseHandoffReadinessReviewMarkdown,
    ),
  ]);

  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/cross-project-evidence-retention-gate",
    (headers) => loadCrossProjectEvidenceRetentionGate(deps.config, headers),
    renderCrossProjectEvidenceRetentionGateMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/release-pre-approval-packet",
    (headers) => loadProductionReleasePreApprovalPacket(deps.config, headers),
    renderProductionReleasePreApprovalPacketMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/approval-decision-prerequisite-gate",
    (headers) => loadApprovalDecisionPrerequisiteGate(deps.config, headers),
    renderApprovalDecisionPrerequisiteGateMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/approval-ledger-dry-run-envelope",
    (headers) => loadApprovalLedgerDryRunEnvelope(deps.config, headers),
    renderApprovalLedgerDryRunEnvelopeMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/production/release-approval-decision-rehearsal-packet",
    (headers) => loadReleaseApprovalDecisionRehearsalPacket(deps.config, headers),
    renderReleaseApprovalDecisionRehearsalPacketMarkdown,
  );

  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/production/real-read-rehearsal-intake",
      () => loadRealReadRehearsalIntake(deps.config),
      renderRealReadRehearsalIntakeMarkdown,
    ),
  ]);
}

function createAdapterDeps(deps: StatusRouteDeps) {
  return {
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  };
}

function createWindowDeps(
  deps: StatusRouteDeps,
  headers: FastifyRequest["headers"],
) {
  return {
    ...createAdapterDeps(deps),
    headers,
  };
}
