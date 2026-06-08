import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package intake", () => {
  it("builds twenty-five read-only text package intake fields and guards from instruction preflight", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFixture(
        true,
      );

    expect(intake).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
      sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion: "Node v1211",
      artifactDraftTextPackageIntakeState:
        "ready-for-signed-approval-artifact-draft-text-package-intake",
      readyForSignedApprovalArtifactDraftTextPackageIntake: true,
      readyForHumanSignedApprovalDraftTextPackageSubmission: true,
      readyForHumanSignedApprovalDraftInstructionAuthoring: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      intakeFieldCount: 25,
      intakeGuardCount: 25,
      identityIntakeFieldCount: 4,
      digestBindingIntakeFieldCount: 4,
      signatureEnvelopeIntakeFieldCount: 3,
      sourceEvidenceIntakeFieldCount: 3,
      valueBindingIntakeFieldCount: 2,
      policyIntakeFieldCount: 3,
      executionLockIntakeFieldCount: 5,
      archiveCloseoutIntakeFieldCount: 1,
      digestModeIntakeFieldCount: 5,
      readyIntakeFieldCount: 25,
      readyIntakeGuardCount: 25,
      digestBindingIntakeGuardCount: 4,
      signatureEnvelopeIntakeGuardCount: 3,
      policyIntakeGuardCount: 3,
      executionLockIntakeGuardCount: 5,
      archiveCloseoutIntakeGuardCount: 1,
      expectedDraftTextPackageFieldCount: 25,
      actualDraftTextPackageFieldCount: 0,
      acceptedDraftTextPackageCount: 0,
      draftInstructionMaterializedCount: 0,
      draftArtifactCreated: false,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 53,
      passedGateCount: 53,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalCaptureArtifactDraftReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalCaptureArtifactDraftPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.signedApprovalCaptureArtifactDraftTextPackageIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(intake.fields.map((field) => field.nodeVersion)).toEqual([
      "Node v1212",
      "Node v1213",
      "Node v1214",
      "Node v1215",
      "Node v1216",
      "Node v1217",
      "Node v1218",
      "Node v1219",
      "Node v1220",
      "Node v1221",
      "Node v1222",
      "Node v1223",
      "Node v1224",
      "Node v1225",
      "Node v1226",
      "Node v1227",
      "Node v1228",
      "Node v1229",
      "Node v1230",
      "Node v1231",
      "Node v1232",
      "Node v1233",
      "Node v1234",
      "Node v1235",
      "Node v1236",
    ]);
    expect(intake.guards.map((guard) => guard.nodeVersion))
      .toEqual(intake.fields.map((field) => field.nodeVersion));
    expect(intake.fields.every((field) => field.sourceInstructionSlotReady)).toBe(true);
    expect(intake.fields.every((field) => field.sourceInstructionGuardReady)).toBe(true);
    expect(intake.fields.every((field) => field.sourceInstructionSlotReadOnly)).toBe(true);
    expect(intake.fields.every((field) => field.sourceInstructionGuardReadOnly)).toBe(true);
    expect(intake.fields.every((field) => !field.sourceInstructionMaterialized)).toBe(true);
    expect(intake.fields.every((field) => !field.sourceDraftArtifactCreated)).toBe(true);
    expect(intake.fields.every((field) => !field.sourceSignedDraftTextPresent)).toBe(true);
    expect(intake.fields.every((field) => !field.sourceDraftSignaturePayloadPresent)).toBe(true);
    expect(intake.fields.every((field) => !field.sourceApprovalGrantPresent)).toBe(true);
    expect(intake.fields.every((field) => field.readyForHumanSignedApprovalDraftTextPackageIntakeField))
      .toBe(true);
    expect(intake.fields.every((field) => !field.draftTextPackageAccepted)).toBe(true);
    expect(intake.guards.every((guard) => guard.sourceIntakeFieldReady)).toBe(true);
    expect(intake.guards.every((guard) => guard.rejectsMissingIntakeField)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksDraftTextPackageAcceptance)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksSignedDraftText)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksSignaturePayload)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksApprovalGrant)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
    expect(intake.fields.map((field) => field.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_DETACHED_SIGNATURE_FIELD");
    expect(intake.fields.map((field) => field.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_SIBLING_NON_MUTATION_FIELD");
    expect(intake.guards.map((guard) => guard.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_CLOSEOUT_FIELD_GUARD");
  });

  it("fails closed when the source instruction preflight is blocked", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFixture(
        false,
      );

    expect(intake).toMatchObject({
      artifactDraftTextPackageIntakeState: "blocked",
      readyForSignedApprovalArtifactDraftTextPackageIntake: false,
      readyForHumanSignedApprovalDraftTextPackageSubmission: false,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      intakeFieldCount: 25,
      intakeGuardCount: 25,
      readyIntakeFieldCount: 0,
      readyIntakeGuardCount: 0,
      actualDraftTextPackageFieldCount: 0,
      acceptedDraftTextPackageCount: 0,
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
    expect(intake.passedGateCount).toBeLessThan(intake.gateCount);
    expect(intake.blockedReasonCodes).toEqual([
      "SOURCE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INSTRUCTION_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INSTRUCTION_GUARDS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_GUARDS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_DIGEST_FIELDS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_NOT_READY_OR_ACCEPTED",
    ]);
    expect(intake.fields.every((field) => !field.readyForHumanSignedApprovalDraftTextPackageIntakeField))
      .toBe(true);
    expect(intake.guards.every((guard) => !guard.readyForHumanSignedApprovalDraftTextPackageIntakeGuard))
      .toBe(true);
  });

  it("renders stable signed approval capture artifact draft text package intake markdown", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeMarkdown(
        intake,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package intake");
    expect(markdown).toContain("- Signed approval capture artifact draft text package intake version: Node v1236");
    expect(markdown).toContain("- Source signed approval capture artifact draft instruction preflight version: Node v1211");
    expect(markdown)
      .toContain("- Artifact draft text package intake state: ready-for-signed-approval-artifact-draft-text-package-intake");
    expect(markdown).toContain("- Ready for human signed approval draft text package submission: true");
    expect(markdown).toContain("- Ready for signed approval artifact draft: false");
    expect(markdown).toContain("- Intake field count: 25");
    expect(markdown).toContain("- Intake guard count: 25");
    expect(markdown).toContain("- Actual draft text package field count: 0");
    expect(markdown).toContain("- Accepted draft text package count: 0");
    expect(markdown)
      .toContain("### 1. Node v1212 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_REQUEST_MANIFEST_FIELD");
    expect(markdown)
      .toContain("### 25. Node v1236 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_CLOSEOUT_FIELD");
    expect(markdown)
      .toContain("### 25. Node v1236 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_CLOSEOUT_FIELD_GUARD");
    expect(markdown).toContain("- Blocks draft text package acceptance: true");
    expect(markdown).toContain("- Blocks approval grant: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft text package intake in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
        sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion: "Node v1211",
        intakeFieldCount: 25,
        intakeGuardCount: 25,
        readyForSignedApprovalArtifactDraftTextPackageIntake: true,
        readyForHumanSignedApprovalDraftTextPackageSubmission: true,
        readyForHumanSignedApprovalDraftInstructionAuthoring: true,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        actualDraftTextPackageFieldCount: 0,
        acceptedDraftTextPackageCount: 0,
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
      const instructionPreflight =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightFixture(
          true,
        );
      const intake =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake(
          instructionPreflight,
        );

      expect(instructionPreflight.readyForSignedApprovalArtifactDraftInstructionPreflight).toBe(true);
      expect(instructionPreflight.instructionSlotCount).toBe(25);
      expect(instructionPreflight.instructionGuardCount).toBe(25);
      expect(intake.intakeFieldCount).toBe(25);
      expect(intake.intakeGuardCount).toBe(25);
      expect(intake.readyIntakeFieldCount).toBe(25);
      expect(intake.readyIntakeGuardCount).toBe(25);
      expect(intake.readyForSignedApprovalArtifactDraftTextPackageIntake).toBe(true);
      expect(intake.readyForSignedApprovalArtifactDraft).toBe(false);
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
