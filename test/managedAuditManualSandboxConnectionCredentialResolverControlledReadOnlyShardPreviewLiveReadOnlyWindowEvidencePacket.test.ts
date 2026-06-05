import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewExecutionGapMatrix,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRenderer.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerArtifacts.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  blockedSourceMatrix,
  readySourceMatrix,
} from "./support/controlledReadOnlyShardPreviewReviewArtifactFixtures.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview live read-only window evidence packet", () => {
  it("builds a twenty-version pending manual evidence packet from the command worksheet", () => {
    const packet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket(
      readyCommandWorksheet(),
    );

    expect(packet).toMatchObject({
      evidencePacketVersion: "Node v791",
      inputCommandWorksheetVersion: "Node v771",
      packetState: "ready-for-manual-evidence-capture",
      readyForManualEvidenceCapture: true,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      recordCount: 20,
      targetCount: 5,
      commandEvidenceRecordCount: 4,
      cleanupRecordCount: 2,
      failureClassCount: 20,
      gateCount: 16,
      passedGateCount: 16,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      runtimePayloadCaptured: false,
      containsSecretValue: false,
    });
    expect(packet.requiredFieldCount).toBeGreaterThan(50);
    expect(packet.acceptanceCriterionCount).toBe(40);
    expect(packet.evidencePacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(packet.records.map((record) => record.nodeVersion)).toEqual([
      "Node v772",
      "Node v773",
      "Node v774",
      "Node v775",
      "Node v776",
      "Node v777",
      "Node v778",
      "Node v779",
      "Node v780",
      "Node v781",
      "Node v782",
      "Node v783",
      "Node v784",
      "Node v785",
      "Node v786",
      "Node v787",
      "Node v788",
      "Node v789",
      "Node v790",
      "Node v791",
    ]);
    expect(new Set(packet.records.map((record) => record.target))).toEqual(new Set([
      "node-http",
      "java-http",
      "mini-kv-tcp",
      "archive",
      "policy",
    ]));
    expect(packet.records.every((record) => record.captureState === "pending-manual-capture")).toBe(true);
    expect(packet.records.every((record) => !record.runtimePayloadCaptured)).toBe(true);
    expect(packet.records.every((record) => !record.containsSecretValue)).toBe(true);
    expect(packet.records.every((record) => record.readOnly && !record.writesAllowed)).toBe(true);
    expect(packet.records.every((record) => !record.automaticServiceStart && !record.startsServices)).toBe(true);
    expect(packet.records.map((record) => record.code)).toContain("EVIDENCE_MINI_KV_SHARDJSON_RECORD");
    expect(packet.records.map((record) => record.sourceWorksheetStepCode))
      .toContain("WORKSHEET_GO_NO_GO_RECORD");
  });

  it("fails closed when the source command worksheet is blocked", () => {
    const packet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket(
      blockedCommandWorksheet(),
    );

    expect(packet).toMatchObject({
      packetState: "blocked",
      readyForManualEvidenceCapture: false,
      passedGateCount: 15,
      blockedReasonCodes: ["SOURCE_COMMAND_WORKSHEET_NOT_READY"],
    });
  });

  it("renders stable evidence packet markdown for archive review", () => {
    const packet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket(
      readyCommandWorksheet(),
    );
    const markdown = renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketMarkdown(packet);

    expect(markdown).toContain("# Controlled read-only shard preview live read-only window evidence packet");
    expect(markdown).toContain("- Record count: 20");
    expect(markdown).toContain("- Runtime payload captured: false");
    expect(markdown).toContain("### 1. Node v772 EVIDENCE_SOURCE_WORKSHEET_CHECK");
    expect(markdown).toContain("### 20. Node v791 EVIDENCE_PACKET_CLOSEOUT_RECORD");
    expect(markdown).toContain("- Capture state: pending-manual-capture");
    expect(markdown).toContain("- Contains secret value: false");
  });

  it("includes the evidence packet in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowEvidencePacket).toMatchObject({
      evidencePacketVersion: "Node v791",
      recordCount: 20,
      commandEvidenceRecordCount: 4,
      readyForManualEvidenceCapture: true,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      startsServices: false,
      runtimePayloadCaptured: false,
      containsSecretValue: false,
    });
  });
});

function readyCommandWorksheet() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(
    rehearsalPacketFromSourceMatrix(true),
  );
}

function blockedCommandWorksheet() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(
    rehearsalPacketFromSourceMatrix(false),
  );
}

function rehearsalPacketFromSourceMatrix(ready: boolean) {
  const matrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
    previewState: ready ? "controlled-read-only-shard-preview-ready" : "blocked",
    readyForControlledReadOnlyShardPreview: ready,
    executionAllowed: false,
    writeRoutingAllowed: false,
    loadRestoreCompactAllowed: false,
    sourceMatrix: ready ? readySourceMatrix() : blockedSourceMatrix(),
  });
  const candidate = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(matrix);
  const verification = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(candidate);
  const stageLedger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(verification);
  const runbookPackage = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(stageLedger);

  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(runbookPackage);
}
