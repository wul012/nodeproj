import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceFreshSiblingIntakeFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply envelope", () => {
  it("builds a twenty-five-version value supply envelope from Java v633 and mini-kv v585 evidence", () => {
    const envelope = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope(
      controlledReadOnlyShardPreviewOperatorEvidenceFreshSiblingIntakeFixture(true),
    );

    expect(envelope).toMatchObject({
      valueSupplyEnvelopeVersion: "Node v961",
      sourceFreshSiblingIntakeVersion: "Node v936",
      javaValueDraftEvidenceVersion: "Java v633",
      javaValueDraftResponseVersion: "Java v632",
      miniKvValueDraftEvidenceVersion: "mini-kv v585",
      envelopeState: "ready-for-value-supply-envelope-review",
      readyForValueSupplyEnvelopeReview: true,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      envelopeSlotCount: 25,
      javaEvidenceSlotCount: 12,
      miniKvEvidenceSlotCount: 12,
      nodeFreshSiblingIntakeSlotCount: 1,
      fileCount: 7,
      presentFileCount: 7,
      snippetCount: 25,
      matchedSnippetCount: 25,
      historicalFixtureResolvedFileCount: 7,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      gateCount: 31,
      passedGateCount: 31,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(envelope.valueSupplyEnvelopeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(envelope.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v937",
      "Node v938",
      "Node v939",
      "Node v940",
      "Node v941",
      "Node v942",
      "Node v943",
      "Node v944",
      "Node v945",
      "Node v946",
      "Node v947",
      "Node v948",
      "Node v949",
      "Node v950",
      "Node v951",
      "Node v952",
      "Node v953",
      "Node v954",
      "Node v955",
      "Node v956",
      "Node v957",
      "Node v958",
      "Node v959",
      "Node v960",
      "Node v961",
    ]);
    expect(envelope.slots.every((slot) => slot.sourceFreshSiblingIntakeSlotReady)).toBe(true);
    expect(envelope.slots.every((slot) => slot.evidenceFilePresent)).toBe(true);
    expect(envelope.slots.every((slot) => slot.evidenceSnippetMatched)).toBe(true);
    expect(envelope.slots.every((slot) => slot.evidenceResolvedFromHistoricalFixture)).toBe(true);
    expect(envelope.slots.every((slot) => slot.readyForValueSupplyEnvelopeReview)).toBe(true);
    expect(envelope.slots.every((slot) => slot.envelopeValueState === "not-supplied")).toBe(true);
    expect(envelope.slots.every((slot) => slot.suppliedValueCount === 0)).toBe(true);
    expect(envelope.slots.every((slot) => slot.acceptedValueCount === 0)).toBe(true);
    expect(envelope.slots.every((slot) => slot.importedValueCount === 0)).toBe(true);
    expect(envelope.slots.every((slot) => !slot.readyForOperatorValueSupply)).toBe(true);
    expect(envelope.slots.every((slot) => !slot.readyForEvidenceImport)).toBe(true);
    expect(envelope.slots.every((slot) => !slot.valueSupplyAdapterEnabled)).toBe(true);
    expect(envelope.slots.every((slot) => !slot.importsRuntimePayload)).toBe(true);
    expect(envelope.slots.every((slot) => !slot.acceptsSyntheticEvidence)).toBe(true);
    expect(envelope.slots.every((slot) => !slot.containsSecretValue)).toBe(true);
    expect(envelope.slots.every((slot) => slot.readOnly && !slot.writesAllowed)).toBe(true);
    expect(envelope.slots.map((slot) => slot.code)).toContain("VALUE_SUPPLY_ENVELOPE_MINI_KV_COMMAND");
    expect(envelope.slots.map((slot) => slot.code)).toContain("VALUE_SUPPLY_ENVELOPE_CLOSEOUT");
  });

  it("fails closed when the source fresh sibling intake is blocked", () => {
    const envelope = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope(
      controlledReadOnlyShardPreviewOperatorEvidenceFreshSiblingIntakeFixture(false),
    );

    expect(envelope).toMatchObject({
      envelopeState: "blocked",
      readyForValueSupplyEnvelopeReview: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      envelopeSlotCount: 25,
      presentFileCount: 7,
      matchedSnippetCount: 25,
      passedGateCount: 28,
      blockedReasonCodes: [
        "SOURCE_FRESH_SIBLING_INTAKE_NOT_READY",
        "VALUE_SUPPLY_SOURCE_FRESH_SIBLING_SLOTS_NOT_READY",
        "VALUE_SUPPLY_ENVELOPE_SLOTS_NOT_READY_FOR_REVIEW",
      ],
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(envelope.slots.every((slot) => !slot.readyForValueSupplyEnvelopeReview)).toBe(true);
  });

  it("renders stable value supply envelope markdown for archive review", () => {
    const envelope = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope(
      controlledReadOnlyShardPreviewOperatorEvidenceFreshSiblingIntakeFixture(true),
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeMarkdown(envelope);

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply envelope");
    expect(markdown).toContain("- Value supply envelope version: Node v961");
    expect(markdown).toContain("- Ready for value supply envelope review: true");
    expect(markdown).toContain("- Ready for operator value supply: false");
    expect(markdown).toContain("- Evidence files present: 7/7");
    expect(markdown).toContain("- Evidence snippets matched: 25/25");
    expect(markdown).toContain("- Supplied value count: 0");
    expect(markdown).toContain("java-v633-value-draft-closeout-service");
    expect(markdown).toContain("mini-kv-v585-value-draft-source");
    expect(markdown).toContain("### 1. Node v937 VALUE_SUPPLY_ENVELOPE_JAVA_CLOSEOUT_PROFILE");
    expect(markdown).toContain("### 25. Node v961 VALUE_SUPPLY_ENVELOPE_CLOSEOUT");
    expect(markdown).toContain("- Value supply adapter enabled: false");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the value supply envelope in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope).toMatchObject({
      valueSupplyEnvelopeVersion: "Node v961",
      sourceFreshSiblingIntakeVersion: "Node v936",
      envelopeSlotCount: 25,
      readyForValueSupplyEnvelopeReview: true,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
  });

  it("uses frozen historical sibling fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const envelope = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope(
        controlledReadOnlyShardPreviewOperatorEvidenceFreshSiblingIntakeFixture(true),
      );

      expect(envelope.presentFileCount).toBe(7);
      expect(envelope.matchedSnippetCount).toBe(25);
      expect(envelope.historicalFixtureResolvedFileCount).toBe(7);
      expect(Object.values(envelope.files).every((file) =>
        file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    } finally {
      restoreEnv(previous);
    }
  });
});

function restoreEnv(previous: string | undefined): void {
  if (previous === undefined) {
    delete process.env[FORCE_FALLBACK_ENV];
    return;
  }

  process.env[FORCE_FALLBACK_ENV] = previous;
}
