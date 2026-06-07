import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCapturePreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact preflight", () => {
  it("builds twenty-five artifact fragments and seals from the signed approval capture preflight", () => {
    const artifactPreflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFixture(true);

    expect(artifactPreflight).toMatchObject({
      signedApprovalCaptureArtifactPreflightVersion: "Node v1086",
      sourceSignedApprovalCapturePreflightVersion: "Node v1061",
      artifactPreflightState: "ready-for-signed-approval-capture-artifact-preflight",
      readyForSignedApprovalCaptureArtifactPreflight: true,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      artifactFragmentCount: 25,
      artifactSealCount: 25,
      identityFragmentCount: 4,
      digestBindingFragmentCount: 4,
      signatureEnvelopeFragmentCount: 3,
      sourceEvidenceFragmentCount: 3,
      valueBindingFragmentCount: 2,
      policyFragmentCount: 3,
      executionLockFragmentCount: 5,
      closeoutFragmentCount: 1,
      requiredFragmentCount: 25,
      readyFragmentCount: 25,
      readySealCount: 25,
      artifactBlockerCount: 25,
      digestBindingSealCount: 4,
      signatureEnvelopeSealCount: 3,
      policySealCount: 3,
      noExecutionSealCount: 5,
      artifactMaterializedCount: 0,
      rawSignatureMaterialCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 36,
      passedGateCount: 36,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(artifactPreflight.sourceSignedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(artifactPreflight.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(artifactPreflight.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(artifactPreflight.signedApprovalCaptureArtifactPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(artifactPreflight.fragments.map((fragment) => fragment.nodeVersion)).toEqual([
      "Node v1062",
      "Node v1063",
      "Node v1064",
      "Node v1065",
      "Node v1066",
      "Node v1067",
      "Node v1068",
      "Node v1069",
      "Node v1070",
      "Node v1071",
      "Node v1072",
      "Node v1073",
      "Node v1074",
      "Node v1075",
      "Node v1076",
      "Node v1077",
      "Node v1078",
      "Node v1079",
      "Node v1080",
      "Node v1081",
      "Node v1082",
      "Node v1083",
      "Node v1084",
      "Node v1085",
      "Node v1086",
    ]);
    expect(artifactPreflight.seals.map((seal) => seal.nodeVersion))
      .toEqual(artifactPreflight.fragments.map((fragment) => fragment.nodeVersion));
    expect(artifactPreflight.fragments.every((fragment) => fragment.sourceCaptureInputReady)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) => fragment.sourceCaptureInputRequired)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) => fragment.sourceCaptureStillBlocked)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) => fragment.requiredCaptureInputPresent)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) => fragment.requiredForArtifactPreflight)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) => !fragment.artifactMaterialized)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) => !fragment.rawSignatureMaterialPresent)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) => !fragment.approvalGrantEmitted)).toBe(true);
    expect(artifactPreflight.fragments.every((fragment) =>
      fragment.readyForSignedApprovalCaptureArtifactPreflightFragment)).toBe(true);
    expect(artifactPreflight.seals.every((seal) => seal.sourceArtifactFragmentReady)).toBe(true);
    expect(artifactPreflight.seals.every((seal) => seal.rejectsMissingFragment)).toBe(true);
    expect(artifactPreflight.seals.every((seal) => seal.blocksUnsignedArtifact)).toBe(true);
    expect(artifactPreflight.seals.every((seal) => seal.blocksAutoMaterialization)).toBe(true);
    expect(artifactPreflight.seals.every((seal) => seal.blocksRuntimePayload)).toBe(true);
    expect(artifactPreflight.seals.every((seal) => seal.blocksWrites)).toBe(true);
    expect(artifactPreflight.seals.every((seal) => seal.blocksSiblingMutation)).toBe(true);
    expect(artifactPreflight.fragments.map((fragment) => fragment.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_DETACHED_SIGNATURE_PLACEHOLDER");
    expect(artifactPreflight.fragments.map((fragment) => fragment.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SIBLING_NON_MUTATION_LOCK");
    expect(artifactPreflight.seals.map((seal) => seal.code)).toContain("ARTIFACT_PREFLIGHT_CLOSEOUT_SEAL");
  });

  it("fails closed when the source signed approval capture preflight is blocked", () => {
    const artifactPreflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFixture(false);

    expect(artifactPreflight).toMatchObject({
      artifactPreflightState: "blocked",
      readyForSignedApprovalCaptureArtifactPreflight: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      artifactFragmentCount: 25,
      artifactSealCount: 25,
      readyFragmentCount: 0,
      readySealCount: 0,
      passedGateCount: 31,
      blockedReasonCodes: [
        "SOURCE_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_NOT_READY",
        "ARTIFACT_PREFLIGHT_SOURCE_CAPTURE_INPUTS_NOT_READY",
        "ARTIFACT_PREFLIGHT_FRAGMENTS_NOT_READY",
        "ARTIFACT_PREFLIGHT_SEALS_NOT_READY",
        "ARTIFACT_PREFLIGHT_SOURCE_NOT_PREFLIGHT_ONLY",
      ],
      artifactMaterializedCount: 0,
      rawSignatureMaterialCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(artifactPreflight.fragments.every((fragment) =>
      !fragment.readyForSignedApprovalCaptureArtifactPreflightFragment)).toBe(true);
    expect(artifactPreflight.seals.every((seal) =>
      !seal.readyForSignedApprovalCaptureArtifactPreflightSeal)).toBe(true);
  });

  it("renders stable signed approval capture artifact preflight markdown for archive review", () => {
    const artifactPreflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFixture(true);
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightMarkdown(
        artifactPreflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact preflight");
    expect(markdown).toContain("- Signed approval capture artifact preflight version: Node v1086");
    expect(markdown).toContain("- Source signed approval capture preflight version: Node v1061");
    expect(markdown).toContain("- Artifact preflight state: ready-for-signed-approval-capture-artifact-preflight");
    expect(markdown).toContain("- Ready for signed approval capture: false");
    expect(markdown).toContain("- Artifact fragment count: 25");
    expect(markdown).toContain("- Artifact seal count: 25");
    expect(markdown).toContain("- Closeout fragment count: 1");
    expect(markdown).toContain("### 1. Node v1062 SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_REQUEST_ID");
    expect(markdown).toContain("### 25. Node v1086 SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_CLOSEOUT");
    expect(markdown).toContain("### 25. Node v1086 ARTIFACT_PREFLIGHT_CLOSEOUT_SEAL");
    expect(markdown).toContain("- Blocks unsigned artifact: true");
    expect(markdown).toContain("- Blocks runtime payload: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactPreflightVersion: "Node v1086",
        sourceSignedApprovalCapturePreflightVersion: "Node v1061",
        artifactFragmentCount: 25,
        artifactSealCount: 25,
        readyForSignedApprovalCaptureArtifactPreflight: true,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        artifactMaterializedCount: 0,
        rawSignatureMaterialCount: 0,
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
        controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCapturePreflightFixture(true);
      const artifactPreflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight(
          preflight,
        );

      expect(preflight.readyForSignedApprovalCapturePreflight).toBe(true);
      expect(preflight.captureInputCount).toBe(25);
      expect(artifactPreflight.artifactFragmentCount).toBe(25);
      expect(artifactPreflight.artifactSealCount).toBe(25);
      expect(artifactPreflight.readyFragmentCount).toBe(25);
      expect(artifactPreflight.readySealCount).toBe(25);
      expect(artifactPreflight.readyForSignedApprovalCaptureArtifactPreflight).toBe(true);
      expect(artifactPreflight.readyForSignedApprovalCapture).toBe(false);
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
