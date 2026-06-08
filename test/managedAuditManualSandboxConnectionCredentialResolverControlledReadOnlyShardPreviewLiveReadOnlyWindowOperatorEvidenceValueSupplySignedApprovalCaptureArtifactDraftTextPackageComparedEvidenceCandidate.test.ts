import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview compared evidence candidate blueprint", () => {
  it("builds ten candidate blueprint sections while waiting for real compared package evidence", () => {
    const candidate =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateFixture(
        true,
      );

    expect(candidate).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361",
      sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
        "Node v1351",
      artifactDraftTextPackageComparedEvidenceCandidateState:
        "waiting-for-real-compared-package-evidence-candidate",
      readyForComparedEvidenceCandidateBlueprintContract: true,
      readyForRealComparedPackageEvidenceCandidateIntake: false,
      readyForComparedEvidenceEvaluationPreflightContract: true,
      readyForRealComparedPackageEvidenceEvaluation: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      blueprintSectionCount: 10,
      blueprintBlockerCount: 10,
      sourceEvaluationRuleCount: 20,
      sourceEvaluationGuardCount: 20,
      readyBlueprintSectionCount: 10,
      readyBlueprintBlockerCount: 10,
      candidateFieldCount: 20,
      expectedCandidateFieldCountFromPreflight: 20,
      realComparedPackageEvidenceCandidateValueCount: 0,
      syntheticComparedPackageEvidenceCandidateValueCount: 0,
      materializedComparedPackageEvidenceCandidateValueCount: 0,
      acceptedComparedPackageEvidenceCandidateValueCount: 0,
      rejectedComparedPackageEvidenceCandidateValueCount: 0,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 33,
      passedGateCount: 33,
      blockedReasonCodes: [],
      candidateBlueprintMaterializationAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(candidate.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(candidate.sections.map((section) => section.nodeVersion)).toEqual([
      "Node v1352",
      "Node v1353",
      "Node v1354",
      "Node v1355",
      "Node v1356",
      "Node v1357",
      "Node v1358",
      "Node v1359",
      "Node v1360",
      "Node v1361",
    ]);
    expect(candidate.blockers.map((blocker) => blocker.nodeVersion))
      .toEqual(candidate.sections.map((section) => section.nodeVersion));
    expect(candidate.sections.flatMap((section) => section.candidateFields)).toEqual([
      "sourceIntakeDigest",
      "digestLineage",
      "artifactShape",
      "secretValueExclusion",
      "operatorProvenance",
      "manualSubmissionReference",
      "offlineComparisonResult",
      "syntheticEvidenceExclusion",
      "identityBinding",
      "reviewerTraceability",
      "signatureEnvelopeMetadata",
      "runtimePayloadExclusion",
      "sourceEvidenceHandles",
      "operatorValueHandles",
      "policyAssertions",
      "executionLocks",
      "writeAndSiblingMutationExclusion",
      "approvalGrantSeparation",
      "archiveReferences",
      "evaluationCloseout",
    ]);
    expect(candidate.sections.every((section) =>
      section.readyForComparedEvidenceCandidateBlueprintSection)).toBe(true);
    expect(candidate.sections.every((section) => section.blockedByMissingRealCandidate)).toBe(true);
    expect(candidate.blockers.every((blocker) => blocker.rejectsMissingCandidate)).toBe(true);
    expect(candidate.blockers.every((blocker) => blocker.rejectsSyntheticCandidate)).toBe(true);
    expect(candidate.blockers.every((blocker) => blocker.blocksCandidateMaterialization)).toBe(true);
    expect(candidate.blockers.every((blocker) => blocker.blocksCandidateAcceptance)).toBe(true);
    expect(candidate.blockers.every((blocker) => blocker.blocksRuntimePayload)).toBe(true);
    expect(candidate.blockers.every((blocker) => blocker.blocksWrites)).toBe(true);
    expect(candidate.blockers.every((blocker) => blocker.blocksSiblingMutation)).toBe(true);
  });

  it("fails closed when the compared evidence evaluation preflight is blocked", () => {
    const candidate =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateFixture(
        false,
      );

    expect(candidate).toMatchObject({
      artifactDraftTextPackageComparedEvidenceCandidateState: "blocked",
      readyForComparedEvidenceCandidateBlueprintContract: false,
      readyForComparedEvidenceEvaluationPreflightContract: false,
      blueprintSectionCount: 10,
      blueprintBlockerCount: 10,
      readyBlueprintSectionCount: 0,
      readyBlueprintBlockerCount: 0,
      candidateFieldCount: 20,
      realComparedPackageEvidenceCandidateValueCount: 0,
      syntheticComparedPackageEvidenceCandidateValueCount: 0,
      candidateBlueprintMaterializationAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(candidate.passedGateCount).toBeLessThan(candidate.gateCount);
    expect(candidate.blockedReasonCodes)
      .toContain("COMPARED_EVIDENCE_CANDIDATE_SOURCE_PREFLIGHT_NOT_READY");
    expect(candidate.blockedReasonCodes)
      .toContain("COMPARED_EVIDENCE_CANDIDATE_SECTIONS_BLOCKED");
    expect(candidate.blockedReasonCodes)
      .toContain("COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_BLOCKED");
  });

  it("renders stable compared evidence candidate markdown", () => {
    const candidate =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateMarkdown(
        candidate,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared evidence candidate");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package compared evidence candidate version: Node v1361");
    expect(markdown)
      .toContain("- Artifact draft text package compared evidence candidate state: waiting-for-real-compared-package-evidence-candidate");
    expect(markdown).toContain("- Blueprint section count: 10");
    expect(markdown).toContain("- Candidate field count: 20");
    expect(markdown).toContain("- Candidate evaluation allowed: false");
    expect(markdown)
      .toContain("### 1. Node v1352 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_SOURCE_LINEAGE_SECTION");
    expect(markdown)
      .toContain("### 10. Node v1361 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_ARCHIVE_CLOSEOUT_SECTION");
    expect(markdown).toContain("- Blocks candidate materialization: true");
    expect(markdown).toContain("- Blocks candidate acceptance: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes compared evidence candidate blueprint in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361",
        sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
          "Node v1351",
        blueprintSectionCount: 10,
        blueprintBlockerCount: 10,
        sourceEvaluationRuleCount: 20,
        sourceEvaluationGuardCount: 20,
        candidateFieldCount: 20,
        readyForComparedEvidenceCandidateBlueprintContract: true,
        readyForRealComparedPackageEvidenceCandidateIntake: false,
        realComparedPackageEvidenceCandidateValueCount: 0,
        syntheticComparedPackageEvidenceCandidateValueCount: 0,
        candidateBlueprintMaterializationAllowed: false,
        candidateEvaluationAllowed: false,
        executionAllowed: false,
        writeRoutingAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
        importsRuntimePayload: false,
        acceptsSyntheticEvidence: false,
        containsSecretValue: false,
      });
  });

  it("keeps candidate blueprint contract ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate)
        .toMatchObject({
          signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361",
          readyForComparedEvidenceCandidateBlueprintContract: true,
          readyForRealComparedPackageEvidenceCandidateIntake: false,
          blueprintSectionCount: 10,
          blueprintBlockerCount: 10,
          candidateFieldCount: 20,
          realComparedPackageEvidenceCandidateValueCount: 0,
          candidateBlueprintMaterializationAllowed: false,
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
