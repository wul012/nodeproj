import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketDraftFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketReviewFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply approval packet review", () => {
  it("builds a twenty-five-version approval packet review package from the v986 draft", () => {
    const review = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketReviewFixture(true);

    expect(review).toMatchObject({
      approvalPacketReviewVersion: "Node v1011",
      sourceApprovalPacketDraftVersion: "Node v986",
      reviewPackageState: "ready-for-value-supply-approval-packet-review",
      readyForValueSupplyApprovalPacketReview: true,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      reviewControlCount: 25,
      approvalFieldReviewControlCount: 7,
      policyReviewControlCount: 7,
      sourceEvidenceReviewControlCount: 5,
      executionLockReviewControlCount: 5,
      closeoutReviewControlCount: 1,
      manualReviewRequiredControlCount: 25,
      autoApprovalBlockedControlCount: 25,
      requiredApprovalFieldCoveredCount: 25,
      requiredReviewRecordFieldCoveredCount: 25,
      policyRequirementSatisfiedCount: 25,
      acceptanceCriterionCount: 25,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      operatorIdentityPresent: false,
      approvalTimestampPresent: false,
      gateCount: 44,
      passedGateCount: 44,
      blockedReasonCodes: [],
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(review.sourceApprovalPacketDraftDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(review.approvalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(review.controls.map((control) => control.nodeVersion)).toEqual([
      "Node v987",
      "Node v988",
      "Node v989",
      "Node v990",
      "Node v991",
      "Node v992",
      "Node v993",
      "Node v994",
      "Node v995",
      "Node v996",
      "Node v997",
      "Node v998",
      "Node v999",
      "Node v1000",
      "Node v1001",
      "Node v1002",
      "Node v1003",
      "Node v1004",
      "Node v1005",
      "Node v1006",
      "Node v1007",
      "Node v1008",
      "Node v1009",
      "Node v1010",
      "Node v1011",
    ]);
    expect(review.controls.every((control) => control.sourceApprovalPacketDraftSlotReady)).toBe(true);
    expect(review.controls.every((control) => control.requiredApprovalFieldPresent)).toBe(true);
    expect(review.controls.every((control) => control.requiredReviewRecordFieldPresent)).toBe(true);
    expect(review.controls.every((control) => control.policyRequirementSatisfied)).toBe(true);
    expect(review.controls.every((control) => control.manualReviewRequired)).toBe(true);
    expect(review.controls.every((control) => !control.autoApprovalAllowed)).toBe(true);
    expect(review.controls.every((control) => !control.readyForSignedApprovalCapture)).toBe(true);
    expect(review.controls.every((control) => !control.readyForOperatorValueSupply)).toBe(true);
    expect(review.controls.every((control) => !control.readyForOperatorValueSubmission)).toBe(true);
    expect(review.controls.every((control) => !control.readyForEvidenceImport)).toBe(true);
    expect(review.controls.every((control) => !control.readyForRuntimePayload)).toBe(true);
    expect(review.controls.every((control) => !control.writesAllowed)).toBe(true);
    expect(review.controls.map((control) => control.code)).toContain("VALUE_SUPPLY_APPROVAL_REVIEW_PACKET_ID");
    expect(review.controls.map((control) => control.code))
      .toContain("VALUE_SUPPLY_APPROVAL_REVIEW_OPERATOR_SUPPLY_BLOCK");
    expect(review.controls.map((control) => control.code)).toContain("VALUE_SUPPLY_APPROVAL_REVIEW_CLOSEOUT");
  });

  it("fails closed when the source approval packet draft is blocked", () => {
    const review = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketReviewFixture(false);

    expect(review).toMatchObject({
      reviewPackageState: "blocked",
      readyForValueSupplyApprovalPacketReview: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      reviewControlCount: 25,
      requiredApprovalFieldCoveredCount: 25,
      requiredReviewRecordFieldCoveredCount: 25,
      policyRequirementSatisfiedCount: 25,
      passedGateCount: 41,
      blockedReasonCodes: [
        "SOURCE_APPROVAL_PACKET_DRAFT_NOT_READY",
        "APPROVAL_PACKET_REVIEW_SOURCE_DRAFT_SLOTS_NOT_READY",
        "APPROVAL_PACKET_REVIEW_CONTROLS_NOT_READY",
      ],
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(review.controls.every((control) => !control.readyForValueSupplyApprovalPacketReview)).toBe(true);
  });

  it("renders stable approval packet review markdown for archive review", () => {
    const review = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketReviewFixture(true);
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewMarkdown(
        review,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply approval packet review");
    expect(markdown).toContain("- Approval packet review version: Node v1011");
    expect(markdown).toContain("- Review package state: ready-for-value-supply-approval-packet-review");
    expect(markdown).toContain("- Ready for signed approval capture: false");
    expect(markdown).toContain("- Review control count: 25");
    expect(markdown).toContain("- Manual review required control count: 25");
    expect(markdown).toContain("- Auto approval blocked control count: 25");
    expect(markdown).toContain("### 1. Node v987 VALUE_SUPPLY_APPROVAL_REVIEW_PACKET_ID");
    expect(markdown).toContain("### 25. Node v1011 VALUE_SUPPLY_APPROVAL_REVIEW_CLOSEOUT");
    expect(markdown).toContain("- Reviewer question:");
    expect(markdown).toContain("- Acceptance criterion:");
    expect(markdown).toContain("- Auto approval allowed: false");
    expect(markdown).toContain("- Ready for operator value supply: false");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the approval packet review package in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview).toMatchObject({
      approvalPacketReviewVersion: "Node v1011",
      sourceApprovalPacketDraftVersion: "Node v986",
      reviewControlCount: 25,
      readyForValueSupplyApprovalPacketReview: true,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
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

  it("uses frozen draft evidence when historical sibling fixture fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const draft = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketDraftFixture(true);
      const review =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview(draft);

      expect(draft.presentFileCount).toBe(7);
      expect(draft.matchedSnippetCount).toBe(25);
      expect(draft.historicalFixtureResolvedFileCount).toBe(6);
      expect(review.reviewControlCount).toBe(25);
      expect(review.requiredApprovalFieldCoveredCount).toBe(25);
      expect(review.requiredReviewRecordFieldCoveredCount).toBe(25);
      expect(review.policyRequirementSatisfiedCount).toBe(25);
      expect(review.readyForValueSupplyApprovalPacketReview).toBe(true);
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
