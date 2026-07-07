import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.js";
import {
  renderControlledReadOnlyShardPreviewHandoffRouteCoverageSections,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageRenderer.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview route coverage renderer", () => {
  it("keeps route coverage sections byte-identical after standardizing the section layout", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections = renderControlledReadOnlyShardPreviewHandoffRouteCoverageSections(profile);
    const sectionMarkdown = sections.join("\n");
    const fullMarkdown =
      renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(profile);

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(8);
    expect(sections.filter((line) => line.startsWith("### "))).toHaveLength(3);
    expect(sections[0]).toBe("## Source Matrix Handoff Route Coverage");
    expect(sectionMarkdown).toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt");
    expect(sectionMarkdown)
      .toContain("### Handoff Route Coverage Archive Summary Receipt Archive Verification Gates");
    expect(sections.at(-1)).toBe("");
    expect(sha256(sectionMarkdown)).toBe("ee09a0d002941c3a162823e0edc380c13168b154cd2bd8bf7c0b6510ebc72154");
    expect(sha256(fullMarkdown)).toBe("a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d");
  });
});

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}
