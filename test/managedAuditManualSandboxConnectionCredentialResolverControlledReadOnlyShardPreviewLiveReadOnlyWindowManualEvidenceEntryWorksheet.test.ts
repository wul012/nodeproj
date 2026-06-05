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
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetRenderer.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketArtifacts.js";
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

describe("controlled read-only shard preview live read-only window manual evidence entry worksheet", () => {
  it("builds a blank twenty-five-version manual evidence entry worksheet from the review package", () => {
    const reviewPackage = reviewPackageFromSourceMatrix(true);
    const worksheet =
      createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet(reviewPackage);

    expect(worksheet).toMatchObject({
      worksheetVersion: "Node v861",
      sourceReviewPackageVersion: "Node v836",
      worksheetState: "ready-for-operator-entry-worksheet",
      readyForOperatorEntryWorksheet: true,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      slotCount: 25,
      ledgerCheckSlotCount: 19,
      targetEntrySlotCount: 3,
      policyArchiveSlotCount: 1,
      maintenanceSlotCount: 1,
      closeoutSlotCount: 1,
      scopeCount: 7,
      worksheetFieldCount: 51,
      gateCount: 21,
      passedGateCount: 21,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(worksheet.worksheetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(worksheet.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v837",
      "Node v838",
      "Node v839",
      "Node v840",
      "Node v841",
      "Node v842",
      "Node v843",
      "Node v844",
      "Node v845",
      "Node v846",
      "Node v847",
      "Node v848",
      "Node v849",
      "Node v850",
      "Node v851",
      "Node v852",
      "Node v853",
      "Node v854",
      "Node v855",
      "Node v856",
      "Node v857",
      "Node v858",
      "Node v859",
      "Node v860",
      "Node v861",
    ]);
    expect(worksheet.slots.every((slot) => slot.manualValueState === "not-entered")).toBe(true);
    expect(worksheet.slots.every((slot) => !slot.readyForOperatorEntry)).toBe(true);
    expect(worksheet.slots.every((slot) => !slot.importsRuntimePayload)).toBe(true);
    expect(worksheet.slots.every((slot) => !slot.acceptsSyntheticEvidence)).toBe(true);
    expect(worksheet.slots.every((slot) => !slot.containsSecretValue)).toBe(true);
    expect(worksheet.slots.every((slot) => slot.readOnly && !slot.writesAllowed)).toBe(true);
    expect(worksheet.slots.map((slot) => slot.code))
      .toContain("ENTRY_WORKSHEET_CATALOG_MAINTENANCE_BOUNDARY");
    expect(worksheet.slots.map((slot) => slot.code)).toContain("ENTRY_WORKSHEET_CLOSEOUT");
    expect(worksheet.slots.at(-1)?.validationRule)
      .toContain("Java and mini-kv can continue without waiting for Node");
  });

  it("fails closed when the source review package is blocked", () => {
    const reviewPackage = reviewPackageFromSourceMatrix(false);
    const worksheet =
      createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet(reviewPackage);

    expect(worksheet).toMatchObject({
      worksheetState: "blocked",
      readyForOperatorEntryWorksheet: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      slotCount: 25,
      passedGateCount: 19,
      blockedReasonCodes: [
        "SOURCE_REVIEW_PACKAGE_NOT_READY",
        "MANUAL_ENTRY_WORKSHEET_SOURCE_CONTROLS_NOT_PASSED",
      ],
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
  });

  it("renders stable manual evidence entry worksheet markdown for archive review", () => {
    const worksheet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet(
      reviewPackageFromSourceMatrix(true),
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetMarkdown(worksheet);

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window manual evidence entry worksheet");
    expect(markdown).toContain("- Slot count: 25");
    expect(markdown).toContain("- Ready for operator entry worksheet: true");
    expect(markdown).toContain("- Ready for manual evidence entry: false");
    expect(markdown).toContain("- Imports runtime payload: false");
    expect(markdown).toContain("### 1. Node v837 ENTRY_WORKSHEET_SOURCE_PACKET_READY");
    expect(markdown).toContain("### 25. Node v861 ENTRY_WORKSHEET_CLOSEOUT");
    expect(markdown).toContain("- Manual value state: not-entered");
  });

  it("includes the manual evidence entry worksheet in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowManualEvidenceEntryWorksheet).toMatchObject({
      worksheetVersion: "Node v861",
      sourceReviewPackageVersion: "Node v836",
      slotCount: 25,
      readyForOperatorEntryWorksheet: true,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
  });
});

function reviewPackageFromSourceMatrix(ready: boolean) {
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
  const rehearsalPacket = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(runbookPackage);
  const commandWorksheet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(rehearsalPacket);
  const evidencePacket = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket(commandWorksheet);
  const intakeLedger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger(evidencePacket);

  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage(intakeLedger);
}
