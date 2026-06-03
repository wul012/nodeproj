import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes,
  ControlledReadOnlyShardPreviewSourceMatrixReviewDigest,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const ARCHIVED_SECTIONS = Object.freeze([
  "sourceMatrix",
  "sourceMatrixConsumer",
  "sourceMatrixDriftSummary",
  "sourceMatrixReviewChecklist",
  "sourceMatrixReviewDigest",
]);

export function createSourceMatrixArchiveSnapshot(
  digest: ControlledReadOnlyShardPreviewSourceMatrixReviewDigest,
): ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot {
  return {
    snapshotVersion: "Node v603",
    inputReviewDigestVersion: "Node v602",
    archiveState: digest.readyForControlledReviewArchive ? "ready-for-controlled-review-archive" : "blocked",
    readyForControlledReviewArchive: digest.readyForControlledReviewArchive,
    digestValue: digest.value,
    archivedSections: [...ARCHIVED_SECTIONS],
    archivedSectionCount: ARCHIVED_SECTIONS.length,
    checklistState: digest.checklistState,
    itemCount: digest.itemCount,
    blockedItemCount: digest.blockedItemCount,
    includesRawCredential: false,
    includesRuntimePayload: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixArchiveSnapshotSummaryExport(
  snapshot: ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot,
): ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport {
  const summaryLines = [
    `archiveState=${snapshot.archiveState}`,
    `digest=${snapshot.digestValue}`,
    `archivedSections=${snapshot.archivedSectionCount}`,
    `blockedItems=${snapshot.blockedItemCount}`,
    `routingActivation=${snapshot.requiresRoutingActivation}`,
  ];

  return {
    exportVersion: "Node v605",
    inputArchiveSnapshotVersion: "Node v603",
    exportState: snapshot.readyForControlledReviewArchive ? "ready-for-summary-export" : "blocked",
    readyForSummaryExport: snapshot.readyForControlledReviewArchive,
    digestValue: snapshot.digestValue,
    summaryDigest: {
      algorithm: "sha256",
      scope: "archive-snapshot-summary-lines",
      value: sha256StableJson({
        exportVersion: "Node v605",
        inputArchiveSnapshotVersion: "Node v603",
        summaryLines,
      }),
      coveredLineCount: summaryLines.length,
    },
    summaryLines,
    summaryLineCount: summaryLines.length,
    archivedSectionCount: snapshot.archivedSectionCount,
    blockedItemCount: snapshot.blockedItemCount,
    includesRawCredential: false,
    includesRuntimePayload: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixHandoffNotes(
  summaryExport: ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes {
  const ready = summaryExport.readyForSummaryExport;
  const notes = [
    {
      order: 1,
      audience: "operator" as const,
      message: ready
        ? "Review the summary export digest and keep this as read-only handoff evidence."
        : "Summary export is blocked; resolve blocked review items before handoff.",
      actionRequired: !ready,
      routingActivationAllowed: false as const,
    },
    {
      order: 2,
      audience: "node" as const,
      message: "Do not start services, activate shard routing, or read credential values from this handoff.",
      actionRequired: false,
      routingActivationAllowed: false as const,
    },
    {
      order: 3,
      audience: "java" as const,
      message: "Java may continue in parallel; Node does not require fresh Java evidence for this handoff.",
      actionRequired: false,
      routingActivationAllowed: false as const,
    },
    {
      order: 4,
      audience: "miniKv" as const,
      message: "mini-kv may continue in parallel; Node does not require fresh mini-kv evidence for this handoff.",
      actionRequired: false,
      routingActivationAllowed: false as const,
    },
  ];

  return {
    notesVersion: "Node v608",
    inputSummaryExportVersion: "Node v605",
    handoffState: ready ? "ready-for-read-only-handoff" : "blocked",
    readyForReadOnlyHandoff: ready,
    handoffDigest: {
      algorithm: "sha256",
      scope: "read-only-handoff-notes",
      value: sha256StableJson({
        notesVersion: "Node v608",
        inputSummaryExportVersion: "Node v605",
        notes,
      }),
      coveredNoteCount: notes.length,
    },
    noteCount: notes.length,
    actionRequiredCount: notes.filter((note) => note.actionRequired).length,
    notes,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}
