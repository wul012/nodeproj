import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft review package preflight", () => {
  it("builds twenty-five review package slots and guards from artifact draft readiness", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightFixture(
        true,
      );

    expect(preflight).toMatchObject({
      signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: "Node v1161",
      sourceSignedApprovalCaptureArtifactDraftReadinessVersion: "Node v1136",
      artifactDraftReviewPackagePreflightState:
        "ready-for-signed-approval-artifact-draft-review-package-preflight",
      readyForSignedApprovalArtifactDraftReviewPackagePreflight: true,
      readyForManualSignedApprovalDraftReviewPackage: true,
      readyForManualSignedApprovalDraftReview: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      packageSlotCount: 25,
      packageGuardCount: 25,
      identityReviewPackageSlotCount: 4,
      digestBindingReviewPackageSlotCount: 4,
      signatureEnvelopeReviewPackageSlotCount: 3,
      sourceEvidenceReviewPackageSlotCount: 3,
      valueBindingReviewPackageSlotCount: 2,
      policyReviewPackageSlotCount: 3,
      executionLockReviewPackageSlotCount: 5,
      archiveCloseoutReviewPackageSlotCount: 1,
      digestModeReviewPackageSlotCount: 5,
      readyPackageSlotCount: 25,
      readyPackageGuardCount: 25,
      digestBindingReviewPackageGuardCount: 4,
      signatureEnvelopeReviewPackageGuardCount: 3,
      policyReviewPackageGuardCount: 3,
      executionLockReviewPackageGuardCount: 5,
      archiveCloseoutReviewPackageGuardCount: 1,
      packageSlotMaterializedCount: 0,
      packageArtifactCreated: false,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 50,
      passedGateCount: 50,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v1137",
      "Node v1138",
      "Node v1139",
      "Node v1140",
      "Node v1141",
      "Node v1142",
      "Node v1143",
      "Node v1144",
      "Node v1145",
      "Node v1146",
      "Node v1147",
      "Node v1148",
      "Node v1149",
      "Node v1150",
      "Node v1151",
      "Node v1152",
      "Node v1153",
      "Node v1154",
      "Node v1155",
      "Node v1156",
      "Node v1157",
      "Node v1158",
      "Node v1159",
      "Node v1160",
      "Node v1161",
    ]);
    expect(preflight.guards.map((guard) => guard.nodeVersion))
      .toEqual(preflight.slots.map((slot) => slot.nodeVersion));
    expect(preflight.slots.every((slot) => slot.sourceReadinessLaneReady)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReadinessControlReady)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReadinessLaneReadOnly)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReadinessControlReadOnly)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReadinessLaneManualReviewRequired)).toBe(true);
    expect(preflight.slots.every((slot) => !slot.sourceReadinessLaneManualDraftMaterialized)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReadinessControlBlocksAutoMaterialization)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReadinessControlBlocksSignedApprovalCapture)).toBe(true);
    expect(preflight.slots.every((slot) => slot.sourceReadinessControlBlocksRuntimePayload)).toBe(true);
    expect(preflight.slots.every((slot) => slot.requiredReadinessLaneModeCovered)).toBe(true);
    expect(preflight.slots.every((slot) => slot.readyForManualSignedApprovalDraftReviewPackageSlot)).toBe(true);
    expect(preflight.guards.every((guard) => guard.sourcePackageSlotReady)).toBe(true);
    expect(preflight.guards.every((guard) => guard.rejectsMissingReviewPackageSlot)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksPackageMaterialization)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksSignedDraftText)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksSignaturePayload)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksApprovalGrant)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
    expect(preflight.slots.map((slot) => slot.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_DETACHED_SIGNATURE_SLOT");
    expect(preflight.slots.map((slot) => slot.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_SIBLING_NON_MUTATION_SLOT");
    expect(preflight.guards.map((guard) => guard.code))
      .toContain("ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_CLOSEOUT_GUARD");
  });

  it("fails closed when the source artifact draft readiness is blocked", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightFixture(
        false,
      );

    expect(preflight).toMatchObject({
      artifactDraftReviewPackagePreflightState: "blocked",
      readyForSignedApprovalArtifactDraftReviewPackagePreflight: false,
      readyForManualSignedApprovalDraftReviewPackage: false,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      packageSlotCount: 25,
      packageGuardCount: 25,
      readyPackageSlotCount: 0,
      readyPackageGuardCount: 0,
      packageSlotMaterializedCount: 0,
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
      "SOURCE_ARTIFACT_DRAFT_READINESS_NOT_READY",
      "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_LANES_NOT_READY",
      "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_CONTROLS_NOT_READY",
      "ARTIFACT_DRAFT_REVIEW_PACKAGE_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_REVIEW_PACKAGE_GUARDS_NOT_READY",
      "ARTIFACT_DRAFT_REVIEW_PACKAGE_DIGEST_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_REVIEW_PACKAGE_NOT_READY_OR_MATERIALIZED",
    ]);
    expect(preflight.slots.every((slot) =>
      !slot.readyForManualSignedApprovalDraftReviewPackageSlot)).toBe(true);
    expect(preflight.guards.every((guard) =>
      !guard.readyForManualSignedApprovalDraftReviewPackageGuard)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft review package preflight markdown", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightMarkdown(
        preflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft review package preflight");
    expect(markdown).toContain("- Signed approval capture artifact draft review package preflight version: Node v1161");
    expect(markdown).toContain("- Source signed approval capture artifact draft readiness version: Node v1136");
    expect(markdown)
      .toContain("- Artifact draft review package preflight state: ready-for-signed-approval-artifact-draft-review-package-preflight");
    expect(markdown).toContain("- Ready for manual signed approval draft review package: true");
    expect(markdown).toContain("- Ready for signed approval artifact draft: false");
    expect(markdown).toContain("- Package slot count: 25");
    expect(markdown).toContain("- Package guard count: 25");
    expect(markdown).toContain("- Signed draft text count: 0");
    expect(markdown)
      .toContain("### 1. Node v1137 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_REQUEST_MANIFEST_SLOT");
    expect(markdown)
      .toContain("### 25. Node v1161 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_CLOSEOUT_SLOT");
    expect(markdown).toContain("### 25. Node v1161 ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_CLOSEOUT_GUARD");
    expect(markdown).toContain("- Blocks package materialization: true");
    expect(markdown).toContain("- Blocks approval grant: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft review package preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: "Node v1161",
        sourceSignedApprovalCaptureArtifactDraftReadinessVersion: "Node v1136",
        packageSlotCount: 25,
        packageGuardCount: 25,
        readyForSignedApprovalArtifactDraftReviewPackagePreflight: true,
        readyForManualSignedApprovalDraftReviewPackage: true,
        readyForManualSignedApprovalDraftReview: true,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        packageSlotMaterializedCount: 0,
        packageArtifactCreated: false,
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
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessFixture(true);
      const preflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight(
          readiness,
        );

      expect(readiness.readyForSignedApprovalArtifactDraftReadiness).toBe(true);
      expect(readiness.readinessLaneCount).toBe(25);
      expect(readiness.readinessControlCount).toBe(25);
      expect(preflight.packageSlotCount).toBe(25);
      expect(preflight.packageGuardCount).toBe(25);
      expect(preflight.readyPackageSlotCount).toBe(25);
      expect(preflight.readyPackageGuardCount).toBe(25);
      expect(preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight).toBe(true);
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
