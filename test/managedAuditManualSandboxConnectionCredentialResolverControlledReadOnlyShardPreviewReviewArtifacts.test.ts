import { describe, expect, it } from "vitest";

import {
  createSourceMatrixArchiveSnapshot,
  createSourceMatrixArchiveSnapshotSummaryExport,
  createSourceMatrixHandoffNotes,
  createSourceMatrixHandoffSummary,
  createSourceMatrixConsumer,
  createSourceMatrixDriftSummary,
  createSourceMatrixReviewChecklist,
  createSourceMatrixReviewDigest,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrix,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

describe("controlled read-only shard preview review artifacts", () => {
  it("builds the ready consumer, drift, checklist, digest, and snapshot chain", () => {
    const consumer = createSourceMatrixConsumer(readySourceMatrix());
    const driftSummary = createSourceMatrixDriftSummary(readySourceMatrix(), consumer);
    const checklist = createSourceMatrixReviewChecklist(driftSummary);
    const digest = createSourceMatrixReviewDigest(checklist);
    const snapshot = createSourceMatrixArchiveSnapshot(digest);
    const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
    const handoffNotes = createSourceMatrixHandoffNotes(summaryExport);
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);

    expect(consumer).toMatchObject({
      decision: "ready-for-controlled-read-only-consumption",
      readyForControlledReadOnlyConsumption: true,
      requiredSources: ["java", "miniKv"],
      observedSources: ["java", "miniKv"],
      missingSources: [],
      gateCount: 6,
      passedGateCount: 6,
      blockedReasonCodes: [],
      gates: {
        observedRequiredSources: true,
        allSourcesReady: true,
        shardCountsComparable: true,
        slotCountsComparable: true,
        routingModesDeclared: true,
        readOnlyConsumerOnly: true,
      },
      comparison: {
        routingModes: ["read-only-preview", "single-shard-readiness-prototype"],
        routingModeCount: 2,
        javaShardCount: 0,
        miniKvShardCount: 1,
        shardCountDelta: 1,
        javaSlotCount: 0,
        miniKvSlotCount: 16,
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
      findings: [
        { dimension: "routingMode", status: "drift-detected", severity: "warning" },
        { dimension: "shardCount", status: "drift-detected", severity: "warning" },
        { dimension: "slotCount", status: "drift-detected", severity: "warning" },
      ],
    });
    expect(checklist).toMatchObject({
      checklistState: "ready-for-controlled-review",
      readyForOperatorReview: true,
      itemCount: 4,
      readyItemCount: 3,
      reviewItemCount: 1,
      blockedItemCount: 0,
      items: [
        { order: 1, check: "confirm-source-matrix-consumer", status: "ready" },
        { order: 2, check: "review-controlled-drift-findings", status: "needs-review" },
        { order: 3, check: "confirm-routing-remains-disabled", status: "ready" },
        { order: 4, check: "confirm-sibling-projects-can-continue", status: "ready" },
      ],
    });
    expect(digest).toMatchObject({
      digestVersion: "Node v602",
      inputChecklistVersion: "Node v601",
      algorithm: "sha256",
      readyForControlledReviewArchive: true,
      checklistState: "ready-for-controlled-review",
      itemCount: 4,
      blockedItemCount: 0,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(digest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(snapshot).toMatchObject({
      snapshotVersion: "Node v603",
      inputReviewDigestVersion: "Node v602",
      archiveState: "ready-for-controlled-review-archive",
      readyForControlledReviewArchive: true,
      digestValue: digest.value,
      archivedSectionCount: 5,
      checklistState: "ready-for-controlled-review",
      itemCount: 4,
      blockedItemCount: 0,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(summaryExport).toMatchObject({
      exportVersion: "Node v605",
      inputArchiveSnapshotVersion: "Node v603",
      exportState: "ready-for-summary-export",
      readyForSummaryExport: true,
      digestValue: digest.value,
      summaryDigest: {
        algorithm: "sha256",
        scope: "archive-snapshot-summary-lines",
        coveredLineCount: 5,
      },
      summaryLineCount: 5,
      archivedSectionCount: 5,
      blockedItemCount: 0,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
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
      startsServices: false,
      mutatesSiblingState: false,
      notes: [
        { order: 1, audience: "operator", actionRequired: false },
        { order: 2, audience: "node", actionRequired: false },
        { order: 3, audience: "java", actionRequired: false },
        { order: 4, audience: "miniKv", actionRequired: false },
      ],
    });
    expect(handoffNotes.handoffDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffSummary).toMatchObject({
      summaryVersion: "Node v611",
      inputNotesVersion: "Node v608",
      summaryState: "ready-for-read-only-handoff-summary",
      readyForReadOnlyHandoffSummary: true,
      audiences: ["operator", "node", "java", "miniKv"],
      audienceCount: 4,
      actionRequiredCount: 0,
      handoffDigestValue: handoffNotes.handoffDigest.value,
      summaryDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-summary",
        coveredAudienceCount: 4,
        coveredActionRequiredCount: 0,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffSummary.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
  });

  it("fails closed when the source matrix cannot be consumed", () => {
    const consumer = createSourceMatrixConsumer(blockedSourceMatrix());
    const driftSummary = createSourceMatrixDriftSummary(blockedSourceMatrix(), consumer);
    const checklist = createSourceMatrixReviewChecklist(driftSummary);
    const digest = createSourceMatrixReviewDigest(checklist);
    const snapshot = createSourceMatrixArchiveSnapshot(digest);
    const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
    const handoffNotes = createSourceMatrixHandoffNotes(summaryExport);
    const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);

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
      findings: [
        { dimension: "consumerReadiness", status: "blocked", severity: "blocker" },
        { dimension: "routingMode", status: "not-comparable", severity: "blocker" },
        { dimension: "shardCount", status: "not-comparable", severity: "blocker" },
        { dimension: "slotCount", status: "not-comparable", severity: "blocker" },
      ],
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
    expect(digest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(snapshot).toMatchObject({
      archiveState: "blocked",
      readyForControlledReviewArchive: false,
      archivedSectionCount: 5,
      checklistState: "blocked",
      itemCount: 4,
      blockedItemCount: 2,
      includesRawCredential: false,
      includesRuntimePayload: false,
    });
    expect(summaryExport).toMatchObject({
      exportState: "blocked",
      readyForSummaryExport: false,
      digestValue: digest.value,
      summaryDigest: {
        algorithm: "sha256",
        scope: "archive-snapshot-summary-lines",
        coveredLineCount: 5,
      },
      summaryLineCount: 5,
      archivedSectionCount: 5,
      blockedItemCount: 2,
      includesRawCredential: false,
      includesRuntimePayload: false,
    });
    expect(summaryExport.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
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
      notes: [
        { order: 1, audience: "operator", actionRequired: true },
        { order: 2, audience: "node", actionRequired: false },
        { order: 3, audience: "java", actionRequired: false },
        { order: 4, audience: "miniKv", actionRequired: false },
      ],
    });
    expect(handoffNotes.handoffDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffSummary).toMatchObject({
      summaryState: "blocked",
      readyForReadOnlyHandoffSummary: false,
      audiences: ["operator", "node", "java", "miniKv"],
      audienceCount: 4,
      actionRequiredCount: 1,
      handoffDigestValue: handoffNotes.handoffDigest.value,
      summaryDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-summary",
        coveredAudienceCount: 4,
        coveredActionRequiredCount: 1,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(handoffSummary.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
  });

  it("keeps the summary export digest stable for the same snapshot", () => {
    const consumer = createSourceMatrixConsumer(readySourceMatrix());
    const driftSummary = createSourceMatrixDriftSummary(readySourceMatrix(), consumer);
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
    const consumer = createSourceMatrixConsumer(readySourceMatrix());
    const driftSummary = createSourceMatrixDriftSummary(readySourceMatrix(), consumer);
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

  it("keeps the handoff summary digest stable for the same handoff notes", () => {
    const consumer = createSourceMatrixConsumer(readySourceMatrix());
    const driftSummary = createSourceMatrixDriftSummary(readySourceMatrix(), consumer);
    const checklist = createSourceMatrixReviewChecklist(driftSummary);
    const digest = createSourceMatrixReviewDigest(checklist);
    const snapshot = createSourceMatrixArchiveSnapshot(digest);
    const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
    const handoffNotes = createSourceMatrixHandoffNotes(summaryExport);

    const first = createSourceMatrixHandoffSummary(handoffNotes);
    const second = createSourceMatrixHandoffSummary(handoffNotes);

    expect(first.summaryDigest).toEqual(second.summaryDigest);
    expect(first.summaryDigest).toMatchObject({
      algorithm: "sha256",
      scope: "read-only-handoff-summary",
      coveredAudienceCount: 4,
      coveredActionRequiredCount: 0,
    });
  });
});

function readySourceMatrix(): ControlledReadOnlyShardPreviewSourceMatrix {
  return {
    sources: [
      {
        source: "java",
        project: "advanced-order-platform",
        version: "Java v289",
        releaseVersion: null,
        status: "passed-read",
        readyForPreview: true,
        readOnlySafe: true,
        executionBlocked: true,
        shardEnabled: false,
        shardCount: 0,
        slotCount: 0,
        routingMode: "read-only-preview",
        endpoint: "GET /api/v1/ops/shard-readiness",
        command: null,
        latencyMs: 3,
      },
      {
        source: "miniKv",
        project: "mini-kv",
        version: "0.262.0",
        releaseVersion: "v262",
        status: "passed-read",
        readyForPreview: true,
        readOnlySafe: true,
        executionBlocked: true,
        shardEnabled: false,
        shardCount: 1,
        slotCount: 16,
        routingMode: "single-shard-readiness-prototype",
        endpoint: "127.0.0.1 mini-kv TCP",
        command: "SHARDJSON",
        latencyMs: 4,
      },
    ],
    sourceCount: 2,
    readySourceCount: 2,
    failedSourceCount: 0,
    skippedSourceCount: 0,
    routingModes: ["read-only-preview", "single-shard-readiness-prototype"],
    shardCountDelta: 1,
    slotCountDelta: 16,
    shardCountsComparable: true,
    slotCountsComparable: true,
    allSourcesReady: true,
  };
}

function blockedSourceMatrix(): ControlledReadOnlyShardPreviewSourceMatrix {
  return {
    sources: [
      {
        source: "java",
        project: "advanced-order-platform",
        version: null,
        releaseVersion: null,
        status: "skipped-probes-disabled",
        readyForPreview: false,
        readOnlySafe: false,
        executionBlocked: false,
        shardEnabled: null,
        shardCount: null,
        slotCount: null,
        routingMode: null,
        endpoint: "GET /api/v1/ops/shard-readiness",
        command: null,
        latencyMs: null,
      },
      {
        source: "miniKv",
        project: "mini-kv",
        version: null,
        releaseVersion: null,
        status: "skipped-probes-disabled",
        readyForPreview: false,
        readOnlySafe: false,
        executionBlocked: false,
        shardEnabled: null,
        shardCount: null,
        slotCount: null,
        routingMode: null,
        endpoint: "127.0.0.1 mini-kv TCP",
        command: "SHARDJSON",
        latencyMs: null,
      },
    ],
    sourceCount: 2,
    readySourceCount: 0,
    failedSourceCount: 0,
    skippedSourceCount: 2,
    routingModes: [],
    shardCountDelta: null,
    slotCountDelta: null,
    shardCountsComparable: false,
    slotCountsComparable: false,
    allSourcesReady: false,
  };
}
