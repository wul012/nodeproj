import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview compared evidence evaluation preflight", () => {
  it("builds twenty evaluation rules and guards while waiting for real compared package evidence", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightFixture(
        true,
      );

    expect(preflight).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: "Node v1351",
      sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331",
      artifactDraftTextPackageComparedEvidenceEvaluationPreflightState:
        "waiting-for-real-compared-package-evidence",
      readyForComparedEvidenceEvaluationPreflightContract: true,
      readyForRealComparedPackageEvidenceEvaluation: false,
      readyForManualComparedPackageEvidenceIntakeContract: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      evaluationRuleCount: 20,
      evaluationGuardCount: 20,
      sourceIntakeSlotCount: 10,
      sourceIntakeGuardCount: 10,
      readyEvaluationRuleCount: 20,
      readyEvaluationGuardCount: 20,
      satisfiedEvaluationRuleCount: 0,
      expectedRealComparedPackageEvidenceCandidateFieldCount: 20,
      realComparedPackageEvidenceCandidateCount: 0,
      syntheticComparedPackageEvidenceCandidateCount: 0,
      candidateMaterializedCount: 0,
      candidateAcceptedCount: 0,
      candidateRejectedCount: 0,
      acceptedComparedPackageEvidenceCount: 0,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 43,
      passedGateCount: 43,
      blockedReasonCodes: [],
      evaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.rules.map((rule) => rule.nodeVersion)).toEqual([
      "Node v1332",
      "Node v1333",
      "Node v1334",
      "Node v1335",
      "Node v1336",
      "Node v1337",
      "Node v1338",
      "Node v1339",
      "Node v1340",
      "Node v1341",
      "Node v1342",
      "Node v1343",
      "Node v1344",
      "Node v1345",
      "Node v1346",
      "Node v1347",
      "Node v1348",
      "Node v1349",
      "Node v1350",
      "Node v1351",
    ]);
    expect(preflight.guards.map((guard) => guard.nodeVersion))
      .toEqual(preflight.rules.map((rule) => rule.nodeVersion));
    expect(preflight.rules.every((rule) => rule.readyForComparedEvidenceEvaluationRule)).toBe(true);
    expect(preflight.rules.every((rule) => !rule.realEvidenceCandidateSatisfied)).toBe(true);
    expect(preflight.rules.every((rule) => !rule.candidateValuePresent)).toBe(true);
    expect(preflight.guards.every((guard) => guard.rejectsMissingCandidate)).toBe(true);
    expect(preflight.guards.every((guard) => guard.rejectsSyntheticCandidate)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksCandidateAcceptance)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(preflight.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
  });

  it("fails closed when the compared package evidence intake is blocked", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightFixture(
        false,
      );

    expect(preflight).toMatchObject({
      artifactDraftTextPackageComparedEvidenceEvaluationPreflightState: "blocked",
      readyForComparedEvidenceEvaluationPreflightContract: false,
      readyForRealComparedPackageEvidenceEvaluation: false,
      evaluationRuleCount: 20,
      evaluationGuardCount: 20,
      readyEvaluationRuleCount: 0,
      readyEvaluationGuardCount: 0,
      satisfiedEvaluationRuleCount: 0,
      realComparedPackageEvidenceCandidateCount: 0,
      syntheticComparedPackageEvidenceCandidateCount: 0,
      candidateAcceptedCount: 0,
      acceptedComparedPackageEvidenceCount: 0,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      evaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(preflight.passedGateCount).toBeLessThan(preflight.gateCount);
    expect(preflight.blockedReasonCodes).toContain("SOURCE_COMPARED_PACKAGE_EVIDENCE_INTAKE_NOT_READY");
    expect(preflight.blockedReasonCodes).toContain("COMPARED_EVIDENCE_EVALUATION_RULES_BLOCKED");
    expect(preflight.blockedReasonCodes).toContain("COMPARED_EVIDENCE_EVALUATION_GUARDS_BLOCKED");
  });

  it("renders stable compared evidence evaluation preflight markdown", () => {
    const preflight =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightMarkdown(
        preflight,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared evidence evaluation preflight");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package compared evidence evaluation preflight version: Node v1351");
    expect(markdown)
      .toContain("- Artifact draft text package compared evidence evaluation preflight state: waiting-for-real-compared-package-evidence");
    expect(markdown).toContain("- Evaluation rule count: 20");
    expect(markdown).toContain("- Real compared package evidence candidate count: 0");
    expect(markdown).toContain("- Evaluation allowed: false");
    expect(markdown)
      .toContain("### 1. Node v1332 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_SOURCE_INTAKE_RULE");
    expect(markdown)
      .toContain("### 20. Node v1351 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_CLOSEOUT_RULE");
    expect(markdown).toContain("- Rejects missing candidate: true");
    expect(markdown).toContain("- Rejects synthetic candidate: true");
    expect(markdown).toContain("- Blocks candidate acceptance: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes compared evidence evaluation preflight in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: "Node v1351",
        sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331",
        evaluationRuleCount: 20,
        evaluationGuardCount: 20,
        sourceIntakeSlotCount: 10,
        sourceIntakeGuardCount: 10,
        readyForComparedEvidenceEvaluationPreflightContract: true,
        readyForRealComparedPackageEvidenceEvaluation: false,
        realComparedPackageEvidenceCandidateCount: 0,
        syntheticComparedPackageEvidenceCandidateCount: 0,
        candidateMaterializedCount: 0,
        candidateAcceptedCount: 0,
        acceptedComparedPackageEvidenceCount: 0,
        approvalGrantPresent: false,
        signedApprovalPresent: false,
        evaluationAllowed: false,
        executionAllowed: false,
        writeRoutingAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
        importsRuntimePayload: false,
        acceptsSyntheticEvidence: false,
        containsSecretValue: false,
      });
  });

  it("keeps evaluation preflight contract ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight)
        .toMatchObject({
          signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: "Node v1351",
          readyForComparedEvidenceEvaluationPreflightContract: true,
          readyForRealComparedPackageEvidenceEvaluation: false,
          evaluationRuleCount: 20,
          evaluationGuardCount: 20,
          realComparedPackageEvidenceCandidateCount: 0,
          evaluationAllowed: false,
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
