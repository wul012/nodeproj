import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
  createNextActions,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.js";
import {
  assessObservation,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
  createPreviewDigest,
  createSourceMatrix,
  createSummary,
  failedObservation,
  JAVA_ENDPOINT,
  MINI_KV_COMMAND,
  PROFILE_VERSION,
  skippedObservation,
  sumNullable,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.js";
import {
  createSourceMatrixArchiveSnapshot,
  createSourceMatrixArchiveSnapshotSummaryExport,
  createSourceMatrixHandoffSummary,
  createSourceMatrixHandoffSummaryConsumer,
  createSourceMatrixHandoffSummaryConsumerExport,
  createSourceMatrixHandoffSummaryConsumerReceipt,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
  createSourceMatrixHandoffRouteCoverage,
  createSourceMatrixHandoffRouteCoverageArchiveSnapshot,
  createSourceMatrixHandoffRouteCoverageArchiveSummary,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification,
  createSourceMatrixHandoffRouteCoverageArchiveVerification,
  createSourceMatrixHandoffRouteCoverageVerification,
  createSourceMatrixHandoffNotes,
  createControlledReadOnlyShardPreviewExecutionGapMatrix,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
  createSourceMatrixConsumptionPlan,
  createSourceMatrixConsumer,
  createSourceMatrixDriftSummary,
  createSourceMatrixReviewChecklist,
  createSourceMatrixReviewDigest,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.js";
import type {
  ControlledReadOnlyShardPreviewObservation,
  ControlledReadOnlyShardPreviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.js";
export type {
  ControlledReadOnlyShardPreviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export async function loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ControlledReadOnlyShardPreviewProfile> {
  const [java, miniKv] = await Promise.all([
    readJavaPreview(input.config, input.orderPlatform),
    readMiniKvPreview(input.config, input.miniKv),
  ]);
  const previewDigest = createPreviewDigest(java, miniKv);
  const sourceMatrix = createSourceMatrix(java, miniKv);
  const sourceMatrixConsumer = createSourceMatrixConsumer(sourceMatrix);
  const sourceMatrixDriftSummary = createSourceMatrixDriftSummary(sourceMatrix, sourceMatrixConsumer);
  const sourceMatrixConsumptionPlan = createSourceMatrixConsumptionPlan(sourceMatrixConsumer, sourceMatrixDriftSummary);
  const sourceMatrixReviewChecklist = createSourceMatrixReviewChecklist(sourceMatrixDriftSummary);
  const sourceMatrixReviewDigest = createSourceMatrixReviewDigest(sourceMatrixReviewChecklist);
  const sourceMatrixArchiveSnapshot = createSourceMatrixArchiveSnapshot(sourceMatrixReviewDigest);
  const sourceMatrixArchiveSnapshotSummaryExport =
    createSourceMatrixArchiveSnapshotSummaryExport(sourceMatrixArchiveSnapshot);
  const sourceMatrixHandoffNotes = createSourceMatrixHandoffNotes(sourceMatrixArchiveSnapshotSummaryExport);
  const sourceMatrixHandoffSummary = createSourceMatrixHandoffSummary(sourceMatrixHandoffNotes);
  const sourceMatrixHandoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(sourceMatrixHandoffSummary);
  const sourceMatrixHandoffSummaryConsumerExport =
    createSourceMatrixHandoffSummaryConsumerExport(sourceMatrixHandoffSummaryConsumer);
  const sourceMatrixHandoffSummaryConsumerReceipt =
    createSourceMatrixHandoffSummaryConsumerReceipt(sourceMatrixHandoffSummaryConsumerExport);
  const sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot =
    createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(sourceMatrixHandoffSummaryConsumerReceipt);
  const sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification =
    createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(
      sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
    );
  const sourceMatrixHandoffRouteCoverage =
    createSourceMatrixHandoffRouteCoverage(sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification);
  const sourceMatrixHandoffRouteCoverageVerification =
    createSourceMatrixHandoffRouteCoverageVerification(sourceMatrixHandoffRouteCoverage);
  const sourceMatrixHandoffRouteCoverageArchiveSnapshot =
    createSourceMatrixHandoffRouteCoverageArchiveSnapshot(sourceMatrixHandoffRouteCoverageVerification);
  const sourceMatrixHandoffRouteCoverageArchiveVerification =
    createSourceMatrixHandoffRouteCoverageArchiveVerification(sourceMatrixHandoffRouteCoverageArchiveSnapshot);
  const sourceMatrixHandoffRouteCoverageArchiveSummary =
    createSourceMatrixHandoffRouteCoverageArchiveSummary(sourceMatrixHandoffRouteCoverageArchiveVerification);
  const sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt =
    createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(sourceMatrixHandoffRouteCoverageArchiveSummary);
  const sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot =
    createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot(
      sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
    );
  const sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification =
    createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification(
      sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
    );
  const checks = createChecks(input.config, java, miniKv, previewDigest, sourceMatrixConsumptionPlan);
  checks.readyForControlledReadOnlyShardPreview = Object.entries(checks)
    .filter(([key]) => key !== "readyForControlledReadOnlyShardPreview")
    .every(([, value]) => value);
  const ready = checks.readyForControlledReadOnlyShardPreview;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(java, miniKv);
  const recommendations = collectRecommendations(ready, sourceMatrixConsumptionPlan);
  const previewState = ready ? "controlled-read-only-shard-preview-ready" : "blocked";
  const executionGapMatrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
    previewState,
    readyForControlledReadOnlyShardPreview: ready,
    executionAllowed: false,
    writeRoutingAllowed: false,
    loadRestoreCompactAllowed: false,
    sourceMatrix,
  });
  const liveReadOnlyPacketCandidate =
    createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(executionGapMatrix);
  const liveReadOnlyPacketCandidateVerification =
    createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(liveReadOnlyPacketCandidate);
  const liveReadOnlyWindowStageLedger =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(liveReadOnlyPacketCandidateVerification);
  const liveReadOnlyWindowRunbookPackage =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(liveReadOnlyWindowStageLedger);
  const liveReadOnlyWindowRehearsalPacket =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(liveReadOnlyWindowRunbookPackage);
  const liveReadOnlyWindowCommandWorksheet =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(liveReadOnlyWindowRehearsalPacket);
  const liveReadOnlyWindowEvidencePacket =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket(liveReadOnlyWindowCommandWorksheet);
  const liveReadOnlyWindowEvidenceIntakeLedger =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger(liveReadOnlyWindowEvidencePacket);
  const liveReadOnlyWindowEvidenceIntakeReviewPackage =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage(
      liveReadOnlyWindowEvidenceIntakeLedger,
    );
  const liveReadOnlyWindowManualEvidenceEntryWorksheet =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet(
      liveReadOnlyWindowEvidenceIntakeReviewPackage,
    );
  const liveReadOnlyWindowOperatorEvidenceImportPreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight(
      liveReadOnlyWindowManualEvidenceEntryWorksheet,
    );
  const liveReadOnlyWindowOperatorEvidenceValueDraft =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft(
      liveReadOnlyWindowOperatorEvidenceImportPreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake(
      liveReadOnlyWindowOperatorEvidenceValueDraft,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope(
      liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft(
      liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview(
      liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate(
      liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
    );
  const liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake(
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
    );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver controlled read-only shard preview",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    previewState,
    previewDecision: ready ? "preview-java-and-mini-kv-shard-readiness" : "blocked",
    readyForControlledReadOnlyShardPreview: ready,
    activeNodeVersion: "Node v638",
    sourceNodeVersion: "Node v637",
    consumesNodeV580MaturityRunCloseout: true,
    previewOnly: true,
    liveReadOnly: true,
    executionAllowed: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    activeShardRouterAllowed: false,
    writeRoutingAllowed: false,
    loadRestoreCompactAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    reads: { java, miniKv },
    preview: {
      java: java.preview,
      miniKv: miniKv.preview,
      combinedSlotCount: sumNullable(java.preview.slotCount, miniKv.preview.slotCount),
      combinedShardCount: sumNullable(java.preview.shardCount, miniKv.preview.shardCount),
      bothReadOnly: java.readOnlySafe && miniKv.readOnlySafe,
      bothExecutionBlocked: java.executionBlocked && miniKv.executionBlocked,
      sourceMatrix,
      sourceMatrixConsumer,
      sourceMatrixDriftSummary,
      sourceMatrixConsumptionPlan,
      sourceMatrixReviewChecklist,
      sourceMatrixReviewDigest,
      sourceMatrixArchiveSnapshot,
      sourceMatrixArchiveSnapshotSummaryExport,
      sourceMatrixHandoffNotes,
      sourceMatrixHandoffSummary,
      sourceMatrixHandoffSummaryConsumer,
      sourceMatrixHandoffSummaryConsumerExport,
      sourceMatrixHandoffSummaryConsumerReceipt,
      sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
      sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
      sourceMatrixHandoffRouteCoverage,
      sourceMatrixHandoffRouteCoverageVerification,
      sourceMatrixHandoffRouteCoverageArchiveSnapshot,
      sourceMatrixHandoffRouteCoverageArchiveVerification,
      sourceMatrixHandoffRouteCoverageArchiveSummary,
      sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
      sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
      sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification,
      executionGapMatrix,
      liveReadOnlyPacketCandidate,
      liveReadOnlyPacketCandidateVerification,
      liveReadOnlyWindowStageLedger,
      liveReadOnlyWindowRunbookPackage,
      liveReadOnlyWindowRehearsalPacket,
      liveReadOnlyWindowCommandWorksheet,
      liveReadOnlyWindowEvidencePacket,
      liveReadOnlyWindowEvidenceIntakeLedger,
      liveReadOnlyWindowEvidenceIntakeReviewPackage,
      liveReadOnlyWindowManualEvidenceEntryWorksheet,
      liveReadOnlyWindowOperatorEvidenceImportPreflight,
      liveReadOnlyWindowOperatorEvidenceValueDraft,
      liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
      liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
      liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
      liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
      liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
      previewDigest,
    },
    checks,
    summary: createSummary([java, miniKv], checks, productionBlockers, warnings, recommendations),
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      controlledReadOnlyShardPreviewJson: CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
      controlledReadOnlyShardPreviewMarkdown: `${CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE}?format=markdown`,
      javaShardReadinessEndpoint: JAVA_ENDPOINT,
      miniKvShardJsonCommand: MINI_KV_COMMAND,
      sourceNodeV580ArchiveIndex: "e/README.md",
      nextNodeVersion: "Node v639",
    },
    nextActions: createNextActions(ready, sourceMatrixConsumptionPlan),
  };
}

async function readJavaPreview(
  config: AppConfig,
  orderPlatform: OrderPlatformClient,
): Promise<ControlledReadOnlyShardPreviewObservation> {
  if (!config.upstreamProbesEnabled) {
    return skippedObservation("advanced-order-platform", "http-json", JAVA_ENDPOINT, null);
  }

  try {
    const response = await orderPlatform.shardReadiness();
    return assessObservation("advanced-order-platform", "http-json", JAVA_ENDPOINT, null, response.statusCode,
      response.latencyMs, response.data);
  } catch (error) {
    return failedObservation("advanced-order-platform", "http-json", JAVA_ENDPOINT, null, error);
  }
}

async function readMiniKvPreview(
  config: AppConfig,
  miniKv: MiniKvClient,
): Promise<ControlledReadOnlyShardPreviewObservation> {
  if (!config.upstreamProbesEnabled) {
    return skippedObservation("mini-kv", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_COMMAND);
  }

  try {
    const response = await miniKv.shardJson();
    return assessObservation("mini-kv", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_COMMAND, null,
      response.latencyMs, response.readiness);
  } catch (error) {
    return failedObservation("mini-kv", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_COMMAND, error);
  }
}
