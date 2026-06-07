import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCapturePreflightFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalTemplateFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture preflight", () => {
  it("builds a twenty-five-input and twenty-five-attestation signed approval capture preflight", () => {
    const preflight = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCapturePreflightFixture(
      true,
    );

    expect(preflight).toMatchObject({
      signedApprovalCapturePreflightVersion: "Node v1061",
      sourceSignedApprovalTemplateVersion: "Node v1036",
      preflightState: "ready-for-signed-approval-capture-preflight",
      readyForSignedApprovalCapturePreflight: true,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      captureInputCount: 25,
      captureAttestationCount: 25,
      identityInputCount: 4,
      timeInputCount: 1,
      digestBindingInputCount: 2,
      captureChannelInputCount: 1,
      signaturePolicyInputCount: 2,
      operatorStatementInputCount: 2,
      sourceEvidenceInputCount: 3,
      valueBindingInputCount: 2,
      policyInputCount: 2,
      executionLockInputCount: 5,
      closeoutInputCount: 1,
      requiredInputCount: 25,
      readyInputCount: 25,
      readyAttestationCount: 25,
      missingInputBlockerCount: 25,
      digestBindingAttestationCount: 2,
      policyAttestationCount: 4,
      noExecutionAttestationCount: 5,
      captureValueProvidedCount: 0,
      rawSignatureMaterialCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 35,
      passedGateCount: 35,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.sourceSignedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.signedApprovalCapturePreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.inputs.map((input) => input.nodeVersion)).toEqual([
      "Node v1037",
      "Node v1038",
      "Node v1039",
      "Node v1040",
      "Node v1041",
      "Node v1042",
      "Node v1043",
      "Node v1044",
      "Node v1045",
      "Node v1046",
      "Node v1047",
      "Node v1048",
      "Node v1049",
      "Node v1050",
      "Node v1051",
      "Node v1052",
      "Node v1053",
      "Node v1054",
      "Node v1055",
      "Node v1056",
      "Node v1057",
      "Node v1058",
      "Node v1059",
      "Node v1060",
      "Node v1061",
    ]);
    expect(preflight.attestations.map((attestation) => attestation.nodeVersion))
      .toEqual(preflight.inputs.map((input) => input.nodeVersion));
    expect(preflight.inputs.every((input) => input.sourceTemplateFieldReady)).toBe(true);
    expect(preflight.inputs.every((input) => input.sourceTemplateFieldRequired)).toBe(true);
    expect(preflight.inputs.every((input) => input.sourceTemplateCaptureBlocked)).toBe(true);
    expect(preflight.inputs.every((input) => input.requiredTemplateFieldPresent)).toBe(true);
    expect(preflight.inputs.every((input) => input.requiredForCapturePreflight)).toBe(true);
    expect(preflight.inputs.every((input) => !input.captureValueProvided && !input.capturedNow)).toBe(true);
    expect(preflight.inputs.every((input) => !input.rawSignatureMaterialPresent)).toBe(true);
    expect(preflight.inputs.every((input) => !input.approvalGrantEmitted)).toBe(true);
    expect(preflight.inputs.every((input) => input.readyForSignedApprovalCapturePreflightInput)).toBe(true);
    expect(preflight.attestations.every((attestation) => attestation.sourceCaptureInputReady)).toBe(true);
    expect(preflight.attestations.every((attestation) => attestation.rejectsMissingInput)).toBe(true);
    expect(preflight.attestations.every((attestation) => attestation.blocksUnsignedCapture)).toBe(true);
    expect(preflight.attestations.every((attestation) => attestation.blocksAutoCapture)).toBe(true);
    expect(preflight.attestations.every((attestation) => attestation.blocksRuntimePayload)).toBe(true);
    expect(preflight.attestations.every((attestation) => attestation.blocksWrites)).toBe(true);
    expect(preflight.attestations.every((attestation) => attestation.blocksSiblingMutation)).toBe(true);
    expect(preflight.inputs.map((input) => input.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_PREFLIGHT_SIGNATURE_REDACTION");
    expect(preflight.inputs.map((input) => input.code))
      .toContain("SIGNED_APPROVAL_CAPTURE_PREFLIGHT_SIBLING_NON_MUTATION_LOCK");
    expect(preflight.attestations.map((attestation) => attestation.code))
      .toContain("CAPTURE_PREFLIGHT_CLOSEOUT_ONLY");
  });

  it("fails closed when the source signed approval template is blocked", () => {
    const preflight = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCapturePreflightFixture(
      false,
    );

    expect(preflight).toMatchObject({
      preflightState: "blocked",
      readyForSignedApprovalCapturePreflight: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      captureInputCount: 25,
      captureAttestationCount: 25,
      readyInputCount: 0,
      readyAttestationCount: 0,
      passedGateCount: 30,
      blockedReasonCodes: [
        "SOURCE_SIGNED_APPROVAL_TEMPLATE_NOT_READY",
        "CAPTURE_PREFLIGHT_SOURCE_TEMPLATE_FIELDS_NOT_READY",
        "CAPTURE_PREFLIGHT_INPUTS_NOT_READY",
        "CAPTURE_PREFLIGHT_ATTESTATIONS_NOT_READY",
        "CAPTURE_PREFLIGHT_SOURCE_TEMPLATE_NOT_PREFLIGHT_ONLY",
      ],
      captureValueProvidedCount: 0,
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
    expect(preflight.inputs.every((input) => !input.readyForSignedApprovalCapturePreflightInput)).toBe(true);
    expect(preflight.attestations.every((attestation) =>
      !attestation.readyForSignedApprovalCapturePreflightAttestation)).toBe(true);
  });

  it("renders stable signed approval capture preflight markdown for archive review", () => {
    const preflight = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCapturePreflightFixture(
      true,
    );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightMarkdown(
        preflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture preflight");
    expect(markdown).toContain("- Signed approval capture preflight version: Node v1061");
    expect(markdown).toContain("- Preflight state: ready-for-signed-approval-capture-preflight");
    expect(markdown).toContain("- Ready for signed approval capture: false");
    expect(markdown).toContain("- Capture input count: 25");
    expect(markdown).toContain("- Capture attestation count: 25");
    expect(markdown).toContain("### 1. Node v1037 SIGNED_APPROVAL_CAPTURE_PREFLIGHT_REQUEST_ID");
    expect(markdown).toContain("### 25. Node v1061 SIGNED_APPROVAL_CAPTURE_PREFLIGHT_CLOSEOUT");
    expect(markdown).toContain("### 25. Node v1061 CAPTURE_PREFLIGHT_CLOSEOUT_ONLY");
    expect(markdown).toContain("- Blocks unsigned capture: true");
    expect(markdown).toContain("- Blocks runtime payload: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight)
      .toMatchObject({
        signedApprovalCapturePreflightVersion: "Node v1061",
        sourceSignedApprovalTemplateVersion: "Node v1036",
        captureInputCount: 25,
        captureAttestationCount: 25,
        readyForSignedApprovalCapturePreflight: true,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        captureValueProvidedCount: 0,
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
      const template = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalTemplateFixture(true);
      const preflight =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight(
          template,
        );

      expect(template.readyForSignedApprovalTemplatePreflight).toBe(true);
      expect(template.templateFieldCount).toBe(25);
      expect(preflight.captureInputCount).toBe(25);
      expect(preflight.captureAttestationCount).toBe(25);
      expect(preflight.readyInputCount).toBe(25);
      expect(preflight.readyAttestationCount).toBe(25);
      expect(preflight.readyForSignedApprovalCapturePreflight).toBe(true);
      expect(preflight.readyForSignedApprovalCapture).toBe(false);
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
