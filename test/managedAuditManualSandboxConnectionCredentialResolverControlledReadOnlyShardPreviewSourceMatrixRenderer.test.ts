import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.js";
import {
  renderControlledReadOnlyShardPreviewSourceMatrixSections,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview source matrix renderer", () => {
  it("keeps source matrix sections byte-identical after standardizing the section layout", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections = renderControlledReadOnlyShardPreviewSourceMatrixSections(profile);
    const sectionMarkdown = sections.join("\n");
    const fullMarkdown =
      renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(profile);

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(8);
    expect(sections.filter((line) => line.startsWith("### "))).toHaveLength(8);
    expect(sections[0]).toBe("## Source Matrix");
    expect(sectionMarkdown).toContain("### Consumer Gates");
    expect(sectionMarkdown).toContain("### Consumer Comparison");
    expect(sectionMarkdown).toContain("### Consumption Plan Step Records");
    expect(sectionMarkdown).toContain("## Source Matrix Archive Snapshot Summary Export");
    expect(sections.at(-1)).toBe("");
    expect(sha256(sectionMarkdown)).toBe("738c074eaec922f9cf6a194ca77bd4c7b4255c142650a6e23262b3c6921d4ec6");
    expect(sha256(fullMarkdown)).toBe("a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d");
  });
});

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}
