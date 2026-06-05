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
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerRenderer.js";
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

describe("controlled read-only shard preview live read-only window evidence intake ledger", () => {
  it("builds a twenty-version manual intake ledger from the pending evidence packet", () => {
    const evidencePacket = evidencePacketFromSourceMatrix(true);
    const ledger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger(evidencePacket);

    expect(ledger).toMatchObject({
      ledgerVersion: "Node v811",
      inputEvidencePacketVersion: "Node v791",
      ledgerState: "ready-for-manual-evidence-intake",
      readyForManualEvidenceIntake: true,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      entryCount: 20,
      targetCount: 5,
      cleanupEntryCount: 2,
      failureClassCount: 20,
      gateCount: 19,
      passedGateCount: 19,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(ledger.requiredFieldCount).toBe(evidencePacket.requiredFieldCount);
    expect(ledger.requiredFieldCount).toBeGreaterThan(50);
    expect(ledger.acceptanceCriterionCount).toBe(evidencePacket.acceptanceCriterionCount);
    expect(ledger.acceptanceCriterionCount).toBe(40);
    expect(ledger.ledgerDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(ledger.entries.map((entry) => entry.nodeVersion)).toEqual([
      "Node v792",
      "Node v793",
      "Node v794",
      "Node v795",
      "Node v796",
      "Node v797",
      "Node v798",
      "Node v799",
      "Node v800",
      "Node v801",
      "Node v802",
      "Node v803",
      "Node v804",
      "Node v805",
      "Node v806",
      "Node v807",
      "Node v808",
      "Node v809",
      "Node v810",
      "Node v811",
    ]);
    expect(new Set(ledger.entries.map((entry) => entry.target))).toEqual(new Set([
      "node-http",
      "java-http",
      "mini-kv-tcp",
      "archive",
      "policy",
    ]));
    expect(ledger.entries.every((entry) => entry.captureInputState === "awaiting-manual-entry")).toBe(true);
    expect(ledger.entries.every((entry) => !entry.importsRuntimePayload)).toBe(true);
    expect(ledger.entries.every((entry) => !entry.acceptsSyntheticEvidence)).toBe(true);
    expect(ledger.entries.every((entry) => !entry.containsSecretValue)).toBe(true);
    expect(ledger.entries.every((entry) => entry.readOnly && !entry.writesAllowed)).toBe(true);
    expect(ledger.entries.every((entry) => !entry.automaticServiceStart && !entry.startsServices)).toBe(true);
    expect(ledger.entries.map((entry) => entry.code)).toContain("INTAKE_MINI_KV_SHARDJSON_ENTRY");
    expect(ledger.entries.map((entry) => entry.sourceEvidenceRecordCode))
      .toContain("EVIDENCE_GO_NO_GO_RECEIPT_RECORD");
  });

  it("fails closed when the source evidence packet is blocked", () => {
    const evidencePacket = evidencePacketFromSourceMatrix(false);
    const ledger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger(evidencePacket);

    expect(ledger).toMatchObject({
      ledgerState: "blocked",
      readyForManualEvidenceIntake: false,
      passedGateCount: 18,
      blockedReasonCodes: ["SOURCE_EVIDENCE_PACKET_NOT_READY"],
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
    });
  });

  it("renders stable evidence intake ledger markdown for archive review", () => {
    const ledger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger(
      evidencePacketFromSourceMatrix(true),
    );
    const markdown = renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerMarkdown(ledger);

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window evidence intake ledger");
    expect(markdown).toContain("- Entry count: 20");
    expect(markdown).toContain("- Imports runtime payload: false");
    expect(markdown).toContain("- Accepts synthetic evidence: false");
    expect(markdown).toContain("### 1. Node v792 INTAKE_SOURCE_WORKSHEET_REVIEW");
    expect(markdown).toContain("### 20. Node v811 INTAKE_LEDGER_CLOSEOUT_ENTRY");
    expect(markdown).toContain("- Capture input state: awaiting-manual-entry");
  });

  it("includes the evidence intake ledger in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowEvidenceIntakeLedger).toMatchObject({
      ledgerVersion: "Node v811",
      inputEvidencePacketVersion: "Node v791",
      entryCount: 20,
      readyForManualEvidenceIntake: true,
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

function evidencePacketFromSourceMatrix(ready: boolean) {
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

  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket(commandWorksheet);
}
