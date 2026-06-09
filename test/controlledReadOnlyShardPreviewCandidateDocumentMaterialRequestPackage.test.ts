import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackageMarkdown,
} from "../src/services/controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackageFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview candidate document material request package", () => {
  it("builds twenty-five material request items and checks without accepting material", () => {
    const requestPackage = controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackageFixture(true);

    expect(requestPackage).toMatchObject({
      candidateDocumentMaterialRequestPackageVersion: "Node v1446",
      sourceCandidateDocumentIntakePacketVersion: "Node v1421",
      candidateDocumentMaterialRequestPackageState:
        "ready-for-reviewed-real-candidate-document-material-request",
      readyForCandidateDocumentMaterialRequestPackage: true,
      readyForReviewedRealCandidateDocumentSubmission: false,
      readyForCandidateDocumentMaterialIntake: false,
      readyForCandidatePayloadImport: false,
      readyForCandidateEvaluation: false,
      readyForApprovalGrant: false,
      readyForSignedApproval: false,
      materialRequestItemCount: 25,
      materialAcceptanceCheckCount: 25,
      sourceIntakeSlotCount: 10,
      sourceIntakeGuardCount: 10,
      readyMaterialRequestItemCount: 25,
      readyMaterialAcceptanceCheckCount: 25,
      requiredMaterialFieldCount: 20,
      requestedMaterialFieldCount: 20,
      reviewedRealCandidateDocumentMaterialPresent: false,
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
      candidateDocumentMaterialIntakeAllowed: false,
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
    expect(requestPackage.sourceCandidateDocumentIntakePacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(requestPackage.candidateDocumentMaterialRequestPackageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(requestPackage.requestItems).toHaveLength(25);
    expect(requestPackage.acceptanceChecks).toHaveLength(25);
    expect(requestPackage.requestItems[0]).toMatchObject({
      nodeVersion: "Node v1422",
      code: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_PRECHECK",
    });
    expect(requestPackage.requestItems[24]).toMatchObject({
      nodeVersion: "Node v1446",
      code: "CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SUBMISSION_CLOSEOUT_NOTE",
    });
    expect(requestPackage.acceptanceChecks.map((check) => check.nodeVersion))
      .toEqual(requestPackage.requestItems.map((item) => item.nodeVersion));
    expect(new Set(requestPackage.requestItems.flatMap((item) => item.sourceIntakeSlotCodes)).size)
      .toBe(10);
    expect(new Set(requestPackage.requestItems.flatMap((item) => item.sourceIntakeGuardCodes)).size)
      .toBe(10);
    expect(new Set(requestPackage.requestItems.flatMap((item) => item.materialFields)).size)
      .toBe(20);
    expect(requestPackage.requestItems.every((item) => item.readyForCandidateDocumentMaterialRequestItem))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.rejectsMissingMaterial))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.rejectsSyntheticMaterial))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.quarantinesUnreviewedMaterial))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksMaterialIntake))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksCandidatePayloadImport))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksCandidateEvaluation))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksWrites))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksSiblingMutation))
      .toBe(true);
  });

  it("fails closed when the source intake packet is blocked", () => {
    const requestPackage = controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackageFixture(false);

    expect(requestPackage).toMatchObject({
      candidateDocumentMaterialRequestPackageState: "blocked",
      readyForCandidateDocumentMaterialRequestPackage: false,
      sourceCandidateDocumentIntakePacketVersion: "Node v1421",
      materialRequestItemCount: 25,
      materialAcceptanceCheckCount: 25,
      sourceIntakeSlotCount: 10,
      sourceIntakeGuardCount: 10,
      readyMaterialRequestItemCount: 0,
      readyMaterialAcceptanceCheckCount: 0,
      requiredMaterialFieldCount: 20,
      requestedMaterialFieldCount: 20,
      reviewedRealCandidateDocumentMaterialPresent: false,
      realCandidateDocumentCount: 0,
      candidateDocumentMaterialIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
    });
    expect(requestPackage.passedGateCount).toBeLessThan(requestPackage.gateCount);
    expect(requestPackage.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_INTAKE_PACKET_NOT_READY");
    expect(requestPackage.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEMS_BLOCKED");
    expect(requestPackage.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECKS_BLOCKED");
  });

  it("renders stable candidate document material request package markdown", () => {
    const requestPackage = controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackageFixture(true);
    const markdown = renderControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackageMarkdown(requestPackage);

    expect(markdown)
      .toContain("# Controlled read-only shard preview candidate document material request package");
    expect(markdown).toContain("- Candidate document material request package version: Node v1446");
    expect(markdown)
      .toContain("- Candidate document material request package state: ready-for-reviewed-real-candidate-document-material-request");
    expect(markdown).toContain("- Material request item count: 25");
    expect(markdown).toContain("- Material acceptance check count: 25");
    expect(markdown).toContain("- Source intake slot count: 10");
    expect(markdown).toContain("- Requested material field count: 20");
    expect(markdown).toContain("- Candidate document material intake allowed: false");
    expect(markdown).toContain("### 1. Node v1422 CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_PRECHECK");
    expect(markdown)
      .toContain("### 25. Node v1446 CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SUBMISSION_CLOSEOUT_NOTE");
    expect(markdown).toContain("- Rejects missing material: true");
    expect(markdown).toContain("- Rejects synthetic material: true");
    expect(markdown).toContain("- Blocks material intake: true");
    expect(markdown).toContain("- Blocks candidate evaluation: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes the material request package in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialRequestPackage)
      .toMatchObject({
        candidateDocumentMaterialRequestPackageVersion: "Node v1446",
        sourceCandidateDocumentIntakePacketVersion: "Node v1421",
        materialRequestItemCount: 25,
        materialAcceptanceCheckCount: 25,
        sourceIntakeSlotCount: 10,
        sourceIntakeGuardCount: 10,
        requiredMaterialFieldCount: 20,
        requestedMaterialFieldCount: 20,
        readyForCandidateDocumentMaterialRequestPackage: true,
        readyForCandidateDocumentMaterialIntake: false,
        realCandidateDocumentCount: 0,
        candidateDocumentMaterialIntakeAllowed: false,
        candidatePayloadImportAllowed: false,
        candidateEvaluationAllowed: false,
        executionAllowed: false,
        writeRoutingAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      });
  });

  it("keeps the material request package fail-closed when upstream probes are disabled", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });
    const intakePacket =
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentIntakePacket;
    const requestPackage =
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialRequestPackage;

    expect(intakePacket).toMatchObject({
      candidateDocumentIntakePacketState: "blocked",
      readyForCandidateDocumentIntakePacket: false,
      intakeSlotCount: 10,
      intakeGuardCount: 10,
      intakeCandidateFieldCount: 20,
      candidateDocumentIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
    });
    expect(requestPackage).toMatchObject({
      candidateDocumentMaterialRequestPackageVersion: "Node v1446",
      candidateDocumentMaterialRequestPackageState: "blocked",
      readyForCandidateDocumentMaterialRequestPackage: false,
      materialRequestItemCount: 25,
      materialAcceptanceCheckCount: 25,
      requestedMaterialFieldCount: 20,
      reviewedRealCandidateDocumentMaterialPresent: false,
      candidateDocumentMaterialIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(requestPackage.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_MATERIAL_REQUEST_SOURCE_INTAKE_PACKET_NOT_READY");
  });

  it("keeps the material request package ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialRequestPackage)
        .toMatchObject({
          candidateDocumentMaterialRequestPackageVersion: "Node v1446",
          readyForCandidateDocumentMaterialRequestPackage: true,
          readyForCandidateDocumentMaterialIntake: false,
          materialRequestItemCount: 25,
          materialAcceptanceCheckCount: 25,
          requiredMaterialFieldCount: 20,
          requestedMaterialFieldCount: 20,
          realCandidateDocumentCount: 0,
          candidateDocumentMaterialIntakeAllowed: false,
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
