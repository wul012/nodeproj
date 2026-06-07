import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft preflight", () => {
  it("builds twenty-five draft fields and guards from the signed approval capture artifact preflight", () => {
    const draftPreflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFixture(true);

    expect(draftPreflight).toMatchObject({
      signedApprovalCaptureArtifactDraftPreflightVersion: "Node v1111",
      sourceSignedApprovalCaptureArtifactPreflightVersion: "Node v1086",
      artifactDraftPreflightState: "ready-for-signed-approval-artifact-draft-preflight",
      readyForSignedApprovalArtifactDraftPreflight: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      draftFieldCount: 25,
      draftGuardCount: 25,
      identityDraftFieldCount: 4,
      digestBindingDraftFieldCount: 4,
      signatureEnvelopeDraftFieldCount: 3,
      sourceEvidenceDraftFieldCount: 3,
      valueBindingDraftFieldCount: 2,
      policyDraftFieldCount: 3,
      executionLockDraftFieldCount: 5,
      closeoutDraftFieldCount: 1,
      requiredDraftFieldCount: 25,
      readyDraftFieldCount: 25,
      readyDraftGuardCount: 25,
      draftBlockerCount: 25,
      digestBindingGuardCount: 4,
      signatureEnvelopeGuardCount: 3,
      policyGuardCount: 3,
      noExecutionGuardCount: 5,
      draftArtifactCreated: false,
      draftArtifactMaterializedCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 39,
      passedGateCount: 39,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(draftPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(draftPreflight.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(draftPreflight.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(draftPreflight.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(draftPreflight.signedApprovalCaptureArtifactDraftPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(draftPreflight.fields.map((field) => field.nodeVersion)).toEqual([
      "Node v1087",
      "Node v1088",
      "Node v1089",
      "Node v1090",
      "Node v1091",
      "Node v1092",
      "Node v1093",
      "Node v1094",
      "Node v1095",
      "Node v1096",
      "Node v1097",
      "Node v1098",
      "Node v1099",
      "Node v1100",
      "Node v1101",
      "Node v1102",
      "Node v1103",
      "Node v1104",
      "Node v1105",
      "Node v1106",
      "Node v1107",
      "Node v1108",
      "Node v1109",
      "Node v1110",
      "Node v1111",
    ]);
    expect(draftPreflight.guards.map((guard) => guard.nodeVersion))
      .toEqual(draftPreflight.fields.map((field) => field.nodeVersion));
    expect(draftPreflight.fields.every((field) => field.sourceArtifactFragmentReady)).toBe(true);
    expect(draftPreflight.fields.every((field) => field.sourceArtifactSealReady)).toBe(true);
    expect(draftPreflight.fields.every((field) => field.sourceArtifactStillBlocked)).toBe(true);
    expect(draftPreflight.fields.every((field) => field.requiredArtifactFragmentPresent)).toBe(true);
    expect(draftPreflight.fields.every((field) => field.requiredForArtifactDraftPreflight)).toBe(true);
    expect(draftPreflight.fields.every((field) => !field.draftArtifactCreated)).toBe(true);
    expect(draftPreflight.fields.every((field) => !field.draftSignaturePayloadPresent)).toBe(true);
    expect(draftPreflight.fields.every((field) => !field.approvalGrantEmitted)).toBe(true);
    expect(draftPreflight.fields.every((field) =>
      field.readyForSignedApprovalArtifactDraftPreflightField)).toBe(true);
    expect(draftPreflight.guards.every((guard) => guard.sourceDraftFieldReady)).toBe(true);
    expect(draftPreflight.guards.every((guard) => guard.rejectsMissingField)).toBe(true);
    expect(draftPreflight.guards.every((guard) => guard.blocksUnsignedDraft)).toBe(true);
    expect(draftPreflight.guards.every((guard) => guard.blocksAutoCapture)).toBe(true);
    expect(draftPreflight.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(draftPreflight.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(draftPreflight.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
    expect(draftPreflight.fields.map((field) => field.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_DETACHED_SIGNATURE_PLACEHOLDER");
    expect(draftPreflight.fields.map((field) => field.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_SIBLING_NON_MUTATION_LOCK");
    expect(draftPreflight.guards.map((guard) => guard.code)).toContain("ARTIFACT_DRAFT_PREFLIGHT_CLOSEOUT_GUARD");
  });

  it("fails closed when the source signed approval capture artifact preflight is blocked", () => {
    const draftPreflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFixture(false);

    expect(draftPreflight).toMatchObject({
      artifactDraftPreflightState: "blocked",
      readyForSignedApprovalArtifactDraftPreflight: false,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      draftFieldCount: 25,
      draftGuardCount: 25,
      readyDraftFieldCount: 0,
      readyDraftGuardCount: 0,
      passedGateCount: 33,
      blockedReasonCodes: [
        "SOURCE_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_NOT_READY",
        "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_FRAGMENTS_NOT_READY",
        "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_SEALS_NOT_READY",
        "ARTIFACT_DRAFT_PREFLIGHT_FIELDS_NOT_READY",
        "ARTIFACT_DRAFT_PREFLIGHT_GUARDS_NOT_READY",
        "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_NOT_PREFLIGHT_ONLY",
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
    expect(draftPreflight.fields.every((field) =>
      !field.readyForSignedApprovalArtifactDraftPreflightField)).toBe(true);
    expect(draftPreflight.guards.every((guard) =>
      !guard.readyForSignedApprovalArtifactDraftPreflightGuard)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft preflight markdown for archive review", () => {
    const draftPreflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFixture(true);
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightMarkdown(
        draftPreflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft preflight");
    expect(markdown).toContain("- Signed approval capture artifact draft preflight version: Node v1111");
    expect(markdown).toContain("- Source signed approval capture artifact preflight version: Node v1086");
    expect(markdown).toContain("- Artifact draft preflight state: ready-for-signed-approval-artifact-draft-preflight");
    expect(markdown).toContain("- Ready for signed approval artifact draft: false");
    expect(markdown).toContain("- Draft field count: 25");
    expect(markdown).toContain("- Draft guard count: 25");
    expect(markdown).toContain("- Closeout draft field count: 1");
    expect(markdown)
      .toContain("### 1. Node v1087 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_REQUEST_ID");
    expect(markdown)
      .toContain("### 25. Node v1111 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_CLOSEOUT");
    expect(markdown).toContain("### 25. Node v1111 ARTIFACT_DRAFT_PREFLIGHT_CLOSEOUT_GUARD");
    expect(markdown).toContain("- Blocks unsigned draft: true");
    expect(markdown).toContain("- Blocks runtime payload: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftPreflightVersion: "Node v1111",
        sourceSignedApprovalCaptureArtifactPreflightVersion: "Node v1086",
        draftFieldCount: 25,
        draftGuardCount: 25,
        readyForSignedApprovalArtifactDraftPreflight: true,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
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
      const artifactPreflight =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFixture(true);
      const draftPreflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight(
          artifactPreflight,
        );

      expect(artifactPreflight.readyForSignedApprovalCaptureArtifactPreflight).toBe(true);
      expect(artifactPreflight.artifactFragmentCount).toBe(25);
      expect(draftPreflight.draftFieldCount).toBe(25);
      expect(draftPreflight.draftGuardCount).toBe(25);
      expect(draftPreflight.readyDraftFieldCount).toBe(25);
      expect(draftPreflight.readyDraftGuardCount).toBe(25);
      expect(draftPreflight.readyForSignedApprovalArtifactDraftPreflight).toBe(true);
      expect(draftPreflight.readyForSignedApprovalArtifactDraft).toBe(false);
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
