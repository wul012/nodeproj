import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft instruction preflight", () => {
  it("builds twenty-five instruction slots and guards from authoring readiness", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightFixture(
        true,
      );

    expect(preflight).toMatchObject({
      signedApprovalCaptureArtifactDraftInstructionPreflightVersion: "Node v1211",
      sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion: "Node v1186",
      artifactDraftInstructionPreflightState:
        "ready-for-signed-approval-artifact-draft-instruction-preflight",
      readyForSignedApprovalArtifactDraftInstructionPreflight: true,
      readyForHumanSignedApprovalDraftInstructionAuthoring: true,
      readyForHumanSignedApprovalDraftArtifactAuthoring: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      instructionSlotCount: 25,
      instructionGuardCount: 25,
      identityInstructionSlotCount: 4,
      digestBindingInstructionSlotCount: 4,
      signatureEnvelopeInstructionSlotCount: 3,
      sourceEvidenceInstructionSlotCount: 3,
      valueBindingInstructionSlotCount: 2,
      policyInstructionSlotCount: 3,
      executionLockInstructionSlotCount: 5,
      archiveCloseoutInstructionSlotCount: 1,
      digestModeInstructionSlotCount: 5,
      readyInstructionSlotCount: 25,
      readyInstructionGuardCount: 25,
      digestBindingInstructionGuardCount: 4,
      signatureEnvelopeInstructionGuardCount: 3,
      policyInstructionGuardCount: 3,
      executionLockInstructionGuardCount: 5,
      archiveCloseoutInstructionGuardCount: 1,
      draftInstructionMaterializedCount: 0,
      draftArtifactCreated: false,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 52,
      passedGateCount: 52,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.signedApprovalCaptureArtifactDraftInstructionPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v1187",
      "Node v1188",
      "Node v1189",
      "Node v1190",
      "Node v1191",
      "Node v1192",
      "Node v1193",
      "Node v1194",
      "Node v1195",
      "Node v1196",
      "Node v1197",
      "Node v1198",
      "Node v1199",
      "Node v1200",
      "Node v1201",
      "Node v1202",
      "Node v1203",
      "Node v1204",
      "Node v1205",
      "Node v1206",
      "Node v1207",
      "Node v1208",
      "Node v1209",
      "Node v1210",
      "Node v1211",
    ]);
    expect(preflight.guards.map((guard) => guard.nodeVersion))
      .toEqual(preflight.slots.map((slot) => slot.nodeVersion));
    expect(preflight.slots.every((slot) => slot.sourceAuthoringRequirementReady)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceAuthoringBlockerReady)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceAuthoringRequirementReadOnly)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceAuthoringBlockerReadOnly)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.sourceAuthoringInstructionMaterialized)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.sourceDraftArtifactCreated)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.sourceSignedDraftTextPresent)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.sourceDraftSignaturePayloadPresent)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.sourceApprovalGrantPresent)).toBe(true);
    expect(preflight.slots.every((slot) => slot.readyForHumanSignedApprovalDraftInstructionSlot)).toBe(true);
    expect(preflight.guards.every((guard) => guard.sourceInstructionSlotReady)).toBe(true);
    expect(preflight.guards.every((guard) => guard.rejectsMissingInstructionSlot)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksInstructionMaterialization)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksDraftArtifactCreation)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksSignedDraftText)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksSignaturePayload)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksApprovalGrant)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
    expect(preflight.slots.map((slot) => slot.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_DETACHED_SIGNATURE_SLOT");
    expect(preflight.slots.map((slot) => slot.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SIBLING_NON_MUTATION_SLOT");
    expect(preflight.guards.map((guard) => guard.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_CLOSEOUT_SLOT_GUARD");
  });

  it("fails closed when the source authoring readiness is blocked", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightFixture(
        false,
      );

    expect(preflight).toMatchObject({
      artifactDraftInstructionPreflightState: "blocked",
      readyForSignedApprovalArtifactDraftInstructionPreflight: false,
      readyForHumanSignedApprovalDraftInstructionAuthoring: false,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      instructionSlotCount: 25,
      instructionGuardCount: 25,
      readyInstructionSlotCount: 0,
      readyInstructionGuardCount: 0,
      draftInstructionMaterializedCount: 0,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.passedGateCount).toBeLessThan(preflight.gateCount);
    expect(preflight.blockedReasonCodes).toEqual([
      "SOURCE_ARTIFACT_DRAFT_AUTHORING_READINESS_NOT_READY",
      "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_REQUIREMENTS_NOT_READY",
      "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_BLOCKERS_NOT_READY",
      "ARTIFACT_DRAFT_INSTRUCTION_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_INSTRUCTION_GUARDS_NOT_READY",
      "ARTIFACT_DRAFT_INSTRUCTION_DIGEST_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_INSTRUCTION_NOT_READY_OR_MATERIALIZED",
    ]);
    expect(preflight.slots.every((slot) => !slot.readyForHumanSignedApprovalDraftInstructionSlot)).toBe(true);
    expect(preflight.guards.every((guard) => !guard.readyForHumanSignedApprovalDraftInstructionGuard)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft instruction preflight markdown", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightMarkdown(
        preflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft instruction preflight");
    expect(markdown).toContain("- Signed approval capture artifact draft instruction preflight version: Node v1211");
    expect(markdown).toContain("- Source signed approval capture artifact draft authoring readiness version: Node v1186");
    expect(markdown)
      .toContain("- Artifact draft instruction preflight state: ready-for-signed-approval-artifact-draft-instruction-preflight");
    expect(markdown).toContain("- Ready for human signed approval draft instruction authoring: true");
    expect(markdown).toContain("- Ready for signed approval artifact draft: false");
    expect(markdown).toContain("- Instruction slot count: 25");
    expect(markdown).toContain("- Instruction guard count: 25");
    expect(markdown).toContain("- Signed draft text count: 0");
    expect(markdown)
      .toContain("### 1. Node v1187 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_REQUEST_MANIFEST_SLOT");
    expect(markdown)
      .toContain("### 25. Node v1211 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_CLOSEOUT_SLOT");
    expect(markdown)
      .toContain("### 25. Node v1211 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_CLOSEOUT_SLOT_GUARD");
    expect(markdown).toContain("- Blocks draft artifact creation: true");
    expect(markdown).toContain("- Blocks approval grant: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft instruction preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftInstructionPreflightVersion: "Node v1211",
        sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion: "Node v1186",
        instructionSlotCount: 25,
        instructionGuardCount: 25,
        readyForSignedApprovalArtifactDraftInstructionPreflight: true,
        readyForHumanSignedApprovalDraftInstructionAuthoring: true,
        readyForHumanSignedApprovalDraftArtifactAuthoring: true,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        draftInstructionMaterializedCount: 0,
        draftArtifactCreated: false,
        signedDraftTextCount: 0,
        draftSignaturePayloadCount: 0,
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

  it("uses frozen source evidence when historical sibling fixture fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const readiness =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessFixture(
          true,
        );
      const preflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight(
          readiness,
        );

      expect(readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness).toBe(true);
      expect(readiness.authoringRequirementCount).toBe(25);
      expect(readiness.authoringBlockerCount).toBe(25);
      expect(preflight.instructionSlotCount).toBe(25);
      expect(preflight.instructionGuardCount).toBe(25);
      expect(preflight.readyInstructionSlotCount).toBe(25);
      expect(preflight.readyInstructionGuardCount).toBe(25);
      expect(preflight.readyForSignedApprovalArtifactDraftInstructionPreflight).toBe(true);
      expect(preflight.readyForSignedApprovalArtifactDraft).toBe(false);
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
