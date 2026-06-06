import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";
import {
  controlledReadOnlyShardPreviewManualEvidenceEntryWorksheetFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";

describe("controlled read-only shard preview live read-only window operator evidence import preflight", () => {
  it("builds a twenty-five-version operator evidence import preflight from the blank worksheet", () => {
    const worksheet = controlledReadOnlyShardPreviewManualEvidenceEntryWorksheetFixture(true);
    const preflight =
      createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight(worksheet);

    expect(preflight).toMatchObject({
      preflightVersion: "Node v886",
      sourceWorksheetVersion: "Node v861",
      preflightState: "ready-for-operator-evidence-import-preflight",
      readyForOperatorEvidenceImportPreflight: true,
      readyForManualEvidenceEntry: false,
      readyForEvidenceImport: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      preflightSlotCount: 25,
      ledgerImportPreflightSlotCount: 19,
      targetImportPreflightSlotCount: 3,
      policyArchiveImportPreflightSlotCount: 1,
      maintenanceImportPreflightSlotCount: 1,
      closeoutImportPreflightSlotCount: 1,
      scopeCount: 7,
      importFieldCount: 51,
      gateCount: 24,
      passedGateCount: 24,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.importPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v862",
      "Node v863",
      "Node v864",
      "Node v865",
      "Node v866",
      "Node v867",
      "Node v868",
      "Node v869",
      "Node v870",
      "Node v871",
      "Node v872",
      "Node v873",
      "Node v874",
      "Node v875",
      "Node v876",
      "Node v877",
      "Node v878",
      "Node v879",
      "Node v880",
      "Node v881",
      "Node v882",
      "Node v883",
      "Node v884",
      "Node v885",
      "Node v886",
    ]);
    expect(preflight.slots.every((slot) => slot.importValueState === "not-imported")).toBe(true);
    expect(preflight.slots.every((slot) => slot.manualValueState === "not-entered")).toBe(true);
    expect(preflight.slots.every((slot) => !slot.readyForOperatorImport)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceWorksheetSlotBlank)).toBe(true);
    expect(preflight.slots.every((slot) => slot.importFieldNames.length > 0)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.importsRuntimePayload)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.acceptsSyntheticEvidence)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.containsSecretValue)).toBe(true);
    expect(preflight.slots.every((slot) => slot.readOnly && !slot.writesAllowed)).toBe(true);
    expect(preflight.slots.map((slot) => slot.code))
      .toContain("IMPORT_PREFLIGHT_CATALOG_MAINTENANCE_BOUNDARY");
    expect(preflight.slots.map((slot) => slot.code)).toContain("IMPORT_PREFLIGHT_CLOSEOUT");
    expect(preflight.slots.at(-1)?.validationRule)
      .toContain("Java and mini-kv can continue without waiting for Node");
  });

  it("fails closed when the source worksheet is blocked", () => {
    const worksheet = controlledReadOnlyShardPreviewManualEvidenceEntryWorksheetFixture(false);
    const preflight =
      createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight(worksheet);

    expect(preflight).toMatchObject({
      preflightState: "blocked",
      readyForOperatorEvidenceImportPreflight: false,
      readyForManualEvidenceEntry: false,
      readyForEvidenceImport: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      preflightSlotCount: 25,
      passedGateCount: 22,
      blockedReasonCodes: [
        "SOURCE_WORKSHEET_NOT_READY",
        "IMPORT_PREFLIGHT_SOURCE_WORKSHEET_CONTROLS_NOT_PASSED",
      ],
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
  });

  it("renders stable operator evidence import preflight markdown for archive review", () => {
    const preflight = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight(
      controlledReadOnlyShardPreviewManualEvidenceEntryWorksheetFixture(true),
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightMarkdown(preflight);

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence import preflight");
    expect(markdown).toContain("- Preflight slot count: 25");
    expect(markdown).toContain("- Ready for operator evidence import preflight: true");
    expect(markdown).toContain("- Ready for evidence import: false");
    expect(markdown).toContain("- Imports runtime payload: false");
    expect(markdown).toContain("### 1. Node v862 IMPORT_PREFLIGHT_SOURCE_PACKET_READY");
    expect(markdown).toContain("### 25. Node v886 IMPORT_PREFLIGHT_CLOSEOUT");
    expect(markdown).toContain("- Import value state: not-imported");
  });

  it("includes the operator evidence import preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceImportPreflight).toMatchObject({
      preflightVersion: "Node v886",
      sourceWorksheetVersion: "Node v861",
      preflightSlotCount: 25,
      readyForOperatorEvidenceImportPreflight: true,
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
