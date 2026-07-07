import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.js";
import {
  renderControlledReadOnlyShardPreviewLiveReadOnlyWindowSections,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview live read-only window profile section renderer", () => {
  it("keeps the standardized section renderer byte-identical to the pre-migration output", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections = renderControlledReadOnlyShardPreviewLiveReadOnlyWindowSections(profile);
    const sectionMarkdown = sections.join("\n");
    const fullMarkdown =
      renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(profile);

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(39);
    expect(sections[0]).toBe("## Execution Gap Matrix");
    expect(sectionMarkdown).toContain("## Live Read-Only Window Manual Evidence Entry Worksheet");
    expect(sectionMarkdown).toContain("## Live Read-Only Window Operator Evidence Value Supply Envelope");
    expect(sectionMarkdown).toContain("## Live Read-Only Window Operator Evidence Value Supply Approval Packet Draft");
    expect(sectionMarkdown).toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Intake");
    expect(sections.at(-1)).toBe("");
    expect(sha256(sectionMarkdown)).toBe("66d0f030a66b890f102c675b37ae93c27e8ee3503e49337fc3994e389d16b605");
    expect(sha256(fullMarkdown)).toBe("a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d");
  });
});

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}
