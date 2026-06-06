import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";
import {
  controlledReadOnlyShardPreviewOperatorEvidenceImportPreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";

describe("controlled read-only shard preview live read-only window operator evidence value draft", () => {
  it("builds a twenty-five-version operator evidence value draft from the import preflight", () => {
    const valueDraft = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft(
      controlledReadOnlyShardPreviewOperatorEvidenceImportPreflightFixture(true),
    );

    expect(valueDraft).toMatchObject({
      valueDraftVersion: "Node v911",
      sourceImportPreflightVersion: "Node v886",
      valueDraftState: "ready-for-operator-evidence-value-draft",
      readyForOperatorEvidenceValueDraft: true,
      readyForManualEvidenceEntry: false,
      readyForEvidenceImport: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      valueDraftSlotCount: 25,
      ledgerValueDraftSlotCount: 19,
      targetValueDraftSlotCount: 3,
      policyArchiveValueDraftSlotCount: 1,
      maintenanceValueDraftSlotCount: 1,
      closeoutValueDraftSlotCount: 1,
      scopeCount: 7,
      draftFieldCount: 51,
      gateCount: 26,
      passedGateCount: 26,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(valueDraft.valueDraftDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(valueDraft.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v887",
      "Node v888",
      "Node v889",
      "Node v890",
      "Node v891",
      "Node v892",
      "Node v893",
      "Node v894",
      "Node v895",
      "Node v896",
      "Node v897",
      "Node v898",
      "Node v899",
      "Node v900",
      "Node v901",
      "Node v902",
      "Node v903",
      "Node v904",
      "Node v905",
      "Node v906",
      "Node v907",
      "Node v908",
      "Node v909",
      "Node v910",
      "Node v911",
    ]);
    expect(valueDraft.slots.every((slot) => slot.sourcePreflightSlotMapped)).toBe(true);
    expect(valueDraft.slots.every((slot) => slot.sourcePreflightSlotReady)).toBe(true);
    expect(valueDraft.slots.every((slot) => slot.sourcePreflightValueNotImported)).toBe(true);
    expect(valueDraft.slots.every((slot) => slot.draftValueState === "awaiting-operator-value")).toBe(true);
    expect(valueDraft.slots.every((slot) => slot.actualValueState === "not-supplied")).toBe(true);
    expect(valueDraft.slots.every((slot) => slot.readyForOperatorValueDraft)).toBe(true);
    expect(valueDraft.slots.every((slot) => !slot.readyForOperatorImport)).toBe(true);
    expect(valueDraft.slots.every((slot) => !slot.readyForEvidenceImport)).toBe(true);
    expect(valueDraft.slots.every((slot) => slot.draftFieldNames.length > 0)).toBe(true);
    expect(valueDraft.slots.every((slot) => !slot.importsRuntimePayload)).toBe(true);
    expect(valueDraft.slots.every((slot) => !slot.acceptsSyntheticEvidence)).toBe(true);
    expect(valueDraft.slots.every((slot) => !slot.containsSecretValue)).toBe(true);
    expect(valueDraft.slots.every((slot) => slot.readOnly && !slot.writesAllowed)).toBe(true);
    expect(valueDraft.slots.map((slot) => slot.code))
      .toContain("VALUE_DRAFT_CATALOG_MAINTENANCE_BOUNDARY");
    expect(valueDraft.slots.map((slot) => slot.code)).toContain("VALUE_DRAFT_CLOSEOUT");
    expect(valueDraft.slots.at(-1)?.operatorInstruction).toContain("recommended parallel");
  });

  it("fails closed when the source import preflight is blocked", () => {
    const valueDraft = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft(
      controlledReadOnlyShardPreviewOperatorEvidenceImportPreflightFixture(false),
    );

    expect(valueDraft).toMatchObject({
      valueDraftState: "blocked",
      readyForOperatorEvidenceValueDraft: false,
      readyForManualEvidenceEntry: false,
      readyForEvidenceImport: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      valueDraftSlotCount: 25,
      passedGateCount: 24,
      blockedReasonCodes: [
        "SOURCE_IMPORT_PREFLIGHT_NOT_READY",
        "VALUE_DRAFT_SOURCE_PREFLIGHT_CONTROLS_NOT_PASSED",
      ],
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(valueDraft.slots.every((slot) => slot.actualValueState === "not-supplied")).toBe(true);
  });

  it("renders stable operator evidence value draft markdown for archive review", () => {
    const valueDraft = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft(
      controlledReadOnlyShardPreviewOperatorEvidenceImportPreflightFixture(true),
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftMarkdown(valueDraft);

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value draft");
    expect(markdown).toContain("- Value draft slot count: 25");
    expect(markdown).toContain("- Ready for operator evidence value draft: true");
    expect(markdown).toContain("- Ready for evidence import: false");
    expect(markdown).toContain("- Imports runtime payload: false");
    expect(markdown).toContain("### 1. Node v887 VALUE_DRAFT_SOURCE_PACKET_READY");
    expect(markdown).toContain("### 25. Node v911 VALUE_DRAFT_CLOSEOUT");
    expect(markdown).toContain("- Draft value state: awaiting-operator-value");
    expect(markdown).toContain("- Actual value state: not-supplied");
  });

  it("includes the operator evidence value draft in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueDraft).toMatchObject({
      valueDraftVersion: "Node v911",
      sourceImportPreflightVersion: "Node v886",
      valueDraftSlotCount: 25,
      readyForOperatorEvidenceValueDraft: true,
      readyForManualEvidenceEntry: false,
      readyForEvidenceImport: false,
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
