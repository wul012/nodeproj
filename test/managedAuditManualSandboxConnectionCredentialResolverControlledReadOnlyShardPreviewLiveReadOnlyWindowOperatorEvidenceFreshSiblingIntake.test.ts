import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueDraftFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence fresh sibling intake", () => {
  it("builds a twenty-five-version fresh sibling intake from Java v608 and mini-kv v560 evidence", () => {
    const intake = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake(
      controlledReadOnlyShardPreviewOperatorEvidenceValueDraftFixture(true),
    );

    expect(intake).toMatchObject({
      freshSiblingIntakeVersion: "Node v936",
      sourceValueDraftVersion: "Node v911",
      javaEvidenceVersion: "Java v608",
      miniKvEvidenceVersion: "mini-kv v560",
      intakeState: "ready-for-fresh-sibling-evidence-intake",
      readyForFreshSiblingEvidenceIntake: true,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      intakeSlotCount: 25,
      javaEvidenceSlotCount: 12,
      miniKvEvidenceSlotCount: 12,
      nodeValueDraftAlignmentSlotCount: 1,
      crossProjectCloseoutSlotCount: 1,
      fileCount: 7,
      presentFileCount: 7,
      snippetCount: 25,
      matchedSnippetCount: 25,
      historicalFixtureResolvedFileCount: 7,
      gateCount: 25,
      passedGateCount: 25,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(intake.freshSiblingIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v912",
      "Node v913",
      "Node v914",
      "Node v915",
      "Node v916",
      "Node v917",
      "Node v918",
      "Node v919",
      "Node v920",
      "Node v921",
      "Node v922",
      "Node v923",
      "Node v924",
      "Node v925",
      "Node v926",
      "Node v927",
      "Node v928",
      "Node v929",
      "Node v930",
      "Node v931",
      "Node v932",
      "Node v933",
      "Node v934",
      "Node v935",
      "Node v936",
    ]);
    expect(intake.slots.every((slot) => slot.sourceValueDraftSlotReady)).toBe(true);
    expect(intake.slots.every((slot) => slot.evidenceFilePresent)).toBe(true);
    expect(intake.slots.every((slot) => slot.evidenceSnippetMatched)).toBe(true);
    expect(intake.slots.every((slot) => slot.evidenceResolvedFromHistoricalFixture)).toBe(true);
    expect(intake.slots.every((slot) => slot.readyForFreshSiblingEvidenceIntake)).toBe(true);
    expect(intake.slots.every((slot) => !slot.readyForOperatorValueSupply)).toBe(true);
    expect(intake.slots.every((slot) => !slot.readyForEvidenceImport)).toBe(true);
    expect(intake.slots.every((slot) => !slot.importsRuntimePayload)).toBe(true);
    expect(intake.slots.every((slot) => !slot.acceptsSyntheticEvidence)).toBe(true);
    expect(intake.slots.every((slot) => !slot.containsSecretValue)).toBe(true);
    expect(intake.slots.every((slot) => slot.readOnly && !slot.writesAllowed)).toBe(true);
    expect(intake.slots.map((slot) => slot.code)).toContain("FRESH_INTAKE_MINI_KV_COMMAND");
    expect(intake.slots.map((slot) => slot.code)).toContain("FRESH_INTAKE_CROSS_PROJECT_CLOSEOUT");
  });

  it("fails closed when the source value draft is blocked", () => {
    const intake = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake(
      controlledReadOnlyShardPreviewOperatorEvidenceValueDraftFixture(false),
    );

    expect(intake).toMatchObject({
      intakeState: "blocked",
      readyForFreshSiblingEvidenceIntake: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      intakeSlotCount: 25,
      presentFileCount: 7,
      matchedSnippetCount: 25,
      passedGateCount: 23,
      blockedReasonCodes: [
        "SOURCE_VALUE_DRAFT_NOT_READY",
        "FRESH_SIBLING_SOURCE_VALUE_DRAFT_SLOTS_NOT_READY",
      ],
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(intake.slots.every((slot) => !slot.readyForFreshSiblingEvidenceIntake)).toBe(true);
  });

  it("renders stable fresh sibling intake markdown for archive review", () => {
    const intake = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake(
      controlledReadOnlyShardPreviewOperatorEvidenceValueDraftFixture(true),
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeMarkdown(intake);

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence fresh sibling intake");
    expect(markdown).toContain("- Fresh sibling intake version: Node v936");
    expect(markdown).toContain("- Ready for fresh sibling evidence intake: true");
    expect(markdown).toContain("- Evidence files present: 7/7");
    expect(markdown).toContain("- Evidence snippets matched: 25/25");
    expect(markdown).toContain("java-v608-import-preflight-closeout-service");
    expect(markdown).toContain("mini-kv-v560-import-preflight-source");
    expect(markdown).toContain("### 1. Node v912 FRESH_INTAKE_JAVA_CLOSEOUT_PROFILE");
    expect(markdown).toContain("### 25. Node v936 FRESH_INTAKE_CROSS_PROJECT_CLOSEOUT");
    expect(markdown).toContain("- Ready for operator value supply: false");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the fresh sibling intake in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceFreshSiblingIntake).toMatchObject({
      freshSiblingIntakeVersion: "Node v936",
      sourceValueDraftVersion: "Node v911",
      intakeSlotCount: 25,
      readyForFreshSiblingEvidenceIntake: true,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
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
      const intake = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake(
        controlledReadOnlyShardPreviewOperatorEvidenceValueDraftFixture(true),
      );

      expect(intake.presentFileCount).toBe(7);
      expect(intake.matchedSnippetCount).toBe(25);
      expect(intake.historicalFixtureResolvedFileCount).toBe(7);
      expect(Object.values(intake.files).every((file) =>
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
