import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketReviewFixture,
  controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalTemplateFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview live read-only window operator evidence value supply signed approval template", () => {
  it("builds a twenty-five-field and twenty-five-clause signed approval template preflight", () => {
    const template = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalTemplateFixture(true);

    expect(template).toMatchObject({
      signedApprovalTemplateVersion: "Node v1036",
      sourceApprovalPacketReviewVersion: "Node v1011",
      templateState: "ready-for-signed-approval-template-preflight",
      readyForSignedApprovalTemplatePreflight: true,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      templateFieldCount: 25,
      templateClauseCount: 25,
      identityFieldCount: 4,
      timeFieldCount: 1,
      sourceEvidenceFieldCount: 8,
      valueShapeFieldCount: 2,
      policyFieldCount: 6,
      executionLockFieldCount: 3,
      closeoutFieldCount: 1,
      requiredFieldCount: 25,
      readyFieldCount: 25,
      readyClauseCount: 25,
      missingFieldBlockerCount: 25,
      rejectionClauseCount: 6,
      nonExecutionClauseCount: 3,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      templateValueProvidedCount: 0,
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
    expect(template.sourceApprovalPacketReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(template.signedApprovalTemplateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(template.fields.map((field) => field.nodeVersion)).toEqual([
      "Node v1012",
      "Node v1013",
      "Node v1014",
      "Node v1015",
      "Node v1016",
      "Node v1017",
      "Node v1018",
      "Node v1019",
      "Node v1020",
      "Node v1021",
      "Node v1022",
      "Node v1023",
      "Node v1024",
      "Node v1025",
      "Node v1026",
      "Node v1027",
      "Node v1028",
      "Node v1029",
      "Node v1030",
      "Node v1031",
      "Node v1032",
      "Node v1033",
      "Node v1034",
      "Node v1035",
      "Node v1036",
    ]);
    expect(template.clauses.map((clause) => clause.nodeVersion)).toEqual(template.fields.map((field) => field.nodeVersion));
    expect(template.fields.every((field) => field.sourceReviewControlReady)).toBe(true);
    expect(template.fields.every((field) => field.sourceManualReviewRequired)).toBe(true);
    expect(template.fields.every((field) => field.sourceAutoApprovalBlocked)).toBe(true);
    expect(template.fields.every((field) => field.requiredReviewControlFieldPresent)).toBe(true);
    expect(template.fields.every((field) => field.required && !field.captureAllowedNow)).toBe(true);
    expect(template.fields.every((field) => !field.valueProvided && !field.containsSecretValue)).toBe(true);
    expect(template.fields.every((field) => field.readyForSignedApprovalTemplateField)).toBe(true);
    expect(template.clauses.every((clause) => clause.sourceTemplateFieldReady)).toBe(true);
    expect(template.clauses.every((clause) => clause.rejectsMissingField)).toBe(true);
    expect(template.clauses.every((clause) => clause.blocksUnsignedApproval)).toBe(true);
    expect(template.clauses.every((clause) => clause.blocksAutoApproval)).toBe(true);
    expect(template.clauses.every((clause) => clause.blocksRuntimePayload)).toBe(true);
    expect(template.clauses.every((clause) => clause.blocksWrites)).toBe(true);
    expect(template.clauses.every((clause) => clause.blocksSiblingMutation)).toBe(true);
    expect(template.fields.map((field) => field.code)).toContain("SIGNED_APPROVAL_TEMPLATE_OPERATOR_IDENTITY");
    expect(template.fields.map((field) => field.code)).toContain("SIGNED_APPROVAL_TEMPLATE_WRITE_SERVICE_LOCK");
    expect(template.clauses.map((clause) => clause.code)).toContain("SIGNED_APPROVAL_TEMPLATE_CLOSEOUT_ONLY");
  });

  it("fails closed when the source approval packet review package is blocked", () => {
    const template = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalTemplateFixture(false);

    expect(template).toMatchObject({
      templateState: "blocked",
      readyForSignedApprovalTemplatePreflight: false,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      templateFieldCount: 25,
      templateClauseCount: 25,
      readyFieldCount: 0,
      readyClauseCount: 0,
      passedGateCount: 31,
      blockedReasonCodes: [
        "SOURCE_APPROVAL_PACKET_REVIEW_NOT_READY",
        "SIGNED_TEMPLATE_SOURCE_REVIEW_CONTROLS_NOT_READY",
        "SIGNED_TEMPLATE_FIELDS_NOT_READY",
        "SIGNED_TEMPLATE_CLAUSES_NOT_READY",
      ],
      templateValueProvidedCount: 0,
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(template.fields.every((field) => !field.readyForSignedApprovalTemplateField)).toBe(true);
    expect(template.clauses.every((clause) => !clause.readyForSignedApprovalTemplateClause)).toBe(true);
  });

  it("renders stable signed approval template markdown for archive review", () => {
    const template = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalTemplateFixture(true);
    const markdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateMarkdown(
        template,
      );

    expect(markdown)
      .toContain("# Controlled read-only shard preview live read-only window operator evidence value supply signed approval template");
    expect(markdown).toContain("- Signed approval template version: Node v1036");
    expect(markdown).toContain("- Template state: ready-for-signed-approval-template-preflight");
    expect(markdown).toContain("- Ready for signed approval capture: false");
    expect(markdown).toContain("- Template field count: 25");
    expect(markdown).toContain("- Template clause count: 25");
    expect(markdown).toContain("### 1. Node v1012 SIGNED_APPROVAL_TEMPLATE_PACKET_ID");
    expect(markdown).toContain("### 25. Node v1036 SIGNED_APPROVAL_TEMPLATE_CLOSEOUT");
    expect(markdown).toContain("### 25. Node v1036 SIGNED_APPROVAL_TEMPLATE_CLOSEOUT_ONLY");
    expect(markdown).toContain("- Blocks unsigned approval: true");
    expect(markdown).toContain("- Blocks runtime payload: true");
    expect(markdown).toContain("- Mutates sibling state: false");
  });

  it("includes the signed approval template in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate).toMatchObject({
      signedApprovalTemplateVersion: "Node v1036",
      sourceApprovalPacketReviewVersion: "Node v1011",
      templateFieldCount: 25,
      templateClauseCount: 25,
      readyForSignedApprovalTemplatePreflight: true,
      readyForSignedApprovalCapture: false,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      templateValueProvidedCount: 0,
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
      const review = controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketReviewFixture(true);
      const template =
        createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate(
          review,
        );

      expect(review.readyForValueSupplyApprovalPacketReview).toBe(true);
      expect(review.reviewControlCount).toBe(25);
      expect(template.templateFieldCount).toBe(25);
      expect(template.templateClauseCount).toBe(25);
      expect(template.readyFieldCount).toBe(25);
      expect(template.readyClauseCount).toBe(25);
      expect(template.readyForSignedApprovalTemplatePreflight).toBe(true);
      expect(template.readyForSignedApprovalCapture).toBe(false);
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
