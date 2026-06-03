import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewTypeModuleCatalog,
  listControlledReadOnlyShardPreviewTypeModules,
  validateControlledReadOnlyShardPreviewTypeModuleCatalog,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.js";
import {
  renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogRenderer.js";

describe("controlled read-only shard preview type module catalog", () => {
  it("records stable type module ownership groups", () => {
    const catalog = createControlledReadOnlyShardPreviewTypeModuleCatalog();

    expect(catalog.catalogVersion).toBe("Node v691");
    expect(catalog.publicEntryPoint)
      .toBe("managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts");
    expect(catalog.moduleCount).toBe(16);
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
    expect(markdown).toContain("- Catalog version: Node v691");
    expect(markdown).toContain("- Module count: 16");
    expect(markdown).toContain("### 1. source-matrix-types");
    expect(markdown).toContain("### 13. execution-readiness-types");
    expect(markdown).toContain("### 16. profile-entry-types");
    expect(markdown).toContain("- Stable profile re-export: true");
  });

  it("validates catalog uniqueness, order, and stable re-export coverage", () => {
    const validation = validateControlledReadOnlyShardPreviewTypeModuleCatalog();

    expect(validation).toMatchObject({
      validationVersion: "Node v691",
      valid: true,
      moduleCount: 16,
      uniqueIdCount: 16,
      uniquePathCount: 16,
      stableReExportModuleCount: 16,
      sequentialOrder: true,
      profileEntryLast: true,
      blockedReasonCodes: [],
      requiresFreshSiblingEvidence: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
  });

  it("reports catalog boundary drift", () => {
    const catalog = createControlledReadOnlyShardPreviewTypeModuleCatalog();
    const driftedCatalog = {
      ...catalog,
      entries: catalog.entries.map((entry, index) =>
        index === 1 ? { ...entry, id: catalog.entries[0].id } : entry
      ),
    };

    const validation = validateControlledReadOnlyShardPreviewTypeModuleCatalog(driftedCatalog);

    expect(validation.valid).toBe(false);
    expect(validation.blockedReasonCodes).toContain("TYPE_MODULE_IDS_NOT_UNIQUE");
  });
});
