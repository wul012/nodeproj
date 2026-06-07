import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft authoring readiness", () => {
  it("builds twenty-five authoring requirements and blockers from review package preflight", () => {
    const readiness =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessFixture(
        true,
      );

    expect(readiness).toMatchObject({
      signedApprovalCaptureArtifactDraftAuthoringReadinessVersion: "Node v1186",
      sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: "Node v1161",
      artifactDraftAuthoringReadinessState:
        "ready-for-signed-approval-artifact-draft-authoring-readiness",
      readyForSignedApprovalArtifactDraftAuthoringReadiness: true,
      readyForHumanSignedApprovalDraftArtifactAuthoring: true,
      readyForManualSignedApprovalDraftReviewPackage: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      authoringRequirementCount: 25,
      authoringBlockerCount: 25,
      identityAuthoringRequirementCount: 4,
      digestBindingAuthoringRequirementCount: 4,
      signatureEnvelopeAuthoringRequirementCount: 3,
      sourceEvidenceAuthoringRequirementCount: 3,
      valueBindingAuthoringRequirementCount: 2,
      policyAuthoringRequirementCount: 3,
      executionLockAuthoringRequirementCount: 5,
      archiveCloseoutAuthoringRequirementCount: 1,
      digestModeAuthoringRequirementCount: 5,
      readyAuthoringRequirementCount: 25,
      readyAuthoringBlockerCount: 25,
      digestBindingAuthoringBlockerCount: 4,
      signatureEnvelopeAuthoringBlockerCount: 3,
      policyAuthoringBlockerCount: 3,
      executionLockAuthoringBlockerCount: 5,
      archiveCloseoutAuthoringBlockerCount: 1,
      authoringInstructionMaterializedCount: 0,
      draftArtifactCreated: false,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 51,
      passedGateCount: 51,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalCaptureArtifactDraftReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(readiness.requirements.map((requirement) => requirement.nodeVersion)).toEqual([
      "Node v1162",
      "Node v1163",
      "Node v1164",
      "Node v1165",
      "Node v1166",
      "Node v1167",
      "Node v1168",
      "Node v1169",
      "Node v1170",
      "Node v1171",
      "Node v1172",
      "Node v1173",
      "Node v1174",
      "Node v1175",
      "Node v1176",
      "Node v1177",
      "Node v1178",
      "Node v1179",
      "Node v1180",
      "Node v1181",
      "Node v1182",
      "Node v1183",
      "Node v1184",
      "Node v1185",
      "Node v1186",
    ]);
    expect(readiness.blockers.map((blocker) => blocker.nodeVersion))
      .toEqual(readiness.requirements.map((requirement) => requirement.nodeVersion));
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageSlotReady)).toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageGuardReady)).toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageSlotReadOnly)).toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageGuardReadOnly)).toBe(true);
    expect(readiness.requirements.every((requirement) => !requirement.sourcePackageSlotMaterialized)).toBe(true);
    expect(readiness.requirements.every((requirement) => !requirement.sourcePackageArtifactCreated)).toBe(true);
    expect(readiness.requirements.every((requirement) => !requirement.sourceSignedDraftTextPresent)).toBe(true);
    expect(readiness.requirements.every((requirement) => !requirement.sourceDraftSignaturePayloadPresent)).toBe(true);
    expect(readiness.requirements.every((requirement) => !requirement.sourceApprovalGrantPresent)).toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageGuardBlocksPackageMaterialization))
      .toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageGuardBlocksSignedDraftText))
      .toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageGuardBlocksSignaturePayload))
      .toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.sourcePackageGuardBlocksApprovalGrant))
      .toBe(true);
    expect(readiness.requirements.every((requirement) => requirement.requiredPackageSlotModeCovered)).toBe(true);
    expect(readiness.requirements.every((requirement) =>
      requirement.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.sourceAuthoringRequirementReady)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.rejectsMissingAuthoringRequirement)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksAuthoringInstructionMaterialization)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksDraftArtifactCreation)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksSignedDraftText)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksSignaturePayload)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksApprovalGrant)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksRuntimePayload)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksWrites)).toBe(true);
    expect(readiness.blockers.every((blocker) => blocker.blocksSiblingMutation)).toBe(true);
    expect(readiness.requirements.map((requirement) => requirement.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_DETACHED_SIGNATURE");
    expect(readiness.requirements.map((requirement) => requirement.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_SIBLING_NON_MUTATION");
    expect(readiness.blockers.map((blocker) => blocker.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_CLOSEOUT_BLOCKER");
  });

  it("fails closed when the source review package preflight is blocked", () => {
    const readiness =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessFixture(
        false,
      );

    expect(readiness).toMatchObject({
      artifactDraftAuthoringReadinessState: "blocked",
      readyForSignedApprovalArtifactDraftAuthoringReadiness: false,
      readyForHumanSignedApprovalDraftArtifactAuthoring: false,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      authoringRequirementCount: 25,
      authoringBlockerCount: 25,
      readyAuthoringRequirementCount: 0,
      readyAuthoringBlockerCount: 0,
      authoringInstructionMaterializedCount: 0,
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
    expect(readiness.passedGateCount).toBeLessThan(readiness.gateCount);
    expect(readiness.blockedReasonCodes).toEqual([
      "SOURCE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_NOT_READY",
      "ARTIFACT_DRAFT_AUTHORING_SOURCE_SLOTS_NOT_READY",
      "ARTIFACT_DRAFT_AUTHORING_SOURCE_GUARDS_NOT_READY",
      "ARTIFACT_DRAFT_AUTHORING_REQUIREMENTS_NOT_READY",
      "ARTIFACT_DRAFT_AUTHORING_BLOCKERS_NOT_READY",
      "ARTIFACT_DRAFT_AUTHORING_DIGEST_REQUIREMENTS_NOT_READY",
      "ARTIFACT_DRAFT_AUTHORING_NOT_READY_OR_MATERIALIZED",
    ]);
    expect(readiness.requirements.every((requirement) =>
      !requirement.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement)).toBe(true);
    expect(readiness.blockers.every((blocker) =>
      !blocker.readyForHumanSignedApprovalDraftArtifactAuthoringBlocker)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft authoring readiness markdown", () => {
    const readiness =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessMarkdown(
        readiness,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft authoring readiness");
    expect(markdown).toContain("- Signed approval capture artifact draft authoring readiness version: Node v1186");
    expect(markdown).toContain("- Source signed approval capture artifact draft review package preflight version: Node v1161");
    expect(markdown)
      .toContain("- Artifact draft authoring readiness state: ready-for-signed-approval-artifact-draft-authoring-readiness");
    expect(markdown).toContain("- Ready for human signed approval draft artifact authoring: true");
    expect(markdown).toContain("- Ready for signed approval artifact draft: false");
    expect(markdown).toContain("- Authoring requirement count: 25");
    expect(markdown).toContain("- Authoring blocker count: 25");
    expect(markdown).toContain("- Signed draft text count: 0");
    expect(markdown)
      .toContain("### 1. Node v1162 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REQUEST_MANIFEST");
    expect(markdown)
      .toContain("### 25. Node v1186 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_CLOSEOUT");
    expect(markdown)
      .toContain("### 25. Node v1186 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_CLOSEOUT_BLOCKER");
    expect(markdown).toContain("- Blocks draft artifact creation: true");
    expect(markdown).toContain("- Blocks approval grant: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft authoring readiness in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftAuthoringReadinessVersion: "Node v1186",
        sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: "Node v1161",
        authoringRequirementCount: 25,
        authoringBlockerCount: 25,
        readyForSignedApprovalArtifactDraftAuthoringReadiness: true,
        readyForHumanSignedApprovalDraftArtifactAuthoring: true,
        readyForManualSignedApprovalDraftReviewPackage: true,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        authoringInstructionMaterializedCount: 0,
        draftArtifactCreated: false,
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
      const preflight =
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightFixture(
          true,
        );
      const readiness =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness(
          preflight,
        );

      expect(preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight).toBe(true);
      expect(preflight.packageSlotCount).toBe(25);
      expect(preflight.packageGuardCount).toBe(25);
      expect(readiness.authoringRequirementCount).toBe(25);
      expect(readiness.authoringBlockerCount).toBe(25);
      expect(readiness.readyAuthoringRequirementCount).toBe(25);
      expect(readiness.readyAuthoringBlockerCount).toBe(25);
      expect(readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness).toBe(true);
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
