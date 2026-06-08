import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview compared package evidence intake", () => {
  it("builds ten real compared package evidence intake slots and guards from acceptance precheck", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeFixture(
        true,
      );

    expect(intake).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331",
      sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321",
      artifactDraftTextPackageComparedPackageEvidenceIntakeState:
        "ready-for-manual-compared-package-evidence-intake-contract",
      readyForManualComparedPackageEvidenceIntakeContract: true,
      readyForRealComparedPackageEvidenceIntake: true,
      readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck: true,
      readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      slotCount: 10,
      guardCount: 10,
      sourceAcceptanceCheckpointCount: 10,
      sourceAcceptanceGuardCount: 10,
      readySlotCount: 10,
      readyGuardCount: 10,
      sourcePrecheckEvidenceSlotCount: 1,
      manualSubmissionReferenceEvidenceSlotCount: 1,
      offlineComparisonResultEvidenceSlotCount: 1,
      identityBindingEvidenceSlotCount: 1,
      digestMatchSummaryEvidenceSlotCount: 1,
      signatureEnvelopeObservationEvidenceSlotCount: 1,
      sourceEvidenceHandleEvidenceSlotCount: 1,
      policyExecutionLockEvidenceSlotCount: 1,
      approvalGrantSeparationEvidenceSlotCount: 1,
      archiveCloseoutEvidenceSlotCount: 1,
      expectedRealComparedPackageEvidenceSlotCount: 10,
      realComparedPackageEvidenceCount: 0,
      manualComparedPackageEvidenceMaterializedCount: 0,
      syntheticComparedPackageEvidenceCount: 0,
      actualDraftTextPackageAcceptanceEvidenceCount: 0,
      submittedDraftTextPackageCount: 0,
      comparedDraftTextPackageCount: 0,
      acceptedDraftTextPackageCount: 0,
      rejectedDraftTextPackageCount: 0,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 45,
      passedGateCount: 45,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(intake.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v1322",
      "Node v1323",
      "Node v1324",
      "Node v1325",
      "Node v1326",
      "Node v1327",
      "Node v1328",
      "Node v1329",
      "Node v1330",
      "Node v1331",
    ]);
    expect(intake.guards.map((guard) => guard.nodeVersion))
      .toEqual(intake.slots.map((slot) => slot.nodeVersion));
    expect(intake.slots.every((slot) => slot.readyForManualComparedPackageEvidenceIntakeSlot)).toBe(true);
    expect(intake.slots.every((slot) => !slot.realComparedPackageEvidencePresent)).toBe(true);
    expect(intake.slots.every((slot) => !slot.syntheticComparedPackageEvidencePresent)).toBe(true);
    expect(intake.guards.every((guard) => guard.rejectsMissingRealComparedPackageEvidence)).toBe(true);
    expect(intake.guards.every((guard) => guard.rejectsSyntheticComparedPackageEvidence)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksComparedPackageAcceptance)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
  });

  it("fails closed when the source acceptance precheck is blocked", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeFixture(
        false,
      );

    expect(intake).toMatchObject({
      artifactDraftTextPackageComparedPackageEvidenceIntakeState: "blocked",
      readyForManualComparedPackageEvidenceIntakeContract: false,
      readyForRealComparedPackageEvidenceIntake: false,
      slotCount: 10,
      guardCount: 10,
      readySlotCount: 0,
      readyGuardCount: 0,
      realComparedPackageEvidenceCount: 0,
      syntheticComparedPackageEvidenceCount: 0,
      actualDraftTextPackageAcceptanceEvidenceCount: 0,
      acceptedDraftTextPackageCount: 0,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(intake.passedGateCount).toBeLessThan(intake.gateCount);
    expect(intake.blockedReasonCodes).toContain("SOURCE_COMPARISON_ACCEPTANCE_PRECHECK_NOT_READY");
    expect(intake.blockedReasonCodes).toContain("COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS_BLOCKED");
    expect(intake.blockedReasonCodes).toContain("COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_BLOCKED");
    expect(intake.slots.every((slot) => !slot.readyForManualComparedPackageEvidenceIntakeSlot)).toBe(true);
    expect(intake.guards.every((guard) => !guard.readyForManualComparedPackageEvidenceIntakeGuard)).toBe(true);
  });

  it("renders stable compared package evidence intake markdown", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeMarkdown(
        intake,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared package evidence intake");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package compared package evidence intake version: Node v1331");
    expect(markdown)
      .toContain("- Source signed approval capture artifact draft text package comparison acceptance precheck version: Node v1321");
    expect(markdown)
      .toContain("- Artifact draft text package compared package evidence intake state: ready-for-manual-compared-package-evidence-intake-contract");
    expect(markdown).toContain("- Real compared package evidence count: 0");
    expect(markdown).toContain("- Synthetic compared package evidence count: 0");
    expect(markdown).toContain("- Accepted draft text package count: 0");
    expect(markdown)
      .toContain("### 1. Node v1322 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_PRECHECK_SLOT");
    expect(markdown)
      .toContain("### 10. Node v1331 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_CLOSEOUT_SLOT");
    expect(markdown)
      .toContain("- Rejects missing real compared package evidence: true");
    expect(markdown).toContain("- Rejects synthetic compared package evidence: true");
    expect(markdown).toContain("- Blocks compared package acceptance: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes compared package evidence intake in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331",
        sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321",
        slotCount: 10,
        guardCount: 10,
        sourceAcceptanceCheckpointCount: 10,
        sourceAcceptanceGuardCount: 10,
        readyForManualComparedPackageEvidenceIntakeContract: true,
        readyForRealComparedPackageEvidenceIntake: true,
        realComparedPackageEvidenceCount: 0,
        manualComparedPackageEvidenceMaterializedCount: 0,
        syntheticComparedPackageEvidenceCount: 0,
        actualDraftTextPackageAcceptanceEvidenceCount: 0,
        acceptedDraftTextPackageCount: 0,
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

  it("keeps compared package evidence intake ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake)
        .toMatchObject({
          signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331",
          readyForManualComparedPackageEvidenceIntakeContract: true,
          slotCount: 10,
          guardCount: 10,
          realComparedPackageEvidenceCount: 0,
          acceptedDraftTextPackageCount: 0,
          approvalGrantPresent: false,
          executionAllowed: false,
          writeRoutingAllowed: false,
          startsServices: false,
          mutatesSiblingState: false,
        });
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });
});
