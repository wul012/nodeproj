import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package submission preflight", () => {
  it("builds twenty-five manual submission slots and comparison controls from review preflight", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightFixture(
        true,
      );

    expect(preflight).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: "Node v1286",
      sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: "Node v1261",
      artifactDraftTextPackageSubmissionPreflightState:
        "ready-for-signed-approval-artifact-draft-text-package-submission-preflight",
      readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight: true,
      readyForManualSignedApprovalDraftTextPackageSubmission: true,
      readyForOfflineSignedApprovalDraftTextPackageComparison: true,
      readyForOfflineSignedApprovalDraftTextPackageReview: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      submissionSlotCount: 25,
      comparisonControlCount: 25,
      identitySubmissionSlotCount: 4,
      digestBindingSubmissionSlotCount: 4,
      signatureEnvelopeSubmissionSlotCount: 3,
      sourceEvidenceSubmissionSlotCount: 3,
      valueBindingSubmissionSlotCount: 2,
      policySubmissionSlotCount: 3,
      executionLockSubmissionSlotCount: 5,
      archiveCloseoutSubmissionSlotCount: 1,
      digestModeSubmissionSlotCount: 5,
      readySubmissionSlotCount: 25,
      readyComparisonControlCount: 25,
      digestBindingComparisonControlCount: 4,
      signatureEnvelopeComparisonControlCount: 3,
      policyComparisonControlCount: 3,
      executionLockComparisonControlCount: 5,
      archiveCloseoutComparisonControlCount: 1,
      expectedDraftTextPackageSubmissionSlotCount: 25,
      actualDraftTextPackageSubmissionCount: 0,
      submittedDraftTextPackageCount: 0,
      comparedDraftTextPackageCount: 0,
      acceptedDraftTextPackageCount: 0,
      rejectedDraftTextPackageCount: 0,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 58,
      passedGateCount: 58,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v1262",
      "Node v1263",
      "Node v1264",
      "Node v1265",
      "Node v1266",
      "Node v1267",
      "Node v1268",
      "Node v1269",
      "Node v1270",
      "Node v1271",
      "Node v1272",
      "Node v1273",
      "Node v1274",
      "Node v1275",
      "Node v1276",
      "Node v1277",
      "Node v1278",
      "Node v1279",
      "Node v1280",
      "Node v1281",
      "Node v1282",
      "Node v1283",
      "Node v1284",
      "Node v1285",
      "Node v1286",
    ]);
    expect(preflight.controls.map((control) => control.nodeVersion))
      .toEqual(preflight.slots.map((slot) => slot.nodeVersion));
    expect(preflight.slots.every((slot) => slot.sourceReviewCriterionReady)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReviewControlReady)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReviewCriterionReadOnly)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReviewControlReadOnly)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.sourceDraftTextPackageReviewed)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.draftTextPackageSubmitted)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.draftTextPackageCompared)).toBe(true);
    expect(preflight.slots.every((slot) =>
      slot.readyForManualSignedApprovalDraftTextPackageSubmissionSlot)).toBe(true);
    expect(preflight.controls.every((control) => control.sourceSubmissionSlotReady)).toBe(true);
    expect(preflight.controls.every((control) => control.rejectsUnsubmittedSlot)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksDraftTextPackageSubmission)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksDraftTextPackageComparison)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksDraftTextPackageAcceptance)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksRuntimePayload)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksWrites)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksSiblingMutation)).toBe(true);
    expect(preflight.slots.map((slot) => slot.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_DETACHED_SIGNATURE_SLOT");
    expect(preflight.controls.map((control) => control.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_CLOSEOUT_SLOT_CONTROL");
  });

  it("fails closed when the source review preflight is blocked", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightFixture(
        false,
      );

    expect(preflight).toMatchObject({
      artifactDraftTextPackageSubmissionPreflightState: "blocked",
      readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight: false,
      readyForManualSignedApprovalDraftTextPackageSubmission: false,
      readyForOfflineSignedApprovalDraftTextPackageComparison: false,
      submissionSlotCount: 25,
      comparisonControlCount: 25,
      readySubmissionSlotCount: 0,
      readyComparisonControlCount: 0,
      actualDraftTextPackageSubmissionCount: 0,
      submittedDraftTextPackageCount: 0,
      comparedDraftTextPackageCount: 0,
      acceptedDraftTextPackageCount: 0,
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
      "SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_CRITERIA_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_CONTROLS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_CONTROLS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_DIGEST_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_NOT_READY_OR_SUBMITTED",
    ]);
    expect(preflight.slots.every((slot) =>
      !slot.readyForManualSignedApprovalDraftTextPackageSubmissionSlot)).toBe(true);
    expect(preflight.controls.every((control) =>
      !control.readyForManualSignedApprovalDraftTextPackageComparisonControl)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft text package submission preflight markdown", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightMarkdown(
        preflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package submission preflight");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package submission preflight version: Node v1286");
    expect(markdown)
      .toContain("- Source signed approval capture artifact draft text package review preflight version: Node v1261");
    expect(markdown)
      .toContain("- Artifact draft text package submission preflight state: ready-for-signed-approval-artifact-draft-text-package-submission-preflight");
    expect(markdown).toContain("- Ready for manual signed approval draft text package submission: true");
    expect(markdown).toContain("- Ready for offline signed approval draft text package comparison: true");
    expect(markdown).toContain("- Submission slot count: 25");
    expect(markdown).toContain("- Comparison control count: 25");
    expect(markdown).toContain("- Submitted draft text package count: 0");
    expect(markdown).toContain("- Compared draft text package count: 0");
    expect(markdown)
      .toContain("### 1. Node v1262 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_REQUEST_MANIFEST_SLOT");
    expect(markdown)
      .toContain("### 25. Node v1286 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_CLOSEOUT_SLOT");
    expect(markdown)
      .toContain("### 25. Node v1286 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_CLOSEOUT_SLOT_CONTROL");
    expect(markdown).toContain("- Blocks draft text package submission: true");
    expect(markdown).toContain("- Blocks draft text package comparison: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft text package submission preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: "Node v1286",
        sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: "Node v1261",
        submissionSlotCount: 25,
        comparisonControlCount: 25,
        readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight: true,
        readyForManualSignedApprovalDraftTextPackageSubmission: true,
        readyForOfflineSignedApprovalDraftTextPackageComparison: true,
        readyForOfflineSignedApprovalDraftTextPackageReview: true,
        actualDraftTextPackageSubmissionCount: 0,
        submittedDraftTextPackageCount: 0,
        comparedDraftTextPackageCount: 0,
        acceptedDraftTextPackageCount: 0,
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
      const reviewPreflight =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightFixture(
          true,
        );
      const preflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight(
          reviewPreflight,
        );

      expect(reviewPreflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight).toBe(true);
      expect(reviewPreflight.reviewCriterionCount).toBe(25);
      expect(reviewPreflight.reviewControlCount).toBe(25);
      expect(preflight.submissionSlotCount).toBe(25);
      expect(preflight.comparisonControlCount).toBe(25);
      expect(preflight.readySubmissionSlotCount).toBe(25);
      expect(preflight.readyComparisonControlCount).toBe(25);
      expect(preflight.readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight).toBe(true);
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
