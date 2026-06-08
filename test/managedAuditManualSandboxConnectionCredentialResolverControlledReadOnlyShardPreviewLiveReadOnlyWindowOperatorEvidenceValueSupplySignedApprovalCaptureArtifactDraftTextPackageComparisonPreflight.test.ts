import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package comparison preflight", () => {
  it("builds twenty-five offline comparison lanes and acceptance controls from submission preflight", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightFixture(
        true,
      );

    expect(preflight).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: "Node v1311",
      sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: "Node v1286",
      artifactDraftTextPackageComparisonPreflightState:
        "ready-for-signed-approval-artifact-draft-text-package-comparison-preflight",
      readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight: true,
      readyForOfflineSignedApprovalDraftTextPackageComparison: true,
      readyForManualSignedApprovalDraftTextPackageSubmission: true,
      readyForOfflineSignedApprovalDraftTextPackageReview: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      comparisonLaneCount: 25,
      acceptanceControlCount: 25,
      identityComparisonLaneCount: 4,
      digestBindingComparisonLaneCount: 4,
      signatureEnvelopeComparisonLaneCount: 3,
      sourceEvidenceComparisonLaneCount: 3,
      valueBindingComparisonLaneCount: 2,
      policyComparisonLaneCount: 3,
      executionLockComparisonLaneCount: 5,
      archiveCloseoutComparisonLaneCount: 1,
      digestModeComparisonLaneCount: 5,
      readyComparisonLaneCount: 25,
      readyAcceptanceControlCount: 25,
      digestBindingAcceptanceControlCount: 4,
      signatureEnvelopeAcceptanceControlCount: 3,
      policyAcceptanceControlCount: 3,
      executionLockAcceptanceControlCount: 5,
      archiveCloseoutAcceptanceControlCount: 1,
      expectedDraftTextPackageComparisonLaneCount: 25,
      actualDraftTextPackageComparisonCount: 0,
      submittedDraftTextPackageCount: 0,
      comparedDraftTextPackageCount: 0,
      acceptedDraftTextPackageCount: 0,
      rejectedDraftTextPackageCount: 0,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 61,
      passedGateCount: 61,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.lanes.map((lane) => lane.nodeVersion)).toEqual([
      "Node v1287",
      "Node v1288",
      "Node v1289",
      "Node v1290",
      "Node v1291",
      "Node v1292",
      "Node v1293",
      "Node v1294",
      "Node v1295",
      "Node v1296",
      "Node v1297",
      "Node v1298",
      "Node v1299",
      "Node v1300",
      "Node v1301",
      "Node v1302",
      "Node v1303",
      "Node v1304",
      "Node v1305",
      "Node v1306",
      "Node v1307",
      "Node v1308",
      "Node v1309",
      "Node v1310",
      "Node v1311",
    ]);
    expect(preflight.controls.map((control) => control.nodeVersion))
      .toEqual(preflight.lanes.map((lane) => lane.nodeVersion));
    expect(preflight.lanes.every((lane) => lane.sourceSubmissionSlotReady)).toBe(true);
    expect(preflight.lanes.every((lane) => lane.sourceComparisonControlReady)).toBe(true);
    expect(preflight.lanes.every((lane) => lane.sourceSubmissionSlotReadOnly)).toBe(true);
    expect(preflight.lanes.every((lane) => lane.sourceComparisonControlReadOnly)).toBe(true);
    expect(preflight.lanes.every((lane) => !lane.sourceDraftTextPackageSubmitted)).toBe(true);
    expect(preflight.lanes.every((lane) => !lane.sourceDraftTextPackageCompared)).toBe(true);
    expect(preflight.lanes.every((lane) => !lane.draftTextPackageAccepted)).toBe(true);
    expect(preflight.lanes.every((lane) =>
      lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane)).toBe(true);
    expect(preflight.controls.every((control) => control.sourceComparisonLaneReady)).toBe(true);
    expect(preflight.controls.every((control) => control.rejectsUncomparedLane)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksDraftTextPackageComparison)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksDraftTextPackageAcceptance)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksRuntimePayload)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksWrites)).toBe(true);
    expect(preflight.controls.every((control) => control.blocksSiblingMutation)).toBe(true);
    expect(preflight.lanes.map((lane) => lane.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_DETACHED_SIGNATURE_LANE");
    expect(preflight.controls.map((control) => control.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_CLOSEOUT_LANE_CONTROL");
  });

  it("fails closed when the source submission preflight is blocked", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightFixture(
        false,
      );

    expect(preflight).toMatchObject({
      artifactDraftTextPackageComparisonPreflightState: "blocked",
      readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight: false,
      readyForOfflineSignedApprovalDraftTextPackageComparison: false,
      comparisonLaneCount: 25,
      acceptanceControlCount: 25,
      readyComparisonLaneCount: 0,
      readyAcceptanceControlCount: 0,
      actualDraftTextPackageComparisonCount: 0,
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
    expect(preflight.blockedReasonCodes)
      .toContain("SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_NOT_READY");
    expect(preflight.blockedReasonCodes)
      .toContain("ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_SOURCE_SUBMISSION_SLOTS_NOT_READY");
    expect(preflight.blockedReasonCodes)
      .toContain("ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_SOURCE_CONTROLS_NOT_READY");
    expect(preflight.blockedReasonCodes)
      .toContain("ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_LANES_BLOCKED");
    expect(preflight.blockedReasonCodes)
      .toContain("ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_BLOCKED");
    expect(preflight.lanes.every((lane) =>
      !lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane)).toBe(true);
    expect(preflight.controls.every((control) =>
      !control.readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft text package comparison preflight markdown", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightMarkdown(
        preflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package comparison preflight");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package comparison preflight version: Node v1311");
    expect(markdown)
      .toContain("- Source signed approval capture artifact draft text package submission preflight version: Node v1286");
    expect(markdown)
      .toContain("- Artifact draft text package comparison preflight state: ready-for-signed-approval-artifact-draft-text-package-comparison-preflight");
    expect(markdown).toContain("- Ready for offline signed approval draft text package comparison: true");
    expect(markdown).toContain("- Comparison lane count: 25");
    expect(markdown).toContain("- Acceptance control count: 25");
    expect(markdown).toContain("- Compared draft text package count: 0");
    expect(markdown).toContain("- Accepted draft text package count: 0");
    expect(markdown)
      .toContain("### 1. Node v1287 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_REQUEST_MANIFEST_LANE");
    expect(markdown)
      .toContain("### 25. Node v1311 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_CLOSEOUT_LANE");
    expect(markdown)
      .toContain("### 25. Node v1311 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_CLOSEOUT_LANE_CONTROL");
    expect(markdown).toContain("- Blocks draft text package comparison: true");
    expect(markdown).toContain("- Blocks draft text package acceptance: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft text package comparison preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: "Node v1311",
        sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: "Node v1286",
        comparisonLaneCount: 25,
        acceptanceControlCount: 25,
        readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight: true,
        readyForOfflineSignedApprovalDraftTextPackageComparison: true,
        readyForManualSignedApprovalDraftTextPackageSubmission: true,
        readyForOfflineSignedApprovalDraftTextPackageReview: true,
        actualDraftTextPackageComparisonCount: 0,
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
      const submissionPreflight =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightFixture(
          true,
        );
      const preflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight(
          submissionPreflight,
        );

      expect(submissionPreflight.readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight).toBe(true);
      expect(submissionPreflight.submissionSlotCount).toBe(25);
      expect(submissionPreflight.comparisonControlCount).toBe(25);
      expect(preflight.comparisonLaneCount).toBe(25);
      expect(preflight.acceptanceControlCount).toBe(25);
      expect(preflight.readyComparisonLaneCount).toBe(25);
      expect(preflight.readyAcceptanceControlCount).toBe(25);
      expect(preflight.readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight).toBe(true);
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
