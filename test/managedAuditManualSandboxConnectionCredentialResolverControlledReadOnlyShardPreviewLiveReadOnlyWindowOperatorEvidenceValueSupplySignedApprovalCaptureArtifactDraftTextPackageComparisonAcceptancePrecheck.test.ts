import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package comparison acceptance precheck", () => {
  it("builds ten acceptance precheck checkpoints and guards from comparison preflight", () => {
    const precheck =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckFixture(
        true,
      );

    expect(precheck).toMatchObject({
      signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321",
      sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: "Node v1311",
      artifactDraftTextPackageComparisonAcceptancePrecheckState:
        "ready-for-signed-approval-artifact-draft-text-package-comparison-acceptance-precheck",
      readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck: true,
      readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck: true,
      readyForOfflineSignedApprovalDraftTextPackageComparison: true,
      readyForManualSignedApprovalDraftTextPackageSubmission: true,
      readyForSignedApprovalArtifactDraft: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      checkpointCount: 10,
      guardCount: 10,
      sourceComparisonLaneCount: 25,
      sourceAcceptanceControlCount: 25,
      readyCheckpointCount: 10,
      readyGuardCount: 10,
      sourceReadinessCheckpointCount: 1,
      identityCheckpointCount: 1,
      digestBindingCheckpointCount: 1,
      signatureEnvelopeCheckpointCount: 1,
      sourceEvidenceCheckpointCount: 1,
      operatorValueCheckpointCount: 1,
      policyCheckpointCount: 1,
      executionLockCheckpointCount: 1,
      approvalGrantReviewCheckpointCount: 1,
      archiveCloseoutCheckpointCount: 1,
      expectedDraftTextPackageAcceptanceCheckpointCount: 10,
      actualDraftTextPackageAcceptanceEvidenceCount: 0,
      submittedDraftTextPackageCount: 0,
      comparedDraftTextPackageCount: 0,
      acceptedDraftTextPackageCount: 0,
      rejectedDraftTextPackageCount: 0,
      signedDraftTextCount: 0,
      draftSignaturePayloadCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      gateCount: 54,
      passedGateCount: 54,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(precheck.checkpoints.map((checkpoint) => checkpoint.nodeVersion)).toEqual([
      "Node v1312",
      "Node v1313",
      "Node v1314",
      "Node v1315",
      "Node v1316",
      "Node v1317",
      "Node v1318",
      "Node v1319",
      "Node v1320",
      "Node v1321",
    ]);
    expect(precheck.guards.map((guard) => guard.nodeVersion))
      .toEqual(precheck.checkpoints.map((checkpoint) => checkpoint.nodeVersion));
    expect(precheck.checkpoints.every((checkpoint) =>
      checkpoint.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint)).toBe(true);
    expect(precheck.guards.every((guard) =>
      guard.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard)).toBe(true);
    expect(precheck.checkpoints.find((checkpoint) =>
      checkpoint.kind === "identity-acceptance-checkpoint")?.sourceComparisonLaneCount).toBe(4);
    expect(precheck.checkpoints.find((checkpoint) =>
      checkpoint.kind === "digest-binding-acceptance-checkpoint")?.sourceComparisonLaneCount).toBe(5);
    expect(precheck.checkpoints.find((checkpoint) =>
      checkpoint.kind === "signature-envelope-acceptance-checkpoint")?.sourceComparisonLaneCount).toBe(3);
    expect(precheck.checkpoints.find((checkpoint) =>
      checkpoint.kind === "source-evidence-acceptance-checkpoint")?.sourceComparisonLaneCount).toBe(3);
    expect(precheck.checkpoints.find((checkpoint) =>
      checkpoint.kind === "operator-value-acceptance-checkpoint")?.sourceComparisonLaneCount).toBe(2);
    expect(precheck.checkpoints.find((checkpoint) =>
      checkpoint.kind === "execution-lock-acceptance-checkpoint")?.sourceComparisonLaneCount).toBe(5);
    expect(precheck.guards.every((guard) => guard.rejectsMissingAcceptanceEvidence)).toBe(true);
    expect(precheck.guards.every((guard) => guard.blocksDraftTextPackageAcceptance)).toBe(true);
    expect(precheck.guards.every((guard) => guard.blocksApprovalGrant)).toBe(true);
    expect(precheck.guards.every((guard) => guard.blocksRuntimePayload)).toBe(true);
    expect(precheck.guards.every((guard) => guard.blocksWrites)).toBe(true);
    expect(precheck.guards.every((guard) => guard.blocksSiblingMutation)).toBe(true);
  });

  it("fails closed when the source comparison preflight is blocked", () => {
    const precheck =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckFixture(
        false,
      );

    expect(precheck).toMatchObject({
      artifactDraftTextPackageComparisonAcceptancePrecheckState: "blocked",
      readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck: false,
      readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck: false,
      checkpointCount: 10,
      guardCount: 10,
      readyCheckpointCount: 0,
      readyGuardCount: 0,
      actualDraftTextPackageAcceptanceEvidenceCount: 0,
      acceptedDraftTextPackageCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(precheck.passedGateCount).toBeLessThan(precheck.gateCount);
    expect(precheck.blockedReasonCodes)
      .toContain("SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_NOT_READY");
    expect(precheck.blockedReasonCodes)
      .toContain("ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_CHECKPOINTS_BLOCKED");
    expect(precheck.blockedReasonCodes)
      .toContain("ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_BLOCKED");
    expect(precheck.checkpoints.every((checkpoint) =>
      !checkpoint.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint)).toBe(true);
    expect(precheck.guards.every((guard) =>
      !guard.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard)).toBe(true);
  });

  it("renders stable signed approval capture artifact draft text package comparison acceptance precheck markdown", () => {
    const precheck =
      controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckFixture(
        true,
      );
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckMarkdown(
        precheck,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package comparison acceptance precheck");
    expect(markdown)
      .toContain("- Signed approval capture artifact draft text package comparison acceptance precheck version: Node v1321");
    expect(markdown)
      .toContain("- Source signed approval capture artifact draft text package comparison preflight version: Node v1311");
    expect(markdown)
      .toContain("- Artifact draft text package comparison acceptance precheck state: ready-for-signed-approval-artifact-draft-text-package-comparison-acceptance-precheck");
    expect(markdown).toContain("- Ready for offline signed approval draft text package acceptance precheck: true");
    expect(markdown).toContain("- Checkpoint count: 10");
    expect(markdown).toContain("- Guard count: 10");
    expect(markdown).toContain("- Actual draft text package acceptance evidence count: 0");
    expect(markdown).toContain("- Accepted draft text package count: 0");
    expect(markdown)
      .toContain("### 1. Node v1312 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_SOURCE_PREFLIGHT_CHECKPOINT");
    expect(markdown)
      .toContain("### 10. Node v1321 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CLOSEOUT_CHECKPOINT");
    expect(markdown)
      .toContain("### 10. Node v1321 SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CLOSEOUT_CHECKPOINT_GUARD");
    expect(markdown).toContain("- Blocks draft text package acceptance: true");
    expect(markdown).toContain("- Blocks approval grant: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval capture artifact draft text package comparison acceptance precheck in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck)
      .toMatchObject({
        signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321",
        sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: "Node v1311",
        checkpointCount: 10,
        guardCount: 10,
        sourceComparisonLaneCount: 25,
        sourceAcceptanceControlCount: 25,
        readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck: true,
        readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck: true,
        readyForOfflineSignedApprovalDraftTextPackageComparison: true,
        actualDraftTextPackageAcceptanceEvidenceCount: 0,
        submittedDraftTextPackageCount: 0,
        comparedDraftTextPackageCount: 0,
        acceptedDraftTextPackageCount: 0,
        rejectedDraftTextPackageCount: 0,
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

  it("keeps comparison acceptance precheck ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck)
        .toMatchObject({
          signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321",
          readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck: true,
          checkpointCount: 10,
          guardCount: 10,
          acceptedDraftTextPackageCount: 0,
          approvalGrantPresent: false,
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
