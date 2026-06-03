import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewTypeModuleCatalog,
  listControlledReadOnlyShardPreviewTypeModules,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.js";
import {
  renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogRenderer.js";

describe("controlled read-only shard preview type module catalog", () => {
  it("records stable type module ownership groups", () => {
    const catalog = createControlledReadOnlyShardPreviewTypeModuleCatalog();

    expect(catalog.catalogVersion).toBe("Node v685");
    expect(catalog.publicEntryPoint)
      .toBe("managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts");
    expect(catalog.moduleCount).toBe(13);
    expect(catalog.stableReExportModuleCount).toBe(catalog.moduleCount);
    expect(catalog.stopCondition).toContain("add a new type module only when");
  });

  it("keeps module ids, paths, and order unique", () => {
    const entries = listControlledReadOnlyShardPreviewTypeModules();

    expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
    expect(new Set(entries.map((entry) => entry.modulePath)).size).toBe(entries.length);
    expect(entries.map((entry) => entry.order)).toEqual(entries.map((_, index) => index + 1));
    expect(entries.at(-1)).toMatchObject({
      id: "profile-entry-types",
      modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts",
    });
  });

  it("requires every module to declare ownership and a stop condition", () => {
    const entries = listControlledReadOnlyShardPreviewTypeModules();

    for (const entry of entries) {
      expect(entry.owns.length).toBeGreaterThan(0);
      expect(entry.consumedBy.length).toBeGreaterThan(0);
      expect(entry.exportsViaStableProfileTypes).toBe(true);
      expect(entry.maintenanceRule.length).toBeGreaterThan(0);
      expect(entry.stopCondition).toMatch(/^Do not split|^Use these ownership groups/);
    }
  });

  it("renders a stable markdown catalog for archive review", () => {
    const markdown = renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown();

    expect(markdown).toContain("# Controlled read-only shard preview type module catalog");
    expect(markdown).toContain("- Catalog version: Node v685");
    expect(markdown).toContain("- Module count: 13");
    expect(markdown).toContain("### 1. source-matrix-types");
    expect(markdown).toContain("### 13. profile-entry-types");
    expect(markdown).toContain("- Stable profile re-export: true");
  });
});
