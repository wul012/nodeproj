import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckMarkdown,
} from "../src/services/controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview candidate document material submission precheck", () => {
  it("builds ten material submission checkpoints and validators without accepting material", () => {
    const precheck = controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckFixture(true);

    expect(precheck).toMatchObject({
      candidateDocumentMaterialSubmissionPrecheckVersion: "Node v1456",
      sourceCandidateDocumentMaterialRequestPackageVersion: "Node v1446",
      candidateDocumentMaterialSubmissionPrecheckState:
        "ready-for-reviewed-real-candidate-document-material-submission-precheck",
      readyForCandidateDocumentMaterialSubmissionPrecheck: true,
      readyForReviewedRealCandidateDocumentMaterialSubmission: false,
      readyForCandidateDocumentMaterialIntake: false,
      readyForCandidatePayloadImport: false,
      readyForCandidateEvaluation: false,
      readyForApprovalGrant: false,
      readyForSignedApproval: false,
      checkpointCount: 10,
      validatorCount: 10,
      sourceMaterialRequestItemCount: 25,
      sourceMaterialAcceptanceCheckCount: 25,
      readyCheckpointCount: 10,
      readyValidatorCount: 10,
      requiredMaterialFieldCount: 20,
      submissionMaterialFieldCount: 20,
      reviewedRealCandidateDocumentMaterialPresent: false,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      stagedCandidateDocumentCount: 0,
      importedCandidatePayloadCount: 0,
      evaluatedCandidatePayloadCount: 0,
      acceptedCandidatePayloadCount: 0,
      rejectedCandidatePayloadCount: 0,
      gateCount: 41,
      passedGateCount: 41,
      blockedReasonCodes: [],
      candidateDocumentSubmissionAllowed: false,
      candidateDocumentIntakeAllowed: false,
      candidateDocumentMaterialSubmissionAllowed: false,
      candidateDocumentMaterialIntakeAllowed: false,
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
    expect(precheck.sourceCandidateDocumentMaterialRequestPackageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.candidateDocumentMaterialSubmissionPrecheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.checkpoints).toHaveLength(10);
    expect(precheck.validators).toHaveLength(10);
    expect(precheck.checkpoints[0]).toMatchObject({
      nodeVersion: "Node v1447",
      code: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_MATERIAL_SOURCE_PACKAGE",
    });
    expect(precheck.checkpoints[9]).toMatchObject({
      nodeVersion: "Node v1456",
      code: "CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CLOSEOUT_ARCHIVE",
    });
    expect(precheck.validators.map((validator) => validator.nodeVersion))
      .toEqual(precheck.checkpoints.map((checkpoint) => checkpoint.nodeVersion));
    expect(new Set(precheck.checkpoints.flatMap((checkpoint) => checkpoint.sourceMaterialRequestItemCodes)).size)
      .toBe(25);
    expect(new Set(precheck.checkpoints.flatMap((checkpoint) => checkpoint.sourceMaterialAcceptanceCheckCodes)).size)
      .toBe(25);
    expect(new Set(precheck.checkpoints.flatMap((checkpoint) => checkpoint.materialFields)).size)
      .toBe(20);
    expect(precheck.checkpoints.every((checkpoint) =>
      checkpoint.readyForCandidateDocumentMaterialSubmissionCheckpoint))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.rejectsMissingMaterial))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.rejectsSyntheticMaterial))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.quarantinesUnreviewedMaterial))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksMaterialIntake))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksCandidatePayloadImport))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksCandidateEvaluation))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksWrites))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksSiblingMutation))
      .toBe(true);
  });

  it("fails closed when the source material request package is blocked", () => {
    const precheck = controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckFixture(false);

    expect(precheck).toMatchObject({
      candidateDocumentMaterialSubmissionPrecheckState: "blocked",
      readyForCandidateDocumentMaterialSubmissionPrecheck: false,
      sourceCandidateDocumentMaterialRequestPackageVersion: "Node v1446",
      checkpointCount: 10,
      validatorCount: 10,
      sourceMaterialRequestItemCount: 25,
      sourceMaterialAcceptanceCheckCount: 25,
      readyCheckpointCount: 0,
      readyValidatorCount: 0,
      requiredMaterialFieldCount: 20,
      submissionMaterialFieldCount: 20,
      reviewedRealCandidateDocumentMaterialPresent: false,
      realCandidateDocumentCount: 0,
      candidateDocumentMaterialSubmissionAllowed: false,
      candidateDocumentMaterialIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
    });
    expect(precheck.passedGateCount).toBeLessThan(precheck.gateCount);
    expect(precheck.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_REQUEST_PACKAGE_NOT_READY");
    expect(precheck.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CHECKPOINTS_BLOCKED");
    expect(precheck.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VALIDATORS_BLOCKED");
  });

  it("renders stable material submission precheck markdown", () => {
    const precheck = controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckFixture(true);
    const markdown = renderControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckMarkdown(precheck);

    expect(markdown)
      .toContain("# Controlled read-only shard preview candidate document material submission precheck");
    expect(markdown)
      .toContain("- Candidate document material submission precheck version: Node v1456");
    expect(markdown)
      .toContain("- Candidate document material submission precheck state: ready-for-reviewed-real-candidate-document-material-submission-precheck");
    expect(markdown).toContain("- Checkpoint count: 10");
    expect(markdown).toContain("- Validator count: 10");
    expect(markdown).toContain("- Source material request item count: 25");
    expect(markdown).toContain("- Source material acceptance check count: 25");
    expect(markdown).toContain("- Submission material field count: 20");
    expect(markdown).toContain("- Candidate document material submission allowed: false");
    expect(markdown).toContain("### 1. Node v1447 CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_MATERIAL_SOURCE_PACKAGE");
    expect(markdown).toContain("### 10. Node v1456 CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_CLOSEOUT_ARCHIVE");
    expect(markdown).toContain("- Rejects missing material: true");
    expect(markdown).toContain("- Rejects synthetic material: true");
    expect(markdown).toContain("- Blocks material intake: true");
    expect(markdown).toContain("- Blocks candidate evaluation: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes the material submission precheck in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialSubmissionPrecheck)
      .toMatchObject({
        candidateDocumentMaterialSubmissionPrecheckVersion: "Node v1456",
        sourceCandidateDocumentMaterialRequestPackageVersion: "Node v1446",
        checkpointCount: 10,
        validatorCount: 10,
        sourceMaterialRequestItemCount: 25,
        sourceMaterialAcceptanceCheckCount: 25,
        requiredMaterialFieldCount: 20,
        submissionMaterialFieldCount: 20,
        readyForCandidateDocumentMaterialSubmissionPrecheck: true,
        readyForCandidateDocumentMaterialIntake: false,
        realCandidateDocumentCount: 0,
        candidateDocumentMaterialSubmissionAllowed: false,
        candidateDocumentMaterialIntakeAllowed: false,
        candidatePayloadImportAllowed: false,
        candidateEvaluationAllowed: false,
        executionAllowed: false,
        writeRoutingAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      });
  });

  it("keeps the material submission precheck fail-closed when upstream probes are disabled", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });
    const precheck =
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialSubmissionPrecheck;

    expect(precheck).toMatchObject({
      candidateDocumentMaterialSubmissionPrecheckVersion: "Node v1456",
      candidateDocumentMaterialSubmissionPrecheckState: "blocked",
      readyForCandidateDocumentMaterialSubmissionPrecheck: false,
      checkpointCount: 10,
      validatorCount: 10,
      submissionMaterialFieldCount: 20,
      reviewedRealCandidateDocumentMaterialPresent: false,
      candidateDocumentMaterialSubmissionAllowed: false,
      candidateDocumentMaterialIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(precheck.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_SOURCE_REQUEST_PACKAGE_NOT_READY");
  });

  it("keeps the material submission precheck ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialSubmissionPrecheck)
        .toMatchObject({
          candidateDocumentMaterialSubmissionPrecheckVersion: "Node v1456",
          readyForCandidateDocumentMaterialSubmissionPrecheck: true,
          readyForCandidateDocumentMaterialIntake: false,
          checkpointCount: 10,
          validatorCount: 10,
          requiredMaterialFieldCount: 20,
          submissionMaterialFieldCount: 20,
          realCandidateDocumentCount: 0,
          candidateDocumentMaterialSubmissionAllowed: false,
          candidateDocumentMaterialIntakeAllowed: false,
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
