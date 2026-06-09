import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSections,
} from "../src/services/controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview operator evidence value supply profile section renderer", () => {
  it("renders the extracted import and value supply sections without changing route-facing fields", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    const sections =
      renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSections(profile);
    const markdown = sections.join("\n");

    expect(sections.filter((line) => line.startsWith("## "))).toHaveLength(4);
    expect(sections[0])
      .toBe("## Live Read-Only Window Operator Evidence Import Preflight");
    expect(markdown).toContain("## Live Read-Only Window Operator Evidence Value Draft");
    expect(markdown).toContain("## Live Read-Only Window Operator Evidence Fresh Sibling Intake");
    expect(markdown).toContain("## Live Read-Only Window Operator Evidence Value Supply Envelope");
    expect(markdown).toContain("preflightVersion: Node v886");
    expect(markdown).toContain("valueDraftVersion: Node v911");
    expect(markdown).toContain("freshSiblingIntakeVersion: Node v936");
    expect(markdown).toContain("valueSupplyEnvelopeVersion: Node v961");
    expect(markdown).toContain("importsRuntimePayload: false");
    expect(markdown).toContain("acceptsSyntheticEvidence: false");
    expect(markdown).toContain("containsSecretValue: false");
    expect(sections.at(-1)).toBe("");
  });
});
