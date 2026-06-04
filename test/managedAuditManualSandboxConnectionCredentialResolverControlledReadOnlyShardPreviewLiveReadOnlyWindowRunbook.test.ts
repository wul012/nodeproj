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
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookRenderer.js";
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

describe("controlled read-only shard preview live read-only window runbook package", () => {
  it("builds a twenty-version operator runbook package from the stage ledger", () => {
    const runbook = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(
      readyStageLedger(),
    );

    expect(runbook).toMatchObject({
      packageVersion: "Node v731",
      inputStageLedgerVersion: "Node v711",
      packageState: "ready-for-operator-live-read-only-window",
      readyForOperatorLiveReadOnlyWindow: true,
      readyForProductionExecution: false,
      sectionCount: 20,
      ownerCount: 4,
      cleanupRequiredSectionCount: 2,
      gateCount: 10,
      passedGateCount: 10,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(runbook.packageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(runbook.sections.map((section) => section.nodeVersion)).toEqual([
      "Node v712",
      "Node v713",
      "Node v714",
      "Node v715",
      "Node v716",
      "Node v717",
      "Node v718",
      "Node v719",
      "Node v720",
      "Node v721",
      "Node v722",
      "Node v723",
      "Node v724",
      "Node v725",
      "Node v726",
      "Node v727",
      "Node v728",
      "Node v729",
      "Node v730",
      "Node v731",
    ]);
    expect(runbook.sections.every((section) => section.readOnly && !section.writesAllowed)).toBe(true);
    expect(runbook.sections.every((section) => !section.automaticServiceStart && !section.startsServices)).toBe(true);
    expect(runbook.sections.map((section) => section.code)).toContain("MINI_KV_COMMAND_ALLOWLIST");
    expect(runbook.sections.map((section) => section.verifiesStageCode)).toContain("WINDOW_RECEIPT_ARCHIVE");
  });

  it("fails closed when the source stage ledger is blocked", () => {
    const runbook = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(
      blockedStageLedger(),
    );

    expect(runbook).toMatchObject({
      packageState: "blocked",
      readyForOperatorLiveReadOnlyWindow: false,
      passedGateCount: 9,
      blockedReasonCodes: ["SOURCE_STAGE_LEDGER_NOT_READY"],
    });
  });

  it("renders stable runbook markdown for archive review", () => {
    const runbook = createControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage(
      readyStageLedger(),
    );
    const markdown = renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageMarkdown(runbook);

    expect(markdown).toContain("# Controlled read-only shard preview live read-only window runbook package");
    expect(markdown).toContain("- Section count: 20");
    expect(markdown).toContain("### 1. Node v712 OWNER_BINDING_CHECKLIST");
    expect(markdown).toContain("### 20. Node v731 RUNBOOK_PACKAGE_CLOSEOUT");
    expect(markdown).toContain("- Automatic service start: false");
  });

  it("includes the runbook package in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowRunbookPackage).toMatchObject({
      packageVersion: "Node v731",
      sectionCount: 20,
      readyForOperatorLiveReadOnlyWindow: true,
      readyForProductionExecution: false,
    });
  });
});

function readyStageLedger() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(
    candidateVerificationFromSourceMatrix(true),
  );
}

function blockedStageLedger() {
  return createControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger(
    candidateVerificationFromSourceMatrix(false),
  );
}

function candidateVerificationFromSourceMatrix(ready: boolean) {
  const matrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
    previewState: ready ? "controlled-read-only-shard-preview-ready" : "blocked",
    readyForControlledReadOnlyShardPreview: ready,
    executionAllowed: false,
    writeRoutingAllowed: false,
    loadRestoreCompactAllowed: false,
    sourceMatrix: ready ? readySourceMatrix() : blockedSourceMatrix(),
  });
  const candidate = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(matrix);

  return createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(candidate);
}
