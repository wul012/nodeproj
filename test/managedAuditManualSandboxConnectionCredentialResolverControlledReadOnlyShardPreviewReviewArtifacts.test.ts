import { describe, expect, it } from "vitest";

import {
  createSourceMatrixArchiveSnapshot,
  createSourceMatrixArchiveSnapshotSummaryExport,
  createSourceMatrixHandoffNotes,
  createSourceMatrixConsumer,
  createSourceMatrixDriftSummary,
  createSourceMatrixReviewChecklist,
  createSourceMatrixReviewDigest,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.js";

import {
  blockedSourceMatrix,
  readySourceMatrix,
} from "./support/controlledReadOnlyShardPreviewReviewArtifactFixtures.js";

describe("controlled read-only shard preview review artifacts", () => {
  it("builds the ready source-matrix review chain through handoff notes", () => {
    const sourceMatrix = readySourceMatrix();
    const consumer = createSourceMatrixConsumer(sourceMatrix);
    const driftSummary = createSourceMatrixDriftSummary(sourceMatrix, consumer);
    const checklist = createSourceMatrixReviewChecklist(driftSummary);
    const digest = createSourceMatrixReviewDigest(checklist);
    const snapshot = createSourceMatrixArchiveSnapshot(digest);
    const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
    const handoffNotes = createSourceMatrixHandoffNotes(summaryExport);

    expect(consumer).toMatchObject({
      decision: "ready-for-controlled-read-only-consumption",
      readyForControlledReadOnlyConsumption: true,
      gateCount: 6,
      passedGateCount: 6,
      blockedReasonCodes: [],
      comparison: {
        routingModes: ["read-only-preview", "single-shard-readiness-prototype"],
        shardCountDelta: 1,
        slotCountDelta: 16,
      },
      activatesRouting: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(driftSummary).toMatchObject({
      driftState: "controlled-drift-detected",
      readyForControlledDriftReview: true,
      findingCount: 3,
      driftFindingCount: 3,
      blockingFindingCount: 0,
      comparableFindingCount: 3,
    });
    expect(checklist).toMatchObject({
      checklistState: "ready-for-controlled-review",
      readyForOperatorReview: true,
      itemCount: 4,
      readyItemCount: 3,
      reviewItemCount: 1,
      blockedItemCount: 0,
    });
    expect(digest).toMatchObject({
      digestVersion: "Node v602",
      algorithm: "sha256",
      readyForControlledReviewArchive: true,
      checklistState: "ready-for-controlled-review",
      itemCount: 4,
      blockedItemCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(digest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(snapshot).toMatchObject({
      snapshotVersion: "Node v603",
      archiveState: "ready-for-controlled-review-archive",
      readyForControlledReviewArchive: true,
      digestValue: digest.value,
      archivedSectionCount: 5,
      blockedItemCount: 0,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresRoutingActivation: false,
    });
    expect(summaryExport).toMatchObject({
      exportVersion: "Node v605",
      exportState: "ready-for-summary-export",
      readyForSummaryExport: true,
      digestValue: digest.value,
      summaryDigest: {
        algorithm: "sha256",
        scope: "archive-snapshot-summary-lines",
        coveredLineCount: 5,
      },
      summaryLineCount: 5,
      blockedItemCount: 0,
      includesRawCredential: false,
      includesRuntimePayload: false,
    });
    expect(summaryExport.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(summaryExport.summaryLines).toEqual([
      "archiveState=ready-for-controlled-review-archive",
      `digest=${digest.value}`,
      "archivedSections=5",
      "blockedItems=0",
      "routingActivation=false",
    ]);
    expect(handoffNotes).toMatchObject({
      notesVersion: "Node v608",
      inputSummaryExportVersion: "Node v605",
      handoffState: "ready-for-read-only-handoff",
      readyForReadOnlyHandoff: true,
      handoffDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-notes",
        coveredNoteCount: 4,
      },
      noteCount: 4,
      actionRequiredCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(handoffNotes.handoffDigest.value).toMatch(/^[a-f0-9]{64}$/);
  });

  it("fails closed when the source matrix cannot be consumed", () => {
    const sourceMatrix = blockedSourceMatrix();
    const consumer = createSourceMatrixConsumer(sourceMatrix);
    const driftSummary = createSourceMatrixDriftSummary(sourceMatrix, consumer);
    const checklist = createSourceMatrixReviewChecklist(driftSummary);
    const digest = createSourceMatrixReviewDigest(checklist);
    const snapshot = createSourceMatrixArchiveSnapshot(digest);
    const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
    const handoffNotes = createSourceMatrixHandoffNotes(summaryExport);

    expect(consumer).toMatchObject({
      decision: "blocked",
      readyForControlledReadOnlyConsumption: false,
      passedGateCount: 2,
      blockedReasonCodes: [
        "SOURCE_NOT_READY",
        "SHARD_COUNTS_NOT_COMPARABLE",
        "SLOT_COUNTS_NOT_COMPARABLE",
        "ROUTING_MODE_NOT_DECLARED",
      ],
    });
    expect(driftSummary).toMatchObject({
      driftState: "blocked",
      readyForControlledDriftReview: false,
      findingCount: 4,
      driftFindingCount: 0,
      blockingFindingCount: 4,
      comparableFindingCount: 0,
    });
    expect(checklist).toMatchObject({
      checklistState: "blocked",
      readyForOperatorReview: false,
      readyItemCount: 2,
      reviewItemCount: 0,
      blockedItemCount: 2,
    });
    expect(digest).toMatchObject({
      readyForControlledReviewArchive: false,
      checklistState: "blocked",
      itemCount: 4,
      blockedItemCount: 2,
    });
    expect(snapshot).toMatchObject({
      archiveState: "blocked",
      readyForControlledReviewArchive: false,
      archivedSectionCount: 5,
      checklistState: "blocked",
      blockedItemCount: 2,
      includesRawCredential: false,
      includesRuntimePayload: false,
    });
    expect(summaryExport).toMatchObject({
      exportState: "blocked",
      readyForSummaryExport: false,
      summaryDigest: {
        algorithm: "sha256",
        scope: "archive-snapshot-summary-lines",
        coveredLineCount: 5,
      },
      summaryLineCount: 5,
      blockedItemCount: 2,
    });
    expect(handoffNotes).toMatchObject({
      handoffState: "blocked",
      readyForReadOnlyHandoff: false,
      handoffDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-notes",
        coveredNoteCount: 4,
      },
      noteCount: 4,
      actionRequiredCount: 1,
    });
    expect(handoffNotes.handoffDigest.value).toMatch(/^[a-f0-9]{64}$/);
  });

  it("keeps the summary export digest stable for the same snapshot", () => {
    const sourceMatrix = readySourceMatrix();
    const consumer = createSourceMatrixConsumer(sourceMatrix);
    const driftSummary = createSourceMatrixDriftSummary(sourceMatrix, consumer);
    const checklist = createSourceMatrixReviewChecklist(driftSummary);
    const digest = createSourceMatrixReviewDigest(checklist);
    const snapshot = createSourceMatrixArchiveSnapshot(digest);

    const first = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
    const second = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);

    expect(first.summaryDigest).toEqual(second.summaryDigest);
    expect(first.summaryDigest).toMatchObject({
      algorithm: "sha256",
      scope: "archive-snapshot-summary-lines",
      coveredLineCount: 5,
    });
  });

  it("keeps the handoff note digest stable for the same summary export", () => {
    const sourceMatrix = readySourceMatrix();
    const consumer = createSourceMatrixConsumer(sourceMatrix);
    const driftSummary = createSourceMatrixDriftSummary(sourceMatrix, consumer);
    const checklist = createSourceMatrixReviewChecklist(driftSummary);
    const digest = createSourceMatrixReviewDigest(checklist);
    const snapshot = createSourceMatrixArchiveSnapshot(digest);
    const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);

    const first = createSourceMatrixHandoffNotes(summaryExport);
    const second = createSourceMatrixHandoffNotes(summaryExport);

    expect(first.handoffDigest).toEqual(second.handoffDigest);
    expect(first.handoffDigest).toMatchObject({
      algorithm: "sha256",
      scope: "read-only-handoff-notes",
      coveredNoteCount: 4,
    });
  });
});
