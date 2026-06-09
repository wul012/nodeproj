import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewCandidateDocumentIntakePacketMarkdown,
} from "../src/services/controlledReadOnlyShardPreviewCandidateDocumentIntakePacketRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewCandidateDocumentIntakePacketFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview candidate document intake packet", () => {
  it("builds ten intake slots and guards while still waiting for reviewed real material", () => {
    const packet = controlledReadOnlyShardPreviewCandidateDocumentIntakePacketFixture(true);

    expect(packet).toMatchObject({
      candidateDocumentIntakePacketVersion: "Node v1421",
      sourceCandidateDocumentSubmissionPrecheckVersion: "Node v1411",
      candidateDocumentIntakePacketState:
        "ready-for-reviewed-real-candidate-document-intake-packet",
      readyForCandidateDocumentIntakePacket: true,
      readyForReviewedRealCandidateDocumentIntake: false,
      readyForCandidatePayloadImport: false,
      readyForCandidateEvaluation: false,
      readyForApprovalGrant: false,
      readyForSignedApproval: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      intakeSlotCount: 10,
      intakeGuardCount: 10,
      sourceCheckpointCount: 25,
      sourceValidatorCount: 25,
      readyIntakeSlotCount: 10,
      readyIntakeGuardCount: 10,
      requiredCandidateFieldCount: 20,
      intakeCandidateFieldCount: 20,
      reviewedRealCandidateDocumentPresent: false,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      stagedCandidateDocumentCount: 0,
      importedCandidatePayloadCount: 0,
      evaluatedCandidatePayloadCount: 0,
      acceptedCandidatePayloadCount: 0,
      rejectedCandidatePayloadCount: 0,
      gateCount: 35,
      passedGateCount: 35,
      blockedReasonCodes: [],
      candidateDocumentSubmissionAllowed: false,
      candidateDocumentIntakeAllowed: false,
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
    expect(packet.sourceCandidateDocumentSubmissionPrecheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(packet.candidateDocumentIntakePacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(packet.slots.map((slot) => slot.nodeVersion)).toEqual([
      "Node v1412",
      "Node v1413",
      "Node v1414",
      "Node v1415",
      "Node v1416",
      "Node v1417",
      "Node v1418",
      "Node v1419",
      "Node v1420",
      "Node v1421",
    ]);
    expect(packet.guards.map((guard) => guard.nodeVersion))
      .toEqual(packet.slots.map((slot) => slot.nodeVersion));
    expect(new Set(packet.slots.flatMap((slot) => slot.sourceCheckpointCodes)).size)
      .toBe(25);
    expect(new Set(packet.slots.flatMap((slot) => slot.sourceValidatorCodes)).size)
      .toBe(25);
    expect(new Set(packet.slots.flatMap((slot) => slot.candidateFields)).size)
      .toBe(20);
    expect(packet.slots.every((slot) => slot.readyForCandidateDocumentIntakeSlot)).toBe(true);
    expect(packet.slots.every((slot) => slot.requiresReviewedRealCandidateDocument)).toBe(true);
    expect(packet.guards.every((guard) => guard.rejectsMissingCandidateDocument)).toBe(true);
    expect(packet.guards.every((guard) => guard.rejectsSyntheticCandidateDocument)).toBe(true);
    expect(packet.guards.every((guard) => guard.quarantinesUnreviewedCandidateDocument)).toBe(true);
    expect(packet.guards.every((guard) => guard.blocksCandidatePayloadImport)).toBe(true);
    expect(packet.guards.every((guard) => guard.blocksCandidateEvaluation)).toBe(true);
    expect(packet.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(packet.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(packet.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
  });

  it("fails closed when the source submission precheck is blocked", () => {
    const packet = controlledReadOnlyShardPreviewCandidateDocumentIntakePacketFixture(false);

    expect(packet).toMatchObject({
      candidateDocumentIntakePacketState: "blocked",
      readyForCandidateDocumentIntakePacket: false,
      sourceCandidateDocumentSubmissionPrecheckVersion: "Node v1411",
      intakeSlotCount: 10,
      intakeGuardCount: 10,
      sourceCheckpointCount: 25,
      sourceValidatorCount: 25,
      readyIntakeSlotCount: 0,
      readyIntakeGuardCount: 0,
      requiredCandidateFieldCount: 20,
      intakeCandidateFieldCount: 20,
      reviewedRealCandidateDocumentPresent: false,
      realCandidateDocumentCount: 0,
      candidateDocumentIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
    });
    expect(packet.passedGateCount).toBeLessThan(packet.gateCount);
    expect(packet.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_PRECHECK_NOT_READY");
    expect(packet.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_INTAKE_PACKET_SLOTS_BLOCKED");
    expect(packet.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_BLOCKED");
  });

  it("renders stable candidate document intake packet markdown", () => {
    const packet = controlledReadOnlyShardPreviewCandidateDocumentIntakePacketFixture(true);
    const markdown = renderControlledReadOnlyShardPreviewCandidateDocumentIntakePacketMarkdown(packet);

    expect(markdown).toContain("# Controlled read-only shard preview candidate document intake packet");
    expect(markdown).toContain("- Candidate document intake packet version: Node v1421");
    expect(markdown)
      .toContain("- Candidate document intake packet state: ready-for-reviewed-real-candidate-document-intake-packet");
    expect(markdown).toContain("- Intake slot count: 10");
    expect(markdown).toContain("- Intake guard count: 10");
    expect(markdown).toContain("- Source checkpoint count: 25");
    expect(markdown).toContain("- Required candidate field count: 20");
    expect(markdown).toContain("- Candidate document intake allowed: false");
    expect(markdown).toContain("### 1. Node v1412 CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_PRECHECK");
    expect(markdown).toContain("### 10. Node v1421 CANDIDATE_DOCUMENT_INTAKE_PACKET_ARCHIVE_HANDOFF_CLOSEOUT");
    expect(markdown).toContain("- Rejects missing candidate document: true");
    expect(markdown).toContain("- Rejects synthetic candidate document: true");
    expect(markdown).toContain("- Blocks candidate payload import: true");
    expect(markdown).toContain("- Blocks candidate evaluation: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes the candidate document intake packet in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentIntakePacket)
      .toMatchObject({
        candidateDocumentIntakePacketVersion: "Node v1421",
        sourceCandidateDocumentSubmissionPrecheckVersion: "Node v1411",
        intakeSlotCount: 10,
        intakeGuardCount: 10,
        sourceCheckpointCount: 25,
        sourceValidatorCount: 25,
        requiredCandidateFieldCount: 20,
        intakeCandidateFieldCount: 20,
        readyForCandidateDocumentIntakePacket: true,
        readyForReviewedRealCandidateDocumentIntake: false,
        readyForCandidatePayloadImport: false,
        readyForCandidateEvaluation: false,
        realCandidateDocumentCount: 0,
        candidateDocumentSubmissionAllowed: false,
        candidateDocumentIntakeAllowed: false,
        candidatePayloadImportAllowed: false,
        executionAllowed: false,
        writeRoutingAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      });
  });

  it("keeps the intake packet ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentIntakePacket)
        .toMatchObject({
          candidateDocumentIntakePacketVersion: "Node v1421",
          readyForCandidateDocumentIntakePacket: true,
          readyForReviewedRealCandidateDocumentIntake: false,
          intakeSlotCount: 10,
          intakeGuardCount: 10,
          requiredCandidateFieldCount: 20,
          intakeCandidateFieldCount: 20,
          realCandidateDocumentCount: 0,
          candidateDocumentIntakeAllowed: false,
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
