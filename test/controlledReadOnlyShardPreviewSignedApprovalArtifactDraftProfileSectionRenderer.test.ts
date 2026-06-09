import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSections,
} from "../src/services/controlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSectionRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview signed approval artifact draft profile section renderer", () => {
  it("renders the extracted signed approval artifact draft sections without changing route-facing fields", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections =
      renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSections(profile);
    const markdown = sections.join("\n");

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(5);
    expect(sections[0])
      .toBe("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Preflight");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Readiness");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Review Package Preflight");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Authoring Readiness");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Instruction Preflight");
    expect(markdown).toContain("signedApprovalCaptureArtifactDraftPreflightVersion: Node v1111");
    expect(markdown).toContain("signedApprovalCaptureArtifactDraftReadinessVersion: Node v1136");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: Node v1161");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftAuthoringReadinessVersion: Node v1186");
    expect(markdown)
      .toContain("signedApprovalCaptureArtifactDraftInstructionPreflightVersion: Node v1211");
    expect(markdown).toContain("draftArtifactCreated: false");
    expect(markdown).toContain("signedApprovalPresent: false");
    expect(markdown).toContain("importsRuntimePayload: false");
    expect(sections.at(-1)).toBe("");
  });
});
