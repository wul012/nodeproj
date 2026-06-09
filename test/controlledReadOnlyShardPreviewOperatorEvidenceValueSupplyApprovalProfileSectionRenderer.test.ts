import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSections,
} from "../src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview operator evidence value supply approval profile section renderer", () => {
  it("renders the extracted approval and capture sections without changing route-facing fields", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections =
      renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSections(profile);
    const markdown = sections.join("\n");

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(5);
    expect(sections[0])
      .toBe("## Live Read-Only Window Operator Evidence Value Supply Approval Packet Draft");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Approval Packet Review");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Template");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Preflight");
    expect(markdown)
      .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Preflight");
    expect(markdown).toContain("approvalPacketDraftVersion: Node v986");
    expect(markdown).toContain("approvalPacketReviewVersion: Node v1011");
    expect(markdown).toContain("signedApprovalTemplateVersion: Node v1036");
    expect(markdown).toContain("signedApprovalCapturePreflightVersion: Node v1061");
    expect(markdown).toContain("signedApprovalCaptureArtifactPreflightVersion: Node v1086");
    expect(markdown).toContain("approvalCaptured: false");
    expect(markdown).toContain("signedApprovalPresent: false");
    expect(markdown).toContain("importsRuntimePayload: false");
    expect(markdown).toContain("containsSecretValue: false");
    expect(sections.at(-1)).toBe("");
  });
});
