import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview compared evidence candidate intake preflight", () => {
  it("builds ten intake slots and guards while waiting for a real candidate document", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeFixture(
        true,
      );

    expect(intake).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: "Node v1371",
      sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361",
      artifactDraftTextPackageComparedEvidenceCandidateIntakeState:
        "waiting-for-real-compared-package-evidence-candidate-document",
      readyForComparedEvidenceCandidateIntakePreflightContract: true,
      readyForRealComparedPackageEvidenceCandidateDocumentIntake: false,
      readyForComparedEvidenceCandidateBlueprintContract: true,
      readyForCandidatePayloadImport: false,
      readyForCandidateEvaluation: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      intakeSlotCount: 10,
      intakeGuardCount: 10,
      sourceBlueprintSectionCount: 10,
      sourceBlueprintBlockerCount: 10,
      readyIntakeSlotCount: 10,
      readyIntakeGuardCount: 10,
      requiredCandidateFieldCount: 20,
      sourceCandidateFieldCount: 20,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      stagedCandidateDocumentCount: 0,
      importedCandidatePayloadCount: 0,
      evaluatedCandidatePayloadCount: 0,
      acceptedCandidatePayloadCount: 0,
      rejectedCandidatePayloadCount: 0,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 36,
      passedGateCount: 36,
      blockedReasonCodes: [],
      candidateDocumentIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(intake.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v1362",
      "Node v1363",
      "Node v1364",
      "Node v1365",
      "Node v1366",
      "Node v1367",
      "Node v1368",
      "Node v1369",
      "Node v1370",
      "Node v1371",
    ]);
    expect(intake.guards.map((guard) => guard.nodeVersion))
      .toEqual(intake.slots.map((slot) => slot.nodeVersion));
    expect(intake.slots.flatMap((slot) => slot.candidateFields)).toHaveLength(20);
    expect(new Set(intake.slots.flatMap((slot) => slot.candidateFields)).size).toBe(20);
    expect(intake.slots.every((slot) => slot.readyForComparedEvidenceCandidateIntakeSlot)).toBe(true);
    expect(intake.slots.every((slot) => slot.requiresRealCandidateDocument)).toBe(true);
    expect(intake.guards.every((guard) => guard.rejectsMissingCandidateDocument)).toBe(true);
    expect(intake.guards.every((guard) => guard.rejectsSyntheticCandidateDocument)).toBe(true);
    expect(intake.guards.every((guard) => guard.quarantinesUnreviewedCandidateDocument)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksCandidatePayloadImport)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksCandidateEvaluation)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksCandidateAcceptance)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(intake.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
  });

  it("fails closed when the compared evidence candidate blueprint is blocked", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeFixture(
        false,
      );

    expect(intake).toMatchObject({
      artifactDraftTextPackageComparedEvidenceCandidateIntakeState: "blocked",
      readyForComparedEvidenceCandidateIntakePreflightContract: false,
      readyForComparedEvidenceCandidateBlueprintContract: false,
      intakeSlotCount: 10,
      intakeGuardCount: 10,
      readyIntakeSlotCount: 0,
      readyIntakeGuardCount: 0,
      requiredCandidateFieldCount: 20,
      sourceCandidateFieldCount: 20,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      candidateDocumentIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(intake.passedGateCount).toBeLessThan(intake.gateCount);
    expect(intake.blockedReasonCodes)
      .toContain("COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_BLUEPRINT_NOT_READY");
    expect(intake.blockedReasonCodes)
      .toContain("COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS_BLOCKED");
    expect(intake.blockedReasonCodes)
      .toContain("COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_BLOCKED");
  });

  it("renders stable compared evidence candidate intake markdown", () => {
    const intake =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeMarkdown(
        intake,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared evidence candidate intake");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package compared evidence candidate intake version: Node v1371");
    expect(markdown)
      .toContain("- Artifact draft text package compared evidence candidate intake state: waiting-for-real-compared-package-evidence-candidate-document");
    expect(markdown).toContain("- Intake slot count: 10");
    expect(markdown).toContain("- Required candidate field count: 20");
    expect(markdown).toContain("- Candidate evaluation allowed: false");
    expect(markdown)
      .toContain("### 1. Node v1362 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_LINEAGE_SLOT");
    expect(markdown)
      .toContain("### 10. Node v1371 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_ARCHIVE_CLOSEOUT_SLOT");
    expect(markdown).toContain("- Rejects missing candidate document: true");
    expect(markdown).toContain("- Quarantines unreviewed candidate document: true");
    expect(markdown).toContain("- Blocks candidate payload import: true");
    expect(markdown).toContain("- Blocks candidate evaluation: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes compared evidence candidate intake preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: "Node v1371",
        sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361",
        intakeSlotCount: 10,
        intakeGuardCount: 10,
        sourceBlueprintSectionCount: 10,
        sourceBlueprintBlockerCount: 10,
        requiredCandidateFieldCount: 20,
        readyForComparedEvidenceCandidateIntakePreflightContract: true,
        readyForRealComparedPackageEvidenceCandidateDocumentIntake: false,
        realCandidateDocumentCount: 0,
        syntheticCandidateDocumentCount: 0,
        candidateDocumentIntakeAllowed: false,
        candidatePayloadImportAllowed: false,
        candidateEvaluationAllowed: false,
        executionAllowed: false,
        writeRoutingAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
        importsRuntimePayload: false,
        acceptsSyntheticEvidence: false,
        containsSecretValue: false,
      });
  });

  it("keeps candidate intake preflight ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake)
        .toMatchObject({
          signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: "Node v1371",
          readyForComparedEvidenceCandidateIntakePreflightContract: true,
          readyForRealComparedPackageEvidenceCandidateDocumentIntake: false,
          intakeSlotCount: 10,
          intakeGuardCount: 10,
          requiredCandidateFieldCount: 20,
          realCandidateDocumentCount: 0,
          candidateDocumentIntakeAllowed: false,
          candidatePayloadImportAllowed: false,
          candidateEvaluationAllowed: false,
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
