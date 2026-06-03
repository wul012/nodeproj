import { describe, expect, it } from "vitest";

import {
  createSourceMatrixArchiveSnapshot,
  createSourceMatrixArchiveSnapshotSummaryExport,
  createSourceMatrixConsumer,
  createSourceMatrixDriftSummary,
  createSourceMatrixHandoffNotes,
  createSourceMatrixReviewChecklist,
  createSourceMatrixReviewDigest,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.js";
import {
  createSourceMatrixHandoffRouteCoverage,
  createSourceMatrixHandoffRouteCoverageArchiveSnapshot,
  createSourceMatrixHandoffRouteCoverageArchiveSummary,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification,
  createSourceMatrixHandoffRouteCoverageArchiveVerification,
  createSourceMatrixHandoffRouteCoverageVerification,
  createSourceMatrixHandoffSummary,
  createSourceMatrixHandoffSummaryConsumer,
  createSourceMatrixHandoffSummaryConsumerExport,
  createSourceMatrixHandoffSummaryConsumerReceipt,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrix,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

import { readySourceMatrix } from "./support/controlledReadOnlyShardPreviewReviewArtifactFixtures.js";

describe("controlled read-only shard preview handoff artifact stability", () => {
  it("keeps the handoff summary digest stable for the same handoff notes", () => {
    const { handoffNotes } = createReadyHandoffArtifactChain();

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

  it("keeps the handoff receipt archive snapshot digest stable for the same receipt", () => {
    const { handoffSummaryConsumerReceipt } = createReadyHandoffArtifactChain();

    const first = createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(handoffSummaryConsumerReceipt);
    const second = createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(handoffSummaryConsumerReceipt);

    expect(first.snapshotDigest).toEqual(second.snapshotDigest);
    expect(first.snapshotDigest).toMatchObject({
      algorithm: "sha256",
      scope: "handoff-summary-consumer-receipt-archive-snapshot",
      coveredSectionCount: 3,
    });
  });

  it("keeps the handoff route coverage archive verification stable for the same snapshot", () => {
    const { handoffRouteCoverageArchiveSnapshot } = createReadyHandoffArtifactChain();

    const first = createSourceMatrixHandoffRouteCoverageArchiveVerification(handoffRouteCoverageArchiveSnapshot);
    const second = createSourceMatrixHandoffRouteCoverageArchiveVerification(handoffRouteCoverageArchiveSnapshot);

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      verificationVersion: "Node v623",
      inputSnapshotVersion: "Node v622",
      verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification",
      gateCount: 7,
      passedGateCount: 7,
      blockedReasonCodes: [],
      snapshotDigestValue: handoffRouteCoverageArchiveSnapshot.snapshotDigest.value,
    });
  });

  it("keeps the handoff route coverage archive summary digest stable for the same verification", () => {
    const { handoffRouteCoverageArchiveVerification } = createReadyHandoffArtifactChain();

    const first = createSourceMatrixHandoffRouteCoverageArchiveSummary(handoffRouteCoverageArchiveVerification);
    const second = createSourceMatrixHandoffRouteCoverageArchiveSummary(handoffRouteCoverageArchiveVerification);

    expect(first.summaryDigest).toEqual(second.summaryDigest);
    expect(first.summaryDigest).toMatchObject({
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-lines",
      coveredLineCount: 6,
    });
  });

  it("keeps the handoff route coverage archive summary receipt digest stable for the same summary", () => {
    const { handoffRouteCoverageArchiveSummary } = createReadyHandoffArtifactChain();

    const first = createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(handoffRouteCoverageArchiveSummary);
    const second = createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(handoffRouteCoverageArchiveSummary);

    expect(first.receiptDigest).toEqual(second.receiptDigest);
    expect(first.receiptDigest).toMatchObject({
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-receipt",
      coveredSummaryLineCount: 6,
      coveredBlockedReasonCount: 0,
    });
  });

  it("keeps the handoff route coverage archive summary receipt snapshot digest stable for the same receipt", () => {
    const { handoffRouteCoverageArchiveSummaryReceipt } = createReadyHandoffArtifactChain();

    const first = createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot(
      handoffRouteCoverageArchiveSummaryReceipt,
    );
    const second = createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot(
      handoffRouteCoverageArchiveSummaryReceipt,
    );

    expect(first.snapshotDigest).toEqual(second.snapshotDigest);
    expect(first.snapshotDigest).toMatchObject({
      algorithm: "sha256",
      scope: "handoff-route-coverage-archive-summary-receipt-archive-snapshot",
      coveredSectionCount: 2,
    });
  });

  it("keeps the handoff route coverage archive summary receipt archive verification stable for the same snapshot", () => {
    const { handoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot } = createReadyHandoffArtifactChain();

    const first =
      createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification(
        handoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
      );
    const second =
      createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification(
        handoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
      );

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      verificationVersion: "Node v627",
      inputSnapshotVersion: "Node v626",
      verificationState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification",
      gateCount: 8,
      passedGateCount: 8,
      blockedReasonCodes: [],
      snapshotDigestValue: handoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot.snapshotDigest.value,
    });
  });
});

