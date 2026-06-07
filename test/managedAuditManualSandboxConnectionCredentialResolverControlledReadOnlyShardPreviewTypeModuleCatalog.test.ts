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

    expect(catalog.catalogVersion).toBe("Node v1036");
    expect(catalog.publicEntryPoint)
      .toBe("managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts");
    expect(catalog.moduleCount).toBe(78);
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
    expect(markdown).toContain("- Catalog version: Node v1036");
    expect(markdown).toContain("- Module count: 78");
    expect(markdown).toContain("### 1. source-matrix-types");
    expect(markdown).toContain("### 13. execution-readiness-types");
    expect(markdown).toContain("### 16. live-read-only-window-stage-ledger-types");
    expect(markdown).toContain("### 19. live-read-only-window-runbook-types");
    expect(markdown).toContain("### 22. live-read-only-window-rehearsal-types");
    expect(markdown).toContain("### 25. live-read-only-window-command-worksheet-types");
    expect(markdown).toContain("### 28. live-read-only-window-evidence-packet-types");
    expect(markdown).toContain("### 31. live-read-only-window-evidence-intake-ledger-types");
    expect(markdown).toContain("### 32. live-read-only-window-evidence-intake-ledger-artifacts");
    expect(markdown).toContain("### 33. live-read-only-window-evidence-intake-ledger-renderer");
    expect(markdown).toContain("### 34. live-read-only-window-evidence-intake-review-package-types");
    expect(markdown).toContain("### 35. live-read-only-window-evidence-intake-review-package-artifacts");
    expect(markdown).toContain("### 36. live-read-only-window-evidence-intake-review-package-renderer");
    expect(markdown).toContain("### 37. live-read-only-window-profile-sections-renderer");
    expect(markdown).toContain("### 38. live-read-only-window-manual-evidence-entry-worksheet-types");
    expect(markdown).toContain("### 39. live-read-only-window-manual-evidence-entry-worksheet-artifacts");
    expect(markdown).toContain("### 40. live-read-only-window-manual-evidence-entry-worksheet-renderer");
    expect(markdown).toContain("### 41. type-module-catalog-entry-builder");
    expect(markdown).toContain("### 42. live-read-only-window-operator-evidence-import-preflight-types");
    expect(markdown).toContain("### 43. live-read-only-window-operator-evidence-import-preflight-slot-builder");
    expect(markdown).toContain("### 44. live-read-only-window-operator-evidence-import-preflight-artifacts");
    expect(markdown).toContain("### 45. live-read-only-window-operator-evidence-import-preflight-renderer");
    expect(markdown).toContain("### 46. live-read-only-window-operator-evidence-value-draft-types");
    expect(markdown).toContain("### 47. live-read-only-window-operator-evidence-value-draft-slot-builder");
    expect(markdown).toContain("### 48. live-read-only-window-operator-evidence-value-draft-artifacts");
    expect(markdown).toContain("### 49. live-read-only-window-operator-evidence-value-draft-renderer");
    expect(markdown).toContain("### 50. live-read-only-window-operator-evidence-fresh-sibling-intake-types");
    expect(markdown).toContain("### 51. live-read-only-window-operator-evidence-fresh-sibling-intake-evidence");
    expect(markdown).toContain("### 52. live-read-only-window-operator-evidence-fresh-sibling-intake-slot-builder");
    expect(markdown).toContain("### 53. live-read-only-window-operator-evidence-fresh-sibling-intake-artifacts");
    expect(markdown).toContain("### 54. live-read-only-window-operator-evidence-fresh-sibling-intake-renderer");
    expect(markdown).toContain("### 55. live-read-only-window-operator-evidence-value-supply-envelope-types");
    expect(markdown).toContain("### 56. live-read-only-window-operator-evidence-value-supply-envelope-evidence");
    expect(markdown).toContain("### 57. live-read-only-window-operator-evidence-value-supply-envelope-slot-builder");
    expect(markdown).toContain("### 58. live-read-only-window-operator-evidence-value-supply-envelope-artifacts");
    expect(markdown).toContain("### 59. live-read-only-window-operator-evidence-value-supply-envelope-renderer");
    expect(markdown)
      .toContain("### 60. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-types");
    expect(markdown)
      .toContain("### 61. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-evidence");
    expect(markdown)
      .toContain("### 62. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-policy-catalog");
    expect(markdown)
      .toContain("### 63. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-slot-builder");
    expect(markdown)
      .toContain("### 64. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-artifacts");
    expect(markdown)
      .toContain("### 65. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-renderer");
    expect(markdown)
      .toContain("### 66. live-read-only-window-operator-evidence-value-supply-approval-packet-review-types");
    expect(markdown)
      .toContain("### 67. live-read-only-window-operator-evidence-value-supply-approval-packet-review-control-catalog");
    expect(markdown)
      .toContain("### 68. live-read-only-window-operator-evidence-value-supply-approval-packet-review-slot-builder");
    expect(markdown)
      .toContain("### 69. live-read-only-window-operator-evidence-value-supply-approval-packet-review-artifacts");
    expect(markdown)
      .toContain("### 70. live-read-only-window-operator-evidence-value-supply-approval-packet-review-renderer");
    expect(markdown)
      .toContain("### 71. live-read-only-window-operator-evidence-value-supply-signed-approval-template-types");
    expect(markdown)
      .toContain("### 72. live-read-only-window-operator-evidence-value-supply-signed-approval-template-field-catalog");
    expect(markdown)
      .toContain("### 73. live-read-only-window-operator-evidence-value-supply-signed-approval-template-clause-catalog");
    expect(markdown)
      .toContain("### 74. live-read-only-window-operator-evidence-value-supply-signed-approval-template-builder");
    expect(markdown)
      .toContain("### 75. live-read-only-window-operator-evidence-value-supply-signed-approval-template-validator");
    expect(markdown)
      .toContain("### 76. live-read-only-window-operator-evidence-value-supply-signed-approval-template-artifacts");
    expect(markdown)
      .toContain("### 77. live-read-only-window-operator-evidence-value-supply-signed-approval-template-renderer");
    expect(markdown).toContain("### 78. profile-entry-types");
    expect(markdown).toContain("- Stable profile re-export: true");
  });

  it("validates catalog uniqueness, order, and stable re-export coverage", () => {
    const validation = validateControlledReadOnlyShardPreviewTypeModuleCatalog();

    expect(validation).toMatchObject({
      validationVersion: "Node v1036",
      valid: true,
      moduleCount: 78,
      uniqueIdCount: 78,
      uniquePathCount: 78,
      stableReExportModuleCount: 78,
      sequentialOrder: true,
      profileEntryLast: true,
      blockedReasonCodes: [],
      requiresFreshSiblingEvidence: true,
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
