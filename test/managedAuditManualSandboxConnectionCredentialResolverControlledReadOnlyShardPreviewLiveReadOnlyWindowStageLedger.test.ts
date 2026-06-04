import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewExecutionGapMatrix,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerRenderer.js";
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

describe("controlled read-only shard preview live read-only window stage ledger", () => {
  it("builds a twenty-version manual live read-only window stage ledger", () => {
    const ledger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(
      readyCandidateVerification(),
    );

    expect(ledger).toMatchObject({
      ledgerVersion: "Node v711",
      inputCandidateVerificationVersion: "Node v691",
      ledgerState: "ready-for-manual-live-read-only-window",
      readyForManualLiveReadOnlyWindow: true,
      readyForProductionExecution: false,
      stageCount: 20,
      readyStageCount: 20,
      blockedStageCount: 0,
      cleanupRequiredStageCount: 2,
      ownerCount: 4,
      gateCount: 8,
      passedGateCount: 8,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(ledger.ledgerDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(ledger.stages.map((stage) => stage.nodeVersion)).toEqual([
      "Node v692",
      "Node v693",
      "Node v694",
      "Node v695",
      "Node v696",
      "Node v697",
      "Node v698",
      "Node v699",
      "Node v700",
      "Node v701",
      "Node v702",
      "Node v703",
      "Node v704",
      "Node v705",
      "Node v706",
      "Node v707",
      "Node v708",
      "Node v709",
      "Node v710",
      "Node v711",
    ]);
    expect(ledger.stages.every((stage) => stage.readOnly && !stage.writesAllowed)).toBe(true);
    expect(ledger.stages.every((stage) => !stage.automaticServiceStart && !stage.startsServices)).toBe(true);
    expect(ledger.stages.map((stage) => stage.code)).toContain("MINI_KV_READ_TARGET_SPEC");
    expect(ledger.stages.at(-1)).toMatchObject({
      code: "TWENTY_VERSION_CLOSEOUT",
      category: "closeout",
      owner: "node",
    });
  });

  it("fails closed when the source candidate verification is blocked", () => {
    const ledger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(
      blockedCandidateVerification(),
    );

    expect(ledger).toMatchObject({
      ledgerState: "blocked",
      readyForManualLiveReadOnlyWindow: false,
      readyStageCount: 0,
      blockedStageCount: 20,
      passedGateCount: 7,
      blockedReasonCodes: ["SOURCE_CANDIDATE_VERIFICATION_NOT_READY"],
    });
    expect(ledger.stages.every((stage) => stage.state === "blocked")).toBe(true);
  });

  it("renders a stable stage ledger markdown", () => {
    const ledger = createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(
      readyCandidateVerification(),
    );
    const markdown = renderControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerMarkdown(ledger);

    expect(markdown).toContain("# Controlled read-only shard preview live read-only window stage ledger");
    expect(markdown).toContain("- Stage count: 20");
    expect(markdown).toContain("### 1. Node v692 WINDOW_OWNER_BINDING");
    expect(markdown).toContain("### 20. Node v711 TWENTY_VERSION_CLOSEOUT");
    expect(markdown).toContain("- Writes allowed: false");
  });

  it("includes the stage ledger in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowStageLedger).toMatchObject({
      ledgerVersion: "Node v711",
      stageCount: 20,
      readyStageCount: 20,
      readyForManualLiveReadOnlyWindow: true,
      readyForProductionExecution: false,
    });
  });
});

function readyCandidateVerification() {
  const matrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
    previewState: "controlled-read-only-shard-preview-ready",
    readyForControlledReadOnlyShardPreview: true,
    executionAllowed: false,
    writeRoutingAllowed: false,
    loadRestoreCompactAllowed: false,
    sourceMatrix: readySourceMatrix(),
  });
  const candidate = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(matrix);

  return createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(candidate);
}

function blockedCandidateVerification() {
  const matrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
    previewState: "blocked",
    readyForControlledReadOnlyShardPreview: false,
    executionAllowed: false,
    writeRoutingAllowed: false,
    loadRestoreCompactAllowed: false,
    sourceMatrix: blockedSourceMatrix(),
  });
  const candidate = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(matrix);

  return createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(candidate);
}