function createReadyHandoffArtifactChain() {
  const handoffNotes = createHandoffNotes(readySourceMatrix());
  const handoffSummary = createSourceMatrixHandoffSummary(handoffNotes);
  const handoffSummaryConsumer = createSourceMatrixHandoffSummaryConsumer(handoffSummary);
  const handoffSummaryConsumerExport = createSourceMatrixHandoffSummaryConsumerExport(handoffSummaryConsumer);
  const handoffSummaryConsumerReceipt = createSourceMatrixHandoffSummaryConsumerReceipt(handoffSummaryConsumerExport);
  const handoffSummaryConsumerReceiptArchiveSnapshot =
    createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot(handoffSummaryConsumerReceipt);
  const handoffSummaryConsumerReceiptArchiveVerification =
    createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(
      handoffSummaryConsumerReceiptArchiveSnapshot,
    );
  const handoffRouteCoverage =
    createSourceMatrixHandoffRouteCoverage(handoffSummaryConsumerReceiptArchiveVerification);
  const handoffRouteCoverageVerification = createSourceMatrixHandoffRouteCoverageVerification(handoffRouteCoverage);
  const handoffRouteCoverageArchiveSnapshot =
    createSourceMatrixHandoffRouteCoverageArchiveSnapshot(handoffRouteCoverageVerification);
  const handoffRouteCoverageArchiveVerification =
    createSourceMatrixHandoffRouteCoverageArchiveVerification(handoffRouteCoverageArchiveSnapshot);
  const handoffRouteCoverageArchiveSummary =
    createSourceMatrixHandoffRouteCoverageArchiveSummary(handoffRouteCoverageArchiveVerification);
  const handoffRouteCoverageArchiveSummaryReceipt =
    createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(handoffRouteCoverageArchiveSummary);
  const handoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot =
    createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot(
      handoffRouteCoverageArchiveSummaryReceipt,
    );

  return {
    handoffNotes,
    handoffSummaryConsumerReceipt,
    handoffRouteCoverageArchiveSnapshot,
    handoffRouteCoverageArchiveVerification,
    handoffRouteCoverageArchiveSummary,
    handoffRouteCoverageArchiveSummaryReceipt,
    handoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
  };
}

function createHandoffNotes(
  sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix,
): ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes {
  const consumer = createSourceMatrixConsumer(sourceMatrix);
  const driftSummary = createSourceMatrixDriftSummary(sourceMatrix, consumer);
  const checklist = createSourceMatrixReviewChecklist(driftSummary);
  const digest = createSourceMatrixReviewDigest(checklist);
  const snapshot = createSourceMatrixArchiveSnapshot(digest);
  const summaryExport = createSourceMatrixArchiveSnapshotSummaryExport(snapshot);
  return createSourceMatrixHandoffNotes(summaryExport);
}
