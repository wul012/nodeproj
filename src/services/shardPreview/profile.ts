import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
  JAVA_ENDPOINT,
  MINI_KV_COMMAND,
  PROFILE_VERSION,
  sumNullable,
} from "../managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.js";
import type {
  ControlledReadOnlyShardPreviewProfile,
  ControlledReadOnlyShardPreviewReads,
} from "../managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";
import type { ShardPreviewAssessment } from "./assessment.js";

export function buildShardPreviewProfile(
  reads: ControlledReadOnlyShardPreviewReads,
  assessment: ShardPreviewAssessment,
): ControlledReadOnlyShardPreviewProfile {
  const { java, miniKv } = reads;
  const { ready } = assessment;
  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver controlled read-only shard preview",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    previewState: assessment.previewState,
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
    reads,
    preview: {
      java: java.preview,
      miniKv: miniKv.preview,
      combinedSlotCount: sumNullable(java.preview.slotCount, miniKv.preview.slotCount),
      combinedShardCount: sumNullable(java.preview.shardCount, miniKv.preview.shardCount),
      bothReadOnly: java.readOnlySafe && miniKv.readOnlySafe,
      bothExecutionBlocked: java.executionBlocked && miniKv.executionBlocked,
      ...assessment.preview,
    },
    checks: assessment.checks,
    summary: assessment.summary,
    productionBlockers: assessment.productionBlockers,
    warnings: assessment.warnings,
    recommendations: assessment.recommendations,
    evidenceEndpoints: {
      controlledReadOnlyShardPreviewJson: CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
      controlledReadOnlyShardPreviewMarkdown: `${CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE}?format=markdown`,
      javaShardReadinessEndpoint: JAVA_ENDPOINT,
      miniKvShardJsonCommand: MINI_KV_COMMAND,
      sourceNodeV580ArchiveIndex: "e/README.md",
      nextNodeVersion: "Node v639",
    },
    nextActions: assessment.nextActions,
  };
}
