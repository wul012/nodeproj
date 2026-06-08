import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package review preflight", () => {
  it("builds twenty-five read-only review criteria and controls from text package intake", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightFixture(
        true,
      );

    expect(preflight).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: "Node v1261",
      sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
      artifactDraftTextPackageReviewPreflightState:
        "ready-for-signed-approval-artifact-draft-text-package-review-preflight",
      readyForSignedApprovalArtifactDraftTextPackageReviewPreflight: true,
      readyForOfflineSignedApprovalDraftTextPackageReview: true,
      readyForHumanSignedApprovalDraftTextPackageSubmission: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      reviewCriterionCount: 25,
      reviewControlCount: 25,
      identityReviewCriterionCount: 4,
      digestBindingReviewCriterionCount: 4,
      signatureEnvelopeReviewCriterionCount: 3,
      sourceEvidenceReviewCriterionCount: 3,
      valueBindingReviewCriterionCount: 2,
      policyReviewCriterionCount: 3,
      executionLockReviewCriterionCount: 5,
      archiveCloseoutReviewCriterionCount: 1,
      digestModeReviewCriterionCount: 5,
      readyReviewCriterionCount: 25,
      readyReviewControlCount: 25,
      digestBindingReviewControlCount: 4,
      signatureEnvelopeReviewControlCount: 3,
      policyReviewControlCount: 3,
      executionLockReviewControlCount: 5,
      archiveCloseoutReviewControlCount: 1,
      expectedDraftTextPackageFieldCount: 25,
      actualDraftTextPackageFieldCount: 0,
      acceptedDraftTextPackageCount: 0,
      reviewedDraftTextPackageCount: 0,
      approvedDraftTextPackageCount: 0,
      rejectedDraftTextPackageCount: 0,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 55,
      passedGateCount: 55,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.criteria.map((criterion) => criterion.nodeVersion)).toEqual([
      "Node v1237",
      "Node v1238",
      "Node v1239",
      "Node v1240",
      "Node v1241",
      "Node v1242",
      "Node v1243",
      "Node v1244",
      "Node v1245",
      "Node v1246",
      "Node v1247",
      "Node v1248",
      "Node v1249",
      "Node v1250",
      "Node v1251",
      "Node v1252",
      "Node v1253",
      "Node v1254",
      "Node v1255",
      "Node v1256",
      "Node v1257",
      "Node v1258",
      "Node v1259",
      "Node v1260",
      "Node v1261",
    ]);
    expect(preflight.controls.map((control) => control.nodeVersion))
      .toEqual(preflight.criteria.map((criterion) => criterion.nodeVersion));
    expect(preflight.criteria.every((criterion) => criterion.sourceIntakeFieldReady)).toBe(true);
    expect(preflight.criteria.every((criterion) => criterion.sourceIntakeGuardReady)).toBe(true);
    expect(preflight.criteria.every((criterion) => criterion.sourceIntakeFieldReadOnly)).toBe(true);
    expect(preflight.criteria.every((criterion) => criterion.sourceIntakeGuardReadOnly)).toBe(true);
    expect(preflight.criteria.every((criterion) => !criterion.sourceDraftTextPackageAccepted)).toBe(true);
    expect(preflight.criteria.every((criterion) =>
      criterion.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion)).toBe(true);
    expect(preflight.criteria.every((criterion) => !criterion.draftTextPackageReviewed)).toBe(true);
    expect(preflight.criteria.every((criterion) => !criterion.draftTextPackageApproved)).toBe(true);
    expect(preflight.criteria.every((criterion) => !criterion.draftTextPackageRejected)).toBe(true);
    expect(preflight.controls.every((control) => control.sourceReviewCriterionReady)).toBe(true);
    expect(preflight.controls.every((control) => control.rejectsUnreviewableCriterion)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksDraftTextPackageReview)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksDraftTextPackageApproval)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksSignedDraftText)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksSignaturePayload)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksApprovalGrant)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksRuntimePayload)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksWrites)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksSiblingMutation)).toBe(true);
    expect(preflight.criteria.map((criterion) => criterion.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_DETACHED_SIGNATURE_CRITERION");
    expect(preflight.controls.map((control) => control.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CLOSEOUT_CRITERION_CONTROL");
  });

  it("fails closed when the source text package intake is blocked", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightFixture(
        false,
      );

    expect(preflight).toMatchObject({
      artifactDraftTextPackageReviewPreflightState: "blocked",
      readyForSignedApprovalArtifactDraftTextPackageReviewPreflight: false,
      readyForOfflineSignedApprovalDraftTextPackageReview: false,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      reviewCriterionCount: 25,
      reviewControlCount: 25,
      readyReviewCriterionCount: 0,
      readyReviewControlCount: 0,
      actualDraftTextPackageFieldCount: 0,
      acceptedDraftTextPackageCount: 0,
      reviewedDraftTextPackageCount: 0,
      approvedDraftTextPackageCount: 0,
      rejectedDraftTextPackageCount: 0,
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
      "SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_FIELDS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_GUARDS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CRITERIA_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CONTROLS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_DIGEST_CRITERIA_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_NOT_READY_OR_REVIEWED",
    ]);
    expect(preflight.criteria.every((criterion) =>
      !criterion.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion)).toBe(true);
    expect(preflight.controls.every((control) =>
      !control.readyForOfflineSignedApprovalDraftTextPackageReviewControl)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft text package review preflight markdown", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightMarkdown(
        preflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package review preflight");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package review preflight version: Node v1261");
    expect(markdown)
      .toContain("- Source signed approval capture artifact draft text package intake version: Node v1236");
    expect(markdown)
      .toContain("- Artifact draft text package review preflight state: ready-for-signed-approval-artifact-draft-text-package-review-preflight");
    expect(markdown).toContain("- Ready for offline signed approval draft text package review: true");
    expect(markdown).toContain("- Ready for signed approval artifact draft: false");
    expect(markdown).toContain("- Review criterion count: 25");
    expect(markdown).toContain("- Review control count: 25");
    expect(markdown).toContain("- Reviewed draft text package count: 0");
    expect(markdown)
      .toContain("### 1. Node v1237 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_REQUEST_MANIFEST_CRITERION");
    expect(markdown)
      .toContain("### 25. Node v1261 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CLOSEOUT_CRITERION");
    expect(markdown)
      .toContain("### 25. Node v1261 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CLOSEOUT_CRITERION_CONTROL");
    expect(markdown).toContain("- Blocks draft text package review: true");
    expect(markdown).toContain("- Blocks draft text package approval: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft text package review preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: "Node v1261",
        sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
        reviewCriterionCount: 25,
        reviewControlCount: 25,
        readyForSignedApprovalArtifactDraftTextPackageReviewPreflight: true,
        readyForOfflineSignedApprovalDraftTextPackageReview: true,
        readyForHumanSignedApprovalDraftTextPackageSubmission: true,
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
        reviewedDraftTextPackageCount: 0,
        approvedDraftTextPackageCount: 0,
        rejectedDraftTextPackageCount: 0,
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
      const intake =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFixture(
          true,
        );
      const preflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight(
          intake,
        );

      expect(intake.readyForSignedApprovalArtifactDraftTextPackageIntake).toBe(true);
      expect(intake.intakeFieldCount).toBe(25);
      expect(intake.intakeGuardCount).toBe(25);
      expect(preflight.reviewCriterionCount).toBe(25);
      expect(preflight.reviewControlCount).toBe(25);
      expect(preflight.readyReviewCriterionCount).toBe(25);
      expect(preflight.readyReviewControlCount).toBe(25);
      expect(preflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight).toBe(true);
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
