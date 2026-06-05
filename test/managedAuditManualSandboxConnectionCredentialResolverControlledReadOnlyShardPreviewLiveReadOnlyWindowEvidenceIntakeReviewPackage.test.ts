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
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageRenderer.js";
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

describe("controlled read-only shard preview live read-only window evidence intake review package", () => {
  it("builds a twenty-five-version operator intake review package from the intake ledger", () => {
    const ledger = intakeLedgerFromSourceMatrix(true);
    const reviewPackage =
      createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage(ledger);

    expect(reviewPackage).toMatchObject({
      packageVersion: "Node v836",
      sourceIntakeLedgerVersion: "Node v811",
      packageState: "ready-for-operator-intake-review",
      readyForOperatorIntakeReview: true,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      controlCount: 25,
      ledgerGateReviewControlCount: 19,
      targetReviewControlCount: 4,
      maintenanceReviewControlCount: 1,
      sourceLedgerEntryCoverageCount: 20,
      targetCount: 5,
      cleanupEntryCount: 2,
      failureClassCount: 20,
      gateCount: 23,
      passedGateCount: 23,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(reviewPackage.requiredFieldCount).toBe(ledger.requiredFieldCount);
    expect(reviewPackage.requiredFieldCount).toBeGreaterThan(50);
    expect(reviewPackage.acceptanceCriterionCount).toBe(ledger.acceptanceCriterionCount);
    expect(reviewPackage.acceptanceCriterionCount).toBe(40);
    expect(reviewPackage.packageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(reviewPackage.controls.map((control) => control.nodeVersion)).toEqual([
      "Node v812",
      "Node v813",
      "Node v814",
      "Node v815",
      "Node v816",
      "Node v817",
      "Node v818",
      "Node v819",
      "Node v820",
      "Node v821",
      "Node v822",
      "Node v823",
      "Node v824",
      "Node v825",
      "Node v826",
      "Node v827",
      "Node v828",
      "Node v829",
      "Node v830",
      "Node v831",
      "Node v832",
      "Node v833",
      "Node v834",
      "Node v835",
      "Node v836",
    ]);
    expect(reviewPackage.controls.every((control) => control.reviewState === "awaiting-operator-review"))
      .toBe(true);
    expect(reviewPackage.controls.every((control) => control.requiresOperatorReview)).toBe(true);
    expect(reviewPackage.controls.every((control) => !control.importsRuntimePayload)).toBe(true);
    expect(reviewPackage.controls.every((control) => !control.acceptsSyntheticEvidence)).toBe(true);
    expect(reviewPackage.controls.every((control) => !control.containsSecretValue)).toBe(true);
    expect(reviewPackage.controls.every((control) => control.readOnly && !control.writesAllowed)).toBe(true);
    expect(reviewPackage.controls.every((control) => !control.automaticServiceStart && !control.startsServices))
      .toBe(true);
    expect(reviewPackage.controls.map((control) => control.code))
      .toContain("INTAKE_REVIEW_RENDERER_MAINTENANCE_BOUNDARY");
    expect(reviewPackage.controls.map((control) => control.code))
      .toContain("INTAKE_REVIEW_PACKAGE_CLOSEOUT");
    expect(reviewPackage.controls.at(-1)?.maintenanceAction)
      .toContain("Java and mini-kv can continue in parallel");
  });

  it("fails closed when the source intake ledger is blocked", () => {
    const ledger = intakeLedgerFromSourceMatrix(false);
    const reviewPackage =
      createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage(ledger);

    expect(reviewPackage).toMatchObject({
      packageState: "blocked",
      readyForOperatorIntakeReview: false,
      readyForManualEvidenceEntry: false,
      passedGateCount: 21,
      blockedReasonCodes: [
        "SOURCE_INTAKE_LEDGER_NOT_READY",
        "INTAKE_REVIEW_LEDGER_GATES_NOT_PASSED",
      ],
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
    });
  });

  it("renders stable evidence intake review package markdown for archive review", () => {
    const reviewPackage = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage(
      intakeLedgerFromSourceMatrix(true),
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageMarkdown(reviewPackage);

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window evidence intake review package");
    expect(markdown).toContain("- Control count: 25");
    expect(markdown).toContain("- Ready for manual evidence entry: false");
    expect(markdown).toContain("- Imports runtime payload: false");
    expect(markdown).toContain("### 1. Node v812 INTAKE_REVIEW_SOURCE_PACKET_READY");
    expect(markdown).toContain("### 25. Node v836 INTAKE_REVIEW_PACKAGE_CLOSEOUT");
    expect(markdown).toContain("- Review state: awaiting-operator-review");
  });

  it("includes the evidence intake review package in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowEvidenceIntakeReviewPackage).toMatchObject({
      packageVersion: "Node v836",
      sourceIntakeLedgerVersion: "Node v811",
      controlCount: 25,
      readyForOperatorIntakeReview: true,
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

function intakeLedgerFromSourceMatrix(ready: boolean) {
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

  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger(evidencePacket);
}
