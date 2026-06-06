import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply approval packet draft", () => {
  it("builds a twenty-five-version approval packet draft from Java v658 and mini-kv v610 evidence", () => {
    const draft = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft(
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeFixture(true),
    );

    expect(draft).toMatchObject({
      approvalPacketDraftVersion: "Node v986",
      sourceValueSupplyEnvelopeVersion: "Node v961",
      javaValueSupplyEvidenceVersion: "Java v658",
      miniKvValueSupplyEvidenceVersion: "mini-kv v610",
      draftState: "ready-for-value-supply-approval-packet-draft",
      readyForValueSupplyApprovalPacketDraft: true,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      draftSlotCount: 25,
      javaEvidenceSlotCount: 12,
      miniKvEvidenceSlotCount: 12,
      nodeValueSupplyEnvelopeSlotCount: 1,
      fileCount: 7,
      presentFileCount: 7,
      snippetCount: 25,
      matchedSnippetCount: 25,
      historicalFixtureResolvedFileCount: 6,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      operatorIdentityPresent: false,
      approvalTimestampPresent: false,
      gateCount: 42,
      passedGateCount: 42,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(draft.approvalPacketDraftDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(draft.approvalFieldCount).toBe(175);
    expect(draft.reviewRecordFieldCount).toBe(250);
    expect(draft.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v962",
      "Node v963",
      "Node v964",
      "Node v965",
      "Node v966",
      "Node v967",
      "Node v968",
      "Node v969",
      "Node v970",
      "Node v971",
      "Node v972",
      "Node v973",
      "Node v974",
      "Node v975",
      "Node v976",
      "Node v977",
      "Node v978",
      "Node v979",
      "Node v980",
      "Node v981",
      "Node v982",
      "Node v983",
      "Node v984",
      "Node v985",
      "Node v986",
    ]);
    expect(draft.slots.every((slot) => slot.sourceValueSupplyEnvelopeSlotReady)).toBe(true);
    expect(draft.slots.every((slot) => slot.evidenceFilePresent)).toBe(true);
    expect(draft.slots.every((slot) => slot.evidenceSnippetMatched)).toBe(true);
    expect(draft.slots.every((slot) => slot.readyForValueSupplyApprovalPacketDraft)).toBe(true);
    expect(draft.slots.every((slot) => slot.policy.approvalPolicy === "signed-human-approval-required")).toBe(true);
    expect(draft.slots.every((slot) => slot.policy.missingValuePolicy === "fail-closed")).toBe(true);
    expect(draft.slots.every((slot) => slot.policy.malformedValuePolicy === "reject")).toBe(true);
    expect(draft.slots.every((slot) => slot.policy.redactionPolicy === "redact-before-persist")).toBe(true);
    expect(draft.slots.every((slot) => slot.policy.provenancePolicy === "source-evidence-required")).toBe(true);
    expect(draft.slots.every((slot) => !slot.approvalCaptured)).toBe(true);
    expect(draft.slots.every((slot) => !slot.approvalGrantPresent)).toBe(true);
    expect(draft.slots.every((slot) => !slot.signedApprovalPresent)).toBe(true);
    expect(draft.slots.every((slot) => !slot.operatorIdentityPresent)).toBe(true);
    expect(draft.slots.every((slot) => !slot.approvalTimestampPresent)).toBe(true);
    expect(draft.slots.every((slot) => slot.suppliedValueCount === 0)).toBe(true);
    expect(draft.slots.every((slot) => slot.acceptedValueCount === 0)).toBe(true);
    expect(draft.slots.every((slot) => slot.importedValueCount === 0)).toBe(true);
    expect(draft.slots.every((slot) => !slot.readyForOperatorValueSupply)).toBe(true);
    expect(draft.slots.every((slot) => !slot.readyForOperatorValueSubmission)).toBe(true);
    expect(draft.slots.every((slot) => !slot.readyForEvidenceImport)).toBe(true);
    expect(draft.slots.every((slot) => !slot.importsRuntimePayload)).toBe(true);
    expect(draft.slots.every((slot) => !slot.acceptsSyntheticEvidence)).toBe(true);
    expect(draft.slots.every((slot) => !slot.containsSecretValue)).toBe(true);
    expect(draft.slots.every((slot) => slot.readOnly && !slot.writesAllowed)).toBe(true);
    expect(draft.slots.map((slot) => slot.code)).toContain("VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_COMMAND");
    expect(draft.slots.map((slot) => slot.code)).toContain("VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_CLOSEOUT");
  });

  it("fails closed when the source value supply envelope is blocked", () => {
    const draft = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft(
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeFixture(false),
    );

    expect(draft).toMatchObject({
      draftState: "blocked",
      readyForValueSupplyApprovalPacketDraft: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      draftSlotCount: 25,
      presentFileCount: 7,
      matchedSnippetCount: 25,
      passedGateCount: 39,
      blockedReasonCodes: [
        "SOURCE_VALUE_SUPPLY_ENVELOPE_NOT_READY",
        "APPROVAL_PACKET_SOURCE_ENVELOPE_SLOTS_NOT_READY",
        "APPROVAL_PACKET_DRAFT_SLOTS_NOT_READY_FOR_REVIEW",
      ],
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(draft.slots.every((slot) => !slot.readyForValueSupplyApprovalPacketDraft)).toBe(true);
  });

  it("renders stable approval packet draft markdown for archive review", () => {
    const draft = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft(
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeFixture(true),
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftMarkdown(
        draft,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply approval packet draft");
    expect(markdown).toContain("- Approval packet draft version: Node v986");
    expect(markdown).toContain("- Ready for value supply approval packet draft: true");
    expect(markdown).toContain("- Ready for operator value submission: false");
    expect(markdown).toContain("- Evidence files present: 7/7");
    expect(markdown).toContain("- Evidence snippets matched: 25/25");
    expect(markdown).toContain("- Approval captured: false");
    expect(markdown).toContain("- Approval grant present: false");
    expect(markdown).toContain("- Signed approval present: false");
    expect(markdown).toContain("java-v658-value-supply-closeout-service");
    expect(markdown).toContain("mini-kv-v610-value-supply-source");
    expect(markdown).toContain("### 1. Node v962 VALUE_SUPPLY_APPROVAL_PACKET_JAVA_CLOSEOUT_PROFILE");
    expect(markdown).toContain("### 25. Node v986 VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_CLOSEOUT");
    expect(markdown).toContain("- Approval policy: signed-human-approval-required");
    expect(markdown).toContain("- Missing value policy: fail-closed");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the approval packet draft in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft).toMatchObject({
      approvalPacketDraftVersion: "Node v986",
      sourceValueSupplyEnvelopeVersion: "Node v961",
      draftSlotCount: 25,
      readyForValueSupplyApprovalPacketDraft: true,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
  });

  it("uses frozen Java and mini-kv sibling fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const draft = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft(
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyEnvelopeFixture(true),
      );

      expect(draft.presentFileCount).toBe(7);
      expect(draft.matchedSnippetCount).toBe(25);
      expect(draft.historicalFixtureResolvedFileCount).toBe(6);
      expect(Object.values(draft.files)
        .filter((file) => file.path.startsWith("D:/javaproj/") || file.path.startsWith("D:/C/mini-kv/"))
        .every((file) =>
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
