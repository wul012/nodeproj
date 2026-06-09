import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckMarkdown,
} from "../src/services/controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview candidate document submission precheck", () => {
  it("builds twenty-five submission checkpoints and validators while waiting for reviewed real material", () => {
    const precheck = controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckFixture(true);

    expect(precheck).toMatchObject({
      candidateDocumentSubmissionPrecheckVersion: "Node v1411",
      sourceCandidateDocumentRequestPackageVersion: "Node v1386",
      candidateDocumentSubmissionPrecheckState:
        "ready-for-reviewed-real-candidate-document-submission-precheck",
      readyForCandidateDocumentSubmissionPrecheck: true,
      readyForReviewedRealCandidateDocumentSubmission: false,
      readyForCandidateDocumentIntake: false,
      readyForCandidatePayloadImport: false,
      readyForCandidateEvaluation: false,
      readyForApprovalGrant: false,
      readyForSignedApproval: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      checkpointCount: 25,
      validatorCount: 25,
      sourceRequestItemCount: 15,
      sourceAcceptanceCheckCount: 15,
      readyCheckpointCount: 25,
      readyValidatorCount: 25,
      requiredCandidateFieldCount: 20,
      submissionCandidateFieldCount: 20,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      stagedCandidateDocumentCount: 0,
      importedCandidatePayloadCount: 0,
      evaluatedCandidatePayloadCount: 0,
      acceptedCandidatePayloadCount: 0,
      rejectedCandidatePayloadCount: 0,
      gateCount: 40,
      passedGateCount: 40,
      blockedReasonCodes: [],
      candidateDocumentSubmissionAllowed: false,
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
    expect(precheck.sourceCandidateDocumentRequestPackageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.candidateDocumentSubmissionPrecheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.checkpoints.map((checkpoint) => checkpoint.nodeVersion)).toEqual([
      "Node v1387",
      "Node v1388",
      "Node v1389",
      "Node v1390",
      "Node v1391",
      "Node v1392",
      "Node v1393",
      "Node v1394",
      "Node v1395",
      "Node v1396",
      "Node v1397",
      "Node v1398",
      "Node v1399",
      "Node v1400",
      "Node v1401",
      "Node v1402",
      "Node v1403",
      "Node v1404",
      "Node v1405",
      "Node v1406",
      "Node v1407",
      "Node v1408",
      "Node v1409",
      "Node v1410",
      "Node v1411",
    ]);
    expect(precheck.validators.map((validator) => validator.nodeVersion))
      .toEqual(precheck.checkpoints.map((checkpoint) => checkpoint.nodeVersion));
    expect(precheck.checkpoints.flatMap((checkpoint) => checkpoint.candidateFields)).toHaveLength(20);
    expect(new Set(precheck.checkpoints.flatMap((checkpoint) => checkpoint.candidateFields)).size)
      .toBe(20);
    expect(precheck.checkpoints.every((checkpoint) =>
      checkpoint.readyForCandidateDocumentSubmissionCheckpoint)).toBe(true);
    expect(precheck.checkpoints.every((checkpoint) => checkpoint.requiresReviewedRealCandidateDocument))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.rejectsMissingCandidateDocument))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.rejectsSyntheticCandidateDocument))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.quarantinesUnreviewedCandidateDocument))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksCandidatePayloadImport))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksCandidateEvaluation))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksCandidateAcceptance))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksApprovalGrant))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksSignedApproval))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksRuntimePayload))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksWrites))
      .toBe(true);
    expect(precheck.validators.every((validator) => validator.blocksSiblingMutation))
      .toBe(true);
  });

  it("fails closed when the source request package is blocked", () => {
    const precheck = controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckFixture(false);

    expect(precheck).toMatchObject({
      candidateDocumentSubmissionPrecheckState: "blocked",
      readyForCandidateDocumentSubmissionPrecheck: false,
      sourceCandidateDocumentRequestPackageVersion: "Node v1386",
      checkpointCount: 25,
      validatorCount: 25,
      sourceRequestItemCount: 15,
      sourceAcceptanceCheckCount: 15,
      readyCheckpointCount: 0,
      readyValidatorCount: 0,
      requiredCandidateFieldCount: 20,
      submissionCandidateFieldCount: 20,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      candidateDocumentSubmissionAllowed: false,
      candidateDocumentIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(precheck.passedGateCount).toBeLessThan(precheck.gateCount);
    expect(precheck.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_REQUEST_PACKAGE_NOT_READY");
    expect(precheck.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINTS_BLOCKED");
    expect(precheck.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATORS_BLOCKED");
  });

  it("renders stable candidate document submission precheck markdown", () => {
    const precheck = controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckFixture(true);
    const markdown = renderControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckMarkdown(precheck);

    expect(markdown)
      .toContain("# Controlled read-only shard preview candidate document submission precheck");
    expect(markdown).toContain("- Candidate document submission precheck version: Node v1411");
    expect(markdown)
      .toContain("- Candidate document submission precheck state: ready-for-reviewed-real-candidate-document-submission-precheck");
    expect(markdown).toContain("- Checkpoint count: 25");
    expect(markdown).toContain("- Validator count: 25");
    expect(markdown).toContain("- Submission candidate field count: 20");
    expect(markdown).toContain("- Candidate document intake allowed: false");
    expect(markdown)
      .toContain("### 1. Node v1387 CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SOURCE_LINEAGE");
    expect(markdown)
      .toContain("### 25. Node v1411 CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_SUBMISSION_CLOSEOUT");
    expect(markdown).toContain("- Rejects missing candidate document: true");
    expect(markdown).toContain("- Rejects synthetic candidate document: true");
    expect(markdown).toContain("- Blocks candidate payload import: true");
    expect(markdown).toContain("- Blocks candidate evaluation: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes the candidate document submission precheck in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentSubmissionPrecheck)
      .toMatchObject({
        candidateDocumentSubmissionPrecheckVersion: "Node v1411",
        sourceCandidateDocumentRequestPackageVersion: "Node v1386",
        checkpointCount: 25,
        validatorCount: 25,
        sourceRequestItemCount: 15,
        sourceAcceptanceCheckCount: 15,
        requiredCandidateFieldCount: 20,
        submissionCandidateFieldCount: 20,
        readyForCandidateDocumentSubmissionPrecheck: true,
        readyForReviewedRealCandidateDocumentSubmission: false,
        readyForCandidateDocumentIntake: false,
        realCandidateDocumentCount: 0,
        syntheticCandidateDocumentCount: 0,
        candidateDocumentSubmissionAllowed: false,
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

  it("keeps the submission precheck ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentSubmissionPrecheck)
        .toMatchObject({
          candidateDocumentSubmissionPrecheckVersion: "Node v1411",
          readyForCandidateDocumentSubmissionPrecheck: true,
          readyForReviewedRealCandidateDocumentSubmission: false,
          checkpointCount: 25,
          validatorCount: 25,
          requiredCandidateFieldCount: 20,
          submissionCandidateFieldCount: 20,
          realCandidateDocumentCount: 0,
          candidateDocumentSubmissionAllowed: false,
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
