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
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetRenderer.js";
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

describe("controlled read-only shard preview live read-only window command worksheet", () => {
  it("builds a twenty-version manual command worksheet from the rehearsal packet", () => {
    const worksheet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(
      readyRehearsalPacket(),
    );

    expect(worksheet).toMatchObject({
      worksheetVersion: "Node v771",
      inputRehearsalPacketVersion: "Node v751",
      worksheetState: "ready-for-manual-command-review",
      readyForManualCommandReview: true,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      stepCount: 20,
      commandTemplateCount: 20,
      targetCount: 5,
      evidenceSlotCount: 20,
      cleanupSlotCount: 2,
      failureClassCount: 20,
      gateCount: 14,
      passedGateCount: 14,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      containsSecretValue: false,
    });
    expect(worksheet.worksheetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(worksheet.steps.map((step) => step.nodeVersion)).toEqual([
      "Node v752",
      "Node v753",
      "Node v754",
      "Node v755",
      "Node v756",
      "Node v757",
      "Node v758",
      "Node v759",
      "Node v760",
      "Node v761",
      "Node v762",
      "Node v763",
      "Node v764",
      "Node v765",
      "Node v766",
      "Node v767",
      "Node v768",
      "Node v769",
      "Node v770",
      "Node v771",
    ]);
    expect(new Set(worksheet.steps.map((step) => step.target))).toEqual(new Set([
      "node-http",
      "java-http",
      "mini-kv-tcp",
      "archive",
      "policy",
    ]));
    expect(worksheet.steps.every((step) => step.readOnly && !step.writesAllowed)).toBe(true);
    expect(worksheet.steps.every((step) => !step.automaticServiceStart && !step.startsServices)).toBe(true);
    expect(worksheet.steps.every((step) => !step.containsSecretValue)).toBe(true);
    expect(worksheet.steps.map((step) => step.code)).toContain("WORKSHEET_MINI_KV_SHARDJSON_TEMPLATE");
    expect(worksheet.steps.map((step) => step.sourceRehearsalStepCode))
      .toContain("REHEARSAL_GO_NO_GO_SCOPE_CHECK");
  });

  it("fails closed when the source rehearsal packet is blocked", () => {
    const worksheet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(
      blockedRehearsalPacket(),
    );

    expect(worksheet).toMatchObject({
      worksheetState: "blocked",
      readyForManualCommandReview: false,
      passedGateCount: 13,
      blockedReasonCodes: ["SOURCE_REHEARSAL_PACKET_NOT_READY"],
    });
  });

  it("renders stable command worksheet markdown for archive review", () => {
    const worksheet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet(
      readyRehearsalPacket(),
    );
    const markdown = renderControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetMarkdown(worksheet);

    expect(markdown).toContain("# Controlled read-only shard preview live read-only window command worksheet");
    expect(markdown).toContain("- Step count: 20");
    expect(markdown).toContain("- Command template count: 20");
    expect(markdown).toContain("### 1. Node v752 WORKSHEET_SOURCE_REHEARSAL_PACKET_CHECK");
    expect(markdown).toContain("### 20. Node v771 WORKSHEET_CLOSEOUT_RECORD");
    expect(markdown).toContain("- Contains secret value: false");
    expect(markdown).toContain("- Automatic service start: false");
  });

  it("includes the command worksheet in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowCommandWorksheet).toMatchObject({
      worksheetVersion: "Node v771",
      stepCount: 20,
      commandTemplateCount: 20,
      readyForManualCommandReview: true,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      startsServices: false,
      containsSecretValue: false,
    });
  });
});

function readyRehearsalPacket() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(
    runbookPackageFromSourceMatrix(true),
  );
}

function blockedRehearsalPacket() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(
    runbookPackageFromSourceMatrix(false),
  );
}

function runbookPackageFromSourceMatrix(ready: boolean) {
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

  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(stageLedger);
}
