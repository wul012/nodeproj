import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft readiness", () => {
  it("builds twenty-five readiness lanes and controls from the artifact draft preflight", () => {
    const readiness =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessFixture(true);

    expect(readiness).toMatchObject({
      signedApprovalCaptureArtifactDraftReadinessVersion: "Node v1136",
      sourceSignedApprovalCaptureArtifactDraftPreflightVersion: "Node v1111",
      artifactDraftReadinessState: "ready-for-signed-approval-artifact-draft-readiness",
      readyForSignedApprovalArtifactDraftReadiness: true,
      readyForManualSignedApprovalDraftReview: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      readinessLaneCount: 25,
      readinessControlCount: 25,
      identityReadinessLaneCount: 4,
      digestBindingReadinessLaneCount: 4,
      signatureEnvelopeReadinessLaneCount: 3,
      sourceEvidenceReadinessLaneCount: 3,
      valueBindingReadinessLaneCount: 2,
      policyReadinessLaneCount: 3,
      executionLockReadinessLaneCount: 5,
      archiveCloseoutReadinessLaneCount: 1,
      readyReadinessLaneCount: 25,
      readyReadinessControlCount: 25,
      digestBindingReadinessControlCount: 4,
      signatureEnvelopeReadinessControlCount: 3,
      policyReadinessControlCount: 3,
      executionLockReadinessControlCount: 5,
      archiveCloseoutReadinessControlCount: 1,
      manualDraftMaterializedCount: 0,
      draftArtifactCreated: false,
      draftArtifactMaterializedCount: 0,
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
    expect(readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.signedApprovalCaptureArtifactDraftReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.lanes.map((lane) => lane.nodeVersion)).toEqual([
      "Node v1112",
      "Node v1113",
      "Node v1114",
      "Node v1115",
      "Node v1116",
      "Node v1117",
      "Node v1118",
      "Node v1119",
      "Node v1120",
      "Node v1121",
      "Node v1122",
      "Node v1123",
      "Node v1124",
      "Node v1125",
      "Node v1126",
      "Node v1127",
      "Node v1128",
      "Node v1129",
      "Node v1130",
      "Node v1131",
      "Node v1132",
      "Node v1133",
      "Node v1134",
      "Node v1135",
      "Node v1136",
    ]);
    expect(readiness.controls.map((control) => control.nodeVersion))
      .toEqual(readiness.lanes.map((lane) => lane.nodeVersion));
    expect(readiness.lanes.every((lane) => lane.sourceDraftFieldReady)).toBe(true);
    expect(readiness.lanes.every((lane) => lane.sourceDraftFieldStillPreflightOnly)).toBe(true);
    expect(readiness.lanes.every((lane) => lane.sourceDraftGuardReady)).toBe(true);
    expect(readiness.lanes.every((lane) => lane.sourceDraftGuardBlocksUnsignedDraft)).toBe(true);
    expect(readiness.lanes.every((lane) => lane.sourceDraftGuardBlocksAutoCapture)).toBe(true);
    expect(readiness.lanes.every((lane) => lane.requiredSourceFieldCovered)).toBe(true);
    expect(readiness.lanes.every((lane) => lane.manualDraftReviewRequired)).toBe(true);
    expect(readiness.lanes.every((lane) => !lane.manualDraftMaterialized)).toBe(true);
    expect(readiness.lanes.every((lane) => lane.readyForManualSignedApprovalDraftReadinessLane)).toBe(true);
    expect(readiness.controls.every((control) => control.sourceReadinessLaneReady)).toBe(true);
    expect(readiness.controls.every((control) => control.rejectsMissingManualDraftReview)).toBe(true);
    expect(readiness.controls.every((control) => control.blocksAutoMaterialization)).toBe(true);
    expect(readiness.controls.every((control) => control.blocksSignedApprovalCapture)).toBe(true);
    expect(readiness.controls.every((control) => control.blocksRuntimePayload)).toBe(true);
    expect(readiness.controls.every((control) => control.blocksWrites)).toBe(true);
    expect(readiness.controls.every((control) => control.blocksSiblingMutation)).toBe(true);
    expect(readiness.lanes.map((lane) => lane.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_DETACHED_SIGNATURE_REVIEW");
    expect(readiness.lanes.map((lane) => lane.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SIBLING_NON_MUTATION_EVIDENCE");
    expect(readiness.controls.map((control) => control.code)).toContain("ARTIFACT_DRAFT_READINESS_CLOSEOUT_CONTROL");
  });

  it("fails closed when the source artifact draft preflight is blocked", () => {
    const readiness =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessFixture(false);

    expect(readiness).toMatchObject({
      artifactDraftReadinessState: "blocked",
      readyForSignedApprovalArtifactDraftReadiness: false,
      readyForManualSignedApprovalDraftReview: false,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readinessLaneCount: 25,
      readinessControlCount: 25,
      readyReadinessLaneCount: 0,
      readyReadinessControlCount: 0,
      passedGateCount: 36,
      blockedReasonCodes: [
        "SOURCE_ARTIFACT_DRAFT_PREFLIGHT_NOT_READY",
        "ARTIFACT_DRAFT_READINESS_SOURCE_FIELDS_NOT_READY",
        "ARTIFACT_DRAFT_READINESS_SOURCE_GUARDS_NOT_READY",
        "ARTIFACT_DRAFT_READINESS_LANES_NOT_READY",
        "ARTIFACT_DRAFT_READINESS_CONTROLS_NOT_READY",
        "ARTIFACT_DRAFT_READINESS_SOURCE_GUARDS_NOT_COVERED",
        "ARTIFACT_DRAFT_READINESS_DIGEST_BINDINGS_MISSING",
        "ARTIFACT_DRAFT_READINESS_SOURCE_NOT_PREFLIGHT_ONLY",
        "ARTIFACT_DRAFT_READINESS_MANUAL_REVIEW_NOT_READY",
      ],
      draftArtifactCreated: false,
      draftArtifactMaterializedCount: 0,
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
    expect(readiness.lanes.every((lane) => !lane.readyForManualSignedApprovalDraftReadinessLane)).toBe(true);
    expect(readiness.controls.every((control) =>
      !control.readyForManualSignedApprovalDraftReadinessControl)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft readiness markdown for archive review", () => {
    const readiness =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessFixture(true);
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessMarkdown(
        readiness,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft readiness");
    expect(markdown).toContain("- Signed approval capture artifact draft readiness version: Node v1136");
    expect(markdown).toContain("- Source signed approval capture artifact draft preflight version: Node v1111");
    expect(markdown).toContain("- Artifact draft readiness state: ready-for-signed-approval-artifact-draft-readiness");
    expect(markdown).toContain("- Ready for manual signed approval draft review: true");
    expect(markdown).toContain("- Ready for signed approval artifact draft: false");
    expect(markdown).toContain("- Readiness lane count: 25");
    expect(markdown).toContain("- Readiness control count: 25");
    expect(markdown).toContain("- Manual draft materialized count: 0");
    expect(markdown).toContain("### 1. Node v1112 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_REQUEST_MANIFEST");
    expect(markdown).toContain("### 25. Node v1136 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_CLOSEOUT");
    expect(markdown).toContain("### 25. Node v1136 ARTIFACT_DRAFT_READINESS_CLOSEOUT_CONTROL");
    expect(markdown).toContain("- Blocks auto materialization: true");
    expect(markdown).toContain("- Blocks signed approval capture: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft readiness in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftReadinessVersion: "Node v1136",
        sourceSignedApprovalCaptureArtifactDraftPreflightVersion: "Node v1111",
        readinessLaneCount: 25,
        readinessControlCount: 25,
        readyForSignedApprovalArtifactDraftReadiness: true,
        readyForManualSignedApprovalDraftReview: true,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        manualDraftMaterializedCount: 0,
        draftArtifactCreated: false,
        draftArtifactMaterializedCount: 0,
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
      const draftPreflight =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFixture(true);
      const readiness =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness(
          draftPreflight,
        );

      expect(draftPreflight.readyForSignedApprovalArtifactDraftPreflight).toBe(true);
      expect(draftPreflight.draftFieldCount).toBe(25);
      expect(draftPreflight.draftGuardCount).toBe(25);
      expect(readiness.readinessLaneCount).toBe(25);
      expect(readiness.readinessControlCount).toBe(25);
      expect(readiness.readyReadinessLaneCount).toBe(25);
      expect(readiness.readyReadinessControlCount).toBe(25);
      expect(readiness.readyForSignedApprovalArtifactDraftReadiness).toBe(true);
      expect(readiness.readyForSignedApprovalArtifactDraft).toBe(false);
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
