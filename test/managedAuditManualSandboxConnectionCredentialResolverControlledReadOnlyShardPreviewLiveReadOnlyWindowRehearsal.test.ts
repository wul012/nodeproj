import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewExecutionGapMatrix,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalRenderer.js";
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

describe("controlled read-only shard preview live read-only window rehearsal packet", () => {
  it("builds a twenty-version manual rehearsal packet from the runbook package", () => {
    const packet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(
      readyRunbookPackage(),
    );

    expect(packet).toMatchObject({
      packetVersion: "Node v751",
      inputRunbookPackageVersion: "Node v731",
      packetState: "ready-for-manual-live-read-only-rehearsal",
      readyForManualLiveReadOnlyRehearsal: true,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      stepCount: 20,
      ownerCount: 4,
      evidenceSlotCount: 20,
      cleanupRequiredStepCount: 2,
      failureClassCount: 20,
      gateCount: 12,
      passedGateCount: 12,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(packet.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(packet.steps.map((step) => step.nodeVersion)).toEqual([
      "Node v732",
      "Node v733",
      "Node v734",
      "Node v735",
      "Node v736",
      "Node v737",
      "Node v738",
      "Node v739",
      "Node v740",
      "Node v741",
      "Node v742",
      "Node v743",
      "Node v744",
      "Node v745",
      "Node v746",
      "Node v747",
      "Node v748",
      "Node v749",
      "Node v750",
      "Node v751",
    ]);
    expect(packet.steps.every((step) => step.readOnly && !step.writesAllowed)).toBe(true);
    expect(packet.steps.every((step) => !step.automaticServiceStart && !step.startsServices)).toBe(true);
    expect(packet.steps.map((step) => step.code)).toContain("REHEARSAL_CLEANUP_SLOT_DRY_RUN");
    expect(packet.steps.map((step) => step.sourceRunbookSectionCode)).toContain("GO_NO_GO_DECISION_PACKET");
  });

  it("fails closed when the source runbook package is blocked", () => {
    const packet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(
      blockedRunbookPackage(),
    );

    expect(packet).toMatchObject({
      packetState: "blocked",
      readyForManualLiveReadOnlyRehearsal: false,
      passedGateCount: 11,
      blockedReasonCodes: ["SOURCE_RUNBOOK_PACKAGE_NOT_READY"],
    });
  });

  it("renders stable rehearsal markdown for archive review", () => {
    const packet = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket(
      readyRunbookPackage(),
    );
    const markdown = renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketMarkdown(packet);

    expect(markdown).toContain("# Controlled read-only shard preview live read-only window rehearsal packet");
    expect(markdown).toContain("- Step count: 20");
    expect(markdown).toContain("### 1. Node v732 REHEARSAL_SOURCE_PACKAGE_PRECHECK");
    expect(markdown).toContain("### 20. Node v751 REHEARSAL_PACKET_CLOSEOUT");
    expect(markdown).toContain("- Ready for live execution: false");
  });

  it("includes the rehearsal packet in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowRehearsalPacket).toMatchObject({
      packetVersion: "Node v751",
      stepCount: 20,
      readyForManualLiveReadOnlyRehearsal: true,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
    });
  });
});

function readyRunbookPackage() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(
    stageLedgerFromSourceMatrix(true),
  );
}

function blockedRunbookPackage() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(
    stageLedgerFromSourceMatrix(false),
  );
}

function stageLedgerFromSourceMatrix(ready: boolean) {
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

  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(verification);
}
