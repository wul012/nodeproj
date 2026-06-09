import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections,
} from "../src/services/controlledReadOnlyShardPreviewCandidateDocumentProfileSectionRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview candidate document profile section renderer", () => {
  it("renders the extracted candidate document profile sections without changing route-facing fields", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections = renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections(profile);
    const markdown = sections.join("\n");

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(5);
    expect(sections[0])
      .toBe("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Request Package");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Submission Precheck");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Intake Packet");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Material Request Package");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Material Submission Precheck");
    expect(markdown).toContain("candidateDocumentMaterialRequestPackageVersion: Node v1446");
    expect(markdown).toContain("candidateDocumentMaterialSubmissionPrecheckVersion: Node v1456");
    expect(markdown)
      .toContain("candidateDocumentMaterialSubmissionPrecheckState: ready-for-reviewed-real-candidate-document-material-submission-precheck");
    expect(markdown).toContain("candidateDocumentMaterialSubmissionAllowed: false");
    expect(markdown).toContain("candidateDocumentMaterialIntakeAllowed: false");
    expect(sections.at(-1)).toBe("");
  });
});
