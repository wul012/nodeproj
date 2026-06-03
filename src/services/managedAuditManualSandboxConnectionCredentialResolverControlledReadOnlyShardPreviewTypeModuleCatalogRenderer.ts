import {
  createControlledReadOnlyShardPreviewTypeModuleCatalog,
  type ControlledReadOnlyShardPreviewTypeModuleCatalog,
  type ControlledReadOnlyShardPreviewTypeModuleCatalogEntry,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.js";

export function renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown(
  catalog: ControlledReadOnlyShardPreviewTypeModuleCatalog =
    createControlledReadOnlyShardPreviewTypeModuleCatalog(),
): string {
  return [
    "# Controlled read-only shard preview type module catalog",
    "",
    `- Catalog version: ${catalog.catalogVersion}`,
    `- Public entry point: ${catalog.publicEntryPoint}`,
    `- Module count: ${catalog.moduleCount}`,
    `- Stable re-export module count: ${catalog.stableReExportModuleCount}`,
    `- Stop condition: ${catalog.stopCondition}`,
    "",
    "## Modules",
    "",
    ...catalog.entries.flatMap(renderTypeModuleEntry),
    "",
  ].join("\n");
}

function renderTypeModuleEntry(entry: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry): string[] {
  return [
    `### ${entry.order}. ${entry.id}`,
    "",
    `- Module path: ${entry.modulePath}`,
    `- Owns: ${entry.owns.join(", ")}`,
    `- Consumed by: ${entry.consumedBy.join(", ")}`,
    `- Stable profile re-export: ${entry.exportsViaStableProfileTypes}`,
    `- Maintenance rule: ${entry.maintenanceRule}`,
    `- Stop condition: ${entry.stopCondition}`,
    "",
  ];
}
