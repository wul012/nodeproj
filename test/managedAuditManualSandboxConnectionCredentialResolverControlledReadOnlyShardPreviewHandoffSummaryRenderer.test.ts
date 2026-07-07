import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.js";
import {
  renderControlledReadOnlyShardPreviewHandoffSummarySections,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffSummaryRenderer.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview handoff summary renderer", () => {
  it("keeps handoff summary sections byte-identical after standardizing the section layout", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections = renderControlledReadOnlyShardPreviewHandoffSummarySections(profile);
    const sectionMarkdown = sections.join("\n");
    const fullMarkdown =
      renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(profile);

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(7);
    expect(sections.filter((line) => line.startsWith("### "))).toHaveLength(3);
    expect(sections[0]).toBe("## Source Matrix Handoff Notes");
    expect(sectionMarkdown).toContain("### Handoff Notes");
    expect(sectionMarkdown).toContain("### Handoff Summary Consumer Gates");
    expect(sectionMarkdown).toContain("### Handoff Summary Receipt Archive Verification Gates");
    expect(sectionMarkdown).toContain("## Source Matrix Handoff Summary Consumer Receipt Archive Verification");
    expect(sections.at(-1)).toBe("");
    expect(sha256(sectionMarkdown)).toBe("fb9c44571c6456026784947dbcb6a563d85aa24c9123d7905638a4794c520069");
    expect(sha256(fullMarkdown)).toBe("a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d");
  });
});

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}
