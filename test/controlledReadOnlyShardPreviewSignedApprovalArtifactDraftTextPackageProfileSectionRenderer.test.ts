import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSections,
} from "../src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview signed approval artifact draft text package profile section renderer", () => {
  it("renders the extracted text package sections without changing route-facing fields", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections =
      renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSections(profile);
    const markdown = sections.join("\n");

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(9);
    expect(sections[0])
      .toBe("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Intake");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Review Preflight");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Submission Preflight");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Preflight");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Acceptance Precheck");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Package Evidence Intake");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Evaluation Preflight");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Intake");
    expect(markdown).toContain("signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: Node v1236");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: Node v1261");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: Node v1286");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: Node v1311");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: Node v1321");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: Node v1331");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: Node v1351");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: Node v1361");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: Node v1371");
    expect(markdown).toContain("signedApprovalPresent: false");
    expect(markdown).toContain("importsRuntimePayload: false");
    expect(markdown).toContain("containsSecretValue: false");
    expect(sections.at(-1)).toBe("");
  });
});
