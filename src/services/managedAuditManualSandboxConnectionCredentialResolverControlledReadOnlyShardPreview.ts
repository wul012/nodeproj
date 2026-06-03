import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  assessObservation,
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
  createChecks,
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
  createSourceMatrixHandoffNotes,
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
  const checks = createChecks(input.config, java, miniKv, previewDigest);
  checks.readyForControlledReadOnlyShardPreview = Object.entries(checks)
    .filter(([key]) => key !== "readyForControlledReadOnlyShardPreview")
    .every(([, value]) => value);
  const ready = checks.readyForControlledReadOnlyShardPreview;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(java, miniKv);
  const recommendations = collectRecommendations(ready);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver controlled read-only shard preview",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    previewState: ready ? "controlled-read-only-shard-preview-ready" : "blocked",
    previewDecision: ready ? "preview-java-and-mini-kv-shard-readiness" : "blocked",
    readyForControlledReadOnlyShardPreview: ready,
    activeNodeVersion: "Node v616",
    sourceNodeVersion: "Node v615",
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
      nextNodeVersion: "Node v617",
    },
    nextActions: ready
      ? [
        "Use Node v617 to verify the controlled source-matrix handoff summary consumer receipt archive snapshot.",
        "Keep Java and mini-kv as independently started services; Node still only reads their readiness surfaces.",
      ]
      : [
        "Open a deliberate read-only window with Java and mini-kv available, then rerun this preview.",
        "Do not start, stop, write, restore, load, compact, or activate routing from this Node preview.",
      ],
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
